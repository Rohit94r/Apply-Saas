import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="section-shell flex min-h-screen flex-col items-center justify-center text-center">
      <p className="fine-label mb-4">404</p>
      <h1 className="font-serif text-6xl text-primary">This page is not tailored yet.</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
        The page you are looking for does not exist, but your next resume can.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go home</Link>
      </Button>
    </main>
  );
}
