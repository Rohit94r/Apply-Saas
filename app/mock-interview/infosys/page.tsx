import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/infosys";
const title = "Infosys Interview Practice — Free AI Mock | Apply";
const description =
  "Infosys interview practice online — free AI mock interviews for InfyTQ, SP, and DSE tracks. Voice practice, scored feedback, and PYQs on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "Infosys interview practice",
    "Infosys mock interview",
    "InfyTQ interview",
    "Infosys SP DSE interview",
    "Infosys technical interview freshers",
    "free Infosys mock interview",
    "Infosys HR interview questions"
  ]
});

export default function InfosysMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="Infosys · InfyTQ · SP · DSE"
      h1="Infosys Interview Practice"
      intro="Rehearse Infosys interviews with free AI mock practice — HR, technical, and project rounds with scored feedback. Pair with Infosys prepare guides and company PYQs before InfyTQ or campus drives."
      hiringNotes={[
        "InfyTQ / certification paths often feed into interview shortlists — know your cert topics.",
        "SP and DSE tracks expect stronger DSA and problem-solving than generic System Engineer roles.",
        "Explain projects clearly; Infosys panels ask about teamwork and learning agility.",
        "Brush up DBMS, OOP, and one programming language end-to-end."
      ]}
      sampleQuestions={[
        {
          round: "HR",
          prompt: "Why Infosys?",
          tip: "Training culture, digital projects, and skills you want to build — be specific."
        },
        {
          round: "Technical",
          prompt: "Difference between ArrayList and LinkedList in Java?",
          tip: "Access time vs insert/delete; pick based on use case."
        },
        {
          round: "Technical",
          prompt: "Explain primary key vs foreign key with an example.",
          tip: "Use a simple students–courses schema."
        },
        {
          round: "Coding",
          prompt: "Find the frequency of each character in a string.",
          tip: "Hash map; discuss case sensitivity."
        },
        {
          round: "Project",
          prompt: "What was the hardest bug in your project and how did you debug it?",
          tip: "Tools used, hypothesis, fix, and prevention."
        },
        {
          round: "HR",
          prompt: "Are you open to working in any Infosys location?",
          tip: "Answer honestly; flexibility is often valued."
        }
      ]}
      faqs={[
        {
          question: "How do I do Infosys interview practice on Apply?",
          answer:
            "Open /dashboard/mock-interview, set company to Infosys and your role, then speak answers in the Meet-style room. Use this page for sample questions and /pyqs for coding PYQs."
        },
        {
          question: "Does Apply cover Infosys SP / DSE preparation?",
          answer:
            "Yes. Read /blog/infosys-sp-dse-preparation-guide, browse PYQs, and run technical mocks with coding enabled once Easy problems feel comfortable."
        },
        {
          question: "Is Infosys mock interview practice free?",
          answer:
            "Yes after Google sign-in. Unlimited sessions with scored feedback."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/blog/infosys-sp-dse-preparation-guide",
          label: "Infosys SP DSE preparation guide"
        },
        {
          href: "/prepare/infosys-resume-format",
          label: "Infosys resume format prepare guide"
        },
        { href: "/pyqs", label: "Infosys coding PYQs" },
        {
          href: "/blog/mock-interview-practice-online-free",
          label: "Mock interview practice online free"
        },
        {
          href: "/blog/interview-preparation-for-freshers",
          label: "Interview preparation for freshers"
        }
      ]}
      softwareName="Apply Infosys Mock Interview Practice"
      ctaLabel="Start Infosys mock interview"
    />
  );
}
