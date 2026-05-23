const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://apply.neexmeet.com";

export const seoFaqs = [
  {
    question: "How does Apply optimize resumes for ATS?",
    answer:
      "Apply reads the job description, extracts role keywords, compares them with your resume, and rewrites supported summaries, skills, and bullets while keeping your experience truthful."
  },
  {
    question: "Is Apply useful for Indian engineering students and freshers?",
    answer:
      "Yes. Apply is written for Indian engineering students, CS freshers, internship seekers, and early-career applicants preparing resumes for IT services, startups, and product companies."
  },
  {
    question: "Can I upload my current resume instead of pasting content?",
    answer:
      "Yes. You can upload a PDF, Word document, text file, Markdown, or RTF resume. Apply extracts the content so you can improve or tailor it from the saved resume."
  },
  {
    question: "Does Apply create a different resume for every job description?",
    answer:
      "Yes. You upload your resume once, then generate a role-specific version for each job description, internship, or fresher opening."
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
    question: "Which cities and hiring markets is Apply built around?",
    answer:
      "Apply is relevant for students applying to internships and fresher roles across Bangalore, Hyderabad, Mumbai, Delhi NCR, Pune, Chennai, and remote openings."
  },
  {
    question: "How many resumes can I generate free?",
    answer:
      "The first 10 resume generations are free, so students can test role-specific resume tailoring before upgrading."
  }
] as const;

export const seoConfig = {
  name: "Apply",
  domain: "apply.neexmeet.com",
  url: appUrl,
  title: "Free AI Resume Builder for Indian Students | Apply",
  description:
    "Free AI resume builder for Indian engineering students and freshers. Upload once, generate ATS-optimized resumes for internships and jobs. First 10 free.",
  keywords: [
    "resume builder for engineering students India",
    "ATS resume optimizer for freshers",
    "internship resume builder free",
    "resume tailoring tool for students",
    "AI resume builder for Indian students",
    "how to optimize resume for ATS India",
    "student resume generator with job description",
    "fresher resume for IT companies India",
    "college student resume builder",
    "engineering internship resume tips",
    "cover letter generator for freshers",
    "interview preparation for freshers"
  ],
  publicRoutes: [
    "/",
    "/blog"
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
  inLanguage: "en-IN"
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": absoluteUrl("/#software"),
  name: "Apply - AI Resume Builder",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: seoConfig.url,
  description: seoConfig.description,
  audience: {
    "@type": "Audience",
    audienceType: "Indian engineering students, freshers, and internship seekers"
  },
  areaServed: {
    "@type": "Country",
    name: "India"
  },
  featureList: [
    "ATS resume optimization",
    "Resume tailoring from job descriptions",
    "Student resume builder",
    "Interview preparation plans",
    "PDF resume export"
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR"
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
