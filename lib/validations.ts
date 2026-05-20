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

export const resumeTemplateSchema = z.enum(["classic", "modern", "compact"]);

export const buildResumeSchema = z.object({
  template: resumeTemplateSchema.default("classic"),
  prompt: z.string().trim().max(2000).optional(),
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Valid email is required").optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional(),
  location: z.string().trim().max(80).optional(),
  linkedin: z.string().trim().max(120).optional(),
  github: z.string().trim().max(120).optional(),
  jobType: z.string().trim().min(2, "Select a job type"),
  targetRole: z.string().trim().min(2, "Select or enter a target role"),
  degree: z.string().trim().min(2, "Degree is required"),
  college: z.string().trim().min(2, "College is required"),
  graduationYear: z.string().trim().max(20).optional(),
  skills: z.array(z.string().trim().min(1)).min(3, "Select at least 3 skills"),
  hasExperience: z.boolean().default(false),
  experience: z.string().trim().max(1200).optional(),
  hasProjects: z.boolean().default(true),
  projects: z.array(z.string().trim().min(1)).default([]),
  hasCertificates: z.boolean().default(false),
  certificates: z.array(z.string().trim().min(1)).default([]),
  wantsPhoto: z.boolean().default(false),
  customSections: z
    .array(
      z.object({
        title: z.string().trim().min(1).max(60),
        content: z.string().trim().min(1).max(1200)
      })
    )
    .default([])
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
  atsScore: z.number().min(0).max(100).optional(),
  template: resumeTemplateSchema.optional()
});

export const interviewGuideSchema = z.object({
  company: z.string().trim().min(2, "Company is required"),
  role: z.string().trim().min(2, "Role is required"),
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
export type BuildResumeInput = z.infer<typeof buildResumeSchema>;
export type ResumeTemplateId = z.infer<typeof resumeTemplateSchema>;
export type MasterResumeInput = z.infer<typeof masterResumeSchema>;
export type UpdateGeneratedResumeInput = z.infer<
  typeof updateGeneratedResumeSchema
>;
export type InterviewGuideInput = z.infer<typeof interviewGuideSchema>;
export type CoverLetterInput = z.infer<typeof coverLetterSchema>;
export type ResumeCritiqueInput = z.infer<typeof resumeCritiqueSchema>;
export type ProfessionalPhotoInput = z.infer<typeof professionalPhotoSchema>;
