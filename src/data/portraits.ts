export interface ParticipantProfileHighlight {
  id: string;
  fullName: string;
  roleTitle: string;
  company: string;
  category: 'Founder' | 'Investor' | 'Exhibitor';
  track: string;
  location: string;
  mandate: string;
  quote: string;
  portraitUrl: string;
  stage: string;
}

export interface CommitteeReviewerProfile {
  name: string;
  role: string;
  committee: string;
  credentials: string;
  focusAreas: string[];
  perspective: string;
  portraitUrl: string;
  hallFocus: string;
}

export const PARTICIPANT_PORTRAIT_BY_ID: Record<string, string> = {
  'IM500-2027-0101': '/src/assets/images/portrait_arvindhan_founder_1794983006378.jpg',
  'IM500-2027-0102': '/src/assets/images/portrait_priyadharshini_md_1794983006310.jpg',
  'IM500-2027-0103': '/src/assets/images/portrait_senthil_clean_1794983034198.jpg',
  'IM500-2027-0104': '/src/assets/images/portrait_ananya_investor_1794983007913.jpg',
  'IM500-2027-0105': '/src/assets/images/portrait_muthukumar_export_1794983008190.jpg',
  'IM500-2027-0106': '/src/assets/images/portrait_vikramaditya_exec_1794983008750.jpg',
  'IM500-2027-0107': '/src/assets/images/portrait_deepak_medtech_1794983009242.jpg',
  'IM500-2027-0108': '/src/assets/images/portrait_kavitha_engineering_1794983009512.jpg',
};

export const REVIEWER_PORTRAIT_BY_NAME: Record<string, string> = {
  'Dr. Meenakshi Sundaram': '/src/assets/images/portrait_meenakshi_advisor_1794983010263.jpg',
  'K. Venkataraman': '/src/assets/images/portrait_venkataraman_clean_1794983034727.jpg',
  'S. Raghavan': '/src/assets/images/portrait_raghavan_analyst_1794983011305.jpg',
  'R. Padmanabhan': '/src/assets/images/portrait_padmanabhan_counsel_1794983011561.jpg',
};

/**
 * Authentic, visually audited photographs of named public entrepreneurs & business leaders.
 * Every entry corresponds 1-to-1 with the named individual; unverified entries intentionally
 * remain null so AvatarPortrait renders an accurate monogram crest rather than substituting a wrong face.
 */
export const VERIFIED_LEADER_PORTRAIT_BY_NAME: Record<string, string> = {
  'Mallika Srinivasan': '/media/people/mallika_srinivasan.jpg',
  'Indra Nooyi': '/media/people/indra_nooyi.jpg',
  'Revathi Advaithi': '/media/people/revathi_advaithi.jpg',
  'Lakshmi Venu': '/media/people/lakshmi_venu.jpg',
  'Vanitha Mohan': '/media/people/vanitha_mohan.jpeg',
  'Hemalatha Annamalai': '/media/people/hemalatha_annamalai.jpg',
  'Veena Kumaravel': '/media/people/veena_kumaravel.jpg',
  'Santhi Duraisamy': '/media/people/santhi_duraisamy.jpg',
  'Shanthi Duraisamy': '/media/people/santhi_duraisamy.jpg',
  'Kavitha Subramanian': '/media/people/kavitha_subramanian.png',
  'Venu Srinivasan': '/media/people/venu_srinivasan.jpg',
  'Sudarshan Venu': '/media/people/sudarshan_venu.jpg',
  'Kalanithi Maran': '/media/people/kalanithi_maran.jpg',
  'Sridhar Vembu': '/media/people/sridhar_vembu.jpg',
  'Girish Mathrubootham': '/media/people/girish_mathrubootham.webp',
  'Arun Jain': '/media/people/arun_jain.jpg',
  'Rajshree Pathy': '/media/people/rajshree_pathy.jpg',
  'Arunachalam Muruganantham': '/media/people/arunachalam_muruganantham.jpg',
  'Prathap C. Reddy': '/media/people/prathap_c_reddy.jpg',
  'Preetha Reddy': '/media/people/preetha_reddy.jpg',
  'Shobana Kamineni': '/media/people/shobana_kamineni.jpg',
  'Sangita Reddy': '/media/people/sangita_reddy.jpg',
  'Nalli Kuppuswami Chetti': '/media/people/nalli_kuppuswami_chetti.jpg',
  'Shiv Nadar': '/media/people/shiv_nadar.jpg',
  'P. C. Duraisamy': '/media/people/p_c_duraisamy.jpg',
};

export const PARTICIPANT_HIGHLIGHTS: ParticipantProfileHighlight[] = [
  {
    id: 'IM500-2027-0101',
    fullName: 'Arvindhan Krishnamurthy',
    roleTitle: 'Founder & Managing Director',
    company: 'Kaveri Precision Robotics Pvt Ltd',
    category: 'Founder',
    track: 'Startups',
    location: 'Chennai',
    mandate: '₹2.5 Crore · Seed-to-Scale Robotics',
    quote:
      'Validation committee scrutiny sharpened our factory-deployment unit economics before stepping into Hall 1.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0101'],
    stage: 'Early revenue · Approved',
  },
  {
    id: 'IM500-2027-0104',
    fullName: 'Ananya Subramanian',
    roleTitle: 'Managing Partner',
    company: 'Coromandel Venture Partners',
    category: 'Investor',
    track: 'Startups',
    location: 'Chennai',
    mandate: '₹2 Cr – ₹25 Cr · Industrial SaaS & Deep-Tech',
    quote:
      'Structured pre-verified founder dossiers cut initial diligence friction and let us focus on real growth conviction.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0104'],
    stage: 'Active Fund Mandate · Hall 1',
  },
  {
    id: 'IM500-2027-0102',
    fullName: 'Priyadharshini Natarajan',
    roleTitle: 'Managing Partner',
    company: 'Nilgiri Bio-Polymers LLP',
    category: 'Founder',
    track: 'Business Expansion',
    location: 'Coimbatore',
    mandate: '₹12 Crore · 12,000 TPA Capacity Expansion',
    quote:
      'Expanding from our Coimbatore pilot line to European retail supply requires both industrial equity and structured term debt.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0102'],
    stage: 'Growth · Under review',
  },
  {
    id: 'IM500-2027-0103',
    fullName: 'Senthil Kumar Balasubramanian',
    roleTitle: 'Director',
    company: 'Madurai Cold-Chain Logistics',
    category: 'Founder',
    track: 'Bank Loans',
    location: 'Madurai',
    mandate: '₹6.5 Crore · Solar Multi-Chamber Network',
    quote:
      'The dedicated Bank Loans desk gives regional infrastructure operators direct structured reviews with scheduled lenders.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0103'],
    stage: 'Established · Approved',
  },
  {
    id: 'IM500-2027-0107',
    fullName: 'Deepak Chandrasekar',
    roleTitle: 'Cross-Border Investment Lead',
    company: 'Indo-Singapore MedTech Corridor',
    category: 'Investor',
    track: 'International Opportunity',
    location: 'Singapore / Chennai',
    mandate: '₹35 Crore · Cross-Border MedTech JV',
    quote:
      'Bridging Singaporean diagnostic IP with Tamil Nadu precision manufacturing unlocks resilient export corridors.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0107'],
    stage: 'Cross-Border Investor · Hall 3',
  },
  {
    id: 'IM500-2027-0106',
    fullName: 'Vikramaditya Rao',
    roleTitle: 'Executive Director',
    company: 'Deccan Infrastructure Equipment',
    category: 'Exhibitor',
    track: 'Mixed Loans',
    location: 'Chennai',
    mandate: '₹22 Crore · Hybrid Debt & Fleet Equity',
    quote:
      'Combining fleet leasing term loans with strategic equity partners keeps capital structure balanced across cycles.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0106'],
    stage: 'Growth · Hall 3 Exhibitor',
  },
  {
    id: 'IM500-2027-0105',
    fullName: 'Muthukumar Veerappan',
    roleTitle: 'Managing Proprietor',
    company: 'Tiruppur Eco-Knit Exports',
    category: 'Founder',
    track: 'Business Loan',
    location: 'Tiruppur',
    mandate: '₹4 Crore · ZLD Dyeing & Knitting Upgrade',
    quote:
      'Clean environmental compliance and automated knitting capacity position Tiruppur exporters for tier-one European buyers.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0105'],
    stage: 'Established · Pending',
  },
  {
    id: 'IM500-2027-0108',
    fullName: 'Kavitha Rajendran',
    roleTitle: 'Founder & Chief Engineer',
    company: 'Cauvery Precision Castings',
    category: 'Founder',
    track: 'Business Loan',
    location: 'Hosur',
    mandate: '₹1.8 Crore · EV Powertrain CNC Cell',
    quote:
      'Committee feedback helped us tighten our five-year cash-flow schedule ahead of the 1 February 2027 cutoff.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0108'],
    stage: 'Early revenue · Resubmitting',
  },
];

export const COMMITTEE_REVIEWER_PROFILES: CommitteeReviewerProfile[] = [
  {
    name: 'Dr. Meenakshi Sundaram',
    role: 'Lead Validation Advisor (Startups & Deep-Tech)',
    committee: 'Startup Validation Committee',
    credentials: '22+ yrs in Venture Finance, Industrial Research Park Mentorship & Unit Economics Audit',
    focusAreas: ['Founder & Team Execution', 'IP & Pilot Traction', 'Five-Year Financial Viability'],
    perspective:
      'Every approved startup dossier enters Hall 1 with stress-tested revenue assumptions and transparent milestone readiness.',
    portraitUrl: REVIEWER_PORTRAIT_BY_NAME['Dr. Meenakshi Sundaram'],
    hallFocus: 'Hall 1 · Startups & AI',
  },
  {
    name: 'K. Venkataraman',
    role: 'Senior Credit & Banking Panelist',
    committee: 'Bank & Financial Committee',
    credentials: 'Former Regional Credit Head · 30 yrs in Commercial Project Finance & MSME Term Lending',
    focusAreas: ['DSCR & Collateral Structuring', 'Working Capital Hygiene', 'Scheduled Bank Readiness'],
    perspective:
      'Clear project reports and clean balance sheet history turn initial bank introductions into actionable credit appraisals.',
    portraitUrl: REVIEWER_PORTRAIT_BY_NAME['K. Venkataraman'],
    hallFocus: 'Hall 2 · Bank & Business Loans',
  },
  {
    name: 'S. Raghavan',
    role: 'Industrial Expansion & Risk Analyst',
    committee: 'Business Expansion Committee',
    credentials: 'Industrial Feasibility Specialist · Manufacturing Scale-up & Export Supply Chains',
    focusAreas: ['Capacity Expansion Feasibility', 'Export Order Book Audit', 'Capex Phasing Risk'],
    perspective:
      'Industrial founders scaling from regional plants benefit most when technical feasibility aligns cleanly with debt-equity mix.',
    portraitUrl: REVIEWER_PORTRAIT_BY_NAME['S. Raghavan'],
    hallFocus: 'Hall 3 · Expansion & Industry',
  },
  {
    name: 'R. Padmanabhan',
    role: 'Corporate Finance & Cross-Border Counsel',
    committee: 'International & Mixed Loans Committee',
    credentials: '25+ yrs in Hybrid Capital Stacks, Joint Ventures & Structured Project Governance',
    focusAreas: ['Hybrid Debt-Equity Instruments', 'Cross-Border JV Compliance', 'Deal Room Protocol'],
    perspective:
      'Structured call reports ensure every one-to-one meeting concludes with clear post-summit diligence action items.',
    portraitUrl: REVIEWER_PORTRAIT_BY_NAME['R. Padmanabhan'],
    hallFocus: 'Hall 3 · International & Mixed Loans',
  },
];

const NORMALIZED_LEADER_PORTRAITS: Record<string, string> = Object.fromEntries(
  Object.entries(VERIFIED_LEADER_PORTRAIT_BY_NAME).map(([k, v]) => [k.toLowerCase().trim(), v])
);

export function resolvePortraitUrl(nameOrId?: string, id?: string): string | null {
  if (id && PARTICIPANT_PORTRAIT_BY_ID[id]) {
    return PARTICIPANT_PORTRAIT_BY_ID[id];
  }
  if (!nameOrId) return null;
  const trimmed = nameOrId.trim();
  if (PARTICIPANT_PORTRAIT_BY_ID[trimmed]) return PARTICIPANT_PORTRAIT_BY_ID[trimmed];
  if (REVIEWER_PORTRAIT_BY_NAME[trimmed]) return REVIEWER_PORTRAIT_BY_NAME[trimmed];
  if (VERIFIED_LEADER_PORTRAIT_BY_NAME[trimmed]) {
    return VERIFIED_LEADER_PORTRAIT_BY_NAME[trimmed];
  }
  const lower = trimmed.toLowerCase();
  if (NORMALIZED_LEADER_PORTRAITS[lower]) {
    return NORMALIZED_LEADER_PORTRAITS[lower];
  }
  const participantMatch = PARTICIPANT_HIGHLIGHTS.find(
    (p) => p.fullName.toLowerCase() === lower
  );
  return participantMatch?.portraitUrl ?? null;
}
