/**
 * GET /api/jobs/match
 *
 * Returns personalized job matches based on the user's uploaded or built resume.
 * No request body required — uses latest master resume + latest generated resume.
 */

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getJobMatchesForUser } from "@/lib/data/jobs";

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "12");

  try {
    const result = await getJobMatchesForUser(userId, {
      limit: Number.isFinite(limit) ? limit : 12
    });

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Job matching failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
