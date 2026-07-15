import { PageHeader } from "@/components/dashboard/page-header";
import { OffersCompare } from "@/components/dashboard/offers-compare";
import { getCurrentUserId } from "@/lib/auth";
import { listOffers } from "@/lib/data/offers";

export default async function OffersPage() {
  const userId = await getCurrentUserId();
  const offers = await listOffers(userId).catch(() => []);

  return (
    <div>
      <PageHeader
        eyebrow="Compare offers"
        title="Compare offers side by side."
        description="Add CTC, location, and notes — then pick two or three to compare."
      />
      <OffersCompare initialOffers={offers} />
    </div>
  );
}
