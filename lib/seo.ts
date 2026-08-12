const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://apply.neexmeet.com";

export const seoFaqs = [
  {
    question: "What is Apply?",
    answer:
      "Apply is a free AI career prep platform at apply.neexmeet.com for students and freshers. It combines an ATS-friendly resume builder with free AI mock interview practice (voice + optional coding), a 64+ company previous year coding questions (PYQs) library, job match, and company prep guides — free to start."
  },
  {
    question: "Is Apply a free AI mock interview practice platform?",
    answer:
      "Yes. Apply offers free AI mock interview practice online after Google sign-in — Meet-style room, ElevenLabs voice, multilingual options, optional coding rounds, and scored feedback. Open /mock-interview to start unlimited practice sessions."
  },
  {
    question: "What should I use for mock interview practice before campus placements?",
    answer:
      "Use a tool that lets you speak answers aloud under time pressure, not only read question lists. Apply's AI mock interview at /mock-interview supports voice practice, optional coding rounds, and scored feedback, and pairs well with company PYQs at /pyqs and an ATS resume on Apply."
  },
  {
    question: "Is online interview practice free for students?",
    answer:
      "Yes. Freshers can start free mock interview practice online after signing in with Google — voice questions, optional coding rounds, and scored feedback. Open /mock-interview."
  },
  {
    question: "What should freshers do for interview preparation?",
    answer:
      "Interview preparation for freshers should cover three layers: spoken mock interviews for HR and technical rounds, company previous year coding questions for the OA, and an ATS resume that gets you shortlisted. Apply combines all three at /mock-interview, /pyqs, and /dashboard/generate."
  },
  {
    question: "Is Apply a good resume editor for students preparing for campus placements?",
    answer:
      "Yes, if you need an ATS-friendly resume editor built for Indian campus placements. Apply reads a job description, matches keywords to your real experience, and exports a clean PDF. It pairs resume work with company PYQs and AI mock interview practice — something generic template builders usually skip."
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
      "Apply is built for students, interns, and early-career applicants — especially Indian CS, engineering, and tech roles where campus placements, mock interviews, and ATS screening are common. It also works for internship seekers worldwide."
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
      "Yes. Apply's core interview prep is the AI mock interview with voice and optional coding rounds, plus company prep guides, a 64+ company PYQs library, and interview guides from your resume + JD."
  },
  {
    question: "Where can I find previous year coding questions for companies?",
    answer:
      "Open Apply's free Company PYQs Library at /pyqs — previous year coding question papers and OA guides for TCS, Infosys, Amazon, Zoho, Google, Flipkart, Goldman Sachs, Deloitte, and 60+ more companies."
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

export const mockInterviewSubpages = [
  "/mock-interview/software-engineer",
  "/mock-interview/freshers",
  "/mock-interview/tcs",
  "/mock-interview/infosys",
  "/mock-interview/amazon",
  "/mock-interview/google",
  "/mock-interview/wipro",
  "/mock-interview/flipkart",
  "/mock-interview/zomato",
  "/mock-interview/microsoft",
  "/mock-interview/razorpay",
  "/mock-interview/phonepe",
  "/mock-interview/swiggy"
] as const;

export const seoConfig = {
  name: "Apply",
  domain: "apply.neexmeet.com",
  url: appUrl,
  // Durable sitewide default — keep distinct from /mock-interview; do not flip daily.
  title: "Free AI Resume Builder & Mock Interview Practice — Apply",
  description:
    "Build ATS-friendly resumes and practice free AI mock interviews with voice & optional coding. 64+ company PYQs, placement guides, and campus or off-campus job prep. Free to start.",
  keywords: [
    "mock interview",
    "mock interview practice",
    "mock interview online",
    "AI mock interview",
    "free AI mock interview",
    "mock interviews",
    "mock interview practice online free",
    "free online interview practice",
    "online mock interview",
    "mock interview platform",
    "interview preparation for freshers",
    "engineering student resume",
    "resume engineering student",
    "engineer student resume",
    "resume for student with no experience",
    "best ats friendly resume builder india",
    "best mock interview practice online",
    "free AI mock interview for freshers",
    "mock interview practice online",
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
    "freelancing for college students",
    "how to get job off campus",
    "off campus placement preparation",
    "campus placement preparation",
    "amazon oa questions",
    "amazon online assessment preparation",
    "flipkart grid 2026",
    "flipkart grid eligibility criteria",
    "tcs nqt 2026",
    "tcs nqt negative marking",
    "infosys sp dse preparation",
    "infosys sp dse coding questions",
    "wipro technical interview questions",
    "zomato sde interview experience",
    "razorpay interview questions",
    "phonepe interview questions",
    "group discussion for campus placement",
    "group discussion topics",
    "mock interview questions for freshers",
    "how to give interview for freshers",
    "internship cover letter",
    "resume for it freshers",
    "resume skills section for freshers",
    "one page vs two page resume",
    "ats score",
    "system design interview for freshers",
    "dsa roadmap for campus placements",
    "off campus vs campus placement",
    "portfolio website for students"
  ],
  publicRoutes: [
    "/",
    "/blog",
    "/prepare",
    "/pyqs",
    "/mock-interview",
    ...mockInterviewSubpages
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
  alternateName: ["Apply by Neexmeet", "Apply Mock Interview", "Apply AI Resume Builder", "Apply Resume Editor"],
  url: seoConfig.url,
  logo: absoluteUrl("/logo.png"),
  description: seoConfig.description,
  areaServed: {
    "@type": "Country",
    name: "India"
  },
  knowsAbout: [
    "AI mock interview practice",
    "Free online interview practice for freshers",
    "Campus placement preparation India",
    "Off campus placement preparation",
    "Company previous year coding questions",
    "ATS resume optimization for students",
    "Free AI resume builder for students",
    "Fresher job matching",
    "Engineering student resume tips"
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
  name: "Apply — Free AI Resume Builder & Mock Interview Practice",
  alternateName: [
    "Apply Mock Interview",
    "Apply AI Resume Builder",
    "Apply PYQs",
    "Apply Resume Editor"
  ],
  applicationCategory: "EducationalApplication",
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
    "Free AI mock interview practice with voice",
    "Optional coding rounds in the interview room",
    "Company previous year coding questions (PYQs)",
    "ATS resume optimization",
    "Resume tailoring from job descriptions",
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
    description:
      "Free to start — AI mock interviews after Google sign-in; first 5 resume generations free; Pro for unlimited tailored resumes"
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
