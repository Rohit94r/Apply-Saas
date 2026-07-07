/**
 * POST /api/activity/track
 *
 * Records a lightweight user activity event (page_view, freelance, etc.) for
 * the signed-in user. Used by the client-side route tracker in the dashboard
 * so the admin "Recent activity" panel can show what each user actually saw.
 *
 * Body: { action: ActivityAction, detail?: string }
 */

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCurrentUserProfile } from "@/lib/billing/users";
import { recordActivity } from "@/lib/admin/activity";
import type { ActivityAction } from "@/models/UserActivity";

const ALLOWED_ACTIONS: ActivityAction[] = [
  "page_view",
  "freelance",
  "generate",
  "build",
  "interview",
  "jobs",
  "tools",
  "upgrade"
];

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { action?: string; detail?: string };

  try {
    body = (await request.json()) as { action?: string; detail?: string };
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const action = body.action as ActivityAction;

  if (!ALLOWED_ACTIONS.includes(action)) {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  try {
    const profile = await getCurrentUserProfile();
    await recordActivity({
      clerkId: profile.userId,
      email: profile.email,
      name: profile.name,
      action,
      detail: body.detail?.slice(0, 140)
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to record activity";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
