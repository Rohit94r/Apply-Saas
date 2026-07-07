# Features — product modules

Each folder is one **product area**. New features go here first.

## Fully modular (code lives here)

| Feature | Route | README |
|---------|-------|--------|
| Job Search | `/dashboard/jobs` | [jobs/README.md](./jobs/README.md) |
| Freelancing | `/dashboard/freelancing` | *(see lib/find-clients.ts)* |

## Documented here — code migrates gradually

| Feature | Route | Map |
|---------|-------|-----|
| Resume Studio (build) | `/dashboard/build` | [resume-studio/README.md](./resume-studio/README.md) |
| Resume Tailor (upload) | `/dashboard/generate` | [resume-tailor/README.md](./resume-tailor/README.md) |
| Interview Prep | `/dashboard/interview` | [interview-prep/README.md](./interview-prep/README.md) |
| Learners | `/dashboard/learners` | [learning/README.md](./learning/README.md) |
| AI Tools | `/dashboard/tools` | [ai-tools/README.md](./ai-tools/README.md) |
| Billing | `/dashboard/upgrade` | [billing/README.md](./billing/README.md) |
| Analytics | `/dashboard/analytics` | [analytics/README.md](./analytics/README.md) |

## Feature folder template (for new features)

```
features/<name>/
├── README.md       ← what, why, API, data flow (required)
├── types.ts
├── index.ts        ← public exports
├── lib/            ← pure logic, no React
└── components/     ← UI only
```

**Rule:** Pages in `app/` stay thin — import from `features/<name>`.
