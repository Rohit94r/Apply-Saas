"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Clipboard, Trash } from "@phosphor-icons/react";
import type { CoverLetterRecord } from "@/lib/data/cover-letters";

export function CoverLettersHistory({
  initialCoverLetters = []
}: {
  initialCoverLetters?: CoverLetterRecord[];
}) {
  const [items, setItems] = useState<CoverLetterRecord[]>(initialCoverLetters);

  async function remove(id: string) {
    if (!window.confirm("Delete this cover letter?")) return;
    try {
      const res = await fetch(`/api/cover-letter/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }
      setItems((prev) => prev.filter((row) => row.id !== id));
      toast.success("Deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  }

  function copy(text: string) {
    void navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white/50 px-6 py-8 text-center">
        <p className="text-sm leading-6 text-muted-foreground">
          No saved cover letters yet — generate one from Cover letter &amp; tools
          and it will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-border bg-[#fbfaf6] p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-foreground">
                {item.company} · {item.role}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {new Date(item.updatedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
                {item.tone ? ` · ${item.tone}` : ""}
              </p>
            </div>
            <div className="flex gap-1">
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-primary"
                onClick={() => copy(item.coverLetter)}
                aria-label="Copy cover letter"
              >
                <Clipboard className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-rose-700"
                onClick={() => void remove(item.id)}
                aria-label="Delete cover letter"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
          <pre className="mt-4 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-xl bg-white/70 p-4 text-sm leading-7 text-foreground">
            {item.coverLetter}
          </pre>
        </div>
      ))}
    </div>
  );
}
