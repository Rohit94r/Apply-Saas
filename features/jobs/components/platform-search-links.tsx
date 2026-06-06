"use client";

/** Horizontal row of external job board search buttons (LinkedIn, Naukri, …). */

import { ArrowSquareOut } from "@phosphor-icons/react";
import type { JobMatchResult } from "@/features/jobs/types";

const platformColors: Record<string, string> = {
  linkedin: "border-[#0A66C2]/30 bg-[#0A66C2]/5 hover:border-[#0A66C2]/50",
  naukri: "border-[#275DF5]/30 bg-[#275DF5]/5 hover:border-[#275DF5]/50",
  indeed: "border-[#2164f3]/30 bg-[#2164f3]/5 hover:border-[#2164f3]/50",
  glassdoor: "border-emerald-500/30 bg-emerald-50 hover:border-emerald-500/50",
  instahyre: "border-violet-500/30 bg-violet-50 hover:border-violet-500/50",
  cutshort: "border-orange-500/30 bg-orange-50 hover:border-orange-500/50",
  wellfound: "border-rose-500/30 bg-rose-50 hover:border-rose-500/50"
};

export function PlatformSearchLinks({
  links
}: {
  links: JobMatchResult["platformSearches"];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className={`group flex flex-col rounded-xl border p-4 transition ${platformColors[link.platform] ?? "border-border bg-white"}`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-foreground">{link.label}</span>
            <ArrowSquareOut
              className="h-4 w-4 text-muted-foreground transition group-hover:text-primary"
              weight="regular"
            />
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            {link.description}
          </p>
          <span className="mt-3 text-[10px] font-bold uppercase text-accent">
            Open search →
          </span>
        </a>
      ))}
    </div>
  );
}
