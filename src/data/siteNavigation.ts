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
  { label: 'Payments', href: '/payments' },
  { label: 'Validation Team', href: '/event-program#validation' },
  { label: 'Pitch Area', href: '/event-program#pitch' },
  { label: 'AI Experts', href: '/speakers#ai-experts' },
  { label: 'CFO Points', href: '/speakers#cfo' },
  { label: 'Investor Team Points', href: '/investors#investor-team' },
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
    { label: 'Home', href: '/', keywords: 'landing hero countdown tracks overview' },
    { label: 'About', href: '/about', keywords: 'platform pathways committees operations' },
    { label: 'Investors', href: '/investors', keywords: 'investor team banks risk profiling' },
    { label: 'Event Schedule', href: '/schedule', keywords: '8 am 6 pm halls timetable' },
    { label: 'Corporate', href: '/corporate', keywords: '25 brands 500 companies outreach' },
    { label: 'Associations', href: '/associations', keywords: 'tanstia codissia aiema credai ficci cii' },
    { label: 'Payments', href: '/payments', keywords: '10000 50000 registration options fees' },
    { label: 'Banks in India', href: '/banks', keywords: 'rbi 120 sbi private foreign rural banks' },
    { label: 'Top 50 Financial Brands', href: '/financial-brands', keywords: 'shriram sundaram angel venture tamil nadu' },
    { label: 'Terms & Conditions', href: '/terms', keywords: 'draft application risk fees policy' },
    { label: 'Pitch Area', href: '/event-program#pitch', keywords: 'pitch deck allocation halls' },
    { label: 'Investor Team Points', href: '/investors#investor-team', keywords: 'matching budget allocation' },
  ],
  [
    { label: 'Calendar Plan', href: '/calendar-plan', keywords: '39 tasks timeline milestones' },
    { label: 'Investment Tracks', href: '/tracks', keywords: 'startups business loan expansion bank mixed' },
    { label: 'Sponsors & Partners', href: '/sponsors', keywords: 'title powered by co sponsor deliverables' },
    { label: 'Venue & Event Map', href: '/venue', keywords: 'layout a layout b booths hall map chennai' },
    { label: 'Team', href: '/team', keywords: 'registration committee social media operational' },
    { label: '90-Day Policy', href: '/registration-policy', keywords: '20 reasons 3 months advance registration' },
    { label: 'Registration', href: '/registration', keywords: 'participant category startup investor corporate' },
    { label: 'Event Program', href: '/event-program', keywords: 'online operations crowd management reporting' },
    { label: 'Apply', href: '/apply', keywords: 'submit application 50 lakhs 500 crore' },
    { label: 'Privacy Policy', href: '/privacy', keywords: 'data handling retention draft' },
    { label: 'AI Experts', href: '/speakers#ai-experts', keywords: 'ai tools investment market future' },
  ],
  [
    { label: 'Registration Dashboard', href: '/admin/registrations', keywords: 'admin kpi approve reject reviewer csv' },
    { label: 'Entrepreneurs', href: '/entrepreneurs', keywords: '100 business leaders directory' },
    { label: 'Chief Guests', href: '/speakers', keywords: 'bank managers cfos finance minister speakers' },
    { label: 'International', href: '/international', keywords: 'fdi joint ventures cross-border global' },
    { label: 'Government & Guidance', href: '/government', keywords: 'startuptn tiic invest india itpo msme' },
    { label: 'First Level Business Guidance', href: '/business-guidance', keywords: '10 steps checklist consultation' },
    { label: 'Startup', href: '/startup', keywords: '100 startups validation status pitch' },
    { label: 'Women Entrepreneurs', href: '/women-entrepreneurs', keywords: 'leadership mallika srinivasan indra nooyi' },
    { label: 'Contact', href: '/contact', keywords: 'rajganesh consultation case studies phone email' },
    { label: 'Validation Team', href: '/event-program#validation', keywords: 'company background project risk' },
    { label: 'CFO Points', href: '/speakers#cfo', keywords: 'financial management 5 years progress' },
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
      { label: 'Team', href: '/team' },
      { label: '90-Day Policy', href: '/registration-policy' },
      { label: 'Registration', href: '/registration' },
      { label: 'Event Program', href: '/event-program' },
      { label: 'Apply', href: '/apply' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Network & Guidance',
    links: [
      { label: 'Registration Dashboard', href: '/admin/registrations' },
      { label: 'Entrepreneurs', href: '/entrepreneurs' },
      { label: 'Chief Guests', href: '/speakers' },
      { label: 'International', href: '/international' },
      { label: 'Government & Guidance', href: '/government' },
      { label: 'First Level Business Guidance', href: '/business-guidance' },
      { label: 'Startup', href: '/startup' },
      { label: 'Women Entrepreneurs', href: '/women-entrepreneurs' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Organisation & Participation',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Investors', href: '/investors' },
      { label: 'Event Schedule', href: '/schedule' },
      { label: 'Corporate', href: '/corporate' },
      { label: 'Associations', href: '/associations' },
      { label: 'Payments', href: '/payments' },
      { label: 'Banks in India', href: '/banks' },
      { label: 'Top 50 Financial Brands', href: '/financial-brands' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
];

export const ORGANISER_CONTACT = {
  eventDate: '20 February 2027',
  city: 'Chennai, Tamil Nadu',
  deadline: '1 February 2027',
  contactPerson: 'Mr. Rajganesh',
  phone: '9962253522',
  telHref: 'tel:+919962253522',
  email: 'rajganeshq@gmail.com',
  address:
    'Plot No. 78, 79 & 80, Second Floor, Jayam Nagar, Erikkarai Road, Kundrathur, Kollacheri, Chennai, Tamil Nadu 600069',
};
