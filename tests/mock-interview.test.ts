import { describe, it, expect } from "vitest";
import { buildMockQuestions } from "@/lib/data/mock-interviews";
import { getMockInterviewAIStatus } from "@/lib/ai/mock-interview";

describe("buildMockQuestions", () => {
  it("returns 6 questions for any company + role", () => {
    const questions = buildMockQuestions("TCS", "Software Engineer");
    expect(questions).toHaveLength(6);
  });

  it("includes the company name in question text", () => {
    const questions = buildMockQuestions("Amazon", "SDE Intern");
    expect(questions.some((q) => q.question.includes("Amazon"))).toBe(true);
  });

  it("includes the role in question text", () => {
    const questions = buildMockQuestions("Google", "Software Engineer");
    expect(questions.some((q) => q.question.includes("Software Engineer"))).toBe(true);
  });

  it("every question has a tip and sample answer", () => {
    const questions = buildMockQuestions("Infosys", "Systems Engineer");
    for (const q of questions) {
      expect(q.tip.length).toBeGreaterThan(10);
      expect(q.sampleAnswer.length).toBeGreaterThan(10);
      expect(q.category.length).toBeGreaterThan(0);
      expect(q.question.length).toBeGreaterThan(10);
    }
  });

  it("covers multiple categories (intro, behavioral, technical, company, closing)", () => {
    const questions = buildMockQuestions("Flipkart", "SDE");
    const categories = questions.map((q) => q.category);
    expect(categories).toContain("intro");
    expect(categories).toContain("behavioral");
    expect(categories).toContain("technical");
    expect(categories).toContain("company");
    expect(categories).toContain("closing");
  });

  it("handles empty company/role gracefully", () => {
    const questions = buildMockQuestions("", "");
    expect(questions).toHaveLength(6);
    expect(questions[0].question.length).toBeGreaterThan(10);
  });
});

describe("getMockInterviewAIStatus", () => {
  it("returns a status object with available + message", () => {
    const status = getMockInterviewAIStatus();
    expect(typeof status.available).toBe("boolean");
    expect(status.message.length).toBeGreaterThan(10);
    if (status.available) {
      expect(status.provider).toBeTruthy();
    } else {
      expect(status.provider).toBeNull();
      expect(status.message).toMatch(/GEMINI_API_KEY/);
    }
  });
});
