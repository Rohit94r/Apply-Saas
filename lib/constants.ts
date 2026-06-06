export const siteConfig = {
  name: "Apply",
  domain: "apply.neexmeet.com",
  url: "https://apply.neexmeet.com",
  tagline: "Free AI resume builder for Indian students.",
  description:
    "Upload your resume once. Generate ATS-optimized resumes for internships and fresher jobs instantly.",
  nav: [
    { label: "Student gateway", href: "/#student-gateway" },
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
