/**
 * Landing + dashboard product roadmap copy.
 * Edit here — UI components import from `@/content/landing`.
 *
 * Phase 1 = live features (improving quality now)
 * Phase 2 = new surfaces (desktop, tracker, Stripe…) — Coming soon
 */

export type ProductFeatureStatus = "live" | "improving" | "coming-soon";

export type ProductFeature = {
  id: string;
  name: string;
  summary: string;
  href?: string;
  status: ProductFeatureStatus;
  badge?: string;
};

/** Phase 1 — already in the product (Section 1 of built-features-phase-two.md). */
export const phaseOneFeatures: ProductFeature[] = [
  {
    id: "tailor",
    name: "AI Resume Builder",
    summary:
      "Upload once, paste a job description, steer with prompts, and export an ATS-ready PDF.",
    href: "/dashboard/generate",
    status: "improving",
    badge: "Live · improving"
  },
  {
    id: "jobs",
    name: "Job search",
    summary:
      "Match openings to your resume — internships, full-time, and contract — with live market feeds.",
    href: "/dashboard/jobs",
    status: "live",
    badge: "Live"
  },
  {
    id: "interview",
    name: "Interview prep",
    summary:
      "Role-aware guides, company context, and practice questions from the same tailored resume.",
    href: "/dashboard/interview",
    status: "improving",
    badge: "Live · improving"
  },
  {
    id: "tools",
    name: "AI tools",
    summary:
      "Cover letters, resume critique, and photo guidance without leaving your application flow.",
    href: "/dashboard/tools",
    status: "live",
    badge: "Live"
  },
  {
    id: "freelance",
    name: "Freelancing",
    summary:
      "Find client work in your city while you learn — service lanes for students and early freelancers.",
    href: "/dashboard/freelancing",
    status: "live",
    badge: "Live"
  },
  {
    id: "learners",
    name: "Learner prep",
    summary:
      "Roadmaps and curated learning tracks so you close skill gaps before the next interview.",
    href: "/dashboard/learners",
    status: "live",
    badge: "Live"
  }
];

/** Phase 2 — new product features (Section 2A). Frontend only until built. */
export const phaseTwoFeatures: ProductFeature[] = [
  {
    id: "desktop",
    name: "Interview Copilot (Desktop)",
    summary:
      "Windows + macOS overlay for practice interviews — mic, transcription, and AI answers synced to your Apply account.",
    href: "/#coming-soon",
    status: "coming-soon",
    badge: "Coming soon"
  },
  {
    id: "downloads",
    name: "Desktop downloads",
    summary:
      "One place to download Apply Desktop, see version notes, and system requirements.",
    href: "/#coming-soon",
    status: "coming-soon",
    badge: "Coming soon"
  },
  {
    id: "mock",
    name: "Mock interview room",
    summary:
      "Timed practice with an AI interviewer inside the web app — warm-up before the real call.",
    href: "/#coming-soon",
    status: "coming-soon",
    badge: "Coming soon"
  },
  {
    id: "tracker",
    name: "Application tracker",
    summary:
      "Track every job — status, notes, and reminders — from first tailor to offer.",
    href: "/#coming-soon",
    status: "coming-soon",
    badge: "Coming soon"
  },
  {
    id: "stripe",
    name: "Instant Pro billing",
    summary:
      "Stripe checkout for Pro and Premium, with UPI still available for India users.",
    href: "/#coming-soon",
    status: "coming-soon",
    badge: "Coming soon"
  },
  {
    id: "affiliate",
    name: "Affiliate program",
    summary:
      "Share Apply, earn referral rewards when students and job seekers upgrade.",
    href: "/#coming-soon",
    status: "coming-soon",
    badge: "Coming soon"
  }
];

export const phaseCopy = {
  liveEyebrow: "Phase 1 · Live now",
  liveTitle: "Everything you need to apply — already in your dashboard.",
  liveDescription:
    "We are upgrading AI quality, PDF fidelity, and job matching first. These tools are live today while we harden them.",
  soonEyebrow: "Phase 2 · Coming soon",
  soonTitle: "Desktop Interview Copilot and more — on the roadmap.",
  soonDescription:
    "After Phase 1 quality exits, we ship Apply Desktop, mock interviews, application tracking, and automated billing. Same account. New surfaces.",
  desktopHighlight: {
    eyebrow: "Apply Desktop",
    title: "Practice interviews with a private overlay.",
    description:
      "A downloadable Windows and macOS app that syncs your master resume and job context — built for mock and practice sessions, not a screen-share stunt.",
    cta: "Notify me when it launches",
    note: "Compliance-first: marketed for practice and mock interviews."
  }
} as const;
