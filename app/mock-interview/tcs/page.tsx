import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/tcs";
const title = "TCS Interview Practice — Free AI Mock | Apply";
const description =
  "TCS interview practice online — free AI mock interviews for NQT, Ninja, and Digital rounds. Voice questions, scored feedback, and TCS PYQs on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "TCS interview practice",
    "TCS mock interview",
    "TCS NQT interview",
    "TCS Ninja interview questions",
    "TCS Digital interview practice",
    "free TCS mock interview",
    "TCS technical interview freshers"
  ]
});

export default function TcsMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="TCS · NQT · Ninja · Digital"
      h1="TCS Interview Practice"
      intro="Prepare for TCS interviews with free AI mock practice — set company to TCS, rehearse HR and technical rounds, then review scored feedback. Pair with TCS NQT syllabus prep and company PYQs before your drive."
      hiringNotes={[
        "Clear NQT first — Foundation has negative marking (0.25 per wrong answer).",
        "Technical rounds focus on basics: C/Java/Python, OOP, DBMS, and your projects.",
        "Know your resume line-by-line; TCS panels probe project ownership.",
        "Digital/Prime tracks expect stronger coding than Ninja — enable coding in mocks once Easy PYQs feel steady."
      ]}
      sampleQuestions={[
        {
          round: "HR",
          prompt: "Why do you want to join TCS?",
          tip: "Learning + scale of projects + long-term skill growth — keep it sincere."
        },
        {
          round: "Technical",
          prompt: "Explain the four pillars of OOP with examples.",
          tip: "Use your project classes, not only textbook definitions."
        },
        {
          round: "Technical",
          prompt: "What is normalization in DBMS? Why does it matter?",
          tip: "1NF–3NF briefly; relate to avoiding duplicate data."
        },
        {
          round: "Coding",
          prompt: "Write a program to reverse a string without using built-in reverse.",
          tip: "Two pointers; discuss Unicode/edge cases if asked."
        },
        {
          round: "Project",
          prompt: "Walk through the architecture of your final-year project.",
          tip: "Modules, data flow, your contribution, and one challenge."
        },
        {
          round: "HR",
          prompt: "Are you comfortable with night shifts or relocation?",
          tip: "Answer honestly; TCS often asks location flexibility."
        }
      ]}
      faqs={[
        {
          question: "How do I practice for a TCS interview on Apply?",
          answer:
            "Open /dashboard/mock-interview, set company to TCS and your target role (e.g. System Engineer), choose mixed rounds, and speak answers aloud. Use /mock-interview/tcs for sample questions and /pyqs for TCS coding PYQs."
        },
        {
          question: "Should I prepare NQT and the interview together?",
          answer:
            "Yes in parallel. Use the TCS NQT 2026 guide for syllabus and negative marking, solve TCS PYQs, then run voice mocks for the interview round."
        },
        {
          question: "Is TCS mock interview practice free?",
          answer:
            "Yes. Start free after Google sign-in. Unlimited sessions with scored feedback."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        { href: "/blog/tcs-nqt-2026", label: "TCS NQT 2026 guide" },
        {
          href: "/prepare/tcs-interview-questions-2026",
          label: "TCS interview questions prepare guide"
        },
        {
          href: "/blog/tcs-resume-format-for-freshers",
          label: "TCS resume format for freshers"
        },
        { href: "/pyqs", label: "TCS coding PYQs" },
        {
          href: "/blog/mock-interview-practice-online-free",
          label: "Mock interview practice online free"
        }
      ]}
      softwareName="Apply TCS Mock Interview Practice"
      ctaLabel="Start TCS mock interview"
    />
  );
}
