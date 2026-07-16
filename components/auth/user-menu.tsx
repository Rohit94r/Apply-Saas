"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignOut, UserCircle } from "@phosphor-icons/react";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

export function UserMenu({
  className,
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const user = session?.user;
  const initial =
    (user?.name?.trim()?.[0] || user?.email?.trim()?.[0] || "?").toUpperCase();

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } finally {
      setSigningOut(false);
      setOpen(false);
    }
  }

  if (isPending) {
    return (
      <div
        className={cn(
          "h-10 w-10 animate-pulse rounded-full border border-border bg-muted",
          className
        )}
      />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-white text-sm font-semibold text-primary dark:bg-[#1e1e24] dark:border-[#2a2a32]"
        aria-label="Account menu"
        aria-expanded={open}
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close account menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-border bg-white p-2 shadow-lg dark:bg-[#1a1a20] dark:border-[#2a2a32]">
            {!compact ? (
              <div className="border-b border-border px-3 py-2">
                <p className="truncate text-sm font-semibold text-foreground">
                  {user.name || "Apply user"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            ) : null}
            <Link
              href="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-muted"
            >
              <UserCircle className="h-4 w-4" weight="regular" />
              Settings
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-700 transition hover:bg-rose-50 disabled:opacity-60 dark:text-rose-300 dark:hover:bg-rose-950/40"
            >
              <SignOut className="h-4 w-4" weight="regular" />
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
