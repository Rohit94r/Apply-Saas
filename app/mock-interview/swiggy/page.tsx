import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/swiggy";
const title = "Swiggy Interview Practice — Free AI Mock | Apply";
const description =
  "Swiggy interview practice online — free AI mock interviews for SDE freshers. DSA rounds, design-lite, and product thinking with scored feedback on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "Swiggy interview practice",
    "Swiggy mock interview",
    "Swiggy SDE interview questions",
    "Swiggy interview for freshers",
    "Swiggy OA practice",
    "free Swiggy mock interview"
  ]
});

export default function SwiggyMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="Swiggy · SDE · Intern"
      h1="Swiggy Interview Practice"
      intro="Practice Swiggy interviews with free AI mocks — medium DSA, design-lite feature rounds, and product-thinking behaviorals. Pair with the Swiggy prep guide and PYQs before your rounds."
      hiringNotes={[
        "Swiggy loops value practical problem solving — real constraints, not puzzles.",
        "Medium DSA is the baseline; approach and complexity explanations are scored.",
        "A design-lite round can appear even for freshers — practice small features.",
        "Product behaviorals reflect consumer business — think user, metric, feature."
      ]}
      sampleQuestions={[
        {
          round: "DSA",
          prompt: "Given delivery times, find the maximum number of orders one rider can do.",
          tip: "Sort by end time and scan greedily — the classic interval pattern."
        },
        {
          round: "Coding",
          prompt: "Find the shortest path from a point to a restaurant on a grid with blocks.",
          tip: "BFS with a visited grid; discuss memory for large grids."
        },
        {
          round: "Design-lite",
          prompt: "Design restaurant search with filters — APIs and data model.",
          tip: "Entities, endpoints, indexing, and one ranking signal."
        },
        {
          round: "DSA · Hashing",
          prompt: "Group orders by user and find the most frequently reordered dish.",
          tip: "Hash map counting; handle ties and empty input."
        },
        {
          round: "Technical",
          prompt: "How would you cache restaurant menus to keep them fast and fresh?",
          tip: "Cache keys, invalidation, and one consistency scenario."
        },
        {
          round: "Behavioral",
          prompt: "Tell me about a feature you would add to Swiggy and why.",
          tip: "One user problem, one metric, and a small scoped feature."
        }
      ]}
      faqs={[
        {
          question: "How do I practice for Swiggy interviews on Apply?",
          answer:
            "Open /dashboard/mock-interview, set company to Swiggy and role to SDE or intern, enable coding, and practice DSA plus design-lite rounds aloud. Use /prepare/swiggy-interview-questions-2026 and /pyqs for OA-level prep."
        },
        {
          question: "Does Swiggy mock practice include design questions?",
          answer:
            "Yes — sessions include a design-lite segment with feature prompts like search and caching, matching the rounds freshers can face."
        },
        {
          question: "Is Swiggy mock interview practice free?",
          answer:
            "Yes after Google sign-in. Unlimited sessions with scored feedback on Apply."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/prepare/swiggy-interview-questions-2026",
          label: "Swiggy interview prepare guide"
        },
        {
          href: "/blog/swiggy-sde-interview-questions",
          label: "Swiggy SDE interview questions"
        },
        {
          href: "/blog/system-design-interview-freshers-sde-1",
          label: "System design starter guide"
        },
        {
          href: "/blog/online-mock-interview-with-coding-round",
          label: "Online mock interview with coding round"
        },
        { href: "/pyqs", label: "Company coding PYQs" }
      ]}
      softwareName="Apply Swiggy Interview Practice"
      ctaLabel="Start Swiggy mock interview"
    />
  );
}
