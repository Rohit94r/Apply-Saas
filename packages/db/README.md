# packages/db

PostgreSQL + Drizzle ORM on Neon.

## Setup

1. Set `DATABASE_URL` in `.env.local` (never commit real credentials).
2. Prefer `?sslmode=require` if SSL / channel binding fails.
3. Push schema: `npm run db:push`
4. Generate migrations: `npm run db:generate`
5. Browse data: `npm run db:studio`

## Tables

| Table | Replaces |
|-------|----------|
| `users` | `models/User` (`user_id` = Neon Auth / legacy Clerk id) |
| `resumes` | `models/MasterResume` |
| `tailored_resumes` | `models/GeneratedResume` |
| `interview_guides` | `models/InterviewGuide` |
| `job_applications` | `models/JobApplication` |
| `cover_letters` | `models/CoverLetter` |
| `offers` | `models/Offer` |
| `payment_requests` | `models/PaymentRequest` |
| `device_usage` | `models/DeviceUsage` |
| `user_activity` | `models/UserActivity` |
| `mock_interview_sessions` | `models/MockInterviewSession` |

Connection helper: `lib/db/index.ts`
