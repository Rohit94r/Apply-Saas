import { NextResponse } from "next/server";
import { analyzeResumeAts, refineGeneratedResume, refineResumeSection } from "@/lib/ai/resume-engine";
import { logFeatureUse } from "@/lib/admin/session";
import { getCurrentUserId } from "@/lib/auth";
import {
  getGeneratedResume,
  updateGeneratedResume
} from "@/lib/data/resumes";
import { refineResumeSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = refineResumeSchema.parse(body);
    const userId = await getCurrentUserId();
    const existing = await getGeneratedResume(userId, input.resumeId);

    if (!existing) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const currentText =
      existing.generatedContent.afterText?.trim() ||
      existing.generatedContent.beforeText?.trim() ||
      "";

    if (currentText.length < 80) {
      throw new Error("This resume does not have enough text to refine");
    }

    const jobDescription =
      input.jobDescription?.trim() ||
      `${existing.role} role at ${existing.company}. Match keywords and responsibilities for this target application.`;

    if (input.section) {
      const sectionResult = await refineResumeSection({
        resumeId: input.resumeId,
        prompt: input.prompt,
        section: input.section,
        jobDescription,
        company: existing.company,
        role: existing.role,
        currentResume: currentText
      });

      const afterAnalysis = analyzeResumeAts({
        resumeText: sectionResult.afterText,
        jobDescription,
        role: existing.role
      });

      const resume = await updateGeneratedResume(userId, input.resumeId, {
        summary: sectionResult.summary,
        skills: sectionResult.skills,
        bullets: sectionResult.bullets,
        beforeText: existing.generatedContent.beforeText ?? currentText,
        afterText: sectionResult.afterText,
        changeSummary: [
          `Refined ${input.section}: ${input.prompt.slice(0, 120)}`,
          ...(sectionResult.changeSummary ?? []).slice(0, 3)
        ],
        beforeAtsScore: existing.generatedContent.beforeAtsScore ?? existing.atsScore,
        keywords: afterAnalysis.matchedKeywords.length
          ? afterAnalysis.matchedKeywords.slice(0, 12)
          : sectionResult.keywords,
        atsScore: afterAnalysis.score,
        template: existing.generatedContent.template
      });

      if (!resume) {
        return NextResponse.json({ error: "Resume not found" }, { status: 404 });
      }

      void logFeatureUse("tools", `refine · ${existing.company} · ${existing.role} · ${input.section}`);

      return NextResponse.json({ resume });
    }

    const refined = await refineGeneratedResume({
      resumeId: input.resumeId,
      prompt: input.prompt,
      jobDescription,
      company: existing.company,
      role: existing.role,
      currentResume: currentText
    });
    const afterAnalysis = analyzeResumeAts({
      resumeText: refined.afterText,
      jobDescription,
      role: existing.role
    });
    const resume = await updateGeneratedResume(userId, input.resumeId, {
      summary: refined.summary,
      skills: refined.skills,
      bullets: refined.bullets,
      beforeText: existing.generatedContent.beforeText ?? currentText,
      afterText: refined.afterText,
      changeSummary: [
        `Refined: ${input.prompt.slice(0, 120)}`,
        ...(refined.changeSummary ?? []).slice(0, 3)
      ],
      beforeAtsScore: existing.generatedContent.beforeAtsScore ?? existing.atsScore,
      keywords: afterAnalysis.matchedKeywords.length
        ? afterAnalysis.matchedKeywords.slice(0, 12)
        : refined.keywords,
      atsScore: afterAnalysis.score,
      template: existing.generatedContent.template
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    void logFeatureUse("tools", `refine · ${existing.company} · ${existing.role}`);

    return NextResponse.json({ resume });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to refine resume";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
