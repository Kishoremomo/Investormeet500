import fs from 'fs';
import { computeRegistrationStats, filterRegistrations } from '../src/lib/domain';
import {
  applyCreateInquiry,
  applyCreateRegistration,
  applyDeleteRegistration,
  applyPatchCalendarTask,
  applyPatchInquiry,
  applyPatchRegistration,
  applyUpdateTargets,
  createInitialStore,
  normalizeStoreShape,
  type StoreSchema,
} from '../src/lib/seedData';

interface ApiRequest {
  method?: string;
  url?: string;
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
  body?: unknown;
  on?: (event: string, cb: (chunk?: unknown) => void) => void;
}

interface ApiResponse {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
  status?(code: number): ApiResponse;
  json?(data: unknown): void;
}

const TMP_STORE_PATH = '/tmp/im500-store.json';
let memoryStore: StoreSchema | null = null;

function readStore(): StoreSchema {
  if (memoryStore) return memoryStore;
  try {
    if (fs.existsSync(TMP_STORE_PATH)) {
      const raw = fs.readFileSync(TMP_STORE_PATH, 'utf8');
      const normalized = normalizeStoreShape(JSON.parse(raw) as Partial<StoreSchema>);
      memoryStore = normalized;
      return normalized;
    }
  } catch {
    // Fallback to initial seed store
  }
  const initial = createInitialStore();
  memoryStore = initial;
  writeStore(initial);
  return initial;
}

function writeStore(store: StoreSchema): void {
  memoryStore = store;
  try {
    fs.writeFileSync(TMP_STORE_PATH, JSON.stringify(store), 'utf8');
  } catch {
    // Ignore read-only filesystem edge cases
  }
}

function sendJson(res: ApiResponse, statusCode: number, data: unknown): void {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}

async function readJsonBody(req: ApiRequest): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === 'object') {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === 'string' && req.body.trim()) {
    try {
      return JSON.parse(req.body) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  if (!req.on) return {};
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on?.('data', (chunk) => {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
    });
    req.on?.('end', () => {
      const text = Buffer.concat(chunks).toString('utf8').trim();
      if (!text) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(text) as Record<string, unknown>);
      } catch {
        resolve({});
      }
    });
    req.on?.('error', () => resolve({}));
  });
}

async function dispatchWebhookIfConfigured(params: Record<string, unknown>): Promise<boolean> {
  const globalProc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  const webhookUrl = globalProc?.env?.NOTIFICATION_WEBHOOK_URL;
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

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  const method = (req.method || 'GET').toUpperCase();
  const parsedUrl = new URL(req.url || '/api', 'https://investormeet500.vercel.app');
  const pathname = parsedUrl.pathname.replace(/\/+$/, '') || '/api';
  const subPath = pathname.replace(/^\/api\/?/, '');
  const segments = subPath ? subPath.split('/').filter(Boolean) : [];
  const store = readStore();

  // /api/health
  if (segments[0] === 'health' && method === 'GET') {
    sendJson(res, 200, { ok: true, service: 'investor-meet-500', count: store.registrations.length });
    return;
  }

  // /api/registrations & /api/registrations/:id
  if (segments[0] === 'registrations') {
    const id = segments[1] ? decodeURIComponent(segments[1]) : null;

    if (!id && method === 'GET') {
      const sp = parsedUrl.searchParams;
      const filtered = filterRegistrations(store.registrations, {
        query: sp.get('query') ?? undefined,
        category: sp.get('category') ?? undefined,
        validationStatus: sp.get('validationStatus') ?? undefined,
        paymentStatus: sp.get('paymentStatus') ?? undefined,
        dateFrom: sp.get('dateFrom') ?? undefined,
        dateTo: sp.get('dateTo') ?? undefined,
      });
      const stats = computeRegistrationStats(store.registrations, store.targets);
      sendJson(res, 200, {
        registrations: filtered,
        allCount: store.registrations.length,
        stats,
        targets: store.targets,
      });
      return;
    }

    if (!id && method === 'POST') {
      const body = await readJsonBody(req);
      const created = applyCreateRegistration(store, body);
      if (!created.ok) {
        sendJson(res, 400, { error: created.error, errors: created.errors });
        return;
      }
      const dispatched = await dispatchWebhookIfConfigured(created.notifParams);
      if (dispatched) {
        created.notification.deliveryChannel = 'Webhook Relay';
        created.notification.status = 'Dispatched via Webhook';
      }
      writeStore(store);
      sendJson(res, 201, {
        registration: created.registration,
        notification: created.notification,
      });
      return;
    }

    if (id && method === 'PATCH') {
      const body = await readJsonBody(req);
      const updated = applyPatchRegistration(store, id, body);
      if (!updated) {
        sendJson(res, 404, { error: 'Registration not found' });
        return;
      }
      writeStore(store);
      sendJson(res, 200, { registration: updated });
      return;
    }

    if (id && method === 'DELETE') {
      const removed = applyDeleteRegistration(store, id);
      if (!removed) {
        sendJson(res, 404, { error: 'Registration not found' });
        return;
      }
      writeStore(store);
      sendJson(res, 200, { deleted: id });
      return;
    }
  }

  // /api/notifications
  if (segments[0] === 'notifications' && method === 'GET') {
    sendJson(res, 200, {
      recipient: 'sevenidatamanager@gmail.com',
      notifications: store.notifications,
    });
    return;
  }

  // /api/targets
  if (segments[0] === 'targets' && method === 'PUT') {
    const body = await readJsonBody(req);
    const nextTargets = applyUpdateTargets(store, body);
    writeStore(store);
    sendJson(res, 200, { targets: nextTargets });
    return;
  }

  // /api/calendar-tasks & /api/calendar-tasks/:id
  if (segments[0] === 'calendar-tasks') {
    const id = segments[1] ? decodeURIComponent(segments[1]) : null;
    if (!id && method === 'GET') {
      sendJson(res, 200, { tasks: store.calendarTasks });
      return;
    }
    if (id && method === 'PATCH') {
      const body = await readJsonBody(req);
      const updated = applyPatchCalendarTask(store, id, body);
      if (!updated) {
        sendJson(res, 404, { error: 'Task not found' });
        return;
      }
      writeStore(store);
      sendJson(res, 200, { task: updated });
      return;
    }
  }

  // /api/inquiries & /api/inquiries/:id
  if (segments[0] === 'inquiries') {
    const id = segments[1] ? decodeURIComponent(segments[1]) : null;
    if (!id && method === 'GET') {
      sendJson(res, 200, { inquiries: store.inquiries });
      return;
    }
    if (!id && method === 'POST') {
      const body = await readJsonBody(req);
      const created = applyCreateInquiry(store, body);
      if (!created.ok) {
        sendJson(res, 400, { error: created.error, errors: created.errors });
        return;
      }
      const dispatched = await dispatchWebhookIfConfigured(created.notifParams);
      if (dispatched) {
        created.notification.deliveryChannel = 'Webhook Relay';
        created.notification.status = 'Dispatched via Webhook';
      }
      writeStore(store);
      sendJson(res, 201, { inquiry: created.inquiry, notification: created.notification });
      return;
    }
    if (id && method === 'PATCH') {
      const body = await readJsonBody(req);
      const updated = applyPatchInquiry(
        store,
        id,
        typeof body.status === 'string' ? body.status : undefined
      );
      if (!updated) {
        sendJson(res, 404, { error: 'Inquiry not found' });
        return;
      }
      writeStore(store);
      sendJson(res, 200, { inquiry: updated });
      return;
    }
  }

  sendJson(res, 404, { error: 'API route not found' });
}
