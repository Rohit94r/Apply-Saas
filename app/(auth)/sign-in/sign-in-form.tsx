"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "./actions";

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <form
      action={formAction}
      className="w-full max-w-md space-y-4 rounded-2xl border border-border bg-white p-6 shadow-sm dark:bg-[#1a1a20] dark:border-[#2a2a32]"
    >
      <div>
        <h1 className="text-xl font-semibold text-foreground">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back to Apply.
        </p>
      </div>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium text-foreground">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none ring-primary/30 focus:ring-2"
          placeholder="you@example.com"
        />
      </label>

      <label className="block space-y-1.5 text-sm">
        <span className="font-medium text-foreground">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground outline-none ring-primary/30 focus:ring-2"
          placeholder="••••••••"
        />
      </label>

      {state?.error ? (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        No account?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-primary underline-offset-2 hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
