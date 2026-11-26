import { db } from "../src/lib/db";
import {
  savingsProducts,
  loanProducts,
  coreValues,
  boardMembers,
  managementTeam,
  branches,
  faqs,
  testimonials,
  successStories,
  partners,
  dividendHistory,
} from "../src/lib/sacco-data";

// Build the full hierarchical menu structure
type MenuChild = { label: string; href?: string; slug?: string; icon?: string; group?: string };
type MenuTop = { label: string; href?: string; children?: MenuChild[] };

const MENU: MenuTop[] = [
  { label: "Home", href: "#home" },
  {
    label: "About Us",
    children: [
      { group: "Our Organization", label: "Overview", slug: "about-overview", icon: "Building2" },
      { group: "Our Organization", label: "Mission & Vision", slug: "about-mission", icon: "Target" },
      { group: "Our Organization", label: "Our History", slug: "about-history", icon: "Flag" },
      { group: "Our Organization", label: "Core Values", slug: "about-values", icon: "ShieldCheck" },
      { group: "Leadership", label: "Management Team", slug: "about-leadership", icon: "Users" },
      { group: "Governance", label: "Policies & Bye-Laws", slug: "about-policies", icon: "FileText" },
      { group: "Governance", label: "Annual Reports", slug: "about-reports", icon: "BarChart3" },
      { label: "Testimonials", slug: "about-testimonials", icon: "Quote" },
      { label: "Partners", slug: "about-partners", icon: "Handshake" },
    ],
  },
  {
    label: "Services",
    children: [
      { group: "Savings Products", label: "Compulsory Savings", slug: "svc-compulsory", icon: "Lock" },
      { group: "Savings Products", label: "Voluntary Savings", slug: "svc-voluntary", icon: "Wallet" },
      { group: "Savings Products", label: "Child Savings", slug: "svc-child", icon: "Baby" },
      { group: "Savings Products", label: "Time Deposit", slug: "svc-time-deposit", icon: "TrendingUp" },
      { group: "Investment", label: "Member Shares", slug: "svc-shares", icon: "Coins" },
      { group: "Investment", label: "Annual Dividends", slug: "svc-dividends", icon: "Award" },
      { group: "Investment", label: "Investment Advisory", slug: "svc-advisory", icon: "Lightbulb" },
      { group: "Digital Banking", label: "Mobile Banking", slug: "svc-mobile", icon: "Smartphone" },
      { group: "Digital Banking", label: "Internet Banking", slug: "svc-internet", icon: "Globe" },
      { label: "Insurance & Loan Protection", slug: "svc-insurance", icon: "ShieldCheck" },
    ],
  },
  {
    label: "Loans",
    children: [
      { label: "Social Loan", slug: "loan-social", icon: "Users" },
      { label: "Business Loan", slug: "loan-business", icon: "Briefcase" },
      { label: "House Loan", slug: "loan-house", icon: "Home" },
      { label: "Furniture Loan", slug: "loan-furniture", icon: "Sofa" },
      { label: "Electronics Loan", slug: "loan-electronics", icon: "Laptop" },
      { label: "Car Loan", slug: "loan-car", icon: "Car" },
      { label: "Machinery Loan", slug: "loan-machinery", icon: "Truck" },
      { label: "Loan Calculator", href: "#loans", icon: "Calculator" },
    ],
  },
  {
    label: "Members",
    children: [
      { label: "Become a Member", href: "#membership", icon: "UserPlus" },
      { label: "Member Benefits", slug: "member-benefits", icon: "Gift" },
      { label: "Requirements", slug: "member-requirements", icon: "FileText" },
      { label: "Online Registration", href: "#membership", icon: "FileCheck" },
      { label: "Member Portal", href: "/?view=login", icon: "Lock" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "News & Updates", href: "#news", icon: "Newspaper" },
      { label: "Events", href: "#news", icon: "Calendar" },
      { label: "Financial Blog", slug: "res-blog", icon: "PenLine" },
      { label: "Downloads", slug: "res-downloads", icon: "Download" },
      { label: "FAQ", slug: "res-faq", icon: "HelpCircle" },
      { label: "Success Stories", slug: "res-success-stories", icon: "Sparkles" },
    ],
  },
  { label: "SACCO Directory", href: "#sacco-directory" },
  {
    label: "Contact",
    children: [
      { label: "Branches", slug: "contact-branches", icon: "MapPin" },
      { label: "Get in Touch", href: "#contact", icon: "Mail" },
      { label: "Careers", slug: "contact-careers", icon: "Briefcase" },
    ],
  },
];

// ---- Page content generators ----
const wrap = (title: string, subtitle: string, body: string, section: string) => ({ slug: "", title, subtitle, content: body, section });

const pages: { slug: string; title: string; subtitle: string; content: string; section: string }[] = [];

function add(slug: string, title: string, subtitle: string, content: string, section: string) {
  pages.push({ slug, title, subtitle, content, section });
}

// ---------- ABOUT pages ----------
add("about-overview", "Who We Are", "Sustainable Savings and Credit Cooperative — your financial growth partner",
  `<p>Sustainable Savings and Credit Cooperative was established in 2024 under Proclamation No. 985/2009, providing accessible, affordable and sustainable financial services to its members. Guided by cooperative principles, we promote financial inclusion and economic growth across Ethiopia.</p>
   <p>Our name "Sustainable" reflects our commitment to building the future of Ethiopian families and businesses together. Today, we serve over 2,000+ members across four branches in Addis Ababa and are expanding our reach across Ethiopia.</p>
   <div class="grid grid-cols-3 gap-4 my-6">
     <div class="bg-emerald-50 p-4 rounded-xl text-center"><div class="text-3xl font-bold text-emerald-600">2024</div><div class="text-sm text-gray-500">Founded</div></div>
     <div class="bg-blue-50 p-4 rounded-xl text-center"><div class="text-3xl font-bold text-blue-600">2,000+</div><div class="text-sm text-gray-500">Members</div></div>
     <div class="bg-amber-50 p-4 rounded-xl text-center"><div class="text-3xl font-bold text-amber-600">4</div><div class="text-sm text-gray-500">Branches</div></div>
   </div>
   <p>We are committed to expanding our reach and impact across Ethiopia — bringing smart, member-owned finance to every region.</p>`, "about");

add("about-mission", "Mission & Vision", "Our purpose and where we're heading",
  `<h2 class="text-xl font-bold text-emerald-700 mb-2">Our Mission</h2>
   <p class="mb-6">To improve the lives of members by delivering inclusive and affordable financial services, leveraging technology, safeguarding members' interests, strengthening community ties, and building strategic partnerships with key stakeholders for sustainable growth.</p>
   <div class="flex gap-2 mb-8 flex-wrap">
     <span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">Inclusive</span>
     <span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">Affordable</span>
     <span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">Tech-Driven</span>
     <span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">Sustainable</span>
   </div>
   <h2 class="text-xl font-bold text-blue-700 mb-2">Our Vision</h2>
   <p>To be a technologically advanced model savings and credit cooperative in Ethiopia, promoting the social and economic well-being of its members and ranking among Africa's leading SACCOs by 2035.</p>
   <div class="mt-6"><div class="flex justify-between text-sm mb-1"><span>2035 Goal Progress</span><span>40%</span></div><div class="h-2 bg-gray-200 rounded-full"><div class="h-full bg-amber-400 rounded-full" style="width:40%"></div></div></div>`, "about");

add("about-history", "Our History", "From humble beginnings to a growing financial family — since 2024",
  `<div class="space-y-6">
    ${[
      { y: "2024", t: "Foundation Year", d: "Sustainable SACCO was founded with 150 visionary members who believed in the power of cooperative finance." },
      { y: "2024", t: "First Branch — Kera", d: "Opened our flagship branch in Kera, Addis Ababa, serving the local community with comprehensive financial services." },
      { y: "2025", t: "Expansion — Jemo", d: "Opened the Jemo branch and launched digital banking services, reaching 100+ members in the first month." },
      { y: "2026", t: "Tulu Dimtu & Megenagna", d: "Opened two more branches and crossed 2,000 active members with assets surpassing ETB 900 million." },
    ].map((j) => `<div class="flex gap-4 border-l-4 border-emerald-500 pl-4"><div><div class="text-sm font-bold text-emerald-600">${j.y}</div><div class="font-bold text-gray-800">${j.t}</div><div class="text-gray-600 text-sm mt-1">${j.d}</div></div></div>`).join("")}
   </div>
   <div class="grid grid-cols-3 gap-4 mt-8">
     <div class="text-center bg-gray-50 rounded-xl p-4"><div class="text-2xl font-bold text-emerald-600">150</div><div class="text-xs text-gray-500">Founding Members</div></div>
     <div class="text-center bg-gray-50 rounded-xl p-4"><div class="text-2xl font-bold text-emerald-600">4</div><div class="text-xs text-gray-500">Branches</div></div>
     <div class="text-center bg-gray-50 rounded-xl p-4"><div class="text-2xl font-bold text-emerald-600">2,000+</div><div class="text-xs text-gray-500">Active Members</div></div>
   </div>`, "about");

add("about-values", "Core Values", "The principles that guide every decision at Sustainable SACCO",
  `<div class="grid sm:grid-cols-2 gap-4">
    ${coreValues.map((v) => `<div class="border rounded-xl p-5"><h3 class="font-bold text-lg text-emerald-700 mb-1">${v.name}</h3><p class="text-gray-600 text-sm">${v.description}</p></div>`).join("")}
   </div>`, "about");

add("about-leadership", "Management Team", "Dedicated leaders committed to your financial success",
  `<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
    ${boardMembers.map((m) => `<div class="border rounded-xl p-5 text-center"><div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-2xl mb-3">${m.initials}</div><h3 class="font-bold">${m.name}</h3><div class="text-sm text-emerald-600 font-semibold">${m.role}</div><p class="text-xs text-gray-500 mt-2">${m.bio}</p></div>`).join("")}
   </div>
   <h2 class="text-xl font-bold mb-4 mt-8">Management Team</h2>
   <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
    ${managementTeam.map((m) => `<div class="bg-gray-50 rounded-xl p-4 text-center"><div class="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold mb-2">${m.initials}</div><div class="font-bold text-sm">${m.name}</div><div class="text-xs text-blue-600 font-semibold mt-1">${m.role}</div></div>`).join("")}
   </div>`, "about");

add("about-policies", "Policies & Bye-Laws", "Governance framework under Proclamation No. 985/2009",
  `<p>Sustainable SACCO operates under the legal framework of Proclamation No. 985/2009 and is regulated by cooperative financial authorities. Our governance policies ensure transparency, accountability and member protection.</p>
   <div class="space-y-3 mt-6">
    ${["Membership Policy", "Savings & Withdrawal Policy", "Loan Policy & Eligibility", "Dividend Distribution Policy", "Loan Protection Insurance Policy", "Code of Conduct & Ethics", "Anti-Money Laundering Policy", "Data Protection & Privacy Policy"].map((p) => `<div class="flex items-center gap-3 border rounded-lg p-3"><span class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">📄</span><div class="flex-1"><div class="font-semibold">${p}</div></div><span class="text-xs text-blue-600 font-semibold">Download PDF</span></div>`).join("")}
   </div>`, "about");

add("about-reports", "Annual Reports", "Financial statements and performance — transparency you can trust",
  `<p>We publish annual reports with full financial statements, performance metrics and impact data. Members can review our cooperative's health and progress at every Annual General Meeting.</p>
   <div class="space-y-3 mt-6">
    ${dividendHistory.map((d) => `<div class="flex items-center justify-between border rounded-lg p-4"><div><div class="font-bold">${d.year} Annual Report</div><div class="text-sm text-gray-500">Dividend rate: ${d.rate} · Total payout: ${d.payout}</div></div><span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">${d.growth}</span></div>`).join("")}
   </div>`, "about");

add("about-testimonials", "Member Stories", "What our members say about Sustainable SACCO",
  `<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    ${testimonials.map((t) => `<div class="border rounded-xl p-6"><div class="text-4xl text-emerald-300 mb-2">"</div><p class="text-gray-700 italic mb-4">${t.quote}</p><div class="flex items-center gap-3 pt-4 border-t"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-sm">${t.initials}</div><div><div class="font-bold text-sm">${t.name}</div><div class="text-xs text-gray-500">${t.role}</div></div></div></div>`).join("")}
   </div>`, "about");

add("about-partners", "Strategic Partners", "Collaborating with industry leaders to serve you better",
  `<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    ${partners.map((p) => `<div class="border rounded-xl p-5 text-center"><div class="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold mb-3">${p.name.charAt(0)}</div><div class="font-bold text-sm">${p.name}</div><div class="text-xs text-gray-500 mt-1">${p.type}</div></div>`).join("")}
   </div>`, "about");

// ---------- SERVICES pages ----------
const savingsSlugs: Record<string, string> = {
  "Compulsory Savings": "svc-compulsory",
  "Voluntary Savings": "svc-voluntary",
  "Child Savings": "svc-child",
  "Time Deposit": "svc-time-deposit",
};
savingsProducts.forEach((p) => {
  const slug = savingsSlugs[p.name] || `svc-${p.name.toLowerCase().replace(/\s+/g, "-")}`;
  add(slug, p.name, `${p.rate} · ${p.badge}`,
    `<div class="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 rounded-2xl p-6 mb-6">
       <div class="text-4xl font-extrabold text-emerald-600">${p.rate}</div><div class="text-gray-500">Interest rate per annum</div>
     </div>
     <p class="text-gray-700 mb-4">${p.description}</p>
     <h3 class="font-bold text-lg mt-6 mb-3">Key Features</h3>
     <ul class="space-y-2">
      ${p.features.map((f) => `<li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✓</span><span>${f}</span></li>`).join("")}
     </ul>
     <div class="mt-8 p-4 bg-blue-50 rounded-xl"><div class="font-semibold text-blue-700">Ready to start?</div><div class="text-sm text-gray-600 mt-1">Visit any branch or contact us at 6671 to open your ${p.name.toLowerCase()}.</div></div>`, "services");
});

add("svc-shares", "Member Shares", "Become a co-owner of Sustainable SACCO — ETB 1,000 minimum",
  `<p>Purchase shares and become a part-owner of Sustainable SACCO. Earn annual dividends based on cooperative performance with voting rights in the AGM.</p>
   <ul class="space-y-2 mt-4">${["Voting rights in AGM", "Annual dividend earnings", "Ownership stake in the cooperative", "Minimum ETB 1,000 (100 shares × ETB 10)"].map((f) => `<li class="flex items-start gap-2"><span class="text-emerald-500">✓</span><span>${f}</span></li>`).join("")}</ul>`, "services");

add("svc-dividends", "Annual Dividends", "Up to 30% p.a — celebrating member wealth growth",
  `<p>Our members enjoy attractive dividend returns on share capital and savings with consistent annual payouts.</p>
   <div class="grid grid-cols-2 gap-4 mt-4"><div class="bg-gray-50 rounded-xl p-4"><div class="text-xs text-gray-500 uppercase">This Year's Target</div><div class="text-2xl font-bold text-emerald-600">30%</div></div><div class="bg-gray-50 rounded-xl p-4"><div class="text-xs text-gray-500 uppercase">Historical Return</div><div class="text-2xl font-bold text-blue-600">25–30%</div></div></div>`, "services");

add("svc-advisory", "Investment Advisory", "Completely FREE for members — expert wealth guidance",
  `<p>Get professional advice on investment opportunities, portfolio diversification and wealth management — at no cost to members.</p>
   <ul class="space-y-2 mt-4">${["Portfolio diversification", "Risk assessment", "Wealth management strategies", "Certified financial advisors"].map((f) => `<li class="flex items-start gap-2"><span class="text-emerald-500">✓</span><span>${f}</span></li>`).join("")}</ul>`, "services");

add("svc-mobile", "Mobile Banking", "Bank on the go — your finances at your fingertips",
  `<p>Check balances, transfer funds, apply for loans and pay bills 24/7 from anywhere in Ethiopia.</p>
   <ul class="space-y-2 mt-4">${["Receive instant notifications", "Check balances anytime", "Transfer funds between accounts", "Apply for loans online securely", "Pay bills and utilities"].map((f) => `<li class="flex items-start gap-2"><span class="text-emerald-500">✓</span><span>${f}</span></li>`).join("")}</ul>
   <div class="mt-6 text-sm text-gray-500 italic">App coming soon on Google Play and App Store.</div>`, "services");

add("svc-internet", "Internet Banking", "Manage your finances from your computer — full control",
  `<p>Secure online portal with full account management, downloadable statements, online loan applications, payments and secure messaging with support.</p>
   <ul class="space-y-2 mt-4">${["256-bit SSL Encryption", "Two-Factor Authentication", "24/7 Availability", "Download statements (PDF/Excel)"].map((f) => `<li class="flex items-start gap-2"><span class="text-emerald-500">✓</span><span>${f}</span></li>`).join("")}</ul>`, "services");

add("svc-insurance", "Insurance & Loan Protection", "Free loan protection insurance for all members",
  `<p>Every member's loans and savings are protected by our loan protection insurance policy — providing peace of mind for you and your family.</p>
   <ul class="space-y-2 mt-4">${["Free loan protection on all active loans", "Savings protection up to ETB 100,000", "Death & disability cover", "Family support benefit"].map((f) => `<li class="flex items-start gap-2"><span class="text-emerald-500">✓</span><span>${f}</span></li>`).join("")}</ul>`, "services");

// ---------- LOANS pages (all loan-related) ----------
const loanSlugs: Record<string, string> = {
  "Social Loan": "loan-social",
  "Business Loan": "loan-business",
  "House Loan": "loan-house",
  "Furniture Loan": "loan-furniture",
  "Electronics Loan": "loan-electronics",
  "Car Loan": "loan-car",
  "Machinery Loan": "loan-machinery",
};
loanProducts.forEach((l) => {
  const slug = loanSlugs[l.name] || `loan-${l.name.toLowerCase().replace(/\s+/g, "-")}`;
  add(slug, l.name, `Up to ETB ${l.maxAmount} · ${l.rate} interest`,
    `<div class="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 mb-6">
       <div class="text-3xl font-extrabold text-emerald-600">Up to ETB ${l.maxAmount}</div><div class="text-gray-500">Maximum loan amount</div>
     </div>
     <div class="grid grid-cols-3 gap-4 my-6">
       <div class="bg-gray-50 rounded-xl p-4 text-center"><div class="text-xs text-gray-500 uppercase">Interest</div><div class="font-bold text-lg text-blue-600">${l.rate}</div></div>
       <div class="bg-gray-50 rounded-xl p-4 text-center"><div class="text-xs text-gray-500 uppercase">Saving</div><div class="font-bold text-lg text-emerald-600">${l.saving}</div></div>
       <div class="bg-gray-50 rounded-xl p-4 text-center"><div class="text-xs text-gray-500 uppercase">Repayment</div><div class="font-bold text-lg text-gray-700">${l.term}</div></div>
     </div>
     <h3 class="font-bold text-lg mb-2">Requirements</h3>
     <ul class="space-y-2"><li class="flex items-start gap-2"><span class="text-emerald-500">✓</span><span>Saving period: ${l.savingMonths}</span></li><li class="flex items-start gap-2"><span class="text-emerald-500">✓</span><span>Saving balance: ${l.saving} of loan amount</span></li></ul>
     <h3 class="font-bold text-lg mt-6 mb-2">Features</h3>
     <ul class="space-y-2">${l.features.map((f) => `<li class="flex items-start gap-2"><span class="text-emerald-500">✓</span><span>${f}</span></li>`).join("")}</ul>
     <div class="mt-8"><a href="/#loans" class="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-full font-semibold">Apply for this loan →</a></div>`, "loans");
});

// ---------- MEMBERS pages ----------
add("member-benefits", "Member Benefits", "Exclusive privileges for Sustainable SACCO members",
  `<div class="grid sm:grid-cols-2 gap-4">
    ${["Annual Dividends (up to 30%)", "Free Loan Protection Insurance", "Financial Education Workshops", "Voting Rights in AGM", "Discounted Service Charges", "Priority Loan Processing (24-48 hrs)", "Free Investment Advisory", "Mobile & Internet Banking Access"].map((b) => `<div class="flex items-center gap-3 border rounded-xl p-4"><span class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">🎁</span><span class="font-semibold">${b}</span></div>`).join("")}
   </div>`, "members");

add("member-requirements", "Membership Requirements", "What you need to join Sustainable SACCO",
  `<h2 class="text-xl font-bold mb-3">Documents Required</h2>
   <ul class="space-y-2 mb-6">${["Valid National ID (Kebele or Passport)", "Renewed Digital ID", "2 passport size photos", "Proof of residence (utility bill or letter)"].map((r) => `<li class="flex items-center gap-2"><span>📋</span><span>${r}</span></li>`).join("")}</ul>
   <h2 class="text-xl font-bold mb-3">Financial Requirements</h2>
   <div class="grid grid-cols-2 gap-3">${[{l:"Registration fee",v:"ETB 3,000"},{l:"Minimum shares",v:"ETB 5,000"},{l:"Initial compulsory saving",v:"ETB 2,000"},{l:"Minimum age",v:"18 years"}].map((f) => `<div class="bg-gray-50 rounded-xl p-4"><div class="text-xs text-gray-500 uppercase">${f.l}</div><div class="font-bold text-emerald-600">${f.v}</div></div>`).join("")}</div>
   <div class="mt-6 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-xl p-5 flex justify-between items-center"><div><div class="text-xs opacity-80 uppercase">Total Upfront</div><div class="text-2xl font-bold">ETB 10,000</div></div><a href="/#membership" class="px-5 py-2 bg-amber-400 text-blue-900 rounded-full font-bold">Register Now</a></div>`, "members");

// ---------- RESOURCES pages ----------
add("res-blog", "Financial Blog", "Expert financial tips and advice",
  `<div class="space-y-4">${[["5 Smart Saving Strategies","Learn how to build your emergency fund and save for major purchases with these proven techniques."],["Understanding Loan Interest","Simple vs compound interest explained. Make informed borrowing decisions."],["Why Join a SACCO?","Discover the benefits of cooperative banking vs traditional banks."]].map((b) => `<div class="border rounded-xl p-5 hover:shadow-md transition"><h3 class="font-bold text-lg text-emerald-700">${b[0]}</h3><p class="text-gray-600 text-sm mt-1">${b[1]}</p><div class="text-xs text-blue-600 font-semibold mt-2">Read more →</div></div>`).join("")}</div>`, "resources");

add("res-downloads", "Downloads", "Resource center — forms and documents",
  `<div class="grid sm:grid-cols-2 gap-4">${["Membership Form PDF","Loan Application Form PDF","SACCO Bylaws PDF","Annual Report 2024 PDF","Member Handbook PDF","Loan Policy Guide PDF"].map((d) => `<div class="border rounded-xl p-4 flex items-center gap-3"><span class="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">📄</span><div class="flex-1"><div class="font-semibold">${d}</div></div><span class="text-xs text-blue-600 font-semibold">Download</span></div>`).join("")}</div>`, "resources");

add("res-faq", "Frequently Asked Questions", "Answers to common questions about our services",
  `<div class="space-y-3">${faqs.map((f) => `<details class="border rounded-xl p-4 group"><summary class="font-semibold cursor-pointer">${f.question}</summary><p class="text-gray-600 text-sm mt-3">${f.answer}</p></details>`).join("")}</div>`, "resources");

add("res-success-stories", "Success Stories", "Real stories, real impact — inspiring member achievements",
  `<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">${successStories.map((s) => `<div class="border rounded-xl p-6"><h3 class="font-bold text-lg text-emerald-700 mb-2">${s.title}</h3><p class="text-gray-600 text-sm mb-4">${s.description}</p><div class="flex items-center gap-2 pt-3 border-t"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">${s.author.split(" ").map((w) => w[0]).join("")}</div><div class="text-xs"><div class="font-semibold">${s.author}</div><div class="text-gray-500">${s.role}</div></div></div></div>`).join("")}</div>`, "resources");

// ---------- CONTACT pages ----------
add("contact-branches", "Our Branches", "Visit us across Addis Ababa",
  `<div class="grid sm:grid-cols-2 gap-4">${branches.map((b) => `<div class="border rounded-xl p-5"><div class="font-bold text-lg text-emerald-700 mb-1">${b.name}</div><div class="text-gray-600 text-sm">${b.address}</div></div>`).join("")}</div>`, "contact");

add("contact-careers", "Careers", "Join our team — current openings",
  `<div class="space-y-3">${[["Loan Officer","Full-time · Kera Branch","Experience in credit analysis required"],["Customer Service Representative","Full-time · Jemo Branch","1+ year banking experience preferred"]].map((c) => `<div class="border rounded-xl p-5 flex justify-between items-center"><div><div class="font-bold">${c[0]}</div><div class="text-sm text-gray-500">${c[1]}</div><div class="text-xs text-gray-500 mt-1">${c[2]}</div></div><span class="text-blue-600 font-semibold text-sm">Apply →</span></div>`).join("")}</div>
   <p class="mt-6 text-gray-600">Send your CV to <a href="mailto:careers@sustainablesacco.com" class="text-emerald-600 font-semibold">careers@sustainablesacco.com</a></p>`, "contact");

// ---- seed runner ----
async function main() {
  console.log("🌱 Re-seeding menu hierarchy + pages...");

  // clear existing nav + pages
  await db.navItem.deleteMany();
  await db.page.deleteMany();
  console.log("  ✓ cleared old nav + pages");

  // create top-level + children
  let order = 0;
  for (const top of MENU) {
    const parent = await db.navItem.create({
      data: {
        label: top.label,
        href: top.href || "#",
        order: order++,
        visible: true,
      },
    });
    if (top.children) {
      let childOrder = 0;
      for (const child of top.children) {
        await db.navItem.create({
          data: {
            label: child.label,
            href: child.href || (child.slug ? `/?page=${child.slug}` : "#"),
            slug: child.slug,
            parentId: parent.id,
            group: child.group,
            icon: child.icon,
            order: childOrder++,
            visible: true,
          },
        });
      }
    }
  }
  console.log(`  ✓ ${MENU.length} top-level menu items with children`);

  // create pages
  for (const p of pages) {
    await db.page.create({
      data: {
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        content: p.content,
        section: p.section,
        published: true,
      },
    });
  }
  console.log(`  ✓ ${pages.length} content pages`);

  console.log("✅ Re-seed complete");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await db.$disconnect(); });
