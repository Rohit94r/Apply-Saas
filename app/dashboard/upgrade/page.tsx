import { Suspense } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { CreditsBadge } from "@/components/billing/credits-badge";
import { UpgradeCheckout } from "@/components/billing/upgrade-checkout";

export default function UpgradePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Billing"
        title="Upgrade to Apply Pro"
        description="5 free resumes per account and per device — free worldwide. Upgrade to Pro for unlimited access. Need a discount? DM on Instagram or LinkedIn."
      />
      <CreditsBadge />
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-muted" />}>
        <UpgradeCheckout />
      </Suspense>
    </div>
  );
}
