import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/microsoft";
const title = "Microsoft Interview Practice — Free AI Mock | Apply";
const description =
  "Microsoft interview practice online — free AI mock interviews for SDE Intern and new-grad roles. Coding rounds, design discussions, and scored feedback on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "Microsoft interview practice",
    "Microsoft mock interview",
    "Microsoft SDE interview",
    "Microsoft intern interview",
    "Microsoft interview questions India",
    "free Microsoft mock interview"
  ]
});

export default function MicrosoftMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="Microsoft · SDE Intern · New Grad"
      h1="Microsoft Interview Practice"
      intro="Practice Microsoft interviews with free AI mocks — coding rounds, light design, and behavioral segments. Pair with Microsoft internship guides and PYQs before your loop."
      hiringNotes={[
        "Microsoft loops mix coding, design-lite, and behavioral rounds.",
        "Interviewers value structured problem solving — approach before code.",
        "Projects get probed deeply; prepare a 10-minute technical walkthrough.",
        "A clear, calm explanation of tradeoffs scores as much as the solution."
      ]}
      sampleQuestions={[
        {
          round: "Coding",
          prompt: "Check whether two binary trees are identical — iterative and recursive.",
          tip: "Recursion first, then a stack-based iterative version with edge cases."
        },
        {
          round: "DSA",
          prompt: "Find the kth smallest element in a BST efficiently.",
          tip: "In-order traversal with a counter, or a size-aware approach."
        },
        {
          round: "Design-lite",
          prompt: "Design a simple task queue with priorities — data structures and APIs.",
          tip: "Heap for priority, talk through enqueue/dequeue and concurrency basics."
        },
        {
          round: "Technical",
          prompt: "Explain how garbage collection works at a high level.",
          tip: "Reference counting vs tracing; tie it to a language you know."
        },
        {
          round: "Coding",
          prompt: "Implement a function that groups an array of words by first letter.",
          tip: "Hash map keyed by first letter; handle empty strings."
        },
        {
          round: "Behavioral",
          prompt: "Tell me about a time you had to learn something new quickly.",
          tip: "STAR with a time frame and the result you reached."
        }
      ]}
      faqs={[
        {
          question: "How do I practice for Microsoft interviews on Apply?",
          answer:
            "Open /dashboard/mock-interview, set company to Microsoft and role to SDE Intern or new grad, enable coding, and practice coding plus design-lite rounds aloud. Use /prepare/microsoft-internship-guide and /pyqs for preparation."
        },
        {
          question: "Do Microsoft mocks include design rounds?",
          answer:
            "Yes — sessions include a design-lite segment with small system prompts, matching the rounds interns and new grads can face."
        },
        {
          question: "Is Microsoft mock interview practice free?",
          answer:
            "Yes after Google sign-in. Unlimited sessions with scored feedback on Apply."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/prepare/microsoft-internship-guide",
          label: "Microsoft internship guide"
        },
        {
          href: "/blog/system-design-interview-questions-freshers",
          label: "System design interview questions"
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
      softwareName="Apply Microsoft Interview Practice"
      ctaLabel="Start Microsoft mock interview"
    />
  );
}
