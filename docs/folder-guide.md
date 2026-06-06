# Folder guide — Apply codebase

This document explains how the repo is organized for **large-scale growth** and **onboarding interns**.

## Principles

1. **Feature modules** (`features/<name>/`) — self-contained product areas with types, lib, components, and a README.
2. **Shared data** (`lib/data/`) — MongoDB access + static curated datasets.
3. **Thin routes** (`app/`) — pages and API handlers delegate to `lib/` or `features/`.
4. **Comments** — non-obvious business logic has file-level and function-level comments.

## Top-level layout

```
Apply/
├── app/                    # Next.js routes only — keep thin
├── components/             # Legacy/shared UI (landing, dashboard shell, ui primitives)
├── features/               # NEW: product features (preferred for new work)
├── lib/                      # Shared infrastructure + data services
├── models/                   # Mongoose schemas
├── types/                    # Global shared types
└── docs/                     # Internal documentation
```

## Feature modules (preferred for new code)

| Feature | Path | Route |
|---------|------|-------|
| Job Search | `features/jobs/` | `/dashboard/jobs` |
| *(future)* Company intel | `features/companies/` | uses `lib/data/companies.ts` today |
| *(future)* Learning | `features/learning/` | uses `lib/data/learning-resources.ts` today |

Each feature folder should contain:

```
features/<name>/
├── README.md          ← intern onboarding for this feature
├── types.ts           ← domain types
├── index.ts           ← public exports
├── lib/               ← pure logic (no React)
└── components/        ← React UI
```

## Static / curated data (where to find it)

| Data | File | Used by |
|------|------|---------|
| Company profiles | `lib/data/companies.ts` | Improve, Interview, Company API |
| Job listings | `lib/data/job-listings.ts` | Job Search matcher |
| Learner tracks, videos, courses | `lib/data/learning-resources.ts` | Learner prep, Interview prep |
| Blog posts | `lib/blog.ts` | `/blog` |
| SEO | `lib/seo.ts` | Public pages |

## User data (MongoDB)

| Collection | Model | Service |
|------------|-------|---------|
| Master resumes | `models/MasterResume.ts` | `lib/data/resumes.ts` |
| Generated resumes | `models/GeneratedResume.ts` | `lib/data/resumes.ts` |
| Interview guides | `models/InterviewGuide.ts` | `lib/data/resumes.ts` |

Fallback: `.data/resume-store.json` when MongoDB is unavailable.

## API route → service mapping

| API | Service / feature |
|-----|-------------------|
| `/api/jobs/match` | `lib/data/jobs.ts` → `features/jobs` |
| `/api/jobs/profile` | `lib/data/jobs.ts` |
| `/api/company/lookup` | `lib/data/companies.ts` |
| `/api/resumes/*` | `lib/data/resumes.ts` + `lib/ai/resume-engine.ts` |
| `/api/interview` | `lib/ai/resume-engine.ts` |

## Suggested intern learning path

1. Read root `README.md` (product + stack overview)
2. Read `docs/system-design.md` (resume improve vs build flows)
3. Read `docs/folder-guide.md` (this file)
4. Pick one feature README: `features/jobs/README.md`
5. Trace one request: `app/dashboard/jobs/page.tsx` → `lib/data/jobs.ts` → `features/jobs/lib/match-jobs.ts`

## Conventions

- **Imports:** use `@/features/jobs`, `@/lib/data/jobs`, `@/components/ui/*`
- **Comments:** add file header for every new module; explain *why*, not *what*
- **No scraping:** external job/company data uses curated lists + official search URLs until APIs are integrated
- **Auth:** all `/dashboard/*` and `/api/*` (except health) require Clerk
