# Apply Desktop — Phase 2 (scaffold)

**Status:** Coming soon · frontend teaser on landing `/#coming-soon`  
**Stack (planned):** Tauri 2 + React + TypeScript · syncs with Apply web account

This folder is the future home of the desktop Interview Copilot. Do **not** start the Tauri scaffold until Phase 1 quality exit criteria in `docs/built-features-phase-two.md` are met.

## Planned layout (when work starts)

```
apps/desktop/
├── src/
│   ├── components/     # Overlay, Controls, Settings
│   ├── hooks/          # useAudio, useTranscribe, useAnswer
│   └── App.tsx
├── src-tauri/          # Rust shell, hotkeys, window APIs
└── package.json
```

## Product surface (marketing copy)

| Piece | Notes |
|-------|-------|
| Name | **Interview Copilot** (Apply Desktop) |
| Modes | Mock / practice first — compliance-safe |
| Sync | `POST /api/desktop/auth` → session + master resume + plan |
| AI | Groq Whisper + Llama via **web API proxy** (no client keys) |

## Related docs

- `docs/built-features-phase-two.md` — Section 2A / 2C
- `docs/futureupgradation.md` — Desktop weeks 7–8
- `content/landing/phase-features.ts` — Landing “Coming soon” cards
