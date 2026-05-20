import Link from "next/link";
import { Layers3 } from "lucide-react";
import { GenerateResumeForm } from "@/components/dashboard/resume-improve/generate-resume-form";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      <Card className="mb-6 flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
        <div>
          <p className="fine-label mb-2">No resume yet</p>
          <h3 className="text-lg font-semibold text-foreground">
            Build a new resume from guided questions
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick role, skills, education, projects, and a template.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/build">
            <Layers3 className="h-4 w-4" />
            Build resume
          </Link>
        </Button>
      </Card>
      <GenerateResumeForm initialMasterResume={masterResume} />
    </div>
  );
}
