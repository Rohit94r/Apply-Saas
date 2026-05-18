import { GenerateResumeForm } from "@/components/dashboard/generate-resume-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { getCurrentUserId } from "@/lib/auth";
import { getLatestMasterResume } from "@/lib/data/resumes";

export default async function GeneratePage() {
  const userId = await getCurrentUserId();
  const masterResume = await getLatestMasterResume(userId).catch(() => null);

  return (
    <div>
      <PageHeader
        eyebrow="Improve resume"
        title="Upload. Improve. Compare. Download."
        description="Upload your resume, add the company, role, and job details, then review small ATS improvements before saving or downloading."
      />
      <GenerateResumeForm initialMasterResume={masterResume} />
    </div>
  );
}
