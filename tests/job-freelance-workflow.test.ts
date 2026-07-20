import { describe, expect, it } from "vitest";
import {
  getSourceTrust,
  parsePostedAgeDays,
  sortJobMatches
} from "@/features/jobs/lib/job-workflow";
import {
  buildOutreachTemplate,
  sanitizeStoredLeads,
  scoreLead,
  validateLeadDraft
} from "@/features/freelancing/lib/client-pipeline";
import type { JobListing } from "@/features/jobs/types";

const baseJob: JobListing & { matchScore: number } = {
  id: "1",
  title: "Engineer",
  company: "Example",
  location: "Remote",
  workMode: "remote",
  type: "full-time",
  experienceBand: "any",
  skills: ["TypeScript"],
  platform: "linkedin",
  applyUrl: "https://example.com",
  postedLabel: "2 days ago",
  matchScore: 70
};

describe("job workflow logic", () => {
  it("parses relative ages and sorts unknown recency last", () => {
    expect(parsePostedAgeDays("2 weeks ago")).toBe(14);
    const sorted = sortJobMatches(
      [
        { ...baseJob, id: "unknown", postedLabel: "Actively hiring" },
        { ...baseJob, id: "new", postedLabel: "Today", matchScore: 50 }
      ],
      "newest"
    );
    expect(sorted.map((job) => job.id)).toEqual(["new", "unknown"]);
  });

  it("labels curated rows as unverified search links", () => {
    expect(getSourceTrust(baseJob).label).toBe("Curated search link");
    expect(getSourceTrust({ ...baseJob, dataProvider: "adzuna" }).label).toBe(
      "Live provider listing"
    );
  });
});

describe("freelance pipeline logic", () => {
  const draft = {
    name: "Acme Clinic",
    website: "https://acme.example",
    contact: "Owner",
    serviceId: "web-salon",
    city: "Pune",
    need: "Booking requests are handled manually through public WhatsApp links",
    budgetSignal: "medium" as const,
    authority: "decision-maker" as const,
    urgency: "this-month" as const,
    nextAction: "Ask permission for a short discovery call"
  };

  it("validates URLs and scores qualification evidence", () => {
    expect(validateLeadDraft(draft)).toEqual([]);
    expect(validateLeadDraft({ ...draft, website: "javascript:alert(1)" })).toContain(
      "Website must be a valid http(s) URL"
    );
    expect(scoreLead(draft)).toEqual({
      score: 85,
      reasons: [
        "Clear business need",
        "Positive budget signal",
        "Direct access to decision-maker",
        "Near-term urgency"
      ]
    });
  });

  it("creates opt-out-aware outreach and rejects malformed storage", () => {
    expect(buildOutreachTemplate(draft, "Booking websites")).toContain(
      "I will not follow up again"
    );
    expect(sanitizeStoredLeads([{ name: "missing fields" }, null])).toEqual([]);
  });
});
