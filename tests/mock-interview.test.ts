import { describe, it, expect } from "vitest";
import { buildMockQuestions } from "@/lib/data/mock-interviews";
import { getMockInterviewAIStatus } from "@/lib/ai/mock-interview";
import {
  getActiveQuestionIndex,
  hasReachedQuestionLimit,
  MAX_INTERVIEW_QUESTIONS,
  normalizeQuestionCount
} from "@/lib/mock-interview/flow";
import { runJavaScriptTests } from "@/lib/mock-interview/code-runner";

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

describe("interview question limits", () => {
  it("normalizes every session to the hard maximum of ten", () => {
    expect(normalizeQuestionCount(10)).toBe(MAX_INTERVIEW_QUESTIONS);
    expect(normalizeQuestionCount(999)).toBe(MAX_INTERVIEW_QUESTIONS);
  });

  it("finds the persisted unanswered turn instead of trusting a client index", () => {
    const turns = [
      { answer: "first" },
      { answer: "second" },
      {},
      { answer: "should not skip the pending turn" }
    ];
    expect(getActiveQuestionIndex(turns, 10)).toBe(2);
  });

  it("ends after answering question ten", () => {
    expect(hasReachedQuestionLimit(8, 10)).toBe(false);
    expect(hasReachedQuestionLimit(9, 10)).toBe(true);
    expect(getActiveQuestionIndex(Array.from({ length: 10 }, () => ({ answer: "done" })), 10))
      .toBe(10);
  });
});

describe("deterministic coding evaluator", () => {
  it("evaluates a supported solution against visible test cases", () => {
    const result = runJavaScriptTests(
      `function solve(input) {
        return input.trim().split("").reverse().join("");
      }`,
      [
        { input: "hello", expected: "olleh" },
        { input: " apply ", expected: "ylppa" }
      ]
    );

    expect(result.mode).toBe("deterministic-local");
    expect(result.passed).toBe(true);
    expect(result.passedCount).toBe(2);
  });

  it("rejects arbitrary JavaScript without executing it", () => {
    const result = runJavaScriptTests(
      `function solve(input) {
        fetch("https://example.com");
        return input;
      }`,
      [{ input: "safe", expected: "safe" }]
    );

    expect(result.passed).toBe(false);
    expect(result.cases[0].error).toMatch(/safe local JavaScript subset/);
  });

  it("limits evaluation to five bounded test cases", () => {
    const result = runJavaScriptTests(
      "function solve(input) { return input.trim(); }",
      Array.from({ length: 12 }, (_, index) => ({
        input: String(index),
        expected: String(index)
      }))
    );
    expect(result.total).toBe(5);
    expect(result.passed).toBe(true);
  });
});
