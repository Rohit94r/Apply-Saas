# Components

```
components/
├── ui/              # Buttons, cards, inputs — design system primitives
├── landing/         # Public homepage sections (SEO marketing)
├── dashboard/       # Logged-in UI (shell, forms, resume studio)
├── billing/         # Upgrade checkout
├── admin/           # Founder admin panel
├── animations/      # Framer Motion wrappers
└── providers.tsx    # React context (toasts, etc.)
```

## Where to add UI

| Task | Folder |
|------|--------|
| New dashboard feature UI | `features/<name>/components/` (preferred) or `components/dashboard/` |
| Landing page section | `components/landing/` |
| Shared button/input | `components/ui/` |
| Reusable across one feature | Inside that `features/` folder |

## Do not change without approval

- `dashboard-shell.tsx` — sidebar navigation
- `landing/site-header.tsx`, `footer.tsx` — public branding
- Auth pages under `app/(auth)/`

## Resume UI split (historical)

| Feature | Component path |
|---------|----------------|
| Build studio | `dashboard/resume-studio/` |
| Tailor upload | `dashboard/resume-improve/` |
| Old builder form | `dashboard/resume-builder/` (legacy) |

Future: consolidate under `features/resume-studio/` and `features/resume-tailor/`.
