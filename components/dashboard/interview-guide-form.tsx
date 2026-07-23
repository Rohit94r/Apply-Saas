"use client";

import { useMemo, useRef, useState } from "react";
import posthog from "posthog-js";
import {
  ArrowSquareOut,
  BookOpenText,
  Brain,
  Briefcase,
  CalendarDots,
  CheckCircle,
  Code,
  FileText,
  GraduationCap,
  Stack,
  SpinnerGap,
  ChatCircleText,
  PlayCircle,
  Sparkle,
  Target,
  UploadSimple
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CompanySearchInput } from "@/components/dashboard/company-search-input";
import {
  CourseGrid,
  PlatformLinksGrid,
  YouTubeVideoGrid
} from "@/components/dashboard/youtube-video-grid";
import type { CompanyProfile } from "@/lib/data/companies";
import {
  codingPlatforms,
  interviewPrepCourses,
  interviewPrepVideos
} from "@/lib/data/learning-resources";
import type { InterviewGuide, MasterResume } from "@/types";

type ViewId =
  | "roadmap"
  | "coding"
  | "company"
  | "behavioral"
  | "resources"
  | "videos";

type InterviewGuideResponse = {
  guide: InterviewGuide;
};

type ImportResumeResponse = {
  masterResume: MasterResume;
};

const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const RESUME_ACCEPT =
  ".pdf,.doc,.docx,.txt,.text,.md,.markdown,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,application/rtf";

const experienceLevels = [
  "Student / Fresher",
  "Internship",
  "0-1 years",
  "1-2 years"
];

const timelines = ["7 days", "14 days", "30 days", "60 days"];

const languageOptions = [
  "JavaScript",
  "TypeScript",
  "Java",
  "Python",
  "C++",
  "C"
];

const focusOptions = [
  "DSA",
  "Projects",
  "System Design",
  "HR",
  "OOP",
  "DBMS",
  "Web Dev"
];

const views: Array<{
  id: ViewId;
  label: string;
  icon: PhosphorIcon;
}> = [
  { id: "roadmap", label: "Roadmap", icon: CalendarDots },
  { id: "coding", label: "Coding", icon: Code },
  { id: "company", label: "Company", icon: Briefcase },
  { id: "behavioral", label: "HR", icon: ChatCircleText },
  { id: "resources", label: "Resources", icon: BookOpenText },
  { id: "videos", label: "Videos", icon: PlayCircle }
];

async function readApiJson<T>(response: Response, fallbackMessage: string) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = (await response.json()) as T & { error?: string };

    if (!response.ok) {
      throw new Error(data.error ?? fallbackMessage);
    }

    return data;
  }

  const body = await response.text().catch(() => "");
  const htmlTitle = body.match(/<title>(.*?)<\/title>/i)?.[1];

  throw new Error(htmlTitle?.trim() || fallbackMessage);
}

function defaultFocus(guide: InterviewGuide | null) {
  return guide?.focusAreas?.length ? guide.focusAreas : ["DSA", "Projects", "HR"];
}

function difficultyTone(difficulty: string) {
  if (difficulty === "Hard") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (difficulty === "Easy") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border-sky-200 bg-sky-50 text-sky-700";
}

function difficultyAccent(difficulty: string) {
  if (difficulty === "Hard") {
    return "border-l-rose-400";
  }

  if (difficulty === "Easy") {
    return "border-l-emerald-400";
  }

  return "border-l-sky-400";
}

function numberedList(items: string[], icon: PhosphorIcon = CheckCircle) {
  const Icon = icon;

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" weight="regular" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function shortTextError(value: string, label: string) {
  return value.trim().length < 10
    ? `${label} needs at least a short line. Example: skills, projects, or role requirements.`
    : "";
}

function compactResumePreview(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 260);
}

export function InterviewGuideForm({
  initialGuide,
  initialCompany = "",
  initialRole = "",
  initialResumeContent = ""
}: {
  initialGuide: InterviewGuide | null;
  initialCompany?: string;
  initialRole?: string;
  initialResumeContent?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [editingResumeText, setEditingResumeText] = useState(false);
  const [activeView, setActiveView] = useState<ViewId>("roadmap");
  const [guide, setGuide] = useState<InterviewGuide | null>(initialGuide);
  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile | null>(
    null
  );
  const [focusAreas, setFocusAreas] = useState<string[]>(defaultFocus(initialGuide));
  const [resumeFileName, setResumeFileName] = useState("");
  const [form, setForm] = useState({
    company: initialGuide?.company ?? initialCompany,
    role: initialGuide?.role ?? initialRole,
    experienceLevel: initialGuide?.experienceLevel ?? "Student / Fresher",
    timeline: initialGuide?.timeline ?? "14 days",
    preferredLanguage: initialGuide?.preferredLanguage ?? "JavaScript",
    resumeContent: initialResumeContent,
    jobDescription: ""
  });
  const resumeFileInputRef = useRef<HTMLInputElement>(null);
  const selectedView = useMemo(
    () => views.find((view) => view.id === activeView) ?? views[0],
    [activeView]
  );
  const SelectedIcon = selectedView.icon;
  const resumePreview = compactResumePreview(form.resumeContent);

  function updateField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleFocus(area: string) {
    setFocusAreas((current) =>
      current.includes(area)
        ? current.filter((item) => item !== area)
        : [...current, area]
    );
  }

  async function onResumeFileSelected(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_RESUME_BYTES) {
      toast.error("Resume upload must be 10MB or smaller");
      event.target.value = "";
      return;
    }

    setUploadingResume(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/resumes/import", {
        method: "POST",
        body: formData
      });
      const data = await readApiJson<ImportResumeResponse>(
        response,
        "Resume import failed"
      );
      const rawText = data.masterResume.rawText?.trim() ?? "";

      if (rawText.length < 10) {
        throw new Error("Could not read enough resume text from this file");
      }

      updateField("resumeContent", rawText);
      setResumeFileName(data.masterResume.sourceName ?? file.name);
      setEditingResumeText(false);
      toast.success("Current resume imported");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploadingResume(false);
      event.target.value = "";
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const resumeError = shortTextError(form.resumeContent, "Current resume");
    const jobError = shortTextError(form.jobDescription, "Job description");

    if (resumeError || jobError) {
      toast.error(resumeError || jobError);
      return;
    }

    setLoading(true);
    setActiveView("roadmap");

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          focusAreas: focusAreas.length ? focusAreas : ["DSA", "Projects", "HR"]
        })
      });
      const data = await readApiJson<InterviewGuideResponse>(
        response,
        "Interview guide generation failed"
      );

      setGuide(data.guide);
      posthog.capture("interview_guide_created", {
        company: form.company,
        role: form.role,
        experience_level: form.experienceLevel,
        timeline: form.timeline,
        focus_areas: focusAreas,
        language: form.preferredLanguage
      });
      toast.success("Interview prep created");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.82fr_1fr]">
      <Card className="p-6 xl:sticky xl:top-24 xl:self-start">
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-foreground">
                Company
              </span>
              <CompanySearchInput
                value={form.company}
                onChange={(value) => updateField("company", value)}
                onSelect={(company) => {
                  setSelectedCompany(company);
                  if (company && !form.role.trim()) {
                    updateField("role", company.commonRoles[0] ?? "");
                  }
                }}
                placeholder="Google, TCS, Flipkart..."
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-foreground">Role</span>
              <Input
                value={form.role}
                onChange={(event) => updateField("role", event.target.value)}
                placeholder="Software Engineer Intern"
              />
              {selectedCompany ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedCompany.commonRoles.slice(0, 4).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => updateField("role", role)}
                      className="rounded-full border border-border bg-white px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              ) : null}
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-foreground">Level</span>
              <select
                value={form.experienceLevel}
                onChange={(event) =>
                  updateField("experienceLevel", event.target.value)
                }
                className="h-11 w-full rounded-xl border border-input bg-white px-3 text-sm"
              >
                {experienceLevels.map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-foreground">Time</span>
              <select
                value={form.timeline}
                onChange={(event) => updateField("timeline", event.target.value)}
                className="h-11 w-full rounded-xl border border-input bg-white px-3 text-sm"
              >
                {timelines.map((timeline) => (
                  <option key={timeline}>{timeline}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-foreground">Language</span>
              <select
                value={form.preferredLanguage}
                onChange={(event) =>
                  updateField("preferredLanguage", event.target.value)
                }
                className="h-11 w-full rounded-xl border border-input bg-white px-3 text-sm"
              >
                {languageOptions.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <p className="fine-label mb-2">Focus</p>
            <div className="flex flex-wrap gap-2">
              {focusOptions.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleFocus(area)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    focusAreas.includes(area)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white text-muted-foreground"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <input
              ref={resumeFileInputRef}
              type="file"
              accept={RESUME_ACCEPT}
              className="hidden"
              onChange={onResumeFileSelected}
            />
            <button
              type="button"
              onClick={() => resumeFileInputRef.current?.click()}
              disabled={uploadingResume}
              className="flex min-h-32 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/55 p-5 text-center transition hover:border-primary/40 hover:bg-white disabled:pointer-events-none disabled:opacity-60"
            >
              {uploadingResume ? (
                <SpinnerGap
                  className="h-8 w-8 animate-spin text-accent"
                  weight="regular"
                />
              ) : (
                <UploadSimple className="h-8 w-8 text-accent" weight="regular" />
              )}
              <span className="mt-4 text-sm font-semibold text-foreground">
                {uploadingResume ? "Reading resume..." : "Upload current resume file"}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                PDF, Word, text, Markdown, or RTF. Maximum file size 10MB
              </span>
            </button>

            {form.resumeContent ? (
              <div className="space-y-3 rounded-xl border border-success/20 bg-success/10 p-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-success">
                  <CheckCircle className="h-4 w-4 shrink-0" weight="regular" />
                  {resumeFileName || "Current resume imported"}
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  {resumePreview}
                  {resumePreview.length >= 260 ? "..." : ""}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingResumeText((value) => !value)}
                >
                  <FileText className="h-4 w-4" weight="regular" />
                  {editingResumeText ? "Hide extracted text" : "Edit extracted text"}
                </Button>
              </div>
            ) : null}

            {editingResumeText ? (
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-foreground">
                  Extracted resume text
                </span>
                <Textarea
                  value={form.resumeContent}
                  onChange={(event) =>
                    updateField("resumeContent", event.target.value)
                  }
                  className="min-h-32"
                />
              </label>
            ) : null}
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-foreground">
              Job description
            </span>
            <Textarea
              value={form.jobDescription}
              onChange={(event) =>
                updateField("jobDescription", event.target.value)
              }
              placeholder="Paste the job description"
              className="min-h-40"
              required
            />
            <span className="text-xs text-muted-foreground">
              Paste the full JD or write a short role requirement.
            </span>
          </label>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
            ) : (
              <Sparkle className="h-4 w-4" weight="regular" />
            )}
            {loading ? "Creating..." : "Create prep plan"}
          </Button>
        </form>
      </Card>

      <Card className="min-h-[760px] overflow-hidden p-0">
        <div className="border-b border-border bg-[#fbfaf6] px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="fine-label mb-2">Interview workspace</p>
              <h3 className="font-serif text-3xl text-primary">
                {guide?.role ?? "Prep plan"}
              </h3>
              {guide ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    guide.company,
                    guide.timeline || form.timeline,
                    guide.preferredLanguage || form.preferredLanguage
                  ]
                    .filter(Boolean)
                    .map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              ) : null}
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-white text-primary shadow-sm">
              <Brain className="h-6 w-6" weight="regular" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4 p-6">
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted" />
            <div className="h-28 animate-pulse rounded-xl bg-muted" />
            <div className="h-28 animate-pulse rounded-xl bg-muted" />
            <div className="h-28 animate-pulse rounded-xl bg-muted" />
          </div>
        ) : guide ? (
          <div className="space-y-5 p-6">
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                ["Roadmap", `${guide.roadmap?.length ?? 0}`, CalendarDots],
                ["Coding", `${guide.codingQuestions?.length ?? 0}`, Code],
                ["Company", `${guide.companyQuestions?.length ?? 0}`, Target],
                ["Resources", `${guide.freeResources?.length ?? 0}`, BookOpenText]
              ].map(([label, value, icon]) => {
                const Icon = icon as PhosphorIcon;

                return (
                  <div
                    key={label as string}
                    className="rounded-lg border border-border bg-white p-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Icon className="h-4 w-4 text-accent" weight="regular" />
                      <p className="text-xl font-bold text-primary">
                        {value as string}
                      </p>
                    </div>
                    <p className="mt-2 text-[10px] font-semibold uppercase text-muted-foreground">
                      {label as string}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl border border-accent/20 bg-[#f5fbf8] p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkle className="h-4 w-4 text-accent" weight="regular" />
                <p className="text-xs font-bold uppercase text-accent">
                  Prep signal
                </p>
              </div>
              <p className="text-sm leading-7 text-foreground">
                {guide.companyAnalysis}
              </p>
            </div>

            <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-white p-1 shadow-sm">
              {views.map((view) => {
                const Icon = view.icon;

                return (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setActiveView(view.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      activeView === view.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" weight="regular" />
                    {view.label}
                  </button>
                );
              })}
            </div>

            <section className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <SelectedIcon className="h-4 w-4" weight="regular" />
                  </span>
                  <h4 className="text-sm font-semibold text-foreground">
                    {selectedView.label}
                  </h4>
                </div>
              </div>

              {activeView === "roadmap" ? (
                <div className="space-y-0">
                  {(guide.roadmap ?? []).map((step, index) => (
                    <div
                      key={`${step.week}-${step.goal}`}
                      className="relative border-l border-border pb-6 pl-6 last:pb-0"
                    >
                      <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full border border-accent/25 bg-white text-[11px] font-bold text-accent">
                        {index + 1}
                      </span>
                      <div className="rounded-lg bg-[#fbfaf6] p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                            {step.week}
                          </span>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {step.output}
                          </span>
                        </div>
                        <h5 className="mt-3 text-base font-bold text-foreground">
                          {step.goal}
                        </h5>
                        <div className="mt-3">{numberedList(step.tasks)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {activeView === "coding" ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {(guide.codingQuestions ?? []).map((question) => (
                    <div
                      key={`${question.title}-${question.pattern}`}
                      className={`rounded-lg border border-l-4 border-border bg-[#fbfaf6] p-4 transition hover:border-primary/30 hover:bg-white ${difficultyAccent(
                        question.difficulty
                      )}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${difficultyTone(
                            question.difficulty
                          )}`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="text-[11px] font-semibold uppercase text-muted-foreground">
                          {question.pattern}
                        </span>
                      </div>
                      <h5 className="mt-3 text-base font-bold text-foreground">
                        {question.title}
                      </h5>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {question.why}
                      </p>
                      {question.link ? (
                        <a
                          href={question.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-primary"
                        >
                          Open problem
                          <ArrowSquareOut className="h-3.5 w-3.5" weight="regular" />
                        </a>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              {activeView === "company" ? (
                <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
                  <div className="rounded-lg bg-[#fbfaf6] p-4">
                    <h5 className="mb-3 text-sm font-semibold text-foreground">
                      Company-style questions
                    </h5>
                    {numberedList(guide.companyQuestions ?? [], Target)}
                  </div>
                  <div className="rounded-lg border border-border bg-white p-4">
                    <h5 className="text-sm font-semibold text-foreground">
                      Technical topics
                    </h5>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(guide.technicalTopics ?? []).map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {activeView === "behavioral" ? (
                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-lg bg-[#fbfaf6] p-4">
                    <h5 className="mb-3 text-sm font-semibold text-foreground">
                      HR and project questions
                    </h5>
                    {numberedList(guide.behavioralQuestions ?? [], ChatCircleText)}
                  </div>
                  <div className="rounded-lg border border-border bg-white p-4">
                    <h5 className="mb-3 text-sm font-semibold text-foreground">
                      Mock plan
                    </h5>
                    {numberedList(guide.mockPlan ?? [], GraduationCap)}
                  </div>
                </div>
              ) : null}

              {activeView === "resources" ? (
                <div className="space-y-6">
                  <PlatformLinksGrid
                    platforms={codingPlatforms}
                    title="Practice on these platforms"
                  />
                  <div className="grid gap-3 md:grid-cols-2">
                    {(guide.freeResources ?? []).map((resource) => (
                      <a
                        key={`${resource.provider}-${resource.title}`}
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-lg border border-border bg-[#fbfaf6] p-4 transition hover:border-primary/40 hover:bg-white hover:shadow-soft"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase text-accent">
                              {resource.provider}
                            </p>
                            <h5 className="mt-1 text-base font-bold text-foreground">
                              {resource.title}
                            </h5>
                          </div>
                          <ArrowSquareOut
                            className="h-4 w-4 text-muted-foreground transition group-hover:text-primary"
                            weight="regular"
                          />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {resource.focus}
                        </p>
                        <span className="mt-3 inline-flex rounded-full bg-muted px-3 py-1 text-[11px] font-bold text-muted-foreground">
                          {resource.type}
                        </span>
                      </a>
                    ))}
                  </div>
                  <CourseGrid
                    courses={interviewPrepCourses}
                    title="Recommended courses (Google, Coursera & more)"
                  />
                </div>
              ) : null}

              {activeView === "videos" ? (
                <div className="space-y-6">
                  <YouTubeVideoGrid
                    videos={interviewPrepVideos}
                    title="Interview prep videos — click to play"
                  />
                  <CourseGrid
                    courses={interviewPrepCourses}
                    title="Free courses to pair with video learning"
                  />
                </div>
              ) : null}
            </section>
          </div>
        ) : (
          <div className="m-6 space-y-6">
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white/55 p-8 text-center">
              <Stack className="h-8 w-8 text-accent" weight="regular" />
              <h4 className="mt-4 font-serif text-3xl text-primary">
                Ready to prep
              </h4>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                Add the role, resume, and job description to create a focused
                interview practice plan.
              </p>
            </div>
            <YouTubeVideoGrid
              videos={interviewPrepVideos.slice(0, 4)}
              title="Popular prep videos while you set up"
            />
          </div>
        )}
      </Card>
    </div>
  );
}
