# Billing & Pro plan

> **Route:** `/dashboard/upgrade`  
> **User:** Free tier (5 generations) → manual UPI Pro (₹50/month)

## Code map

| Layer | Path |
|-------|------|
| Page | `app/dashboard/upgrade/page.tsx` |
| Checkout UI | `components/billing/upgrade-checkout.tsx` |
| Credits badge | `components/billing/credits-badge.tsx` |
| Limits | `lib/billing/usage.ts` — `assertCanGenerate`, `FREE_RESUME_LIMIT=5` |
| Payments | `lib/billing/payments.ts` |
| QR asset | `public/qrcode.png` |

## APIs

| Method | Route |
|--------|-------|
| GET/POST | `/api/billing/status` |
| POST | `/api/billing/payment-complete` |
| GET | `/api/billing/confirm` |
| POST | `/api/admin/subscription` |

## Phase 2

Stripe checkout — see `docs/futureupgradation.md`.
