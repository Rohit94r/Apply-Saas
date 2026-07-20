/**
 * GET /api/jobs/match
 *
 * Returns personalized job matches based on the user's uploaded or built resume.
 * No request body required — uses latest master resume + latest generated resume.
 */

import { NextResponse } from "next/server";
import { getOptionalUserId } from "@/lib/auth";
import { getJobMatchesForUser } from "@/lib/data/jobs";
import { jobCountries } from "@/lib/config/job-countries";

export async function GET(request: Request) {
  const userId = await getOptionalUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const requestedLimit = Number(searchParams.get("limit") ?? "30");
  const limit = Number.isInteger(requestedLimit)
    ? Math.min(50, Math.max(1, requestedLimit))
    : 30;
  const country = searchParams.get("country") ?? undefined;
  if (country && !jobCountries.some((item) => item.id === country)) {
    return NextResponse.json({ error: "Unsupported job market" }, { status: 400 });
  }
  const jobTypeParam = searchParams.get("jobType");
  const jobType =
    jobTypeParam === "internship" ||
    jobTypeParam === "full-time" ||
    jobTypeParam === "contract"
      ? jobTypeParam
      : "all";

  try {
    const result = await getJobMatchesForUser(userId, {
      limit,
      country,
      jobType
    });

    // Public response — no provider diagnostics (admin: GET /api/admin/job-apis).
    const { providerStatus, ...publicResult } = result;
    void providerStatus;

    return NextResponse.json(publicResult);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Job matching failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
