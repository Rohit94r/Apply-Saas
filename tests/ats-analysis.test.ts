import { describe, it, expect } from "vitest";
import { analyzeResumeAts } from "@/lib/ai/resume-engine";

const sampleResume = `
John Doe
john@example.com | +91 9876543210 | linkedin.com/in/johndoe

Summary
Software engineering student with React, TypeScript, and Node.js experience. Built 3 campus projects with measurable impact.

Skills
React, TypeScript, JavaScript, Node.js, Express.js, MongoDB, REST APIs, Git, GitHub

Experience
Software Engineer Intern - TechCorp (Jan 2025 - Jun 2025)
- Built REST API endpoints serving 500+ daily requests using Node.js and Express
- Reduced API response time by 30% through query optimization and caching

Projects
Campus Placement Portal
- Full-stack MERN app with authentication and real-time notifications
- Used by 200+ students in the first month

Education
B.Tech Computer Science - XYZ Institute (2022 - 2026)
`;

const sampleJobDescription = `
We are hiring a Software Engineer Intern with experience in:
Required: React, TypeScript, JavaScript, Node.js, REST APIs
Responsibilities: Build and maintain web applications, optimize APIs, write clean code
Preferred: MongoDB, Express.js, Git, CI/CD, AWS
The candidate should have strong problem solving and communication skills.
`;

describe("analyzeResumeAts", () => {
  it("returns a score between 0 and 100", () => {
    const result = analyzeResumeAts({
      resumeText: sampleResume,
      jobDescription: sampleJobDescription,
      role: "Software Engineer Intern"
    });

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("extracts job keywords from the job description", () => {
    const result = analyzeResumeAts({
      resumeText: sampleResume,
      jobDescription: sampleJobDescription,
      role: "Software Engineer Intern"
    });

    expect(result.jobKeywords.length).toBeGreaterThan(0);
    expect(result.jobKeywords).toContain("React");
    expect(result.jobKeywords).toContain("TypeScript");
  });

  it("identifies matched keywords present in the resume", () => {
    const result = analyzeResumeAts({
      resumeText: sampleResume,
      jobDescription: sampleJobDescription,
      role: "Software Engineer Intern"
    });

    expect(result.matchedKeywords).toContain("React");
    expect(result.matchedKeywords).toContain("TypeScript");
    expect(result.matchedKeywords).toContain("Node.js");
  });

  it("identifies missing keywords not in the resume", () => {
    const result = analyzeResumeAts({
      resumeText: sampleResume,
      jobDescription: "Required: Docker, Kubernetes, Terraform, AWS, CI/CD",
      role: "DevOps Engineer"
    });

    expect(result.missingKeywords.length).toBeGreaterThan(0);
  });

  it("gives a higher score when resume matches the job well", () => {
    const goodMatch = analyzeResumeAts({
      resumeText: sampleResume,
      jobDescription: sampleJobDescription,
      role: "Software Engineer Intern"
    });

    const poorMatch = analyzeResumeAts({
      resumeText: "I am a student with no technical skills listed.",
      jobDescription: sampleJobDescription,
      role: "Software Engineer Intern"
    });

    expect(goodMatch.score).toBeGreaterThan(poorMatch.score);
  });

  it("handles empty or minimal resume gracefully", () => {
    const result = analyzeResumeAts({
      resumeText: "Student",
      jobDescription: sampleJobDescription,
      role: "Software Engineer"
    });

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("matched + missing keywords covers all job keywords", () => {
    const result = analyzeResumeAts({
      resumeText: sampleResume,
      jobDescription: sampleJobDescription,
      role: "Software Engineer Intern"
    });

    const allCovered = result.jobKeywords.every(
      (kw) =>
        result.matchedKeywords.includes(kw) ||
        result.missingKeywords.includes(kw)
    );
    expect(allCovered).toBe(true);
  });
});
