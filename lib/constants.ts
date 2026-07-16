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
    feature: "Company-wise PYQs (64+ companies)",
    apply: "64+ with guides",
    prepinsta: "50+ companies",
    internshala: "Limited",
    unstop: "Competition-focused"
  },
  {
    feature: "AI mock interview with voice",
    apply: "ElevenLabs + browser",
    prepinsta: "No",
    internshala: "No",
    unstop: "No"
  },
  {
    feature: "ATS resume tailoring from JD",
    apply: "Automatic role match",
    prepinsta: "No",
    internshala: "Resume builder only",
    unstop: "No"
  },
  {
    feature: "One-click PDF export",
    apply: "Clean ATS PDF",
    prepinsta: "No resumes",
    internshala: "Basic PDF",
    unstop: "No resumes"
  },
  {
    feature: "Application / placement tracker",
    apply: "Built-in tracker",
    prepinsta: "No",
    internshala: "Job listings only",
    unstop: "Hackathon tracking"
  },
  {
    feature: "Cover letter from same role",
    apply: "One click from resume",
    prepinsta: "No",
    internshala: "No",
    unstop: "No"
  },
  {
    feature: "Interview prep from your resume",
    apply: "Prefilled from profile",
    prepinsta: "Static content",
    internshala: "Course-based prep",
    unstop: "No"
  },
  {
    feature: "Freelancing / find clients tool",
    apply: "Maps + Justdial leads",
    prepinsta: "No",
    internshala: "Internships only",
    unstop: "No"
  },
  {
    feature: "Pricing for Indian students",
    apply: "₹50/mo UPI",
    prepinsta: "Free + paid courses",
    internshala: "Free + paid courses",
    unstop: "Free"
  }
];
