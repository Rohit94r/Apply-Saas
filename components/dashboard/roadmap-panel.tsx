"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Desktop,
  Sparkle
} from "@phosphor-icons/react";
import {
  phaseOneFeatures,
  phaseTwoFeatures
} from "@/content/landing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/** Dashboard roadmap — live Phase 1 links + Phase 2 coming soon. */
export function RoadmapPanel() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="fine-label mb-1">Live toolkit</p>
            <h3 className="text-lg font-semibold text-foreground">
              Open any product area
            </h3>
          </div>
          <Sparkle className="h-5 w-5 text-accent" weight="regular" />
        </div>
        <ul className="space-y-2">
          {phaseOneFeatures.map((feature) => (
            <li key={feature.id}>
              <Link
                href={feature.href ?? "/dashboard"}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-[#fbfaf6] px-3 py-2.5 transition hover:border-primary/30"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {feature.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {feature.badge}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-accent" weight="regular" />
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-border bg-primary px-5 py-4 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Desktop className="h-5 w-5 text-accent" weight="regular" />
            <p className="text-xs font-bold uppercase tracking-wide text-accent">
              Phase 2 · Coming soon
            </p>
          </div>
          <h3 className="mt-2 text-lg font-semibold">
            Interview Copilot & more
          </h3>
          <p className="mt-1 text-xs leading-5 text-primary-foreground/70">
            We ship desktop practice tools after Phase 1 AI + PDF quality is solid.
          </p>
        </div>
        <ul className="space-y-0 p-2">
          {phaseTwoFeatures.map((feature) => (
            <li
              key={feature.id}
              className="flex items-start gap-3 rounded-xl px-3 py-2.5"
            >
              <Clock
                className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                weight="regular"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {feature.name}
                </p>
                <p className="text-xs leading-5 text-muted-foreground">
                  {feature.summary}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-border px-5 py-4">
          <Button asChild size="sm" variant="outline" className="w-full sm:w-auto">
            <Link href="/#coming-soon">
              See roadmap on landing
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
