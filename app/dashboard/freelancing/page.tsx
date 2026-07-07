import { PageHeader } from "@/components/dashboard/page-header";
import { FreelanceWorkspace } from "@/features/freelancing/components/freelance-workspace";

/** Freelancing dashboard page — curated freelance services + client-finding deep links. */
export default function FreelancingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Freelancing"
        title="Earn from freelance work in your city."
        description="Curated freelance services across web dev, app dev, AI/ML, design, marketing and content — with the skills, deliverables, and deep links to Google Maps, Justdial & IndiaMART so you can find real local clients and call them with a ready pitch."
        cta="Build a resume"
        href="/dashboard/build"
      />
      <FreelanceWorkspace />
    </div>
  );
}
