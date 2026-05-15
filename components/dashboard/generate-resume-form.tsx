"use client";

import { useState } from "react";
import { ArrowRight, FileText, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type GeneratedPreview = {
  atsScore: number;
  keywords: string[];
  summary: string;
  bullets: string[];
};

const demoResume =
  "Computer science student with React, TypeScript, Next.js, Node.js, MongoDB, and dashboard project experience. Built a campus placement portal used by students, improved load time, created reusable components, and worked with REST APIs.";

const demoJob =
  "We are hiring a Frontend Engineer Intern to build responsive dashboards with React and TypeScript. The role requires API integration, accessibility awareness, reusable component design, performance optimization, and clear collaboration with product teams.";

export function GenerateResumeForm() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<GeneratedPreview | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    setPreview(null);

    try {
      const response = await fetch("/api/resumes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: formData.get("company"),
          role: formData.get("role"),
          masterResume: formData.get("masterResume"),
          jobDescription: formData.get("jobDescription")
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Resume generation failed");
      }

      setPreview(data.resume.generatedContent);
      toast.success("Tailored resume generated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
      <Card className="p-6">
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-foreground">Company</span>
              <Input name="company" defaultValue="Neon Labs" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-foreground">Role</span>
              <Input name="role" defaultValue="Frontend Engineer Intern" />
            </label>
          </div>
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-foreground">Master resume</span>
            <Textarea name="masterResume" defaultValue={demoResume} className="min-h-36" />
          </label>
          <label className="space-y-2 block">
            <span className="text-sm font-semibold text-foreground">Job description</span>
            <Textarea name="jobDescription" defaultValue={demoJob} className="min-h-44" />
          </label>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Generating..." : "Generate tailored resume"}
          </Button>
        </form>
      </Card>
      <Card className="min-h-[520px] p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="fine-label mb-2">Live preview</p>
            <h3 className="font-serif text-3xl text-primary">ATS resume output</h3>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
        </div>
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted" />
            <div className="h-24 animate-pulse rounded-xl bg-muted" />
            <div className="h-24 animate-pulse rounded-xl bg-muted" />
            <div className="h-24 animate-pulse rounded-xl bg-muted" />
          </div>
        ) : preview ? (
          <div className="space-y-5">
            <div className="rounded-xl border border-accent/20 bg-accent/10 p-4">
              <p className="text-sm font-semibold text-accent">ATS score {preview.atsScore}%</p>
              <p className="mt-2 text-sm leading-6 text-foreground">{preview.summary}</p>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-foreground">Matched keywords</p>
              <div className="flex flex-wrap gap-2">
                {preview.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-foreground">Optimized bullets</p>
              <ul className="space-y-3">
                {preview.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="rounded-xl border border-border bg-white/70 p-4 text-sm leading-6 text-muted-foreground"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="outline">
              Download PDF
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/50 p-8 text-center">
            <Sparkles className="h-8 w-8 text-accent" />
            <h4 className="mt-4 font-serif text-3xl text-primary">Ready when you are</h4>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Paste a role and generate a tailored resume preview with ATS score,
              keyword matching, and rewritten bullets.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
