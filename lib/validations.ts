import { z } from "zod";

export const generateResumeSchema = z.object({
  company: z.string().min(2, "Company is required"),
  role: z.string().min(2, "Role is required"),
  jobDescription: z.string().min(80, "Paste a job description with enough detail"),
  masterResume: z.string().min(80, "Add resume content or upload your master profile")
});

export const generateResumeRequestSchema = generateResumeSchema
  .omit({ masterResume: true })
  .extend({
    masterResume: z.string().min(80).optional(),
    masterResumeId: z.string().optional()
  });

export const masterResumeSchema = z.object({
  title: z.string().trim().min(2).max(80).optional(),
  sourceName: z.string().trim().max(160).optional(),
  sourceUrl: z.string().url().optional(),
  rawText: z.string().min(80, "Add enough resume content to save")
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
  atsScore: z.number().min(0).max(100).optional()
});

export const interviewGuideSchema = z.object({
  company: z.string().min(2),
  role: z.string().min(2),
  jobDescription: z.string().min(80),
  resumeContent: z.string().min(80)
});

export const coverLetterSchema = z.object({
  company: z.string().min(2),
  role: z.string().min(2),
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
export type MasterResumeInput = z.infer<typeof masterResumeSchema>;
export type UpdateGeneratedResumeInput = z.infer<
  typeof updateGeneratedResumeSchema
>;
export type InterviewGuideInput = z.infer<typeof interviewGuideSchema>;
export type CoverLetterInput = z.infer<typeof coverLetterSchema>;
export type ResumeCritiqueInput = z.infer<typeof resumeCritiqueSchema>;
export type ProfessionalPhotoInput = z.infer<typeof professionalPhotoSchema>;
