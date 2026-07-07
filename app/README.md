# App — Next.js routes (thin layer)

**Rule:** Pages only fetch data and render components. Business logic lives in `features/` or `lib/`.

```
app/
├── layout.tsx          # Root layout, SEO metadata, Clerk, scripts
├── page.tsx            # Landing page
├── (auth)/             # Clerk sign-in / sign-up
├── blog/               # SEO blog (content from content/blog/)
├── dashboard/          # Protected product UI → see dashboard/README.md
└── api/                # REST handlers → see api/README.md
```

## Public vs protected

| Area | Auth |
|------|------|
| `/`, `/blog/*` | Public |
| `/dashboard/*`, `/api/*` | Clerk required (see `middleware.ts`) |

## SEO files (do not move)

| File | Purpose |
|------|---------|
| `sitemap.ts` | `/sitemap.xml` |
| `robots.ts` | `/robots.txt` |
| `manifest.ts` | PWA manifest |

Global SEO config: `lib/seo.ts`
