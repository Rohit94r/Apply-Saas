import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action
}: EmptyStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/45 p-8 text-center">
      <div className="mb-4 rounded-full bg-accent/10 p-3 text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-serif text-2xl text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {action ? (
        <Button className="mt-5" size="sm">
          {action}
        </Button>
      ) : null}
    </div>
  );
}
