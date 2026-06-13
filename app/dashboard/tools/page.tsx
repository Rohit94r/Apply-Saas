import { PageHeader } from "@/components/dashboard/page-header";
import { ToolsWorkspace } from "@/components/dashboard/tools-workspace";
import { getCurrentUserId } from "@/lib/auth";
import { resumeText } from "@/lib/dashboard-links";
import {
  getGeneratedResume,
  getLatestMasterResume,
  masterResumeToText
} from "@/lib/data/resumes";

export default async function ToolsPage({
  searchParams
}: {
  searchParams: Promise<{
    resumeId?: string;
    tool?: string;
    company?: string;
    role?: string;
  }>;
}) {
  const userId = await getCurrentUserId();
  const params = await searchParams;
  const [masterResume, linkedResume] = await Promise.all([
    getLatestMasterResume(userId).catch(() => null),
    params.resumeId
      ? getGeneratedResume(userId, params.resumeId).catch(() => null)
      : Promise.resolve(null)
  ]);

  const initialTool: "cover" | "critique" | "pdf" | "photo" =
    params.tool === "critique" ||
    params.tool === "pdf" ||
    params.tool === "photo"
      ? params.tool
      : "cover";
  const initialCompany = linkedResume?.company ?? params.company ?? "";
  const initialRole = linkedResume?.role ?? params.role ?? "";
  const initialResumeContent =
    (linkedResume ? resumeText(linkedResume) : "") ||
    masterResumeToText(masterResume) ||
    "";

  return (
    <div>
      <PageHeader
        eyebrow="AI tools"
        title="Cover letters, critique, and export — prefilled from your profile."
        description="Your master resume and tailored versions load automatically. Generate a cover letter or ATS critique for the same role without re-pasting everything."
      />
      <ToolsWorkspace
        initialTool={initialTool}
        initialCompany={initialCompany}
        initialRole={initialRole}
        initialResumeContent={initialResumeContent}
      />
    </div>
  );
}
