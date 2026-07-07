# Resume Studio — Build Resume

> **Route:** `/dashboard/build`  
> **User:** Student with no resume — structured editor + live PDF preview

## Code map (today)

| Layer | Path |
|-------|------|
| Page | `app/dashboard/build/page.tsx` |
| UI shell | `components/dashboard/resume-studio/` |
| Editor hook | `components/dashboard/resume-studio/hooks/use-resume-editor.ts` |
| Domain logic | `lib/resume-studio/` (types, sections, api) |
| PDF preview | `POST /api/pdf` via `lib/resume-studio/api.ts` |
| Save master | `POST /api/resumes/master` |
| AI improve | `POST /api/resumes/refine` |

## User flow

```
Edit sections → auto-save master profile
  → live PDF preview (structured payload)
  → AI prompt / per-section improve → refine API
  → Save → build + patch generated resume
  → Download PDF
```

## APIs

| Method | Route |
|--------|-------|
| POST | `/api/resumes/master` |
| POST | `/api/resumes/build` |
| POST | `/api/resumes/refine` |
| PATCH | `/api/resumes/[resumeId]` |
| POST | `/api/pdf` |

## Quality upgrades (see docs/built-features-phase-two.md)

- Section-scoped AI refine
- Gemini for long edits
- PDF page-break polish

## Future migration

Move to `features/resume-studio/` (components + lib together) when refactoring.
