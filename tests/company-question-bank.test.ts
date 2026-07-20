import { describe, expect, it } from "vitest";
import { allCompanyGuides, totalCompanyCount } from "@/content/coding-questions";
import {
  buildPhasePlan,
  codingSlotIndexes,
  phaseFromIndex
} from "@/lib/mock-interview/phases";
import {
  companiesWithTierTemplateCoverage,
  companyInterviewBankCount,
  findCompanyInBank,
  getPeerCompanies,
  resolveCompanyIntelligence
} from "@/lib/mock-interview/company-question-bank";
import { pickCodeProblem } from "@/lib/mock-interview/coding-problems";
import { runJavaScriptTests } from "@/lib/mock-interview/code-runner";

describe("company interview question bank", () => {
  it("covers every PYQs library company", () => {
    expect(companyInterviewBankCount).toBe(totalCompanyCount);
    expect(companyInterviewBankCount).toBeGreaterThanOrEqual(64);
    expect(companyInterviewBankCount).toBe(allCompanyGuides.length);
  });

  it("resolves exact company matches and aliases", () => {
    expect(findCompanyInBank("Google")?.slug).toBe("google");
    expect(findCompanyInBank("TCS")?.slug).toBe("tcs-nqt");
    expect(findCompanyInBank("JPMorgan")?.slug).toBe("jp-morgan");
    expect(findCompanyInBank("Phone Pe")?.slug).toBe("phonepe");
  });

  it("falls back to same-tier peers when coverage is thin or unknown", () => {
    const infosys = resolveCompanyIntelligence("Infosys");
    expect(infosys.primary.slug).toBe("infosys");
    const peerSlugs = infosys.peers.map((p) => p.slug);
    expect(peerSlugs.some((s) => ["tcs-nqt", "wipro", "cognizant"].includes(s))).toBe(
      true
    );

    const unknown = resolveCompanyIntelligence("Completely Unknown Startup XYZ");
    expect(unknown.matchedExact).toBe(false);
    expect(unknown.usedPeerFallback).toBe(true);
    expect(unknown.peers.length).toBeGreaterThan(0);
  });

  it("returns peer companies for a bank entry", () => {
    const google = findCompanyInBank("Google");
    expect(google).toBeTruthy();
    const peers = getPeerCompanies(google!, 3);
    expect(peers.every((p) => p.slug !== "google")).toBe(true);
    expect(peers.every((p) => p.tier === "faang-like")).toBe(true);
  });

  it("lists tier-template companies that rely on peer/tier defaults", () => {
    const thin = companiesWithTierTemplateCoverage();
    expect(thin.length).toBeGreaterThan(0);
    expect(thin.every((c) => c.coverage === "tier-template")).toBe(true);
    // Rich overrides should not appear here
    expect(thin.some((c) => c.slug === "google")).toBe(false);
    expect(thin.some((c) => c.slug === "tcs-nqt")).toBe(false);
  });
});

describe("interview phase-from-index", () => {
  it("starts with intro and ends with closing for a 6-question session", () => {
    const plan = buildPhasePlan(6, { includeCoding: false, interviewType: "mixed" });
    expect(plan[0]).toBe("intro");
    expect(plan[1]).toBe("intro");
    expect(plan[plan.length - 1]).toBe("closing");
    expect(plan).toContain("role");
    expect(plan).toContain("company");
  });

  it("inserts basic coding mid-session when coding is enabled", () => {
    const slots = codingSlotIndexes(8, {
      includeCoding: true,
      interviewType: "technical"
    });
    expect(slots.basic).not.toBeNull();
    expect(phaseFromIndex(slots.basic!, 8, { includeCoding: true, interviewType: "technical" }))
      .toBe("coding-basic");
  });

  it("adds company-flavored coding for longer sessions", () => {
    const slots = codingSlotIndexes(10, {
      includeCoding: true,
      interviewType: "mixed"
    });
    expect(slots.basic).not.toBeNull();
    expect(slots.company).not.toBeNull();
    expect(slots.company).not.toBe(slots.basic);
    expect(
      phaseFromIndex(slots.company!, 10, { includeCoding: true, interviewType: "mixed" })
    ).toBe("coding-company");
  });

  it("skips coding phases for HR interviews", () => {
    const plan = buildPhasePlan(8, { includeCoding: true, interviewType: "hr" });
    expect(plan.some((p) => p.startsWith("coding"))).toBe(false);
  });

  it("maps early indexes to intro for short sessions", () => {
    expect(phaseFromIndex(0, 5, { includeCoding: false })).toBe("intro");
    expect(phaseFromIndex(1, 5, { includeCoding: false })).not.toBe("intro");
  });
});

describe("company-flavored coding problems", () => {
  it("attaches runnable local tests for basic and company flavors", () => {
    const company = findCompanyInBank("Amazon")!;
    const basic = pickCodeProblem({
      difficulty: "easy",
      flavor: "basic",
      company
    });
    const flavored = pickCodeProblem({
      difficulty: "medium",
      flavor: "company",
      company
    });

    expect(basic.title.length).toBeGreaterThan(3);
    expect(flavored.title.toLowerCase()).toContain("amazon");
    expect(basic.testCases.length).toBeGreaterThan(0);
    expect(flavored.description.toLowerCase()).toMatch(/inspired|practice|style/);
  });

  it("keeps problems within the safe local evaluator subset", () => {
    const company = findCompanyInBank("TCS")!;
    const problem = pickCodeProblem({
      difficulty: "easy",
      flavor: "basic",
      company
    });
    // Starter is intentionally incomplete; a correct reverse solution should pass
    // when the problem is reverse-oriented.
    if (problem.title.toLowerCase().includes("reverse")) {
      const result = runJavaScriptTests(
        `function solve(input) {
  return input.trim().split("").reverse().join("");
}`,
        problem.testCases
      );
      expect(result.passed).toBe(true);
    } else {
      expect(problem.starterCode).toContain("function solve");
    }
  });
});
