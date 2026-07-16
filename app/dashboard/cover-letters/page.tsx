import { PageHeader } from "@/components/dashboard/page-header";
import { CoverLettersHistory } from "@/components/dashboard/cover-letters-history";
import { getCurrentUserId } from "@/lib/auth";
import { listCoverLetters } from "@/lib/data/cover-letters";

export default async function CoverLettersPage() {
  const userId = await getCurrentUserId();
  const coverLettersPromise = listCoverLetters(userId).catch(() => []);
  const coverLetters = await coverLettersPromise;

  return (
    <div>
      <PageHeader
        eyebrow="Cover letters"
        title="Your saved cover letters."
        description="Every cover letter you generate is saved here — copy, re-read, or remove old ones."
      />
      <CoverLettersHistory initialCoverLetters={coverLetters} />
    </div>
  );
}
