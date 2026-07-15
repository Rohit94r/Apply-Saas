# Content — editable copy & SEO

**Interns and marketers edit here.** No React, no API logic — only text, links, and structured data.

| Folder | What to edit | Who uses it |
|--------|--------------|-------------|
| `blog/` | SEO blog posts, keywords, sections | `/blog`, landing blog preview |
| `companies/` | Company / OA / resume placement pages | `/prepare`, `/prepare/[slug]`, sitemap |
| `learning/` | Student roadmaps, YouTube IDs, course URLs | `/dashboard/learners`, interview prep videos |
| `landing/` | Live web toolkit + Desktop coming-soon copy | Homepage, dashboard roadmap panel |

## Landing roadmap (`landing/phase-features.ts`)

| Export | Purpose |
|--------|---------|
| `phaseOneFeatures` | Live dashboard tools (Tailor, Jobs, Interview, …) |
| `phaseTwoFeatures` | Coming soon (Desktop Copilot, tracker, Stripe, …) |
| `phaseCopy` | Section titles / desktop highlight blurb |

Edit names and summaries there — UI in `components/landing/product-features-section.tsx` and `components/dashboard/roadmap-panel.tsx` reads this file.

## Still in `lib/data/` (migrate later)

| File | Edit when |
|------|-----------|
| `lib/data/companies.ts` | Company interview profiles + **question banks** (`companyQuestionBanks`) reused by `/prepare` pages |
| `lib/data/job-listings.ts` | Add curated job cards |
| `lib/data/freelance-catalog.ts` | Freelancing domains, subdomains, platforms, starter tips |
| `lib/seo.ts` | Site title, description, global keywords |

## Adding a new company / prepare page

1. Open `content/companies/pages.ts`
2. Copy an existing entry in `preparePages`
3. Set a unique `slug` (kebab-case), `title`, `description`, `targetKeyword`, and `keywords[]`
4. Set `companyId` to match an id in `lib/data/companies.ts` (add the company there if missing)
5. Optionally set `questionBankKey` to that same id so the page shows the shared question bank
6. Fill `sections` with practical India-placement copy (`heading`, `body[]`, optional `bullets[]`)
7. Wire CTAs: primary usually `/dashboard/generate` or `/dashboard/interview`; secondary can include `/dashboard/jobs` and `/sign-up`
8. Add 2–3 `relatedSlugs` pointing at other prepare pages
9. Deploy — routes + sitemap pick it up automatically:
   - Page: `/prepare/[slug]`
   - Index: `/prepare`
   - Sitemap: `app/sitemap.ts` reads `preparePages`

Question banks live in `lib/data/companies.ts` (`companyQuestionBanks`). Enrich questions there so multiple pages can reuse them.

## Adding a new blog post

1. Copy an entry in `blog/posts.ts`
2. Set unique `slug`, `targetKeyword`, `keywords[]`
3. Add sections with `heading` + `body[]` paragraphs
4. Deploy — sitemap picks it up via `app/sitemap.ts`

See `docs/seo-blog-template.md` for SEO checklist.
