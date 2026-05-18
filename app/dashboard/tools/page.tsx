import { PageHeader } from "@/components/dashboard/page-header";
import { ToolsWorkspace } from "@/components/dashboard/tools-workspace";

export default function ToolsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="AI tools"
        title="Everything around the resume."
        description="Generate letters, export PDFs, critique role fit, and store profile photos from one authenticated workspace."
      />
      <ToolsWorkspace />
    </div>
  );
}
