# Packages — shared code (monorepo Phase C)

Extract shared logic here when we add Postgres + desktop. **Empty scaffolds today.**

| Package | Purpose | Migrated from |
|---------|---------|---------------|
| `db/` | Drizzle schema, migrations, Neon Postgres | `models/` + `lib/data/` |
| `shared/` | Zod schemas, API types, constants | `types/`, `lib/validations.ts` |
| `ai/` | Groq, Gemini, router, prompts | `lib/ai/` |

Will use `pnpm-workspace.yaml` + `turbo.json` when ready.

**Do not import from packages/ in production code yet.**
