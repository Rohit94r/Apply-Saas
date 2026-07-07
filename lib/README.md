# Lib — shared infrastructure

**Not product UI.** Services, AI, data access, PDF, auth helpers.

```
lib/
├── ai/                 # Groq/OpenAI clients, prompts, resume-engine
├── data/               # MongoDB services + static datasets
├── billing/            # Usage limits, payments, UPI flow
├── pdf/                # PDF generation (@react-pdf/renderer)
├── resume-studio/      # Build page domain logic (types, sections, api client)
├── admin/              # Founder admin auth + activity
├── auth.ts             # getCurrentUserId() wrapper
├── seo.ts              # Site metadata, absoluteUrl
├── validations.ts      # Zod schemas for all APIs
└── mongodb.ts          # DB connection
```

## AI (edit prompts here)

| File | Purpose |
|------|---------|
| `ai/openai.ts` | Groq + OpenAI client selection |
| `ai/prompts.ts` | **All LLM prompt templates** |
| `ai/resume-engine.ts` | Tailor, interview, cover letter, critique logic |

## Data (edit curated lists)

| File | Purpose |
|------|---------|
| `data/resumes.ts` | **Main DB service** — CRUD resumes & guides |
| `data/companies.ts` | Company interview profiles |
| `data/job-listings.ts` | Curated jobs for matcher |
| `data/jobs.ts` | Job match orchestration |
| `data/learning-resources.ts` | Re-exports `content/learning/tracks.ts` |

## Phase 2 migrations

| Today | Future |
|-------|--------|
| `lib/ai/` | `packages/ai/` |
| `models/` + `lib/data/` | `packages/db/` (Drizzle + Postgres) |

See `packages/README.md` for scaffold.
