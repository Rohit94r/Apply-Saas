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
    updatedAt: "2026-07-16",
    readingTime: "8 min",
    category: "Resume Tools",
    targetKeyword: "best resume builder India students",
    keywords: [
      "best resume builder India students",
      "free resume builder for freshers",
      "ATS friendly resume builder India",
      "AI resume builder for students",
      "campus placement resume builder",
      "resume builder for engineering students India",
      "free ATS resume optimizer",
      "resume tailoring tool India",
      "Apply vs Novoresume",
      "resume builder for TCS Infosys"
    ],
    excerpt:
      "Which resume builder is best for Indian students preparing for campus placements? We compare features, ATS compatibility, and pricing — and why Apply is built specifically for India.",
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
    title: "Interview Tips for Freshers: How to Crack Your First Job Interview in India",
    description:
      "Practical interview tips for freshers — HR round answers, technical round strategy, dress code, body language, and how to handle nervousness in your first campus placement interview.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "9 min",
    category: "Interview Tips",
    targetKeyword: "interview tips for freshers",
    keywords: [
      "interview tips for freshers",
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
  }
] satisfies BlogPost[];
