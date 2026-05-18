"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Wand2
} from "lucide-react";
import { Logo } from "@/components/landing/logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "My resumes", href: "/dashboard/resumes", icon: FileText },
  { label: "Generate", href: "/dashboard/generate", icon: Sparkles },
  { label: "Interview prep", href: "/dashboard/interview", icon: BriefcaseBusiness },
  { label: "AI tools", href: "/dashboard/tools", icon: Wand2 },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 }
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const [collapsed, setCollapsed] = useState(false);
  const displayName =
    user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "Apply user";

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
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>
        <nav className="mt-10 space-y-1">
          {navItems.map((item) => (
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
              <item.icon className="h-4 w-4" />
              <span className={cn(collapsed && "sr-only")}>{item.label}</span>
            </Link>
          ))}
        </nav>
        {!collapsed ? (
          <div className="absolute bottom-5 left-4 right-4 rounded-xl border border-accent/20 bg-accent/10 p-4">
            <p className="text-sm font-semibold text-accent">Free plan</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              10 resume generations included. Pro is ready for ₹149 or $4 monthly pricing.
            </p>
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
              <div className="hidden rounded-full border border-border bg-white px-4 py-2 text-sm text-muted-foreground sm:block">
                {displayName}
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-muted-foreground",
                  pathname === item.href && "border-primary/30 text-primary"
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
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
