"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowClockwise,
  ArrowSquareOut,
  CheckCircle,
  Plug,
  WarningCircle
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type JobApiHealthRow = {
  id: string;
  label: string;
  configured: boolean;
  ok: boolean;
  count: number;
  message?: string;
  docsUrl: string;
  market: string;
  credentialPreview: string;
  checkedAt: string;
};

type JobApiHealthReport = {
  providers: JobApiHealthRow[];
  summary: {
    configured: number;
    healthy: number;
    totalLiveJobs: number;
  };
  envHints: {
    adzunaAppId: string;
    adzunaCountry: string;
    herohuntBaseUrl: string;
  };
};

function formatWhen(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export function JobApiAdminPanel() {
  const [report, setReport] = useState<JobApiHealthReport | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/job-apis");
      const json = (await response.json()) as JobApiHealthReport & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(json.error ?? "Unable to load job API status");
      }
      setReport(json);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to load job APIs"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Plug className="mt-0.5 h-6 w-6 text-sky-600" weight="regular" />
          <div>
            <h2 className="text-lg font-semibold text-primary">Job APIs</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Live feeds: Adzuna (job ads) + HeroHunt (market signals). Keys stay
              server-side — only admins see this panel.
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void load()}
          disabled={loading}
        >
          <ArrowClockwise className="h-4 w-4" weight="regular" />
          Test APIs
        </Button>
      </div>

      {report ? (
        <>
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-[#fbfaf6] p-3 text-sm">
              <p className="text-xs text-muted-foreground">Configured</p>
              <p className="text-xl font-bold text-foreground">
                {report.summary.configured} / {report.providers.length}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-[#fbfaf6] p-3 text-sm">
              <p className="text-xs text-muted-foreground">Healthy now</p>
              <p className="text-xl font-bold text-foreground">
                {report.summary.healthy}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-[#fbfaf6] p-3 text-sm">
              <p className="text-xs text-muted-foreground">Probe results</p>
              <p className="text-xl font-bold text-foreground">
                {report.summary.totalLiveJobs} jobs
              </p>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {report.providers.map((provider) => (
              <div
                key={provider.id}
                className="rounded-xl border border-border p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">
                      {provider.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {provider.market} · checked {formatWhen(provider.checkedAt)}
                    </p>
                  </div>
                  {provider.configured && provider.ok ? (
                    <CheckCircle
                      className="h-5 w-5 shrink-0 text-success"
                      weight="fill"
                    />
                  ) : (
                    <WarningCircle
                      className={`h-5 w-5 shrink-0 ${provider.configured ? "text-amber-500" : "text-muted-foreground"}`}
                      weight="fill"
                    />
                  )}
                </div>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                  {provider.credentialPreview}
                </p>
                <p className="mt-2 text-sm text-foreground">
                  {provider.configured
                    ? provider.ok
                      ? `${provider.count} results in live probe`
                      : provider.message ?? "No matches for probe query"
                    : "Missing env vars — set ADZUNA_* or HEROHUNT_API_KEY in Vercel"}
                </p>
                <a
                  href={provider.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  API docs
                  <ArrowSquareOut className="h-3 w-3" weight="regular" />
                </a>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Adzuna app id: <span className="font-mono">{report.envHints.adzunaAppId}</span>
            {" · "}
            country: <span className="font-mono">{report.envHints.adzunaCountry}</span>
            {" · "}
            HeroHunt URL:{" "}
            <span className="font-mono">{report.envHints.herohuntBaseUrl}</span>
          </p>
        </>
      ) : loading ? (
        <p className="text-sm text-muted-foreground">Testing Adzuna + HeroHunt…</p>
      ) : (
        <p className="text-sm text-muted-foreground">No API report loaded.</p>
      )}
    </div>
  );
}
