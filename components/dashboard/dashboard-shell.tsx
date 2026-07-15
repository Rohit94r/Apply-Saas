"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Briefcase,
  CaretLineLeft,
  CaretLineRight,
  Desktop,
  FileText,
  GraduationCap,
  House,
  ListChecks,
  MagicWand,
  Microphone,
  ShieldCheck,
  Sparkle,
  Storefront
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Logo } from "@/components/landing/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { CreditsBadge } from "@/components/billing/credits-badge";
import { isAdminEmail } from "@/lib/admin/client";
import { clerkIsConfigured } from "@/lib/clerk-config";
import { cn } from "@/lib/utils";

const navItems: Array<{
  label: string;
  href: string;
  icon: PhosphorIcon;
  /** Shorter label for the mobile chip row */
  shortLabel?: string;
}> = [
  { label: "Home", href: "/dashboard", icon: House },
  { label: "My resumes", href: "/dashboard/resumes", icon: FileText, shortLabel: "Resumes" },
  {
    label: "Applications & progress",
    href: "/dashboard/applications",
    icon: ListChecks,
    shortLabel: "Apps"
  },
  { label: "Learning", href: "/dashboard/learners", icon: GraduationCap },
  {
    label: "Interview prep",
    href: "/dashboard/interview",
    icon: Briefcase,
    shortLabel: "Prep"
  },
  {
    label: "Mock interview",
    href: "/dashboard/mock-interview",
    icon: Microphone,
    shortLabel: "Mock"
  },
  { label: "Freelancing", href: "/dashboard/freelancing", icon: Storefront },
  { label: "AI tools", href: "/dashboard/tools", icon: MagicWand, shortLabel: "Tools" },
  { label: "Upgrade", href: "/dashboard/upgrade", icon: Sparkle }
];

const pageTitles: Array<{ match: (path: string) => boolean; title: string; eyebrow: string }> = [
  {
    match: (p) => p === "/dashboard",
    title: "Your Apply home",
    eyebrow: "Placement prep"
  },
  {
    match: (p) => p.startsWith("/dashboard/applications"),
    title: "Applications & progress",
    eyebrow: "Tracker + readiness"
  },
  {
    match: (p) => p.startsWith("/dashboard/tools"),
    title: "AI tools",
    eyebrow: "Cover letter, offers & more"
  },
  {
    match: (p) => p.startsWith("/dashboard/offers"),
    title: "Compare offers",
    eyebrow: "AI tools"
  },
  {
    match: (p) => p.startsWith("/dashboard/cover-letters"),
    title: "Cover letters",
    eyebrow: "Saved history"
  },
  {
    match: (p) => p.startsWith("/dashboard/generate"),
    title: "Tailor resume",
    eyebrow: "Job-ready PDF"
  },
  {
    match: (p) => p.startsWith("/dashboard/mock-interview"),
    title: "Mock interview",
    eyebrow: "Practice room"
  },
  {
    match: (p) => p.startsWith("/dashboard/interview"),
    title: "Interview prep",
    eyebrow: "Questions & roadmap"
  },
  {
    match: (p) => p.startsWith("/dashboard/jobs"),
    title: "Job search",
    eyebrow: "Find openings"
  },
  {
    match: (p) => p.startsWith("/dashboard/resumes"),
    title: "My resumes",
    eyebrow: "Your library"
  },
  {
    match: (p) => p.startsWith("/dashboard/freelancing"),
    title: "Freelancing",
    eyebrow: "Client outreach"
  },
  {
    match: (p) => p.startsWith("/dashboard/learners"),
    title: "Learning",
    eyebrow: "Skill gaps"
  },
  {
    match: (p) => p.startsWith("/dashboard/settings"),
    title: "Settings",
    eyebrow: "Account"
  },
  {
    match: (p) => p.startsWith("/dashboard/upgrade"),
    title: "Upgrade",
    eyebrow: "Pro access"
  },
  {
    match: (p) => p.startsWith("/dashboard/admin"),
    title: "Admin",
    eyebrow: "Founder tools"
  }
];

function titleForPath(pathname: string) {
  return (
    pageTitles.find((entry) => entry.match(pathname)) ?? {
      title: "Your Apply home",
      eyebrow: "Placement prep"
    }
  );
}

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
  const pageMeta = titleForPath(pathname);

  /** Home is exact-only so nested routes never highlight it. */
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    if (href === "/dashboard/tools") {
      return (
        pathname.startsWith("/dashboard/tools") ||
        pathname.startsWith("/dashboard/cover-letters")
      );
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee] dark:bg-[#131318]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-border bg-[#fbfaf6] p-4 transition-[width] duration-200 lg:block dark:bg-[#16161c] dark:border-[#2a2a32]",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <Logo className={cn(collapsed && "[&>span:last-child]:hidden")} />
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-muted-foreground transition hover:text-primary dark:bg-[#1e1e24] dark:border-[#2a2a32]"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <CaretLineRight className="h-4 w-4" weight="regular" />
            ) : (
              <CaretLineLeft className="h-4 w-4" weight="regular" />
            )}
          </button>
        </div>
        <nav className="mt-10 space-y-1 overflow-y-auto pb-24" style={{ maxHeight: "calc(100vh - 8rem)" }}>
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-primary",
                collapsed && "justify-center px-0",
                isActive(item.href) && "bg-muted text-primary"
              )}
            >
              <item.icon className="h-4 w-4" weight="regular" />
              <span className={cn(collapsed && "sr-only")}>{item.label}</span>
            </Link>
          ))}
          {!collapsed ? (
            <p className="px-3 pb-1 pt-5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Coming soon
            </p>
          ) : (
            <div className="my-3 border-t border-border" />
          )}
          <Link
            href="/downloads"
            title="Apply Desktop — coming soon"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground/80 transition hover:bg-muted hover:text-primary",
              collapsed && "justify-center px-0"
            )}
          >
            <Desktop className="h-4 w-4" weight="regular" />
            <span className={cn("flex min-w-0 items-center gap-2", collapsed && "sr-only")}>
              <span className="truncate">Interview Copilot</span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide">
                Soon
              </span>
            </span>
          </Link>
        </nav>
        {!collapsed ? (
          <div className="absolute bottom-5 left-4 right-4 space-y-3">
            <CreditsBadge />
          </div>
        ) : null}
      </aside>
      <div className={cn("transition-[padding] duration-200", collapsed ? "lg:pl-20" : "lg:pl-64")}>
        <header className="sticky top-0 z-30 border-b border-border bg-[#f7f4ee]/88 px-5 py-4 backdrop-blur lg:px-8 dark:bg-[#131318]/88 dark:border-[#2a2a32]">
          <div className="flex items-center justify-between gap-4">
            <div className="lg:hidden">
              <Logo />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-muted-foreground">{pageMeta.eyebrow}</p>
              <h1 className="text-lg font-semibold text-foreground">{pageMeta.title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 sm:flex">
                <ThemeToggle />
                <CreditsBadge compact />
                <div className="rounded-full border border-border bg-white px-4 py-2 text-sm text-muted-foreground dark:bg-[#1a1a20] dark:border-[#2a2a32]">
                  {displayName}
                </div>
              </div>
              <div className="sm:hidden">
                <ThemeToggle />
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
                  isActive(item.href) && "border-primary/30 text-primary"
                )}
              >
                <item.icon className="h-3.5 w-3.5" weight="regular" />
                {"shortLabel" in item && item.shortLabel
                  ? item.shortLabel
                  : item.label}
              </Link>
            ))}
            <Link
              href="/downloads"
              className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-muted-foreground"
            >
              <Desktop className="h-3.5 w-3.5" weight="regular" />
              Desktop soon
            </Link>
          </nav>
        </header>
        <main className="px-5 py-8 lg:px-8 lg:py-10 dark:text-foreground">{children}</main>

      </div>
    </div>
  );
}
