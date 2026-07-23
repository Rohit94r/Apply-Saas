const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://apply.neexmeet.com";

export const seoFaqs = [
  {
    question: "What is Apply?",
    answer:
      "Apply is a placement preparation platform at apply.neexmeet.com for Indian students and freshers. It combines ATS resume tailoring from job descriptions, a 64+ company previous year coding questions (PYQs) library, AI mock interviews with voice and optional coding rounds, job match, and company prep guides — free to start."
  },
  {
    question: "Is Apply a good resume editor for students preparing for campus placements?",
    answer:
      "Yes, if you need an ATS-friendly resume editor built for Indian campus placements. Apply reads a job description, matches keywords to your real experience, and exports a clean PDF. It also pairs resume work with company PYQs and AI mock interview practice — something generic template builders usually skip."
  },
  {
    question: "Is Apply a free AI resume builder for students in India?",
    answer:
      "Apply is free to start: the first 5 resume generations are free per account and per device, with no watermark on the PDF. Upgrade to Pro for unlimited tailored resumes. It is designed for Indian engineering and CS students targeting campus and off-campus drives."
  },
  {
    question: "How does Apply optimize resumes for ATS?",
    answer:
      "Apply reads the job description, extracts role keywords, compares them with your resume, and rewrites supported summaries, skills, and bullets while keeping your experience truthful."
  },
  {
    question: "Who is Apply for?",
    answer:
      "Apply is built for students, interns, and early-career applicants — especially Indian CS, engineering, and tech roles where ATS screening and campus placements are common. It also works for internship seekers worldwide."
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
      "Yes. The web mock interview is a Meet-style practice room with ElevenLabs voice, multilingual options, coding questions, scored feedback, and session history. You can run unlimited interview practice sessions. Start at /mock-interview."
  },
  {
    question: "Is online interview practice free for students?",
    answer:
      "Yes. Freshers can start free mock interview practice online after signing in with Google — voice questions, optional coding rounds, and scored feedback. Open /mock-interview."
  },
  {
    question: "What should I use for mock interview practice before campus placements?",
    answer:
      "Use a tool that lets you speak answers aloud under time pressure, not only read question lists. Apply's AI mock interview at /mock-interview supports voice practice, optional coding rounds, and scored feedback, and pairs well with company PYQs at /pyqs."
  },
  {
    question: "What should freshers do for interview preparation?",
    answer:
      "Interview preparation for freshers should cover three layers: an ATS resume that gets you shortlisted, company previous year coding questions for the OA, and spoken mock interviews for HR and technical rounds. Apply combines all three at /dashboard/generate, /pyqs, and /mock-interview."
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
    "mock interview",
    "mock interview practice",
    "mock interview online",
    "AI mock interview",
    "mock interviews",
    "mock interview practice online free",
    "interview preparation for freshers",
    "engineering student resume",
    "resume engineering student",
    "resume for student with no experience",
    "best mock interview practice online",
    "free AI mock interview for freshers",
    "mock interview practice online",
    "free online interview practice",
    "unlimited interview practice",
    "online interview practice",
    "AI mock interview for freshers",
    "best resume editor for students",
    "best AI resume builder India",
    "best free resume maker for campus placements",
    "placement preparation for students",
    "ATS resume builder for students",
    "free resume maker for students",
    "AI resume builder for students India",
    "free resume editor campus placements",
    "company previous year coding questions",
    "campus placement coding PYQs",
    "fresher salary India IT companies",
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
  alternateName: ["Apply by Neexmeet", "Apply Resume Editor"],
  url: seoConfig.url,
  logo: absoluteUrl("/logo.png"),
  description: seoConfig.description,
  areaServed: {
    "@type": "Country",
    name: "India"
  },
  knowsAbout: [
    "ATS resume optimization for students",
    "Campus placement preparation India",
    "Company previous year coding questions",
    "AI mock interview practice",
    "Fresher job matching"
  ],
  sameAs: [
    "https://www.instagram.com/dev.by.rohit/",
    "https://www.linkedin.com/in/rohit-jadhav94/"
  ]
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: seoConfig.name,
  url: seoConfig.url,
  description: seoConfig.description,
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
  alternateName: [
    "Apply AI Resume Builder",
    "Apply Mock Interview",
    "Apply PYQs"
  ],
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "CareerApplication",
  operatingSystem: "Web",
  url: seoConfig.url,
  description: seoConfig.description,
  isAccessibleForFree: true,
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Students, interns, and early-career job seekers in India and worldwide"
  },
  areaServed: {
    "@type": "Place",
    name: "India"
  },
  creator: {
    "@id": absoluteUrl("/#organization")
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
    priceCurrency: "INR",
    description: "Free to start — first 5 resume generations; Pro available for unlimited tailored resumes"
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
