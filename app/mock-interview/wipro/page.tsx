import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/wipro";
const title = "Wipro Interview Practice — Free AI Mock | Apply";
const description =
  "Wipro interview practice online — free AI mock interviews for fresher drives. Technical fundamentals, project questions, and HR rounds with scored feedback on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "Wipro interview practice",
    "Wipro mock interview",
    "Wipro technical interview practice",
    "Wipro interview questions freshers",
    "Wipro drive preparation",
    "free Wipro mock interview"
  ]
});

export default function WiproMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="Wipro · Fresher · Turbo/Elite"
      h1="Wipro Interview Practice"
      intro="Practice Wipro interviews with free AI mocks — fundamentals, project deep-dives, and HR rounds in one session. Pair with Wipro prepare guides and PYQs before your drive."
      hiringNotes={[
        "Wipro panels test clear fundamentals — OOP, SQL, and your resume's projects.",
        "Expect the technical round to follow your resume line by line.",
        "Communication counts: structured answers beat long rambling ones.",
        "Aptitude and reasoning often gate the process — practice the test as well."
      ]}
      sampleQuestions={[
        {
          round: "Technical · OOP",
          prompt: "Explain encapsulation and polymorphism with an example from your project.",
          tip: "Definition first, then a class or method you actually wrote."
        },
        {
          round: "Technical · SQL",
          prompt: "Write a query to find employees earning more than their department average.",
          tip: "Group by department, then compare with HAVING or a subquery."
        },
        {
          round: "Technical · Fundamentals",
          prompt: "What is the difference between a process and a thread?",
          tip: "Memory isolation, scheduling, and one real-world analogy."
        },
        {
          round: "Project",
          prompt: "Walk me through your best project — what did you build yourself?",
          tip: "Problem, stack, your contribution, result — in 2 minutes."
        },
        {
          round: "Coding",
          prompt: "Reverse a string without built-in reverse — talk through the approach.",
          tip: "Two pointers; mention space and time complexity."
        },
        {
          round: "HR",
          prompt: "Why do you want to join Wipro, and are you willing to relocate?",
          tip: "One honest reason about the company plus a clear yes."
        }
      ]}
      faqs={[
        {
          question: "How do I practice for Wipro interviews on Apply?",
          answer:
            "Open /dashboard/mock-interview, set company to Wipro and role to fresher or Graduate Engineer Trainee, and practice technical, project, and HR rounds with voice answers. Use /prepare/wipro-technical-interview and the Wipro blog guides for question lists."
        },
        {
          question: "Does Wipro mock practice cover the technical round?",
          answer:
            "Yes — sessions include OOP, SQL, OS basics, and project deep-dive questions, mirroring the Wipro technical panel."
        },
        {
          question: "Is Wipro mock interview practice free?",
          answer:
            "Yes after Google sign-in. Unlimited sessions with scored feedback on Apply."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/prepare/wipro-technical-interview",
          label: "Wipro technical interview guide"
        },
        {
          href: "/blog/wipro-interview-questions-freshers-2026",
          label: "Wipro interview questions for freshers"
        },
        {
          href: "/blog/wipro-technical-interview-questions",
          label: "Wipro technical interview questions"
        },
        {
          href: "/blog/wipro-elite-nth-preparation-guide",
          label: "Wipro Elite NTH preparation"
        },
        { href: "/pyqs", label: "Company coding PYQs" }
      ]}
      softwareName="Apply Wipro Interview Practice"
      ctaLabel="Start Wipro mock interview"
    />
  );
}
