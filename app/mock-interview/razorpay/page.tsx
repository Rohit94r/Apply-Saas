import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/razorpay";
const title = "Razorpay Interview Practice — Free AI Mock | Apply";
const description =
  "Razorpay interview practice online — free AI mock interviews for freshers and interns. DSA rounds, fintech fundamentals, and scored feedback on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "Razorpay interview practice",
    "Razorpay mock interview",
    "Razorpay interview questions freshers",
    "Razorpay SDE interview",
    "fintech interview preparation",
    "free Razorpay mock interview"
  ]
});

export default function RazorpayMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="Razorpay · SDE · Intern"
      h1="Razorpay Interview Practice"
      intro="Practice Razorpay interviews with free AI mocks — medium DSA, fintech-flavored technical questions, and startup-fit behaviorals. Pair with the Razorpay prep guide before your loop."
      hiringNotes={[
        "Razorpay loops move fast — be ready to interview within days of applying.",
        "DSA is medium-level: hash maps, arrays, trees, and constraint-changing follow-ups.",
        "Fintech context helps: idempotency, money flows, reliability — basics are enough.",
        "Startup panels reward structured thinking and ownership stories."
      ]}
      sampleQuestions={[
        {
          round: "DSA",
          prompt: "Given payment transactions, find the pairs that sum to a target amount.",
          tip: "Hash map in one pass; watch for duplicates and large values."
        },
        {
          round: "Coding",
          prompt: "Design a rate limiter for a payment API — talk through your approach.",
          tip: "Sliding window or token bucket; discuss what happens on overflow."
        },
        {
          round: "Technical",
          prompt: "Explain idempotency and why payments APIs need it.",
          tip: "Definition, one retry example, and how a key solves it."
        },
        {
          round: "DSA · Trees",
          prompt: "Find the lowest common ancestor of two nodes in a binary tree.",
          tip: "Recursive solution first, then discuss iterative and edge cases."
        },
        {
          round: "Design-lite",
          prompt: "Design a refund flow for an online payment.",
          tip: "States, endpoints, and how you handle partial and failed refunds."
        },
        {
          round: "Behavioral",
          prompt: "Tell me about a time you shipped something under a tight deadline.",
          tip: "STAR with what you scoped out and the result."
        }
      ]}
      faqs={[
        {
          question: "How do I practice for Razorpay interviews on Apply?",
          answer:
            "Open /dashboard/mock-interview, set company to Razorpay and role to SDE or intern, enable coding, and practice DSA plus fintech-flavored questions aloud. Use /prepare/razorpay-interview-questions-2026 and /pyqs for deeper prep."
        },
        {
          question: "Do I need fintech knowledge for Razorpay mocks?",
          answer:
            "No — sessions test problem solving and fundamentals. Familiarity with ideas like idempotency helps but the interviews evaluate thinking, not domain trivia."
        },
        {
          question: "Is Razorpay mock interview practice free?",
          answer:
            "Yes after Google sign-in. Unlimited sessions with scored feedback on Apply."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/prepare/razorpay-interview-questions-2026",
          label: "Razorpay interview prepare guide"
        },
        {
          href: "/blog/razorpay-interview-questions-freshers",
          label: "Razorpay interview questions for freshers"
        },
        {
          href: "/blog/dsa-interview-questions-for-freshers",
          label: "DSA interview questions for freshers"
        },
        {
          href: "/blog/online-mock-interview-with-coding-round",
          label: "Online mock interview with coding round"
        },
        { href: "/pyqs", label: "Company coding PYQs" }
      ]}
      softwareName="Apply Razorpay Interview Practice"
      ctaLabel="Start Razorpay mock interview"
    />
  );
}
