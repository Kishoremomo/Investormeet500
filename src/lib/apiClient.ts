import {
  computeRegistrationStats,
  filterRegistrations,
  type CalendarTask,
  type InquiryRecord,
  type NotificationLogEntry,
  type RegistrationFilterParams,
  type RegistrationRecord,
  type RegistrationStats,
  type RegistrationTargets,
} from './domain';
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
} from './seedData';

const STORAGE_KEY = 'im500_local_store_v1';

export class ApiClientError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(message: string, status = 400, errors?: Record<string, string>) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.errors = errors;
  }
}

export interface RegistrationsResponse {
  registrations: RegistrationRecord[];
  allCount: number;
  stats: RegistrationStats;
  targets: RegistrationTargets;
}

export interface NotificationsResponse {
  recipient: string;
  notifications: NotificationLogEntry[];
}

export interface CreateRegistrationResponse {
  registration: RegistrationRecord;
  notification: NotificationLogEntry;
}

export interface CreateInquiryResponse {
  inquiry: InquiryRecord;
  notification: NotificationLogEntry;
}

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

let useLocalFallback = false;
let memoryFallbackStore: StoreSchema | null = null;
let cachedRegistrationsSnapshot: RegistrationsResponse | null = null;
let inFlightRegistrationsFetch: Promise<RegistrationsResponse> | null = null;

function getStorage(): StorageLike | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    return null;
  }
  return null;
}

function readLocalStore(storage?: StorageLike | null): StoreSchema {
  if (memoryFallbackStore) return memoryFallbackStore;
  const targetStorage = storage === undefined ? getStorage() : storage;
  if (targetStorage) {
    try {
      const raw = targetStorage.getItem(STORAGE_KEY);
      if (raw) {
        const normalized = normalizeStoreShape(JSON.parse(raw) as Partial<StoreSchema>);
        memoryFallbackStore = normalized;
        return normalized;
      }
    } catch {
      // Ignore corrupt local storage and reseed
    }
  }
  const initial = createInitialStore();
  memoryFallbackStore = initial;
  writeLocalStore(initial, targetStorage);
  return initial;
}

function writeLocalStore(store: StoreSchema, storage?: StorageLike | null): void {
  memoryFallbackStore = store;
  const targetStorage = storage === undefined ? getStorage() : storage;
  if (targetStorage) {
    try {
      targetStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // Ignore quota errors
    }
  }
}

export function resetApiClientStateForTests(): void {
  useLocalFallback = false;
  memoryFallbackStore = null;
  cachedRegistrationsSnapshot = null;
  inFlightRegistrationsFetch = null;
}

export function isStaticFallbackActive(): boolean {
  return useLocalFallback;
}

async function tryApiJson<T>(url: string, init?: RequestInit): Promise<{ ok: true; data: T } | { ok: false; shouldFallback: boolean; status: number; payload?: Record<string, unknown> }> {
  if (useLocalFallback) {
    return { ok: false, shouldFallback: true, status: 404 };
  }
  try {
    const res = await fetch(url, init);
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    // Static hosting (e.g. Vercel without serverless functions or SPA rewrite returning HTML) returns 404 or text/html
    if (res.status === 404 || res.status === 405 || !isJson) {
      if (res.status !== 404 || !isJson) {
        useLocalFallback = true;
        return { ok: false, shouldFallback: true, status: res.status };
      }
      // Check if JSON 404 is from a real API endpoint for a missing resource vs platform 404
      try {
        const errBody = (await res.json()) as Record<string, unknown>;
        if (errBody && typeof errBody.error === 'string' && !String(errBody.error).includes('NOT_FOUND')) {
          return { ok: false, shouldFallback: false, status: res.status, payload: errBody };
        }
      } catch {
        // Fall back if unparseable
      }
      useLocalFallback = true;
      return { ok: false, shouldFallback: true, status: res.status };
    }

    const payload = (await res.json()) as T & Record<string, unknown>;
    if (!res.ok) {
      return { ok: false, shouldFallback: false, status: res.status, payload };
    }
    return { ok: true, data: payload };
  } catch {
    useLocalFallback = true;
    return { ok: false, shouldFallback: true, status: 0 };
  }
}

export async function fetchRegistrations(
  filters: RegistrationFilterParams = {}
): Promise<RegistrationsResponse> {
  const params = new URLSearchParams();
  if (filters.query?.trim()) params.set('query', filters.query.trim());
  if (filters.category && filters.category !== 'All categories') params.set('category', filters.category);
  if (filters.validationStatus && filters.validationStatus !== 'All statuses') {
    params.set('validationStatus', filters.validationStatus);
  }
  if (filters.paymentStatus && filters.paymentStatus !== 'All payments') {
    params.set('paymentStatus', filters.paymentStatus);
  }
  if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
  if (filters.dateTo) params.set('dateTo', filters.dateTo);

  const qs = params.toString();
  const isUnfiltered = qs.length === 0;

  if (isUnfiltered && cachedRegistrationsSnapshot) {
    return cachedRegistrationsSnapshot;
  }
  if (isUnfiltered && inFlightRegistrationsFetch) {
    return inFlightRegistrationsFetch;
  }

  const run = async (): Promise<RegistrationsResponse> => {
    const url = qs ? `/api/registrations?${qs}` : '/api/registrations';
    const remote = await tryApiJson<RegistrationsResponse>(url);
    if (remote.ok) {
      if (isUnfiltered) cachedRegistrationsSnapshot = remote.data;
      return remote.data;
    }
    if (!remote.shouldFallback) {
      throw new ApiClientError(
        String(remote.payload?.error || 'Failed to load registrations'),
        remote.status
      );
    }
    const store = readLocalStore();
    const filtered = filterRegistrations(store.registrations, filters);
    const stats = computeRegistrationStats(store.registrations, store.targets);
    const result: RegistrationsResponse = {
      registrations: filtered,
      allCount: store.registrations.length,
      stats,
      targets: store.targets,
    };
    if (isUnfiltered) cachedRegistrationsSnapshot = result;
    return result;
  };

  if (isUnfiltered) {
    inFlightRegistrationsFetch = run().finally(() => {
      inFlightRegistrationsFetch = null;
    });
    return inFlightRegistrationsFetch;
  }
  return run();
}

export async function fetchNotifications(): Promise<NotificationsResponse> {
  const remote = await tryApiJson<NotificationsResponse>('/api/notifications');
  if (remote.ok) return remote.data;
  if (!remote.shouldFallback) {
    throw new ApiClientError('Failed to load notifications', remote.status);
  }
  const store = readLocalStore();
  return {
    recipient: 'sevenidatamanager@gmail.com',
    notifications: store.notifications,
  };
}

export async function createRegistration(
  payload: Record<string, unknown>
): Promise<CreateRegistrationResponse> {
  cachedRegistrationsSnapshot = null;
  const remote = await tryApiJson<CreateRegistrationResponse>('/api/registrations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (remote.ok) return remote.data;
  if (!remote.shouldFallback) {
    throw new ApiClientError(
      String(remote.payload?.error || 'Unable to submit registration.'),
      remote.status,
      remote.payload?.errors as Record<string, string> | undefined
    );
  }

  const store = readLocalStore();
  const res = applyCreateRegistration(store, payload);
  if (!res.ok) {
    throw new ApiClientError(res.error, res.status, res.errors);
  }
  writeLocalStore(store);
  return { registration: res.registration, notification: res.notification };
}

export async function updateRegistration(
  id: string,
  patch: Record<string, unknown>
): Promise<{ registration: RegistrationRecord }> {
  cachedRegistrationsSnapshot = null;
  const remote = await tryApiJson<{ registration: RegistrationRecord }>(
    `/api/registrations/${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    }
  );
  if (remote.ok) return remote.data;
  if (!remote.shouldFallback) {
    throw new ApiClientError(
      String(remote.payload?.error || 'Failed to update registration record.'),
      remote.status
    );
  }

  const store = readLocalStore();
  const updated = applyPatchRegistration(store, id, patch);
  if (!updated) {
    throw new ApiClientError('Registration not found', 404);
  }
  writeLocalStore(store);
  return { registration: updated };
}

export async function deleteRegistration(id: string): Promise<{ deleted: string }> {
  cachedRegistrationsSnapshot = null;
  const remote = await tryApiJson<{ deleted: string }>(
    `/api/registrations/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    }
  );
  if (remote.ok) return remote.data;
  if (!remote.shouldFallback) {
    throw new ApiClientError(
      String(remote.payload?.error || 'Failed to remove record.'),
      remote.status
    );
  }

  const store = readLocalStore();
  const removed = applyDeleteRegistration(store, id);
  if (!removed) {
    throw new ApiClientError('Registration not found', 404);
  }
  writeLocalStore(store);
  return { deleted: id };
}

export async function updateTargets(
  targets: RegistrationTargets
): Promise<{ targets: RegistrationTargets }> {
  cachedRegistrationsSnapshot = null;
  const remote = await tryApiJson<{ targets: RegistrationTargets }>('/api/targets', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(targets),
  });
  if (remote.ok) return remote.data;
  if (!remote.shouldFallback) {
    throw new ApiClientError(
      String(remote.payload?.error || 'Unable to save target settings.'),
      remote.status
    );
  }

  const store = readLocalStore();
  const next = applyUpdateTargets(store, targets as unknown as Record<string, unknown>);
  writeLocalStore(store);
  return { targets: next };
}

export async function fetchCalendarTasks(): Promise<{ tasks: CalendarTask[] }> {
  const remote = await tryApiJson<{ tasks: CalendarTask[] }>('/api/calendar-tasks');
  if (remote.ok) return remote.data;
  if (!remote.shouldFallback) {
    throw new ApiClientError('Failed to load calendar tasks', remote.status);
  }
  const store = readLocalStore();
  return { tasks: store.calendarTasks };
}

export async function updateCalendarTask(
  id: string,
  patch: Partial<CalendarTask>
): Promise<{ task: CalendarTask }> {
  const remote = await tryApiJson<{ task: CalendarTask }>(
    `/api/calendar-tasks/${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    }
  );
  if (remote.ok) return remote.data;
  if (!remote.shouldFallback) {
    throw new ApiClientError(
      String(remote.payload?.error || 'Failed to update task.'),
      remote.status
    );
  }

  const store = readLocalStore();
  const updated = applyPatchCalendarTask(store, id, patch as Record<string, unknown>);
  if (!updated) {
    throw new ApiClientError('Task not found', 404);
  }
  writeLocalStore(store);
  return { task: updated };
}

export async function createInquiry(
  payload: { name: string; email: string; subject: string; message: string }
): Promise<CreateInquiryResponse> {
  const remote = await tryApiJson<CreateInquiryResponse>('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (remote.ok) return remote.data;
  if (!remote.shouldFallback) {
    throw new ApiClientError(
      String(remote.payload?.error || 'Could not submit inquiry.'),
      remote.status,
      remote.payload?.errors as Record<string, string> | undefined
    );
  }

  const store = readLocalStore();
  const res = applyCreateInquiry(store, payload);
  if (!res.ok) {
    throw new ApiClientError(res.error, res.status, res.errors);
  }
  writeLocalStore(store);
  return { inquiry: res.inquiry, notification: res.notification };
}

export async function patchInquiry(
  id: string,
  status: InquiryRecord['status']
): Promise<{ inquiry: InquiryRecord }> {
  const remote = await tryApiJson<{ inquiry: InquiryRecord }>(
    `/api/inquiries/${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }
  );
  if (remote.ok) return remote.data;
  if (!remote.shouldFallback) {
    throw new ApiClientError('Failed to update inquiry.', remote.status);
  }

  const store = readLocalStore();
  const updated = applyPatchInquiry(store, id, status);
  if (!updated) {
    throw new ApiClientError('Inquiry not found', 404);
  }
  writeLocalStore(store);
  return { inquiry: updated };
}
