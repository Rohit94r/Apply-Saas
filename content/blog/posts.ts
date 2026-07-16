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
  },
  {
    slug: "tcs-nqt-preparation-guide-2026",
    title: "TCS NQT Preparation Guide 2026: Syllabus, Exam Pattern, Cut-off & Tips",
    description:
      "Complete TCS NQT 2026 preparation guide — quantitative aptitude, logical reasoning, verbal, coding sections with syllabus, exam pattern, cut-off marks, and topic-wise practice tips.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
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
    title: "Off-Campus Placement Preparation Guide: How to Get a Job Without Campus Hiring",
    description:
      "Complete off-campus placement guide for Indian students — where to find jobs, how to apply, referral strategies, resume tips, and interview preparation without campus placement support.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
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
    title: "Infosys SP and DSE Preparation Guide: Coding, Aptitude & Interview Tips",
    description:
      "Complete Infosys SP and DSE role preparation guide — exam pattern, coding topics, aptitude syllabus, interview rounds, and how to crack Infosys Specialist Programmer and Digital Specialist Engineer roles.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
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
    title: "Fresher Salary in India IT Companies 2026: TCS, Infosys, Amazon, Startups",
    description:
      "Complete fresher salary guide for Indian IT companies 2026 — TCS, Infosys, Wipro, Amazon, Microsoft, Goldman Sachs, and startups. Base pay, bonuses, benefits, and negotiation tips.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
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
    title: "How to Write a Resume with No Experience: Student Guide with Template",
    description:
      "Complete guide to writing a resume when you have no work experience — what to include, how to frame projects, skills section tips, and a free template for college students.",
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "8 min",
    category: "Fresher Resumes",
    targetKeyword: "resume with no experience student",
    keywords: [
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
  }
] satisfies BlogPost[];
