"use client";

/** Shows inferred profile from resume — skills, roles, location, experience. */

import Link from "next/link";
import { ArrowClockwise, CheckCircle, UserCircle } from "@phosphor-icons/react";
import type { JobSeekerProfile } from "@/features/jobs/types";
import { experienceBandLabel } from "@/features/jobs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function JobProfileBanner({
  profile,
  onRefresh
}: {
  profile: JobSeekerProfile;
  onRefresh?: () => void;
}) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-col gap-4 border-b border-border bg-[#fbfaf6] p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserCircle className="h-7 w-7" weight="regular" />
          </span>
          <div>
            <p className="fine-label mb-1">Your job seeker profile</p>
            <h3 className="text-lg font-semibold text-foreground">{profile.headline}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Built from your{" "}
              {profile.source === "master-resume"
                ? "uploaded resume"
                : profile.source === "built-resume"
                  ? "built resume"
                  : "default preferences"}
              {profile.isComplete ? (
                <span className="ml-2 inline-flex items-center gap-1 text-success">
                  <CheckCircle className="h-3.5 w-3.5" weight="fill" />
                  Ready to match
                </span>
              ) : null}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {onRefresh ? (
            <Button type="button" variant="outline" size="sm" onClick={onRefresh}>
              <ArrowClockwise className="h-4 w-4" weight="regular" />
              Refresh
            </Button>
          ) : null}
          {!profile.isComplete ? (
            <Button asChild size="sm">
              <Link href="/dashboard/generate">Tailor resume</Link>
            </Button>
          ) : (
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard/generate">Update on Tailor</Link>
            </Button>
          )}
        </div>
      </div>
      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
        <ProfileBlock label="Target roles" values={profile.targetRoles} />
        <ProfileBlock label="Top skills" values={profile.skills.slice(0, 8)} />
        <div>
          <p className="text-[10px] font-bold uppercase text-muted-foreground">
            Location
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground">
            {profile.location}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-muted-foreground">
            Experience
          </p>
          <p className="mt-2 text-sm font-semibold text-foreground">
            {experienceBandLabel(profile.experienceBand)}
          </p>
        </div>
      </div>
    </Card>
  );
}

function ProfileBlock({ label, values }: { label: string; values: string[] }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {values.length ? (
          values.map((value) => (
            <span
              key={value}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary"
            >
              {value}
            </span>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </div>
    </div>
  );
}
