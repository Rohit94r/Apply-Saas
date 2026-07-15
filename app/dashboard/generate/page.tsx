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
        eyebrow="Resume builder"
        title="Upload once. Tailor for each job."
        description="Paste a job description, download an ATS-ready PDF, then prep cover letter and interview from the same role."
      />
      <GenerateResumeForm
        initialMasterResume={masterResume}
        initialCompany={params.company ?? ""}
        initialRole={params.role ?? ""}
      />
    </div>
  );
}
