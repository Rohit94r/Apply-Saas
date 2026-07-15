const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://apply.neexmeet.com";

export const seoFaqs = [
  {
    question: "How does Apply optimize resumes for ATS?",
    answer:
      "Apply reads the job description, extracts role keywords, compares them with your resume, and rewrites supported summaries, skills, and bullets while keeping your experience truthful."
  },
  {
    question: "Who is Apply for?",
    answer:
      "Apply is built for students, interns, and early-career applicants anywhere in the world — especially CS, engineering, and tech roles where ATS screening is common."
  },
  {
    question: "Can I upload my current resume instead of pasting content?",
    answer:
      "Yes. You can upload a PDF, Word document, text file, Markdown, or RTF resume. Apply extracts the content so you can improve or tailor it from the saved resume."
  },
  {
    question: "Does Apply create a different resume for every job description?",
    answer:
      "Yes. You upload your resume once, then generate a role-specific version for each job description, internship, or entry-level opening."
  },
  {
    question: "Will Apply invent fake experience or metrics?",
    answer:
      "No. Apply is designed to improve wording, clarity, keyword coverage, and structure using evidence already present in your resume."
  },
  {
    question: "Can I download an ATS-friendly PDF?",
    answer:
      "Yes. Generated resumes can be previewed, edited, saved, and downloaded as clean PDFs suitable for applicant tracking systems."
  },
  {
    question: "Does Apply help with interview preparation?",
    answer:
      "Yes. The interview prep tool uses your current resume and the job description to create coding practice, project questions, HR prompts, and a study roadmap."
  },
  {
    question: "Is company name mandatory?",
    answer:
      "No. Company and role are optional. If you do not have them yet, Apply can still work from the job description and your resume."
  },
  {
    question: "Which job markets does Apply support?",
    answer:
      "Apply works globally. Job search links cover LinkedIn, Indeed, Reed, USAJOBS, and other boards depending on your profile and location."
  },
  {
    question: "How many resumes can I generate free?",
    answer:
      "The first 5 resume generations are free worldwide — per account and per device. Upgrade to Pro for unlimited tailored resumes."
  }
] as const;

export const seoConfig = {
  name: "Apply",
  domain: "apply.neexmeet.com",
  url: appUrl,
  title: "Placement Prep: Resume, Jobs & Interviews | Apply",
  description:
    "India's placement preparation platform — tailor ATS resumes, find matching jobs, prep interviews, and learn skills. Free to start. Desktop Interview Copilot coming soon.",
  keywords: [
    "India placement preparation platform",
    "TCS interview questions",
    "Infosys resume format",
    "campus placement prep India",
    "free resume builder for students",
    "ATS resume optimizer",
    "internship resume builder free",
    "resume tailoring tool",
    "AI resume builder",
    "job search for students",
    "interview preparation for students",
    "how to optimize resume for ATS",
    "student resume generator with job description",
    "entry level resume builder",
    "college student resume builder",
    "cover letter generator",
    "mock interview practice",
    "freelance jobs for students"
  ],
  publicRoutes: [
    "/",
    "/blog",
    "/prepare",
    "/downloads"
  ]
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, seoConfig.url).toString();
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: seoConfig.name,
  url: seoConfig.url,
  logo: absoluteUrl("/logo.png")
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: seoConfig.name,
  url: seoConfig.url,
  publisher: {
    "@id": absoluteUrl("/#organization")
  },
  inLanguage: "en"
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": absoluteUrl("/#software"),
  name: "Apply — Placement Preparation Platform",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: seoConfig.url,
  description: seoConfig.description,
  audience: {
    "@type": "Audience",
    audienceType: "Students, interns, and early-career job seekers in India and worldwide"
  },
  areaServed: {
    "@type": "Place",
    name: "India"
  },
  featureList: [
    "ATS resume optimization",
    "Resume tailoring from job descriptions",
    "Mock interview practice",
    "Application / placement tracker",
    "Offer comparison",
    "Company placement prep guides",
    "Interview preparation plans",
    "PDF resume export"
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  }
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: seoFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};
