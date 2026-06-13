"use client";

import {
  ArrowsIn,
  DownloadSimple,
  FloppyDisk,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  SpinnerGap
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function PreviewPanel({
  previewUrl,
  zoom,
  onZoomIn,
  onZoomOut,
  onFit,
  onDownload,
  onSave,
  loading,
  saving
}: {
  previewUrl: string | null;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
  onDownload: () => void;
  onSave: () => void;
  loading: boolean;
  saving: boolean;
}) {
  return (
    <aside className="flex h-full w-full flex-col bg-[#f7f4ee]">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-white px-4 py-3">
        <Button type="button" size="sm" variant="outline" onClick={onZoomOut}>
          <MagnifyingGlassMinus className="h-4 w-4" weight="regular" />
        </Button>
        <span className="inline-flex h-9 min-w-14 items-center justify-center rounded-lg border border-border px-2 text-xs font-semibold">
          {zoom}%
        </span>
        <Button type="button" size="sm" variant="outline" onClick={onZoomIn}>
          <MagnifyingGlassPlus className="h-4 w-4" weight="regular" />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onFit}>
          <ArrowsIn className="h-4 w-4" weight="regular" />
          Fit
        </Button>
        <div className="ml-auto flex gap-2">
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
            PDF
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="sticky top-0 mx-auto max-w-[520px]">
          {loading ? (
            <div className="flex min-h-[640px] items-center justify-center rounded-xl border border-border bg-white">
              <SpinnerGap className="h-8 w-8 animate-spin text-accent" weight="regular" />
            </div>
          ) : previewUrl ? (
            <div
              className="origin-top transition-transform"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <iframe
                title="Resume preview"
                src={previewUrl}
                className="h-[760px] w-full rounded-xl border border-border bg-white shadow-soft"
              />
            </div>
          ) : (
            <div className="flex min-h-[640px] items-center justify-center rounded-xl border border-dashed border-border bg-white text-sm text-muted-foreground">
              Preview updates as you edit
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
