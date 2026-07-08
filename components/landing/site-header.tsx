"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { clerkIsConfigured } from "@/lib/clerk-config";
import { siteConfig } from "@/lib/constants";

export function SiteHeader() {
  if (!clerkIsConfigured) {
    return <PublicSiteHeader />;
  }

  return <ClerkSiteHeader />;
}

function PublicSiteHeader() {
  return (
    <HeaderShell>
      <Link
        href="/sign-in"
        className="hidden text-sm font-medium text-foreground/80 transition hover:text-primary sm:inline-flex"
      >
        Log in
      </Link>
      <Button asChild size="sm">
        <Link href="/sign-up">
          Start free
          <ArrowRight className="h-4 w-4" weight="regular" />
        </Link>
      </Button>
    </HeaderShell>
  );
}

function ClerkSiteHeader() {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <HeaderShell>
      {isLoaded && isSignedIn ? (
        <>
          <Button asChild size="sm">
            <Link href="/dashboard/generate">
              Dashboard
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <>
          <Link
            href="/sign-in"
            className="hidden text-sm font-medium text-foreground/80 transition hover:text-primary sm:inline-flex"
          >
            Log in
          </Link>
          <Button asChild size="sm">
            <Link href="/sign-up">
              Start free
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </Button>
        </>
      )}
    </HeaderShell>
  );
}

function HeaderShell({ children }: { children: ReactNode }) {
  return (
    <header className="nav-blur sticky top-0 z-50 border-b border-border/70">
      <div className="section-shell flex h-[72px] items-center justify-between gap-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-9 text-sm font-medium text-foreground/80 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {children}
        </div>
      </div>
    </header>
  );
}
