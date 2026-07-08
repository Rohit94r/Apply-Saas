import { GenerateResumeForm } from "@/components/dashboard/resume-improve/generate-resume-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { getCurrentUserId } from "@/lib/auth";
import { getLatestMasterResume } from "@/lib/data/resumes";

export default async function GeneratePage({
  searchParams
}: {
  searchParams: Promise<{ company?: string; role?: string }>;
}) {
  const userId = await getCurrentUserId();
  const [masterResume, params] = await Promise.all([
    getLatestMasterResume(userId).catch(() => null),
    searchParams
  ]);

  return (
    <div>
      <PageHeader
        eyebrow="Tailor resume"
        title="Upload once. Tailor with AI prompts. Export and prep."
        description="Add your master profile, paste a job description, optionally steer AI with a prompt, then refine, cover letter, and interview prep from the same role."
      />
      <GenerateResumeForm
        initialMasterResume={masterResume}
        initialCompany={params.company ?? ""}
        initialRole={params.role ?? ""}
      />
    </div>
  );
}
