import { PageHeader } from "@/components/dashboard/page-header";
import { JobSearchWorkspace } from "@/features/jobs/components/job-search-workspace";

/** Job Search — resume match + live openings + board deep links. */
export default function JobsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Job search"
        title="Find and act on better-fit jobs."
        description="Compare transparent match evidence, verify source recency, save promising roles, and track applications."
      />
      <JobSearchWorkspace />
    </div>
  );
}
