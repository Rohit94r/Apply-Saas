import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  Briefcase,
  FileText,
  GraduationCap,
  House,
  ListChecks,
  MagicWand,
  MagnifyingGlass,
  Microphone,
  Sparkle,
  Storefront
} from "@phosphor-icons/react/ssr";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: PhosphorIcon;
  /** Shorter label for the mobile chip row */
  shortLabel?: string;
};

export type DashboardNavGroup = {
  /** null → items render without a section heading (e.g. Home) */
  label: string | null;
  items: DashboardNavItem[];
};

/**
 * Sidebar information architecture. Grouped so the sidebar reads as a
 * few clear areas instead of one long flat list.
 */
export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    label: null,
    items: [{ label: "Home", href: "/dashboard", icon: House }]
  },
  {
    label: "Resume",
    items: [
      {
        label: "Tailor resume",
        href: "/dashboard/generate",
        icon: Sparkle,
        shortLabel: "Tailor"
      },
      {
        label: "My resumes",
        href: "/dashboard/resumes",
        icon: FileText,
        shortLabel: "Resumes"
      },
      {
        label: "AI tools",
        href: "/dashboard/tools",
        icon: MagicWand,
        shortLabel: "Tools"
      }
    ]
  },
  {
    label: "Interview",
    items: [
      {
        label: "Interview prep",
        href: "/dashboard/interview",
        icon: Briefcase,
        shortLabel: "Prep"
      },
      {
        label: "Mock interview",
        href: "/dashboard/mock-interview",
        icon: Microphone,
        shortLabel: "Mock"
      }
    ]
  },
  {
    label: "Jobs & tracking",
    items: [
      {
        label: "Job search",
        href: "/dashboard/jobs",
        icon: MagnifyingGlass,
        shortLabel: "Jobs"
      },
      {
        label: "Applications",
        href: "/dashboard/applications",
        icon: ListChecks,
        shortLabel: "Apps"
      },
      {
        label: "Freelancing",
        href: "/dashboard/freelancing",
        icon: Storefront
      }
    ]
  },
  {
    label: "Grow",
    items: [
      {
        label: "Learning",
        href: "/dashboard/learners",
        icon: GraduationCap
      },
      { label: "Upgrade", href: "/dashboard/upgrade", icon: Sparkle }
    ]
  }
];

export const dashboardNavItems: DashboardNavItem[] = dashboardNavGroups.flatMap(
  (group) => group.items
);

/**
 * Marks a nav item active for the current path. Home is exact-only so
 * nested routes never highlight it; AI tools also owns the saved
 * cover-letters history route.
 */
export function isDashboardPathActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  if (href === "/dashboard/tools") {
    return (
      pathname.startsWith("/dashboard/tools") ||
      pathname.startsWith("/dashboard/cover-letters")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const pageTitles: Array<{
  match: (path: string) => boolean;
  title: string;
  eyebrow: string;
}> = [
  {
    match: (p) => p === "/dashboard",
    title: "Your Apply home",
    eyebrow: "Placement prep"
  },
  {
    match: (p) => p.startsWith("/dashboard/applications"),
    title: "Applications & progress",
    eyebrow: "Tracker + readiness"
  },
  {
    match: (p) => p.startsWith("/dashboard/tools"),
    title: "AI tools",
    eyebrow: "Cover letter, offers & more"
  },
  {
    match: (p) => p.startsWith("/dashboard/offers"),
    title: "Compare offers",
    eyebrow: "AI tools"
  },
  {
    match: (p) => p.startsWith("/dashboard/cover-letters"),
    title: "Cover letters",
    eyebrow: "Saved history"
  },
  {
    match: (p) => p.startsWith("/dashboard/generate"),
    title: "Tailor resume",
    eyebrow: "Job-ready PDF"
  },
  {
    match: (p) => p.startsWith("/dashboard/mock-interview"),
    title: "Mock interview",
    eyebrow: "Practice room"
  },
  {
    match: (p) => p.startsWith("/dashboard/interview"),
    title: "Interview prep",
    eyebrow: "Questions & roadmap"
  },
  {
    match: (p) => p.startsWith("/dashboard/jobs"),
    title: "Job search",
    eyebrow: "Find openings"
  },
  {
    match: (p) => p.startsWith("/dashboard/resumes"),
    title: "My resumes",
    eyebrow: "Your library"
  },
  {
    match: (p) => p.startsWith("/dashboard/freelancing"),
    title: "Freelancing",
    eyebrow: "Client outreach"
  },
  {
    match: (p) => p.startsWith("/dashboard/learners"),
    title: "Learning",
    eyebrow: "Skill gaps"
  },
  {
    match: (p) => p.startsWith("/dashboard/settings"),
    title: "Settings",
    eyebrow: "Account"
  },
  {
    match: (p) => p.startsWith("/dashboard/upgrade"),
    title: "Upgrade",
    eyebrow: "Pro access"
  },
  {
    match: (p) => p.startsWith("/dashboard/admin"),
    title: "Admin",
    eyebrow: "Founder tools"
  }
];

export function dashboardTitleForPath(pathname: string) {
  return (
    pageTitles.find((entry) => entry.match(pathname)) ?? {
      title: "Your Apply home",
      eyebrow: "Placement prep"
    }
  );
}
