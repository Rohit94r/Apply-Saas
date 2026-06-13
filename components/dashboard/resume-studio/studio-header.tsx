"use client";

import { DownloadSimple, FloppyDisk, SpinnerGap } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ResumeTemplateId } from "@/lib/resume-studio/types";

const templates: Array<{ id: ResumeTemplateId; label: string }> = [
  { id: "classic", label: "Classic ATS" },
  { id: "modern", label: "Modern" },
  { id: "compact", label: "Compact" }
];

export function StudioHeader({
  resumeName,
  onResumeNameChange,
  template,
  onTemplateChange,
  onSave,
  onDownload,
  saving,
  saveState
}: {
  resumeName: string;
  onResumeNameChange: (value: string) => void;
  template: ResumeTemplateId;
  onTemplateChange: (template: ResumeTemplateId) => void;
  onSave: () => void;
  onDownload: () => void;
  saving: boolean;
  saveState: "idle" | "saving" | "saved";
}) {
  return (
    <header className="border-b border-border bg-white px-4 py-4 lg:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="fine-label mb-1">Resume name</p>
          <Input
            value={resumeName}
            onChange={(event) => onResumeNameChange(event.target.value)}
            className="max-w-md border-0 bg-transparent px-0 text-xl font-semibold shadow-none focus-visible:ring-0"
            placeholder="Frontend Resume"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-border bg-[#fbfaf6] p-1">
            {templates.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onTemplateChange(item.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  template === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <span className="hidden text-xs text-muted-foreground sm:inline">
            {saveState === "saving" ? "Saving..." : saveState === "saved" ? "Saved" : "Auto-save on"}
          </span>

          <Button type="button" size="sm" variant="outline" disabled={saving} onClick={onSave}>
            {saving ? (
              <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
            ) : (
              <FloppyDisk className="h-4 w-4" weight="regular" />
            )}
            Save
          </Button>
          <Button type="button" size="sm" onClick={onDownload}>
            <DownloadSimple className="h-4 w-4" weight="regular" />
            Download PDF
          </Button>
        </div>
      </div>
    </header>
  );
}
