export const CLIENT_STAGES = [
  "prospect",
  "qualified",
  "contacted",
  "replied",
  "proposal",
  "won",
  "not-a-fit"
] as const;

export type ClientStage = (typeof CLIENT_STAGES)[number];

export type ClientLead = {
  id: string;
  name: string;
  website: string;
  contact: string;
  serviceId: string;
  city: string;
  need: string;
  budgetSignal: "unknown" | "low" | "medium" | "high";
  authority: "unknown" | "decision-maker" | "influencer";
  urgency: "unknown" | "exploring" | "this-month" | "urgent";
  stage: ClientStage;
  nextAction: string;
  createdAt: string;
};

export type LeadDraft = Omit<ClientLead, "id" | "stage" | "createdAt">;

export function validateLeadDraft(draft: LeadDraft) {
  const errors: string[] = [];
  if (draft.name.trim().length < 2) errors.push("Add a client or business name");
  if (draft.name.length > 120) errors.push("Client name is too long");
  if (draft.contact.length > 160) errors.push("Contact detail is too long");
  if (draft.need.length > 500) errors.push("Need must be under 500 characters");
  if (draft.nextAction.length > 200) errors.push("Next action is too long");
  if (draft.website.trim()) {
    try {
      const url = new URL(draft.website);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      errors.push("Website must be a valid http(s) URL");
    }
  }
  return errors;
}

export function scoreLead(lead: Pick<ClientLead, "need" | "budgetSignal" | "authority" | "urgency">) {
  let score = 0;
  const reasons: string[] = [];
  if (lead.need.trim().length >= 20) {
    score += 25;
    reasons.push("Clear business need");
  }
  if (lead.budgetSignal === "medium" || lead.budgetSignal === "high") {
    score += lead.budgetSignal === "high" ? 30 : 20;
    reasons.push("Positive budget signal");
  }
  if (lead.authority === "decision-maker") {
    score += 25;
    reasons.push("Direct access to decision-maker");
  }
  if (lead.urgency === "this-month" || lead.urgency === "urgent") {
    score += lead.urgency === "urgent" ? 20 : 15;
    reasons.push("Near-term urgency");
  }
  return {
    score: Math.min(100, score),
    reasons: reasons.length ? reasons : ["Qualification details still needed"]
  };
}

export function buildOutreachTemplate(
  lead: Pick<ClientLead, "name" | "need" | "city">,
  serviceLabel: string
) {
  const observedNeed = lead.need.trim()
    ? `I noticed ${lead.need.trim().replace(/[.!?]+$/, "")}.`
    : `I found ${lead.name} while researching businesses in ${lead.city}.`;
  return `Hi ${lead.name}, ${observedNeed} I help businesses with ${serviceLabel.toLowerCase()}. Would a short, no-pressure conversation be useful? If not, I will not follow up again.`;
}

export function sanitizeStoredLeads(value: unknown): ClientLead[] {
  if (!Array.isArray(value)) return [];
  return value.filter((lead): lead is ClientLead => {
    if (!lead || typeof lead !== "object") return false;
    const item = lead as Partial<ClientLead>;
    return (
      typeof item.id === "string" &&
      typeof item.name === "string" &&
      typeof item.serviceId === "string" &&
      CLIENT_STAGES.includes(item.stage as ClientStage)
    );
  });
}
