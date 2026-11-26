// ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ - Central content & data source
// Includes the Ethiopian SACCO directory, products, news, events, FAQ, etc.

export type Sacco = {
  id: string;
  name: string;
  region: string;
  city: string;
  type: "Urban" | "Rural" | "Workplace" | "Community";
  established: number;
  members: number;
  assetsBirr: number; // in millions ETB
  phone: string;
  email: string;
  services: string[];
  description: string;
  featured: boolean;
};

// ---------------------------------------------------------------------------
// ETHIOPIAN SACCO DIRECTORY — representative listing across all regions
// ---------------------------------------------------------------------------
export const ethiopianSaccos: Sacco[] = [
  {
    id: "s1",
    name: "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ",
    region: "Addis Ababa",
    city: "Addis Ababa",
    type: "Urban",
    established: 2026,
    members: 2000,
    assetsBirr: 900,
    phone: "+251 6671",
    email: "info@sustainablesacco.com",
    services: ["Savings", "Loans", "Investment", "Digital Banking"],
    description:
      "Technologically advanced model SACCO serving members across Addis Ababa with smart finance, competitive rates and a 24/7 hotline. Member-owned under Proclamation No. 985/2009.",
    featured: true,
  },
  {
    id: "s2",
    name: "Amhara Credit & Savings Institution (ACSI)",
    region: "Amhara",
    city: "Bahir Dar",
    type: "Rural",
    established: 1997,
    members: 950000,
    assetsBirr: 23000,
    phone: "+251 58 220 0810",
    email: "info@acsi.org.et",
    services: ["Microfinance", "Agricultural Loans", "Savings", "Insurance"],
    description:
      "One of the largest rural microfinance institutions in Africa, serving smallholder farmers and rural entrepreneurs across the Amhara region.",
    featured: true,
  },
  {
    id: "s3",
    name: "Dedebit Credit & Savings Institution (DECSI)",
    region: "Tigray",
    city: "Mekelle",
    type: "Rural",
    established: 1997,
    members: 520000,
    assetsBirr: 12000,
    phone: "+251 34 440 4966",
    email: "info@decsi.org.et",
    services: ["Rural Finance", "SME Loans", "Savings", "Women Empowerment"],
    description:
      "A leading microfinance provider in Tigray, focused on poverty reduction through accessible financial services for rural households and micro-entrepreneurs.",
    featured: true,
  },
  {
    id: "s4",
    name: "Oromia Credit & Savings Share Co. (OCSSCO)",
    region: "Oromia",
    city: "Finfine (Addis Ababa)",
    type: "Rural",
    established: 1997,
    members: 700000,
    assetsBirr: 18000,
    phone: "+251 11 551 0066",
    email: "info@ocssco.com",
    services: ["Rural Credit", "Savings", "Agri-input Loans", "Group Lending"],
    description:
      "The largest microfinance share company in Oromia, providing rural credit, savings and agricultural loan products to cooperative members and smallholder farmers.",
    featured: true,
  },
  {
    id: "s5",
    name: "Sidama Micro Finance Institution",
    region: "Sidama",
    city: "Hawassa",
    type: "Rural",
    established: 1998,
    members: 230000,
    assetsBirr: 4500,
    phone: "+251 46 220 0099",
    email: "info@sidamamfi.org.et",
    services: ["Micro-credit", "Savings", "Business Loans", "Training"],
    description:
      "Microfinance institution serving the Sidama region with group-based lending, savings mobilization and business development support.",
    featured: false,
  },
  {
    id: "s6",
    name: "Omata Savings & Credit Cooperative",
    region: "South Ethiopia",
    city: "Wolayta Sodo",
    type: "Community",
    established: 2005,
    members: 18500,
    assetsBirr: 320,
    phone: "+251 46 551 0234",
    email: "omata@saccos.org.et",
    services: ["Savings", "Consumer Loans", "Education Loans", "Insurance"],
    description:
      "Community-based SACCO serving the South Ethiopia region with member-focused savings and affordable credit for households and small businesses.",
    featured: false,
  },
  {
    id: "s7",
    name: "Cooperative Bank of Oromia SACCO Desk",
    region: "Oromia",
    city: "Addis Ababa",
    type: "Workplace",
    established: 2005,
    members: 45000,
    assetsBirr: 1500,
    phone: "+251 11 663 0303",
    email: "sacco@coopbankoromia.com.et",
    services: ["Salary Loans", "Savings", "Housing Loans", "Vehicle Loans"],
    description:
      "Workplace SACCO linked to Cooperative Bank of Oromia offering salary-backed loans, savings and housing products to employees.",
    featured: false,
  },
  {
    id: "s8",
    name: "Ethio Telecom Staff SACCO",
    region: "Addis Ababa",
    city: "Addis Ababa",
    type: "Workplace",
    established: 2001,
    members: 12000,
    assetsBirr: 850,
    phone: "+251 11 550 9000",
    email: "sacco@ethiotelecom.et",
    services: ["Staff Loans", "Savings", "Emergency Loans", "Pension Top-up"],
    description:
      "Employee SACCO for Ethio Telecom staff, providing emergency and consumer loans, voluntary savings and dividend payouts.",
    featured: false,
  },
  {
    id: "s9",
    name: "Ethiopian Airlines Employees SACCO",
    region: "Addis Ababa",
    city: "Bole, Addis Ababa",
    type: "Workplace",
    established: 1998,
    members: 9000,
    assetsBirr: 1100,
    phone: "+251 11 517 7000",
    email: "sacco@ethiopianairlines.com",
    services: ["Vehicle Loans", "Housing Loans", "Savings", "Share Capital"],
    description:
      "Long-standing employee SACCO for Ethiopian Airlines staff, funding vehicle purchases, housing and long-term savings.",
    featured: true,
  },
  {
    id: "s10",
    name: "Addis Ababa University Staff SACCO",
    region: "Addis Ababa",
    city: "Sidist Kilo, Addis Ababa",
    type: "Workplace",
    established: 1996,
    members: 6500,
    assetsBirr: 420,
    phone: "+251 11 122 0303",
    email: "sacco@aau.edu.et",
    services: ["Salary Loans", "Research Loans", "Savings", "Education Loans"],
    description:
      "Academic community SACCO serving AAU staff with salary advances, research and education financing and share-based dividends.",
    featured: false,
  },
  {
    id: "s11",
    name: "Berhan Ena Selam SACCO",
    region: "Addis Ababa",
    city: "Merkato, Addis Ababa",
    type: "Urban",
    established: 2010,
    members: 8400,
    assetsBirr: 380,
    phone: "+251 11 660 1144",
    email: "berhansacco@gmail.com",
    services: ["Trade Loans", "Savings", "Group Lending", "Insurance"],
    description:
      "Urban SACCO for market traders in Merkato, offering working capital loans and group savings for small-scale merchants.",
    featured: false,
  },
  {
    id: "s12",
    name: "Welfar SACCO",
    region: "Addis Ababa",
    city: "Addis Ababa",
    type: "Urban",
    established: 2015,
    members: 11000,
    assetsBirr: 520,
    phone: "+251 11 663 0055",
    email: "info@welfarsacco.com",
    services: ["Micro Loans", "Savings", "Car Loans", "Digital Banking"],
    description:
      "Urban SACCO offering micro-loans, vehicle financing and mobile banking services to professionals and SMEs in Addis Ababa.",
    featured: false,
  },
  {
    id: "s13",
    name: "Somali Microfinance Institution",
    region: "Somali",
    city: "Jigjiga",
    type: "Rural",
    established: 2003,
    members: 95000,
    assetsBirr: 2100,
    phone: "+251 87 220 0300",
    email: "info@smfi.org.et",
    services: ["Pastoralist Loans", "Savings", "Trade Credit", "Group Lending"],
    description:
      "Microfinance tailored for the Somali region's pastoralist and trader communities with Sharia-compliant-style group lending.",
    featured: false,
  },
  {
    id: "s14",
    name: "Afar Pastoralist SACCO Union",
    region: "Afar",
    city: "Semera",
    type: "Community",
    established: 2008,
    members: 22000,
    assetsBirr: 290,
    phone: "+251 33 775 0011",
    email: "afarunion@saccos.org.et",
    services: ["Livestock Loans", "Savings", "Water Credit", "Insurance"],
    description:
      "Community SACCO union supporting Afar pastoralists with livestock credit, water-point financing and drought-resilience savings.",
    featured: false,
  },
  {
    id: "s15",
    name: "Benishangul-Gumuz Credit Union",
    region: "Benishangul-Gumuz",
    city: "Assosa",
    type: "Rural",
    established: 2006,
    members: 38000,
    assetsBirr: 410,
    phone: "+251 57 775 0120",
    email: "bgcu@microfinance.et",
    services: ["Agricultural Loans", "Savings", "Goldsmith Credit", "Training"],
    description:
      "Rural credit union serving farming and small-scale goldsmithing communities in Benishangul-Gumuz region.",
    featured: false,
  },
  {
    id: "s16",
    name: "Gambela Savings & Credit Cooperative",
    region: "Gambela",
    city: "Gambela",
    type: "Community",
    established: 2011,
    members: 7800,
    assetsBirr: 95,
    phone: "+251 34 277 0020",
    email: "gambelasacco@mfi.et",
    services: ["Savings", "Farming Loans", "Fishing Credit", "Insurance"],
    description:
      "Community SACCO for Gambela's farming and fishing communities along the Baro and Akobo river basins.",
    featured: false,
  },
  {
    id: "s17",
    name: "Harari People SACCO",
    region: "Harari",
    city: "Harar",
    type: "Urban",
    established: 2007,
    members: 14200,
    assetsBirr: 240,
    phone: "+251 25 666 0188",
    email: "hararisacco@harar.gov.et",
    services: ["Trade Loans", "Savings", "Housing", "Cultural Tourism Credit"],
    description:
      "Urban SACCO supporting Harari traders, homeowners and cultural tourism entrepreneurs in the historic walled city of Harar.",
    featured: false,
  },
  {
    id: "s18",
    name: "South West Ethiopia Peoples SACCO Union",
    region: "South West Ethiopia",
    city: "Bonga",
    type: "Community",
    established: 2020,
    members: 18500,
    assetsBirr: 180,
    phone: "+251 47 220 0044",
    email: "swepu@saccos.org.et",
    services: ["Coffee Farmer Loans", "Savings", "Cooperative Marketing", "Insurance"],
    description:
      "Newly formed regional union supporting coffee-growing communities of South West Ethiopia with savings and marketing credit.",
    featured: false,
  },
  {
    id: "s19",
    name: "Wondo Trading SACCO",
    region: "Oromia",
    city: "Shashemene",
    type: "Urban",
    established: 2014,
    members: 9100,
    assetsBirr: 310,
    phone: "+251 46 336 0177",
    email: "wondosacco@gmail.com",
    services: ["Trade Loans", "Transport Credit", "Savings", "Vehicle Loans"],
    description:
      "Urban SACCO serving traders and transport operators along the Shashemene–Bale corridor with working capital and vehicle financing.",
    featured: false,
  },
  {
    id: "s20",
    name: "Aggar SACCO",
    region: "Addis Ababa",
    city: "Piazza, Addis Ababa",
    type: "Urban",
    established: 2012,
    members: 12700,
    assetsBirr: 470,
    phone: "+251 11 551 0290",
    email: "info@aggarsacco.com",
    services: ["Consumer Loans", "Savings", "Time Deposit", "Mobile Banking"],
    description:
      "Established urban SACCO offering consumer loans, time deposits and a growing mobile banking platform for Addis Ababa professionals.",
    featured: false,
  },
  {
    id: "s21",
    name: "Mekrez SACCO",
    region: "Addis Ababa",
    city: "Mekanisa, Addis Ababa",
    type: "Urban",
    established: 2016,
    members: 6800,
    assetsBirr: 210,
    phone: "+251 11 470 0150",
    email: "mekrezsacco@gmail.com",
    services: ["Housing Loans", "Savings", "Mortgage", "Share Capital"],
    description:
      "Urban SACCO focused on housing finance and mortgage-style products for middle-income households in Addis Ababa.",
    featured: false,
  },
  {
    id: "s22",
    name: "Commercial Bank of Ethiopia Staff SACCO",
    region: "Addis Ababa",
    city: "Head Office, Addis Ababa",
    type: "Workplace",
    established: 1995,
    members: 18000,
    assetsBirr: 980,
    phone: "+251 11 550 3000",
    email: "sacco@cbe.com.et",
    services: ["Staff Loans", "Housing", "Vehicle Loans", "Pension Loans"],
    description:
      "Workplace SACCO for CBE staff, one of the largest employee SACCOs in Ethiopia, providing housing, vehicle and pension-backed loans.",
    featured: false,
  },
  {
    id: "s23",
    name: "Dire Dawa City SACCO Union",
    region: "Dire Dawa",
    city: "Dire Dawa",
    type: "Urban",
    established: 2009,
    members: 21000,
    assetsBirr: 360,
    phone: "+251 25 111 0066",
    email: "ddusacco@dire.gov.et",
    services: ["Savings", "Trade Loans", "Housing", "Youth Credit"],
    description:
      "City-wide SACCO union in Dire Dawa supporting traders, youth groups and housing cooperatives across the administrative council.",
    featured: false,
  },
  {
    id: "s24",
    name: "Tigray Teachers SACCO Union",
    region: "Tigray",
    city: "Mekelle",
    type: "Workplace",
    established: 2002,
    members: 32000,
    assetsBirr: 540,
    phone: "+251 34 440 0780",
    email: "ttcu@edu.et",
    services: ["Salary Loans", "Savings", "Education Loans", "Housing"],
    description:
      "Workplace union serving teachers across Tigray with salary advances, education financing and housing credit.",
    featured: false,
  },
];

export const ethiopiaRegions = [
  "All Regions",
  "Addis Ababa",
  "Oromia",
  "Amhara",
  "Tigray",
  "Sidama",
  "South Ethiopia",
  "South West Ethiopia",
  "Somali",
  "Afar",
  "Benishangul-Gumuz",
  "Gambela",
  "Harari",
  "Dire Dawa",
];

// ---------------------------------------------------------------------------
// SAVINGS PRODUCTS
// ---------------------------------------------------------------------------
export const savingsProducts = [
  {
    name: "Compulsory Savings",
    rate: "7% p.a",
    badge: "Required",
    icon: "Lock",
    color: "from-emerald-500 to-emerald-700",
    features: [
      "Minimum: ETB 2,000 monthly",
      "7% annual saving interest",
      "Required for loan eligibility",
      "Withdrawal on membership exit",
    ],
    description:
      "The mandatory monthly contribution that keeps your membership active and unlocks loan eligibility.",
  },
  {
    name: "Voluntary Savings",
    rate: "7% p.a",
    badge: "Flexible",
    icon: "Wallet",
    color: "from-blue-500 to-blue-700",
    features: [
      "No minimum amount required",
      "7% annual saving interest",
      "Withdraw anytime, no penalty",
      "Save as per your capacity",
    ],
    description:
      "Save any amount, anytime. Full flexibility with no lock-in and instant withdrawal when you need it.",
  },
  {
    name: "Child Savings",
    rate: "10% p.a",
    badge: "Family",
    icon: "Baby",
    color: "from-amber-500 to-orange-600",
    features: [
      "Minimum: ETB 100",
      "For children under 18 years",
      "Parent / guardian managed",
      "Perfect for education & future",
    ],
    description:
      "Give your children a head start with a higher 10% interest rate and parent-managed access.",
  },
  {
    name: "Time Deposit",
    rate: "Up to 27% p.a",
    badge: "Best Value",
    icon: "TrendingUp",
    color: "from-green-600 to-emerald-800",
    features: [
      "Minimum: ETB 500,000",
      "1 year fixed term (12 months)",
      "Tiered rates: 20% → 27%",
      "Higher deposit = higher returns",
    ],
    description:
      "Lock in guaranteed high returns with our premium tiered time deposit product.",
  },
];

export const timeDepositTiers = [
  {
    tier: "Standard",
    rate: "20% p.a",
    range: "ETB 500,000 - 1,000,000",
    maturity: "ETB 1,200,000",
    note: "Guaranteed returns after 12 months",
  },
  {
    tier: "Advanced",
    rate: "25% p.a",
    range: "ETB 1,000,000 - 5,000,000",
    maturity: "ETB 1,250,000",
    note: "Guaranteed returns after 12 months",
  },
  {
    tier: "Elite",
    rate: "27% p.a",
    range: "ETB 5,000,001 and above",
    maturity: "ETB 1,270,000+",
    note: "Highest available rate with dedicated manager",
    best: true,
  },
];

// ---------------------------------------------------------------------------
// LOAN PRODUCTS
// ---------------------------------------------------------------------------
export const loanProducts = [
  {
    name: "Social Loan",
    maxAmount: "1,000,000",
    rate: "15.5%",
    saving: "25%",
    savingMonths: "3 months",
    term: "Up to 36 months",
    icon: "Users",
    category: "Personal",
    features: ["Quick Approval", "No Collateral", "Monthly Repayment"],
    color: "emerald",
  },
  {
    name: "Business Loan",
    maxAmount: "3,000,000",
    rate: "15.5%",
    saving: "25%",
    savingMonths: "4 months",
    term: "Up to 48 months",
    icon: "Briefcase",
    category: "Business",
    features: ["Working Capital", "Expansion", "Monthly Repayment"],
    color: "blue",
  },
  {
    name: "House Loan",
    maxAmount: "16,000,000",
    rate: "16.5%",
    saving: "30%",
    savingMonths: "6 months",
    term: "Up to 120 months",
    icon: "Home",
    category: "Property",
    features: ["Long Term", "Low Monthly", "Premium"],
    color: "emerald",
    premium: true,
  },
  {
    name: "Furniture Loan",
    maxAmount: "500,000",
    rate: "14.5%",
    saving: "25%",
    savingMonths: "3 months",
    term: "Up to 24 months",
    icon: "Sofa",
    category: "Personal",
    features: ["Monthly Repayment", "Quick Approval"],
    color: "amber",
  },
  {
    name: "Electronics Loan",
    maxAmount: "300,000",
    rate: "14.5%",
    saving: "25%",
    savingMonths: "3 months",
    term: "Up to 12 months",
    icon: "Laptop",
    category: "Personal",
    features: ["Monthly Repayment", "Quick Approval"],
    color: "blue",
  },
  {
    name: "Car Loan",
    maxAmount: "10,000,000",
    rate: "14.5 - 17.5%",
    saving: "20-50%",
    savingMonths: "1-6 months",
    term: "Up to 60 months",
    icon: "Car",
    category: "Vehicle",
    features: ["4 Flexible Options", "Monthly Repayment"],
    color: "emerald",
  },
  {
    name: "Machinery Loan",
    maxAmount: "16,000,000",
    rate: "14.5%",
    saving: "50%",
    savingMonths: "3 months",
    term: "Up to 120 months",
    icon: "Truck",
    category: "Business",
    features: ["Equipment Purchase", "Business Growth"],
    color: "blue",
  },
];

// ---------------------------------------------------------------------------
// CORE VALUES
// ---------------------------------------------------------------------------
export const coreValues = [
  {
    name: "Integrity",
    icon: "ShieldCheck",
    description:
      "We operate with transparency, honesty and ethical practices in all our dealings with members and stakeholders.",
  },
  {
    name: "Member-Centric",
    icon: "HeartHandshake",
    description:
      "Members are at the heart of everything we do. Their financial wellbeing is our primary focus and motivation.",
  },
  {
    name: "Innovation",
    icon: "Lightbulb",
    description:
      "We embrace technology and innovative solutions to provide better, faster and more accessible financial services.",
  },
  {
    name: "Excellence",
    icon: "Award",
    description:
      "We strive for excellence in service delivery, operational efficiency and financial performance.",
  },
  {
    name: "Community",
    icon: "Users",
    description:
      "We believe in giving back to our community and supporting local economic development initiatives.",
  },
  {
    name: "Sustainability",
    icon: "Leaf",
    description:
      "We are committed to long-term sustainable growth that benefits current and future generations of members.",
  },
];

// ---------------------------------------------------------------------------
// WHY CHOOSE US
// ---------------------------------------------------------------------------
export const whyChooseUs = [
  {
    icon: "Percent",
    title: "Competitive Rates",
    description:
      "Loan interest starting from 14.5%, savings rates up to 7% p.a and time deposits earning up to 27%.",
  },
  {
    icon: "Crown",
    title: "Member-Owned",
    description:
      "You're not just a customer — you're a co-owner with voting rights in the AGM. Every member has an equal voice.",
  },
  {
    icon: "Headset",
    title: "24/7 Support",
    description:
      "Round-the-clock assistance at our 6671 hotline and online chat support. We're always here when you need us.",
  },
  {
    icon: "Zap",
    title: "Quick Processing",
    description:
      "Fast loan approval and disbursement. Get funds within 48 hours of application completion. Minimal paperwork.",
  },
  {
    icon: "LayoutGrid",
    title: "Flexible Products",
    description:
      "Multiple loan types — Social, Business, House, Furniture, Electronics, Car and Machinery — with flexible terms.",
  },
  {
    icon: "TrendingUp",
    title: "High Returns",
    description:
      "Earn up to 27% on time deposits. Voluntary savings with no minimum and withdrawal options available anytime.",
  },
];

// ---------------------------------------------------------------------------
// JOURNEY / TIMELINE
// ---------------------------------------------------------------------------
export const journey = [
  {
    year: "2026",
    title: "Established",
    description:
      "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ was established in 2026 under Proclamation No. 985/2009 as a member-owned financial cooperative.",
    icon: "Flag",
  },
  {
    year: "2026",
    title: "Addis Ababa Branch",
    description:
      "Opened our first branch in Addis Ababa, serving members with comprehensive savings, loan and investment services.",
    icon: "MapPin",
  },
  {
    year: "2026",
    title: "Leadership Nominated",
    description:
      "The Board of Directors and management team are being nominated to guide the cooperative's growth and governance.",
    icon: "Users",
  },
  {
    year: "Soon",
    title: "Branch Expansion Planned",
    description:
      "Planning to open many more branches across Ethiopia to bring accessible cooperative finance to every region.",
    icon: "Building2",
  },
];

// ---------------------------------------------------------------------------
// BOARD OF DIRECTORS & MANAGEMENT
// ---------------------------------------------------------------------------
export const boardMembers = [
  {
    name: "To Be Nominated",
    role: "Chairperson",
    bio: "The Board of Directors is being nominated and will be announced soon. Members will be informed through the Annual General Meeting.",
    initials: "TBN",
    tbn: true,
  },
  {
    name: "To Be Nominated",
    role: "Vice Chairperson",
    bio: "Board positions are being filled through the cooperative's governance process under Proclamation No. 985/2009.",
    initials: "TBN",
    tbn: true,
  },
  {
    name: "To Be Nominated",
    role: "Chief Executive Officer",
    bio: "The executive leadership team is being nominated. Check back soon for the official announcement.",
    initials: "TBN",
    tbn: true,
  },
];

export const managementTeam = [
  { name: "To Be Nominated", role: "Chief Executive Officer", initials: "TBN", tbn: true },
  { name: "To Be Nominated", role: "Deputy General Manager", initials: "TBN", tbn: true },
  { name: "To Be Nominated", role: "Operations Manager", initials: "TBN", tbn: true },
  { name: "To Be Nominated", role: "Credit & Finance Manager", initials: "TBN", tbn: true },
  { name: "To Be Nominated", role: "Member Relations Manager", initials: "TBN", tbn: true },
  { name: "To Be Nominated", role: "Marketing & Business Development", initials: "TBN", tbn: true },
];

// ---------------------------------------------------------------------------
// NEWS & ANNOUNCEMENTS
// ---------------------------------------------------------------------------
export const announcements = [
  {
    date: "Sep 22, 2026",
    title: "4th Round Internship-to-Hire Training Program",
    excerpt:
      "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ is hiring young graduates for its 4th round paid internship-to-hire program. Application form link now live.",
    tag: "Career",
    icon: "GraduationCap",
  },
  {
    date: "May 15, 2025",
    title: "Inaugural General Meeting 2025",
    excerpt:
      "All members invited to the first AGM at Addis Ababa branch. Financial reports, dividend announcement and board elections on the agenda.",
    tag: "Event",
    icon: "Users",
  },
  {
    date: "Apr 10, 2025",
    title: "Jemo Branch Saturday Service",
    excerpt:
      "Jemo branch now offers Saturday services and loan processing. Extended hours for your convenience.",
    tag: "Update",
    icon: "Calendar",
  },
  {
    date: "Mar 25, 2025",
    title: "New Digital Member Portal",
    excerpt:
      "Member portal launched. Check balances, view transactions and apply for loans online 24/7 from anywhere in Ethiopia.",
    tag: "Product",
    icon: "Globe",
  },
];

export const events = [
  {
    day: "10",
    month: "JUNE 2025",
    dayName: "Tuesday",
    title: "Financial Literacy Workshop",
    time: "2:00 PM - 5:00 PM",
    location: "Addis Ababa Branch",
    type: "Free",
    description:
      "Free workshop on budgeting, saving strategies and investment basics for all members.",
  },
  {
    day: "28",
    month: "JUNE 2025",
    dayName: "Saturday",
    title: "Annual General Assembly",
    time: "9:00 AM - 12:00 PM",
    location: "Addis Ababa Branch",
    type: "Important",
    description:
      "Join us at Addis Ababa Branch. Review the annual report, elect board members and approve dividend distribution.",
  },
];

export const blogPosts = [
  {
    title: "5 Smart Saving Strategies",
    excerpt:
      "Learn how to build your emergency fund and save for major purchases with these proven techniques.",
    readTime: "5 min read",
    icon: "PiggyBank",
    color: "emerald",
  },
  {
    title: "Understanding Loan Interest",
    excerpt:
      "Simple vs compound interest explained. Make informed borrowing decisions and save thousands.",
    readTime: "4 min read",
    icon: "Calculator",
    color: "blue",
  },
  {
    title: "Why Join a SACCO?",
    excerpt:
      "Discover the benefits of cooperative banking vs traditional banks and how SACCOs grow wealth.",
    readTime: "6 min read",
    icon: "Handshake",
    color: "amber",
  },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
export const faqs = [
  {
    question: "How do I become a member?",
    answer:
      "Visit any branch with your National ID (Kebele or Passport) or Renewed Digital ID, 2 passport photos and proof of residence. Pay a registration fee of ETB 3,000 and purchase minimum shares of ETB 5,000. The whole process takes about 30 minutes.",
  },
  {
    question: "What are the loan requirements?",
    answer:
      "You need active membership (minimum 3 months), a sufficient savings balance (20-50% of the loan amount), a regular verifiable income, a National ID and collateral for larger loans. Most loans are approved within 24-48 hours.",
  },
  {
    question: "Where are your branches located?",
    answer:
      "our Addis Ababa branch (Head Office) in Addis Ababa, Ethiopia.",
  },
  {
    question: "How long does loan approval take?",
    answer:
      "Most loans are approved within 24-48 hours. Emergency loans within 24 hours. Larger loans (e.g. House and Machinery) may take 3-5 business days. Priority processing is available for members.",
  },
  {
    question: "What is the interest rate on savings?",
    answer:
      "Compulsory Savings: 7% p.a; Voluntary Savings: 7% p.a; Child Savings: 10% p.a; Time Deposit: up to 27% p.a based on the deposit tier.",
  },
  {
    question: "What are your business hours?",
    answer:
      "Monday - Friday: 8:00 AM - 5:00 PM; Saturday: 8:00 AM - 5:00 PM; Sunday: Closed. 24/7 customer support is available by calling our hotline 6671.",
  },
  {
    question: "What is the minimum share purchase?",
    answer:
      "The minimum share purchase is ETB 5,000 (500 shares at ETB 10 each). Shares make you a co-owner of the SACCO and give you voting rights in the AGM, plus annual dividends of up to 30%.",
  },
  {
    question: "Is my money safe with a SACCO?",
    answer:
      "Yes. ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ is established under Proclamation No. 985/2009 and regulated by cooperative financial authorities. Member deposits are protected by cooperative principles, internal reserves and the loan protection insurance policy.",
  },
];

// ---------------------------------------------------------------------------
// TESTIMONIALS
// ---------------------------------------------------------------------------
export const testimonials = [
  {
    name: "Biruk Ayele",
    role: "Business Owner",
    initials: "BA",
    quote:
      "ዘላቂ helped me start my small business. The loan process was smooth and the rates competitive. Within 48 hours I had the funds in my account!",
  },
  {
    name: "Meron Tadesse",
    role: "Teacher",
    initials: "MT",
    quote:
      "The Child Savings account is perfect for my children's future. Great service and friendly staff. Highly recommended for every Ethiopian family.",
  },
  {
    name: "Dawit Haile",
    role: "Driver",
    initials: "DH",
    quote:
      "I bought my first car with a ዘላቂ vehicle loan. The whole process took only 2 days. Forever grateful to the ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ family!",
  },
];

export const successStories = [
  {
    title: "From Small Shop to Supermarket",
    description:
      "With business loans from ዘላቂ, I expanded my small grocery shop into a thriving supermarket with 15 employees.",
    author: "Biruk Ayele",
    role: "Business Owner",
    icon: "Store",
  },
  {
    title: "Educational Dreams Realized",
    description:
      "The school fees loan helped me pursue my master's degree. Now I'm a department head with increased income.",
    author: "Meron Tadesse",
    role: "Teacher",
    icon: "GraduationCap",
  },
  {
    title: "Homeownership Achieved",
    description:
      "After saving with ዘላቂ, I secured a home construction loan that turned my dream of owning a house into reality.",
    author: "Dawit Haile",
    role: "Driver",
    icon: "Home",
  },
];

// ---------------------------------------------------------------------------
// STRATEGIC PARTNERS
// ---------------------------------------------------------------------------
export const partners = [
  { name: "Ethio Telecom", type: "Telecom Partner", icon: "Phone" },
  { name: "Safari Com", type: "Internet Provider", icon: "Wifi" },
  { name: "Commercial Bank of Ethiopia", type: "Banking Partner", icon: "Building" },
  { name: "Hibret Bank", type: "Banking Partner", icon: "Building" },
  { name: "Abay Bank", type: "Banking Partner", icon: "Building" },
  { name: "Awash Bank", type: "Banking Partner", icon: "Building" },
  { name: "Dashen Bank", type: "Banking Partner", icon: "Building" },
  { name: "Ethiopian Insurance Corp", type: "Insurance Partner", icon: "ShieldCheck" },
];

// ---------------------------------------------------------------------------
// DIVIDEND HISTORY
// ---------------------------------------------------------------------------
export const dividendHistory = [
  { year: "2026", rate: "TBD", payout: "First dividend after FY 2026", growth: "Coming Soon", projected: true },
];

// ---------------------------------------------------------------------------
// BRANCHES
// ---------------------------------------------------------------------------
export const branches = [
  {
    name: "Addis Ababa Branch (Head Office)",
    address: "Addis Ababa, Ethiopia",
    icon: "Building",
  },
];
export const plannedBranches = [
  "Planning to open many more branches across Ethiopia — coming soon to serve members in every region.",
];

// ---------------------------------------------------------------------------
// STATS
// ---------------------------------------------------------------------------
export const stats = [
  { label: "Founded Year", value: 2026, suffix: "", icon: "Flag", comingSoon: false },
  { label: "Branches", value: 1, suffix: "", icon: "Building2", comingSoon: false, note: "Addis Ababa · more coming" },
  { label: "Active Members", value: 0, suffix: "", icon: "Users", comingSoon: true },
  { label: "Total Assets", value: 0, prefix: "", suffix: "", icon: "Landmark", comingSoon: true },
];

// ---------------------------------------------------------------------------
// CONTACT INFO
// ---------------------------------------------------------------------------
export const contactInfo = {
  phone: "+251 6671",
  email: "info@sustainablesacco.com",
  supportEmail: "support@sustainablesacco.com",
  hours: "Mon - Sat: 8:00 AM - 5:00 PM",
  hotline: "6671 (24/7)",
  address: "Addis Ababa, Ethiopia",
};

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------
export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Loans", href: "#loans" },
  { label: "Membership", href: "#membership" },
  { label: "SACCO Directory", href: "#sacco-directory" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];
