export const siteConfig = {
  name: "Apply",
  domain: "apply.neexmeet.com",
  url: "https://apply.neexmeet.com",
  tagline: "India's placement preparation platform.",
  description:
    "Tailor resumes, find matching jobs, prep interviews, and learn skills — free to start. Desktop Interview Copilot coming soon.",
  nav: [
    { label: "Tailor resume", href: "/#student-gateway" },
    { label: "Company PYQs", href: "/pyqs" },
    { label: "Mock interview", href: "/mock-interview" },
    { label: "Company prep", href: "/prepare" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "/blog" }
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
