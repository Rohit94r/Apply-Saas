import { z } from "zod";

export const generateResumeSchema = z.object({
  company: z.string().min(2, "Company is required"),
  role: z.string().min(2, "Role is required"),
  jobDescription: z.string().min(80, "Paste a job description with enough detail"),
  masterResume: z.string().min(80, "Add resume content or upload your master profile")
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
export type InterviewGuideInput = z.infer<typeof interviewGuideSchema>;
export type CoverLetterInput = z.infer<typeof coverLetterSchema>;
export type ResumeCritiqueInput = z.infer<typeof resumeCritiqueSchema>;
export type ProfessionalPhotoInput = z.infer<typeof professionalPhotoSchema>;
