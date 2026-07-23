import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Button } from "@/components/ui/button";
import { absoluteUrl, seoConfig } from "@/lib/seo";

const title = "Mock Interview Free — AI Practice Online | Apply";
const description =
  "Mock interview free online for campus placements — AI voice, coding rounds, scored feedback. Unlimited mock interview practice for freshers. Start free on Apply.";

export const metadata: Metadata = {
  title: {
    absolute: title
  },
  description,
  keywords: [
    "mock interview",
    "mock interview online",
    "mock interview practice",
    "AI mock interview",
    "online interview practice",
    "free online interview practice",
    "unlimited interview practice",
    "mock interview practice for freshers",
    "AI mock interview for freshers",
    "campus placement mock interview",
    "virtual mock interview India",
    "coding mock interview practice",
    "free mock interview for students",
    "mock interview practice online free",
    "mock interviews",
    "AI mock interview",
    "AI interviewer practice"
  ],
  alternates: {
    canonical: absoluteUrl("/mock-interview")
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/mock-interview"),
    siteName: seoConfig.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Apply Free AI Mock Interview",
  alternateName: ["Apply Mock Interview Practice", "Apply AI Interviewer"],
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: absoluteUrl("/mock-interview"),
  description,
  isAccessibleForFree: true,
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Indian students and freshers preparing for campus placements"
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR"
  },
  featureList: [
    "Meet-style virtual interview room",
    "ElevenLabs interviewer voice",
    "English, Hindi, Tamil, Telugu, Marathi",
    "Coding questions with test runner",
    "5–10 question sessions with scored feedback",
    "Pairs with company PYQs and ATS resume tools"
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should students use for mock interview practice before campus placements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Prefer a tool that makes you speak answers aloud under time pressure, ideally with optional coding and company context. Apply's AI mock interview at /mock-interview includes voice practice, scored feedback, and optional coding rounds, and works best when paired with company PYQs at /pyqs and an ATS resume on Apply."
      }
    },
    {
      "@type": "Question",
      name: "Is Apply's AI mock interview free for freshers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can start free after signing in with Google. The web mock interview includes voice questions, live captions, optional coding rounds, and a score summary when you end the call."
      }
    },
    {
      "@type": "Question",
      name: "Can I do unlimited interview practice on Apply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Start as many mock interview sessions as you need. Each session is 5–10 focused questions with scored feedback, so you can practice daily before campus placements."
      }
    },
    {
      "@type": "Question",
      name: "How many questions does one mock interview include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sessions run a focused 5–10 question flow so practice stays realistic for campus placement interviews instead of endless drills."
      }
    },
    {
      "@type": "Question",
      name: "Does the mock interview include coding questions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Enable coding at easy, medium, or hard difficulty. An editor and terminal appear so you can write code and run simple test cases during the meeting."
      }
    },
    {
      "@type": "Question",
      name: "Which languages does the AI interviewer support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "English is the default. You can also choose Hindi, Tamil, Telugu, or Marathi, with ElevenLabs voice when configured."
      }
    },
    {
      "@type": "Question",
      name: "How should I prepare before a mock interview?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Solve a few company previous year coding questions first, then run a voice mock for the same company and role. Review scored feedback and repeat one weak answer the next day."
      }
    }
  ]
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to practice a free AI mock interview on Apply",
  description,
  totalTime: "PT30M",
  step: [
    {
      "@type": "HowToStep",
      name: "Open the mock interview page",
      text: "Go to apply.neexmeet.com/mock-interview and sign in with Google."
    },
    {
      "@type": "HowToStep",
      name: "Set company, role, and coding options",
      text: "Enter your target company and role, choose HR/technical/mixed, language, and whether coding rounds are enabled."
    },
    {
      "@type": "HowToStep",
      name: "Answer spoken questions in the Meet-style room",
      text: "The AI interviewer asks questions aloud. Speak your answers; captions and scoring follow each turn."
    },
    {
      "@type": "HowToStep",
      name: "Review scored feedback",
      text: "End the call to see questions answered, strong answers, and coding tests passed, then practice weak areas again."
    }
  ]
};

const features = [
  "Google Meet–style layout: you on camera, AI interviewer on the right",
  "Realistic ElevenLabs interviewer voices (not robotic browser TTS)",
  "5–10 focused questions per session for campus placement realism",
  "Job description / interview notes optional for role-specific questions",
  "Coding problems with Easy / Medium / Hard and a test runner in-meeting",
  "End-call score summary plus history in Applications & progress"
];

const relatedGuides = [
  {
    href: "/blog/mock-interview-practice-online-free",
    label: "Mock interview practice online free"
  },
  {
    href: "/blog/mock-interviews-for-freshers",
    label: "Mock interviews for freshers"
  },
  {
    href: "/blog/interview-preparation-for-freshers",
    label: "Interview preparation for freshers"
  },
  {
    href: "/blog/mock-interview-practice-online-guide",
    label: "Mock interview practice online: fresher guide"
  },
  {
    href: "/blog/best-mock-interview-placement-prep-platforms",
    label: "Best mock interview platforms for campus placements"
  },
  {
    href: "/blog/ai-mock-interview-free-for-freshers-2026",
    label: "AI mock interview free for freshers"
  },
  {
    href: "/blog/unlimited-interview-practice-online",
    label: "Unlimited interview practice online (free)"
  },
  {
    href: "/blog/engineering-student-resume-template",
    label: "Engineering student resume free template"
  }
];

export default function MockInterviewMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([softwareJsonLd, faqJsonLd, howToJsonLd])
        }}
      />
      <SiteHeader />
      <main>
        <section className="border-b border-border/70 py-20">
          <div className="section-shell max-w-4xl">
            <p className="fine-label mb-5">Free mock interview practice online</p>
            <h1 className="font-serif text-5xl leading-[1.02] text-primary sm:text-6xl">
              Mock interview — free AI practice online for campus placements.
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Free mock interview for Indian freshers: AI voice questions, spoken
              answers, scored feedback, and optional coding rounds. Unlimited mock
              interview practice — start free after Google sign-in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/dashboard/mock-interview">
                  Start free mock interview
                  <ArrowRight className="h-4 w-4" weight="regular" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pyqs">Browse company PYQs</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard/generate">Build ATS resume</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-border/70 bg-[#fbfaf6] py-16">
          <div className="section-shell">
            <h2 className="font-serif text-3xl text-primary">
              What you get in one session
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-border bg-white p-4 text-sm leading-6 text-foreground"
                >
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    weight="fill"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-border/70 py-16">
          <div className="section-shell max-w-3xl">
            <h2 className="font-serif text-3xl text-primary">
              Pair mock interviews with previous year papers
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The strongest placement plan is: company PYQs → timed coding practice
              → voice mock interview for the same company and role. Start with{" "}
              <Link
                href="/pyqs"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                previous year coding questions
              </Link>
              , then return here to rehearse speaking under pressure.
            </p>
            <Button asChild className="mt-8">
              <Link href="/dashboard/mock-interview">
                Join the interview room
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-16">
          <div className="section-shell max-w-3xl">
            <h2 className="font-serif text-3xl text-primary">
              Guides that improve your next mock
            </h2>
            <ul className="mt-6 space-y-3">
              {relatedGuides.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className="text-sm font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    {guide.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
