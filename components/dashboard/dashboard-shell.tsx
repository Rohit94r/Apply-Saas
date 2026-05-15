"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  Home,
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

  return (
    <div className="min-h-screen bg-[#f7f4ee]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-[#fbfaf6] p-5 lg:block">
        <Logo />
        <nav className="mt-10 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-primary",
                pathname === item.href && "bg-muted text-primary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-accent/20 bg-accent/10 p-4">
          <p className="text-sm font-semibold text-accent">Free plan</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            10 resume generations included. Pro is ready for ₹149 or $4 monthly pricing.
          </p>
        </div>
      </aside>
      <div className="lg:pl-72">
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
                apply.neexmeet.com
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                AM
              </div>
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
