import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard"
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  return <DashboardShell>{children}</DashboardShell>;
}
