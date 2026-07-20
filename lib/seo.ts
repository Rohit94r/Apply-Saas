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
      "Yes. Apply includes company prep guides, a 64+ company previous year coding questions (PYQs) library, interview guides from your resume + JD, and an AI mock interview with voice and optional coding rounds."
  },
  {
    question: "Where can I find previous year coding questions for companies?",
    answer:
      "Open Apply's free Company PYQs Library at /pyqs — previous year coding question papers and OA guides for TCS, Infosys, Amazon, Zoho, Google, Flipkart, Goldman Sachs, Deloitte, and 60+ more companies."
  },
  {
    question: "Is there an AI mock interview on Apply?",
    answer:
      "Yes. The web mock interview is a Meet-style practice room with ElevenLabs voice, multilingual options, coding questions, scored feedback, and session history. Start at /mock-interview."
  },
  {
    question: "Is company name mandatory?",
    answer:
      "No. Company and role are optional for resume tailoring. If you do not have them yet, Apply can still work from the job description and your resume."
  },
  {
    question: "Which job markets does Apply support?",
    answer:
      "Apply works globally. Job search links cover LinkedIn, Indeed, Reed, USAJOBS, and other boards depending on your profile and location. PYQs and company guides focus on Indian campus placements."
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
  title:
    "Placement Prep: Resumes, PYQs & Mock Interviews | Apply",
  description:
    "India's placement preparation platform — ATS resumes, 64+ company previous year coding questions (PYQs), AI mock interviews, job match, and company prep guides. Free to start.",
  keywords: [
    "placement preparation for students",
    "free AI mock interview for freshers",
    "mock interview practice online",
    "company previous year coding questions",
    "campus placement coding PYQs",
    "AI mock interview for freshers",
    "fresher salary India IT companies",
    "ATS resume builder for students",
    "resume tailoring from job description",
    "job matching for freshers",
    "company placement prep guides",
    "fresher resume format",
    "online mock interview with coding",
    "freelancing for college students"
  ],
  publicRoutes: [
    "/",
    "/blog",
    "/prepare",
    "/pyqs",
    "/mock-interview"
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
    "Company previous year coding questions (PYQs)",
    "AI mock interview practice",
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
