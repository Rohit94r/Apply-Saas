import { PUBLIC_ADMIN_EMAIL } from "@/lib/admin/config";

export function isAdminEmail(email?: string | null) {
  if (!email) {
    return false;
  }

  return email.toLowerCase() === PUBLIC_ADMIN_EMAIL.toLowerCase();
}
