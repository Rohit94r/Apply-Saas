import { PageHeader } from "@/components/dashboard/page-header";
import { LearnerPrepWorkspace } from "@/components/dashboard/learner-prep-workspace";

export default function LearnersPage() {
  return (
    <div>
      <PageHeader
        eyebrow="New learners"
        title="Build skills before interview season."
        description="Structured roadmaps for web development, DSA, system design, and AI/ML — with practice links, YouTube tutorials, and free courses for 1st to 4th year students."
        cta="Interview prep"
        href="/dashboard/interview"
      />
      <LearnerPrepWorkspace />
    </div>
  );
}
