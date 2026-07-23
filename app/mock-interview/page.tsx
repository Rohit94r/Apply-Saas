import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import { mockInterviewHubLinks } from "@/components/landing/mock-interview-company-page";
import { Button } from "@/components/ui/button";
import { absoluteUrl, seoConfig } from "@/lib/seo";

const title = "Free AI Mock Interview Practice Online | Apply";
const description =
  "Free AI mock interview practice online for campus placements — voice questions, coding rounds, scored feedback. Unlimited sessions for freshers. Start free on Apply.";

export const metadata: Metadata = {
  title: {
    absolute: title
  },
  description,
  keywords: [
    "mock interview",
    "mock interview practice",
    "mock interview online",
    "AI mock interview",
    "free AI mock interview",
    "mock interview practice online free",
    "free online interview practice",
    "online mock interview",
    "mock interview platform",
    "face to face mock interviews",
    "free interview",
    "unlimited interview practice",
    "mock interview practice for freshers",
    "AI mock interview for freshers",
    "campus placement mock interview",
    "coding mock interview practice"
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

const faqs = [
  {
    question: "Is Apply's AI mock interview free for freshers?",
    answer:
      "Yes. You can start free after signing in with Google. The web mock interview includes voice questions, live captions, optional coding rounds, and a score summary when you end the call."
  },
  {
    question: "What should students use for mock interview practice before campus placements?",
    answer:
      "Prefer a tool that makes you speak answers aloud under time pressure, ideally with optional coding and company context. Apply's AI mock interview at /mock-interview includes voice practice, scored feedback, and optional coding rounds, and works best when paired with company PYQs at /pyqs and an ATS resume on Apply."
  },
  {
    question: "Can I do unlimited interview practice on Apply?",
    answer:
      "Yes. Start as many mock interview sessions as you need. Each session is 5–10 focused questions with scored feedback, so you can practice daily before campus placements."
  },
  {
    question: "Does the mock interview feel face-to-face?",
    answer:
      "The room is Meet-style: you on camera, AI interviewer on the right, with spoken questions and captions — closer to a face-to-face mock interview than a text chatbot."
  },
  {
    question: "Does the mock interview include coding questions?",
    answer:
      "Yes. Enable coding at easy, medium, or hard difficulty. An editor and terminal appear so you can write code and run simple test cases during the meeting."
  },
  {
    question: "Which languages does the AI interviewer support?",
    answer:
      "English is the default. You can also choose Hindi, Tamil, Telugu, or Marathi, with ElevenLabs voice when configured."
  },
  {
    question: "How should I prepare before a mock interview?",
    answer:
      "Solve a few company previous year coding questions first, then run a voice mock for the same company and role. Review scored feedback and repeat one weak answer the next day."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
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

const stats = [
  { value: "5–10", label: "Focused questions per session" },
  { value: "64+", label: "Company PYQs to pair with mocks" },
  { value: "5", label: "Languages including Hindi & Tamil" },
  { value: "Free", label: "To start after Google sign-in" }
];

const howItWorks = [
  {
    step: "1",
    title: "Sign in and open the room",
    detail: "Start from /dashboard/mock-interview after Google sign-in — no coach booking."
  },
  {
    step: "2",
    title: "Pick company, role, and round type",
    detail: "TCS, Infosys, Amazon, or any target. HR, technical, or mixed — plus optional coding."
  },
  {
    step: "3",
    title: "Speak answers under pressure",
    detail: "Meet-style layout with AI voice questions. Captions help you review mid-call."
  },
  {
    step: "4",
    title: "Use scored feedback, then repeat",
    detail: "End call → note one weak answer → re-run tomorrow for the same company."
  }
];

const features = [
  "Google Meet–style layout: you on camera, AI interviewer on the right",
  "Realistic ElevenLabs interviewer voices (not robotic browser TTS)",
  "5–10 focused questions per session for campus placement realism",
  "Job description / interview notes optional for role-specific questions",
  "Coding problems with Easy / Medium / Hard and a test runner in-meeting",
  "End-call score summary plus history in Applications & progress"
];

const sampleQuestions = [
  {
    round: "HR",
    prompt: "Tell me about yourself.",
    tip: "60–90 seconds: education → one project → role you want."
  },
  {
    round: "Technical",
    prompt: "Explain one project from your resume end to end.",
    tip: "Cover problem, your role, tech choices, and one trade-off."
  },
  {
    round: "DSA",
    prompt: "How would you reverse a linked list? Walk through complexity.",
    tip: "Say approach before code; state time and space."
  },
  {
    round: "Behavioral",
    prompt: "Describe a time you fixed a bug under a deadline.",
    tip: "Use STAR: situation, task, action, result."
  },
  {
    round: "HR",
    prompt: "Why do you want to join this company?",
    tip: "Name a product, role fit, and one skill you will bring."
  },
  {
    round: "Technical",
    prompt: "What is the difference between process and thread?",
    tip: "Memory, isolation, and when you'd use each."
  }
];

const companyChips = mockInterviewHubLinks.filter(
  (link) => link.href !== "/mock-interview"
);

const relatedGuides = [
  {
    href: "/blog/mock-interview-practice-online-free",
    label: "Mock interview practice online free — complete guide"
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
    href: "/blog/tcs-nqt-2026",
    label: "TCS NQT 2026 guide"
  },
  {
    href: "/blog/how-to-apply-off-campus-placement",
    label: "How to apply off-campus"
  },
  {
    href: "/blog/fresher-resume-building-india",
    label: "Fresher resume building India"
  },
  {
    href: "/blog/best-mock-interview-placement-prep-platforms",
    label: "Best mock interview platforms for campus placements"
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
            <p className="fine-label mb-5">Free AI mock interview practice online</p>
            <h1 className="font-serif text-5xl leading-[1.02] text-primary sm:text-6xl">
              Free AI Mock Interview Practice Online
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Practice mock interviews with AI voice, optional coding rounds, and
              scored feedback — then build an ATS resume and solve company PYQs.
              Built for Indian campus and off-campus placements. Free to start after
              Google sign-in.
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

        <section className="border-b border-border/70 bg-[#fbfaf6] py-14">
          <div className="section-shell grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-white px-5 py-6 text-center"
              >
                <p className="font-serif text-3xl text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-border/70 py-16">
          <div className="section-shell">
            <h2 className="font-serif text-3xl text-primary">How it works</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((item) => (
                <li
                  key={item.step}
                  className="rounded-xl border border-border bg-[#fbfaf6] p-5"
                >
                  <p className="fine-label text-accent">Step {item.step}</p>
                  <h3 className="mt-3 text-base font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-border/70 bg-[#fbfaf6] py-16">
          <div className="section-shell">
            <h2 className="font-serif text-3xl text-primary">
              Practice by company or role
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              Open a dedicated mock interview page, then jump into the live room with
              that company or role in mind.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {companyChips.map((chip) => (
                <li key={chip.href}>
                  <Link
                    href={chip.href}
                    className="inline-flex rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    {chip.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8">
              <Link href="/dashboard/mock-interview">
                Open mock interview room
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="border-b border-border/70 py-16">
          <div className="section-shell">
            <h2 className="font-serif text-3xl text-primary">What you get in one session</h2>
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

        <section className="border-b border-border/70 bg-[#fbfaf6] py-16">
          <div className="section-shell max-w-4xl">
            <h2 className="font-serif text-3xl text-primary">Sample questions to rehearse</h2>
            <ul className="mt-8 space-y-4">
              {sampleQuestions.map((item) => (
                <li
                  key={item.prompt}
                  className="rounded-xl border border-border bg-white px-5 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {item.round}
                  </p>
                  <p className="mt-2 text-base font-medium leading-7 text-primary">
                    {item.prompt}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Tip: {item.tip}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-border/70 py-16">
          <div className="section-shell max-w-3xl">
            <h2 className="font-serif text-3xl text-primary">
              Pair mocks with previous year papers
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Strongest placement loop: company{" "}
              <Link
                href="/pyqs"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                PYQs
              </Link>{" "}
              → timed coding → voice mock for the same company → ATS resume at{" "}
              <Link
                href="/dashboard/generate"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                /dashboard/generate
              </Link>
              . Also use{" "}
              <Link
                href="/prepare"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                prepare guides
              </Link>{" "}
              for company-specific rounds.
            </p>
            <Button asChild className="mt-8">
              <Link href="/dashboard/mock-interview">
                Join the interview room
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="border-b border-border/70 bg-[#fbfaf6] py-16">
          <div className="section-shell max-w-3xl">
            <h2 className="font-serif text-3xl text-primary">Frequently asked questions</h2>
            <ul className="mt-8 space-y-6">
              {faqs.map((item) => (
                <li key={item.question}>
                  <h3 className="text-base font-bold text-primary">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.answer}
                  </p>
                </li>
              ))}
            </ul>
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
