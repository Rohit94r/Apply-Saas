import { PageHeader } from "@/components/dashboard/page-header";
import { MockInterviewRoom } from "@/components/dashboard/mock-interview-room";

export default function MockInterviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Virtual interview"
        title="Practice with Apply Interviewer."
        description="Live AI mock interviews on the web — company, role, typed answers, coaching feedback. Desktop later is for live interview assist only."
        cta="Back to interview prep"
        href="/dashboard/interview"
      />
      <MockInterviewRoom />
    </div>
  );
}
