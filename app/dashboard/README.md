# Dashboard pages

Each file maps 1:1 to a product route. Keep pages **thin** — delegate to `features/` or `components/dashboard/`.

| File | Route | Feature README |
|------|-------|----------------|
| `page.tsx` | `/dashboard` | Overview |
| `generate/page.tsx` | `/dashboard/generate` | [features/resume-tailor](../features/resume-tailor/README.md) |
| `resumes/page.tsx` | `/dashboard/resumes` | Resume library |
| `jobs/page.tsx` | `/dashboard/jobs` | [features/jobs](../features/jobs/README.md) |
| `freelancing/page.tsx` | `/dashboard/freelancing` | [features/freelancing](../features/freelancing/README.md) |
| `learners/page.tsx` | `/dashboard/learners` | [features/learning](../features/learning/README.md) |
| `interview/page.tsx` | `/dashboard/interview` | [features/interview-prep](../features/interview-prep/README.md) |
| `tools/page.tsx` | `/dashboard/tools` | [features/ai-tools](../features/ai-tools/README.md) |
| `analytics/page.tsx` | `/dashboard/analytics` | [features/analytics](../features/analytics/README.md) |
| `upgrade/page.tsx` | `/dashboard/upgrade` | [features/billing](../features/billing/README.md) |
| `admin/page.tsx` | `/dashboard/admin` | Founder only |

Shell (sidebar, nav): `components/dashboard/dashboard-shell.tsx` — **ask before changing nav.**
