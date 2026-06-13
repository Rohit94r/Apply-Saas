import { NextResponse } from "next/server";
import { analyzeResumeAts } from "@/lib/ai/resume-engine";
import { getCurrentUserId } from "@/lib/auth";
import { z } from "zod";

const analyzeSchema = z.object({
  resumeText: z.string().min(10),
  jobDescription: z.string().min(10),
  role: z.string().trim().min(2).default("Target role")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = analyzeSchema.parse(body);
    await getCurrentUserId();

    const analysis = analyzeResumeAts({
      resumeText: input.resumeText,
      jobDescription: input.jobDescription,
      role: input.role
    });
    const keywordMatch = analysis.jobKeywords.length
      ? Math.round(
          (analysis.matchedKeywords.length / analysis.jobKeywords.length) * 100
        )
      : 0;

    return NextResponse.json({
      analysis: {
        atsScore: analysis.score,
        keywordMatch,
        jobKeywords: analysis.jobKeywords,
        matchedKeywords: analysis.matchedKeywords,
        missingKeywords: analysis.missingKeywords,
        requiredSkills: analysis.jobKeywords.slice(0, 8),
        recommendations: analysis.missingKeywords.length
          ? [
              `Add supported evidence for: ${analysis.missingKeywords.slice(0, 4).join(", ")}`,
              "Mirror high-priority job keywords in summary and project bullets.",
              "Keep the strongest role-matching skills visible near the top."
            ]
          : [
              "Strong keyword coverage. Tighten bullets with measurable outcomes.",
              "Ensure summary reflects the target company and role directly."
            ]
      }
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to analyze resume";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
