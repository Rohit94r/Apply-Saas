# Models — Mongoose schemas

One file per MongoDB collection. **Do not query models directly in pages** — use `lib/data/resumes.ts`.

| Model | Collection | Purpose |
|-------|------------|---------|
| `User.ts` | users | Clerk ID, Pro plan expiry |
| `MasterResume.ts` | masterresumes | Uploaded / master profile text |
| `GeneratedResume.ts` | generatedresumes | Tailored & built versions |
| `InterviewGuide.ts` | interviewguides | Interview prep plans |
| `PaymentRequest.ts` | paymentrequests | Manual UPI payments |
| `DeviceUsage.ts` | deviceusage | Free tier per device |
| `UserActivity.ts` | useractivity | Feature usage events |

## Phase 2

Replaced by Drizzle schema in `packages/db/` — see `docs/futureupgradation.md`.

Types shared with frontend: `types/index.ts`
