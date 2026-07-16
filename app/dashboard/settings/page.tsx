import { PageHeader } from "@/components/dashboard/page-header";
import { SettingsPanel } from "@/components/dashboard/settings-panel";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Profile details from your account, billing, and how to request account deletion."
      />
      <SettingsPanel />
    </div>
  );
}
