# Where to edit — quick reference

One-page guide for interns and founders. **Find → edit → deploy.**

## I want to change…

| Goal | Edit this file |
|------|----------------|
| Blog post / SEO article | `content/blog/posts.ts` |
| Learner roadmap / YouTube links | `content/learning/tracks.ts` |
| Site title, meta description | `lib/seo.ts` |
| Google verification meta tag | `app/layout.tsx` → `metadata.verification` |
| Company interview profiles | `lib/data/companies.ts` |
| Job listing cards | `lib/data/job-listings.ts` |
| AI prompt wording | `lib/ai/prompts.ts` |
| Which AI model runs | `lib/ai/openai.ts` (soon `lib/ai/router.ts`) |
| Free tier limit (5 resumes) | `lib/billing/constants.ts` |
| Pro price / discount codes | `lib/billing/constants.ts`, `lib/billing/discount-codes.ts` |
| UPI QR image | `public/qrcode.png` |
| Landing page copy | `components/landing/*.tsx` |
| Dashboard sidebar links | `components/dashboard/dashboard-shell.tsx` ⚠️ ask first |
| New dashboard page | `app/dashboard/<name>/page.tsx` + feature README |
| New API endpoint | `app/api/<name>/route.ts` + `lib/validations.ts` |
| PDF layout / fonts | `lib/pdf/resume-document.tsx` |
| Resume studio sections | `lib/resume-studio/sections.ts` |

## I want to understand…

| Question | Read |
|----------|------|
| Full folder map | `docs/folder-guide.md` |
| What's built + quality gaps | `docs/built-features-phase-two.md` |
| Future Postgres, desktop, Stripe | `docs/futureupgradation.md` |
| One feature deep-dive | `features/<name>/README.md` |
| Job search internals | `features/jobs/README.md` |
| Resume tailor flow | `docs/system-design.md` |
| Deploy to Vercel | `docs/vercel-deploy.md` |
| Google Search Console | `docs/google-search-console-setup.md` |

## I want to add…

| Addition | Steps |
|----------|-------|
| **New product feature** | 1. `features/<name>/` with README 2. `app/dashboard/<route>/page.tsx` 3. `app/api/...` if needed |
| **New blog post** | Add entry in `content/blog/posts.ts` → auto in sitemap |
| **New company** | Add to `lib/data/companies.ts` |
| **New job card** | Add to `lib/data/job-listings.ts` |
| **New API validation** | Schema in `lib/validations.ts` |
| **New Mongo collection** | `models/` + service in `lib/data/` |

## Do not edit casually

| File | Why |
|------|-----|
| `middleware.ts` | Auth protection for all routes |
| `lib/data/resumes.ts` | Core DB — test all resume flows after changes |
| `lib/ai/resume-engine.ts` | Large AI engine — change with tests |
| `.env.local` | Secrets — never commit |

## Deploy checklist

```bash
npm run build    # must pass before push
git push         # Vercel auto-deploys
```

After content-only changes (blog, learning tracks), build is still recommended.
