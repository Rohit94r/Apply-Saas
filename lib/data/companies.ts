export type CompanyProfile = {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  headquarters: string;
  hiringFocus: string[];
  commonRoles: string[];
  interviewStyle: string;
  cultureNotes: string;
};

const companies: CompanyProfile[] = [
  {
    id: "google",
    name: "Google",
    domain: "google.com",
    industry: "Technology",
    size: "100,000+",
    headquarters: "Mountain View, CA",
    hiringFocus: ["DSA", "System Design", "Problem solving", "Googliness"],
    commonRoles: [
      "Software Engineer",
      "SDE Intern",
      "Full Stack Developer",
      "Data Engineer"
    ],
    interviewStyle:
      "2-4 coding rounds, system design for mid-level+, behavioral (Googliness).",
    cultureNotes: "Strong emphasis on scalable thinking and clean code."
  },
  {
    id: "amazon",
    name: "Amazon",
    domain: "amazon.com",
    industry: "Technology / E-commerce",
    size: "1,500,000+",
    headquarters: "Seattle, WA",
    hiringFocus: ["Leadership Principles", "DSA", "System Design", "OOP"],
    commonRoles: [
      "SDE 1",
      "SDE Intern",
      "Backend Developer",
      "Cloud Engineer"
    ],
    interviewStyle:
      "LP-based behavioral + coding + system design. Bar raiser round common.",
    cultureNotes: "Every answer should tie back to Leadership Principles."
  },
  {
    id: "microsoft",
    name: "Microsoft",
    domain: "microsoft.com",
    industry: "Technology",
    size: "220,000+",
    headquarters: "Redmond, WA",
    hiringFocus: ["DSA", "OOP", "System Design", "Collaboration"],
    commonRoles: [
      "Software Engineer",
      "SDE Intern",
      "Cloud Developer",
      "Frontend Engineer"
    ],
    interviewStyle: "Coding + design + behavioral. Often collaborative whiteboard.",
    cultureNotes: "Growth mindset and teamwork are heavily evaluated."
  },
  {
    id: "tcs",
    name: "TCS",
    domain: "tcs.com",
    industry: "IT Services",
    size: "600,000+",
    headquarters: "Mumbai, India",
    hiringFocus: ["Aptitude", "C/Java basics", "Communication", "Projects"],
    commonRoles: [
      "Assistant System Engineer",
      "Graduate Trainee",
      "Java Developer",
      "Full Stack Developer"
    ],
    interviewStyle:
      "Aptitude + technical MCQ + HR. Project discussion for experienced hires.",
    cultureNotes: "Strong fit for freshers; focus on fundamentals and attitude."
  },
  {
    id: "infosys",
    name: "Infosys",
    domain: "infosys.com",
    industry: "IT Services",
    size: "300,000+",
    headquarters: "Bengaluru, India",
    hiringFocus: ["Aptitude", "Programming basics", "Communication", "Puzzles"],
    commonRoles: [
      "Systems Engineer",
      "Digital Specialist Engineer",
      "Java Developer",
      "React Developer"
    ],
    interviewStyle: "Online test + technical + HR. Puzzle rounds in some drives.",
    cultureNotes: "Structured training program for new joiners."
  },
  {
    id: "wipro",
    name: "Wipro",
    domain: "wipro.com",
    industry: "IT Services",
    size: "230,000+",
    headquarters: "Bengaluru, India",
    hiringFocus: ["Aptitude", "C/C++", "Communication", "Domain basics"],
    commonRoles: [
      "Project Engineer",
      "Software Developer",
      "Full Stack Developer",
      "Data Analyst"
    ],
    interviewStyle: "Written/aptitude + technical + HR panel.",
    cultureNotes: "Good entry point for campus placements across India."
  },
  {
    id: "flipkart",
    name: "Flipkart",
    domain: "flipkart.com",
    industry: "E-commerce",
    size: "30,000+",
    headquarters: "Bengaluru, India",
    hiringFocus: ["DSA", "System Design", "Projects", "Scalability"],
    commonRoles: [
      "SDE 1",
      "SDE Intern",
      "Backend Engineer",
      "Frontend Engineer"
    ],
    interviewStyle: "DSA-heavy rounds + system design + project deep dive.",
    cultureNotes: "High-volume, low-latency systems experience valued."
  },
  {
    id: "swiggy",
    name: "Swiggy",
    domain: "swiggy.com",
    industry: "Food Tech",
    size: "5,000+",
    headquarters: "Bengaluru, India",
    hiringFocus: ["DSA", "Backend", "API Design", "Real-time systems"],
    commonRoles: [
      "Backend Developer",
      "SDE Intern",
      "Full Stack Developer",
      "Mobile Developer"
    ],
    interviewStyle: "Coding + system design + past project ownership.",
    cultureNotes: "Startup pace; ownership and impact matter more than titles."
  },
  {
    id: "razorpay",
    name: "Razorpay",
    domain: "razorpay.com",
    industry: "Fintech",
    size: "3,000+",
    headquarters: "Bengaluru, India",
    hiringFocus: ["DSA", "Payments domain", "System Design", "Security"],
    commonRoles: [
      "Backend Engineer",
      "Full Stack Developer",
      "SDE Intern",
      "Platform Engineer"
    ],
    interviewStyle: "DSA + design + fintech/payments discussion.",
    cultureNotes: "Fintech reliability and API design are key themes."
  },
  {
    id: "zoho",
    name: "Zoho",
    domain: "zoho.com",
    industry: "SaaS",
    size: "15,000+",
    headquarters: "Chennai, India",
    hiringFocus: ["Programming", "Logic", "Problem solving", "Self-learning"],
    commonRoles: [
      "Software Developer",
      "Full Stack Developer",
      "Backend Developer",
      "QA Engineer"
    ],
    interviewStyle: "Logic puzzles + programming + practical problem solving.",
    cultureNotes: "Product-building mindset; less emphasis on LeetCode grinding."
  },
  {
    id: "accenture",
    name: "Accenture",
    domain: "accenture.com",
    industry: "Consulting / IT",
    size: "750,000+",
    headquarters: "Dublin, Ireland",
    hiringFocus: ["Aptitude", "Communication", "Cloud basics", "Projects"],
    commonRoles: [
      "Associate Software Engineer",
      "Full Stack Developer",
      "Cloud Associate",
      "Data Analyst"
    ],
    interviewStyle: "Aptitude + technical + HR. Cloud certifications help.",
    cultureNotes: "Global client projects; communication skills are critical."
  },
  {
    id: "cognizant",
    name: "Cognizant",
    domain: "cognizant.com",
    industry: "IT Services",
    size: "350,000+",
    headquarters: "Teaneck, NJ",
    hiringFocus: ["Aptitude", "Java/.NET", "SQL", "Communication"],
    commonRoles: [
      "Programmer Analyst",
      "Full Stack Developer",
      "Java Developer",
      "Data Engineer"
    ],
    interviewStyle: "Online assessment + technical + HR.",
    cultureNotes: "Large fresher intake; solid fundamentals expected."
  },
  {
    id: "meta",
    name: "Meta",
    domain: "meta.com",
    industry: "Technology / Social",
    size: "70,000+",
    headquarters: "Menlo Park, CA",
    hiringFocus: ["DSA", "System Design", "Product sense", "Behavioral"],
    commonRoles: [
      "Software Engineer",
      "E4/E5 Engineer",
      "Frontend Engineer",
      "ML Engineer"
    ],
    interviewStyle: "2 coding + 1 design + behavioral. Fast-paced rounds.",
    cultureNotes: "Move fast; strong coding under time pressure expected."
  },
  {
    id: "apple",
    name: "Apple",
    domain: "apple.com",
    industry: "Technology / Hardware",
    size: "160,000+",
    headquarters: "Cupertino, CA",
    hiringFocus: ["DSA", "System Design", "Craft", "Cross-functional work"],
    commonRoles: [
      "Software Engineer",
      "iOS Developer",
      "Backend Engineer",
      "Tools Engineer"
    ],
    interviewStyle: "Deep technical + design + culture fit. Portfolio matters.",
    cultureNotes: "Attention to detail and user experience are paramount."
  },
  {
    id: "netflix",
    name: "Netflix",
    domain: "netflix.com",
    industry: "Streaming / Technology",
    size: "14,000+",
    headquarters: "Los Gatos, CA",
    hiringFocus: ["System Design", "Distributed systems", "Ownership", "Judgment"],
    commonRoles: [
      "Senior Software Engineer",
      "Backend Engineer",
      "Platform Engineer",
      "Data Engineer"
    ],
    interviewStyle: "System design heavy. Senior-level ownership expected.",
    cultureNotes: "Freedom and responsibility culture; high bar for seniors."
  },
  {
    id: "jpmorgan",
    name: "JPMorgan Chase",
    domain: "jpmorganchase.com",
    industry: "Finance / Banking",
    size: "300,000+",
    headquarters: "New York, NY",
    hiringFocus: ["Java", "DSA", "Finance basics", "Problem solving"],
    commonRoles: [
      "Software Engineer",
      "Technology Analyst",
      "Full Stack Developer",
      "Quant Developer"
    ],
    interviewStyle: "Coding + finance domain + behavioral.",
    cultureNotes: "Stability and correctness matter in financial systems."
  },
  {
    id: "deloitte",
    name: "Deloitte",
    domain: "deloitte.com",
    industry: "Consulting",
    size: "450,000+",
    headquarters: "London, UK",
    hiringFocus: ["Aptitude", "Communication", "Case studies", "Tech basics"],
    commonRoles: [
      "Analyst",
      "Technology Consultant",
      "Full Stack Developer",
      "Data Analyst"
    ],
    interviewStyle: "Case + technical + HR. Business acumen valued.",
    cultureNotes: "Consulting mindset; client-facing communication essential."
  },
  {
    id: "capgemini",
    name: "Capgemini",
    domain: "capgemini.com",
    industry: "IT Services",
    size: "340,000+",
    headquarters: "Paris, France",
    hiringFocus: ["Aptitude", "Java", "SQL", "Communication"],
    commonRoles: [
      "Software Engineer",
      "Consultant",
      "Full Stack Developer",
      "Cloud Engineer"
    ],
    interviewStyle: "Online test + technical + HR panel.",
    cultureNotes: "European clients; multilingual skills can help."
  },
  {
    id: "hcl",
    name: "HCLTech",
    domain: "hcltech.com",
    industry: "IT Services",
    size: "220,000+",
    headquarters: "Noida, India",
    hiringFocus: ["Aptitude", "C/Java", "Communication", "Projects"],
    commonRoles: [
      "Software Engineer",
      "Graduate Engineer Trainee",
      "Full Stack Developer",
      "DevOps Engineer"
    ],
    interviewStyle: "Aptitude + technical + HR.",
    cultureNotes: "Strong campus presence across tier 2/3 colleges."
  },
  {
    id: "paytm",
    name: "Paytm",
    domain: "paytm.com",
    industry: "Fintech",
    size: "10,000+",
    headquarters: "Noida, India",
    hiringFocus: ["DSA", "Backend", "Payments", "Scale"],
    commonRoles: [
      "Backend Developer",
      "Full Stack Developer",
      "SDE Intern",
      "Android Developer"
    ],
    interviewStyle: "DSA + system design + payments domain questions.",
    cultureNotes: "High transaction volume; reliability under load matters."
  }
];

export function searchCompanies(query: string, limit = 8): CompanyProfile[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized || normalized.length < 2) {
    return [];
  }

  return companies
    .filter(
      (company) =>
        company.name.toLowerCase().includes(normalized) ||
        company.domain.toLowerCase().includes(normalized) ||
        company.industry.toLowerCase().includes(normalized)
    )
    .slice(0, limit);
}

export function getCompanyByName(name: string): CompanyProfile | null {
  const normalized = name.trim().toLowerCase();
  return (
    companies.find((company) => company.name.toLowerCase() === normalized) ??
    null
  );
}

export function getCompanyById(id: string): CompanyProfile | null {
  return companies.find((company) => company.id === id) ?? null;
}
