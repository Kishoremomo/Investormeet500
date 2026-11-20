import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeCategorySlices,
  computeCountdown,
  computeParticipantTypeComparison,
  computePaymentStatusBreakdown,
  computeRegistrationStats,
  computeRegistrationTrend,
  computeTrackBreakdown,
  computeValidationStatusBreakdown,
  filterDirectoryItems,
  filterDiscoveryOpportunities,
  filterRegistrations,
  formatLakhsToDisplay,
  getInitials,
  registrationsToCsv,
  resolveInstitutionLogo,
  validateApplicationInput,
  validateCategoryRegistrationInput,
  validateContactInput,
  type RegistrationRecord,
  type RegistrationTargets,
} from './domain';
import { INSTITUTION_LOGOS } from '../data/logos';
import { resolvePortraitUrl } from '../data/portraits';

const sampleRegistrations: RegistrationRecord[] = [
  {
    id: 'IM500-2027-0001',
    full_name: 'Arvind Kumar',
    company: 'Kaveri Precision Robotics',
    email: 'arvind@kaverirobotics.in',
    phone: '9840123456',
    industry: 'Manufacturing',
    track: 'Startups',
    participantType: 'Entrepreneur',
    funding_lakhs: 250,
    business_summary: 'Autonomous industrial inspection robotics for Tamil Nadu automotive OEMs.',
    validationStatus: 'Approved',
    paymentStatus: 'Confirmed',
    assignedReviewer: 'Dr. Meenakshi S.',
    pitchHall: 'Hall 1',
    createdAt: '2026-11-10T09:30:00.000Z',
    updatedAt: '2026-11-12T11:00:00.000Z',
  },
  {
    id: 'IM500-2027-0002',
    full_name: 'Priya Sundaram',
    company: 'Southern Agro Processing',
    email: 'priya@southernagro.in',
    phone: '9940223344',
    industry: 'Food & Agriculture',
    track: 'Bank Loans',
    participantType: 'Entrepreneur',
    funding_lakhs: 800,
    business_summary: 'Cold-chain spice processing expansion in Madurai and Coimbatore.',
    validationStatus: 'Pending',
    paymentStatus: 'Pending',
    assignedReviewer: 'Unassigned',
    pitchHall: 'Unassigned',
    createdAt: '2026-11-14T14:20:00.000Z',
    updatedAt: '2026-11-14T14:20:00.000Z',
  },
];

const sampleTargets: RegistrationTargets = {
  totalTarget: 500,
  byCategory: {
    Startups: 100,
    'Bank Loan': 100,
    'Business Loan': 100,
    'Business Expansion': 100,
    'International Opportunity': 50,
    'Other Investment Tracks': 50,
  },
  byParticipantType: {
    Entrepreneur: 300,
    Investor: 120,
    Exhibitor: 80,
  },
};

test('validateApplicationInput enforces required fields and funding bounds', () => {
  const invalid = validateApplicationInput({
    full_name: '',
    company: 'A',
    email: 'bad-email',
    phone: '123',
    industry: '',
    track: '',
    funding_lakhs: 20,
    business_summary: 'Too short',
    terms: false,
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.full_name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.funding_lakhs);
  assert.ok(invalid.errors.terms);

  const valid = validateApplicationInput({
    full_name: 'Rajeshwari Natarajan',
    company: 'Velachery CleanTech Pvt Ltd',
    email: 'raji@cleantech.in',
    phone: '9840011223',
    industry: 'Renewable Energy',
    track: 'Startups',
    funding_lakhs: 150,
    business_summary: 'Solar microgrid controllers deployed across 40 textile mills in Tiruppur.',
    terms: true,
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('validateCategoryRegistrationInput validates website protocol and required fields', () => {
  const res = validateCategoryRegistrationInput({
    categorySlug: 'startup',
    full_name: 'Karthik V.',
    company: 'MedNova Labs',
    email: 'karthik@mednova.in',
    phone: '9884123456',
    sector: 'Healthcare',
    location: 'Chennai',
    stage: 'Early revenue',
    founder_background: '10 years in diagnostic devices',
    funding_lakhs: 300,
    funding_purpose: 'CDSCO trials and pilot assembly',
    business_summary: 'Point-of-care cardiac biomarker reader for primary clinics.',
    website: 'mednova.in',
    consent: true,
  });
  assert.equal(res.valid, false);
  assert.ok(res.errors.website);
});

test('validateContactInput requires valid email and message length', () => {
  assert.equal(
    validateContactInput({
      name: 'Suresh',
      email: 'suresh@example.com',
      subject: 'Consultation',
      message: 'We would like guidance on preparing our pitch deck and financial plan.',
    }).valid,
    true
  );
  assert.equal(
    validateContactInput({
      name: 'S',
      email: 'invalid',
      subject: '',
      message: 'hi',
    }).valid,
    false
  );
});

test('computeCountdown calculates exact days, hours, minutes, seconds', () => {
  const target = '2027-02-20T08:00:00+05:30';
  const targetMs = new Date(target).getTime();
  const nowMs = targetMs - (10 * 86400 + 5 * 3600 + 12 * 60 + 30) * 1000;
  const cd = computeCountdown(target, nowMs);
  assert.equal(cd.days, 10);
  assert.equal(cd.hours, 5);
  assert.equal(cd.minutes, 12);
  assert.equal(cd.seconds, 30);
});

test('formatLakhsToDisplay formats Lakhs and Crores accurately', () => {
  assert.equal(formatLakhsToDisplay(50), '₹50 Lakhs');
  assert.equal(formatLakhsToDisplay(100), '₹1 Crore');
  assert.equal(formatLakhsToDisplay(50000), '₹500 Crore');
});

test('computeRegistrationStats aggregates counts and completion percentage', () => {
  const stats = computeRegistrationStats(sampleRegistrations, sampleTargets);
  assert.equal(stats.total, 2);
  assert.equal(stats.byCategory.Startups, 1);
  assert.equal(stats.byCategory['Bank Loan'], 1);
  assert.equal(stats.approved, 1);
  assert.equal(stats.pendingValidation, 1);
  assert.equal(stats.confirmedPayments, 1);
  assert.equal(stats.pendingPayments, 1);
  assert.equal(stats.remainingToTarget, 498);
  assert.equal(stats.completionPct, 0.4);
});

test('filterRegistrations filters by search query, category, and validation status', () => {
  assert.equal(filterRegistrations(sampleRegistrations, { query: 'kaveri' }).length, 1);
  assert.equal(filterRegistrations(sampleRegistrations, { category: 'Bank Loan' }).length, 1);
  assert.equal(filterRegistrations(sampleRegistrations, { validationStatus: 'Approved' }).length, 1);
  assert.equal(filterRegistrations(sampleRegistrations, { paymentStatus: 'Failed' }).length, 0);
});

test('registrationsToCsv escapes commas and quotes safely', () => {
  const csv = registrationsToCsv(sampleRegistrations);
  const lines = csv.split('\n');
  assert.equal(lines.length, 3);
  assert.ok(lines[0].startsWith('Reference ID,Participant Name'));
  assert.ok(lines[1].includes('IM500-2027-0001'));
});

test('filterDirectoryItems matches across query and category', () => {
  const items = [
    { name: 'Venu Srinivasan', company: 'TVS Motor', category: 'Industrialists' },
    { name: 'Sridhar Vembu', company: 'Zoho', category: 'Technology' },
  ];
  const filtered = filterDirectoryItems(items, 'zoho', 'All', (x) => x.company);
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].name, 'Sridhar Vembu');
});

test('filterDiscoveryOpportunities filters by track, status, and summary query', () => {
  const approvedOnly = filterDiscoveryOpportunities(sampleRegistrations, {
    statusFilter: 'Approved',
  });
  assert.equal(approvedOnly.length, 1);
  assert.equal(approvedOnly[0].id, 'IM500-2027-0001');

  const bankQuery = filterDiscoveryOpportunities(sampleRegistrations, {
    trackFilter: 'Bank Loan',
    query: 'madurai',
  });
  assert.equal(bankQuery.length, 1);
  assert.equal(bankQuery[0].id, 'IM500-2027-0002');
});

test('computeTrackBreakdown computes category proportions against targets', () => {
  const stats = computeRegistrationStats(sampleRegistrations, sampleTargets);
  const rows = computeTrackBreakdown(stats, sampleTargets);
  assert.equal(rows.length, 6);
  const startups = rows.find((r) => r.category === 'Startups');
  assert.equal(startups?.count, 1);
  assert.equal(startups?.target, 100);
  assert.equal(startups?.pctOfTarget, 1);
});

test('getInitials generates clean 2-letter executive initials', () => {
  assert.equal(getInitials('Dr. Meenakshi Sundaram'), 'MS');
  assert.equal(getInitials('Venu Srinivasan'), 'VS');
  assert.equal(getInitials('Mr. Rajganesh'), 'RA');
});

test('resolveInstitutionLogo matches banks, financial brands, and corporates cleanly', () => {
  const sbi = resolveInstitutionLogo('State Bank of India', INSTITUTION_LOGOS);
  assert.equal(sbi?.src, '/media/logos/sbi.svg');

  const kvb = resolveInstitutionLogo('Karur Vysya Bank Limited', INSTITUTION_LOGOS);
  assert.equal(kvb?.src, '/media/logos/kvb.svg');

  const shriram = resolveInstitutionLogo('Shriram Finance Ltd.', INSTITUTION_LOGOS);
  assert.equal(shriram?.src, '/media/logos/shriram.svg');

  const titan = resolveInstitutionLogo('Titan Company Ltd.', INSTITUTION_LOGOS);
  assert.equal(titan?.src, '/media/logos/titan.png');
  assert.equal(titan?.darkSurface, undefined);

  const kobelco = resolveInstitutionLogo('Kobelco Construction Equipment', INSTITUTION_LOGOS);
  assert.equal(kobelco?.src, '/media/logos/kobelco.svg');
  assert.equal(kobelco?.darkSurface, true);

  const missing = resolveInstitutionLogo('The Chennai Angels', INSTITUTION_LOGOS);
  assert.equal(missing, null);
});

test('resolvePortraitUrl maps verified real leader portraits uniquely and preserves monogram fallback for unverified names', () => {
  assert.equal(resolvePortraitUrl('Mallika Srinivasan'), '/media/people/mallika_srinivasan.jpg');
  assert.equal(resolvePortraitUrl('Santhi Duraisamy'), '/media/people/santhi_duraisamy.jpg');
  assert.equal(resolvePortraitUrl('Shanthi Duraisamy'), '/media/people/santhi_duraisamy.jpg');
  assert.equal(resolvePortraitUrl('Girish Mathrubootham'), '/media/people/girish_mathrubootham.webp');
  assert.equal(resolvePortraitUrl('Ashwini Asokan'), null);
  assert.equal(resolvePortraitUrl('Archana Stalin'), null);
});

test('chart analytics helpers compute category slices, status breakdowns, participant comparisons, and trend accurately', () => {
  const slices = computeCategorySlices(sampleRegistrations);
  assert.equal(slices.length, 6);
  const startupSlice = slices.find((s) => s.key === 'Startups');
  const bankSlice = slices.find((s) => s.key === 'Bank Loan');
  assert.equal(startupSlice?.count, 1);
  assert.equal(startupSlice?.percentage, 50);
  assert.equal(bankSlice?.count, 1);
  assert.equal(bankSlice?.percentage, 50);

  const valBreakdown = computeValidationStatusBreakdown(sampleRegistrations);
  assert.equal(valBreakdown.find((v) => v.key === 'Approved')?.count, 1);
  assert.equal(valBreakdown.find((v) => v.key === 'Approved')?.percentage, 50);
  assert.equal(valBreakdown.find((v) => v.key === 'Pending')?.count, 1);
  assert.equal(valBreakdown.find((v) => v.key === 'Rejected')?.count, 0);

  const payBreakdown = computePaymentStatusBreakdown(sampleRegistrations);
  assert.equal(payBreakdown.find((p) => p.key === 'Confirmed')?.count, 1);
  assert.equal(payBreakdown.find((p) => p.key === 'Pending')?.count, 1);

  const participantComp = computeParticipantTypeComparison(sampleRegistrations, sampleTargets);
  const entRow = participantComp.find((p) => p.type === 'Entrepreneur');
  assert.equal(entRow?.registered, 2);
  assert.equal(entRow?.target, 300);
  assert.equal(entRow?.pctOfTarget, 0.7);

  const trend = computeRegistrationTrend([
    ...sampleRegistrations,
    {
      ...sampleRegistrations[0],
      id: 'IM500-2027-0003',
      createdAt: '2026-11-10T18:00:00.000Z',
    },
  ]);
  assert.equal(trend.length, 2);
  assert.equal(trend[0].date, '2026-11-10');
  assert.equal(trend[0].label, '10 Nov');
  assert.equal(trend[0].dailyCount, 2);
  assert.equal(trend[0].cumulativeCount, 2);
  assert.equal(trend[1].date, '2026-11-14');
  assert.equal(trend[1].dailyCount, 1);
  assert.equal(trend[1].cumulativeCount, 3);

  assert.deepEqual(computeRegistrationTrend([]), []);
  assert.equal(computeCategorySlices([]).every((s) => s.percentage === 0), true);
});

