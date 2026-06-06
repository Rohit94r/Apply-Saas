"use client";

import Link from "next/link";
import { InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { founderSocial } from "@/lib/constants/founder";

export function FounderSupportCard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "rounded-xl border border-border bg-[#fbfaf6] p-4"
          : "rounded-2xl border border-border bg-[#fbfaf6] p-5"
      }
    >
      <p className="text-sm text-muted-foreground">
        Need help or a discount? Message me on Instagram or LinkedIn.
      </p>
      <div className={`flex flex-wrap gap-2 ${compact ? "mt-3" : "mt-4"}`}>
        {founderSocial.map((social) => (
          <Link
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-foreground transition hover:border-accent/40 hover:text-accent"
          >
            {social.label === "Instagram" ? (
              <InstagramLogo className="h-4 w-4" weight="fill" />
            ) : (
              <LinkedinLogo className="h-4 w-4" weight="fill" />
            )}
            {social.handle}
          </Link>
        ))}
      </div>
    </div>
  );
}
