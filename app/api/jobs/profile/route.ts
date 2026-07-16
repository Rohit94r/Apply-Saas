/**
 * GET /api/jobs/profile
 *
 * Returns only the inferred job seeker profile (no job listings).
 * Useful for debugging and lightweight dashboard widgets.
 */

import { NextResponse } from "next/server";
import { getOptionalUserId } from "@/lib/auth";
import { getJobMatchesForUser } from "@/lib/data/jobs";

export async function GET() {
  const userId = await getOptionalUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { profile } = await getJobMatchesForUser(userId, { limit: 0 });

    return NextResponse.json({ profile });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Profile build failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
