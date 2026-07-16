import { createNeonAuth } from "@neondatabase/auth/next/server";

/**
 * Neon Auth (Managed Better Auth) server instance.
 *
 * Required env (from Neon Console → Project → Branch → Auth → Configuration):
 * - NEON_AUTH_BASE_URL
 * - NEON_AUTH_COOKIE_SECRET (`openssl rand -base64 32`, 32+ chars)
 *
 * TODO: Enable Auth in the Neon Console and replace the placeholder Auth URL
 * in `.env.local` before sign-in works end-to-end.
 */
const baseUrl =
  process.env.NEON_AUTH_BASE_URL?.trim() ||
  "https://ep-xxx.neonauth.us-east-1.aws.neon.tech/neondb/auth";

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
