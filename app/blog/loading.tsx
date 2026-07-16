import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="section-shell py-16">
      <Skeleton className="h-12 w-72" />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </main>
  );
}
