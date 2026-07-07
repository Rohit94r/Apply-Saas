# Analytics

> **Route:** `/dashboard/analytics`  
> **User:** Track ATS scores, keyword coverage, readiness

## Code map

| Layer | Path |
|-------|------|
| Page | `app/dashboard/analytics/page.tsx` |
| Charts | `components/dashboard/dashboard-overview.tsx` |
| Aggregations | `lib/data/resumes.ts` — `buildDashboardStats`, `buildKeywordCoverage`, `buildReadinessScore` |

## Data source

Reads `GeneratedResume` + `InterviewGuide` from MongoDB — no separate analytics DB.

## Phase 2

Time-series charts, export PDF, Umami funnel integration.
