import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Brain,
  Code,
  MapPin,
  Megaphone,
  Palette,
  Pen,
  Phone,
  Storefront
} from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import {
  freelanceDomains,
  getFreelanceSubdomainsByDomain
} from "@/lib/data/freelance-catalog";
import type { FreelanceDomainIcon } from "@/features/freelancing/types";

const domainIcons: Record<FreelanceDomainIcon, PhosphorIcon> = {
  code: Code,
  device: AppWindow,
  brain: Brain,
  palette: Palette,
  megaphone: Megaphone,
  pen: Pen
};

export function FreelancingSection() {
  return (
    <section id="freelancing" className="border-y border-border/70 surface-warm py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Earning"
            title="Turn skills into freelance income."
            description="Apply now doubles as a freelance client-finder. Pick a service you can deliver, see the exact skills and deliverables clients want, then jump straight to Google Maps, Justdial and IndiaMART to find real local businesses with phone numbers — and call them with a ready pitch."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {freelanceDomains.map((domain, index) => {
            const Icon = domainIcons[domain.icon] ?? Code;
            const subs = getFreelanceSubdomainsByDomain(domain.id).slice(0, 4);
            return (
              <Reveal key={domain.id} delay={index * 0.05}>
                <article className="h-full rounded-2xl border border-border bg-white p-7 shadow-soft">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Icon className="h-5 w-5" weight="regular" />
                  </div>
                  <h3 className="font-serif text-2xl text-primary">{domain.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {domain.tagline}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {subs.map((sub) => (
                      <span
                        key={sub.id}
                        className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
                      >
                        {sub.label}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="surface-accent mt-10 grid items-center gap-8 rounded-2xl border border-accent/20 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="fine-label mb-3">Find &amp; call clients in your city</p>
              <p className="max-w-2xl text-base leading-8 text-foreground">
                Every service comes with a market-gap signal (e.g.{" "}
                <span className="font-semibold text-accent">
                  “most local salons have no booking site”
                </span>
                ), a build checklist, pricing range, and a copy-ready call pitch
                — plus one-tap deep links to directories pre-filtered to your
                city so you can find numbers and start calling today.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" weight="regular" /> Google Maps
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" weight="regular" /> Justdial
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  <Storefront className="h-3.5 w-3.5" weight="regular" /> IndiaMART
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <Button asChild size="lg">
                <Link href="/dashboard/freelancing">
                  Explore freelancing
                  <ArrowRight className="h-4 w-4" weight="regular" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground">
                Free for everyone — included with your Apply account.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
