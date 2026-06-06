import { PageHeader } from "@/components/dashboard/page-header";
import { JobSearchWorkspace } from "@/features/jobs/components/job-search-workspace";

/** Job Search dashboard page — profile-based matching + external board links. */
export default function JobsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Job search"
        title="Jobs matched to your resume."
        description="We build a profile from your uploaded or built resume, then show relevant openings and deep links to LinkedIn, Naukri, Indeed, and other platforms."
        cta="Upload resume"
        href="/dashboard/generate"
      />
      <JobSearchWorkspace />
    </div>
  );
}
