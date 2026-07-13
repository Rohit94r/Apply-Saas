import { PageHeader } from "@/components/dashboard/page-header";
import { JobSearchWorkspace } from "@/features/jobs/components/job-search-workspace";

/** Job Search — resume match + live openings + board deep links. */
export default function JobsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Job search"
        title="Find jobs."
        description="Upload your resume for ranked matches. Filter internship, full-time, or contract — spend less time applying and raise your odds of getting selected."
      />
      <JobSearchWorkspace />
    </div>
  );
}
