import { db } from "../src/lib/db";
import {
  navItems,
  announcements,
  events,
  ethiopianSaccos,
  testimonials,
} from "../src/lib/sacco-data";
import { createHash } from "crypto";

function hashPassword(p: string) {
  return createHash("sha256").update(`sustainable-salt::${p}`).digest("hex");
}

async function main() {
  console.log("🌱 Seeding Sustainable SACCO database...");

  // 1. Site settings
  const settings: { key: string; value: string; group: string }[] = [
    { key: "siteName", value: "Sustainable SACCO", group: "branding" },
    { key: "siteShortName", value: "Sustainable", group: "branding" },
    { key: "tagline", value: "Savings & Credit Cooperative", group: "branding" },
    { key: "heroBadge", value: "24/7 Digital Banking", group: "hero" },
    { key: "hotline", value: "6671", group: "contact" },
    { key: "phone", value: "+251 6671", group: "contact" },
    { key: "email", value: "info@sustainablesacco.com", group: "contact" },
    { key: "supportEmail", value: "support@sustainablesacco.com", group: "contact" },
    { key: "address", value: "Kera, Famris Building 3rd Floor, Addis Ababa, Ethiopia", group: "contact" },
    { key: "hours", value: "Mon - Sat: 8:00 AM - 5:00 PM", group: "contact" },
    { key: "proclamation", value: "Established 2024 under Proclamation No. 985/2009", group: "general" },
    { key: "foundedYear", value: "2024", group: "general" },
    { key: "branchCount", value: "4", group: "general" },
    { key: "memberCount", value: "2,000+", group: "general" },
    { key: "adminPasscode", value: "admin123", group: "admin" },
  ];
  for (const s of settings) {
    await db.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }
  console.log(`  ✓ ${settings.length} site settings`);

  // 2. Nav items
  const existingNav = await db.navItem.count();
  if (existingNav === 0) {
    await db.navItem.createMany({
      data: navItems.map((n, i) => ({
        label: n.label,
        href: n.href,
        order: i,
        visible: true,
      })),
    });
    console.log(`  ✓ ${navItems.length} nav items`);
  }

  // 3. News
  const existingNews = await db.newsItem.count();
  if (existingNews === 0) {
    await db.newsItem.createMany({
      data: announcements.map((a) => ({
        title: a.title,
        date: a.date,
        excerpt: a.excerpt,
        tag: a.tag,
        icon: a.icon,
        published: true,
      })),
    });
    console.log(`  ✓ ${announcements.length} news items`);
  }

  // 4. Events
  const existingEvents = await db.eventItem.count();
  if (existingEvents === 0) {
    await db.eventItem.createMany({
      data: events.map((e) => ({ ...e })),
    });
    console.log(`  ✓ ${events.length} events`);
  }

  // 5. SACCOs
  const existingSaccos = await db.sacco.count();
  if (existingSaccos === 0) {
    await db.sacco.createMany({
      data: ethiopianSaccos.map((s) => ({
        name: s.name,
        region: s.region,
        city: s.city,
        type: s.type,
        established: s.established,
        members: s.members,
        assetsBirr: s.assetsBirr,
        phone: s.phone,
        email: s.email,
        services: s.services.join(", "),
        description: s.description,
        featured: s.featured,
      })),
    });
    console.log(`  ✓ ${ethiopianSaccos.length} SACCOs`);
  }

  // 6. Testimonials
  const existingTest = await db.testimonial.count();
  if (existingTest === 0) {
    await db.testimonial.createMany({
      data: testimonials.map((t) => ({
        name: t.name,
        role: t.role,
        quote: t.quote,
        initials: t.initials,
        published: true,
      })),
    });
    console.log(`  ✓ ${testimonials.length} testimonials`);
  }

  // 7. Demo member
  const existingMember = await db.member.count();
  if (existingMember === 0) {
    const member = await db.member.create({
      data: {
        memberNumber: "HDS-0001",
        fullName: "Biniyam Tesfaye",
        email: "member@sustainable.com",
        passwordHash: hashPassword("demo123"),
        phone: "+251 911 234 567",
        city: "Addis Ababa",
        branch: "Kera Branch (Head Office)",
        occupation: "Software Engineer",
        compulsorySavings: 28500,
        voluntarySavings: 64200,
        childSavings: 12400,
        timeDeposit: 0,
        shareCount: 750,
        status: "active",
        joinedAt: new Date("2024-06-15"),
      },
    });

    // transactions
    const txns = [
      { type: "salary", amount: 25000, desc: "Salary Deposit", days: 0 },
      { type: "deposit", amount: 5000, desc: "Voluntary savings deposit", days: 2 },
      { type: "withdrawal", amount: -2500, desc: "Bill Payment", days: 1 },
      { type: "interest", amount: 320, desc: "Monthly savings interest (7%)", days: 5 },
      { type: "dividend", amount: 4800, desc: "Annual dividend payout (30% p.a)", days: 12 },
      { type: "loan_payment", amount: -26580, desc: "Business loan repayment", days: 8 },
      { type: "deposit", amount: 10000, desc: "Compulsory saving monthly", days: 15 },
    ];
    let bal = 0;
    for (const t of txns) {
      bal += t.amount;
      await db.memberTransaction.create({
        data: {
          memberId: member.id,
          type: t.type,
          amount: t.amount,
          balance: bal,
          description: t.desc,
          date: new Date(Date.now() - t.days * 86400000),
        },
      });
    }
    console.log(`  ✓ demo member (member@sustainable.com / demo123) + ${txns.length} transactions`);

    // active loan
    await db.memberLoan.create({
      data: {
        memberId: member.id,
        loanType: "Business Loan",
        principal: 1500000,
        remaining: 950000,
        rate: 15.5,
        termMonths: 48,
        monthlyPayment: 41850,
        paidMonths: 14,
        status: "active",
        startDate: new Date("2025-02-10"),
      },
    });
    console.log("  ✓ demo member active loan");
  }

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
