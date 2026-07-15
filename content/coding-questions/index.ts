/**
 * Company-wise Previous Year Coding Questions — content module.
 *
 * This is the app-facing export. The raw extracted data lives in
 *   dataset/company-coding-questions/raw-data.json
 * and is mirrored here as typed TS for fast imports.
 *
 * Research & data extraction by Rohit Jadhav — Apply (apply.neexmeet.com)
 * Original question guides curated by Let's Code (lets-code.co.in) / Om Kute
 */

export type {
  CompanyCategory,
  CompanyCodingGuide,
  CompanyCategoryGroup,
  CodingResourceLink,
  DatasetSource,
  SocialLink,
  CompanyCodingQuestionsDataset
} from "./types";

import type {
  CompanyCodingGuide,
  CompanyCategoryGroup,
  CodingResourceLink,
  CompanyCodingQuestionsDataset
} from "./types";

export const datasetSource = {
  documentUrl:
    "https://docs.google.com/document/d/1JFyZTIxCKj6Q2UJTOmA3lvhmI99etfBtnsSxCeDX4-o/edit?tab=t.0",
  documentId: "1JFyZTIxCKj6Q2UJTOmA3lvhmI99etfBtnsSxCeDX4-o",
  title: "Company-wise Previous Year Coding Questions",
  curatedBy: "Let's Code / Om Kute",
  authorEmail: "contact.omkute@gmail.com",
  authorSocial: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/om-kute-348813215/" },
    { label: "Instagram", url: "https://instagram.com/theomkute" },
    { label: "X", url: "https://x.com/theomkute" },
    { label: "Substack", url: "https://substack.com/@omkute10" }
  ],
  extractedBy: "Rohit Jadhav",
  extractedAt: "2026-07-15",
  copyright:
    "© 2026 Rohit Jadhav — Apply (apply.neexmeet.com). Research & data extraction by Rohit Jadhav. Original question guides curated by Let's Code (lets-code.co.in)."
} as const;

const productTech: CompanyCodingGuide[] = [
  { slug: "google", company: "Google", guideTitle: "Google Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/google-previous-year-coding-questions", roles: "SDE L3, L4, STEP Intern", category: "product-tech" },
  { slug: "meta", company: "Meta", guideTitle: "Meta Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/meta-previous-year-coding-questions", roles: "SWE E3, E4, New Grad, Intern", category: "product-tech" },
  { slug: "apple", company: "Apple", guideTitle: "Apple Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/apple-previous-year-coding-questions", roles: "SWE ICT2, ICT3, New Grad, Intern", category: "product-tech" },
  { slug: "qualcomm", company: "Qualcomm", guideTitle: "Qualcomm Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/qualcomm-previous-year-coding-questions", roles: "SDE1, SDE2, Embedded, New Grad, Intern", category: "product-tech" },
  { slug: "adobe", company: "Adobe", guideTitle: "Adobe Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/adobe-previous-year-coding-questions", roles: "MTS-1, MTS-2, SDE, New Grad, Intern", category: "product-tech" },
  { slug: "nvidia", company: "Nvidia", guideTitle: "Nvidia Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/nvidia-previous-year-coding-questions", roles: "SDE, GPU Engineer, Systems, New Grad, Intern", category: "product-tech" },
  { slug: "uber", company: "Uber", guideTitle: "Uber Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/uber-previous-year-coding-questions", roles: "SDE 1, SDE 2, Backend Engineer, New Grad, Intern", category: "product-tech" },
  { slug: "phonepe", company: "PhonePe", guideTitle: "PhonePe Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/phonepe-previous-year-coding-questions", roles: "SDE 1, SDE 2, Backend Engineer, New Grad, Intern", category: "product-tech" },
  { slug: "walmart", company: "Walmart", guideTitle: "Walmart Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/walmart-previous-year-coding-questions", roles: "SDE 1, SDE 2, SDE 3, New Grad", category: "product-tech" },
  { slug: "paypal", company: "PayPal", guideTitle: "PayPal Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/paypal-previous-year-coding-questions", roles: "SDE 1 (T21/T22), SDE 2 (T23), New Grad", category: "product-tech" },
  { slug: "swiggy", company: "Swiggy", guideTitle: "Swiggy Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/swiggy-previous-year-coding-questions", roles: "SDE 1, SDE 2, New Grad", category: "product-tech" },
  { slug: "razorpay", company: "Razorpay", guideTitle: "Razorpay Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/razorpay-previous-year-coding-questions", roles: "SDE 1, SDE 2, New Grad", category: "product-tech" },
  { slug: "paytm", company: "Paytm", guideTitle: "Paytm Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/paytm-previous-year-coding-questions", roles: "SDE 1, SDE 2, New Grad", category: "product-tech" },
  { slug: "myntra", company: "Myntra", guideTitle: "Myntra Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/myntra-previous-year-coding-questions", roles: "SDE 1, SDE 2, New Grad", category: "product-tech" },
  { slug: "samsung", company: "Samsung", guideTitle: "Samsung Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/samsung-previous-year-coding-questions", roles: "SDE 1, SDE 2, New Grad", category: "product-tech" },
  { slug: "atlassian", company: "Atlassian", guideTitle: "Atlassian Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/atlassian-previous-year-coding-questions", roles: "SDE 1, SDE 2, New Grad", category: "product-tech" },
  { slug: "intuit", company: "Intuit", guideTitle: "Intuit Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/intuit-previous-year-coding-questions", roles: "SDE 1, SDE 2, New Grad", category: "product-tech" },
  { slug: "salesforce", company: "Salesforce", guideTitle: "Salesforce Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/salesforce-previous-year-coding-questions", roles: "AMTS, MTS, New Grad", category: "product-tech" },
  { slug: "sap", company: "SAP", guideTitle: "SAP Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/sap-previous-year-coding-questions", roles: "Developer Associate, SWE", category: "product-tech" },
  { slug: "amazon", company: "Amazon", guideTitle: "Amazon Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/amazon-previous-year-coding-questions", roles: "SDE-1, SDE-2, Internship", category: "product-tech" },
  { slug: "microsoft", company: "Microsoft", guideTitle: "Microsoft Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/microsoft-previous-year-coding-questions", roles: "SDE, Data Scientist", category: "product-tech" },
  { slug: "flipkart", company: "Flipkart", guideTitle: "Flipkart Grid 7.0 Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/flipkart-grid-7-coding-round-preparation-guide", roles: "Grid Challenge, SDE", category: "product-tech" },
  { slug: "zomato", company: "Zomato", guideTitle: "Zomato Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/zomato-previous-year-coding-questions", roles: "SDE-1, SDE-2, Backend", category: "product-tech" },
  { slug: "juspay", company: "Juspay", guideTitle: "Juspay Hiring Challenge 2025", url: "https://www.lets-code.co.in/previousyearcodingquestion/juspay-hiring-challenge-2025-preparation-guide-pyqs", roles: "Hiring Challenge, SDE", category: "product-tech" },
  { slug: "amazon-ml-school", company: "Amazon ML Summer School", guideTitle: "Amazon ML Summer School PYQs", url: "https://www.lets-code.co.in/previousyearcodingquestion/amazon-ml-summer-school-previous-year-coding-questions", roles: "ML Engineers, Students", category: "product-tech" },
  { slug: "zoho", company: "Zoho", guideTitle: "Zoho Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/zoho-previous-year-coding-questions", roles: "Software Developer, Freshers", category: "product-tech" },
  { slug: "servicenow", company: "ServiceNow", guideTitle: "ServiceNow Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/servicenow-previous-year-coding-questions", roles: "Associate Software Engineer", category: "product-tech" },
  { slug: "browserstack", company: "BrowserStack", guideTitle: "BrowserStack Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/browserstack-previous-year-coding-questions", roles: "Software Engineer, Fresher", category: "product-tech" },
  { slug: "rubrik", company: "Rubrik", guideTitle: "Rubrik Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/rubrik-previous-year-coding-questions", roles: "Software Engineer, Fresher", category: "product-tech" },
  { slug: "tredence", company: "Tredence", guideTitle: "Tredence Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/tredence-previous-year-coding-questions", roles: "Data Analyst, Data Engineer, Software Engineer", category: "product-tech" }
];

const bfsiConsulting: CompanyCodingGuide[] = [
  { slug: "goldman-sachs", company: "Goldman Sachs", guideTitle: "Goldman Sachs Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/goldman-sachs-previous-year-coding-questions", roles: "Analyst, SDE, New Grad", category: "bfsi-consulting" },
  { slug: "morgan-stanley", company: "Morgan Stanley", guideTitle: "Morgan Stanley Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/morgan-stanley-previous-year-coding-questions", roles: "Technology Analyst, SDE, Intern", category: "bfsi-consulting" },
  { slug: "jp-morgan", company: "JP Morgan", guideTitle: "JP Morgan Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/jp-morgan-previous-year-coding-questions", roles: "Technology Analyst, SDE", category: "bfsi-consulting" },
  { slug: "de-shaw", company: "De Shaw", guideTitle: "De Shaw Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/de-shaw-previous-year-coding-questions-hiring-process-guide", roles: "SDE, Quant", category: "bfsi-consulting" },
  { slug: "deloitte", company: "Deloitte", guideTitle: "Deloitte Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/deloitte-previous-year-coding-questions", roles: "Analyst, SDE", category: "bfsi-consulting" },
  { slug: "deloitte-nla", company: "Deloitte NLA", guideTitle: "Deloitte NLA Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/deloitte-nla-previous-year-coding-questions", roles: "NLA Hiring, Freshers", category: "bfsi-consulting" },
  { slug: "american-express", company: "American Express", guideTitle: "American Express Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/american-express-previous-year-coding-questions", roles: "Software Engineer, Graduate Engineer Trainee", category: "bfsi-consulting" },
  { slug: "barclays", company: "Barclays", guideTitle: "Barclays Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/barclays-previous-year-coding-questions", roles: "Technology Analyst, Graduate Developer", category: "bfsi-consulting" },
  { slug: "visa", company: "Visa", guideTitle: "Visa Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/visa-previous-year-coding-questions", roles: "Software Engineer, New Grad SWE", category: "bfsi-consulting" },
  { slug: "wells-fargo", company: "Wells Fargo", guideTitle: "Wells Fargo Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/wells-fargo-previous-year-coding-questions", roles: "Program Associate, Technology Analyst", category: "bfsi-consulting" },
  { slug: "ubs", company: "UBS", guideTitle: "UBS Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/ubs-previous-year-coding-questions", roles: "Technology Analyst, Graduate Talent Program", category: "bfsi-consulting" },
  { slug: "ion-group", company: "ION Group", guideTitle: "ION Group Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/ion-group-previous-year-coding-questions", roles: "Software Engineer, Technical Analyst", category: "bfsi-consulting" },
  { slug: "bny", company: "BNY", guideTitle: "BNY Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/bny-previous-year-coding-questions", roles: "Software Engineer, SDE", category: "bfsi-consulting" }
];

const itServices: CompanyCodingGuide[] = [
  { slug: "tcs-nqt", company: "TCS (NQT)", guideTitle: "TCS NQT Common Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/tcspyq", roles: "NQT, Freshers", category: "it-services" },
  { slug: "tcs-nqt-aptitude", company: "TCS NQT Aptitude", guideTitle: "TCS NQT Aptitude Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/tcsnqtaptitude", roles: "NQT Aptitude Round", category: "it-services" },
  { slug: "tcs-codevita", company: "TCS CodeVita", guideTitle: "TCS CodeVita Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/tcs-codevita-previous-year-coding-questions", roles: "Competitive Coding", category: "it-services" },
  { slug: "infosys", company: "Infosys", guideTitle: "Infosys SP & DSE Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/infosys-sp-and-dse-previous-year-coding-questions", roles: "SP, DSE Roles", category: "it-services" },
  { slug: "wipro", company: "Wipro", guideTitle: "Wipro Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/wiprocodingquestions", roles: "NLTH, Turbo, Elite", category: "it-services" },
  { slug: "cognizant", company: "Cognizant", guideTitle: "Cognizant Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/cognizantcodingquestions", roles: "GenC, GenC Next", category: "it-services" },
  { slug: "accenture", company: "Accenture", guideTitle: "Accenture Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/accenturequestions", roles: "ASE, Packaged App", category: "it-services" },
  { slug: "ibm", company: "IBM", guideTitle: "IBM Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/ibmcodingquestions", roles: "GBS, GTS, ISL", category: "it-services" },
  { slug: "capgemini", company: "Capgemini", guideTitle: "Capgemini Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/capgeminiquestions", roles: "Analyst, Senior Analyst", category: "it-services" },
  { slug: "hcl", company: "HCL", guideTitle: "HCL Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/hcl-previous-year-coding-questions", roles: "Tech Bee, Graduate", category: "it-services" },
  { slug: "virtusa", company: "Virtusa", guideTitle: "Virtusa Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/virtusacodingquestions", roles: "Associate Engineer", category: "it-services" },
  { slug: "epam", company: "EPAM", guideTitle: "EPAM Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/epam-previous-year-coding-questions", roles: "SDE, Associate", category: "it-services" },
  { slug: "oracle", company: "Oracle", guideTitle: "Oracle Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/oracle-previous-year-coding-questions", roles: "Applications Dev, Cloud", category: "it-services" },
  { slug: "cisco", company: "Cisco", guideTitle: "Cisco Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/cisco-previous-year-coding-questions", roles: "SDE, Network Engineer", category: "it-services" },
  { slug: "larsen-toubro", company: "Larsen & Toubro", guideTitle: "L&T Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/larsen-toubro-previous-year-coding-questions", roles: "GET, SDE", category: "it-services" },
  { slug: "ltimindtree", company: "LTIMindtree", guideTitle: "LTIMindtree Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/ltimindtree-previous-year-coding-questions", roles: "Associate Trainee, Graduate Engineer Trainee", category: "it-services" },
  { slug: "hexaware", company: "Hexaware", guideTitle: "Hexaware Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/hexaware-previous-year-coding-questions", roles: "Graduate Engineer Trainee, Premier GET", category: "it-services" },
  { slug: "tech-mahindra", company: "Tech Mahindra", guideTitle: "Tech Mahindra Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/tech-mahindra-previous-year-coding-questions", roles: "Automata Coding Round, AI Communication Assessment", category: "it-services" },
  { slug: "persistent-systems", company: "Persistent Systems", guideTitle: "Persistent Systems Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/persistent-systems-previous-year-coding-questions", roles: "AMCAT Assessment, Advanced Coding Round", category: "it-services" },
  { slug: "coforge", company: "Coforge", guideTitle: "Coforge Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/coforge-previous-year-coding-questions", roles: "Graduate Engineer Trainee", category: "it-services" },
  { slug: "sopra-steria", company: "Sopra Steria", guideTitle: "Sopra Steria Previous Year Coding Questions", url: "https://www.lets-code.co.in/previousyearcodingquestion/sopra-steria-previous-year-coding-questions", roles: "Engineer Trainee", category: "it-services" }
];

export const companyCategories: CompanyCategoryGroup[] = [
  { id: "product-tech", label: "Product & Tech Companies", icon: "Buildings", companies: productTech },
  { id: "bfsi-consulting", label: "BFSI & Consulting", icon: "Bank", companies: bfsiConsulting },
  { id: "it-services", label: "IT Services & MNCs", icon: "Desktop", companies: itServices }
];

export const additionalResources: CodingResourceLink[] = [
  { label: "Free Mock Test", url: "https://www.lets-code.co.in/dashboard/mocktest/" },
  { label: "ATS Score Checker & Resume Optimization", url: "https://www.lets-code.co.in/dashboard/optimizeresume/" },
  { label: "Developer Roadmaps", url: "https://www.lets-code.co.in/articles/roadmap/" },
  { label: "Interview Questions & Answers", url: "https://www.lets-code.co.in/interview/interviewquestions/" },
  { label: "Interview Experiences", url: "https://www.lets-code.co.in/interview-experience/" },
  { label: "Resume Templates", url: "https://www.lets-code.co.in/articles/resume/" },
  { label: "Free Study Notes", url: "https://www.lets-code.co.in/articles/resources/" },
  { label: "Free Placement Material Drive", url: "https://www.lets-code.co.in/articles/free-placement-google-drive-links/" },
  { label: "Job Opportunity Updates", url: "https://www.lets-code.co.in/jobs" }
];

export const usageGuideSteps: string[] = [
  "Find your target company in the tables above and open its guide.",
  "Read the hiring process section first — understand what each round tests before jumping into questions.",
  "Solve the OA questions under timed conditions — simulate the real exam with a 60–90 minute window.",
  "For each problem, attempt it yourself first, then check the approach hint. Never read the solution without trying.",
  "Practice on platforms like LeetCode, HackerRank, or GeeksforGeeks to get used to the submission environment.",
  "Track your weak topics — if you struggle on graph problems across multiple companies, dedicate focused time to BFS/DFS before revisiting."
];

export const allCompanyGuides: CompanyCodingGuide[] = [
  ...productTech,
  ...bfsiConsulting,
  ...itServices
];

export function getCompaniesByCategory(category: string): CompanyCodingGuide[] {
  return allCompanyGuides.filter((c) => c.category === category);
}

export function getCompanyBySlug(slug: string): CompanyCodingGuide | null {
  return allCompanyGuides.find((c) => c.slug === slug) ?? null;
}

export const totalCompanyCount: number = allCompanyGuides.length;
