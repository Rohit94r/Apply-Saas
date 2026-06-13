import { billingRequestHeaders } from "@/lib/device-id";
import type { GeneratedResume, MasterResume } from "@/types";
import type { ResumeStudioDocument } from "./types";
import { documentToPdfPayload, itemsToText, serializeResumeDocument } from "./sections";

async function readApiJson<T>(response: Response, fallbackMessage: string) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = (await response.json()) as T & { error?: string; upgradeUrl?: string };

    if (!response.ok) {
      throw new Error(data.error ?? fallbackMessage);
    }

    return data;
  }

  throw new Error(fallbackMessage);
}

export async function saveMasterResume({
  title,
  rawText
}: {
  title: string;
  rawText: string;
}) {
  const response = await fetch("/api/resumes/master", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      sourceName: "Resume studio",
      rawText
    })
  });

  return readApiJson<{ masterResume: MasterResume }>(response, "Unable to save master resume");
}

export async function buildResumeFromDocument(document: ResumeStudioDocument) {
  const { personal } = document;

  const response = await fetch("/api/resumes/build", {
    method: "POST",
    headers: billingRequestHeaders(),
    body: JSON.stringify({
      template: document.template,
      name: personal.name.trim() || "Student",
      email: personal.email,
      phone: personal.phone,
      location: personal.location,
      linkedin: personal.linkedin,
      github: personal.github,
      jobType: "Technology",
      targetRole: personal.targetRole.trim() || "Full Stack Developer",
      degree: document.education[0]?.text.split("\n")[0]?.trim() || "Bachelor's degree",
      college: document.education[0]?.text.split("\n")[1]?.trim() || "University",
      graduationYear: "",
      skills: document.skills.length
        ? document.skills
        : ["JavaScript", "React", "TypeScript"],
      hasExperience: document.experience.some((item) => item.text.trim()),
      experience: itemsToText(document.experience),
      hasProjects: document.projects.some((item) => item.text.trim()),
      projects: document.projects.map((item) => item.text.trim()).filter(Boolean),
      hasCertificates: document.achievements.some((item) => item.text.trim()),
      certificates: document.achievements.map((item) => item.text.trim()).filter(Boolean),
      wantsPhoto: false,
      customSections: document.summary.trim()
        ? [{ title: "Summary", content: document.summary }]
        : [],
      prompt: ""
    })
  });

  if (response.status === 402) {
    const limit = (await response.json()) as { error?: string; upgradeUrl?: string };
    throw new Error(limit.error ?? "Free credits finished");
  }

  return readApiJson<{ resume: GeneratedResume }>(response, "Resume generation failed");
}

export async function refineResume({
  resumeId,
  prompt
}: {
  resumeId: string;
  prompt: string;
}) {
  const response = await fetch("/api/resumes/refine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeId, prompt })
  });

  return readApiJson<{ resume: GeneratedResume }>(response, "Refinement failed");
}

export async function patchResume(
  resumeId: string,
  document: ResumeStudioDocument,
  atsScore = 0
) {
  const afterText = serializeResumeDocument(document);
  const bullets = afterText
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*•]\s*/, "").trim())
    .filter((line) => line.length > 30)
    .slice(0, 8);

  const response = await fetch(`/api/resumes/${resumeId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      summary: document.summary,
      skills: document.skills,
      bullets,
      afterText,
      atsScore,
      template: document.template
    })
  });

  return readApiJson<{ resume: GeneratedResume }>(response, "Resume save failed");
}

export async function createPreviewBlob(document: ResumeStudioDocument) {
  const response = await fetch("/api/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(documentToPdfPayload(document))
  });

  if (!response.ok) {
    throw new Error("Preview render failed");
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
