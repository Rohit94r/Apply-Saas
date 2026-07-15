import { PageHeader } from "@/components/dashboard/page-header";
import { ToolsWorkspace, type Tool } from "@/components/dashboard/tools-workspace";
import { getCurrentUserId } from "@/lib/auth";
import { resumeText } from "@/lib/dashboard-links";
import { listOffers } from "@/lib/data/offers";
import {
  getGeneratedResume,
  getLatestMasterResume,
  masterResumeToText
} from "@/lib/data/resumes";

const TOOLS: Tool[] = ["cover", "critique", "pdf", "photo", "offers"];

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
  const [masterResume, linkedResume, offers] = await Promise.all([
    getLatestMasterResume(userId).catch(() => null),
    params.resumeId
      ? getGeneratedResume(userId, params.resumeId).catch(() => null)
      : Promise.resolve(null),
    listOffers(userId).catch(() => [])
  ]);

  const initialTool: Tool = TOOLS.includes(params.tool as Tool)
    ? (params.tool as Tool)
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
        title="Cover letter, critique, photo, and offers."
        description="Your saved resume loads automatically. Compare offers here when letters arrive — interview prep and mock practice sit under Prep."
      />
      <ToolsWorkspace
        initialTool={initialTool}
        initialCompany={initialCompany}
        initialRole={initialRole}
        initialResumeContent={initialResumeContent}
        initialOffers={offers}
      />
    </div>
  );
}
