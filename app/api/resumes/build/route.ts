import { NextResponse } from "next/server";
import { buildStudentResume } from "@/lib/ai/resume-engine";
import { getCurrentUserId } from "@/lib/auth";
import { createGeneratedResume } from "@/lib/data/resumes";
import { buildResumeSchema, type GenerateResumeInput } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = buildResumeSchema.parse(body);
    const userId = await getCurrentUserId();
    const built = await buildStudentResume(input);
    const saveInput: GenerateResumeInput = {
      company: "Resume Builder",
      role: input.targetRole,
      jobDescription: `${input.jobType} ${input.targetRole} ${input.skills.join(" ")} ${input.customSections
        .map((section) => `${section.title} ${section.content}`)
        .join(" ")}`,
      masterResume: built.afterText
    };
    const resume = await createGeneratedResume(userId, saveInput, {
      summary: built.summary,
      skills: built.skills,
      bullets: built.bullets,
      beforeText: built.afterText,
      afterText: built.afterText,
      changeSummary: [
        "Built from guided student resume questions",
        `Applied the ${input.template} template`,
        input.prompt?.trim()
          ? "Used the direct prompt as additional resume direction"
          : "Used selected role, skills, education, projects, and optional experience"
      ],
      beforeAtsScore: built.atsScore,
      template: input.template,
      keywords: built.keywords,
      atsScore: built.atsScore
    });

    return NextResponse.json({ resume });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to build resume";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
