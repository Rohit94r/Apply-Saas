import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardActivityTracker } from "@/components/dashboard/activity-tracker";
import { trackDashboardSession } from "@/lib/admin/session";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false
  }
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  try {
    await trackDashboardSession();
  } catch {
    // Ignore tracking errors so dashboard still loads
  }

  return (
    <DashboardShell>
      <DashboardActivityTracker />
      {children}
    </DashboardShell>
  );
}
