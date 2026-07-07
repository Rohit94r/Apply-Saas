# Learning — Student roadmaps

> **Route:** `/dashboard/learners`  
> **User:** 1st–4th year students building skills before placements

## Code map

| Layer | Path |
|-------|------|
| Page | `app/dashboard/learners/page.tsx` |
| UI | `components/dashboard/learner-prep-workspace.tsx` |
| **Content (edit here)** | `content/learning/tracks.ts` |

## What to edit

- `learnerTracks` — roadmap phases, tasks, resources
- `interviewPrepVideos` — YouTube IDs for interview page
- Platform links (free courses)

No API — static content rendered in React.

## Related

Interview prep reuses videos from `content/learning/tracks.ts`.
