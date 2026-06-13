import Link from "next/link";
import { Stack } from "@phosphor-icons/react/ssr";
import { GenerateResumeForm } from "@/components/dashboard/resume-improve/generate-resume-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      <Card className="mb-6 flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
        <div>
          <p className="fine-label mb-2">Starting fresh?</p>
          <h3 className="text-lg font-semibold text-foreground">
            Build a master profile from guided questions
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Answers sync to your master profile for tailoring, tools, and interview prep.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/build">
            <Stack className="h-4 w-4" weight="regular" />
            Build resume
          </Link>
        </Button>
      </Card>
      <GenerateResumeForm
        initialMasterResume={masterResume}
        initialCompany={params.company ?? ""}
        initialRole={params.role ?? ""}
      />
    </div>
  );
}
