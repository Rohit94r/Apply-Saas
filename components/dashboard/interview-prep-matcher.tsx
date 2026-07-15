"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowSquareOut,
  Briefcase,
  GraduationCap,
  MapPin,
  Code,
  Sparkle,
  CheckCircle,
  PlayCircle,
  Eye,
  Lightbulb,
  SpinnerGap,
  Buildings
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { jobListings } from "@/lib/data/job-listings";
import { interviewPrepVideos } from "@/lib/data/learning-resources";
import { allCompanyGuides } from "@/lib/data/coding-questions";
import type { CompanyCodingGuide } from "@/lib/data/coding-questions";
import {
  MatcherFormSelect,
  MatcherSearchSelect
} from "@/components/dashboard/matcher-filter-select";
import {
  normalizeMatcherCity,
  normalizeMatcherRole
} from "@/lib/data/matcher-filters";

type CompanyType = "product" | "service" | "startup" | "bfsi" | "any";
type Domain =
  | "web-dev"
  | "backend"
  | "fullstack"
  | "mobile"
  | "data-science"
  | "devops"
  | "qa"
  | "any";
type ExperienceLevel = "student" | "fresher" | "0-1" | "1-3" | "any";
type Education = "btech" | "bca" | "mca" | "bsc" | "diploma" | "any";

type MatcherForm = {
  companyType: CompanyType;
  domain: Domain;
  role: string;
  city: string;
  experience: ExperienceLevel;
  education: Education;
};

type ShortlistedCompany = {
  name: string;
  type: CompanyType;
  industry: string;
  roles: string;
  location: string;
  salaryHint: string;
  workMode: string;
  applyUrl: string;
  postedLabel: string;
  codingGuide?: CompanyCodingGuide;
  matchScore: number;
  matchReasons: string[];
};

type VideoSuggestion = {
  id: string;
  title: string;
  channel: string;
  duration: string;
  focus: string;
  url: string;
  reason: string;
};

const companyTypeOptions: Array<{ id: CompanyType; label: string }> = [
  { id: "any", label: "All company types" },
  { id: "product", label: "Product based" },
  { id: "service", label: "Service based (IT)" },
  { id: "startup", label: "Startups" },
  { id: "bfsi", label: "BFSI / Finance" }
];

const domainOptions: Array<{ id: Domain; label: string; skills: string[] }> = [
  { id: "web-dev", label: "Web / Frontend", skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Frontend"] },
  { id: "backend", label: "Backend", skills: ["Java", "Node.js", "Python", "Spring", "SQL", "REST APIs", "Microservices", "Backend"] },
  { id: "fullstack", label: "Full Stack", skills: ["React", "Node.js", "MongoDB", "Next.js", "TypeScript", "Express.js", "Full Stack"] },
  { id: "mobile", label: "Mobile / Android", skills: ["Kotlin", "Android", "Java", "Mobile", "React Native", "Redux"] },
  { id: "data-science", label: "Data / ML / AI", skills: ["Python", "Machine Learning", "TensorFlow", "Statistics", "Pandas", "SQL", "Data", "ML"] },
  { id: "devops", label: "DevOps / Cloud", skills: ["Docker", "Kubernetes", "AWS", "Linux", "CI/CD", "Cloud", "Terraform"] },
  { id: "qa", label: "QA / Testing", skills: ["Testing", "Selenium", "QA", "Manual Testing", "API Testing"] },
  { id: "any", label: "Any Domain", skills: [] }
];

const experienceOptions: Array<{ id: ExperienceLevel; label: string }> = [
  { id: "student", label: "Student / Internship" },
  { id: "fresher", label: "Fresher (0 YOE)" },
  { id: "0-1", label: "0–1 years" },
  { id: "1-3", label: "1–3 years" },
  { id: "any", label: "Any Experience" }
];

const educationOptions: Array<{ id: Education; label: string }> = [
  { id: "btech", label: "B.Tech / B.E." },
  { id: "bca", label: "BCA" },
  { id: "mca", label: "MCA" },
  { id: "bsc", label: "B.Sc / M.Sc" },
  { id: "diploma", label: "Diploma" },
  { id: "any", label: "Any Education" }
];

const serviceCompanies = [
  "TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "HCLTech",
  "HCL", "Capgemini", "Tech Mahindra", "LTIMindtree", "Hexaware",
  "Persistent Systems", "Coforge", "Sopra Steria", "EPAM", "Virtusa",
  "IBM", "Deloitte", "Deloitte NLA"
];

const productCompanies = [
  "Google", "Meta", "Apple", "Amazon", "Microsoft", "Adobe", "Nvidia",
  "Uber", "PhonePe", "Walmart", "Walmart Global Tech", "PayPal", "Swiggy",
  "Razorpay", "Paytm", "Myntra", "Samsung", "Atlassian", "Intuit",
  "Salesforce", "SAP", "Flipkart", "Zomato", "Zoho", "ServiceNow",
  "BrowserStack", "Rubrik", "Qualcomm", "Cisco", "Oracle", "Freshworks",
  "Ola", "Zerodha", "Netflix", "JPMorgan", "JPMorgan Chase"
];

const bfsiCompanies = [
  "Goldman Sachs", "Morgan Stanley", "JP Morgan", "JPMorgan Chase",
  "De Shaw", "Deloitte", "Deloitte NLA", "American Express", "Barclays",
  "Visa", "Wells Fargo", "UBS", "ION Group", "BNY"
];

const startupCompanies = [
  "CRED", "Zerodha", "Series A Startup", "Startup (Instahyre)",
  "Multiple startups", "Freshworks", "Ola"
];

function classifyCompany(companyName: string): CompanyType {
  const name = companyName.toLowerCase();

  if (bfsiCompanies.some((c) => name.includes(c.toLowerCase()))) return "bfsi";
  if (serviceCompanies.some((c) => name.includes(c.toLowerCase()))) return "service";
  if (startupCompanies.some((c) => name.includes(c.toLowerCase()))) return "startup";
  if (productCompanies.some((c) => name.includes(c.toLowerCase()))) return "product";
  if (name.includes("startup") || name.includes("series a")) return "startup";
  return "product";
}

function companyTypeLabel(type: CompanyType): string {
  switch (type) {
    case "product": return "Product";
    case "service": return "Service";
    case "startup": return "Startup";
    case "bfsi": return "BFSI";
    default: return "Company";
  }
}

function companyTypeColor(type: CompanyType): string {
  switch (type) {
    case "product": return "bg-violet-100 text-violet-700";
    case "service": return "bg-emerald-100 text-emerald-700";
    case "startup": return "bg-orange-100 text-orange-700";
    case "bfsi": return "bg-sky-100 text-sky-700";
    default: return "bg-muted text-muted-foreground";
  }
}

function companyTypeAvatar(type: CompanyType): string {
  switch (type) {
    case "product": return "from-violet-500 to-purple-600";
    case "service": return "from-emerald-500 to-teal-600";
    case "startup": return "from-orange-500 to-red-500";
    case "bfsi": return "from-sky-500 to-blue-600";
    default: return "from-slate-500 to-slate-700";
  }
}

function companyInitials(name: string): string {
  const cleaned = name.replace(/[()&/]/g, " ").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function roleMatchesFilter(jobTitle: string, roleFilter: string): boolean {
  if (!roleFilter.trim()) return false;

  const title = jobTitle.toLowerCase();
  const role = roleFilter.toLowerCase();
  const roleWords = role.split(/\s+/).filter((word) => word.length > 2);

  return (
    title.includes(role) ||
    role.includes(title) ||
    roleWords.some((word) => title.includes(word))
  );
}

function cityMatchesFilter(jobLocation: string, cityFilter: string): boolean {
  if (!cityFilter.trim()) return false;

  const location = jobLocation.toLowerCase();
  const city = cityFilter.toLowerCase();

  if (city === "remote") {
    return location.includes("remote");
  }

  if (city === "pan india") {
    return true;
  }

  return (
    location.includes(city) ||
    location.includes("pan india") ||
    location.includes("remote")
  );
}

function matchCompanies(form: MatcherForm): ShortlistedCompany[] {
  const domainSkills = domainOptions.find((d) => d.id === form.domain)?.skills ?? [];
  const normalizedRole = normalizeMatcherRole(form.role);
  const normalizedCity = normalizeMatcherCity(form.city);
  const results: ShortlistedCompany[] = [];

  for (const job of jobListings) {
    const jobType = classifyCompany(job.company);

    if (form.companyType !== "any" && jobType !== form.companyType) continue;
    if (form.experience !== "any" && job.experienceBand !== form.experience) continue;
    if (!cityMatchesFilter(job.location, normalizedCity)) continue;
    if (!roleMatchesFilter(job.title, normalizedRole)) continue;

    let score = 50;
    const reasons: string[] = [];

    if (normalizedRole) {
      const roleMatch = roleMatchesFilter(job.title, normalizedRole);
      if (roleMatch) {
        score += 25;
        reasons.push("Role matches your target");
      }
    }

    if (domainSkills.length > 0) {
      const skillOverlap = job.skills.filter((s) =>
        domainSkills.some((ds) => s.toLowerCase().includes(ds.toLowerCase()) || ds.toLowerCase().includes(s.toLowerCase()))
      );
      if (skillOverlap.length > 0) {
        score += Math.min(25, skillOverlap.length * 8);
        reasons.push(`${skillOverlap.length} skill${skillOverlap.length > 1 ? "s" : ""} match your domain (${skillOverlap.slice(0, 3).join(", ")})`);
      }
    }

    if (form.companyType !== "any" && jobType === form.companyType) {
      score += 10;
      reasons.push(`${companyTypeLabel(jobType)} company — your preferred type`);
    }

    if (reasons.length === 0) {
      reasons.push("Matches your filters");
    }

    const codingGuide = allCompanyGuides.find((g) =>
      g.company.toLowerCase() === job.company.toLowerCase() ||
      job.company.toLowerCase().includes(g.company.toLowerCase()) ||
      g.company.toLowerCase().includes(job.company.toLowerCase())
    );

    results.push({
      name: job.company,
      type: jobType,
      industry: job.type === "internship" ? "Internship" : "Full-time",
      roles: job.title,
      location: job.location,
      salaryHint: job.salaryHint ?? "See listing",
      workMode: job.workMode,
      applyUrl: job.applyUrl,
      postedLabel: job.postedLabel,
      codingGuide,
      matchScore: Math.min(100, score),
      matchReasons: reasons
    });
  }

  for (const guide of allCompanyGuides) {
    const guideType = guide.category === "it-services" ? "service" : guide.category === "bfsi-consulting" ? "bfsi" : "product";
    if (form.companyType !== "any" && guideType !== form.companyType) continue;

    const alreadyAdded = results.some((r) => r.name.toLowerCase() === guide.company.toLowerCase());
    if (alreadyAdded) continue;

    results.push({
      name: guide.company,
      type: guideType,
      industry: guide.roles.split(",")[0]?.trim() ?? "SDE",
      roles: guide.roles,
      location: "India",
      salaryHint: "—",
      workMode: "various",
      applyUrl: guide.url,
      postedLabel: "PYQ guide",
      codingGuide: guide,
      matchScore: 45,
      matchReasons: [`${companyTypeLabel(guideType)} company with coding question guide`]
    });
  }

  return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 12);
}

function suggestVideos(form: MatcherForm): VideoSuggestion[] {
  const baseVideos = interviewPrepVideos.map((v) => ({
    id: v.id,
    title: v.title,
    channel: v.channel,
    duration: v.duration,
    focus: v.focus,
    url: `https://www.youtube.com/watch?v=${v.id}`,
    reason: ""
  }));

  const domainVideoMap: Record<Domain, string[]> = {
    "web-dev": ["Full Stack Web Dev Roadmap", "React Course"],
    "backend": ["Node.js Full Course", "System Design"],
    "fullstack": ["Full Stack Web Dev", "System Design"],
    "mobile": ["React in 100 Seconds"],
    "data-science": ["Neural Networks Explained", "Machine Learning"],
    "devops": ["System Design Interview", "Git & GitHub"],
    "qa": ["Behavioral Interview"],
    "any": []
  };

  const preferredTitles = domainVideoMap[form.domain] ?? [];
  const suggested = baseVideos.map((v) => {
    let priority = 0;
    let reason = "General interview prep";

    if (preferredTitles.some((pt) => v.title.toLowerCase().includes(pt.toLowerCase()))) {
      priority = 10;
      reason = `Matches your domain: ${domainOptions.find((d) => d.id === form.domain)?.label ?? ""}`;
    } else if (v.focus.toLowerCase().includes("coding") || v.focus.toLowerCase().includes("dsa")) {
      priority = 5;
      reason = "Essential for coding rounds";
    } else if (v.focus.toLowerCase().includes("system design")) {
      priority = 4;
      reason = "System design — asked at product companies";
    } else if (v.focus.toLowerCase().includes("behavioral") || v.focus.toLowerCase().includes("hr")) {
      priority = 3;
      reason = "HR round — asked everywhere";
    }

    return { ...v, priority, reason };
  });

  if (form.companyType === "product") {
    const codingVideo = suggested.find((v) => v.focus.toLowerCase().includes("coding"));
    if (codingVideo) {
      codingVideo.priority += 5;
      codingVideo.reason = "Product companies test coding heavily — watch this first";
    }
  }

  if (form.companyType === "service") {
    const hrVideo = suggested.find((v) => v.focus.toLowerCase().includes("behavioral"));
    if (hrVideo) {
      hrVideo.priority += 5;
      hrVideo.reason = "Service companies focus on HR + aptitude — prepare answers";
    }
  }

  return suggested.sort((a, b) => b.priority - a.priority).slice(0, 4);
}

function CompanyResultCard({ company }: { company: ShortlistedCompany }) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-white p-4 transition hover:shadow-soft">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-bold text-white shadow-sm",
            companyTypeAvatar(company.type)
          )}
        >
          {companyInitials(company.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-base font-bold text-foreground">{company.name}</h4>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold", companyTypeColor(company.type))}>
              {companyTypeLabel(company.type)}
            </span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[9px] font-bold text-muted-foreground">
              {company.workMode}
            </span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs font-bold text-accent">{company.matchScore}%</p>
          <p className="text-[9px] text-muted-foreground">match</p>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <Briefcase className="h-3 w-3 shrink-0" weight="regular" />
          <span className="font-semibold text-foreground">{company.roles}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 shrink-0" weight="regular" />
          {company.location}
        </p>
        {company.salaryHint !== "—" ? (
          <p className="flex items-center gap-1.5">
            <GraduationCap className="h-3 w-3 shrink-0" weight="regular" />
            {company.salaryHint}
          </p>
        ) : null}
      </div>

      {company.matchReasons.length > 0 ? (
        <div className="mt-3 rounded-lg bg-accent/5 p-2.5">
          {company.matchReasons.slice(0, 2).map((reason) => (
            <p key={reason} className="flex items-start gap-1.5 text-[11px] leading-4 text-accent">
              <CheckCircle className="mt-0.5 h-3 w-3 shrink-0" weight="regular" />
              {reason}
            </p>
          ))}
        </div>
      ) : null}

      <div className="mt-3 flex gap-2 border-t border-border/60 pt-3">
        <a
          href={company.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          <ArrowSquareOut className="h-3.5 w-3.5" weight="regular" />
          {company.codingGuide ? "View Guide" : "Apply"}
        </a>
        {company.codingGuide ? (
          <a
            href={company.codingGuide.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
          >
            <Code className="h-3.5 w-3.5" weight="regular" />
            PYQs
          </a>
        ) : null}
      </div>
    </div>
  );
}

function VideoSuggestionCard({ video }: { video: VideoSuggestion }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer"
      className="group flex gap-3 rounded-xl border border-border bg-white p-3 transition hover:border-primary/40 hover:shadow-sm"
    >
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnail, not optimized by next/image */}
        <img
          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
          alt={video.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
          <PlayCircle className="h-6 w-6 text-white" weight="fill" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-semibold text-foreground">{video.title}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{video.channel} · {video.duration}</p>
        <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-accent">
          <Eye className="h-3 w-3" weight="regular" />
          {video.reason}
        </p>
      </div>
    </a>
  );
}

export function InterviewPrepMatcher() {
  const [form, setForm] = useState<MatcherForm>({
    companyType: "any",
    domain: "any",
    role: "",
    city: "",
    experience: "any",
    education: "any"
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ShortlistedCompany[]>([]);
  const [videos, setVideos] = useState<VideoSuggestion[]>([]);

  const selectedTypeOption = companyTypeOptions.find((o) => o.id === form.companyType);

  function updateField<K extends keyof MatcherForm>(key: K, value: MatcherForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.role.trim() || form.role.trim().length < 2) {
      toast.error("Select or search a role");
      return;
    }
    if (!form.city.trim() || form.city.trim().length < 2) {
      toast.error("Select or search a city");
      return;
    }

    setLoading(true);

    await new Promise((r) => setTimeout(r, 300));

    const normalizedForm: MatcherForm = {
      ...form,
      role: normalizeMatcherRole(form.role),
      city: normalizeMatcherCity(form.city)
    };

    const matched = matchCompanies(normalizedForm);
    const suggested = suggestVideos(normalizedForm);

    setForm(normalizedForm);

    setResults(matched);
    setVideos(suggested);
    setSubmitted(true);
    setLoading(false);
  }

  function resetForm() {
    setSubmitted(false);
    setResults([]);
    setVideos([]);
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <Card className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="fine-label mb-1">Your selection</p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {selectedTypeOption?.label ?? "All"}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {form.role}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {form.city}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {experienceOptions.find((e) => e.id === form.experience)?.label}
                </span>
                {form.domain !== "any" ? (
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {domainOptions.find((d) => d.id === form.domain)?.label}
                  </span>
                ) : null}
              </div>
            </div>
            <Button variant="outline" onClick={resetForm}>
              Change filters
            </Button>
          </div>
        </Card>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <Sparkle className="h-5 w-5 text-accent" weight="fill" />
            <h3 className="font-serif text-2xl text-primary">
              {results.length} companies shortlisted for you
            </h3>
          </div>
          {results.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((company) => (
                <CompanyResultCard key={`${company.name}-${company.roles}`} company={company} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white/55 p-8 text-center">
              <p className="text-sm font-semibold text-foreground">No companies match these filters</p>
              <p className="mt-1 text-xs text-muted-foreground">Try widening your criteria.</p>
            </div>
          )}
        </div>

        {videos.length > 0 ? (
          <div>
            <div className="mb-4 flex items-center gap-2 border-t border-border pt-6">
              <PlayCircle className="h-5 w-5 text-primary" weight="fill" />
              <h3 className="font-serif text-2xl text-primary">
                Videos to watch for your prep
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {videos.map((video) => (
                <VideoSuggestionCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        ) : null}

        <Card className="flex items-start gap-3 p-5">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" weight="fill" />
          <div>
            <p className="text-sm font-semibold text-foreground">Pro tip from Rohit</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Pick your top 3 shortlisted companies, open their PYQ guides below,
              and practice 5 coding questions from each under timed conditions.
              That&apos;s the fastest path from &quot;thinking about prep&quot; to
              &quot;interview ready.&quot;
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-border bg-[#fbfaf6] px-6 py-5">
        <p className="fine-label mb-2">Find your target companies</p>
        <h3 className="font-serif text-3xl text-primary">
          What kind of job are you preparing for?
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Tell us your preferences — we&apos;ll shortlist companies with matching
          roles, coding question guides, and the best videos to watch.
        </p>
      </div>

      <form className="space-y-5 p-6" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MatcherFormSelect
            label="Company type"
            value={form.companyType}
            onChange={(value) => updateField("companyType", value as CompanyType)}
            options={companyTypeOptions.map((option) => ({
              value: option.id,
              label: option.label
            }))}
            icon={Buildings}
          />
          <MatcherFormSelect
            label="Domain"
            value={form.domain}
            onChange={(value) => updateField("domain", value as Domain)}
            options={domainOptions.map((option) => ({
              value: option.id,
              label: option.label
            }))}
            icon={Code}
          />
          <MatcherFormSelect
            label="Experience"
            value={form.experience}
            onChange={(value) => updateField("experience", value as ExperienceLevel)}
            options={experienceOptions.map((option) => ({
              value: option.id,
              label: option.label
            }))}
            icon={GraduationCap}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MatcherSearchSelect
            label="Role"
            field="role"
            value={form.role}
            onChange={(value) => updateField("role", value)}
            placeholder="Search role — SDE, Frontend, DevOps..."
            icon={Briefcase}
          />
          <MatcherSearchSelect
            label="City"
            field="city"
            value={form.city}
            onChange={(value) => updateField("city", value)}
            placeholder="Search city — Bengaluru, Pune, Remote..."
            icon={MapPin}
          />
          <MatcherFormSelect
            label="Education"
            value={form.education}
            onChange={(value) => updateField("education", value as Education)}
            options={educationOptions.map((option) => ({
              value: option.id,
              label: option.label
            }))}
            icon={GraduationCap}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
          ) : (
            <Sparkle className="h-4 w-4" weight="fill" />
          )}
          {loading ? "Shortlisting..." : "Shortlist companies for me"}
        </Button>
      </form>
    </Card>
  );
}
