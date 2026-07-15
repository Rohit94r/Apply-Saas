"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  Desktop,
  DownloadSimple,
  EnvelopeSimple,
  WindowsLogo,
  AppleLogo
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DesktopComingSoon() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function showComingSoon(platform?: string) {
    const label = platform ? `${platform} download` : "Desktop download";
    toast.message("Coming soon", {
      description: `${label} is not available yet. Join the notify list below — Windows and macOS ship later.`
    });
    setShowModal(true);
  }

  function notify(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSent(true);
    toast.success("You're on the list — we'll email you at launch.");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="rounded-[1.75rem] border border-border bg-[#fbfaf6] px-6 py-10 text-center sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Desktop className="h-7 w-7" weight="regular" />
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
          Apply Desktop · Interview Copilot
        </p>
        <h1 className="mt-3 font-serif text-4xl text-primary sm:text-5xl">
          Practice mock interviews on your desktop.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          Apply Desktop is built for <strong className="font-semibold text-foreground">practice</strong> — timed mock
          interviews that sync with your Apply resume. Windows and macOS apps are
          coming later. Not for live interview cheating.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => showComingSoon()}
          >
            <DownloadSimple className="h-4 w-4" weight="bold" />
            Download Apply Desktop
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/dashboard/mock-interview">Try web mock interview</Link>
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Download shows Coming Soon — no installer yet.
        </p>

        <form
          onSubmit={notify}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            required
            placeholder="you@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sent}
            aria-label="Email for launch notification"
          />
          <Button type="submit" disabled={sent} className="shrink-0">
            <EnvelopeSimple className="h-4 w-4" />
            {sent ? "You're on the list" : "Notify me"}
          </Button>
        </form>
        {sent ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Thanks — we&apos;ll email you when Apply Desktop launches. Until then,
            use the{" "}
            <Link
              href="/dashboard/mock-interview"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              web mock interview room
            </Link>
            .
          </p>
        ) : null}
      </header>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white/70 p-6">
          <DownloadSimple className="h-5 w-5 text-accent" weight="regular" />
          <h2 className="mt-3 font-serif text-2xl text-primary">Downloads</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center justify-between gap-2 border-b border-border/70 pb-3">
              <span className="inline-flex items-center gap-2">
                <WindowsLogo className="h-4 w-4" weight="regular" />
                Windows (.msi)
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => showComingSoon("Windows")}
              >
                Download
              </Button>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2">
                <AppleLogo className="h-4 w-4" weight="regular" />
                macOS (.dmg)
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => showComingSoon("macOS")}
              >
                Download
              </Button>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-white/70 p-6">
          <h2 className="font-serif text-2xl text-primary">What you get later</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
            <li>Private practice overlay for mock interviews</li>
            <li>Resume sync from your Apply account</li>
            <li>Windows 10+ and macOS 12+</li>
            <li>Same login as the web app</li>
          </ul>
        </div>
      </section>

      <p className="text-center text-sm text-muted-foreground">
        Prefer web today?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-primary underline-offset-2 hover:underline"
        >
          Create a free Apply account
        </Link>{" "}
        — tailor, track applications, and mock interview in the browser.
      </p>

      {showModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="desktop-soon-title"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-[#fbfaf6] p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Coming soon
            </p>
            <h2
              id="desktop-soon-title"
              className="mt-2 font-serif text-2xl text-primary"
            >
              Apply Desktop is not ready yet
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              No installer to download. Leave your email above and we&apos;ll
              notify you when Windows and macOS betas ship. Practice on the web
              mock interview meanwhile.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" onClick={() => setShowModal(false)}>
                Got it
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/mock-interview">Open web mock</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
