export type InvestmentTrack =
  | 'Startups'
  | 'Business Loan'
  | 'Business Expansion'
  | 'Bank Loans'
  | 'Mixed Loans'
  | 'International Opportunity'
  | 'Other Investment Tracks';

export type ParticipantType = 'Entrepreneur' | 'Investor' | 'Exhibitor';

export type ValidationStatus = 'Pending' | 'Under review' | 'Approved' | 'Rejected';

export type PaymentStatus = 'Not requested' | 'Pending' | 'Confirmed' | 'Failed';

export interface RegistrationRecord {
  id: string;
  full_name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  track: InvestmentTrack;
  participantType: ParticipantType;
  funding_lakhs: number;
  business_summary: string;
  supporting_information?: string;
  location?: string;
  stage?: string;
  website?: string;
  validationStatus: ValidationStatus;
  paymentStatus: PaymentStatus;
  paymentOptionAmount?: number;
  assignedReviewer: string;
  pitchHall: string;
  reviewerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationTargets {
  totalTarget: number;
  byCategory: Record<string, number>;
  byParticipantType: Record<ParticipantType, number>;
}

export interface CalendarTask {
  id: string;
  number: string;
  category:
    | 'Finance & Revenue'
    | 'Registrations'
    | 'Team & Planning'
    | 'Government & Committees'
    | 'Programs & Events'
    | 'Marketing & Media';
  title: string;
  description: string;
  status: 'Not started' | 'In progress' | 'Completed';
  progress: number;
  targetDate: string;
  assignedTo: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Reviewed';
}

export const EVENT_DATE_ISO = '2027-02-20T08:00:00+05:30';
export const REGISTRATION_DEADLINE_TEXT = '1 February 2027';

export const PRIMARY_TRACKS: InvestmentTrack[] = [
  'Startups',
  'Business Loan',
  'Business Expansion',
  'Bank Loans',
  'Mixed Loans',
];

export const ALL_REGISTRATION_CATEGORIES: string[] = [
  'Startups',
  'Bank Loan',
  'Business Loan',
  'Business Expansion',
  'International Opportunity',
  'Other Investment Tracks',
];

export interface ApplicationFormInput {
  full_name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  track: string;
  funding_lakhs: number | string;
  business_summary: string;
  supporting_information?: string;
  terms: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateApplicationInput(input: ApplicationFormInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.full_name || input.full_name.trim().length < 2) {
    errors.full_name = 'Enter the participant or authorised representative name (minimum 2 characters).';
  }
  if (!input.company || input.company.trim().length < 2) {
    errors.company = 'Enter your company or startup name.';
  }
  if (!input.email || !EMAIL_RE.test(input.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  const phoneDigits = (input.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Enter a valid phone number (10 to 15 digits).';
  }
  if (!input.industry || input.industry.trim().length < 2) {
    errors.industry = 'Specify your business category or sector.';
  }
  if (!input.track || input.track.trim().length === 0) {
    errors.track = 'Select an investment track.';
  }
  const funding = Number(input.funding_lakhs);
  if (!Number.isFinite(funding) || funding < 50 || funding > 50000) {
    errors.funding_lakhs = 'Funding requirement must be between 50 and 50,000 Lakhs (₹50 Lakhs to ₹500 Crore).';
  }
  if (!input.business_summary || input.business_summary.trim().length < 20) {
    errors.business_summary = 'Provide at least 20 characters describing your background, project, and goals.';
  }
  if (!input.terms) {
    errors.terms = 'You must accept the draft terms and privacy policy to continue.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface CategoryRegistrationInput {
  categorySlug: string;
  full_name: string;
  company: string;
  email: string;
  phone: string;
  sector: string;
  location: string;
  stage: string;
  founder_background: string;
  funding_lakhs: number | string;
  funding_purpose: string;
  business_summary: string;
  website?: string;
  document_checklist?: string;
  consent: boolean;
}

export function validateCategoryRegistrationInput(input: CategoryRegistrationInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.full_name || input.full_name.trim().length < 2) {
    errors.full_name = 'Full name or authorised representative is required.';
  }
  if (!input.company || input.company.trim().length < 2) {
    errors.company = 'Organisation or startup name is required.';
  }
  if (!input.email || !EMAIL_RE.test(input.email.trim())) {
    errors.email = 'Valid email address is required.';
  }
  const phoneDigits = (input.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Valid mobile number (10–15 digits) is required.';
  }
  if (!input.sector || input.sector.trim().length < 2) {
    errors.sector = 'Business sector is required.';
  }
  if (!input.location || input.location.trim().length < 2) {
    errors.location = 'City / location is required.';
  }
  if (!input.stage || input.stage.trim().length === 0) {
    errors.stage = 'Select your current business stage.';
  }
  if (!input.founder_background || input.founder_background.trim().length < 5) {
    errors.founder_background = 'Provide founder or leadership background.';
  }
  const funding = Number(input.funding_lakhs);
  if (!Number.isFinite(funding) || funding < 50 || funding > 50000) {
    errors.funding_lakhs = 'Funding requirement must be between 50 and 50,000 (₹ Lakhs).';
  }
  if (!input.funding_purpose || input.funding_purpose.trim().length < 4) {
    errors.funding_purpose = 'Specify the funding purpose.';
  }
  if (!input.business_summary || input.business_summary.trim().length < 15) {
    errors.business_summary = 'Describe your business and participation goals (minimum 15 characters).';
  }
  if (input.website && input.website.trim().length > 0 && !/^https?:\/\/.+/i.test(input.website.trim())) {
    errors.website = 'Website URL must start with http:// or https://';
  }
  if (!input.consent) {
    errors.consent = 'Confirm that you have read the draft terms and privacy notice.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function validateContactInput(input: ContactInput): ValidationResult {
  const errors: Record<string, string> = {};
  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Enter your full name.';
  }
  if (!input.email || !EMAIL_RE.test(input.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!input.subject || input.subject.trim().length < 3) {
    errors.subject = 'Enter a subject for your enquiry.';
  }
  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Enter a message (minimum 10 characters).';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  summaryText: string;
}

export function computeCountdown(targetIso = EVENT_DATE_ISO, nowMs = Date.now()): CountdownParts {
  const targetMs = new Date(targetIso).getTime();
  const diff = Math.max(0, targetMs - nowMs);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs: diff,
    summaryText: `${days} days, ${hours} hours and ${minutes} minutes until 20 February 2027.`,
  };
}

export function formatLakhsToDisplay(lakhs: number): string {
  if (!Number.isFinite(lakhs) || lakhs <= 0) return '—';
  if (lakhs >= 100) {
    const crore = lakhs / 100;
    const formatted = Number.isInteger(crore) ? String(crore) : crore.toFixed(2).replace(/\.?0+$/, '');
    return `₹${formatted} Crore`;
  }
  return `₹${lakhs.toLocaleString('en-IN')} Lakhs`;
}

export function normalizeTrackToAdminCategory(track: string): string {
  if (track === 'Bank Loans') return 'Bank Loan';
  if (track === 'Mixed Loans') return 'Other Investment Tracks';
  return track;
}

export interface RegistrationStats {
  total: number;
  byCategory: Record<string, number>;
  pendingValidation: number;
  underReviewValidation: number;
  approved: number;
  rejected: number;
  pendingPayments: number;
  confirmedPayments: number;
  byParticipantType: Record<ParticipantType, number>;
  remainingToTarget: number;
  completionPct: number;
}

export function computeRegistrationStats(
  registrations: RegistrationRecord[],
  targets: RegistrationTargets
): RegistrationStats {
  const byCategory: Record<string, number> = {
    Startups: 0,
    'Bank Loan': 0,
    'Business Loan': 0,
    'Business Expansion': 0,
    'International Opportunity': 0,
    'Other Investment Tracks': 0,
  };
  const byParticipantType: Record<ParticipantType, number> = {
    Entrepreneur: 0,
    Investor: 0,
    Exhibitor: 0,
  };

  let pendingValidation = 0;
  let underReviewValidation = 0;
  let approved = 0;
  let rejected = 0;
  let pendingPayments = 0;
  let confirmedPayments = 0;

  for (const reg of registrations) {
    const cat = normalizeTrackToAdminCategory(reg.track);
    byCategory[cat] = (byCategory[cat] ?? 0) + 1;

    byParticipantType[reg.participantType] = (byParticipantType[reg.participantType] ?? 0) + 1;

    if (reg.validationStatus === 'Pending') pendingValidation += 1;
    else if (reg.validationStatus === 'Under review') underReviewValidation += 1;
    else if (reg.validationStatus === 'Approved') approved += 1;
    else if (reg.validationStatus === 'Rejected') rejected += 1;

    if (reg.paymentStatus === 'Pending') pendingPayments += 1;
    else if (reg.paymentStatus === 'Confirmed') confirmedPayments += 1;
  }

  const total = registrations.length;
  const remainingToTarget = Math.max(0, targets.totalTarget - total);
  const completionPct =
    targets.totalTarget > 0 ? Math.min(100, Math.round((total / targets.totalTarget) * 1000) / 10) : 0;

  return {
    total,
    byCategory,
    pendingValidation,
    underReviewValidation,
    approved,
    rejected,
    pendingPayments,
    confirmedPayments,
    byParticipantType,
    remainingToTarget,
    completionPct,
  };
}

export interface RegistrationFilterParams {
  query?: string;
  category?: string;
  validationStatus?: string;
  paymentStatus?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function filterRegistrations(
  registrations: RegistrationRecord[],
  filters: RegistrationFilterParams
): RegistrationRecord[] {
  const q = (filters.query || '').trim().toLowerCase();
  const cat = filters.category || 'All categories';
  const val = filters.validationStatus || 'All statuses';
  const pay = filters.paymentStatus || 'All payments';
  const fromMs = filters.dateFrom ? new Date(filters.dateFrom).getTime() : null;
  const toMs = filters.dateTo ? new Date(filters.dateTo + 'T23:59:59.999Z').getTime() : null;

  return registrations.filter((r) => {
    if (q) {
      const hay = `${r.id} ${r.full_name} ${r.company} ${r.email} ${r.industry}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (cat && cat !== 'All categories') {
      if (normalizeTrackToAdminCategory(r.track) !== cat && r.track !== cat) return false;
    }
    if (val && val !== 'All statuses' && r.validationStatus !== val) {
      return false;
    }
    if (pay && pay !== 'All payments' && r.paymentStatus !== pay) {
      return false;
    }
    if (fromMs !== null && Number.isFinite(fromMs)) {
      if (new Date(r.createdAt).getTime() < fromMs) return false;
    }
    if (toMs !== null && Number.isFinite(toMs)) {
      if (new Date(r.createdAt).getTime() > toMs) return false;
    }
    return true;
  });
}

function escapeCsvCell(val: string | number | undefined): string {
  const s = String(val ?? '');
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function registrationsToCsv(registrations: RegistrationRecord[]): string {
  const headers = [
    'Reference ID',
    'Participant Name',
    'Company',
    'Email',
    'Phone',
    'Business Category',
    'Track',
    'Participant Type',
    'Funding (Lakhs)',
    'Validation Status',
    'Payment Status',
    'Assigned Reviewer',
    'Pitch Hall',
    'Submitted At',
  ];
  const rows = registrations.map((r) =>
    [
      r.id,
      r.full_name,
      r.company,
      r.email,
      r.phone,
      r.industry,
      r.track,
      r.participantType,
      r.funding_lakhs,
      r.validationStatus,
      r.paymentStatus,
      r.assignedReviewer,
      r.pitchHall,
      r.createdAt,
    ]
      .map(escapeCsvCell)
      .join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

export function filterDirectoryItems<T extends { name: string; category: string }>(
  items: T[],
  query: string,
  category: string,
  extraFields?: (item: T) => string
): T[] {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    if (category && category !== 'All' && category !== 'All categories' && item.category !== category) {
      return false;
    }
    if (q) {
      const extra = extraFields ? extraFields(item) : '';
      const hay = `${item.name} ${item.category} ${extra}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export interface DiscoveryFilterOptions {
  trackFilter?: string;
  participantType?: string;
  statusFilter?: string;
  query?: string;
}

export function filterDiscoveryOpportunities(
  records: RegistrationRecord[],
  options: DiscoveryFilterOptions
): RegistrationRecord[] {
  const q = (options.query || '').trim().toLowerCase();
  return records.filter((rec) => {
    if (options.trackFilter && options.trackFilter !== 'All') {
      if (rec.track !== options.trackFilter && normalizeTrackToAdminCategory(rec.track) !== options.trackFilter) {
        return false;
      }
    }
    if (options.participantType && options.participantType !== 'All') {
      if (rec.participantType !== options.participantType) return false;
    }
    if (options.statusFilter && options.statusFilter !== 'All') {
      if (rec.validationStatus !== options.statusFilter) return false;
    }
    if (q) {
      const hay = `${rec.full_name} ${rec.company} ${rec.industry} ${rec.location || ''} ${rec.business_summary}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export interface TrackBreakdownRow {
  category: string;
  count: number;
  target: number;
  pctOfTarget: number;
}

export function computeTrackBreakdown(
  stats: RegistrationStats,
  targets: RegistrationTargets
): TrackBreakdownRow[] {
  return ALL_REGISTRATION_CATEGORIES.map((category) => {
    const count = stats.byCategory[category] ?? 0;
    const target = targets.byCategory[category] ?? 0;
    const pctOfTarget =
      target > 0 ? Math.min(100, Math.round((count / target) * 100)) : 0;
    return {
      category,
      count,
      target,
      pctOfTarget,
    };
  });
}

export function getInitials(name: string): string {
  const cleaned = name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s+/i, '')
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'IM';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export interface LogoLookupCandidate {
  key: string;
  label: string;
  src: string;
  darkSurface?: boolean;
  aliases: string[];
}

export function resolveInstitutionLogo(
  institutionName: string,
  catalog: LogoLookupCandidate[]
): LogoLookupCandidate | null {
  const normalized = institutionName
    .toLowerCase()
    .replace(/\b(limited|ltd\.?|co\.?|plc\.?|inc\.?|p\.j\.s\.c\.?|q\.p\.s\.c\.?|s\.a\.?)\b/g, ' ')
    .replace(/[^a-z0-9&.\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return null;

  // Prefer exact or longest alias match so 'Bank of America' never collides with short tokens
  let bestMatch: LogoLookupCandidate | null = null;
  let bestScore = 0;

  for (const item of catalog) {
    for (const rawAlias of item.aliases) {
      const alias = rawAlias.toLowerCase().trim();
      if (!alias) continue;
      if (normalized === alias) {
        return item;
      }
      // Word/phrase boundary match inside normalized institution name
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const boundaryRe = new RegExp(`(^|\\s)${escaped}(\\s|$)`, 'i');
      if (boundaryRe.test(normalized) && alias.length > bestScore) {
        bestScore = alias.length;
        bestMatch = item;
      }
    }
  }

  return bestMatch;
}

export interface BreakdownSlice {
  key: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

const VALIDATION_SLICE_COLORS: Record<ValidationStatus, string> = {
  Approved: '#0d9488',
  'Under review': '#2563eb',
  Pending: '#c49a45',
  Rejected: '#dc2626',
};

const PAYMENT_SLICE_COLORS: Record<PaymentStatus, string> = {
  Confirmed: '#0d9488',
  Pending: '#6d28d9',
  'Not requested': '#64748b',
  Failed: '#dc2626',
};

const CATEGORY_SLICE_COLORS: Record<string, string> = {
  Startups: '#1d4ed8',
  'Bank Loan': '#0d9488',
  'Business Loan': '#c49a45',
  'Business Expansion': '#6d28d9',
  'International Opportunity': '#0284c7',
  'Other Investment Tracks': '#4338ca',
};

export function computeCategorySlices(registrations: RegistrationRecord[]): BreakdownSlice[] {
  const counts: Record<string, number> = {};
  for (const cat of ALL_REGISTRATION_CATEGORIES) counts[cat] = 0;
  for (const r of registrations) {
    const cat = normalizeTrackToAdminCategory(r.track);
    counts[cat] = (counts[cat] ?? 0) + 1;
  }
  const total = registrations.length;
  return ALL_REGISTRATION_CATEGORIES.map((cat) => {
    const count = counts[cat] ?? 0;
    return {
      key: cat,
      label: cat,
      count,
      percentage: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
      color: CATEGORY_SLICE_COLORS[cat] ?? '#334155',
    };
  });
}

export function computeValidationStatusBreakdown(
  registrations: RegistrationRecord[]
): BreakdownSlice[] {
  const statuses: ValidationStatus[] = ['Approved', 'Under review', 'Pending', 'Rejected'];
  const counts: Record<ValidationStatus, number> = {
    Approved: 0,
    'Under review': 0,
    Pending: 0,
    Rejected: 0,
  };
  for (const r of registrations) {
    counts[r.validationStatus] = (counts[r.validationStatus] ?? 0) + 1;
  }
  const total = registrations.length;
  return statuses.map((st) => ({
    key: st,
    label: st,
    count: counts[st],
    percentage: total > 0 ? Math.round((counts[st] / total) * 1000) / 10 : 0,
    color: VALIDATION_SLICE_COLORS[st],
  }));
}

export function computePaymentStatusBreakdown(
  registrations: RegistrationRecord[]
): BreakdownSlice[] {
  const statuses: PaymentStatus[] = ['Confirmed', 'Pending', 'Not requested', 'Failed'];
  const counts: Record<PaymentStatus, number> = {
    Confirmed: 0,
    Pending: 0,
    'Not requested': 0,
    Failed: 0,
  };
  for (const r of registrations) {
    counts[r.paymentStatus] = (counts[r.paymentStatus] ?? 0) + 1;
  }
  const total = registrations.length;
  return statuses.map((st) => ({
    key: st,
    label: st,
    count: counts[st],
    percentage: total > 0 ? Math.round((counts[st] / total) * 1000) / 10 : 0,
    color: PAYMENT_SLICE_COLORS[st],
  }));
}

export interface ParticipantTypeComparisonRow {
  type: ParticipantType;
  registered: number;
  target: number;
  pctOfTarget: number;
  color: string;
}

const PARTICIPANT_TYPE_COLORS: Record<ParticipantType, string> = {
  Entrepreneur: '#1d4ed8',
  Investor: '#6d28d9',
  Exhibitor: '#0d9488',
};

export function computeParticipantTypeComparison(
  registrations: RegistrationRecord[],
  targets: RegistrationTargets
): ParticipantTypeComparisonRow[] {
  const types: ParticipantType[] = ['Entrepreneur', 'Investor', 'Exhibitor'];
  const counts: Record<ParticipantType, number> = {
    Entrepreneur: 0,
    Investor: 0,
    Exhibitor: 0,
  };
  for (const r of registrations) {
    counts[r.participantType] = (counts[r.participantType] ?? 0) + 1;
  }
  return types.map((t) => {
    const registered = counts[t];
    const target = targets.byParticipantType[t] ?? 0;
    return {
      type: t,
      registered,
      target,
      pctOfTarget: target > 0 ? Math.min(100, Math.round((registered / target) * 1000) / 10) : 0,
      color: PARTICIPANT_TYPE_COLORS[t],
    };
  });
}

export interface RegistrationTrendPoint {
  date: string;
  label: string;
  dailyCount: number;
  cumulativeCount: number;
}

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function computeRegistrationTrend(
  registrations: RegistrationRecord[]
): RegistrationTrendPoint[] {
  if (registrations.length === 0) return [];
  const byDay = new Map<string, number>();

  for (const r of registrations) {
    const ts = Date.parse(r.createdAt);
    if (!Number.isFinite(ts)) continue;
    const dayKey = new Date(ts).toISOString().slice(0, 10);
    byDay.set(dayKey, (byDay.get(dayKey) ?? 0) + 1);
  }

  const sortedDays = Array.from(byDay.keys()).sort();
  let cumulative = 0;
  return sortedDays.map((dayKey) => {
    const dailyCount = byDay.get(dayKey) ?? 0;
    cumulative += dailyCount;
    const [, mStr, dStr] = dayKey.split('-');
    const monthIdx = Math.max(0, Math.min(11, Number(mStr) - 1));
    const label = `${Number(dStr)} ${MONTH_ABBR[monthIdx]}`;
    return {
      date: dayKey,
      label,
      dailyCount,
      cumulativeCount: cumulative,
    };
  });
}
