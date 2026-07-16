import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { neonAuthIsConfigured } from "@/lib/auth-config";
import { auth } from "@/lib/auth/server";

const neonMiddleware = auth.middleware({
  loginUrl: "/sign-in"
});

/**
 * Protects /dashboard and authenticated APIs when Neon Auth is configured.
 * Public marketing routes (/ , /blog, /pyqs, /mock-interview, /prepare) are
 * intentionally outside the matcher. /api/auth stays public for Neon Auth.
 *
 * Until NEON_AUTH_BASE_URL is a real Auth URL from the Neon Console,
 * middleware is a no-op so the app still boots with placeholder env.
 * API handlers still enforce auth via getOptionalUserId / getCurrentUserId.
 */
export default function middleware(request: NextRequest) {
  if (!neonAuthIsConfigured) {
    return NextResponse.next();
  }

  return neonMiddleware(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/jobs/:path*",
    "/api/company/:path*",
    "/api/cover-letter/:path*",
    "/api/critique/:path*",
    "/api/interview/:path*",
    "/api/interview-prep/:path*",
    "/api/mock-interview/:path*",
    "/api/applications/:path*",
    "/api/offers/:path*",
    "/api/pdf/:path*",
    "/api/photo/:path*",
    "/api/resumes/:path*",
    "/api/billing/:path*",
    "/api/admin/:path*",
    "/api/uploadthing/:path*",
    "/api/activity/:path*"
  ]
};
