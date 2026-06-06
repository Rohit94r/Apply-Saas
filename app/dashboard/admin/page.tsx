import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { assertAdmin } from "@/lib/admin/auth";

export default async function AdminPage() {
  try {
    await assertAdmin();
  } catch {
    redirect("/dashboard");
  }

  return <AdminDashboard />;
}
