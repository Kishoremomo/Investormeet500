import {
  createNotificationEntry,
  validateApplicationInput,
  validateCategoryRegistrationInput,
  validateContactInput,
  type CalendarTask,
  type InquiryRecord,
  type InvestmentTrack,
  type NotificationLogEntry,
  type ParticipantType,
  type PaymentStatus,
  type RegistrationRecord,
  type RegistrationTargets,
  type ValidationStatus,
} from './domain';

export interface StoreSchema {
  registrations: RegistrationRecord[];
  targets: RegistrationTargets;
  calendarTasks: CalendarTask[];
  inquiries: InquiryRecord[];
  notifications: NotificationLogEntry[];
}

export const DEFAULT_TARGETS: RegistrationTargets = {
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

export const SEED_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: 'IM500-2027-0101',
    full_name: 'Arvindhan Krishnamurthy',
    company: 'Kaveri Precision Robotics Pvt Ltd',
    email: 'arvindhan@kaverirobotics.in',
    phone: '9840112233',
    industry: 'Manufacturing & Robotics',
    track: 'Startups',
    participantType: 'Entrepreneur',
    funding_lakhs: 250,
    business_summary:
      'Autonomous vision-guided inspection arms for automotive tier-1 suppliers across Sriperumbudur and Hosur.',
    supporting_information: 'Incubated at IIT Madras Research Park; 4 live factory pilots.',
    location: 'Chennai',
    stage: 'Early revenue',
    validationStatus: 'Approved',
    paymentStatus: 'Confirmed',
    paymentOptionAmount: 25000,
    assignedReviewer: 'Dr. Meenakshi Sundaram',
    pitchHall: 'Hall 1',
    reviewerNotes: 'Strong pilot traction and clean financial model.',
    createdAt: '2026-10-28T09:15:00.000Z',
    updatedAt: '2026-11-02T14:30:00.000Z',
  },
  {
    id: 'IM500-2027-0102',
    full_name: 'Priyadharshini Natarajan',
    company: 'Nilgiri Bio-Polymers LLP',
    email: 'priya@nilgiribiopolymers.in',
    phone: '9940334455',
    industry: 'Sustainable Packaging',
    track: 'Business Expansion',
    participantType: 'Entrepreneur',
    funding_lakhs: 1200,
    business_summary:
      'Compostable agricultural film manufacturing scaling from Coimbatore pilot line to 12,000 TPA facility.',
    supporting_information: 'Existing export orders from EU retail chains.',
    location: 'Coimbatore',
    stage: 'Growth',
    validationStatus: 'Under review',
    paymentStatus: 'Pending',
    paymentOptionAmount: 35000,
    assignedReviewer: 'S. Raghavan',
    pitchHall: 'Unassigned',
    reviewerNotes: 'Awaiting audited FY26 balance sheet verification.',
    createdAt: '2026-11-01T11:40:00.000Z',
    updatedAt: '2026-11-05T16:10:00.000Z',
  },
  {
    id: 'IM500-2027-0103',
    full_name: 'Senthil Kumar Balasubramanian',
    company: 'Madurai Cold-Chain Logistics',
    email: 'senthil@maduraicoldchain.in',
    phone: '9842255667',
    industry: 'Logistics & Agri-Storage',
    track: 'Bank Loans',
    participantType: 'Entrepreneur',
    funding_lakhs: 650,
    business_summary:
      'Solar-assisted multi-chamber cold storage network serving floriculture and spice exporters in southern Tamil Nadu.',
    location: 'Madurai',
    stage: 'Established',
    validationStatus: 'Approved',
    paymentStatus: 'Confirmed',
    paymentOptionAmount: 30000,
    assignedReviewer: 'K. Venkataraman',
    pitchHall: 'Hall 2',
    createdAt: '2026-11-03T08:20:00.000Z',
    updatedAt: '2026-11-07T10:05:00.000Z',
  },
  {
    id: 'IM500-2027-0104',
    full_name: 'Ananya Subramanian',
    company: 'Coromandel Venture Partners',
    email: 'ananya@coromandelvc.in',
    phone: '9841099887',
    industry: 'Venture Capital',
    track: 'Startups',
    participantType: 'Investor',
    funding_lakhs: 5000,
    business_summary:
      'Early-growth fund deploying ₹2 Cr to ₹25 Cr cheques into industrial SaaS, deep-tech, and climate-tech startups.',
    location: 'Chennai',
    stage: 'Established',
    validationStatus: 'Approved',
    paymentStatus: 'Confirmed',
    paymentOptionAmount: 50000,
    assignedReviewer: 'Organiser Desk',
    pitchHall: 'Hall 1',
    createdAt: '2026-11-05T13:10:00.000Z',
    updatedAt: '2026-11-06T09:00:00.000Z',
  },
  {
    id: 'IM500-2027-0105',
    full_name: 'Muthukumar Veerappan',
    company: 'Tiruppur Eco-Knit Exports',
    email: 'muthu@tiruppurecoknit.com',
    phone: '9790123987',
    industry: 'Textiles & Apparel',
    track: 'Business Loan',
    participantType: 'Entrepreneur',
    funding_lakhs: 400,
    business_summary:
      'Zero-liquid-discharge dyeing upgrade and automated knitting machinery expansion for European apparel buyers.',
    location: 'Tiruppur',
    stage: 'Established',
    validationStatus: 'Pending',
    paymentStatus: 'Not requested',
    assignedReviewer: 'Unassigned',
    pitchHall: 'Unassigned',
    createdAt: '2026-11-09T15:45:00.000Z',
    updatedAt: '2026-11-09T15:45:00.000Z',
  },
  {
    id: 'IM500-2027-0106',
    full_name: 'Vikramaditya Rao',
    company: 'Deccan Infrastructure Equipment',
    email: 'vikram@deccaninfra.in',
    phone: '9884556677',
    industry: 'Heavy Equipment & Infrastructure',
    track: 'Mixed Loans',
    participantType: 'Exhibitor',
    funding_lakhs: 2200,
    business_summary:
      'Hybrid term debt and strategic equity partnership for regional fleet leasing and quarry equipment servicing.',
    location: 'Chennai',
    stage: 'Growth',
    validationStatus: 'Under review',
    paymentStatus: 'Pending',
    paymentOptionAmount: 40000,
    assignedReviewer: 'R. Padmanabhan',
    pitchHall: 'Hall 3',
    createdAt: '2026-11-12T10:00:00.000Z',
    updatedAt: '2026-11-13T12:15:00.000Z',
  },
  {
    id: 'IM500-2027-0107',
    full_name: 'Deepak Chandrasekar',
    company: 'Indo-Singapore MedTech Corridor',
    email: 'deepak@indosgmed.sg',
    phone: '9840778899',
    industry: 'Healthcare & Cross-Border JV',
    track: 'International Opportunity',
    participantType: 'Investor',
    funding_lakhs: 3500,
    business_summary:
      'Cross-border joint venture mandate connecting Singapore diagnostic IP owners with Tamil Nadu medical manufacturers.',
    location: 'Singapore / Chennai',
    stage: 'Established',
    validationStatus: 'Approved',
    paymentStatus: 'Confirmed',
    paymentOptionAmount: 50000,
    assignedReviewer: 'International Desk',
    pitchHall: 'Hall 3',
    createdAt: '2026-11-14T07:50:00.000Z',
    updatedAt: '2026-11-15T11:20:00.000Z',
  },
  {
    id: 'IM500-2027-0108',
    full_name: 'Kavitha Rajendran',
    company: 'Cauvery Precision Castings',
    email: 'kavitha@cauverycastings.in',
    phone: '9443123450',
    industry: 'Engineering',
    track: 'Business Loan',
    participantType: 'Entrepreneur',
    funding_lakhs: 180,
    business_summary:
      'CNC machining cell addition for EV powertrain housings; order book backed by two Tier-1 OEMs.',
    location: 'Hosur',
    stage: 'Early revenue',
    validationStatus: 'Rejected',
    paymentStatus: 'Not requested',
    assignedReviewer: 'K. Venkataraman',
    pitchHall: 'Unassigned',
    reviewerNotes: 'Incomplete project financial plan submitted; invited to resubmit before deadline.',
    createdAt: '2026-11-15T17:05:00.000Z',
    updatedAt: '2026-11-16T09:40:00.000Z',
  },
];

export const SEED_CALENDAR_TASKS: CalendarTask[] = [
  // Finance & Revenue (4)
  { id: 'T01', number: '01', category: 'Finance & Revenue', title: 'Finance', description: 'Finalise overall summit budget, vendor allocations and contingency reserves.', status: 'In progress', progress: 65, targetDate: '2026-12-10', assignedTo: 'Finance Lead' },
  { id: 'T02', number: '02', category: 'Finance & Revenue', title: 'Revenue', description: 'Track draft registration tier approvals and projected delegate fee structure.', status: 'In progress', progress: 45, targetDate: '2026-12-20', assignedTo: 'Revenue Team' },
  { id: 'T03', number: '03', category: 'Finance & Revenue', title: 'Sponsors and Partners', description: 'Confirm written agreements for Title, Powered By, Co Sponsor and Associate tiers.', status: 'In progress', progress: 40, targetDate: '2027-01-10', assignedTo: 'Corporate Outreach' },
  { id: 'T04', number: '04', category: 'Finance & Revenue', title: 'Event Partners', description: 'Finalise exhibition stall allocations and corporate partner signage.', status: 'Not started', progress: 15, targetDate: '2027-01-20', assignedTo: 'Partner Desk' },

  // Registrations (2)
  { id: 'T05', number: '01', category: 'Registrations', title: 'Registration Intake & 500-Participant Target', description: 'Coordinate intake across 5 tracks (100 participants per track) prior to 1 February 2027.', status: 'In progress', progress: 35, targetDate: '2027-02-01', assignedTo: 'Registration Team' },
  { id: 'T06', number: '02', category: 'Registrations', title: 'Verification & Eligibility Clearance', description: 'Verify company background, financial readiness and track suitability.', status: 'In progress', progress: 30, targetDate: '2027-02-08', assignedTo: 'Validation Team' },

  // Team & Planning (9)
  { id: 'T07', number: '01', category: 'Team & Planning', title: 'Core Organising Committee Charter', description: 'Assign hall leads, escalation paths and daily review cadence.', status: 'Completed', progress: 100, targetDate: '2026-11-15', assignedTo: 'Mr. Rajganesh' },
  { id: 'T08', number: '02', category: 'Team & Planning', title: 'Startup Stream Coordination Manager', description: 'Appoint dedicated manager for the 100-startup track and pitch readiness.', status: 'In progress', progress: 60, targetDate: '2026-12-05', assignedTo: 'Startup Desk' },
  { id: 'T09', number: '03', category: 'Team & Planning', title: 'Bank Loan Coordination Desk', description: 'Assign banking liaison leads for nationalised and private sector desks.', status: 'In progress', progress: 50, targetDate: '2026-12-15', assignedTo: 'Bank Loan Team' },
  { id: 'T10', number: '04', category: 'Team & Planning', title: 'Venue Selection & Contract', description: 'Confirm Chennai convention hotel venue, 3 halls and catering contract.', status: 'In progress', progress: 70, targetDate: '2026-12-01', assignedTo: 'Venue Ops' },
  { id: 'T11', number: '05', category: 'Team & Planning', title: 'Hall Layout A vs Layout B Sign-off', description: 'Lock exhibition booth count (20 vs 30) and VIP/Business lounge footprint.', status: 'In progress', progress: 55, targetDate: '2026-12-18', assignedTo: 'Floor Planning' },
  { id: 'T12', number: '06', category: 'Team & Planning', title: 'Crowd Management & Badge Access', description: 'Prepare QR check-in desks, hall marshals and security protocol for 500 delegates.', status: 'Not started', progress: 10, targetDate: '2027-02-10', assignedTo: 'Security & Ops' },
  { id: 'T13', number: '07', category: 'Team & Planning', title: 'Hospitality & Outstation Travel', description: 'Coordinate airport transfers and hotel blocks for chief guests and international delegates.', status: 'Not started', progress: 10, targetDate: '2027-02-05', assignedTo: 'Hospitality Desk' },
  { id: 'T14', number: '08', category: 'Team & Planning', title: 'Reporting & Call-Report System', description: 'Configure guarantee-level call reports and closing outcome summaries.', status: 'In progress', progress: 75, targetDate: '2027-01-15', assignedTo: 'Systems Lead' },
  { id: 'T15', number: '09', category: 'Team & Planning', title: 'Full Dress Rehearsal & Hall Walkthrough', description: 'Complete AV, stage cue and pitch timer testing 48 hours before event.', status: 'Not started', progress: 0, targetDate: '2027-02-18', assignedTo: 'Stage Production' },

  // Government & Committees (5)
  { id: 'T16', number: '01', category: 'Government & Committees', title: 'Startup Committee Roster Confirmation', description: 'Publish verified names and designations of Startup Committee reviewers.', status: 'In progress', progress: 50, targetDate: '2026-12-15', assignedTo: 'Committee Desk' },
  { id: 'T17', number: '02', category: 'Government & Committees', title: 'Bank & Financial Committee Roster', description: 'Confirm senior banking and NBFC credit advisors on the review panel.', status: 'In progress', progress: 40, targetDate: '2026-12-22', assignedTo: 'Committee Desk' },
  { id: 'T18', number: '03', category: 'Government & Committees', title: 'International Opportunities Committee', description: 'Finalise cross-border trade and FDI advisory members.', status: 'Not started', progress: 20, targetDate: '2027-01-05', assignedTo: 'International Desk' },
  { id: 'T19', number: '04', category: 'Government & Committees', title: 'Business Loan & Mixed Loan Panel', description: 'Align MSME and structured debt evaluators for pre-event screening.', status: 'Not started', progress: 20, targetDate: '2027-01-10', assignedTo: 'Committee Desk' },
  { id: 'T20', number: '05', category: 'Government & Committees', title: 'State & Central Agency Invitations', description: 'Send formal invitations and protocol briefs to Guidance TN, StartupTN, Invest India.', status: 'In progress', progress: 45, targetDate: '2027-01-12', assignedTo: 'Govt Liaison' },

  // Programs & Events (8)
  { id: 'T21', number: '01', category: 'Programs & Events', title: 'Chief Guests Confirmation (Up to 30 Profiles)', description: 'Confirm Bank Managers, CFOs, Investment Experts and Policy Guests.', status: 'In progress', progress: 35, targetDate: '2027-01-15', assignedTo: 'Program Lead' },
  { id: 'T22', number: '02', category: 'Programs & Events', title: 'AI Experts Panel & Tool Showcase', description: 'Curate sessions on AI investment tools and market outlook.', status: 'In progress', progress: 40, targetDate: '2027-01-18', assignedTo: 'AI Track Lead' },
  { id: 'T23', number: '03', category: 'Programs & Events', title: 'CFO Advisory & 5-Year Progress Sessions', description: 'Structure CFO failure lessons, financial management and growth frameworks.', status: 'Not started', progress: 25, targetDate: '2027-01-22', assignedTo: 'Program Lead' },
  { id: 'T24', number: '04', category: 'Programs & Events', title: 'First Level Business Guidance Desk', description: 'Schedule 10-step readiness clinics and pitch-deck consultations.', status: 'In progress', progress: 60, targetDate: '2027-01-25', assignedTo: 'Advisory Desk' },
  { id: 'T25', number: '05', category: 'Programs & Events', title: 'One-to-One Investor Matchmaking Matrix', description: 'Map validated entrepreneurs to investor ticket sizes and sector preferences.', status: 'Not started', progress: 15, targetDate: '2027-02-10', assignedTo: 'Investor Team' },
  { id: 'T26', number: '06', category: 'Programs & Events', title: 'Pitch Area Slot Allocation (Hall 1–3)', description: 'Assign 8 AM – 2 PM pitch deck time slots across all three halls.', status: 'Not started', progress: 10, targetDate: '2027-02-12', assignedTo: 'Pitch Operations' },
  { id: 'T27', number: '07', category: 'Programs & Events', title: 'Women Entrepreneurs Spotlight Session', description: 'Coordinate leadership dialogue and founder networking roundtables.', status: 'In progress', progress: 50, targetDate: '2027-01-28', assignedTo: 'Program Lead' },
  { id: 'T28', number: '08', category: 'Programs & Events', title: 'Closing Outcomes & Deal Summary Desk', description: 'Prepare 2 PM – 6 PM final closing update forms and follow-up logs.', status: 'Not started', progress: 0, targetDate: '2027-02-15', assignedTo: 'Reporting Team' },

  // Marketing & Media (11)
  { id: 'T29', number: '01', category: 'Marketing & Media', title: 'Official Website Launch & Online Operations', description: 'Publish track pages, directories, floor maps and online application portal.', status: 'Completed', progress: 100, targetDate: '2026-11-20', assignedTo: 'Digital Team' },
  { id: 'T30', number: '02', category: 'Marketing & Media', title: 'Tamil Nadu Association Heads Outreach', description: 'Coordinate delegations with TANSTIA, CODISSIA, AIEMA, CREDAI, SICCI and TEA.', status: 'In progress', progress: 55, targetDate: '2026-12-20', assignedTo: 'Outreach Team' },
  { id: 'T31', number: '03', category: 'Marketing & Media', title: 'Top 50 Financial Brands Outreach', description: 'Distribute sponsor decks to NBFCs, banks, angels and VC funds in Tamil Nadu.', status: 'In progress', progress: 50, targetDate: '2026-12-28', assignedTo: 'Corporate Outreach' },
  { id: 'T32', number: '04', category: 'Marketing & Media', title: 'Corporate Brand Outreach (JCB, Kobelco, L&T)', description: 'Engage industrial and corporate partners listed in the event plan.', status: 'In progress', progress: 40, targetDate: '2027-01-05', assignedTo: 'Corporate Outreach' },
  { id: 'T33', number: '05', category: 'Marketing & Media', title: 'Instagram Announcement & Reels Calendar', description: 'Produce approved countdown reels, track explainers and chief guest teasers.', status: 'Not started', progress: 20, targetDate: '2026-12-15', assignedTo: 'Social Media Team' },
  { id: 'T34', number: '06', category: 'Marketing & Media', title: 'YouTube Explainer & Highlight Plan', description: 'Script founder readiness explainers and post-event highlight production.', status: 'Not started', progress: 15, targetDate: '2027-01-08', assignedTo: 'Social Media Team' },
  { id: 'T35', number: '07', category: 'Marketing & Media', title: 'Press Note & Media Kit Drafts', description: 'Prepare regional business press releases and Title Sponsor mentions.', status: 'Not started', progress: 10, targetDate: '2027-01-25', assignedTo: 'PR Desk' },
  { id: 'T36', number: '08', category: 'Marketing & Media', title: 'Registration Deadline Reminder Campaign', description: 'Run targeted founder outreach ahead of the 1 February 2027 deadline.', status: 'Not started', progress: 0, targetDate: '2027-01-20', assignedTo: 'Social Media Team' },
  { id: 'T37', number: '09', category: 'Marketing & Media', title: 'Digital Event Brochure & Dossier', description: 'Compile approved tracks, hall layouts and partner pages into delegate PDF.', status: 'In progress', progress: 35, targetDate: '2027-02-05', assignedTo: 'Design Team' },
  { id: 'T38', number: '10', category: 'Marketing & Media', title: 'Venue Signage, Badges & Backdrop Artwork', description: 'Print main stage backdrops, booth headers and directional standees.', status: 'Not started', progress: 0, targetDate: '2027-02-12', assignedTo: 'Design Team' },
  { id: 'T39', number: '11', category: 'Marketing & Media', title: 'Post-Event Impact Summary Publication', description: 'Publish verified attendance, track outcomes and partner acknowledgements.', status: 'Not started', progress: 0, targetDate: '2027-02-25', assignedTo: 'Organiser Desk' },
];

export const SEED_INQUIRIES: InquiryRecord[] = [
  {
    id: 'INQ-2027-001',
    name: 'Raghavendra Menon',
    email: 'raghav@southernprecision.in',
    subject: 'Consultation',
    message: 'Seeking first-level business guidance on preparing a project financial plan for ₹3.5 Cr expansion.',
    createdAt: '2026-11-11T10:15:00.000Z',
    status: 'Reviewed',
  },
];

export const SEED_NOTIFICATIONS: NotificationLogEntry[] = [
  createNotificationEntry({
    id: 'NTF-2027-001',
    eventType: 'Registration Submitted',
    referenceId: 'IM500-2027-0101',
    applicantName: 'Arvindhan Krishnamurthy',
    companyOrSubject: 'Kaveri Precision Robotics Pvt Ltd',
    trackOrCategory: 'Startups · ₹250 Lakhs',
    summary: 'Verified startup application logged and routed to sevenidatamanager@gmail.com.',
    createdAt: '2026-10-28T09:15:00.000Z',
  }),
  createNotificationEntry({
    id: 'NTF-2027-002',
    eventType: 'Consultation / Inquiry',
    referenceId: 'INQ-2027-001',
    applicantName: 'Raghavendra Menon',
    companyOrSubject: 'Consultation',
    trackOrCategory: 'First Level Business Guidance',
    summary: 'First-level consultation request logged for sevenidatamanager@gmail.com.',
    createdAt: '2026-11-11T10:15:00.000Z',
  }),
];

export function createInitialStore(): StoreSchema {
  return {
    registrations: SEED_REGISTRATIONS.map((r) => ({ ...r })),
    targets: {
      totalTarget: DEFAULT_TARGETS.totalTarget,
      byCategory: { ...DEFAULT_TARGETS.byCategory },
      byParticipantType: { ...DEFAULT_TARGETS.byParticipantType },
    },
    calendarTasks: SEED_CALENDAR_TASKS.map((t) => ({ ...t })),
    inquiries: SEED_INQUIRIES.map((i) => ({ ...i })),
    notifications: SEED_NOTIFICATIONS.map((n) => ({ ...n })),
  };
}

export function normalizeStoreShape(parsed: Partial<StoreSchema> | null | undefined): StoreSchema {
  const initial = createInitialStore();
  if (!parsed || typeof parsed !== 'object') return initial;
  return {
    registrations: Array.isArray(parsed.registrations) ? parsed.registrations : initial.registrations,
    targets: parsed.targets && typeof parsed.targets === 'object' ? parsed.targets : initial.targets,
    calendarTasks: Array.isArray(parsed.calendarTasks) ? parsed.calendarTasks : initial.calendarTasks,
    inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : initial.inquiries,
    notifications: Array.isArray(parsed.notifications) ? parsed.notifications : initial.notifications,
  };
}

export function mapCategorySlugToTrackAndType(slug: string): {
  track: InvestmentTrack;
  participantType: ParticipantType;
} {
  const s = (slug || '').toLowerCase();
  if (s === 'startup') return { track: 'Startups', participantType: 'Entrepreneur' };
  if (s === 'business') return { track: 'Business Expansion', participantType: 'Entrepreneur' };
  if (s === 'bank-loan') return { track: 'Bank Loans', participantType: 'Entrepreneur' };
  if (s === 'business-loan') return { track: 'Business Loan', participantType: 'Entrepreneur' };
  if (s === 'investor') return { track: 'Startups', participantType: 'Investor' };
  if (s === 'corporate') return { track: 'Business Expansion', participantType: 'Exhibitor' };
  if (s === 'association') return { track: 'Other Investment Tracks', participantType: 'Exhibitor' };
  if (s === 'international') return { track: 'International Opportunity', participantType: 'Investor' };
  return { track: 'Startups', participantType: 'Entrepreneur' };
}

export function nextNotificationId(store: StoreSchema): string {
  const maxNotifNum = store.notifications.reduce((max, item) => {
    const match = /(\d+)$/.exec(item.id);
    const num = match ? Number(match[1]) : 0;
    return num > max ? num : max;
  }, 0);
  return `NTF-2027-${String(maxNotifNum + 1).padStart(3, '0')}`;
}

export function applyCreateRegistration(
  store: StoreSchema,
  rawBody: Record<string, unknown>,
  options?: { dispatchedViaWebhook?: boolean; now?: string }
):
  | {
      ok: true;
      status: 201;
      registration: RegistrationRecord;
      notification: NotificationLogEntry;
      notifParams: {
        eventType: NotificationLogEntry['eventType'];
        referenceId: string;
        applicantName: string;
        companyOrSubject: string;
        trackOrCategory: string;
        summary: string;
        createdAt: string;
      };
    }
  | {
      ok: false;
      status: 400;
      error: string;
      errors: Record<string, string>;
    } {
  const body = rawBody || {};
  const now = options?.now || new Date().toISOString();
  const maxRegNum = store.registrations.reduce((max, item) => {
    const match = /(\d+)$/.exec(item.id);
    const num = match ? Number(match[1]) : 0;
    return num > max ? num : max;
  }, 100);
  const id = `IM500-2027-${String(maxRegNum + 1).padStart(4, '0')}`;

  if (body.mode === 'category') {
    const check = validateCategoryRegistrationInput(body as never);
    if (!check.valid) {
      return { ok: false, status: 400, error: 'Validation failed', errors: check.errors };
    }
    const mapped = mapCategorySlugToTrackAndType(String(body.categorySlug || ''));
    const record: RegistrationRecord = {
      id,
      full_name: String(body.full_name).trim(),
      company: String(body.company).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone).trim(),
      industry: String(body.sector).trim(),
      track: mapped.track,
      participantType: mapped.participantType,
      funding_lakhs: Number(body.funding_lakhs),
      business_summary: String(body.business_summary).trim(),
      supporting_information: body.document_checklist
        ? String(body.document_checklist).trim()
        : undefined,
      location: String(body.location).trim(),
      stage: String(body.stage).trim(),
      website: body.website ? String(body.website).trim() : undefined,
      validationStatus: 'Pending',
      paymentStatus: 'Not requested',
      assignedReviewer: 'Unassigned',
      pitchHall: 'Unassigned',
      reviewerNotes: `Funding purpose: ${String(body.funding_purpose).trim()}. Founder background: ${String(body.founder_background).trim()}`,
      createdAt: now,
      updatedAt: now,
    };
    const notifParams = {
      eventType: 'Category Registration' as const,
      referenceId: record.id,
      applicantName: record.full_name,
      companyOrSubject: record.company,
      trackOrCategory: `${record.track} (${record.participantType})`,
      summary: `Category registration (${String(body.categorySlug || '')}) for ₹${record.funding_lakhs}L routed to sevenidatamanager@gmail.com.`,
      createdAt: now,
    };
    const notification = createNotificationEntry({
      id: nextNotificationId(store),
      ...notifParams,
      dispatchedViaWebhook: options?.dispatchedViaWebhook,
    });
    store.registrations.unshift(record);
    store.notifications.unshift(notification);
    return { ok: true, status: 201, registration: record, notification, notifParams };
  }

  const check = validateApplicationInput(body as never);
  if (!check.valid) {
    return { ok: false, status: 400, error: 'Validation failed', errors: check.errors };
  }

  const record: RegistrationRecord = {
    id,
    full_name: String(body.full_name).trim(),
    company: String(body.company).trim(),
    email: String(body.email).trim(),
    phone: String(body.phone).trim(),
    industry: String(body.industry).trim(),
    track: body.track as InvestmentTrack,
    participantType: (body.participantType as ParticipantType) || 'Entrepreneur',
    funding_lakhs: Number(body.funding_lakhs),
    business_summary: String(body.business_summary).trim(),
    supporting_information: body.supporting_information
      ? String(body.supporting_information).trim()
      : undefined,
    validationStatus: 'Pending',
    paymentStatus: 'Not requested',
    assignedReviewer: 'Unassigned',
    pitchHall: 'Unassigned',
    createdAt: now,
    updatedAt: now,
  };
  const notifParams = {
    eventType: 'Registration Submitted' as const,
    referenceId: record.id,
    applicantName: record.full_name,
    companyOrSubject: record.company,
    trackOrCategory: `${record.track} · ₹${record.funding_lakhs} Lakhs`,
    summary: `New summit application ${record.id} submitted for review and logged for sevenidatamanager@gmail.com.`,
    createdAt: now,
  };
  const notification = createNotificationEntry({
    id: nextNotificationId(store),
    ...notifParams,
    dispatchedViaWebhook: options?.dispatchedViaWebhook,
  });
  store.registrations.unshift(record);
  store.notifications.unshift(notification);
  return { ok: true, status: 201, registration: record, notification, notifParams };
}

export function applyPatchRegistration(
  store: StoreSchema,
  id: string,
  patch: Record<string, unknown>
): RegistrationRecord | null {
  const idx = store.registrations.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  const existing = store.registrations[idx];
  const validStatuses: ValidationStatus[] = ['Pending', 'Under review', 'Approved', 'Rejected'];
  const validPayments: PaymentStatus[] = ['Not requested', 'Pending', 'Confirmed', 'Failed'];

  const updated: RegistrationRecord = {
    ...existing,
    validationStatus: validStatuses.includes(patch.validationStatus as ValidationStatus)
      ? (patch.validationStatus as ValidationStatus)
      : existing.validationStatus,
    paymentStatus: validPayments.includes(patch.paymentStatus as PaymentStatus)
      ? (patch.paymentStatus as PaymentStatus)
      : existing.paymentStatus,
    assignedReviewer:
      typeof patch.assignedReviewer === 'string'
        ? patch.assignedReviewer.trim() || 'Unassigned'
        : existing.assignedReviewer,
    pitchHall:
      typeof patch.pitchHall === 'string'
        ? patch.pitchHall.trim() || 'Unassigned'
        : existing.pitchHall,
    reviewerNotes:
      typeof patch.reviewerNotes === 'string' ? patch.reviewerNotes : existing.reviewerNotes,
    updatedAt: new Date().toISOString(),
  };

  store.registrations[idx] = updated;
  return updated;
}

export function applyDeleteRegistration(store: StoreSchema, id: string): boolean {
  const prevLen = store.registrations.length;
  store.registrations = store.registrations.filter((r) => r.id !== id);
  return store.registrations.length !== prevLen;
}

export function applyUpdateTargets(
  store: StoreSchema,
  body: Record<string, unknown>
): RegistrationTargets {
  const nextTargets: RegistrationTargets = {
    totalTarget: Number(body.totalTarget) > 0 ? Number(body.totalTarget) : store.targets.totalTarget,
    byCategory: {
      ...store.targets.byCategory,
      ...((body.byCategory as Record<string, number>) || {}),
    },
    byParticipantType: {
      ...store.targets.byParticipantType,
      ...((body.byParticipantType as Record<ParticipantType, number>) || {}),
    },
  };
  store.targets = nextTargets;
  return nextTargets;
}

export function applyPatchCalendarTask(
  store: StoreSchema,
  id: string,
  patch: Record<string, unknown>
): CalendarTask | null {
  const idx = store.calendarTasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const cur = store.calendarTasks[idx];
  const progress =
    patch.progress !== undefined
      ? Math.max(0, Math.min(100, Number(patch.progress) || 0))
      : cur.progress;
  const updated: CalendarTask = {
    ...cur,
    status: (patch.status as CalendarTask['status']) || cur.status,
    progress,
    targetDate: typeof patch.targetDate === 'string' ? patch.targetDate : cur.targetDate,
    assignedTo: typeof patch.assignedTo === 'string' ? patch.assignedTo : cur.assignedTo,
  };
  store.calendarTasks[idx] = updated;
  return updated;
}

export function applyCreateInquiry(
  store: StoreSchema,
  rawBody: Record<string, unknown>,
  options?: { dispatchedViaWebhook?: boolean; now?: string }
):
  | {
      ok: true;
      status: 201;
      inquiry: InquiryRecord;
      notification: NotificationLogEntry;
      notifParams: {
        eventType: NotificationLogEntry['eventType'];
        referenceId: string;
        applicantName: string;
        companyOrSubject: string;
        trackOrCategory: string;
        summary: string;
        createdAt: string;
      };
    }
  | {
      ok: false;
      status: 400;
      error: string;
      errors: Record<string, string>;
    } {
  const body = rawBody || {};
  const check = validateContactInput(body as never);
  if (!check.valid) {
    return { ok: false, status: 400, error: 'Validation failed', errors: check.errors };
  }
  const now = options?.now || new Date().toISOString();
  const record: InquiryRecord = {
    id: `INQ-2027-${String(store.inquiries.length + 1).padStart(3, '0')}`,
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    subject: String(body.subject).trim(),
    message: String(body.message).trim(),
    createdAt: now,
    status: 'New',
  };
  const notifParams = {
    eventType: 'Consultation / Inquiry' as const,
    referenceId: record.id,
    applicantName: record.name,
    companyOrSubject: record.subject,
    trackOrCategory: record.email,
    summary: `Inquiry "${record.subject}" from ${record.name} logged for sevenidatamanager@gmail.com.`,
    createdAt: now,
  };
  const notification = createNotificationEntry({
    id: nextNotificationId(store),
    ...notifParams,
    dispatchedViaWebhook: options?.dispatchedViaWebhook,
  });
  store.inquiries.unshift(record);
  store.notifications.unshift(notification);
  return { ok: true, status: 201, inquiry: record, notification, notifParams };
}

export function applyPatchInquiry(
  store: StoreSchema,
  id: string,
  status: string | undefined
): InquiryRecord | null {
  const idx = store.inquiries.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  store.inquiries[idx] = {
    ...store.inquiries[idx],
    status: status === 'Reviewed' ? 'Reviewed' : 'New',
  };
  return store.inquiries[idx];
}
