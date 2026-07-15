import { PageHeader } from "@/components/dashboard/page-header";
import { InterviewGuideForm } from "@/components/dashboard/interview-guide-form";
import { getCurrentUserId } from "@/lib/auth";
import { resumeText } from "@/lib/dashboard-links";
import {
  getGeneratedResume,
  getInterviewGuides,
  getLatestMasterResume,
  masterResumeToText
} from "@/lib/data/resumes";

export default async function InterviewPage({
  searchParams
}: {
  searchParams: Promise<{ resumeId?: string; company?: string; role?: string }>;
}) {
  const userId = await getCurrentUserId();
  const params = await searchParams;
  const [guides, masterResume, linkedResume] = await Promise.all([
    getInterviewGuides(userId, 1).catch(() => []),
    getLatestMasterResume(userId).catch(() => null),
    params.resumeId
      ? getGeneratedResume(userId, params.resumeId).catch(() => null)
      : Promise.resolve(null)
  ]);

  const initialCompany = linkedResume?.company ?? params.company ?? "";
  const initialRole = linkedResume?.role ?? params.role ?? "";
  const initialResumeContent =
    (linkedResume ? resumeText(linkedResume) : "") ||
    masterResumeToText(masterResume) ||
    "";

  return (
    <div>
      <PageHeader
        eyebrow="Interview prep"
        title="Practice plan from your tailored resume."
        description="Your master profile and saved resumes prefill here. Add a job description to get company research, coding drills, and behavioral questions mapped to this role — or jump into a live mock interview."
        cta="Try mock interview"
        href="/dashboard/mock-interview"
      />
      <InterviewGuideForm
        initialGuide={guides[0] ?? null}
        initialCompany={initialCompany}
        initialRole={initialRole}
        initialResumeContent={initialResumeContent}
      />
    </div>
  );
}
