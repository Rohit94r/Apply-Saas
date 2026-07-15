import { PageHeader } from "@/components/dashboard/page-header";
import { ApplicationsTracker } from "@/components/dashboard/applications-tracker";
import { getCurrentUserId } from "@/lib/auth";
import { listApplications } from "@/lib/data/applications";

export default async function ApplicationsPage() {
  const userId = await getCurrentUserId();
  const applications = await listApplications(userId).catch(() => []);

  return (
    <div>
      <PageHeader
        eyebrow="My applications"
        title="Track where you applied."
        description="Add company, role, and status so you always know what's next."
      />
      <ApplicationsTracker initialApplications={applications} />
    </div>
  );
}
