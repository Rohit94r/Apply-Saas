import type {
  CoverLetterInput,
  GenerateResumeInput,
  InterviewGuideInput
} from "@/lib/validations";

export function resumeTailoringPrompt(input: GenerateResumeInput) {
  return `
You are Apply, an AI resume tailoring system for students and early-career professionals.

Return strict JSON with this shape:
{
  "summary": "two sentence resume summary",
  "skills": ["skill"],
  "bullets": ["impact bullet"],
  "keywords": ["keyword"],
  "atsScore": 0
}

Rules:
- Use only evidence from the master resume.
- Tailor language to the target role.
- Prefer measurable, ATS-friendly, concise bullets.
- Do not invent employers, dates, degrees, or metrics.

Company: ${input.company}
Role: ${input.role}
Job description:
${input.jobDescription}

Master resume:
${input.masterResume}
`;
}

export function interviewGuidePrompt(input: InterviewGuideInput) {
  return `
Create an interview preparation guide as strict JSON:
{
  "companyAnalysis": "short analysis",
  "generatedQuestions": ["question"],
  "prepNotes": ["note"],
  "technicalTopics": ["topic"]
}

Company: ${input.company}
Role: ${input.role}
Job description:
${input.jobDescription}

Resume used:
${input.resumeContent}
`;
}

export function coverLetterPrompt(input: CoverLetterInput) {
  return `
Write a concise ${input.tone} cover letter for a student or early-career applicant.
Return strict JSON: { "coverLetter": "letter text" }.

Company: ${input.company}
Role: ${input.role}
Job description:
${input.jobDescription}

Resume:
${input.resumeContent}
`;
}
