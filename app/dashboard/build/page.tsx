import { BuildResumeForm } from "@/components/dashboard/resume-builder/build-resume-form";
import { PageHeader } from "@/components/dashboard/page-header";

export default function BuildResumePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Build resume"
        title="No resume yet? Build one fast."
        description="Answer simple student-friendly questions, choose a proven template, preview the PDF live, edit manually, save, and download."
      />
      <BuildResumeForm />
    </div>
  );
}
