/**
 * Landing + dashboard product roadmap copy.
 * Edit here — UI components import from `@/content/landing`.
 *
 * Live web toolkit = phaseOneFeatures (top-level surfaces only).
 * Cover letter + offer compare nest under AI tools / Applications.
 * Coming soon = Desktop only (+ Stripe / referrals later)
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

/** Live web tools — top-level only (no separate Cover letter / Compare offers). */
export const phaseOneFeatures: ProductFeature[] = [
  {
    id: "tailor",
    name: "Tailor resume",
    summary: "Fit your resume to one job and download a clean PDF.",
    href: "/dashboard/generate",
    status: "improving",
    badge: "Live"
  },
  {
    id: "jobs",
    name: "Job search",
    summary: "Browse roles matched to your skills — with apply links.",
    href: "/dashboard/jobs",
    status: "live",
    badge: "Live"
  },
  {
    id: "interview",
    name: "Interview prep + PYQs",
    summary:
      "Shortlist companies and open previous year coding question guides.",
    href: "/dashboard/interview",
    status: "improving",
    badge: "Live"
  },
  {
    id: "mock",
    name: "Mock interview",
    summary:
      "Meet-style AI interview with voice, languages, and coding rounds.",
    href: "/mock-interview",
    status: "live",
    badge: "Live"
  },
  {
    id: "tracker",
    name: "My applications",
    summary: "Track applied → interview → offer in one list.",
    href: "/dashboard/applications",
    status: "live",
    badge: "Live"
  },
  {
    id: "tools",
    name: "AI tools",
    summary:
      "Cover letter, resume check, photo tips — plus a link to compare offers.",
    href: "/dashboard/tools",
    status: "live",
    badge: "Live"
  },
  {
    id: "freelance",
    name: "Freelancing",
    summary: "Find client work you can do while studying.",
    href: "/dashboard/freelancing",
    status: "live",
    badge: "Live"
  },
  {
    id: "learners",
    name: "Learning tracks",
    summary: "Short roadmaps to close skill gaps before placements.",
    href: "/dashboard/learners",
    status: "live",
    badge: "Live"
  },
  {
    id: "prepare",
    name: "Company prep & PYQs",
    summary:
      "Free guides + previous year coding questions for TCS, Infosys, Amazon, and more.",
    href: "/pyqs",
    status: "live",
    badge: "Live"
  }
];

/** Coming soon — Desktop first; Stripe / referrals later. */
export const phaseTwoFeatures: ProductFeature[] = [
  {
    id: "desktop",
    name: "Interview Copilot (Desktop)",
    summary:
      "A Windows and Mac app for practice interviews — private overlay, synced to your Apply account.",
    href: "/downloads",
    status: "coming-soon",
    badge: "Desktop · soon"
  },
  {
    id: "downloads",
    name: "Desktop download page",
    summary:
      "One place to get Apply Desktop when Windows and macOS apps ship — Coming Soon today.",
    href: "/downloads",
    status: "coming-soon",
    badge: "Desktop · soon"
  },
  {
    id: "stripe",
    name: "Instant Pro billing",
    summary:
      "Upgrade with Stripe checkout — UPI still available for students in India.",
    href: "/dashboard/upgrade",
    status: "coming-soon",
    badge: "Web · soon"
  },
  {
    id: "affiliate",
    name: "Referral rewards",
    summary:
      "Share Apply with classmates and earn rewards when they upgrade.",
    href: "/#coming-soon",
    status: "coming-soon",
    badge: "Web · soon"
  }
];

export const phaseCopy = {
  liveEyebrow: "Available now on the web",
  liveTitle: "Your placement toolkit — live on the web.",
  liveDescription:
    "Tailor resumes, search jobs, prep interviews, track applications, and learn skills in one account.",
  soonEyebrow: "Coming next",
  soonTitle: "Desktop Interview Copilot is next.",
  soonDescription:
    "Mock interview and My applications are live on the web. Cover letter and offer compare live under AI tools. Desktop overlay comes next — same login.",
  desktopHighlight: {
    eyebrow: "Desktop · Coming soon",
    title: "Practice interviews with a private desktop overlay.",
    description:
      "A downloadable Windows and Mac app that uses your resume and the job you are targeting. Built for mock practice — not for cheating in a live interview.",
    cta: "Get notified on download page",
    note: "Web tools stay available while Desktop ships."
  }
} as const;
