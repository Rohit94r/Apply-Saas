import { Download, Eye, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { GeneratedResume } from "@/types";
import { formatDate } from "@/lib/utils";

export function ResumeCard({ resume }: { resume: GeneratedResume }) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{resume.company}</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{resume.role}</h3>
        </div>
        <button
          className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-primary"
          aria-label="Open resume actions"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">ATS score</span>
          <span className="font-semibold text-accent">{resume.atsScore}%</span>
        </div>
        <Progress value={resume.atsScore} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {resume.keywords.slice(0, 4).map((keyword) => (
          <Badge key={keyword}>{keyword}</Badge>
        ))}
      </div>
      <p className="mt-5 text-xs text-muted-foreground">
        Created {formatDate(resume.createdAt)}
      </p>
      <div className="mt-5 flex gap-2">
        <Button size="sm" variant="outline" className="flex-1">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
        <Button size="sm" className="flex-1">
          <Download className="h-4 w-4" />
          PDF
        </Button>
      </div>
    </article>
  );
}
