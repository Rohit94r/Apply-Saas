# Freelancing — Find clients

> **Route:** `/dashboard/freelancing`  
> **User:** Students offering services (web design, etc.) — find local businesses to pitch

## Code map

| Layer | Path |
|-------|------|
| Page | `app/dashboard/freelancing/page.tsx` |
| UI | `features/freelancing/components/freelance-workspace.tsx` |
| Link builder | `features/freelancing/lib/find-clients.ts` |
| Service catalog | `lib/data/freelance-catalog.ts` |

## How it works

User picks a service + city → generates deep links to:
- Google Maps, Justdial, IndiaMART, Google Search, LinkedIn

**We do not scrape** phone numbers — directories show them live.

## Phase 2

Pitch templates, outreach tracker — see `docs/built-features-phase-two.md`.
