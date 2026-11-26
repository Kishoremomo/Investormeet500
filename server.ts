import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  computeRegistrationStats,
  createNotificationEntry,
  filterRegistrations,
  type NotificationLogEntry,
  type RegistrationTargets,
} from './src/lib/domain.ts';
import {
  applyCreateInquiry,
  applyCreateRegistration,
  applyDeleteRegistration,
  applyPatchCalendarTask,
  applyPatchInquiry,
  applyPatchRegistration,
  applyUpdateTargets,
  createInitialStore,
  nextNotificationId,
  normalizeStoreShape,
  type StoreSchema,
} from './src/lib/seedData.ts';

const PORT = 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

async function dispatchNotificationWebhook(params: {
  eventType: NotificationLogEntry['eventType'];
  referenceId: string;
  applicantName: string;
  companyOrSubject: string;
  trackOrCategory: string;
  summary: string;
  createdAt: string;
}): Promise<boolean> {
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;
  if (!webhookUrl) return false;
  try {
    const resp = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'sevenidatamanager@gmail.com',
        ...params,
      }),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

function ensureStore(): StoreSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_PATH)) {
    const initial = createInitialStore();
    fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    return normalizeStoreShape(JSON.parse(raw) as Partial<StoreSchema>);
  } catch {
    const fallback = createInitialStore();
    fs.writeFileSync(STORE_PATH, JSON.stringify(fallback, null, 2), 'utf8');
    return fallback;
  }
}

function saveStore(store: StoreSchema) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tmpPath = `${STORE_PATH}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(store, null, 2), 'utf8');
  fs.renameSync(tmpPath, STORE_PATH);
}

async function recordWebhookStatus(
  store: StoreSchema,
  notification: NotificationLogEntry,
  notifParams: Parameters<typeof dispatchNotificationWebhook>[0]
) {
  const dispatched = await dispatchNotificationWebhook(notifParams);
  if (dispatched) {
    notification.deliveryChannel = 'Webhook Relay';
    notification.status = 'Dispatched via Webhook';
    void store;
    void createNotificationEntry;
    void nextNotificationId;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  let store = ensureStore();

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'investor-meet-500', count: store.registrations.length });
  });

  // Registrations list + computed stats
  app.get('/api/registrations', (req, res) => {
    const { query, category, validationStatus, paymentStatus, dateFrom, dateTo } = req.query as Record<
      string,
      string | undefined
    >;
    const filtered = filterRegistrations(store.registrations, {
      query,
      category,
      validationStatus,
      paymentStatus,
      dateFrom,
      dateTo,
    });
    const stats = computeRegistrationStats(store.registrations, store.targets);
    res.json({
      registrations: filtered,
      allCount: store.registrations.length,
      stats,
      targets: store.targets,
    });
  });

  // Notification outbox endpoint targeting sevenidatamanager@gmail.com
  app.get('/api/notifications', (_req, res) => {
    res.json({
      recipient: 'sevenidatamanager@gmail.com',
      notifications: store.notifications,
    });
  });

  // Create registration (supports both /apply and /registration category forms)
  app.post('/api/registrations', async (req, res) => {
    const created = applyCreateRegistration(store, (req.body || {}) as Record<string, unknown>);
    if (!created.ok) {
      res.status(400).json({ error: created.error, errors: created.errors });
      return;
    }
    await recordWebhookStatus(store, created.notification, created.notifParams);
    saveStore(store);
    res.status(201).json({ registration: created.registration, notification: created.notification });
  });

  // Update registration status, reviewer, payment, pitch hall
  app.patch('/api/registrations/:id', (req, res) => {
    const updated = applyPatchRegistration(
      store,
      req.params.id,
      (req.body || {}) as Record<string, unknown>
    );
    if (!updated) {
      res.status(404).json({ error: 'Registration not found' });
      return;
    }
    saveStore(store);
    res.json({ registration: updated });
  });

  app.delete('/api/registrations/:id', (req, res) => {
    const removed = applyDeleteRegistration(store, req.params.id);
    if (!removed) {
      res.status(404).json({ error: 'Registration not found' });
      return;
    }
    saveStore(store);
    res.json({ deleted: req.params.id });
  });

  // Update dashboard targets
  app.put('/api/targets', (req, res) => {
    const nextTargets: RegistrationTargets = applyUpdateTargets(
      store,
      (req.body || {}) as Record<string, unknown>
    );
    saveStore(store);
    res.json({ targets: nextTargets });
  });

  // Calendar tasks
  app.get('/api/calendar-tasks', (_req, res) => {
    res.json({ tasks: store.calendarTasks });
  });

  app.patch('/api/calendar-tasks/:id', (req, res) => {
    const updated = applyPatchCalendarTask(
      store,
      req.params.id,
      (req.body || {}) as Record<string, unknown>
    );
    if (!updated) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    saveStore(store);
    res.json({ task: updated });
  });

  // Contact & Consultation inquiries
  app.get('/api/inquiries', (_req, res) => {
    res.json({ inquiries: store.inquiries });
  });

  app.post('/api/inquiries', async (req, res) => {
    const created = applyCreateInquiry(store, (req.body || {}) as Record<string, unknown>);
    if (!created.ok) {
      res.status(400).json({ error: created.error, errors: created.errors });
      return;
    }
    await recordWebhookStatus(store, created.notification, created.notifParams);
    saveStore(store);
    res.status(201).json({ inquiry: created.inquiry, notification: created.notification });
  });

  app.patch('/api/inquiries/:id', (req, res) => {
    const updated = applyPatchInquiry(store, req.params.id, req.body?.status);
    if (!updated) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }
    saveStore(store);
    res.json({ inquiry: updated });
  });

  // Vite middleware in dev, static dist in prod
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Investor Meet 500 server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
