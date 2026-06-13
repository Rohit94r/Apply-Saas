"use client";

import { useState } from "react";
import { CaretDown, CaretRight, Sparkle, SpinnerGap } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ResumeSectionId } from "@/lib/resume-studio/types";

export function SectionBlock({
  title,
  sectionId,
  children,
  onImprove,
  improving = false,
  defaultOpen = true
}: {
  title: string;
  sectionId: ResumeSectionId;
  children: React.ReactNode;
  onImprove?: (section: ResumeSectionId) => void;
  improving?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          {open ? (
            <CaretDown className="h-4 w-4 shrink-0 text-muted-foreground" weight="bold" />
          ) : (
            <CaretRight className="h-4 w-4 shrink-0 text-muted-foreground" weight="bold" />
          )}
          <span className="truncate text-sm font-semibold text-foreground">{title}</span>
        </button>
        {onImprove && sectionId !== "personal" ? (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 shrink-0 text-xs"
            disabled={improving}
            onClick={() => onImprove(sectionId)}
          >
            {improving ? (
              <SpinnerGap className="h-3.5 w-3.5 animate-spin" weight="regular" />
            ) : (
              <Sparkle className="h-3.5 w-3.5" weight="regular" />
            )}
            AI Improve
          </Button>
        ) : null}
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className={cn("border-t border-border")}
          >
            <div className="space-y-3 p-4">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
