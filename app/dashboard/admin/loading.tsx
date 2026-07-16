import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-5 w-full max-w-lg" />
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  );
}
