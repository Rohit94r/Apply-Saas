"use client";

import Link from "next/link";
import {
  Briefcase,
  Desktop,
  DownloadSimple,
  MagicWand,
  MagnifyingGlass,
  Sparkle,
  Storefront,
  GraduationCap,
  ArrowRight,
  Clock
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { Button } from "@/components/ui/button";
import {
  phaseCopy,
  phaseOneFeatures,
  phaseTwoFeatures,
  type ProductFeature
} from "@/content/landing";

const iconMap: Record<string, PhosphorIcon> = {
  tailor: Sparkle,
  jobs: MagnifyingGlass,
  interview: Briefcase,
  tools: MagicWand,
  freelance: Storefront,
  learners: GraduationCap,
  desktop: Desktop,
  downloads: DownloadSimple,
  mock: Briefcase,
  tracker: MagnifyingGlass,
  stripe: Sparkle,
  affiliate: Storefront
};

function FeatureCard({
  feature,
  delay
}: {
  feature: ProductFeature;
  delay: number;
}) {
  const Icon = iconMap[feature.id] ?? Sparkle;
  const isSoon = feature.status === "coming-soon";

  const inner = (
    <article
      className={`flex h-full flex-col rounded-2xl border p-6 transition ${
        isSoon
          ? "border-dashed border-border bg-[#fbfaf6]/80"
          : "border-border bg-white hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-soft"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            isSoon ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="h-5 w-5" weight="regular" />
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
            isSoon
              ? "bg-muted text-muted-foreground"
              : feature.status === "improving"
                ? "bg-accent/12 text-accent"
                : "bg-success/12 text-success"
          }`}
        >
          {feature.badge}
        </span>
      </div>
      <h3 className="font-serif text-2xl text-primary">{feature.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
        {feature.summary}
      </p>
      {!isSoon && feature.href ? (
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
          Open in dashboard
          <ArrowRight className="h-3.5 w-3.5" weight="regular" />
        </span>
      ) : (
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
          <Clock className="h-3.5 w-3.5" weight="regular" />
          On the roadmap
        </span>
      )}
    </article>
  );

  return (
    <Reveal delay={delay}>
      {!isSoon && feature.href ? (
        <Link href={feature.href} className="block h-full">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </Reveal>
  );
}

/** Phase 1 live product features on the landing page. */
export function ProductFeaturesSection() {
  return (
    <section id="features" className="border-y border-border/70 bg-white py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow={phaseCopy.liveEyebrow}
            title={phaseCopy.liveTitle}
            description={phaseCopy.liveDescription}
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {phaseOneFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Phase 2 coming-soon block — desktop + new surfaces. */
export function ComingSoonSection() {
  const highlight = phaseCopy.desktopHighlight;

  return (
    <section id="coming-soon" className="bg-[#f7f4ee] py-24 dark:bg-[#131318]">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow={phaseCopy.soonEyebrow}
            title={phaseCopy.soonTitle}
            description={phaseCopy.soonDescription}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground">
            <div className="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  {highlight.eyebrow}
                </p>
                <h3 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                  {highlight.title}
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-primary-foreground/75 sm:text-base">
                  {highlight.description}
                </p>
                <p className="mt-4 text-xs text-primary-foreground/55">
                  {highlight.note}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="/sign-up">
                      {highlight.cta}
                      <ArrowRight className="h-4 w-4" weight="regular" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <Link href="/dashboard">See live tools</Link>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6">
                {[
                  "Mic → transcription → AI practice answers",
                  "Syncs resume + job context from web",
                  "Windows + macOS · one Apply login",
                  "Mock-first launch (practice mode)"
                ].map((line) => (
                  <p
                    key={line}
                    className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3 text-sm text-primary-foreground/85"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {phaseTwoFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              delay={0.1 + index * 0.04}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
