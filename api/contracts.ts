import type { z } from "zod";
import {
  coverLetterSchema,
  generateResumeSchema,
  interviewGuideSchema
} from "@/lib/validations";

export const apiContracts = {
  generateResume: {
    path: "/api/resumes/generate",
    method: "POST",
    schema: generateResumeSchema
  },
  interviewGuide: {
    path: "/api/interview",
    method: "POST",
    schema: interviewGuideSchema
  },
  coverLetter: {
    path: "/api/cover-letter",
    method: "POST",
    schema: coverLetterSchema
  }
} as const;

export type GenerateResumePayload = z.infer<typeof generateResumeSchema>;
export type InterviewGuidePayload = z.infer<typeof interviewGuideSchema>;
export type CoverLetterPayload = z.infer<typeof coverLetterSchema>;
