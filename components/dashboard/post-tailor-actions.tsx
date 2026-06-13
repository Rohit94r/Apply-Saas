"use client";

import Link from "next/link";
import {
  Briefcase,
  ChatsCircle,
  EnvelopeSimple,
  Sparkle
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { interviewHref, toolsHref } from "@/lib/dashboard-links";

export function PostTailorActions({
  resumeId,
  company,
  role,
  onRefineClick
}: {
  resumeId: string;
  company: string;
  role: string;
  onRefineClick?: () => void;
}) {
  const resume = { id: resumeId, company, role };

  return (
    <Card className="border-accent/20 bg-accent/5 p-5">
      <p className="fine-label mb-2">Next steps for this role</p>
      <h4 className="text-lg font-semibold text-foreground">
        Continue your application pipeline
      </h4>
      <p className="mt-1 text-sm text-muted-foreground">
        Refine this version, generate a cover letter, or start interview prep —
        all using the resume you just tailored.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {onRefineClick ? (
          <Button type="button" size="sm" variant="outline" onClick={onRefineClick}>
            <Sparkle className="h-4 w-4" weight="regular" />
            Refine with prompt
          </Button>
        ) : null}
        <Button asChild size="sm" variant="outline">
          <Link href={toolsHref(resume, "cover")}>
            <EnvelopeSimple className="h-4 w-4" weight="regular" />
            Cover letter
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href={interviewHref(resume)}>
            <Briefcase className="h-4 w-4" weight="regular" />
            Interview prep
          </Link>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <Link href={toolsHref(resume, "critique")}>
            <ChatsCircle className="h-4 w-4" weight="regular" />
            Critique fit
          </Link>
        </Button>
      </div>
    </Card>
  );
}
