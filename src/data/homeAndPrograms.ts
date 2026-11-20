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
  description: string;
  eligibility: string[];
  image: string;
  imageAlt: string;
}

export const INVESTMENT_TRACKS: TrackItem[] = [
  {
    id: 'startups',
    number: '01',
    title: 'Startups',
    lead: 'Bold founders. Fresh ideas.',
    subline: 'Connect with growth capital.',
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
    image: MEDIA_ASSETS.globalFdiCorridor,
    imageAlt: 'Illustrative global trade and financial corridor. Not a committee member.',
  },
  {
    title: 'Business Loan Committee',
    description: 'Assesses first-level business loans, MSME proposals and expansion debt.',
    image: MEDIA_ASSETS.womenLeadershipForum,
    imageAlt: 'Illustrative executive roundtable room. Not a committee member.',
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

export const PAYMENT_OPTIONS = Array.from({ length: 9 }, (_, idx) => {
  const amount = 10000 + idx * 5000;
  const prevAmount = amount - 5000;
  return {
    optionNumber: String(idx + 1).padStart(2, '0'),
    amount,
    formattedAmount: `₹${amount.toLocaleString('en-IN')}`,
    summary:
      idx === 0
        ? `₹${amount.toLocaleString('en-IN')} is option 1 of 9 in the organiser's draft list of registration amounts.`
        : `₹${amount.toLocaleString('en-IN')} is option ${idx + 1} of 9 in the organiser's draft list of registration amounts.`,
    comparison:
      idx === 0
        ? 'It is the lowest amount in the draft list.'
        : `It is ₹5,000 above the previous draft option of ₹${prevAmount.toLocaleString('en-IN')}.`,
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
  { role: 'Other invited speakers', focus: 'Success guidance, failure stories and five-year planning' },
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

export const EVENT_TEAMS = [
  {
    no: '01',
    title: 'Registration Team',
    summary: 'Participant registration and verification support.',
    responsibilities: [
      'Receive and check registration details',
      'Follow up on missing information',
      'Pass complete profiles to the validation committee',
      'Keep participant records accurate',
      'Answer registration questions',
    ],
  },
  {
    no: '02',
    title: 'Committee Team',
    summary: 'Committee coordination and validation support.',
    responsibilities: [
      'Review company background',
      'Validate projects and previous projects',
      'Assess success stories and risk',
      'Recommend approval or rejection',
      'Support pitch allocation',
    ],
  },
  {
    no: '03',
    title: 'Social Media Team',
    summary: 'Official channels and event communications.',
    responsibilities: [
      'Plan Instagram and YouTube content',
      'Prepare event announcements',
      'Share only approved posts and videos',
      'Track audience questions',
      'Coordinate with organisers on messaging',
    ],
  },
  {
    no: '04',
    title: 'Bank Loan Team',
    summary: 'Bank loan track coordination.',
    responsibilities: [
      'Coordinate the Bank Loans track',
      'Liaise with participating institutions once confirmed',
      'Collect lending-related documents',
      'Schedule bank discussions',
      'Record outcomes without promising lending',
    ],
  },
  {
    no: '05',
    title: 'Other Operational Teams',
    summary: 'Venue, logistics, hospitality and pitch-hall floor coordination.',
    responsibilities: [
      'Manage Hall 1, Hall 2 and Hall 3 transitions',
      'Oversee badge check-in and crowd management',
      'Support exhibition booths and sponsor displays',
      'Coordinate AV and stage schedule adherence',
      'Compile end-of-day closing reports',
    ],
  },
];

export const CASE_STUDY_REFERENCES = [
  { name: 'TN Global Investors Meet 2024', subtitle: 'tngim2024.com', url: 'https://www.tngim2024.com/' },
  { name: 'StartupTN', subtitle: 'startuptn.in', url: 'https://startuptn.in/' },
  { name: 'TiE Chennai', subtitle: 'Reference named in the event plan', url: 'https://chennai.tie.org/' },
  { name: 'The Chennai Angels', subtitle: 'thechennaiangels.com', url: 'https://www.thechennaiangels.com/' },
  { name: 'IIT Startups Investors', subtitle: 'iitstartups.org/investors', url: 'https://www.iitstartups.org/investors' },
  { name: 'CII Big Picture', subtitle: 'ciibigpicture.in', url: 'https://ciibigpicture.in/' },
  { name: 'FICCI for Startups', subtitle: 'ficciforstartups.org', url: 'https://ficciforstartups.org/' },
  { name: 'Forge Innovation & Ventures', subtitle: 'forgeforward.in', url: 'https://www.forgeforward.in/' },
];

export const PARTNERS_MARQUEE = [
  { name: 'JCB', fullName: 'JCB India', accent: '#f5b800', bg: '#111827', url: 'https://www.jcb.com/en-in' },
  { name: 'Kobelco', fullName: 'Kobelco Construction Equipment', accent: '#00a3e0', bg: '#ffffff', url: 'https://www.kobelco-in.com/' },
  { name: 'Volvo', fullName: 'Volvo Construction Equipment', accent: '#003057', bg: '#ffffff', url: 'https://www.volvoce.com/' },
  { name: 'L&T', fullName: 'Larsen & Toubro', accent: '#0056a4', bg: '#ffffff', url: 'https://www.larsentoubro.com/' },
  { name: 'BKT', fullName: 'Balkrishna Industries (BKT)', accent: '#1e5b3a', bg: '#ffffff', url: 'https://www.bkt-tires.com/' },
];
