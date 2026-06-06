import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)"
]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/dashboard(.*)",
    "/api/jobs(.*)",
    "/api/company(.*)",
    "/api/cover-letter(.*)",
    "/api/critique(.*)",
    "/api/interview(.*)",
    "/api/pdf(.*)",
    "/api/photo(.*)",
    "/api/resumes(.*)",
    "/api/billing(.*)",
    "/api/admin(.*)",
    "/api/uploadthing(.*)"
  ]
};
