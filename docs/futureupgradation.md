# Apply — Future Upgradation Roadmap

> **apply.neexmeet.com** · Founder: Rohit Jadhav · CTO planning doc · July 2026  
> AI-powered resume studio, interview prep, job search, freelancing — plus **Apply Desktop** (live interview assistant).

This document is the **single source of truth** for the next phase of Apply. It merges the product vision, free-first AI strategy, target architecture, and a **honest migration plan** from what is live today to what we are building next.

**Companion doc:** [built-features-phase-two.md](./built-features-phase-two.md) — every feature built today, quality upgrades (Section 1), and Phase 2 new work (Section 2).

---

## How to read this doc

| Section | Who it’s for |
|---------|----------------|
| **Current state (today)** | What is already shipped in this repo |
| **Target state (future)** | Where we are going |
| **Gap + migration** | What must change and in what order |
| **Build order** | Week-by-week execution |
| **CTO decisions** | Non-negotiable technical choices |

---

## What Apply is (product vision)

Apply is **one platform, two surfaces**, one account:

### 1. Web app — `apply.neexmeet.com` (live today ~70%)

- Resume build + tailor + PDF export  
- Job search and matching  
- Interview prep (study guides, coding, HR)  
- Cover letter, critique, tools  
- Freelancing / find clients  
- Analytics, billing, admin  

### 2. Desktop app — **Apply Desktop** (planned)

- Downloadable Windows + macOS app  
- Live interview assistant: mic → transcription → AI answers  
- Transparent overlay, hotkeys, session history  
- Syncs resume + job context from web account  

**One login. One subscription. Two products.**

---

## Current state (this repository — July 2026)

Do **not** throw this away. This is production-capable work.

| Area | Current implementation | Key paths |
|------|------------------------|-----------|
| Framework | Next.js 15 App Router | `app/` |
| UI | React 19, Tailwind, Framer Motion, shadcn-style `components/ui/` | `components/` |
| Auth | **Clerk** | `middleware.ts`, `lib/auth.ts`, `lib/clerk-config.ts` |
| Database | **MongoDB + Mongoose** | `lib/mongodb.ts`, `models/*` |
| Dev fallback | Local JSON store | `.data/resume-store.json` via `lib/data/resumes.ts` |
| AI | **Groq primary**, OpenAI fallback | `lib/ai/openai.ts`, `lib/ai/resume-engine.ts` |
| Billing | Manual UPI + WhatsApp + admin confirm | `lib/billing/*`, `public/qrcode.png` |
| Features | Jobs, freelancing, interview prep, resume studio | `features/`, `app/dashboard/*` |
| PDF | @react-pdf/renderer + pdf-lib | `lib/pdf/*`, `app/api/pdf/` |
| Chat widget | Apna AI embed | `app/layout.tsx` |
| Desktop | **None** | — |
| Monorepo | **Single app** (not `apps/web` yet) | repo root |

### Dashboard routes (live)

```
/dashboard              → overview
/dashboard/build        → resume studio (editor + live PDF)
/dashboard/generate     → tailor uploaded resume
/dashboard/resumes      → saved resumes
/dashboard/jobs         → job search
/dashboard/freelancing  → find clients
/dashboard/learners     → learner roadmaps
/dashboard/interview    → interview prep guides
/dashboard/tools          → cover letter, critique, photo
/dashboard/analytics      → ATS stats
/dashboard/upgrade        → Pro checkout (manual)
/dashboard/admin          → founder admin panel
```

### API routes (live)

```
POST /api/resumes/build, /generate, /refine, /import, /analyze
GET|POST /api/resumes/master
PATCH /api/resumes/[resumeId]
POST /api/interview, /cover-letter, /critique, /photo
GET|POST /api/pdf
GET /api/jobs/match, /api/jobs/profile
POST /api/billing/*, /api/admin/*
POST /api/activity/track
```

---

## Target state (future architecture)

### Repository structure (monorepo — migrate gradually)

```
apply/
├── apps/
│   ├── web/                      # Next.js 15 (move current root here OR keep root = web)
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   └── package.json
│   │
│   └── desktop/                  # NEW — Tauri 2 + React
│       ├── src/
│       │   ├── components/
│       │   │   ├── Overlay.tsx
│       │   │   ├── Controls.tsx
│       │   │   └── Settings.tsx
│       │   ├── hooks/
│       │   │   ├── useAudio.ts
│       │   │   ├── useTranscribe.ts
│       │   │   └── useAnswer.ts
│       │   └── App.tsx
│       ├── src-tauri/
│       └── package.json
│
├── packages/
│   ├── db/                       # Drizzle schema + migrations (PostgreSQL)
│   │   ├── schema.ts
│   │   └── migrations/
│   ├── shared/                   # Types, Zod schemas, API contracts
│   └── ai/                       # groq.ts, gemini.ts, router.ts (optional split from lib/ai)
│
├── services/
│   └── realtime/                 # OPTIONAL Phase 2 — WebSocket for desktop streaming
│
├── docs/
│   └── futureupgradation.md      # this file
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

**CTO note:** Do not big-bang move to monorepo on day one.  
**Phase A:** Keep building in current root.  
**Phase B:** Add `apps/desktop/` when desktop starts.  
**Phase C:** Extract `packages/db` when PostgreSQL migration begins.

---

## Major migrations (CTO decisions)

### 1. Database: MongoDB → PostgreSQL (Neon + Drizzle)

**Why migrate**

| MongoDB (today) | PostgreSQL (target) |
|-----------------|---------------------|
| Flexible but schema drift across 7 models | Strict schema, migrations, relations |
| Harder billing/subscription queries | Easy joins: user → resumes → sessions → payments |
| Local JSON fallback adds dual code paths | One source of truth |
| Desktop sync needs stable IDs + relations | UUID FKs fit desktop + web |
| Admin analytics are ad-hoc | SQL aggregates for dashboard |

**Provider:** [Neon](https://neon.tech) (free tier, serverless Postgres, works on Vercel)

**ORM:** [Drizzle](https://orm.drizzle.team) (lightweight, TypeScript-first, great with Next.js)

**Target schema (high level)**

```typescript
// packages/db/schema.ts — target tables

users                  // replaces Clerk-only identity + models/User.ts
sessions               // Better Auth sessions (not interview sessions)
accounts               // OAuth providers (GitHub, Google)

resumes                // master resume (was MasterResume)
tailored_resumes       // was GeneratedResume
interview_guides       // was InterviewGuide
interview_sessions     // NEW — desktop live sessions
payment_requests       // was PaymentRequest
device_usage           // was DeviceUsage
user_activity          // was UserActivity
subscriptions          // Stripe + legacy manual Pro
desktop_licenses       // NEW — per-machine desktop entitlement
```

**Migration steps (do not skip)**

1. Add Drizzle + Neon alongside Mongo — **dual-write** period (2 weeks)  
2. Map Mongoose models → Drizzle tables (see mapping below)  
3. One-time migration script: Mongo → Postgres  
4. Switch reads to Postgres  
5. Remove Mongo + local JSON fallback code  
6. Update `docs/vercel-deploy.md` env vars  

**Model mapping**

| Mongoose model | Postgres table |
|----------------|----------------|
| `User` | `users` + `subscriptions` |
| `MasterResume` | `resumes` (`is_master = true`) |
| `GeneratedResume` | `tailored_resumes` |
| `InterviewGuide` | `interview_guides` |
| `PaymentRequest` | `payment_requests` |
| `DeviceUsage` | `device_usage` |
| `UserActivity` | `user_activity` |

**Env change**

```bash
# Remove (after migration)
MONGODB_URI=

# Add
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/apply?sslmode=require
```

---

### 2. Auth: Clerk → Better Auth

**Why migrate**

| Clerk (today) | Better Auth (target) |
|---------------|------------------------|
| External dependency + per-MAU cost at scale | Self-hosted, fits Postgres |
| Harder desktop token flow | Same auth API for web + desktop |
| Vendor lock-in | You own user table |
| Admin email hacks for founder | Role column on `users` |

**What Better Auth gives us**

- Email + password  
- GitHub + Google OAuth  
- Session tokens desktop can use  
- Drizzle adapter → same DB as everything else  

**Migration steps**

1. Set up Better Auth in parallel route `/api/auth/*`  
2. Add `users` table linked by email  
3. **Export Clerk users** (email, name) → import to Postgres  
4. New signups go to Better Auth only  
5. Existing users: magic link or “reset password” once  
6. Remove `@clerk/nextjs`, update `middleware.ts`, dashboard layout  
7. Desktop: `POST /api/desktop/auth` returns session token + master resume  

**Env change**

```bash
# Remove (after migration)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_*=

# Add
BETTER_AUTH_SECRET=32-char-minimum-secret
BETTER_AUTH_URL=https://apply.neexmeet.com
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**CTO note:** Migrate **Postgres first**, then Better Auth. Better Auth needs Postgres (or SQLite). Doing auth before DB doubles migration pain.

---

### 3. Billing: Manual UPI → Stripe (keep UPI as India option)

**Today:** WhatsApp + QR + admin manual activation — fine for first 100 users.

**Target:**

| Plan | Price | Includes |
|------|-------|----------|
| Free | ₹0 | 5 tailors/mo, 3 prep sessions, 3 desktop sessions/mo |
| Pro | ₹299/mo ($5 US) | Unlimited tailor, prep, desktop |
| Premium | ₹499/mo ($9 US) | Pro + recordings, company packs, priority AI |

```bash
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

Keep `PAYMENT_ADMIN_SECRET` + manual flow until Stripe is verified in production.

---

### 4. AI strategy — free first, upgrade later

**Phase 1 — ₹0/month (start now)**

| Job | Model | Provider |
|-----|-------|----------|
| Interview answers (desktop + prep) | Llama 3.3 70B | Groq |
| Voice transcription | Whisper Large V3 | Groq |
| Resume tailoring (long context) | Gemini 1.5 Flash | Google |
| Cover letters | Gemini 1.5 Flash | Google |
| Interview prep content | Gemini 1.5 Flash or Groq 70B | Google / Groq |
| Quick AI tools | Llama 3.1 8B | Groq |
| ATS analysis | Gemini 1.5 Flash | Google |

**Phase 2 — when revenue covers cost**

| Job | Model | When |
|-----|-------|------|
| Premium interview answers | GPT-4o | Premium plan only |
| Premium resume tailor | Claude 3.5 Sonnet | Premium plan only |
| Everyone else | Groq + Gemini | Free / Pro |

**Switch to paid models only when:**

- [ ] 500+ DAU  
- [ ] ₹5,000+ MRR  
- [ ] 50+ paid subscribers  
- [ ] Users report quality gap vs Groq  
- [ ] Hitting Groq free limits daily  

**Why Groq first**

```
Speed:   Groq ~500 tok/s  vs  OpenAI ~60 tok/s
Cost:    Groq ₹0          vs  OpenAI $20–100/mo
Quality: Llama 3.3 70B ≈ 88–92% of GPT-4o for interview bullets
Limit:   14,400 req/day free — enough for ~1,000 users
```

**Code changes in current repo**

| File | Change |
|------|--------|
| `lib/ai/openai.ts` | Keep; add `lib/ai/gemini.ts` |
| `lib/ai/resume-engine.ts` | Route tailor → Gemini, prep → Groq |
| `lib/ai/router.ts` | **NEW** — task + plan → model |
| `.env.example` | Add `GEMINI_API_KEY` |

```typescript
// lib/ai/router.ts — target pattern
export async function routeAI(
  task: 'interview' | 'resume' | 'cover-letter' | 'quick' | 'transcribe',
  userPlan: 'free' | 'pro' | 'premium'
) {
  if (userPlan === 'premium' && task === 'interview') return 'openai-gpt-4o'
  if (task === 'resume' || task === 'cover-letter') return 'gemini-1.5-flash'
  if (task === 'transcribe') return 'groq-whisper-large-v3'
  return 'groq-llama-3.3-70b'
}
```

---

### 5. Redis — Upstash (when desktop launches)

**Use for:**

- Desktop session state (active interview)  
- Rate limits per user (Groq abuse protection)  
- Short-lived transcription buffers  
- Feature flags  

```bash
UPSTASH_REDIS_URL=https://xxx.upstash.io
UPSTASH_REDIS_TOKEN=xxx
```

**Not needed until:** desktop app or WebSocket realtime service ships.

---

## Web app — target pages (align names with today)

| Target route | Current route | Action |
|--------------|---------------|--------|
| `/dashboard` | `/dashboard` | Keep |
| `/dashboard/tailor` | `/dashboard/generate` | Rename or alias |
| `/dashboard/resumes` | `/dashboard/resumes` | Keep |
| `/dashboard/job-search` | `/dashboard/jobs` | Keep |
| `/dashboard/freelancing` | `/dashboard/freelancing` | Keep |
| `/dashboard/interview-prep` | `/dashboard/interview` | Keep |
| `/dashboard/ai-tools` | `/dashboard/tools` | Keep |
| `/dashboard/analytics` | `/dashboard/analytics` | Keep |
| `/dashboard/settings` | — | **NEW** |
| `/downloads` | — | **NEW** (Interview Lift style) |
| `/dashboard/build` | `/dashboard/build` | Keep (resume studio) |

---

## Desktop app — Apply Desktop

### Stack

```
Tauri 2.0       → Native shell (Windows + macOS)
React 18/19     → UI (match web design tokens)
TypeScript
Tailwind CSS
Zustand         → State
Vite            → Build
Groq SDK        → Whisper + Llama (same keys strategy as web)
```

### Setup (when we start Week 3)

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

cargo install tauri-cli
npm create tauri-app@latest apply-desktop
cd apply-desktop
npm install zustand groq-sdk @tauri-apps/api @tauri-apps/plugin-global-shortcut
npm run tauri dev
npm run tauri build
```

### Desktop ↔ web sync

```
1. User signs up on apply.neexmeet.com
2. Downloads from /downloads
3. Desktop → Sign in with Apply (email/password or OAuth token)
4. POST /api/desktop/auth → session token + master resume + plan
5. Desktop stores token in Tauri secure storage
6. Interview mode: mic → Groq Whisper → Groq Llama → overlay UI
7. Session logged to interview_sessions table
```

### CTO build order for desktop (safer launch)

| Phase | Feature | Why first |
|-------|---------|-----------|
| 1 | Login + load resume from API | Proves sync |
| 2 | **Mock interview mode** | Legal, testable, demo-friendly |
| 3 | Live transcription + AI answers in practice room | Real-time pipeline |
| 4 | Overlay + hotkeys | Native Tauri window APIs |
| 5 | Session recording + history | Premium feature |

**Compliance note:** Market “live assistant” for **practice and mock interviews**. Terms of Service must prohibit misuse in real employer interviews. Reduces platform ban risk (Zoom/Meet/Teams).

---

## Environment variables — full target list

```bash
# ─── AI (Phase 1 — free) ─────────────────────────
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
GROQ_MODEL=llama-3.3-70b-versatile
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxx

# ─── AI (Phase 2 — paid) ─────────────────────────
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx

# ─── Database ────────────────────────────────────
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/apply?sslmode=require

# ─── Redis (desktop phase) ───────────────────────
UPSTASH_REDIS_URL=https://xxx.upstash.io
UPSTASH_REDIS_TOKEN=xxxxxxxxxxxxxxxxxxxx

# ─── Auth (Better Auth) ──────────────────────────
BETTER_AUTH_SECRET=your-32-char-secret-here
BETTER_AUTH_URL=https://apply.neexmeet.com
GITHUB_CLIENT_ID=xxxxxxxxxxxx
GITHUB_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxx
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxx

# ─── Email ───────────────────────────────────────
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxx
PAYMENT_NOTIFY_EMAIL=
PAYMENT_FROM_EMAIL=

# ─── Payments ────────────────────────────────────
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx

# ─── App ─────────────────────────────────────────
NEXT_PUBLIC_APP_URL=https://apply.neexmeet.com
NEXT_PUBLIC_DESKTOP_APP_VERSION=1.0.0

# ─── Keep from current prod (until migrated) ─────
# MONGODB_URI=          # remove after Postgres cutover
# CLERK_*               # remove after Better Auth cutover
# ADMIN_EMAIL, billing manual keys, job APIs, Umami, chatbot, etc.
```

---

## Free tier limits (plan capacity)

| Service | Free limit | Enough for |
|---------|------------|------------|
| Groq | 14,400 req/day, 30/min | ~1,000 DAU |
| Gemini Flash | 1,500 req/day | ~500 tailors/day |
| Neon Postgres | 512 MB | ~100k rows |
| Upstash Redis | 10k req/day | Early desktop |
| Resend | 3,000 emails/mo | Onboarding + billing |
| Vercel | Hobby/Pro | Web hosting |

**Target monthly infra cost Phase 1:** ₹0 (+ domain ~₹500–800/year)

---

## What CTO recommends we do NOT do

1. **Do not rewrite the whole app** before shipping `/downloads` + Gemini router  
2. **Do not migrate Clerk + Mongo same week** — sequence: Postgres → Better Auth → Stripe  
3. **Do not put Groq API key in desktop client** — proxy through Apply API (rate limits + billing)  
4. **Do not skip dual-write** when moving Mongo → Postgres  
5. **Do not launch desktop without Windows + macOS test on real Zoom/Meet**  
6. **Do not remove manual billing** until Stripe webhooks are live  

---

## What we keep from current build (reuse 100%)

| Asset | Reuse for |
|-------|-----------|
| `lib/ai/prompts.ts` | All models (Groq, Gemini, OpenAI) |
| `lib/data/companies.ts` | Company interview packs |
| `features/jobs/` | Job context in desktop |
| `lib/resume-studio/` | Web build page + PDF payload for desktop context |
| `features/freelancing/` | Growth lane, no change needed |
| `components/landing/` | Add downloads section + desktop CTA |
| Admin dashboard | Keep; extend for desktop sessions + Stripe |
| PDF pipeline | Web export; desktop can call same `/api/pdf` |

---

## Build order — founder + CTO agreed

### Weeks 1–2 — Stabilize + free AI (no breaking migrations)

- [ ] Fix Build Resume PDF accuracy (structured PDF — in progress)  
- [ ] Add `lib/ai/gemini.ts` — wire tailor + cover letter to Gemini Flash  
- [ ] Add `lib/ai/router.ts` — central model selection  
- [ ] Update `.env.example` with `GEMINI_API_KEY`  
- [ ] Groq for interview prep + quick tools (already mostly done)  
- [ ] Smoke test all dashboard flows  

### Weeks 3–4 — Downloads + Postgres foundation

- [ ] Ship `/downloads` page (Interview Lift style layout)  
- [ ] Neon project + Drizzle schema in `packages/db` or `lib/db`  
- [ ] Dual-write: new saves go to Mongo **and** Postgres  
- [ ] Migration script Mongo → Postgres  

### Weeks 5–6 — Auth migration

- [ ] Better Auth on Postgres  
- [ ] New login/register UI (replace Clerk components)  
- [ ] User export/import from Clerk  
- [ ] `POST /api/desktop/auth` stub for desktop  

### Weeks 7–8 — Desktop MVP

- [ ] `apps/desktop` Tauri scaffold  
- [ ] Login → fetch master resume  
- [ ] Mock interview mode (camera optional, mic required)  
- [ ] Groq Whisper + Llama through **web API proxy** (not client-side keys)  

### Weeks 9–10 — Billing + launch

- [ ] Stripe checkout + webhooks  
- [ ] Map Pro plan to desktop session limits  
- [ ] Windows + macOS builds on `/downloads`  
- [ ] Beta to existing Apply users  

### Weeks 11+ — Realtime + premium

- [ ] WebSocket service (`services/realtime`) if latency needs it  
- [ ] OpenAI/Claude for Premium tier only  
- [ ] Session recordings (R2 storage)  
- [ ] Affiliate page  

---

## Quick reference — which AI for what

| Task | Model | Provider |
|------|-------|----------|
| Resume tailoring | Gemini 1.5 Flash | Google |
| Cover letter | Gemini 1.5 Flash | Google |
| Interview prep content | Groq Llama 3.3 70B | Groq |
| Live interview answers (desktop) | Groq Llama 3.3 70B | Groq |
| Voice transcription | Whisper Large V3 | Groq |
| Quick AI tools | Llama 3.1 8B | Groq |
| ATS score analysis | Gemini 1.5 Flash | Google |
| Job description analysis | Gemini 1.5 Flash | Google |
| Coding questions | Mixtral 8x7B | Groq |
| Premium upgrade | GPT-4o / Claude 3.5 | OpenAI / Anthropic |

---

## API keys — how to get them (free)

### Groq (most important)

1. https://console.groq.com  
2. Sign up with Google (no card)  
3. API Keys → Create  
4. Add to `GROQ_API_KEY`  

### Google Gemini

1. https://aistudio.google.com  
2. Get API Key → Create  
3. Add to `GEMINI_API_KEY`  

### Other services

| Service | URL | Use |
|---------|-----|-----|
| Neon | neon.tech | Postgres |
| Upstash | upstash.com | Redis |
| Resend | resend.com | Email |
| Stripe | dashboard.stripe.com | Billing (test mode free) |
| Vercel | vercel.com | Web hosting |

---

## Success metrics (know when we “made it”)

| Milestone | Target |
|-----------|--------|
| Web DAU | 100 → 500 → 1,000 |
| Paid subscribers | 10 → 50 → 200 |
| Desktop downloads | 50 → 500 |
| MRR | ₹5k → ₹25k → ₹1L |
| Interview sessions/week | Track in `interview_sessions` |
| Resume tailors/day | Track in `tailored_resumes` |
| API cost | Stay ₹0 until MRR > ₹5k |

---

## Document history

| Date | Author | Change |
|------|--------|--------|
| July 2026 | Rohit Jadhav + CTO | Initial future upgradation roadmap |

---

*Apply · Future Upgradation · apply.neexmeet.com · Let’s go.*
