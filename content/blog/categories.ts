/**
 * Blog categories for SEO — category landing pages live at /blog/category/[slug].
 * Each category maps the display `category` strings used on posts to one
 * canonical, keyword-focused landing page.
 */

export type BlogCategory = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  keywords: string[];
  matchCategories: string[];
};

export const blogCategories: BlogCategory[] = [
  {
    slug: "mock-interview",
    name: "Mock Interviews",
    tagline: "Practice interviews online with AI",
    description:
      "AI mock interview practice for Indian freshers — voice questions, coding rounds, HR and technical formats, and free online practice for campus placements.",
    keywords: [
      "mock interview",
      "mock interview practice online free",
      "AI mock interview",
      "free online interview practice",
      "unlimited interview practice",
      "mock interviews for freshers"
    ],
    matchCategories: ["Mock Interview", "Mock interviews", "Mock interview"]
  },
  {
    slug: "fresher-resumes",
    name: "Fresher Resumes",
    tagline: "ATS-safe resume formats for students",
    description:
      "Fresher and student resume guides for India — engineering student formats, no-experience resumes, ATS-friendly templates, and company-specific formats like TCS and Infosys.",
    keywords: [
      "engineering student resume",
      "resume for student with no experience",
      "fresher resume format",
      "fresher resume building India",
      "resume engineering student",
      "resume for it freshers"
    ],
    matchCategories: [
      "Fresher Resumes",
      "Fresher resumes",
      "Resume",
      "ATS resumes",
      "Resume tailoring",
      "Templates"
    ]
  },
  {
    slug: "company-prep",
    name: "Company Prep",
    tagline: "Company-wise interview and OA guides",
    description:
      "Company-specific placement preparation for India — TCS NQT, Infosys SP DSE, Wipro, Amazon OA, Zomato, Flipkart Grid, and more with exam patterns and questions.",
    keywords: [
      "TCS NQT 2026",
      "Amazon OA questions",
      "Infosys SP DSE preparation",
      "Wipro interview questions",
      "flipkart grid",
      "company interview questions"
    ],
    matchCategories: ["Company Prep"]
  },
  {
    slug: "dsa-coding",
    name: "DSA & Coding",
    tagline: "DSA questions and coding round prep",
    description:
      "Data structures and algorithms for placements — DSA question lists, coding round preparation, previous year coding questions, and patterns that appear in OA rounds.",
    keywords: [
      "DSA interview questions for freshers",
      "dsa question list",
      "coding round preparation",
      "previous year coding questions",
      "LeetCode for placements",
      "DSA for campus placements"
    ],
    matchCategories: ["DSA", "Coding PYQs"]
  },
  {
    slug: "placement-strategy",
    name: "Placement Strategy",
    tagline: "Plans for campus and off-campus hiring",
    description:
      "Placement preparation strategy for Indian engineering students — campus placement guides, off-campus job search, application tracking, and timelines from first year to placement season.",
    keywords: [
      "campus placement guide India",
      "off-campus placement preparation",
      "how to apply off campus placement",
      "how to get job without campus placement",
      "placement preparation for engineering students"
    ],
    matchCategories: ["Placement Strategy", "Placement preparation", "Job search"]
  },
  {
    slug: "interview-tips",
    name: "Interview Tips",
    tagline: "Tips for HR, technical and GD rounds",
    description:
      "Interview tips for freshers — HR questions and answers, technical round strategy, group discussion tips, body language, and how to prepare for a first job interview in India.",
    keywords: [
      "interview tips for freshers",
      "HR interview questions for freshers",
      "group discussion tips",
      "interview preparation for freshers",
      "how to give interview for freshers"
    ],
    matchCategories: ["Interview Tips", "Interview Prep"]
  },
  {
    slug: "resume-tools",
    name: "Resume Tools",
    tagline: "Free resume builders compared",
    description:
      "Resume builder comparisons for Indian students — free resume makers, AI resume builders, ATS-friendly editors, and which tools actually work for campus placements.",
    keywords: [
      "best resume builder India students",
      "free resume maker for students",
      "best AI resume builder India",
      "ATS friendly resume builder India",
      "free resume editor campus placements"
    ],
    matchCategories: ["Resume Tools"]
  },
  {
    slug: "aptitude",
    name: "Aptitude",
    tagline: "Aptitude and reasoning practice",
    description:
      "Aptitude test preparation for campus placements — quantitative, logical reasoning, and verbal topics, with company patterns for TCS NQT, Infosys, Wipro, and Cognizant.",
    keywords: [
      "aptitude questions for placements",
      "TCS NQT aptitude questions",
      "quantitative aptitude for campus placements",
      "logical reasoning placement preparation"
    ],
    matchCategories: ["Aptitude"]
  },
  {
    slug: "internships-cover-letters",
    name: "Internships & Cover Letters",
    tagline: "Internship resumes and cover letters",
    description:
      "Internship guides for Indian students — cover letter templates, internship resume mistakes to avoid, and how to apply for internships at companies like Amazon and TCS.",
    keywords: [
      "internship cover letter",
      "cover letter for internship India",
      "internship resume mistakes",
      "how to write cover letter for internship"
    ],
    matchCategories: ["Internships", "Cover Letter"]
  },
  {
    slug: "system-design",
    name: "System Design",
    tagline: "System design basics for SDE-1",
    description:
      "System design for freshers and junior engineers — core concepts, common interview questions, scaling patterns, and how to approach your first system design round.",
    keywords: [
      "system design interview questions for freshers",
      "system design basics",
      "system design for campus placements",
      "scalability interview questions"
    ],
    matchCategories: ["System Design"]
  },
  {
    slug: "career-salary",
    name: "Career & Salary",
    tagline: "Fresher salaries and career planning",
    description:
      "Fresher salary guides and career planning for India — TCS, Infosys, Amazon, and startup pay bands, CTC vs in-hand salary, and first-job advice for students.",
    keywords: [
      "fresher salary India IT companies",
      "TCS fresher salary 2026",
      "fresher salary in India 2026",
      "software engineer fresher salary India"
    ],
    matchCategories: ["Career"]
  },
  {
    slug: "freelancing",
    name: "Freelancing",
    tagline: "First freelance work for students",
    description:
      "Freelancing guides for college students — how to get a first freelance client, write outreach, scope paid work safely, and turn deliveries into portfolio evidence.",
    keywords: [
      "how to get first freelance client as a student",
      "freelancing for college students",
      "student freelancer outreach"
    ],
    matchCategories: ["Student freelancing"]
  }
];

export function getBlogCategoryByPostCategory(postCategory: string) {
  return (
    blogCategories.find((category) =>
      category.matchCategories.includes(postCategory)
    ) ?? null
  );
}

export function blogCategoryUrl(slug: string) {
  return `/blog/category/${slug}`;
}
