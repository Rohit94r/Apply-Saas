# Apps — deployable applications

**Phase A (now):** The web app lives at the **repo root** (`app/`, `components/`, `lib/`). This folder is the future home.

| App | Status | Path |
|-----|--------|------|
| **Web** | ✅ Live at apply.neexmeet.com | Repo root today → `apps/web/` later |
| **Desktop** | 🔜 Phase 2 | `apps/desktop/` (Tauri) |

## Why not move web yet?

Moving `app/` into `apps/web/` breaks every import and Vercel config. We migrate in Phase C per `docs/futureupgradation.md`.

## When desktop starts

```
apps/desktop/
├── src/           # React UI
├── src-tauri/     # Rust shell
└── package.json
```

Desktop talks to web via `POST /api/desktop/auth` (Phase 2).
