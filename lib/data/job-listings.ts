/**
 * Curated job listings for the Indian market.
 *
 * These are representative openings used for matching and UX demos.
 * `applyUrl` redirects to real job board search/apply pages (LinkedIn, Naukri, …).
 *
 * To add a job: append an object here and ensure `skills` overlap with common resume tags.
 */

import type { JobListing } from "@/features/jobs/types";

export const jobListings: JobListing[] = [
  {
    id: "job-001",
    title: "SDE Intern",
    company: "Amazon",
    location: "Bengaluru",
    workMode: "hybrid",
    type: "internship",
    experienceBand: "student",
    skills: ["Java", "Python", "DSA", "OOP", "Data Structures"],
    salaryHint: "Competitive stipend",
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=Amazon%20SDE%20Intern&location=India",
    postedLabel: "Actively hiring"
  },
  {
    id: "job-002",
    title: "Frontend Developer Intern",
    company: "Flipkart",
    location: "Bengaluru",
    workMode: "onsite",
    type: "internship",
    experienceBand: "student",
    skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript"],
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=Flipkart%20Frontend%20Intern&location=Bengaluru%2C%20Karnataka%2C%20India",
    postedLabel: "2 days ago"
  },
  {
    id: "job-003",
    title: "Graduate Engineer Trainee",
    company: "TCS",
    location: "Pan India",
    workMode: "onsite",
    type: "full-time",
    experienceBand: "fresher",
    skills: ["Java", "C", "SQL", "Aptitude", "Communication"],
    salaryHint: "₹3.3–7 LPA",
    platform: "naukri",
    applyUrl: "https://www.naukri.com/tcs-fresher-jobs",
    postedLabel: "Campus drive"
  },
  {
    id: "job-004",
    title: "Systems Engineer Trainee",
    company: "Infosys",
    location: "Mysuru / Pan India",
    workMode: "onsite",
    type: "full-time",
    experienceBand: "fresher",
    skills: ["Java", "Python", "SQL", "Aptitude"],
    salaryHint: "₹3.6–8 LPA",
    platform: "naukri",
    applyUrl: "https://www.naukri.com/infosys-fresher-jobs",
    postedLabel: "This week"
  },
  {
    id: "job-005",
    title: "React Developer",
    company: "Razorpay",
    location: "Bengaluru",
    workMode: "hybrid",
    type: "full-time",
    experienceBand: "0-1",
    skills: ["React", "JavaScript", "TypeScript", "Node.js", "REST APIs"],
    salaryHint: "₹8–14 LPA",
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=Razorpay%20React%20Developer&location=Bengaluru",
    postedLabel: "1 week ago"
  },
  {
    id: "job-006",
    title: "Full Stack Developer",
    company: "Swiggy",
    location: "Bengaluru",
    workMode: "hybrid",
    type: "full-time",
    experienceBand: "0-1",
    skills: ["React", "Node.js", "MongoDB", "Express.js", "System Design"],
    salaryHint: "₹10–18 LPA",
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=Swiggy%20Full%20Stack&location=India",
    postedLabel: "3 days ago"
  },
  {
    id: "job-007",
    title: "Backend Developer Intern",
    company: "Paytm",
    location: "Noida",
    workMode: "hybrid",
    type: "internship",
    experienceBand: "student",
    skills: ["Java", "Spring Boot", "Microservices", "SQL", "Kafka"],
    platform: "naukri",
    applyUrl: "https://www.naukri.com/paytm-internship-jobs",
    postedLabel: "Internship"
  },
  {
    id: "job-008",
    title: "Software Engineer I",
    company: "Microsoft",
    location: "Hyderabad",
    workMode: "hybrid",
    type: "full-time",
    experienceBand: "0-1",
    skills: ["C++", "Java", "DSA", "System Design", "OOP"],
    salaryHint: "₹15–30 LPA",
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=Microsoft%20Software%20Engineer%20India&location=India",
    postedLabel: "Actively hiring"
  },
  {
    id: "job-009",
    title: "Data Analyst Intern",
    company: "Deloitte",
    location: "Mumbai",
    workMode: "hybrid",
    type: "internship",
    experienceBand: "student",
    skills: ["Python", "SQL", "Excel", "Power BI", "Statistics"],
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=Deloitte%20Data%20Analyst%20Intern%20India",
    postedLabel: "5 days ago"
  },
  {
    id: "job-010",
    title: "Machine Learning Intern",
    company: "Google",
    location: "Bengaluru",
    workMode: "hybrid",
    type: "internship",
    experienceBand: "student",
    skills: ["Python", "Machine Learning", "TensorFlow", "Statistics", "DSA"],
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=Google%20ML%20Intern%20India",
    postedLabel: "Competitive"
  },
  {
    id: "job-011",
    title: "UI/UX Designer Intern",
    company: "Zomato",
    location: "Gurugram",
    workMode: "hybrid",
    type: "internship",
    experienceBand: "student",
    skills: ["Figma", "UI UX", "Prototyping", "User Research"],
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=Zomato%20UI%20UX%20Intern",
    postedLabel: "This month"
  },
  {
    id: "job-012",
    title: "Java Developer",
    company: "Wipro",
    location: "Pune",
    workMode: "onsite",
    type: "full-time",
    experienceBand: "fresher",
    skills: ["Java", "Spring", "SQL", "Hibernate", "REST APIs"],
    salaryHint: "₹3.5–6 LPA",
    platform: "naukri",
    applyUrl: "https://www.naukri.com/java-developer-fresher-jobs-in-pune",
    postedLabel: "Fresher friendly"
  },
  {
    id: "job-013",
    title: "DevOps Engineer",
    company: "Accenture",
    location: "Hyderabad",
    workMode: "hybrid",
    type: "full-time",
    experienceBand: "0-1",
    skills: ["Docker", "Kubernetes", "AWS", "Linux", "CI/CD"],
    salaryHint: "₹6–10 LPA",
    platform: "naukri",
    applyUrl: "https://www.naukri.com/devops-engineer-jobs-in-hyderabad",
    postedLabel: "2 weeks ago"
  },
  {
    id: "job-014",
    title: "Android Developer Intern",
    company: "PhonePe",
    location: "Bengaluru",
    workMode: "hybrid",
    type: "internship",
    experienceBand: "student",
    skills: ["Kotlin", "Android", "Java", "Mobile"],
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=PhonePe%20Android%20Intern",
    postedLabel: "Hot"
  },
  {
    id: "job-015",
    title: "Associate Software Engineer",
    company: "Cognizant",
    location: "Chennai",
    workMode: "onsite",
    type: "full-time",
    experienceBand: "fresher",
    skills: ["Java", ".NET", "SQL", "Aptitude"],
    platform: "naukri",
    applyUrl: "https://www.naukri.com/cognizant-fresher-jobs-in-chennai",
    postedLabel: "Mass hiring"
  },
  {
    id: "job-016",
    title: "Frontend Engineer",
    company: "Zoho",
    location: "Chennai",
    workMode: "onsite",
    type: "full-time",
    experienceBand: "0-1",
    skills: ["JavaScript", "React", "HTML", "CSS", "Problem Solving"],
    salaryHint: "₹6–12 LPA",
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=Zoho%20Frontend%20Engineer",
    postedLabel: "Product company"
  },
  {
    id: "job-017",
    title: "QA Engineer Intern",
    company: "Freshworks",
    location: "Chennai",
    workMode: "hybrid",
    type: "internship",
    experienceBand: "student",
    skills: ["Testing", "Selenium", "Java", "API Testing"],
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=Freshworks%20QA%20Intern",
    postedLabel: "Internship"
  },
  {
    id: "job-018",
    title: "Python Developer",
    company: "HCLTech",
    location: "Noida",
    workMode: "hybrid",
    type: "full-time",
    experienceBand: "fresher",
    skills: ["Python", "Django", "Flask", "SQL", "REST APIs"],
    platform: "naukri",
    applyUrl: "https://www.naukri.com/python-developer-fresher-jobs",
    postedLabel: "Entry level"
  },
  {
    id: "job-019",
    title: "Software Engineer",
    company: "Startup (Instahyre)",
    location: "Bengaluru",
    workMode: "remote",
    type: "full-time",
    experienceBand: "0-1",
    skills: ["React", "Node.js", "MongoDB", "Next.js", "TypeScript"],
    salaryHint: "₹8–15 LPA",
    platform: "instahyre",
    applyUrl: "https://www.instahyre.com/react-developer-jobs/",
    postedLabel: "Startup roles"
  },
  {
    id: "job-020",
    title: "Full Stack Engineer",
    company: "Series A Startup",
    location: "Remote India",
    workMode: "remote",
    type: "full-time",
    experienceBand: "0-1",
    skills: ["Next.js", "React", "PostgreSQL", "TypeScript", "AWS"],
    platform: "wellfound",
    applyUrl: "https://wellfound.com/role/l/full-stack-developer/india",
    postedLabel: "Remote friendly"
  },
  {
    id: "job-021",
    title: "Graduate Trainee",
    company: "Capgemini",
    location: "Mumbai",
    workMode: "onsite",
    type: "full-time",
    experienceBand: "fresher",
    skills: ["Java", "SQL", "Aptitude", "Communication"],
    platform: "naukri",
    applyUrl: "https://www.naukri.com/capgemini-fresher-jobs",
    postedLabel: "Campus"
  },
  {
    id: "job-022",
    title: "React Native Developer",
    company: "Ola",
    location: "Bengaluru",
    workMode: "hybrid",
    type: "full-time",
    experienceBand: "1-3",
    skills: ["React Native", "JavaScript", "Mobile", "Redux"],
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=React%20Native%20Developer%20India",
    postedLabel: "1 week ago"
  },
  {
    id: "job-023",
    title: "Cloud Engineer Intern",
    company: "AWS / Partners",
    location: "Hyderabad",
    workMode: "hybrid",
    type: "internship",
    experienceBand: "student",
    skills: ["AWS", "Linux", "Python", "Cloud", "Networking"],
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=AWS%20Cloud%20Intern%20India",
    postedLabel: "Cloud track"
  },
  {
    id: "job-024",
    title: "Data Engineer",
    company: "JPMorgan",
    location: "Mumbai",
    workMode: "hybrid",
    type: "full-time",
    experienceBand: "0-1",
    skills: ["Python", "SQL", "Spark", "ETL", "Data Pipelines"],
    salaryHint: "₹12–20 LPA",
    platform: "linkedin",
    applyUrl:
      "https://www.linkedin.com/jobs/search/?keywords=JPMorgan%20Data%20Engineer%20India",
    postedLabel: "Finance tech"
  },
  {
    id: "job-025",
    title: "Cutshort — Full Stack Roles",
    company: "Multiple startups",
    location: "India",
    workMode: "remote",
    type: "full-time",
    experienceBand: "0-1",
    skills: ["React", "Node.js", "JavaScript", "MongoDB"],
    platform: "cutshort",
    applyUrl: "https://cutshort.io/jobs/full-stack-developer",
    postedLabel: "Curated startups"
  }
];

export function getAllJobListings() {
  return jobListings;
}
