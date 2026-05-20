export type SubscriptionPlan = "free" | "pro";

export type ResumeSkill = {
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "soft" | "other";
};

export type ResumeProject = {
  name: string;
  description: string;
  stack: string[];
  impact: string;
  link?: string;
};

export type ResumeExperience = {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  bullets: string[];
};

export type ResumeSourceLine = {
  pageIndex: number;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  pageWidth: number;
  pageHeight: number;
};

export type MasterResume = {
  id: string;
  userId: string;
  title: string;
  sourceName?: string;
  sourceUrl?: string;
  sourceFilePath?: string;
  sourceFileType?: string;
  sourceLayout?: ResumeSourceLine[];
  rawText?: string;
  summary: string;
  education: string[];
  skills: ResumeSkill[];
  projects: ResumeProject[];
  experience: ResumeExperience[];
  updatedAt: string;
};

export type GeneratedResume = {
  id: string;
  userId: string;
  originalResumeId?: string;
  company: string;
  role: string;
  atsScore: number;
  status: "draft" | "ready" | "downloaded";
  keywords: string[];
  generatedContent: {
    summary: string;
    skills: string[];
    bullets: string[];
    beforeText?: string;
    afterText?: string;
    changeSummary?: string[];
    beforeAtsScore?: number;
    template?: "classic" | "modern" | "compact";
    sourceFilePath?: string;
    sourceFileType?: string;
    sourceLayout?: ResumeSourceLine[];
  };
  pdfUrl?: string;
  createdAt: string;
};

export type InterviewGuide = {
  id: string;
  userId: string;
  company: string;
  role: string;
  companyAnalysis: string;
  generatedQuestions: string[];
  prepNotes: string[];
  technicalTopics: string[];
  roadmap?: Array<{
    week: string;
    goal: string;
    tasks: string[];
    output: string;
  }>;
  codingQuestions?: Array<{
    title: string;
    pattern: string;
    difficulty: "Easy" | "Medium" | "Hard";
    why: string;
    link?: string;
  }>;
  companyQuestions?: string[];
  behavioralQuestions?: string[];
  mockPlan?: string[];
  freeResources?: Array<{
    title: string;
    provider: string;
    type: string;
    url: string;
    focus: string;
  }>;
  focusAreas?: string[];
  timeline?: string;
  experienceLevel?: string;
  preferredLanguage?: string;
  createdAt: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  detail: string;
  trend?: string;
};
