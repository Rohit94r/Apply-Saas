import { describe, expect, it } from "vitest";
import {
  dashboardNavGroups,
  dashboardNavItems,
  dashboardTitleForPath,
  isDashboardPathActive
} from "@/lib/dashboard-nav";

describe("dashboard navigation", () => {
  it("has unique hrefs across all groups", () => {
    const hrefs = dashboardNavItems.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("covers the core feature areas", () => {
    const hrefs = dashboardNavItems.map((item) => item.href);
    for (const href of [
      "/dashboard",
      "/dashboard/generate",
      "/dashboard/resumes",
      "/dashboard/interview",
      "/dashboard/mock-interview",
      "/dashboard/jobs",
      "/dashboard/applications",
      "/dashboard/freelancing"
    ]) {
      expect(hrefs).toContain(href);
    }
  });

  it("starts with an unlabeled Home group followed by labeled groups", () => {
    expect(dashboardNavGroups[0].label).toBeNull();
    expect(dashboardNavGroups[0].items[0].href).toBe("/dashboard");
    for (const group of dashboardNavGroups.slice(1)) {
      expect(group.label).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
    }
  });
});

describe("isDashboardPathActive", () => {
  it("marks Home active only on the exact dashboard path", () => {
    expect(isDashboardPathActive("/dashboard", "/dashboard")).toBe(true);
    expect(isDashboardPathActive("/dashboard/jobs", "/dashboard")).toBe(false);
  });

  it("marks nested routes active for their parent item", () => {
    expect(
      isDashboardPathActive("/dashboard/interview/guide-1", "/dashboard/interview")
    ).toBe(true);
    expect(
      isDashboardPathActive("/dashboard/interview", "/dashboard/mock-interview")
    ).toBe(false);
  });

  it("lets AI tools own the cover-letters history route", () => {
    expect(
      isDashboardPathActive("/dashboard/cover-letters", "/dashboard/tools")
    ).toBe(true);
  });
});

describe("dashboardTitleForPath", () => {
  it("resolves mock interview before interview prep", () => {
    expect(dashboardTitleForPath("/dashboard/mock-interview").title).toBe(
      "Mock interview"
    );
    expect(dashboardTitleForPath("/dashboard/interview").title).toBe(
      "Interview prep"
    );
  });

  it("falls back to the home title for unknown paths", () => {
    expect(dashboardTitleForPath("/dashboard/unknown").title).toBe(
      "Your Apply home"
    );
  });
});
