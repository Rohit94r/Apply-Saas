"use client";

import { motion } from "framer-motion";
import { CheckCircle, FileText, Sparkle } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const keywords = ["React", "TypeScript", "ATS", "APIs"];

function ResumeMiniCard({
  title,
  label,
  className,
  optimized = false
}: {
  title: string;
  label: string;
  className?: string;
  optimized?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "relative w-full max-w-[230px] rounded-2xl border border-border bg-white p-4 shadow-soft",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0b45d]/30 text-primary">
          {optimized ? (
            <Sparkle className="h-5 w-5" weight="regular" />
          ) : (
            <FileText className="h-5 w-5" weight="regular" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2 rounded-full bg-border" />
        <div className="h-2 w-4/5 rounded-full bg-border" />
        <div className="h-2 w-3/5 rounded-full bg-border" />
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <p className="mb-2 text-[0.67rem] font-bold uppercase tracking-[0.22em] text-accent">
          {optimized ? "Matched skills" : "Profile"}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(optimized ? keywords : ["Projects", "Skills", "Education"]).map((item) => (
            <span
              key={item}
              className="rounded-md bg-accent/10 px-2 py-1 text-[0.68rem] font-semibold text-accent"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      {optimized ? (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
          <CheckCircle className="h-3.5 w-3.5" weight="regular" />
          ATS 94%
        </div>
      ) : null}
    </motion.div>
  );
}

export function ResumeFlow() {
  return (
    <div className="relative mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-[#f9f6ef]/90 px-5 py-10 shadow-soft sm:px-8 lg:mt-16">
      <div className="paper-grid absolute inset-0 opacity-70" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_0.74fr_1.05fr]">
        <div>
          <p className="fine-label mb-3">Master Resume</p>
          <ResumeMiniCard title="Aarav Mehta" label="Computer Science student" />
        </div>
        <div className="relative flex min-h-36 items-center justify-center">
          <motion.div
            className="absolute left-0 right-0 top-1/2 hidden h-px bg-primary/20 lg:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            className="relative rounded-2xl border border-border bg-white p-4 shadow-soft"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.22em] text-primary">
              Job description
            </p>
            <p className="max-w-40 text-sm font-semibold leading-5">
              Frontend Intern, product dashboard team
            </p>
            <div className="mt-4 space-y-2">
              <div className="h-1.5 rounded-full bg-border" />
              <div className="h-1.5 w-11/12 rounded-full bg-border" />
              <div className="h-1.5 w-8/12 rounded-full bg-border" />
            </div>
          </motion.div>
        </div>
        <div>
          <p className="fine-label mb-3">Tailored Resume</p>
          <ResumeMiniCard
            optimized
            title="Aarav Mehta"
            label="Frontend Engineer Intern"
            className="ml-auto"
          />
        </div>
      </div>
      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <Badge>Keyword match +38%</Badge>
        <Badge>One-page PDF</Badge>
        <Badge>Ready in 28 sec</Badge>
      </div>
    </div>
  );
}
