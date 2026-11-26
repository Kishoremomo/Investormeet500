export interface NavItem {
  label: string;
  href: string;
  keywords?: string;
}

export const MAIN_NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Tracks', href: '/tracks' },
  { label: 'Entrepreneurs', href: '/entrepreneurs' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Payments', href: '/payments' },
  { label: 'Venue', href: '/venue' },
];

export const QUICK_LINKS: NavItem[] = [
  { label: 'Investment Tracks', href: '/tracks' },
  { label: 'Startup', href: '/startup' },
  { label: 'Validation Team', href: '/validation-team' },
  { label: 'Pitch Area', href: '/pitch-area' },
  { label: 'AI Experts', href: '/ai-experts' },
  { label: 'CFO Points', href: '/cfo-points' },
  { label: 'Investor Team', href: '/investor-team' },
  { label: 'Payments', href: '/payments' },
  { label: 'Chief Guests', href: '/chief-guests' },
  { label: 'Banks (120)', href: '/banks' },
  { label: 'Corporates', href: '/corporate' },
  { label: '90 Days Policy', href: '/registration-policy' },
  { label: 'Dashboard', href: '/admin/registrations' },
];

export interface HeaderDropdownItem {
  label: string;
  href: string;
  desc?: string;
}

export interface HeaderDropdownGroup {
  id: string;
  label: string;
  items: HeaderDropdownItem[];
}

export const HEADER_DROPDOWNS: HeaderDropdownGroup[] = [
  {
    id: 'summit',
    label: 'Summit',
    items: [
      { label: 'About Investor Meet 500', href: '/about', desc: 'Objectives, halls & mandate' },
      { label: 'Event Schedule (8 AM – 6 PM)', href: '/schedule', desc: 'Morning pitches & afternoon wrap' },
      { label: 'Venue & Hall Maps', href: '/venue', desc: 'Halls 1–3, Layout A/B & M1–M6' },
      { label: 'Chief Guests & VIPs (Top 30)', href: '/chief-guests', desc: 'A2B Mr. Srinivasan Raja & VIP seats' },
      { label: 'Committees & Teams (5 × 5)', href: '/team', desc: 'Validation & floor operations' },
      { label: '90 Days Policy & Dates', href: '/registration-policy', desc: '01-02-2027 cutoff framework' },
    ],
  },
  {
    id: 'tracks',
    label: 'Tracks & Desks',
    items: [
      { label: '5 Investment Tracks', href: '/tracks', desc: '₹50L to ₹500Cr pathways & meaning' },
      { label: 'Startup Stream (100)', href: '/startup', desc: 'Validation & equity readiness' },
      { label: 'Validation Team Desk', href: '/validation-team', desc: 'Background, financials & risk audit' },
      { label: 'Pitch Area Allocation', href: '/pitch-area', desc: 'Hall 1–3 stage & room slots' },
      { label: 'AI Experts Plenary', href: '/ai-experts', desc: 'AI due diligence & future capital' },
      { label: 'CFO Points Desk', href: '/cfo-points', desc: '5-year financial governance' },
      { label: 'Investor Team Points', href: '/investor-team', desc: 'Ticket-size & mandate matching' },
      { label: 'Central & State Govt Guidance', href: '/government', desc: 'Invest India, MSME, StartupTN & TIIC' },
      { label: 'First Level Business Guidance', href: '/business-guidance', desc: '10-step readiness clinic' },
    ],
  },
  {
    id: 'directories',
    label: 'Directories',
    items: [
      { label: '120 Banks in India', href: '/banks', desc: 'RBI nationalised, private & foreign' },
      { label: '500+ Corporate Index', href: '/corporate', desc: 'NSE/BSE & Tamil Nadu leaders' },
      { label: '100 Entrepreneurs Directory', href: '/entrepreneurs', desc: 'Industrial & tech pioneers' },
      { label: 'Women Entrepreneurs', href: '/women-entrepreneurs', desc: 'Verified founders & leaders' },
      { label: 'Top 50 Financial Brands', href: '/financial-brands', desc: 'NBFCs, VCs & angel syndicates' },
      { label: '15 Industry Associations', href: '/associations', desc: 'TANSTIA, CODISSIA, SICCI & CII' },
      { label: 'International & FDI', href: '/international', desc: 'Cross-border JVs & delegations' },
    ],
  },
];

export interface RegisterAsChip {
  label: string;
  href: string;
  icon: 'rocket' | 'briefcase' | 'landmark' | 'wallet' | 'trending' | 'building' | 'users' | 'globe' | 'bank';
}

export const REGISTER_AS_CHIPS: RegisterAsChip[] = [
  { label: 'Startup', href: '/registration?category=startup', icon: 'rocket' },
  { label: 'Business', href: '/registration?category=business', icon: 'briefcase' },
  { label: 'Bank Loan', href: '/registration?category=bank-loan', icon: 'landmark' },
  { label: 'Business Loan', href: '/registration?category=business-loan', icon: 'wallet' },
  { label: 'Investor', href: '/registration?category=investor', icon: 'trending' },
  { label: 'Corporate', href: '/registration?category=corporate', icon: 'building' },
  { label: 'Association', href: '/registration?category=association', icon: 'users' },
  { label: 'International', href: '/registration?category=international', icon: 'globe' },
  { label: 'Banks in India', href: '/banks', icon: 'bank' },
];

export const MENU_DIRECTORY_COLUMNS: NavItem[][] = [
  [
    { label: 'Home', href: '/', keywords: 'landing hero countdown tracks overview consultation' },
    { label: 'About', href: '/about', keywords: 'platform pathways committees operations' },
    { label: 'Investors', href: '/investors', keywords: 'investor team banks risk profiling' },
    { label: 'Event Schedule', href: '/schedule', keywords: '8 am 6 pm halls timetable' },
    { label: 'Corporate', href: '/corporate', keywords: '25 brands 500 companies tamil nadu outreach' },
    { label: 'Associations', href: '/associations', keywords: 'tanstia codissia aiema credai ficci cii' },
    { label: 'Payments', href: '/payments', keywords: '10000 50000 5 points registration options fees' },
    { label: 'Banks in India', href: '/banks', keywords: 'rbi 120 sbi private foreign rural banks logos' },
    { label: 'Top 50 Financial Brands', href: '/financial-brands', keywords: 'shriram sundaram angel venture tamil nadu' },
    { label: 'Terms & Conditions', href: '/terms', keywords: 'draft application risk fees policy' },
    { label: 'Pitch Area', href: '/pitch-area', keywords: 'pitch deck allocation halls' },
    { label: 'Investor Team Points', href: '/investor-team', keywords: 'matching budget allocation' },
  ],
  [
    { label: 'Calendar Plan', href: '/calendar-plan', keywords: '39 tasks timeline milestones' },
    { label: 'Investment Tracks', href: '/tracks', keywords: 'startups business loan expansion bank mixed meaning' },
    { label: 'Sponsors & Partners', href: '/sponsors', keywords: 'title powered by co sponsor 10 deliverables' },
    { label: 'Venue & Event Map', href: '/venue', keywords: 'layout a layout b booths hall map chennai' },
    { label: 'Team', href: '/team', keywords: 'registration committee social media operational 5 members' },
    { label: '90 Days Policy', href: '/registration-policy', keywords: '20 reasons 3 months advance registration' },
    { label: 'Registration', href: '/registration', keywords: 'participant category startup investor corporate' },
    { label: 'Event Program', href: '/event-program', keywords: 'online operations crowd management reporting' },
    { label: 'Apply', href: '/apply', keywords: 'submit application 50 lakhs 500 crore available slots only' },
    { label: 'Privacy Policy', href: '/privacy', keywords: 'data handling retention draft' },
    { label: 'AI Experts', href: '/ai-experts', keywords: 'ai tools investment market future' },
  ],
  [
    { label: 'Registration Dashboard', href: '/admin/registrations', keywords: 'admin kpi approve reject reviewer csv sevenidata' },
    { label: 'Entrepreneurs', href: '/entrepreneurs', keywords: '100 business leaders directory' },
    { label: 'Chief Guests', href: '/chief-guests', keywords: 'bank managers cfos srinivasan raja a2b top 30 vip' },
    { label: 'International', href: '/international', keywords: 'fdi joint ventures cross-border global' },
    { label: 'Government & Guidance', href: '/government', keywords: 'startuptn tiic invest india itpo msme state central' },
    { label: 'First Level Business Guidance', href: '/business-guidance', keywords: '10 steps checklist consultation' },
    { label: 'Startup', href: '/startup', keywords: '100 startups validation status pitch' },
    { label: 'Women Entrepreneurs', href: '/women-entrepreneurs', keywords: 'leadership mallika srinivasan indra nooyi' },
    { label: 'Contact & Consultation', href: '/contact', keywords: 'rajganesh consultation case studies phone email' },
    { label: 'Validation Team', href: '/validation-team', keywords: 'company background project risk' },
    { label: 'CFO Points', href: '/cfo-points', keywords: 'financial management 5 years progress' },
  ],
];

export const FOOTER_COLUMNS: { title: string; links: NavItem[] }[] = [
  {
    title: 'Event Essentials',
    links: [
      { label: 'Calendar Plan', href: '/calendar-plan' },
      { label: 'Investment Tracks', href: '/tracks' },
      { label: 'Sponsors & Partners', href: '/sponsors' },
      { label: 'Venue & Event Map', href: '/venue' },
      { label: 'Team (5 × 5)', href: '/team' },
      { label: '90 Days Policy', href: '/registration-policy' },
      { label: 'Registration', href: '/registration' },
      { label: 'Event Program', href: '/event-program' },
      { label: 'Apply Now', href: '/apply' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Network & Guidance',
    links: [
      { label: 'Registration Dashboard', href: '/admin/registrations' },
      { label: 'Entrepreneurs', href: '/entrepreneurs' },
      { label: 'Chief Guests (Top 30)', href: '/chief-guests' },
      { label: 'International', href: '/international' },
      { label: 'Government & Guidance', href: '/government' },
      { label: 'First Level Business Guidance', href: '/business-guidance' },
      { label: 'Startup', href: '/startup' },
      { label: 'Women Entrepreneurs', href: '/women-entrepreneurs' },
      { label: 'Contact & Consultation', href: '/contact' },
    ],
  },
  {
    title: 'Key Desks & Directories',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Investors & Team Points', href: '/investors' },
      { label: 'Validation Team', href: '/validation-team' },
      { label: 'Pitch Area', href: '/pitch-area' },
      { label: 'AI Experts', href: '/ai-experts' },
      { label: 'CFO Points', href: '/cfo-points' },
      { label: 'Investor Team Points', href: '/investor-team' },
      { label: 'Corporate (500 Directory)', href: '/corporate' },
      { label: 'Associations', href: '/associations' },
      { label: 'Payments (9 Options)', href: '/payments' },
      { label: 'Banks in India (120)', href: '/banks' },
      { label: 'Top 50 Financial Brands', href: '/financial-brands' },
    ],
  },
];

export const ORGANISER_CONTACT = {
  eventDate: '20 February 2027',
  eventDateCode: '20-02-2027',
  city: 'Chennai, Tamil Nadu',
  deadline: '1 February 2027',
  deadlineCode: '01-02-2027',
  strategy: 'Available slots only',
  completedBaseline: 100,
  pendingBaseline: 400,
  contactPerson: 'Mr. Rajganesh',
  phone: '9962253522',
  telHref: 'tel:+919962253522',
  email: 'rajganeshq@gmail.com',
  notificationEmail: 'sevenidatamanager@gmail.com',
  address:
    'Plot No. 78, 79 & 80, Second Floor, Jayam Nagar, Erikkarai Road, Kundrathur, Kollacheri, Chennai, Tamil Nadu 600069',
};
