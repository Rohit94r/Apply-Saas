"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Lightning, Sparkle, WarningCircle } from "@phosphor-icons/react";
import { billingRequestHeaders } from "@/lib/device-id";
import type { BillingStatus } from "@/lib/billing/usage";
import { cn } from "@/lib/utils";

export function CreditsBadge({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<BillingStatus | null>(null);

  useEffect(() => {
    let active = true;

    async function loadStatus() {
      try {
        const response = await fetch("/api/billing/status", {
          headers: billingRequestHeaders()
        });
        const data = await response.json();

        if (active && response.ok) {
          setStatus(data);
        }
      } catch {
        // ignore sidebar badge failures
      }
    }

    void loadStatus();
    return () => {
      active = false;
    };
  }, []);

  if (!status) {
    return null;
  }

  if (status.plan === "pro") {
    return (
      <div
        className={cn(
          "rounded-xl border border-accent/25 bg-accent/10 p-4",
          compact && "p-3"
        )}
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-accent">
          <Sparkle className="h-4 w-4" weight="regular" />
          Pro · {status.daysRemaining} days left
        </div>
        {!compact ? (
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{status.message}</p>
        ) : null}
      </div>
    );
  }

  if (status.plan === "expired") {
    return (
      <div
        className={cn(
          "rounded-xl border border-warning/30 bg-warning/10 p-4",
          compact && "p-3"
        )}
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-warning">
          <WarningCircle className="h-4 w-4" weight="regular" />
          Subscription expired
        </div>
        {!compact ? (
          <>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{status.message}</p>
            <Link
              href="/dashboard/upgrade"
              className="mt-3 inline-flex text-xs font-semibold text-accent underline"
            >
              Renew Pro
            </Link>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        status.creditsLeft === 0
          ? "border-warning/30 bg-warning/10"
          : "border-primary/15 bg-primary/5",
        compact && "p-3"
      )}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Lightning className="h-4 w-4" weight="regular" />
        {status.creditsLeft} / {status.freeLimit} credits
      </div>
      {!compact ? (
        <>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{status.message}</p>
          {status.creditsLeft === 0 ? (
            <Link
              href="/dashboard/upgrade"
              className="mt-3 inline-flex text-xs font-semibold text-accent underline"
            >
              Upgrade to Pro
            </Link>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
