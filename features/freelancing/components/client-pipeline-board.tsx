"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Plus, ShieldCheck, Trash } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  buildOutreachTemplate,
  CLIENT_STAGES,
  sanitizeStoredLeads,
  scoreLead,
  validateLeadDraft,
  type ClientLead,
  type ClientStage,
  type LeadDraft
} from "@/features/freelancing/lib/client-pipeline";
import type { FreelanceSubdomain } from "@/features/freelancing/types";

const STORAGE_KEY = "freelance-client-pipeline-v1";
const fieldClass =
  "w-full rounded-md border border-border bg-white px-2.5 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10";
const stageLabels: Record<ClientStage, string> = {
  prospect: "Prospect",
  qualified: "Qualified",
  contacted: "Contacted",
  replied: "Replied",
  proposal: "Proposal",
  won: "Won",
  "not-a-fit": "Not a fit"
};

function emptyDraft(serviceId: string, city: string): LeadDraft {
  return {
    name: "",
    website: "",
    contact: "",
    serviceId,
    city,
    need: "",
    budgetSignal: "unknown",
    authority: "unknown",
    urgency: "unknown",
    nextAction: "Research the business and verify the decision-maker"
  };
}

export function ClientPipelineBoard({
  services,
  selectedService,
  city
}: {
  services: FreelanceSubdomain[];
  selectedService: FreelanceSubdomain;
  city: string;
}) {
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [draft, setDraft] = useState<LeadDraft>(() =>
    emptyDraft(selectedService.id, city)
  );
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      setLeads(sanitizeStoredLeads(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    setDraft((current) => ({ ...current, serviceId: selectedService.id, city }));
  }, [selectedService.id, city]);

  function persist(next: ClientLead[]) {
    setLeads(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function addLead() {
    const errors = validateLeadDraft(draft);
    if (errors.length) {
      toast.error(errors[0]);
      return;
    }
    const lead: ClientLead = {
      ...draft,
      id: crypto.randomUUID(),
      stage: "prospect",
      createdAt: new Date().toISOString()
    };
    persist([lead, ...leads]);
    setDraft(emptyDraft(selectedService.id, city));
    setShowForm(false);
    toast.success("Prospect added to your pipeline");
  }

  const counts = useMemo(
    () =>
      CLIENT_STAGES.reduce<Record<string, number>>((acc, stage) => {
        acc[stage] = leads.filter((lead) => lead.stage === stage).length;
        return acc;
      }, {}),
    [leads]
  );

  return (
    <Card className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="fine-label">Private client CRM</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">Prospect pipeline</h3>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
            Qualify a real business, personalize one respectful message, and track the
            next action. Data stays in this browser; it is not synced or enriched.
          </p>
        </div>
        <Button type="button" size="sm" onClick={() => setShowForm((value) => !value)}>
          <Plus className="h-4 w-4" />
          Add prospect
        </Button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Pipeline totals">
        {CLIENT_STAGES.map((stage) => (
          <span key={stage} className="whitespace-nowrap rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
            {stageLabels[stage]} <strong className="text-foreground">{counts[stage] ?? 0}</strong>
          </span>
        ))}
      </div>

      {showForm ? (
        <div className="mt-4 rounded-xl border border-border bg-muted/25 p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Business name *">
              <input value={draft.name} maxLength={120} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={fieldClass} placeholder="Acme Dental" />
            </Field>
            <Field label="Website">
              <input value={draft.website} maxLength={300} onChange={(e) => setDraft({ ...draft, website: e.target.value })} className={fieldClass} placeholder="https://…" inputMode="url" />
            </Field>
            <Field label="Public contact or role">
              <input value={draft.contact} maxLength={160} onChange={(e) => setDraft({ ...draft, contact: e.target.value })} className={fieldClass} placeholder="Owner on LinkedIn" />
            </Field>
            <Field label="Service">
              <select value={draft.serviceId} onChange={(e) => setDraft({ ...draft, serviceId: e.target.value })} className={fieldClass}>
                {services.map((service) => <option key={service.id} value={service.id}>{service.label}</option>)}
              </select>
            </Field>
            <Field label="Budget signal">
              <select value={draft.budgetSignal} onChange={(e) => setDraft({ ...draft, budgetSignal: e.target.value as LeadDraft["budgetSignal"] })} className={fieldClass}>
                <option value="unknown">Unknown</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
              </select>
            </Field>
            <Field label="Decision access">
              <select value={draft.authority} onChange={(e) => setDraft({ ...draft, authority: e.target.value as LeadDraft["authority"] })} className={fieldClass}>
                <option value="unknown">Unknown</option><option value="influencer">Influencer</option><option value="decision-maker">Decision-maker</option>
              </select>
            </Field>
            <Field label="Urgency">
              <select value={draft.urgency} onChange={(e) => setDraft({ ...draft, urgency: e.target.value as LeadDraft["urgency"] })} className={fieldClass}>
                <option value="unknown">Unknown</option><option value="exploring">Exploring</option><option value="this-month">This month</option><option value="urgent">Urgent</option>
              </select>
            </Field>
            <Field label="Observed need" wide>
              <textarea value={draft.need} maxLength={500} onChange={(e) => setDraft({ ...draft, need: e.target.value })} className={`${fieldClass} min-h-20`} placeholder="Specific, publicly observable problem—avoid assumptions." />
            </Field>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <Button type="button" size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="button" size="sm" onClick={addLead}>Save prospect</Button>
          </div>
        </div>
      ) : null}

      {leads.length ? (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {leads.map((lead) => {
            const service = services.find((item) => item.id === lead.serviceId);
            const fit = scoreLead(lead);
            const outreach = buildOutreachTemplate(lead, service?.label ?? "your service");
            return (
              <article key={lead.id} className="rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{lead.name}</h4>
                    <p className="mt-0.5 text-xs text-muted-foreground">{service?.label ?? "Service"} · {lead.city}</p>
                  </div>
                  <span className="rounded-full bg-primary/5 px-2 py-1 text-[11px] font-bold text-primary">{fit.score}/100 fit</span>
                </div>
                <p className="mt-2 text-xs text-foreground">{lead.need || "Need not documented yet."}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{fit.reasons.join(" · ")}</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Field label="Stage">
                    <select value={lead.stage} onChange={(e) => persist(leads.map((item) => item.id === lead.id ? { ...item, stage: e.target.value as ClientStage } : item))} className={fieldClass}>
                      {CLIENT_STAGES.map((stage) => <option key={stage} value={stage}>{stageLabels[stage]}</option>)}
                    </select>
                  </Field>
                  <Field label="Next action">
                    <input value={lead.nextAction} maxLength={200} onChange={(e) => persist(leads.map((item) => item.id === lead.id ? { ...item, nextAction: e.target.value } : item))} className={fieldClass} />
                  </Field>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={() => void navigator.clipboard.writeText(outreach).then(() => toast.success("Personalized outreach copied"))}>
                    <Copy className="h-4 w-4" /> Copy outreach
                  </Button>
                  <Button type="button" size="sm" variant="ghost" onClick={() => persist(leads.filter((item) => item.id !== lead.id))}>
                    <Trash className="h-4 w-4" /> Remove
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
          No prospects yet. Use the directories below to research a real business, then add only the details you need.
        </div>
      )}

      <div className="mt-4 flex gap-2 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
        Use public business contacts, honor opt-outs, personalize every message, and stop after one follow-up. Never scrape private data, mass-message, or promise results you cannot verify.
      </div>
    </Card>
  );
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={wide ? "sm:col-span-2" : ""}><span className="mb-1 block text-[11px] font-semibold text-muted-foreground">{label}</span>{children}</label>;
}
