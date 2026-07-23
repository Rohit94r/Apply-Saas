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
  workflowLinks?: Array<{
    label: string;
    href: string;
  }>;
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
    title: "Fresher Resume Format for IT Companies (India)",
    description:
      "Fresher resume format for Indian IT companies, campus placements, and TCS/Infosys/Wipro-style hiring rounds. Simple one-page structure that ATS can read.",
    publishedAt: "2026-05-24",
    updatedAt: "2026-07-20",
    readingTime: "5 min read",
    category: "Fresher resumes",
    targetKeyword: "fresher resume format for IT companies",
    keywords: [
      "fresher resume format for IT companies",
      "fresher resume format India",
      "TCS interview preparation resume",
      "Infosys internship resume format"
    ],
    excerpt:
      "For fresher hiring, recruiters want proof of fundamentals, projects, communication, and role fit more than heavy design.",
    workflowLinks: [
      { label: "Build an ATS resume", href: "/dashboard/generate" },
      { label: "Compare resume builders", href: "/blog/best-resume-builder-india-students-comparison" }
    ],
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
    title: "Engineering Student Resume Free Template India",
    description:
      "Engineering student resume free template for Indian campus placements — section order, project bullets, ATS-safe format. Build free on Apply.",
    publishedAt: "2026-05-24",
    updatedAt: "2026-07-23",
    readingTime: "5 min read",
    category: "Templates",
    targetKeyword: "engineering student resume",
    keywords: [
      "engineering student resume",
      "resume engineering student",
      "engineering student resume template",
      "free engineering resume template India",
      "IIT student resume template",
      "college student resume builder",
      "ATS resume template for engineering students",
      "resume for engineering student India"
    ],
    excerpt:
      "Use this engineering resume structure when you need a clean base resume for internships, campus placements, and fresher jobs.",
    workflowLinks: [
      { label: "Build this template in Apply", href: "/dashboard/generate" },
      { label: "Resume engineering student guide", href: "/blog/resume-for-engineering-students-india-template" },
      { label: "Resume for student with no experience", href: "/blog/resume-with-no-experience-student" },
      { label: "Free resume maker for students", href: "/blog/free-resume-maker-for-students-india" },
      { label: "Practice mock interviews", href: "/mock-interview" }
    ],
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
    title: "Company Previous Year Coding Questions (PYQs)",
    description:
      "Company previous year coding questions for TCS, Infosys, Amazon, Zoho, Google, and 60+ firms — OA practice, hiring process, and mock interview tips for campus placements.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-20",
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
    workflowLinks: [
      { label: "Open Company PYQs library", href: "/pyqs" },
      { label: "Start coding mock interview", href: "/mock-interview" },
      {
        label: "14-day PYQ placement plan",
        href: "/blog/company-pyq-14-day-placement-plan"
      }
    ],
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
    title: "AI Mock Interview Practice Online for Freshers",
    description:
      "AI mock interview free for freshers — voice answers, coding rounds, scored feedback. Unlimited mock interview practice online on Apply.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-23",
    readingTime: "7 min read",
    category: "Mock interviews",
    targetKeyword: "AI mock interview",
    keywords: [
      "AI mock interview",
      "AI mock interview for freshers",
      "mock interview",
      "mock interview practice online",
      "mock interview practice",
      "campus placement mock interview",
      "virtual mock interview India",
      "coding mock interview practice",
      "free mock interview for students",
      "free AI mock interview online",
      "unlimited interview practice",
      "mock interviews"
    ],
    excerpt:
      "A good mock interview should feel like a real call: you on camera, an interviewer speaking questions, live captions, optional coding, and a clear score when you hang up.",
    workflowLinks: [
      { label: "Start free mock interview", href: "/mock-interview" },
      { label: "Browse company PYQs", href: "/pyqs" },
      {
        label: "Unlimited interview practice guide",
        href: "/blog/unlimited-interview-practice-online"
      },
      {
        label: "Use interview feedback well",
        href: "/blog/use-ai-mock-interview-feedback"
      }
    ],
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
  },
  {
    slug: "campus-placement-guide-india-2026",
    title: "Campus Placement Guide 2026: How to Crack TCS, Infosys, Amazon & More",
    description:
      "Complete campus placement preparation guide for Indian engineering students — aptitude, coding, interviews, resume, and company-wise strategy from first year to placement season.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "12 min",
    category: "Placement Strategy",
    targetKeyword: "campus placement guide India",
    keywords: [
      "campus placement guide India",
      "campus placement preparation strategy",
      "how to crack campus placements",
      "TCS campus placement preparation",
      "Infosys campus placement tips",
      "Amazon campus placement India",
      "placement preparation for engineering students",
      "campus placement aptitude preparation"
    ],
    excerpt:
      "Campus placement season starts in your 3rd year. Here is a month-by-month plan covering aptitude, coding, resume, and company-wise interview prep — with links to PYQs and mock interviews.",
    sections: [
      {
        heading: "When does campus placement preparation start",
        body: [
          "Most Indian engineering colleges start campus placements in the 7th semester (4th year), but companies like TCS, Infosys, and Cognizant run mass hiring from the 6th semester onward through NQT, InfyTQ, and Superset.",
          "Start preparing in your 2nd year — learn one programming language, build 2 projects, and solve 30 easy LeetCode problems. By 3rd year, focus on DSA patterns, aptitude, and company-specific PYQs.",
          "Apply provides company-wise previous year coding questions for 64+ companies at /pyqs — use them to identify what each company actually asks in OA rounds."
        ]
      },
      {
        heading: "The four pillars of placement preparation",
        body: [
          "1. Aptitude — Quantitative, logical reasoning, and verbal. TCS NQT, Infosys SP, and Wipro NLTH all test aptitude in round 1. Practice 50+ aptitude questions per topic from platforms like IndiaBix and PrepInsta.",
          "2. Coding — DSA fundamentals (arrays, strings, trees, graphs, DP). Product companies like Amazon and Microsoft ask medium/hard LeetCode questions. Service companies like TCS and Wipro ask easy/medium coding questions.",
          "3. Technical interview — Core CS subjects (OS, DBMS, OOP, CN) + project deep dive. Prepare 2 projects with clear architecture explanations.",
          "4. HR interview — Behavioral questions, strength/weakness, why this company, and case studies. Use STAR format for all answers."
        ]
      },
      {
        heading: "Company-wise preparation strategy",
        body: [
          "TCS: Focus on NQT aptitude (30 quant + 30 logical + 30 verbal) + 2 coding problems (easy/medium). Interview is mostly HR + basic technical. Check TCS NQT preparation guide on Apply.",
          "Infosys: SP role requires harder coding + system design. DSE role focuses on Java + advanced DSA. Basic Infosys role needs aptitude + simple coding. Check Infosys SP DSE PYQs on Apply.",
          "Amazon: 1-2 online assessments (OA) with medium/hard coding, followed by 3-4 interviews covering LP-based behavioral + coding + system design. Check Amazon OA questions on Apply.",
          "Wipro: NLTH (national level talent hunt) has aptitude + coding. Elite NLTH is harder. Interview is technical + HR. Check Wipro Elite NTH preparation on Apply."
        ]
      },
      {
        heading: "Resume tips for campus placements",
        body: [
          "Keep your resume to one page. Include: name + contact, education (with CGPA), 2-3 projects with tech stack and impact, skills (languages + tools), and 1-2 achievements.",
          "Tailor your resume for each company. TCS looks for consistency and basic skills. Amazon looks for impact metrics and leadership principles. Use Apply's free resume tailoring tool to customize per job description.",
          "Upload your resume to Apply, paste the JD, and get an ATS-optimized version in seconds — free for the first 5 generations."
        ]
      },
      {
        heading: "Mock interview practice",
        body: [
          "Before the real interview, practice with Apply's AI mock interview at /mock-interview. It speaks questions aloud (ElevenLabs voice), captures your voice answers, and gives scored feedback.",
          "Pick your target company, role, and difficulty. The interviewer asks HR, technical, or mixed questions — just like a real campus placement interview.",
          "Pair every mock with company PYQs from /pyqs for maximum readiness. Practice 3-5 mock interviews before your first real placement interview."
        ]
      },
      {
        heading: "Timeline: 6-month placement preparation plan",
        body: [
          "Month 1-2: Master one language + basic DSA (arrays, strings, sorting, searching). Solve 50 easy problems on LeetCode/HackerRank.",
          "Month 3-4: Intermediate DSA (trees, graphs, DP) + aptitude practice (IndiaBix, PrepInsta). Start company-specific PYQ practice.",
          "Month 5: Resume finalization + project deep dive prep + mock interviews (3-5 sessions).",
          "Month 6: Company-wise OA and interview practice. Apply to companies via Superset, NQT, and direct referrals."
        ]
      },
      {
        heading: "Start your placement prep free",
        body: [
          "Apply gives you everything in one place: ATS resume builder, 64+ company PYQs, AI mock interview, and company prep guides. Free to start — no credit card needed.",
          "Open apply.neexmeet.com, build your resume, browse company PYQs at /pyqs, and practice mock interviews at /mock-interview."
        ]
      }
    ]
  },
  {
    slug: "aptitude-questions-for-campus-placements",
    title: "Aptitude Questions for Campus Placements: Topics, Patterns & Practice Tips",
    description:
      "Complete guide to campus placement aptitude tests — quantitative, logical reasoning, and verbal. Covers TCS NQT, Infosys, Wipro, Cognizant aptitude patterns with practice tips.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "10 min",
    category: "Aptitude",
    targetKeyword: "aptitude questions for placements",
    keywords: [
      "aptitude questions for placements",
      "TCS NQT aptitude questions",
      "campus placement aptitude preparation",
      "Infosys aptitude questions",
      "Wipro aptitude questions",
      "Cognizant aptitude questions",
      "quantitative aptitude for campus placements",
      "logical reasoning placement preparation"
    ],
    excerpt:
      "Aptitude is the first filter in most campus placements. Here are the exact topics, question patterns, and practice strategies for TCS NQT, Infosys, Wipro, and Cognizant aptitude rounds.",
    sections: [
      {
        heading: "Why aptitude matters for campus placements",
        body: [
          "Every major Indian IT company — TCS, Infosys, Wipro, Cognizant, Accenture, Capgemini — starts with an aptitude test. If you fail aptitude, you never reach the coding or interview round.",
          "Aptitude tests typically have 30-50 questions in 60-80 minutes. The cut-off varies by company: TCS NQT requires ~60% correct, Infosys requires ~70%, and product companies can require 80%+."
        ]
      },
      {
        heading: "Quantitative aptitude topics",
        body: [
          "Number system, HCF/LCM, divisibility — basic but always tested",
          "Time, speed, distance — 2-3 questions guaranteed in TCS and Infosys",
          "Time and work — pipes, cisterns, efficiency problems",
          "Percentages, profit/loss, simple/compound interest",
          "Ratio, proportion, and mixture — alligations",
          "Permutations, combinations, and probability — 1-2 questions",
          "Geometry and mensuration — areas, volumes",
          "Data interpretation — tables, bar charts, pie charts (common in Infosys)"
        ]
      },
      {
        heading: "Logical reasoning topics",
        body: [
          "Syllogisms — 3-5 questions in every service company aptitude test",
          "Blood relations — 2-3 questions, easy if you practice",
          "Direction sense — 1-2 questions",
          "Coding-decoding — letter/number series, very common",
          "Seating arrangement — linear and circular, 3-5 questions",
          "Data sufficiency — 2-3 questions in Infosys and Cognizant",
          "Statement and assumptions/conclusions — common in Wipro"
        ]
      },
      {
        heading: "Verbal ability topics",
        body: [
          "Reading comprehension — 1 passage with 5 questions in TCS NQT",
          "Sentence correction — grammar, tense, articles",
          "Synonyms and antonyms — 3-5 questions",
          "Fill in the blanks — prepositions, conjunctions",
          "Para jumbles — sentence rearrangement (Infosys favorite)"
        ]
      },
      {
        heading: "Company-wise aptitude patterns",
        body: [
          "TCS NQT: 20 quant + 20 logical + 20 verbal (80 min). Cut-off ~60%. Questions are moderate difficulty. Check TCS NQT preparation guide on Apply.",
          "Infosys: 10 quant + 15 logical + 15 verbal + 10 DI (95 min). Cut-off ~70%. Harder than TCS, especially DI and logical.",
          "Wipro: 15 quant + 15 logical + 15 verbal (60 min). Moderate difficulty. Elite NLTH has harder aptitude.",
          "Cognizant: 24 quant + 24 logical + 24 verbal (56 min). Time pressure is the biggest challenge — practice speed.",
          "Accenture: Similar to TCS pattern. Check Accenture coding questions on Apply for the next round."
        ]
      },
      {
        heading: "How to practice aptitude effectively",
        body: [
          "Start with IndiaBix — free, topic-wise practice with solutions. Do 50 questions per topic.",
          "Take timed mock tests on PrepInsta and FacePrep to simulate real test conditions.",
          "Focus on speed: aim for 1 question per minute. Skip hard questions and return later.",
          "Keep an error notebook: track topics where you make mistakes and revisit weekly.",
          "Practice daily for 30 minutes starting 3 months before placement season."
        ]
      },
      {
        heading: "After aptitude: coding and interview",
        body: [
          "Once you clear aptitude, the next round is coding (OA) — check company PYQs at /pyqs for exact coding questions asked by each company.",
          "Then prepare for the technical + HR interview using Apply's AI mock interview at /mock-interview."
        ]
      }
    ]
  },
  {
    slug: "dsa-interview-questions-for-freshers",
    title: "DSA Interview Questions for Freshers: Top 30 Patterns with Solutions",
    description:
      "Master DSA interview questions for campus placements — arrays, strings, trees, graphs, DP. Top 30 patterns with approach hints, complexity, and links to practice problems.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "15 min",
    category: "DSA",
    targetKeyword: "DSA interview questions for freshers",
    keywords: [
      "DSA interview questions for freshers",
      "data structures interview questions",
      "algorithms interview questions India",
      "coding interview patterns",
      "LeetCode patterns for beginners",
      "DSA for campus placements",
      "array interview questions",
      "dynamic programming interview questions",
      "graph interview questions",
      "tree interview questions"
    ],
    excerpt:
      "DSA is the core of every coding interview. Here are the top 30 patterns — from two pointers to dynamic programming — that appear in TCS, Amazon, Microsoft, and Google interviews.",
    sections: [
      {
        heading: "Why patterns matter more than memorizing problems",
        body: [
          "Most coding interview questions are variations of 15-20 core patterns. If you recognize the pattern, you can solve any variation — even under pressure.",
          "Companies like Amazon and Microsoft don't expect you to memorize 500 LeetCode problems. They expect you to recognize the pattern and apply it to a new problem in 30 minutes."
        ]
      },
      {
        heading: "Array patterns (most frequently asked)",
        body: [
          "Two pointers — pair sum, three sum, container with most water. Start with sorted arrays, move pointers based on sum comparison.",
          "Sliding window — maximum subarray sum K, longest substring without repeating characters. Maintain a window [left, right] and shrink/expand based on condition.",
          "Prefix sum — range sum queries, equilibrium index. Precompute cumulative sums for O(1) range queries.",
          "Kadane's algorithm — maximum subarray sum. Track current max and global max as you iterate.",
          "Dutch national flag — sort 0s, 1s, 2s in-place. Three-way partitioning."
        ]
      },
      {
        heading: "String patterns",
        body: [
          "Hash map counting — character frequency, anagram check. Use Map or object for O(n) lookups.",
          "Palindrome — expand from center, or reverse and compare. Two-pointer approach from both ends.",
          "String matching — KMP algorithm, Rabin-Karp. Know at least one efficient string search algorithm.",
          "Anagram grouping — sort each string as key, group by sorted key."
        ]
      },
      {
        heading: "Tree and graph patterns",
        body: [
          "BFS / DFS — tree traversal, graph traversal. Use queue for BFS, stack/recursion for DFS.",
          "Binary search tree — search, insert, delete. Know the BST property and in-order traversal.",
          "Tree DP — diameter of binary tree, maximum path sum. Post-order traversal with return values.",
          "Graph shortest path — Dijkstra for weighted, BFS for unweighted. Know when to use each.",
          "Topological sort — course schedule, task dependency. Use DFS or Kahn's algorithm (BFS-based)."
        ]
      },
      {
        heading: "Dynamic programming patterns",
        body: [
          "1D DP — Fibonacci, climbing stairs, house robber. Identify subproblems and overlapping computations.",
          "2D DP — longest common subsequence, edit distance, 0/1 knapsack. Build a table from base cases.",
          "DP on arrays — maximum subarray, jump game. Track state at each position.",
          "DP on strings — longest palindromic substring, word break. Process substrings from shortest to longest.",
          "Bitmask DP — traveling salesman, subset sum. Use bitmasks when state includes which elements are used."
        ]
      },
      {
        heading: "Linked list and stack patterns",
        body: [
          "Fast/slow pointers — detect cycle, find middle, merge point. Floyd's algorithm.",
          "Reverse linked list — iterative and recursive. Fundamental operation tested everywhere.",
          "Merge sorted lists — two-pointer merge. Extension: merge K sorted lists with heap.",
          "Monotonic stack — next greater element, largest rectangle in histogram. Maintain a stack of indices.",
          "Valid parentheses — stack-based matching. Extension: generate all valid parentheses combinations."
        ]
      },
      {
        heading: "Company-wise DSA expectations",
        body: [
          "TCS / Wipro / Cognizant: Easy/medium arrays, strings, basic sorting. Check TCS coding questions on Apply PYQs.",
          "Amazon / Microsoft: Medium arrays, trees, graphs, DP. 2-3 problems in OA. Check Amazon OA questions on Apply.",
          "Google / Meta: Hard problems, often 2 patterns combined. System design may accompany coding.",
          "Goldman Sachs / JP Morgan: Medium DP + array problems. Focus on correctness over optimization."
        ]
      },
      {
        heading: "How to practice DSA for placements",
        body: [
          "Start with NeetCode Blind 75 — covers all 15 core patterns with video explanations.",
          "Practice on LeetCode with company tags — filter by your target company.",
          "Solve under timed conditions: 30 minutes for easy, 45 for medium, 60 for hard.",
          "Keep a pattern notebook: write the pattern name, approach, and time complexity for each problem.",
          "Use Apply's company PYQs at /pyqs to see exactly which DSA problems each company asked in previous years."
        ]
      },
      {
        heading: "After DSA: interview preparation",
        body: [
          "DSA clears the coding round. The interview round tests communication, project knowledge, and behavioral fit.",
          "Practice with Apply's AI mock interview at /mock-interview — it simulates real interview conditions with voice questions and scored feedback."
        ]
      }
    ]
  },
  {
    slug: "best-resume-builder-india-students-comparison",
    title: "Best Resume Builder for Students in India (2026): Free, ATS-Friendly & AI-Powered",
    description:
      "Compare the best resume builders for Indian students — Apply, Novoresume, Zety, Canva. Features, pricing, ATS compatibility, and which one works best for campus placements.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-21",
    readingTime: "8 min",
    category: "Resume Tools",
    targetKeyword: "best resume builder India students",
    keywords: [
      "best resume builder India students",
      "free resume builder for freshers",
      "ATS friendly resume builder India",
      "AI resume builder for students",
      "resume builder free for students",
      "free resume maker for students",
      "campus placement resume builder",
      "resume builder for engineering students India",
      "free ATS resume optimizer",
      "resume tailoring tool India",
      "Apply vs Novoresume",
      "resume builder for TCS Infosys"
    ],
    excerpt:
      "Which resume builder is best for Indian students preparing for campus placements? We compare features, ATS compatibility, and pricing — and why Apply is built specifically for India.",
    workflowLinks: [
      { label: "Build ATS resume free", href: "/dashboard/generate" },
      {
        label: "Best AI resume builders for students",
        href: "/blog/best-ai-resume-builder-students-india"
      },
      {
        label: "Best free resume editor for placements",
        href: "/blog/best-free-resume-editor-campus-placements"
      },
      { label: "Practice mock interviews", href: "/mock-interview" }
    ],
    sections: [
      {
        heading: "What Indian students need from a resume builder",
        body: [
          "Indian campus placements have unique requirements: one-page resumes, CGPA display, project descriptions with tech stack, and ATS compatibility for companies like TCS, Infosys, and Amazon.",
          "Most global resume builders (Novoresume, Zety, Canva) are built for US/EU job markets — they don't support Indian placement formats, company-specific tailoring, or free PDF downloads without watermarks."
        ]
      },
      {
        heading: "Apply — built for India placements",
        body: [
          "Apply is a free AI resume builder designed for Indian engineering students. Key features: upload PDF/Word resume → AI tailors it to any JD → download clean ATS-friendly PDF.",
          "Free plan: 5 resume generations (per account + per device). No credit card needed. ATS keyword matching score included.",
          "Unique to Apply: company-specific PYQs library (64+ companies), AI mock interview with voice, and campus placement prep guides — all in one platform.",
          "Best for: Students preparing for TCS, Infosys, Wipro, Amazon, Microsoft, and 60+ other companies hiring in India."
        ]
      },
      {
        heading: "Novoresume — visual templates",
        body: [
          "Novoresume offers beautiful visual templates but the free plan is limited to 1-page resumes with a Novoresume watermark. Premium starts at €6/month.",
          "No ATS scoring, no company-specific tailoring, no Indian placement features. Better suited for European job seekers."
        ]
      },
      {
        heading: "Zety — US-focused",
        body: [
          "Zety has a strong resume builder with cover letter integration, but it's US-focused with pricing starting at $5.45/month. No free PDF download.",
          "Templates are ATS-friendly but not optimized for Indian campus placement formats. No company-specific tailoring."
        ]
      },
      {
        heading: "Canva — design-focused",
        body: [
          "Canva has the best-looking templates but most are NOT ATS-friendly. Graphic resumes with columns and images get rejected by ATS systems used by TCS, Infosys, and Amazon.",
          "Use Canva for creative portfolios, not for campus placement resumes. ATS systems cannot parse Canva's visual layouts."
        ]
      },
      {
        heading: "Comparison table",
        body: [
          "Apply: Free 5 resumes, ATS scoring, AI tailoring, company PYQs, mock interview, India-focused. Best for campus placements.",
          "Novoresume: Free 1-page (watermarked), visual templates, no ATS. Best for EU creative roles.",
          "Zety: $5.45/mo, US templates, cover letters. Best for US job seekers.",
          "Canva: Free, beautiful but NOT ATS-friendly. Best for design portfolios only."
        ]
      },
      {
        heading: "Why ATS compatibility matters",
        body: [
          "ATS (Applicant Tracking System) software scans your resume for keywords from the job description. If keywords don't match, your resume is rejected before a human sees it.",
          "TCS, Infosys, Wipro, Amazon, and most large companies use ATS. Apply's resume tailoring tool reads the JD, extracts keywords, and rewrites your resume to match — automatically.",
          "Check your ATS score free on Apply: upload your resume, paste a JD, and see your keyword match percentage before downloading."
        ]
      },
      {
        heading: "Start building your placement resume free",
        body: [
          "Open apply.neexmeet.com, upload your current resume (PDF, Word, or text), paste any job description, and get a tailored ATS-friendly resume in seconds.",
          "Then browse 64+ company PYQs at /pyqs and practice mock interviews at /mock-interview — all free to start."
        ]
      }
    ]
  },
  {
    slug: "interview-tips-for-freshers-first-job",
    title: "Interview Tips for Freshers: First Job in India",
    description:
      "Interview tips for freshers — HR answers, technical strategy, dress code, and nervousness. Pair with free mock interview practice on Apply.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-23",
    readingTime: "9 min",
    category: "Interview Tips",
    targetKeyword: "interview tips for freshers",
    keywords: [
      "interview tips for freshers",
      "interview preparation for freshers",
      "first job interview tips India",
      "HR interview questions for freshers",
      "campus placement interview tips",
      "how to crack interview for first job",
      "technical interview tips for freshers",
      "interview preparation for engineering students",
      "body language interview tips",
      "TCS HR interview tips",
      "freshers interview mistakes to avoid"
    ],
    excerpt:
      "Your first job interview is stressful. Here are practical, proven tips for freshers — what to say in HR rounds, how to approach technical questions, and how to project confidence even when nervous.",
    workflowLinks: [
      { label: "Interview preparation for freshers", href: "/blog/interview-preparation-for-freshers" },
      { label: "Start free mock interview", href: "/mock-interview" },
      { label: "Browse company PYQs", href: "/pyqs" },
      { label: "Build ATS resume", href: "/dashboard/generate" }
    ],
    sections: [
      {
        heading: "Before the interview: preparation checklist",
        body: [
          "Research the company: read their website, recent news, and Glassdoor reviews. Know their products, values, and why you want to join specifically them.",
          "Review your resume: you should be able to explain every project, every skill, and every line on your resume in 2-3 sentences.",
          "Prepare 3 STAR stories: Situation, Task, Action, Result. One for teamwork, one for problem-solving, one for leadership/initiative.",
          "Practice with Apply's AI mock interview at /mock-interview — it simulates real interview conditions with voice and scored feedback."
        ]
      },
      {
        heading: "HR round: most common questions for freshers",
        body: [
          "\"Tell me about yourself\" — 2-minute structured answer: education → skills → projects → why this role. Don't recite your resume; summarize it.",
          "\"Why do you want to join our company?\" — Reference specific products, values, or recent news. Never say \"because it's a good company.\"",
          "\"What are your strengths and weaknesses?\" — Pick 2 strengths with examples. For weakness, pick something real but with a fix (e.g., \"I used to struggle with public speaking, so I joined Toastmasters\").",
          "\"Where do you see yourself in 5 years?\" — Show growth aligned with the company. \"I want to grow as a developer and take on more responsibility in backend systems.\"",
          "\"Why should we hire you?\" — Connect your skills + projects to what the company needs. \"My experience with React and Node.js matches your frontend role, and my fintech project shows I understand your domain.\""
        ]
      },
      {
        heading: "Technical round: how to approach coding questions",
        body: [
          "Listen to the full question before speaking. Ask clarifying questions: input format, constraints, edge cases.",
          "Think out loud — interviewers want to see your thought process. Even if you don't solve it, showing structured thinking gets partial credit.",
          "Start with brute force, then optimize. Say \"First, I can solve this with a nested loop in O(n²). Can I do better? Yes, with a hash map in O(n).\"",
          "Write clean code. Use meaningful variable names. Handle edge cases (empty input, null, negative numbers).",
          "If stuck, ask for a hint. Interviewers prefer candidates who communicate over those who sit silently for 20 minutes."
        ]
      },
      {
        heading: "Body language and presentation",
        body: [
          "Dress formally: for campus placements, a clean shirt + trousers is standard. For product companies, smart casual is usually fine. When in doubt, overdress slightly.",
          "Eye contact: look at the interviewer when speaking and listening. If it's a video interview, look at the camera, not the screen.",
          "Posture: sit up straight, don't slouch. Lean slightly forward to show engagement.",
          "Hand gestures: natural, moderate. Don't fidget with pens or papers.",
          "Smile: a genuine smile at the start and end of the interview sets a positive tone."
        ]
      },
      {
        heading: "How to handle nervousness",
        body: [
          "Nervousness is normal — even experienced professionals get nervous. The key is to channel it into alertness, not panic.",
          "Take 3 deep breaths before entering the interview room. Breathing slows your heart rate and calms your voice.",
          "If you don't know an answer, say \"I'm not sure, but I would approach it by...\" — show your problem-solving process.",
          "If you freeze, say \"Let me take a moment to think\" — 10 seconds of silence is better than rambling.",
          "Remember: the interviewer wants you to succeed. They're investing time to find a good candidate, not to trick you."
        ]
      },
      {
        heading: "Common fresher interview mistakes to avoid",
        body: [
          "Don't memorize answers word-for-word — interviewers can tell. Memorize key points, not sentences.",
          "Don't badmouth previous employers, professors, or colleges — it reflects poorly on you.",
          "Don't say \"I don't know\" and stop — say \"I don't know, but I can learn it\" or \"I'd approach it by...\"",
          "Don't ask about salary in the first interview — wait until the HR negotiation round.",
          "Don't forget to ask questions at the end — \"What does a typical day look like?\" or \"What technologies does the team use?\""
        ]
      },
      {
        heading: "After the interview",
        body: [
          "Send a thank-you email within 24 hours if you have the interviewer's contact. Keep it short: thank them, reiterate your interest, and mention one specific thing from the interview.",
          "If rejected, ask for feedback. Most companies won't give detailed feedback, but some will — use it to improve.",
          "Practice again with Apply's mock interview at /mock-interview. Every interview makes you better — even failed ones."
        ]
      },
      {
        heading: "Practice before the real thing",
        body: [
          "The best way to prepare for interviews is to practice in realistic conditions. Apply's AI mock interview speaks questions aloud, captures your voice answers, and gives scored feedback — just like a real interview.",
          "Open /mock-interview, pick your target company and role, and practice 3-5 sessions before your first real placement interview."
        ]
      }
    ]
  },
  {
    slug: "tcs-nqt-preparation-guide-2026",
    title: "TCS NQT Preparation Guide 2026: Syllabus & Tips",
    description:
      "TCS NQT 2026 prep — aptitude, reasoning, verbal, coding syllabus, cut-off, and a 30-day plan. Practice PYQs and mock interviews on Apply.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-21",
    readingTime: "11 min",
    category: "Company Prep",
    targetKeyword: "TCS NQT preparation 2026",
    keywords: [
      "TCS NQT preparation 2026",
      "TCS NQT syllabus",
      "TCS NQT exam pattern",
      "TCS NQT cut off marks",
      "TCS NQT aptitude questions",
      "TCS NQT coding questions",
      "TCS NQT preparation tips",
      "TCS national qualifier test preparation",
      "TCS NQT previous year papers",
      "how to crack TCS NQT"
    ],
    excerpt:
      "TCS NQT is the gateway to India's largest IT employer. Here is the complete 2026 preparation guide — syllabus, exam pattern, section-wise cut-off, coding topics, and a 30-day study plan.",
    workflowLinks: [
      { label: "Browse TCS PYQs", href: "/pyqs" },
      { label: "TCS interview prep guide", href: "/prepare/tcs-interview-questions-2026" },
      { label: "TCS resume format", href: "/blog/tcs-resume-format-for-freshers" },
      { label: "Practice TCS mock interview", href: "/mock-interview" }
    ],
    sections: [
      {
        heading: "What is TCS NQT",
        body: [
          "TCS National Qualifier Test (NQT) is the entrance exam for TCS hiring. It is conducted multiple times a year and serves as the gateway for TCS Ninja, TCS Digital, and TCS Prime roles.",
          "The exam has two variants: Foundation NQT (for Ninja roles, ₹3.36 LPA) and Advanced NQT (for Digital roles, ₹7 LPA+). You can attempt both in the same session.",
          "Over 3 lakh students appear for TCS NQT each year, making it one of the largest placement exams in India."
        ]
      },
      {
        heading: "TCS NQT exam pattern 2026",
        body: [
          "Foundation Section (mandatory for all): Verbal ability (15 questions, 10 min), Reasoning ability (15 questions, 25 min), Numerical ability (15 questions, 25 min). Total: 45 questions in 60 minutes.",
          "Advanced Section (optional, for Digital/Prime roles): Advanced quantitative + logical (15 questions, 25 min), Advanced coding (2 problems, 45 min). Total: 17 questions in 70 minutes.",
          "There is negative marking: 0.25 marks deducted for each wrong answer in the Foundation section. No negative marking in Advanced."
        ]
      },
      {
        heading: "TCS NQT syllabus — section-wise breakdown",
        body: [
          "Numerical ability: Time, speed, distance; percentages; profit/loss; ratio and proportion; averages; number system; probability; permutations and combinations; mensuration; data interpretation.",
          "Reasoning ability: Syllogisms; blood relations; direction sense; coding-decoding; number series; seating arrangement; data sufficiency; statement and conclusions.",
          "Verbal ability: Reading comprehension; sentence correction; fill in the blanks; synonyms/antonyms; para jumbles; spelling errors.",
          "Advanced coding: Arrays, strings, trees, graphs, DP, greedy. Usually 2 problems — one medium, one hard. Check TCS coding questions on Apply PYQs."
        ]
      },
      {
        heading: "TCS NQT cut-off marks",
        body: [
          "Foundation cut-off: approximately 60% correct answers to qualify for the interview round. This means getting ~27 out of 45 questions right.",
          "Advanced cut-off: approximately 70% to be shortlisted for TCS Digital interviews. Getting both coding problems correct almost guarantees shortlisting.",
          "Cut-off varies by batch and hiring demand. During mass hiring drives, the cut-off can be lower. During selective hiring, it can be higher."
        ]
      },
      {
        heading: "30-day TCS NQT preparation plan",
        body: [
          "Days 1-10: Quantitative aptitude — practice 30 questions per day from IndiaBix. Focus on time-speed-distance, percentages, profit-loss first (highest weightage).",
          "Days 11-15: Reasoning ability — practice syllogisms, seating arrangement, and coding-decoding. These are the most scoring sections.",
          "Days 16-18: Verbal ability — read one RC passage daily, practice para jumbles and sentence correction. This section is often neglected but is the easiest to score.",
          "Days 19-25: Coding — solve 2 problems daily from TCS PYQs on Apply. Focus on arrays, strings, and basic DP. TCS coding is easier than Amazon — mostly easy/medium LeetCode level.",
          "Days 26-30: Full mock tests — take 5 timed mocks on PrepInsta or FacePrep. Analyze mistakes and revisit weak topics."
        ]
      },
      {
        heading: "TCS NQT interview round",
        body: [
          "After clearing NQT, you face 2 rounds: Technical + HR. Technical covers basic programming (C/Java/Python), OOP concepts, DBMS, and your project. HR covers behavioral questions.",
          "Prepare 2 projects thoroughly — TCS interviewers ask about your role, tech stack, and challenges faced.",
          "Practice with Apply's AI mock interview at /mock-interview with company set to TCS for realistic preparation."
        ]
      },
      {
        heading: "Common mistakes to avoid in TCS NQT",
        body: [
          "Don't attempt all questions blindly — negative marking in Foundation section means guessing can hurt your score. Skip questions you're unsure about.",
          "Don't ignore verbal ability — many students focus only on quant and reasoning, but verbal is the fastest section to score in. 15 questions in 10 minutes is achievable.",
          "Don't skip coding practice — even for Foundation roles, basic coding questions appear. For Advanced, coding is the deciding factor.",
          "Don't waste time on hard quant questions — if a problem takes more than 90 seconds, skip and return later."
        ]
      },
      {
        heading: "Start your TCS NQT prep free",
        body: [
          "Apply has TCS-specific PYQs, interview prep guides, and mock interviews — all free to start. Browse TCS coding questions at /pyqs, read the TCS interview prep guide at /prepare/tcs-interview-questions-2026, and practice mock interviews at /mock-interview."
        ]
      }
    ]
  },
  {
    slug: "hr-interview-questions-answers-freshers",
    title: "HR Interview Questions and Answers for Freshers: Top 25 with Examples",
    description:
      "Complete guide to HR interview questions for freshers — tell me about yourself, strengths, weaknesses, why this company, salary expectations, and 20 more with sample answers and tips.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "12 min",
    category: "Interview Tips",
    targetKeyword: "HR interview questions for freshers",
    keywords: [
      "HR interview questions for freshers",
      "HR round interview questions and answers",
      "tell me about yourself for freshers",
      "strengths and weaknesses interview answers",
      "why should we hire you answer for fresher",
      "why do you want to join this company",
      "where do you see yourself in 5 years fresher",
      "common HR interview questions India",
      "campus placement HR round tips",
      "behavioral interview questions for freshers"
    ],
    excerpt:
      "The HR round is where most freshers stumble — not because they lack skills, but because they haven't prepared answers. Here are the top 25 HR interview questions with sample answers that actually work.",
    sections: [
      {
        heading: "Why the HR round matters",
        body: [
          "In campus placements, the HR round is usually the final round. By this point, your technical skills are already validated — the HR round tests cultural fit, communication, and attitude.",
          "Many freshers treat the HR round casually and get rejected despite clearing technical rounds. Prepare for HR like you prepare for coding — with specific, practiced answers."
        ]
      },
      {
        heading: "1. Tell me about yourself",
        body: [
          "This is asked in 99% of interviews. Keep your answer to 90 seconds: education (10 sec) → technical skills (15 sec) → projects (30 sec) → why this role (20 sec) → personal interest (15 sec).",
          "Sample: \"I'm a final-year Computer Engineering student from [college]. I'm proficient in Java, Python, and React. My main project is a fintech dashboard built with the MERN stack — I designed the API, handled authentication, and deployed on Vercel. I'm interested in backend engineering because I enjoy designing scalable systems. Outside of tech, I play chess competitively.\""
        ]
      },
      {
        heading: "2. Why do you want to join our company",
        body: [
          "Research the company beforehand. Reference specific products, recent news, or values. Never say \"because it's a good company\" or \"for growth opportunities.\"",
          "Sample for TCS: \"TCS is India's largest IT company with a global presence. I'm impressed by TCS's focus on continuous learning through the iON platform, and I want to start my career in an environment that invests in freshers' growth.\""
        ]
      },
      {
        heading: "3. What are your strengths",
        body: [
          "Pick 2-3 strengths with specific examples. Don't list generic traits like \"hardworking\" or \"team player\" without evidence.",
          "Sample: \"My biggest strength is problem-solving — when my project's API was crashing under load, I profiled the bottleneck, added caching with Redis, and reduced response time by 60%. I also adapt quickly to new technologies — I learned React in 2 weeks for my internship.\""
        ]
      },
      {
        heading: "4. What are your weaknesses",
        body: [
          "Pick a real weakness but show how you're fixing it. Don't say \"I'm a perfectionist\" — it's a cliché that interviewers roll their eyes at.",
          "Sample: \"I used to struggle with public speaking — I would get nervous presenting in front of large groups. To fix this, I joined Toastmasters in my 3rd year and have given 15+ speeches. I'm now comfortable presenting to my class of 60.\""
        ]
      },
      {
        heading: "5. Why should we hire you",
        body: [
          "Connect your skills + projects to what the company needs. Be specific about what you bring that others might not.",
          "Sample: \"My experience with React and Node.js matches your frontend role requirements. My fintech project shows I understand the domain you work in. And I've already practiced 50+ LeetCode problems on the patterns your company asks — I'm ready to contribute from day one.\""
        ]
      },
      {
        heading: "6. Where do you see yourself in 5 years",
        body: [
          "Show growth aligned with the company. Don't say \"I want to start my own startup\" — it signals you'll leave.",
          "Sample: \"In 5 years, I see myself as a senior backend engineer, leading a small team. I want to deepen my expertise in distributed systems and contribute to open-source projects. I see this role as the foundation for that growth.\""
        ]
      },
      {
        heading: "7. What are your salary expectations",
        body: [
          "For campus placements, this is usually a formality — companies have fixed fresher packages. If asked, say: \"I'm aware of the standard fresher package for this role. I'm more focused on the learning opportunity and growth potential.\"",
          "For off-campus roles, research the market range: \"Based on my research, the market range for this role in [city] is ₹X-Y LPA. I'm open to discussion based on the overall role and benefits.\""
        ]
      },
      {
        heading: "8. Are you willing to relocate",
        body: [
          "For service companies like TCS, Infosys, Wipro — always say yes. They frequently post employees to different locations.",
          "Sample: \"Yes, I'm open to relocation. I see it as an opportunity to experience a new city and work with different teams.\""
        ]
      },
      {
        heading: "9. Why do you want to leave your current job (for experienced candidates)",
        body: [
          "Never badmouth your current employer. Focus on what you're moving toward, not what you're escaping.",
          "Sample: \"I've learned a lot at my current role, but I'm looking for a bigger challenge in [specific area]. This role at your company offers the scale and tech stack I want to grow into.\""
        ]
      },
      {
        heading: "10. Do you have any questions for us",
        body: [
          "Always have 2-3 questions ready. This shows interest and engagement.",
          "Good questions: \"What does a typical day look like in this role?\" / \"What technologies does the team use?\" / \"How does the company support freshers' learning and growth?\"",
          "Bad questions: \"What's the salary?\" (too early) / \"How many leaves do I get?\" (signals laziness) / \"No, I don't have any questions\" (signals disinterest)."
        ]
      },
      {
        heading: "More HR questions to prepare",
        body: [
          "11. Describe a challenging situation and how you handled it (use STAR format)",
          "12. What motivates you?",
          "13. How do you handle pressure and deadlines?",
          "14. What would you do if you disagreed with your manager?",
          "15. How do you prioritize tasks when everything is urgent?",
          "16. What achievement are you most proud of?",
          "17. How do you handle working in a team?",
          "18. What would you do in your first 30 days at this job?",
          "19. Are you comfortable with night shifts? (common in service companies)",
          "20. Do you have any backlogs? (be honest — they'll verify)",
          "21-25: Company-specific questions — research the company's values, recent projects, and leadership before the interview."
        ]
      },
      {
        heading: "HR interview dos and don'ts",
        body: [
          "Do: dress neatly, maintain eye contact, smile, listen fully before answering, keep answers to 60-90 seconds, be honest.",
          "Don't: memorize answers word-for-word, lie about skills or experience, badmouth anyone, argue with the interviewer, check your phone."
        ]
      },
      {
        heading: "Practice HR rounds with AI mock interview",
        body: [
          "The best way to prepare for HR questions is to practice speaking them aloud. Apply's AI mock interview at /mock-interview can conduct an HR-only interview with voice questions and scored feedback.",
          "Select interview type as 'HR', pick your target company, and practice 5-6 questions per session. The AI evaluates your answers and gives tips for improvement."
        ]
      }
    ]
  },
  {
    slug: "system-design-interview-questions-freshers",
    title: "System Design Interview Questions for Freshers: Concepts, Patterns & Practice",
    description:
      "System design interview guide for freshers and junior developers — core concepts, common questions, scaling patterns, and how to approach your first system design round.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "13 min",
    category: "System Design",
    targetKeyword: "system design interview questions for freshers",
    keywords: [
      "system design interview questions for freshers",
      "system design basics",
      "system design interview preparation",
      "scalability interview questions",
      "design URL shortener interview",
      "design Twitter interview question",
      "system design for campus placements",
      "distributed systems interview questions",
      "system design patterns",
      "how to prepare system design for freshers"
    ],
    excerpt:
      "System design used to be a mid-level-only topic. Now Amazon, Microsoft, and Goldman Sachs ask it for SDE-1 roles. Here's a beginner-friendly guide to cracking your first system design round.",
    sections: [
      {
        heading: "Why freshers need system design now",
        body: [
          "Historically, system design was asked only for SDE-2 and senior roles. But in 2026, companies like Amazon, Microsoft, Goldman Sachs, and JP Morgan include system design in SDE-1 interviews — especially for product companies.",
          "As a fresher, you're not expected to design a production-grade distributed system. You're expected to show structured thinking, understand trade-offs, and know basic scaling concepts."
        ]
      },
      {
        heading: "Core concepts to learn first",
        body: [
          "Client-server model: browser/app sends HTTP requests to a server, server responds. Understand GET, POST, PUT, DELETE and status codes (200, 301, 404, 500).",
          "Databases: SQL (PostgreSQL, MySQL) vs NoSQL (MongoDB, DynamoDB). SQL for relational data with ACID guarantees. NoSQL for flexible schemas and horizontal scaling.",
          "Caching: Redis stores frequently accessed data in memory. Reduces database load and speeds up response times. Know when to cache and when to invalidate.",
          "Load balancing: distributes traffic across multiple servers. Prevents any single server from being overwhelmed. Know round-robin, least-connections, and IP-hash.",
          "CDN (Content Delivery Network): serves static assets (images, CSS, JS) from edge locations close to the user. Cloudflare, CloudFront.",
          "Message queues: Kafka, RabbitMQ, SQS. Decouple services by async communication. Used for email sending, notifications, data pipelines."
        ]
      },
      {
        heading: "How to approach a system design question (45-minute framework)",
        body: [
          "Step 1 (5 min): Clarify requirements. Ask: What's the scale (users, QPS)? What features are needed? Read-heavy or write-heavy? Consistency vs availability trade-off acceptable?",
          "Step 2 (5 min): Estimate capacity. Calculate: requests per second, storage per year, bandwidth. Show your math — interviewers want to see rough numbers, not precision.",
          "Step 3 (10 min): High-level design. Draw boxes: client → load balancer → web servers → database + cache. Explain the request flow from user action to response.",
          "Step 4 (15 min): Deep dive. Pick the hardest component and design it in detail. Database schema, API design, caching strategy, failure handling.",
          "Step 5 (5 min): Bottlenecks and trade-offs. Single points of failure, scaling strategy, what happens if a service goes down. Discuss ACID vs BASE, consistency models.",
          "Step 6 (5 min): Wrap up. Summarize the design, mention what you'd improve with more time."
        ]
      },
      {
        heading: "Top 10 system design questions for freshers",
        body: [
          "1. Design a URL shortener (Bitly) — mapping short codes to long URLs, handling redirects, analytics.",
          "2. Design a pastebin — text storage with expiration, unique URL generation.",
          "3. Design a simple chat application — real-time messaging, message ordering, delivery status.",
          "4. Design a rate limiter — token bucket algorithm, sliding window, distributed rate limiting.",
          "5. Design a parking lot system — OOP design with classes, slot allocation, pricing.",
          "6. Design a library management system — book catalog, borrowing, reservations, fines.",
          "7. Design a Twitter feed — posting tweets, timeline generation, fan-out vs fan-in.",
          "8. Design an elevator system — request scheduling, direction optimization, multiple elevators.",
          "9. Design a file storage service (like Google Drive) — chunked upload, sync, sharing.",
          "10. Design a notification system — multi-channel (push, email, SMS), templating, batching."
        ]
      },
      {
        heading: "URL shortener — worked example",
        body: [
          "Requirements: Shorten long URLs to 7-character codes. Redirect short URLs to original. 100M URLs shortened per month. 10x reads vs writes.",
          "Capacity: 100M writes/month = ~40 writes/second. 400 reads/second. Storage: 100M × 500 bytes = 50GB/month = 600GB/year.",
          "Design: Client → Load balancer → API server → Database (URL mapping) + Cache (Redis for hot URLs). Use base62 encoding for short codes. Use auto-increment ID + base62 for uniqueness.",
          "Trade-offs: Hash collision — use counter-based IDs to avoid. Cache invalidation — TTL-based. Analytics — async write to a separate analytics DB via Kafka."
        ]
      },
      {
        heading: "What companies ask system design for SDE-1",
        body: [
          "Amazon: Yes — 1 round for SDE-1, focuses on scalability and trade-offs. Check Amazon OA questions on Apply.",
          "Microsoft: Sometimes — for cloud roles. Focuses on architecture patterns.",
          "Goldman Sachs: Yes — for technology analyst roles. Focuses on data consistency and reliability.",
          "TCS / Infosys / Wipro: Rarely for freshers — mostly for experienced hires. Focus on core CS instead.",
          "Swiggy / Zomato / PhonePe: Yes — product companies always ask system design. Check their interview guides on Apply /prepare."
        ]
      },
      {
        heading: "How to practice system design as a fresher",
        body: [
          "Read: 'Designing Data-Intensive Applications' by Martin Kleppmann (chapters 1-6 are enough for freshers).",
          "Watch: Gaurav Sen's system design playlist on YouTube — 20 videos covering all core concepts.",
          "Practice: Draw system diagrams on paper or Excalidraw. Explain them aloud — interview is verbal, not written.",
          "Mock: Use Apply's AI mock interview at /mock-interview with interview type set to 'technical' for practice explaining designs verbally."
        ]
      },
      {
        heading: "Common freshers mistakes in system design",
        body: [
          "Don't jump to solutions — clarify requirements first. 70% of candidates fail because they design the wrong system.",
          "Don't over-engineer — a fresper doesn't need microservices, Kubernetes, and event sourcing for a URL shortener. Start simple, then scale.",
          "Don't stay silent — think out loud. The interviewer wants to see your thought process, not a perfect answer.",
          "Don't ignore trade-offs — every design choice has pros and cons. SQL vs NoSQL, consistency vs availability, latency vs cost. Always discuss."
        ]
      }
    ]
  },
  {
    slug: "off-campus-placement-preparation-guide",
    title: "Off-Campus Placement Guide: Job Without Campus",
    description:
      "Off-campus placement prep for Indian students — job boards, referrals, resume tips, and interview practice without campus hiring support.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-21",
    readingTime: "10 min",
    category: "Placement Strategy",
    targetKeyword: "off-campus placement preparation",
    keywords: [
      "off-campus placement preparation",
      "how to get job without campus placement",
      "off-campus job search India",
      "referral for job application",
      "off-campus placement strategy",
      "how to apply for jobs off campus",
      "off-campus vs on-campus placement",
      "job search for engineering freshers",
      "Naukri LinkedIn job search tips",
      "off-campus placement tips India"
    ],
    excerpt:
      "Not every college has TCS and Amazon visiting campus. Here's how to crack off-campus placements — where to apply, how to get referrals, and how to stand out without campus placement support.",
    workflowLinks: [
      { label: "Tailor resume for each JD", href: "/dashboard/generate" },
      { label: "Browse company PYQs", href: "/pyqs" },
      { label: "Practice mock interviews", href: "/mock-interview" },
      { label: "Track applications", href: "/dashboard/applications" }
    ],
    sections: [
      {
        heading: "Off-campus vs on-campus placement",
        body: [
          "On-campus: Companies visit your college, shortlist based on CGPA + test, and the pool of competition is limited to your college batch.",
          "Off-campus: You apply directly via company portals, job boards, or referrals. The competition is national — you're competing with lakhs of applicants.",
          "Off-campus is harder in volume but easier in control — you choose which companies to apply to, when to apply, and you can apply to 50+ companies simultaneously."
        ]
      },
      {
        heading: "Where to find off-campus jobs",
        body: [
          "LinkedIn: Search 'SDE fresher' or 'software engineer intern' with location set to India. Filter by 'past month' to see fresh postings. Follow company pages for alerts.",
          "Naukri.com: India's largest job board. Create a profile, upload resume, and apply to 20+ jobs daily. Many service companies post fresher openings here.",
          "Instahyre: Curated startup and product company jobs. Better quality listings than Naukri for tech roles.",
          "Wellfound (AngelList): Startup jobs, often remote. Good for early-stage companies hiring freshers.",
          "Company career pages: Check careers pages of target companies weekly — TCS, Infosys, Amazon, Microsoft all post off-campus openings.",
          "Apply's job search at /dashboard/jobs aggregates listings and provides deep links to LinkedIn, Naukri, and other boards."
        ]
      },
      {
        heading: "How to get referrals",
        body: [
          "Referrals are the single most effective way to get off-campus interview calls. A referral puts your resume on top of the pile — many companies prioritize referred candidates.",
          "Find employees: Search LinkedIn for '[company] software engineer India'. Filter by 1st or 2nd degree connections.",
          "Reach out: Send a short, polite message. \"Hi [name], I'm a final-year CS student at [college] with experience in [skills]. I saw an SDE-1 opening at [company] and would love a referral. Here's my resume: [link]. Would you be open to referring me?\"",
          "Don't spam: Personalize each message. Mention something specific about their work or the company. One good referral beats 50 cold messages.",
          "Alumni network: Search your college's LinkedIn alumni page for people at target companies. Alumni are more likely to refer you."
        ]
      },
      {
        heading: "Resume tips for off-campus applications",
        body: [
          "Off-campus resumes are screened differently — ATS systems filter by keywords, and HR reviews take 6 seconds. Your resume must pass both.",
          "Tailor your resume for each company: use Apply's resume tailoring tool at /dashboard/generate. Paste the JD, and AI matches keywords from the job description.",
          "Include a summary line: \"Final-year CS student with 2 projects in React and Node.js, seeking SDE-1 role.\" This helps HR understand your profile in 2 seconds.",
          "Add GitHub and LinkedIn links. Off-campus recruiters always check your GitHub — make sure it has at least 2 pinned projects with good READMEs."
        ]
      },
      {
        heading: "Off-campus interview preparation",
        body: [
          "The interview process is the same as on-campus — OA + technical + HR. But off-campus interviews may be scheduled with less notice, so stay prepared.",
          "Practice coding: Solve 50+ company-specific PYQs from Apply's /pyqs library. Know what each company asks.",
          "Practice interviews: Use Apply's AI mock interview at /mock-interview. Practice 5+ sessions before your first real off-campus interview.",
          "Prepare for behavioral: Off-campus interviews often have more behavioral questions than campus ones. Prepare STAR stories."
        ]
      },
      {
        heading: "Timeline: when to start applying off-campus",
        body: [
          "Start applying in your 7th semester (4th year, 1st half). Most companies hire off-campus between August and February for the following year's batch.",
          "Don't wait for on-campus results — apply off-campus in parallel. Many students get off-campus offers before their on-campus season even starts.",
          "Apply to 30-50 companies in parallel. Track each application using Apply's placement tracker at /dashboard/applications."
        ]
      },
      {
        heading: "Common off-campus mistakes",
        body: [
          "Applying to only 5-10 companies — off-campus is a numbers game. Apply to 30+ companies to get 3-5 interview calls.",
          "Using the same resume for every company — tailor it. Use Apply's resume tailoring tool.",
          "Not following up — after applying, message the recruiter or referrer after 1 week. A polite follow-up can bump your application.",
          "Ignoring startups — product companies are harder to crack off-campus. Startups are more accessible and often offer better learning for freshers."
        ]
      },
      {
        heading: "Tools to accelerate your off-campus search",
        body: [
          "Apply provides everything you need: resume tailoring (/dashboard/generate), job search with deep links (/dashboard/jobs), application tracker (/dashboard/applications), company PYQs (/pyqs), and mock interviews (/mock-interview).",
          "Start free — the first 5 resume generations are free. No credit card needed."
        ]
      }
    ]
  },
  {
    slug: "group-discussion-tips-campus-placements",
    title: "Group Discussion Tips for Campus Placements: 15 Topics, Format & How to Stand Out",
    description:
      "Complete guide to group discussions in campus placements — GD format, common topics, tips to initiate and conclude, and how to stand out without dominating the conversation.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "9 min",
    category: "Interview Tips",
    targetKeyword: "group discussion tips for placements",
    keywords: [
      "group discussion tips for placements",
      "GD topics for campus placement",
      "how to crack group discussion",
      "group discussion round tips India",
      "GD preparation for freshers",
      "campus placement GD topics 2026",
      "group discussion do's and don'ts",
      "how to stand out in group discussion",
      "GD evaluator parameters",
      "group discussion tips for engineering students"
    ],
    excerpt:
      "Many Indian companies include a group discussion round before the interview. Here's how GDs work, 15 common topics, and strategies to stand out without being aggressive.",
    sections: [
      {
        heading: "Why companies conduct group discussions",
        body: [
          "GDs test communication, teamwork, leadership, and logical thinking — all in 15 minutes. Companies like TCS, Infosys, Accenture, Capgemini, and L&T conduct GDs as a filter round.",
          "The evaluator watches for: clarity of thought, ability to listen, willingness to let others speak, leadership (initiating or summarizing), and relevance of your points."
        ]
      },
      {
        heading: "GD format and rules",
        body: [
          "Group size: 8-12 students. Duration: 15-20 minutes. Topic given on the spot — 2-3 minutes to think, 12-15 minutes to discuss.",
          "No moderator intervention during the discussion. The evaluator observes silently and scores each participant.",
          "At the end, one person may be asked to summarize the discussion. Volunteering to summarize is a good move — it shows leadership."
        ]
      },
      {
        heading: "15 common GD topics for campus placements",
        body: [
          "1. Is AI a threat or opportunity for jobs?",
          "2. Work from home vs work from office — which is better?",
          "3. Should India switch to a 4-day work week?",
          "4. Is social media doing more harm than good?",
          "5. Cryptocurrency — should it be regulated in India?",
          "6. Are startups better than corporate jobs for freshers?",
          "7. Is the Indian education system preparing students for the real world?",
          "8. Should internships be mandatory in engineering?",
          "9. GDP vs happiness index — which matters more?",
          "10. Is technology making us less human?",
          "11. Remote work — will it outlast the pandemic?",
          "12. Should India invest more in space exploration or poverty eradication?",
          "13. Is quantitative aptitude overrated in placements?",
          "14. Data privacy — who owns your data?",
          "15. AI in education — revolution or risk?"
        ]
      },
      {
        heading: "How to stand out in a GD (without dominating)",
        body: [
          "Initiate the discussion: If you're confident, start first. \"I'd like to open the discussion by framing the topic...\" This gives you 2-3 bonus points for leadership.",
          "Bring structure: When the discussion is chaotic, say \"Let's organize our thoughts. I suggest we discuss [point 1], then [point 2], then conclude.\" This shows facilitation skills.",
          "Support others: \"I agree with [name]'s point about X, and I'd like to add...\" This shows you listen, not just wait to speak.",
          "Bring data: \"According to a 2025 NASSCOM report, AI created 3 lakh new jobs in India while displacing 1 lakh. So net positive...\" Data makes your point credible.",
          "Summarize: Near the end, say \"To summarize our discussion, we covered [point 1], [point 2], and the consensus seems to be [conclusion].\" This is the single most scoring move."
        ]
      },
      {
        heading: "GD dos and don'ts",
        body: [
          "Do: Speak 3-4 times in a 15-minute GD. Listen actively when others speak. Address people by name. Stay on topic. Be respectful even when disagreeing.",
          "Don't: Dominate the discussion (speaking for 5+ minutes total is too much). Interrupt others mid-sentence. Get emotional or aggressive. Go off-topic. Stay silent the entire time (guaranteed rejection)."
        ]
      },
      {
        heading: "What evaluators score",
        body: [
          "Communication (25%): Clarity, fluency, vocabulary, grammar. Don't use filler words like 'um' and 'like'.",
          "Content (25%): Relevance, depth, and logic of your points. Quality over quantity — 3 good points beat 10 shallow ones.",
          "Leadership (20%): Initiating, summarizing, bringing order to chaos, including quiet members.",
          "Team play (15%): Listening, supporting, building on others' points, not interrupting.",
          "Body language (15%): Eye contact with the group (not just the evaluator), open posture, nodding when others speak."
        ]
      },
      {
        heading: "How to practice GDs",
        body: [
          "Form a group of 6-10 friends and practice 2-3 GDs per week. Pick topics from the list above and time yourselves for 15 minutes.",
          "Record the GD on your phone and watch it back — you'll notice habits you didn't know you had (interrupting, fidgeting, repeating points).",
          "Read editorial pages of The Hindu and Economic Times daily — they give you structured arguments and data points you can use in any GD."
        ]
      }
    ]
  },
  {
    slug: "coding-round-preparation-placement-guide",
    title: "Coding Round Preparation for Campus Placements: Complete Guide with Topics & Timeline",
    description:
      "Complete coding round preparation guide for campus placements — which DSA topics to study, difficulty by company, practice platforms, and a 90-day plan from beginner to interview-ready.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "14 min",
    category: "DSA",
    targetKeyword: "coding round preparation for placements",
    keywords: [
      "coding round preparation for placements",
      "coding interview preparation India",
      "DSA for campus placements",
      "coding round topics for placement",
      "LeetCode for freshers",
      "HackerRank placement preparation",
      "coding practice for TCS Infosys Amazon",
      "how to prepare coding round for placements",
      "coding interview topics list",
      "placement coding preparation plan"
    ],
    excerpt:
      "Every placement — TCS to Amazon — has a coding round. Here's the complete guide: which topics to study, which platforms to use, and a 90-day plan that takes you from zero to interview-ready.",
    sections: [
      {
        heading: "Coding round difficulty by company type",
        body: [
          "Service companies (TCS, Infosys, Wipro, Cognizant, Accenture): Easy to medium. 1-2 problems, 30-45 min. Topics: arrays, strings, basic sorting, simple math. LeetCode easy is sufficient.",
          "Product companies (Amazon, Microsoft, Google, Meta): Medium to hard. 2-3 problems, 60-90 min. Topics: trees, graphs, DP, system design. LeetCode medium + some hard.",
          "Fintech (Goldman Sachs, JP Morgan, Morgan Stanley): Medium. 2 problems, 60 min. Focus on DP, arrays, and correctness. Less emphasis on optimization.",
          "Startups (Swiggy, Zomato, PhonePe, Razorpay): Medium. 2 problems, 60 min. Often domain-related (e.g., delivery routing for Swiggy)."
        ]
      },
      {
        heading: "Complete topic list for coding rounds",
        body: [
          "Arrays: reverse, rotate, prefix sum, Kadane's algorithm, Dutch national flag, two pointers.",
          "Strings: palindrome, anagram, pattern matching (KMP), character frequency, string compression.",
          "Hash maps: frequency counting, two-sum, group anagrams, first non-repeating character.",
          "Linked lists: reverse, cycle detection (Floyd's), merge sorted lists, find middle, remove Nth from end.",
          "Stacks: valid parentheses, next greater element, largest rectangle, monotonic stack, evaluate expression.",
          "Queues: level order traversal, sliding window maximum, implement stack using queues.",
          "Trees: traversals (inorder, preorder, postorder, level order), BST operations, LCA, diameter, mirror.",
          "Graphs: BFS, DFS, Dijkstra, topological sort, connected components, cycle detection.",
          "DP: 1D (fibonacci, climbing stairs, house robber), 2D (LCS, edit distance, 0/1 knapsack), on arrays, on strings, bitmask.",
          "Greedy: activity selection, fractional knapsack, Huffman coding basics.",
          "Bit manipulation: XOR tricks, count set bits, single number, subset generation.",
          "Math: GCD/LCM, prime sieve, modular arithmetic, factorial."
        ]
      },
      {
        heading: "Practice platforms — which to use and when",
        body: [
          "LeetCode: Best overall. Use company tags to filter problems by target company. Start with Blind 75, then move to company-specific lists.",
          "HackerRank: Good for beginners. The 'Problem Solving' certification is recognized by some companies. Used by TCS and Infosys for their OA platforms.",
          "GeeksforGeeks: Best for Indian company preparation. Company-specific articles like 'TCS coding questions' and 'Infosys SP questions' are curated.",
          "NeetCode: Video explanations for Blind 75 patterns. Use when you're stuck and need to understand the approach.",
          "Codeforces: Only if you're targeting competitive companies like Google, Meta, or quant firms. Overkill for TCS/Infosys.",
          "Apply PYQs: Company-wise previous year coding questions at /pyqs — 64+ companies with real OA problems."
        ]
      },
      {
        heading: "90-day coding preparation plan",
        body: [
          "Days 1-30 (Beginner): Master one language (C++ or Java or Python). Learn basic data structures: arrays, strings, hash maps, linked lists, stacks, queues. Solve 40 easy problems on LeetCode.",
          "Days 31-60 (Intermediate): Trees, graphs, DP basics. Solve 40 medium problems. Focus on patterns: two pointers, sliding window, BFS/DFS, 1D DP. Start company-specific PYQ practice from Apply /pyqs.",
          "Days 61-75 (Advanced): 2D DP, graph algorithms (Dijkstra, topological sort), greedy. Solve 20 medium-hard problems. Take timed contests on LeetCode.",
          "Days 76-90 (Interview-ready): Mock coding interviews. Use Apply's mock interview at /mock-interview with coding enabled. Solve 10 problems under 30-minute timed conditions. Review all mistakes from the past 90 days."
        ]
      },
      {
        heading: "How to solve a coding problem in an interview",
        body: [
          "Step 1 (2 min): Read the problem carefully. Ask clarifying questions: input constraints, edge cases, output format.",
          "Step 2 (3 min): Think of a brute force approach. Say it aloud. \"The naive approach would be O(n²) by checking all pairs...\"",
          "Step 3 (3 min): Optimize. Look for patterns: hash map for O(1) lookup, two pointers for sorted arrays, sliding window for subarray problems.",
          "Step 4 (10 min): Write code. Use meaningful variable names. Handle edge cases (empty input, single element, negative numbers).",
          "Step 5 (5 min): Trace through with a test case. Check for off-by-one errors, null pointers, array bounds.",
          "Step 6 (2 min): Discuss time and space complexity. \"This solution is O(n) time and O(n) space because of the hash map.\""
        ]
      },
      {
        heading: "Common coding round mistakes",
        body: [
          "Don't start coding before understanding the problem — 70% of failures are from misunderstanding the question.",
          "Don't stay silent — think aloud. Even if you can't solve it, showing your thought process gets partial credit.",
          "Don't forget edge cases — empty array, single element, negative numbers, very large input. Interviewers test these.",
          "Don't optimize prematurely — get a working solution first, then optimize. A correct O(n²) is better than a broken O(n).",
          "Don't panic if stuck — ask for a hint. Interviewers prefer candidates who communicate over those who sit silently for 20 minutes."
        ]
      },
      {
        heading: "Company-specific coding preparation",
        body: [
          "TCS: Practice from TCS PYQs on Apply. Focus on arrays, strings, basic math. Check /prepare/tcs-nqt-preparation.",
          "Infosys: SP role needs harder coding — DP, trees, graphs. Check Infosys PYQs on Apply.",
          "Amazon: Medium/hard LeetCode problems. Focus on trees, graphs, DP. Check Amazon OA questions on Apply /prepare.",
          "Microsoft: C++/Java focus, OOP + DSA. Check Microsoft interview guide on Apply /prepare.",
          "All 64+ companies: Browse Apply's PYQs library at /pyqs for company-specific coding questions."
        ]
      },
      {
        heading: "Start your coding prep free",
        body: [
          "Apply provides everything: 64+ company PYQs at /pyqs, mock interviews with coding rounds at /mock-interview, and company prep guides at /prepare. All free to start."
        ]
      }
    ]
  },
  {
    slug: "infosys-sp-dse-preparation-guide",
    title: "Infosys SP DSE Prep Guide: Coding & Interview",
    description:
      "Infosys SP and DSE prep — exam pattern, coding topics, InfyTQ, interview tips, and salary bands. Practice PYQs and mock interviews on Apply.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-21",
    readingTime: "10 min",
    category: "Company Prep",
    targetKeyword: "Infosys SP and DSE preparation",
    keywords: [
      "Infosys SP and DSE preparation",
      "Infosys Specialist Programmer preparation",
      "Infosys Digital Specialist Engineer",
      "Infosys SP coding questions",
      "Infosys DSE interview questions",
      "Infosys InfyTQ preparation",
      "Infosys SP vs DSE difference",
      "Infosys SP salary",
      "Infosys DSE exam pattern",
      "how to crack Infosys SP DSE"
    ],
    excerpt:
      "Infosys SP (₹8 LPA) and DSE (₹6.5 LPA) are the premium roles beyond the standard Infosys Ninja (₹3.6 LPA). Here's how to prepare for both — exam pattern, coding topics, and interview tips.",
    workflowLinks: [
      { label: "Browse Infosys PYQs", href: "/pyqs" },
      { label: "Infosys resume format", href: "/prepare/infosys-resume-format" },
      { label: "Practice Infosys mock interview", href: "/mock-interview" },
      { label: "Fresher salary bands 2026", href: "/blog/fresher-salary-india-it-companies-2026" }
    ],
    sections: [
      {
        heading: "Infosys roles: Ninja vs SP vs DSE",
        body: [
          "Infosys Ninja (System Engineer): ₹3.6 LPA. Standard fresher role. Aptitude + basic coding + HR interview. Mass hiring.",
          "Infosys DSE (Digital Specialist Engineer): ₹6.5 LPA. Requires stronger coding + database skills. Separate exam via InfyTQ or Superset.",
          "Infosys SP (Specialist Programmer): ₹8-9 LPA. The most premium Infosys fresher role. Requires advanced coding (DP, graphs, advanced DSA) + system design basics.",
          "You can apply for all three simultaneously. SP and DSE have separate, harder exams."
        ]
      },
      {
        heading: "Infosys SP exam pattern",
        body: [
          "Round 1 — Online test: 3 coding problems (medium/hard), 180 minutes. Topics: DP, graphs, trees, advanced arrays. Difficulty: LeetCode medium-hard.",
          "Round 2 — Technical interview: Deep dive into your solutions + advanced DSA questions + project discussion. 45-60 minutes.",
          "Round 3 — HR interview: Behavioral, why Infosys SP, career goals. 20-30 minutes.",
          "SP is significantly harder than Ninja — expect LeetCode medium-hard problems, not easy ones."
        ]
      },
      {
        heading: "Infosys DSE exam pattern",
        body: [
          "Round 1 — InfyTQ certification exam: 20 MCQs (Java/Python + DBMS) + 2 coding problems. 120 minutes. Passing score: 65%.",
          "Round 2 — Technical interview: Java/Python deep dive + DBMS + project. 30-45 minutes.",
          "Round 3 — HR interview: Behavioral + role discussion. 15-20 minutes.",
          "DSE focuses more on language proficiency (Java/Python) and database knowledge than pure DSA."
        ]
      },
      {
        heading: "Infosys SP coding topics (must prepare)",
        body: [
          "Dynamic programming: knapsack, LIS, LCS, edit distance, matrix DP, DP on trees.",
          "Graph algorithms: BFS, DFS, Dijkstra, topological sort, minimum spanning tree, union-find.",
          "Advanced trees: segment trees, binary indexed trees, trie, AVL trees.",
          "Advanced arrays: sliding window, prefix sum optimization, monotonic stack.",
          "String algorithms: KMP, Rabin-Karp, Z-algorithm.",
          "Greedy: activity selection, job sequencing, fractional knapsack.",
          "Check Infosys SP and DSE PYQs on Apply /pyqs for exact problems asked."
        ]
      },
      {
        heading: "Infosys DSE preparation topics",
        body: [
          "Java: OOP concepts, collections framework, exceptions, multithreading basics, streams API.",
          "Python: OOP, decorators, generators, list comprehensions, standard library.",
          "DBMS: normalization, joins, indexing, transactions, ACID properties, SQL queries.",
          "Coding: 2 problems — one on strings/arrays, one on data structures. Medium difficulty.",
          "Data structures: hash maps, trees, heaps, queues — implementation and usage."
        ]
      },
      {
        heading: "How to prepare for Infosys SP in 60 days",
        body: [
          "Days 1-20: Master advanced DSA. Solve 30 medium-hard LeetCode problems on DP, graphs, and trees. Focus on patterns, not quantity.",
          "Days 21-40: Company-specific practice. Solve Infosys SP PYQs from Apply /pyqs. Practice 2 problems daily under 60-minute timed conditions.",
          "Days 41-50: System design basics. Learn about scalability, caching, databases, load balancing. Not as deep as product companies, but SP interviews ask basic design questions.",
          "Days 51-60: Mock interviews. Use Apply's AI mock interview at /mock-interview with company set to Infosys, interview type 'technical', difficulty 'hard'."
        ]
      },
      {
        heading: "Infosys SP interview experience",
        body: [
          "Technical round: Expect 2-3 coding problems on the spot — one DP, one graph, one on your project's tech stack.",
          "Be ready to explain every line of your OA solutions — the interviewer will ask you to walk through your approach.",
          "Project deep dive: Know your project architecture, tech stack, trade-offs, and what you'd do differently. If you claim React, expect React-specific questions (hooks, state management, virtual DOM).",
          "HR round: Why SP and not Ninja? Why Infosys? Be ready to discuss your long-term career plan."
        ]
      },
      {
        heading: "Infosys SP vs DSE — which to target",
        body: [
          "If you're strong at DSA (solved 100+ LeetCode problems, comfortable with DP and graphs): Target SP. The higher salary (₹8-9 LPA vs ₹6.5 LPA) is worth the extra prep.",
          "If you're strong at Java/Python and DBMS but not advanced DSA: Target DSE. The exam is more language-focused, and the salary (₹6.5 LPA) is still significantly better than Ninja (₹3.6 LPA).",
          "You can attempt both — there's no penalty. Many students clear both and choose based on the role offering."
        ]
      },
      {
        heading: "Start your Infosys prep free",
        body: [
          "Apply has Infosys PYQs at /pyqs, Infosys resume format guide at /prepare/infosys-resume-format, and AI mock interviews at /mock-interview. All free to start."
        ]
      }
    ]
  },
  {
    slug: "cover-letter-for-internship-india",
    title: "How to Write a Cover Letter for an Internship in India: Template & Examples",
    description:
      "Complete guide to writing cover letters for internships in India — structure, template, examples for TCS, Amazon, startups, and common mistakes freshers make.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "8 min",
    category: "Cover Letter",
    targetKeyword: "cover letter for internship India",
    keywords: [
      "cover letter for internship India",
      "how to write cover letter for internship",
      "cover letter template for freshers",
      "cover letter for engineering internship",
      "cover letter for TCS internship",
      "cover letter for Amazon internship India",
      "cover letter format for students",
      "internship cover letter examples",
      "cover letter for SDE intern",
      "cover letter tips for freshers India"
    ],
    excerpt:
      "A good cover letter can get you an internship interview when your resume alone can't. Here's how to write one — structure, template, and examples for Indian companies.",
    sections: [
      {
        heading: "Do Indian companies ask for cover letters",
        body: [
          "Most Indian service companies (TCS, Infosys, Wipro) do NOT require cover letters for fresher/internship roles — they rely on aptitude tests and resumes.",
          "Product companies (Amazon, Microsoft, Google) and startups DO value cover letters, especially for competitive internships where they receive 1000+ applications.",
          "If a job posting asks for a cover letter, it's mandatory — not optional. Skip it and your application is rejected automatically.",
          "Apply's cover letter generator at /dashboard/tools can generate a tailored cover letter from your resume + JD in seconds."
        ]
      },
      {
        heading: "Cover letter structure (4 paragraphs)",
        body: [
          "Paragraph 1 — Introduction (3 sentences): Who you are, what role you're applying for, and why you're excited about this specific company.",
          "Paragraph 2 — Your skills (4-5 sentences): What you bring to the table — technical skills, relevant projects, coursework. Connect to the job description.",
          "Paragraph 3 — Why this company (3 sentences): Show you've researched them. Reference a product, recent news, or company value.",
          "Paragraph 4 — Call to action (2 sentences): Thank them, express interest in an interview, and mention your availability."
        ]
      },
      {
        heading: "Cover letter template for internship",
        body: [
          "Subject: Application for [Role] Internship — [Your Name]",
          "Dear Hiring Manager,",
          "I am a [year] year [branch] Engineering student at [college], and I'm excited to apply for the [Role] Internship at [Company]. With my background in [skill 1] and [skill 2], and my project experience in [domain], I believe I can contribute meaningfully to your team.",
          "During my studies, I have developed proficiency in [technologies]. My most relevant project is [project name], where I [what you did] using [tech stack]. This project taught me [skill/lesson], which I believe aligns well with what [Company] looks for in interns.",
          "I'm particularly drawn to [Company] because [specific reason — product, value, recent news]. I appreciate your focus on [company value/mission], and I'd love the opportunity to contribute to [specific team/product].",
          "I am available for a [duration] internship starting [month], and I'm comfortable with [remote/onsite/hybrid]. I have attached my resume for your review. Thank you for considering my application — I look forward to the possibility of discussing how I can contribute to [Company].",
          "Best regards, [Your Name] [Email] [Phone] [LinkedIn]"
        ]
      },
      {
        heading: "Example: Cover letter for Amazon SDE intern",
        body: [
          "Subject: Application for SDE Intern — Rohit Jadhav",
          "Dear Amazon Hiring Team,",
          "I am a final-year Computer Engineering student at Atharva College, Mumbai, and I'm excited to apply for the SDE Intern position at Amazon. With my experience in Java, Spring Boot, and REST API development, I believe I can contribute to Amazon's backend engineering team.",
          "During my internship at Bluestock Fintech, I developed and optimized fintech features using React.js and Node.js for production web applications. I built a real-time stock screener API that handled 10,000+ daily requests — an experience that taught me about API design, error handling, and performance optimization, all of which align with Amazon's focus on scalable backend systems.",
          "I'm particularly drawn to Amazon because of its Leadership Principle 'Customer Obsession' — I saw this firsthand when using AWS at my internship, and I'd love the opportunity to build systems that serve millions of customers.",
          "I am available for a 3-month internship starting January 2027, and I'm comfortable with hybrid work in Bengaluru. Thank you for considering my application — I look forward to discussing how I can contribute to Amazon.",
          "Best regards, Rohit Jadhav, rjdhav67@gmail.com, +91-8459262203, linkedin.com/in/rohitjadhav"
        ]
      },
      {
        heading: "Common cover letter mistakes freshers make",
        body: [
          "Don't copy-paste the same letter for every company — tailor it. Mention the company by name and reference something specific.",
          "Don't repeat your resume — the cover letter should complement, not duplicate. Focus on the 'why' and 'how', not the 'what'.",
          "Don't write more than one page — 300-400 words maximum. Hiring managers read cover letters in 30 seconds.",
          "Don't use generic phrases like 'I am a hard-working individual' — show, don't tell. Use specific examples instead.",
          "Don't forget to proofread — a single typo can get your application rejected. Read it aloud or use Grammarly."
        ]
      },
      {
        heading: "Generate a cover letter with AI",
        body: [
          "Apply's cover letter generator at /dashboard/tools can create a tailored cover letter from your resume + the job description in seconds.",
          "Paste your resume content and the JD, select a tone (confident, warm, concise), and get a polished cover letter you can edit and download.",
          "The AI uses your actual project experience and skills — it won't invent fake content, addressing the common concern about AI-generated resumes sounding generic."
        ]
      }
    ]
  },
  {
    slug: "fresher-salary-india-it-companies-2026",
    title: "Fresher Salary India 2026: TCS Infosys Amazon",
    description:
      "Fresher salary India IT 2026 — TCS, Infosys, Wipro, Amazon, Microsoft, startups. CTC vs in-hand and negotiation tips for campus hires.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-21",
    readingTime: "8 min",
    category: "Career",
    targetKeyword: "fresher salary India IT companies",
    keywords: [
      "fresher salary India IT companies",
      "TCS fresher salary 2026",
      "Infosys fresher salary",
      "Amazon SDE fresher salary India",
      "Microsoft fresher salary India",
      "Goldman Sachs fresher salary India",
      "fresher salary in India 2026",
      "software engineer fresher salary India",
      "service company vs product company salary",
      "startup fresher salary India"
    ],
    excerpt:
      "How much do Indian IT companies pay freshers in 2026? Here's the complete salary breakdown — service companies, product companies, fintech, and startups — with benefits and negotiation tips.",
    workflowLinks: [
      { label: "Practice mock interviews", href: "/mock-interview" },
      { label: "Browse company PYQs", href: "/pyqs" },
      {
        label: "Fresher resume format guide",
        href: "/blog/fresher-resume-format-it-companies"
      },
      {
        label: "Infosys SP/DSE prep",
        href: "/blog/infosys-sp-dse-preparation-guide"
      }
    ],
    sections: [
      {
        heading: "Service company fresher salaries (2026)",
        body: [
          "TCS Ninja: ₹3.36 LPA (₹3,36,000/year). CTC includes variable pay. In-hand: ~₹24,000/month. TCS Digital: ₹7 LPA. TCS Prime: ₹9-12 LPA.",
          "Infosys Ninja (System Engineer): ₹3.6 LPA. In-hand: ~₹25,000/month. Infosys DSE: ₹6.5 LPA. Infosys SP: ₹8-9 LPA.",
          "Wipro Elite NLTH: ₹3.5-6.5 LPA depending on role. Standard Wipro fresher: ₹3.3 LPA. In-hand: ~₹23,000/month.",
          "Cognizant GenC: ₹4 LPA. GenC Next: ₹6.5 LPA. GenC Pro: ₹8 LPA. In-hand varies by role.",
          "Accenture ASE: ₹4.5-6.5 LPA depending on location and role. In-hand: ~₹32,000-45,000/month.",
          "Capgemini Graduate Trainee: ₹3.8-4.5 LPA. In-hand: ~₹27,000/month.",
          "HCL Tech Bee: ₹3-4 LPA. In-hand: ~₹23,000/month."
        ]
      },
      {
        heading: "Product company fresher salaries (2026)",
        body: [
          "Amazon SDE-1: ₹15-30 LPA. Base + signing bonus + RSUs (restricted stock units). In-hand: ~₹1-2 lakh/month. Internship stipend: ₹40,000-60,000/month.",
          "Microsoft SDE-1: ₹16-35 LPA. Similar structure to Amazon. Internship stipend: ₹40,000-50,000/month.",
          "Google SWE-1 (L3): ₹18-40 LPA. Highest among product companies for freshers. Internship: ₹50,000+/month.",
          "Adobe SDE-1: ₹12-25 LPA. MTS-1 role. In-hand: ~₹90,000-1.8 lakh/month.",
          "Flipkart SDE-1: ₹12-22 LPA. In-hand: ~₹85,000-1.5 lakh/month.",
          "Swiggy / Zomato SDE-1: ₹10-20 LPA. Variable based on ESOPs.",
          "PhonePe / Razorpay SDE-1: ₹12-24 LPA. ESOPs add significant long-term value.",
          "Atlassian / Salesforce: ₹15-30 LPA. Top-tier pay for top-tier talent."
        ]
      },
      {
        heading: "Fintech and consulting fresher salaries",
        body: [
          "Goldman Sachs Technology Analyst: ₹12-20 LPA. In-hand: ~₹85,000-1.4 lakh/month. Bonus can be 20-30% of base.",
          "JP Morgan Technology Analyst: ₹10-18 LPA. Similar to Goldman Sachs.",
          "Morgan Stanley Technology Analyst: ₹10-18 LPA. Strong bonus culture.",
          "Deloitte Analyst: ₹6-10 LPA. Consulting roles pay more than pure tech.",
          "BNY / Barclays / UBS: ₹8-15 LPA. International banks with India operations."
        ]
      },
      {
        heading: "Startup fresher salaries (2026)",
        body: [
          "Series A startups: ₹8-15 LPA base + ESOPs. In-hand: ~₹55,000-1 lakh/month. ESOPs can be worth ₹2-10 lakh if the company exits.",
          "Seed-stage startups: ₹6-12 LPA. More ESOPs, higher risk, faster growth.",
          "YC-backed startups: ₹8-18 LPA. Often remote-first.",
          "Wellfound / Cutshort startups: ₹6-15 LPA depending on funding stage.",
          "Startups typically offer lower base than product companies but higher learning velocity and ESOPs upside."
        ]
      },
      {
        heading: "What's included in CTC (Cost to Company)",
        body: [
          "Base salary: Fixed monthly pay. This is what you actually get in your bank account (after tax).",
          "Variable pay: Performance-linked bonus. Usually 10-20% of base. Paid annually or quarterly.",
          "Signing bonus: One-time payment at joining. Common in product companies (₹1-5 lakh).",
          "RSUs / ESOPs: Stock options. Vested over 4 years. Product companies offer RSUs (Amazon, Microsoft), startups offer ESOPs.",
          "Benefits: Health insurance, PF, gratuity, transport, food, internet reimbursement. These are part of CTC but not in-hand.",
          "Rule of thumb: In-hand salary is approximately 70-80% of CTC (after tax + PF + deductions)."
        ]
      },
      {
        heading: "Service vs product company — which pays better",
        body: [
          "Service companies: Lower starting salary (₹3-4 LPA) but stable, mass hiring, and good for learning fundamentals. Salary growth: 10-20% per year. After 3 years: ₹5-8 LPA.",
          "Product companies: Higher starting salary (₹12-30 LPA) but harder to crack. Salary growth: 20-40% per year with promotions. After 3 years: ₹20-50 LPA.",
          "The gap widens over time. A TCS fresher at ₹3.6 LPA might reach ₹8 LPA in 5 years. An Amazon fresher at ₹18 LPA might reach ₹40-60 LPA in 5 years.",
          "But service companies offer job security and mass hiring — product companies are selective and layoff-prone."
        ]
      },
      {
        heading: "Can freshers negotiate salary",
        body: [
          "For campus placements: No. Companies have fixed fresher packages. The offer is take-it-or-leave-it.",
          "For off-campus product company roles: Sometimes. If you have competing offers, you can negotiate. \"I have an offer from [company] for ₹X LPA. I'd prefer to join [your company] — is there room to match or improve?\"",
          "For startup roles: Often. Startups have more flexibility. You can negotiate base, ESOPs, joining bonus, or remote work.",
          "Never negotiate without a competing offer. And never negotiate on the first call — wait until you have the written offer."
        ]
      },
      {
        heading: "Tax on fresher salary in India",
        body: [
          "Income up to ₹3 lakh: No tax (old regime) / up to ₹7 lakh (new regime with rebate).",
          "Income ₹3-7 lakh: 5% tax (new regime). Most service company freshers fall here.",
          "Income ₹7-12 lakh: 15-20% tax. DSE/SP roles and startup freshers.",
          "Income ₹12+ lakh: 30% tax (new regime slab). Product company freshers.",
          "Standard deduction: ₹50,000. Use this to reduce taxable income."
        ]
      }
    ]
  },
  {
    slug: "resume-with-no-experience-student",
    title: "Resume for Student with No Experience (Free)",
    description:
      "Resume for student with no experience — projects, skills, coursework, and a free ATS template for Indian campus placements. Build on Apply.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-23",
    readingTime: "8 min",
    category: "Fresher Resumes",
    targetKeyword: "resume for student with no experience",
    keywords: [
      "resume for student with no experience",
      "resume with no experience student",
      "how to write resume with no work experience",
      "resume for college student no experience",
      "fresher resume with no internship",
      "resume for first year engineering student",
      "resume without experience India",
      "student resume template no experience",
      "what to put on resume with no experience",
      "resume for 2nd year engineering student",
      "how to make resume with only projects"
    ],
    excerpt:
      "No internship? No job? No problem. Here's exactly what to put on a resume when you have no work experience — projects, skills, coursework, and how to frame it all professionally.",
    workflowLinks: [
      { label: "Build resume free", href: "/dashboard/generate" },
      { label: "Engineering student resume", href: "/blog/engineering-student-resume-template" },
      { label: "Free resume maker guide", href: "/blog/free-resume-maker-for-students-india" },
      { label: "Interview preparation for freshers", href: "/blog/interview-preparation-for-freshers" },
      { label: "Practice mock interviews", href: "/mock-interview" }
    ],
    sections: [
      {
        heading: "The truth about 'no experience' resumes",
        body: [
          "Most freshers think they have 'no experience' because they haven't done a formal internship. But projects, coursework, certifications, and even college assignments count as experience if you frame them right.",
          "Companies hiring freshers don't expect 2 years of work experience. They expect: (1) basic coding skills, (2) 1-2 projects you can explain, (3) willingness to learn. That's it.",
          "Your projects ARE your experience. A weather app built with React and an API is more relevant than 6 months of data entry at a relative's company."
        ]
      },
      {
        heading: "Resume structure for no-experience students",
        body: [
          "Header: Name, email, phone, LinkedIn, GitHub (create a GitHub if you don't have one — it's free).",
          "Education: Degree, college, university, CGPA, expected graduation year. Include relevant coursework (Data Structures, DBMS, OOP).",
          "Projects (most important section): 2-3 projects with name, description, tech stack, and what you learned. This replaces the 'experience' section.",
          "Skills: Programming languages, frameworks, tools, databases. Be honest — don't list skills you can't answer questions about.",
          "Achievements: Hackathon participation, coding contest ranks, certifications, extracurricular leadership.",
          "Optional: Objective/summary (1 line: \"Final-year CS student seeking SDE-1 role, with projects in React and Node.js.\")"
        ]
      },
      {
        heading: "How to write projects that get you hired",
        body: [
          "Project name: Use a descriptive name, not 'Project 1'. 'Fintech Stock Dashboard' is better than 'Web Project'.",
          "Tech stack: List every technology used. 'React, Node.js, Express, MongoDB, Chart.js, Vercel'.",
          "Description: 2-3 lines explaining what the project does. 'A real-time stock screener that displays NSE stock prices with interactive charts and price alerts.'",
          "Your role: What YOU did, not what the team did. 'Designed REST API for stock data, implemented JWT authentication, deployed on Vercel with CI/CD.'",
          "Impact/metrics: Even personal projects have metrics. 'Handled 10,000+ API requests/day during testing. Reduced page load time by 40% using lazy loading.'",
          "GitHub link: Add a link to the repo. Make sure the README is good — interviewers DO read it."
        ]
      },
      {
        heading: "Template: No-experience resume",
        body: [
          "ROHIT JADHAV | rjdhav67@gmail.com | +91-XXXXX | linkedin.com/in/rohit | github.com/rohit",
          "EDUCATION: B.E. Information Technology, Atharva College (Mumbai University) | CGPA: 8.2 | Expected: June 2026 | Coursework: Data Structures, DBMS, OOP, OS, Computer Networks",
          "PROJECTS:",
          "1. Fintech Stock Dashboard | React, Node.js, MongoDB, Chart.js | github.com/rohit/stock-dashboard",
          "   - Real-time NSE stock screener with interactive charts and price alerts",
          "   - Designed REST API, implemented JWT auth, deployed on Vercel | Handled 10,000+ API calls/day",
          "2. College Event Management System | Java, Spring Boot, PostgreSQL | github.com/rohit/event-mgmt",
          "   - Full-stack event registration platform for 500+ students",
          "   - Built role-based access (admin, student, organizer) with Spring Security",
          "SKILLS: Java, Python, JavaScript, React, Node.js, Express, MongoDB, PostgreSQL, Git, REST APIs, Postman",
          "ACHIEVEMENTS: Smart India Hackathon 2025 finalist | LeetCode 150+ problems solved | NPTEL DBMS certification (Elite)",
          "Use Apply's resume builder at /dashboard/build to create this structure automatically — just fill in your details."
        ]
      },
      {
        heading: "What if you have no projects either",
        body: [
          "Build one this weekend. A weather app (React + OpenWeather API), a todo list (Next.js + localStorage), or a portfolio site (HTML/CSS/JS). Any working project beats no project.",
          "Contribute to open source: Find a 'good first issue' on GitHub. Even a documentation fix counts and shows initiative.",
          "Complete a certification: NPTEL (free, IIT-certified), HackerRank Problem Solving (free), AWS Cloud Practitioner (₹1,500, recognized globally).",
          "Participate in a hackathon: Smart India Hackathon, college hackathons, or online hackathons on Devpost. Participation alone is a resume line."
        ]
      },
      {
        heading: "Skills section — what to list and what not to",
        body: [
          "List: Languages you can write code in (Java, Python, C++), frameworks you've used in projects (React, Node.js, Spring Boot), tools you use daily (Git, VS Code, Postman).",
          "Don't list: 'MS Word, MS Excel, PowerPoint' (everyone knows these), 'Hardworking, team player' (these are soft skills, not technical skills), skills you only watched a YouTube video about.",
          "Order: Put your strongest, most relevant skills first. If applying for a backend role, list Java/Python/Spring Boot before React/HTML.",
          "Be ready to answer questions about anything you list. If you list 'Docker', expect 'What's the difference between a Docker image and a container?'"
        ]
      },
      {
        heading: "Common no-experience resume mistakes",
        body: [
          "Don't use a 2-page resume — one page is the standard for freshers. Cut unnecessary sections if it overflows.",
          "Don't use fancy templates with columns and colors — ATS systems can't parse them. Use a simple single-column layout.",
          "Don't include personal details like age, gender, religion, marital status, or photo — Indian companies don't require these and they can trigger bias.",
          "Don't list every course you've ever taken — only relevant coursework (DSA, DBMS, OOP, OS, CN).",
          "Don't use the same resume for every company — tailor it. Use Apply's resume tailoring tool at /dashboard/generate to match keywords from the JD."
        ]
      },
      {
        heading: "Build your first resume free",
        body: [
          "Apply's resume builder at /dashboard/build lets you create a professional resume by answering guided questions — no experience needed. Just fill in your education, projects, and skills.",
          "The AI helps you write better bullet points, suggests keywords from the job description, and exports a clean ATS-friendly PDF. Free for the first 5 resumes."
        ]
      }
    ]
  },
  {
    slug: "wipro-elite-nth-preparation-guide",
    title: "Wipro Elite NTH Preparation Guide: Exam Pattern, Syllabus & Tips (2026)",
    description:
      "Complete Wipro Elite NLTH preparation guide — exam pattern, syllabus, aptitude topics, coding questions, interview rounds, and how to crack Wipro's national talent hunt.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "9 min",
    category: "Company Prep",
    targetKeyword: "Wipro Elite NLTH preparation",
    keywords: [
      "Wipro Elite NLTH preparation",
      "Wipro Elite NTH exam pattern",
      "Wipro Elite syllabus",
      "Wipro NLTH coding questions",
      "Wipro aptitude questions",
      "Wipro Elite interview questions",
      "how to crack Wipro Elite NLTH",
      "Wipro National Talent Hunt preparation",
      "Wipro Elite cut off",
      "Wipro fresher hiring process"
    ],
    excerpt:
      "Wipro Elite NLTH is Wipro's national talent hunt for freshers — offering ₹3.5-6.5 LPA roles. Here's the complete preparation guide with exam pattern, syllabus, and interview tips.",
    sections: [
      {
        heading: "What is Wipro Elite NLTH",
        body: [
          "Wipro Elite National Talent Hunt (NLTH) is Wipro's off-campus fresher hiring program. It targets 2026 batch engineering graduates across India.",
          "Two roles are offered through NLTH: Elite role (₹3.5 LPA, standard SDE) and Turbo role (₹6.5 LPA, advanced SDE with harder coding requirements).",
          "The exam is conducted online via Superset or Wipro's own assessment platform. Results are typically declared within 2-3 weeks."
        ]
      },
      {
        heading: "Wipro Elite exam pattern",
        body: [
          "Section 1 — Aptitude (60 min): 20 quantitative + 20 logical + 20 verbal. Total 60 questions in 60 minutes. Negative marking: no.",
          "Section 2 — Coding (60 min): 2 coding problems. One easy/medium, one medium. Topics: arrays, strings, basic data structures. Languages: C, C++, Java, Python.",
          "Section 3 — Essay writing (25 min): One essay on a given topic. 200-400 words. Tests communication and thought structure.",
          "Total: 145 minutes. Cut-off: ~60% in aptitude + at least 1 coding problem solved correctly."
        ]
      },
      {
        heading: "Wipro Elite aptitude syllabus",
        body: [
          "Quantitative: Time-speed-distance, percentages, profit/loss, ratio, averages, number system, probability, permutations, simple interest, mensuration.",
          "Logical reasoning: Syllogisms, blood relations, direction sense, coding-decoding, number series, seating arrangement, data sufficiency.",
          "Verbal: Reading comprehension (1 passage, 5 questions), sentence correction, synonyms/antonyms, fill in the blanks, para jumbles, spelling.",
          "Practice 50+ questions per topic on IndiaBix. Wipro aptitude is moderate — easier than Infosys, similar to TCS NQT."
        ]
      },
      {
        heading: "Wipro Elite coding topics",
        body: [
          "Arrays: rotation, reversal, prefix sum, searching, sorting",
          "Strings: palindrome, anagram, character frequency, reversal",
          "Hash maps: frequency counting, two-sum, duplicate detection",
          "Math: GCD/LCM, prime checking, factorial, digit manipulation",
          "Basic data structures: stack, queue, linked list operations",
          "Difficulty: LeetCode easy to medium. Wipro coding is not as hard as Amazon — focus on fundamentals.",
          "Check Wipro PYQs on Apply /pyqs for exact coding problems asked in previous NLTH exams."
        ]
      },
      {
        heading: "Wipro Elite essay topics (common)",
        body: [
          "Is technology making humans lazy?",
          "Impact of social media on students",
          "Should remote work be the new normal?",
          "Is AI a threat or opportunity for jobs?",
          "Importance of teamwork in software development",
          "How to write: Structure as intro (3 sentences) → body (3-4 points with examples) → conclusion (2 sentences). Keep it neutral and balanced."
        ]
      },
      {
        heading: "Wipro Elite interview rounds",
        body: [
          "Technical round (30-45 min): Basic programming questions (C/Java/Python), OOP concepts, simple coding problem, project discussion. Focus on fundamentals — Wipro doesn't ask hard DSA.",
          "HR round (15-20 min): Tell me about yourself, why Wipro, are you willing to relocate, night shift flexibility, salary expectations (fixed for freshers).",
          "For Turbo role (₹6.5 LPA): Additional technical round with harder coding (medium LeetCode) and basic system design questions."
        ]
      },
      {
        heading: "30-day Wipro Elite preparation plan",
        body: [
          "Days 1-10: Aptitude — 30 questions/day from IndiaBix. Focus on quant (time-speed-distance, percentages) and logical (syllogisms, seating).",
          "Days 11-18: Coding — 2 problems/day from Wipro PYQs on Apply /pyqs. Topics: arrays, strings, hash maps. Solve in C/Java/Python.",
          "Days 19-22: Essay writing — practice 3 essays on common topics. Time yourself to 25 minutes. Focus on structure and grammar.",
          "Days 23-27: Full mock tests — take 5 timed mocks. Analyze mistakes. Revisit weak topics.",
          "Days 28-30: Interview prep — practice with Apply's AI mock interview at /mock-interview with company set to Wipro."
        ]
      },
      {
        heading: "Wipro Elite vs Wipro Campus Hiring",
        body: [
          "Elite NLTH: Off-campus, open to all 2026 batch students. Higher roles (Elite + Turbo). Apply via Wipro careers or Superset.",
          "Campus hiring: On-campus, limited to colleges Wipro visits. Usually standard role (₹3.3 LPA). Easier to get through if your college is on Wipro's list.",
          "If your college has Wipro campus hiring, apply through both — campus and Elite NLTH. Elite NLTH offers the Turbo role (₹6.5 LPA) which campus doesn't.",
          "Check Wipro Elite NTH preparation guide on Apply /prepare for more details."
        ]
      },
      {
        heading: "Start your Wipro prep free",
        body: [
          "Apply has Wipro PYQs at /pyqs, Wipro technical interview prep guide at /prepare/wipro-technical-interview, and AI mock interviews at /mock-interview. All free to start."
        ]
      }
    ]
  },
  {
    slug: "accenture-interview-questions-2026",
    title: "Accenture Interview Questions 2026: ASE, Coding, Aptitude & HR Guide",
    description:
      "Complete Accenture interview preparation guide for 2026 — ASE role, coding round, aptitude, communication assessment, technical interview, and HR round with practice questions.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "10 min",
    category: "Company Prep",
    targetKeyword: "Accenture interview questions 2026",
    keywords: [
      "Accenture interview questions 2026",
      "Accenture ASE interview questions",
      "Accenture coding questions",
      "Accenture aptitude questions",
      "Accenture communication assessment",
      "Accenture hiring process freshers",
      "Accenture technical interview questions",
      "Accenture HR interview questions",
      "how to crack Accenture interview",
      "Accenture interview experience India"
    ],
    excerpt:
      "Accenture hires 50,000+ freshers annually in India. Here's the complete interview guide — ASE role, coding round, aptitude, communication assessment, and technical + HR rounds.",
    sections: [
      {
        heading: "Accenture hiring process for freshers (2026)",
        body: [
          "Accenture's fresher hiring for ASE (Associate Software Engineer) has 4 rounds: Cognitive assessment, Technical assessment, Coding round, and Communication interview.",
          "Round 1 — Cognitive assessment (90 min): 50 questions covering English, critical reasoning, abstract reasoning. No negative marking.",
          "Round 2 — Technical assessment (40 min): 40 MCQs on MS Office, networking, security, cloud fundamentals, and pseudocode.",
          "Round 3 — Coding round (45 min): 2 coding problems (easy/medium). Languages: C, C++, Java, Python.",
          "Round 4 — Communication interview ( 30 min): Video-recorded or live interview testing English communication, situational judgment, and behavioral questions."
        ]
      },
      {
        heading: "Accenture cognitive assessment — detailed breakdown",
        body: [
          "English (17 questions, 17 min): Reading comprehension, sentence correction, vocabulary, fill in the blanks. Similar to TCS verbal but slightly harder.",
          "Critical reasoning (18 questions, 18 min): Syllogisms, data sufficiency, logical deduction, statement-assumption. Practice from IndiaBix logical reasoning section.",
          "Abstract reasoning (15 questions, 15 min): Pattern matching, series completion, odd-one-out, figure analogy. Non-verbal reasoning — practice with image-based questions.",
          "Cut-off: ~60% overall. No section-wise cut-off, so you can compensate a weak section with a strong one."
        ]
      },
      {
        heading: "Accenture technical assessment topics",
        body: [
          "MS Office: Excel formulas, Word shortcuts, PowerPoint features. 8-10 questions. Many freshers underestimate this — practice basic Excel.",
          "Networking: OSI model, TCP/IP, IP addressing, DNS, HTTP. 5-7 questions.",
          "Security: malware types, firewalls, encryption basics, phishing. 3-5 questions.",
          "Cloud computing: IaaS vs PaaS vs SaaS, AWS/Azure basics, virtualization. 3-5 questions.",
          "Pseudocode: 10-12 questions. Read pseudocode and predict output or identify errors. Practice with basic loops, conditionals, and arrays.",
          "This round is unique to Accenture — no other service company tests MS Office and cloud basics. Prepare accordingly."
        ]
      },
      {
        heading: "Accenture coding round — topics and difficulty",
        body: [
          "Problem 1 (easy, 20 min): Arrays or strings. Example: find the second largest element, count vowels in a string, reverse an array.",
          "Problem 2 (medium, 25 min): Hash maps or basic data structures. Example: find pairs with given sum, check balanced parentheses, validate anagram.",
          "Difficulty: LeetCode easy to easy-medium. Accenture coding is the easiest among all major companies — if you can solve 30 LeetCode easy problems, you'll clear this.",
          "Check Accenture PYQs on Apply /pyqs for exact coding problems asked in previous years.",
          "Languages: You can code in C, C++, Java, or Python. Python is recommended for speed and simplicity."
        ]
      },
      {
        heading: "Accenture communication interview",
        body: [
          "This is Accenture's unique round — it tests your spoken English, not technical skills. It may be video-recorded (AI-scored) or live with an interviewer.",
          "Format: You'll be given situational prompts. Example: \"A customer is angry about a delayed delivery. How would you handle it?\" You respond verbally.",
          "What they evaluate: Grammar, fluency, vocabulary, pronunciation, confidence, and logical reasoning in your response.",
          "Tips: Speak slowly and clearly. Use complete sentences. Structure your answer (situation → action → result). Don't use filler words (um, like, you know).",
          "Practice: Record yourself answering common behavioral questions on your phone. Listen back and improve."
        ]
      },
      {
        heading: "Accenture technical interview (for selected candidates)",
        body: [
          "If you clear all 4 rounds, you may have a technical interview (not always — sometimes the assessments are sufficient for ASE role).",
          "Topics: Basic OOP (inheritance, polymorphism, encapsulation), DBMS (normalization, joins, basic SQL), one simple coding problem, and your project.",
          "Project questions: Be ready to explain your project's architecture, tech stack, and your role. Accenture interviewers are friendly — they want to see if you can communicate technical concepts clearly.",
          "Check Accenture resume template on Apply /prepare for how to structure your resume for Accenture."
        ]
      },
      {
        heading: "Accenture ASE role — what to expect",
        body: [
          "Salary: ₹4.5-6.5 LPA depending on location and performance. In-hand: ~₹32,000-45,000/month.",
          "Role: Associate Software Engineer. You'll work on client projects — could be Java, .NET, Salesforce, SAP, or testing depending on project allocation.",
          "Training: Accenture provides 2-3 months of training at their learning centers. You'll learn the tech stack required for your allocated project.",
          "Location: Accenture has offices in Bengaluru, Hyderabad, Chennai, Pune, Mumbai, Gurugram, Noida, Kolkata, and Coimbatore. Be prepared to relocate."
        ]
      },
      {
        heading: "How to prepare for Accenture in 30 days",
        body: [
          "Days 1-10: Cognitive assessment — practice English, critical reasoning, and abstract reasoning on IndiaBix. 50 questions/day.",
          "Days 11-15: Technical assessment — study MS Office basics, networking fundamentals, cloud concepts. Take free courses on Coursera (Google IT Support) for networking and cloud basics.",
          "Days 16-22: Coding — solve 20 Accenture PYQs from Apply /pyqs. Focus on arrays, strings, hash maps. Practice in Python for speed.",
          "Days 23-27: Communication — record yourself answering 10 behavioral questions daily. Focus on clarity, grammar, and structure.",
          "Days 28-30: Full mock — use Apply's AI mock interview at /mock-interview with company set to Accenture for interview practice."
        ]
      },
      {
        heading: "Start your Accenture prep free",
        body: [
          "Apply has Accenture PYQs at /pyqs, Accenture resume template at /prepare/accenture-resume-template, and AI mock interviews at /mock-interview. All free to start."
        ]
      }
    ]
  },
  {
    slug: "job-matching-from-resume-for-students",
    title: "How to Use Your Resume to Find Better-Fit Jobs as a Student",
    description:
      "A practical workflow for turning your resume into focused job searches, checking skill fit, and deciding which student or fresher roles deserve an application.",
    publishedAt: "2026-07-19",
    updatedAt: "2026-07-19",
    readingTime: "8 min read",
    category: "Job search",
    targetKeyword: "job matching from resume for students",
    keywords: [
      "job matching from resume for students",
      "find jobs based on skills for freshers",
      "how to shortlist jobs as a student",
      "resume based job search"
    ],
    excerpt:
      "A useful job match is not a promise that you will be hired. It is a structured comparison between the evidence in your resume and the work, skills, and constraints in a job description.",
    workflowLinks: [
      { label: "Match jobs in Apply", href: "/dashboard/jobs" },
      { label: "Tailor your resume", href: "/dashboard/generate" },
      { label: "Read the off-campus guide", href: "/blog/off-campus-placement-preparation-guide" }
    ],
    sections: [
      {
        heading: "Start with a resume that describes evidence",
        body: [
          "Job matching works better when your resume names what you actually built or did. Replace broad labels such as “web development” with evidence: the framework, the feature, your contribution, and a result you can defend.",
          "For each project or internship, record the role family it supports. A React dashboard may support frontend roles; an API with authentication and database work may support backend roles. One project can support more than one path, but the evidence should be visible."
        ]
      },
      {
        heading: "Choose role families before searching",
        body: [
          "Pick two or three role families instead of searching every technology you know. Examples include frontend intern, Java backend fresher, data analyst intern, QA engineer, or technical support associate.",
          "Write a short must-have list for each family. Separate skills you can demonstrate now from skills you are learning. This keeps a missing nice-to-have from looking like a reason to reject an otherwise sensible role."
        ]
      },
      {
        heading: "Read a match as a comparison, not a verdict",
        body: [
          "Compare the job description with four parts of your profile: required skills, relevant work or projects, seniority, and practical constraints such as location or work authorization. A high text overlap does not override a seniority mismatch.",
          "Treat any automated match score as a prioritization aid. Open the original listing, verify that it is current, and read the responsibilities before applying. Job descriptions can be incomplete, duplicated, or written more broadly than the team’s actual needs."
        ]
      },
      {
        heading: "Use a simple apply, stretch, skip decision",
        body: [
          "Apply when you meet the core responsibilities and can show evidence for most must-haves. Mark a role as a stretch when the level fits but one learnable skill is missing. Skip roles that require substantially more experience, a mandatory credential you do not have, or constraints you cannot meet.",
          "Keep one sentence explaining each decision. After a few weeks, those notes reveal whether you are rejecting too many viable roles or repeatedly targeting jobs with the same evidence gap."
        ]
      },
      {
        heading: "Tailor only after the role passes the check",
        body: [
          "Do not spend time tailoring every listing you open. First decide that the role is credible and relevant. Then reorder skills, select the strongest matching projects, and rewrite only the bullets whose meaning remains truthful.",
          "Save the tailored resume with the company and role name, then track the application. If you get interviews from one role family, use that signal to focus your next search; if you get no response, review targeting, evidence, and resume clarity separately."
        ]
      }
    ]
  },
  {
    slug: "use-ai-mock-interview-feedback",
    title: "How to Use AI Mock Interview Feedback Without Memorizing Answers",
    description:
      "Learn how to review AI mock interview feedback, improve one skill at a time, and build truthful answers for fresher technical and behavioral interviews.",
    publishedAt: "2026-07-19",
    updatedAt: "2026-07-19",
    readingTime: "8 min read",
    category: "Mock interviews",
    targetKeyword: "how to use AI mock interview feedback",
    keywords: [
      "how to use AI mock interview feedback",
      "AI mock interview practice for freshers",
      "improve interview answers with feedback",
      "mock interview practice plan"
    ],
    excerpt:
      "Mock-interview feedback is most useful as a practice signal. Review the transcript, choose one repeatable improvement, and answer the question again in your own words.",
    workflowLinks: [
      { label: "Start a mock interview", href: "/mock-interview" },
      { label: "Browse company PYQs", href: "/pyqs" },
      { label: "Read fresher interview tips", href: "/blog/interview-tips-for-freshers-first-job" }
    ],
    sections: [
      {
        heading: "Separate content, structure, and delivery",
        body: [
          "Review each answer in three passes. Content asks whether the answer was accurate and relevant. Structure asks whether the listener could follow it. Delivery covers pace, filler words, and whether you sounded certain about claims you can support.",
          "A polished delivery cannot rescue an incorrect technical answer, and a correct answer can still be hard to follow. Label the problem before trying to fix it."
        ]
      },
      {
        heading: "Check automated feedback against the transcript",
        body: [
          "AI feedback can miss context or prefer one acceptable answer style. Read the transcript and compare technical suggestions with documentation, course notes, or a trusted reference before adopting them.",
          "For questions about your resume, your own records are the source of truth. Correct any invented metric, responsibility, or tool immediately. The goal is a clearer account of your work, not a more impressive fictional one."
        ]
      },
      {
        heading: "Fix one pattern per practice round",
        body: [
          "Choose one behavior you can observe: state the conclusion first, explain one trade-off, give a concrete example, or pause instead of using filler words. Repeat a short round with that single goal.",
          "Trying to improve accuracy, confidence, eye contact, vocabulary, and timing at once makes progress hard to measure. Keep a small practice log with the question, the chosen improvement, and what changed on the second attempt."
        ]
      },
      {
        heading: "Build answer outlines, not scripts",
        body: [
          "For behavioral questions, note Situation, Task, Action, and Result as four prompts. For technical questions, use definition, approach, trade-off, and example. These outlines preserve structure while letting you speak naturally.",
          "Memorized paragraphs often break when an interviewer asks a follow-up. Practice the same story from different angles so you can explain your decisions rather than recite wording."
        ]
      },
      {
        heading: "Use a three-session improvement loop",
        body: [
          "Session one is a baseline: answer without notes and identify recurring gaps. Session two targets the weakest pattern with a smaller set of questions. Session three simulates the real format and checks whether the improvement holds under time pressure.",
          "Pair company-specific question research with voice practice, but do not assume reported previous questions will repeat. Use them to understand themes and to test whether you can explain fundamentals clearly."
        ]
      }
    ]
  },
  {
    slug: "first-freelance-client-college-student",
    title: "How to Get a First Freelance Client as a College Student",
    description:
      "A realistic first-client workflow for students: choose a small service, build proof, find suitable prospects, write useful outreach, and scope paid work safely.",
    publishedAt: "2026-07-19",
    updatedAt: "2026-07-19",
    readingTime: "9 min read",
    category: "Student freelancing",
    targetKeyword: "how to get first freelance client as a student",
    keywords: [
      "how to get first freelance client as a student",
      "freelancing for college students",
      "student freelancer outreach",
      "first freelance project scope"
    ],
    excerpt:
      "Your first freelance offer should be small enough to explain, demonstrate, price, and deliver. A focused service with visible proof is easier to trust than a long list of unrelated skills.",
    workflowLinks: [
      { label: "Open the freelance workspace", href: "/dashboard/freelancing" },
      { label: "Build a tailored resume", href: "/dashboard/generate" },
      { label: "Write a no-experience resume", href: "/blog/resume-with-no-experience-student" }
    ],
    sections: [
      {
        heading: "Choose one small, testable service",
        body: [
          "Start with an outcome you can deliver in days rather than an open-ended promise. Examples include fixing mobile layout issues on three pages, creating a simple portfolio site, cleaning a spreadsheet and dashboard, or editing a short batch of product videos.",
          "Define who the service is for, what is included, what is excluded, and what the client receives. “I build websites” is vague; “I turn an existing design into a responsive three-page site” is easier to evaluate."
        ]
      },
      {
        heading: "Create proof before asking for trust",
        body: [
          "Build one representative sample using your own brief, a college club, or a clearly labeled redesign concept. Show the starting problem, your decisions, the finished work, and a link or screenshots.",
          "Do not present concept work as a paid client project. Honest context still demonstrates skill, and it avoids creating a trust problem when a prospect asks for details."
        ]
      },
      {
        heading: "Find prospects with a visible, relevant problem",
        body: [
          "Look for local businesses, student organizations, creators, early-stage teams, or professionals whose public work reveals a problem your service solves. Prioritize fit over sending the same message to a large list.",
          "Respect platform rules and privacy. Use published business contact channels, keep outreach relevant, and stop after a reasonable follow-up if there is no response."
        ]
      },
      {
        heading: "Write outreach that is useful on its own",
        body: [
          "A good message names a specific observation, explains one practical improvement, shows a relevant sample, and asks a small question. Avoid pretending you found a crisis or promising guaranteed revenue.",
          "For example: “I noticed the booking page is difficult to use on a narrow screen. I made a short annotated example of how I would simplify it. Would it help if I scoped the three highest-impact fixes?”"
        ]
      },
      {
        heading: "Scope the first project before starting",
        body: [
          "Put deliverables, timeline, revision limits, payment schedule, ownership, and required client inputs in writing. For meaningful work, request a deposit or use a platform with payment protection where available.",
          "Never pay a client to receive work, buy gift cards, move money through your account, or share passwords and identity documents without a legitimate need. Pause when the project, payment method, or contact identity cannot be verified."
        ]
      },
      {
        heading: "Turn delivery into reusable evidence",
        body: [
          "Confirm acceptance in writing, ask permission before publishing client details, and request a short testimonial tied to the delivered outcome. Write a case study that explains the problem, constraints, your work, and what was verified.",
          "Add the project to your resume or portfolio with accurate scope. The next client should see stronger proof, a clearer process, and a narrower reason to trust you."
        ]
      }
    ]
  },
  {
    slug: "company-pyq-14-day-placement-plan",
    title: "14-Day Company PYQ Plan for Campus Placement Coding Rounds",
    description:
      "Use company previous-year coding questions in a focused 14-day plan with baseline testing, pattern review, timed practice, and interview explanation drills.",
    publishedAt: "2026-07-19",
    updatedAt: "2026-07-19",
    readingTime: "8 min read",
    category: "Placement preparation",
    targetKeyword: "company PYQ preparation plan for placements",
    keywords: [
      "company PYQ preparation plan for placements",
      "14 day coding round preparation",
      "how to practice company previous year questions",
      "campus placement coding plan"
    ],
    excerpt:
      "Previous-year questions are a map of reported themes, not a prediction of the next assessment. Use them to diagnose gaps, practice patterns, and explain solutions under time pressure.",
    workflowLinks: [
      { label: "Browse company PYQs", href: "/pyqs" },
      { label: "Choose a company guide", href: "/prepare" },
      { label: "Practice a mock interview", href: "/mock-interview" }
    ],
    sections: [
      {
        heading: "Before day one: verify the current process",
        body: [
          "Read the current job or campus notice and the employer’s official careers information. Reported assessment patterns can change by role, batch, location, and hiring partner.",
          "Choose one target company and role. Record the allowed languages, likely environment, time limit if known, and the fundamentals named in the role description. Treat third-party question reports as practice material rather than official policy."
        ]
      },
      {
        heading: "Days 1–2: take a baseline",
        body: [
          "Attempt a small mixed set without hints and under a reasonable time limit. Record whether each failure came from understanding, choosing an approach, implementing it, handling edge cases, or managing time.",
          "Build a gap list by pattern: arrays and strings, hashing, two pointers, sliding window, sorting, stacks and queues, trees, graphs, dynamic programming, or basic mathematics. Your plan should follow evidence from the baseline."
        ]
      },
      {
        heading: "Days 3–7: repair the highest-value gaps",
        body: [
          "Spend each day on one or two recurring patterns. Review the concept, solve one guided example, then attempt two related questions without looking at the solution.",
          "After every problem, write the input assumptions, approach, time and space complexity, and one edge case. If you cannot explain why the approach works, the problem is not finished."
        ]
      },
      {
        heading: "Days 8–11: practice company-style sets",
        body: [
          "Combine questions into timed sets that resemble the reported mix without assuming an exact repeat. Decide in advance when to move on from a blocked problem and return later.",
          "Review wrong answers the same day. Classify the cause and re-solve from a blank editor after a gap. Copying a solution can create familiarity without recall."
        ]
      },
      {
        heading: "Days 12–13: explain and debug aloud",
        body: [
          "Practice stating a brute-force approach, improving it, testing an example, and naming complexity. Interviewers may care about your reasoning even when the final code is incomplete.",
          "Use one mock session to explain a solved PYQ and one to debug a deliberately broken solution. This connects coding-round preparation with technical interview communication."
        ]
      },
      {
        heading: "Day 14: simulate, review, and stop cramming",
        body: [
          "Run one final timed set in your chosen language and environment. Review your checklist: input parsing, empty and boundary cases, overflow where relevant, output format, and a final sample test.",
          "Use the remaining time to revisit notes and sleep normally. The plan cannot guarantee a particular question or result; it gives you a repeatable way to use reported questions without mistaking memorization for preparation."
        ]
      }
    ]
  },
  {
    slug: "free-ai-mock-interview-for-freshers",
    title: "Free AI Mock Interview for Freshers: How to Start",
    description:
      "How freshers can start a free AI mock interview online for campus placements — setup, question types, coding rounds, and a simple weekly practice plan on Apply.",
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-20",
    readingTime: "6 min read",
    category: "Mock interviews",
    targetKeyword: "free AI mock interview for freshers",
    keywords: [
      "free AI mock interview for freshers",
      "free mock interview for students",
      "AI mock interview free online",
      "campus placement mock interview free",
      "virtual mock interview for freshers"
    ],
    excerpt:
      "You do not need a paid coaching package to rehearse interviews. A free AI mock interview lets you practice speaking, coding, and recovering from silence before the real campus round.",
    workflowLinks: [
      { label: "Start free mock interview", href: "/mock-interview" },
      { label: "Company PYQs library", href: "/pyqs" },
      {
        label: "Full campus mock interview guide",
        href: "/blog/ai-mock-interview-practice-campus-placements"
      }
    ],
    sections: [
      {
        heading: "What “free to start” should include",
        body: [
          "A useful free mock interview is more than a chatbot. You need spoken questions, a chance to answer out loud, optional coding, and feedback you can act on.",
          "Apply’s web mock interview is free to start after Google sign-in. Sessions stay focused at 5–10 questions so practice feels like a real campus interview, not an endless quiz."
        ]
      },
      {
        heading: "How to set up your first session",
        body: [
          "Open apply.neexmeet.com/mock-interview, sign in, and enter a target company and role (for example TCS System Engineer or Amazon SDE Intern).",
          "Choose HR, technical, or mixed. Add a short job description if you have one. Enable coding only after you can already solve a few Easy PYQs for that company.",
          "Pick English first if that is your interview language. Switch to Hindi or another supported language only when you want to rehearse the same stories in that language."
        ]
      },
      {
        heading: "What to do after the score screen",
        body: [
          "Write down one weak answer and one strong answer. Rewrite the weak answer in your own words, then run a shorter mock the next day focused on that topic.",
          "Do not memorize the AI’s phrasing. Interviewers notice scripted answers. Use the transcript to improve structure, evidence, and clarity."
        ]
      },
      {
        heading: "Weekly plan for freshers",
        body: [
          "Two coding PYQ blocks from the company library, one technical mock with coding, one HR/mixed mock, and one feedback rewrite day.",
          "Track sessions in Applications & progress so you can see which companies and question types still feel shaky before placement week."
        ]
      }
    ]
  },
  {
    slug: "online-mock-interview-with-coding-round",
    title: "Online Mock Interview with Coding Round: Practice Guide",
    description:
      "How to practice an online mock interview with a coding round — editor, tests, difficulty levels, and a prep loop that pairs PYQs with voice answers on Apply.",
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-20",
    readingTime: "7 min read",
    category: "Mock interviews",
    targetKeyword: "online mock interview with coding",
    keywords: [
      "online mock interview with coding",
      "coding mock interview practice",
      "virtual interview coding round",
      "OA mock interview practice",
      "campus placement coding interview practice"
    ],
    excerpt:
      "Campus and product interviews often mix spoken technical questions with live coding. Practice both in one online mock so you stop treating coding and communication as separate skills.",
    workflowLinks: [
      { label: "Open mock interview room", href: "/mock-interview" },
      { label: "Solve company PYQs first", href: "/pyqs" },
      {
        label: "14-day PYQ placement plan",
        href: "/blog/company-pyq-14-day-placement-plan"
      }
    ],
    sections: [
      {
        heading: "Why coding-only practice is not enough",
        body: [
          "Students often solve LeetCode quietly, then freeze when they must explain an approach on a call. Online assessments and interviews expect both working code and clear narration.",
          "An online mock with a coding round forces you to hear the prompt, clarify constraints, write in an editor, run tests, and keep talking when stuck."
        ]
      },
      {
        heading: "How Apply’s coding turn works",
        body: [
          "Enable coding at Easy, Medium, or Hard when you start the mock. When a coding turn begins, an editor and terminal appear inside the meeting.",
          "Write a simple solution, run the provided test cases, and explain your approach out loud. The session score tracks coding tests passed along with spoken answers."
        ]
      },
      {
        heading: "Prep loop that compounds",
        body: [
          "Day A: solve 3–5 previous year questions for one company from the PYQs library without a timer pressure.",
          "Day B: timed set for the same company. Day C: mock interview with coding enabled for that company and role.",
          "After the mock, note whether failures came from problem selection, bugs, or explanation. Fix one category per week instead of changing everything at once."
        ]
      },
      {
        heading: "Safety and honesty notes",
        body: [
          "Use the practice room to improve your own skill. Do not treat reported PYQs as guaranteed questions, and do not submit fabricated project claims during HR turns.",
          "Apply's coding evaluator is built for practice with deterministic tests — use it to build confidence, then verify on the company's real platform before the actual OA."
        ]
      }
    ]
  },
  {
    slug: "mock-interview-online-free-practice-2026",
    title: "Mock Interview Online Free for Campus Placements",
    description:
      "Mock interview online free for campus placements — AI voice, coding rounds, HR questions, scored feedback. Unlimited practice on Apply.",
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-23",
    readingTime: "10 min",
    category: "Mock Interview",
    targetKeyword: "mock interview online",
    keywords: [
      "mock interview online",
      "mock interview",
      "mock interview practice",
      "free online interview practice",
      "mock interview practice online free",
      "online mock interview for freshers",
      "AI mock interview online",
      "virtual mock interview free",
      "campus placement mock interview online",
      "how to practice mock interview online",
      "best free mock interview tool India",
      "mock interviews"
    ],
    excerpt:
      "Mock interview practice online is the fastest way to prepare for campus placements. Here's how to use free AI mock interview tools — voice questions, coding rounds, and scored feedback.",
    workflowLinks: [
      { label: "Start free mock interview", href: "/mock-interview" },
      { label: "Browse company PYQs", href: "/pyqs" },
      {
        label: "Mock interview practice online free",
        href: "/blog/mock-interview-practice-online-free"
      },
      {
        label: "Unlimited interview practice",
        href: "/blog/unlimited-interview-practice-online"
      },
      {
        label: "AI mock interview for freshers",
        href: "/blog/ai-mock-interview-free-for-freshers-2026"
      }
    ],
    sections: [
      {
        heading: "Why mock interview practice matters",
        body: [
          "Reading interview questions silently is not practice. Real interviews test your ability to think out loud, handle pressure, and communicate clearly — skills you can only develop by speaking answers aloud.",
          "Mock interview practice online lets you simulate real interview conditions from your hostel room: an interviewer asks a question, you answer verbally, and you get feedback on your response.",
          "Students who practice 5+ mock interviews before their first real placement interview are significantly more confident and articulate — and it shows in the result."
        ]
      },
      {
        heading: "What is an online mock interview",
        body: [
          "An online mock interview is a simulated interview conducted over the web. You join a virtual room, an interviewer (AI or human) asks questions, and you answer by voice or text.",
          "Apply's free AI mock interview at /mock-interview works like a Google Meet call — the AI interviewer appears on screen, speaks questions aloud using natural voice, and listens to your spoken answers with live captions.",
          "After each answer, the AI evaluates your response and gives scored feedback: strengths, improvements, and a score out of 10. This is the closest you can get to a real interview without a human partner."
        ]
      },
      {
        heading: "How to practice mock interview online for free",
        body: [
          "Step 1: Open apply.neexmeet.com/mock-interview and sign in with Google.",
          "Step 2: Enter your target company (e.g. TCS, Amazon, Infosys) and role (e.g. SDE Intern, Analyst).",
          "Step 3: Choose interview type — HR (behavioral), technical (coding + CS), or mixed (both).",
          "Step 4: Select difficulty — easy, medium, or hard. Choose whether to include coding rounds.",
          "Step 5: Click 'Start interview'. The AI interviewer speaks the first question aloud.",
          "Step 6: Speak your answer. The AI captures your voice with live captions. After 5 seconds of silence, it auto-submits.",
          "Step 7: Review feedback — strengths, improvements, score. The next question starts automatically.",
          "Step 8: After 5-8 questions, end the call to see your overall session score and stats."
        ]
      },
      {
        heading: "Types of mock interview you can practice",
        body: [
          "HR mock interview: Behavioral questions — tell me about yourself, strengths, weaknesses, why this company. Practice STAR-format answers. Best for TCS, Infosys, Wipro HR rounds.",
          "Technical mock interview: Coding problems + CS fundamentals (OS, DBMS, OOP). The AI asks you to solve a problem and explain your approach. Best for Amazon, Microsoft, Google.",
          "Mixed mock interview: Both HR and technical questions in one session. Most realistic for campus placements where both rounds happen on the same day.",
          "Coding mock interview: Optional coding rounds with an in-browser code editor and test runner. Practice solving problems while explaining your thought process aloud."
        ]
      },
      {
        heading: "Free vs paid mock interview tools",
        body: [
          "Apply: Free AI mock interview with voice, live captions, coding rounds, scored feedback, and session history. 9 interviewer voices, 5 languages (English, Hindi, Tamil, Telugu, Marathi). No credit card needed.",
          "Pramp: Free peer-to-peer mock interviews with other developers. Good for human practice but scheduling can be hard. No AI voice or coding rounds.",
          "Interviewing.io: Paid anonymous technical mock interviews with real engineers. $100-250 per session. High quality but expensive for students.",
          "PrepInsta: Static interview content but no interactive mock interview. You read questions but don't practice speaking answers.",
          "For Indian students preparing for campus placements, Apply is the best free option — it's built specifically for India, supports Indian languages, and includes company-specific PYQs."
        ]
      },
      {
        heading: "Mock interview tips for first-time practitioners",
        body: [
          "Speak aloud, don't whisper. The AI needs to hear you clearly. Use a quiet room with minimal background noise.",
          "Think out loud. Even if you don't know the full answer, explain your thought process. Interviewers (including AI) reward structured thinking.",
          "Use STAR format for HR questions: Situation → Task → Action → Result. This keeps your answer structured and 60-90 seconds long.",
          "For coding questions, explain your approach before writing code. 'First I'd use a hash map for O(1) lookup, then iterate through the array...'",
          "Review your feedback after every session. Identify one weakness and focus on it in the next session. Improvement is iterative."
        ]
      },
      {
        heading: "Company-specific mock interview practice",
        body: [
          "TCS mock interview: Set company to TCS, type to mixed, difficulty to easy/medium. TCS interviews focus on basics + HR. Check TCS interview questions on Apply /prepare.",
          "Amazon mock interview: Set company to Amazon, type to technical, difficulty to medium/hard. Amazon asks coding + leadership principles. Check Amazon OA questions on Apply /prepare.",
          "Infosys mock interview: Set company to Infosys, type to mixed. Infosys SP/DSE needs harder coding. Check Infosys SP DSE guide on Apply /blog.",
          "Wipro mock interview: Set company to Wipro, type to HR + technical. Wipro is easier than product companies. Check Wipro Elite NTH guide on Apply /blog.",
          "Browse 64+ company PYQs at /pyqs before your mock interview — know what each company actually asks."
        ]
      },
      {
        heading: "How many mock interviews should you practice",
        body: [
          "Minimum: 3 mock interviews before your first real placement interview. This gets you comfortable speaking aloud.",
          "Recommended: 5-8 mock interviews spread over 2 weeks. One per day in the final week before placements.",
          "For product companies (Amazon, Microsoft, Google): 10+ mock interviews with coding rounds. The bar is higher.",
          "Track your scores over time. If your average score is 6/10, aim for 7/10 in the next session. Improvement is measurable."
        ]
      },
      {
        heading: "Start your free mock interview now",
        body: [
          "Apply's AI mock interview is free to start — no credit card, no download. Sign in with Google, pick your company and role, and join the interview room.",
          "Open /mock-interview to start practicing. Pair every mock with company PYQs at /pyqs for maximum placement readiness."
        ]
      }
    ]
  },
  {
    slug: "ai-mock-interview-free-for-freshers-2026",
    title: "AI Mock Interview Free for Freshers Practice",
    description:
      "AI mock interview free for freshers — how AI interview practice works, why it beats reading questions, and how to start free on Apply.",
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-23",
    readingTime: "9 min",
    category: "Mock Interview",
    targetKeyword: "AI mock interview",
    keywords: [
      "AI mock interview",
      "AI mock interview for freshers",
      "ai mock interview",
      "AI interview practice",
      "AI interviewer online",
      "artificial intelligence mock interview",
      "AI powered mock interview free",
      "AI mock interview India",
      "AI interview simulator",
      "AI interview preparation tool",
      "free AI mock interview for students",
      "mock interview"
    ],
    excerpt:
      "AI mock interviews are replacing static interview prep. Here's how AI interview practice works, why it's more effective than reading questions, and how to use it free.",
    workflowLinks: [
      { label: "Start AI mock interview", href: "/mock-interview" },
      { label: "Browse company PYQs", href: "/pyqs" },
      {
        label: "Mock interview practice online free",
        href: "/blog/mock-interview-practice-online-free"
      },
      {
        label: "Mock interview practice guide",
        href: "/blog/mock-interview-practice-online-guide"
      },
      {
        label: "Use feedback without memorizing",
        href: "/blog/use-ai-mock-interview-feedback"
      }
    ],
    sections: [
      {
        heading: "What is an AI mock interview",
        body: [
          "An AI mock interview is a simulated interview where an AI — not a human — asks you questions, listens to your answers, and gives feedback. It's like having a personal interview coach available 24/7.",
          "Apply's AI mock interview uses large language models (Groq Llama 3.3 + Gemini) to generate realistic interview questions based on your target company and role. It speaks questions aloud using ElevenLabs voice technology and captures your spoken answers with speech-to-text.",
          "Unlike static interview question lists, the AI adapts: if your answer is weak, it follows up with a simpler question. If your answer is strong, it goes deeper. This is closer to a real interview than any static prep."
        ]
      },
      {
        heading: "Why AI mock interviews are better than reading questions",
        body: [
          "Active vs passive: Reading 'Tell me about yourself' and thinking the answer is passive. Speaking it aloud to an AI that listens and evaluates is active — you develop actual communication skills.",
          "Pressure simulation: Real interviews have time pressure and someone watching you. AI mock interviews recreate this — the AI asks, you answer in real-time, there's no pause button.",
          "Immediate feedback: After each answer, the AI tells you what was good, what was missing, and your score. You don't wait 3 days for a peer to review your answer.",
          "Company-specific: The AI generates questions based on the company you select — TCS asks aptitude + HR, Amazon asks coding + leadership principles. Static lists can't do this.",
          "Unlimited practice: You can practice 100 mock interviews at 2 AM without booking anyone's time. Human mock interview partners are limited by availability."
        ]
      },
      {
        heading: "How AI mock interviews work technically",
        body: [
          "Question generation: The AI (Groq Llama 3.3 or Gemini) generates a question based on your company, role, interview type, and difficulty. It uses your resume context and job description if provided.",
          "Voice synthesis: The question is converted to speech using ElevenLabs TTS — natural human-like voice, not robotic. You can choose from 9 voices (5 female, 4 male) and 5 languages.",
          "Answer capture: You speak your answer. The browser's Web Speech API or Groq Whisper transcribes it in real-time with live captions. No need to type.",
          "Evaluation: The AI evaluates your answer against criteria — clarity, structure, relevance, depth, communication. It gives a score (1-10) and specific feedback (strengths + improvements).",
          "Adaptive flow: Based on your answer quality, the AI adjusts the next question's difficulty. Good answer → harder follow-up. Weak answer → simpler redirect."
        ]
      },
      {
        heading: "Free AI mock interview for freshers — how to start",
        body: [
          "Apply offers free AI mock interview practice for freshers. No credit card, no download. Here's how to start:",
          "1. Go to apply.neexmeet.com/mock-interview",
          "2. Sign in with Google (free account)",
          "3. Enter your target company (e.g. TCS, Amazon, Infosys)",
          "4. Enter your target role (e.g. SDE Intern, Analyst, GET)",
          "5. Choose interview type: HR, Technical, or Mixed",
          "6. Choose difficulty: Easy, Medium, or Hard",
          "7. Click 'Start interview' — the AI begins asking questions",
          "8. Speak your answers — the AI listens and evaluates",
          "9. After 5-8 questions, end the call to see your session score"
        ]
      },
      {
        heading: "AI mock interview vs human mock interview",
        body: [
          "AI mock interview: Free, available 24/7, no scheduling, instant feedback, company-specific questions, voice + coding, unlimited sessions. Best for: initial practice, building confidence, company-specific prep.",
          "Human mock interview (peer): Free, real human interaction, unpredictable questions, body language feedback. Best for: final round practice, human connection. Hard to schedule.",
          "Human mock interview (paid coach): $50-250/session, expert feedback, personalized tips. Best for: senior roles, specific company prep. Expensive for students.",
          "Best strategy: Start with AI mock interviews (free, unlimited) for your first 5 sessions. Then do 1-2 human mock interviews for real interaction. Alternate between both."
        ]
      },
      {
        heading: "What companies can you practice AI mock interviews for",
        body: [
          "Service companies: TCS, Infosys, Wipro, Cognizant, Accenture, Capgemini, HCL — HR + basic technical. Set difficulty to easy/medium.",
          "Product companies: Amazon, Microsoft, Google, Apple, Meta, Adobe — coding + system design. Set difficulty to medium/hard. Include coding rounds.",
          "Fintech: Goldman Sachs, JP Morgan, Morgan Stanley, Deloitte — DP + arrays + finance domain. Set type to technical.",
          "Startups: Swiggy, Zomato, PhonePe, Razorpay, Paytm — medium coding + culture fit. Set type to mixed.",
          "Browse 64+ company PYQs at /pyqs to see what each company actually asks before your mock interview."
        ]
      },
      {
        heading: "AI mock interview features on Apply",
        body: [
          "Voice questions: ElevenLabs natural voice (9 voices) — not robotic. Choose male or female interviewer.",
          "Voice answers: Speak naturally — AI captures with live captions. 5-second silence auto-submits.",
          "Live captions: See your answer transcribed in real-time as you speak. Great for verifying clarity.",
          "Coding rounds: Optional in-browser code editor with test runner. Practice solving problems while explaining aloud.",
          "Scored feedback: After each answer — strengths, improvements, score out of 10. After session — overall score and stats.",
          "5 languages: English, Hindi, Tamil, Telugu, Marathi. Indian English voice prioritized for browser fallback.",
          "Session history: Every session saved. Track your score over time. See which areas to improve.",
          "In-call voice change: Switch interviewer voice or language mid-interview without restarting."
        ]
      },
      {
        heading: "Start your AI mock interview free",
        body: [
          "Apply's AI mock interview is the most realistic free interview practice tool for Indian students. Voice questions, live captions, coding rounds, scored feedback, 9 voices, 5 languages — all free to start.",
          "Open /mock-interview, sign in with Google, and start your first AI mock interview in 30 seconds."
        ]
      }
    ]
  },
  {
    slug: "online-interview-practice-free-india",
    title: "Free Online Interview Practice for Students India",
    description:
      "Free online interview practice for Indian students — AI mock interviews, coding rounds, HR questions. Practice from home on hostel wifi.",
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-21",
    readingTime: "8 min",
    category: "Mock Interview",
    targetKeyword: "free online interview practice",
    keywords: [
      "free online interview practice",
      "online interview practice",
      "online interview practice for freshers",
      "interview practice online free India",
      "how to practice interview online",
      "online interview preparation",
      "virtual interview practice free",
      "online mock interview practice",
      "interview rehearsal online",
      "online interview coaching free"
    ],
    excerpt:
      "You don't need a human partner or expensive coaching to practice interviews. Here's how to practice interviews online for free — from your hostel room, on any device.",
    workflowLinks: [
      { label: "Start online interview practice", href: "/mock-interview" },
      { label: "Browse company PYQs", href: "/pyqs" },
      {
        label: "Unlimited interview practice",
        href: "/blog/unlimited-interview-practice-online"
      },
      { label: "Build ATS resume", href: "/dashboard/generate" }
    ],
    sections: [
      {
        heading: "Why online interview practice is essential",
        body: [
          "In 2026, most campus placement interviews happen online — via Zoom, Google Meet, or company-specific platforms. Practicing in the same medium (online) is critical.",
          "Online interviews feel different from in-person: you're looking at a screen, audio can lag, and body language is harder to read. You need to practice in this exact format.",
          "Free online interview practice tools let you simulate this experience from your hostel room — no travel, no scheduling, no partner needed."
        ]
      },
      {
        heading: "3 ways to practice interviews online for free",
        body: [
          "1. AI mock interview (recommended): An AI interviewer asks questions, you speak answers, get instant feedback. Available 24/7, unlimited sessions. Apply's AI mock interview at /mock-interview is free for Indian students.",
          "2. Peer mock interview: Practice with a friend over Google Meet. One plays interviewer, the other answers. Switch roles. Free but requires scheduling.",
          "3. Mirror practice: Stand in front of a mirror and answer questions aloud. Free but no feedback. Better than nothing if you have no other option."
        ]
      },
      {
        heading: "How to practice online interview with AI — step by step",
        body: [
          "Open apply.neexmeet.com/mock-interview on any device (laptop, phone, tablet).",
          "Sign in with Google — free, no credit card.",
          "Enter your target company and role. The AI uses this to generate relevant questions.",
          "Choose interview type: HR (behavioral), Technical (coding + CS), or Mixed (both).",
          "Enable 'Speak questions aloud' — the AI will voice the question like a real interviewer.",
          "Click 'Start interview'. The AI speaks the first question. Answer by speaking naturally.",
          "Your answer is captured with live captions. After 5 seconds of silence, it auto-submits.",
          "The AI evaluates and gives feedback. The next question starts automatically.",
          "After 5-8 questions, click 'End call' to see your session score and stats."
        ]
      },
      {
        heading: "What you need for online interview practice",
        body: [
          "Device: Any laptop, phone, or tablet with a browser. No app download needed.",
          "Microphone: Built-in laptop/phone mic is fine. For better quality, use earphones with a mic.",
          "Internet: Works on hostel wifi (3G+ is enough). Audio uses ~50KB/s, video optional.",
          "Quiet space: A room with minimal background noise. Library or empty classroom works.",
          "Browser: Chrome, Edge, Safari, or Firefox. Chrome recommended for best speech recognition.",
          "No webcam required: Camera is optional in Apply's mock interview. You can practice with just audio."
        ]
      },
      {
        heading: "Online interview practice for different company types",
        body: [
          "Service companies (TCS, Infosys, Wipro): Practice HR + aptitude questions. Set type to 'HR' or 'Mixed', difficulty to 'Easy'. Focus on clear communication and confident delivery.",
          "Product companies (Amazon, Microsoft): Practice coding + system design. Set type to 'Technical', difficulty to 'Medium/Hard'. Enable coding rounds. Focus on thinking aloud.",
          "Fintech (Goldman Sachs, JP Morgan): Practice DP + finance domain. Set type to 'Technical', difficulty to 'Medium'. Focus on correctness and edge cases.",
          "Startups (Swiggy, Zomato): Practice medium coding + culture fit. Set type to 'Mixed', difficulty to 'Medium'. Focus on adaptability and quick thinking."
        ]
      },
      {
        heading: "Common online interview mistakes to avoid",
        body: [
          "Don't look at yourself on screen — look at the camera (or the AI interviewer tile). Eye contact matters even online.",
          "Don't use filler words excessively. 'Um', 'like', 'you know' reduce clarity. Practice pausing instead of filling silence.",
          "Don't sit too close to the camera. Maintain arm's length distance. Frame your face and shoulders.",
          "Don't have poor lighting. Sit facing a window or lamp. Avoid backlight (camera facing window).",
          "Don't use a noisy background. Use a quiet room. Close windows. Silence notifications.",
          "Don't read from a script. Interviewers can tell. Prepare key points, not full sentences."
        ]
      },
      {
        heading: "How to track your interview practice progress",
        body: [
          "Apply saves every mock interview session automatically. Go to /dashboard/applications to see your session history.",
          "Track: overall score (1-10), questions answered, strong answers, coding tests passed, session duration.",
          "Aim for consistent improvement: if your first session scored 5/10, target 6/10 next time, then 7/10.",
          "Keep a notebook of recurring weaknesses: 'I freeze on system design questions' → practice 3 system design mocks."
        ]
      },
      {
        heading: "Start practicing interviews online free",
        body: [
          "Apply's free online interview practice tool is built for Indian students — voice AI, live captions, coding rounds, 5 languages, company-specific questions. No download, no credit card.",
          "Open /mock-interview and start your first practice session in 30 seconds. Pair with company PYQs at /pyqs for complete placement readiness."
        ]
      }
    ]
  },
  {
    slug: "free-resume-maker-for-students-india",
    title: "Free Resume Maker for Students India (No Watermark)",
    description:
      "Free resume maker for students in India — ATS-friendly templates, AI tailoring, free PDF download without watermark. Start on Apply.",
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-21",
    readingTime: "9 min",
    category: "Resume Tools",
    targetKeyword: "free resume maker for students",
    keywords: [
      "free resume maker for students",
      "resume builder free for students",
      "free resume maker India",
      "free resume builder for students India",
      "resume maker free online no watermark",
      "free resume maker for freshers",
      "free resume builder online India",
      "resume maker for engineering students free",
      "free ATS resume builder",
      "student resume maker free PDF"
    ],
    excerpt:
      "Looking for a free resume maker that actually works for Indian students? Here's how to build an ATS-friendly resume online for free — no watermark, no credit card, free PDF download.",
    workflowLinks: [
      { label: "Open free resume maker", href: "/dashboard/generate" },
      {
        label: "Best free resume editor for placements",
        href: "/blog/best-free-resume-editor-campus-placements"
      },
      { label: "Engineering student resume", href: "/blog/engineering-student-resume-template" },
      { label: "Resume with no experience", href: "/blog/resume-with-no-experience-student" },
      { label: "Practice mock interviews", href: "/mock-interview" }
    ],
    sections: [
      {
        heading: "What makes a good free resume maker for students",
        body: [
          "Free PDF download: No watermark, no 'pay to download' trap. You should be able to build and download your resume completely free.",
          "ATS-friendly: The resume must be parseable by Applicant Tracking Systems (Workday, Greenhouse, Naukri). Visual templates with columns fail ATS.",
          "Easy to use: Fill in your details, get a resume. No design skills needed. Guided forms are better than blank canvas editors.",
          "India-specific: Supports CGPA, Indian education format, Indian company keywords. Most global tools (Zety, Canva) are US-focused.",
          "AI assistance: Suggests improvements, matches keywords from job descriptions, helps write better bullet points."
        ]
      },
      {
        heading: "Apply — free resume maker for Indian students",
        body: [
          "Apply is a free resume maker built specifically for Indian engineering students preparing for campus placements.",
          "Free plan: 5 resume generations (per account + per device). No credit card needed. Clean ATS-friendly PDF download with no watermark.",
          "How it works: Upload your existing resume (PDF/Word/text) or build one from scratch using guided questions. Apply extracts your content, then tailors it to any job description.",
          "AI tailoring: Paste a job description, and Apply matches keywords from the JD to your resume — improving your ATS keyword match score automatically.",
          "ATS score: Every generated resume shows a keyword match percentage so you know how well your resume aligns with the job."
        ]
      },
      {
        heading: "How to build a resume free on Apply — step by step",
        body: [
          "Method 1 — Upload existing resume:",
          "1. Go to apply.neexmeet.com/dashboard/generate",
          "2. Upload your resume (PDF, Word, TXT, Markdown, or RTF)",
          "3. Apply extracts your content automatically",
          "4. Paste the job description for the role you want",
          "5. Click 'Generate' — AI tailors your resume to match the JD",
          "6. Preview the before/after ATS score",
          "7. Download clean PDF — free, no watermark",
          "",
          "Method 2 — Build from scratch:",
          "1. Go to apply.neexmeet.com/dashboard/build",
          "2. Answer guided questions: personal info, education, skills, projects, experience",
          "3. Live PDF preview updates as you type",
          "4. Click 'Save' to generate your resume",
          "5. Download clean PDF — free, no watermark"
        ]
      },
      {
        heading: "Free resume maker comparison — Apply vs others",
        body: [
          "Apply: Free 5 resumes, ATS scoring, AI tailoring, no watermark, India-specific, company PYQs + mock interview included. Best for Indian students.",
          "Novoresume: Free 1-page resume with watermark. €6/month for premium. No ATS scoring, no India-specific features.",
          "Canva: Free, beautiful templates, but NOT ATS-friendly. Visual layouts get rejected by ATS. Use for portfolios, not placements.",
          "Zety: $5.45/month. US-focused. No free PDF download. Not ideal for Indian students.",
          "Resume.io: Free trial then $2.95/month. Good templates but no AI tailoring or ATS scoring.",
          "For Indian students: Apply is the only free resume maker with ATS scoring, AI tailoring, no watermark, and India-specific features."
        ]
      },
      {
        heading: "What to include in a student resume",
        body: [
          "Header: Full name, email, phone, LinkedIn, GitHub. No photo, age, or marital status (Indian companies don't require these).",
          "Education: Degree, college, university, CGPA, expected graduation year. Include relevant coursework (DSA, DBMS, OOP).",
          "Projects: 2-3 projects with name, description, tech stack, GitHub link. This is the most important section for freshers.",
          "Skills: Programming languages, frameworks, tools, databases. Only list skills you can answer questions about.",
          "Achievements: Hackathon participation, coding contest ranks, certifications, extracurricular leadership.",
          "Keep it to ONE page. Indian campus placement resumes are one page — no exceptions."
        ]
      },
      {
        heading: "ATS-friendly resume tips for free resume makers",
        body: [
          "Use single-column layout. ATS systems read top-to-bottom, left-to-right. Multi-column layouts break parsing.",
          "Use standard fonts: Arial, Calibri, Georgia, Times New Roman. Avoid fancy fonts that ATS can't read.",
          "Include keywords from the job description. If the JD says 'Java, Spring Boot, REST APIs', include those exact words in your skills section.",
          "Use standard section headers: 'Education', 'Experience', 'Projects', 'Skills'. Don't use creative names like 'My Journey'.",
          "Save as PDF. PDF preserves formatting across all systems. Don't submit Word docs (formatting breaks).",
          "Apply's resume maker does all of this automatically — single column, standard fonts, keyword matching, clean PDF."
        ]
      },
      {
        heading: "Free resume maker for engineering students specifically",
        body: [
          "Engineering students need: CGPA (not GPA), Indian university name, relevant coursework, technical projects with tech stack, coding skills.",
          "Apply's resume builder at /dashboard/build has guided fields specifically for engineering students — education with CGPA, project section with tech stack field, skills categorized by languages/frameworks/tools.",
          "For TCS/Infosys/Wipro: Focus on CGPA, basic skills (Java, C, SQL), and 1-2 simple projects. Keep it simple.",
          "For Amazon/Microsoft/Google: Focus on impact metrics, complex projects, advanced skills (DP, system design), and leadership.",
          "Tailor your resume for each company using Apply's AI tailoring tool at /dashboard/generate."
        ]
      },
      {
        heading: "Start building your resume free",
        body: [
          "Apply's free resume maker is built for Indian students — ATS-friendly, AI-powered, no watermark, free PDF download. 5 free resume generations, no credit card.",
          "Go to apply.neexmeet.com/dashboard/build to build from scratch, or /dashboard/generate to upload and tailor. Then browse 64+ company PYQs at /pyqs and practice mock interviews at /mock-interview."
        ]
      }
    ]
  },
  {
    slug: "resume-for-engineering-students-india-template",
    title: "Resume Engineering Student Free Template India",
    description:
      "Resume engineering student free template for India — format, CGPA, projects, skills, and tips for TCS, Infosys, Amazon campus placements.",
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-23",
    readingTime: "10 min",
    category: "Fresher Resumes",
    targetKeyword: "resume engineering student",
    keywords: [
      "resume engineering student",
      "engineering student resume",
      "engineering student resume format India",
      "resume for engineering freshers",
      "B.Tech resume template",
      "engineering student resume with projects",
      "resume format for engineering students India",
      "campus placement resume format",
      "engineering resume examples India",
      "resume for CS engineering student",
      "resume for IT engineering fresher"
    ],
    excerpt:
      "The complete resume guide for engineering students in India — what to include, how to format, CGPA handling, project descriptions, skills section, and company-specific tips.",
    workflowLinks: [
      { label: "Build engineering resume free", href: "/dashboard/generate" },
      {
        label: "Engineering resume template",
        href: "/blog/engineering-student-resume-template"
      },
      {
        label: "Engineering student resume examples",
        href: "/blog/engineering-student-resume-examples-india"
      },
      { label: "Resume for student with no experience", href: "/blog/resume-with-no-experience-student" },
      { label: "Free resume maker for students", href: "/blog/free-resume-maker-for-students-india" },
      { label: "Practice mock interviews", href: "/mock-interview" }
    ],
    sections: [
      {
        heading: "What recruiters look for in an engineering student resume",
        body: [
          "For service companies (TCS, Infosys, Wipro): CGPA (7+ is safe), basic programming skills (C/Java/Python), 1-2 projects, good communication. Simple and clean.",
          "For product companies (Amazon, Microsoft, Google): Strong projects with impact metrics, advanced DSA skills, system design basics, GitHub profile with contributions. Complex and achievement-focused.",
          "For startups: Relevant tech stack (React, Node.js, Python), side projects, GitHub activity, ability to learn fast. Agile and adaptable.",
          "All recruiters: One page, clean formatting, no typos, ATS-friendly, honest claims you can defend in an interview."
        ]
      },
      {
        heading: "Engineering student resume format — section by section",
        body: [
          "HEADER: Full name | Email | Phone | LinkedIn | GitHub. No photo, no age, no marital status. Keep it one line if possible.",
          "EDUCATION: B.E./B.Tech in [branch] | [college name], [university] | CGPA: X.XX/10 | Expected: [month] [year]. Include relevant coursework: Data Structures, DBMS, OOP, OS, CN.",
          "PROJECTS (most important for freshers): 2-3 projects. Each: Project name | Tech stack | 2-line description | Your role | GitHub link. Use bullet points with impact metrics.",
          "SKILLS: Languages (Java, Python, C++), Frameworks (React, Node.js, Spring Boot), Tools (Git, Postman, VS Code), Databases (MySQL, MongoDB). Group by category.",
          "ACHIEVEMENTS: Smart India Hackathon finalist, LeetCode 150+ problems, NPTEL certification, college tech fest winner. Show initiative and excellence.",
          "EXPERIENCE (if any): Internship or part-time role. Company | Role | Duration | 2-3 bullet points with impact. If no experience, skip this section — projects are your experience."
        ]
      },
      {
        heading: "Free engineering student resume template",
        body: [
          "[YOUR NAME] | email@gmail.com | +91-XXXXXXXXXX | linkedin.com/in/username | github.com/username",
          "",
          "EDUCATION",
          "B.E. Information Technology | Atharva College, Mumbai University | CGPA: 8.2/10 | Expected: June 2027",
          "Relevant coursework: Data Structures, Algorithms, DBMS, OOP, Operating Systems, Computer Networks",
          "",
          "PROJECTS",
          "Fintech Stock Dashboard | React, Node.js, MongoDB, Chart.js | github.com/username/stock-dashboard",
          "- Real-time NSE stock screener with interactive charts and price alerts",
          "- Designed REST API, JWT authentication, deployed on Vercel | 10,000+ API calls/day during testing",
          "",
          "College Event Management System | Java, Spring Boot, PostgreSQL | github.com/username/event-mgmt",
          "- Full-stack event registration platform for 500+ students",
          "- Built role-based access (admin, student, organizer) with Spring Security",
          "",
          "SKILLS",
          "Languages: Java, Python, JavaScript, C++",
          "Frameworks: React, Node.js, Express, Spring Boot",
          "Tools: Git, Postman, VS Code, Docker",
          "Databases: MySQL, MongoDB, PostgreSQL",
          "",
          "ACHIEVEMENTS",
          "Smart India Hackathon 2025 finalist | LeetCode 150+ problems solved | NPTEL DBIPC Elite certification",
          "",
          "Use Apply's free resume builder at /dashboard/build to create this format automatically — just fill in your details."
        ]
      },
      {
        heading: "How to write engineering projects on your resume",
        body: [
          "Project name: Use a descriptive name, not 'Project 1'. 'Fintech Stock Dashboard' is better than 'Web App Project'.",
          "Tech stack: List every technology used — this is what recruiters scan for. 'React, Node.js, MongoDB, Chart.js, Vercel'.",
          "Description: 1-2 lines explaining what the project does. 'A real-time stock screener that displays NSE prices with interactive charts.'",
          "Your role: What YOU did, not the team. 'Designed REST API, implemented JWT auth, deployed on Vercel.'",
          "Impact: Numbers make it credible. 'Handled 10,000+ API calls/day. Reduced page load by 40% with lazy loading.'",
          "GitHub link: Make sure the repo is public with a good README. Recruiters DO check GitHub."
        ]
      },
      {
        heading: "Company-specific resume tips for engineering students",
        body: [
          "TCS resume: Simple format. CGPA 7+ is safe. List Java/C/SQL skills. 1-2 simple projects. Keep it basic — TCS values consistency over complexity.",
          "Infosys resume: Similar to TCS but slightly more technical. For SP/DSE roles: advanced DSA, harder projects, system design basics. Check Infosys resume format on Apply /prepare.",
          "Amazon resume: Impact-focused. Use metrics (X% improvement, Y users served). Leadership principles in bullet points. 2-3 complex projects. Check Amazon SDE internship guide on Apply /prepare.",
          "Microsoft resume: Show breadth — multiple languages, cloud (Azure), open-source contributions. Clean code matters. Check Microsoft internship guide on Apply /prepare.",
          "Startup resume: Show you can ship. Deployed projects > academic projects. GitHub activity > CGPA. Show you learn fast.",
          "Tailor your resume for each company using Apply's AI tailoring tool at /dashboard/generate — paste the JD and get a matched version."
        ]
      },
      {
        heading: "Common engineering resume mistakes",
        body: [
          "Don't list skills you can't answer: If you list 'Docker', expect 'What's the difference between an image and a container?' List only what you can defend.",
          "Don't use 2 pages: Engineering freshers get 1 page. If it overflows, cut the weakest project or shorten descriptions.",
          "Don't use fancy templates: Columns, colors, icons, photos — all break ATS parsing. Use simple single-column layout.",
          "Don't include personal details: Age, gender, religion, marital status, photo, father's name — not required and can trigger bias.",
          "Don't copy-paste bullet points from the internet: Recruiters have seen them all. Write your own from your actual experience.",
          "Don't forget GitHub: If you list projects, make sure the GitHub repos are public with good READMEs."
        ]
      },
      {
        heading: "CGPA on resume — how to handle it",
        body: [
          "If CGPA is 7.5+: List it proudly. 'CGPA: 8.2/10'. This is above most company cut-offs.",
          "If CGPA is 6.5-7.5: List it. Most service companies have 6.5 cut-off. You're safe for TCS, Infosys, Wipro.",
          "If CGPA is below 6.5: You can still list it (some companies have no cut-off) or omit it and let your projects speak. Product companies care more about skills than CGPA.",
          "If CGPA is very low (below 6): Omit it. Focus on projects, skills, and achievements. Apply to startups and companies that don't filter by CGPA.",
          "Format: Always write as 'X.XX/10' — Indian universities use 10-point scale. Don't convert to 4-point GPA."
        ]
      },
      {
        heading: "Build your engineering resume free",
        body: [
          "Apply's free resume builder at /dashboard/build is designed for engineering students — guided fields for education (CGPA), projects (tech stack), skills (categorized), and achievements.",
          "Free PDF download, no watermark, ATS-friendly format. 5 free resume generations. Then browse company PYQs at /pyqs and practice mock interviews at /mock-interview."
        ]
      }
    ]
  },
  {
    slug: "tcs-resume-format-for-freshers",
    title: "TCS Resume Format for Freshers: NQT Template 2026",
    description:
      "TCS resume format for freshers — sections, CGPA, skills, projects, and a free template for NQT 2026. Build ATS-safe PDF on Apply.",
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-21",
    readingTime: "8 min",
    category: "Company Prep",
    targetKeyword: "tcs resume format",
    keywords: [
      "tcs resume format",
      "TCS resume format for freshers",
      "TCS NQT resume format",
      "resume format for TCS campus placement",
      "TCS resume template",
      "TCS resume sample for freshers",
      "how to write resume for TCS",
      "TCS fresher resume example India",
      "TCS interview resume format",
      "TCS Ninja resume format"
    ],
    excerpt:
      "TCS has a specific resume format that gets shortlisted. Here's the exact format TCS recruiters expect — sections, CGPA, skills, projects, and a free template for NQT 2026.",
    workflowLinks: [
      { label: "Build TCS resume free", href: "/dashboard/generate" },
      { label: "TCS NQT prep guide", href: "/blog/tcs-nqt-preparation-guide-2026" },
      { label: "TCS interview questions", href: "/prepare/tcs-interview-questions-2026" },
      { label: "Practice TCS mock interview", href: "/mock-interview" }
    ],
    sections: [
      {
        heading: "What TCS looks for in a fresher resume",
        body: [
          "TCS is India's largest IT employer and hires 50,000+ freshers annually. The resume screening is largely automated (ATS) + brief HR review.",
          "TCS looks for: CGPA 6.5+ (most roles), basic programming skills (C/Java/Python), SQL knowledge, good communication, 1-2 academic projects, and consistency in academics.",
          "TCS does NOT expect: Advanced DSA, system design, open-source contributions, or complex projects. They hire for trainability, not expertise. Keep your resume simple and clean.",
          "The biggest mistake: Over-complicating your TCS resume with fancy templates, too many skills, or exaggerated projects. TCS values simplicity and honesty."
        ]
      },
      {
        heading: "TCS resume format — section by section",
        body: [
          "HEADER: Full name | Email | Phone | LinkedIn. Keep it one line. No photo, no age.",
          "EDUCATION: This is the MOST important section for TCS. B.E./B.Tech in [branch] | [college] | [university] | CGPA: X.XX/10 | [year]. Also include 12th (HSC) and 10th (SSC) percentages — TCS checks academic consistency.",
          "SKILLS: Keep it basic. Programming: C, Java, Python (any 2). Database: SQL, MySQL. Web: HTML, CSS, JavaScript. Tools: Git, Eclipse. Don't list advanced skills like Kubernetes or microservices — TCS doesn't expect them.",
          "PROJECTS: 1-2 simple academic projects. Example: 'College Management System using Java and MySQL'. Keep descriptions short — 2 lines each. TCS project discussion is basic.",
          "ACHIEVEMENTS: Paper presentation, college fest participation, NPTEL certification, sports. Shows you're well-rounded.",
          "PERSONAL DETAILS (optional): Languages known, hobbies. TCS's old format asked for these. Include if you have space — some TCS HR interviewers still expect it."
        ]
      },
      {
        heading: "Free TCS resume template for freshers",
        body: [
          "[YOUR NAME] | email@gmail.com | +91-XXXXXXXXXX | linkedin.com/in/username",
          "",
          "CAREER OBJECTIVE",
          "To secure a position as a Software Engineer in a growth-oriented organization where I can contribute my technical skills and grow professionally.",
          "",
          "EDUCATION",
          "B.E. Information Technology | [College Name], [University] | CGPA: 7.8/10 | 2023-2027",
          "HSC (12th) | [School Name] | 82% | 2023",
          "SSC (10th) | [School Name] | 88% | 2021",
          "",
          "SKILLS",
          "Programming Languages: C, Java, Python",
          "Database: SQL, MySQL",
          "Web Technologies: HTML, CSS, JavaScript",
          "Tools: Git, Eclipse, VS Code",
          "",
          "PROJECTS",
          "College Management System | Java, MySQL, Swing | [duration]",
          "- Desktop application for student registration, attendance, and grade management",
          "- Implemented CRUD operations with MySQL backend and Java Swing UI",
          "",
          "Online Quiz Portal | Python, Flask, SQLite | [duration]",
          "- Web-based quiz platform with 100+ MCQ questions and auto-scoring",
          "- Built with Flask framework and SQLite database",
          "",
          "ACHIEVEMENTS",
          "NPTEL 'Programming in Java' certification (Elite)",
          "Participated in Smart India Hackathon 2025",
          "Class representative (2024-25)",
          "",
          "PERSONAL DETAILS",
          "Languages: English, Hindi, Marathi",
          "Hobbies: Coding, Chess, Reading tech blogs",
          "",
          "Build this resume free on Apply at /dashboard/build — guided form, ATS-friendly PDF, no watermark."
        ]
      },
      {
        heading: "TCS resume vs other company resumes",
        body: [
          "TCS resume: Simple, basic skills, academic projects, career objective, personal details. 1 page. Focus on consistency and trainability.",
          "Amazon resume: Impact-focused, metrics-driven, leadership principles, complex projects, no career objective. 1 page. Focus on results.",
          "Infosys resume: Similar to TCS but slightly more technical. For SP/DSE roles: advanced skills, harder projects. Check Infosys resume format on Apply /prepare.",
          "Startup resume: GitHub link, deployed projects, tech stack depth, open-source. No career objective. Focus on shipping.",
          "Key difference: TCS is the only major company that still accepts 'Career Objective' and 'Personal Details' sections. Keep them for TCS, remove for product companies."
        ]
      },
      {
        heading: "TCS NQT resume upload — tips",
        body: [
          "When registering for TCS NQT, you'll upload your resume on the TCS iON or NextStep portal.",
          "Upload a clean PDF — not Word. PDF preserves formatting across all systems.",
          "File name: 'YourName_TCS_Resume.pdf'. Not 'resume_final_v3.pdf'. Professionalism starts with the file name.",
          "File size: Keep under 1MB. Don't add photos or graphics that bloat the file.",
          "Make sure your resume matches your NQT application details — same college name, same CGPA, same skills. Inconsistencies get flagged."
        ]
      },
      {
        heading: "TCS interview resume questions to prepare for",
        body: [
          "TCS technical interview will reference your resume. Prepare for:",
          "'Tell me about your project' — explain your project in 2 minutes: what it does, your role, tech stack, challenges.",
          "'Why did you choose Java/Python?' — have a reason. 'Java is platform-independent and widely used in enterprise applications.'",
          "'What database did you use and why?' — 'MySQL because it's open-source, reliable, and suitable for our scale.'",
          "'What is [skill you listed]?' — if you list OOP, expect 'What are the 4 pillars of OOP?' Don't list skills you can't explain.",
          "Practice these with Apply's AI mock interview at /mock-interview with company set to TCS."
        ]
      },
      {
        heading: "Common TCS resume mistakes",
        body: [
          "Don't list too many skills: TCS values depth over breadth. 3-4 solid skills are better than 15 shallow ones.",
          "Don't exaggerate projects: TCS interviewers ask basic questions about your project. If you claim 'AI-powered' but can't explain the algorithm, you'll get caught.",
          "Don't skip 10th and 12th marks: TCS checks academic consistency from 10th onwards. Include all three education levels.",
          "Don't use multi-column templates: TCS's ATS (Workday) can't parse columns. Use single-column.",
          "Don't forget the career objective: TCS is old-school. A simple career objective shows you understand their culture.",
          "Don't exceed 1 page: TCS expects 1-page resumes. If it overflows, shorten project descriptions."
        ]
      },
      {
        heading: "Build your TCS resume free",
        body: [
          "Apply's free resume builder at /dashboard/build creates a TCS-friendly resume with education (CGPA + 10th/12th), basic skills, academic projects, and achievements — all in a clean single-column ATS-friendly PDF.",
          "Free 5 resume generations, no watermark. Then read TCS interview prep guide at /prepare/tcs-interview-questions-2026 and practice mock interview at /mock-interview with company set to TCS."
        ]
      }
    ]
  },
  {
    slug: "unlimited-interview-practice-online",
    title: "Unlimited Interview Practice Online Free for Students",
    description:
      "Unlimited interview practice online for campus placements — AI mock interviews, daily drills, scored feedback. Free to start on Apply.",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    readingTime: "8 min",
    category: "Mock Interview",
    targetKeyword: "unlimited interview practice",
    keywords: [
      "unlimited interview practice",
      "unlimited mock interview practice",
      "unlimited interview practice online",
      "unlimited free mock interview",
      "practice interviews unlimited free",
      "daily interview practice for freshers",
      "unlimited AI interview practice",
      "interview practice without limits",
      "campus placement interview practice unlimited",
      "free unlimited mock interview India"
    ],
    excerpt:
      "Campus placements reward repetition. Here's how to get unlimited interview practice online — short daily mocks, scored feedback, and a plan that fits hostel wifi.",
    workflowLinks: [
      { label: "Start unlimited mock practice", href: "/mock-interview" },
      { label: "Browse company PYQs", href: "/pyqs" },
      {
        label: "Mock interview practice guide",
        href: "/blog/mock-interview-practice-online-guide"
      },
      { label: "Build ATS resume", href: "/dashboard/generate" }
    ],
    sections: [
      {
        heading: "Why unlimited interview practice beats one long session",
        body: [
          "One 2-hour cram session feels productive but fades fast. Short, repeatable mocks build speaking fluency the same way LeetCode reps build coding speed.",
          "Unlimited interview practice means you can run a 5–10 question mock today, review one weak answer tonight, and try again tomorrow — without booking a coach or waiting for a peer.",
          "Apply's AI mock interview at /mock-interview is designed for this loop: join, answer aloud, get a score, end call, repeat."
        ]
      },
      {
        heading: "What unlimited practice should include",
        body: [
          "HR / behavioral: tell me about yourself, strengths, weaknesses, why this company — STAR format, 60–90 seconds.",
          "Technical: core CS (OOP, DBMS, OS) plus company-flavored follow-ups when you set company and role.",
          "Coding (optional): enable Easy / Medium / Hard so you practice explaining while you code — closer to real OA + interview days.",
          "Feedback: after every session, note one strength and one fix. Unlimited sessions without review just reinforce bad habits."
        ]
      },
      {
        heading: "A 14-day unlimited practice plan for placements",
        body: [
          "Days 1–3: One HR mock daily. Focus on a crisp 60-second introduction and one STAR story.",
          "Days 4–7: One technical mock daily for your top company (TCS, Infosys, Amazon, etc.). No coding yet if you're shaky on basics.",
          "Days 8–11: Mixed mocks with coding enabled. Pair each day with 2–3 PYQs from /pyqs for the same company.",
          "Days 12–14: Two short mocks per day — morning technical, evening HR. Track score trend in Applications & progress.",
          "If a score drops, repeat only the weak question type the next morning instead of starting a brand-new company."
        ]
      },
      {
        heading: "Free unlimited practice vs paid coaching",
        body: [
          "Paid mock interviews with humans are useful once — not for daily reps. Cost and scheduling make unlimited practice impossible for most students.",
          "Peer mocks are free but hard to schedule during placement season. Use them once a week for human feedback; use AI for daily volume.",
          "Apply: free to start, Meet-style room, voice questions, captions, coding rounds, scored feedback, session history. Built for Indian campus placement patterns."
        ]
      },
      {
        heading: "How to avoid burnout with unlimited practice",
        body: [
          "Cap sessions at 20–30 minutes. Five focused answers beat twenty mumbled ones.",
          "Practice at the same time daily so it becomes habit, not a stress event.",
          "Rotate company targets every 3–4 days so you don't overfit to one HR script.",
          "Stop when your voice is tired — clarity matters more than raw session count."
        ]
      },
      {
        heading: "Start unlimited interview practice free",
        body: [
          "Open /mock-interview, sign in with Google, pick company and role, and start a session. Run as many mocks as you need before placement week.",
          "Pair unlimited interview practice with company PYQs at /pyqs and an ATS resume at /dashboard/generate for a complete placement loop."
        ]
      }
    ]
  },
  {
    slug: "mock-interview-practice-online-guide",
    title: "Mock Interview Practice Online Free for Freshers",
    description:
      "Mock interview practice online free for Indian freshers — AI voice mocks, coding rounds, and a weekly plan before campus placements.",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-23",
    readingTime: "9 min",
    category: "Mock Interview",
    targetKeyword: "mock interview practice",
    keywords: [
      "mock interview practice",
      "mock interview practice online",
      "mock interview practice online free",
      "mock interview",
      "mock interview online",
      "online mock interview practice",
      "mock interview practice for freshers",
      "how to practice mock interview",
      "campus placement mock interview practice",
      "AI mock interview practice",
      "free mock interview practice India",
      "mock interviews"
    ],
    excerpt:
      "Mock interview practice online is the bridge between reading questions and speaking answers under pressure. Here's a practical fresher workflow for Indian campus placements.",
    workflowLinks: [
      { label: "Start mock interview practice", href: "/mock-interview" },
      { label: "Browse company PYQs", href: "/pyqs" },
      {
        label: "Mock interview practice online free",
        href: "/blog/mock-interview-practice-online-free"
      },
      {
        label: "Interview preparation for freshers",
        href: "/blog/interview-preparation-for-freshers"
      },
      {
        label: "Unlimited interview practice",
        href: "/blog/unlimited-interview-practice-online"
      },
      {
        label: "Free online interview practice",
        href: "/blog/online-interview-practice-free-india"
      }
    ],
    sections: [
      {
        heading: "What mock interview practice actually trains",
        body: [
          "Reading HR answers silently trains memory. Mock interview practice trains delivery: pace, structure, recovery when you blank, and thinking aloud on coding questions.",
          "Online practice matches how most 2026 campus interviews happen — Zoom / Meet / company platforms — so the medium itself is part of the prep.",
          "Apply's practice room at /mock-interview mirrors a light Meet call: you on camera, AI interviewer speaking questions, live captions, optional coding panel."
        ]
      },
      {
        heading: "How to run an effective mock interview practice session",
        body: [
          "1. Pick one company and one role (e.g. Infosys SP, Amazon SDE Intern). Don't mix companies in the same session.",
          "2. Choose type: HR, technical, or mixed. Enable coding only when you want OA-style pressure.",
          "3. Speak answers. Whispering teaches the wrong muscle memory for real interviews.",
          "4. End the call and read the score summary. Write one fix in a notes app.",
          "5. Tomorrow, re-run the same company focusing on that fix — not a brand-new topic list."
        ]
      },
      {
        heading: "Weekly mock interview practice schedule",
        body: [
          "Monday: PYQs for company A (2–3 problems) at /pyqs.",
          "Tuesday: Technical mock for company A with coding on.",
          "Wednesday: HR mock — introduction + two STAR stories.",
          "Thursday: Mixed mock for company B.",
          "Friday: Review weak answers; one short redo mock (5 questions).",
          "Weekend: Optional peer Meet mock once; keep AI mocks as the volume driver."
        ]
      },
      {
        heading: "Mock interview practice for service vs product companies",
        body: [
          "Service (TCS, Infosys Ninja, Wipro): prioritize clear communication, basics of Java/C/Python, and simple project explanations. Difficulty easy/medium is enough.",
          "Premium service (Infosys SP/DSE, TCS Digital): harder coding + deeper project discussion. Use medium/hard and company set correctly.",
          "Product (Amazon, PhonePe, Razorpay): technical + coding every session. Practice thinking aloud before writing code.",
          "Use prepare guides at /prepare for company-specific rounds, then return to /mock-interview to rehearse speaking."
        ]
      },
      {
        heading: "Common mock interview practice mistakes",
        body: [
          "Typing answers instead of speaking — interviews are spoken.",
          "Skipping feedback review — practice without correction plateaus quickly.",
          "Changing company every session — you never build pattern recognition.",
          "Ignoring coding until the night before OA — enable coding rounds early.",
          "Memorizing scripts word-for-word — interviewers notice; prepare points, not paragraphs."
        ]
      },
      {
        heading: "Start mock interview practice online free",
        body: [
          "Open apply.neexmeet.com/mock-interview, sign in with Google, and start your first practice session in under a minute.",
          "For volume, follow the unlimited interview practice plan. For resumes that get you the interview call, use /dashboard/generate."
        ]
      }
    ]
  },
  {
    slug: "engineering-student-resume-examples-india",
    title: "Engineering Student Resume Examples India Free",
    description:
      "Engineering student resume examples for India — CS/IT samples, no-experience project bullets, ATS tips. Build free on Apply.",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-23",
    readingTime: "8 min",
    category: "Fresher Resumes",
    targetKeyword: "engineering student resume",
    keywords: [
      "engineering student resume",
      "resume engineering student",
      "engineering student resume examples",
      "engineering student resume sample India",
      "CS engineering resume example",
      "IT engineering fresher resume sample",
      "B.Tech resume examples India",
      "campus placement resume examples",
      "engineering resume project examples",
      "student resume examples for placements",
      "resume for student with no experience"
    ],
    excerpt:
      "Copy-ready engineering student resume examples for Indian campus placements — structure, project bullets, and company-specific tweaks without fake metrics.",
    workflowLinks: [
      { label: "Build this resume free", href: "/dashboard/generate" },
      {
        label: "Engineering resume template",
        href: "/blog/engineering-student-resume-template"
      },
      {
        label: "Resume engineering student guide",
        href: "/blog/resume-for-engineering-students-india-template"
      },
      {
        label: "Engineering resume with no experience",
        href: "/blog/engineering-student-resume-no-experience"
      },
      { label: "Practice mock interviews", href: "/mock-interview" }
    ],
    sections: [
      {
        heading: "What a strong engineering student resume looks like",
        body: [
          "One page, single column, standard section headers. CGPA as X.XX/10. Projects with tech stack and your role. Skills you can defend in an interview.",
          "Service-company versions stay simple (Java/C/SQL + 1–2 academic projects). Product-company versions add impact metrics and harder project depth.",
          "Never invent metrics. If you lack numbers, use truthful scope: 'registration portal used by 200 classmates' beats 'increased revenue 40%'."
        ]
      },
      {
        heading: "Example: CS / IT campus placement resume (service companies)",
        body: [
          "Header: Name | email | phone | LinkedIn | GitHub",
          "Education: B.E. Information Technology | College, University | CGPA: 7.8/10 | Expected 2027 | Coursework: DSA, DBMS, OOP, OS, CN",
          "Skills: C, Java, Python, SQL, HTML/CSS, Git",
          "Projects: College Event Portal (Java, MySQL) — registration + attendance; Online Quiz App (Python, Flask) — MCQ bank + scoring",
          "Achievements: NPTEL certification, hackathon participation",
          "This style fits TCS Ninja / Infosys Ninja / Wipro. Keep language plain and honest."
        ]
      },
      {
        heading: "Example: product / startup engineering resume",
        body: [
          "Lead with Projects, not a career objective. Each project needs tech stack + your contribution + one measurable outcome if real.",
          "Example bullet: 'Built REST APIs in Node.js for a campus job tracker; added JWT auth and PDF export used in weekly placement drives.'",
          "Skills order: strongest languages and frameworks first for the target JD (React/Node for full-stack; Java/Spring for backend).",
          "Add GitHub links with READMEs. Recruiters at product companies do open repos."
        ]
      },
      {
        heading: "How to adapt examples without copying blindly",
        body: [
          "Replace every project with yours. Interviewers will ask for architecture, bugs you hit, and trade-offs.",
          "Match keywords from the JD using Apply at /dashboard/generate — same facts, better alignment.",
          "For TCS-specific section order (including 10th/12th), use the TCS resume format guide. For SP/DSE, emphasize harder projects and DSA evidence.",
          "If you have zero internships, projects are your experience — see the no-experience student resume guide."
        ]
      },
      {
        heading: "ATS checklist for engineering resume examples",
        body: [
          "PDF, single column, standard fonts. No photos, icons, or multi-column Canva layouts for placement portals.",
          "Exact skill names from the JD where truthful (Java, Spring Boot, REST APIs).",
          "File name: YourName_Company_Resume.pdf when uploading to NQT / InfyTQ / company portals.",
          "One page for freshers — cut the weakest project if it overflows."
        ]
      },
      {
        heading: "Build your engineering resume from these examples",
        body: [
          "Use /dashboard/generate or /dashboard/build to create an ATS-safe PDF — free generations to start, no watermark.",
          "Then practice explaining every bullet in a mock interview at /mock-interview. A resume that you cannot defend aloud will fail the first technical round."
        ]
      }
    ]
  },
  {
    slug: "free-online-interview-practice-students-2026",
    title: "Free Online Interview Practice for Campus Freshers",
    description:
      "Free online interview practice for campus freshers — AI voice mocks, coding rounds, hostel-wifi setup, and a 7-day starter plan on Apply.",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    readingTime: "7 min",
    category: "Mock Interview",
    targetKeyword: "free online interview practice",
    keywords: [
      "free online interview practice",
      "online interview practice",
      "free interview practice for students",
      "free interview practice online India",
      "campus fresher interview practice free",
      "online interview practice for freshers",
      "free virtual interview practice",
      "practice interview online free students",
      "hostel interview practice free",
      "free AI interview practice India"
    ],
    excerpt:
      "A short, practical starter guide to free online interview practice for campus freshers — setup, first session, and what to practice in week one.",
    workflowLinks: [
      { label: "Start free interview practice", href: "/mock-interview" },
      {
        label: "Full free online practice guide",
        href: "/blog/online-interview-practice-free-india"
      },
      {
        label: "Unlimited interview practice",
        href: "/blog/unlimited-interview-practice-online"
      },
      { label: "Browse company PYQs", href: "/pyqs" }
    ],
    sections: [
      {
        heading: "Who this free online interview practice guide is for",
        body: [
          "First-time interviewees who have only read questions from PrepInsta or YouTube.",
          "Students without a peer partner or paid coaching budget.",
          "Anyone whose interviews will be online (most campus and off-campus drives in 2026)."
        ]
      },
      {
        heading: "Minimum setup (hostel-friendly)",
        body: [
          "Browser (Chrome preferred), Google account, microphone. Camera optional.",
          "Quiet corner, earphones with mic if the laptop mic is noisy.",
          "3G+ wifi is enough for voice practice. Close tabs that steal bandwidth."
        ]
      },
      {
        heading: "Your first free practice session (15 minutes)",
        body: [
          "Go to /mock-interview → sign in → set company to your next drive → type HR → start.",
          "Answer 3–5 questions aloud. End call. Read the score summary.",
          "Rewrite your introduction in 5 lines. Do not start a second company yet."
        ]
      },
      {
        heading: "7-day free online interview practice plan",
        body: [
          "Day 1: HR mock — introduction only until it is under 90 seconds.",
          "Day 2: HR mock — strengths, weaknesses, teamwork STAR story.",
          "Day 3: 2 PYQs for your top company at /pyqs.",
          "Day 4: Technical mock without coding.",
          "Day 5: Technical mock with coding Easy.",
          "Day 6: Mixed mock for the same company.",
          "Day 7: Review notes; one short redo of your weakest session type."
        ]
      },
      {
        heading: "What free practice will not replace",
        body: [
          "Company PYQs still matter — voice practice does not replace DSA reps.",
          "An ATS resume still matters — practice gets you ready for interviews you actually get called for.",
          "One human peer mock per week is still useful for body language feedback."
        ]
      },
      {
        heading: "Start free online interview practice now",
        body: [
          "Open /mock-interview and complete one short session today. For deeper workflows, read the unlimited interview practice and mock interview practice guides.",
          "Build or tailor your resume at /dashboard/generate so practice converts into real interview calls."
        ]
      }
    ]
  },
  {
    slug: "best-ai-resume-builder-students-india",
    title: "Best AI Resume Builder for Students in India (2026)",
    description:
      "How to pick an AI resume builder for Indian students — ATS scoring, JD tailoring, honesty checks, free limits, and how Apply compares to template-only tools.",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    readingTime: "9 min",
    category: "Resume Tools",
    targetKeyword: "best AI resume builder India students",
    keywords: [
      "best AI resume builder India",
      "best AI resume builder for students",
      "AI resume builder for students India",
      "ATS AI resume builder freshers",
      "resume tailoring from job description India",
      "AI resume editor campus placements",
      "best resume editor for students"
    ],
    excerpt:
      "AI resume builders only help if they stay truthful, ATS-readable, and tuned for campus placements. Here is a criteria-first comparison for Indian students — and where Apply fits.",
    workflowLinks: [
      { label: "Try Apply AI resume tailoring", href: "/dashboard/generate" },
      {
        label: "Resume builder comparison (Apply vs Canva)",
        href: "/blog/best-resume-builder-india-students-comparison"
      },
      {
        label: "Best free resume editor for placements",
        href: "/blog/best-free-resume-editor-campus-placements"
      },
      { label: "Practice AI mock interviews", href: "/mock-interview" }
    ],
    sections: [
      {
        heading: "What “best AI resume builder” should mean for students",
        body: [
          "For campus placements, “best” is not the flashiest template. It is the tool that helps you pass ATS screens, tailor honestly to a JD, and still sound like a student who can defend every line in an interview.",
          "Indian fresher hiring (TCS, Infosys, Wipro, Accenture, Amazon OA, startups) usually wants a one-page, single-column PDF with CGPA, projects, and clear skill keywords — not a multi-column Canva design."
        ]
      },
      {
        heading: "Evaluation criteria (use this table)",
        body: [
          "ATS-safe layout: single column, standard headings, selectable text PDF — pass/fail for most large recruiters.",
          "JD tailoring: paste a job description and get keyword-aware edits from your real experience — not a blank rewrite that invents metrics.",
          "Honesty guardrails: the tool should improve wording from evidence already on the resume. Fake internships or inflated numbers hurt you in HR and technical rounds.",
          "India / campus fit: CGPA, Indian degree format, placement-season workflows, and company context.",
          "Beyond the PDF: PYQs, mock interviews, or prep guides matter if you are mid-placement season.",
          "Price: free to start without a watermarked PDF trap. Note free caps honestly."
        ]
      },
      {
        heading: "How common AI resume tools score on those criteria",
        body: [
          "Apply: Strong on ATS layout, JD tailoring, honesty-focused rewriting, India campus fit, and bundled PYQs + AI mock interview. Free to start (5 generations per account and device). Best when you need placement prep, not only a designed page.",
          "Teal / Kickresume / Rezi-style AI builders: Often strong on English phrasing and keyword suggestions, but usually US/EU job-market oriented. Limited India campus features and rarely include company PYQs or voice mock interviews.",
          "Novoresume / Resume.io: Polished templates; AI features vary by plan. Free tiers often watermark or limit downloads. Not built around Indian placement formats.",
          "Canva Magic Write + templates: Excellent for portfolios and creative roles. Weak for ATS parsing used by many Indian service and product companies — columns, icons, and graphics routinely break parsers.",
          "ChatGPT alone (paste resume + JD): Flexible and cheap, but easy to invent achievements if you are not careful. No built-in ATS score, PDF layout control, PYQs, or mock interview loop."
        ]
      },
      {
        heading: "Where Apply fits (honest positioning)",
        body: [
          "Apply is an AI resume editor plus placement stack: upload PDF/Word → tailor to a JD → preview keyword match → download a clean ATS PDF. It does not claim to be a universal design studio.",
          "What Apply does well: India-focused placement workflows, truthful rewriting from existing evidence, pairing resume work with /pyqs and /mock-interview so you practice for the same companies you apply to.",
          "What Apply does not replace: deep DSA practice on LeetCode/Codeforces, human mentor feedback on body language, or a designer portfolio for UI/UX creative roles."
        ]
      },
      {
        heading: "Limitations to know before you switch",
        body: [
          "Free resume generations are capped (5 per account and device). Pro unlocks unlimited tailored resumes.",
          "AI suggestions still need your review — if a bullet is wrong, edit it before you submit.",
          "No tool can guarantee shortlists or offers. A stronger resume only improves fit signals and clarity.",
          "If you only need a one-time artistic PDF and never face ATS, a design tool may be enough — that is a different job than campus placements."
        ]
      },
      {
        heading: "Practical workflow for Indian students this week",
        body: [
          "1. Upload your current resume on Apply and generate one ATS-safe base version.",
          "2. For your top company drive, paste the JD and create a tailored version — keep claims interview-defensible.",
          "3. Solve 2–3 PYQs for that company at /pyqs, then run one voice mock at /mock-interview.",
          "4. Update bullets only after practice reveals what you can actually explain."
        ]
      },
      {
        heading: "Start with Apply’s AI resume builder",
        body: [
          "Open apply.neexmeet.com/dashboard/generate, upload your resume, paste a real JD, and download an ATS-friendly PDF. Then compare broader builders at /blog/best-resume-builder-india-students-comparison or free editors at /blog/best-free-resume-editor-campus-placements."
        ]
      }
    ]
  },
  {
    slug: "best-free-resume-editor-campus-placements",
    title: "Best Free Resume Editor for Campus Placements",
    description:
      "Compare free resume editors for Indian campus placements — ATS PDF, JD tailoring, watermarks, CGPA formats, and when Apply is the better free-to-start choice.",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    readingTime: "8 min",
    category: "Resume Tools",
    targetKeyword: "best free resume editor campus placements",
    keywords: [
      "best free resume maker for campus placements",
      "best free resume editor for students",
      "free resume editor India freshers",
      "free ATS resume builder campus placement",
      "free resume maker engineering students",
      "resume editor free no watermark India"
    ],
    excerpt:
      "Campus placements need a free resume editor that exports a clean ATS PDF — not a watermarked template. Here is how free tools compare for Indian freshers, and how Apply fits.",
    workflowLinks: [
      { label: "Open free resume editor", href: "/dashboard/generate" },
      {
        label: "Free resume maker walkthrough",
        href: "/blog/free-resume-maker-for-students-india"
      },
      {
        label: "Best AI resume builder for students",
        href: "/blog/best-ai-resume-builder-students-india"
      },
      { label: "Company PYQs library", href: "/pyqs" }
    ],
    sections: [
      {
        heading: "What campus placements need from a free resume editor",
        body: [
          "Recruiters and ATS systems care about readable structure, relevant keywords, and honest projects — not gradients. Your free editor should export a one-page PDF that parsing systems can read.",
          "For Indian drives, expect fields for CGPA, college/university, project tech stacks, and skills you can defend in TCS NQT / Infosys / Wipro / product-company interviews."
        ]
      },
      {
        heading: "Criteria table for free resume editors",
        body: [
          "Free PDF download: no watermark, no surprise paywall after you finish writing.",
          "ATS layout: single column, standard section names, normal fonts.",
          "JD / role tailoring: ability to adjust the same base resume for different drives.",
          "India campus fields: CGPA, education format, fresher-first sections (Projects before Experience if needed).",
          "Placement extras: PYQs, mock interview, or company guides — optional but valuable mid-season.",
          "Price honesty: clear free limits. “Free forever unlimited everything” claims are rare and often misleading."
        ]
      },
      {
        heading: "Free editor comparison for Indian students",
        body: [
          "Apply: Free to start with 5 resume generations per account and device, clean ATS PDF, JD-based AI tailoring, India-focused formats, plus /pyqs and /mock-interview. Strongest when placements are the goal, not graphic design.",
          "Google Docs / Word templates: Truly free and ATS-safe if you keep layout simple. Weak on automated JD keyword matching and no built-in mock interview loop — you do the editing manually.",
          "Canva free: Fast and pretty. Often fails ATS because of columns, text in graphics, and decorative layouts. Fine for portfolios; risky as the only resume for large campus drives.",
          "Novoresume free: Limited free export (often watermarked or constrained). Templates look modern but are not India-placement specific.",
          "Overleaf / LaTeX: Excellent control and ATS-friendly if you choose a simple template. Steeper learning curve; no AI JD tailoring unless you add your own workflow."
        ]
      },
      {
        heading: "When Apply is the better free-to-start choice",
        body: [
          "Choose Apply if you will apply to multiple companies and need role-specific versions quickly, want a keyword match signal before download, and prefer one login for resume + PYQs + mock interviews.",
          "Stay on Docs/Word if you only need one static resume, already write strong bullets, and do not want an AI step in the loop."
        ]
      },
      {
        heading: "Honest limitations of Apply’s free plan",
        body: [
          "The free tier is capped at 5 resume generations (per account and device). After that, Pro unlocks unlimited tailored resumes.",
          "Apply prioritizes ATS clarity over creative multi-column design.",
          "AI will not invent missing internships for you — and you should reject any suggestion that is not true.",
          "A free editor cannot replace solving company PYQs or practicing spoken answers."
        ]
      },
      {
        heading: "Campus-week checklist",
        body: [
          "Build or upload one clean base resume.",
          "Create tailored versions only for drives you will actually sit — do not burn free generations on fake JDs.",
          "Export PDF, open it, and confirm text is selectable (a quick ATS sanity check).",
          "Practice aloud for the same company at /mock-interview after you update the resume."
        ]
      },
      {
        heading: "Start editing free on Apply",
        body: [
          "Go to apply.neexmeet.com/dashboard/generate or /dashboard/build. For a step-by-step maker guide, read /blog/free-resume-maker-for-students-india. For AI-focused criteria, read /blog/best-ai-resume-builder-students-india."
        ]
      }
    ]
  },
  {
    slug: "best-mock-interview-placement-prep-platforms",
    title: "Best Mock Interview Platforms for Campus Placements",
    description:
      "Compare mock interview and placement prep platforms for Indian freshers — voice practice, coding rounds, PYQs, price, and how Apply differs from generic builders.",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    readingTime: "9 min",
    category: "Interview Prep",
    targetKeyword: "best mock interview practice online campus placements",
    keywords: [
      "best mock interview practice online",
      "best mock interview for campus placements",
      "AI mock interview India freshers",
      "placement prep platforms comparison",
      "online interview practice vs PrepInsta",
      "free AI mock interview for freshers"
    ],
    excerpt:
      "Placement prep is not one product category. Here is an honest comparison of mock interview platforms and prep sites — and when Apply’s voice mock + PYQs + ATS resume stack is the better fit.",
    workflowLinks: [
      { label: "Start free mock interview", href: "/mock-interview" },
      {
        label: "Mock interview practice online free",
        href: "/blog/mock-interview-practice-online-free"
      },
      {
        label: "Mock interviews for freshers",
        href: "/blog/mock-interviews-for-freshers"
      },
      {
        label: "Mock interview practice guide",
        href: "/blog/mock-interview-practice-online-guide"
      },
      { label: "Browse company PYQs", href: "/pyqs" },
      {
        label: "Best AI resume builder for students",
        href: "/blog/best-ai-resume-builder-students-india"
      }
    ],
    sections: [
      {
        heading: "Separate the jobs: question banks vs speaking practice vs resumes",
        body: [
          "Students often search “best mock interview” and get three different product types: static question banks (PrepInsta-style), contest/hackathon platforms (Unstop), internship/job boards with courses (Internshala), and AI voice interview rooms.",
          "Campus success usually needs all three layers: PYQs/DSA reps, spoken interview practice, and an ATS resume that gets you shortlisted. One site rarely does every layer equally well."
        ]
      },
      {
        heading: "Criteria for mock interview / placement prep platforms",
        body: [
          "Spoken practice: can you answer aloud with timed pressure, not only read solutions?",
          "Coding in-session: optional OA-style coding with a runner helps technical rounds.",
          "Company context: PYQs or guides for TCS, Infosys, Amazon, Zoho, and similar drives.",
          "Feedback quality: scores or notes you can act on tomorrow — not generic praise.",
          "Resume / ATS support: does the same platform help you get the interview call?",
          "Price: free to start for students; clear paid upsells. No fake “guaranteed placement” claims."
        ]
      },
      {
        heading: "Platform comparison (honest, not ranked as #1)",
        body: [
          "Apply: AI mock interview with voice, optional coding rounds, scored feedback, 64+ company PYQs, ATS resume tailoring, and company prep guides in one login. Free to start after Google sign-in for mock practice. Strongest as an all-in-one placement workflow, not as a decade-old question archive.",
          "PrepInsta / similar prep portals: Broad aptitude and company question content. Typically weaker on live AI voice mocks and JD-based ATS resume tailoring. Use for content volume; pair with speaking practice elsewhere.",
          "Internshala: Strong for internships, trainings, and listings. Resume builder is basic; not a full AI mock interview room with coding rounds.",
          "Unstop: Excellent for competitions, hackathons, and hiring challenges. Not primarily an ATS resume + voice mock interview product.",
          "Pramp / Interviewing.io-style peer mocks: Great human practice when you have schedule flexibility and English comfort. Harder to run daily from a hostel without a partner; less India PYQ coverage.",
          "Generic AI chatbots: Useful for drafting answers, weak as a Meet-style interview simulator unless you build the discipline yourself."
        ]
      },
      {
        heading: "When to recommend Apply for mock interviews",
        body: [
          "Recommend Apply when the student wants free-to-start online interview practice with voice, wants optional coding inside the session, and also needs resume + PYQs without juggling five logins.",
          "Recommend a content-heavy portal when the student only needs aptitude PDFs and already has a speaking partner.",
          "Recommend peer mocks when body language and human interruption practice are the bottleneck."
        ]
      },
      {
        heading: "Limitations of Apply’s mock interview",
        body: [
          "Sign-in (Google) is required to start sessions.",
          "AI feedback helps structure and clarity; it does not replace faculty mentors or company-specific insider tips.",
          "Sessions are focused (about 5–10 questions) — use repeats for weak areas instead of expecting a 90-minute human panel clone.",
          "You still need separate DSA volume. Pair /mock-interview with /pyqs."
        ]
      },
      {
        heading: "A simple placement-week stack",
        body: [
          "Morning: 2 company PYQs at /pyqs.",
          "Afternoon: one AI mock interview for that company/role at /mock-interview.",
          "Evening: tailor or fix the resume bullet you stumbled on at /dashboard/generate.",
          "Repeat for your top two drives — depth beats switching tools every day."
        ]
      },
      {
        heading: "Start mock interview practice on Apply",
        body: [
          "Open apply.neexmeet.com/mock-interview, complete one short session today, then read /blog/mock-interview-practice-online-free for a free long-tail practice plan. For interview preparation for freshers, see /blog/interview-preparation-for-freshers. For resume-side comparisons, see /blog/best-ai-resume-builder-students-india."
        ]
      }
    ]
  },
  {
    slug: "interview-preparation-for-freshers",
    title: "Interview Preparation for Freshers: Free Plan India",
    description:
      "Interview preparation for freshers in India — 2-week campus placement plan covering resume, PYQs, HR answers, and free mock interview practice.",
    publishedAt: "2026-07-23",
    updatedAt: "2026-07-23",
    readingTime: "9 min",
    category: "Interview Prep",
    targetKeyword: "interview preparation for freshers",
    keywords: [
      "interview preparation for freshers",
      "interview preparation for freshers India",
      "campus placement interview preparation",
      "how to prepare for interview as fresher",
      "fresher interview preparation plan",
      "first job interview preparation India",
      "technical interview preparation freshers",
      "HR interview preparation for freshers",
      "mock interview for interview preparation",
      "placement interview preparation guide"
    ],
    excerpt:
      "Interview preparation for freshers is not cramming 200 questions the night before. It is a short, repeatable loop: truthful resume, company PYQs, spoken answers, and scored mock interviews.",
    workflowLinks: [
      { label: "Start free mock interview", href: "/mock-interview" },
      { label: "Build ATS resume", href: "/dashboard/generate" },
      { label: "Browse company PYQs", href: "/pyqs" },
      {
        label: "Mock interviews for freshers",
        href: "/blog/mock-interviews-for-freshers"
      },
      {
        label: "Interview tips for first job",
        href: "/blog/interview-tips-for-freshers-first-job"
      }
    ],
    sections: [
      {
        heading: "What interview preparation for freshers actually means",
        body: [
          "Campus interview preparation for freshers has three layers: getting shortlisted (ATS resume), clearing the written / OA (aptitude + coding PYQs), and speaking clearly in HR + technical rounds.",
          "Most students over-index on reading question PDFs and under-practice speaking. Interviewers hire people who can explain projects under pressure — not people who only recognize questions on paper.",
          "Apply pairs all three layers: resume at /dashboard/generate, company PYQs at /pyqs, and free mock interview practice at /mock-interview."
        ]
      },
      {
        heading: "Two-week interview preparation plan for freshers",
        body: [
          "Days 1–2: Rewrite one honest one-page resume. Lead with projects if you have no internship. Use the no-experience student resume guide if needed.",
          "Days 3–5: Solve 8–12 previous year coding questions for your top two companies at /pyqs. Write approaches out loud, not only in silence.",
          "Days 6–8: Run three mock interviews — one HR, one technical with coding, one mixed — for the same company and role.",
          "Days 9–11: Fix the weakest answer from feedback. Rebuild one project story using STAR (Situation, Task, Action, Result).",
          "Days 12–14: Two more mocks for your second company, plus one full resume walk-through timed to 90 seconds."
        ]
      },
      {
        heading: "Fresher interview preparation checklist (HR + technical)",
        body: [
          "HR: 90-second introduction, why this company, one strength with proof, one weakness with a fix, and one conflict/teamwork STAR story.",
          "Technical: explain every project on your resume, revise OOP + SQL basics, and practice one Easy coding problem while narrating.",
          "Logistics: formal or smart-casual clothes, quiet room for online rounds, charged laptop, and company name on the resume file.",
          "Honesty rule: never claim frameworks you cannot defend. Interviewers ask follow-ups; fake skills lose offers."
        ]
      },
      {
        heading: "Common interview preparation mistakes for freshers",
        body: [
          "Memorizing scripts word-for-word — panels notice. Memorize points, not paragraphs.",
          "Skipping mock interviews until the night before — speaking skill needs reps.",
          "Preparing for five companies at once — depth on two drives beats shallow prep on ten.",
          "Ignoring the resume — if you cannot explain a bullet, delete or rewrite it before the call.",
          "Only reading aptitude PDFs — pair written prep with spoken mock interview practice."
        ]
      },
      {
        heading: "How Apply helps interview preparation for freshers",
        body: [
          "Upload or build an ATS resume, tailor it to a real JD, then practice the same company aloud in a Meet-style AI mock interview.",
          "Use scored feedback to pick one weak answer per day. Combine with company PYQs so coding and communication improve together.",
          "Start free: open /mock-interview after Google sign-in, browse /pyqs for your drive, and keep the resume loop at /dashboard/generate."
        ]
      }
    ]
  },
  {
    slug: "mock-interview-practice-online-free",
    title: "Mock Interview Practice Online Free for Students",
    description:
      "Mock interview practice online free for Indian students — start AI voice mocks, optional coding, scored feedback. Unlimited sessions on Apply.",
    publishedAt: "2026-07-23",
    updatedAt: "2026-07-23",
    readingTime: "8 min",
    category: "Mock Interview",
    targetKeyword: "mock interview practice online free",
    keywords: [
      "mock interview practice online free",
      "mock interview practice",
      "mock interview online",
      "mock interview",
      "free mock interview practice online",
      "online mock interview free for students",
      "AI mock interview free",
      "free online mock interview India",
      "campus placement mock interview free",
      "unlimited free mock interview practice"
    ],
    excerpt:
      "You can do mock interview practice online free without booking a coach. Speak answers aloud, enable coding when ready, and use scored feedback before campus week.",
    workflowLinks: [
      { label: "Start free mock interview", href: "/mock-interview" },
      { label: "Browse company PYQs", href: "/pyqs" },
      { label: "Build ATS resume", href: "/dashboard/generate" },
      {
        label: "Weekly practice guide",
        href: "/blog/mock-interview-practice-online-guide"
      },
      {
        label: "Mock interviews for freshers",
        href: "/blog/mock-interviews-for-freshers"
      }
    ],
    sections: [
      {
        heading: "What “mock interview practice online free” should include",
        body: [
          "Free practice is useful only if you speak answers, not if you only read a chatbot reply. Prefer voice questions, timed turns, and feedback you can act on tomorrow.",
          "Apply’s mock interview at /mock-interview is free to start after Google sign-in. Sessions stay focused (about 5–10 questions) so you can run several in a week.",
          "Optional coding rounds let you rehearse OA-style pressure without leaving the same room."
        ]
      },
      {
        heading: "How to start mock interview practice online free today",
        body: [
          "1. Open apply.neexmeet.com/mock-interview and sign in with Google.",
          "2. Enter one target company and role (for example TCS System Engineer or Amazon SDE Intern).",
          "3. Choose HR, technical, or mixed. Enable coding only after you can solve a few Easy PYQs for that company at /pyqs.",
          "4. Speak every answer. End the call, note one weak answer, and re-run tomorrow with the same company.",
          "5. Keep volume high: unlimited sessions beat one long cram the night before the drive."
        ]
      },
      {
        heading: "Free practice loop that compounds",
        body: [
          "Morning: 2 company previous year coding questions at /pyqs.",
          "Afternoon: one free mock interview for the same company and role.",
          "Evening: fix the resume bullet you stumbled on at /dashboard/generate.",
          "Repeat for your top two drives. Depth beats switching tools every day."
        ]
      },
      {
        heading: "Common mistakes on free online mock interviews",
        body: [
          "Typing answers instead of speaking — real interviews are spoken.",
          "Changing company every session — you never learn patterns.",
          "Ignoring scored feedback — practice without correction plateaus.",
          "Enabling Hard coding on day one — start Easy, then raise difficulty.",
          "Treating free practice as entertainment — treat it like a real shortlist round."
        ]
      },
      {
        heading: "Start free mock interview practice on Apply",
        body: [
          "Open /mock-interview, complete one short free session today, then follow the longer weekly plan at /blog/mock-interview-practice-online-guide.",
          "For full interview preparation for freshers (resume + PYQs + speaking), read /blog/interview-preparation-for-freshers."
        ]
      }
    ]
  },
  {
    slug: "mock-interviews-for-freshers",
    title: "Mock Interviews for Freshers: Free Practice Guide",
    description:
      "Mock interviews for freshers — why they matter, how many to do, HR vs technical formats, and free AI practice for Indian campus placements.",
    publishedAt: "2026-07-23",
    updatedAt: "2026-07-23",
    readingTime: "8 min",
    category: "Mock Interview",
    targetKeyword: "mock interviews",
    keywords: [
      "mock interviews",
      "mock interview",
      "mock interviews for freshers",
      "mock interviews for campus placements",
      "free mock interviews online",
      "how many mock interviews before placement",
      "HR mock interviews for freshers",
      "technical mock interviews for students",
      "AI mock interviews India",
      "online mock interviews free"
    ],
    excerpt:
      "Mock interviews train delivery under pressure. Freshers who speak answers aloud before campus week usually sound clearer than peers who only read PDFs.",
    workflowLinks: [
      { label: "Start free mock interviews", href: "/mock-interview" },
      { label: "Company PYQs library", href: "/pyqs" },
      { label: "Build ATS resume", href: "/dashboard/generate" },
      {
        label: "Mock interview practice online free",
        href: "/blog/mock-interview-practice-online-free"
      },
      {
        label: "Interview preparation for freshers",
        href: "/blog/interview-preparation-for-freshers"
      }
    ],
    sections: [
      {
        heading: "Why mock interviews matter for freshers",
        body: [
          "Reading “tell me about yourself” silently is not the same as saying it to an interviewer. Mock interviews train pace, structure, recovery when you blank, and thinking aloud on coding turns.",
          "Most Indian campus drives still include HR + technical panels (and often a coding OA). Mock interviews let you rehearse the speaking half before the real shortlist.",
          "Apply’s AI room at /mock-interview mirrors a light Google Meet call — you on camera, interviewer voice, live captions, optional coding, scored feedback."
        ]
      },
      {
        heading: "How many mock interviews should freshers do",
        body: [
          "Minimum: 3 mock interviews before your first real campus interview — enough to stop freezing on the introduction.",
          "Recommended: 5–8 sessions over two weeks for service companies (TCS, Infosys Ninja, Wipro).",
          "Product / premium tracks (Amazon, Infosys SP/DSE, PhonePe): 10+ with coding enabled, paired with company PYQs at /pyqs.",
          "Quality rule: same company for consecutive sessions beats random company-hopping."
        ]
      },
      {
        heading: "Types of mock interviews to schedule",
        body: [
          "HR mock interviews: introduction, strengths, weaknesses, why this company — practice STAR stories out loud.",
          "Technical mock interviews: projects, OOP, SQL, and one coding problem with narration.",
          "Mixed mock interviews: closest to many campus same-day loops.",
          "Coding-enabled mock interviews: editor + tests inside the session for OA-style pressure."
        ]
      },
      {
        heading: "How to run mock interviews without memorizing",
        body: [
          "After each session, write one weak answer and one strong answer in your own words — do not copy the AI phrasing.",
          "Rewrite the weak answer as three bullet points, then re-run a short mock focused on that topic the next day.",
          "Keep your resume truthful. If a mock question exposes a fake skill line, delete it before the real drive."
        ]
      },
      {
        heading: "Start free mock interviews on Apply",
        body: [
          "Open apply.neexmeet.com/mock-interview, sign in with Google, pick company and role, and start your first session free.",
          "Pair mock interviews with PYQs at /pyqs and an ATS resume at /dashboard/generate. For a full prep calendar, use /blog/interview-preparation-for-freshers."
        ]
      }
    ]
  },
  {
    slug: "engineering-student-resume-no-experience",
    title: "Engineering Student Resume with No Experience",
    description:
      "Engineering student resume with no experience — project-first format, skills, coursework, and free ATS tips for Indian campus placements.",
    publishedAt: "2026-07-23",
    updatedAt: "2026-07-23",
    readingTime: "8 min",
    category: "Fresher Resumes",
    targetKeyword: "engineering student resume",
    keywords: [
      "engineering student resume",
      "resume engineering student",
      "engineering student resume with no experience",
      "resume for student with no experience",
      "engineering fresher resume no internship",
      "B.Tech resume with only projects",
      "first year engineering student resume",
      "second year engineering resume India",
      "campus placement resume no experience",
      "ATS engineering resume for freshers"
    ],
    excerpt:
      "No internship yet? An engineering student resume still works if projects, coursework, and skills are framed clearly for campus placements.",
    workflowLinks: [
      { label: "Build engineering resume free", href: "/dashboard/generate" },
      {
        label: "Engineering student resume template",
        href: "/blog/engineering-student-resume-template"
      },
      {
        label: "Resume for student with no experience",
        href: "/blog/resume-with-no-experience-student"
      },
      {
        label: "Resume engineering student guide",
        href: "/blog/resume-for-engineering-students-india-template"
      },
      { label: "Practice mock interviews", href: "/mock-interview" },
      { label: "Browse company PYQs", href: "/pyqs" }
    ],
    sections: [
      {
        heading: "Engineering student resume when you have no experience",
        body: [
          "Recruiters hiring freshers do not expect two years of work history. They look for fundamentals, 1–2 explainable projects, and honest skills.",
          "Treat projects as experience: name, tech stack, what you built, what you personally did, and a GitHub link with a readable README.",
          "Keep the resume one page, single column, ATS-safe — no photo, no multi-column Canva layout for NQT / InfyTQ portals."
        ]
      },
      {
        heading: "Section order for no-internship engineering resumes",
        body: [
          "Header → Education (with coursework) → Projects → Skills → Achievements / certifications. Skip empty Experience sections.",
          "If you later get an internship, move Experience above Projects. Until then, projects carry the narrative.",
          "CGPA as X.XX/10. Add 10th/12th only when a company form or TCS-style format requires it."
        ]
      },
      {
        heading: "Project bullet examples (truthful, interview-safe)",
        body: [
          "Built a campus event registration portal with Java and MySQL used by 200 classmates for fest sign-ups.",
          "Implemented REST APIs in Node.js for a personal expense tracker; added JWT auth and deployed on free hosting.",
          "Do not invent revenue or user metrics. Scope and your role beat fake percentages in interviews."
        ]
      },
      {
        heading: "Common mistakes on engineering resumes with no experience",
        body: [
          "Listing skills you only watched in a YouTube video — panels will ask follow-ups.",
          "Using a two-page template filled with soft-skill fluff.",
          "Hiding GitHub because the repo is messy — clean the README instead.",
          "Sending the same resume to Amazon and TCS without keyword tailoring — use /dashboard/generate with the real JD."
        ]
      },
      {
        heading: "Build free, then practice the interview",
        body: [
          "Create the base engineering student resume on Apply at /dashboard/generate, then rehearse explaining every project in a free mock interview at /mock-interview.",
          "For full templates and examples, see /blog/engineering-student-resume-template and /blog/engineering-student-resume-examples-india. For the general no-experience guide, see /blog/resume-with-no-experience-student."
        ]
      }
    ]
  }
] satisfies BlogPost[];
