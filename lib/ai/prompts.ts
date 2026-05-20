import type {
  CoverLetterInput,
  GenerateResumeInput,
  InterviewGuideInput,
  ProfessionalPhotoInput,
  ResumeCritiqueInput
} from "@/lib/validations";

export function resumeTailoringPrompt(input: GenerateResumeInput) {
  return `
You are Apply, an AI resume tailoring system for students and early-career professionals.

Return strict JSON with this shape:
{
  "summary": "two sentence resume summary",
  "skills": ["skill"],
  "bullets": ["impact bullet"],
  "afterText": "complete resume text after strong truthful ATS edits",
  "changeSummary": ["specific change made"],
  "beforeAtsScore": 0,
  "keywords": ["keyword"],
  "atsScore": 0
}

Rules:
- Treat the master resume as an already-created uploaded resume, not a blank input.
- Return a complete afterText resume that keeps the original contact details, headings, section order, employers, project names, dates, education, certificates, and line-break style as much as possible.
- Use maximum truthful ATS improvement: rewrite the summary, skills, existing experience descriptions, and existing project descriptions wherever the job description gives a stronger supported angle.
- Keep the original resume format and identity, but do not be too timid. The goal is a high-selection, ATS-ready version of the same resume, not a tiny wording change.
- Use only evidence from the master resume.
- Tailor language to the target role and company.
- Prefer keyword-rich, measurable, ATS-friendly, concise lines when the original evidence supports them.
- Do not invent employers, dates, degrees, projects, technologies, certifications, links, awards, employment history, or fake metrics.
- If a job keyword is not directly proven by the resume, use it only in a target-role context, not as a claimed skill or achievement.
- changeSummary must explain only the actual edits you made.
- beforeAtsScore is the score for the original master resume against this job. atsScore is the score after your edits.

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
  "technicalTopics": ["topic"],
  "roadmap": [{"week":"Week 1","goal":"goal","tasks":["task"],"output":"deliverable"}],
  "codingQuestions": [{"title":"question title","pattern":"pattern","difficulty":"Easy|Medium|Hard","why":"why this matters","link":"https://leetcode.com/problems/.../"}],
  "companyQuestions": ["company-style technical or project question"],
  "behavioralQuestions": ["behavioral question"],
  "mockPlan": ["mock interview drill"],
  "freeResources": [{"title":"resource title","provider":"provider","type":"video/course/practice/mock","url":"https://...","focus":"what to use it for"}]
}

Company: ${input.company}
Role: ${input.role}
Experience level: ${input.experienceLevel}
Preparation time: ${input.timeline}
Preferred language: ${input.preferredLanguage}
Focus areas: ${input.focusAreas.join(", ")}
Job description:
${input.jobDescription}

Resume used:
${input.resumeContent}

Rules:
- Make the plan practical for a student or early-career candidate.
- Include LeetCode-style questions by title and pattern, not copied solutions.
- Company questions should be realistic company-style practice questions, not claimed exact private questions.
- Prefer free resources and official/public links.
- Keep every list concise and high-signal.
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

export function resumeCritiquePrompt(input: ResumeCritiqueInput) {
  return `
Critique this resume against the job description as strict JSON:
{
  "atsScore": 0,
  "strengths": ["specific strength"],
  "risks": ["specific risk"],
  "fixes": ["actionable rewrite or edit"],
  "missingKeywords": ["keyword"]
}

Rules:
- Do not invent experience.
- Make every fix actionable.
- Prioritize ATS clarity, truthful impact, metrics, and role match.

Job description:
${input.jobDescription}

Resume:
${input.resumeContent}
`;
}

export function professionalPhotoPrompt(input: ProfessionalPhotoInput) {
  return `
Create a concise professional profile photo improvement plan as strict JSON:
{
  "headline": "short status",
  "recommendations": ["recommendation"],
  "background": "background guidance",
  "crop": "crop guidance",
  "wardrobe": "wardrobe guidance"
}

The user uploaded this image URL, if present: ${input.imageUrl ?? "none"}.
Additional request: ${input.prompt ?? "Create a polished LinkedIn-style profile photo direction."}
`;
}
