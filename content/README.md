# Content — editable copy & SEO

**Interns and marketers edit here.** No React, no API logic — only text, links, and structured data.

| Folder | What to edit | Who uses it |
|--------|--------------|-------------|
| `blog/` | SEO blog posts, keywords, sections | `/blog`, landing blog preview |
| `learning/` | Student roadmaps, YouTube IDs, course URLs | `/dashboard/learners`, interview prep videos |
| `landing/` | Phase 1 live + Phase 2 coming-soon feature copy | Homepage, dashboard roadmap panel |

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
| `lib/data/companies.ts` | Add company interview profiles |
| `lib/data/job-listings.ts` | Add curated job cards |
| `lib/data/freelance-catalog.ts` | Freelancing service categories |
| `lib/seo.ts` | Site title, description, global keywords |

## Adding a new blog post

1. Copy an entry in `blog/posts.ts`
2. Set unique `slug`, `targetKeyword`, `keywords[]`
3. Add sections with `heading` + `body[]` paragraphs
4. Deploy — sitemap picks it up via `app/sitemap.ts`

See `docs/seo-blog-template.md` for SEO checklist.
