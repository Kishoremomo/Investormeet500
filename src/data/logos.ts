export interface InstitutionLogoAsset {
  key: string;
  label: string;
  src: string;
  darkSurface?: boolean;
  aliases: string[];
}

export const INSTITUTION_LOGOS: InstitutionLogoAsset[] = [
  // Heavy Equipment & Industrial Partners (Marquee & Sponsors)
  { key: 'jcb', label: 'JCB India', src: '/media/logos/jcb.svg', aliases: ['jcb', 'jcb india'] },
  { key: 'kobelco', label: 'Kobelco', src: '/media/logos/kobelco.svg', darkSurface: true, aliases: ['kobelco', 'kobelco construction'] },
  { key: 'volvo', label: 'Volvo', src: '/media/logos/volvo.svg', aliases: ['volvo', 'volvo construction'] },
  { key: 'lt', label: 'Larsen & Toubro', src: '/media/logos/lt.svg', aliases: ['l&t', 'larsen & toubro', 'larsen and toubro'] },
  { key: 'bkt', label: 'BKT', src: '/media/logos/bkt.svg', aliases: ['bkt', 'balkrishna industries'] },

  // Major Scheduled & Nationalised Banks
  { key: 'sbi', label: 'State Bank of India', src: '/media/logos/sbi.svg', aliases: ['state bank of india', 'sbi'] },
  { key: 'bob', label: 'Bank of Baroda', src: '/media/logos/bob.png', aliases: ['bank of baroda'] },
  { key: 'bank_of_maharashtra', label: 'Bank of Maharashtra', src: '/media/logos/bank_of_maharashtra.svg', aliases: ['bank of maharashtra'] },
  { key: 'canara', label: 'Canara Bank', src: '/media/logos/canara.svg', aliases: ['canara bank'] },
  { key: 'cbi', label: 'Central Bank of India', src: '/media/logos/cbi.svg', aliases: ['central bank of india'] },
  { key: 'indian_bank', label: 'Indian Bank', src: '/media/logos/indian_bank.png', aliases: ['indian bank'] },
  { key: 'iob', label: 'Indian Overseas Bank', src: '/media/logos/iob.svg', aliases: ['indian overseas bank'] },
  { key: 'punjab_sind_bank', label: 'Punjab & Sind Bank', src: '/media/logos/punjab_sind_bank.svg', aliases: ['punjab & sind bank', 'punjab and sind bank'] },
  { key: 'pnb', label: 'Punjab National Bank', src: '/media/logos/pnb.svg', aliases: ['punjab national bank'] },
  { key: 'uco', label: 'UCO Bank', src: '/media/logos/uco.jpg', aliases: ['uco bank'] },
  { key: 'union_bank', label: 'Union Bank of India', src: '/media/logos/union_bank.svg', aliases: ['union bank of india'] },

  // Domestic Private Sector Banks
  { key: 'axis', label: 'Axis Bank', src: '/media/logos/axis.svg', aliases: ['axis bank'] },
  { key: 'bandhan', label: 'Bandhan Bank', src: '/media/logos/bandhan.svg', aliases: ['bandhan bank'] },
  { key: 'csb', label: 'CSB Bank', src: '/media/logos/csb.svg', aliases: ['csb bank'] },
  { key: 'cub', label: 'City Union Bank', src: '/media/logos/cub.svg', aliases: ['city union bank'] },
  { key: 'dhanlaxmi', label: 'Dhanlaxmi Bank', src: '/media/logos/dhanlaxmi.svg', aliases: ['dhanlaxmi bank'] },
  { key: 'federal', label: 'Federal Bank', src: '/media/logos/federal.svg', aliases: ['federal bank'] },
  { key: 'hdfc', label: 'HDFC Bank', src: '/media/logos/hdfc.svg', aliases: ['hdfc bank'] },
  { key: 'icici', label: 'ICICI Bank', src: '/media/logos/icici.svg', aliases: ['icici bank'] },
  { key: 'indusind', label: 'IndusInd Bank', src: '/media/logos/indusind.svg', aliases: ['indusind bank'] },
  { key: 'idfc_first', label: 'IDFC FIRST Bank', src: '/media/logos/idfc_first.svg', aliases: ['idfc first bank'] },
  { key: 'karnataka_bank', label: 'Karnataka Bank', src: '/media/logos/karnataka_bank.svg', aliases: ['karnataka bank'] },
  { key: 'kvb', label: 'Karur Vysya Bank', src: '/media/logos/kvb.svg', aliases: ['karur vysya bank'] },
  { key: 'kotak', label: 'Kotak Mahindra Bank', src: '/media/logos/kotak.svg', aliases: ['kotak mahindra bank'] },
  { key: 'rbl', label: 'RBL Bank', src: '/media/logos/rbl.svg', aliases: ['rbl bank'] },
  { key: 'south_indian_bank', label: 'South Indian Bank', src: '/media/logos/south_indian_bank.png', aliases: ['south indian bank'] },
  { key: 'tmb', label: 'Tamilnad Mercantile Bank', src: '/media/logos/tmb.svg', aliases: ['tamilnad mercantile bank'] },
  { key: 'yes_bank', label: 'YES Bank', src: '/media/logos/yes_bank.svg', aliases: ['yes bank'] },
  { key: 'idbi', label: 'IDBI Bank', src: '/media/logos/idbi.svg', aliases: ['idbi bank'] },

  // Small Finance & Payments Banks
  { key: 'au_bank', label: 'AU Small Finance Bank', src: '/media/logos/au_bank.svg', aliases: ['au small finance bank'] },
  { key: 'equitas', label: 'Equitas Small Finance Bank', src: '/media/logos/equitas.png', aliases: ['equitas small finance bank'] },
  { key: 'esaf', label: 'ESAF Small Finance Bank', src: '/media/logos/esaf.svg', aliases: ['esaf small finance bank'] },
  { key: 'airtel_pb', label: 'Airtel Payments Bank', src: '/media/logos/airtel_pb.svg', aliases: ['airtel payments bank'] },

  // Foreign Banks Operating in India
  { key: 'amex', label: 'American Express', src: '/media/logos/amex.svg', darkSurface: true, aliases: ['american express banking'] },
  { key: 'anz', label: 'ANZ Bank', src: '/media/logos/anz.svg', aliases: ['australia and new zealand banking'] },
  { key: 'barclays', label: 'Barclays', src: '/media/logos/barclays.svg', aliases: ['barclays bank'] },
  { key: 'bank_of_america', label: 'Bank of America', src: '/media/logos/bank_of_america.svg', aliases: ['bank of america'] },
  { key: 'bnp_paribas', label: 'BNP Paribas', src: '/media/logos/bnp_paribas.svg', aliases: ['bnp paribas'] },
  { key: 'citi', label: 'Citibank', src: '/media/logos/citi.svg', aliases: ['citibank'] },
  { key: 'rabobank', label: 'Rabobank', src: '/media/logos/rabobank.svg', aliases: ['rabobank'] },
  { key: 'credit_agricole', label: 'Credit Agricole', src: '/media/logos/credit_agricole.svg', aliases: ['credit agricole'] },
  { key: 'dbs', label: 'DBS Bank', src: '/media/logos/dbs.svg', aliases: ['dbs bank'] },
  { key: 'deutsche', label: 'Deutsche Bank', src: '/media/logos/deutsche.svg', aliases: ['deutsche bank'] },
  { key: 'hsbc', label: 'HSBC', src: '/media/logos/hsbc.svg', aliases: ['hong kong and shanghai banking', 'hsbc'] },
  { key: 'jpmorgan', label: 'J.P. Morgan', src: '/media/logos/jpmorgan.svg', aliases: ['j.p. morgan chase', 'jpmorgan'] },
  { key: 'mufg', label: 'MUFG Bank', src: '/media/logos/mufg.svg', aliases: ['mufg bank'] },
  { key: 'scotiabank', label: 'Scotiabank', src: '/media/logos/scotiabank.svg', aliases: ['bank of nova scotia', 'scotiabank'] },
  { key: 'societe_generale', label: 'Societe Generale', src: '/media/logos/societe_generale.svg', aliases: ['societe generale'] },
  { key: 'standard_chartered', label: 'Standard Chartered', src: '/media/logos/standard_chartered.svg', aliases: ['standard chartered'] },
  { key: 'ubs', label: 'UBS', src: '/media/logos/ubs.png', aliases: ['ubs ag', 'ubs'] },

  // Financial Brands & Corporate Directory Leaders
  { key: 'shriram', label: 'Shriram Finance', src: '/media/logos/shriram.svg', aliases: ['shriram finance', 'shriram mutual fund', 'shriram wealth', 'shriram life', 'shriram general'] },
  { key: 'sundaram', label: 'Sundaram Finance', src: '/media/logos/sundaram.png', aliases: ['sundaram finance', 'sundaram mutual fund', 'sundaram asset', 'sundaram home', 'royal sundaram'] },
  { key: 'muthoot', label: 'Muthoot Finance', src: '/media/logos/muthoot.png', aliases: ['muthoot finance'] },
  { key: 'bajaj_finance', label: 'Bajaj Finance', src: '/media/logos/bajaj_finance.svg', aliases: ['bajaj finance'] },
  { key: 'bajaj_finserv', label: 'Bajaj Finserv', src: '/media/logos/bajaj_finserv.svg', aliases: ['bajaj finserv'] },
  { key: 'tvs_motor', label: 'TVS Motor', src: '/media/logos/tvs_motor.svg', aliases: ['tvs motor'] },
  { key: 'mrf', label: 'MRF', src: '/media/logos/mrf.svg', aliases: ['mrf'] },
  { key: 'titan', label: 'Titan Company', src: '/media/logos/titan.png', aliases: ['titan company'] },
  { key: 'reliance', label: 'Reliance Industries', src: '/media/logos/reliance.svg', aliases: ['reliance industries'] },
  { key: 'mahindra', label: 'Mahindra & Mahindra', src: '/media/logos/mahindra.png', aliases: ['mahindra & mahindra', 'mahindra and mahindra'] },
  { key: 'itc', label: 'ITC', src: '/media/logos/itc.svg', aliases: ['itc'] },
  { key: 'hcl', label: 'HCL Technologies', src: '/media/logos/hcl.svg', aliases: ['hcl technologies', 'hcltech'] },
  { key: 'infosys', label: 'Infosys', src: '/media/logos/infosys.svg', aliases: ['infosys'] },
  { key: 'tcs', label: 'Tata Consultancy Services', src: '/media/logos/tcs.svg', aliases: ['tata consultancy services', 'tcs'] },
  { key: 'abb_india', label: 'ABB India', src: '/media/logos/abb_india.svg', aliases: ['abb india'] },
  { key: 'asian_paints', label: 'Asian Paints', src: '/media/logos/asian_paints.svg', aliases: ['asian paints'] },
  { key: 'bharti_airtel', label: 'Bharti Airtel', src: '/media/logos/bharti_airtel.svg', aliases: ['bharti airtel'] },
  { key: 'hindustan_unilever', label: 'Hindustan Unilever', src: '/media/logos/hindustan_unilever.svg', aliases: ['hindustan unilever'] },
];

export const FEATURED_SHOWCASE_BANKS = [
  'State Bank of India',
  'Bank of Baroda',
  'Canara Bank',
  'Central Bank of India',
  'Indian Bank',
  'Indian Overseas Bank',
  'Punjab National Bank',
  'Union Bank of India',
  'HDFC Bank Limited',
  'ICICI Bank Limited',
  'Axis Bank Limited',
  'Kotak Mahindra Bank Limited',
  'Karur Vysya Bank Limited',
  'Tamilnad Mercantile Bank Limited',
  'City Union Bank Limited',
  'IDFC FIRST Bank Limited',
  'Federal Bank Limited',
  'Standard Chartered Bank',
] as const;
