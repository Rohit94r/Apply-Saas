import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="section-shell py-16">
      <Skeleton className="h-10 w-72" />
      <Skeleton className="mt-6 h-5 w-full max-w-2xl" />
      <Skeleton className="mt-8 h-96 w-full rounded-xl" />
    </main>
  );
}
