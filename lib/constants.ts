import type { DashboardStat, GeneratedResume, InterviewGuide } from "@/types";

export const siteConfig = {
  name: "Apply",
  domain: "apply.neexmeet.com",
  url: "https://apply.neexmeet.com",
  tagline: "Stop rewriting resumes. Start applying smarter.",
  description:
    "Upload your resume once. Generate ATS-optimized resumes for every job instantly.",
  nav: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Why Apply", href: "#comparison" },
    { label: "AI engine", href: "#engine" },
    { label: "Pricing", href: "#pricing" }
  ]
} as const;

export const comparisonRows = [
  {
    feature: "Builds from one master profile",
    apply: "Yes, upload once",
    chatgpt: "Manual copy and paste",
    canva: "Template-first",
    resumeio: "Resume-first"
  },
  {
    feature: "Tailors bullets to each job",
    apply: "Automatic role match",
    chatgpt: "Prompt dependent",
    canva: "Manual editing",
    resumeio: "Limited suggestions"
  },
  {
    feature: "ATS keyword optimization",
    apply: "Built into every generation",
    chatgpt: "Requires review",
    canva: "Design focused",
    resumeio: "Template checks"
  },
  {
    feature: "One-click PDF export",
    apply: "Clean ATS PDF",
    chatgpt: "External tool needed",
    canva: "Visual export",
    resumeio: "Included"
  },
  {
    feature: "Interview prep from submitted resume",
    apply: "Included",
    chatgpt: "Separate prompt",
    canva: "No",
    resumeio: "Basic"
  },
  {
    feature: "Prompt-based PDF editing",
    apply: "Included in Pro",
    chatgpt: "No PDF layout control",
    canva: "Manual design edits",
    resumeio: "Limited"
  }
];

export const dashboardStats: DashboardStat[] = [
  {
    label: "ATS average",
    value: "91%",
    detail: "Across your last 8 generated resumes",
    trend: "+8%"
  },
  {
    label: "Resumes ready",
    value: "14",
    detail: "Role-specific versions stored",
    trend: "3 this week"
  },
  {
    label: "Interview guides",
    value: "6",
    detail: "Generated from submitted resumes",
    trend: "2 new"
  }
];

export const sampleResumes: GeneratedResume[] = [
  {
    id: "resume-1",
    userId: "demo",
    originalResumeId: "master-1",
    company: "Neon Labs",
    role: "Frontend Engineer Intern",
    atsScore: 94,
    status: "ready",
    keywords: ["React", "TypeScript", "Accessibility", "REST APIs"],
    generatedContent: {
      summary:
        "Frontend engineer focused on accessible React interfaces, product polish, and measurable user experience improvements.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Testing"],
      bullets: [
        "Built a campus hiring dashboard used by 700+ students with React and TypeScript.",
        "Improved page load speed by 34% through route splitting and image optimization.",
        "Collaborated with backend team to ship resilient REST integrations."
      ]
    },
    createdAt: "2026-05-13T10:00:00.000Z"
  },
  {
    id: "resume-2",
    userId: "demo",
    originalResumeId: "master-1",
    company: "Orbit Systems",
    role: "Full Stack Developer",
    atsScore: 89,
    status: "downloaded",
    keywords: ["Node.js", "MongoDB", "APIs", "Deployment"],
    generatedContent: {
      summary:
        "Full stack developer with experience building reliable student workflow products from database schema to deployed UI.",
      skills: ["Node.js", "MongoDB", "Next.js", "Mongoose", "Vercel"],
      bullets: [
        "Designed Mongoose models for multi-step application tracking.",
        "Created reusable UI patterns for analytics, forms, and error states.",
        "Deployed production builds with environment-based configuration."
      ]
    },
    createdAt: "2026-05-10T10:00:00.000Z"
  }
];

export const sampleInterviewGuide: InterviewGuide = {
  id: "guide-1",
  userId: "demo",
  company: "Neon Labs",
  role: "Frontend Engineer Intern",
  companyAnalysis:
    "Neon Labs appears to value product velocity, design collaboration, and measurable frontend performance.",
  generatedQuestions: [
    "Walk me through a React project where you improved user experience.",
    "How do you approach accessibility in forms and dashboards?",
    "Describe a time you debugged a performance issue in a frontend app."
  ],
  prepNotes: [
    "Prepare one story around shipping with designers.",
    "Review React rendering, memoization, and server/client component tradeoffs.",
    "Bring metrics from your campus hiring dashboard project."
  ],
  technicalTopics: ["React state", "TypeScript", "API error handling", "Web vitals"],
  createdAt: "2026-05-14T08:30:00.000Z"
};
