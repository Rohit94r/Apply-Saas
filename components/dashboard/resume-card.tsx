import Link from "next/link";
import {
  Briefcase,
  DownloadSimple,
  EnvelopeSimple,
  Eye,
  Sparkle
} from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { GeneratedResume } from "@/types";
import { interviewHref, retailorHref, toolsHref } from "@/lib/dashboard-links";
import { formatDate } from "@/lib/utils";

export function ResumeCard({ resume }: { resume: GeneratedResume }) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{resume.company}</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{resume.role}</h3>
        </div>
        <Badge className="shrink-0">ATS {resume.atsScore}%</Badge>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Keyword match</span>
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
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Button asChild size="sm" variant="outline">
          <Link href={retailorHref(resume)}>
            <Sparkle className="h-4 w-4" weight="regular" />
            Re-tailor
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href={interviewHref(resume)}>
            <Briefcase className="h-4 w-4" weight="regular" />
            Interview
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href={toolsHref(resume, "cover")}>
            <EnvelopeSimple className="h-4 w-4" weight="regular" />
            Cover letter
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/api/pdf?resumeId=${resume.id}`}>
            <DownloadSimple className="h-4 w-4" weight="regular" />
            PDF
          </Link>
        </Button>
      </div>
      <Button asChild size="sm" variant="ghost" className="mt-2 w-full">
        <Link href={`/api/pdf?resumeId=${resume.id}`} target="_blank">
          <Eye className="h-4 w-4" weight="regular" />
          Preview PDF
        </Link>
      </Button>
    </article>
  );
}
