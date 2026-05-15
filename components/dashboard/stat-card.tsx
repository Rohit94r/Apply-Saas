import type { DashboardStat } from "@/types";
import { Card } from "@/components/ui/card";

export function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
        {stat.trend ? (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {stat.trend}
          </span>
        ) : null}
      </div>
      <p className="mt-5 font-serif text-5xl text-primary">{stat.value}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.detail}</p>
    </Card>
  );
}
