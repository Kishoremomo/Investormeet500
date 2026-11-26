import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_TARGETS,
  SEED_CALENDAR_TASKS,
  SEED_INQUIRIES,
  SEED_NOTIFICATIONS,
  SEED_REGISTRATIONS,
  applyCreateInquiry,
  applyCreateRegistration,
  applyDeleteRegistration,
  applyPatchCalendarTask,
  applyPatchRegistration,
  applyUpdateTargets,
  createInitialStore,
  mapCategorySlugToTrackAndType,
} from './seedData';
import {
  createInquiry,
  createRegistration,
  fetchCalendarTasks,
  fetchNotifications,
  fetchRegistrations,
  isStaticFallbackActive,
  resetApiClientStateForTests,
} from './apiClient';

test('seedData maintains complete seeded operational baseline', () => {
  assert.equal(DEFAULT_TARGETS.totalTarget, 500);
  assert.equal(SEED_REGISTRATIONS.length, 8);
  assert.equal(SEED_CALENDAR_TASKS.length, 39);
  assert.equal(SEED_INQUIRIES.length, 1);
  assert.equal(SEED_NOTIFICATIONS.length, 2);

  const categories = new Set(SEED_CALENDAR_TASKS.map((t) => t.category));
  assert.equal(categories.size, 6);
});

test('mapCategorySlugToTrackAndType maps category slugs accurately', () => {
  assert.deepEqual(mapCategorySlugToTrackAndType('startup'), {
    track: 'Startups',
    participantType: 'Entrepreneur',
  });
  assert.deepEqual(mapCategorySlugToTrackAndType('bank-loan'), {
    track: 'Bank Loans',
    participantType: 'Entrepreneur',
  });
  assert.deepEqual(mapCategorySlugToTrackAndType('international'), {
    track: 'International Opportunity',
    participantType: 'Investor',
  });
});

test('store mutation helpers create, update, and delete records cleanly', () => {
  const store = createInitialStore();
  const created = applyCreateRegistration(store, {
    full_name: 'Meera Krishnan',
    company: 'Chennai Photonics Labs',
    email: 'meera@chennaiphotonics.in',
    phone: '9840011223',
    industry: 'Deep Tech',
    track: 'Startups',
    funding_lakhs: 320,
    business_summary: 'Silicon photonics optical interconnects for regional data centers.',
    terms: true,
  });
  assert.equal(created.ok, true);
  if (!created.ok) return;
  assert.equal(store.registrations.length, 9);
  assert.equal(created.registration.id, 'IM500-2027-0109');

  const patched = applyPatchRegistration(store, created.registration.id, {
    validationStatus: 'Approved',
    paymentStatus: 'Confirmed',
    pitchHall: 'Hall 2',
  });
  assert.ok(patched);
  assert.equal(patched.validationStatus, 'Approved');
  assert.equal(patched.pitchHall, 'Hall 2');

  const taskPatched = applyPatchCalendarTask(store, 'T01', { progress: 85, status: 'In progress' });
  assert.ok(taskPatched);
  assert.equal(taskPatched.progress, 85);

  const inq = applyCreateInquiry(store, {
    name: 'Karthik Subramanian',
    email: 'karthik@example.in',
    subject: 'Consultation',
    message: 'Requesting pre-summit validation deck review for Madurai SME.',
  });
  assert.equal(inq.ok, true);
  assert.equal(store.inquiries.length, 2);

  const targets = applyUpdateTargets(store, { totalTarget: 550 });
  assert.equal(targets.totalTarget, 550);

  const removed = applyDeleteRegistration(store, created.registration.id);
  assert.equal(removed, true);
  assert.equal(store.registrations.length, 8);
});

test('apiClient recovers cleanly into static fallback when backend returns 404 HTML', async () => {
  resetApiClientStateForTests();
  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;

  globalThis.fetch = (async () => {
    fetchCalls += 1;
    return new Response('<!doctype html><html><body>Not Found</body></html>', {
      status: 404,
      headers: { 'Content-Type': 'text/html' },
    });
  }) as typeof fetch;

  try {
    const regData = await fetchRegistrations();
    assert.equal(isStaticFallbackActive(), true);
    assert.equal(regData.allCount, 8);
    assert.equal(regData.registrations.length, 8);

    const calData = await fetchCalendarTasks();
    assert.equal(calData.tasks.length, 39);

    const notifData = await fetchNotifications();
    assert.equal(notifData.notifications.length, 2);

    const createdReg = await createRegistration({
      full_name: 'Suresh Narayanan',
      company: 'Kovai Precision Tools',
      email: 'suresh@kovaiprecision.in',
      phone: '9842200112',
      industry: 'Manufacturing',
      track: 'Business Expansion',
      funding_lakhs: 500,
      business_summary: 'Automated CNC precision tooling expansion serving EV tier-1 OEMs.',
      terms: true,
    });
    assert.equal(createdReg.registration.company, 'Kovai Precision Tools');

    const afterCreate = await fetchRegistrations();
    assert.equal(afterCreate.allCount, 9);

    const createdInq = await createInquiry({
      name: 'Revathi Balasubramanian',
      email: 'revathi@example.in',
      subject: 'Sponsorship',
      message: 'Enquiring about Associate Sponsor booth availability for Hall 2.',
    });
    assert.equal(createdInq.inquiry.name, 'Revathi Balasubramanian');

    // Only the very first probe hits fetch; subsequent calls short-circuit cleanly
    assert.equal(fetchCalls, 1);
  } finally {
    globalThis.fetch = originalFetch;
    resetApiClientStateForTests();
  }
});
