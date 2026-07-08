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
  jobDescription: z.string().trim().min(10).optional()
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
