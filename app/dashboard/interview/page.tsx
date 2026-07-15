import { PageHeader } from "@/components/dashboard/page-header";
import { InterviewPrepMatcher } from "@/components/dashboard/interview-prep-matcher";
import { CompanyCodingQuestions } from "@/components/dashboard/company-coding-questions";

export default function InterviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Interview prep"
        title="Find companies. Get shortlisted. Start preparing."
        description="Tell us what kind of job you want — company type, domain, role, city — and we'll shortlist matching companies with coding question guides, interview styles, and the best videos to watch."
        cta="Try mock interview"
        href="/dashboard/mock-interview"
      />
      <InterviewPrepMatcher />

      <div className="mt-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Company PYQs Library
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <CompanyCodingQuestions />
    </div>
  );
}
