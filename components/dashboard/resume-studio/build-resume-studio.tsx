"use client";

import { useResumeEditor } from "./hooks/use-resume-editor";
import { StudioHeader } from "./studio-header";
import { ResumeEditor } from "./resume-editor";
import { PreviewPanel } from "./preview-panel";
import { AiPromptBar } from "./ai-prompt-bar";
import type { MasterResume } from "@/types";

export function BuildResumeStudio({ initialMaster }: { initialMaster: MasterResume | null }) {
  const editor = useResumeEditor(initialMaster);

  return (
    <div className="-mx-5 -my-8 flex min-h-[calc(100vh-5.5rem)] flex-col lg:-mx-8 lg:-my-10">
      <StudioHeader
        resumeName={editor.resumeName}
        onResumeNameChange={editor.persistResumeName}
        template={editor.document.template}
        onTemplateChange={editor.setTemplate}
        onSave={() => editor.saveResume()}
        onDownload={() => void editor.downloadPdf()}
        saving={editor.loading.save}
        saveState={editor.saveState}
      />

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)] lg:grid-rows-1">
        <div className="relative flex min-h-0 flex-col border-r border-border bg-[#f7f4ee]">
          <div className="flex-1 overflow-y-auto px-4 py-5 lg:px-6">
            <ResumeEditor
              document={editor.document}
              onChange={(document) => editor.updateDocument(() => document)}
              onImproveSection={editor.improveSection}
              improvingSection={editor.improvingSection}
            />
          </div>
          <AiPromptBar
            value={editor.promptDraft}
            onChange={editor.setPromptDraft}
            suggestions={editor.promptSuggestions}
            onApply={() => editor.applyAiPrompt(editor.promptDraft)}
            loading={editor.loading.ai}
          />
        </div>

        <div className="min-h-[480px] lg:min-h-0">
          <PreviewPanel
            previewUrl={editor.previewUrl}
            zoom={editor.previewZoom}
            onZoomIn={() => editor.setPreviewZoom((value) => Math.min(140, value + 10))}
            onZoomOut={() => editor.setPreviewZoom((value) => Math.max(60, value - 10))}
            onFit={editor.fitPreview}
            onDownload={() => void editor.downloadPdf()}
            onSave={() => editor.saveResume()}
            loading={editor.loading.preview}
            saving={editor.loading.save}
          />
        </div>
      </div>
    </div>
  );
}
