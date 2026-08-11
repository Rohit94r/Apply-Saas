import {
  MockInterviewCompanyPage,
  buildMockInterviewPageMetadata,
  relatedMockInterviewPages
} from "@/components/landing/mock-interview-company-page";

const path = "/mock-interview/google";
const title = "Google Interview Practice — Free AI Mock | Apply";
const description =
  "Google interview practice online — free AI mock interviews for SWE Intern and new-grad roles. Algorithm rounds, phone-screen style coding, and scored feedback on Apply.";

export const metadata = buildMockInterviewPageMetadata({
  title,
  description,
  path,
  keywords: [
    "Google interview practice",
    "Google mock interview",
    "Google SWE intern interview",
    "Google phone screen practice",
    "Google interview preparation India",
    "free Google mock interview"
  ]
});

export default function GoogleMockInterviewPage() {
  return (
    <MockInterviewCompanyPage
      title={title}
      description={description}
      path={path}
      eyebrow="Google · SWE Intern · New Grad"
      h1="Google Interview Practice"
      intro="Practice Google interviews with free AI mocks — algorithm problem solving, phone-screen style coding, and clear communication under pressure. Pair with Google internship prep guides before your interviews."
      hiringNotes={[
        "Google loops are problem-solving heavy — expect to explain approaches out loud, not just code.",
        "The phone screen is a real filter; practice coding in a plain editor without autocomplete.",
        "Interviewers value clear communication, correct complexity, and how you handle follow-up constraints.",
        "Resume screens matter first — pair practice with a role-matched resume."
      ]}
      sampleQuestions={[
        {
          round: "Phone screen · DSA",
          prompt: "Given a list of integers, find two numbers that add up to a target — optimize with a hash map.",
          tip: "State brute force, then the hash map approach and O(n) complexity."
        },
        {
          round: "Coding",
          prompt: "Merge two sorted arrays in O(n + m) time — walk through edge cases.",
          tip: "Two pointers; handle empty arrays and duplicates explicitly."
        },
        {
          round: "Algorithms",
          prompt: "Find the longest substring without repeating characters.",
          tip: "Sliding window with a set — discuss why the window moves."
        },
        {
          round: "Data Structures",
          prompt: "Design a LRU cache from scratch — explain the data structures you need.",
          tip: "Hash map plus doubly linked list; talk through get and put."
        },
        {
          round: "Technical",
          prompt: "Explain how a web request travels from browser to server and back.",
          tip: "DNS, TCP, HTTP, server, response — one clean narrative."
        },
        {
          round: "Behavioral",
          prompt: "Tell me about a time you led a project and how you handled disagreements.",
          tip: "STAR structure with a clear result and a lesson."
        }
      ]}
      faqs={[
        {
          question: "How do I practice for Google interviews on Apply?",
          answer:
            "Open /dashboard/mock-interview, set company to Google and role to SWE Intern or new grad, enable coding when ready, and solve problems aloud with the AI interviewer. Use /prepare/google-step-resume and the Google internship guides in the blog for resume and process prep."
        },
        {
          question: "Do Google mock interviews include a phone screen?",
          answer:
            "Yes — run a session in phone-screen style: one or two algorithm problems in a plain shared editor, explained out loud, timed to 45 minutes."
        },
        {
          question: "Is Google mock interview practice free?",
          answer:
            "Yes after Google sign-in. Unlimited sessions with scored feedback on Apply."
        }
      ]}
      relatedPages={relatedMockInterviewPages(path)}
      relatedGuides={[
        {
          href: "/prepare/google-step-resume",
          label: "Google STEP resume prepare guide"
        },
        {
          href: "/blog/google-internship-interview-process",
          label: "Google internship interview process"
        },
        {
          href: "/blog/resume-for-google-internship",
          label: "Resume for Google internship"
        },
        {
          href: "/blog/system-design-interview-questions-freshers",
          label: "System design interview questions"
        },
        { href: "/pyqs", label: "Company coding PYQs" }
      ]}
      softwareName="Apply Google Interview Practice"
      ctaLabel="Start Google mock interview"
    />
  );
}
