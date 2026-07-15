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
  Clock,
  ListChecks,
  Microphone,
  FileText
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
  mock: Microphone,
  tracker: ListChecks,
  tools: MagicWand,
  freelance: Storefront,
  learners: GraduationCap,
  prepare: FileText,
  desktop: Desktop,
  downloads: DownloadSimple,
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
      className={`flex h-full flex-col rounded-2xl border border-border/80 bg-[#fbfaf6] p-5 transition hover:border-primary/25 ${
        isSoon ? "opacity-90" : ""
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          isSoon ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="h-4 w-4" weight="regular" />
      </span>
      <h3 className="mt-3 font-serif text-xl text-primary">{feature.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-6 text-muted-foreground">
        {feature.summary}
      </p>
      {!isSoon && feature.href ? (
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
          Open
          <ArrowRight className="h-3.5 w-3.5" weight="regular" />
        </span>
      ) : (
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
          <Clock className="h-3.5 w-3.5" weight="regular" />
          On the roadmap
        </span>
      )}
    </article>
  );

  return (
    <Reveal delay={delay}>
      {feature.href ? (
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
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {phaseOneFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              delay={index * 0.04}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Coming soon — desktop highlight + remaining roadmap. */
export function ComingSoonSection() {
  const highlight = phaseCopy.desktopHighlight;
  const webSoon = phaseTwoFeatures.filter((f) =>
    ["stripe", "affiliate"].includes(f.id)
  );
  const desktopSoon = phaseTwoFeatures.filter((f) =>
    ["desktop", "downloads"].includes(f.id)
  );

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
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-primary px-8 py-10 text-primary-foreground sm:px-12 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              {highlight.eyebrow}
            </p>
            <h3 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              {highlight.title}
            </h3>
            <p className="mt-5 max-w-xl text-sm leading-7 text-primary-foreground/75 sm:text-base">
              {highlight.description}
            </p>
            <p className="mt-3 text-xs text-primary-foreground/55">
              {highlight.note}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/downloads">
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
                <Link href="/dashboard">Use web tools now</Link>
              </Button>
            </div>
            <ul className="mt-8 grid gap-2 border-t border-primary-foreground/15 pt-6 sm:grid-cols-2">
              {desktopSoon.map((feature) => (
                <li
                  key={feature.id}
                  className="text-sm leading-6 text-primary-foreground/80"
                >
                  <span className="font-semibold text-primary-foreground">
                    {feature.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-primary-foreground/60">
                    {feature.summary}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-14">
          <p className="fine-label mb-2">Also coming on the web</p>
          <h3 className="font-serif text-3xl text-primary">
            Billing and referrals next
          </h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {webSoon.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                delay={0.08 + index * 0.04}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
