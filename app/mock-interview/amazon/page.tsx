import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/amazon";
const title = "Amazon Interview Practice — Free AI Mock | Apply";
const description =
  "Amazon interview practice online — free AI mock interviews for SDE Intern and SDE-1. Leadership Principles, OA-style coding, and scored feedback on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "Amazon interview practice",
    "Amazon mock interview",
    "Amazon SDE interview",
    "Amazon OA practice",
    "Amazon Leadership Principles interview",
    "free Amazon mock interview",
    "Amazon SDE Intern interview practice"
  ]
});

export default function AmazonMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="Amazon · SDE Intern · SDE-1"
      h1="Amazon Interview Practice"
      intro="Practice Amazon interviews with free AI mocks — Leadership Principles stories, technical depth, and optional OA-style coding in one Meet-style room. Pair with Amazon OA prepare guides and PYQs before your loop."
      hiringNotes={[
        "Leadership Principles show up in almost every Amazon round — prepare STAR stories.",
        "OA usually means timed DSA; solve Amazon-tagged PYQs before enabling Hard coding.",
        "Be customer-obsessed in examples: impact, metrics only if truthful, ownership.",
        "Intern and new-grad loops still expect clear communication under pressure."
      ]}
      sampleQuestions={[
        {
          round: "LP · Ownership",
          prompt: "Tell me about a time you took ownership of a project end to end.",
          tip: "STAR with a clear result; mention what you would improve next."
        },
        {
          round: "LP · Customer Obsession",
          prompt: "Describe a time you improved something based on user feedback.",
          tip: "Even a college portal or app counts if the feedback loop is real."
        },
        {
          round: "DSA",
          prompt: "Design an approach for two-sum / hash map problems under time pressure.",
          tip: "State brute force then optimal; complexity out loud."
        },
        {
          round: "Technical",
          prompt: "How would you debug a production API that suddenly got slow?",
          tip: "Logs, metrics, recent deploys, DB vs network — structured triage."
        },
        {
          round: "Coding",
          prompt: "Serialize and deserialize a binary tree — talk through the approach.",
          tip: "BFS or preorder with null markers; discuss edge cases."
        },
        {
          round: "Behavioral",
          prompt: "Tell me about a time you failed and what you learned.",
          tip: "Amazon values learning velocity — honesty beats perfection."
        }
      ]}
      faqs={[
        {
          question: "How do I practice for Amazon interviews on Apply?",
          answer:
            "Open /dashboard/mock-interview, set company to Amazon and role to SDE Intern or SDE-1, enable coding when ready, and speak LP + technical answers. Use /prepare/amazon-oa-questions and /pyqs for OA prep."
        },
        {
          question: "Should Amazon mocks include Leadership Principles?",
          answer:
            "Yes. Use mixed rounds and paste short LP notes into interview notes so questions stay Amazon-flavored. Rehearse STAR stories aloud — reading them silently is not enough."
        },
        {
          question: "Is Amazon mock interview practice free?",
          answer:
            "Yes after Google sign-in. Unlimited sessions with scored feedback on Apply."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/prepare/amazon-oa-questions",
          label: "Amazon OA questions prepare guide"
        },
        {
          href: "/blog/online-mock-interview-with-coding-round",
          label: "Online mock interview with coding round"
        },
        {
          href: "/blog/dsa-interview-questions-for-freshers",
          label: "DSA interview questions for freshers"
        },
        { href: "/pyqs", label: "Amazon coding PYQs" },
        {
          href: "/blog/mock-interview-practice-online-free",
          label: "Mock interview practice online free"
        }
      ]}
      softwareName="Apply Amazon Mock Interview Practice"
      ctaLabel="Start Amazon mock interview"
    />
  );
}
