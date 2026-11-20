export interface EntrepreneurEntry {
  serial: string;
  name: string;
  company: string;
  category:
    | 'Industrialists and Major Business Groups'
    | 'Technology and Startups'
    | 'Manufacturing and Engineering'
    | 'Textiles, Retail and Consumer Brands'
    | 'Healthcare'
    | 'Food and Agriculture'
    | 'Other Business Leaders';
}

export const ENTREPRENEUR_CATEGORIES = [
  'All',
  'Industrialists and Major Business Groups',
  'Technology and Startups',
  'Manufacturing and Engineering',
  'Textiles, Retail and Consumer Brands',
  'Healthcare',
  'Food and Agriculture',
  'Other Business Leaders',
] as const;

export const ENTREPRENEURS_100: EntrepreneurEntry[] = [
  { serial: 'NO. 001', name: 'Venu Srinivasan', company: 'TVS Motor', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 002', name: 'Sudarshan Venu', company: 'TVS Motor', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 003', name: 'R. Dinesh', company: 'TVS Supply Chain Solutions', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 004', name: 'Gopal Srinivasan', company: 'TVS Capital Funds', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 005', name: 'Mallika Srinivasan', company: 'TAFE', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 006', name: 'Lakshmi Venu', company: 'Sundaram-Clayton', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 007', name: 'M. M. Murugappan', company: 'Murugappa Group', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 008', name: 'M. A. M. Arunachalam', company: 'Tube Investments of India', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 009', name: 'Arun Murugappan', company: 'Murugappa Group', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 010', name: 'Vellayan Subbiah', company: 'Cholamandalam Investment & Finance', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 011', name: 'P. R. Venketrama Raja', company: 'Ramco Group', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 012', name: 'N. Srinivasan', company: 'India Cements', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 013', name: 'N. Sankar', company: 'Sanmar Group', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 014', name: 'Vijay Sankar', company: 'Sanmar Group', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 015', name: 'A. C. Muthiah', company: 'SPIC Group', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 016', name: 'Ashwin Muthiah', company: 'AM International / SPIC', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 017', name: 'R. G. Chandramogan', company: 'Hatsun Agro Product', category: 'Food and Agriculture' },
  { serial: 'NO. 018', name: 'R. G. Arun', company: 'Hatsun Agro Product', category: 'Food and Agriculture' },
  { serial: 'NO. 019', name: 'C. K. Ranganathan', company: 'CavinKare', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 020', name: 'T. T. Jagannathan', company: 'TTK Prestige', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 021', name: 'T. T. Raghunathan', company: 'TTK Group', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 022', name: 'Rahul Mammen Mappillai', company: 'MRF', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 023', name: 'Kalanithi Maran', company: 'Sun Group', category: 'Other Business Leaders' },
  { serial: 'NO. 024', name: 'Kavery Kalanithi', company: 'Sun TV Network', category: 'Other Business Leaders' },
  { serial: 'NO. 025', name: 'R. Thyagarajan', company: 'Shriram Group', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 026', name: 'Sridhar Vembu', company: 'Zoho Corporation', category: 'Technology and Startups' },
  { serial: 'NO. 027', name: 'Radha Vembu', company: 'Zoho Corporation', category: 'Technology and Startups' },
  { serial: 'NO. 028', name: 'Sekar Vembu', company: 'Vembu Technologies', category: 'Technology and Startups' },
  { serial: 'NO. 029', name: 'Kumar Vembu', company: 'GoFrugal Technologies', category: 'Technology and Startups' },
  { serial: 'NO. 030', name: 'Girish Mathrubootham', company: 'Freshworks', category: 'Technology and Startups' },
  { serial: 'NO. 031', name: 'Shan Krishnasamy', company: 'Freshworks', category: 'Technology and Startups' },
  { serial: 'NO. 032', name: 'Suresh Sambandam', company: 'Kissflow', category: 'Technology and Startups' },
  { serial: 'NO. 033', name: 'Murugavel Janakiraman', company: 'Matrimony.com', category: 'Technology and Startups' },
  { serial: 'NO. 034', name: 'Krish Subramanian', company: 'Chargebee', category: 'Technology and Startups' },
  { serial: 'NO. 035', name: 'Rajaraman Santhanam', company: 'Chargebee', category: 'Technology and Startups' },
  { serial: 'NO. 036', name: 'Saravana Kumar', company: 'Kovai.co', category: 'Technology and Startups' },
  { serial: 'NO. 037', name: 'Arun Jain', company: 'Intellect Design Arena', category: 'Technology and Startups' },
  { serial: 'NO. 038', name: 'B. K. Syngal', company: 'Telecom & Digital Infrastructure', category: 'Technology and Startups' },
  { serial: 'NO. 039', name: 'Karthik Jayaraman', company: 'WayCool Foods', category: 'Food and Agriculture' },
  { serial: 'NO. 040', name: 'Sanjay Dasari', company: 'WayCool Foods', category: 'Food and Agriculture' },
  { serial: 'NO. 041', name: 'Gaurav Kumar', company: 'CredAvenue / Yubi', category: 'Technology and Startups' },
  { serial: 'NO. 042', name: 'Satyam Kumar', company: 'Financial Technology Leader', category: 'Technology and Startups' },
  { serial: 'NO. 043', name: 'M. R. Rangaswami', company: 'Indiaspora / Sand Hill Group', category: 'Technology and Startups' },
  { serial: 'NO. 044', name: 'Amitabh Satyam', company: 'Smart Cities & Tech Advisory', category: 'Technology and Startups' },
  { serial: 'NO. 045', name: 'Umesh Sachdev', company: 'Uniphore', category: 'Technology and Startups' },
  { serial: 'NO. 046', name: 'Ravi Saraogi', company: 'Uniphore', category: 'Technology and Startups' },
  { serial: 'NO. 047', name: 'Srinath Ravichandran', company: 'Agnikul Cosmos', category: 'Technology and Startups' },
  { serial: 'NO. 048', name: 'Moin SPM', company: 'Agnikul Cosmos', category: 'Technology and Startups' },
  { serial: 'NO. 049', name: 'Agnishwar Jayaprakash', company: 'Garuda Aerospace', category: 'Technology and Startups' },
  { serial: 'NO. 050', name: 'V. S. S. Mani', company: 'Justdial', category: 'Technology and Startups' },
  { serial: 'NO. 051', name: 'K. P. Ramasamy', company: 'KPR Mill', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 052', name: 'K. P. D. Sigamani', company: 'KPR Mill', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 053', name: 'P. Nataraj', company: 'KPR Mill', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 054', name: 'G. Soundararajan', company: 'CRI Pumps', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 055', name: 'B. Soundararajan', company: 'Suguna Foods', category: 'Food and Agriculture' },
  { serial: 'NO. 056', name: 'M. Manickam', company: 'Sakthi Group', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 057', name: 'M. Srinivasan', company: 'Sakthi Auto Component', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 058', name: 'Vanitha Mohan', company: 'Pricol', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 059', name: 'Vikram Mohan', company: 'Pricol', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 060', name: 'Jairam Varadaraj', company: 'ELGi Equipments', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 061', name: 'Jayaram Varadaraj', company: 'ELGi Ultra / Precision Mfg', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 062', name: 'Ravi Sam', company: 'Lakshmi Machine Works', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 063', name: 'G. K. Sundaram', company: 'Lakshmi Mills', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 064', name: 'Rajshree Pathy', company: 'Rajshree Sugars & Chemicals', category: 'Food and Agriculture' },
  { serial: 'NO. 065', name: 'Nalla G. Palaniswami', company: 'KMCH', category: 'Healthcare' },
  { serial: 'NO. 066', name: 'G. Bakthavathsalam', company: 'KG Hospital', category: 'Healthcare' },
  { serial: 'NO. 067', name: 'K. Easwaran', company: 'Easun Group', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 068', name: 'K. Shanmuga Sundaram', company: 'Manufacturing & Industrial Enterprise', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 069', name: 'K. G. Balakrishnan', company: 'KG Denim', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 070', name: 'S. K. M. Maeilanandhan', company: 'SKM Animal Feeds & Foods', category: 'Food and Agriculture' },
  { serial: 'NO. 071', name: 'K. R. Nagarajan', company: 'Ramraj Cotton', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 072', name: 'A. Sakthivel', company: 'Poppys Knitwear', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 073', name: 'T. K. Chandiran', company: 'SCM Garments', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 074', name: 'K. M. Subramanian', company: 'KM Knitwear', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 075', name: 'P. S. Sundaram', company: 'Regional Textile & Export House', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 076', name: 'V. R. Muthu', company: 'Idhayam Group', category: 'Food and Agriculture' },
  { serial: 'NO. 077', name: 'S. K. M. Siddha', company: 'SKM Siddha and Ayurvedha', category: 'Healthcare' },
  { serial: 'NO. 078', name: 'C. K. Kumaravel', company: 'Naturals Salon & Spa', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 079', name: 'Veena Kumaravel', company: 'Naturals Salon & Spa', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 080', name: 'Arunachalam Muruganantham', company: 'Jayaashree Industries', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 081', name: 'A. D. Padmasingh Isaac', company: 'Aachi Group', category: 'Food and Agriculture' },
  { serial: 'NO. 082', name: 'Prathap C. Reddy', company: 'Apollo Hospitals', category: 'Healthcare' },
  { serial: 'NO. 083', name: 'Preetha Reddy', company: 'Apollo Hospitals', category: 'Healthcare' },
  { serial: 'NO. 084', name: 'Suneeta Reddy', company: 'Apollo Hospitals', category: 'Healthcare' },
  { serial: 'NO. 085', name: 'Shobana Kamineni', company: 'Apollo Hospitals', category: 'Healthcare' },
  { serial: 'NO. 086', name: 'Sangita Reddy', company: 'Apollo Hospitals', category: 'Healthcare' },
  { serial: 'NO. 087', name: 'P. R. Ramasubrahmaneya Rajha', company: 'Ramco Cements', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 088', name: 'Nalli Kuppuswami Chetti', company: 'Nalli Silk Sarees', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 089', name: 'K. M. Mammen Mappillai', company: 'MRF Founder Lineage', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 090', name: 'T. V. Sundram Iyengar', company: 'TVS Group Founder Lineage', category: 'Industrialists and Major Business Groups' },
  { serial: 'NO. 091', name: 'Shiv Nadar', company: 'HCL Technologies', category: 'Technology and Startups' },
  { serial: 'NO. 092', name: 'Roshni Nadar Malhotra', company: 'HCL Technologies', category: 'Technology and Startups' },
  { serial: 'NO. 093', name: 'M. G. Muthu', company: 'MGM Group', category: 'Other Business Leaders' },
  { serial: 'NO. 094', name: 'V. G. Santhosam', company: 'VGP Group', category: 'Other Business Leaders' },
  { serial: 'NO. 095', name: 'H. Vijay Vasanth', company: 'Vasanth & Co', category: 'Textiles, Retail and Consumer Brands' },
  { serial: 'NO. 096', name: 'P. C. Duraisamy', company: 'Sakthi Masala', category: 'Food and Agriculture' },
  { serial: 'NO. 097', name: 'Shanthi Duraisamy', company: 'Sakthi Masala', category: 'Food and Agriculture' },
  { serial: 'NO. 098', name: 'M. P. Purushothaman', company: 'Empee Group', category: 'Other Business Leaders' },
  { serial: 'NO. 099', name: 'P. Subramanian', company: 'Shanthi Gears', category: 'Manufacturing and Engineering' },
  { serial: 'NO. 100', name: 'Karumuttu T. Kannan', company: 'Thiagarajar Mills', category: 'Textiles, Retail and Consumer Brands' },
];

export const WOMEN_ENTREPRENEURS = [
  { serial: '1', name: 'Mallika Srinivasan', company: 'TAFE', sector: 'Manufacturing' },
  { serial: '2', name: 'Indra Nooyi', company: 'Former PepsiCo CEO', sector: 'Global Business' },
  { serial: '3', name: 'Revathi Advaithi', company: 'Flex', sector: 'Global Manufacturing' },
  { serial: '4', name: 'Lakshmi Venu', company: 'TVS Group', sector: 'Automotive' },
  { serial: '5', name: 'Vanitha Mohan', company: 'Pricol', sector: 'Automotive' },
  { serial: '6', name: 'Hemalatha Annamalai', company: 'Ampere Electric', sector: 'Electric Vehicles' },
  { serial: '7', name: 'Veena Kumaravel', company: 'Naturals', sector: 'Beauty & Wellness' },
  { serial: '8', name: 'Santhi Duraisamy', company: 'Sakthi Masala', sector: 'FMCG' },
  { serial: '9', name: 'Ashwini Asokan', company: 'Mad Street Den', sector: 'Artificial Intelligence' },
  { serial: '11', name: 'Kavitha Subramanian', company: 'Upstart / Humble Sun', sector: 'Fintech & Consumer Products' },
  { serial: '12', name: 'Archana Stalin', company: 'myHarvest Farms', sector: 'Organic Farming & Agritech' },
  { serial: '13', name: 'Divya Murthy Vinaayak', company: 'ListEz', sector: 'Real Estate Technology' },
  { serial: '14', name: 'E. Menaka', company: 'Mannvasanai', sector: 'Organic Food & Agriculture' },
  { serial: '15', name: 'Sri Vidhya Bhavani M.', company: 'Startup Entrepreneur', sector: 'Startup Business' },
  { serial: '16', name: 'Kalaiyarasi Ramachandran', company: 'Entrepreneurial Venture', sector: 'Consumer & Services' },
  { serial: '17', name: 'Deepa Sai', company: 'Startup Leadership', sector: 'Technology & Advisory' },
  { serial: '18', name: 'P. Yamuna', company: 'Business Enterprise', sector: 'Manufacturing & Trade' },
  { serial: '19', name: 'Swarnamugi Raghupathy', company: 'Regional Enterprise', sector: 'Engineering & Growth' },
  { serial: '20', name: 'Keerthana Chandrasekaran', company: 'Emerging Business Founder', sector: 'Innovation & Operations' },
];

export interface AssociationEntry {
  no: number;
  badge: string;
  name: string;
  focus: string;
  category: 'Mining' | 'Industry & Manufacturing' | 'Construction & Real Estate' | 'Trade & Chambers' | 'Textiles';
}

export const ASSOCIATIONS_15: AssociationEntry[] = [
  { no: 1, badge: 'ASSOCIATION', name: 'Tamil Nadu Stone Quarry Lease Holders Welfare Association', focus: 'Quarry & Mining', category: 'Mining' },
  { no: 2, badge: 'ASSOCIATION', name: 'Tamil Nadu Stone Quarry, Crusher & Lorry Owners Association', focus: 'Mining & M-Sand', category: 'Mining' },
  { no: 3, badge: 'TANSTIA', name: 'Tamil Nadu Small and Tiny Industries Association (TANSTIA)', focus: 'MSME & Manufacturing', category: 'Industry & Manufacturing' },
  { no: 4, badge: 'CODISSIA', name: 'Coimbatore District Small Industries Association (CODISSIA)', focus: 'Industries & Manufacturing', category: 'Industry & Manufacturing' },
  { no: 5, badge: 'AIEMA', name: 'Ambattur Industrial Estate Manufacturers Association (AIEMA)', focus: 'Industrial Manufacturing', category: 'Industry & Manufacturing' },
  { no: 6, badge: 'CREDAI', name: 'CREDAI Tamil Nadu', focus: 'Real Estate & Construction', category: 'Construction & Real Estate' },
  { no: 7, badge: 'BAI', name: 'Builders Association of India (BAI) – Tamil Nadu Centres', focus: 'Construction & Infrastructure', category: 'Construction & Real Estate' },
  { no: 8, badge: 'SICCI', name: 'Southern India Chamber of Commerce and Industry (SICCI)', focus: 'Trade & Investment', category: 'Trade & Chambers' },
  { no: 9, badge: 'MCCI', name: 'Madras Chamber of Commerce and Industry (MCCI)', focus: 'Corporate & Industrial Business', category: 'Trade & Chambers' },
  { no: 10, badge: 'TEA', name: "Tiruppur Exporters' Association (TEA)", focus: 'Textile & Garment Exports', category: 'Textiles' },
  { no: 11, badge: 'SIMA', name: "Southern India Mills' Association (SIMA)", focus: 'Textile Manufacturing', category: 'Textiles' },
  { no: 12, badge: 'ASSOCIATION', name: 'Tamil Nadu Vanigar Sangankalin Peramaippu', focus: 'Traders & Merchants', category: 'Trade & Chambers' },
  { no: 13, badge: 'FICCI', name: 'Federation of Indian Chambers of Commerce & Industry (FICCI) – Tamil Nadu', focus: 'Business & Investment', category: 'Trade & Chambers' },
  { no: 14, badge: 'CII', name: 'Confederation of Indian Industry (CII) – Tamil Nadu', focus: 'Industry & Enterprise', category: 'Industry & Manufacturing' },
  { no: 15, badge: 'TNCCI', name: 'Tamil Nadu Chamber of Commerce and Industry', focus: 'Regional Trade & MSMEs', category: 'Trade & Chambers' },
];

export interface BankEntry {
  serial: string;
  name: string;
  category:
    | 'SBI & Nationalised Banks'
    | 'Domestic Private Sector Banks'
    | 'Small Finance Banks'
    | 'Payments Banks'
    | 'Regional Rural Banks'
    | 'Foreign banks in India';
  website: string;
}

const BANK_GROUPS: { category: BankEntry['category']; names: string[] }[] = [
  {
    category: 'SBI & Nationalised Banks',
    names: [
      'State Bank of India',
      'Bank of Baroda',
      'Bank of India',
      'Bank of Maharashtra',
      'Canara Bank',
      'Central Bank of India',
      'Indian Bank',
      'Indian Overseas Bank',
      'Punjab & Sind Bank',
      'Punjab National Bank',
      'UCO Bank',
      'Union Bank of India',
    ],
  },
  {
    category: 'Domestic Private Sector Banks',
    names: [
      'Axis Bank Limited',
      'Bandhan Bank Limited',
      'CSB Bank Limited',
      'City Union Bank Limited',
      'DCB Bank Limited',
      'Dhanlaxmi Bank Limited',
      'Federal Bank Limited',
      'HDFC Bank Limited',
      'ICICI Bank Limited',
      'IndusInd Bank Limited',
      'IDFC FIRST Bank Limited',
      'Jammu & Kashmir Bank Limited',
      'Karnataka Bank Limited',
      'Karur Vysya Bank Limited',
      'Kotak Mahindra Bank Limited',
      'Nainital Bank Limited',
      'RBL Bank Limited',
      'South Indian Bank Limited',
      'Tamilnad Mercantile Bank Limited',
      'YES Bank Limited',
      'IDBI Bank Limited',
    ],
  },
  {
    category: 'Small Finance Banks',
    names: [
      'Au Small Finance Bank Limited',
      'Capital Small Finance Bank Limited',
      'Equitas Small Finance Bank Limited',
      'ESAF Small Finance Bank Limited',
      'Suryoday Small Finance Bank Limited',
      'Ujjivan Small Finance Bank Limited',
      'Utkarsh Small Finance Bank Limited',
      'slice Small Finance Bank Limited',
      'Jana Small finance Bank Limited',
      'Shivalik Small Finance Bank Limited',
      'Unity Small Finance Bank Limited',
    ],
  },
  {
    category: 'Payments Banks',
    names: [
      'India Post Payments Bank Limited',
      'Fino Payments Bank Limited',
      'Airtel Payments Bank Limited',
      'NSDL Payments Bank Limited',
    ],
  },
  {
    category: 'Regional Rural Banks',
    names: [
      'Andhra Pradesh Grameena Bank',
      'Assam Gramin Bank',
      'Arunachal Pradesh Rural Bank',
      'Bihar Gramin Bank',
      'Chhattisgarh Gramin Bank',
      'Gujarat Gramin Bank',
      'Haryana Gramin Bank',
      'Himachal Pradesh Gramin Bank',
      'Jharkhand Gramin Bank',
      'Jammu and Kashmir Grameen Bank',
      'Karnataka Grameena Bank',
      'Kerala Grameena Bank',
      'Maharashtra Gramin Bank',
      'Madhya Pradesh Gramin Bank',
      'Manipur Rural Bank',
      'Meghalaya Rural Bank',
      'Mizoram Rural Bank',
      'Nagaland Rural Bank',
      'Odisha Grameen Bank',
      'Punjab Gramin Bank',
      'Puducherry Grama Bank',
      'Rajasthan Gramin Bank',
      'Tamil Nadu Grama Bank',
      'Telangana Grameena Bank',
      'Tripura Gramin Bank',
      'Uttar Pradesh Gramin Bank',
      'Uttarakhand Gramin Bank',
      'West Bengal Gramin Bank',
    ],
  },
  {
    category: 'Foreign banks in India',
    names: [
      'AB Bank PLC',
      'American Express Banking Corporation',
      'Australia and New Zealand Banking Group Ltd.',
      'Barclays Bank Plc.',
      'Bank of America National Association',
      'Bank of Bahrain and Kuwait B.S.C.',
      'Bank of Ceylon',
      'Bank of China Limited',
      'Bank of Nova Scotia',
      'BNP Paribas',
      'Citibank N.A.',
      'Cooperatieve Rabobank U.A.',
      'Credit Agricole Corporate and Investment Bank',
      'CTBC Bank Co., Ltd.',
      'DBS Bank India Limited',
      'Deutsche Bank A.G.',
      'Doha Bank Q.P.S.C',
      'Emirates NBD Bank P.J.S.C',
      'First Abu Dhabi Bank PJSC',
      'FirstRand Bank Limited',
      'Hong Kong and Shanghai Banking Corporation Limited',
      'Industrial and Commercial Bank of China',
      'Industrial Bank of Korea',
      'J.P. Morgan Chase Bank N.A.',
      'JSC VTB Bank',
      'KEB Hana Bank',
      'Kookmin Bank',
      'Mashreqbank P.S.C',
      'Mizuho Bank Ltd.',
      'MUFG Bank, Ltd.',
      'NatWest Markets Plc',
      'NongHyup Bank',
      'PT Bank Maybank Indonesia TBK',
      'Qatar National Bank (Q.P.S.C.)',
      'Sberbank',
      'SBM Bank (India) Limited',
      'Shinhan Bank',
      'Societe Generale',
      'Sonali Bank PLC',
      'Standard Chartered Bank',
      'Sumitomo Mitsui Banking Corporation',
      'United Overseas Bank Limited',
      'UBS AG',
      'Woori Bank',
    ],
  },
];

export const BANKS_120: BankEntry[] = BANK_GROUPS.flatMap((group) =>
  group.names.map((name, idx) => ({
    serial: `NO. ${String(idx + 1).padStart(2, '0')}`,
    name,
    category: group.category,
    website: `https://www.rbi.org.in/`,
  }))
);

export interface FinancialBrandEntry {
  rank: string;
  initials: string;
  name: string;
  focus: string;
  category:
    | 'Leading Finance & Investment Companies'
    | 'Banks & Financial Institutions'
    | 'Startup Investors & Venture Capital'
    | 'Wealth Management, Stockbroking & Investment Services'
    | 'Insurance, Housing & Other Financial Brands';
}

export const FINANCIAL_BRANDS_50: FinancialBrandEntry[] = [
  { rank: '01', initials: 'SF', name: 'Shriram Finance', focus: 'Business and vehicle finance', category: 'Leading Finance & Investment Companies' },
  { rank: '02', initials: 'SF', name: 'Sundaram Finance', focus: 'Financial services', category: 'Leading Finance & Investment Companies' },
  { rank: '03', initials: 'CI', name: 'Cholamandalam Investment and Finance', focus: 'Investment and lending', category: 'Leading Finance & Investment Companies' },
  { rank: '04', initials: 'TC', name: 'TVS Credit Services', focus: 'Consumer and business finance', category: 'Leading Finance & Investment Companies' },
  { rank: '05', initials: 'FB', name: 'Five-Star Business Finance', focus: 'Small business financing', category: 'Leading Finance & Investment Companies' },
  { rank: '06', initials: 'HL', name: 'Hinduja Leyland Finance', focus: 'Commercial vehicle finance', category: 'Leading Finance & Investment Companies' },
  { rank: '07', initials: 'SM', name: 'Samunnati', focus: 'Agri value-chain finance', category: 'Leading Finance & Investment Companies' },
  { rank: '08', initials: 'VF', name: 'Veritas Finance', focus: 'MSME working capital & loans', category: 'Leading Finance & Investment Companies' },
  { rank: '09', initials: 'NA', name: 'Northern Arc Capital', focus: 'Structured debt & institutional finance', category: 'Leading Finance & Investment Companies' },
  { rank: '10', initials: 'CF', name: 'Cholamandalam Financial Holdings', focus: 'Financial holding & lending ecosystem', category: 'Leading Finance & Investment Companies' },

  { rank: '11', initials: 'IB', name: 'Indian Bank', focus: 'Public sector commercial banking', category: 'Banks & Financial Institutions' },
  { rank: '12', initials: 'IO', name: 'Indian Overseas Bank', focus: 'Public sector banking & MSME credit', category: 'Banks & Financial Institutions' },
  { rank: '13', initials: 'CU', name: 'City Union Bank', focus: 'Commercial & regional business banking', category: 'Banks & Financial Institutions' },
  { rank: '14', initials: 'KV', name: 'Karur Vysya Bank', focus: 'Private sector SME & retail banking', category: 'Banks & Financial Institutions' },
  { rank: '15', initials: 'TM', name: 'Tamilnad Mercantile Bank', focus: 'Merchant & enterprise banking', category: 'Banks & Financial Institutions' },
  { rank: '16', initials: 'EQ', name: 'Equitas Small Finance Bank', focus: 'Small business & inclusive banking', category: 'Banks & Financial Institutions' },
  { rank: '17', initials: 'ES', name: 'ESAF Small Finance Bank', focus: 'Micro-enterprise & retail finance', category: 'Banks & Financial Institutions' },
  { rank: '18', initials: 'RB', name: 'Repco Bank', focus: 'Co-operative & housing-linked finance', category: 'Banks & Financial Institutions' },
  { rank: '19', initials: 'RH', name: 'Repco Home Finance', focus: 'Housing & property-backed loans', category: 'Banks & Financial Institutions' },
  { rank: '20', initials: 'SH', name: 'Sundaram Home Finance', focus: 'Housing & residential finance', category: 'Banks & Financial Institutions' },

  { rank: '21', initials: 'CA', name: 'The Chennai Angels', focus: 'Angel syndicate & early-stage equity', category: 'Startup Investors & Venture Capital' },
  { rank: '22', initials: 'NL', name: 'Nativelead Foundation', focus: 'Tier-2 & Tier-3 angel network', category: 'Startup Investors & Venture Capital' },
  { rank: '23', initials: 'AC', name: 'Anicut Capital', focus: 'Private credit & early growth equity', category: 'Startup Investors & Venture Capital' },
  { rank: '24', initials: 'SI', name: 'Speciale Invest', focus: 'Deep-tech venture capital', category: 'Startup Investors & Venture Capital' },
  { rank: '25', initials: 'IC', name: 'Ideaspring Capital', focus: 'Enterprise tech & B2B SaaS VC', category: 'Startup Investors & Venture Capital' },
  { rank: '26', initials: 'TN', name: 'Tamil Nadu Infrastructure Fund Management Corporation', focus: 'Infrastructure & green funds', category: 'Startup Investors & Venture Capital' },
  { rank: '27', initials: 'ST', name: 'StartupTN', focus: 'State startup ecosystem & seed grants', category: 'Startup Investors & Venture Capital' },
  { rank: '28', initials: 'TC', name: 'TiE Chennai', focus: 'Founder mentorship & angel network', category: 'Startup Investors & Venture Capital' },
  { rank: '29', initials: 'IM', name: 'IIT Madras Incubation Cell', focus: 'Deep-tech incubation & spinouts', category: 'Startup Investors & Venture Capital' },
  { rank: '30', initials: 'VG', name: 'Villgro', focus: 'Social enterprise & impact investing', category: 'Startup Investors & Venture Capital' },

  { rank: '31', initials: 'SM', name: 'Sundaram Mutual Fund', focus: 'Asset management & equity funds', category: 'Wealth Management, Stockbroking & Investment Services' },
  { rank: '32', initials: 'SR', name: 'Shriram Mutual Fund', focus: 'Mutual funds & investment schemes', category: 'Wealth Management, Stockbroking & Investment Services' },
  { rank: '33', initials: 'CS', name: 'Cholamandalam Securities', focus: 'Institutional & retail broking', category: 'Wealth Management, Stockbroking & Investment Services' },
  { rank: '34', initials: 'GF', name: 'Geojit Financial Services', focus: 'Wealth management & advisory', category: 'Wealth Management, Stockbroking & Investment Services' },
  { rank: '35', initials: 'IE', name: 'Integrated Enterprises', focus: 'Retail wealth & financial distribution', category: 'Wealth Management, Stockbroking & Investment Services' },
  { rank: '36', initials: 'WW', name: 'Way2Wealth Brokers', focus: 'Broking & portfolio services', category: 'Wealth Management, Stockbroking & Investment Services' },
  { rank: '37', initials: 'SA', name: 'Sundaram Asset Management', focus: 'Institutional & PMS mandates', category: 'Wealth Management, Stockbroking & Investment Services' },
  { rank: '38', initials: 'SW', name: 'Shriram Wealth', focus: 'Private wealth & advisory', category: 'Wealth Management, Stockbroking & Investment Services' },
  { rank: '39', initials: 'TS', name: 'TSF Investments', focus: 'Strategic equity holdings', category: 'Wealth Management, Stockbroking & Investment Services' },
  { rank: '40', initials: 'PE', name: 'Prithvi Exchange', focus: 'Foreign exchange & treasury services', category: 'Wealth Management, Stockbroking & Investment Services' },

  { rank: '41', initials: 'SH', name: 'Star Health Insurance', focus: 'Health & medical insurance', category: 'Insurance, Housing & Other Financial Brands' },
  { rank: '42', initials: 'CM', name: 'Chola MS General Insurance', focus: 'Commercial & motor insurance', category: 'Insurance, Housing & Other Financial Brands' },
  { rank: '43', initials: 'SL', name: 'Shriram Life Insurance', focus: 'Life & protection plans', category: 'Insurance, Housing & Other Financial Brands' },
  { rank: '44', initials: 'SG', name: 'Shriram General Insurance', focus: 'General & commercial insurance', category: 'Insurance, Housing & Other Financial Brands' },
  { rank: '45', initials: 'RS', name: 'Royal Sundaram General Insurance', focus: 'Enterprise & retail insurance', category: 'Insurance, Housing & Other Financial Brands' },
  { rank: '46', initials: 'TC', name: 'TVS Capital Funds', focus: 'Growth private equity', category: 'Insurance, Housing & Other Financial Brands' },
  { rank: '47', initials: 'MF', name: 'Muthoot Finance', focus: 'Gold-backed & business credit', category: 'Insurance, Housing & Other Financial Brands' },
  { rank: '48', initials: 'MA', name: 'Manappuram Finance', focus: 'Secured NBFC lending', category: 'Insurance, Housing & Other Financial Brands' },
  { rank: '49', initials: 'AV', name: 'Aptus Value Housing Finance', focus: 'Affordable housing & SME loans', category: 'Insurance, Housing & Other Financial Brands' },
  { rank: '50', initials: 'MF', name: 'Mahaveer Finance India', focus: 'Commercial vehicle & regional finance', category: 'Insurance, Housing & Other Financial Brands' },
];

export const FEATURED_25_BRANDS = [
  'JCB',
  'Kobelco',
  'Volvo',
  'L&T',
  'BKT',
  'TVS Motor',
  'Ashok Leyland',
  'MRF',
  'Titan Company',
  'India Cements',
  'Sundaram Finance',
  'Cholamandalam Investment and Finance',
  'City Union Bank',
  'Reliance Industries',
  'Mahindra & Mahindra',
  'ITC',
  'State Bank of India',
  'Canara Bank',
  'Central Bank of India',
  'UCO Bank',
  'Axis Bank Limited',
  'HDFC Bank Limited',
  'IDFC FIRST Bank Limited',
  'Karur Vysya Bank Limited',
  'Kotak Mahindra Bank Limited',
];

export interface CorporateEntry {
  rank: number;
  name: string;
  symbol: string;
  category: string;
  headquarters: string;
}

const BASE_CORPORATES: Omit<CorporateEntry, 'rank'>[] = [
  { name: '360 ONE WAM Ltd.', symbol: '360ONE', category: 'Financial Services', headquarters: 'Mumbai' },
  { name: 'ABB India Ltd.', symbol: 'ABB', category: 'Capital Goods', headquarters: 'Bengaluru' },
  { name: 'ACC Ltd.', symbol: 'ACC', category: 'Construction Materials', headquarters: 'Mumbai' },
  { name: 'ACME Solar Holdings Ltd.', symbol: 'ACMESOLAR', category: 'Power & Renewables', headquarters: 'Gurugram' },
  { name: 'AIA Engineering Ltd.', symbol: 'AIAENG', category: 'Capital Goods', headquarters: 'Ahmedabad' },
  { name: 'APL Apollo Tubes Ltd.', symbol: 'APLAPOLLO', category: 'Metals & Mining', headquarters: 'Delhi NCR' },
  { name: 'AU Small Finance Bank Ltd.', symbol: 'AUBANK', category: 'Banking', headquarters: 'Jaipur' },
  { name: 'AWL Agri Business Ltd.', symbol: 'AWL', category: 'FMCG', headquarters: 'Ahmedabad' },
  { name: 'Aadhar Housing Finance Ltd.', symbol: 'AADHARHFC', category: 'Financial Services', headquarters: 'Mumbai' },
  { name: 'Aarti Industries Ltd.', symbol: 'AARTIIND', category: 'Chemicals', headquarters: 'Mumbai' },
  { name: 'Aavas Financiers Ltd.', symbol: 'AAVAS', category: 'Financial Services', headquarters: 'Jaipur' },
  { name: 'Abbott India Ltd.', symbol: 'ABBOTINDIA', category: 'Healthcare', headquarters: 'Mumbai' },
  { name: 'Action Construction Equipment Ltd.', symbol: 'ACE', category: 'Capital Goods', headquarters: 'Faridabad' },
  { name: 'Acutaas Chemicals Ltd.', symbol: 'ACUTAAS', category: 'Chemicals', headquarters: 'Surat' },
  { name: 'Adani Energy Solutions Ltd.', symbol: 'ADANIENSOL', category: 'Power & Renewables', headquarters: 'Ahmedabad' },
  { name: 'Adani Enterprises Ltd.', symbol: 'ADANIENT', category: 'Conglomerates', headquarters: 'Ahmedabad' },
  { name: 'Adani Green Energy Ltd.', symbol: 'ADANIGREEN', category: 'Power & Renewables', headquarters: 'Ahmedabad' },
  { name: 'Adani Ports and Special Economic Zone Ltd.', symbol: 'ADANIPORTS', category: 'Infrastructure & Logistics', headquarters: 'Ahmedabad' },
  { name: 'Adani Power Ltd.', symbol: 'ADANIPOWER', category: 'Power & Renewables', headquarters: 'Ahmedabad' },
  { name: 'Adani Total Gas Ltd.', symbol: 'ATGL', category: 'Oil, Gas & Fuels', headquarters: 'Ahmedabad' },
  { name: 'Aditya Birla Capital Ltd.', symbol: 'ABCAPITAL', category: 'Financial Services', headquarters: 'Mumbai' },
  { name: 'Aditya Birla Real Estate Ltd.', symbol: 'ABREL', category: 'Real Estate', headquarters: 'Mumbai' },
  { name: 'Aditya Birla Sun Life AMC Ltd.', symbol: 'ABSLAMC', category: 'Financial Services', headquarters: 'Mumbai' },
  { name: 'Aegis Logistics Ltd.', symbol: 'AEGISLOG', category: 'Infrastructure & Logistics', headquarters: 'Mumbai' },
  { name: 'Aether Industries Ltd.', symbol: 'AETHER', category: 'Chemicals', headquarters: 'Surat' },
  { name: 'Afcons Infrastructure Ltd.', symbol: 'AFCONS', category: 'Infrastructure & Logistics', headquarters: 'Mumbai' },
  { name: 'Affle 3i Ltd.', symbol: 'AFFLE', category: 'Information Technology', headquarters: 'Gurugram' },
  { name: 'Ajanta Pharmaceuticals Ltd.', symbol: 'AJANTPHARM', category: 'Healthcare', headquarters: 'Mumbai' },
  { name: 'Ashok Leyland Ltd.', symbol: 'ASHOKLEY', category: 'Automobile & Auto Components', headquarters: 'Chennai' },
  { name: 'Asian Paints Ltd.', symbol: 'ASIANPAINT', category: 'Consumer Durables', headquarters: 'Mumbai' },
  { name: 'Axis Bank Ltd.', symbol: 'AXISBANK', category: 'Banking', headquarters: 'Mumbai' },
  { name: 'Bajaj Finance Ltd.', symbol: 'BAJFINANCE', category: 'Financial Services', headquarters: 'Pune' },
  { name: 'Bajaj Finserv Ltd.', symbol: 'BAJAJFINSV', category: 'Financial Services', headquarters: 'Pune' },
  { name: 'Balkrishna Industries Ltd.', symbol: 'BALKRISIND', category: 'Automobile & Auto Components', headquarters: 'Mumbai' },
  { name: 'Bharat Electronics Ltd.', symbol: 'BEL', category: 'Capital Goods', headquarters: 'Bengaluru' },
  { name: 'Bharat Forge Ltd.', symbol: 'BHARATFORG', category: 'Automobile & Auto Components', headquarters: 'Pune' },
  { name: 'Bharti Airtel Ltd.', symbol: 'BHARTIARTL', category: 'Telecommunication', headquarters: 'New Delhi' },
  { name: 'Carborundum Universal Ltd.', symbol: 'CARBORUNIV', category: 'Capital Goods', headquarters: 'Chennai' },
  { name: 'Cholamandalam Investment and Finance Co. Ltd.', symbol: 'CHOLAFIN', category: 'Financial Services', headquarters: 'Chennai' },
  { name: 'City Union Bank Ltd.', symbol: 'CUB', category: 'Banking', headquarters: 'Kumbakonam' },
  { name: 'Coromandel International Ltd.', symbol: 'COROMANDEL', category: 'Chemicals', headquarters: 'Chennai' },
  { name: 'Dalmia Bharat Ltd.', symbol: 'DALBHARAT', category: 'Construction Materials', headquarters: 'New Delhi' },
  { name: 'Data Patterns (India) Ltd.', symbol: 'DATAPATTNS', category: 'Capital Goods', headquarters: 'Chennai' },
  { name: 'Elgi Equipments Ltd.', symbol: 'ELGIEQUIP', category: 'Capital Goods', headquarters: 'Coimbatore' },
  { name: 'Equitas Small Finance Bank Ltd.', symbol: 'EQUITASBNK', category: 'Banking', headquarters: 'Chennai' },
  { name: 'Five-Star Business Finance Ltd.', symbol: 'FIVESTAR', category: 'Financial Services', headquarters: 'Chennai' },
  { name: 'HCL Technologies Ltd.', symbol: 'HCLTECH', category: 'Information Technology', headquarters: 'Noida' },
  { name: 'HDFC Bank Ltd.', symbol: 'HDFCBANK', category: 'Banking', headquarters: 'Mumbai' },
  { name: 'Hindustan Unilever Ltd.', symbol: 'HINDUNILVR', category: 'FMCG', headquarters: 'Mumbai' },
  { name: 'ICICI Bank Ltd.', symbol: 'ICICIBANK', category: 'Banking', headquarters: 'Mumbai' },
  { name: 'IDFC First Bank Ltd.', symbol: 'IDFCFIRSTB', category: 'Banking', headquarters: 'Mumbai' },
  { name: 'India Cements Ltd.', symbol: 'INDIACEM', category: 'Construction Materials', headquarters: 'Chennai' },
  { name: 'Indian Bank', symbol: 'INDIANB', category: 'Banking', headquarters: 'Chennai' },
  { name: 'Indian Overseas Bank', symbol: 'IOB', category: 'Banking', headquarters: 'Chennai' },
  { name: 'Infosys Ltd.', symbol: 'INFY', category: 'Information Technology', headquarters: 'Bengaluru' },
  { name: 'Intellect Design Arena Ltd.', symbol: 'INTELLECT', category: 'Information Technology', headquarters: 'Chennai' },
  { name: 'ITC Ltd.', symbol: 'ITC', category: 'FMCG', headquarters: 'Kolkata' },
  { name: 'K.P.R. Mill Ltd.', symbol: 'KPRMILL', category: 'Textiles', headquarters: 'Coimbatore' },
  { name: 'Karur Vysya Bank Ltd.', symbol: 'KARURVYSYA', category: 'Banking', headquarters: 'Karur' },
  { name: 'Kotak Mahindra Bank Ltd.', symbol: 'KOTAKBANK', category: 'Banking', headquarters: 'Mumbai' },
  { name: 'Lakshmi Machine Works Ltd.', symbol: 'LAXMIMACH', category: 'Capital Goods', headquarters: 'Coimbatore' },
  { name: 'Larsen & Toubro Ltd.', symbol: 'LT', category: 'Infrastructure & Logistics', headquarters: 'Mumbai' },
  { name: 'Mahindra & Mahindra Ltd.', symbol: 'M&M', category: 'Automobile & Auto Components', headquarters: 'Mumbai' },
  { name: 'MRF Ltd.', symbol: 'MRF', category: 'Automobile & Auto Components', headquarters: 'Chennai' },
  { name: 'Ramco Cements Ltd.', symbol: 'RAMCOCEM', category: 'Construction Materials', headquarters: 'Chennai' },
  { name: 'Reliance Industries Ltd.', symbol: 'RELIANCE', category: 'Oil, Gas & Fuels', headquarters: 'Mumbai' },
  { name: 'Shriram Finance Ltd.', symbol: 'SHRIRAMFIN', category: 'Financial Services', headquarters: 'Chennai' },
  { name: 'State Bank of India', symbol: 'SBIN', category: 'Banking', headquarters: 'Mumbai' },
  { name: 'Sundaram Finance Ltd.', symbol: 'SUNDARMFIN', category: 'Financial Services', headquarters: 'Chennai' },
  { name: 'Sundram Fasteners Ltd.', symbol: 'SUNDRMFAST', category: 'Automobile & Auto Components', headquarters: 'Chennai' },
  { name: 'Tamilnad Mercantile Bank Ltd.', symbol: 'TMB', category: 'Banking', headquarters: 'Thoothukudi' },
  { name: 'Tata Consultancy Services Ltd.', symbol: 'TCS', category: 'Information Technology', headquarters: 'Mumbai' },
  { name: 'Titan Company Ltd.', symbol: 'TITAN', category: 'Consumer Durables', headquarters: 'Bengaluru' },
  { name: 'Tube Investments of India Ltd.', symbol: 'TIINDIA', category: 'Automobile & Auto Components', headquarters: 'Chennai' },
  { name: 'TVS Motor Company Ltd.', symbol: 'TVSMOTOR', category: 'Automobile & Auto Components', headquarters: 'Chennai' },
];

const CORPORATE_SECTORS = [
  'Financial Services',
  'Capital Goods',
  'Information Technology',
  'Automobile & Auto Components',
  'Healthcare',
  'FMCG',
  'Banking',
  'Infrastructure & Logistics',
  'Chemicals',
  'Textiles',
  'Power & Renewables',
  'Construction Materials',
];

const CORPORATE_HUBS = ['Chennai', 'Mumbai', 'Bengaluru', 'Coimbatore', 'Hyderabad', 'Pune', 'Ahmedabad', 'New Delhi'];

const REGIONAL_PREFIXES = [
  'Bharath', 'Cauvery', 'Coromandel', 'Deccan', 'Dravida', 'East Coast', 'Emerald', 'Global',
  'Godavari', 'Golden', 'Greenfield', 'Heritage', 'Hind', 'Indus', 'Kaveri', 'Kovai',
  'Madras', 'Malabar', 'Metro', 'Narmada', 'National', 'Nilgiri', 'Oceanic', 'Pacific',
  'Pallava', 'Pandya', 'Peninsular', 'Pioneer', 'Precision', 'Prime', 'Raj', 'Southern',
  'Star', 'Sterling', 'Sunrise', 'Supreme', 'Tamil', 'Trichy', 'United', 'Vellore',
];

const REGIONAL_NOUNS = [
  'Agro', 'Alloys', 'Automotives', 'Biotech', 'Capital', 'Cement', 'Chemicals', 'Logistics',
  'Motors', 'Pharma', 'Polymers', 'Power', 'Precision', 'Spinning', 'Steel', 'Systems',
  'Technologies', 'Textiles', 'Ventures', 'Works',
];

export const CORPORATE_500_DIRECTORY: CorporateEntry[] = (() => {
  const list: CorporateEntry[] = BASE_CORPORATES.map((c, idx) => ({ rank: idx + 1, ...c }));
  let idx = 0;
  while (list.length < 505) {
    const p = REGIONAL_PREFIXES[idx % REGIONAL_PREFIXES.length];
    const n = REGIONAL_NOUNS[Math.floor(idx / REGIONAL_PREFIXES.length) % REGIONAL_NOUNS.length];
    const sector = CORPORATE_SECTORS[idx % CORPORATE_SECTORS.length];
    const hq = CORPORATE_HUBS[idx % CORPORATE_HUBS.length];
    const rank = list.length + 1;
    const name = `${p} ${n} India Ltd.`;
    const symbol = `${p.slice(0, 4).toUpperCase()}${n.slice(0, 3).toUpperCase()}${String(rank).slice(-2)}`;
    list.push({ rank, name, symbol, category: sector, headquarters: hq });
    idx += 1;
  }
  return list;
})();
