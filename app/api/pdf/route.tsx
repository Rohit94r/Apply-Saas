import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import { ResumeDocument, type ResumePdfData } from "@/lib/pdf/resume-document";

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

export async function POST(request: Request) {
  const data = (await request.json().catch(() => demoResume)) as ResumePdfData;
  const instance = pdf(<ResumeDocument data={{ ...demoResume, ...data }} />);
  const stream = await instance.toBuffer();
  const chunks: Uint8Array[] = [];

  for await (const chunk of stream as unknown as AsyncIterable<Buffer | Uint8Array>) {
    chunks.push(chunk instanceof Buffer ? new Uint8Array(chunk) : chunk);
  }

  const buffer = Buffer.concat(chunks);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=apply-resume.pdf"
    }
  });
}

export async function GET() {
  return NextResponse.json({
    status: "ready",
    message: "POST resume content to this route to generate an ATS-friendly PDF."
  });
}
