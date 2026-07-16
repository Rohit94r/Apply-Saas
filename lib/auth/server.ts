import { createNeonAuth } from "@neondatabase/auth/next/server";

/**
 * Neon Auth (Managed Better Auth) server instance.
 *
 * Required env (only these two — see Neon Next.js quick start):
 * - NEON_AUTH_BASE_URL — Console → Project → Branch → Auth → Configuration
 * - NEON_AUTH_COOKIE_SECRET — `openssl rand -base64 32` (32+ chars)
 *
 * Enable Auth in the Neon Console once; then paste the Auth URL into .env.local.
 */
const baseUrl =
  process.env.NEON_AUTH_BASE_URL?.trim() ||
  "https://ep-xxx.neonauth.c-3.us-east-1.aws.neon.tech/neondb/auth";

const cookieSecret =
  process.env.NEON_AUTH_COOKIE_SECRET?.trim() ||
  "dev-only-placeholder-cookie-secret-min-32-chars";

export const auth = createNeonAuth({
  baseUrl,
  cookies: {
    secret: cookieSecret
  },
  logLevel: process.env.NODE_ENV === "production" ? "warn" : "warn"
});
