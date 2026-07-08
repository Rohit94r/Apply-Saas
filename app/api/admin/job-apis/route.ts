import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/admin/auth";
import { getJobApiHealthReport } from "@/lib/admin/job-api-health";

/** GET /api/admin/job-apis — live Adzuna + HeroHunt status (admin only). */
export async function GET() {
  try {
    await assertAdmin();
    const report = await getJobApiHealthReport();
    return NextResponse.json(report);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to check job APIs";
    const status =
      message === "Forbidden" ? 403 : message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
