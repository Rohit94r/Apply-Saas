import { PageHeader } from "@/components/dashboard/page-header";
import { InterviewGuideForm } from "@/components/dashboard/interview-guide-form";
import { getCurrentUserId } from "@/lib/auth";
import { getInterviewGuides } from "@/lib/data/resumes";

export default async function InterviewPage() {
  const userId = await getCurrentUserId();
  const guides = await getInterviewGuides(userId, 1);

  return (
    <div>
      <PageHeader
        eyebrow="Interview prep"
        title="Prepare from the exact resume you submitted."
        description="Generate company research, likely questions, strengths, weaknesses, and technical topics from each job-specific resume."
        cta="Generate guide"
        href="/dashboard/interview"
      />
      <InterviewGuideForm initialGuide={guides[0] ?? null} />
    </div>
  );
}
