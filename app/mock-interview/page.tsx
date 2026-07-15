import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Button } from "@/components/ui/button";
import { absoluteUrl, seoConfig } from "@/lib/seo";

const title = "AI Mock Interview Practice Online (Free Start) | Apply";
const description =
  "Practice AI mock interviews for campus placements — Meet-style video room, ElevenLabs voice, Hindi/English options, coding rounds, and scored feedback. Free to start on Apply.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "mock interview practice online",
    "AI mock interview for freshers",
    "campus placement mock interview",
    "virtual mock interview India",
    "coding mock interview practice",
    "TCS Infosys mock interview",
    "AI interviewer voice practice",
    "free mock interview for students"
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
  name: "Apply AI Mock Interview",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: absoluteUrl("/mock-interview"),
  description,
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
    "Turn-by-turn scoring and session summary"
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Apply's mock interview free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can start free after signing in. The web mock interview includes voice questions, live captions, and optional coding rounds."
      }
    },
    {
      "@type": "Question",
      name: "Does the mock interview include coding questions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can enable coding questions at easy, medium, or hard difficulty. A terminal appears during coding turns so you can write and run tests."
      }
    },
    {
      "@type": "Question",
      name: "Which languages does the AI interviewer support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "English is the default. You can also choose Hindi, Tamil, Telugu, or Marathi, with ElevenLabs voice when configured."
      }
    }
  ]
};

const features = [
  "Google Meet–style layout: you on camera, AI interviewer on the right",
  "Realistic ElevenLabs female interviewer voices (not robotic browser TTS)",
  "Job description / interview notes optional for role-specific questions",
  "Coding PYQ-style problems with Easy / Medium / Hard difficulty",
  "End-call popup with questions answered, strong answers, and coding passed",
  "History saved to Applications & progress (latest sessions)"
];

export default function MockInterviewMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([softwareJsonLd, faqJsonLd])
        }}
      />
      <SiteHeader />
      <main>
        <section className="border-b border-border/70 py-20">
          <div className="section-shell max-w-4xl">
            <p className="fine-label mb-5">AI Mock Interview</p>
            <h1 className="font-serif text-5xl leading-[1.02] text-primary sm:text-6xl">
              Online mock interview practice for campus placements.
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Stop reading answers silently. Apply runs a live virtual interview —
              speaks the question, listens to your answer, scores you, and can add
              coding rounds similar to company OA / previous year questions.
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
            </div>
          </div>
        </section>

        <section className="border-b border-border/70 bg-[#fbfaf6] py-16">
          <div className="section-shell">
            <h2 className="font-serif text-3xl text-primary">What you get</h2>
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

        <section className="py-16">
          <div className="section-shell max-w-3xl">
            <h2 className="font-serif text-3xl text-primary">
              Pair mock interviews with previous year papers
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The strongest placement plan is: company PYQs → timed coding practice
              → voice mock interview for the same company and role. Start with{" "}
              <Link href="/pyqs" className="font-semibold text-primary underline-offset-2 hover:underline">
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
      </main>
      <Footer />
    </>
  );
}
