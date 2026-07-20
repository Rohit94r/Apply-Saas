import { describe, it, expect } from "vitest";
import {
  generateResumeSchema,
  refineResumeSchema,
  coverLetterSchema,
  interviewGuideSchema,
  applicationCreateSchema,
  offerCreateSchema,
  mockInterviewStartSchema,
  mockInterviewCompleteSchema
} from "@/lib/validations";

describe("generateResumeSchema", () => {
  it("accepts a valid resume generation request", () => {
    const result = generateResumeSchema.safeParse({
      company: "TCS",
      role: "Software Engineer",
      jobDescription: "We are hiring a software engineer with React and Node.js experience. The candidate should have strong problem solving skills.",
      masterResume: "John Doe. Software engineering student. Skills: React, TypeScript, Node.js, MongoDB. Projects: Campus portal with MERN stack."
    });
    expect(result.success).toBe(true);
  });

  it("rejects a job description that is too short", () => {
    const result = generateResumeSchema.safeParse({
      company: "TCS",
      role: "Software Engineer",
      jobDescription: "Too short",
      masterResume: "Valid resume content with enough text to pass validation thresholds."
    });
    expect(result.success).toBe(false);
  });

  it("rejects a master resume that is too short", () => {
    const result = generateResumeSchema.safeParse({
      company: "TCS",
      role: "Software Engineer",
      jobDescription: "Valid job description with enough text to pass validation thresholds here.",
      masterResume: "Short"
    });
    expect(result.success).toBe(false);
  });
});

describe("refineResumeSchema", () => {
  it("accepts a valid refine request", () => {
    const result = refineResumeSchema.safeParse({
      resumeId: "abc123",
      prompt: "Make the summary more concise and add React keywords"
    });
    expect(result.success).toBe(true);
  });

  it("accepts a section-scoped refine request", () => {
    const result = refineResumeSchema.safeParse({
      resumeId: "abc123",
      prompt: "Improve the skills section with more technologies",
      section: "skills"
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid section name", () => {
    const result = refineResumeSchema.safeParse({
      resumeId: "abc123",
      prompt: "Improve everything",
      section: "invalid-section"
    });
    expect(result.success).toBe(false);
  });

  it("rejects a prompt that is too short", () => {
    const result = refineResumeSchema.safeParse({
      resumeId: "abc123",
      prompt: "short"
    });
    expect(result.success).toBe(false);
  });
});

describe("coverLetterSchema", () => {
  it("accepts a valid cover letter request", () => {
    const result = coverLetterSchema.safeParse({
      company: "Amazon",
      role: "SDE Intern",
      jobDescription: "We are hiring an SDE intern with strong coding and problem solving skills. The candidate should know data structures and algorithms well.",
      resumeContent: "Software engineering student with React, TypeScript, and Node.js experience. Built 3 campus projects with measurable impact and clean code.",
      tone: "confident"
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid tone", () => {
    const result = coverLetterSchema.safeParse({
      company: "Amazon",
      role: "SDE Intern",
      jobDescription: "We are hiring an SDE intern with strong coding and problem solving skills. The candidate should know data structures and algorithms well.",
      resumeContent: "Software engineering student with React, TypeScript, and Node.js experience. Built 3 campus projects with measurable impact and clean code.",
      tone: "aggressive"
    });
    expect(result.success).toBe(false);
  });
});

describe("interviewGuideSchema", () => {
  it("accepts a valid interview guide request", () => {
    const result = interviewGuideSchema.safeParse({
      company: "Google",
      role: "Software Engineer",
      jobDescription: "Looking for a software engineer with strong DSA and system design skills.",
      resumeContent: "Student with React, Node.js, and MongoDB experience. Built a campus placement portal."
    });
    expect(result.success).toBe(true);
  });

  it("applies defaults for optional fields", () => {
    const result = interviewGuideSchema.safeParse({
      company: "Google",
      role: "Software Engineer",
      jobDescription: "Looking for a software engineer with strong DSA and system design skills.",
      resumeContent: "Student with React, Node.js, and MongoDB experience. Built a campus placement portal."
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.experienceLevel).toBe("Student / Fresher");
      expect(result.data.timeline).toBe("14 days");
      expect(result.data.preferredLanguage).toBe("JavaScript");
    }
  });
});

describe("applicationCreateSchema", () => {
  it("accepts a valid application", () => {
    const result = applicationCreateSchema.safeParse({
      company: "TCS",
      role: "Software Engineer",
      status: "applied",
      notes: "Applied through campus drive",
      location: "Bangalore"
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing company", () => {
    const result = applicationCreateSchema.safeParse({
      role: "Software Engineer"
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid status", () => {
    const result = applicationCreateSchema.safeParse({
      company: "TCS",
      role: "Software Engineer",
      status: "invalid"
    });
    expect(result.success).toBe(false);
  });

  it("defaults status to applied", () => {
    const result = applicationCreateSchema.safeParse({
      company: "TCS",
      role: "Software Engineer"
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe("applied");
    }
  });
});

describe("offerCreateSchema", () => {
  it("accepts a valid offer", () => {
    const result = offerCreateSchema.safeParse({
      company: "Amazon",
      role: "SDE-1",
      ctc: "12 LPA",
      location: "Bangalore",
      deadline: "2026-08-15"
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing CTC", () => {
    const result = offerCreateSchema.safeParse({
      company: "Amazon",
      role: "SDE-1"
    });
    expect(result.success).toBe(false);
  });
});

describe("mockInterviewStartSchema", () => {
  it("accepts valid company + role", () => {
    const result = mockInterviewStartSchema.safeParse({
      company: "TCS",
      role: "Software Engineer"
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty company", () => {
    const result = mockInterviewStartSchema.safeParse({
      company: "",
      role: "Software Engineer"
    });
    expect(result.success).toBe(false);
  });

  it("accepts ten questions and rejects eleven", () => {
    const base = { company: "TCS", role: "Software Engineer" };
    expect(
      mockInterviewStartSchema.safeParse({ ...base, totalQuestions: 10 }).success
    ).toBe(true);
    expect(
      mockInterviewStartSchema.safeParse({ ...base, totalQuestions: 11 }).success
    ).toBe(false);
  });
});

describe("mockInterviewCompleteSchema", () => {
  it("accepts a valid complete action", () => {
    const result = mockInterviewCompleteSchema.safeParse({
      action: "complete",
      sessionId: "abc123",
      durationSeconds: 600
    });
    expect(result.success).toBe(true);
  });

  it("rejects duration over 4 hours", () => {
    const result = mockInterviewCompleteSchema.safeParse({
      action: "complete",
      sessionId: "abc123",
      durationSeconds: 60 * 60 * 5
    });
    expect(result.success).toBe(false);
  });
});
