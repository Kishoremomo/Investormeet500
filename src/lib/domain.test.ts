import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  EVENT_DATE_CODE,
  ORGANISER_NOTIFICATION_EMAIL,
  REGISTRATION_CUTOFF_DATE_CODE,
  REGISTRATION_STRATEGY,
  computeCategorySlices,
  computeCountdown,
  computeParticipantStatusStackedRows,
  computeParticipantTypeComparison,
  computePaymentStatusBreakdown,
  computeRegistrationStats,
  computeRegistrationTrend,
  computeTrackBreakdown,
  computeTrackStatusStackedRows,
  computeValidationStatusBreakdown,
  createNotificationEntry,
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
import { FEATURED_SHOWCASE_BANKS, INSTITUTION_LOGOS } from '../data/logos';
import {
  ALL_DIRECTORY_ENTREPRENEURS,
  ASSOCIATIONS_15,
  BANKS_120,
  ENTREPRENEURS_100,
  FEATURED_25_BRANDS,
  FINANCIAL_BRANDS_50,
  FINANCIAL_BRAND_CATEGORY_NOTES,
  WOMEN_ENTREPRENEURS,
} from '../data/directories';
import {
  VERIFIED_LEADER_PORTRAIT_BY_NAME,
  resolvePortraitObjectPositionClass,
  resolvePortraitUrl,
} from '../data/portraits';
import {
  CENTRAL_GOVT_RESOURCES,
  EVENT_TEAMS,
  MANDATORY_REGISTRATION_POLICY,
  NINETY_DAY_POLICY_GROUPS,
  PAYMENT_OPTIONS,
  STATE_GOVT_RESOURCES,
} from '../data/homeAndPrograms';
import { HEADER_DROPDOWNS, QUICK_LINKS } from '../data/siteNavigation';

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
  assert.equal(
    resolvePortraitUrl('Sridhar Vembu'),
    '/assets/aistudio/039_Sridhar_Vembu_Zoho_faee8861.jpg'
  );
  assert.equal(resolvePortraitUrl('Ashwini Asokan'), null);
  assert.equal(resolvePortraitUrl('Archana Stalin'), null);

  // Verify newly integrated entrepreneur portraits
  assert.equal(
    resolvePortraitUrl('Gopal Srinivasan'),
    '/assets/aistudio/005_Gopal_Srinivasan_TVS_Capital_Funds_9040fd44.jpg'
  );
  assert.equal(
    resolvePortraitUrl('Aravind Srinivas'),
    '/assets/aistudio/050_Aravind_Srinivas_Perplexity_AI_9c8f91f7.jpg'
  );
  assert.equal(
    resolvePortraitUrl('N. Chandrasekaran'),
    '/assets/aistudio/056_N_Chandrasekaran_Tata_Group_81018af4.jpg'
  );
  assert.equal(
    resolvePortraitUrl('Roshni Nadar Malhotra'),
    '/assets/aistudio/135_Roshni_Nadar_Malhotra_HCL_04bdb757.jpg'
  );
  assert.equal(
    resolvePortraitUrl('S. D. Shibulal'),
    '/assets/aistudio/059_D_S_Ravishankar_Brickwork_Ratings_68cb66c4.jpg'
  );
  assert.equal(resolvePortraitUrl('D. S. Ravishankar'), null);

  // Ensure every mapped file exists on disk under public/ and reject mismatched/duplicate files
  const rejectedPrefixes = [
    '007_',
    '020_',
    '034_',
    '051_',
    '052_',
    '061_',
    '062_',
    '064_',
    '069_',
    '075_',
    '077_',
    '092_',
    '093_',
    '098_',
    '100_',
    '105_',
    '109_',
    '110_',
    '111_',
    '119_',
    '120_',
    '123_',
    '125_',
    '128_',
    '129_',
    '131_',
    '132_',
    '133_',
    '134_',
  ];
  const seenSrcToNames = new Map<string, string[]>();
  for (const [leaderName, portraitPath] of Object.entries(VERIFIED_LEADER_PORTRAIT_BY_NAME)) {
    const absPath = path.join(process.cwd(), 'public', portraitPath.replace(/^\/+/, ''));
    assert.ok(fs.existsSync(absPath), `Missing portrait file on disk: ${portraitPath}`);
    for (const bad of rejectedPrefixes) {
      assert.equal(
        portraitPath.includes(`/${bad}`),
        false,
        `Rejected portrait asset (${bad}) must not be mapped (${leaderName})`
      );
    }
    const group = seenSrcToNames.get(portraitPath) ?? [];
    group.push(leaderName);
    seenSrcToNames.set(portraitPath, group);
  }
  for (const [src, names] of seenSrcToNames.entries()) {
    if (names.length > 1) {
      const normalizedSet = new Set(
        names.map((n) =>
          n === 'Shanthi Duraisamy'
            ? 'Santhi Duraisamy'
            : n === 'P. C. Reddy'
            ? 'Prathap C. Reddy'
            : n
        )
      );
      assert.equal(
        normalizedSet.size,
        1,
        `Duplicate portrait asset ${src} shared by distinct leaders: ${names.join(', ')}`
      );
    }
  }

  // Verify custom object-position focus class for off-center landscape portraits
  assert.equal(
    resolvePortraitObjectPositionClass(
      '/assets/aistudio/074_Agnishwar_Jayaprakash_Garuda_Aerospace_236307b0.jpg'
    ),
    'object-[4%_6%]'
  );
  assert.equal(resolvePortraitObjectPositionClass('/media/people/mallika_srinivasan.jpg'), 'object-top');
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

  const stackedTracks = computeTrackStatusStackedRows(sampleRegistrations, sampleTargets);
  const stRow = stackedTracks.find((r) => r.key === 'Startups');
  const bkRow = stackedTracks.find((r) => r.key === 'Bank Loan');
  assert.equal(stRow?.approved, 1);
  assert.equal(stRow?.count, 1);
  assert.equal(bkRow?.pending, 1);
  assert.equal(bkRow?.count, 1);

  const stackedRoles = computeParticipantStatusStackedRows(sampleRegistrations, sampleTargets);
  const entStacked = stackedRoles.find((r) => r.key === 'Entrepreneur');
  assert.equal(entStacked?.count, 2);
  assert.equal(entStacked?.approved, 1);
  assert.equal(entStacked?.pending, 1);
  assert.equal(
    (entStacked?.approved ?? 0) +
      (entStacked?.underReview ?? 0) +
      (entStacked?.pending ?? 0) +
      (entStacked?.rejected ?? 0),
    entStacked?.count
  );
});

test('42-point compliance: 9 payment options have 5 points, 5 teams have 5 member slots, and notifications target sevenidatamanager@gmail.com', () => {
  assert.equal(PAYMENT_OPTIONS.length, 9);
  for (const option of PAYMENT_OPTIONS) {
    assert.equal(option.points.length, 5, `${option.tierLabel} should have exactly 5 points`);
  }

  assert.equal(EVENT_TEAMS.length, 5);
  for (const team of EVENT_TEAMS) {
    assert.equal(team.members.length, 5, `${team.title} should have 5 member slots`);
  }

  assert.equal(ORGANISER_NOTIFICATION_EMAIL, 'sevenidatamanager@gmail.com');
  assert.equal(REGISTRATION_STRATEGY, 'Available slots only');
  assert.equal(REGISTRATION_CUTOFF_DATE_CODE, '01-02-2027');
  assert.equal(EVENT_DATE_CODE, '20-02-2027');

  const notif = createNotificationEntry({
    id: 'NTF-TEST-01',
    eventType: 'Registration Submitted',
    referenceId: 'IM500-2027-0099',
    applicantName: 'Karthik Subramanian',
    companyOrSubject: 'Kaveri Mobility',
    trackOrCategory: 'Startups',
    summary: 'Seed round application',
    createdAt: '2026-11-23T10:00:00.000Z',
  });
  assert.equal(notif.recipient, 'sevenidatamanager@gmail.com');
  assert.equal(notif.deliveryChannel, 'Notification Outbox');
});

test('all 10 Govt agencies, 25 Featured Brands, scheduled banks, and Chief Guest routes resolve cleanly', () => {
  for (const agency of [...CENTRAL_GOVT_RESOURCES, ...STATE_GOVT_RESOURCES]) {
    const logo = resolveInstitutionLogo(agency.name, INSTITUTION_LOGOS);
    assert.ok(logo && logo.src.endsWith('.svg'), `Missing SVG logo for govt agency: ${agency.name}`);
  }

  assert.equal(FEATURED_25_BRANDS.length, 25);
  for (const brand of FEATURED_25_BRANDS) {
    const logo = resolveInstitutionLogo(brand, INSTITUTION_LOGOS);
    assert.ok(logo && logo.src.length > 0, `Missing logo for Featured Brand: ${brand}`);
  }

  const nonRrbNonForeignBanks = BANKS_120.filter(
    (b) => b.category !== 'Regional Rural Banks' && b.category !== 'Foreign banks in India'
  );
  for (const bank of nonRrbNonForeignBanks) {
    const logo = resolveInstitutionLogo(bank.name, INSTITUTION_LOGOS);
    assert.ok(logo && logo.src.length > 0, `Missing logo for scheduled bank: ${bank.name}`);
  }

  for (const q of QUICK_LINKS) {
    assert.equal(q.href.startsWith('/speakers'), false, `Legacy /speakers link found in QUICK_LINKS: ${q.href}`);
  }
  for (const nav of HEADER_DROPDOWNS) {
    for (const item of nav.items) {
      assert.equal(item.href.startsWith('/speakers'), false, `Legacy /speakers link found in HEADER_DROPDOWNS: ${item.href}`);
    }
  }
});

test('deduplicated entrepreneur directories, Women Entrepreneurs 16-20, 90-day policy, and associations compliance', () => {
  assert.equal(ENTREPRENEURS_100.length, 100);
  const lowerNames = ALL_DIRECTORY_ENTREPRENEURS.map((e) => e.name.toLowerCase().trim());
  assert.equal(new Set(lowerNames).size, lowerNames.length, 'ALL_DIRECTORY_ENTREPRENEURS must contain zero duplicate names');
  assert.ok(ALL_DIRECTORY_ENTREPRENEURS.length > 130);
  assert.ok(ALL_DIRECTORY_ENTREPRENEURS.some((e) => e.name === 'Aravind Srinivas' && e.company === 'Perplexity AI'));
  assert.ok(ALL_DIRECTORY_ENTREPRENEURS.some((e) => e.name === 'N. Chandrasekaran' && e.company === 'Tata Group'));

  assert.equal(WOMEN_ENTREPRENEURS.length, 19);
  assert.equal(WOMEN_ENTREPRENEURS.find((w) => w.serial === '18')?.company, 'FlexaLimb');
  assert.equal(WOMEN_ENTREPRENEURS.find((w) => w.serial === '19')?.company, 'BGR NEO');
  assert.equal(WOMEN_ENTREPRENEURS.find((w) => w.serial === '20')?.company, 'Bunjy');

  assert.equal(ASSOCIATIONS_15.find((a) => a.no === 14)?.focus, 'Corporate & Manufacturing');
  assert.equal(ASSOCIATIONS_15.find((a) => a.no === 15)?.focus, 'Trade, Industry & Entrepreneurs');

  assert.equal(NINETY_DAY_POLICY_GROUPS.flatMap((g) => g.items).length, 20);
  assert.equal(MANDATORY_REGISTRATION_POLICY.rules.length, 4);
  assert.equal(MANDATORY_REGISTRATION_POLICY.objectiveSteps.length, 4);
  assert.ok(FINANCIAL_BRAND_CATEGORY_NOTES.priorityStartupNote.includes('Chennai Angels'));
  assert.ok(FINANCIAL_BRAND_CATEGORY_NOTES.priorityStartupNote.includes('Nativelead Foundation'));
});

test('featured bank showcase, RBI banks, and financial brand logos resolve to real files on disk', () => {
  assert.equal(FEATURED_SHOWCASE_BANKS.length, 20);
  for (const bankName of FEATURED_SHOWCASE_BANKS) {
    const logo = resolveInstitutionLogo(bankName, INSTITUTION_LOGOS);
    assert.ok(logo && logo.src.length > 0, `Missing logo for FEATURED_SHOWCASE_BANKS: ${bankName}`);
    const absPath = path.join(process.cwd(), 'public', logo.src.replace(/^\/+/, ''));
    assert.ok(fs.existsSync(absPath), `Missing bank logo file on disk: ${logo.src}`);
  }

  const matchedBanks = BANKS_120.filter((b) => resolveInstitutionLogo(b.name, INSTITUTION_LOGOS));
  assert.equal(matchedBanks.length, 65);
  for (const bank of matchedBanks) {
    const logo = resolveInstitutionLogo(bank.name, INSTITUTION_LOGOS)!;
    const absPath = path.join(process.cwd(), 'public', logo.src.replace(/^\/+/, ''));
    assert.ok(fs.existsSync(absPath), `Missing bank logo file on disk: ${logo.src}`);
  }

  const matchedBrands = FINANCIAL_BRANDS_50.filter((b) => resolveInstitutionLogo(b.name, INSTITUTION_LOGOS));
  assert.equal(matchedBrands.length, 23);
  for (const brand of matchedBrands) {
    const logo = resolveInstitutionLogo(brand.name, INSTITUTION_LOGOS)!;
    const absPath = path.join(process.cwd(), 'public', logo.src.replace(/^\/+/, ''));
    assert.ok(fs.existsSync(absPath), `Missing financial brand logo file on disk: ${logo.src}`);
  }
});



