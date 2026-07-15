"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";

export type RobotMood =
  | "idle"
  | "speaking"
  | "listening"
  | "recording"
  | "thinking"
  | "transcribing"
  | "coaching";

type MockInterviewRobotProps = {
  mood: RobotMood;
  className?: string;
  size?: "sm" | "md" | "lg";
};

/**
 * Apply Interviewer — CSS/SVG robot with Framer Motion.
 * Teal + coral accents; idle breathing, talk, listen, think poses.
 */
export function MockInterviewRobot({
  mood,
  className,
  size = "lg"
}: MockInterviewRobotProps) {
  const [blink, setBlink] = useState(false);
  const [glance, setGlance] = useState(0);
  const armControls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const scheduleBlink = () => {
      const delay = 2200 + Math.random() * 3200;
      timer = window.setTimeout(() => {
        if (cancelled) return;
        setBlink(true);
        window.setTimeout(() => {
          if (!cancelled) setBlink(false);
          scheduleBlink();
        }, 120 + Math.random() * 80);
      }, delay);
    };

    scheduleBlink();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const scheduleGlance = () => {
      const delay = 4000 + Math.random() * 5000;
      timer = window.setTimeout(() => {
        if (cancelled) return;
        if (mood === "speaking" || mood === "thinking") {
          scheduleGlance();
          return;
        }
        setGlance(Math.random() > 0.5 ? 1 : -1);
        window.setTimeout(() => {
          if (!cancelled) setGlance(0);
          scheduleGlance();
        }, 700 + Math.random() * 400);
      }, delay);
    };

    scheduleGlance();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [mood]);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const scheduleNudge = () => {
      const delay = 5500 + Math.random() * 6000;
      timer = window.setTimeout(() => {
        if (cancelled) return;
        void armControls.start({
          rotate: [0, -8, 4, 0],
          transition: { duration: 0.9, ease: "easeInOut" }
        });
        window.setTimeout(() => {
          if (!cancelled) scheduleNudge();
        }, 1000);
      }, delay);
    };

    scheduleNudge();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [armControls]);

  const dim =
    size === "sm" ? "h-28 w-28" : size === "md" ? "h-44 w-44" : "h-56 w-56 sm:h-64 sm:w-64";

  const bodyFloat =
    mood === "speaking"
      ? { y: [0, -3, 1, -2, 0], rotate: [0, 1.2, -0.8, 1, 0] }
      : mood === "recording" || mood === "listening"
        ? { y: [0, -2, 0], rotate: [0, -0.6, 0.4, 0] }
        : mood === "thinking" || mood === "transcribing"
          ? { y: [0, -4, 0], rotate: [0, -2, -1.5, 0] }
          : { y: [0, -5, 0], rotate: [0, 0.8, -0.6, 0] };

  const breathDuration =
    mood === "speaking"
      ? 0.55
      : mood === "recording"
        ? 1.4
        : mood === "thinking" || mood === "transcribing"
          ? 2.2
          : 3.4;

  const mouthOpen = mood === "speaking";
  const eyeLookX = glance * 2.2;
  const attentive = mood === "recording" || mood === "listening";
  const thinking = mood === "thinking" || mood === "transcribing";

  return (
    <div
      className={cn("relative flex items-center justify-center", dim, className)}
      aria-hidden
    >
      {/* Soft ambient glow — teal, not purple */}
      <motion.div
        className="pointer-events-none absolute inset-[-12%] rounded-full bg-[radial-gradient(circle,rgba(127,217,199,0.28),transparent_68%)]"
        animate={{
          opacity:
            mood === "speaking"
              ? [0.45, 0.85, 0.45]
              : mood === "recording"
                ? [0.4, 0.7, 0.4]
                : [0.3, 0.5, 0.3],
          scale: mood === "recording" ? [1, 1.06, 1] : [1, 1.03, 1]
        }}
        transition={{
          duration: mood === "speaking" ? 0.7 : mood === "recording" ? 1.3 : 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {mood === "recording" ? (
        <motion.div
          className="pointer-events-none absolute inset-[-6%] rounded-full border border-[#ffb4a8]/45"
          animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.15, 0.55] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <motion.div
        className="relative h-full w-full"
        animate={bodyFloat}
        transition={{
          duration: breathDuration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg
          viewBox="0 0 200 220"
          className="h-full w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="robotShell" x1="40" y1="20" x2="160" y2="200">
              <stop offset="0%" stopColor="#1a4a5c" />
              <stop offset="45%" stopColor="#163d4e" />
              <stop offset="100%" stopColor="#0f2f3c" />
            </linearGradient>
            <linearGradient id="robotFace" x1="70" y1="55" x2="130" y2="120">
              <stop offset="0%" stopColor="#0d2430" />
              <stop offset="100%" stopColor="#0a1c26" />
            </linearGradient>
            <linearGradient id="robotChest" x1="80" y1="140" x2="120" y2="190">
              <stop offset="0%" stopColor="#14504a" />
              <stop offset="100%" stopColor="#0d3a38" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Antenna */}
          <motion.g
            animate={
              mood === "thinking" || mood === "transcribing"
                ? { y: [0, -3, 0] }
                : { y: [0, -1.5, 0] }
            }
            transition={{ duration: thinking ? 1.2 : 2.8, repeat: Infinity }}
          >
            <line
              x1="100"
              y1="28"
              x2="100"
              y2="44"
              stroke="#7fd9c7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <motion.circle
              cx="100"
              cy="22"
              r="6"
              fill="#7fd9c7"
              animate={
                mood === "speaking"
                  ? { opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] }
                  : mood === "recording"
                    ? { fill: ["#ffb4a8", "#ff8f7a", "#ffb4a8"] }
                    : { opacity: [0.7, 1, 0.7] }
              }
              transition={{ duration: 1.1, repeat: Infinity }}
            />
          </motion.g>

          {/* Head */}
          <motion.g
            animate={
              mood === "speaking"
                ? { y: [0, 1.5, 0, 1, 0] }
                : thinking
                  ? { rotate: [-3, -5, -3], x: [-2, -3, -2] }
                  : { rotate: glance * 2 }
            }
            transition={
              mood === "speaking"
                ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" }
                : thinking
                  ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.5 }
            }
            style={{ transformOrigin: "100px 90px" }}
          >
            <rect
              x="58"
              y="44"
              width="84"
              height="72"
              rx="22"
              fill="url(#robotShell)"
              stroke="rgba(127,217,199,0.35)"
              strokeWidth="1.5"
            />
            {/* Ear pods */}
            <rect x="48" y="68" width="10" height="24" rx="5" fill="#1e5568" />
            <rect x="142" y="68" width="10" height="24" rx="5" fill="#1e5568" />

            {/* Face plate */}
            <rect
              x="70"
              y="56"
              width="60"
              height="48"
              rx="16"
              fill="url(#robotFace)"
            />

            {/* Eyes */}
            <g>
              <ellipse
                cx={88 + eyeLookX}
                cy="78"
                rx="7"
                ry={blink ? 1.2 : 8}
                fill="#7fd9c7"
                filter="url(#softGlow)"
              />
              <ellipse
                cx={112 + eyeLookX}
                cy="78"
                rx="7"
                ry={blink ? 1.2 : 8}
                fill="#7fd9c7"
                filter="url(#softGlow)"
              />
              {!blink ? (
                <>
                  <circle cx={90 + eyeLookX} cy="76" r="2.2" fill="#0a1c26" />
                  <circle cx={114 + eyeLookX} cy="76" r="2.2" fill="#0a1c26" />
                  <circle
                    cx={86.5 + eyeLookX}
                    cy="74.5"
                    r="1.1"
                    fill="rgba(255,255,255,0.65)"
                  />
                  <circle
                    cx={110.5 + eyeLookX}
                    cy="74.5"
                    r="1.1"
                    fill="rgba(255,255,255,0.65)"
                  />
                </>
              ) : null}
            </g>

            {/* Brows — tilt when thinking / attentive */}
            <motion.path
              d={
                thinking
                  ? "M78 66 Q88 62 96 66"
                  : attentive
                    ? "M78 64 Q88 62 96 65"
                    : "M78 66 Q88 64 96 66"
              }
              stroke="#5fb8a8"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <motion.path
              d={
                thinking
                  ? "M104 66 Q112 60 122 65"
                  : attentive
                    ? "M104 65 Q112 62 122 64"
                    : "M104 66 Q112 64 122 66"
              }
              stroke="#5fb8a8"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Mouth */}
            {mouthOpen ? (
              <motion.ellipse
                cx="100"
                cy="98"
                rx="10"
                fill="#0a1c26"
                stroke="#ffb4a8"
                strokeWidth="1.5"
                animate={{ ry: [2.5, 7, 3, 8, 2.8, 6, 3.5] }}
                transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : mood === "coaching" ? (
              <path
                d="M90 96 Q100 104 110 96"
                stroke="#7fd9c7"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            ) : thinking ? (
              <ellipse cx="100" cy="98" rx="5" ry="2.5" fill="#3d6a78" />
            ) : (
              <path
                d="M88 97 Q100 101 112 97"
                stroke="#5a8a96"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </motion.g>

          {/* Neck */}
          <rect x="92" y="114" width="16" height="14" rx="4" fill="#1a4a5c" />

          {/* Torso */}
          <motion.g
            animate={{
              scaleY: mood === "speaking" ? [1, 1.02, 1, 1.015, 1] : [1, 1.025, 1]
            }}
            transition={{
              duration: breathDuration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "100px 160px" }}
          >
            <rect
              x="62"
              y="126"
              width="76"
              height="70"
              rx="20"
              fill="url(#robotShell)"
              stroke="rgba(127,217,199,0.25)"
              strokeWidth="1.5"
            />
            <rect
              x="78"
              y="140"
              width="44"
              height="36"
              rx="12"
              fill="url(#robotChest)"
            />
            {/* Chest status light */}
            <motion.circle
              cx="100"
              cy="158"
              r="6"
              fill={
                mood === "recording"
                  ? "#ffb4a8"
                  : mood === "speaking"
                    ? "#7fd9c7"
                    : "#4a9e90"
              }
              animate={
                mood === "speaking" || mood === "recording"
                  ? { opacity: [0.55, 1, 0.55], scale: [1, 1.2, 1] }
                  : { opacity: [0.5, 0.85, 0.5] }
              }
              transition={{
                duration: mood === "speaking" ? 0.6 : 1.8,
                repeat: Infinity
              }}
            />
            {/* Soft coral accent line */}
            <path
              d="M84 178 H116"
              stroke="rgba(255,180,168,0.35)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Left arm */}
          <motion.g
            animate={armControls}
            style={{ transformOrigin: "62px 140px" }}
          >
            <motion.g
              animate={
                thinking
                  ? { rotate: [-25, -35, -25], x: [-2, 0, -2], y: [-8, -12, -8] }
                  : mood === "speaking"
                    ? { rotate: [0, 12, -6, 10, 0] }
                    : attentive
                      ? { rotate: [0, -6, 0] }
                      : { rotate: [0, -3, 2, 0] }
              }
              transition={{
                duration: thinking ? 2 : mood === "speaking" ? 0.7 : 3.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: "62px 140px" }}
            >
              <rect
                x="40"
                y="134"
                width="18"
                height="48"
                rx="9"
                fill="#1a4a5c"
                stroke="rgba(127,217,199,0.2)"
              />
              <circle cx="49" cy="186" r="9" fill="#245869" />
              {thinking ? (
                <motion.circle
                  cx="36"
                  cy="118"
                  r="3"
                  fill="#7fd9c7"
                  animate={{ opacity: [0, 1, 0], y: [0, -6, -12] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              ) : null}
            </motion.g>
          </motion.g>

          {/* Right arm */}
          <motion.g
            animate={
              mood === "speaking"
                ? { rotate: [0, -10, 8, -6, 0] }
                : attentive
                  ? { rotate: [0, 5, 0] }
                  : { rotate: [0, 3, -2, 0] }
            }
            transition={{
              duration: mood === "speaking" ? 0.65 : 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.12
            }}
            style={{ transformOrigin: "138px 140px" }}
          >
            <rect
              x="142"
              y="134"
              width="18"
              height="48"
              rx="9"
              fill="#1a4a5c"
              stroke="rgba(127,217,199,0.2)"
            />
            <circle cx="151" cy="186" r="9" fill="#245869" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
