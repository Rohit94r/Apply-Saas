# Folder guide — Apply codebase

**Master map** for interns, founders, and future scaling. Aligned with [futureupgradation.md](./futureupgradation.md).

> Quick edits: [WHERE-TO-EDIT.md](./WHERE-TO-EDIT.md) · Day 1 interns: [intern-onboarding.md](./intern-onboarding.md)

---

## Principles

1. **Thin routes** — `app/` only wires pages and API handlers.
2. **Feature modules** — product logic in `features/<name>/` (with README).
3. **Editable content** — SEO copy in `content/`, not scattered in components.
4. **Shared services** — DB, AI, PDF in `lib/`.
5. **Gradual monorepo** — `apps/` and `packages/` are scaffolds until Phase C.
6. **No big-bang moves** — web app stays at repo root until Postgres + desktop migration.

---

## Repository tree (current + future)

```
Apply/                              # ← Web app runs HERE today (Phase A)
│
├── app/                            # Next.js routes → app/README.md
│   ├── (auth)/                     # Neon Auth sign-in/up
│   ├── blog/                       # SEO pages (data: content/blog/)
│   ├── dashboard/                  # Product UI → app/dashboard/README.md
│   └── api/                        # REST API → app/api/README.md
│
├── components/                     # React UI → components/README.md
│   ├── ui/                         # Design system (button, card, input…)
│   ├── landing/                    # Public marketing homepage
│   ├── dashboard/                  # Logged-in shared UI + resume studio
│   ├── billing/
│   └── admin/
│
├── content/                        # ✨ EDITABLE copy & SEO → content/README.md
│   ├── blog/posts.ts               # Blog articles
│   ├── learning/tracks.ts          # Learner roadmaps + YouTube links
│   └── landing/phase-features.ts   # Phase 1 live + Phase 2 coming soon
│
├── features/                       # Product modules → features/README.md
│   ├── jobs/                       # ✅ Full module (job search)
│   ├── freelancing/                # ✅ Find clients links
│   ├── resume-studio/              # 📋 Map only → code in components/ + lib/
│   ├── resume-tailor/
│   ├── interview-prep/
│   ├── learning/
│   ├── ai-tools/
│   ├── billing/
│   └── analytics/
│
├── lib/                            # Infrastructure → lib/README.md
│   ├── ai/                         # Prompts + resume-engine + Groq
│   ├── data/                       # Drizzle services + static data
│   ├── billing/
│   ├── pdf/
│   ├── resume-studio/
│   ├── seo.ts                      # Global SEO metadata
│   └── validations.ts              # Zod API schemas
│
├── models/                         # Compat types → models/README.md (schema in packages/db)
├── types/                          # Shared TypeScript types
├── public/                         # Static assets (logo, QR code)
│
├── apps/                           # 🔜 Phase B/C — apps/README.md
│   ├── web/                        # Placeholder (root IS web today)
│   └── desktop/                    # Tauri app (not started)
│
├── packages/                       # 🔜 Phase C — packages/README.md
│   ├── db/                         # Drizzle + Postgres
│   ├── shared/                     # Types + Zod
│   └── ai/                         # AI router
│
├── services/                       # 🔜 Optional WebSocket
│   └── realtime/
│
└── docs/                           # Internal documentation
    ├── built-features-phase-two.md
    ├── futureupgradation.md
    ├── folder-guide.md             # ← this file
    ├── WHERE-TO-EDIT.md
    ├── intern-onboarding.md
    └── system-design.md
```

---

## Product feature → folder map

| User feature | Route | Code location | Content to edit |
|--------------|-------|---------------|-----------------|
| Landing / SEO | `/` | `app/page.tsx`, `components/landing/` | `lib/seo.ts` |
| Blog | `/blog` | `app/blog/` | `content/blog/posts.ts` |
| Dashboard home | `/dashboard` | `app/dashboard/page.tsx` | — |
| Build resume | `/dashboard/build` | `components/dashboard/resume-studio/`, `lib/resume-studio/` | [features/resume-studio](../features/resume-studio/README.md) |
| Tailor resume | `/dashboard/generate` | `components/dashboard/resume-improve/` | [features/resume-tailor](../features/resume-tailor/README.md) |
| My resumes | `/dashboard/resumes` | `components/dashboard/resume-card.tsx` | — |
| Job search | `/dashboard/jobs` | `features/jobs/` | `lib/data/job-listings.ts` |
| Freelancing | `/dashboard/freelancing` | `features/freelancing/` | `lib/data/freelance-catalog.ts` |
| Learners | `/dashboard/learners` | `components/dashboard/learner-prep-workspace.tsx` | `content/learning/tracks.ts` |
| Interview prep | `/dashboard/interview` | `components/dashboard/interview-guide-form.tsx` | `lib/data/companies.ts` |
| AI tools | `/dashboard/tools` | `components/dashboard/tools-workspace.tsx` | `lib/ai/prompts.ts` |
| Analytics | `/dashboard/analytics` | `app/dashboard/analytics/page.tsx` | — |
| Billing | `/dashboard/upgrade` | `components/billing/`, `lib/billing/` | `public/qrcode.png` |
| Admin | `/dashboard/admin` | `components/admin/` | — |

---

## API → service mapping

| API route | Handler | Business logic |
|-----------|---------|----------------|
| `POST /api/resumes/import` | `app/api/resumes/import/` | Parse file → `lib/data/resumes.ts` |
| `POST /api/resumes/generate` | `app/api/resumes/generate/` | `lib/ai/resume-engine.ts` |
| `POST /api/resumes/build` | `app/api/resumes/build/` | `lib/ai/resume-engine.ts` |
| `POST /api/resumes/refine` | `app/api/resumes/refine/` | `lib/ai/resume-engine.ts` |
| `POST /api/resumes/analyze` | `app/api/resumes/analyze/` | `analyzeResumeAts()` |
| `GET/POST /api/resumes/master` | `app/api/resumes/master/` | `lib/data/resumes.ts` |
| `PATCH /api/resumes/[id]` | `app/api/resumes/[id]/` | `lib/data/resumes.ts` |
| `GET/POST /api/pdf` | `app/api/pdf/` | `lib/pdf/` |
| `POST /api/interview` | `app/api/interview/` | `lib/ai/resume-engine.ts` |
| `POST /api/cover-letter` | `app/api/cover-letter/` | `lib/ai/resume-engine.ts` |
| `POST /api/critique` | `app/api/critique/` | `lib/ai/resume-engine.ts` |
| `GET /api/jobs/match` | `app/api/jobs/match/` | `lib/data/jobs.ts` → `features/jobs/` |
| `GET /api/company/lookup` | `app/api/company/lookup/` | `lib/data/companies.ts` |
| `GET/POST /api/billing/status` | `app/api/billing/status/` | `lib/billing/usage.ts` |

Full table: [built-features-phase-two.md](./built-features-phase-two.md#api-reference--all-routes-today)

---

## Data layers

### User data (Neon Postgres / Drizzle)

| Table | Compat type | Service |
|-------|-------------|---------|
| `resumes` | `MasterResume` | `lib/data/resumes.ts` |
| `tailored_resumes` | `GeneratedResume` | `lib/data/resumes.ts` |
| `interview_guides` | `InterviewGuide` | `lib/data/resumes.ts` |
| `users` | `User` | `lib/billing/users.ts` |
| `payment_requests` | `PaymentRequest` | `lib/billing/payments.ts` |

Dev fallback: `.data/resume-store.json` when the DB is unreachable.

### Static / curated data

| Data | File | Edit when |
|------|------|-----------|
| Blog posts | `content/blog/posts.ts` | New SEO article |
| Learner tracks | `content/learning/tracks.ts` | Roadmap / video links |
| Companies | `lib/data/companies.ts` | New company profile |
| Job listings | `lib/data/job-listings.ts` | New curated job |
| SEO defaults | `lib/seo.ts` | Site title, description |

---

## SEO architecture

| Concern | Location |
|---------|----------|
| Global meta, OG, Twitter | `app/layout.tsx` + `lib/seo.ts` |
| Google Search Console tag | `app/layout.tsx` → `metadata.verification` |
| Sitemap | `app/sitemap.ts` (reads `content/blog/posts.ts`) |
| Robots | `app/robots.ts` |
| Blog post meta | `app/blog/[slug]/page.tsx` + post `description` in content |
| Keywords per article | `content/blog/posts.ts` → `targetKeyword`, `keywords[]` |

---

## Conventions

### Imports

```typescript
import { matchJobsForProfile } from "@/features/jobs";
import { getJobMatchesForUser } from "@/lib/data/jobs";
import { blogPosts } from "@/content/blog/posts";
import { Button } from "@/components/ui/button";
```

### Adding a new feature (checklist)

1. Create `features/<name>/README.md` (required)
2. Add `types.ts`, `lib/`, `components/` as needed
3. Add `app/dashboard/<route>/page.tsx` (thin)
4. Add `app/api/...` if server logic needed
5. Add Zod schema in `lib/validations.ts`
6. Document in `docs/built-features-phase-two.md`

### Comments

- File header on every new module: purpose + route + owner feature
- Explain **why**, not what the code obviously does

### Auth

- Neon Auth protects `/dashboard/*` via `middleware.ts`; APIs use `getCurrentUserId()`
- Use `getCurrentUserId()` in API routes

---

## Migration phases (do not skip)

| Phase | What | Folder impact |
|-------|------|---------------|
| **A (now)** | Improve quality, add content/, feature READMEs | Root stays web app |
| **B** | Desktop MVP + `/downloads` | Add `apps/desktop/` |
| **C** | Postgres + Better Auth | Extract `packages/db/` |
| **D** | Optional monorepo move | Move root → `apps/web/` |

Details: [futureupgradation.md](./futureupgradation.md)

---

## Suggested reading order

1. [intern-onboarding.md](./intern-onboarding.md)
2. [built-features-phase-two.md](./built-features-phase-two.md) — Section 1
3. [system-design.md](./system-design.md) — tailor vs build flows
4. [WHERE-TO-EDIT.md](./WHERE-TO-EDIT.md)
5. One feature: `features/jobs/README.md`
6. Trace: `app/dashboard/jobs/page.tsx` → `lib/data/jobs.ts` → `features/jobs/lib/match-jobs.ts`

---

*Apply folder guide · Updated July 2026*
