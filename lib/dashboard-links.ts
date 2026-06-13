import type { GeneratedResume } from "@/types";

export function resumeText(resume: GeneratedResume) {
  return (
    resume.generatedContent.afterText?.trim() ||
    resume.generatedContent.beforeText?.trim() ||
    ""
  );
}

export function toolsHref(
  resume: Pick<GeneratedResume, "id" | "company" | "role">,
  tool: "cover" | "critique" = "cover"
) {
  const params = new URLSearchParams({
    resumeId: resume.id,
    tool,
    company: resume.company,
    role: resume.role
  });

  return `/dashboard/tools?${params.toString()}`;
}

export function interviewHref(resume: Pick<GeneratedResume, "id" | "company" | "role">) {
  const params = new URLSearchParams({
    resumeId: resume.id,
    company: resume.company,
    role: resume.role
  });

  return `/dashboard/interview?${params.toString()}`;
}

export function retailorHref(resume: Pick<GeneratedResume, "company" | "role">) {
  const params = new URLSearchParams({
    company: resume.company,
    role: resume.role
  });

  return `/dashboard/generate?${params.toString()}`;
}
