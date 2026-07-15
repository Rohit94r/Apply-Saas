"use client";

import { useMemo, useState } from "react";
import {
  ArrowSquareOut,
  Bank,
  Buildings,
  Code,
  Desktop,
  MagnifyingGlass,
  BookOpen,
  ClipboardText,
  Lightbulb,
  X,
  GraduationCap,
  FileText,
  ChartBar,
  RoadHorizon,
  ChatCircleText,
  Briefcase,
  DownloadSimple,
  Notebook,
  LinkSimple
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  companyCategories,
  additionalResources,
  usageGuideSteps,
  allCompanyGuides,
  totalCompanyCount,
  datasetSource
} from "@/lib/data/coding-questions";
import type { CompanyCategory, CompanyCodingGuide } from "@/lib/data/coding-questions";

type FilterId = "all" | CompanyCategory;

const filterTabs: Array<{ id: FilterId; label: string; icon: PhosphorIcon }> = [
  { id: "all", label: "All Companies", icon: Code },
  { id: "product-tech", label: "Product & Tech", icon: Buildings },
  { id: "bfsi-consulting", label: "BFSI & Consulting", icon: Bank },
  { id: "it-services", label: "IT Services", icon: Desktop }
];

const resourceIcons: Record<string, PhosphorIcon> = {
  "Free Mock Test": GraduationCap,
  "ATS Score Checker & Resume Optimization": ChartBar,
  "Developer Roadmaps": RoadHorizon,
  "Interview Questions & Answers": ChatCircleText,
  "Interview Experiences": Briefcase,
  "Resume Templates": FileText,
  "Free Study Notes": Notebook,
  "Free Placement Material Drive": DownloadSimple,
  "Job Opportunity Updates": Briefcase
};

function categoryAccent(category: CompanyCategory): string {
  if (category === "product-tech") {
    return "border-l-violet-400 hover:border-violet-300";
  }
  if (category === "bfsi-consulting") {
    return "border-l-sky-400 hover:border-sky-300";
  }
  return "border-l-emerald-400 hover:border-emerald-300";
}

function categoryBadgeClass(category: CompanyCategory): string {
  if (category === "product-tech") {
    return "bg-violet-100 text-violet-700";
  }
  if (category === "bfsi-consulting") {
    return "bg-sky-100 text-sky-700";
  }
  return "bg-emerald-100 text-emerald-700";
}

function categoryAvatarBg(category: CompanyCategory): string {
  if (category === "product-tech") {
    return "from-violet-500 to-purple-600";
  }
  if (category === "bfsi-consulting") {
    return "from-sky-500 to-blue-600";
  }
  return "from-emerald-500 to-teal-600";
}

function categoryLabel(category: CompanyCategory): string {
  const group = companyCategories.find((g) => g.id === category);
  return group?.label ?? category;
}

function companyInitials(name: string): string {
  const cleaned = name.replace(/[()&]/g, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
}

function CompanyCard({ guide }: { guide: CompanyCodingGuide }) {
  return (
    <a
      href={guide.url}
      target="_blank"
      rel="noreferrer"
      className={`group flex flex-col rounded-xl border border-border border-l-4 bg-white p-4 transition hover:shadow-soft ${categoryAccent(
        guide.category
      )}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-bold text-white shadow-sm ${categoryAvatarBg(
            guide.category
          )}`}
        >
          {companyInitials(guide.company)}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-base font-bold text-foreground">
            {guide.company}
          </h4>
          <span
            className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold ${categoryBadgeClass(
              guide.category
            )}`}
          >
            {categoryLabel(guide.category)}
          </span>
        </div>
        <ArrowSquareOut
          className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary"
          weight="regular"
        />
      </div>
      <p className="mt-3 line-clamp-2 text-xs leading-5 text-muted-foreground">
        {guide.guideTitle}
      </p>
      <div className="mt-3 flex items-center gap-1.5 border-t border-border/60 pt-2.5">
        <Briefcase className="h-3 w-3 shrink-0 text-muted-foreground/60" weight="regular" />
        <p className="truncate text-[11px] font-semibold text-muted-foreground">
          {guide.roles}
        </p>
      </div>
    </a>
  );
}

function UsageStep({ step, index }: { step: string; index: number }) {
  return (
    <div className="flex gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
        {index + 1}
      </span>
      <p className="pt-0.5 text-sm leading-6 text-muted-foreground">{step}</p>
    </div>
  );
}

function StatCard({
  value,
  label,
  icon: Icon
}: {
  value: string;
  label: string;
  icon: PhosphorIcon;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" weight="regular" />
      </span>
      <div>
        <p className="text-lg font-bold leading-none text-foreground">{value}</p>
        <p className="mt-0.5 text-[11px] font-semibold text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
}

export function CompanyCodingQuestions() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredCompanies = useMemo(() => {
    const search = query.trim().toLowerCase();

    return allCompanyGuides.filter((guide) => {
      const matchesFilter =
        activeFilter === "all" || guide.category === activeFilter;
      const matchesSearch =
        !search ||
        guide.company.toLowerCase().includes(search) ||
        guide.guideTitle.toLowerCase().includes(search) ||
        guide.roles.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [query, activeFilter]);

  const filterCounts = useMemo(() => {
    const counts: Record<FilterId, number> = {
      all: allCompanyGuides.length,
      "product-tech": 0,
      "bfsi-consulting": 0,
      "it-services": 0
    };

    for (const guide of allCompanyGuides) {
      counts[guide.category] = (counts[guide.category] ?? 0) + 1;
    }

    return counts;
  }, []);

  const hasSearch = query.trim().length > 0;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border bg-[#fbfaf6] px-6 py-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Code className="h-4 w-4" weight="regular" />
                </span>
                <p className="fine-label">Company PYQs Library</p>
              </div>
              <h3 className="font-serif text-3xl text-primary">
                Previous Year Coding Questions
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Curated coding questions from {totalCompanyCount}+ top companies
                — sourced from real candidate interview reports, online
                assessments, and campus placement drives. Each guide includes
                actual OA questions, approach hints, and hiring process
                breakdowns.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <StatCard
              value={`${totalCompanyCount}`}
              label="Companies covered"
              icon={Buildings}
            />
            <StatCard
              value="3"
              label="Industry categories"
              icon={Bank}
            />
            <StatCard
              value="9"
              label="Bonus resources"
              icon={BookOpen}
            />
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <MagnifyingGlass
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                weight="regular"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search company, role, or question type..."
                className="pl-10"
              />
              {hasSearch ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" weight="regular" />
                </button>
              ) : null}
            </div>

            <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-white p-1 shadow-sm">
              {filterTabs.map((tab) => {
                const Icon = tab.icon;
                const count = filterCounts[tab.id] ?? 0;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      activeFilter === tab.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" weight="regular" />
                    {tab.label}
                    <span
                      className={`rounded-full px-1.5 text-[10px] ${
                        activeFilter === tab.id
                          ? "bg-primary-foreground/20"
                          : "bg-muted"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {filteredCompanies.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCompanies.map((guide) => (
                <CompanyCard key={guide.slug} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white/55 p-8 text-center">
              <MagnifyingGlass className="h-8 w-8 text-muted-foreground" weight="regular" />
              <p className="mt-3 text-sm font-semibold text-foreground">
                No companies found
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try a different search term or category filter.
              </p>
            </div>
          )}

          {hasSearch && filteredCompanies.length > 0 ? (
            <p className="text-center text-xs text-muted-foreground">
              Showing {filteredCompanies.length} of {totalCompanyCount} companies
            </p>
          ) : null}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <Card className="p-6">
          <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Lightbulb className="h-4 w-4" weight="regular" />
            </span>
            <h4 className="text-sm font-semibold text-foreground">
              How to use these guides effectively
            </h4>
          </div>
          <div className="space-y-4">
            {usageGuideSteps.map((step, index) => (
              <UsageStep key={index} step={step} index={index} />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-4 w-4" weight="regular" />
            </span>
            <h4 className="text-sm font-semibold text-foreground">
              Additional resources
            </h4>
          </div>
          <div className="space-y-2">
            {additionalResources.map((resource) => {
              const Icon = resourceIcons[resource.label] ?? LinkSimple;

              return (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-border bg-[#fbfaf6] px-3 py-2.5 text-sm transition hover:border-primary/40 hover:bg-white hover:shadow-sm"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition group-hover:bg-primary/15">
                    <Icon className="h-3.5 w-3.5" weight="regular" />
                  </span>
                  <span className="min-w-0 flex-1 truncate font-semibold text-foreground">
                    {resource.label}
                  </span>
                  <ArrowSquareOut
                    className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:text-primary"
                    weight="regular"
                  />
                </a>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ClipboardText className="h-4 w-4 shrink-0 text-muted-foreground" weight="regular" />
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                Research & data extraction:
              </span>{" "}
              Rohit Jadhav — Apply (apply.neexmeet.com). Original question guides
              curated by{" "}
              <a
                href="https://www.lets-code.co.in"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Let&apos;s Code
              </a>{" "}
              / Om Kute.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {datasetSource.authorSocial.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-muted-foreground transition hover:text-primary"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground/70">
          {datasetSource.copyright}
        </p>
      </Card>
    </div>
  );
}
