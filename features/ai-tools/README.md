# AI Tools

> **Route:** `/dashboard/tools`  
> **User:** Cover letter, resume critique, professional photo tips, PDF export

## Code map

| Layer | Path |
|-------|------|
| Page | `app/dashboard/tools/page.tsx` |
| UI | `components/dashboard/tools-workspace.tsx` |
| Cover letter | `POST /api/cover-letter` → `generateCoverLetter` |
| Critique | `POST /api/critique` → `generateResumeCritique` |
| Photo | `POST /api/photo` → OpenAI image or text plan |
| PDF | `GET /api/pdf` |

Prefills from `?resumeId=` or master profile via `lib/dashboard-links.ts`.

## Prompts

All in `lib/ai/prompts.ts`:
- `coverLetterPrompt`
- `resumeCritiquePrompt`
- `professionalPhotoPrompt`

## Quality upgrades

- Gemini for cover letters
- Save cover letters to database
- Merge critique + ATS analyze into one report
