import type {
  CoverLetterInput,
  GenerateResumeInput,
  InterviewGuideInput,
  ProfessionalPhotoInput,
  RefineResumeInput,
  ResumeCritiqueInput
} from "@/lib/validations";
import type { InterviewGuide as InterviewGuideType } from "@/types";
import { getTextAIClient } from "@/lib/ai/openai";
import {
  coverLetterPrompt,
  interviewGuidePrompt,
  professionalPhotoPrompt,
  refineResumePrompt,
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

type InterviewGuideOutput = Omit<
  InterviewGuideType,
  | "id"
  | "userId"
  | "company"
  | "role"
  | "createdAt"
  | "focusAreas"
  | "timeline"
  | "experienceLevel"
  | "preferredLanguage"
>;

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

export async function refineGeneratedResume(
  input: RefineResumeInput & {
    company: string;
    role: string;
    jobDescription: string;
    currentResume: string;
  }
): Promise<Omit<TailoredResumeOutput, "beforeAtsScore">> {
  const textAI = getTextAIClient();
  const baseInput: GenerateResumeInput = {
    company: input.company,
    role: input.role,
    jobDescription: input.jobDescription,
    masterResume: input.currentResume,
    prompt: input.prompt
  };
  const fallback = fallbackResume(baseInput);

  if (!textAI) {
    return {
      summary: fallback.summary,
      skills: fallback.skills,
      bullets: fallback.bullets,
      afterText: fallback.afterText,
      changeSummary: [`Applied refinement: ${input.prompt.slice(0, 80)}`],
      keywords: fallback.keywords,
      atsScore: fallback.atsScore
    };
  }

  const completion = await textAI.client.chat.completions.create({
    model: textAI.model,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You refine truthful, ATS-friendly resumes without inventing experience."
      },
      {
        role: "user",
        content: refineResumePrompt(input)
      }
    ]
  });

  const parsed = safeJsonParse<Omit<TailoredResumeOutput, "beforeAtsScore">>(
    completion.choices[0]?.message.content,
    {
      summary: fallback.summary,
      skills: fallback.skills,
      bullets: fallback.bullets,
      afterText: fallback.afterText,
      changeSummary: [`Applied refinement: ${input.prompt.slice(0, 80)}`],
      keywords: fallback.keywords,
      atsScore: fallback.atsScore
    }
  );
  const parsedAfterText =
    parsed.afterText?.trim().length >= 80
      ? parsed.afterText.trim()
      : fallback.afterText;
  const analysis = analyzeResumeAts({
    resumeText: parsedAfterText,
    jobDescription: input.jobDescription,
    role: input.role
  });

  return {
    ...fallback,
    ...parsed,
    afterText: parsedAfterText,
    atsScore: analysis.score,
    summary: parsed.summary?.trim()
      ? parsed.summary
      : firstUsefulParagraph(parsedAfterText),
    keywords: analysis.matchedKeywords.length
      ? analysis.matchedKeywords.slice(0, 12)
      : fallback.keywords,
    skills: parsed.skills?.length ? parsed.skills : fallback.skills,
    bullets: parsed.bullets?.length ? parsed.bullets : fallback.bullets,
    changeSummary: parsed.changeSummary?.length
      ? parsed.changeSummary
      : [`Applied refinement: ${input.prompt.slice(0, 80)}`]
  };
}

const codingQuestionBank: NonNullable<InterviewGuideOutput["codingQuestions"]> = [
  {
    title: "Two Sum",
    pattern: "Hash map",
    difficulty: "Easy",
    why: "Tests whether you can trade space for faster lookup and explain complexity.",
    link: "https://leetcode.com/problems/two-sum/"
  },
  {
    title: "Valid Parentheses",
    pattern: "Stack",
    difficulty: "Easy",
    why: "Common screening question for stack usage and edge-case handling.",
    link: "https://leetcode.com/problems/valid-parentheses/"
  },
  {
    title: "Best Time to Buy and Sell Stock",
    pattern: "One-pass greedy",
    difficulty: "Easy",
    why: "Checks if you can convert brute force into a clean linear solution.",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  },
  {
    title: "Longest Substring Without Repeating Characters",
    pattern: "Sliding window",
    difficulty: "Medium",
    why: "Very useful for frontend/backend roles that involve string and state tracking.",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    title: "Product of Array Except Self",
    pattern: "Prefix and suffix",
    difficulty: "Medium",
    why: "Shows array reasoning without division and with O(1) extra space discussion.",
    link: "https://leetcode.com/problems/product-of-array-except-self/"
  },
  {
    title: "Merge Intervals",
    pattern: "Sorting intervals",
    difficulty: "Medium",
    why: "Appears often in scheduling, calendar, booking, and availability problems.",
    link: "https://leetcode.com/problems/merge-intervals/"
  },
  {
    title: "Top K Frequent Elements",
    pattern: "Hash map and heap/bucket",
    difficulty: "Medium",
    why: "Good for explaining frequency maps, heap tradeoffs, and large input handling.",
    link: "https://leetcode.com/problems/top-k-frequent-elements/"
  },
  {
    title: "Number of Islands",
    pattern: "DFS/BFS graph traversal",
    difficulty: "Medium",
    why: "Classic grid traversal problem that tests visited-state discipline.",
    link: "https://leetcode.com/problems/number-of-islands/"
  },
  {
    title: "Course Schedule",
    pattern: "Graph topological sort",
    difficulty: "Medium",
    why: "Strong signal for dependency reasoning and cycle detection.",
    link: "https://leetcode.com/problems/course-schedule/"
  },
  {
    title: "LRU Cache",
    pattern: "Hash map and linked list",
    difficulty: "Medium",
    why: "Good senior-style data structure design question even for strong interns.",
    link: "https://leetcode.com/problems/lru-cache/"
  },
  {
    title: "Coin Change",
    pattern: "Dynamic programming",
    difficulty: "Medium",
    why: "Tests if you can define state, transition, base case, and complexity clearly.",
    link: "https://leetcode.com/problems/coin-change/"
  },
  {
    title: "Kth Largest Element in an Array",
    pattern: "Heap or quickselect",
    difficulty: "Medium",
    why: "Useful for comparing heap, sorting, and selection algorithm tradeoffs.",
    link: "https://leetcode.com/problems/kth-largest-element-in-an-array/"
  }
];

const freeInterviewResources: NonNullable<InterviewGuideOutput["freeResources"]> = [
  {
    title: "Top Interview 150",
    provider: "LeetCode",
    type: "Practice set",
    url: "https://leetcode.com/studyplan/top-interview-150/",
    focus: "Original interview-style coding questions across core topics."
  },
  {
    title: "Striver A2Z DSA Sheet",
    provider: "takeUforward",
    type: "Roadmap + practice",
    url: "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
    focus: "Structured DSA from basics to advanced with topic order."
  },
  {
    title: "Interview Prep",
    provider: "Google Tech Dev Guide",
    type: "Practice + tips",
    url: "https://techdevguide.withgoogle.com/paths/interview/",
    focus: "Technical interview tips and former Google-style practice questions."
  },
  {
    title: "Interview Preparation Kit",
    provider: "HackerRank",
    type: "Practice kit",
    url: "https://www.hackerrank.com/interview/interview-preparation-kit",
    focus: "Arrays, hash maps, sorting, strings, greedy, graphs, trees, and more."
  },
  {
    title: "DSA courses",
    provider: "freeCodeCamp YouTube",
    type: "Free video",
    url: "https://www.youtube.com/@freecodecamp/search?query=data%20structures%20algorithms",
    focus: "Beginner-friendly long-form DSA and algorithm tutorials."
  },
  {
    title: "NeetCode Roadmap",
    provider: "NeetCode",
    type: "Roadmap",
    url: "https://neetcode.io/roadmap",
    focus: "Pattern-first route through common coding interview topics."
  },
  {
    title: "Mock interviews",
    provider: "Pramp",
    type: "Peer mock",
    url: "https://www.pramp.com/",
    focus: "Live peer practice for coding and communication."
  }
];

function asStringArray(value: unknown, fallback: string[], limit = 12) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const result = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .slice(0, limit);

  return result.length ? result : fallback;
}

function parseTimelineDays(timeline: string) {
  const match = timeline.match(/\d+/);

  return match ? Number(match[0]) : 14;
}

function hasFocus(input: InterviewGuideInput, pattern: RegExp) {
  return pattern.test(
    `${input.role} ${input.jobDescription} ${input.resumeContent} ${input.focusAreas.join(" ")}`
  );
}

function selectCodingQuestions(input: InterviewGuideInput) {
  const selected = [...codingQuestionBank];

  if (hasFocus(input, /frontend|react|javascript|typescript|ui|web/i)) {
    selected.unshift(
      codingQuestionBank.find((question) =>
        question.title.includes("Longest Substring")
      ) ?? codingQuestionBank[3]
    );
  }

  if (hasFocus(input, /backend|api|database|system|node|server/i)) {
    selected.unshift(
      codingQuestionBank.find((question) => question.title === "LRU Cache") ??
        codingQuestionBank[9]
    );
  }

  if (hasFocus(input, /data|machine|analytics|sql|python/i)) {
    selected.unshift(
      codingQuestionBank.find((question) =>
        question.title.includes("Top K")
      ) ?? codingQuestionBank[6]
    );
  }

  const seen = new Set<string>();
  const limit = parseTimelineDays(input.timeline) <= 7 ? 6 : 10;

  return selected
    .filter((question) => {
      if (seen.has(question.title)) {
        return false;
      }

      seen.add(question.title);
      return true;
    })
    .slice(0, limit);
}

function buildRoadmap(input: InterviewGuideInput) {
  const days = parseTimelineDays(input.timeline);
  const questions = selectCodingQuestions(input).slice(0, 6);
  const keywords = extractKeywords(input.jobDescription).slice(0, 6);

  if (days <= 7) {
    return [
      {
        week: "Days 1-2",
        goal: "Role and resume alignment",
        tasks: [
          `Prepare one strong ${input.role} project story from your resume.`,
          `Review job keywords: ${keywords.join(", ") || "role fundamentals"}.`,
          "Write a 60-second introduction and a 2-minute project explanation."
        ],
        output: "One polished intro, one project story, and one weakness fix."
      },
      {
        week: "Days 3-5",
        goal: "Coding pattern sprint",
        tasks: questions.slice(0, 4).map(
          (question) => `${question.pattern}: solve ${question.title}`
        ),
        output: "Four solved problems with complexity notes."
      },
      {
        week: "Days 6-7",
        goal: "Mock interview and revision",
        tasks: [
          "Run one 45-minute coding mock.",
          "Practice company-style questions out loud.",
          "Revise mistakes and prepare interviewer questions."
        ],
        output: "Final revision sheet and mock feedback list."
      }
    ];
  }

  return [
    {
      week: "Week 1",
      goal: "Build fundamentals and role story",
      tasks: [
        "Prepare introduction, resume walkthrough, and top project story.",
        "Revise arrays, strings, hash maps, stacks, queues, and complexity.",
        `Solve ${questions
          .slice(0, 3)
          .map((question) => question.title)
          .join(", ")}.`
      ],
      output: "Core notes plus 3 solved problems."
    },
    {
      week: "Week 2",
      goal: "Interview patterns",
      tasks: [
        "Practice sliding window, two pointers, intervals, binary search, and trees.",
        `Solve ${questions
          .slice(3, 7)
          .map((question) => question.title)
          .join(", ")}.`,
        "Record one solution explanation and check clarity."
      ],
      output: "Pattern notebook with mistakes and complexity notes."
    },
    {
      week: days >= 30 ? "Week 3" : "Final 3 days",
      goal: "Company and project rounds",
      tasks: [
        `Prepare ${input.company} product/company research.`,
        "Practice project deep-dive, tradeoffs, debugging, and teamwork stories.",
        "Revise role-specific technical topics from the job description."
      ],
      output: "Company question answers and project architecture notes."
    },
    {
      week: days >= 30 ? "Week 4" : "Final day",
      goal: "Mock and final polish",
      tasks: [
        "Run one coding mock and one HR/project mock.",
        "Review only missed patterns and common mistakes.",
        "Prepare questions to ask the interviewer."
      ],
      output: "Final interview sheet ready for the interview day."
    }
  ];
}

function buildCompanyQuestions(input: InterviewGuideInput) {
  const keywords = extractKeywords(input.jobDescription).slice(0, 5);
  const strongestKeyword = keywords[0] ?? "the core role requirement";

  return [
    `[${input.company} style] Walk through the resume project most relevant to ${input.role}. Why did you choose that architecture?`,
    `[${input.company} style] Solve a ${strongestKeyword} related problem and explain time and space complexity.`,
    `[${input.company} style] How would you debug a production issue where users report slow response times?`,
    `[${input.company} style] If your project had 10x more users, what would break first and how would you improve it?`,
    `[${input.company} style] Explain one technical decision from your resume and one tradeoff you considered.`,
    `[${input.company} style] What would you learn in the first 30 days to become productive in this team?`
  ];
}

function buildBehavioralQuestions(input: InterviewGuideInput) {
  return [
    `Why do you want the ${input.role} role at ${input.company}?`,
    "Tell me about a time you got stuck and how you solved it.",
    "Describe a project decision you changed after feedback.",
    "Tell me about a time you had to learn a new tool quickly.",
    "What is one weakness in your resume, and what are you doing to improve it?"
  ];
}

function buildMockPlan(input: InterviewGuideInput) {
  return [
    `10 min: ${input.company} and job description research recap.`,
    `35 min: ${input.preferredLanguage} coding question with verbal explanation.`,
    "20 min: resume project deep-dive with architecture and tradeoffs.",
    "15 min: HR questions using situation, action, result.",
    "10 min: feedback, missed patterns, and next revision target."
  ];
}

function buildFallbackInterviewGuide(
  input: InterviewGuideInput
): InterviewGuideOutput {
  const keywords = extractKeywords(input.jobDescription).slice(0, 8);
  const codingQuestions = selectCodingQuestions(input);

  return {
    companyAnalysis: `${input.company} interview prep should connect your resume projects to the ${input.role} requirements, especially ${keywords
      .slice(0, 4)
      .join(", ") || "core technical fundamentals"}. Treat this as company-style practice based on the public role details and your resume, not private exact PYQs.`,
    generatedQuestions: [
      "Tell me about the project on your resume that best matches this job.",
      "Explain one technical challenge you faced and how you debugged it.",
      "What would you improve in your strongest project if you had one more week?",
      "How do you make sure your code is readable, tested, and maintainable?",
      "Explain the time and space complexity of your coding solution."
    ],
    prepNotes: [
      "Prepare one project story using problem, action, result, and learning.",
      "Write complexity notes for every coding problem you solve.",
      "Use company-style questions for practice, but avoid claiming any private PYQ is exact.",
      "After every mock, revise only the top three mistakes."
    ],
    technicalTopics: keywords.length
      ? keywords
      : ["Arrays", "Hash maps", "Strings", "Trees", "Graphs", "Projects"],
    roadmap: buildRoadmap(input),
    codingQuestions,
    companyQuestions: buildCompanyQuestions(input),
    behavioralQuestions: buildBehavioralQuestions(input),
    mockPlan: buildMockPlan(input),
    freeResources: freeInterviewResources
  };
}

function normalizeCodingQuestions(
  value: unknown,
  fallback: NonNullable<InterviewGuideOutput["codingQuestions"]>
) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const questions = value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const question = item as Record<string, unknown>;
      const difficulty = String(question.difficulty ?? "Medium");
      const normalizedDifficulty: "Easy" | "Medium" | "Hard" =
        difficulty === "Easy" || difficulty === "Hard" ? difficulty : "Medium";

      return {
        title: String(question.title ?? "").trim(),
        pattern: String(question.pattern ?? "").trim(),
        difficulty: normalizedDifficulty,
        why: String(question.why ?? "").trim(),
        link:
          typeof question.link === "string" && question.link.startsWith("http")
            ? question.link
            : undefined
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item?.title))
    .slice(0, 12);

  return questions.length ? questions : fallback;
}

function normalizeRoadmap(
  value: unknown,
  fallback: NonNullable<InterviewGuideOutput["roadmap"]>
) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const roadmap = value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const step = item as Record<string, unknown>;

      return {
        week: String(step.week ?? "").trim(),
        goal: String(step.goal ?? "").trim(),
        tasks: asStringArray(step.tasks, [], 5),
        output: String(step.output ?? "").trim()
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item?.week))
    .slice(0, 6);

  return roadmap.length ? roadmap : fallback;
}

function normalizeResources(
  value: unknown,
  fallback: NonNullable<InterviewGuideOutput["freeResources"]>
) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const resources = value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const resource = item as Record<string, unknown>;
      const url = String(resource.url ?? "").trim();

      return {
        title: String(resource.title ?? "").trim(),
        provider: String(resource.provider ?? "").trim(),
        type: String(resource.type ?? "").trim(),
        url: url.startsWith("http") ? url : "",
        focus: String(resource.focus ?? "").trim()
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item?.title))
    .slice(0, 10);

  return resources.length ? resources : fallback;
}

function mergeCodingQuestions(
  primary: NonNullable<InterviewGuideOutput["codingQuestions"]>,
  fallback: NonNullable<InterviewGuideOutput["codingQuestions"]>
) {
  const seen = new Set<string>();

  return [...primary, ...fallback]
    .filter((question) => {
      const key = question.title.toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .slice(0, 12);
}

function mergeResources(
  primary: NonNullable<InterviewGuideOutput["freeResources"]>,
  fallback: NonNullable<InterviewGuideOutput["freeResources"]>
) {
  const seen = new Set<string>();

  return [...primary, ...fallback]
    .filter((resource) => {
      const key = `${resource.provider}-${resource.title}`.toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .slice(0, 10);
}

function normalizeInterviewGuide(
  parsed: Partial<InterviewGuideOutput>,
  fallback: InterviewGuideOutput
): InterviewGuideOutput {
  const fallbackQuestions = fallback.codingQuestions ?? [];
  const fallbackResources = fallback.freeResources ?? freeInterviewResources;

  return {
    companyAnalysis:
      parsed.companyAnalysis?.trim() || fallback.companyAnalysis,
    generatedQuestions: asStringArray(
      parsed.generatedQuestions,
      fallback.generatedQuestions,
      12
    ),
    prepNotes: asStringArray(parsed.prepNotes, fallback.prepNotes, 10),
    technicalTopics: asStringArray(
      parsed.technicalTopics,
      fallback.technicalTopics,
      12
    ),
    roadmap: normalizeRoadmap(parsed.roadmap, fallback.roadmap ?? []),
    codingQuestions: mergeCodingQuestions(
      normalizeCodingQuestions(parsed.codingQuestions, []),
      fallbackQuestions
    ),
    companyQuestions: asStringArray(
      parsed.companyQuestions,
      fallback.companyQuestions ?? [],
      10
    ),
    behavioralQuestions: asStringArray(
      parsed.behavioralQuestions,
      fallback.behavioralQuestions ?? [],
      10
    ),
    mockPlan: asStringArray(parsed.mockPlan, fallback.mockPlan ?? [], 10),
    freeResources: mergeResources(
      normalizeResources(parsed.freeResources, []),
      fallbackResources
    )
  };
}

export async function generateInterviewGuide(input: InterviewGuideInput) {
  const fallback = buildFallbackInterviewGuide(input);
  const textAI = getTextAIClient();

  if (!textAI) {
    return fallback;
  }

  const completion = await textAI.client.chat.completions.create({
    model: textAI.model,
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: interviewGuidePrompt(input) }]
  });
  const parsed = safeJsonParse<Partial<InterviewGuideOutput>>(
    completion.choices[0]?.message.content,
    fallback
  );

  return normalizeInterviewGuide(parsed, fallback);
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
