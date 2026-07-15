import { z } from "zod";

const optionalTextWithDefault = (fallback: string, max = 120) =>
  z.preprocess(
    (value) =>
      value == null || (typeof value === "string" && !value.trim())
        ? undefined
        : value,
    z.string().trim().max(max).optional().default(fallback)
  );

export const generateResumeSchema = z.object({
  company: optionalTextWithDefault("Target company"),
  role: optionalTextWithDefault("Target role"),
  jobDescription: z.string().min(80, "Paste a job description with enough detail"),
  masterResume: z.string().min(80, "Add resume content or upload your master profile"),
  prompt: z.string().trim().max(2000).optional()
});

export const generateResumeRequestSchema = generateResumeSchema
  .omit({ masterResume: true })
  .extend({
    masterResume: z.string().min(80).optional(),
    masterResumeId: z.string().optional()
  });

export const resumeTemplateSchema = z.enum(["classic", "modern", "compact"]);

export const masterResumeSchema = z.object({
  title: z.string().trim().min(2).max(80).optional(),
  sourceName: z.string().trim().max(160).optional(),
  sourceUrl: z.string().url().optional(),
  rawText: z.string().min(80, "Add enough resume content to save")
});

export const refineResumeSchema = z.object({
  resumeId: z.string().min(1, "Resume id is required"),
  prompt: z.string().trim().min(8, "Add a short refinement instruction").max(2000),
  jobDescription: z.string().trim().min(10).optional(),
  section: z
    .enum(["summary", "skills", "experience", "projects", "education", "achievements"])
    .optional()
});

export const updateGeneratedResumeSchema = z.object({
  summary: z.string().min(20, "Summary is too short"),
  skills: z.array(z.string().trim().min(1)).min(1, "Add at least one skill"),
  bullets: z.array(z.string().trim().min(1)).min(1, "Add at least one bullet"),
  beforeText: z.string().min(80).optional(),
  afterText: z.string().min(80).optional(),
  changeSummary: z.array(z.string().trim().min(1)).optional(),
  beforeAtsScore: z.number().min(0).max(100).optional(),
  keywords: z.array(z.string().trim().min(1)).optional(),
  atsScore: z.number().min(0).max(100).optional(),
  template: resumeTemplateSchema.optional()
});

export const interviewGuideSchema = z.object({
  company: optionalTextWithDefault("Target company"),
  role: optionalTextWithDefault("Target role"),
  jobDescription: z
    .string()
    .trim()
    .min(10, "Add a short job description or role requirements"),
  resumeContent: z
    .string()
    .trim()
    .min(10, "Add a short resume summary, skills, or projects"),
  experienceLevel: z.string().trim().max(80).default("Student / Fresher"),
  timeline: z.string().trim().max(40).default("14 days"),
  preferredLanguage: z.string().trim().max(80).default("JavaScript"),
  focusAreas: z.array(z.string().trim().min(1)).default([
    "DSA",
    "Projects",
    "HR"
  ])
});

export const coverLetterSchema = z.object({
  company: optionalTextWithDefault("Hiring team"),
  role: optionalTextWithDefault("Target role"),
  jobDescription: z.string().min(80),
  resumeContent: z.string().min(80),
  tone: z.enum(["confident", "warm", "concise"]).default("confident")
});

export const resumeCritiqueSchema = z.object({
  resumeContent: z.string().min(80, "Add enough resume content to critique"),
  jobDescription: z.string().min(80, "Paste a job description with enough detail")
});

export const professionalPhotoSchema = z.object({
  imageUrl: z.string().url().optional(),
  prompt: z.string().max(500).optional()
});

export const applicationStatusSchema = z.enum([
  "applied",
  "interview",
  "offer",
  "rejected"
]);

export const applicationCreateSchema = z.object({
  company: z.string().trim().min(1, "Company is required").max(120),
  role: z.string().trim().min(1, "Role is required").max(120),
  status: applicationStatusSchema.optional().default("applied"),
  notes: z.string().trim().max(2000).optional().default(""),
  location: z.string().trim().max(120).optional().default(""),
  appliedAt: z.string().optional()
});

export const applicationUpdateSchema = applicationCreateSchema.partial();

export const offerCreateSchema = z.object({
  company: z.string().trim().min(1, "Company is required").max(120),
  role: z.string().trim().min(1, "Role is required").max(120),
  ctc: z.string().trim().min(1, "CTC is required").max(80),
  location: z.string().trim().max(120).optional().default(""),
  deadline: z.string().trim().max(80).optional().default(""),
  notes: z.string().trim().max(2000).optional().default("")
});

export const offerUpdateSchema = offerCreateSchema.partial();

export const mockInterviewTypeSchema = z.enum(["hr", "technical", "mixed"]);
export const mockInterviewDifficultySchema = z.enum(["easy", "medium", "hard"]);

export const mockInterviewStartSchema = z.object({
  action: z.literal("start").optional(),
  company: z.string().trim().min(1, "Company is required").max(120),
  role: z.string().trim().min(1, "Role is required").max(120),
  jobDescription: z.string().trim().max(4000).optional(),
  interviewType: mockInterviewTypeSchema.default("mixed"),
  difficulty: mockInterviewDifficultySchema.default("medium"),
  includeCoding: z.boolean().optional().default(false),
  languageCode: z.string().trim().max(8).optional().default("en"),
  voiceId: z.string().trim().max(64).optional(),
  totalQuestions: z.number().int().min(5).max(8).optional().default(6),
  /** When true, allow labeled demo mode if no AI key is configured. */
  allowDemo: z.boolean().optional().default(false)
});

export const mockInterviewAnswerSchema = z.object({
  action: z.literal("answer"),
  sessionId: z.string().min(1),
  answer: z.string().trim().min(1, "Type an answer before submitting").max(8000),
  /** Client-held turns for local (non-persisted) sessions. */
  turns: z
    .array(
      z.object({
        question: z.string().min(1),
        category: z.string().optional(),
        answer: z.string().optional(),
        strengths: z.array(z.string()).optional(),
        improvements: z.array(z.string()).optional(),
        score: z.number().optional()
      })
    )
    .optional(),
  company: z.string().trim().min(1).max(120).optional(),
  role: z.string().trim().min(1).max(120).optional(),
  interviewType: mockInterviewTypeSchema.optional(),
  difficulty: mockInterviewDifficultySchema.optional(),
  totalQuestions: z.number().int().min(5).max(8).optional(),
  resumeContext: z.string().max(12000).optional(),
  jobDescription: z.string().max(4000).optional(),
  includeCoding: z.boolean().optional(),
  languageCode: z.string().max(8).optional(),
  questionIndex: z.number().int().min(0).max(20).optional(),
  currentQuestion: z.string().min(1).max(2000).optional()
});

export const mockInterviewEndSchema = z.object({
  action: z.literal("end"),
  sessionId: z.string().min(1),
  durationSeconds: z.number().int().min(0).max(60 * 60 * 4),
  turns: z
    .array(
      z.object({
        question: z.string().min(1),
        category: z.string().optional(),
        answer: z.string().optional(),
        strengths: z.array(z.string()).optional(),
        improvements: z.array(z.string()).optional(),
        score: z.number().optional()
      })
    )
    .optional(),
  company: z.string().trim().min(1).max(120).optional(),
  role: z.string().trim().min(1).max(120).optional(),
  interviewType: mockInterviewTypeSchema.optional(),
  difficulty: mockInterviewDifficultySchema.optional(),
  totalQuestions: z.number().int().min(5).max(8).optional(),
  resumeContext: z.string().max(12000).optional()
});

/** @deprecated Prefer mockInterviewEndSchema with action: "end" */
export const mockInterviewCompleteSchema = z.object({
  action: z.literal("complete"),
  sessionId: z.string().min(1),
  durationSeconds: z.number().int().min(0).max(60 * 60 * 4)
});

export type GenerateResumeInput = z.infer<typeof generateResumeSchema>;
export type GenerateResumeRequestInput = z.infer<
  typeof generateResumeRequestSchema
>;
export type RefineResumeInput = z.infer<typeof refineResumeSchema>;
export type ResumeTemplateId = z.infer<typeof resumeTemplateSchema>;
export type MasterResumeInput = z.infer<typeof masterResumeSchema>;
export type UpdateGeneratedResumeInput = z.infer<
  typeof updateGeneratedResumeSchema
>;
export type InterviewGuideInput = z.infer<typeof interviewGuideSchema>;
export type CoverLetterInput = z.infer<typeof coverLetterSchema>;
export type ResumeCritiqueInput = z.infer<typeof resumeCritiqueSchema>;
export type ProfessionalPhotoInput = z.infer<typeof professionalPhotoSchema>;
