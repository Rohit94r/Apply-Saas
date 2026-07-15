"use client";

/**
 * Freelancing workspace — main UI for `/dashboard/freelancing`.
 *
 * Shows curated freelance domains/subdomains. For each subdomain the user sees
 * skills, "what to build" requirements, an opportunity signal, a call pitch,
 * and deep links to Google Maps / Justdial / IndiaMART / Google / LinkedIn
 * pre-filtered to their city so they can find real local clients to call.
 */

import { useEffect, useMemo, useState } from "react";
import {
  AppWindow,
  ArrowSquareOut,
  Brain,
  Briefcase,
  CaretRight,
  ChartBar,
  ChatCircle,
  Checks,
  Code,
  Copy,
  FilmStrip,
  GearSix,
  Globe,
  Lightbulb,
  ListChecks,
  MapPin,
  Megaphone,
  Palette,
  Pen,
  Phone,
  Sparkle,
  Stack,
  Storefront,
  Target,
  Wrench
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  buildFindClientLinks,
  freelanceCities,
  freelanceDomains,
  freelancePlatforms,
  freelanceStarterTips,
  freelanceSubdomains,
  getFreelanceSubdomainsByDomain
} from "@/features/freelancing";
import type {
  FreelanceDomainIcon,
  FreelanceDomainId,
  FreelanceSubdomain
} from "@/features/freelancing/types";

const domainIcons: Record<FreelanceDomainIcon, PhosphorIcon> = {
  code: Code,
  device: AppWindow,
  brain: Brain,
  palette: Palette,
  megaphone: Megaphone,
  pen: Pen,
  chart: ChartBar,
  gear: GearSix,
  film: FilmStrip,
  briefcase: Briefcase
};

const difficultyStyles: Record<
  FreelanceSubdomain["difficulty"],
  string
> = {
  Beginner: "bg-emerald-50 text-emerald-700",
  Intermediate: "bg-sky-50 text-sky-700",
  Advanced: "bg-rose-50 text-rose-700"
};

export function FreelanceWorkspace() {
  const [domainId, setDomainId] = useState<FreelanceDomainId>("web-dev");
  const [selectedId, setSelectedId] = useState<string | null>("web-salon");
  const [city, setCity] = useState<string>("Mumbai");

  const subdomains = useMemo(
    () => getFreelanceSubdomainsByDomain(domainId),
    [domainId]
  );

  const selected = useMemo(
    () =>
      selectedId
        ? freelanceSubdomains.find((item) => item.id === selectedId) ?? null
        : null,
    [selectedId]
  );

  function selectDomain(next: FreelanceDomainId) {
    setDomainId(next);
    const first = getFreelanceSubdomainsByDomain(next)[0];
    setSelectedId(first?.id ?? null);
  }

  return (
    <div className="space-y-6">
      {/* Banner + city selector */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border bg-gradient-to-r from-primary/5 via-accent/5 to-transparent px-6 py-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <p className="fine-label mb-2">Earn while you learn</p>
              <h2 className="font-serif text-3xl text-primary">
                Find freelance clients in your city
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Pick a service you can deliver, see the exact skills and
                deliverables clients want, then jump straight to Google Maps,
                Justdial or IndiaMART to find real local businesses with phone
                numbers — and call them with a ready pitch.
              </p>
            </div>
            <div className="w-full max-w-xs">
              <label
                htmlFor="freelance-city"
                className="fine-label mb-2 flex items-center gap-1.5"
              >
                <MapPin className="h-3.5 w-3.5" weight="regular" />
                Your city
              </label>
              <select
                id="freelance-city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground outline-none focus:border-primary"
              >
                {freelanceCities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-muted-foreground">
                Directory searches open pre-filtered to this city.
              </p>
            </div>
          </div>
        </div>

        {/* Domain tabs */}
        <div className="border-b border-border px-6 py-4">
          <p className="fine-label mb-3">Pick a domain</p>
          <div className="flex flex-wrap gap-2">
            {freelanceDomains.map((domain) => {
              const Icon = domainIcons[domain.icon] ?? Code;
              const active = domainId === domain.id;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => selectDomain(domain.id)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-white text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <Icon className="h-4 w-4" weight="regular" />
                  {domain.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {freelanceDomains.find((d) => d.id === domainId)?.tagline}
          </p>
        </div>

        {/* Subdomain grid */}
        <div className="p-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subdomains.map((item) => {
              const active = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`flex flex-col rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-border bg-white hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-foreground">
                      {item.label}
                    </h4>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        difficultyStyles[item.difficulty]
                      }`}
                    >
                      {item.difficulty}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {item.summary}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-primary">
                    View details
                    <CaretRight className="h-3 w-3" weight="regular" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Selected subdomain detail */}
      {selected ? (
        <SubdomainDetail subdomain={selected} city={city} />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-accent" weight="regular" />
            <h3 className="text-lg font-semibold text-foreground">
              Platforms (India + global)
            </h3>
          </div>
          <p className="mb-4 text-sm leading-6 text-muted-foreground">
            Mix outbound (Maps) with these marketplaces once you have 2–3 proof
            projects. Prefer niches over generic “web developer” profiles.
          </p>
          <ul className="space-y-3">
            {freelancePlatforms.map((platform) => (
              <li
                key={platform.id}
                className="rounded-xl border border-border bg-[#fbfaf6] p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-primary transition hover:text-accent"
                  >
                    {platform.name}
                  </a>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {platform.region}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {platform.bestFor}
                </p>
                <p className="mt-2 text-xs leading-5 text-foreground">
                  {platform.starterTip}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {platform.feeNote}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" weight="regular" />
            <h3 className="text-lg font-semibold text-foreground">
              Starter tips by stage
            </h3>
          </div>
          <ul className="space-y-3">
            {freelanceStarterTips.map((tip) => (
              <li
                key={tip.id}
                className="rounded-xl border border-border bg-white p-3"
              >
                <p className="text-[10px] font-bold uppercase tracking-wide text-accent">
                  {tip.stage.replace("-", " ")}
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  {tip.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {tip.body}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function SubdomainDetail({
  subdomain,
  city
}: {
  subdomain: FreelanceSubdomain;
  city: string;
}) {
  // Fire a non-blocking analytics event when this subdomain is opened.
  useEffect(() => {
    void fetch("/api/activity/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "freelance",
        detail: `${subdomain.label} · ${city}`
      })
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subdomain.id]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <div className="space-y-6">
        {/* Header */}
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-xl">
              <p className="fine-label mb-2">
                {subdomain.estimatedEffort} · {subdomain.pricingInr}
              </p>
              <h3 className="font-serif text-2xl text-primary">
                {subdomain.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {subdomain.summary}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                difficultyStyles[subdomain.difficulty]
              }`}
            >
              {subdomain.difficulty}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
              <div className="flex items-center gap-2 text-accent">
                <Lightbulb className="h-4 w-4" weight="regular" />
                <p className="text-xs font-bold uppercase">Why this works</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {subdomain.whySuggested}
              </p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2 text-primary">
                <Target className="h-4 w-4" weight="regular" />
                <p className="text-xs font-bold uppercase">Opportunity signal</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {subdomain.opportunitySignal}
              </p>
            </div>
          </div>
        </Card>

        {/* Skills + tech stack */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Stack className="h-5 w-5 text-accent" weight="regular" />
            <h4 className="text-lg font-semibold text-foreground">
              Skills &amp; tech stack
            </h4>
          </div>
          <p className="fine-label mb-2">Skills you need</p>
          <div className="flex flex-wrap gap-2">
            {subdomain.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-white px-2.5 py-1 text-xs font-semibold text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="fine-label mb-2 mt-5">Recommended stack</p>
          <div className="flex flex-wrap gap-2">
            {subdomain.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </Card>

        {/* What to build */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-accent" weight="regular" />
            <h4 className="text-lg font-semibold text-foreground">
              What the client needs built
            </h4>
          </div>
          <ul className="space-y-2">
            {subdomain.requirements.map((req) => (
              <li
                key={req}
                className="flex gap-2 text-sm leading-6 text-muted-foreground"
              >
                <Checks className="mt-0.5 h-4 w-4 shrink-0 text-accent" weight="regular" />
                {req}
              </li>
            ))}
          </ul>
        </Card>

        {/* Pitch script */}
        <Card className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <ChatCircle className="h-5 w-5 text-primary" weight="regular" />
            <h4 className="text-lg font-semibold text-foreground">
              Call pitch
            </h4>
          </div>
          <p className="rounded-xl border border-border bg-[#fbfaf6] p-4 text-sm italic leading-6 text-foreground">
            “{subdomain.pitchScript}”
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => {
              void navigator.clipboard
                .writeText(subdomain.pitchScript)
                .then(() => toast.success("Pitch copied to clipboard"))
                .catch(() => toast.error("Could not copy"));
            }}
          >
            <Copy className="h-4 w-4" weight="regular" />
            Copy pitch
          </Button>
        </Card>
      </div>

      {/* Find clients — sticky */}
      <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-accent" weight="regular" />
            <h4 className="text-lg font-semibold text-foreground">
              Find &amp; call clients in {city}
            </h4>
          </div>
          <p className="mb-4 text-sm leading-6 text-muted-foreground">
            These open real directories pre-filtered to {city}. Find businesses,
            see their phone numbers, and call with the pitch above.
          </p>
          <div className="space-y-4">
            {subdomain.clientSearchTerms.map((term) => (
              <div
                key={term}
                className="rounded-xl border border-border bg-[#fbfaf6] p-3"
              >
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase text-primary">
                  <Wrench className="h-3.5 w-3.5" weight="regular" />
                  “{term}” in {city}
                </p>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {buildFindClientLinks(term, city).map((link) => (
                    <a
                      key={link.provider}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-2 rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary/40 hover:bg-primary/5"
                      title={link.hint}
                    >
                      <span className="flex items-center gap-1.5">
                        <ProviderIcon provider={link.provider} />
                        {link.label}
                      </span>
                      <ArrowSquareOut
                        className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-primary"
                        weight="regular"
                      />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-accent/20 bg-accent/5 p-6">
          <div className="flex items-center gap-2 text-accent">
            <Sparkle className="h-4 w-4" weight="regular" />
            <p className="text-xs font-bold uppercase">Outreach tip</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-foreground">
            Call during business hours, lead with the savings/opportunity, and
            follow up on WhatsApp with a free mockup. Track every lead — repeat
            clients and referrals are where the real money is.
          </p>
        </Card>
      </div>
    </div>
  );
}

function ProviderIcon({ provider }: { provider: string }) {
  const Icon =
    provider === "google-maps"
      ? MapPin
      : provider === "justdial"
        ? Phone
        : provider === "indiamart"
          ? Storefront
          : provider === "linkedin"
            ? ChatCircle
            : Globe;
  return <Icon className="h-3.5 w-3.5 text-muted-foreground" weight="regular" />;
}
