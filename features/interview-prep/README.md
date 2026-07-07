# Interview Prep

> **Route:** `/dashboard/interview`  
> **User:** Prepare for a specific company + role with coding, HR, and study plan

## Code map

| Layer | Path |
|-------|------|
| Page | `app/dashboard/interview/page.tsx` |
| Form | `components/dashboard/interview-guide-form.tsx` |
| Videos | `components/dashboard/youtube-video-grid.tsx` |
| Company data | `lib/data/companies.ts` |
| Learning videos | `content/learning/tracks.ts` |
| API | `app/api/interview/route.ts` |
| AI | `lib/ai/resume-engine.ts` → `generateInterviewGuide` |
| Prompt | `lib/ai/prompts.ts` → `interviewGuidePrompt` |

## User flow

```
Prefill from master/tailored resume
  → company, role, JD, experience level, focus areas
  → POST /api/interview
  → saved InterviewGuide in MongoDB
  → display questions, roadmap, resources, mock plan
```

## API

```
POST /api/interview
GET /api/company/lookup?q=
```

## Quality upgrades

- Gemini for long context
- Link coding Qs to LeetCode/GFG
- Multiple saved guides per company
