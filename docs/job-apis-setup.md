# Job Search API setup

Add these to `.env.local` (never commit real keys).

## Quick overview

| Provider | Market | Register | Env vars |
|----------|--------|----------|----------|
| **Adzuna** | India, UK, US + 9 | [developer.adzuna.com/signup](https://developer.adzuna.com/signup) | `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`, `ADZUNA_COUNTRY` |
| **Reed** | UK | [reed.co.uk/developers](https://www.reed.co.uk/developers) | `REED_API_KEY` |
| **USAJOBS** | USA (federal) | [developer.usajobs.gov](https://developer.usajobs.gov/API-Request/) | `USAJOBS_API_KEY`, `USAJOBS_USER_AGENT` |
| **Juju** | USA aggregator | [juju.com/publisher/signup](https://www.juju.com/publisher/signup) | `JUJU_PARTNER_ID` |
| **HeroHunt** | Global talent signals | [herohunt.ai](https://www.herohunt.ai/people-search-api) | `HEROHUNT_API_KEY` |

Curated India listings always load from `lib/data/job-listings.ts` — no key required.

## Example `.env.local`

```bash
ADZUNA_APP_ID=your_app_id
ADZUNA_APP_KEY=your_app_key
ADZUNA_COUNTRY=in

REED_API_KEY=your_reed_key
USAJOBS_API_KEY=your_usajobs_key
USAJOBS_USER_AGENT=you@company.com

JUJU_PARTNER_ID=your_partner_id

HEROHUNT_API_KEY=ps_live_...
HEROHUNT_API_BASE_URL=https://api.herohunt.ai/v1/people/search
```

## How requests flow

```
/dashboard/jobs
    → GET /api/jobs/match
    → lib/data/jobs.ts
    → fetchLiveJobs()  (parallel: Adzuna, Reed, USAJOBS, Juju, HeroHunt)
    → merge + dedupe with lib/data/job-listings.ts
    → scoreListingsForProfile()
    → JSON to UI
```

## API reference links

- **Adzuna overview**: https://developer.adzuna.com/overview  
  `GET https://api.adzuna.com/v1/api/jobs/{country}/search/1?app_id=&app_key=&what=&where=`

- **Reed search**: https://www.reed.co.uk/developers/jobseeker  
  `GET https://www.reed.co.uk/api/1.0/search?keywords=&locationName=`

- **USAJOBS search**: https://developer.usajobs.gov/api-reference/  
  `GET https://data.usajobs.gov/api/search` + headers `Authorization-Key`, `User-Agent`

- **Juju RSS**: `GET https://api.juju.com/jobs?partnerid=&k=&l=`

- **HeroHunt**: Bearer token POST to `HEROHUNT_API_BASE_URL`

## Code locations

| Layer | Path |
|-------|------|
| Env config | `lib/config/job-apis.ts` |
| Providers | `features/jobs/lib/providers/*.ts` |
| Orchestrator | `features/jobs/lib/providers/fetch-live-jobs.ts` |
| Scoring | `features/jobs/lib/match-jobs.ts` |
| Service | `lib/data/jobs.ts` |
| UI overview | `features/jobs/components/job-api-overview.tsx` |

## Security

- Rotate any key that was pasted in chat or committed by mistake.
- All fetches run **server-side** only (API routes / RSC) — keys never go to the browser.
