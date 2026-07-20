"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  CaretLineLeft,
  CaretLineRight,
  Desktop,
  ShieldCheck
} from "@phosphor-icons/react";
import { UserMenu } from "@/components/auth/user-menu";
import { AuthSetupNotice } from "@/components/auth/auth-setup-notice";
import { Logo } from "@/components/landing/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { CreditsBadge } from "@/components/billing/credits-badge";
import { isAdminEmail } from "@/lib/admin/client";
import { authClient } from "@/lib/auth/client";
import {
  dashboardNavGroups,
  dashboardTitleForPath,
  isDashboardPathActive,
  type DashboardNavGroup
} from "@/lib/dashboard-nav";
import { cn } from "@/lib/utils";

export function DashboardShell({
  children,
  authConfigured = true
}: {
  children: React.ReactNode;
  authConfigured?: boolean;
}) {
  if (!authConfigured) {
    return <DashboardAuthSetup />;
  }

  return <AuthenticatedDashboardShell>{children}</AuthenticatedDashboardShell>;
}

function DashboardAuthSetup() {
  return <AuthSetupNotice fullPage={false} />;
}

function AuthenticatedDashboardShell({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [collapsed, setCollapsed] = useState(false);
  const displayName = user?.name ?? user?.email ?? "Apply user";
  const isAdmin = isAdminEmail(user?.email);
  const navGroups: DashboardNavGroup[] = isAdmin
    ? [
        ...dashboardNavGroups,
        {
          label: "Founder",
          items: [
            { label: "Admin", href: "/dashboard/admin", icon: ShieldCheck }
          ]
        }
      ]
    : dashboardNavGroups;
  const flatNavItems = navGroups.flatMap((group) => group.items);
  const pageMeta = dashboardTitleForPath(pathname);
  const isActive = (href: string) => isDashboardPathActive(pathname, href);

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
        <nav
          aria-label="Dashboard"
          className="mt-8 overflow-y-auto pb-24"
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        >
          {navGroups.map((group, groupIndex) => (
            <div key={group.label ?? "home"}>
              {groupIndex > 0 ? (
                group.label && !collapsed ? (
                  <p className="px-3 pb-1 pt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/80">
                    {group.label}
                  </p>
                ) : (
                  <div className="my-3 border-t border-border/70" />
                )
              ) : null}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-primary",
                      collapsed && "justify-center px-0",
                      isActive(item.href) && "bg-muted text-primary"
                    )}
                  >
                    <item.icon className="h-4 w-4" weight="regular" />
                    <span className={cn(collapsed && "sr-only")}>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {!collapsed ? (
            <p className="px-3 pb-1 pt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/80">
              Coming soon
            </p>
          ) : (
            <div className="my-3 border-t border-border/70" />
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
              <UserMenu />
            </div>
          </div>
          <nav
            aria-label="Dashboard"
            className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden"
          >
            {flatNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-muted-foreground",
                  isActive(item.href) && "border-primary/30 text-primary"
                )}
              >
                <item.icon className="h-3.5 w-3.5" weight="regular" />
                {item.shortLabel ?? item.label}
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
