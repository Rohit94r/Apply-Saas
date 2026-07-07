# API routes

Handlers validate input (Zod), call `lib/` or `features/`, return JSON.

## Resumes & PDF

| Route | Method | Service |
|-------|--------|---------|
| `/api/resumes/import` | POST | Upload parse → master |
| `/api/resumes/generate` | POST | AI tailor |
| `/api/resumes/build` | POST | Build from form |
| `/api/resumes/refine` | POST | AI refine |
| `/api/resumes/analyze` | POST | ATS keyword score |
| `/api/resumes/master` | GET, POST | Master profile |
| `/api/resumes/[resumeId]` | PATCH | Update saved resume |
| `/api/pdf` | GET, POST | PDF render |

## Interview & tools

| Route | Method |
|-------|--------|
| `/api/interview` | POST |
| `/api/cover-letter` | POST |
| `/api/critique` | POST |
| `/api/photo` | POST |
| `/api/company/lookup` | GET |

## Jobs

| Route | Method |
|-------|--------|
| `/api/jobs/match` | GET |
| `/api/jobs/profile` | GET |

## Billing & admin

| Route | Method |
|-------|--------|
| `/api/billing/status` | GET, POST |
| `/api/billing/payment-complete` | POST |
| `/api/billing/confirm` | GET |
| `/api/admin/*` | GET, POST |

## Conventions

1. Always `await getCurrentUserId()` except `/api/health`
2. Validate body with schemas from `lib/validations.ts`
3. AI calls go through `lib/ai/resume-engine.ts` (future: `lib/ai/router.ts`)
4. DB access through `lib/data/resumes.ts` — not raw Mongoose in routes

Full list: `docs/built-features-phase-two.md` → API reference table.
