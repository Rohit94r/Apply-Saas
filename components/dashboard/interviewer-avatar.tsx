"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { InterviewPersona } from "@/lib/ai/interview-personas";

type InterviewerAvatarProps = {
  persona: InterviewPersona;
  statusLabel?: string;
  speaking?: boolean;
  className?: string;
  size?: "md" | "lg";
};

export function InterviewerAvatar({
  persona,
  statusLabel,
  speaking,
  className,
  size = "lg"
}: InterviewerAvatarProps) {
  const reduceMotion = useReducedMotion();
  const isSpeaking = Boolean(speaking);
  const dim =
    size === "lg"
      ? "h-40 w-40 sm:h-52 sm:w-52"
      : "h-28 w-28 sm:h-32 sm:w-32";

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div className={cn("relative", dim)}>
        {isSpeaking && !reduceMotion ? (
          <>
            <motion.span
              className="absolute inset-0 rounded-full bg-accent/25"
              animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.15, 0.45] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute -inset-2 rounded-full border-2 border-accent/40"
              animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0.2, 0.7] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : null}
        <div
          className={cn(
            "relative h-full w-full overflow-hidden rounded-full shadow-lg ring-4 ring-white",
            isSpeaking && "ring-accent/50"
          )}
        >
          <Image
            src={persona.avatarSrc}
            alt={`${persona.name}, ${persona.role}`}
            fill
            sizes={size === "lg" ? "208px" : "128px"}
            className="object-cover"
            priority
          />
        </div>
      </div>

      {isSpeaking ? (
        <div className="mt-4 flex items-end gap-1" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-accent"
              animate={
                reduceMotion
                  ? { height: 12 }
                  : { height: [8, 18 + (i % 3) * 6, 8] }
              }
              transition={{
                duration: 0.55,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut"
              }}
              style={{ height: 10 }}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-xs font-medium text-muted-foreground">
          {statusLabel ?? "Ready"}
        </p>
      )}
    </div>
  );
}
