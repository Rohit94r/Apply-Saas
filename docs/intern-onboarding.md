# Intern onboarding — Day 1

Welcome to **Apply** (apply.neexmeet.com). This is an AI resume + job-search platform for students.

## Hour 1 — Read

1. [README.md](../README.md) — product + stack
2. [docs/built-features-phase-two.md](./built-features-phase-two.md) — Section 1: what's live
3. [docs/folder-guide.md](./folder-guide.md) — folder map
4. [docs/WHERE-TO-EDIT.md](./WHERE-TO-EDIT.md) — cheat sheet

## Hour 2 — Run locally

```bash
npm install
cp .env.example .env.local   # ask founder for real keys
npm run dev
```

Open http://localhost:3000 → sign in → try `/dashboard/build` and `/dashboard/generate`.

## Hour 3 — Trace one feature

Pick **Job Search** (cleanest module):

```
app/dashboard/jobs/page.tsx
  → lib/data/jobs.ts
  → features/jobs/lib/match-jobs.ts
  → lib/data/job-listings.ts
```

Read `features/jobs/README.md` along the way.

## Hour 4 — Make a safe first change

Good first tasks:
- Add one job to `lib/data/job-listings.ts`
- Fix a typo in `content/blog/posts.ts`
- Add one company to `lib/data/companies.ts`

Run `npm run build` before opening a PR.

## Architecture rules

1. **Thin routes** — `app/` pages don't contain business logic
2. **Features** — new product code goes in `features/<name>/`
3. **Content** — marketing/SEO text goes in `content/`
4. **AI prompts** — only in `lib/ai/prompts.ts`
5. **No scraping** — job boards open via official search URLs
6. **Ask before changing** — sidebar, landing auth, branding

## Who to ask

| Topic | Person |
|-------|--------|
| Product priority | Rohit (founder) |
| Technical architecture | CTO docs + `docs/futureupgradation.md` |
| Deploy / Vercel issues | `docs/vercel-deploy.md` |

## Glossary

| Term | Meaning |
|------|---------|
| Master resume | User's base profile (upload once) |
| Tailored resume | Version optimized for one job |
| ATS score | Keyword match heuristic (not a real ATS) |
| Pro | Paid plan — manual UPI today, Stripe later |
| Groq | Free AI API (Llama models) |

## Your first PR checklist

- [ ] `npm run build` passes
- [ ] README updated if you added a feature folder
- [ ] No secrets in git
- [ ] Small focused diff — one feature or content change
