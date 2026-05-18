import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import { ResumeDocument, type ResumePdfData } from "@/lib/pdf/resume-document";
import { getCurrentUserId } from "@/lib/auth";
import { getGeneratedResume, markResumeDownloaded } from "@/lib/data/resumes";

export const runtime = "nodejs";

const demoResume: ResumePdfData = {
  name: "Aarav Mehta",
  role: "Frontend Engineer Intern",
  email: "aarav@example.com",
  location: "Bengaluru, India",
  summary:
    "Frontend engineer focused on accessible React interfaces, product polish, and measurable user experience improvements.",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
  bullets: [
    "Built a campus hiring dashboard used by 700+ students with React and TypeScript.",
    "Improved page load speed by 34% through route splitting and image optimization.",
    "Collaborated with backend team to ship resilient REST integrations."
  ]
};

async function renderResumePdf(data: ResumePdfData) {
  const instance = pdf(<ResumeDocument data={{ ...demoResume, ...data }} />);
  const stream = await instance.toBuffer();
  const chunks: Uint8Array[] = [];

  for await (const chunk of stream as unknown as AsyncIterable<Buffer | Uint8Array>) {
    chunks.push(chunk instanceof Buffer ? new Uint8Array(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

function pdfResponse(buffer: Buffer, fileName = "apply-resume.pdf") {
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${fileName}`
    }
  });
}

export async function POST(request: Request) {
  await getCurrentUserId();

  const data = (await request.json().catch(() => demoResume)) as ResumePdfData;
  const buffer = await renderResumePdf(data);

  return pdfResponse(buffer);
}

export async function GET(request: Request) {
  const resumeId = new URL(request.url).searchParams.get("resumeId");

  if (resumeId) {
    const userId = await getCurrentUserId();
    const resume = await getGeneratedResume(userId, resumeId);

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const buffer = await renderResumePdf({
      name: "Apply Candidate",
      role: resume.role,
      summary: resume.generatedContent.summary,
      skills: resume.generatedContent.skills,
      bullets: resume.generatedContent.bullets
    });

    await markResumeDownloaded(userId, resumeId);

    const safeCompany = resume.company.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return pdfResponse(buffer, `apply-${safeCompany || "resume"}.pdf`);
  }

  return NextResponse.json({
    status: "ready",
    message: "POST resume content to this route to generate an ATS-friendly PDF."
  });
}
