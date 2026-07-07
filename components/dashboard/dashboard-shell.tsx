"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Briefcase,
  CaretLineLeft,
  CaretLineRight,
  ChartBar,
  FileText,
  GraduationCap,
  House,
  MagicWand,
  MagnifyingGlass,
  ShieldCheck,
  Sparkle,
  Stack,
  Storefront
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Logo } from "@/components/landing/logo";
import { CreditsBadge } from "@/components/billing/credits-badge";
import { isAdminEmail } from "@/lib/admin/client";
import { clerkIsConfigured } from "@/lib/clerk-config";
import { cn } from "@/lib/utils";

const navItems: Array<{
  label: string;
  href: string;
  icon: PhosphorIcon;
}> = [
  { label: "Overview", href: "/dashboard", icon: House },
  { label: "My resumes", href: "/dashboard/resumes", icon: FileText },
  { label: "Tailor", href: "/dashboard/generate", icon: Sparkle },
  { label: "Job search", href: "/dashboard/jobs", icon: MagnifyingGlass },
  { label: "Freelancing", href: "/dashboard/freelancing", icon: Storefront },
  { label: "Build resume", href: "/dashboard/build", icon: Stack },
  { label: "Learner prep", href: "/dashboard/learners", icon: GraduationCap },
  { label: "Interview prep", href: "/dashboard/interview", icon: Briefcase },
  { label: "AI tools", href: "/dashboard/tools", icon: MagicWand },
  { label: "Analytics", href: "/dashboard/analytics", icon: ChartBar },
  { label: "Upgrade", href: "/dashboard/upgrade", icon: Sparkle }
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  if (!clerkIsConfigured) {
    return <DashboardAuthSetup />;
  }

  return <AuthenticatedDashboardShell>{children}</AuthenticatedDashboardShell>;
}

function DashboardAuthSetup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f4ee] px-5">
      <div className="max-w-md rounded-xl border border-border bg-white p-6 text-center shadow-sm">
        <Logo className="justify-center" />
        <h1 className="mt-6 text-xl font-semibold text-foreground">
          Clerk is not configured
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Add a real NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in
          Vercel before opening the dashboard.
        </p>
      </div>
    </div>
  );
}

function AuthenticatedDashboardShell({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();
  const [collapsed, setCollapsed] = useState(false);
  const displayName =
    user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "Apply user";
  const isAdmin = isAdminEmail(user?.primaryEmailAddress?.emailAddress);
  const sidebarItems = isAdmin
    ? [
        ...navItems,
        { label: "Admin", href: "/dashboard/admin", icon: ShieldCheck }
      ]
    : navItems;

  return (
    <div className="min-h-screen bg-[#f7f4ee]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-border bg-[#fbfaf6] p-4 transition-[width] duration-200 lg:block",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <Logo className={cn(collapsed && "[&>span:last-child]:hidden")} />
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-muted-foreground transition hover:text-primary"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <CaretLineRight className="h-4 w-4" weight="regular" />
            ) : (
              <CaretLineLeft className="h-4 w-4" weight="regular" />
            )}
          </button>
        </div>
        <nav className="mt-10 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-primary",
                collapsed && "justify-center px-0",
                pathname === item.href && "bg-muted text-primary"
              )}
            >
              <item.icon className="h-4 w-4" weight="regular" />
              <span className={cn(collapsed && "sr-only")}>{item.label}</span>
            </Link>
          ))}
        </nav>
        {!collapsed ? (
          <div className="absolute bottom-5 left-4 right-4 space-y-3">
            <CreditsBadge />
          </div>
        ) : null}
      </aside>
      <div className={cn("transition-[padding] duration-200", collapsed ? "lg:pl-20" : "lg:pl-64")}>
        <header className="sticky top-0 z-30 border-b border-border bg-[#f7f4ee]/88 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="lg:hidden">
              <Logo />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-muted-foreground">Workspace</p>
              <h1 className="text-lg font-semibold text-foreground">Apply dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 sm:flex">
                <CreditsBadge compact />
                <div className="rounded-full border border-border bg-white px-4 py-2 text-sm text-muted-foreground">
                  {displayName}
                </div>
              </div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
              />
            </div>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-muted-foreground",
                  pathname === item.href && "border-primary/30 text-primary"
                )}
              >
                <item.icon className="h-3.5 w-3.5" weight="regular" />
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="px-5 py-8 lg:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
