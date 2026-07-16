# Models — compatibility types

App storage is **Drizzle + Neon Postgres** (`packages/db/schema.ts`).
Files here export TypeScript types / helpers for callers that still import `@/models/*`.
**Do not query models directly in pages** — use `lib/data/*`.

| File | Maps to table | Purpose |
|------|---------------|---------|
| `User.ts` | `users` | Auth user id, Pro plan expiry |
| `MasterResume.ts` | `resumes` | Uploaded / master profile text |
| `GeneratedResume.ts` | `tailored_resumes` | Tailored & built versions |
| `InterviewGuide.ts` | `interview_guides` | Interview prep plans |
| `PaymentRequest.ts` | `payment_requests` | Manual UPI payments |
| `DeviceUsage.ts` | `device_usage` | Free tier per device |
| `UserActivity.ts` | `user_activity` | Feature usage events |

Canonical schema: `packages/db/schema.ts`. Connection: `lib/db/index.ts`.

Types shared with frontend: `types/index.ts`
