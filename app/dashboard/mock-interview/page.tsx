import { PageHeader } from "@/components/dashboard/page-header";
import { MockInterviewRoom } from "@/components/dashboard/mock-interview-room";

export default function MockInterviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Virtual interview"
        title="Practice with Apply Interviewer."
        description="Join a Meet-style practice call — an animated interviewer asks aloud, you answer by voice or text, and get coaching between questions."
        cta="Back to interview prep"
        href="/dashboard/interview"
      />
      <MockInterviewRoom />
    </div>
  );
}
