import type {
  CoverLetterInput,
  GenerateResumeInput,
  InterviewGuideInput,
  ProfessionalPhotoInput,
  ResumeCritiqueInput
} from "@/lib/validations";
import { getTextAIClient } from "@/lib/ai/openai";
import {
  coverLetterPrompt,
  interviewGuidePrompt,
  professionalPhotoPrompt,
  resumeCritiquePrompt,
  resumeTailoringPrompt
} from "@/lib/ai/prompts";
import { clampScore } from "@/lib/utils";

type TailoredResumeOutput = {
  summary: string;
  skills: string[];
  bullets: string[];
  keywords: string[];
  atsScore: number;
};

type ResumeCritiqueOutput = {
  atsScore: number;
  strengths: string[];
  risks: string[];
  fixes: string[];
  missingKeywords: string[];
};

type ProfessionalPhotoOutput = {
  headline: string;
  recommendations: string[];
  background: string;
  crop: string;
  wardrobe: string;
};

function extractKeywords(text: string) {
  const dictionary = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "REST APIs",
    "GraphQL",
    "Tailwind",
    "Accessibility",
    "Testing",
    "Performance",
    "Dashboard",
    "Python",
    "SQL",
    "Git",
    "AWS",
    "Vercel"
  ];

  const lower = text.toLowerCase();
  return dictionary.filter((keyword) => lower.includes(keyword.toLowerCase()));
}

function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function fallbackResume(input: GenerateResumeInput): TailoredResumeOutput {
  const keywords = extractKeywords(`${input.jobDescription} ${input.masterResume}`).slice(0, 8);
  const role = input.role || "target role";
  const company = input.company || "the company";

  return {
    summary: `Early-career software candidate with hands-on project experience aligned to ${role} at ${company}. Strong focus on clean implementation, collaboration, and role-specific problem solving.`,
    skills: keywords.length
      ? keywords
      : ["React", "TypeScript", "API Integration", "Problem Solving"],
    bullets: [
      `Tailored project and technical experience to the ${role} requirements with emphasis on practical execution.`,
      "Highlighted reusable components, API work, and measurable product improvements from the master resume.",
      "Optimized wording for ATS readability while keeping claims grounded in existing experience."
    ],
    keywords: keywords.length ? keywords : ["React", "TypeScript", "ATS", "Projects"],
    atsScore: clampScore(86 + Math.min(keywords.length, 8))
  };
}

export async function generateTailoredResume(
  input: GenerateResumeInput
): Promise<TailoredResumeOutput> {
  const textAI = getTextAIClient();
  const fallback = fallbackResume(input);

  if (!textAI) {
    return fallback;
  }

  const completion = await textAI.client.chat.completions.create({
    model: textAI.model,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You generate truthful, ATS-friendly resumes for students and job seekers."
      },
      {
        role: "user",
        content: resumeTailoringPrompt(input)
      }
    ]
  });

  const parsed = safeJsonParse<TailoredResumeOutput>(
    completion.choices[0]?.message.content,
    fallback
  );

  return {
    ...fallback,
    ...parsed,
    atsScore: clampScore(parsed.atsScore ?? fallback.atsScore),
    keywords: parsed.keywords?.length ? parsed.keywords : fallback.keywords,
    skills: parsed.skills?.length ? parsed.skills : fallback.skills,
    bullets: parsed.bullets?.length ? parsed.bullets : fallback.bullets
  };
}

export async function generateInterviewGuide(input: InterviewGuideInput) {
  const textAI = getTextAIClient();
  const fallback = {
    companyAnalysis: `${input.company} is hiring for ${input.role}; prepare examples that connect your resume projects to the role requirements.`,
    generatedQuestions: [
      "Tell me about a project that best matches this role.",
      "How do you handle unclear requirements while building software?",
      "What would you improve in your strongest project if you had another week?"
    ],
    prepNotes: [
      "Prepare one project story with problem, action, result, and metric.",
      "Review the technical keywords from the job description.",
      "Write down two thoughtful questions for the interviewer."
    ],
    technicalTopics: extractKeywords(input.jobDescription).slice(0, 6)
  };

  if (!textAI) {
    return fallback;
  }

  const completion = await textAI.client.chat.completions.create({
    model: textAI.model,
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: interviewGuidePrompt(input) }]
  });

  return safeJsonParse(completion.choices[0]?.message.content, fallback);
}

export async function generateCoverLetter(input: CoverLetterInput) {
  const textAI = getTextAIClient();
  const fallback = {
    coverLetter: `Dear ${input.company} team,\n\nI am excited to apply for the ${input.role} role. My resume reflects hands-on experience that aligns with your job description, including practical project work, collaboration, and a strong willingness to learn quickly.\n\nI would be grateful for the opportunity to contribute to your team and discuss how my background fits this role.\n\nSincerely,\nApply Candidate`
  };

  if (!textAI) {
    return fallback;
  }

  const completion = await textAI.client.chat.completions.create({
    model: textAI.model,
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: coverLetterPrompt(input) }]
  });

  return safeJsonParse(completion.choices[0]?.message.content, fallback);
}

export async function generateResumeCritique(
  input: ResumeCritiqueInput
): Promise<ResumeCritiqueOutput> {
  const textAI = getTextAIClient();
  const keywords = extractKeywords(input.jobDescription);
  const resumeKeywords = extractKeywords(input.resumeContent);
  const missingKeywords = keywords.filter((keyword) => !resumeKeywords.includes(keyword));
  const fallback: ResumeCritiqueOutput = {
    atsScore: clampScore(82 - Math.min(missingKeywords.length * 3, 18)),
    strengths: [
      "The resume includes concrete technical experience that can be mapped to the role.",
      "The content has enough project context to support role-specific tailoring."
    ],
    risks: [
      "Some bullets may need clearer metrics, scope, or direct job-description keywords.",
      "The strongest role-matching skills should be easier to scan in the top third."
    ],
    fixes: [
      "Move the most relevant technical skills into a concise skills section near the top.",
      "Rewrite project bullets with action, technical method, and measurable outcome.",
      "Mirror important job-description keywords only when they are supported by real experience."
    ],
    missingKeywords: missingKeywords.length ? missingKeywords : keywords.slice(0, 4)
  };

  if (!textAI) {
    return fallback;
  }

  const completion = await textAI.client.chat.completions.create({
    model: textAI.model,
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: resumeCritiquePrompt(input) }]
  });

  const parsed = safeJsonParse<ResumeCritiqueOutput>(
    completion.choices[0]?.message.content,
    fallback
  );

  return {
    ...fallback,
    ...parsed,
    atsScore: clampScore(parsed.atsScore ?? fallback.atsScore),
    strengths: parsed.strengths?.length ? parsed.strengths : fallback.strengths,
    risks: parsed.risks?.length ? parsed.risks : fallback.risks,
    fixes: parsed.fixes?.length ? parsed.fixes : fallback.fixes,
    missingKeywords: parsed.missingKeywords?.length
      ? parsed.missingKeywords
      : fallback.missingKeywords
  };
}

export async function generateProfessionalPhotoPlan(
  input: ProfessionalPhotoInput
): Promise<ProfessionalPhotoOutput> {
  const textAI = getTextAIClient();
  const fallback: ProfessionalPhotoOutput = {
    headline: input.imageUrl ? "Photo uploaded and ready" : "Profile photo plan ready",
    recommendations: [
      "Use soft front-facing light and keep the face clearly visible.",
      "Choose a neutral, uncluttered background with enough contrast.",
      "Crop from the upper chest with eyes near the upper third of the frame."
    ],
    background: "Use a clean light gray, off-white, or simple office background.",
    crop: "Square crop, centered face, shoulders visible, no heavy tilt.",
    wardrobe: "Solid shirt or blazer, medium contrast, no busy patterns."
  };

  if (!textAI) {
    return fallback;
  }

  const completion = await textAI.client.chat.completions.create({
    model: textAI.model,
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: professionalPhotoPrompt(input) }]
  });

  const parsed = safeJsonParse<ProfessionalPhotoOutput>(
    completion.choices[0]?.message.content,
    fallback
  );

  return {
    ...fallback,
    ...parsed,
    recommendations: parsed.recommendations?.length
      ? parsed.recommendations
      : fallback.recommendations
  };
}
