import { BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/dashboard/page-header";
import { sampleInterviewGuide } from "@/lib/constants";

export default function InterviewPage() {
  const guide = sampleInterviewGuide;
  return (
    <div>
      <PageHeader
        eyebrow="Interview prep"
        title="Prepare from the exact resume you submitted."
        description="Generate company research, likely questions, strengths, weaknesses, and technical topics from each job-specific resume."
        cta="Generate guide"
      />
      {guide ? (
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1fr]">
          <Card className="p-6">
            <p className="fine-label mb-2">Guide</p>
            <h3 className="font-serif text-4xl text-primary">{guide.role}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{guide.company}</p>
            <p className="mt-6 text-sm leading-7 text-foreground">
              {guide.companyAnalysis}
            </p>
          </Card>
          <div className="grid gap-5">
            {[
              ["Likely questions", guide.generatedQuestions],
              ["Prep notes", guide.prepNotes],
              ["Technical topics", guide.technicalTopics]
            ].map(([title, items]) => (
              <Card key={title as string} className="p-6">
                <h3 className="font-serif text-3xl text-primary">{title as string}</h3>
                <ul className="mt-5 space-y-3">
                  {(items as string[]).map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={BriefcaseBusiness}
          title="No interview guides yet"
          description="Generate a guide after creating a tailored resume for a role."
        />
      )}
    </div>
  );
}
