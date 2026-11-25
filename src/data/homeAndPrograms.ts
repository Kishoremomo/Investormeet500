export const MEDIA_ASSETS = {
  heroSkyline: '/src/assets/images/hero_skyline_executive_1794980609314.jpg',
  aboutReception: '/src/assets/images/india_networking_atrium_1795067001149.jpg',
  trackStartups: '/src/assets/images/track_startups_1794980612650.jpg',
  trackBusinessLoan: '/src/assets/images/india_msme_credit_meeting_1795067001237.jpg',
  trackBusinessExpansion: '/src/assets/images/india_factory_expansion_1795067000496.jpg',
  trackBankLoans: '/src/assets/images/india_banking_counsel_1795067001506.jpg',
  trackMixedLoans: '/src/assets/images/india_deal_handshake_1795067000607.jpg',
  aiExpertsStage: '/src/assets/images/india_ai_summit_stage_1795067000315.jpg',
  chennaiSummitHall: '/src/assets/images/chennai_summit_hall_1794985128351.jpg',
  womenLeadershipForum: '/src/assets/images/india_women_founders_forum_1795067000203.jpg',
  globalFdiCorridor: '/src/assets/images/women_leadership_forum_1794985128809.jpg',
  msmeCreditBoardroom: '/src/assets/images/msme_credit_boardroom_1794985129467.jpg',
  startupInnovationAtrium: '/src/assets/images/startup_innovation_atrium_1794985138522.jpg',
  fdiBoardroomChennai: '/src/assets/images/card_fdi_boardroom_chennai_1795502296404.jpg',
  cfoAuditBriefing: '/src/assets/images/card_cfo_audit_briefing_1795502297370.jpg',
  tnIndustrialPark: '/src/assets/images/card_tn_industrial_park_1795502297198.jpg',
  dealLoungeChennai: '/src/assets/images/card_deal_lounge_chennai_1795502298698.jpg',
} as const;

export const VIDEO_ASSETS = {
  heroSummit: {
    src: '/media/videos/hero-summit-ambient.mp4',
    poster: '/src/assets/images/hero_skyline_executive_1794980609314.jpg',
    title: 'Investor Meet 500 · Chennai Executive Outlook',
    caption: 'Structured capital pathways uniting 500 vetted Indian founders, funds, and scheduled lenders across three Chennai halls.',
  },
  womenLeadership: {
    src: '/media/videos/women-leadership-reel.mp4',
    poster: '/src/assets/images/india_women_founders_forum_1795067000203.jpg',
    title: 'Indian Women Business Leaders & Founders Forum',
    caption: 'Spotlighting industrialists, deep-tech builders, and consumer brand pioneers scaling across India.',
  },
  startupEcosystem: {
    src: '/media/videos/startup-ecosystem-reel.mp4',
    poster: '/src/assets/images/track_startups_1794980612650.jpg',
    title: '100-Startup Validation & Pitch Flow',
    caption: 'From unit-economics validation and pitch deck scrutiny to Hall 1 angel and institutional pitch sessions.',
  },
  summitStage: {
    src: '/media/videos/summit-stage-preview.mp4',
    poster: '/src/assets/images/india_ai_summit_stage_1795067000315.jpg',
    title: 'Plenary Stage & AI Investment Dialogue',
    caption: 'Preview of the 20 February 2027 plenary keynote halls, panel moderation zones, and deal-room transitions.',
  },
} as const;

export interface TrackItem {
  id: string;
  number: string;
  title: string;
  lead: string;
  subline: string;
  meaning: string;
  idealFor: string;
  description: string;
  eligibility: string[];
  image: string;
  imageAlt: string;
}

export const TRACKS_TERM_EXPLANATION = {
  heading: 'What does “Investment Tracks” mean at Investor Meet 500?',
  summary:
    'In this summit, an “Investment Track” is a dedicated funding pathway grouped by how your company raises capital—whether through equity angel/VC pitches (Startups), revenue-backed enterprise credit (Business Loan), plant and market scale-up capital (Business Expansion), direct scheduled-lender desks (Bank Loans), or blended debt-plus-equity structures (Mixed Loans). Grouping into five focused tracks ensures founders only sit in front of vetted investors and lenders who actively write cheques for that exact capital structure.',
};

export const INVESTMENT_TRACKS: TrackItem[] = [
  {
    id: 'startups',
    number: '01',
    title: 'Startups',
    lead: 'Bold founders. Fresh ideas.',
    subline: 'Connect with growth capital.',
    meaning:
      'Early-to-growth venture equity pathway connecting scalable products, SaaS, deep-tech, and D2C startups with angel networks, syndicates, and Venture Capital funds.',
    idealFor: 'Pre-seed, Seed, and Series A founders raising equity against a validated pitch deck.',
    description:
      'For emerging businesses preparing a pitch deck, a project financial plan and a clear growth proposition. A dedicated startup coordination team and validation committee are part of the event plan.',
    eligibility: [
      'Funding requirements: ₹50 Lakhs to ₹500 Crore',
      'Pitch deck and project financial plan prepared for review',
      'Validation covering company background, product traction and risk',
    ],
    image: MEDIA_ASSETS.trackStartups,
    imageAlt: 'Startup founders collaborating over laptops',
  },
  {
    id: 'business-loan',
    number: '02',
    title: 'Business Loan',
    lead: 'Business ambition.',
    subline: 'The capital to move forward.',
    meaning:
      'Working-capital and enterprise term credit pathway structured for cash-flow positive SMEs and established trading or manufacturing units without diluting promoter equity.',
    idealFor: 'Revenue-generating businesses seeking ₹50L+ equipment, inventory, or operational credit.',
    description:
      'Designed for operating enterprises seeking structured working capital, equipment financing, or first-level business loans backed by verifiable revenue and cash-flow records.',
    eligibility: [
      'Funding requirements: ₹50 Lakhs to ₹500 Crore',
      'Audited or provisional financial statements ready for scrutiny',
      'Clear repayment projection and collateral or credit structure',
    ],
    image: MEDIA_ASSETS.trackBusinessLoan,
    imageAlt: 'Corporate finance executives reviewing loan proposals',
  },
  {
    id: 'business-expansion',
    number: '03',
    title: 'Business Expansion',
    lead: 'New markets. Bigger possibilities.',
    subline: 'Finance your next chapter.',
    meaning:
      'Scale-up growth capital pathway for profitable enterprises launching new manufacturing facilities, multi-state branches, export corridors, or joint ventures.',
    idealFor: 'Established promoters scaling capacity, factories, or geographic footprint.',
    description:
      'For established manufacturing, services, and regional enterprises scaling into new plants, export corridors, joint ventures, or multi-city distribution networks.',
    eligibility: [
      'Funding requirements: ₹50 Lakhs to ₹500 Crore',
      'Track record of prior projects and expansion feasibility plan',
      'Equity, mezzanine, or strategic growth capital alignment',
    ],
    image: MEDIA_ASSETS.trackBusinessExpansion,
    imageAlt: 'Modern industrial manufacturing facility',
  },
  {
    id: 'bank-loans',
    number: '04',
    title: 'Bank Loans',
    lead: 'Financial expertise.',
    subline: 'Structured lending discussions.',
    meaning:
      'Direct institutional banking desk pathway uniting borrowers with Nationalised, Private, and scheduled credit officers under RBI underwriting norms.',
    idealFor: 'Projects with compliant ROC/GST records and formal Project Reports seeking scheduled bank credit.',
    description:
      'Direct structured discussions with institutional banking teams across private and nationalised sectors, coordinated by the dedicated Bank Loan Team.',
    eligibility: [
      'Funding requirements: ₹50 Lakhs to ₹500 Crore',
      'Project report, balance sheet history and regulatory clearances',
      'Lending scope subject to bank norms and credit underwriting',
    ],
    image: MEDIA_ASSETS.trackBankLoans,
    imageAlt: 'Senior bank director consulting with entrepreneurs',
  },
  {
    id: 'mixed-loans',
    number: '05',
    title: 'Mixed Loans',
    lead: 'Multiple funding needs.',
    subline: 'A connected financial approach.',
    meaning:
      'Blended finance and hybrid capital-stack pathway combining senior bank debt, NBFC mezzanine lines, and private equity co-investment for large ticket sizes.',
    idealFor: 'Capital-intensive industrial, infrastructure, or cross-sector projects over ₹10 Crore.',
    description:
      'For capital-intensive proposals combining debt, term loans, promoter equity, or institutional co-investment across multiple funding instruments.',
    eligibility: [
      'Funding requirements: ₹50 Lakhs to ₹500 Crore',
      'Hybrid capital stack across equity and structured debt',
      'Cross-committee review for feasibility and risk balance',
    ],
    image: MEDIA_ASSETS.trackMixedLoans,
    imageAlt: 'Business leaders shaking hands in a boardroom',
  },
];

export const COMMITTEES = [
  {
    title: 'Startup Committee',
    description: 'Reviews startup applications, pitch readiness and growth proposals.',
    image: MEDIA_ASSETS.startupInnovationAtrium,
    imageAlt: 'Illustrative startup innovation atrium. Not a committee member.',
  },
  {
    title: 'Bank and Financial Committee',
    description: 'Guides private and nationalised banking-sector lending conversations.',
    image: MEDIA_ASSETS.msmeCreditBoardroom,
    imageAlt: 'Illustrative credit underwriting study. Not a committee member.',
  },
  {
    title: 'International Opportunities Committee',
    description: 'Coordinates cross-border delegations, FDI dialogue and overseas expansion.',
    image: MEDIA_ASSETS.fdiBoardroomChennai,
    imageAlt: 'Indian and international executives reviewing cross-border FDI project blueprints in Chennai',
  },
  {
    title: 'Business Loan Committee',
    description: 'Assesses first-level business loans, MSME proposals and expansion debt.',
    image: MEDIA_ASSETS.cfoAuditBriefing,
    imageAlt: 'Senior finance leaders auditing project cash-flow reports and credit proposals',
  },
  {
    title: 'Other committees (to be supplied)',
    description: 'Additional thematic panels and industry advisors awaiting verified names.',
    image: MEDIA_ASSETS.chennaiSummitHall,
    imageAlt: 'Illustrative Chennai plenary summit hall. Not a committee member.',
  },
];

export interface SponsorshipTier {
  id: string;
  name: string;
  amount: string;
  deliverables: string[];
}

export const SPONSORSHIP_TIERS: SponsorshipTier[] = [
  {
    id: 'title-sponsor',
    name: 'Title Sponsor',
    amount: '₹20 Lakhs',
    deliverables: [
      'Primary logo placement on the event website, positioned according to the Title Sponsor level.',
      'Primary logo on main stage or hall backdrop, subject to final design approval.',
      'Title Sponsor naming in event announcements and press note drafts.',
      'Acknowledgement by the host during the opening or closing, if the programme allows.',
      'Dedicated social media mention on organiser channels, subject to content approval.',
      'Exhibition or display space at the venue, to be agreed.',
      'Logo in printed material such as entry passes, banners or brochures.',
      'Opportunity to nominate a representative for a short address, subject to schedule.',
      'Complimentary delegate passes, number to be decided by the organisers.',
      'Post-event acknowledgement note or summary listing.',
    ],
  },
  {
    id: 'powered-by',
    name: 'Powered By',
    amount: '₹15 Lakhs',
    deliverables: [
      '"Powered By" co-branding alongside event title in digital and print headers.',
      'Prominent stage backdrop logo placement in Main Hall 1.',
      'Dedicated exhibition booth in a prime foyer or central corridor zone.',
      'Host acknowledgement during plenary and keynote transitions.',
      'Featured spotlight post across planned Instagram and YouTube announcements.',
      'Logo placement on delegate badges, lanyards or welcome kit covers.',
      'Complimentary executive delegate passes (count subject to written agreement).',
      'Access to curated networking lounge for corporate representatives.',
      'Brand mention in post-event participant communications.',
      'Priority option for sector-specific panel participation.',
    ],
  },
  {
    id: 'co-sponsor',
    name: 'Co Sponsor',
    amount: '₹10 Lakhs',
    deliverables: [
      'Co Sponsor logo placement on the event website and Sponsors directory.',
      'Logo visibility on secondary stage wings and directional standees.',
      'Standard exhibition booth allocation within the exhibition hall.',
      'Host acknowledgement during opening and track handover segments.',
      'Group social media recognition in sponsor announcement graphics.',
      'Logo inclusion in digital event brochure and hall schedule.',
      'Complimentary delegate passes for leadership team members.',
      'Opportunity to distribute approved corporate literature at the venue.',
      'Networking lounge access across the one-day summit.',
      'Post-event sponsor acknowledgement listing.',
    ],
  },
  {
    id: 'associate-sponsor',
    name: 'Associate Sponsor',
    amount: '₹5 Lakhs',
    deliverables: [
      'Associate Sponsor logo on event website sponsor strip.',
      'Logo placement on shared sponsor backdrop panels.',
      'Exhibition desk or shared showcase kiosk (subject to hall layout).',
      'Acknowledgement in printed event programme summary.',
      'Social media thank-you card inclusion.',
      'Complimentary delegate passes (allocation confirmed in writing).',
      'Listing in the participant digital welcome dossier.',
      'Access to one-to-one business networking areas.',
      'Mention in closing credits slide.',
      'Post-event digital certificate of association.',
    ],
  },
  {
    id: 'event-sponsor',
    name: 'Event Sponsor',
    amount: '₹3 Lakhs',
    deliverables: [
      'Event Sponsor recognition on the website Sponsors & Partners page.',
      'Logo displayed on hall entrance standees.',
      'Inclusion in event digital guide and schedule footer.',
      'Group social media sponsor announcement.',
      'Complimentary delegate passes for company representatives.',
      'Access to general exhibition and networking halls.',
      'Opportunity to place brand standee near designated break zone.',
      'Acknowledgement in closing host remarks.',
      'Listing in post-event summary page.',
      'Written deliverables confirmation prior to invoicing.',
    ],
  },
  {
    id: 'tag-line-partner',
    name: 'Tag Line Partner',
    amount: '₹2 Lakhs',
    deliverables: [
      'Tag Line Partner credit on event promotional banners.',
      'Logo listing on the Sponsors & Partners web page.',
      'Brand mention in official event countdown graphics.',
      'Complimentary delegate passes (to be confirmed in writing).',
      'Inclusion in digital brochure partner index.',
      'Access to investor-entrepreneur networking reception.',
      'Acknowledgement on venue digital display screens.',
      'Social media partner recognition post.',
      'Listing in post-event summary communication.',
      'Formal written agreement governing exact placement.',
    ],
  },
];

const PAYMENT_TIER_DETAILS: Record<
  number,
  { tierLabel: string; focus: string; points: string[] }
> = {
  10000: {
    tierLabel: 'Entry Delegate Pass',
    focus: 'Foundational access & first-level guidance',
    points: [
      'Confirmed delegate entry pass for one verified founder on 20 February 2027 (Chennai).',
      'Access to First Level Business Guidance readiness clinics and documentation check.',
      'Plenary hall seating for Chief Guest keynotes, AI Expert & CFO outlook sessions.',
      'Digital access to the 120 RBI Banks & Top 50 Financial Brands summit directory.',
      'Entry-level ₹10,000 fee draft (available slots only; non-lending facilitation fee).',
    ],
  },
  15000: {
    tierLabel: 'Standard Track Access',
    focus: 'Single-track pitch & committee screening',
    points: [
      'Full delegate admission for 1 representative across scheduled morning track hours.',
      'Pre-event Validation Committee review of your business summary and pitch readiness.',
      'Structured group matchmaking alignment inside one chosen Investment Track (Hall 1–3).',
      'Access to State (StartupTN/TIIC) & Central (Invest India/MSME) facilitation desks.',
      'Includes ₹5,000 priority validation step-up over the Entry ₹10,000 tier.',
    ],
  },
  20000: {
    tierLabel: 'Growth & Loan Readiness',
    focus: 'Bank liaison & financial scrutiny',
    points: [
      'Delegate admission plus dedicated 1-on-1 screening by the Bank Loan or Business Loan Team.',
      'Project financial plan feedback ahead of the 01-02-2027 cutoff date.',
      'Scheduled floor access to participating banking and NBFC institutional desks.',
      'Printed Investor Meet 500 Chennai Summit Dossier & verified track badge.',
      'Mid-tier ₹20,000 draft option (+₹5,000 step-up with priority credit-desk queueing).',
    ],
  },
  25000: {
    tierLabel: 'Validated Pitch Slot',
    focus: '100-Startup & growth pitch priority',
    points: [
      'Dedicated morning Pitch Area slot (between 8:00 AM – 2:00 PM) upon Validation Team approval.',
      'Detailed company background, unit-economics and risk verification dossier.',
      'Matched introductions to up to 3 aligned angel, VC, or sectoral lender desks.',
      'Afternoon 2:00 PM – 6:00 PM closing update review and call-report tracking.',
      'Recommended startup benchmark at ₹25,000 (+₹5,000 over ₹20,000 for formal Pitch Area slot).',
    ],
  },
  30000: {
    tierLabel: 'Multi-Track & Expansion',
    focus: 'Cross-track equity + debt facilitation',
    points: [
      'Dual-track alignment across Business Expansion, Bank Loans, or Mixed Loans desks.',
      'Two delegate credentials for Promoter + CFO / Co-founder summit attendance.',
      'Structured CFO Points & Five-Year Financial Roadmap review workshop entry.',
      'Curated placement in pre-summit shortlists sent to TN Industrial & Banking Panels.',
      '₹30,000 dual-delegate tier (+₹5,000 step-up adding second executive pass).',
    ],
  },
  35000: {
    tierLabel: 'Executive Business Table',
    focus: 'Dedicated one-to-one boardroom slots',
    points: [
      'Confirmed executive credentials for 2 leadership representatives across all three halls.',
      'Priority 1-on-1 table allocation in private Investor–Entrepreneur matchmaking blocks.',
      'Exhibition display flyer/dossier placement at the Regional Business Hub desk.',
      'Direct coordination with Corporate (500 Directory) and Tamil Nadu Association Heads.',
      '₹35,000 expansion tier (+₹5,000 above ₹30,000 unlocking private matchmaking slots).',
    ],
  },
  40000: {
    tierLabel: 'Corporate & Mixed Capital',
    focus: 'Hybrid debt-equity & buyer-seller lounge',
    points: [
      'Full Business Lounge access for up to 3 senior executives on summit day.',
      'Dedicated Mixed Loans & Mezzanine structuring review with Finance & Financial Committees.',
      'Featured company profile inside the physical Corporate & Financial Investor Book.',
      'Priority scheduling window with Participating Investment Experts and AI Strategy Leads.',
      '₹40,000 corporate syndicate tier (+₹5,000 increment adding 3rd pass & lounge access).',
    ],
  },
  45000: {
    tierLabel: 'International & FDI Delegate',
    focus: 'Cross-border JV & delegation priority',
    points: [
      'International Opportunities & FDI Corridor fast-track scheduling across Hall 3.',
      'Up to 3 executive passes plus dedicated outstation/NRI hospitality desk coordination.',
      'Structured Joint Venture, Technology Partnership & Import-Export matchmaking.',
      'Priority inclusion in post-event call-report follow-up notes to Global Funds.',
      '₹45,000 international tier (+₹5,000 above ₹40,000 for cross-border FDI facilitation).',
    ],
  },
  50000: {
    tierLabel: 'Apex VIP & Syndicate Partner',
    focus: 'Maximum visibility, booth option & full-day lounge',
    points: [
      'Maximum summit tier: 4 VIP executive passes with VIP Lounge & Main Stage proximity.',
      'Priority custom exhibition/pitch desk scheduling across morning & afternoon sessions.',
      'Direct Organiser Desk & Multi-Committee escalation review prior to 01-02-2027.',
      'Featured spotlight recognition in curated investor shortlists and closing dossiers.',
      'Apex ₹50,000 option (highest draft tier; +₹5,000 above ₹45,000 covering 4 VIP passes).',
    ],
  },
};

export const PAYMENT_OPTIONS = Array.from({ length: 9 }, (_, idx) => {
  const amount = 10000 + idx * 5000;
  const prevAmount = amount - 5000;
  const details = PAYMENT_TIER_DETAILS[amount];
  return {
    optionNumber: String(idx + 1).padStart(2, '0'),
    amount,
    formattedAmount: `₹${amount.toLocaleString('en-IN')}`,
    tierLabel: details.tierLabel,
    focus: details.focus,
    points: details.points,
    summary:
      idx === 0
        ? `₹${amount.toLocaleString('en-IN')} is option 1 of 9 (${details.tierLabel}) in the registration fee structure.`
        : `₹${amount.toLocaleString('en-IN')} is option ${idx + 1} of 9 (${details.tierLabel}) in the registration fee structure.`,
    comparison:
      idx === 0
        ? 'Lowest entry tier (₹10,000) · Available slots only.'
        : `₹5,000 above the ₹${prevAmount.toLocaleString('en-IN')} tier · Available slots only.`,
  };
});

export const EVENT_SCHEDULE_SLOTS = [
  { time: '8:00 – 9:00 AM', activity: 'Investor interactions and pitch deck sessions', halls: 'Hall 1, Hall 2, Hall 3' },
  { time: '9:00 – 10:00 AM', activity: 'Investor interactions and pitch deck sessions', halls: 'Hall 1, Hall 2, Hall 3' },
  { time: '10:00 – 11:00 AM', activity: 'Investor interactions and pitch deck sessions', halls: 'Hall 1, Hall 2, Hall 3' },
  { time: '11:00 AM – 12:00 PM', activity: 'Investor interactions and pitch deck sessions', halls: 'Hall 1, Hall 2, Hall 3' },
  { time: '12:00 – 1:00 PM', activity: 'Investor interactions and pitch deck sessions', halls: 'Hall 1, Hall 2, Hall 3' },
  { time: '1:00 – 2:00 PM', activity: 'Investor interactions and pitch deck sessions', halls: 'Hall 1, Hall 2, Hall 3' },
  { time: '2:00 – 3:00 PM', activity: 'Final closing updates', halls: 'Hall details will be updated' },
  { time: '3:00 – 4:00 PM', activity: 'Final closing updates', halls: 'Hall details will be updated' },
  { time: '4:00 – 5:00 PM', activity: 'Final closing updates', halls: 'Hall details will be updated' },
  { time: '5:00 – 6:00 PM', activity: 'Final closing updates', halls: 'Hall details will be updated' },
];

export const CHIEF_GUEST_ROLES = [
  { role: 'Bank managers', focus: 'Lending and banking perspectives' },
  { role: 'CFOs', focus: 'Financial management and company financial planning' },
  { role: 'Investment experts', focus: 'Investment risk, validation and market tools' },
  { role: 'Government representatives', focus: 'Government processes and policy context' },
  { role: 'AI experts', focus: 'The future of AI investment' },
  { role: 'Other invited guests', focus: 'Success guidance, failure stories and five-year planning' },
];

export const CENTRAL_GOVT_RESOURCES = [
  {
    name: 'Invest India',
    description:
      'National investment promotion and facilitation agency of the Government of India, with information for investors on sectors, policy and state opportunities.',
    url: 'https://www.investindia.gov.in/',
  },
  {
    name: 'ITPO',
    description: 'India Trade Promotion Organisation: official trade fair and exhibition resources.',
    url: 'https://indiatradefair.com/',
  },
  {
    name: 'Startup India',
    description: 'Official Startup India initiative resources for entrepreneurs and the startup ecosystem.',
    url: 'https://www.startupindia.gov.in/',
  },
  {
    name: 'Ministry of Finance, Government of India',
    description:
      'Central ministry responsible for the Union Budget, taxation, financial sector and economic policy.',
    url: 'https://finmin.nic.in/',
  },
  {
    name: 'Ministry of MSME',
    description: 'Central ministry for micro, small and medium enterprise schemes and registrations.',
    url: 'https://msme.gov.in/',
  },
];

export const STATE_GOVT_RESOURCES = [
  {
    name: 'Guidance Tamil Nadu',
    description:
      'Tamil Nadu government investment promotion and facilitation agency, with state sector and investor information.',
    url: 'https://investingintamilnadu.com/',
  },
  {
    name: 'Tamil Nadu MSME',
    description: 'Tamil Nadu micro, small and medium enterprise department resources and services.',
    url: 'https://www.msmeonline.tn.gov.in/',
  },
  {
    name: 'StartupTN',
    description: 'Tamil Nadu startup and innovation mission supporting founders across districts.',
    url: 'https://startuptn.in/',
  },
  {
    name: 'TIDCO',
    description:
      'Tamil Nadu Industrial Development Corporation facilitating large industrial and infrastructure projects.',
    url: 'https://tidco.com/',
  },
  {
    name: 'TIIC',
    description:
      'Tamil Nadu Industrial Investment Corporation providing financial assistance to MSMEs and industrial units.',
    url: 'https://www.tiic.org/',
  },
];

export const NINETY_DAY_POLICY_GROUPS = [
  {
    group: 'GROUP 1',
    title: 'Registration & Verification',
    items: [
      { no: '01', title: 'Participant Verification', desc: 'Verify the identity and business credentials of registered participants.' },
      { no: '02', title: 'Investor Background Verification', desc: 'Assess investor profiles and investment interests.' },
      { no: '03', title: 'Business Profile Collection', desc: 'Collect complete company and entrepreneur information.' },
      { no: '04', title: 'Investment Requirement Analysis', desc: 'Understand funding requirements and investment expectations.' },
      { no: '05', title: 'Participant Categorisation', desc: 'Classify investors, entrepreneurs, startups, business owners and associations.' },
    ],
  },
  {
    group: 'GROUP 2',
    title: 'Investment & Business Matchmaking',
    items: [
      { no: '06', title: 'Investor–Entrepreneur Matching', desc: 'Identify suitable investors for aligned sectors and ticket sizes.' },
      { no: '07', title: 'One-to-One Meeting Scheduling', desc: 'Allocate structured discussion windows across three halls.' },
      { no: '08', title: 'Business Proposal Evaluation', desc: 'Screen pitch decks, financial projections and risk factors prior to event day.' },
      { no: '09', title: 'Investment Opportunity Shortlisting', desc: 'Prepare curated sector shortlists for participating funds and lenders.' },
      { no: '10', title: 'International Investor Coordination', desc: 'Align cross-border delegates, visas and sector briefing dossiers.' },
    ],
  },
  {
    group: 'GROUP 3',
    title: 'Event Planning & Arrangements',
    items: [
      { no: '11', title: 'Meeting Room Allocation', desc: 'Assign private consultation rooms and exhibition booths accurately.' },
      { no: '12', title: 'Appointment Scheduling', desc: 'Synchronise 500 participants across 8 AM to 6 PM time blocks.' },
      { no: '13', title: 'Travel & Accommodation Planning', desc: 'Coordinate outstation and international delegate hospitality logistics.' },
      { no: '14', title: 'Security & Access Management', desc: 'Issue verified entry credentials and hall-access badges.' },
      { no: '15', title: 'Professional Event Coordination', desc: 'Rehearse stage, audio-visual, moderation and crowd-management teams.' },
    ],
  },
  {
    group: 'GROUP 4',
    title: 'Business Development & Investment Preparation',
    items: [
      { no: '16', title: 'Business Documentation', desc: 'Allow founders sufficient lead time to refine compliance and ROC records.' },
      { no: '17', title: 'Investor Due Diligence Preparation', desc: 'Organise data rooms, project reports and historical performance metrics.' },
      { no: '18', title: 'Strategic Partnership Identification', desc: 'Map corporate, technology and distribution synergies ahead of summit day.' },
      { no: '19', title: 'Association & Corporate Delegation Planning', desc: 'Coordinate group registrations from industrial and trade associations.' },
      { no: '20', title: 'Maximum Investment Outcomes', desc: 'Ensure participants arrive informed, verified and pitch-ready.' },
    ],
  },
];

export const FIRST_LEVEL_GUIDANCE_STEPS = [
  { no: '01', title: 'Basic Business Consultation', desc: 'A first conversation to understand where you are today and what you want to build.' },
  { no: '02', title: 'How to Start a Business', desc: 'The usual sequence from idea to a legally recognised, operating business.' },
  { no: '03', title: 'Business Idea and Sector Selection', desc: 'Compare ideas against your skills, local demand and available capital.' },
  { no: '04', title: 'Business Registration Guidance', desc: 'Understand common registration routes and which authorities are involved.' },
  { no: '05', title: 'Basic Business Plan Preparation', desc: 'Outline market, costs, revenue and the funding you need.' },
  { no: '06', title: 'Startup Readiness', desc: 'Check whether your team, product and numbers are ready to present.' },
  { no: '07', title: 'Initial Funding Options', desc: 'An overview of own funds, bank loans, grants and investors.' },
  { no: '08', title: 'Documentation Checklist', desc: 'Gather identity, business, financial and project documents.' },
  { no: '09', title: 'Guidance on Available Support Resources', desc: 'Find official government and agency resources.' },
  { no: '10', title: 'Next Steps for Expert Consultation', desc: 'Prepare questions before speaking to a qualified professional.' },
];

export const INTERNATIONAL_GROUPS = [
  {
    group: 'GROUP 1 OF 4',
    title: 'International Investment Opportunities',
    items: [
      'Foreign Direct Investment (FDI)',
      'International Joint Ventures',
      'Global Startup Investments',
      'International Franchise Opportunities',
      'Import & Export Business Investments',
      'Overseas Business Expansion',
      'International Real Estate Investments',
      'Global Technology Partnerships',
      'Cross-Border Manufacturing Investments',
      'International Venture Capital & Private Equity',
    ],
  },
  {
    group: 'GROUP 2 OF 4',
    title: 'National Investment Opportunities',
    items: [
      'Indian Startup Investments',
      'MSME Investment Opportunities',
      'Manufacturing & Industrial Projects',
      'Real Estate & Infrastructure',
      'Franchise & Dealership Opportunities',
      'Renewable Energy Projects',
      'Agriculture & Food Processing',
      'Healthcare & Education',
      'Technology & Artificial Intelligence',
      'Mining & Construction Industries',
    ],
  },
  {
    group: 'GROUP 3 OF 4',
    title: 'Exclusive Investor Meet Programs',
    items: [
      'International Investor Networking',
      'National Investor Networking',
      'Startup Funding & Pitch Sessions',
      'Business Buyers & Sellers Meet',
      'Investor–Entrepreneur One-to-One Meetings',
      'Franchise & Business Opportunities Expo',
      'Bank & Financial Institution Pavilion',
      'Venture Capital & Angel Investors Meet',
      'International Business Delegations',
      'Strategic Partnerships & Joint Ventures',
    ],
  },
  {
    group: 'GROUP 4 OF 4',
    title: 'Target Participants',
    items: [
      'International & Domestic Investors',
      'High-Net-Worth Individuals (HNIs)',
      'Venture Capital Firms',
      'Angel Investors',
      'Family Offices',
      'Startup Founders',
      'Business Owners & Entrepreneurs',
      'Banks & Financial Institutions',
      'Franchise Companies',
      'International Trade Organizations',
    ],
  },
];

export interface TeamMemberSlot {
  slot: string;
  name: string;
  role: string;
  status: 'Confirmed Lead' | 'Appointee Pending';
}

export interface EventTeamItem {
  no: string;
  title: string;
  summary: string;
  responsibilities: string[];
  members: TeamMemberSlot[];
}

export const EVENT_TEAMS: EventTeamItem[] = [
  {
    no: '01',
    title: 'Registration Team',
    summary: 'Participant registration and verification support.',
    responsibilities: [
      'Receive and check registration details across all 5 tracks',
      'Follow up on missing KYC, ROC, and project financial information',
      'Pass verified profiles to the Validation Committee before 01-02-2027',
      'Maintain Completed (100) vs Pending (400) slot discipline',
      'Answer participant onboarding questions via sevenidatamanager@gmail.com',
    ],
    members: [
      { slot: '01', name: 'Mr. Rajganesh', role: 'Organiser Desk & Registration Lead', status: 'Confirmed Lead' },
      { slot: '02', name: 'Registration Verifier — Seat 02 (TBC)', role: 'Track & Category Intake Officer', status: 'Appointee Pending' },
      { slot: '03', name: 'Registration Verifier — Seat 03 (TBC)', role: 'Document Checklist Executive', status: 'Appointee Pending' },
      { slot: '04', name: 'Registration Verifier — Seat 04 (TBC)', role: 'Slot Allocation Coordinator', status: 'Appointee Pending' },
      { slot: '05', name: 'Registration Verifier — Seat 05 (TBC)', role: 'Delegate Check-in & Helpdesk Lead', status: 'Appointee Pending' },
    ],
  },
  {
    no: '02',
    title: 'Committee Team',
    summary: 'Committee coordination and validation support.',
    responsibilities: [
      'Review company background, audited statements and ROC standing',
      'Validate active projects, unit economics and previous track record',
      'Assess sector success stories and execution risk profiles',
      'Recommend approval, query or waitlist placement for Pitch Area',
      'Support Hall 1, Hall 2 and Hall 3 pitch slot allocation',
    ],
    members: [
      { slot: '01', name: 'Dr. Meenakshi Sundaram', role: 'Startup & Validation Review Chair', status: 'Confirmed Lead' },
      { slot: '02', name: 'S. Raghavan', role: 'Business Expansion Reviewer', status: 'Confirmed Lead' },
      { slot: '03', name: 'R. Padmanabhan', role: 'Mixed Capital & Structuring Advisor', status: 'Confirmed Lead' },
      { slot: '04', name: 'Committee Evaluator — Seat 04 (TBC)', role: 'International & FDI Panel Member', status: 'Appointee Pending' },
      { slot: '05', name: 'Committee Evaluator — Seat 05 (TBC)', role: 'Governance & Compliance Reviewer', status: 'Appointee Pending' },
    ],
  },
  {
    no: '03',
    title: 'Social Media Team',
    summary: 'Official channels and event communications.',
    responsibilities: [
      'Plan Instagram, YouTube and LinkedIn campaign announcements',
      'Publish daily countdown updates ahead of 20 February 2027',
      'Share only approved founder spotlights, reels and partner cards',
      'Track inbound delegate comments and route enquiries cleanly',
      'Coordinate official messaging and press notes with the Organiser Desk',
    ],
    members: [
      { slot: '01', name: 'Social & Digital Desk — Lead (TBC)', role: 'Campaign Director (Instagram / YouTube / LinkedIn)', status: 'Appointee Pending' },
      { slot: '02', name: 'Video & Reels Producer — Seat 02 (TBC)', role: 'YouTube Explainer & Stage Footage Editor', status: 'Appointee Pending' },
      { slot: '03', name: 'Instagram Creative Lead — Seat 03 (TBC)', role: 'Countdown & Track Poster Designer', status: 'Appointee Pending' },
      { slot: '04', name: 'LinkedIn B2B Outreach — Seat 04 (TBC)', role: 'Investor & Association Digest Coordinator', status: 'Appointee Pending' },
      { slot: '05', name: 'Community Moderator — Seat 05 (TBC)', role: 'Delegate Q&A and WhatsApp Channel Lead', status: 'Appointee Pending' },
    ],
  },
  {
    no: '04',
    title: 'Bank Loan Team',
    summary: 'Bank loan track coordination.',
    responsibilities: [
      'Coordinate scheduled credit desks inside the Bank Loans track',
      'Liaise with Nationalised, Private, Small Finance and Foreign banks',
      'Collect project reports, balance sheets and collateral summaries',
      'Schedule one-to-one underwriting discussions on summit day',
      'Record call outcomes neutrally without pre-guaranteeing lending',
    ],
    members: [
      { slot: '01', name: 'K. Venkataraman', role: 'Bank Loans & Institutional Underwriting Lead', status: 'Confirmed Lead' },
      { slot: '02', name: 'Credit Liaison Officer — Seat 02 (TBC)', role: 'Nationalised Banks Desk Coordinator', status: 'Appointee Pending' },
      { slot: '03', name: 'Credit Liaison Officer — Seat 03 (TBC)', role: 'Private & Small Finance Banks Coordinator', status: 'Appointee Pending' },
      { slot: '04', name: 'Project Finance Analyst — Seat 04 (TBC)', role: 'CMA & Project Report Reviewer', status: 'Appointee Pending' },
      { slot: '05', name: 'NBFC Syndication Desk — Seat 05 (TBC)', role: 'Top 50 Financial Brands Coordinator', status: 'Appointee Pending' },
    ],
  },
  {
    no: '05',
    title: 'Other Operational Teams',
    summary: 'Venue, logistics, hospitality and pitch-hall floor coordination.',
    responsibilities: [
      'Manage Hall 1, Hall 2 and Hall 3 transitions from 8 AM to 6 PM',
      'Oversee QR badge check-in, access security and crowd flow',
      'Support 20–30 exhibition booths and sponsor stage backdrops',
      'Coordinate stage AV, timers and Chief Guest green-room protocol',
      'Compile end-of-day guarantee-level call reports and closing briefs',
    ],
    members: [
      { slot: '01', name: 'Floor Operations Lead — Seat 01 (TBC)', role: 'Chennai Venue & Layout Controller', status: 'Appointee Pending' },
      { slot: '02', name: 'Stage & AV Manager — Seat 02 (TBC)', role: 'Main Hall Presentation & Timer Lead', status: 'Appointee Pending' },
      { slot: '03', name: 'VIP & Chief Guest Liaison — Seat 03 (TBC)', role: 'Keynote Protocol & Hospitality Officer', status: 'Appointee Pending' },
      { slot: '04', name: 'Exhibition Stall Ops — Seat 04 (TBC)', role: 'Sponsor Booth & Standee Supervisor', status: 'Appointee Pending' },
      { slot: '05', name: 'Reporting & Analytics — Seat 05 (TBC)', role: 'Afternoon Closing Update Desk (2–6 PM)', status: 'Appointee Pending' },
    ],
  },
];

export const CASE_STUDY_REFERENCES = [
  {
    name: 'TN Global Investors Meet 2024',
    subtitle: 'tngim2024.com',
    category: 'State Global Summit',
    image: MEDIA_ASSETS.chennaiSummitHall,
    imageAlt: 'Plenary investment auditorium in Chennai',
    url: 'https://www.tngim2024.com/',
  },
  {
    name: 'StartupTN',
    subtitle: 'startuptn.in',
    category: 'State Startup Mission',
    image: MEDIA_ASSETS.startupInnovationAtrium,
    imageAlt: 'Tamil Nadu startup founders collaborating in innovation atrium',
    url: 'https://startuptn.in/',
  },
  {
    name: 'TiE Chennai',
    subtitle: 'Reference named in the event plan',
    category: 'Founder Mentorship',
    image: MEDIA_ASSETS.dealLoungeChennai,
    imageAlt: 'Startup founders and mentors conversing at networking tables',
    url: 'https://chennai.tie.org/',
  },
  {
    name: 'The Chennai Angels',
    subtitle: 'thechennaiangels.com',
    category: 'Angel Syndicate',
    image: MEDIA_ASSETS.trackStartups,
    imageAlt: 'Early-stage venture pitch evaluation discussion',
    url: 'https://www.thechennaiangels.com/',
  },
  {
    name: 'IIT Startups Investors',
    subtitle: 'iitstartups.org/investors',
    category: 'Deep-Tech Network',
    image: MEDIA_ASSETS.aiExpertsStage,
    imageAlt: 'Technology keynote presenter addressing engineering founders',
    url: 'https://www.iitstartups.org/investors',
  },
  {
    name: 'CII Big Picture',
    subtitle: 'ciibigpicture.in',
    category: 'Industry Confederation',
    image: MEDIA_ASSETS.fdiBoardroomChennai,
    imageAlt: 'Senior corporate leaders in boardroom strategic review',
    url: 'https://ciibigpicture.in/',
  },
  {
    name: 'FICCI for Startups',
    subtitle: 'ficciforstartups.org',
    category: 'National Chamber',
    image: MEDIA_ASSETS.cfoAuditBriefing,
    imageAlt: 'Finance advisors inspecting growth projections',
    url: 'https://ficciforstartups.org/',
  },
  {
    name: 'Forge Innovation & Ventures',
    subtitle: 'forgeforward.in',
    category: 'Industrial Hardware Hub',
    image: MEDIA_ASSETS.tnIndustrialPark,
    imageAlt: 'Modern Tamil Nadu clean-tech industrial campus',
    url: 'https://www.forgeforward.in/',
  },
];

export const PARTNERS_MARQUEE = [
  { name: 'JCB', fullName: 'JCB India', accent: '#f5b800', bg: '#111827', url: 'https://www.jcb.com/en-in' },
  { name: 'Kobelco', fullName: 'Kobelco Construction Equipment', accent: '#00a3e0', bg: '#ffffff', url: 'https://www.kobelco-in.com/' },
  { name: 'Volvo', fullName: 'Volvo Construction Equipment', accent: '#003057', bg: '#ffffff', url: 'https://www.volvoce.com/' },
  { name: 'L&T', fullName: 'Larsen & Toubro', accent: '#0056a4', bg: '#ffffff', url: 'https://www.larsentoubro.com/' },
  { name: 'BKT', fullName: 'Balkrishna Industries (BKT)', accent: '#1e5b3a', bg: '#ffffff', url: 'https://www.bkt-tires.com/' },
];
