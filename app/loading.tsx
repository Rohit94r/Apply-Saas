import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="section-shell py-16">
      <Skeleton className="h-12 w-72" />
      <Skeleton className="mt-6 h-64 w-full" />
    </main>
  );
}
