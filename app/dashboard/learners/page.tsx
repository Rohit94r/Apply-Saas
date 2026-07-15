import { PageHeader } from "@/components/dashboard/page-header";
import { LearnerPrepWorkspace } from "@/components/dashboard/learner-prep-workspace";

export default function LearnersPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Learning"
        title="Build skills before interviews."
        description="Short roadmaps with practice links and free courses — for 1st to 4th year students."
        cta="Interview prep"
        href="/dashboard/interview"
      />
      <LearnerPrepWorkspace />
    </div>
  );
}
