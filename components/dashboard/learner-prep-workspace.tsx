"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Brain,
  CalendarDots,
  CheckCircle,
  Code,
  GraduationCap,
  Sparkle,
  Stack
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import {
  CourseGrid,
  PlatformLinksGrid,
  YouTubeVideoGrid
} from "@/components/dashboard/youtube-video-grid";
import {
  getTrackById,
  getTracksByCategory,
  trackCategories,
  type LearnerTrack
} from "@/lib/data/learning-resources";

const categoryIcons: Record<string, PhosphorIcon> = {
  code: Code,
  brain: Brain,
  stack: Stack,
  sparkle: Sparkle
};

const difficultyRank: Record<string, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2
};

export function LearnerPrepWorkspace() {
  const [category, setCategory] = useState<string>("web-dev");
  const [trackId, setTrackId] = useState<string>("frontend");

  const tracks = useMemo(
    () =>
      getTracksByCategory(category).sort(
        (a, b) => (difficultyRank[a.difficulty] ?? 99) - (difficultyRank[b.difficulty] ?? 99)
      ),
    [category]
  );
  const activeTrack = useMemo(
    () => getTrackById(trackId) ?? tracks[0] ?? null,
    [trackId, tracks]
  );

  function selectCategory(next: string) {
    setCategory(next);
    const first = getTracksByCategory(next).sort(
      (a, b) => (difficultyRank[a.difficulty] ?? 99) - (difficultyRank[b.difficulty] ?? 99)
    )[0];
    if (first) {
      setTrackId(first.id);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border bg-gradient-to-r from-primary/5 via-accent/5 to-transparent px-6 py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="fine-label mb-2">For 1st – 4th year students</p>
              <h2 className="font-serif text-3xl text-primary">
                Learner preparation
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Pick your track, follow the step-by-step roadmap, practice on
                LeetCode and HackerRank, and learn from curated YouTube playlists
                and free courses — before you jump into interview prep.
              </p>
            </div>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
              <GraduationCap className="h-7 w-7" weight="regular" />
            </span>
          </div>
        </div>

        <div className="border-b border-border px-6 py-4">
          <p className="fine-label mb-3">Choose your path</p>
          <div className="flex flex-wrap gap-2">
            {trackCategories.map((item) => {
              const Icon = categoryIcons[item.icon] ?? Code;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectCategory(item.id)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    category === item.id
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-white text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <Icon className="h-4 w-4" weight="regular" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-b border-border px-6 py-4">
          <p className="fine-label mb-3">Specialization</p>
          <div className="flex flex-wrap gap-2">
            {tracks.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => setTrackId(track.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  trackId === track.id
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-white text-muted-foreground hover:border-accent/30"
                }`}
              >
                {track.subTrack}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {activeTrack ? (
        <TrackContent track={activeTrack} />
      ) : null}
    </div>
  );
}

function TrackContent({ track }: { track: LearnerTrack }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="fine-label mb-2">{track.yearRange}</p>
              <h3 className="font-serif text-2xl text-primary">{track.label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {track.description}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                track.difficulty === "Beginner"
                  ? "bg-emerald-50 text-emerald-700"
                  : track.difficulty === "Intermediate"
                    ? "bg-sky-50 text-sky-700"
                    : "bg-rose-50 text-rose-700"
              }`}
            >
              {track.difficulty}
            </span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <CalendarDots className="h-5 w-5 text-accent" weight="regular" />
            <h3 className="text-lg font-semibold text-foreground">
              Step-by-step roadmap
            </h3>
          </div>
          <div className="space-y-0">
            {track.roadmap.map((step, index) => (
              <div
                key={step.phase}
                className="relative border-l-2 border-accent/30 pb-8 pl-8 last:pb-0"
              >
                <span className="absolute -left-[17px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-white text-xs font-bold text-accent">
                  {index + 1}
                </span>
                <div className="rounded-xl border border-border bg-[#fbfaf6] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {step.phase}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {step.duration}
                    </span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-foreground">
                    {step.title}
                  </h4>
                  <ul className="mt-4 space-y-2">
                    {step.tasks.map((task) => (
                      <li
                        key={task}
                        className="flex gap-2 text-sm leading-6 text-muted-foreground"
                      >
                        <CheckCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          weight="regular"
                        />
                        {task}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.resources.map((resource) => (
                      <span
                        key={resource}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
                      >
                        <ArrowRight className="h-3 w-3" weight="regular" />
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <PlatformLinksGrid platforms={track.platforms} />
        </Card>
      </div>

      <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <Card className="p-6">
          <YouTubeVideoGrid
            videos={track.videos}
            title="YouTube playlists & tutorials"
          />
        </Card>
        <Card className="p-6">
          <CourseGrid courses={track.courses} title="Free & best courses" />
        </Card>
      </div>
    </div>
  );
}
