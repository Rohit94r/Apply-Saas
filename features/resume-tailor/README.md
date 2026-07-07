# Resume Tailor — Upload & match job

> **Route:** `/dashboard/generate`  
> **User:** Has a resume — upload PDF/Word, paste JD, get tailored version

## Code map (today)

| Layer | Path |
|-------|------|
| Page | `app/dashboard/generate/page.tsx` |
| Form UI | `components/dashboard/resume-improve/generate-resume-form.tsx` |
| Post-tailor actions | `components/dashboard/post-tailor-actions.tsx` |
| Company search | `components/dashboard/company-search-input.tsx` + `lib/data/companies.ts` |
| Import | `app/api/resumes/import/route.ts` |
| Tailor engine | `app/api/resumes/generate/route.ts` → `lib/ai/resume-engine.ts` |
| Prompts | `lib/ai/prompts.ts` → `resumeTailoringPrompt` |

## User flow

```
Upload file → POST /api/resumes/import → master profile
  → company + role + JD + optional prompt
  → POST /api/resumes/generate → AI tailor + ATS score
  → before/after preview → PDF download
  → links to cover letter, interview prep
```

## APIs

| Method | Route |
|--------|-------|
| POST | `/api/resumes/import` |
| POST | `/api/resumes/generate` |
| POST | `/api/resumes/refine` |
| POST | `/api/resumes/analyze` |
| GET | `/api/pdf?resumeId=` |

## Data

- `MasterResume` — uploaded source text + layout
- `GeneratedResume` — before/after text, ATS scores, keywords

## Quality upgrades

- Gemini Flash for tailoring (P0)
- Before/after diff UI
- Version history per job
