export const siteConfig = {
  name: "Apply",
  domain: "apply.neexmeet.com",
  url: "https://apply.neexmeet.com",
  tagline: "AI Resume Studio for students and job seekers worldwide.",
  description:
    "Upload once, tailor with AI prompts for every job, export ATS PDFs, and prep interviews from the same profile.",
  nav: [
    { label: "Application studio", href: "/#student-gateway" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Why Apply", href: "/#comparison" },
    { label: "AI engine", href: "/#engine" },
    { label: "FAQ", href: "/#faq" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/#pricing" }
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
    feature: "Prompt-based tailoring & refine",
    apply: "Built into tailor flow",
    chatgpt: "Manual copy and paste",
    canva: "Manual editing",
    resumeio: "Limited suggestions"
  },
  {
    feature: "Cover letter from same role",
    apply: "One click from resume card",
    chatgpt: "Separate prompt",
    canva: "No",
    resumeio: "Add-on"
  },
  {
    feature: "Interview prep from submitted resume",
    apply: "Prefilled from profile",
    chatgpt: "Separate prompt",
    canva: "No",
    resumeio: "Basic"
  }
];
