"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  DownloadSimple,
  Eye,
  FileText,
  FloppyDisk,
  PencilSimple,
  ShareNetwork,
  Sparkle,
  SpinnerGap,
  UploadSimple
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CompanySearchInput
} from "@/components/dashboard/company-search-input";
import type { CompanyProfile } from "@/lib/data/companies";
import { billingRequestHeaders } from "@/lib/device-id";
import type { MasterResume, ResumeSourceLine } from "@/types";

const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const RESUME_ACCEPT =
  ".pdf,.doc,.docx,.txt,.text,.md,.markdown,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,application/rtf";

type GeneratedPreview = {
  id: string;
  company: string;
  role: string;
  atsScore: number;
  beforeAtsScore: number;
  keywords: string[];
  summary: string;
  skills: string[];
  bullets: string[];
  beforeText: string;
  afterText: string;
  changeSummary: string[];
  sourceFilePath?: string;
  sourceFileType?: string;
  sourceLayout?: ResumeSourceLine[];
};

type GeneratedResumeResponse = {
  resume: {
    id: string;
    company: string;
    role: string;
    atsScore: number;
    keywords: string[];
    generatedContent: {
      summary: string;
      skills: string[];
      bullets: string[];
      beforeText?: string;
      afterText?: string;
      changeSummary?: string[];
      beforeAtsScore?: number;
      sourceFilePath?: string;
      sourceFileType?: string;
      sourceLayout?: ResumeSourceLine[];
    };
  };
};

type PreviewMode = "before" | "after";

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
  const message = htmlTitle?.trim() || fallbackMessage;

  if (response.status === 401 || response.status === 403) {
    throw new Error("Please sign in again before uploading your resume");
  }

  if (response.status === 413) {
    throw new Error("Resume upload must be 10MB or smaller");
  }

  throw new Error(message);
}

function formatMasterResumeText(resume: MasterResume | null) {
  if (!resume) {
    return "";
  }

  if (resume.rawText?.trim()) {
    return resume.rawText.trim();
  }

  const sections = [
    resume.summary && `Summary\n${resume.summary}`,
    resume.education.length && `Education\n${resume.education.join("\n")}`,
    resume.skills.length &&
      `Skills\n${resume.skills.map((skill) => skill.name).join(", ")}`,
    resume.projects.length &&
      `Projects\n${resume.projects
        .map((project) =>
          [
            project.name,
            project.description,
            project.stack.length ? `Stack: ${project.stack.join(", ")}` : "",
            project.impact
          ]
            .filter(Boolean)
            .join(" - ")
        )
        .join("\n")}`,
    resume.experience.length &&
      `Experience\n${resume.experience
        .map((experience) =>
          [
            `${experience.role} at ${experience.company}`,
            [experience.startDate, experience.endDate].filter(Boolean).join(" - "),
            ...experience.bullets
          ]
            .filter(Boolean)
            .join("\n")
        )
        .join("\n\n")}`
  ].filter(Boolean);

  return sections.join("\n\n");
}

function compactPreview(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 280);
}

function uploadMessage(fileName?: string) {
  if (!fileName) {
    return "Your resume is uploaded";
  }

  return fileName.toLowerCase().endsWith(".pdf")
    ? `Your PDF is uploaded: ${fileName}`
    : `Your resume is uploaded: ${fileName}`;
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitComma(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function firstUsefulParagraph(value: string) {
  return (
    value
      .split(/\n{2,}/)
      .map((section) => section.replace(/\s+/g, " ").trim())
      .find((section) => section.length > 60) ?? value.replace(/\s+/g, " ").trim()
  ).slice(0, 420);
}

function extractBullets(value: string) {
  const explicitBullets = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^[-*•]/.test(line))
    .map((line) => line.replace(/^[-*•]\s*/, ""))
    .filter((line) => line.length > 10)
    .slice(0, 8);

  if (explicitBullets.length) {
    return explicitBullets;
  }

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 40)
    .slice(0, 6);
}

function structuredResumeText(data: GeneratedResumeResponse["resume"]) {
  return [
    data.generatedContent.summary,
    data.generatedContent.skills.length
      ? `Skills\n${data.generatedContent.skills.join(", ")}`
      : "",
    data.generatedContent.bullets.length
      ? `Experience\n${data.generatedContent.bullets
          .map((bullet) => `- ${bullet}`)
          .join("\n")}`
      : ""
  ]
    .filter(Boolean)
    .join("\n\n");
}

function toPreview(data: GeneratedResumeResponse["resume"]): GeneratedPreview {
  const afterText =
    data.generatedContent.afterText?.trim() || structuredResumeText(data);
  const beforeText = data.generatedContent.beforeText?.trim() || afterText;

  return {
    id: data.id,
    company: data.company,
    role: data.role,
    atsScore: data.atsScore,
    beforeAtsScore: data.generatedContent.beforeAtsScore ?? Math.max(data.atsScore - 12, 0),
    keywords: data.keywords,
    summary: data.generatedContent.summary,
    skills: data.generatedContent.skills,
    bullets: data.generatedContent.bullets,
    beforeText,
    afterText,
    changeSummary: data.generatedContent.changeSummary ?? [],
    sourceFilePath: data.generatedContent.sourceFilePath,
    sourceFileType: data.generatedContent.sourceFileType,
    sourceLayout: data.generatedContent.sourceLayout
  };
}

function normalizeLine(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function buildSuggestedJobDescription(
  company: CompanyProfile | null,
  role: string
) {
  if (!company && !role.trim()) {
    return "";
  }

  const roleLine = role.trim() || company?.commonRoles[0] || "Software Engineer";
  const companyLine = company?.name ?? "the target company";

  return [
    `Role: ${roleLine} at ${companyLine}`,
    "",
    "Key requirements:",
    ...(company?.hiringFocus.map((item) => `- ${item}`) ?? [
      "- Strong problem solving and DSA fundamentals",
      "- Good communication and teamwork",
      "- Relevant projects or internship experience"
    ]),
    "",
    company
      ? `Interview style: ${company.interviewStyle}`
      : "Paste the full job description below or edit this template.",
    "",
    "Additional requirements:",
    "- Add specific skills, tech stack, or responsibilities from the job posting"
  ].join("\n");
}

export function GenerateResumeForm({
  initialMasterResume
}: {
  initialMasterResume: MasterResume | null;
}) {
  const router = useRouter();
  const initialText = formatMasterResumeText(initialMasterResume);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savingMaster, setSavingMaster] = useState(false);
  const [savingPreview, setSavingPreview] = useState(false);
  const [masterResume, setMasterResume] = useState(initialMasterResume);
  const [editingMaster, setEditingMaster] = useState(!initialMasterResume);
  const [masterDraft, setMasterDraft] = useState(initialText);
  const [titleDraft, setTitleDraft] = useState(
    initialMasterResume?.title ?? "Master resume"
  );
  const [sourceName, setSourceName] = useState(
    initialMasterResume?.sourceName ?? ""
  );
  const [preview, setPreview] = useState<GeneratedPreview | null>(null);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("after");
  const [editingPreview, setEditingPreview] = useState(false);
  const [companyDraft, setCompanyDraft] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<CompanyProfile | null>(
    null
  );
  const [roleDraft, setRoleDraft] = useState("");
  const [jobDescriptionDraft, setJobDescriptionDraft] = useState("");
  const [jobStep, setJobStep] = useState<1 | 2 | 3>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleCompanySelect(company: CompanyProfile | null) {
    setSelectedCompany(company);
    if (company && !roleDraft.trim()) {
      setRoleDraft(company.commonRoles[0] ?? "");
    }
    if (company) {
      setJobStep(2);
      if (jobDescriptionDraft.trim().length < 80) {
        setJobDescriptionDraft(
          buildSuggestedJobDescription(
            company,
            roleDraft || (company.commonRoles[0] ?? "")
          )
        );
      }
    }
  }

  function handleRoleSelect(role: string) {
    setRoleDraft(role);
    setJobStep(3);
    if (selectedCompany) {
      setJobDescriptionDraft(
        buildSuggestedJobDescription(selectedCompany, role)
      );
    }
  }

  async function saveMasterResume(rawText: string, title: string, source: string) {
    const response = await fetch("/api/resumes/master", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        sourceName: source,
        rawText
      })
    });
    const data = await readApiJson<{ masterResume: MasterResume }>(
      response,
      "Master resume save failed"
    );

    setMasterResume(data.masterResume);
    setMasterDraft(formatMasterResumeText(data.masterResume));
    setTitleDraft(data.masterResume.title);
    setSourceName(data.masterResume.sourceName ?? "");
    setEditingMaster(false);
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

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/resumes/import", {
        method: "POST",
        body: formData
      });
      const data = await readApiJson<{ masterResume: MasterResume }>(
        response,
        "Resume import failed"
      );

      setMasterResume(data.masterResume);
      setMasterDraft(formatMasterResumeText(data.masterResume));
      setTitleDraft(data.masterResume.title);
      setSourceName(data.masterResume.sourceName ?? file.name);
      setEditingMaster(false);
      toast.success(uploadMessage(file.name));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function onSaveMaster(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rawText = masterDraft.trim();

    if (rawText.length < 80) {
      toast.error("Add enough resume content before saving");
      return;
    }

    setSavingMaster(true);

    try {
      await saveMasterResume(rawText, titleDraft, sourceName);
      toast.success("Master resume saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSavingMaster(false);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!masterResume) {
      setEditingMaster(true);
      toast.error("Upload or paste your resume first");
      return;
    }

    setLoading(true);
    setPreview(null);
    setPreviewMode("after");
    setEditingPreview(false);

    try {
      const response = await fetch("/api/resumes/generate", {
        method: "POST",
        headers: billingRequestHeaders(),
        body: JSON.stringify({
          company: companyDraft.trim(),
          role: roleDraft.trim(),
          masterResumeId: masterResume.id,
          jobDescription: jobDescriptionDraft.trim()
        })
      });

      if (response.status === 402) {
        const limit = (await response.json()) as { error?: string; upgradeUrl?: string };
        toast.error(limit.error ?? "Free credits finished. Upgrade to Pro for unlimited access.");
        router.push(limit.upgradeUrl ?? "/dashboard/upgrade");
        return;
      }

      const data = await readApiJson<GeneratedResumeResponse>(
        response,
        "Resume generation failed"
      );

      setPreview(toPreview(data.resume));
      setPreviewMode("after");
      toast.success("Tailored resume ready");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function savePreview({ silent = false } = {}) {
    if (!preview) {
      return null;
    }

    setSavingPreview(true);

    try {
      const response = await fetch(`/api/resumes/${preview.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: preview.summary,
          skills: preview.skills,
          bullets: preview.bullets,
          beforeText: preview.beforeText,
          afterText: preview.afterText,
          changeSummary: preview.changeSummary,
          beforeAtsScore: preview.beforeAtsScore,
          keywords: preview.keywords,
          atsScore: preview.atsScore
        })
      });
      const data = await readApiJson<GeneratedResumeResponse>(
        response,
        "Resume save failed"
      );

      const savedPreview = toPreview(data.resume);
      setPreview(savedPreview);
      setEditingPreview(false);

      if (!silent) {
        toast.success("Resume saved");
      }

      return savedPreview;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save resume");
      return null;
    } finally {
      setSavingPreview(false);
    }
  }

  async function onDownload() {
    const saved = await savePreview({ silent: true });

    if (saved) {
      window.open(`/api/pdf?resumeId=${saved.id}`, "_blank", "noopener,noreferrer");
    }
  }

  async function onShare() {
    if (!preview) {
      return;
    }

    const url = `${window.location.origin}/api/pdf?resumeId=${preview.id}`;

    if (navigator.share) {
      await navigator.share({
        title: `${preview.role} resume`,
        text: `Resume for ${preview.company}`,
        url
      });
      return;
    }

    await navigator.clipboard.writeText(url);
    toast.success("Share link copied");
  }

  const savedText = compactPreview(formatMasterResumeText(masterResume));
  const canGenerate = Boolean(masterResume) && !loading;
  const beforeLineSet = new Set(
    preview?.beforeText
      .split(/\r?\n/)
      .map(normalizeLine)
      .filter(Boolean) ?? []
  );
  const changedLineCount = preview
    ? preview.afterText
        .split(/\r?\n/)
        .map(normalizeLine)
        .filter((line) => line && !beforeLineSet.has(line)).length
    : 0;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="fine-label mb-2">Upload resume</p>
              <h3 className="font-serif text-3xl text-primary">
                {masterResume ? "Resume ready" : "Add your resume"}
              </h3>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FileText className="h-5 w-5" weight="regular" />
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={RESUME_ACCEPT}
            className="hidden"
            onChange={onResumeFileSelected}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex min-h-36 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/55 p-6 text-center transition hover:border-primary/40 hover:bg-white disabled:pointer-events-none disabled:opacity-60"
          >
            {uploading ? (
              <SpinnerGap className="h-8 w-8 animate-spin text-accent" weight="regular" />
            ) : (
              <UploadSimple className="h-8 w-8 text-accent" weight="regular" />
            )}
            <span className="mt-4 text-sm font-semibold text-foreground">
              {uploading ? "Reading resume..." : "Upload PDF, Word, text, Markdown, or RTF"}
            </span>
            <span className="mt-1 text-xs text-muted-foreground">
              Maximum file size 10MB
            </span>
          </button>

          {masterResume ? (
            <div className="mt-5 space-y-4">
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-success">
                  <CheckCircle className="h-3.5 w-3.5" weight="regular" />
                  Saved
                </span>
                {masterResume.sourceName ? (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                    {masterResume.sourceName}
                  </span>
                ) : null}
              </div>
              <p className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/10 p-3 text-sm font-semibold text-success">
                <CheckCircle className="h-4 w-4 shrink-0" weight="regular" />
                {uploadMessage(masterResume.sourceName)}
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                {savedText || "Your resume profile is saved."}
                {savedText.length >= 280 ? "..." : ""}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingMaster((value) => !value)}
              >
                <PencilSimple className="h-4 w-4" weight="regular" />
                {editingMaster ? "Hide text edit" : "Edit imported text"}
              </Button>
            </div>
          ) : null}

          {editingMaster ? (
            <form className="mt-5 space-y-5" onSubmit={onSaveMaster}>
              <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-foreground">Title</span>
                  <Input
                    value={titleDraft}
                    onChange={(event) => setTitleDraft(event.target.value)}
                    placeholder="Master resume"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-foreground">
                    Source name
                  </span>
                  <Input
                    value={sourceName}
                    onChange={(event) => setSourceName(event.target.value)}
                    placeholder="resume.pdf"
                  />
                </label>
              </div>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-foreground">
                  Resume text
                </span>
                <Textarea
                  value={masterDraft}
                  onChange={(event) => setMasterDraft(event.target.value)}
                  className="min-h-44"
                  placeholder="Paste your resume content here if you do not want to upload a file."
                />
              </label>
              <Button type="submit" disabled={savingMaster}>
                {savingMaster ? (
                  <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
                ) : (
                  <FloppyDisk className="h-4 w-4" weight="regular" />
                )}
                {savingMaster ? "Saving..." : "Save resume text"}
              </Button>
            </form>
          ) : null}
        </Card>

        <Card className="p-6">
          <div className="mb-5 flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <span
                key={step}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  jobStep >= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </span>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {jobStep === 1
                ? "Pick company"
                : jobStep === 2
                  ? "Choose role"
                  : "Confirm details"}
            </span>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <p className="fine-label mb-2">Step 1 — Company</p>
              <CompanySearchInput
                value={companyDraft}
                onChange={setCompanyDraft}
                onSelect={handleCompanySelect}
                placeholder="Type company name — Google, TCS, Flipkart..."
              />
            </div>

            {(selectedCompany || companyDraft.trim()) && jobStep >= 2 ? (
              <div>
                <p className="fine-label mb-2">Step 2 — Role</p>
                <Input
                  name="role"
                  value={roleDraft}
                  onChange={(event) => setRoleDraft(event.target.value)}
                  placeholder="Software Engineer, SDE Intern..."
                />
                {selectedCompany ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCompany.commonRoles.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          roleDraft === role
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-white text-muted-foreground"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div>
              <p className="fine-label mb-2">Step 3 — Job details</p>
              <Textarea
                name="jobDescription"
                value={jobDescriptionDraft}
                onChange={(event) => setJobDescriptionDraft(event.target.value)}
                placeholder={
                  selectedCompany
                    ? "Edit the auto-filled details or paste the full job posting."
                    : "Paste job details here. Company info helps but is optional."
                }
                className="min-h-36"
                required
              />
              <span className="mt-1 block text-xs text-muted-foreground">
                {jobDescriptionDraft.trim().length}/80 characters minimum
              </span>
            </div>

            <Button type="submit" disabled={!canGenerate}>
              {loading ? (
                <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
              ) : (
                <Sparkle className="h-4 w-4" weight="regular" />
              )}
              {loading ? "Tailoring..." : "Tailor resume"}
            </Button>
          </form>
        </Card>
      </div>

      <Card className="min-h-[720px] p-6 xl:sticky xl:top-24 xl:self-start">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="fine-label mb-2">Live preview</p>
            <h3 className="font-serif text-3xl text-primary">
              {preview?.role ?? "Resume preview"}
            </h3>
            {preview ? (
              <p className="mt-1 text-xs font-semibold text-muted-foreground">
                {changedLineCount} focused change
                {changedLineCount === 1 ? "" : "s"} detected
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex rounded-xl border border-border bg-white p-1">
              {(["before", "after"] as PreviewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  disabled={!preview}
                  onClick={() => setPreviewMode(mode)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                    previewMode === mode
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  } disabled:pointer-events-none disabled:opacity-50`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!preview}
              onClick={() => setEditingPreview((value) => !value)}
            >
              {editingPreview ? (
                <Eye className="h-4 w-4" weight="regular" />
              ) : (
                <PencilSimple className="h-4 w-4" weight="regular" />
              )}
              {editingPreview ? "Preview" : "Edit"}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!preview || savingPreview}
              onClick={() => savePreview()}
            >
              {savingPreview ? (
                <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
              ) : (
                <FloppyDisk className="h-4 w-4" weight="regular" />
              )}
              Save
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!preview || savingPreview}
              onClick={onDownload}
            >
              <DownloadSimple className="h-4 w-4" weight="regular" />
              Download
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!preview}
              onClick={onShare}
            >
              <ShareNetwork className="h-4 w-4" weight="regular" />
              Share
            </Button>
          </div>
        </div>

        {preview ? (
          <div className="mb-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-white/70 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase text-muted-foreground">
                Before ATS
              </p>
              <p className="mt-1 text-xl font-bold text-primary">
                {preview.beforeAtsScore}%
              </p>
            </div>
            <div className="rounded-lg border border-accent/25 bg-accent/10 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase text-accent">
                New ATS
              </p>
              <p className="mt-1 text-xl font-bold text-accent">
                {preview.atsScore}%
              </p>
            </div>
          </div>
        ) : null}

        {loading ? (
          <div className="space-y-4">
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted" />
            <div className="h-28 animate-pulse rounded-xl bg-muted" />
            <div className="h-28 animate-pulse rounded-xl bg-muted" />
            <div className="h-96 animate-pulse rounded-xl bg-muted" />
          </div>
        ) : preview ? (
          editingPreview ? (
            <div className="space-y-5">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-foreground">
                  After resume text
                </span>
                <Textarea
                  value={preview.afterText}
                  onChange={(event) => {
                    const afterText = event.target.value;
                    setPreview({
                      ...preview,
                      afterText,
                      summary: firstUsefulParagraph(afterText),
                      bullets: extractBullets(afterText)
                    });
                  }}
                  className="min-h-[520px] font-mono text-xs leading-5"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-foreground">
                  Matched keywords
                </span>
                <Textarea
                  value={preview.keywords.join(", ")}
                  onChange={(event) =>
                    setPreview({ ...preview, keywords: splitComma(event.target.value) })
                  }
                  className="min-h-20"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-foreground">
                  Change notes
                </span>
                <Textarea
                  value={preview.changeSummary.join("\n")}
                  onChange={(event) =>
                    setPreview({
                      ...preview,
                      changeSummary: splitLines(event.target.value)
                    })
                  }
                  className="min-h-24"
                />
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              {previewMode === "after" && preview.changeSummary.length ? (
                <section>
                  <h4 className="mb-3 text-sm font-semibold text-foreground">
                    Changes made
                  </h4>
                  <div className="space-y-2">
                    {preview.changeSummary.map((change) => (
                      <p
                        key={change}
                        className="rounded-lg border border-accent/20 bg-white/80 p-3 text-sm leading-6 text-muted-foreground"
                      >
                        {change}
                      </p>
                    ))}
                  </div>
                </section>
              ) : null}

              <section>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Matched keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {preview.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    {previewMode === "before" ? "Before PDF" : "After PDF"}
                  </h4>
                  <span className="text-xs font-semibold text-accent">
                    Same document preview
                  </span>
                </div>
                <div className="overflow-hidden rounded-xl border border-border bg-white shadow-inner">
                  <iframe
                    title={`${previewMode} resume PDF preview`}
                    src={`/api/pdf?resumeId=${preview.id}&preview=1&mode=${previewMode}`}
                    className="h-[680px] w-full bg-white"
                  />
                </div>
              </section>
            </div>
          )
        ) : (
          <div className="flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/50 p-8 text-center">
            <Sparkle className="h-8 w-8 text-accent" weight="regular" />
            <h4 className="mt-4 font-serif text-3xl text-primary">
              Waiting for details
            </h4>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Upload a resume and add job details. Company and role can stay
              blank when you do not have them yet.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
