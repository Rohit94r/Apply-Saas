import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { FounderSupportCard } from "@/components/billing/founder-support-card";
import { Logo } from "@/components/landing/logo";
import { founderLinks } from "@/lib/constants/founder";

const columns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "AI resume engine", href: "/#engine" },
      { label: "Interview prep", href: "/dashboard/interview" },
      { label: "Pricing", href: "/#pricing" }
    ]
  },
  {
    title: "Guides",
    links: [
      { label: "ATS resume tips India", href: "/blog/ats-friendly-resume-india-2026" },
      {
        label: "Fresher resume format",
        href: "/blog/fresher-resume-format-it-companies"
      },
      { label: "Internship resume mistakes", href: "/blog/internship-resume-mistakes" },
      { label: "Blog", href: "/blog" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Data export", href: "#" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Upgrade / UPI pay", href: "/dashboard/upgrade" },
      { label: "DM on Instagram", href: founderLinks.instagram },
      { label: "Connect on LinkedIn", href: founderLinks.linkedin },
      { label: "WhatsApp", href: founderLinks.whatsapp }
    ]
  },
  {
    title: "Social",
    links: [
      { label: "Instagram @dev.by.rohit", href: founderLinks.instagram },
      { label: "LinkedIn", href: founderLinks.linkedin },
      { label: "WhatsApp support", href: founderLinks.whatsapp },
      { label: "Blog", href: "/blog" }
    ]
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
            First 5 resumes are free. Pro is ₹50/month via UPI QR.
          </p>
        </div>
        <div className="grid gap-10 border-t border-border pt-12 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
              AI resume builder for Indian students. Need help? Message on Instagram or LinkedIn.
            </p>
            <div className="mt-5">
              <FounderSupportCard compact />
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="fine-label mb-4 text-primary/70">{column.title}</p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition hover:text-primary"
                    >
                      {link.label}
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
