"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ArrowRight, PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { JobApplicationRecord } from "@/lib/data/applications";
import type { ApplicationStatus } from "@/models/JobApplication";
import { cn } from "@/lib/utils";

const STATUSES: ApplicationStatus[] = [
  "applied",
  "interview",
  "offer",
  "rejected"
];

const statusStyles: Record<ApplicationStatus, string> = {
  applied: "bg-sky-50 text-sky-800",
  interview: "bg-amber-50 text-amber-900",
  offer: "bg-emerald-50 text-emerald-800",
  rejected: "bg-rose-50 text-rose-800"
};

const emptyForm = {
  company: "",
  role: "",
  status: "applied" as ApplicationStatus,
  location: "",
  notes: ""
};

export function ApplicationsTracker({
  initialApplications = []
}: {
  initialApplications?: JobApplicationRecord[];
}) {
  const [items, setItems] = useState<JobApplicationRecord[]>(initialApplications);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const companyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialApplications.length) return;
    void (async () => {
      try {
        const res = await fetch("/api/applications");
        if (!res.ok) return;
        const data = await res.json();
        setItems(data.applications ?? []);
      } catch {
        /* ignore */
      }
    })();
  }, [initialApplications.length]);

  function startEdit(item: JobApplicationRecord) {
    setEditingId(item.id);
    setForm({
      company: item.company,
      role: item.role,
      status: item.status,
      location: item.location,
      notes: item.notes
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function save() {
    if (!form.company.trim() || !form.role.trim()) {
      toast.error("Company and role are required");
      return;
    }
    setSaving(true);
    try {
      const url = editingId
        ? `/api/applications/${editingId}`
        : "/api/applications";
      const res = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setItems((prev) => {
        if (editingId) {
          return prev.map((row) =>
            row.id === editingId ? data.application : row
          );
        }
        return [data.application, ...prev];
      });
      resetForm();
      toast.success(editingId ? "Application updated" : "Application added");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this application?")) return;
    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }
      setItems((prev) => prev.filter((row) => row.id !== id));
      if (editingId === id) resetForm();
      toast.success("Deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  }

  const hasOffer = items.some((item) => item.status === "offer");

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-[#fbfaf6] px-5 py-4">
        <p className="text-sm text-muted-foreground">
          {hasOffer
            ? "You have an offer status — weigh CTC, location, and deadlines next."
            : "Got an offer letter? Compare CTC, location, and deadlines side by side."}
        </p>
        <Button asChild size="sm" variant="outline">
          <Link href="/dashboard/tools?tool=offers">
            Got an offer? Compare
            <ArrowRight className="h-4 w-4" weight="regular" />
          </Link>
        </Button>
      </div>

      {!items.length && !editingId ? (
        <div className="rounded-2xl border border-dashed border-border bg-white/50 px-6 py-8 text-center">
          <p className="text-sm leading-6 text-muted-foreground">
            You haven&apos;t tracked any applications yet — add the first company
            you applied to.
          </p>
          <Button
            className="mt-4"
            size="sm"
            onClick={() => companyInputRef.current?.focus()}
          >
            <Plus className="h-4 w-4" weight="regular" />
            Add your first application
          </Button>
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-[#fbfaf6] p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="font-serif text-2xl text-primary">
            {editingId ? "Edit application" : "Add application"}
          </h3>
          {editingId ? (
            <Button variant="ghost" size="sm" onClick={resetForm}>
              Cancel
            </Button>
          ) : null}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
          <select
            className="h-11 rounded-xl border border-input bg-white/70 px-4 text-sm outline-none focus:border-accent focus:ring-4 focus:ring-accent/10"
            value={form.status}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                status: e.target.value as ApplicationStatus
              }))
            }
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <Input
            placeholder="Location (optional)"
            value={form.location}
            onChange={(e) =>
              setForm((f) => ({ ...f, location: e.target.value }))
            }
          />
        </div>
        <Textarea
          className="mt-3 min-h-20"
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        />
        <Button className="mt-4" onClick={save} disabled={saving}>
          <Plus className="h-4 w-4" weight="regular" />
          {saving ? "Saving…" : editingId ? "Update" : "Add application"}
        </Button>
      </div>

      {items.length ? (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-[#fbfaf6] text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Company</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Updated</th>
                <th className="px-4 py-3 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border/70 last:border-0"
                >
                  <td className="px-4 py-3 font-semibold text-foreground">
                    {item.company}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{item.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-md px-2 py-1 text-xs font-semibold capitalize",
                        statusStyles[item.status]
                      )}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.location || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(item.updatedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short"
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-primary"
                        onClick={() => startEdit(item)}
                        aria-label="Edit"
                      >
                        <PencilSimple className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-rose-700"
                        onClick={() => void remove(item.id)}
                        aria-label="Delete"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
