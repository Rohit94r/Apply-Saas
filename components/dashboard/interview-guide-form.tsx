"use client";

import { useState } from "react";
import { BriefcaseBusiness, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { InterviewGuide } from "@/types";

const demoResume =
  "Frontend engineer intern candidate with React, Next.js, TypeScript, MongoDB, reusable dashboard components, REST API integrations, accessibility improvements, and performance optimization project work.";

const demoJob =
  "We are hiring a Frontend Engineer Intern to build responsive dashboards with React and TypeScript. The role requires API integration, accessibility awareness, reusable component design, performance optimization, and clear collaboration with product teams.";

export function InterviewGuideForm({
  initialGuide
}: {
  initialGuide: InterviewGuide | null;
}) {
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<InterviewGuide | null>(initialGuide);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: formData.get("company"),
          role: formData.get("role"),
          resumeContent: formData.get("resumeContent"),
          jobDescription: formData.get("jobDescription")
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Interview guide generation failed");
      }

      setGuide(data.guide);
      toast.success("Interview guide generated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1fr]">
      <Card className="p-6">
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-foreground">Company</span>
              <Input name="company" defaultValue={guide?.company ?? "Neon Labs"} />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-foreground">Role</span>
              <Input
                name="role"
                defaultValue={guide?.role ?? "Frontend Engineer Intern"}
              />
            </label>
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-foreground">Resume content</span>
            <Textarea
              name="resumeContent"
              defaultValue={demoResume}
              className="min-h-36"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-foreground">Job description</span>
            <Textarea name="jobDescription" defaultValue={demoJob} className="min-h-44" />
          </label>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? "Generating..." : "Generate guide"}
          </Button>
        </form>
      </Card>
      <Card className="min-h-[520px] p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="fine-label mb-2">Guide</p>
            <h3 className="font-serif text-3xl text-primary">
              {guide?.role ?? "Interview prep output"}
            </h3>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>
        </div>
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted" />
            <div className="h-28 animate-pulse rounded-xl bg-muted" />
            <div className="h-28 animate-pulse rounded-xl bg-muted" />
            <div className="h-28 animate-pulse rounded-xl bg-muted" />
          </div>
        ) : guide ? (
          <div className="space-y-6">
            <p className="rounded-xl border border-accent/20 bg-accent/10 p-4 text-sm leading-7 text-foreground">
              {guide.companyAnalysis}
            </p>
            {[
              ["Likely questions", guide.generatedQuestions],
              ["Prep notes", guide.prepNotes],
              ["Technical topics", guide.technicalTopics]
            ].map(([title, items]) => (
              <section key={title as string}>
                <h4 className="text-sm font-semibold text-foreground">{title as string}</h4>
                <ul className="mt-3 space-y-3">
                  {(items as string[]).map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/50 p-8 text-center">
            <Sparkles className="h-8 w-8 text-accent" />
            <h4 className="mt-4 font-serif text-3xl text-primary">Ready to prep</h4>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Generate company notes, likely questions, prep notes, and technical
              review topics.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
