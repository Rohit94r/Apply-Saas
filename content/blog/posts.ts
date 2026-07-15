/**
 * Blog posts for SEO — edit titles, keywords, and sections here.
 * Routes: /blog, /blog/[slug]. Helpers live in lib/blog.ts.
 */

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  category: string;
  targetKeyword: string;
  keywords: string[];
  excerpt: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

export const blogPosts = [
  {
    slug: "ats-friendly-resume-india-2026",
    title: "How to Write an ATS-Friendly Resume in 2026: India Guide",
    description:
      "A practical ATS resume guide for Indian students, freshers, and internship seekers applying to IT services, startups, and product companies.",
    publishedAt: "2026-05-24",
    updatedAt: "2026-05-24",
    readingTime: "6 min read",
    category: "ATS resumes",
    targetKeyword: "ATS resume tips India",
    keywords: [
      "ATS resume tips India",
      "ATS resume optimizer for freshers",
      "resume builder for engineering students India"
    ],
    excerpt:
      "ATS-friendly resumes are not about keyword stuffing. They are about clear structure, relevant language, and honest proof that maps to the job description.",
    sections: [
      {
        heading: "Start with the job description",
        body: [
          "Before editing your resume, highlight the must-have skills, tools, responsibilities, and project themes in the job description. For Indian fresher roles, these often include Java, Python, SQL, React, data structures, APIs, cloud basics, testing, or problem solving.",
          "Use those terms only where your resume already has evidence. If your project used React, say React. If it did not, write the closest truthful skill instead of forcing a keyword."
        ]
      },
      {
        heading: "Use readable sections",
        body: [
          "ATS systems handle simple sections best: Summary, Skills, Projects, Experience, Education, Certifications, and Achievements. Avoid putting important details only inside images, icons, or decorative columns.",
          "For students, Projects can be as important as Experience. Write project bullets with the problem, tech stack, implementation detail, and outcome."
        ]
      },
      {
        heading: "Write bullets with evidence",
        body: [
          "A strong fresher bullet is specific without becoming fake. Use verbs like built, integrated, optimized, automated, tested, deployed, analyzed, or collaborated.",
          "If you have numbers, use them. If you do not, explain the technical scope: authentication, database schema, REST APIs, responsive UI, test coverage, performance, or deployment."
        ]
      },
      {
        heading: "Keep formatting ATS-safe",
        body: [
          "Use a clean PDF or DOCX, consistent dates, standard headings, and normal text. Avoid text boxes for core content and keep links readable.",
          "Apply can help by reading your current resume, comparing it with a job description, and generating a cleaner ATS-focused version while preserving your real experience."
        ]
      }
    ]
  },
  {
    slug: "fresher-resume-format-it-companies",
    title: "Resume Format for Freshers: What TCS, Infosys, Wipro Actually Want",
    description:
      "A fresher resume format for Indian IT companies, campus placements, and service-based hiring rounds.",
    publishedAt: "2026-05-24",
    updatedAt: "2026-05-24",
    readingTime: "5 min read",
    category: "Fresher resumes",
    targetKeyword: "fresher resume format for IT companies",
    keywords: [
      "fresher resume format for IT companies",
      "TCS interview preparation resume",
      "Infosys internship resume format"
    ],
    excerpt:
      "For fresher hiring, recruiters want proof of fundamentals, projects, communication, and role fit more than heavy design.",
    sections: [
      {
        heading: "Use a simple one-page structure",
        body: [
          "For most Indian fresher roles, a one-page resume is enough. Put your name, contact details, portfolio links, summary, skills, projects, education, certifications, and achievements in a clear order.",
          "If you have internship experience, place it above projects. If you do not, lead with strong projects and technical skills."
        ]
      },
      {
        heading: "Show fundamentals clearly",
        body: [
          "Service-based companies often screen for programming basics, DBMS, OOP, operating systems, SQL, aptitude, and communication. Product startups may care more about shipped projects, GitHub, APIs, frontend quality, backend design, and debugging.",
          "Do not list every technology you have heard of. Prioritize skills you can explain in an interview."
        ]
      },
      {
        heading: "Make projects interview-ready",
        body: [
          "Each project should answer four questions: what you built, what stack you used, what you personally implemented, and what tradeoff or result matters.",
          "A project bullet like 'Built a React dashboard with REST APIs and MongoDB filters for tracking student applications' is stronger than 'Made website using React'."
        ]
      },
      {
        heading: "Tailor for each opening",
        body: [
          "A TCS Ninja-style opening, Infosys internship, Wipro fresher role, and startup frontend role should not receive the exact same resume. Keep your base resume truthful, then adjust summary, skills order, and project wording for the role.",
          "Apply is built for this repeat workflow: upload once, paste a job description, then review a tailored resume."
        ]
      }
    ]
  },
  {
    slug: "internship-resume-mistakes",
    title: "7 Mistakes Students Make on Internship Resumes and How to Fix Them",
    description:
      "Avoid common internship resume mistakes that hurt ATS scans and recruiter review for Indian college students.",
    publishedAt: "2026-05-24",
    updatedAt: "2026-05-24",
    readingTime: "5 min read",
    category: "Internships",
    targetKeyword: "internship resume mistakes",
    keywords: [
      "internship resume mistakes",
      "internship resume builder free",
      "college student resume builder"
    ],
    excerpt:
      "Most student resumes fail because they are too vague, too decorative, or not connected to the internship description.",
    sections: [
      {
        heading: "Mistake 1: Writing a generic objective",
        body: [
          "Replace 'seeking a challenging position' with a two-line summary that connects your strongest skills and projects to the internship.",
          "Mention the role direction: frontend, backend, data analytics, machine learning, QA, cybersecurity, or software engineering."
        ]
      },
      {
        heading: "Mistake 2: Listing skills without proof",
        body: [
          "If your skills section says React, SQL, Java, or Python, your projects should prove those skills. Recruiters trust skills more when they appear in project bullets too.",
          "Group skills by category so they are easy to scan: Languages, Frontend, Backend, Databases, Tools, and Fundamentals."
        ]
      },
      {
        heading: "Mistake 3: Hiding the best project",
        body: [
          "Your strongest project should appear first and get the most specific bullets. Explain architecture, implementation, and user or technical impact.",
          "If the internship is frontend, make UI, performance, responsiveness, and API integration visible. If it is backend, show database, authentication, APIs, testing, and deployment."
        ]
      },
      {
        heading: "Mistake 4: Using the same resume everywhere",
        body: [
          "Internship descriptions vary. A resume for a React internship should emphasize different evidence than one for a Java backend internship.",
          "Tailoring does not mean inventing. It means choosing the most relevant truth and writing it in the employer's language."
        ]
      }
    ]
  },
  {
    slug: "tailor-resume-for-every-job",
    title: "How to Tailor Your Resume for Every Job in 5 Minutes",
    description:
      "A fast resume tailoring workflow for students who apply to many internships and fresher jobs every week.",
    publishedAt: "2026-05-24",
    updatedAt: "2026-05-24",
    readingTime: "4 min read",
    category: "Resume tailoring",
    targetKeyword: "how to customize resume for each job",
    keywords: [
      "how to customize resume for each job",
      "resume tailoring tool for students",
      "student resume generator with job description"
    ],
    excerpt:
      "The fastest way to tailor a resume is to keep one master profile, then adjust summary, skills order, and project bullets for each job description.",
    sections: [
      {
        heading: "Minute 1: Identify the job signals",
        body: [
          "Read the job description once and mark repeated skills, required tools, responsibilities, and project themes. Repeated words are often ATS and recruiter signals.",
          "For fresher roles, also look for fundamentals such as DSA, OOP, SQL, DBMS, operating systems, Git, testing, and communication."
        ]
      },
      {
        heading: "Minute 2: Match your evidence",
        body: [
          "Find the projects, coursework, internship work, certificates, or achievements that prove those signals. If there is no proof, do not add the claim.",
          "A truthful resume with strong alignment beats a keyword-stuffed resume that collapses in the interview."
        ]
      },
      {
        heading: "Minutes 3-4: Rewrite only high-impact lines",
        body: [
          "Change the summary, reorder skills, and rewrite the top project or experience bullets. You usually do not need to rewrite the entire resume.",
          "Keep dates, education, employer names, project names, and contact details stable."
        ]
      },
      {
        heading: "Minute 5: Export and save",
        body: [
          "Download a clean PDF and name it by role or company so you can track applications later.",
          "Apply automates this workflow by generating a tailored resume from your uploaded resume and the target job description."
        ]
      }
    ]
  },
  {
    slug: "engineering-student-resume-template",
    title: "Engineering Student Resume Template: Free Structure and Examples",
    description:
      "A free engineering student resume structure with section order, bullet examples, and ATS-safe formatting tips.",
    publishedAt: "2026-05-24",
    updatedAt: "2026-05-24",
    readingTime: "5 min read",
    category: "Templates",
    targetKeyword: "engineering student resume template",
    keywords: [
      "engineering student resume template",
      "IIT student resume template",
      "college student resume builder"
    ],
    excerpt:
      "Use this engineering resume structure when you need a clean base resume for internships, campus placements, and fresher jobs.",
    sections: [
      {
        heading: "Recommended section order",
        body: [
          "Use this order for most student resumes: Header, Summary, Skills, Projects, Experience or Internships, Education, Certifications, Achievements, and Links.",
          "If you have strong internship experience, move Experience above Projects. If you are project-heavy, keep Projects near the top."
        ]
      },
      {
        heading: "Summary example",
        body: [
          "Computer Science student focused on full-stack development, React, Node.js, SQL, and REST APIs. Built project-based systems with authentication, database design, and responsive user interfaces.",
          "Adjust this summary for the role. For data roles, replace frontend/backend terms with Python, SQL, analysis, dashboards, and machine learning if you have proof."
        ]
      },
      {
        heading: "Project bullet examples",
        body: [
          "Built a job application tracker using React, Express, and MongoDB with authentication, filters, and PDF export.",
          "Integrated REST APIs and optimized dashboard state management to reduce repeated manual updates during application tracking."
        ]
      },
      {
        heading: "Use the template as a starting point",
        body: [
          "A template gives structure, but job-specific wording gives relevance. After you create a base resume, tailor it for each internship or fresher opening.",
          "Apply can generate the base resume and then improve it against a job description."
        ]
      }
    ]
  },
  {
    slug: "company-previous-year-coding-questions-india",
    title:
      "Company Previous Year Coding Questions (PYQs): Complete Campus Placement Guide 2026",
    description:
      "How to use company previous year coding question papers for TCS, Infosys, Amazon, Zoho, Google, and 60+ firms — OA practice, hiring process, and mock interview tips.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "8 min read",
    category: "Coding PYQs",
    targetKeyword: "previous year coding questions",
    keywords: [
      "previous year coding questions",
      "company previous year question paper",
      "campus placement coding PYQs",
      "TCS previous year coding questions",
      "Amazon OA previous year questions",
      "Infosys previous year coding questions",
      "online assessment previous year papers",
      "Zoho previous year coding questions"
    ],
    excerpt:
      "Previous year coding questions (PYQs) are the fastest way to understand what a company's OA and coding rounds actually ask — if you practice them under time pressure and pair them with speaking mocks.",
    sections: [
      {
        heading: "What are company previous year coding questions?",
        body: [
          "Company PYQs are coding problems and online assessment (OA) patterns reported by real candidates from campus drives, off-campus hirings, and hiring challenges. They are not unofficial dumps of every secret question — they are a practical map of difficulty, topics, and round structure.",
          "On Apply, the Company PYQs Library covers 64+ product, IT services, and BFSI companies — including TCS CodeVita, Infosys SP/DSE, Amazon OA, Zoho, Flipkart Grid, Google, Microsoft, Goldman Sachs, and Deloitte — with links to detailed previous year question guides."
        ]
      },
      {
        heading: "How to study a previous year question paper for placements",
        body: [
          "Start with the hiring process section before jumping into problems. Know whether the company uses an aptitude screen, OA coding, technical interviews, or HR culture rounds.",
          "Then solve OA questions under a 60–90 minute timer. Attempt each problem first; only open approach hints after you are stuck for a real attempt. Track weak topics (arrays, graphs, DP, strings) across companies.",
          "Keep a short list of three target companies. Repeat their PYQs weekly instead of randomly browsing every company guide once."
        ]
      },
      {
        heading: "Best PYQs for Indian campus placements",
        body: [
          "IT services: start with TCS, Infosys, Wipro, Cognizant, and Capgemini if you are aiming at volume hiring.",
          "Product and startups: Amazon, Flipkart, Zoho, PhonePe, Razorpay, and Microsoft-style OA patterns emphasize DSA clarity and timed coding.",
          "BFSI / consulting: Goldman Sachs, JP Morgan, Deloitte, and American Express often combine coding with analytical thinking — use their PYQ guides plus behavioral prep."
        ]
      },
      {
        heading: "Combine PYQs with AI mock interviews",
        body: [
          "Silent LeetCode practice is not enough. After you finish a company PYQs set, open Apply's AI mock interview for the same company and role. Enable coding questions at matching difficulty and speak your answers aloud.",
          "This closes the gap between knowing a solution and explaining it under interview pressure — the exact skill campus recruiters test."
        ]
      },
      {
        heading: "Where to open the full library",
        body: [
          "Browse the public PYQs hub for SEO-friendly discovery, then use the interactive Company PYQs Library inside Interview prep after you sign in.",
          "Links: apply.neexmeet.com/pyqs for the library overview, and apply.neexmeet.com/mock-interview to start voice practice."
        ]
      }
    ]
  },
  {
    slug: "ai-mock-interview-practice-campus-placements",
    title:
      "AI Mock Interview Practice for Campus Placements: Speak, Code, Score",
    description:
      "How to practice AI mock interviews online for Indian campus placements — Meet-style room, voice answers, coding rounds, and scored feedback on Apply.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "7 min read",
    category: "Mock interviews",
    targetKeyword: "mock interview practice online",
    keywords: [
      "mock interview practice online",
      "AI mock interview for freshers",
      "campus placement mock interview",
      "virtual mock interview India",
      "coding mock interview practice",
      "free mock interview for students",
      "ElevenLabs AI interviewer"
    ],
    excerpt:
      "A good mock interview should feel like a real call: you on camera, an interviewer speaking questions, live captions, optional coding, and a clear score when you hang up.",
    sections: [
      {
        heading: "Why reading answers is not enough",
        body: [
          "Most students prepare by reading HR and coding answers. Interviews require speaking under time pressure, clarifying assumptions, and recovering when stuck.",
          "Apply's web mock interview is built like a light Google Meet room — your camera on the left, an AI interviewer on the right — with ElevenLabs voice so questions sound natural, not robotic."
        ]
      },
      {
        heading: "How Apply's mock interview works",
        body: [
          "You enter company, role, optional job description, interview type (HR / technical / mixed), difficulty, and language (English default; Hindi, Tamil, Telugu, Marathi available).",
          "Questions are spoken aloud. Your answers are captioned live as you speak, then scored. You can enable coding questions so a terminal appears for Easy, Medium, or Hard problems with a test runner.",
          "When you click End call, the meeting closes and a results popup shows questions answered, strong answers, and coding tests passed — with history in Applications & progress."
        ]
      },
      {
        heading: "Best weekly practice plan",
        body: [
          "Day 1–2: Solve previous year coding questions for one target company from the PYQs library.",
          "Day 3: Run a technical mock interview for that company with coding enabled.",
          "Day 4: Run an HR / mixed mock to rehearse introductions and STAR stories.",
          "Day 5: Review weak answers in history, rewrite one STAR story, and repeat a short mock."
        ]
      },
      {
        heading: "Start free today",
        body: [
          "Open apply.neexmeet.com/mock-interview, sign in, and start a session. Pair every mock with company PYQs at apply.neexmeet.com/pyqs for the highest placement readiness."
        ]
      }
    ]
  }
] satisfies BlogPost[];
