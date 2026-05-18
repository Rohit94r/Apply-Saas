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

export type MasterResume = {
  id: string;
  userId: string;
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
  createdAt: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  detail: string;
  trend?: string;
};
