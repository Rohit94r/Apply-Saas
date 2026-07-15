import { PageHeader } from "@/components/dashboard/page-header";
import { MockInterviewRoom } from "@/components/dashboard/mock-interview-room";

export default function MockInterviewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Mock interview"
        title="Practice before the real interview."
        description="Pick a company and role, answer timed questions, and review tips when you need them."
      />
      <MockInterviewRoom />
    </div>
  );
}
