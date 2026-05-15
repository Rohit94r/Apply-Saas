import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <span className="grid h-9 w-9 grid-cols-2 gap-1 rounded-lg border border-primary/15 bg-white p-1 shadow-sm">
        <span className="rounded-[3px] bg-primary" />
        <span className="rounded-[3px] bg-accent" />
        <span className="rounded-[3px] bg-[#de8b1d]" />
        <span className="rounded-[3px] bg-[#9ccdc5]" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-primary">
        Apply
      </span>
    </Link>
  );
}
