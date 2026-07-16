"use client";

import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  EnvelopeSimple,
  UserCircle,
  Warning
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

export function SettingsPanel() {
  const { data: session, status } = authClient.useSession();
  const user = session?.user;
  const email = user?.email ?? "—";
  const name = user?.name ?? user?.email ?? "—";
  const loading = status === "loading";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <section className="rounded-2xl border border-border bg-[#fbfaf6] p-6">
        <div className="flex items-center gap-3 text-primary">
          <UserCircle className="h-6 w-6" weight="regular" />
          <h3 className="font-serif text-2xl">Profile</h3>
        </div>
        <dl className="mt-5 space-y-4 text-sm">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Display name
            </dt>
            <dd className="mt-1 font-semibold text-foreground">
              {loading ? "Loading…" : name}
            </dd>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Synced from Google and stored in your Apply Postgres account.
            </p>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <EnvelopeSimple className="h-3.5 w-3.5" />
              Email
            </dt>
            <dd className="mt-1 font-semibold text-foreground">
              {loading ? "Loading…" : email}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-border bg-white/70 p-6">
        <div className="flex items-center gap-3 text-primary">
          <CreditCard className="h-6 w-6" weight="regular" />
          <h3 className="font-serif text-2xl">Billing</h3>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Free plan includes limited resume generations. Upgrade to Pro for
          unlimited access.
        </p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/dashboard/upgrade">
            Open billing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      <section className="rounded-2xl border border-border border-rose-200/80 bg-rose-50/40 p-6">
        <div className="flex items-center gap-3 text-rose-900">
          <Warning className="h-6 w-6" weight="regular" />
          <h3 className="font-serif text-2xl">Delete account</h3>
        </div>
        <p className="mt-3 text-sm leading-6 text-rose-950/70">
          To permanently delete your Apply account and associated data, email{" "}
          <a
            className="font-semibold underline underline-offset-2"
            href="mailto:hello@neexmeet.com"
          >
            hello@neexmeet.com
          </a>{" "}
          with the subject &quot;Delete Apply account&quot;.
        </p>
      </section>
    </div>
  );
}
