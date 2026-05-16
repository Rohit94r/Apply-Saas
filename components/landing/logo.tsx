import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Apply home" className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative h-12 w-12 shrink-0 overflow-hidden">
        <Image
          src="/symbol.png"
          alt=""
          width={168}
          height={112}
          priority
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-28 w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-sm"
        />
      </span>
      <span className="text-2xl font-semibold leading-none tracking-tight text-primary">
        Apply
      </span>
    </Link>
  );
}
