"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  buildResumeFromDocument,
  createPreviewBlob,
  patchResume,
  refineResume,
  saveMasterResume
} from "@/lib/resume-studio/api";
import {
  mergeParsedDocument,
  masterResumeToDocument,
  parseResumeText,
  sectionImprovePrompt,
  sectionLabel,
  serializeResumeDocument
} from "@/lib/resume-studio/sections";
import type {
  EditorLoadingState,
  ResumeSectionId,
  ResumeStudioDocument,
  ResumeTemplateId
} from "@/lib/resume-studio/types";
import type { MasterResume } from "@/types";

const PROMPT_SUGGESTIONS = [
  "Make this resume one page.",
  "Improve project descriptions.",
  "Highlight React experience.",
  "Optimize bullet points.",
  "Make this ATS friendly."
] as const;

const RESUME_NAME_KEY = "apply-build-resume-name";
const MIN_SAVE_CHARS = 40;

function readResumeName(fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }

  return window.localStorage.getItem(RESUME_NAME_KEY)?.trim() || fallback;
}

export function useResumeEditor(initialMaster: MasterResume | null) {
  const router = useRouter();
  const [resumeName, setResumeName] = useState("My Resume");
  const [document, setDocument] = useState<ResumeStudioDocument>(() =>
    masterResumeToDocument(initialMaster)
  );
  const [resumeId, setResumeId] = useState<string | undefined>();
  const [promptDraft, setPromptDraft] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewZoom, setPreviewZoom] = useState(100);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [loading, setLoading] = useState<EditorLoadingState>({
    save: false,
    preview: false,
    ai: false
  });
  const [improvingSection, setImprovingSection] = useState<ResumeSectionId | null>(null);

  const previewUrlRef = useRef<string | null>(null);
  const previewRequestRef = useRef(0);
  const draftSaveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setResumeName(readResumeName(document.personal.targetRole.trim() || "My Resume"));
  }, [document.personal.targetRole]);

  const refreshPreview = useCallback(async (doc: ResumeStudioDocument) => {
    const requestId = previewRequestRef.current + 1;
    previewRequestRef.current = requestId;
    setLoading((state) => ({ ...state, preview: true }));

    try {
      const blobUrl = await createPreviewBlob(doc);

      if (previewRequestRef.current !== requestId) {
        URL.revokeObjectURL(blobUrl);
        return;
      }

      if (previewUrlRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrlRef.current);
      }

      previewUrlRef.current = blobUrl;
      setPreviewUrl(blobUrl);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Preview failed");
    } finally {
      if (previewRequestRef.current === requestId) {
        setLoading((state) => ({ ...state, preview: false }));
      }
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refreshPreview(document);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [document, refreshPreview]);

  useEffect(
    () => () => {
      if (previewUrlRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    },
    []
  );

  const persistResumeName = useCallback((name: string) => {
    setResumeName(name);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(RESUME_NAME_KEY, name);
    }
  }, []);

  const saveDraftToMaster = useCallback(async () => {
    const rawText = serializeResumeDocument(document);

    if (rawText.length < MIN_SAVE_CHARS) {
      return;
    }

    try {
      await saveMasterResume({ title: resumeName, rawText });
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1500);
    } catch {
      // Draft save is silent
    }
  }, [document, resumeName]);

  useEffect(() => {
    if (draftSaveTimerRef.current) {
      window.clearTimeout(draftSaveTimerRef.current);
    }

    draftSaveTimerRef.current = window.setTimeout(() => {
      void saveDraftToMaster();
    }, 2000);

    return () => {
      if (draftSaveTimerRef.current) {
        window.clearTimeout(draftSaveTimerRef.current);
      }
    };
  }, [document, resumeName, saveDraftToMaster]);

  const ensureResumeId = useCallback(async () => {
    if (resumeId) {
      await patchResume(resumeId, document);
      return resumeId;
    }

    const { resume } = await buildResumeFromDocument(document);
    await patchResume(resume.id, document, resume.atsScore);
    setResumeId(resume.id);
    return resume.id;
  }, [document, resumeId]);

  const saveResume = useCallback(
    async ({ silent = false }: { silent?: boolean } = {}) => {
      const rawText = serializeResumeDocument(document);

      if (rawText.length < MIN_SAVE_CHARS) {
        if (!silent) {
          toast.error("Add your name and at least one section before saving");
        }
        return;
      }

      setLoading((state) => ({ ...state, save: true }));
      setSaveState("saving");

      try {
        await saveMasterResume({ title: resumeName, rawText });
        const id = await ensureResumeId();

        setResumeId(id);
        setSaveState("saved");

        if (!silent) {
          toast.success("Resume saved");
        }

        window.setTimeout(() => setSaveState("idle"), 2000);
      } catch (error) {
        setSaveState("idle");
        const message = error instanceof Error ? error.message : "Save failed";
        if (message.includes("credits") || message.includes("Upgrade")) {
          router.push("/dashboard/upgrade");
        }
        if (!silent) {
          toast.error(message);
        }
      } finally {
        setLoading((state) => ({ ...state, save: false }));
      }
    },
    [document, ensureResumeId, resumeName, router]
  );

  const applyAiPrompt = useCallback(
    async (prompt: string) => {
      if (prompt.trim().length < 8) {
        toast.error("Add a short instruction for AI");
        return;
      }

      setLoading((state) => ({ ...state, ai: true }));

      try {
        const id = await ensureResumeId();
        const { resume } = await refineResume({ resumeId: id, prompt: prompt.trim() });
        const refinedText =
          resume.generatedContent.afterText?.trim() ||
          resume.generatedContent.beforeText?.trim() ||
          "";
        const merged = refinedText
          ? mergeParsedDocument(document, parseResumeText(refinedText))
          : document;

        setDocument(merged);
        setResumeId(resume.id);
        await patchResume(resume.id, merged, resume.atsScore);
        toast.success("AI changes applied");
        setPromptDraft("");
      } catch (error) {
        const message = error instanceof Error ? error.message : "AI update failed";
        if (message.includes("credits") || message.includes("Upgrade")) {
          router.push("/dashboard/upgrade");
        }
        toast.error(message);
      } finally {
        setLoading((state) => ({ ...state, ai: false }));
        setImprovingSection(null);
      }
    },
    [document, ensureResumeId, router]
  );

  const improveSection = useCallback(
    async (section: ResumeSectionId) => {
      setImprovingSection(section);
      await applyAiPrompt(sectionImprovePrompt(section));
    },
    [applyAiPrompt]
  );

  const setTemplate = useCallback((template: ResumeTemplateId) => {
    setDocument((current) => ({ ...current, template }));
  }, []);

  const updateDocument = useCallback(
    (updater: (current: ResumeStudioDocument) => ResumeStudioDocument) => {
      setDocument(updater);
    },
    []
  );

  const downloadPdf = useCallback(async () => {
    try {
      setLoading((state) => ({ ...state, preview: true }));
      const blobUrl = await createPreviewBlob(document);
      const link = window.document.createElement("a");
      link.href = blobUrl;
      link.download = `${resumeName.replace(/\s+/g, "-").toLowerCase() || "resume"}.pdf`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Download failed");
    } finally {
      setLoading((state) => ({ ...state, preview: false }));
    }
  }, [document, resumeName]);

  const fitPreview = useCallback(() => setPreviewZoom(100), []);

  return {
    resumeName,
    persistResumeName,
    document,
    updateDocument,
    resumeId,
    promptDraft,
    setPromptDraft,
    promptSuggestions: PROMPT_SUGGESTIONS,
    previewUrl,
    previewZoom,
    setPreviewZoom,
    fitPreview,
    loading,
    saveState,
    improvingSection,
    setTemplate,
    saveResume,
    downloadPdf,
    applyAiPrompt,
    improveSection,
    sectionLabel
  };
}
