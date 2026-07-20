import { PageHeader } from "@/components/dashboard/page-header";
import { FreelanceWorkspace } from "@/features/freelancing/components/freelance-workspace";

/** Freelancing dashboard page — service discovery, qualification, outreach, and pipeline. */
export default function FreelancingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Freelancing"
        title="Earn from freelance work in your city."
        description="Choose a focused service, research public business directories, qualify prospects, personalize outreach, and track each opportunity through a private pipeline."
        cta="Tailor resume"
        href="/dashboard/generate"
      />
      <FreelanceWorkspace />
    </div>
  );
}
