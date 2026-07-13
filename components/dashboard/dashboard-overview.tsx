"use client";

/**
 * Shared dashboard widgets still used by analytics.
 * Main overview UI lives in `dashboard-home.tsx`.
 */

import Link from "next/link";
import { Briefcase, FileText, Sparkle, Stack } from "@phosphor-icons/react";
import type { ActivityItem } from "@/lib/data/resumes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (!items.length) {
    return (
      <Card className="p-6">
        <p className="fine-label mb-2">Recent activity</p>
        <p className="text-sm text-muted-foreground">
          Tailored resumes and interview guides will show up here as you use Apply.
        </p>
        <Button asChild size="sm" className="mt-4">
          <Link href="/dashboard/generate">Open Resume Builder</Link>
        </Button>
      </Card>
    );
  }

  const typeIcons = {
    resume: Sparkle,
    build: Stack,
    guide: Briefcase
  };

  return (
    <Card className="p-6">
      <p className="fine-label mb-4">Recent activity</p>
      <ul className="space-y-3">
        {items.map((item) => {
          const Icon = typeIcons[item.type] ?? FileText;
          const date = new Date(item.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short"
          });

          return (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-xl border border-border bg-[#fbfaf6] p-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-accent shadow-sm">
                <Icon className="h-4 w-4" weight="regular" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
              <div className="shrink-0 text-right">
                {item.score !== undefined ? (
                  <p className="text-sm font-bold text-accent">{item.score}%</p>
                ) : null}
                <p className="text-[10px] text-muted-foreground">{date}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export function KeywordCoverageChart({
  items
}: {
  items: Array<{ keyword: string; coverage: number }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.keyword}
          className="rounded-xl border border-border bg-white p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-foreground">
              {item.keyword}
            </p>
            <span className="text-xs font-bold text-accent">{item.coverage}%</span>
          </div>
          <Progress value={item.coverage} className="mt-3" />
        </div>
      ))}
    </div>
  );
}
