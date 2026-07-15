"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, X } from "@phosphor-icons/react";
import type { YouTubeVideo } from "@/lib/data/learning-resources";
import {
  youtubeEmbedUrl,
  youtubeThumbnail,
  youtubeUrl
} from "@/lib/data/learning-resources";

export function YouTubeVideoGrid({
  videos,
  title = "Recommended videos"
}: {
  videos: YouTubeVideo[];
  title?: string;
}) {
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);

  return (
    <section>
      <h4 className="mb-4 text-sm font-semibold text-foreground">{title}</h4>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActiveVideo(video)}
            className="group overflow-hidden rounded-xl border border-border bg-white text-left transition hover:border-primary/30 hover:shadow-soft"
          >
            <div className="relative aspect-video overflow-hidden bg-muted">
              <Image
                src={youtubeThumbnail(video.id)}
                alt={video.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg">
                  <Play className="h-5 w-5" weight="fill" />
                </span>
              </span>
              <span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {video.duration}
              </span>
            </div>
            <div className="p-3">
              <p className="line-clamp-2 text-sm font-semibold text-foreground">
                {video.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{video.channel}</p>
              <span className="mt-2 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                {video.focus}
              </span>
            </div>
          </button>
        ))}
      </div>

      {activeVideo ? (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      ) : null}
    </section>
  );
}

function VideoModal({
  video,
  onClose
}: {
  video: YouTubeVideo;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="min-w-0 pr-4">
            <p className="truncate text-sm font-semibold text-foreground">
              {video.title}
            </p>
            <p className="text-xs text-muted-foreground">{video.channel}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg hover:bg-muted"
            aria-label="Close video"
          >
            <X className="h-4 w-4" weight="regular" />
          </button>
        </div>
        <div className="aspect-video">
          <iframe
            title={video.title}
            src={`${youtubeEmbedUrl(video.id)}?autoplay=1`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {video.focus}
          </span>
          <a
            href={youtubeUrl(video.id)}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-primary hover:underline"
          >
            Open on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

export function CourseGrid({
  courses,
  title = "Recommended courses"
}: {
  courses: Array<{
    title: string;
    provider: string;
    url: string;
    focus: string;
    free: boolean;
  }>;
  title?: string;
}) {
  return (
    <section>
      <h4 className="mb-4 text-sm font-semibold text-foreground">{title}</h4>
      <div className="grid gap-3 md:grid-cols-2">
        {courses.map((course) => (
          <a
            key={course.url}
            href={course.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-border bg-white p-4 transition hover:border-primary/30 hover:shadow-soft"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-bold uppercase text-accent">
                {course.provider}
              </p>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  course.free
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {course.free ? "Free" : "Paid"}
              </span>
            </div>
            <h5 className="mt-2 text-sm font-bold text-foreground group-hover:text-primary">
              {course.title}
            </h5>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {course.focus}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

export function PlatformLinksGrid({
  platforms,
  title = "Practice platforms"
}: {
  platforms: Array<{
    name: string;
    url: string;
    description: string;
    icon: string;
  }>;
  title?: string;
}) {
  return (
    <section>
      <h4 className="mb-4 text-sm font-semibold text-foreground">{title}</h4>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 transition hover:border-accent/40 hover:shadow-soft"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
              {platform.icon}
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">
                {platform.name}
              </span>
              <span className="text-xs leading-5 text-muted-foreground">
                {platform.description}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
