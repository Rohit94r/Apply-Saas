import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth/auth.config";
import { isGoogleAuthConfigured } from "@/lib/auth-config";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  if (!isGoogleAuthConfigured()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const isLoggedIn = Boolean(request.auth);

  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    const signInUrl = new URL("/sign-in", request.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

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
