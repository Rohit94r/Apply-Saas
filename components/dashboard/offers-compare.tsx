"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { OfferRecord } from "@/lib/data/offers";
import { cn } from "@/lib/utils";

const emptyForm = {
  company: "",
  role: "",
  ctc: "",
  location: "",
  deadline: "",
  notes: ""
};

export function OffersCompare({
  initialOffers = []
}: {
  initialOffers?: OfferRecord[];
}) {
  const [offers, setOffers] = useState<OfferRecord[]>(initialOffers);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const companyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialOffers.length) return;
    void (async () => {
      try {
        const res = await fetch("/api/offers");
        if (!res.ok) return;
        const data = await res.json();
        setOffers(data.offers ?? []);
      } catch {
        /* ignore */
      }
    })();
  }, [initialOffers.length]);

  const compareRows = useMemo(
    () => offers.filter((o) => selected.includes(o.id)).slice(0, 3),
    [offers, selected]
  );

  function toggleSelect(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) {
        toast.message("Compare up to 3 offers at a time");
        return prev;
      }
      return [...prev, id];
    });
  }

  async function save() {
    if (!form.company.trim() || !form.role.trim() || !form.ctc.trim()) {
      toast.error("Company, role, and CTC are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setOffers((prev) => [data.offer, ...prev]);
      setForm(emptyForm);
      toast.success("Offer added");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this offer?")) return;
    try {
      const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }
      setOffers((prev) => prev.filter((o) => o.id !== id));
      setSelected((prev) => prev.filter((x) => x !== id));
      toast.success("Deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-8">
      {!offers.length ? (
        <div className="rounded-2xl border border-dashed border-border bg-white/50 px-6 py-8 text-center">
          <p className="text-sm leading-6 text-muted-foreground">
            No offers yet — add one when you get an offer letter so you can
            compare CTC and deadlines.
          </p>
          <Button
            className="mt-4"
            size="sm"
            onClick={() => companyInputRef.current?.focus()}
          >
            <Plus className="h-4 w-4" />
            Add your first offer
          </Button>
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-[#fbfaf6] p-5 sm:p-6">
        <h3 className="font-serif text-2xl text-primary">Add an offer</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Save CTC, location, and deadline — then compare side by side.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            ref={companyInputRef}
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          />
          <Input
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          />
          <Input
            placeholder="CTC (e.g. 12 LPA)"
            value={form.ctc}
            onChange={(e) => setForm((f) => ({ ...f, ctc: e.target.value }))}
          />
          <Input
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm((f) => ({ ...f, location: e.target.value }))
            }
          />
          <Input
            placeholder="Deadline"
            value={form.deadline}
            onChange={(e) =>
              setForm((f) => ({ ...f, deadline: e.target.value }))
            }
          />
        </div>
        <Textarea
          className="mt-3 min-h-20"
          placeholder="Notes (joining bonus, bond, shifts…)"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        />
        <Button className="mt-4" onClick={save} disabled={saving}>
          <Plus className="h-4 w-4" />
          {saving ? "Saving…" : "Add offer"}
        </Button>
      </div>

      {offers.length >= 2 && compareRows.length < 2 ? (
        <p className="text-sm text-muted-foreground">
          Select 2–3 offers below to compare them side by side.
        </p>
      ) : null}

      {compareRows.length >= 2 ? (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <p className="border-b border-border bg-[#fbfaf6] px-4 py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Side-by-side compare
          </p>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Field
                </th>
                {compareRows.map((offer) => (
                  <th
                    key={offer.id}
                    className="px-4 py-3 text-left font-serif text-xl text-primary"
                  >
                    {offer.company}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Role", "role"],
                  ["CTC", "ctc"],
                  ["Location", "location"],
                  ["Deadline", "deadline"],
                  ["Notes", "notes"]
                ] as const
              ).map(([label, key]) => (
                <tr key={key} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </td>
                  {compareRows.map((offer) => (
                    <td
                      key={offer.id}
                      className="max-w-xs px-4 py-3 text-foreground"
                    >
                      {offer[key] || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {offers.length ? (
        <ul className="space-y-2">
          {offers.map((offer) => {
            const isSelected = selected.includes(offer.id);
            return (
              <li
                key={offer.id}
                className={cn(
                  "flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 transition",
                  isSelected
                    ? "border-accent/40 bg-accent/[0.06]"
                    : "border-border bg-white/60"
                )}
              >
                <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={isSelected}
                    onChange={() => toggleSelect(offer.id)}
                  />
                  <span className="min-w-0">
                    <span className="block font-semibold text-foreground">
                      {offer.company} · {offer.role}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {offer.ctc}
                      {offer.location ? ` · ${offer.location}` : ""}
                      {offer.deadline ? ` · deadline ${offer.deadline}` : ""}
                    </span>
                  </span>
                </label>
                <button
                  type="button"
                  className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-rose-700"
                  onClick={() => void remove(offer.id)}
                  aria-label="Delete offer"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
