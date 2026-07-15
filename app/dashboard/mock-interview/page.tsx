import { PageHeader } from "@/components/dashboard/page-header";
import { MockInterviewRoom } from "@/components/dashboard/mock-interview-room";

export default function MockInterviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Virtual interview"
        title="Practice with Apply Interviewer."
        description="Join a light Meet-style practice call — your camera on the left, Apply Interviewer on the right. Questions speak aloud; your answers caption live."
        cta="Back to interview prep"
        href="/dashboard/interview"
      />
      <MockInterviewRoom />
    </div>
  );
}
