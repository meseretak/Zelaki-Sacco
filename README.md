<div align="center">

<img src="public/logo-official.png" alt="Zelaki Sacco Logo" width="120" />

<br/>

# 🏦 Zelaki Sacco

### *Empowering Communities Through Financial Cooperation*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.1-fbf0df?style=for-the-badge&logo=bun)](https://bun.sh/)

<br/>

> **A full-stack digital platform for SACCO (Savings and Credit Cooperative Organization) management** —
> built to serve Ethiopian cooperative institutions with modern web technology.

<br/>

---

</div>

<br/>

## ✨ What is Zelaki Sacco?

Zelaki Sacco is a **production-grade web platform** designed for Ethiopian SACCO institutions. It combines a public-facing marketing website with a fully featured admin panel and a member self-service portal — all in a single Next.js application.

No third-party CMS. No separate backend. Just one clean codebase.

<br/>

## 🗂️ Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Admin Panel](#-admin-panel)
- [Member Portal](#-member-portal)
- [Deployment](#-deployment)
- [Developer](#-developer)

<br/>

---

## 🚀 Features

<table>
<tr>
<td width="50%" valign="top">

### 🌐 Public Website
- **Dynamic homepage** with hero slider, stats, services
- **Fully CMS-driven** — every section editable from admin
- **News & Events** management
- **SACCO Directory** — searchable cooperative listings
- **Careers page** — post jobs, receive applications with CV upload
- **Contact forms** with admin inbox
- **Membership application** workflow
- **Newsletter** subscription
- **i18n ready** (next-intl)
- **Dark / light theme** (next-themes)

</td>
<td width="50%" valign="top">

### 🔐 Admin Panel
- **Dashboard** overview with key metrics
- **Content management** — pages, navigation, images, testimonials
- **Member management** — view, search, import via CSV
- **Loan applications** — review and status tracking
- **Membership applications** — approve / reject workflow
- **Job postings** — create, close, manage listings
- **Job applications** — review CVs, change status
- **Messages inbox** — all contact form submissions
- **News & Events** CRUD
- **Site settings** — branding, contact info, hero content

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 👤 Member Portal
- **Secure login** with NextAuth
- **Account dashboard** — savings balances, share count
- **Transaction history** — deposits, withdrawals, loan payments
- **Loan overview** — active loans, remaining balance, monthly payment
- **Profile management**

</td>
<td width="50%" valign="top">

### ⚙️ Technical
- **Standalone Next.js output** — cPanel-deployable
- **SQLite** via Prisma — zero external DB dependency
- **File uploads** — CVs stored in `public/uploads/`
- **REST API routes** under `/api/admin/` and `/api/`
- **Prisma migrations** — schema versioned and reproducible
- **GitLab CI/CD** — automated lint → build → deploy pipeline

</td>
</tr>
</table>

<br/>

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | `^16.1.1` |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5` |
| **Runtime / Package Manager** | [Bun](https://bun.sh/) | `^1.1` |
| **Database ORM** | [Prisma](https://www.prisma.io/) | `^6.11.1` |
| **Database Engine** | SQLite (via Prisma) | — |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) | `^4.24.11` |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^4` |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) + shadcn pattern | — |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) | `^5` |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) | `^5` |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | — |
| **Charts** | [Recharts](https://recharts.org/) | `^2` |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | `^12` |
| **Internationalisation** | [next-intl](https://next-intl-docs.vercel.app/) | `^4.3.4` |
| **Image Processing** | [sharp](https://sharp.pixelplumbing.com/) | `^0.34.3` |
| **Rich Text Editor** | [@mdxeditor/editor](https://mdxeditor.dev/) | `^3` |
| **Drag & Drop** | [@dnd-kit](https://dndkit.com/) | — |
| **CI/CD** | GitLab CI/CD | — |
| **Hosting** | cPanel (Node.js App via Passenger) | — |

<br/>

---

## 📁 Project Structure

```
zelaki-sacco/
│
├── src/
│   └── app/
│       ├── page.tsx              # Main single-page app entry
│       ├── layout.tsx            # Root layout (fonts, providers)
│       ├── globals.css           # Global styles
│       └── api/                  # REST API routes
│           ├── admin/
│           │   ├── login/        # Admin authentication
│           │   ├── members/      # Member CRUD + CSV import
│           │   │   ├── loan/     # Loan management
│           │   │   └── transaction/
│           │   ├── jobs/         # Job postings
│           │   │   └── applications/ # Job applications admin
│           │   ├── applications/ # Membership applications
│           │   ├── messages/     # Contact messages inbox
│           │   ├── news/         # News CRUD
│           │   ├── events/       # Events CRUD
│           │   ├── pages/        # CMS pages
│           │   ├── menu/         # Navigation management
│           │   ├── images/       # Image uploads
│           │   └── saccos/       # SACCO directory
│           └── [public routes]   # Contact, newsletter, jobs, membership
│
├── prisma/
│   ├── schema.prisma             # Full database schema
│   ├── seed.ts                   # Initial site data seed
│   └── seed-menu.ts              # Navigation seed
│
├── public/
│   ├── logo-official.png
│   ├── slider/                   # Homepage slider images
│   └── uploads/cvs/              # Uploaded CV files
│
├── .gitlab-ci.yml                # CI/CD pipeline
├── .env.example                  # Environment variable reference
├── next.config.ts                # Next.js config (standalone output)
├── DEPLOY-GITLAB.md              # Deployment guide
└── package.json
```

<br/>

---

## 🗄️ Database Schema

The app uses **SQLite** with **Prisma ORM**. All tables are version-controlled via Prisma migrations.

```
┌─────────────────────┐    ┌──────────────────────┐    ┌────────────────────┐
│     Member          │    │   MemberTransaction   │    │    MemberLoan      │
│─────────────────────│    │──────────────────────│    │────────────────────│
│ memberNumber (uniq) │───▶│ memberId             │    │ memberId           │
│ fullName            │    │ type                 │◀───│ loanType           │
│ email               │    │ amount               │    │ principal          │
│ compulsorySavings   │    │ balance              │    │ remaining          │
│ voluntarySavings    │    │ date                 │    │ status             │
│ shareCount          │    └──────────────────────┘    └────────────────────┘
│ status              │
└─────────────────────┘

┌──────────────────────────┐    ┌────────────────────┐
│  MembershipApplication   │    │   LoanApplication  │
│──────────────────────────│    │────────────────────│
│ fullName, email, phone   │    │ fullName, email     │
│ idNumber, branch         │    │ loanType, amount    │
│ shareAmount              │    │ termMonths          │
│ status (pending→approved)│    │ status              │
└──────────────────────────┘    └────────────────────┘

┌─────────────┐    ┌──────────────────────┐
│    Job      │    │   JobApplication     │
│─────────────│    │──────────────────────│
│ title       │───▶│ jobId                │
│ department  │    │ fullName, email       │
│ type        │    │ education, experience │
│ closingDate │    │ coverLetter           │
│ status      │    │ cvUrl (uploaded file) │
└─────────────┘    │ status (new→offered)  │
                   └──────────────────────┘

┌────────────────┐  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐
│ ContactMessage │  │  NewsItem    │  │  EventItem    │  │    Sacco     │
│────────────────│  │──────────────│  │───────────────│  │──────────────│
│ name, email    │  │ title, date  │  │ title, time   │  │ name, region │
│ subject        │  │ excerpt, tag │  │ location      │  │ type, members│
│ category       │  │ published    │  │ type          │  │ services     │
│ status         │  └──────────────┘  └───────────────┘  └──────────────┘
└────────────────┘

┌──────────────┐  ┌─────────────────┐  ┌──────────────┐  ┌──────────────┐
│  SiteSetting │  │  ContentImage   │  │  Testimonial │  │    Page      │
│──────────────│  │─────────────────│  │──────────────│  │──────────────│
│ key (PK)     │  │ section         │  │ name, role   │  │ slug (uniq)  │
│ value        │  │ key (uniq)      │  │ quote        │  │ title        │
│ group        │  │ url             │  │ published    │  │ content      │
└──────────────┘  └─────────────────┘  └──────────────┘  │ section      │
                                                          └──────────────┘
```

<br/>

---

## 🏁 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) `>= 1.1`
- [Node.js](https://nodejs.org/) `>= 20.x`
- Git

### 1. Clone the repository

```bash
git clone https://gitlab.com/YOUR_USERNAME/zelaki-sacco.git
cd zelaki-sacco
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment

```bash
cp .env.example .env
# Edit .env — set DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET
```

### 4. Set up the database

```bash
# Apply migrations and create the SQLite file
bun run db:migrate

# Seed initial data (site settings, navigation, sample content)
bun run db:push
node prisma/seed.ts
node prisma/seed-menu.ts
```

### 5. Start the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

| Route | Description |
|-------|-------------|
| `http://localhost:3000` | Public website |
| `http://localhost:3000/?view=admin` | Admin panel |
| `http://localhost:3000/?view=login` | Member login |

> **Default admin passcode:** `admin123` — change this immediately in Admin → Settings → Security

<br/>

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
# Database (SQLite file path)
DATABASE_URL=file:./db/custom.db

# NextAuth (required in production)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-32-character-random-secret

# App
NODE_ENV=development
PORT=3000
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

See [`.env.example`](.env.example) for full documentation.

<br/>

---

## 🛡️ Admin Panel

Access the admin panel at `/?view=admin`.

| Section | What you can do |
|---------|----------------|
| **Dashboard** | Key metrics — members, applications, messages |
| **Members** | Search, view, edit members; import via CSV |
| **Member Loans** | View active loans, track payments |
| **Membership Applications** | Approve or reject new membership requests |
| **Loan Applications** | Review and process loan requests |
| **Jobs** | Post openings, close listings |
| **Job Applications** | Review CVs, update application status |
| **Messages** | Read contact form submissions |
| **News** | Create and publish news items |
| **Events** | Manage upcoming events |
| **Pages** | Edit CMS content pages |
| **Navigation** | Manage header menu items |
| **Images** | Upload hero, gallery, partner images |
| **Site Settings** | Branding, contact info, social links |

<br/>

---

## 👤 Member Portal

Members log in at `/?view=login`.

| Feature | Description |
|---------|-------------|
| **Dashboard** | Account overview — savings totals, share count |
| **Transactions** | Full transaction history with type and balance |
| **Loans** | Active loans — principal, remaining, monthly payment |
| **Profile** | View and update personal information |

<br/>

---

## 🚢 Deployment

This project deploys to **cPanel** via **GitLab CI/CD**.

The pipeline runs three stages on every push to `main`:

```
push to main
     │
     ▼
┌─────────┐    ┌─────────┐    ┌────────────────────────────────┐
│  lint   │───▶│  build  │───▶│  deploy                        │
│         │    │         │    │  rsync → server                │
│ ESLint  │    │next build│   │  prisma migrate deploy         │
│         │    │standalone│   │  passenger restart             │
└─────────┘    └─────────┘    └────────────────────────────────┘
```

**Full deployment guide:** [`DEPLOY-GITLAB.md`](DEPLOY-GITLAB.md)

**Quick setup checklist:**
- [ ] cPanel Node.js App created (startup file: `.next/standalone/server.js`)
- [ ] SSH deploy key added to cPanel
- [ ] 7 GitLab CI/CD variables set (`SSH_PRIVATE_KEY`, `CPANEL_HOST`, `CPANEL_USER`, `CPANEL_APP_DIR`, `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`)
- [ ] Environment variables set in cPanel Node.js App panel
- [ ] First deploy: seed the database via SSH

<br/>

---

## 👨‍💻 Developer

<div align="center">

<br/>

**Built with ❤️ for Ethiopian cooperative institutions**

<br/>

| | |
|--|--|
| **Project** | Zelaki Sacco Digital Platform |
| **Type** | Full-stack Next.js Web Application |
| **Domain** | FinTech / Cooperative Finance (SACCO) |
| **Target Users** | SACCO staff, members, and the general public |
| **Country** | 🇪🇹 Ethiopia |
| **Language** | English (i18n-ready for Amharic expansion) |
| **License** | Private / Proprietary |

<br/>

</div>

---

<div align="center">

### 🌟 Key Numbers

| Metric | Value |
|--------|-------|
| Database models | **16** |
| API route groups | **13+** |
| UI component library | **Radix UI + shadcn** |
| Animation library | **Framer Motion** |
| Build output | **Standalone (cPanel-ready)** |

<br/>

---

*Zelaki Sacco Platform — Connecting cooperatives with modern technology*

</div>
