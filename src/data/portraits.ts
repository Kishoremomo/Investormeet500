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
  'IM500-2027-0109': '/src/assets/images/entrepreneur_ashok_manufacturing_1795161282480.jpg',
  'IM500-2027-0110': '/src/assets/images/entrepreneur_nandini_fintech_1795161282853.jpg',
  'IM500-2027-0111': '/src/assets/images/entrepreneur_karthikeyan_agro_1795161283294.jpg',
  'IM500-2027-0112': '/src/assets/images/entrepreneur_divya_biotech_1795161282811.jpg',
  'IM500-2027-0113': '/src/assets/images/entrepreneur_rajesh_infra_1795161284403.jpg',
  'IM500-2027-0114': '/src/assets/images/portrait_woman_textile_founder_1795502295123.jpg',
  'IM500-2027-0115': '/src/assets/images/portrait_woman_ev_founder_1795502295863.jpg',
  'IM500-2027-0116': '/src/assets/images/portrait_woman_saas_founder_1795502296369.jpg',
};

export const ORGANISER_PORTRAIT_BY_NAME: Record<string, string> = {
  'Mr. Rajganesh': '/src/assets/images/portrait_rajganesh_organiser_1795502294638.jpg',
  Rajganesh: '/src/assets/images/portrait_rajganesh_organiser_1795502294638.jpg',
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
  // Women Entrepreneurs & Industrialists (existing clean portraits preserved)
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
  'Rajshree Pathy': '/media/people/rajshree_pathy.jpg',
  'Preetha Reddy': '/media/people/preetha_reddy.jpg',
  'Shobana Kamineni': '/media/people/shobana_kamineni.jpg',
  'Sangita Reddy': '/media/people/sangita_reddy.jpg',
  'Roshni Nadar Malhotra': '/assets/aistudio/135_Roshni_Nadar_Malhotra_HCL_04bdb757.jpg',

  // Group A–F Industrialists, Tech Founders & Business Leaders (existing clean portraits preserved)
  'Shiv Nadar': '/media/people/shiv_nadar.jpg',
  'Venu Srinivasan': '/media/people/venu_srinivasan.jpg',
  'Sudarshan Venu': '/media/people/sudarshan_venu.jpg',
  'Kalanithi Maran': '/media/people/kalanithi_maran.jpg',
  'Sridhar Vembu': '/assets/aistudio/039_Sridhar_Vembu_Zoho_faee8861.jpg',
  'Girish Mathrubootham': '/media/people/girish_mathrubootham.webp',
  'Arun Jain': '/media/people/arun_jain.jpg',
  'Arunachalam Muruganantham': '/media/people/arunachalam_muruganantham.jpg',
  'Prathap C. Reddy': '/media/people/prathap_c_reddy.jpg',
  'P. C. Reddy': '/media/people/prathap_c_reddy.jpg',
  'Nalli Kuppuswami Chetti': '/media/people/nalli_kuppuswami_chetti.jpg',
  'P. C. Duraisamy': '/media/people/p_c_duraisamy.jpg',

  // Newly Integrated Audited Portraits from Uploaded Batch
  'Gopal Srinivasan': '/assets/aistudio/005_Gopal_Srinivasan_TVS_Capital_Funds_9040fd44.jpg',
  'M. M. Murugappan': '/assets/aistudio/008_M_M_Murugappan_Murugappa_Group_ab54b526.jpg',
  'Vellayan Subbiah': '/assets/aistudio/012_Vellayan_Subbiah_Cholamandalam_34b7f483.jpg',
  'P. R. Ramasubrahmaneya Rajha':
    '/assets/aistudio/014_P_R_Ramasubrahmaneya_Rajha_Ramco_Group_7885fdfc.jpg',
  'N. Srinivasan': '/assets/aistudio/015_N_Srinivasan_India_Cements_a1c95faa.jpg',
  'A. C. Muthiah': '/assets/aistudio/019_A_C_Muthiah_SPIC_d2646ea4.jpg',
  'C. K. Ranganathan': '/assets/aistudio/023_C_K_Ranganathan_CavinKare_3c893d99.jpg',
  'Rahul Mammen Mappillai': '/assets/aistudio/029_Rahul_Mammen_Mappillai_MRF_6cc93661.jpg',
  'B. N. Kalyani': '/assets/aistudio/031_B_N_Kalyani_Kalyani_Group_a711f073.jpg',
  'Vikram Mohan': '/assets/aistudio/036_Vikram_Mohan_Pricol_5c550f3e.jpg',
  'Jairam Varadaraj': '/assets/aistudio/038_Jairam_Varadaraj_Elgi_Equipments_b0117f8d.jpg',
  'Suresh Sambandam': '/assets/aistudio/045_Suresh_Sambandam_Kissflow_298449e7.jpg',
  'Murugavel Janakiraman': '/assets/aistudio/046_Murugavel_Janakiraman_Matrimony_com_de7d3041.jpg',
  'Krish Subramanian': '/assets/aistudio/047_Krish_Subramanian_Chargebee_9f0bd713.jpg',
  'Rajaraman Santhanam': '/assets/aistudio/048_Rajaraman_Santhanam_Chargebee_1f801818.jpg',
  'Saravana Kumar': '/assets/aistudio/049_Saravana_Kumar_Kovai_co_9d10298d.jpg',
  'Aravind Srinivas': '/assets/aistudio/050_Aravind_Srinivas_Perplexity_AI_9c8f91f7.jpg',
  'N. Chandrasekaran': '/assets/aistudio/056_N_Chandrasekaran_Tata_Group_81018af4.jpg',
  'C. Vijayakumar': '/assets/aistudio/057_C_Vijayakumar_HCLTech_f1d6c8c7.jpg',
  'Jay Vijayan': '/assets/aistudio/058_Jay_Vijayan_Tekion_f877fce6.jpg',
  // Source upload 059 was mislabeled under D_S_Ravishankar but visually depicts Infosys co-founder S. D. Shibulal (064 was unrelated).
  'S. D. Shibulal': '/assets/aistudio/059_D_S_Ravishankar_Brickwork_Ratings_68cb66c4.jpg',
  'M. R. Rangaswami': '/assets/aistudio/068_M_R_Rangaswami_Indiaspora_12022a93.jpg',
  'Umesh Sachdev': '/assets/aistudio/070_Umesh_Sachdev_Uniphore_c68916d7.jpg',
  'Ravi Saraogi': '/assets/aistudio/071_Ravi_Saraogi_Uniphore_82df555a.jpg',
  'Agnishwar Jayaprakash':
    '/assets/aistudio/074_Agnishwar_Jayaprakash_Garuda_Aerospace_236307b0.jpg',
  'K. R. Nagarajan': '/assets/aistudio/079_K_R_Nagarajan_Ramraj_Cotton_ba56d4ba.jpg',
  'A. D. Padmasingh Isaac': '/assets/aistudio/080_A_D_Padmasingh_Isaac_Aachi_Group_e852beed.jpg',
  'V. R. Muthu': '/assets/aistudio/083_V_R_Muthu_Idhayam_198759ca.jpg',
  'H. Vasanthakumar': '/assets/aistudio/085_H_Vasanthakumar_Vasanth_Co_4edd3af0.jpg',
  'H. Vijay Vasanth': '/assets/aistudio/086_H_Vijay_Vasanth_Vasanth_Co_6cefc6f6.jpg',
  'P. Rajagopal': '/assets/aistudio/087_P_Rajagopal_Saravana_Bhavan_60e629e7.jpg',
  'S. P. Adithanar': '/assets/aistudio/095_S_P_Adithanar_Dina_Thanthi_5730ccc6.jpg',
  'Sivanthi Adithan': '/assets/aistudio/096_Sivanthi_Adithan_Dina_Thanthi_c7496e1a.jpg',
  'K. P. D. Sigamani': '/assets/aistudio/101_K_P_D_Sigamani_KPR_Mill_5c763f9f.jpg',
  'G. K. Sundaram': '/assets/aistudio/113_G_K_Sundaram_Lakshmi_Mills_ce9a8b8f.jpg',
  'G. Bakthavathsalam': '/assets/aistudio/118_K_G_Bakthavathsalam_KG_Hospital_7394dbc9.jpg',
  'Palani G. Periasamy': '/assets/aistudio/130_Palani_G_Periasamy_PGP_Group_0bebc919.jpg',
  'A. Sakthivel': '/assets/aistudio/136_A_Sakthivel_Poppys_Knitwear_cdcb90b0.jpg',
};

const PORTRAIT_OBJECT_POSITION_BY_SRC: Record<string, string> = {
  '/assets/aistudio/012_Vellayan_Subbiah_Cholamandalam_34b7f483.jpg': 'object-[50%_12%]',
  '/assets/aistudio/015_N_Srinivasan_India_Cements_a1c95faa.jpg': 'object-[55%_8%]',
  '/assets/aistudio/039_Sridhar_Vembu_Zoho_faee8861.jpg': 'object-[54%_12%]',
  '/assets/aistudio/071_Ravi_Saraogi_Uniphore_82df555a.jpg': 'object-[58%_14%]',
  '/assets/aistudio/074_Agnishwar_Jayaprakash_Garuda_Aerospace_236307b0.jpg': 'object-[4%_6%]',
};

export function resolvePortraitObjectPositionClass(src?: string | null): string {
  if (!src) return 'object-top';
  return PORTRAIT_OBJECT_POSITION_BY_SRC[src] ?? 'object-top';
}

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
  {
    id: 'IM500-2027-0109',
    fullName: 'Ashok Kumaravel',
    roleTitle: 'Founder & Chief Executive',
    company: 'Chola Precision Tooling Pvt Ltd',
    category: 'Founder',
    track: 'Business Expansion',
    location: 'Coimbatore',
    mandate: '₹9.5 Crore · Aerospace & EV Component Plant',
    quote:
      'Expanding five-axis CNC aerospace machining capacity in Coimbatore to serve tier-one European and Indian electric mobility programs.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0109'],
    stage: 'Growth · Approved',
  },
  {
    id: 'IM500-2027-0110',
    fullName: 'Nandini Venkataraman',
    roleTitle: 'Co-Founder & CEO',
    company: 'TidelPay MSME Ledger Technologies',
    category: 'Founder',
    track: 'Startups',
    location: 'Chennai',
    mandate: '₹4.2 Crore · GST Invoice Financing SaaS',
    quote:
      'Automating GST-verified supply-chain credit scoring for 8,500 southern Indian manufacturing suppliers through scheduled bank APIs.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0110'],
    stage: 'Early revenue · Approved',
  },
  {
    id: 'IM500-2027-0111',
    fullName: 'Karthikeyan Shanmugam',
    roleTitle: 'Managing Founder',
    company: 'Vaigai Agri-Cold Networks',
    category: 'Founder',
    track: 'Bank Loans',
    location: 'Trichy / Madurai',
    mandate: '₹7.8 Crore · Solar-Powered Horticulture Hubs',
    quote:
      'Post-harvest solar cold-storage nodes cut perishable spice and mango spoilage across Delta districts while integrating farmer FPO contracts.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0111'],
    stage: 'Growth · Under review',
  },
  {
    id: 'IM500-2027-0112',
    fullName: 'Dr. Divya Narayanan',
    roleTitle: 'Founder & Scientific Director',
    company: 'Adyar BioDiagnostics Pvt Ltd',
    category: 'Founder',
    track: 'Startups',
    location: 'Chennai',
    mandate: '₹5.5 Crore · Point-of-Care Immunoassay Devices',
    quote:
      'Developing CDSCO-certified rapid clinical testing cartridges incubated at IIT Madras Research Park for tier-2 hospital networks.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0112'],
    stage: 'Clinical Pilot · Approved',
  },
  {
    id: 'IM500-2027-0113',
    fullName: 'Rajeshwar Natarajan',
    roleTitle: 'Managing Director',
    company: 'Coromandel Clean Energy Infrastructure',
    category: 'Founder',
    track: 'Mixed Loans',
    location: 'Tuticorin / Chennai',
    mandate: '₹48 Crore · Industrial Rooftop & Battery Storage',
    quote:
      'Blended project debt and green infrastructure equity delivering captive solar-plus-storage microgrids for textile and chemical exporters.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0113'],
    stage: 'Established · Approved',
  },
  {
    id: 'IM500-2027-0114',
    fullName: 'Deepa Soundararajan',
    roleTitle: 'Founder & Creative Director',
    company: 'Kongu EarthLoom Exports Pvt Ltd',
    category: 'Founder',
    track: 'Business Expansion',
    location: 'Tiruppur / Coimbatore',
    mandate: '₹8.2 Crore · Sustainable Hemp & Organic Knitwear Unit',
    quote:
      'Scaling zero-liquid-discharge organic apparel manufacturing in Tiruppur for Scandinavian and Japanese private-label sustainability partners.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0114'],
    stage: 'Growth · Approved',
  },
  {
    id: 'IM500-2027-0115',
    fullName: 'Lakshmi Priya Raman',
    roleTitle: 'Co-Founder & Chief Technology Officer',
    company: 'Arcot Motion EV Systems',
    category: 'Founder',
    track: 'Startups',
    location: 'Chennai / Hosur',
    mandate: '₹6.5 Crore · Two-Wheeler BMS & Thermal Packs',
    quote:
      'Indigenous battery-management firmware and liquid-cooled modular packs engineered in Chennai for commercial last-mile electric fleets.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0115'],
    stage: 'Series A Readiness · Approved',
  },
  {
    id: 'IM500-2027-0116',
    fullName: 'Kavya Subramani',
    roleTitle: 'Founder & Managing CEO',
    company: 'Vaigai Treasury Cloud LLP',
    category: 'Founder',
    track: 'Startups',
    location: 'Madurai / Chennai',
    mandate: '₹3.6 Crore · MSME Cashflow & Treasury Automation',
    quote:
      'Empowering tier-2 textile and agro-processing CFOs with automated working-capital reconciliation and bank-ready DSCR forecasting.',
    portraitUrl: PARTICIPANT_PORTRAIT_BY_ID['IM500-2027-0116'],
    stage: 'Early revenue · Under review',
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
  if (ORGANISER_PORTRAIT_BY_NAME[trimmed]) return ORGANISER_PORTRAIT_BY_NAME[trimmed];
  if (REVIEWER_PORTRAIT_BY_NAME[trimmed]) return REVIEWER_PORTRAIT_BY_NAME[trimmed];
  if (VERIFIED_LEADER_PORTRAIT_BY_NAME[trimmed]) {
    return VERIFIED_LEADER_PORTRAIT_BY_NAME[trimmed];
  }
  const lower = trimmed.toLowerCase();
  const organiserMatch = Object.entries(ORGANISER_PORTRAIT_BY_NAME).find(
    ([k]) => k.toLowerCase() === lower
  );
  if (organiserMatch) return organiserMatch[1];
  if (NORMALIZED_LEADER_PORTRAITS[lower]) {
    return NORMALIZED_LEADER_PORTRAITS[lower];
  }
  const participantMatch = PARTICIPANT_HIGHLIGHTS.find(
    (p) => p.fullName.toLowerCase() === lower
  );
  return participantMatch?.portraitUrl ?? null;
}
