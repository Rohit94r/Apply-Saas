import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/zomato";
const title = "Zomato Interview Practice — Free AI Mock | Apply";
const description =
  "Zomato interview practice online — free AI mock interviews for SDE freshers. DSA rounds, light design, and product thinking with scored feedback on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "Zomato interview practice",
    "Zomato mock interview",
    "Zomato SDE interview",
    "Zomato interview questions",
    "Zomato OA practice",
    "free Zomato mock interview"
  ]
});

export default function ZomatoMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="Zomato · SDE · Intern"
      h1="Zomato Interview Practice"
      intro="Practice Zomato interviews with free AI mocks — medium DSA, light design, and product-flavored behaviorals in one session. Pair with the Zomato OA guide and PYQs before applying."
      hiringNotes={[
        "Zomato loops are DSA-heavy — practice medium problems with verbal explanations.",
        "A light design round can appear even at fresher level — rehearse small features.",
        "Product thinking questions reflect Zomato's consumer business.",
        "The OA is a real filter — practice timed coding before the interview rounds."
      ]}
      sampleQuestions={[
        {
          round: "DSA",
          prompt: "Given a list of restaurant ratings, find the top K items efficiently.",
          tip: "Heap or quickselect — discuss O(n log k) and when it wins."
        },
        {
          round: "DSA · Sliding Window",
          prompt: "Find the minimum window substring containing all characters of a target.",
          tip: "Two pointers with a frequency map; count matches as you go."
        },
        {
          round: "Design-lite",
          prompt: "Design order tracking for a food delivery app — APIs and data model.",
          tip: "Entities, endpoints, one state flow, and a basic failure case."
        },
        {
          round: "Coding",
          prompt: "Merge k sorted lists efficiently.",
          tip: "Min-heap of heads, or divide and conquer — state the complexity."
        },
        {
          round: "Product",
          prompt: "What feature would you add to Zomato and how would you measure it?",
          tip: "Pick one user problem, one metric, and a small scoped feature."
        },
        {
          round: "Behavioral",
          prompt: "Tell me about a time you shipped something under pressure.",
          tip: "STAR with what you cut, what you shipped, and the result."
        }
      ]}
      faqs={[
        {
          question: "How do I practice for Zomato interviews on Apply?",
          answer:
            "Open /dashboard/mock-interview, set company to Zomato and role to SDE or intern, enable coding, and practice DSA plus design-lite rounds aloud. Use /blog/zomato-sde-oa-questions-2026 and /pyqs for OA prep."
        },
        {
          question: "Does Zomato practice include design questions?",
          answer:
            "Yes — sessions include a design-lite segment with feature design prompts, mirroring the rounds freshers can face."
        },
        {
          question: "Is Zomato mock interview practice free?",
          answer:
            "Yes after Google sign-in. Unlimited sessions with scored feedback on Apply."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/prepare/zomato-interview-questions-2026",
          label: "Zomato interview prepare guide"
        },
        {
          href: "/blog/zomato-sde-oa-questions-2026",
          label: "Zomato SDE OA questions"
        },
        {
          href: "/blog/zomato-sde-interview-experience",
          label: "Zomato SDE interview experience"
        },
        {
          href: "/blog/online-mock-interview-with-coding-round",
          label: "Online mock interview with coding round"
        },
        { href: "/pyqs", label: "Company coding PYQs" }
      ]}
      softwareName="Apply Zomato Interview Practice"
      ctaLabel="Start Zomato mock interview"
    />
  );
}
