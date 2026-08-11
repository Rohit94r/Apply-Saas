import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/flipkart";
const title = "Flipkart Interview Practice — Free AI Mock | Apply";
const description =
  "Flipkart interview practice online — free AI mock interviews for SDE and Grid participants. DSA rounds, product thinking, and scored feedback on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "Flipkart interview practice",
    "Flipkart mock interview",
    "Flipkart SDE interview",
    "Flipkart Grid preparation",
    "Flipkart interview questions",
    "free Flipkart mock interview"
  ]
});

export default function FlipkartMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="Flipkart · SDE · Grid"
      h1="Flipkart Interview Practice"
      intro="Practice Flipkart interviews with free AI mocks — medium DSA rounds, product thinking, and behaviorals. Pair with Flipkart Grid and SDE prep guides before your rounds."
      hiringNotes={[
        "Flipkart SDE rounds are DSA-heavy — practice medium problems under time pressure.",
        "Grid participants should also rehearse presenting a working demo.",
        "Product thinking appears in interviews — practice feature discussions aloud.",
        "Clear communication about your approach is scored in every round."
      ]}
      sampleQuestions={[
        {
          round: "DSA",
          prompt: "Find the maximum profit from buying and selling stock with one transaction.",
          tip: "Track minimum price seen so far; O(n) with constant space."
        },
        {
          round: "DSA · Hashing",
          prompt: "Group anagrams from a list of strings.",
          tip: "Sort each word or use a frequency key in a hash map."
        },
        {
          round: "Coding",
          prompt: "Implement a rate limiter for an API — talk through your approach.",
          tip: "Sliding window or token bucket; discuss memory and time tradeoffs."
        },
        {
          round: "Product",
          prompt: "Design a feature to reduce cart abandonment on an e-commerce app.",
          tip: "User problem, one metric, a small feature, and how you'd measure."
        },
        {
          round: "Technical",
          prompt: "How would you scale a product search across millions of items?",
          tip: "Indexing, caching, queues — basics with one concrete layer."
        },
        {
          round: "Behavioral",
          prompt: "Tell me about a time you disagreed with a teammate on a project.",
          tip: "STAR with the resolution and what you learned about collaboration."
        }
      ]}
      faqs={[
        {
          question: "How do I practice for Flipkart interviews on Apply?",
          answer:
            "Open /dashboard/mock-interview, set company to Flipkart and role to SDE or intern, enable coding for DSA rounds, and speak through product and behavioral questions. Use the Flipkart Grid and SDE guides in the blog and /pyqs for OA practice."
        },
        {
          question: "Can I practice Flipkart Grid rounds here?",
          answer:
            "The AI mock covers interviews and coding rounds; for Grid's screening use the Flipkart Grid prepare guide at /prepare/flipkart-grid and PYQ practice at /pyqs."
        },
        {
          question: "Is Flipkart mock interview practice free?",
          answer:
            "Yes after Google sign-in. Unlimited sessions with scored feedback on Apply."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/prepare/flipkart-grid",
          label: "Flipkart Grid prepare guide"
        },
        {
          href: "/blog/flipkart-grid-2026-experience-team-size",
          label: "Flipkart Grid experience and team size"
        },
        {
          href: "/blog/flipkart-grid-eligibility-selection",
          label: "Flipkart Grid eligibility and selection process"
        },
        {
          href: "/blog/coding-round-preparation-placement-guide",
          label: "Coding round preparation guide"
        },
        { href: "/pyqs", label: "Company coding PYQs" }
      ]}
      softwareName="Apply Flipkart Interview Practice"
      ctaLabel="Start Flipkart mock interview"
    />
  );
}
