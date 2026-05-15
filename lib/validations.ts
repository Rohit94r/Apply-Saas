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

export type GenerateResumeInput = z.infer<typeof generateResumeSchema>;
export type InterviewGuideInput = z.infer<typeof interviewGuideSchema>;
export type CoverLetterInput = z.infer<typeof coverLetterSchema>;
