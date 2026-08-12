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
      { label: "Tailor resume", href: "/dashboard/generate" },
      { label: "Mock interview", href: "/mock-interview" },
      { label: "TCS mock interview", href: "/mock-interview/tcs" },
      { label: "Amazon mock interview", href: "/mock-interview/amazon" },
      { label: "Google mock interview", href: "/mock-interview/google" },
      { label: "Wipro mock interview", href: "/mock-interview/wipro" },
      { label: "Flipkart mock interview", href: "/mock-interview/flipkart" },
      { label: "Zomato mock interview", href: "/mock-interview/zomato" },
      { label: "Razorpay mock interview", href: "/mock-interview/razorpay" },
      { label: "PhonePe mock interview", href: "/mock-interview/phonepe" },
      { label: "Freshers mock interview", href: "/mock-interview/freshers" },
      { label: "Company PYQs", href: "/pyqs" },
      { label: "My applications", href: "/dashboard/applications" },
      { label: "AI tools", href: "/dashboard/tools" },
      { label: "Interview prep", href: "/dashboard/interview" },
      { label: "Job search", href: "/dashboard/jobs" },
      { label: "Settings", href: "/dashboard/settings" },
      { label: "Pricing", href: "/#pricing" }
    ]
  },
  {
    title: "Guides",
    links: [
      { label: "Company PYQs library", href: "/pyqs" },
      { label: "Previous year coding questions guide", href: "/blog/company-previous-year-coding-questions-india" },
      { label: "Mock interview practice online free", href: "/blog/mock-interview-practice-online-free" },
      { label: "TCS NQT 2026", href: "/blog/tcs-nqt-2026" },
      { label: "Fresher resume building India", href: "/blog/fresher-resume-building-india" },
      { label: "Best mock interview platforms", href: "/blog/best-mock-interview-placement-prep-platforms" },
      { label: "Best AI resume builder for students", href: "/blog/best-ai-resume-builder-students-india" },
      { label: "Best free resume editor for placements", href: "/blog/best-free-resume-editor-campus-placements" },
      { label: "AI mock interview guide", href: "/blog/ai-mock-interview-practice-campus-placements" },
      { label: "Mock interview practice online", href: "/blog/mock-interview-practice-online-guide" },
      { label: "Free resume maker for students", href: "/blog/free-resume-maker-for-students-india" },
      { label: "Engineering student resume", href: "/blog/engineering-student-resume-template" },
      { label: "Company prep guides", href: "/prepare" },
      { label: "TCS interview questions", href: "/prepare/tcs-interview-questions-2026" },
      { label: "Amazon OA questions", href: "/prepare/amazon-oa-questions" },
      { label: "ATS resume tips", href: "/blog/ats-friendly-resume-india-2026" },
      { label: "Blog", href: "/blog" }
    ]
  },
  {
    title: "Desktop",
    links: [
      { label: "Interview Copilot (Coming soon)", href: "/downloads" },
      { label: "Desktop roadmap", href: "/#coming-soon" },
      { label: "Try web mock interview", href: "/mock-interview" }
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
            Learning, earning &amp; interview prep — all in one place.
          </h2>
          <Button asChild className="mt-8" size="lg">
            <Link href="/dashboard/generate">
              Generate my free resume
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            First 5 resumes are free worldwide. Pro available when you need unlimited access.
          </p>
        </div>
        <div className="grid gap-10 border-t border-border pt-12 md:grid-cols-[1.35fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">
              Learning, earning and interview prep on one platform — for students and
              early-career developers. Need help? Message on Instagram or LinkedIn.
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
