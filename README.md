# Apply

Apply is an AI-powered job-search workspace for **students and early-career developers worldwide**. Upload or build a resume, tailor it to any role, follow learner roadmaps, prepare for interviews, and track readiness from one dashboard.

---

## Use cases

| Who | Goal | Where to go |
|-----|------|-------------|
| Student with no resume | Answer guided questions and get a PDF | `/dashboard/build` |
| Student with a resume | Upload PDF/Word and tailor to a job | `/dashboard/generate` |
| 1st–4th year learner | Follow roadmaps before placement season | `/dashboard/learners` |
| Interview candidate | Coding, HR, company Qs + video resources | `/dashboard/interview` |
| Active job seeker | Find jobs matched to resume profile | `/dashboard/jobs` |
| Job hunter | Track ATS scores and activity | `/dashboard/analytics` |
| Returning user | See recent resumes and readiness | `/dashboard` |

**Typical flow:** Build or improve resume → **see matched jobs** → apply on LinkedIn/Naukri → create interview prep plan → export PDF.

---

## Tech stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | **Next.js 15** (App Router) | Pages, API routes, SSR |
| UI | **React 19**, **TypeScript** | Components and type safety |
| Styling | **Tailwind CSS**, **Framer Motion** | Layout, motion |
| Icons | **Phosphor Icons** | Dashboard and landing UI |
| Primitives | **Radix Slot**, **CVA**, **clsx** | Button variants, utilities |
| Auth | **Clerk** (`@clerk/nextjs`) | Sign-in, protected routes |
| Database | **MongoDB** + **Mongoose** | User resumes, guides, master resume |
| Fallback storage | Local JSON (`.data/resume-store.json`) | Dev/resilience when MongoDB is down |
| AI | **Groq** (primary), **OpenAI** (fallback) | Resume tailoring, interview guides, cover letters |
| Validation | **Zod** | API request schemas |
| PDF | **@react-pdf/renderer**, **pdf-lib**, **puppeteer-core** | Generate and patch PDFs |
| File import | **pdf-parse**, **mammoth**, **word-extractor** | Extract text from uploads |
| Uploads | **UploadThing** | Profile photo uploads |
| Toasts | **Sonner** | In-app notifications |
| Analytics | **Umami** (optional) | Public site traffic |

---

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Required environment variables

| Variable | Used for |
|----------|----------|
| `MONGODB_URI` | Persist resumes and interview guides |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` | Authentication |
| `GROQ_API_KEY`, `GROQ_MODEL` | AI generation (recommended) |
| `OPENAI_API_KEY` | Optional AI fallback |
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

| Route | Description |
|-------|-------------|
| `/` | Public landing page |
| `/dashboard` | Overview, readiness score, quick actions, activity |
| `/dashboard/resumes` | All saved resume versions |
| `/dashboard/build` | Guided resume builder with live side-by-side preview |
| `/dashboard/generate` | Upload resume + company search + tailor to job |
| `/dashboard/jobs` | **Job search** — profile-based matches + LinkedIn/Naukri links |
| `/dashboard/learners` | Student roadmaps (Web Dev, DSA, System Design, AI/ML) |
| `/dashboard/interview` | Interview prep plan, coding Qs, YouTube videos |
| `/dashboard/tools` | Cover letter, PDF editing, photo tools |
| `/dashboard/analytics` | ATS stats, keyword coverage, activity feed |
| `/blog/*` | SEO blog posts |

---

## API routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/company/lookup?q=` | Company autocomplete and profile lookup |
| `GET` | `/api/jobs/match` | Job matches from saved resume profile |
| `GET` | `/api/jobs/profile` | Inferred job seeker profile only |
| `POST` | `/api/resumes/build` | Build resume from guided form |
| `POST` | `/api/resumes/generate` | Tailor uploaded resume to job |
| `POST` | `/api/resumes/import` | Upload and extract resume file |
| `GET/POST` | `/api/resumes/master` | Load/save master resume text |
| `PATCH` | `/api/resumes/:resumeId` | Update generated resume |
| `POST` | `/api/interview` | Generate interview prep guide |
| `POST` | `/api/cover-letter` | Generate cover letter |
| `POST` | `/api/critique` | ATS critique |
| `POST` | `/api/photo` | Professional photo plan |
| `GET/POST` | `/api/pdf` | Render or download PDF |
| `GET` | `/api/health` | Health check |

All dashboard APIs are protected by Clerk middleware.

---

## Folder structure (learning guide)

Read the repo top-down in this order if you are new to the codebase.

```
Resume-editor/
├── app/                          # Next.js App Router — start here for routes
│   ├── page.tsx                  # Public landing
│   ├── layout.tsx                # Root layout, Clerk, Umami
│   ├── (auth)/                   # Sign-in / sign-up (Clerk)
│   ├── dashboard/                # Authenticated workspace pages
│   │   ├── page.tsx              # Overview + readiness
│   │   ├── build/                # Build resume page
│   │   ├── generate/             # Improve resume page
│   │   ├── jobs/                 # Job search page
│   │   ├── learners/             # Learner preparation page
│   │   ├── interview/            # Interview prep page
│   │   ├── analytics/            # Analytics page
│   │   ├── resumes/              # Resume list
│   │   └── tools/                # AI tools workspace
│   ├── api/                      # Backend API routes
│   │   ├── company/lookup/       # Company search API
│   │   ├── jobs/                 # Job match + profile API
│   │   ├── resumes/              # Resume CRUD + build + generate
│   │   ├── interview/            # Interview guide generation
│   │   ├── pdf/                  # PDF rendering
│   │   └── …                     # cover-letter, critique, photo, health
│   └── blog/                     # SEO blog pages
│
├── components/
│   ├── landing/                  # Marketing sections (public site)
│   ├── dashboard/                # Workspace UI — main product surface
│   │   ├── dashboard-shell.tsx   # Sidebar navigation
│   │   ├── dashboard-overview.tsx# Hero, activity feed, keyword charts
│   │   ├── company-search-input.tsx
│   │   ├── learner-prep-workspace.tsx
│   │   ├── youtube-video-grid.tsx
│   │   ├── interview-guide-form.tsx
│   │   ├── resume-builder/       # Build resume form
│   │   └── resume-improve/       # Improve resume form
│   └── ui/                       # Shared primitives (Button, Card, Input…)
│
├── content/                      # ✨ Editable SEO & learning copy (intern-friendly)
│   ├── blog/posts.ts             # Blog articles → /blog
│   └── learning/tracks.ts        # Learner roadmaps + YouTube links
│
├── features/                     # Product modules — each has README.md
│   ├── jobs/                     # Job Search (full module)
│   ├── freelancing/              # Find clients
│   ├── resume-studio/            # Build resume (map → components + lib)
│   ├── resume-tailor/            # Upload & tailor
│   ├── interview-prep/
│   ├── learning/
│   ├── ai-tools/
│   ├── billing/
│   └── analytics/
│
├── apps/                         # 🔜 Future: web (root today) + desktop (Tauri)
├── packages/                     # 🔜 Future: db, shared, ai (Postgres migration)
├── services/                     # 🔜 Future: realtime WebSocket
│
├── lib/                          # Business logic — read after app/
│   ├── ai/                       # AI client, prompts, resume engine
│   ├── data/                     # MongoDB services + static data
│   │   └── learning-resources.ts # Re-exports content/learning/tracks.ts
│   ├── pdf/
│   └── …
│
├── models/                       # Mongoose schemas
├── types/index.ts
├── docs/                         # Internal documentation
│   ├── folder-guide.md           # Master folder map
│   ├── WHERE-TO-EDIT.md          # Quick edit cheat sheet
│   ├── intern-onboarding.md      # Day 1 for new contributors
│   ├── built-features-phase-two.md
│   └── futureupgradation.md
└── .data/                        # Local fallback (gitignored)
```

**Full tree:** see [docs/folder-guide.md](docs/folder-guide.md)

### Suggested reading order for contributors

1. `docs/intern-onboarding.md` — Day 1 guide for new contributors
2. `docs/WHERE-TO-EDIT.md` — quick cheat sheet (what file to change)
3. `docs/futureupgradation.md` — roadmap: Postgres, Better Auth, desktop app
4. `docs/built-features-phase-two.md` — what's built, quality upgrades, Phase 2
5. `docs/folder-guide.md` — full architecture map
6. `docs/system-design.md` — product flows
7. `features/jobs/README.md` — job search walkthrough

---

## Where to find all data

### User data (MongoDB / local fallback)

| Data | Model | Access layer | Stored fields |
|------|-------|--------------|---------------|
| Master resume | `models/MasterResume.ts` | `lib/data/resumes.ts` | `rawText`, skills, projects, experience, source file path |
| Generated resume | `models/GeneratedResume.ts` | `lib/data/resumes.ts` | `company`, `role`, `atsScore`, `keywords`, `generatedContent`, `status` |
| Interview guide | `models/InterviewGuide.ts` | `lib/data/resumes.ts` | `roadmap`, `codingQuestions`, `companyQuestions`, `freeResources`, etc. |

Local fallback path: `RESUME_LOCAL_STORE_PATH` or `.data/resume-store.json` (see `lib/data/resumes.ts`).

### Static curated data (in repo)

| Content | File | Used in |
|---------|------|---------|
| Company profiles (20+ companies) | `lib/data/companies.ts` | Improve flow, Interview prep, `GET /api/company/lookup` |
| Job listings (25+ openings) | `lib/data/job-listings.ts` | Job Search matcher, `/dashboard/jobs` |
| Job seeker profile (derived) | `features/jobs/lib/build-profile.ts` | Built from master/generated resume — not stored separately |
| Learner tracks & roadmaps | `content/learning/tracks.ts` | `/dashboard/learners` |
| YouTube video IDs & metadata | `content/learning/tracks.ts` | Interview prep, Learner prep |
| Course links (Google, Coursera, etc.) | `content/learning/tracks.ts` | Interview prep, Learner prep |
| Coding platform links | `content/learning/tracks.ts` | Interview resources, Learner prep |
| Dashboard stats helpers | `lib/data/resumes.ts` → `buildDashboardStats`, `buildActivityFeed`, `buildReadinessScore` | Overview, Analytics |
| Blog posts | `content/blog/posts.ts` | `/blog` |
| SEO metadata | `lib/seo.ts` | Public pages |

### AI-generated data (runtime)

Produced by Groq/OpenAI via `lib/ai/resume-engine.ts` and saved through `lib/data/resumes.ts`:

- Tailored resume text, ATS scores, keywords
- Interview roadmaps, coding questions, HR questions
- Cover letters and critiques

Prompts live in `lib/ai/prompts.ts`.

---

## References used in the product

Curated links and media embedded in the app (not external dependencies). Full lists are in `lib/data/learning-resources.ts` and `lib/data/companies.ts`.

### Practice platforms

- [LeetCode](https://leetcode.com/problemset/)
- [HackerRank](https://www.hackerrank.com/domains/algorithms)
- [Codeforces](https://codeforces.com/problemset)
- [GeeksforGeeks DSA Roadmap](https://www.geeksforgeeks.org/dsa-roadmap-for-beginner-to-advanced/)
- [NeetCode](https://neetcode.io/practice)
- [InterviewBit](https://www.interviewbit.com/courses/programming/)
- [Kaggle Learn](https://www.kaggle.com/learn)
- [Hugging Face Learn](https://huggingface.co/learn)

### Courses & learning paths

- [freeCodeCamp](https://www.freecodecamp.org/learn/) — web, JS, backend certifications
- [Google ML Crash Course](https://developers.google.com/machine-learning/crash-course)
- [Google IT Support Certificate](https://www.coursera.org/professional-certificates/google-it-support) (Coursera)
- [Meta Front-End Developer](https://www.coursera.org/professional-certificates/meta-front-end-developer) (Coursera)
- [Stanford Algorithms Specialization](https://www.coursera.org/specializations/algorithms) (Coursera)
- [Deep Learning Specialization](https://www.coursera.org/specializations/deep-learning) (DeepLearning.AI)
- [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript)
- [Full Stack Open](https://fullstackopen.com/en/) (University of Helsinki)
- [Educative – Grokking System Design](https://www.educative.io/courses/grokking-the-system-design-interview)
- [Educative – Grokking Coding Interview](https://www.educative.io/courses/grokking-the-coding-interview)

### YouTube channels & videos (embedded by video ID)

Thumbnails served from `https://img.youtube.com/vi/{id}/mqdefault.jpg`. Featured creators include:

- **freeCodeCamp** — HTML/CSS, JavaScript, React, DSA, Node.js, ML
- **Traversy Media** — Web dev roadmaps, crash courses
- **Gaurav Sen** — System design interviews
- **NeetCode** — Blind 75, dynamic programming
- **Clément Mihailescu** — Google coding interview walkthrough
- **3Blue1Brown** — Neural networks
- **Fireship** — Quick tech intros
- **Andrej Karpathy** — LLM / ChatGPT explained

Specific video IDs are listed in `interviewPrepVideos` and each `learnerTracks[].videos` in `lib/data/learning-resources.ts`.

### Company reference data

Interview style, hiring focus, and common roles for companies such as Google, Amazon, Microsoft, TCS, Infosys, Wipro, Flipkart, Razorpay, Zoho, Meta, and others — maintained manually in `lib/data/companies.ts`.

### Job board references (Job Search redirects)

Apply deep-links users to search/apply on these platforms (no scraping):

- [LinkedIn Jobs](https://www.linkedin.com/jobs/)
- [Naukri.com](https://www.naukri.com/)
- [Indeed India](https://in.indeed.com/)
- [Glassdoor India](https://www.glassdoor.co.in/)
- [Instahyre](https://www.instahyre.com/)
- [Cutshort](https://cutshort.io/)
- [Wellfound](https://wellfound.com/)

URL builders live in `features/jobs/lib/platform-links.ts`. Curated listings in `lib/data/job-listings.ts`.

### Documentation references

- [Next.js App Router docs](https://nextjs.org/docs/app)
- [Clerk Next.js integration](https://clerk.com/docs/quickstarts/nextjs)
- [Mongoose docs](https://mongoosejs.com/docs/)
- [Groq API](https://console.groq.com/docs)
- [React PDF Renderer](https://react-pdf.org/)

---

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npm run typecheck  # TypeScript check
```

---

## Pricing placeholder

- **Free:** up to 5 resume generations worldwide (per account + per device)
- **Pro:** affordable monthly plan — UPI for INR, contact support for other regions
- **Admin:** log in as `rjdhav67@gmail.com` → `/dashboard/admin` to add subscription days after payment

### Vercel deploy blocked?

If you see *“commit author did not have contributing access”* on Hobby + private repo, follow **[docs/vercel-deploy.md](docs/vercel-deploy.md)** — verify `rjdhav67@gmail.com` on GitHub and reconnect Vercel to account **Rohit94r**.

---

## License

Private project. All rights reserved unless otherwise specified.
