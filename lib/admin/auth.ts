import { ADMIN_EMAIL } from "@/lib/admin/config";
import { getCurrentUserProfile } from "@/lib/billing/users";

export async function assertAdmin() {
  const profile = await getCurrentUserProfile();

  if (!isAdminEmail(profile.email)) {
    throw new Error("Forbidden");
  }

  return profile;
}

export function isAdminEmail(email?: string | null) {
  if (!email) {
    return false;
  }

  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}
