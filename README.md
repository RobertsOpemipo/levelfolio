# Levelfolio — The Archive

> **"Learn it. File it. Level up."**  
> An enterprise-grade, gamified Corporate Learning Management System (LMS) built with Next.js 16, React 19, Tailwind CSS, Go, and PostgreSQL Row-Level Security (RLS).

---

## 📖 Overview

Corporate onboarding and compliance training often suffer from low completion rates, confusing software, and endless slideshows. **Levelfolio** reimagines employee training through the metaphor of **"The Archive"**:
* Training modules become **Files**.
* Lessons become bite-sized 2-minute **Index Cards**.
* Deadlines become unmistakable **Return-by Slips**.
* Competency checks are treated as **Final Audits**.
* Completed training issues verified, tamper-evident **Library Stamps** and serial-numbered **Certificates**.

---

## 🎨 Design Philosophy: "Quiet Paper, Loud Moments"

* **Quiet by Default:** 90% of user interactions occur on calm, neutral paper surfaces (`#f6f4ef` desk, `#ffffff` card surfaces, `#e4e0d6` border lines) with modern sans-serif typography. No distracting clutter or cartoonish animations.
* **Loud at Reward Moments:** Tactile, hardware-accelerated skeuomorphism (heavy rubber stamp impacts, paper textures, double-rule certificates, and serif display fonts) is strictly reserved for milestones—such as passing a Final Audit or unlocking an official credential.

---

## 👥 Three Complete Personas (Multi-Role Experience)

Levelfolio features a built-in **Demo Persona Switcher** fixed at the bottom of the screen, allowing anyone to evaluate the system across three key corporate perspectives without authentication walls:

| Persona | Role | Primary Workspace | Key Capabilities |
|---|---|---|---|
| **Amara Okafor** | Cardholder (Learner) | `/archive/reading-room` | Complete bite-sized index cards, maintain daily study streaks, track return-by deadlines, and claim certificates. |
| **Tunde Bakare** | Supervisor (Manager) | `/manager/docket` | Complete personal supervisory certifications, inspect direct reports, issue +7 day extensions, send batch nudges, and export CSV reports. |
| **Ngozi Eze** | Tenant Administrator | `/admin/workspace` | View company-wide compliance rollups, configure auto-enrollment rules, and inspect the immutable system audit trail. |

---

## ✨ Key Features

- **Interactive Landing Page (`/`):** Test an interactive 3-step mini-lesson, sample the level-up curve, preview the 5-tier Archival Rank ladder, and generate real-time completion certificates.
- **Cardholder Reading Room (`/archive/reading-room`):** Physical folder cutout jacket, 5-stage onboarding trail map, live XP meter (`100 / 250 XP`), and urgency-coded return-by slips.
- **My Shelf & Course Catalog (`/archive/shelf`):** Clean switch between assigned compliance modules and the open company catalog.
- **Distraction-Free Course Player (`/archive/files/[id]`):** Stacked index-card navigation, rich video briefings, and instant-validation competency audits.
- **Supervisor Docket (`/manager/docket`):** Team progress roster, individual inspection drawer, deadline overrides, and one-click reminders.
- **Admin Workspace (`/admin/workspace`):** Real-time departmental metrics, automated onboarding rules, and statutory audit CSV exports.
- **Community Leaderboard (`/archive/leaderboard`):** Weekly/monthly streak rankings, peer high-fives (👏), and an enterprise privacy toggle (*Anonymous Mode*).

---

## 🛠️️ Tech Stack & Architecture

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack) & [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography:** Fraunces (Display Serif), Inter (UI Sans), Courier Prime (Archival Mono)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend & Security
- **Language:** Go (Chi router, `pgx/v5`, `sqlc`)
- **Database:** PostgreSQL 16 Alpine
- **Multi-Tenancy:** Row-Level Security (RLS) enforced at the database engine level via session context (`app.tenant_id`)
- **Ledger Immutability:** `UPDATE` and `DELETE` grants revoked on `xp_events` and `audit_logs` for strict audit compliance
- **Migrations:** Goose

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (optional for database testing)
- Go 1.22+ (optional for backend development)

### 1. Clone & Install Dependencies
```bash
git clone
cd levelfolio/frontend
npm install