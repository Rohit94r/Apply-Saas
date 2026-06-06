import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/admin/auth";
import { getAdminOverview } from "@/lib/admin/activity";

export async function GET() {
  try {
    await assertAdmin();
    const overview = await getAdminOverview();
    return NextResponse.json(overview);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load admin data";
    const status = message === "Forbidden" ? 403 : message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
