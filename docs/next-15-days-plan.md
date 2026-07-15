# Apply — Next 15 Days (Founder Execution Plan)

> **Product:** apply.neexmeet.com · **Owner:** Rohit Jadhav · **Window:** 15 days from start  
> **Source of truth:** [built-features-phase-two.md](./built-features-phase-two.md) · Folders: [folder-guide.md](./folder-guide.md)  
> **Scope:** **Web only.** Desktop / Tauri = later. Do not start Tauri in this window.

**Rule of the sprint:** Finish Section 1 quality (AI + PDF + tailor UX) first. Ship a thin ecosystem surface (SEO pages + tracker / mock / settings shells that work). Do not rebuild the UI theme.

---

## 1. Product vision one-pager

| | |
|---|---|
| **Wrong** | “AI resume builder” |
| **Right** | **India’s biggest placement preparation platform** |

Apply is the **placement OS** for students and early-career India — not one PDF tool.

```
Resume Builder → ATS → Tailor → Cover Letter → Interview Qs
    → Mock Interview → Placement Tracker → Jobs → Company packs → Offer Compare
```

**How we grow:** Hundreds of company / OA / resume-format SEO pages → Google traffic → signup → Tailor / Interview / Jobs.

**15-day north star outcome:** Users trust tailor + PDF enough to stay; Google can index first company SEO batch; dashboard starts looking like a placement platform (tracker, mock, settings, downloads placeholder) — still web-only.

---

## 2. LIVE today vs ships in 15 days (WEB)

| Surface | LIVE today | Target in 15 days (WEB) |
|---------|------------|-------------------------|
| Auth (Clerk) | Yes | Same (Better Auth = later) |
| Dashboard home | Yes | Smarter “next step” CTA |
| Build Resume Studio | Yes (~60%) | Section refine, less redundant AI, PDF polish |
| Tailor (`/generate`) | Yes (~55%) | Gemini, retry JSON, before/after diff |
| Import / master resume | Yes | Better PDF column extract if time |
| My resumes | Yes | Filter/sort if time |
| PDF export | Yes (~60%) | Skills + page-break consistency |
| ATS analyze | Heuristic | Renamed or Gemini explanation layer |
| Interview prep | Yes | Gemini + validated coding Qs + links |
| Tools (cover / critique / photo) | Yes | Gemini cover letter + **saved history** if feasible |
| Jobs | Static match + links | More listings; bookmarks optional |
| Learners | Static roadmaps | Unchanged OK |
| Billing | Manual UPI Pro ₹50 | Keep; Stripe = later |
| Admin | Yes | Unchanged |
| Blog SEO | Some posts | Expand via company SEO factory |
| **Company SEO pages** | Coming soon / thin | **20–50 pages live** + sitemap |
| **Mock interview** | Coming soon | **Real web MVP** (timed Q + self-rate) |
| **Application / placement tracker** | Coming soon | **Real board** (Mongo OK for 15 days) |
| **Offer comparison** | Coming soon | **Simple compare table** |
| **Settings** | Missing | **Profile / billing links / delete notes** |
| **Downloads** | Missing | **Web placeholder** (“Desktop later”) |
| Desktop / Tauri | Not started | **OUT — do not build** |
| Postgres / Better Auth / Stripe | Not started | **OUT — later** |

---

## 3. Coming soon → REAL web features (this sprint)

| Coming soon | Become | MVP definition (web) | Desktop? |
|-------------|---------|----------------------|----------|
| Mock interview | `/dashboard/mock-interview` | Pick company/role → timed questions from guide API → self-rating + notes saved | Later |
| Placement tracker | `/dashboard/applications` | Jobs: Applied / Interview / Offer / Rejected + notes + date | Later |
| Offer comparison | `/dashboard/offers` | Side-by-side CTC, location, role, deadline (2–4 offers) | Later |
| Settings | `/dashboard/settings` | Profile display, plan status, links to upgrade, account delete path | Later |
| Company SEO | `/companies/[slug]` (+ blog if needed) | Content in `content/`, CTA → tailor / interview | N/A |
| Downloads | `/downloads` | Cards: Windows/macOS “Coming later” + email waitlist optional | Real apps **later** |
| Cover letter history | `/dashboard/cover-letters` or under tools | Save `coverLetter` docs linked to company + resumeId | N/A |

**Explicitly later (not this 15 days):** Tauri desktop, Whisper live assist, Redis, Neon Postgres migration, Better Auth, Stripe Checkout, monorepo move.

---

## 4. Build calendar — 15 days (web)

Assume **consistent daily build** (~4–6 focused hours). Adjust dates when you start; keep **order**.

### Week 1 — Section 1 quality (Days 1–7)

| Day | Focus | Ship |
|-----|--------|------|
| **1** | Foundation + founder ops | Gemini key live; `lib/ai/gemini.ts` + router wired; smoke-test tailor; start Search Console if not done |
| **2** | Tailor quality | Gemini on generate + refine; JSON retry before fallback; less generic output |
| **3** | Tailor UX | Before/after diff on `/dashboard/generate`; ATS label fix (“Keyword match” or Gemini why) |
| **4** | Cover letter + history | Gemini cover letter; save to DB; simple history list |
| **5** | Build studio + PDF | Section-scoped refine; skip redundant AI on manual save; skills/page-break PDF fixes |
| **6** | Interview prep quality | Gemini interview guides; validate coding Qs; LeetCode/GFG/YouTube links |
| **7** | Exit criteria day | 3 real jobs: tailor + build + PDF → founder score **8/10+**; fix biggest failure |

**Week 1 exit:** Section 1 usable enough that new screens don’t shame the core.

### Week 2 — Ecosystem surfaces + SEO (Days 8–14)

| Day | Focus | Ship |
|-----|--------|------|
| **8** | Folder + content factory | `content/companies/` schema; route `/companies/[slug]`; sitemap hook; 5 seed pages |
| **9** | SEO batch | +10–15 company/OA/format pages; internal CTAs to Tailor / Interview |
| **10** | Placement tracker | `/dashboard/applications` board + API (Mongo collections OK) |
| **11** | Mock interview web MVP | `/dashboard/mock-interview` using interview guide data |
| **12** | Offers + settings + downloads | `/dashboard/offers`, `/dashboard/settings`, `/downloads` placeholder |
| **13** | SEO batch finish | Reach **≥20**, stretch **40–50** pages; nav/dashboard links; no theme change |
| **14** | Polish + metrics | Funnel events; broken links; mobile check; founder walkthrough |

### Day 15 — Ship & measure

| Day | Focus | Ship |
|-----|--------|------|
| **15** | Release checklist | Deploy; Search Console submit sitemap; list 10 pages to share; write “what’s live” note; plan next 15 |

---

## 5. Folder structure notes (align with folder-guide)

**Do not** move root into `apps/web`. Keep Phase A.

| New / changed work | Put it here |
|--------------------|-------------|
| Company SEO copy | `content/companies/` (new) — not hard-coded in React |
| Company page routes | Thin `app/companies/[slug]/page.tsx` |
| Tracker / mock / offers | Prefer `features/applications/`, `features/mock-interview/`, `features/offers/` + thin `app/dashboard/...` |
| Downloads page | `app/downloads/page.tsx` + tiny component under `components/` |
| Settings | `app/dashboard/settings/page.tsx` |
| Cover letter save | `models/` + `lib/data/` + tools UI |
| AI Gemini | `lib/ai/gemini.ts`, `lib/ai/router.ts` |
| Sitemap | Extend `app/sitemap.ts` to include company slugs |
| Desktop | `apps/desktop/` — **touch only when later**; leave empty |

**Checklist when adding a feature**

1. `features/<name>/README.md`  
2. Thin `app/dashboard/<route>/page.tsx`  
3. API under `app/api/...` + Zod in `lib/validations.ts`  
4. One line in `built-features-phase-two.md` when stable  

---

## 6. Founder setup checklist — APIs / keys / accounts

Do these on **your** accounts (not only in code). Mark when done.

| # | Account / key | Needed for | When | Status |
|---|---------------|------------|------|--------|
| 1 | **Gemini API key** (`GEMINI_API_KEY`) | Tailor, refine, cover letter, interview | Day 1 | ☐ |
| 2 | Confirm **Groq** key still valid | Fallback + speed paths | Day 1 | ☐ |
| 3 | **OpenAI** (optional) | Photo tool only — skip if cost-sensitive | Optional | ☐ |
| 4 | **Clerk** dashboard | Auth, production domains | Already | ☐ |
| 5 | **MongoDB Atlas** (or current URI) | All user data; new tracker/covers | Already + Day 10 | ☐ |
| 6 | **Google Search Console** + domain verify | SEO indexing | Day 1–2 | ☐ |
| 7 | **Google Analytics / Plausible / Umami** | Organic + activation metrics | Week 2 | ☐ |
| 8 | **Resend** (or SMTP) | Onboarding / alerts — can wait until tracker reminders | Later / stretch | ☐ |
| 9 | **Adzuna** API key | Live jobs (optional P2) | After listings OK | ☐ |
| 10 | **HeroHunt** (if using) | Job/enrichment experiments | Optional | ☐ |
| 11 | **Stripe** | Auto billing | **After** this sprint | ☐ later |
| 12 | **UploadThing** | Photo uploads | Already if used | ☐ |
| 13 | Production env on host (Vercel/etc.) | Ship Day 15 | Ongoing | ☐ |
| 14 | WhatsApp / UPI QR for Pro | Manual billing still | Keep current | ☐ |

**Day-1 minimum:** Gemini + Search Console + confirm Groq/Mongo/Clerk production env.

---

## 7. Google traffic plan — first SEO company pages

**Template every page:** (1) answer the query (2) “How Apply helps for this company” (3) CTA → Tailor or Interview (4) 2–4 related company links.

### Batch A — must ship first (~20)

| # | Page intent (title angle) | Suggested slug idea | CTA push |
|---|---------------------------|---------------------|----------|
| 1 | TCS Interview Questions 2026 | `tcs-interview-questions` | Interview |
| 2 | Infosys Resume Format | `infosys-resume-format` | Tailor / Build |
| 3 | Amazon OA Questions | `amazon-oa-questions` | Interview + Learners |
| 4 | Capgemini Hiring Process | `capgemini-hiring-process` | Jobs + Tailor |
| 5 | Microsoft Internship Guide | `microsoft-internship` | Jobs + Tailor |
| 6 | Google STEP Resume | `google-step-resume` | Tailor |
| 7 | Wipro Technical Interview | `wipro-technical-interview` | Interview |
| 8 | Cognizant Aptitude Questions | `cognizant-aptitude` | Learners + Interview |
| 9 | Accenture Resume Template | `accenture-resume` | Build / Tailor |
| 10 | Morgan Stanley OA | `morgan-stanley-oa` | Interview + Tailor |
| 11 | JP Morgan Interview Experience | `jp-morgan-interview` | Interview + Cover |
| 12 | Deloitte Interview Questions | `deloitte-interview-questions` | Interview |
| 13 | IBM Resume Format | `ibm-resume-format` | Tailor |
| 14 | Oracle Campus Hiring | `oracle-campus-hiring` | Jobs |
| 15 | Zoho Interview Process | `zoho-interview` | Interview |
| 16 | Freshworks OA / Interview | `freshworks-interview` | Interview |
| 17 | Flipkart Interview Questions | `flipkart-interview` | Interview |
| 18 | PhonePe SDE Interview | `phonepe-sde-interview` | Interview |
| 19 | Razorpay Interview Guide | `razorpay-interview` | Interview |
| 20 | TCS NQT Preparation | `tcs-nqt-preparation` | Learners + Interview |

### Batch B — stretch to ~40–50

| # | Page intent | # | Page intent |
|---|-------------|---|-------------|
| 21 | Infosys Certification / HackWithInfy prep | 22 | Amazon SDE Internship India |
| 23 | Microsoft Imagine Cup / intern OA | 24 | Google interview experience (India) |
| 25 | Adobe OA questions | 26 | Cisco interview questions |
| 27 | Samsung R&D interview | 28 | Qualcomm interview guide |
| 29 | Goldman Sachs OA | 30 | Barclays interview questions |
| 31 | Deutsche Bank campus | 32 | Wells Fargo interview |
| 33 | LTIMindtree hiring process | 34 | HCLTech interview questions |
| 35 | Tech Mahindra aptitude | 36 | Persistent Systems interview |
| 37 | Atlassian internship India | 38 | Uber interview questions |
| 39 | Swiggy / Blinkit SDE | 40 | Meesho interview |
| 41 | Paytm interview questions | 42 | CRED interview guide |
| 43 | Groww / Zerodha OA | 44 | Byju’s / edtech (optional) |
| 45 | Capgemini Exceller | 46 | Accenture assessment pack |
| 47 | Cognizant GenC / Next | 48 | Wipro Elite NTH |
| 49 | Infosys SE / SES resume | 50 | “Service-based vs product” placement FAQ hub |

**Cadence:** Days 8–9 = Batch A skeleton; Day 13 = Batch B fill. Measure impressions after GSC crawl (slow — start indexing Day 15).

---

## 8. UX principle (do not change theme)

**One clear action per screen.**

| Screen | Primary action |
|--------|----------------|
| Dashboard | One “next step” (Build / Tailor / Interview / Track) |
| Tailor | Generate tailored resume |
| Mock | Start / next question |
| Applications | Add application or update status |
| Company SEO | Start prep with Apply (signup or Tailor) |
| Downloads | Join waitlist / return to dashboard |

- Keep existing colors, fonts, component system. **No theme redesign.**  
- Prefer fewer cards and fewer side CTAs.  
- Coming-soon chips become real nav items only when the page works.

---

## 9. Extension-ready note (desktop → maybe browser extension later)

Desktop may become a **browser extension** later instead of (or before) full Tauri.

**While building web APIs this sprint:**

| Do | Don’t |
|----|--------|
| Auth’d JSON APIs with clear Zod schemas | Browser-only secrets for AI |
| Return stable shapes (`questions[]`, `applications[]`) | Couple logic only to React pages |
| Keep `/api/interview`, tracker, cover letter reusable | Put keys in client bundles |
| Document routes in feature README | Special-case desktop-only payloads yet |

Tauri `/api/desktop/*` stays **out of scope**. Extension will call the same web APIs you harden now.

---

## 10. Success metrics (15 days)

| Metric | Target | Why |
|--------|--------|-----|
| Founder quality score (3 real tailor+PDF runs) | **≥ 8/10** | Section 1 exit |
| Gemini wired on tailor + cover + interview | **Done** | Quality unlock |
| Before/after tailor diff | **Live** | Trust |
| Cover letters persisted | **Yes** (or explicit stretch fail) | Retention |
| Company SEO pages indexed in sitemap | **≥ 20** (stretch 40–50) | Flywheel start |
| Mock interview (web) | **Usable MVP** | Ecosystem signal |
| Placement tracker | **Usable MVP** | Placement OS |
| Offer compare + settings + `/downloads` | **Live shells that work** | Platform feel |
| UI theme rewrite | **0** | Focus |
| Desktop / Tauri code started | **0** | Scope control |
| Organic sessions from SEO (early) | Track baseline | GSC may lag |
| Signups → first tailor ≤ 24h | Measure | Activation |
| Paid conversion | Monitor only | Stripe later |

---

## Top risks (keep short)

| Risk | Mitigation |
|------|------------|
| Scope creep into desktop / Postgres | This doc — web only |
| SEO pages without quality core | Week 1 before Week 2 |
| Gemini key / billing surprise | Cap usage; keep Groq fallback |
| Content thin → Google ignores | Answer intent fully; internal links; real CTAs |

---

## Related docs

| Doc | Use |
|-----|-----|
| [built-features-phase-two.md](./built-features-phase-two.md) | Full feature quality + Phase 2 backlog |
| [folder-guide.md](./folder-guide.md) | Where code/content live |
| [futureupgradation.md](./futureupgradation.md) | Infra migrations after this sprint |

---

## What’s done / What’s left (July 2026 — post Web Phase 2)

### What’s done (WEB — live for students)

| Area | Status |
|------|--------|
| Tailor / resume builder, resume list, PDF, ATS, tools | Live |
| Interview prep, Jobs, Learners, Freelancing, Analytics, Billing (UPI) | Live |
| **Mock interview** `/dashboard/mock-interview` | Live (works even if Mongo is down; history may not persist) |
| **Applications tracker** `/dashboard/applications` | Live (empty list + toast if Mongo down on save) |
| **Offer compare** `/dashboard/offers` | Live (same graceful offline pattern) |
| **Settings** `/dashboard/settings` | Live |
| **Company SEO** `/prepare` + 13 slug pages + sitemap | Live; CTAs → Tailor / Interview / Jobs / Mock |
| **Downloads** `/downloads` | Live placeholder — Download shows **Coming Soon**, no fake installer |
| **`/desktop` → `/downloads`** | Redirect live |
| Landing + dashboard nav | Live Phase 2 surfaces 1–2 clicks away; Desktop clearly marked Soon |

### What’s left (honest leftovers only)

| Item | Owner note |
|------|------------|
| **Apply Desktop / Tauri Interview Copilot** | Out of scope — waitlist on `/downloads` only |
| **Founder keys / ops** | Gemini (and other AI) keys on Vercel; Mongo URI for persistence; Clerk already required for dashboard |
| **Stripe Checkout** | Later — UPI Pro remains |
| **Referral / affiliate** | Later |
| **Deeper in-dashboard company packs** | SEO `/prepare` guides are live; richer dashboard packs later |
| **More SEO pages** (toward 20–50) | Content factory — 13 live today; expand as founder time allows |
| **Legal pages** (Privacy / Terms) | Still placeholders if re-added — not shipped this pass |
| **Cover-letter history** stretch | Optional stretch from Week 1 plan — verify if already under Tools |
| **Section 1 quality** (tailor/PDF “8/10”) | Ongoing founder scoring — not blocked by Phase 2 surfaces |

### Founder “don’t forget” keys

1. `MONGODB_URI` — tracker / offers / mock history persistence  
2. Gemini (or current AI) keys — tailor / interview quality  
3. Clerk keys — dashboard auth  
4. Search Console — submit `/prepare` sitemap when ready  

---

### Fixed after review (July 15, 2026)

- Dashboard toolkit → card grid (no long “live today” dump); Cover letter + Compare offers nested under AI tools / Applications
- Sidebar: no top-level Offers; AI tools → `/dashboard/tools` (cover at `?tool=cover`)
- Mock interview: route-aware shell title + exact Home active match so `/dashboard/mock-interview` does not feel like Overview
- Keyword-match labeling (was misleading “ATS”), `next/image` on YouTube grid, Phase 2 APIs in Clerk middleware matcher
- Still founder/later: Gemini key + router, cover history DB, tailor diff/refine, tests, legal, Stripe/Postgres/Desktop

---

*Apply · Next 15 days · Web placement-platform sprint · Founder execution · July 2026*
