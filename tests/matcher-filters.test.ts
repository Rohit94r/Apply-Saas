import { describe, expect, it } from "vitest";
import {
  normalizeMatcherCity,
  normalizeMatcherRole,
  searchMatcherFilter
} from "@/lib/data/matcher-filters";

describe("matcher-filters", () => {
  it("finds nearest local roles for partial query", () => {
    const results = searchMatcherFilter("role", "front");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.label.toLowerCase().includes("front"))).toBe(
      true
    );
  });

  it("finds nearest local cities for partial query", () => {
    const results = searchMatcherFilter("city", "beng");
    expect(results.some((item) => item.label.toLowerCase().includes("bengaluru"))).toBe(
      true
    );
  });

  it("normalizes empty role and city", () => {
    expect(normalizeMatcherRole("")).toBe("");
    expect(normalizeMatcherCity("")).toBe("");
  });

  it("normalizes known role and city labels", () => {
    expect(normalizeMatcherRole("software engineer")).toBe("Software Engineer");
    expect(normalizeMatcherCity("bengaluru")).toBe("Bengaluru");
  });
});
