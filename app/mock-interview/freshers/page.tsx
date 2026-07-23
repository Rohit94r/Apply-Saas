import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/freshers";
const title = "Mock Interview Practice for Freshers India | Apply";
const description =
  "Mock interview practice for freshers in India — free AI voice mocks, HR + technical rounds, and scored feedback before campus placements. Start free on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "mock interview practice for freshers",
    "mock interview for freshers India",
    "interview preparation for freshers",
    "free mock interview for freshers",
    "AI mock interview for freshers",
    "campus placement mock interview",
    "online interview practice freshers"
  ]
});

export default function FreshersMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="Freshers · India"
      h1="Mock Interview Practice for Freshers India"
      intro="Campus drives move fast. Freshers who speak answers aloud before the real HR and technical rounds usually sound clearer than peers who only read PDFs. Practice free AI mock interviews on Apply, then pair with PYQs and an ATS resume."
      hiringNotes={[
        "Most fresher interviews open with Tell me about yourself — rehearse 60–90 seconds.",
        "Projects count as experience when you explain your role clearly.",
        "Do not invent metrics; panels ask follow-ups on anything you claim.",
        "Practice in English first; switch to Hindi/Tamil/Telugu/Marathi if your drive uses them."
      ]}
      sampleQuestions={[
        {
          round: "HR",
          prompt: "Tell me about yourself.",
          tip: "College → skills → one project → role you want."
        },
        {
          round: "HR",
          prompt: "Why should we hire you as a fresher?",
          tip: "Learning speed + one concrete project proof + culture fit."
        },
        {
          round: "Technical",
          prompt: "Explain OOP pillars with a real example from your project.",
          tip: "Encapsulation and inheritance examples beat textbook lists."
        },
        {
          round: "Technical",
          prompt: "What is the difference between SQL and NoSQL?",
          tip: "Schema, consistency, and one use case each."
        },
        {
          round: "Behavioral",
          prompt: "Describe a college project conflict and how you resolved it.",
          tip: "STAR format; focus on your actions, not blame."
        },
        {
          round: "HR",
          prompt: "Where do you see yourself in 3 years?",
          tip: "Skill growth and ownership — avoid vague ‘manager’ answers."
        }
      ]}
      faqs={[
        {
          question: "Is mock interview practice free for freshers in India?",
          answer:
            "Yes on Apply. Sign in with Google, open /dashboard/mock-interview, and run unlimited practice sessions with scored feedback."
        },
        {
          question: "Should freshers start with HR or technical mocks?",
          answer:
            "Start with mixed or HR if you freeze on Tell me about yourself. Add technical and Easy coding once you can speak project answers clearly."
        },
        {
          question: "How does this help interview preparation for freshers?",
          answer:
            "Interview preparation for freshers needs speaking practice, company PYQs, and an ATS resume. Apply links all three: /mock-interview, /pyqs, and /dashboard/generate."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/blog/interview-preparation-for-freshers",
          label: "Interview preparation for freshers"
        },
        {
          href: "/blog/mock-interviews-for-freshers",
          label: "Mock interviews for freshers"
        },
        {
          href: "/blog/fresher-resume-building-india",
          label: "Fresher resume building India"
        },
        {
          href: "/blog/hr-interview-questions-answers-freshers",
          label: "HR interview questions for freshers"
        },
        { href: "/pyqs", label: "Company PYQs for OA prep" }
      ]}
      softwareName="Apply Freshers Mock Interview Practice"
    />
  );
}
