# Apply

Apply is India's placement preparation platform — ATS resume tailoring, **64+ company previous year coding questions (PYQs)**, AI mock interviews with voice, job matching, application tracking, and freelancing tools. Built for students and early-career developers.

> **Research & data extraction by Rohit Jadhav** — Apply (apply.neexmeet.com)
> Original PYQ guides curated by [Let's Code](https://www.lets-code.co.in) / Om Kute

---

## Use cases

| Who | Goal | Where to go |
|-----|------|-------------|
| Student with no resume | Answer guided questions and get a PDF | `/dashboard/build` |
| Student with a resume | Upload PDF/Word and tailor to a job | `/dashboard/generate` |
| Interview candidate | Company matcher + PYQs + video suggestions | `/dashboard/interview` |
| Mock interview practice | Voice AI interviewer with live captions | `/dashboard/mock-interview` |
| PYQs browser | 64+ company previous year coding questions | `/pyqs` |
| Company prep guides | Interview, OA, resume, process guides | `/prepare` |
| Active job seeker | Find jobs matched to resume profile | `/dashboard/jobs` |
| Freelancer | Find clients via Maps/Justdial/IndiaMART | `/dashboard/freelancing` |
| Offer comparison | Compare CTC, location, role side-by-side | `/dashboard/offers` |
| Application tracker | Track applied / interview / offer / rejected | `/dashboard/applications` |
| Job hunter | Track ATS scores and activity | `/dashboard/analytics` |
| Returning user | See recent resumes and readiness | `/dashboard` |

**Typical flow:** Browse PYQs → tailor resume → practice mock interview → apply on LinkedIn/Naukri → track applications → compare offers.

---

## Tech stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | **Next.js 15** (App Router) | Pages, API routes, SSR/SSG |
| UI | **React 19**, **TypeScript** | Components and type safety |
| Styling | **Tailwind CSS**, **Framer Motion** | Layout, motion |
| Icons | **Phosphor Icons** | Dashboard and landing UI |
| Primitives | **Radix Slot**, **CVA**, **clsx** | Button variants, utilities |
| Auth | **Auth.js** + **Google OAuth** (JWT) | Sign-in; users stored in Postgres |
| Database | **Neon PostgreSQL** + **Drizzle** | User resumes, guides, master resume |
| Fallback storage | Local JSON (`.data/resume-store.json`) | Dev/resilience when DB is unreachable |
| AI (text) | **Groq** (primary), **Gemini** (long context), **OpenAI** (fallback) | Resume tailoring, interview guides, cover letters |
| AI (voice TTS) | **ElevenLabs** (premium), browser SpeechSynthesis (fallback) | Mock interview voice — 9 voices, 5 languages |
| AI (voice STT) | **Groq Whisper** (server), Web Speech API (client) | Voice answer capture in mock interview |
| Validation | **Zod** | API request schemas |
| PDF | **@react-pdf/renderer**, **pdf-lib**, **puppeteer-core** | Generate and patch PDFs |
| File import | **pdf-parse**, **mammoth**, **word-extractor** | Extract text from uploads |
| Uploads | **UploadThing** | Profile photo uploads |
| Toasts | **Sonner** | In-app notifications |
| Analytics | **Umami** (optional) | Public site traffic |
| Testing | **Vitest** | Unit tests (45 passing) |

---

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The repo includes a root `.npmrc` with `legacy-peer-deps=true` so installs stay resilient to optional peer conflicts.

### Required environment variables

| Variable | Used for |
|----------|----------|
| `DATABASE_URL` | Neon Postgres (app data via Drizzle) |
| `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | Auth.js JWT + Google sign-in |
| `GROQ_API_KEY`, `GROQ_MODEL` | AI generation (recommended) |
| `GEMINI_API_KEY` | AI generation (long context — resume tailoring, cover letters) |
| `OPENAI_API_KEY` | Optional AI fallback |
| `ELEVENLABS_API_KEY` | Premium voice for mock interview (optional — browser fallback works) |
| `UPLOADTHING_TOKEN`, `UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID` | Photo uploads |
| `NEXT_PUBLIC_UMAMI_SRC`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Optional web analytics |
| `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`, `ADZUNA_COUNTRY` | Live jobs via Adzuna (India default: `in`) |
| `REED_API_KEY` | UK jobs via Reed.co.uk |
| `USAJOBS_API_KEY`, `USAJOBS_USER_AGENT` | US federal jobs |
| `JUJU_PARTNER_ID` | US job aggregator (Juju RSS) |
| `HEROHUNT_API_KEY` | HeroHunt talent/market signals |

See [docs/job-apis-setup.md](docs/job-apis-setup.md) for registration links and examples.

---

## Product routes

### Public routes (indexed by Google)

| Route | Description |
|-------|-------------|
| `/` | Public landing page — PYQs + mock interview first |
| `/pyqs` | **64+ company previous year coding questions library** |
| `/prepare` | 26 company prep guides (interview, OA, resume, process) |
| `/prepare/[slug]` | Individual company prep guide (SSG) |
| `/mock-interview` | Mock interview landing page |
| `/blog` | 24 SEO blog posts on placements, resumes, interviews |
| `/blog/[slug]` | Individual blog post (SSG) |
| `/downloads` | Apply Desktop coming soon (noindex) |

### Dashboard routes (auth-protected, noindex)

| Route | Description |
|-------|-------------|
| `/dashboard` | Overview, readiness score, quick actions, activity |
| `/dashboard/resumes` | All saved resume versions |
| `/dashboard/build` | Guided resume builder with live side-by-side preview |
| `/dashboard/generate` | Upload resume + company search + tailor to job |
| `/dashboard/interview` | **Company matcher → shortlist + PYQs + video suggestions** |
| `/dashboard/mock-interview` | **AI mock interview with voice, live captions, auto-submit** |
| `/dashboard/jobs` | Job search — profile-based matches + LinkedIn/Naukri links |
| `/dashboard/learners` | Student roadmaps (Web Dev, DSA, System Design, AI/ML) |
| `/dashboard/applications` | Placement tracker (applied / interview / offer / rejected) |
| `/dashboard/offers` | Offer comparison (CTC, location, role, deadline) |
| `/dashboard/cover-letters` | Saved cover letter history |
| `/dashboard/tools` | Cover letter, critique, photo, PDF, offers |
| `/dashboard/analytics` | ATS stats, keyword coverage, activity feed |
| `/dashboard/freelancing` | Find clients via Maps/Justdial/IndiaMART + pipeline tracker |
| `/dashboard/settings` | Profile, preferences, account |
| `/dashboard/upgrade` | Pro checkout (UPI / Stripe) |
| `/dashboard/admin` | Founder admin panel |

---

## API routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/company/lookup?q=` | Company autocomplete and profile lookup |
| `GET` | `/api/jobs/match` | Job matches from saved resume profile |
| `GET` | `/api/jobs/profile` | Inferred job seeker profile only |
| `POST` | `/api/resumes/build` | Build resume from guided form |
| `POST` | `/api/resumes/generate` | Tailor uploaded resume to job |
| `POST` | `/api/resumes/refine` | AI refine by prompt |
| `POST` | `/api/resumes/analyze` | ATS keyword score |
| `POST` | `/api/resumes/import` | Upload and extract resume file |
| `GET/POST` | `/api/resumes/master` | Load/save master resume text |
| `PATCH` | `/api/resumes/:resumeId` | Update generated resume |
| `POST` | `/api/interview` | Generate interview prep guide |
| `POST` | `/api/cover-letter` | Generate cover letter |
| `POST` | `/api/critique` | ATS critique |
| `POST` | `/api/photo` | Professional photo plan |
| `GET/POST` | `/api/pdf` | Render or download PDF |
| `GET/POST` | `/api/mock-interview` | Start / answer / end mock interview session |
| `POST` | `/api/mock-interview/transcribe` | Whisper voice transcription |
| `POST` | `/api/mock-interview/speak` | ElevenLabs TTS for questions |
| `GET/POST` | `/api/billing/*` | Billing status + payment |
| `POST` | `/api/admin/*` | Admin panel APIs |
| `POST` | `/api/activity/track` | Analytics event |
| `GET` | `/api/health` | Health check |

All dashboard APIs are protected by Auth.js middleware (Google JWT session).

---

## Key features

### Company PYQs Library (`/pyqs`)
- **64 companies** across 3 categories: Product & Tech (30), BFSI & Consulting (13), IT Services (21)
- Each company links to its previous year coding questions guide
- Searchable + filterable by category
- Extracted from [Let's Code Google Doc](https://docs.google.com/document/d/1JFyZTIxCKj6Q2UJTOmA3lvhmI99etfBtnsSxCeDX4-o) — research by Rohit Jadhav
- Data stored in `dataset/company-coding-questions/raw-data.json`
- Content module: `content/coding-questions/index.ts`

### AI Mock Interview (`/dashboard/mock-interview`)
- Meet-style full-screen UI with camera + AI interviewer robot
- **Voice questions**: ElevenLabs premium voices (9 voices: 5 female, 4 male) + browser fallback (Indian English prioritized)
- **Voice answers**: Groq Whisper (server) + Web Speech API (client) — auto-captures speech
- **Auto-flow**: Question speaks → mic auto-starts → user speaks → 5s silence → auto-submit → AI evaluates → next question
- Live captions during recording
- In-call voice & language picker (English, Hindi, Tamil, Telugu, Marathi)
- Optional coding rounds with in-browser code execution
- Session history saved to database
- Exit dialog with session stats

### Interview Prep Matcher (`/dashboard/interview`)
- Simple form: company type (product/service/startup/BFSI), domain, role, city, experience, education
- Shortlists 12 matching companies from 35 job listings + 64 PYQ guides
- Each result shows match score, role, location, salary, apply link, PYQ link
- Suggests 4 relevant videos based on company type + domain
- No resume upload or JD paste required — just pick preferences

### SEO Content Engine
- **24 blog posts** targeting high-volume India placement keywords
- **26 company prep guides** (SSG) with interview/OA/resume/process categories
- **Dynamic OG images** for every blog post and prep guide
- JSON-LD structured data: Organization, WebSite, SoftwareApplication, FAQPage, BlogPosting, Article, BreadcrumbList, CollectionPage
- Sitemap + robots.txt auto-generated
- 51 global keywords + ~200 per-post keywords
- Google Search Console verified

### Resume Tools
- ATS resume tailoring from job descriptions (Groq + Gemini)
- Resume builder with live PDF preview
- Cover letter generator
- Resume critique with keyword analysis
- PDF export (clean ATS-friendly)
- Resume version history

### Placement Tracker + Offers
- Track job applications: applied → interview → offer → rejected
- Compare offers side-by-side: CTC, location, role, deadline
- Activity feed and readiness score

### Freelancing (`/dashboard/freelancing`)
- Find clients via Google Maps, Justdial, IndiaMART deep links
- Client pipeline tracker (lead → contacted → proposal → won/lost)
- Pitch message generator

---

## Folder structure

```
Resume-editor/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Public landing
│   ├── layout.tsx                # Root layout + global JSON-LD
│   ├── loading.tsx               # Root loading skeleton
│   ├── not-found.tsx             # 404 (noindex)
│   ├── sitemap.ts                # Auto sitemap (blog + prepare + public)
│   ├── robots.ts                 # Auto robots.txt
│   ├── manifest.ts               # PWA manifest
│   ├── (auth)/                   # Sign-in / sign-up (Google OAuth)
│   ├── dashboard/                # Authenticated workspace (15 sub-routes)
│   │   ├── loading.tsx           # Dashboard-shaped skeleton
│   │   ├── interview/            # Company matcher + PYQs browser
│   │   ├── mock-interview/       # AI voice mock interview
│   │   └── */loading.tsx         # Per-route loading skeletons
│   ├── blog/                     # 24 SEO blog posts (SSG)
│   │   ├── [slug]/opengraph-image.tsx  # Dynamic OG image
│   │   └── loading.tsx
│   ├── prepare/                  # 26 company prep guides (SSG)
│   │   ├── [slug]/opengraph-image.tsx  # Dynamic OG image
│   │   └── loading.tsx
│   ├── pyqs/                     # 64+ company PYQs library
│   ├── mock-interview/           # Mock interview landing
│   ├── downloads/                # Desktop coming soon (noindex)
│   └── api/                      # Backend API routes (34 handlers)
│
├── components/
│   ├── landing/                  # Marketing sections
│   ├── dashboard/                # Workspace UI
│   │   ├── mock-interview-room.tsx     # Mock interview controller
│   │   ├── mock-interview-meet.tsx     # Meet-style UI
│   │   ├── mock-interview-robot.tsx    # SVG robot with 7 moods
│   │   ├── interview-prep-matcher.tsx  # Company shortlist matcher
│   │   ├── company-coding-questions.tsx# PYQs browser
│   │   └── ...
│   └── ui/                       # Shared primitives
│
├── content/                      # Editable SEO & learning content
│   ├── blog/posts.ts             # 24 blog articles
│   ├── companies/pages.ts        # 26 company prep guides
│   ├── coding-questions/         # 64 company PYQ links (typed)
│   └── learning/tracks.ts        # Learner roadmaps + YouTube
│
├── dataset/                      # Extracted data (raw + typed)
│   └── company-coding-questions/
│       ├── raw-data.json         # Full extracted dataset
│       ├── types.ts              # TypeScript types
│       └── README.md
│
├── features/                     # Product modules
│   ├── jobs/                     # Job search
│   ├── freelancing/              # Find clients + pipeline
│   └── ...
│
├── lib/                          # Business logic
│   ├── ai/                       # AI clients + prompts + router
│   │   ├── router.ts             # Task → model routing
│   │   ├── elevenlabs-tts.ts     # Premium voice synthesis
│   │   ├── elevenlabs-voices.ts  # 9 voices + 5 languages
│   │   └── ...
│   ├── data/                     # Data access layer
│   ├── seo.ts                    # SEO config + JSON-LD schemas
│   └── ...
│
├── tests/                        # Vitest tests (45 passing)
├── docs/                         # Internal documentation
└── .data/                        # Local fallback (gitignored)
```

---

## SEO architecture

| Component | Implementation |
|-----------|----------------|
| Sitemap | `app/sitemap.ts` — auto-includes blog + prepare + public routes, daily revalidate |
| Robots | `app/robots.ts` — allows public routes, disallows dashboard/api/downloads |
| Metadata | 10 `export const metadata` + 2 `generateMetadata` (blog, prepare) |
| Canonical | All 9 public routes via `absoluteUrl()` |
| JSON-LD | Organization + WebSite (global in layout), SoftwareApplication + FAQPage (homepage), BlogPosting + BreadcrumbList (blog), Article + BreadcrumbList (prepare), CollectionPage (pyqs, prepare index) |
| OG images | Dynamic `opengraph-image.tsx` for blog + prepare (38 unique images) |
| Keywords | 51 global + ~200 per-post keywords targeting India placement prep |
| Indexable pages | ~58 (24 blog SSG + 26 prepare SSG + 8 public) |
| 404 page | `noindex` (prevents soft-404 indexing) |

---

## Mock interview voice pipeline

```
Question text
  → POST /api/mock-interview/speak (ElevenLabs TTS, 9 voices, 5 languages)
  → Audio plays in browser
  → Mic auto-starts after speech ends (800ms delay)
  → User speaks
  → Web Speech API captures live captions (or Groq Whisper fallback)
  → 5-second silence → auto-submit
  → POST /api/mock-interview (action: answer)
  → AI evaluates → feedback → next question
```

**Voice options**: Rachel, Bella, Elli, Freya, Lily (female) + Antoni, Adam, Sam, Josh (male)
**Languages**: English (en-IN), Hindi (hi-IN), Tamil (ta-IN), Telugu (te-IN), Marathi (mr-IN)
**Browser fallback**: Prioritizes Indian English voices, sentence-chunk splitting for natural pauses, rate 0.92

---

## Where to find all data

### User data (Neon Postgres via Drizzle)

| Data | Access layer | Stored fields |
|------|--------------|---------------|
| Master resume | `lib/data/resumes.ts` | `rawText`, skills, projects, experience, source file path |
| Generated resume | `lib/data/resumes.ts` | `company`, `role`, `atsScore`, `keywords`, `generatedContent`, `status` |
| Interview guide | `lib/data/resumes.ts` | `roadmap`, `codingQuestions`, `companyQuestions`, `freeResources` |
| Mock interview session | `lib/data/mock-interviews.ts` | `turns`, `overallScore`, `durationSeconds`, `company`, `role` |
| Cover letters | `lib/data/cover-letters.ts` | `company`, `role`, `content`, `resumeId` |
| Job applications | `lib/data/applications.ts` | `company`, `role`, `status`, `notes`, `appliedAt` |
| Offers | `lib/data/offers.ts` | `company`, `role`, `ctc`, `location`, `deadline` |

### Static curated data (in repo)

| Content | File | Count |
|---------|------|-------|
| Company PYQs links | `dataset/company-coding-questions/raw-data.json` | 64 companies |
| Company PYQs (typed) | `content/coding-questions/index.ts` | 64 companies |
| Blog posts | `content/blog/posts.ts` | 24 posts |
| Company prep guides | `content/companies/pages.ts` | 26 guides |
| Company profiles | `lib/data/companies.ts` | 21 profiles |
| Job listings | `lib/data/job-listings.ts` | 35 listings |
| Learner tracks | `content/learning/tracks.ts` | 12 tracks |
| Interview prep videos | `content/learning/tracks.ts` | 5 videos |
| Coding platforms | `content/learning/tracks.ts` | 6 platforms |

### AI-generated data (runtime)

Produced by Groq/Gemini/OpenAI via `lib/ai/resume-engine.ts` and `lib/ai/mock-interview.ts`:
- Tailored resume text, ATS scores, keywords
- Interview roadmaps, coding questions, HR questions
- Cover letters and critiques
- Mock interview questions, feedback, session summaries
- Voice synthesis (ElevenLabs) and transcription (Groq Whisper)

Prompts live in `lib/ai/prompts.ts`.

---

## References used in the product

### Practice platforms
- [LeetCode](https://leetcode.com/problemset/) · [HackerRank](https://www.hackerrank.com/domains/algorithms) · [Codeforces](https://codeforces.com/problemset) · [GeeksforGeeks](https://www.geeksforgeeks.org/dsa-roadmap-for-beginner-to-advanced/) · [NeetCode](https://neetcode.io/practice) · [InterviewBit](https://www.interviewbit.com/courses/programming/)

### Job boards (deep-link redirects)
- [LinkedIn Jobs](https://www.linkedin.com/jobs/) · [Naukri.com](https://www.naukri.com/) · [Indeed India](https://in.indeed.com/) · [Instahyre](https://www.instahyre.com/) · [Cutshort](https://cutshort.io/) · [Wellfound](https://wellfound.com/)

### PYQ source
- [Let's Code](https://www.lets-code.co.in) — original company-wise previous year coding question guides
- Extracted from [Google Doc](https://docs.google.com/document/d/1JFyZTIxCKj6Q2UJTOmA3lvhmI99etfBtnsSxCeDX4-o) by Rohit Jadhav

---

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npm run typecheck  # TypeScript check
npm run test       # Vitest (45 tests)
npm run test:watch # Vitest watch mode
```

---

## Pricing

- **Free:** 5 resume generations (per account + per device), unlimited PYQs, unlimited mock interviews
- **Pro:** ₹50/month (UPI) or ₹299/month (Stripe) — unlimited resumes, premium features
- **Admin:** log in as `rjdhav67@gmail.com` → `/dashboard/admin` to manage subscriptions

---

## Copyright

© 2026 Rohit Jadhav — Apply (apply.neexmeet.com). All rights reserved.

Research & data extraction by Rohit Jadhav. Original PYQ question guides curated by Let's Code (lets-code.co.in) / Om Kute.

---

## License

Private project. All rights reserved unless otherwise specified.
