"use client";

/**
 * Fires a `page_view` activity event whenever the user navigates between
 * dashboard routes, so the admin panel can show what each user actually saw.
 *
 * Uses `fetch(..., { keepalive: true })` so the beacon completes even when the
 * user navigates away quickly. Mounted once inside the dashboard layout.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function DashboardActivityTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || !pathname.startsWith("/dashboard")) {
      return;
    }

    // Skip duplicate fires (React strict mode / re-renders without route change)
    if (lastTracked.current === pathname) {
      return;
    }
    lastTracked.current = pathname;

    const body = JSON.stringify({
      action: "page_view",
      detail: pathname
    });

    try {
      void fetch("/api/activity/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true
      }).catch(() => {
        // Non-blocking analytics — ignore network failures
      });
    } catch {
      // Ignore
    }
  }, [pathname]);

  return null;
}
