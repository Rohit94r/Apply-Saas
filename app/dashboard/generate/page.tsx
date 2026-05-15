import { GenerateResumeForm } from "@/components/dashboard/generate-resume-form";
import { PageHeader } from "@/components/dashboard/page-header";

export default function GeneratePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Generate new resume"
        title="Paste the role. Get the resume."
        description="This workflow is wired to an API route with validation, OpenAI-ready prompt logic, deterministic fallback output, loading states, and toast feedback."
      />
      <GenerateResumeForm />
    </div>
  );
}
