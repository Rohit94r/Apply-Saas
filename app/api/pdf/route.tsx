import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import { ResumeDocument, type ResumePdfData } from "@/lib/pdf/resume-document";
import { renderPreservedSourcePdf } from "@/lib/pdf/source-pdf";
import { getCurrentUserId } from "@/lib/auth";
import {
  getGeneratedResume,
  getMasterResume,
  markResumeDownloaded
} from "@/lib/data/resumes";

export const runtime = "nodejs";

const emptyResume: ResumePdfData = {
  name: "Resume",
  role: "Target role",
  summary: "",
  skills: [],
  bullets: []
};

async function renderResumePdf(data: ResumePdfData) {
  const instance = pdf(<ResumeDocument data={{ ...emptyResume, ...data }} />);
  const stream = await instance.toBuffer();
  const chunks: Uint8Array[] = [];

  for await (const chunk of stream as unknown as AsyncIterable<Buffer | Uint8Array>) {
    chunks.push(chunk instanceof Buffer ? new Uint8Array(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

function pdfResponse(
  buffer: Buffer,
  fileName = "apply-resume.pdf",
  disposition: "attachment" | "inline" = "attachment"
) {
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename=${fileName}`
    }
  });
}

export async function POST(request: Request) {
  await getCurrentUserId();

  const data = (await request.json().catch(() => emptyResume)) as ResumePdfData;
  const buffer = await renderResumePdf(data);

  return pdfResponse(buffer);
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const resumeId = searchParams.get("resumeId");
  const isPreview = searchParams.get("preview") === "1";
  const mode = searchParams.get("mode") === "before" ? "before" : "after";
  const templateParam = searchParams.get("template");
  const template =
    templateParam === "modern" || templateParam === "compact" || templateParam === "classic"
      ? templateParam
      : undefined;

  if (resumeId) {
    const userId = await getCurrentUserId();
    const resume = await getGeneratedResume(userId, resumeId);

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const sourceResume = resume.originalResumeId
      ? await getMasterResume(userId, resume.originalResumeId).catch(() => null)
      : null;
    const preservedBuffer = await renderPreservedSourcePdf({
      sourceFilePath:
        resume.generatedContent.sourceFilePath ?? sourceResume?.sourceFilePath,
      sourceLayout:
        resume.generatedContent.sourceLayout?.length
          ? resume.generatedContent.sourceLayout
          : sourceResume?.sourceLayout,
      beforeText: resume.generatedContent.beforeText,
      afterText: mode === "before" ? undefined : resume.generatedContent.afterText
    });
    const fallbackText =
      mode === "before"
        ? resume.generatedContent.beforeText
        : resume.generatedContent.afterText;
    const buffer = preservedBuffer ?? (await renderResumePdf({
      name: "Resume",
      role: resume.role,
      fullText: fallbackText,
      template: template ?? resume.generatedContent.template,
      summary: resume.generatedContent.summary,
      skills: resume.generatedContent.skills,
      bullets: resume.generatedContent.bullets
    }));

    if (!isPreview) {
      await markResumeDownloaded(userId, resumeId);
    }

    const safeCompany = resume.company.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return pdfResponse(
      buffer,
      `apply-${safeCompany || "resume"}.pdf`,
      isPreview ? "inline" : "attachment"
    );
  }

  return NextResponse.json({
    status: "ready",
    message: "POST resume content to this route to generate an ATS-friendly PDF."
  });
}
