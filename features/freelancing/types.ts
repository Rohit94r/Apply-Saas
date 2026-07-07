/**
 * Freelancing feature — shared types.
 *
 * The page helps students/early developers find freelance CLIENTS (local
 * businesses that lack a web/app presence) via Google Maps, Justdial, IndiaMART
 * deep links, with a ready call-pitch and "what to build" checklist.
 */

export type FreelanceDomainId =
  | "web-dev"
  | "app-dev"
  | "ai-ml"
  | "design"
  | "marketing"
  | "content";

export type FreelanceDomainIcon =
  | "code"
  | "device"
  | "brain"
  | "palette"
  | "megaphone"
  | "pen";

export type FreelanceDomain = {
  id: FreelanceDomainId;
  label: string;
  icon: FreelanceDomainIcon;
  tagline: string;
};

export type FreelanceDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type FreelanceSubdomain = {
  id: string;
  domainId: FreelanceDomainId;
  label: string;
  difficulty: FreelanceDifficulty;
  summary: string;
  /** Why this service is a good freelance pick right now (shown to user). */
  whySuggested: string;
  /** Market gap signal, e.g. "Most local salons have no booking site". */
  opportunitySignal: string;
  /** Skills the freelancer must have to deliver. */
  skills: string[];
  /** Recommended tech stack / tools. */
  techStack: string[];
  /** What the client needs built — concrete deliverables. */
  requirements: string[];
  /** Search terms used to find real clients on Maps / Justdial. */
  clientSearchTerms: string[];
  estimatedEffort: string;
  pricingInr: string;
  /** Short call pitch the student can read while on the phone. */
  pitchScript: string;
};

export type FindClientProvider =
  | "google-maps"
  | "justdial"
  | "indiamart"
  | "google"
  | "linkedin";

export type FindClientLink = {
  provider: FindClientProvider;
  label: string;
  hint: string;
  url: string;
};
