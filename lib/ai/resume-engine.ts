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
  afterText: string;
  changeSummary: string[];
  beforeAtsScore: number;
  keywords: string[];
  atsScore: number;
};

type AtsAnalysis = {
  score: number;
  jobKeywords: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
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

const STOP_WORDS = new Set([
  "about",
  "across",
  "and",
  "are",
  "with",
  "from",
  "that",
  "this",
  "the",
  "for",
  "you",
  "your",
  "our",
  "will",
  "have",
  "has",
  "into",
  "using",
  "work",
  "team",
  "teams",
  "role",
  "candidate",
  "experience",
  "responsibilities",
  "requirements",
  "preferred",
  "required",
  "strong",
  "ability",
  "skills",
  "build",
  "building"
]);

const ACTION_VERBS = [
  "built",
  "developed",
  "designed",
  "implemented",
  "improved",
  "optimized",
  "created",
  "launched",
  "deployed",
  "integrated",
  "automated",
  "managed",
  "led",
  "delivered",
  "reduced",
  "increased"
];

function unique(values: string[]) {
  const seen = new Set<string>();

  return values.filter((value) => {
    const key = value.toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function extractKeywords(text: string) {
  const dictionary = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST APIs",
    "API Integration",
    "Authentication",
    "Responsive Design",
    "Data Structures",
    "Algorithms",
    "GraphQL",
    "Tailwind",
    "Accessibility",
    "Testing",
    "Performance",
    "Dashboard",
    "Redux",
    "Docker",
    "CI/CD",
    "PostgreSQL",
    "MySQL",
    "Python",
    "SQL",
    "Git",
    "GitHub",
    "AWS",
    "Vercel",
    "Netlify",
    "DSA",
    "Java",
    "MERN",
    "Agile",
    "Scrum",
    "Collaboration",
    "Problem Solving",
    "Communication"
  ];

  const lower = text.toLowerCase();
  const dictionaryMatches = dictionary.filter((keyword) =>
    lower.includes(keyword.toLowerCase())
  );
  const termCounts = new Map<string, { label: string; count: number }>();
  const words = text.match(/[A-Za-z][A-Za-z.+#-]{2,}/g) ?? [];

  for (const word of words) {
    const key = word.toLowerCase();

    if (STOP_WORDS.has(key) || key.length < 3) {
      continue;
    }

    const existing = termCounts.get(key);
    termCounts.set(key, {
      label: existing?.label ?? word.replace(/[.,;:()[\]{}]/g, ""),
      count: (existing?.count ?? 0) + 1
    });
  }

  const frequentTerms = [...termCounts.values()]
    .sort((a, b) => b.count - a.count)
    .map((item) => item.label)
    .slice(0, 12);

  return unique([...dictionaryMatches, ...frequentTerms]).slice(0, 18);
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

function keywordExists(text: string, keyword: string) {
  const lowerText = text.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();

  if (lowerKeyword.includes(" ") || lowerKeyword.includes(".")) {
    return lowerText.includes(lowerKeyword);
  }

  return new RegExp(`\\b${lowerKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text);
}

function extractRequiredKeywords(jobDescription: string, fallbackKeywords: string[]) {
  const lines = jobDescription
    .split(/\r?\n|[.;]/)
    .map((line) => line.trim())
    .filter(Boolean);
  const requiredLines = lines.filter((line) =>
    /(required|requirements|must|should have|experience with|proficient|skills|qualification|responsibilities)/i.test(line)
  );
  const requiredKeywords = extractKeywords(requiredLines.join("\n"));

  return unique([...requiredKeywords, ...fallbackKeywords]).slice(0, 12);
}

function sectionCoverageScore(resumeText: string) {
  const lowerResume = resumeText.toLowerCase();
  const checks = [
    /summary|profile/.test(lowerResume),
    /skills|technical skills/.test(lowerResume),
    /experience|work experience|employment|projects/.test(lowerResume),
    /education|degree|college|university/.test(lowerResume),
    /certificate|certification|achievements|awards/.test(lowerResume)
  ];

  return checks.filter(Boolean).length / checks.length;
}

function bulletQualityScore(resumeText: string) {
  const lines = resumeText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 28);
  const bulletLike = lines.filter(
    (line) =>
      /^[-*•]/.test(line) ||
      ACTION_VERBS.some((verb) => line.toLowerCase().startsWith(verb))
  );
  const usable = bulletLike.length ? bulletLike : lines.slice(0, 8);

  if (!usable.length) {
    return 0;
  }

  const actionCount = usable.filter((line) =>
    ACTION_VERBS.some((verb) => line.toLowerCase().includes(verb))
  ).length;
  const metricCount = usable.filter((line) => /\d|%|\+|users?|clients?|projects?/i.test(line)).length;
  const conciseCount = usable.filter((line) => line.length >= 45 && line.length <= 220).length;

  return Math.min(
    1,
    actionCount / usable.length * 0.45 +
      metricCount / usable.length * 0.25 +
      conciseCount / usable.length * 0.3
  );
}

function contactScore(resumeText: string) {
  const checks = [
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(resumeText),
    /\b(?:\+?\d[\d\s-]{7,}\d)\b/.test(resumeText),
    /linkedin|github|portfolio|vercel|netlify/i.test(resumeText)
  ];

  return checks.filter(Boolean).length / checks.length;
}

function readabilityScore(resumeText: string) {
  const lines = resumeText.split(/\r?\n/).filter((line) => line.trim());
  const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
  const length = resumeText.length;
  const lengthOk = length >= 900 && length <= 5200 ? 1 : length >= 650 ? 0.7 : 0.45;
  const lineOk = longestLine <= 260 ? 1 : longestLine <= 420 ? 0.65 : 0.35;
  const structureOk = lines.length >= 18 ? 1 : lines.length >= 10 ? 0.7 : 0.45;

  return lengthOk * 0.35 + lineOk * 0.35 + structureOk * 0.3;
}

export function analyzeResumeAts({
  resumeText,
  jobDescription,
  role
}: {
  resumeText: string;
  jobDescription: string;
  role: string;
}): AtsAnalysis {
  const jobKeywords = extractKeywords(jobDescription).slice(0, 18);
  const requiredKeywords = extractRequiredKeywords(jobDescription, jobKeywords);
  const roleKeywords = unique([
    role.replace(/\s+/g, " ").trim(),
    ...extractKeywords(role)
  ])
    .filter(Boolean)
    .slice(0, 6);
  const weightedKeywords = unique([
    ...requiredKeywords,
    ...roleKeywords,
    ...jobKeywords
  ]).slice(0, 24);
  const matchedKeywords = weightedKeywords.filter((keyword) =>
    keywordExists(resumeText, keyword)
  );
  const missingKeywords = weightedKeywords.filter(
    (keyword) => !matchedKeywords.includes(keyword)
  );
  const keywordCoverage = weightedKeywords.length
    ? matchedKeywords.length / weightedKeywords.length
    : 0.35;
  const requiredCoverage = requiredKeywords.length
    ? requiredKeywords.filter((keyword) => keywordExists(resumeText, keyword)).length /
      requiredKeywords.length
    : keywordCoverage;
  const roleCoverage = roleKeywords.length
    ? roleKeywords.filter((keyword) => keywordExists(resumeText, keyword)).length /
      roleKeywords.length
    : 0.5;
  const score = Math.round(
    24 +
      keywordCoverage * 32 +
      requiredCoverage * 19 +
      roleCoverage * 9 +
      sectionCoverageScore(resumeText) * 8 +
      bulletQualityScore(resumeText) * 4 +
      contactScore(resumeText) * 2 +
      readabilityScore(resumeText) * 2
  );

  return {
    score: clampScore(score),
    jobKeywords: weightedKeywords,
    matchedKeywords,
    missingKeywords
  };
}

function firstUsefulParagraph(text: string) {
  return (
    text
      .split(/\n{2,}/)
      .map((section) => section.replace(/\s+/g, " ").trim())
      .find((section) => section.length > 60) ?? text.replace(/\s+/g, " ").trim()
  ).slice(0, 420);
}

function extractResumeBullets(text: string) {
  const bullets = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^[-*•]/.test(line))
    .map((line) => line.replace(/^[-*•]\s*/, ""))
    .filter((line) => line.length > 20)
    .slice(0, 6);

  if (bullets.length) {
    return bullets;
  }

  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 45)
    .slice(0, 4);
}

function insertOrReplaceSummary(text: string, summary: string) {
  const lines = text.split(/\r?\n/);
  const summaryIndex = lines.findIndex((line) =>
    /^((professional\s+)?summary|profile)$/i.test(line.trim())
  );

  if (summaryIndex >= 0) {
    const nextContentIndex = lines.findIndex(
      (line, index) => index > summaryIndex && line.trim().length > 0
    );

    if (nextContentIndex >= 0) {
      lines[nextContentIndex] = summary;
      return lines.join("\n");
    }
  }

  return text;
}

function addMissingSkills(text: string, keywords: string[]) {
  const lines = text.split(/\r?\n/);
  const lowerText = text.toLowerCase();
  const missing = keywords
    .filter((keyword) => !lowerText.includes(keyword.toLowerCase()))
    .slice(0, 5);

  if (!missing.length) {
    return text;
  }

  const skillsIndex = lines.findIndex((line) =>
    /^(technical\s+)?skills$/i.test(line.trim())
  );

  if (skillsIndex >= 0) {
    const targetIndex = lines.findIndex(
      (line, index) => index > skillsIndex && line.trim().length > 0
    );

    if (targetIndex >= 0) {
      lines[targetIndex] = `${lines[targetIndex].trim()}, ${missing.join(", ")}`;
      return lines.join("\n");
    }
  }

  return `${text.trim()}\n\nSKILLS\n${missing.join(", ")}`;
}

function fallbackResume(input: GenerateResumeInput): TailoredResumeOutput {
  const beforeAnalysis = analyzeResumeAts({
    resumeText: input.masterResume,
    jobDescription: input.jobDescription,
    role: input.role
  });
  const supportedKeywords = beforeAnalysis.jobKeywords.filter((keyword) =>
    keywordExists(input.masterResume, keyword)
  );
  const keywords = (supportedKeywords.length
    ? supportedKeywords
    : beforeAnalysis.jobKeywords).slice(0, 12);
  const role = input.role || "target role";
  const company = input.company || "the company";
  const beforeAtsScore = beforeAnalysis.score;
  const summary = `Software candidate with resume-backed experience aligned to ${role} at ${company}. Brings relevant ${keywords
    .slice(0, 3)
    .join(", ")} exposure while keeping the application focused on the job description.`;
  const afterText = addMissingSkills(
    insertOrReplaceSummary(input.masterResume, summary),
    supportedKeywords.slice(0, 8)
  );
  const afterAnalysis = analyzeResumeAts({
    resumeText: afterText,
    jobDescription: input.jobDescription,
    role: input.role
  });
  const atsScore = afterAnalysis.score;

  return {
    summary,
    skills: keywords.length
      ? keywords
      : ["React", "TypeScript", "API Integration", "Problem Solving"],
    bullets: extractResumeBullets(afterText),
    afterText,
    changeSummary: [
      `Improved keyword match from ${beforeAnalysis.matchedKeywords.length}/${beforeAnalysis.jobKeywords.length} to ${afterAnalysis.matchedKeywords.length}/${afterAnalysis.jobKeywords.length}`,
      "Updated the summary language to match the company and role",
      beforeAnalysis.missingKeywords.length
        ? `Checked missing ATS terms without adding unsupported claims: ${beforeAnalysis.missingKeywords
            .slice(0, 5)
            .join(", ")}`
        : "Kept existing keywords because the resume already matched the job details",
      "Kept the original resume order, employers, education, dates, and project structure"
    ],
    beforeAtsScore,
    keywords: afterAnalysis.matchedKeywords.length
      ? afterAnalysis.matchedKeywords.slice(0, 12)
      : keywords,
    atsScore
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
  const parsedAfterText =
    parsed.afterText?.trim().length >= 80
      ? parsed.afterText.trim()
      : fallback.afterText;
  const parsedAnalysis = analyzeResumeAts({
    resumeText: parsedAfterText,
    jobDescription: input.jobDescription,
    role: input.role
  });
  const fallbackAnalysis = analyzeResumeAts({
    resumeText: fallback.afterText,
    jobDescription: input.jobDescription,
    role: input.role
  });
  const selectedAfterText =
    parsedAnalysis.score >= fallbackAnalysis.score ? parsedAfterText : fallback.afterText;
  const selectedAnalysis =
    parsedAnalysis.score >= fallbackAnalysis.score ? parsedAnalysis : fallbackAnalysis;
  const beforeAnalysis = analyzeResumeAts({
    resumeText: input.masterResume,
    jobDescription: input.jobDescription,
    role: input.role
  });

  return {
    ...fallback,
    ...parsed,
    atsScore: selectedAnalysis.score,
    beforeAtsScore: beforeAnalysis.score,
    afterText: selectedAfterText,
    changeSummary: parsed.changeSummary?.length
      ? parsed.changeSummary
      : fallback.changeSummary,
    summary: parsed.summary?.trim()
      ? parsed.summary
      : firstUsefulParagraph(selectedAfterText),
    keywords: selectedAnalysis.matchedKeywords.length
      ? selectedAnalysis.matchedKeywords.slice(0, 12)
      : fallback.keywords,
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
    coverLetter: `Dear ${input.company} team,\n\nI am excited to apply for the ${input.role} role. My resume reflects hands-on experience that aligns with your job description, including practical project work, collaboration, and a strong willingness to learn quickly.\n\nI would be grateful for the opportunity to contribute to your team and discuss how my background fits this role.\n\nSincerely,`
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
