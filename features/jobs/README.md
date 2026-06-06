# Job Search feature

> **For interns:** start here when working on job matching, LinkedIn/Naukri links, or the dashboard job strip.

## What it does

1. Reads the user's **latest master resume** (upload) or **latest generated resume** (built).
2. Builds a **JobSeekerProfile** (skills, roles, location, experience band).
3. Scores **curated listings** in `lib/data/job-listings.ts`.
4. Returns **deep links** to LinkedIn, Naukri, Indeed, Glassdoor, Instahyre, Cutshort, Wellfound.

We do **not** scrape job boards. Users apply on external sites.

## File map

| File | Responsibility |
|------|----------------|
| `features/jobs/types.ts` | TypeScript types for profile, listings, match results |
| `features/jobs/lib/build-profile.ts` | Extract profile from resume records |
| `features/jobs/lib/match-jobs.ts` | Score listings against profile |
| `features/jobs/lib/platform-links.ts` | Build LinkedIn/Naukri search URLs |
| `features/jobs/components/*` | React UI (cards, banner, workspace) |
| `lib/data/job-listings.ts` | Static curated jobs database (add jobs here) |
| `lib/data/jobs.ts` | Service layer — loads user data, calls matcher |
| `app/api/jobs/match/route.ts` | `GET` — full match result for UI |
| `app/api/jobs/profile/route.ts` | `GET` — profile only |
| `app/dashboard/jobs/page.tsx` | Job Search page |

## Data flow

```
User resume (MongoDB)
       ↓
lib/data/jobs.ts → getJobMatchesForUser()
       ↓
buildJobSeekerProfile()  ← features/jobs/lib/build-profile.ts
       ↓
matchJobsForProfile()    ← features/jobs/lib/match-jobs.ts
       ↓
JobMatchResult { profile, matches, platformSearches }
       ↓
Dashboard preview / Job Search page / API JSON
```

## Adding a new job listing

Edit `lib/data/job-listings.ts`:

```ts
{
  id: "job-026",
  title: "Your Role Title",
  company: "Company Name",
  location: "Bengaluru",
  workMode: "hybrid",
  type: "full-time",
  experienceBand: "fresher",
  skills: ["React", "Node.js"],  // used for matching
  platform: "linkedin",
  applyUrl: "https://www.linkedin.com/jobs/search/?keywords=...",
  postedLabel: "New"
}
```

## Adding a new job board

1. Add platform to `JobPlatform` in `features/jobs/types.ts`
2. Add meta in `features/jobs/lib/platform-links.ts` → `jobPlatformMeta`
3. Implement URL builder in `urlBuilders` map

## Future: live job APIs

Replace or augment `lib/data/job-listings.ts` with:

- [Adzuna API](https://developer.adzuna.com/)
- [Remotive API](https://remotive.com/remote-jobs/api)
- Official LinkedIn/Naukri partner APIs (requires partnership)

Keep `matchJobsForProfile()` as the scoring layer.
