import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardActivityTracker } from "@/components/dashboard/activity-tracker";
import { getCurrentUser } from "@/lib/auth";
import { isAuthConfigured } from "@/lib/auth-config";
import { trackDashboardSession } from "@/lib/admin/session";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  if (!isAuthConfigured()) {
    return (
      <DashboardShell authConfigured={false}>{children}</DashboardShell>
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  try {
    await trackDashboardSession();
  } catch {
    // Ignore tracking errors so dashboard still loads
  }

  return (
    <DashboardShell authConfigured>
      <DashboardActivityTracker />
      {children}
    </DashboardShell>
  );
}
