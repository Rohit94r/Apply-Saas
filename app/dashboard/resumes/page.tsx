import { FileText } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/dashboard/page-header";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { sampleResumes } from "@/lib/constants";

export default function ResumesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="My resumes"
        title="Every version, tied to the job."
        description="Store generated resumes by company, role, ATS score, keyword match, and PDF status so you always know what you submitted."
        cta="New resume"
      />
      {sampleResumes.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sampleResumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="No resumes yet"
          description="Generate your first tailored resume from a master profile and job description."
          action="Generate resume"
        />
      )}
    </div>
  );
}
