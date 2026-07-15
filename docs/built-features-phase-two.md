# Apply — Built Features & Phase 2 Plan

> **apply.neexmeet.com** · Founder: Rohit Jadhav · CTO execution doc · July 2026  
> **Rule:** Finish Section 1 quality upgrades first (~50% → 100%). Then start Section 2 new features / ecosystem.

**Related docs:** [futureupgradation.md](./futureupgradation.md) · [system-design.md](./system-design.md) · [folder-guide.md](./folder-guide.md) · [next-15-days-plan.md](./next-15-days-plan.md) (current 15-day web sprint)

---

## North Star — what Apply becomes

**Do not think:** “AI Resume Builder.”  
**Think:** **India’s biggest placement preparation platform.**

That changes everything — positioning, SEO, product surface, pricing, and what we build next.

| Wrong framing | Right framing |
|---------------|---------------|
| One tool (tailor PDF) | Full placement ecosystem |
| One landing page | Hundreds of company / exam / process pages |
| Traffic → “try resume AI” | Traffic → prepare for **this company** → enter Apply funnel |
| Compete with ChatGPT resume prompts | Own placement journey end-to-end |

Apply wins **not only** because of resume tailoring — because of the **ecosystem** around it.

### The ecosystem (product loop)

```
Resume Builder
    ↓
ATS Checker
    ↓
Resume Tailoring
    ↓
Cover Letter
    ↓
Interview Questions (company-specific)
    ↓
Mock Interview
    ↓
Desktop Interview Assistant
    ↓
Placement Tracker
    ↓
Job Applications
    ↓
Company Preparation packs
    ↓
Offer Comparison
```

At that point Apply is **not a tool**. It is the **placement OS** for students and early-career India.

### SEO content engine — hundreds of pages, not one homepage

Instead of one marketing page, ship **programmatic + editorial SEO pages**. Every page ranks for a search intent, then CTA → signup / Tailor / Interview / Jobs.

| Example page | Intent | Push user into |
|--------------|--------|----------------|
| TCS Interview Questions 2026 | Company prep | Interview prep + Tailor |
| Infosys Resume Format | Resume format | AI Resume Builder |
| Amazon OA Questions | Online assessment | Learner + Interview |
| Capgemini Hiring Process | Process guide | Jobs + Tailor |
| Microsoft Internship Guide | Internship | Jobs + Tailor |
| Google STEP Resume | Role-specific resume | Tailor |
| Wipro Technical Interview | Tech round | Interview prep |
| Cognizant Aptitude Questions | Aptitude | Learner tracks |
| Accenture Resume Template | Template | Resume Builder |
| Morgan Stanley OA | Finance OA | Interview + Tailor |
| JP Morgan Interview Experience | Experience blog | Interview + Cover letter |

**Flywheel:** Every page brings Google traffic → every page pushes users into Apply → more usage → more content / company packs → more traffic.

Routes (target): `/blog/...` today · later `/companies/[slug]`, `/interview-questions/[company]`, `/resume-format/[company]`, `/oa/[company]`.

Content lives in `content/` (editable) — not hard-coded in React. Aligns with [folder-guide.md](./folder-guide.md).

### Competitive note (context, not a clone)

Products like InterviewLift prove demand for **desktop interview assist + company packs + high-ticket coaching**. Apply’s path is different: **free/cheap AI placement platform + SEO ecosystem + desktop practice mode**, then Premium — not ₹24k–96k coach packages on day one.

---

## How to use this document

| Section | Purpose | When |
|---------|---------|------|
| **North Star** | Positioning — platform + SEO ecosystem (above) | Always — decisions filter through this |
| **Section 1** | Features already built — how they work, APIs, quality gaps | **Now** — improve output before adding new scope |
| **Section 2** | Phase 2 — new features, SEO pages, desktop, tracker, infra | **After** Section 1 core AI + PDF quality is solid |

### Quality scale (used in Section 1)

| Score | Meaning |
|-------|---------|
| **90–100%** | Production-ready, users get consistent great output |
| **70–89%** | Works well, minor polish needed |
| **50–69%** | Feature exists, output inconsistent or UX gaps |
| **Below 50%** | Scaffold only — needs major work |

**Current overall product quality: ~55%** — engine is there, AI output and PDF fidelity need the most work.

---

# SECTION 1 — Built Features (Improve First)

---

## 1. Authentication & account

| | |
|---|---|
| **Page** | `/login`, `/register`, Clerk components in layout |
| **Quality today** | **85%** — stable, not the bottleneck |
| **Stack** | Clerk (`@clerk/nextjs`), `middleware.ts`, `lib/auth.ts` |

### How it works

```
User signs in via Clerk
  → middleware protects /dashboard/* and /api/*
  → getCurrentUserId() in API routes resolves Clerk userId
  → Mongo User record created on first billing/feature use (ensureUser)
```

### APIs

| Method | Route | Purpose |
|--------|-------|---------|
| — | Clerk hosted | Login, OAuth, session |

### Upgrade for quality (Section 1)

| Priority | Task | Why |
|----------|------|-----|
| P2 | Add `/dashboard/settings` (profile, email, delete account) | Users expect account management |
| P3 | Migrate to Better Auth (Section 2) | Not a quality fix — infra upgrade later |

---

## 2. Dashboard overview

| | |
|---|---|
| **Page** | `/dashboard` |
| **Quality today** | **75%** |
| **Files** | `app/dashboard/page.tsx`, `components/dashboard/dashboard-overview.tsx` |

### How it works

```
Server loads: generated resumes, interview guides, job matches
  → buildDashboardStats(), buildReadinessScore(), buildActivityFeed()
  → Renders hero, quick actions, recent resumes, job preview
```

### APIs used (read-only)

| Data | Source |
|------|--------|
| Resumes | `lib/data/resumes.ts` → Mongo `GeneratedResume` |
| Guides | `lib/data/resumes.ts` → Mongo `InterviewGuide` |
| Jobs | `GET /api/jobs/match` via `getJobMatchesForUser()` |

### Upgrade for quality

| Priority | Task |
|----------|------|
| P2 | Show real “next step” CTA from user state (no resume → build; has resume → tailor) |
| P3 | Link activity feed to actual `UserActivity` events (partially tracked today) |

---

## 3. Build Resume Studio

| | |
|---|---|
| **Page** | `/dashboard/build` |
| **Quality today** | **60%** — editor good, AI + PDF still improving |
| **Files** | `components/dashboard/resume-studio/*`, `lib/resume-studio/*` |

### How it works

```
User edits structured sections (Personal, Summary, Experience, Projects, Skills, Education, Achievements)
  → Auto-save draft to master profile (POST /api/resumes/master)
  → Live PDF preview via POST /api/pdf (structured payload from documentToPdfPayload)
  → Manual Save → buildResumeFromDocument + patchResume
  → AI prompt / per-section Improve → refineResume → merge back into editor
```

### API flow

```
POST /api/resumes/master     → upsert master profile text
POST /api/resumes/build      → AI build + save GeneratedResume (counts toward free limit)
POST /api/resumes/refine     → AI refine by prompt
PATCH /api/resumes/[id]      → save editor state to generated resume
POST /api/pdf                → render PDF from structured sections (preview/download)
```

### Data

| Store | Field |
|-------|-------|
| `MasterResume` | `rawText`, `title`, `sourceName` |
| `GeneratedResume` | `generatedContent.afterText`, `skills`, `bullets`, `atsScore`, `template` |

### Known quality gaps

1. **AI refine re-parses plain text** — section structure can drift after AI edit (`mergeParsedDocument` + `parseResumeText`)
2. **Per-section AI** uses same refine API as full-doc — no section-scoped prompt in API
3. **build API** still runs full `buildStudentResume` AI even when user already filled editor manually
4. **PDF** improved with structured sections but complex multi-column layouts still flatten

### Upgrade checklist (target 90%+)

| Priority | Task | Files |
|----------|------|-------|
| **P0** | Section-aware refine API — send only one section + context | `app/api/resumes/refine`, `lib/validations` |
| **P0** | Skip AI on manual save when document unchanged — PATCH only | `use-resume-editor.ts`, `lib/resume-studio/api.ts` |
| **P0** | Gemini Flash for long resume edits (better context than Groq) | `lib/ai/gemini.ts`, `lib/ai/router.ts` |
| P1 | Undo/redo stack for AI edits | `use-resume-editor.ts` |
| P1 | Template preview thumbnails (Classic / Modern / Compact) | `preview-panel.tsx` |
| P2 | Import existing PDF into studio sections (parse upload → sections) | `import` + `masterResumeToDocument` |

---

## 4. Tailor resume (upload + job match)

| | |
|---|---|
| **Page** | `/dashboard/generate` |
| **Quality today** | **55%** — biggest revenue feature, output inconsistent |
| **Files** | `components/dashboard/resume-improve/generate-resume-form.tsx`, `app/api/resumes/generate/route.ts` |

### How it works

```
1. User uploads resume → POST /api/resumes/import (PDF/DOC/DOCX/TXT/MD/RTF)
2. Text + layout lines extracted → saved as MasterResume
3. User enters company, role, JD, optional prompt
4. POST /api/resumes/generate
   → generateTailoredResume() in lib/ai/resume-engine.ts
   → Groq/OpenAI JSON response OR deterministic fallback
   → Section-aware rewrite merge in generate route
   → Saved as GeneratedResume with before/after text + ATS scores
5. Preview PDF: GET /api/pdf?resumeId=...&preview=1
6. Post-tailor actions → cover letter, interview prep, refine chips
```

### APIs

| Method | Route | Body / params |
|--------|-------|---------------|
| POST | `/api/resumes/import` | `multipart/form-data` file |
| POST | `/api/resumes/generate` | `{ company, role, jobDescription, masterResume, prompt? }` |
| POST | `/api/resumes/refine` | `{ resumeId, prompt, jobDescription? }` |
| POST | `/api/resumes/analyze` | `{ resumeText, jobDescription, role }` |
| GET | `/api/pdf` | `resumeId`, `mode=before\|after`, `template`, `preview=1` |

### AI engine

```
lib/ai/resume-engine.ts → generateTailoredResume()
  → resumeTailoringPrompt() in lib/ai/prompts.ts
  → getTextAIClient() → Groq llama-3.3-70b (or OpenAI fallback)
  → fallbackResume() deterministic rewrite if AI fails or JSON bad
  → analyzeResumeAts() heuristic keyword scoring
```

### Known quality gaps

1. **Groq-only** — long JD + long resume hits context/quality limits; no Gemini yet
2. **Deterministic fallback** often wins when AI JSON parse fails → generic bullets
3. **ATS score** is keyword overlap heuristic, not real ATS parser — scores feel arbitrary
4. **Uploaded PDF layout** preserved on export but **tailoring rewrites text** — visual mismatch possible
5. **Refine chips** work but need job context passed every time

### Upgrade checklist (target 90%+)

| Priority | Task |
|----------|------|
| **P0** | Add Gemini 1.5 Flash for `generateTailoredResume` + `refineGeneratedResume` |
| **P0** | Stricter JSON schema validation + retry once before fallback |
| **P0** | Show diff view (before vs after) with highlighted keyword additions |
| P1 | Real ATS simulation: section detection + keyword density + format rules |
| P1 | Company autocomplete → inject `lib/data/companies.ts` context into prompt |
| P1 | Save tailor history versions per job (not overwrite single afterText) |
| P2 | Streaming tailor UI (word-by-word) for perceived speed |

---

## 5. Resume import & parsing

| | |
|---|---|
| **API** | `POST /api/resumes/import` |
| **Quality today** | **65%** |
| **File** | `app/api/resumes/import/route.ts` (~475 lines) |

### How it works

```
PDF  → pdfjs text extraction + line positions (sourceLayout)
DOCX → mammoth
DOC  → word-extractor
TXT/MD/RTF → direct read
  → normalizeResumeStructure()
  → upsertMasterResume() with rawText + sourceFilePath + sourceLayout
```

### Upgrade checklist

| Priority | Task |
|----------|------|
| **P0** | Better PDF column detection (two-column resumes break order) |
| P1 | Parse into `ResumeStudioDocument` sections automatically |
| P2 | OCR for scanned PDFs (Tesseract or cloud API) |

---

## 6. Master resume profile

| | |
|---|---|
| **API** | `GET/POST /api/resumes/master` |
| **Quality today** | **80%** |
| **Purpose** | Single source of truth — prefills tailor, interview, tools, jobs |

### How it works

```
GET  → getLatestMasterResume(userId)
POST → upsertMasterResume({ title, sourceName, rawText, sourceUrl? })
```

Used by: build studio, generate form, interview page, tools page, job matcher.

### Upgrade checklist

| Priority | Task |
|----------|------|
| P1 | Version history (last 5 uploads) |
| P2 | Structured `parsedData` JSON field (not only rawText) |

---

## 7. My resumes library

| | |
|---|---|
| **Page** | `/dashboard/resumes` |
| **Quality today** | **75%** |
| **Files** | `resume-card.tsx`, `GET` via server `getGeneratedResumes()` |

### How it works

```
Lists all GeneratedResume for user
  → ResumeCard shows company, role, ATS score, links:
     Re-tailor | Interview | Cover letter
```

### APIs

| Method | Route |
|--------|-------|
| PATCH | `/api/resumes/[resumeId]` — update content |
| GET | `/api/pdf?resumeId=` — download |

### Upgrade checklist

| Priority | Task |
|----------|------|
| P1 | Filter/sort by company, date, ATS score |
| P1 | Application status tracker (applied / interview / offer) |
| P2 | Bulk export ZIP of PDFs |

---

## 8. PDF export

| | |
|---|---|
| **API** | `GET/POST /api/pdf` |
| **Quality today** | **60%** (was ~40% before structured fix) |
| **Files** | `lib/pdf/resume-document.tsx`, `lib/pdf/source-pdf.ts` |

### How it works

```
POST /api/pdf
  → StructuredResumePage from ResumePdfData (build studio live preview)

GET /api/pdf?resumeId=
  → If uploaded source exists → renderPreservedSourcePdf() patches text in place
  → Else → ResumeDocument from generatedContent fields
```

### Upgrade checklist

| Priority | Task |
|----------|------|
| **P0** | Pixel-compare preview vs download (same code path) — done for build studio POST |
| **P0** | Skills section: comma vs line break consistency in all templates |
| P1 | Font embedding for Indian names / special chars |
| P1 | Page break rules (don't split experience block mid-entry) |
| P2 | User-uploaded photo in PDF header |

---

## 9. ATS analyze

| | |
|---|---|
| **API** | `POST /api/resumes/analyze` |
| **Quality today** | **50%** — heuristic only |
| **Engine** | `analyzeResumeAts()` in `lib/ai/resume-engine.ts` |

### How it works

```
Keyword extraction from JD → match against resume text
  + sectionCoverageScore, bulletQualityScore, contactScore, readabilityScore
  → Combined atsScore 0–100
```

No LLM call — pure rules. Fast but not what users expect from "ATS score."

### Upgrade checklist

| Priority | Task |
|----------|------|
| **P0** | Rename UI to "Keyword match score" OR add real LLM ATS critique layer |
| **P0** | Use Gemini to explain *why* each missing keyword matters |
| P1 | Industry-specific keyword dictionaries (SWE vs Data vs PM) |

---

## 10. Interview prep

| | |
|---|---|
| **Page** | `/dashboard/interview` |
| **Quality today** | **55%** |
| **Files** | `interview-guide-form.tsx`, `app/api/interview/route.ts` |

### How it works

```
POST /api/interview
  Body: interviewGuideSchema (company, role, JD, resume, experience level, focus, language)
  → generateInterviewGuide() → Groq JSON
  → buildFallbackInterviewGuide() if AI fails
  → createInterviewGuide() → Mongo InterviewGuide
  Returns: companyAnalysis, questions, codingQuestions, behavioralQuestions,
           roadmap, freeResources, mockPlan, prepNotes
```

### APIs

| Method | Route |
|--------|-------|
| POST | `/api/interview` |
| GET | `/api/company/lookup?q=` | Company autocomplete from static DB |

### Known quality gaps

1. Fallback plan is generic when Groq returns bad JSON
2. Coding questions not always LeetCode-linked with difficulty tags
3. No spaced-repetition or progress tracking
4. Company data is static `lib/data/companies.ts` (~15 companies)

### Upgrade checklist

| Priority | Task |
|----------|------|
| **P0** | Gemini for long JD + resume context in interview prompt |
| **P0** | Validate coding questions array — filter empty/duplicate |
| P1 | Link each question to external practice URL (LeetCode, GFG, YouTube) |
| P1 | Save multiple guides per company (history) |
| P2 | Mock interview timer + self-rating UI |

---

## 11. AI tools (cover letter, critique, photo)

| | |
|---|---|
| **Page** | `/dashboard/tools` |
| **Quality today** | **55%** |
| **Files** | `tools-workspace.tsx` |

### APIs

| Tool | Route | Engine |
|------|-------|--------|
| Cover letter | `POST /api/cover-letter` | `generateCoverLetter()` → Groq JSON |
| Resume critique | `POST /api/critique` | `generateResumeCritique()` → Groq JSON |
| Professional photo | `POST /api/photo` | OpenAI image OR `generateProfessionalPhotoPlan()` text tips |
| PDF export | `GET /api/pdf` | Same as above |

### How it works

```
Tools page prefills from master resume or ?resumeId= linked tailored resume
  → User picks tool tab
  → POST respective API
  → Display result (not saved to DB except via copy)
```

### Known quality gaps

1. Cover letters sound generic — Groq, no Gemini, no company tone
2. Critique overlaps with ATS analyze — confusing for users
3. Photo generation needs OpenAI key; most users only get text plan
4. Results not saved — user loses work on refresh

### Upgrade checklist

| Priority | Task |
|----------|------|
| **P0** | Gemini for cover letter (better prose, 300-word control) |
| **P0** | Save cover letters to DB linked to resumeId + company |
| P1 | Tone selector (professional / enthusiastic / concise) — UI exists partially |
| P1 | Critique: merge with analyze into one "Resume score report" |
| P2 | Photo: integrate free background removal API |

---

## 12. Job search

| | |
|---|---|
| **Page** | `/dashboard/jobs` |
| **Quality today** | **50%** — useful links, not a real job board |
| **Files** | `features/jobs/*`, `lib/data/job-listings.ts` |

### How it works

```
getJobMatchesForUser()
  → buildJobSeekerProfile() from latest master/generated resume
  → matchJobsForProfile() scores static listings in job-listings.ts
  → Returns matches + deep links to LinkedIn, Naukri, Indeed, etc.

GET /api/jobs/match
GET /api/jobs/profile
```

**We do not scrape job boards.** Curated static DB + external search URLs.

### Upgrade checklist

| Priority | Task |
|----------|------|
| P1 | Expand `job-listings.ts` to 100+ India + remote roles |
| P1 | "Save job" bookmark + application status |
| P2 | Adzuna / Remotive API integration (see `features/jobs/README.md`) |
| P2 | Email alert when new matching job added |

---

## 13. Freelancing (find clients)

| | |
|---|---|
| **Page** | `/dashboard/freelancing` |
| **Quality today** | **45%** — link generator, not a product yet |
| **Files** | `features/freelancing/*` |

### How it works

```
User enters service (e.g. "website design") + city
  → buildFindClientLinks() → Google Maps, Justdial, IndiaMART, Google, LinkedIn URLs
  → Opens external directories (no scraping, no stored leads)
```

### Upgrade checklist

| Priority | Task |
|----------|------|
| P2 | Pitch templates generated from user skills |
| P2 | Track outreach (client name, status, follow-up date) |
| P3 | WhatsApp click-to-chat pitch message |

---

## 14. Learners roadmaps

| | |
|---|---|
| **Page** | `/dashboard/learners` |
| **Quality today** | **70%** — static content, works as-is |
| **Files** | `learner-prep-workspace.tsx` |

### How it works

```
Static roadmaps: Web dev, DSA, System design, AI/ML
  → Curated YouTube + free course links by year (1st–4th year)
  → No API — pure frontend content
```

### Upgrade checklist

| Priority | Task |
|----------|------|
| P3 | Progress checkboxes saved per user |
| P3 | AI-generated weekly plan based on target company |

---

## 15. Analytics

| | |
|---|---|
| **Page** | `/dashboard/analytics` |
| **Quality today** | **65%** |
| **Files** | `app/dashboard/analytics/page.tsx` |

### How it works

```
Aggregates from GeneratedResume + InterviewGuide:
  → buildDashboardStats, buildKeywordCoverage, buildReadinessScore, buildActivityFeed
  → Charts: keyword coverage, readiness steps, activity list
```

### Upgrade checklist

| Priority | Task |
|----------|------|
| P1 | Time-series chart (ATS score over tailors) |
| P2 | Export analytics PDF for coaching |
| P2 | Umami / Plausible integration for funnel metrics |

---

## 16. Billing & Pro plan

| | |
|---|---|
| **Page** | `/dashboard/upgrade` |
| **Quality today** | **60%** — works for early users, not scalable |
| **Files** | `lib/billing/*`, `app/api/billing/*` |

### How it works

```
Free: 5 resume generations per user + per device (FREE_RESUME_LIMIT)
  → assertCanGenerate() on POST /api/resumes/build and /generate
  → 402 response → upgrade page

Pro: ₹50/month (manual UPI)
  → User pays via QR → WhatsApp screenshot
  → POST /api/billing/payment-complete
  → Admin confirms via /dashboard/admin or /api/admin/subscription
  → User.proExpiresAt set for 30 days

GET /api/billing/status
GET /api/billing/confirm?token=
```

### APIs

| Method | Route |
|--------|-------|
| GET/POST | `/api/billing/status` |
| POST | `/api/billing/payment-complete` |
| GET | `/api/billing/confirm` |
| POST | `/api/admin/subscription` |

### Upgrade checklist

| Priority | Task |
|----------|------|
| P1 | Stripe Checkout (Section 2) — keep manual as India fallback |
| P1 | Separate limits: tailor vs interview vs tools (not one generation counter) |
| P2 | Invoice email via Resend |

---

## 17. Admin panel

| | |
|---|---|
| **Page** | `/dashboard/admin` |
| **Quality today** | **75%** — founder-only, works |
| **Access** | `ADMIN_EMAIL` env + Clerk email match |

### APIs

| Method | Route |
|--------|-------|
| GET | `/api/admin/me` |
| GET | `/api/admin/overview` |
| POST | `/api/admin/subscription` |

### Upgrade checklist

| Priority | Task |
|----------|------|
| P2 | Desktop session stats (when desktop ships) |
| P2 | Groq usage / cost dashboard |

---

## 18. Supporting infrastructure (built)

| Feature | Route / file | Quality | Notes |
|---------|--------------|---------|-------|
| Health check | `GET /api/health` | 100% | Deploy probe |
| Activity tracking | `POST /api/activity/track` | 60% | Partial feature logging |
| File upload | UploadThing `/api/uploadthing` | 70% | Photo tool |
| Company DB | `GET /api/company/lookup` | 70% | ~15 static companies |
| SEO | `lib/seo.ts`, sitemap, robots | 80% | Public pages |
| Chat widget | Apna AI in `app/layout.tsx` | 80% | External embed |

---

## Section 1 — Master priority order (CTO)

Do these **before** any Section 2 work:

```
Week A — AI output quality
  1. lib/ai/gemini.ts + lib/ai/router.ts
  2. Wire Gemini → tailor, refine, cover letter
  3. Retry + better JSON parsing in resume-engine.ts
  4. Reduce fallback-to-deterministic unless API truly down

Week B — PDF + studio fidelity
  5. Section-scoped refine API
  6. PDF page breaks + skills formatting
  7. Build studio: skip redundant AI on manual save

Week C — User-facing polish
  8. Before/after diff on tailor page
  9. Save cover letters to DB
  10. Interview prep: validate + link coding questions
  11. Rename or upgrade ATS score UX
```

**Exit criteria for Section 1:** User tests tailor + build + PDF on 3 real jobs and rates output **8/10+**.

---

# SECTION 2 — Phase 2 (Ecosystem, SEO & Infrastructure)

> Start only after Section 1 exit criteria met. Full infra detail in [futureupgradation.md](./futureupgradation.md).  
> **Phase 2 goal:** Move from “resume tool” → **placement preparation platform** (product + SEO pages + desktop).

---

## 2A. New product features (not built yet)

| Feature | Route / surface | Description | Depends on |
|---------|-----------------|-------------|------------|
| **Company SEO pages** | `/companies/[slug]`, `/interview-questions/[company]` | Hundreds of ranking pages (TCS Qs, Infosys format, Amazon OA…) → CTA into Apply | `content/` + sitemap |
| **Resume format hubs** | `/resume-format/[company]` | Company-specific resume guidance → Tailor | Blog / content module |
| **OA & aptitude banks** | `/oa/[company]`, learner packs | Cognizant aptitude, Morgan Stanley OA, Amazon OA | Learning content |
| **Downloads page** | `/downloads` | Windows + macOS desktop app cards, version, system requirements | Desktop build |
| **Apply Desktop** | Tauri app | Live interview assistant: mic → Whisper → Llama answers (practice-first) | `/api/desktop/auth`, Groq proxy |
| **Settings page** | `/dashboard/settings` | Profile, billing, preferences | Better Auth |
| **Mock interview room** | `/dashboard/mock-interview` | Timed practice with AI interviewer | Interview API |
| **Live interview API** | `POST /api/interview/live` | Streaming STT + answer chunks for desktop | Redis, Groq proxy |
| **Placement / application tracker** | `/dashboard/applications` | Job → status → notes → reminders (placement tracker) | Postgres |
| **Offer comparison** | `/dashboard/offers` | Compare CTC, location, role, deadline side-by-side | Tracker + Postgres |
| **Company preparation packs** | Dashboard + SEO | Packs linking resume format + Qs + OA + hiring process | Content + interview API |
| **Saved cover letters** | `/dashboard/cover-letters` | History per company | Postgres |
| **Stripe billing** | `/dashboard/upgrade` | Automated Pro/Premium | Stripe webhooks |
| **Affiliate program** | `/affiliate` | Referral links + commission | Stripe Connect |
| **Session recordings** | Premium | Store interview practice audio snippets | R2 |
| **Coding assistant** | Premium | IDE-style hints during mock | Groq Mixtral |
| **Email notifications** | — | Onboarding, billing, job alerts, “new TCS questions” | Resend |
| **Settings: desktop sync** | — | Linked devices, revoke | `desktop_licenses` |

### 2A-1. SEO page factory (ecosystem growth)

| Step | Action | Owner |
|------|--------|-------|
| 1 | Define 50 seed pages (top India recruiters + OA + resume format) | Founder + content |
| 2 | Schema in `content/companies/` or extend `content/blog/` | Interns |
| 3 | Dynamic routes + sitemap + internal CTAs to Tailor / Interview / Jobs | Eng |
| 4 | Ship 10 pages/week until 100+, then 200+ | Content cadence |
| 5 | Measure: impressions → signup → first tailor | Analytics |

**Template for every SEO page**

1. Answer the search query (questions / format / process)  
2. Short “How Apply helps for this company”  
3. Primary CTA → `/dashboard/generate` or `/dashboard/interview`  
4. Related links to other company pages (internal SEO)

### 2A-2. Ecosystem map vs what exists today

| Ecosystem step | Today (Section 1) | Phase 2 |
|----------------|-------------------|---------|
| Resume Builder | Partial (tailor primary; build removed) | Strengthen builder + templates |
| ATS Checker | Analyze API + score UX (~needs P1) | Clear ATS product surface |
| Resume Tailoring | Live — improve quality first | Diff, version history |
| Cover Letter | Live tools | Saved history page |
| Interview Questions | Guides + blog | Company banks + SEO pages |
| Mock Interview | — | `/dashboard/mock-interview` |
| Desktop Interview Assistant | — | Apply Desktop |
| Placement Tracker | — | `/dashboard/applications` |
| Job Applications | Job search match | Tracker + reminders |
| Company Preparation | Static `companies.ts` | Packs + SEO hub |
| Offer Comparison | — | `/dashboard/offers` |

---

## 2B. Infrastructure migrations (not built yet)

| Migration | From | To | Sequence |
|-----------|------|-----|----------|
| Database | MongoDB + `.data/` JSON | Neon PostgreSQL + Drizzle | **First** |
| Auth | Clerk | Better Auth (email + GitHub + Google) | **Second** (needs Postgres) |
| Caching | None | Upstash Redis | When desktop launches |
| Billing | Manual UPI | Stripe + keep UPI fallback | After Postgres users table |
| Monorepo | Single Next app | `apps/web` + `apps/desktop` + `packages/db` | When desktop starts |
| AI router | Groq-only | Groq + Gemini + Phase 2 OpenAI/Claude | Section 1 starts this |

### New API routes (Phase 2)

```
POST /api/desktop/auth          → session token + master resume + plan
POST /api/desktop/transcribe    → proxy Groq Whisper (no client keys)
POST /api/desktop/answer          → streaming Groq Llama
POST /api/interview/live          → WebSocket upgrade path
POST /api/billing/stripe/checkout
POST /api/billing/stripe/webhook
GET  /api/settings/profile
PATCH /api/settings/profile
```

### New database tables (Phase 2)

```
users, sessions, accounts          → Better Auth
subscriptions                      → Stripe + legacy manual
interview_sessions                 → Desktop live sessions
desktop_licenses                   → Per-device entitlements
saved_cover_letters
job_applications                   → Placement tracker
offers                             → Offer comparison
company_content_meta               → Optional: track SEO page performance per company slug
```

---

## 2C. Phase 2 build order (weeks)

| Weeks | Focus | Deliverable |
|-------|-------|-------------|
| 1–2 | Section 1 quality | Gemini, PDF, tailor diff |
| 3–4 | **SEO seed batch** + Postgres | 20 company/OA/resume-format pages live + sitemap; Drizzle dual-write |
| 5–6 | Better Auth + content pipeline | Replace Clerk; content folder + intern playbook for 10 pages/week |
| 7–8 | Desktop MVP | Tauri login, mock interview, API proxy |
| 9–10 | Stripe + Placement tracker | Paid plans; applications board beta |
| 11–12 | Company packs + Offer comparison | Packs linked from SEO pages; offer compare |
| 13+ | Realtime + Premium | WebSocket, recordings, scale to 100–200+ SEO pages |

---

## 2D. Pricing (target — not fully implemented)

| Plan | Price | Limits |
|------|-------|--------|
| Free | ₹0 | 5 tailors/mo, 3 prep, 3 desktop sessions |
| Pro | ₹299/mo | Unlimited tailor, prep, desktop |
| Premium | ₹499/mo | Pro + recordings, company packs, priority AI |

*Today: only Free (5 gens) + manual Pro ₹50 exist.*

---

## 2E. Environment variables to add (Phase 2)

```bash
# Section 1 (add now)
GEMINI_API_KEY=

# Phase 2 infrastructure
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_DESKTOP_APP_VERSION=
```

---

## Quick map: built vs Phase 2

| Area | Section 1 (improve) | Section 2 (new) |
|------|---------------------|-----------------|
| Positioning | Ship quality in product | **Placement platform** brand + SEO ecosystem |
| Resume tailor | Gemini, diff, ATS UX | Version history, company templates |
| ATS | Score UX | Dedicated checker narrative on landing/SEO pages |
| Interview prep | Quality, links | Mock room, company Q banks, live desktop |
| Cover letter | Gemini, save | History page |
| Jobs | More listings | Live APIs + placement tracker |
| Company prep | Small `companies.ts` | **Hundreds of SEO pages** + packs |
| Offers | — | Offer comparison |
| Auth | Settings page | Better Auth |
| Database | — | Postgres migration |
| Billing | Per-feature limits | Stripe |
| Desktop | — | Full Tauri Interview Copilot |
| Downloads | — | `/downloads` page |

---

## Success metrics (placement platform)

| Metric | Why it matters |
|--------|----------------|
| Organic sessions from company/SEO pages | Proves flywheel (not ads-only) |
| SEO page → signup conversion | Pages must push into Apply |
| First tailor within 24h of signup | Activation |
| Interview guides / mock sessions | Depth beyond resume |
| Applications tracked | Placement OS behavior |
| Desktop downloads (when live) | Ecosystem second surface |
| Paid conversion | Pro ₹299 / Premium ₹499 |

---

## API reference — all routes today

| Method | Route | Auth | Feature |
|--------|-------|------|---------|
| POST | `/api/resumes/import` | Yes | Upload resume |
| POST | `/api/resumes/generate` | Yes | Tailor to JD |
| POST | `/api/resumes/build` | Yes | Build from questions |
| POST | `/api/resumes/refine` | Yes | AI refine |
| POST | `/api/resumes/analyze` | Yes | ATS keyword score |
| GET/POST | `/api/resumes/master` | Yes | Master profile |
| PATCH | `/api/resumes/[resumeId]` | Yes | Update saved resume |
| GET/POST | `/api/pdf` | Yes | PDF render |
| POST | `/api/interview` | Yes | Interview guide |
| POST | `/api/cover-letter` | Yes | Cover letter |
| POST | `/api/critique` | Yes | Resume critique |
| POST | `/api/photo` | Yes | Photo plan/image |
| GET | `/api/jobs/match` | Yes | Job matches |
| GET | `/api/jobs/profile` | Yes | Job seeker profile |
| GET | `/api/company/lookup` | Yes | Company search |
| GET/POST | `/api/billing/status` | Yes | Plan status |
| POST | `/api/billing/payment-complete` | Yes | Manual payment |
| GET | `/api/billing/confirm` | Token | Admin confirm link |
| GET | `/api/admin/me` | Admin | Admin check |
| GET | `/api/admin/overview` | Admin | Stats |
| POST | `/api/admin/subscription` | Admin | Grant Pro |
| POST | `/api/activity/track` | Yes | Analytics event |
| GET | `/api/health` | No | Health |
| * | `/api/uploadthing` | Yes | File uploads |

---

---

## Document history

| Date | Change |
|------|--------|
| July 2026 | Initial Section 1 + Section 2 plan |
| July 2026 | North Star: placement platform + SEO page engine + ecosystem loop; cleaned competitor scratch notes |
| July 2026 | Execution sprint: [next-15-days-plan.md](./next-15-days-plan.md) — web-only 15-day founder plan (desktop later) |
| July 2026 | **Web Phase 2 features shipped** — mock interview, applications tracker, offer compare, settings, `/prepare` company SEO pages (13), `/downloads` Desktop Coming Soon placeholder, graceful Mongo fallbacks; Desktop/Tauri still later |

---

*Apply · India’s placement preparation platform (building) · Built Features & Phase 2 · Founder + CTO · July 2026*
