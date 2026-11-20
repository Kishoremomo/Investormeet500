import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  computeRegistrationStats,
  filterRegistrations,
  validateApplicationInput,
  validateCategoryRegistrationInput,
  validateContactInput,
  type CalendarTask,
  type InquiryRecord,
  type InvestmentTrack,
  type ParticipantType,
  type PaymentStatus,
  type RegistrationRecord,
  type RegistrationTargets,
  type ValidationStatus,
} from './src/lib/domain.ts';

const PORT = 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');

interface StoreSchema {
  registrations: RegistrationRecord[];
  targets: RegistrationTargets;
  calendarTasks: CalendarTask[];
  inquiries: InquiryRecord[];
}

const DEFAULT_TARGETS: RegistrationTargets = {
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

const SEED_REGISTRATIONS: RegistrationRecord[] = [
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

const SEED_CALENDAR_TASKS: CalendarTask[] = [
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
  { id: 'T13', number: '07', category: 'Team & Planning', title: 'Hospitality & Outstation Travel', description: 'Coordinate airport transfers and hotel blocks for speakers and international delegates.', status: 'Not started', progress: 10, targetDate: '2027-02-05', assignedTo: 'Hospitality Desk' },
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
  { id: 'T33', number: '05', category: 'Marketing & Media', title: 'Instagram Announcement & Reels Calendar', description: 'Produce approved countdown reels, track explainers and speaker teasers.', status: 'Not started', progress: 20, targetDate: '2026-12-15', assignedTo: 'Social Media Team' },
  { id: 'T34', number: '06', category: 'Marketing & Media', title: 'YouTube Explainer & Highlight Plan', description: 'Script founder readiness explainers and post-event highlight production.', status: 'Not started', progress: 15, targetDate: '2027-01-08', assignedTo: 'Social Media Team' },
  { id: 'T35', number: '07', category: 'Marketing & Media', title: 'Press Note & Media Kit Drafts', description: 'Prepare regional business press releases and Title Sponsor mentions.', status: 'Not started', progress: 10, targetDate: '2027-01-25', assignedTo: 'PR Desk' },
  { id: 'T36', number: '08', category: 'Marketing & Media', title: 'Registration Deadline Reminder Campaign', description: 'Run targeted founder outreach ahead of the 1 February 2027 deadline.', status: 'Not started', progress: 0, targetDate: '2027-01-20', assignedTo: 'Social Media Team' },
  { id: 'T37', number: '09', category: 'Marketing & Media', title: 'Digital Event Brochure & Dossier', description: 'Compile approved tracks, hall layouts and partner pages into delegate PDF.', status: 'In progress', progress: 35, targetDate: '2027-02-05', assignedTo: 'Design Team' },
  { id: 'T38', number: '10', category: 'Marketing & Media', title: 'Venue Signage, Badges & Backdrop Artwork', description: 'Print main stage backdrops, booth headers and directional standees.', status: 'Not started', progress: 0, targetDate: '2027-02-12', assignedTo: 'Design Team' },
  { id: 'T39', number: '11', category: 'Marketing & Media', title: 'Post-Event Impact Summary Publication', description: 'Publish verified attendance, track outcomes and partner acknowledgements.', status: 'Not started', progress: 0, targetDate: '2027-02-25', assignedTo: 'Organiser Desk' },
];

const SEED_INQUIRIES: InquiryRecord[] = [
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

function ensureStore(): StoreSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_PATH)) {
    const initial: StoreSchema = {
      registrations: SEED_REGISTRATIONS,
      targets: DEFAULT_TARGETS,
      calendarTasks: SEED_CALENDAR_TASKS,
      inquiries: SEED_INQUIRIES,
    };
    fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as StoreSchema;
    return {
      registrations: Array.isArray(parsed.registrations) ? parsed.registrations : SEED_REGISTRATIONS,
      targets: parsed.targets || DEFAULT_TARGETS,
      calendarTasks: Array.isArray(parsed.calendarTasks) ? parsed.calendarTasks : SEED_CALENDAR_TASKS,
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : SEED_INQUIRIES,
    };
  } catch {
    const fallback: StoreSchema = {
      registrations: SEED_REGISTRATIONS,
      targets: DEFAULT_TARGETS,
      calendarTasks: SEED_CALENDAR_TASKS,
      inquiries: SEED_INQUIRIES,
    };
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

function mapCategorySlugToTrackAndType(slug: string): {
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

  // Create registration (supports both /apply and /registration category forms)
  app.post('/api/registrations', (req, res) => {
    const body = req.body || {};
    const now = new Date().toISOString();
    const nextNum = 101 + store.registrations.length + Math.floor(Math.random() * 10);
    const id = `IM500-2027-${String(nextNum).padStart(4, '0')}`;

    if (body.mode === 'category') {
      const check = validateCategoryRegistrationInput(body);
      if (!check.valid) {
        res.status(400).json({ error: 'Validation failed', errors: check.errors });
        return;
      }
      const mapped = mapCategorySlugToTrackAndType(body.categorySlug);
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
        supporting_information: body.document_checklist ? String(body.document_checklist).trim() : undefined,
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
      store.registrations.unshift(record);
      saveStore(store);
      res.status(201).json({ registration: record });
      return;
    }

    const check = validateApplicationInput(body);
    if (!check.valid) {
      res.status(400).json({ error: 'Validation failed', errors: check.errors });
      return;
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

    store.registrations.unshift(record);
    saveStore(store);
    res.status(201).json({ registration: record });
  });

  // Update registration status, reviewer, payment, pitch hall
  app.patch('/api/registrations/:id', (req, res) => {
    const { id } = req.params;
    const idx = store.registrations.findIndex((r) => r.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Registration not found' });
      return;
    }
    const existing = store.registrations[idx];
    const patch = req.body || {};

    const validStatuses: ValidationStatus[] = ['Pending', 'Under review', 'Approved', 'Rejected'];
    const validPayments: PaymentStatus[] = ['Not requested', 'Pending', 'Confirmed', 'Failed'];

    const updated: RegistrationRecord = {
      ...existing,
      validationStatus: validStatuses.includes(patch.validationStatus)
        ? patch.validationStatus
        : existing.validationStatus,
      paymentStatus: validPayments.includes(patch.paymentStatus)
        ? patch.paymentStatus
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
    saveStore(store);
    res.json({ registration: updated });
  });

  app.delete('/api/registrations/:id', (req, res) => {
    const { id } = req.params;
    const prevLen = store.registrations.length;
    store.registrations = store.registrations.filter((r) => r.id !== id);
    if (store.registrations.length === prevLen) {
      res.status(404).json({ error: 'Registration not found' });
      return;
    }
    saveStore(store);
    res.json({ deleted: id });
  });

  // Update dashboard targets
  app.put('/api/targets', (req, res) => {
    const body = req.body || {};
    const nextTargets: RegistrationTargets = {
      totalTarget: Number(body.totalTarget) > 0 ? Number(body.totalTarget) : store.targets.totalTarget,
      byCategory: {
        ...store.targets.byCategory,
        ...(body.byCategory || {}),
      },
      byParticipantType: {
        ...store.targets.byParticipantType,
        ...(body.byParticipantType || {}),
      },
    };
    store.targets = nextTargets;
    saveStore(store);
    res.json({ targets: nextTargets });
  });

  // Calendar tasks
  app.get('/api/calendar-tasks', (_req, res) => {
    res.json({ tasks: store.calendarTasks });
  });

  app.patch('/api/calendar-tasks/:id', (req, res) => {
    const { id } = req.params;
    const idx = store.calendarTasks.findIndex((t) => t.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    const patch = req.body || {};
    const cur = store.calendarTasks[idx];
    const progress =
      patch.progress !== undefined
        ? Math.max(0, Math.min(100, Number(patch.progress) || 0))
        : cur.progress;
    const updated: CalendarTask = {
      ...cur,
      status: patch.status || cur.status,
      progress,
      targetDate: typeof patch.targetDate === 'string' ? patch.targetDate : cur.targetDate,
      assignedTo: typeof patch.assignedTo === 'string' ? patch.assignedTo : cur.assignedTo,
    };
    store.calendarTasks[idx] = updated;
    saveStore(store);
    res.json({ task: updated });
  });

  // Contact & Consultation inquiries
  app.get('/api/inquiries', (_req, res) => {
    res.json({ inquiries: store.inquiries });
  });

  app.post('/api/inquiries', (req, res) => {
    const check = validateContactInput(req.body || {});
    if (!check.valid) {
      res.status(400).json({ error: 'Validation failed', errors: check.errors });
      return;
    }
    const record: InquiryRecord = {
      id: `INQ-2027-${String(store.inquiries.length + 1).padStart(3, '0')}`,
      name: String(req.body.name).trim(),
      email: String(req.body.email).trim(),
      subject: String(req.body.subject).trim(),
      message: String(req.body.message).trim(),
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    store.inquiries.unshift(record);
    saveStore(store);
    res.status(201).json({ inquiry: record });
  });

  app.patch('/api/inquiries/:id', (req, res) => {
    const idx = store.inquiries.findIndex((i) => i.id === req.params.id);
    if (idx === -1) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }
    store.inquiries[idx] = {
      ...store.inquiries[idx],
      status: req.body?.status === 'Reviewed' ? 'Reviewed' : 'New',
    };
    saveStore(store);
    res.json({ inquiry: store.inquiries[idx] });
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
