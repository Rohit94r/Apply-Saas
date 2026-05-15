"use server";

import { generateTailoredResume } from "@/lib/ai/resume-engine";
import { generateResumeSchema } from "@/lib/validations";

export async function generateResumeAction(formData: FormData) {
  const input = generateResumeSchema.parse({
    company: formData.get("company"),
    role: formData.get("role"),
    masterResume: formData.get("masterResume"),
    jobDescription: formData.get("jobDescription")
  });

  return generateTailoredResume(input);
}
