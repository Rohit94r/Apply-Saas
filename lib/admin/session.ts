import { getCurrentUserProfile, ensureUser } from "@/lib/billing/users";
import { trackUserSession } from "@/lib/admin/activity";
import type { ActivityAction } from "@/models/UserActivity";
import { recordActivity } from "@/lib/admin/activity";

export async function trackDashboardSession() {
  const profile = await getCurrentUserProfile();
  await ensureUser(profile.userId);
  await trackUserSession({
    clerkId: profile.userId,
    email: profile.email,
    name: profile.name
  });
}

export async function logFeatureUse(action: ActivityAction, detail?: string) {
  try {
    const profile = await getCurrentUserProfile();
    await recordActivity({
      clerkId: profile.userId,
      email: profile.email,
      name: profile.name,
      action,
      detail
    });
  } catch {
    // Non-blocking activity logging
  }
}
