import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/logo";

const columns = [
  {
    title: "Product",
    links: ["How it works", "AI resume engine", "Interview prep", "Pricing"]
  },
  {
    title: "Company",
    links: ["About", "Blog", "Contact", "Students"]
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Data export"]
  },
  {
    title: "Social",
    links: ["LinkedIn", "X", "GitHub", "Community"]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#f7f4ee]">
      <div className="section-shell py-20">
        <div className="mb-16 text-center">
          <h2 className="mx-auto max-w-3xl font-serif text-5xl leading-[1.02] text-primary sm:text-6xl">
            Ready to stop rewriting and start applying?
          </h2>
          <Button asChild className="mt-8" size="lg">
            <Link href="/dashboard/generate">
              Generate my free resume
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            First 10 resumes are free. No card required.
          </p>
        </div>
        <div className="grid gap-10 border-t border-border pt-12 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
              AI resumes, cover letters, interview guides, and professional application tools
              for students and early-career builders.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="fine-label mb-4 text-primary/70">{column.title}</p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-muted-foreground transition hover:text-primary">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 Apply. All rights reserved.</p>
          <p>apply.neexmeet.com</p>
        </div>
      </div>
    </footer>
  );
}
