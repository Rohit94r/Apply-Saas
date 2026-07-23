import { describe, expect, it } from "vitest";
import {
  MIN_PASSWORD_LENGTH,
  normalizeEmail,
  validatePassword
} from "@/lib/auth/password-rules";

describe("password-rules", () => {
  it("normalizes email", () => {
    expect(normalizeEmail("  Ada@Example.COM ")).toBe("ada@example.com");
  });

  it(`rejects passwords shorter than ${MIN_PASSWORD_LENGTH}`, () => {
    expect(validatePassword("short")).toMatch(/at least/i);
  });

  it("accepts passwords of minimum length", () => {
    expect(validatePassword("a".repeat(MIN_PASSWORD_LENGTH))).toBeNull();
  });
});
