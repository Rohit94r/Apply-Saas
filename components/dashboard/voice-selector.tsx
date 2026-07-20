"use client";

import { useState } from "react";
import Image from "next/image";
import { SpeakerHigh } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  INTERVIEW_PERSONAS,
  type InterviewPersona,
  personasByGender
} from "@/lib/ai/interview-personas";

type VoiceSelectorProps = {
  selectedId: string;
  onSelect: (persona: InterviewPersona) => void;
  onPreview?: (persona: InterviewPersona) => void;
  previewingId?: string | null;
  disabled?: boolean;
  className?: string;
};

export function VoiceSelector({
  selectedId,
  onSelect,
  onPreview,
  previewingId,
  disabled,
  className
}: VoiceSelectorProps) {
  const selected = INTERVIEW_PERSONAS.find((p) => p.id === selectedId);
  const [gender, setGender] = useState<"male" | "female">(
    selected?.gender ?? "male"
  );
  const voices = personasByGender(gender);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setGender("male")}
          className={cn(
            "rounded-xl border-2 px-3 py-3 text-sm font-semibold transition",
            gender === "male"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-white text-muted-foreground hover:border-primary/30"
          )}
        >
          Male interviewer
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setGender("female")}
          className={cn(
            "rounded-xl border-2 px-3 py-3 text-sm font-semibold transition",
            gender === "female"
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-white text-muted-foreground hover:border-accent/30"
          )}
        >
          Female interviewer
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {voices.map((voice) => {
          const isSelected = selectedId === voice.id;
          const isPreviewing = previewingId === voice.id;
          return (
            <button
              key={voice.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(voice)}
              className={cn(
                "flex gap-3 rounded-2xl border-2 p-3 text-left transition",
                isSelected
                  ? "border-accent bg-accent/5 shadow-sm"
                  : "border-border bg-white hover:border-primary/25"
              )}
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-md">
                <Image
                  src={voice.avatarSrc}
                  alt={voice.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-primary">{voice.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {voice.role}
                </p>
                {onPreview ? (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreview(voice);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        onPreview(voice);
                      }
                    }}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                  >
                    <SpeakerHigh className="h-3.5 w-3.5" weight="fill" />
                    {isPreviewing ? "Playing…" : "Preview voice"}
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
