import { PageHeader } from "@/components/dashboard/page-header";
import { InterviewGuideForm } from "@/components/dashboard/interview-guide-form";
import { getCurrentUserId } from "@/lib/auth";
import { getInterviewGuides } from "@/lib/data/resumes";

export default async function InterviewPage() {
  const userId = await getCurrentUserId();
  const guides = await getInterviewGuides(userId, 1).catch(() => []);

  return (
    <div>
      <PageHeader
        eyebrow="Interview prep"
        title="Build a focused interview practice plan."
        description="Create role-specific roadmap, coding practice, company-style questions, project prep, mock drills, and free learning resources from your resume and job description."
        cta="Create prep plan"
        href="/dashboard/interview"
      />
      <InterviewGuideForm initialGuide={guides[0] ?? null} />
    </div>
  );
}
