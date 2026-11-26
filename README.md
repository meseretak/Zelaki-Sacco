<div align="center">

<img src="public/logo-official.png" alt="Zelaki Sacco" width="100" />

# Zelaki Sacco

**A full-stack digital platform for Ethiopian SACCO management**

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma_6-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io)
[![Tailwind](https://img.shields.io/badge/Tailwind_4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun_1.1-fbf0df?style=flat-square&logo=bun)](https://bun.sh)

</div>

---

## About

Zelaki Sacco is a production-ready web platform for SACCO (Savings and Credit Cooperative Organization) institutions in Ethiopia. It ships three layers in one Next.js codebase:

- **Public website** — CMS-driven homepage, news, events, careers, SACCO directory, membership and loan application forms
- **Admin panel** — full back-office: members, loans, applications, jobs, messages, content, site settings
- **Member portal** — self-service dashboard: savings balances, transaction history, active loans

No third-party CMS. No separate backend server. One codebase, one deploy.

---

## Scope

| Area | Coverage |
|------|----------|
| Membership | Online application → admin review → approve / reject |
| Loans | Public application form → admin pipeline |
| Members | Account management, CSV import, transaction and loan ledger |
| Jobs | Post openings, receive CV applications, track status |
| Content | Pages, navigation, images, news, events — all editable from admin |
| Directory | Searchable listing of cooperative SACCOs |
| Contact | Inquiry forms → admin inbox |

---

## Tech Stack

| | |
|-|-|
| Framework | Next.js 16 (App Router, standalone output) |
| Language | TypeScript 5 |
| Runtime | Bun 1.1 |
| Database | SQLite via Prisma 6 |
| Auth | NextAuth.js 4 |
| Styling | Tailwind CSS 4 + Radix UI |
| State | Zustand 5 + TanStack Query 5 |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion 12 |
| CI/CD | GitLab CI/CD → cPanel (SSH + Passenger) |

---

## Database

16 models across three domains:

```
Members
  Member ──< MemberTransaction
  Member ──< MemberLoan

Applications
  MembershipApplication
  LoanApplication ──> Member
  Job ──< JobApplication  (CV upload included)

Content
  Page · NavItem · NewsItem · EventItem
  ContentImage · Testimonial · Sacco
  SiteSetting · ContactMessage · NewsletterSubscriber
```

SQLite — no external database server required. Switch to MySQL/PostgreSQL by changing one line in `prisma/schema.prisma`.

---

## Getting Started

```bash
# 1. Install
bun install

# 2. Configure
cp .env.example .env   # fill in DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET

# 3. Database
bun run db:push
node prisma/seed.ts && node prisma/seed-menu.ts

# 4. Run
bun run dev
```

| URL | |
|-----|--|
| `localhost:3000` | Public site |
| `localhost:3000/?view=admin` | Admin panel (default passcode: `admin123`) |
| `localhost:3000/?view=login` | Member login |

---

## Deployment

Automated via GitLab CI/CD → cPanel on every push to `main`.

```
lint → build (standalone) → rsync to cPanel → prisma migrate → restart
```

See [`DEPLOY-GITLAB.md`](DEPLOY-GITLAB.md) for the complete setup guide.

---

## Developer

**Meseret Akalu**
Full-stack Developer · 🇪🇹 Ethiopia

*Built for Ethiopian cooperative institutions — Next.js · TypeScript · Prisma · Tailwind*
