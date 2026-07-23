import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/software-engineer";
const title = "Free Mock Interview for Software Engineers | Apply";
const description =
  "Free mock interview for software engineers — AI voice, DSA/coding rounds, and scored feedback for SDE roles. Practice online before campus or off-campus drives.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "mock interview for software engineers",
    "software engineer mock interview",
    "SDE mock interview",
    "AI mock interview software engineer",
    "coding mock interview online",
    "free mock interview for SDE",
    "technical mock interview practice"
  ]
});

export default function SoftwareEngineerMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="Software engineer mock interview"
      h1="Free Mock Interview for Software Engineers"
      intro="Practice SDE and software engineer interviews with AI voice questions, optional DSA coding rounds, and scored feedback. Built for campus placements and off-campus SDE-1 / intern roles in India."
      hiringNotes={[
        "Most SDE screens test communication + one deep project + DSA fundamentals.",
        "Speak complexity (time/space) before diving into code.",
        "Pair Easy/Medium PYQs at /pyqs before enabling Hard coding in the mock.",
        "Keep answers structured: approach → edge cases → complexity → trade-offs."
      ]}
      sampleQuestions={[
        {
          round: "Intro",
          prompt: "Walk me through a project you are proud of as a software engineer.",
          tip: "Problem, your ownership, stack, one hard bug, and measurable outcome if true."
        },
        {
          round: "DSA",
          prompt: "Given an array of integers, find two numbers that add up to a target.",
          tip: "Hash map O(n); mention sorting two-pointer alternative."
        },
        {
          round: "CS fundamentals",
          prompt: "Explain REST vs GraphQL and when you would choose each.",
          tip: "Caching, over-fetching, and team familiarity."
        },
        {
          round: "Behavioral",
          prompt: "Tell me about a time you disagreed with a teammate on a design.",
          tip: "Stay respectful; show data or prototypes; end with the decision and learning."
        },
        {
          round: "System design lite",
          prompt: "Design a URL shortener for a college fest with 10k users.",
          tip: "API, hash IDs, storage, and basic scaling — keep it fresher-level."
        },
        {
          round: "Coding",
          prompt: "Write a function to detect a cycle in a linked list.",
          tip: "Floyd’s tortoise and hare; discuss false positives if needed."
        }
      ]}
      faqs={[
        {
          question: "Is there a free mock interview for software engineers on Apply?",
          answer:
            "Yes. Open /mock-interview/software-engineer or /dashboard/mock-interview, set role to Software Engineer or SDE, and practice free after Google sign-in."
        },
        {
          question: "Should software engineer mocks include coding?",
          answer:
            "Yes for SDE tracks. Start with Easy coding after solving a few company PYQs, then raise difficulty. HR-only mocks help early if speaking is the weak link."
        },
        {
          question: "How many mock interviews should an SDE fresher do?",
          answer:
            "Aim for at least 8–12 focused sessions across two weeks before major drives — mix technical, HR, and one coding-enabled session every other day."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/blog/mock-interview-practice-online-free",
          label: "Mock interview practice online free"
        },
        {
          href: "/blog/dsa-interview-questions-for-freshers",
          label: "DSA interview questions for freshers"
        },
        {
          href: "/blog/online-mock-interview-with-coding-round",
          label: "Online mock interview with coding round"
        },
        {
          href: "/prepare/amazon-oa-questions",
          label: "Amazon OA prepare guide"
        },
        { href: "/pyqs", label: "Company coding PYQs library" }
      ]}
      softwareName="Apply Software Engineer Mock Interview"
    />
  );
}
