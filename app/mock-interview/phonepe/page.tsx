import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/phonepe";
const title = "PhonePe Interview Practice — Free AI Mock | Apply";
const description =
  "PhonePe interview practice online — free AI mock interviews for freshers. DSA rounds, systems thinking, and scored feedback on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "PhonePe interview practice",
    "PhonePe mock interview",
    "PhonePe interview questions",
    "PhonePe SDE interview freshers",
    "PhonePe OA practice",
    "free PhonePe mock interview"
  ]
});

export default function PhonePeMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="PhonePe · SDE · Intern"
      h1="PhonePe Interview Practice"
      intro="Practice PhonePe interviews with free AI mocks — timed DSA rounds, scale-aware technical discussions, and behaviorals. Pair with the PhonePe prep guide before applying."
      hiringNotes={[
        "PhonePe operates at UPI scale — panels value clean code and complexity awareness.",
        "OA rounds are medium DSA with tight constraints and hidden edge cases.",
        "Expect follow-up questions that raise scale — practice talking through tradeoffs.",
        "Project deep-dives probe schema and scaling decisions — prepare one walkthrough."
      ]}
      sampleQuestions={[
        {
          round: "DSA",
          prompt: "Find the maximum sum subarray in a list of transactions.",
          tip: "Kadane's algorithm — explain why it works before coding."
        },
        {
          round: "Coding",
          prompt: "Given UPI transaction logs, group them by user and find the busiest hour.",
          tip: "Hash map with time buckets; state the complexity."
        },
        {
          round: "Technical",
          prompt: "How would you handle a sudden spike in payment requests?",
          tip: "Queues, rate limiting, horizontal scaling — one concrete answer each."
        },
        {
          round: "DSA · Two Pointers",
          prompt: "Merge two sorted arrays in place with O(1) extra space.",
          tip: "Fill from the end; discuss the pointer math clearly."
        },
        {
          round: "Design-lite",
          prompt: "Design a transaction history feature with search.",
          tip: "Data model, index choice, and one filtering flow."
        },
        {
          round: "Behavioral",
          prompt: "Tell me about a time you had to debug something you did not understand.",
          tip: "STAR with your investigation steps and the root cause."
        }
      ]}
      faqs={[
        {
          question: "How do I practice for PhonePe interviews on Apply?",
          answer:
            "Open /dashboard/mock-interview, set company to PhonePe and role to SDE or intern, enable coding, and practice timed DSA rounds aloud. Use /prepare/phonepe-interview-questions-2026 and /pyqs for OA-level practice."
        },
        {
          question: "Does PhonePe mock practice cover scale questions?",
          answer:
            "Yes — sessions include technical prompts on handling spikes and scale, matching how PhonePe interviews think about systems."
        },
        {
          question: "Is PhonePe mock interview practice free?",
          answer:
            "Yes after Google sign-in. Unlimited sessions with scored feedback on Apply."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/prepare/phonepe-interview-questions-2026",
          label: "PhonePe interview prepare guide"
        },
        {
          href: "/blog/phonepe-interview-experience-2026",
          label: "PhonePe interview experience for freshers"
        },
        {
          href: "/blog/system-design-interview-questions-freshers",
          label: "System design interview questions"
        },
        {
          href: "/blog/dsa-question-list-placements",
          label: "DSA question list for placements"
        },
        { href: "/pyqs", label: "Company coding PYQs" }
      ]}
      softwareName="Apply PhonePe Interview Practice"
      ctaLabel="Start PhonePe mock interview"
    />
  );
}
