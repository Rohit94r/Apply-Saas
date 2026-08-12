/**
 * Placement SEO pages — India-focused company / OA / resume guides.
 * Add a page: copy an entry, set unique slug + keywords, wire relatedSlugs.
 * Sitemap picks these up via app/sitemap.ts → /prepare/[slug].
 */

import type { PreparePage } from "./types";

export const preparePages: PreparePage[] = [
  {
    slug: "tcs-interview-questions-2026",
    title: "TCS Interview Questions 2026: NQT, Technical & HR Guide",
    description:
      "Realistic TCS interview questions for 2026 campus and off-campus drives — NQT topics, coding basics, project deep-dives, and HR rounds for Indian freshers.",
    companyId: "tcs",
    companyName: "TCS",
    category: "interview",
    targetKeyword: "TCS interview questions 2026",
    keywords: [
      "TCS interview questions 2026",
      "TCS NQT questions",
      "TCS technical interview freshers",
      "TCS HR questions India"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "9 min read",
    excerpt:
      "TCS still hires at scale through NQT and campus drives. Interviewers care less about LeetCode hard and more about fundamentals, clear projects, and whether you can learn on the job.",
    questionBankKey: "tcs",
    primaryCta: {
      label: "Practice TCS interview prep",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor resume for TCS JD", href: "/dashboard/generate" },
      { label: "Browse TCS-style roles", href: "/dashboard/jobs" },
      { label: "Create free account", href: "/sign-up" }
    ],
    relatedSlugs: [
      "infosys-resume-format",
      "wipro-technical-interview",
      "cognizant-aptitude-questions"
    ],
    sections: [
      {
        heading: "How TCS hiring usually works in 2026",
        body: [
          "Most freshers hit TCS through National Qualifier Test (NQT) or a college drive. Typical flow: online aptitude + coding → technical interview → HR / managerial. Role names vary (Assistant System Engineer, Digital, Graduate Trainee) but the evaluation pattern stays similar.",
          "Digital and specialist tracks ask stronger programming; classic ASE tracks lean on aptitude, OOPs, SQL, and project explanation."
        ],
        bullets: [
          "NQT: numerical, verbal, reasoning, and coding (language of choice)",
          "Technical: core CS + your project stack",
          "HR: location flexibility, gap years, notice / joining date, bond talk"
        ]
      },
      {
        heading: "NQT-style topics that still show up",
        body: [
          "Expect speed over trickiness. Practise percentage, ratio, time-speed-distance, profit-loss, and seating arrangement. For verbal: reading comprehension and sentence correction. Coding is usually 1–2 easy problems — arrays, strings, or simple loops — not DP.",
          "If your coding attempt fails but approach is clear, write the logic in comments; some panels review approach screenshots from the platform."
        ]
      },
      {
        heading: "Technical round — questions interviewers actually ask",
        body: [
          "Open with your strongest project. They will ask: why this stack, what you built vs what you copied, how you tested, and what broke. Then fundamentals matching your resume keywords."
        ],
        bullets: [
          "OOPs: encapsulation vs abstraction with a class from your project",
          "SQL: joins, primary/foreign keys, write a query for ‘students with no submissions’",
          "DSA basics: reverse a string, find duplicates, two-sum style",
          "Java/Python: collections vs lists, exception handling, GIL (if Python)",
          "OS/Networks light: process vs thread, HTTP vs HTTPS, what is an API"
        ]
      },
      {
        heading: "HR & managerial — don’t improvise blindly",
        body: [
          "Common themes: Why TCS? Willing to relocate? Any backlog? Tell me about a conflict in your team project. Strengths and weaknesses that don’t sound scripted. Be ready for ‘walk me through your resume in 2 minutes’ without reading.",
          "If you have a preferred tech (Java/React/cloud), say it once with a project proof — not a wishlist of every buzzword."
        ]
      },
      {
        heading: "How Apply helps for TCS",
        body: [
          "Paste a TCS or Ninja / Digital JD into Tailor so your summary and skills match the role language (Java, SQL, SDLC, communication). Use Interview prep with company set to TCS for a practice set aligned to fresher rounds. Track similar IT-services openings on Jobs."
        ]
      }
    ]
  },
  {
    slug: "infosys-resume-format",
    title: "Infosys Resume Format for Freshers (Campus & Off-Campus)",
    description:
      "What Infosys screeners look for on a fresher resume — section order, project bullets, skill keywords, and formatting that survives ATS for Systems Engineer / DSE roles.",
    companyId: "infosys",
    companyName: "Infosys",
    category: "resume",
    targetKeyword: "Infosys resume format",
    keywords: [
      "Infosys resume format",
      "Infosys fresher resume",
      "Infosys Systems Engineer resume",
      "campus placement resume Infosys"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "7 min read",
    excerpt:
      "Infosys resumes fail more often from messy layout and vague projects than from missing ‘fancy’ skills. One page, clear sections, and evidence under every tech keyword.",
    questionBankKey: "infosys",
    primaryCta: {
      label: "Build Infosys-ready resume",
      href: "/dashboard/generate"
    },
    secondaryCtas: [
      { label: "Interview prep for Infosys", href: "/dashboard/interview" },
      { label: "Find Infosys-like roles", href: "/dashboard/jobs" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "accenture-resume-template",
      "tcs-interview-questions-2026",
      "cognizant-aptitude-questions"
    ],
    sections: [
      {
        heading: "Recommended section order",
        body: [
          "For campus / InfyTQ / HackWithInfy pathway roles, use: Header → Summary (3 lines max) → Skills → Projects → Education → Internships/Experience → Certifications → Achievements. Skip photo, DOB, marital status, and full address — city + email + phone + LinkedIn is enough."
        ],
        bullets: [
          "Header: Name, role target (e.g. Systems Engineer / Full Stack Fresher), city, phone, email",
          "Summary: degree + strongest stack + one outcome (hackathon, deploy, internship)",
          "Skills: languages, frameworks, databases, tools — grouped, not a word cloud"
        ]
      },
      {
        heading: "Project bullets that pass Infosys screening",
        body: [
          "Write 3–4 bullets per project: problem → what you built → tech → measurable or concrete result. ‘Worked on frontend’ is weak. ‘Built React checkout with Razorpay; cut form abandonment in testing by validating pincode + UPI states’ is interview-ready.",
          "If two teammates shared a project, own a clear slice: API layer, auth, schema, or UI module — interviewers ask ‘what was your part?’"
        ]
      },
      {
        heading: "Keywords Infosys JDs commonly use",
        body: [
          "Mirror language from the actual JD you are applying to. Typical fresher sheets mention Java / Python, SQL, OOPs, data structures, SDLC, Agile, Git, REST APIs, cloud basics (AWS/Azure), and communication. Only list what you can defend in a 10-minute screen."
        ]
      },
      {
        heading: "Formatting rules that matter",
        body: [
          "Single column PDF, standard fonts, no icons-as-skills, no text inside images. Dates as Mon YYYY – Mon YYYY. CGPA or percentage once under Education. Keep it to 1 page for fresher; 2 only if you have real internships and production projects."
        ]
      },
      {
        heading: "How Apply helps",
        body: [
          "Upload your current resume, paste an Infosys JD, and generate an ATS-cleaner version that keeps your real projects. Then open Interview prep to practise puzzle + technical + project rounds against that same resume."
        ]
      }
    ]
  },
  {
    slug: "amazon-oa-questions",
    title: "Amazon OA Questions: What SDE Intern & Graduate Roles Ask",
    description:
      "Amazon Online Assessment patterns for India SDE Intern / new grad — OA coding themes, Leadership Principles MCQs, timing tips, and how to prepare without grinding random hard problems.",
    companyId: "amazon",
    companyName: "Amazon",
    category: "oa",
    targetKeyword: "Amazon OA questions",
    keywords: [
      "Amazon OA questions",
      "Amazon Online Assessment SDE",
      "Amazon OA India",
      "Amazon coding assessment freshers"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "8 min read",
    excerpt:
      "Amazon OA is less about obscure puzzles and more about clean medium DSA under time, plus Leadership Principles signals in work-style questions.",
    questionBankKey: "amazon",
    primaryCta: {
      label: "Practice Amazon-style interview",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor resume for Amazon JD", href: "/dashboard/generate" },
      { label: "Track SDE openings", href: "/dashboard/jobs" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "morgan-stanley-oa",
      "microsoft-internship-guide",
      "google-step-resume"
    ],
    sections: [
      {
        heading: "Typical Amazon OA structure",
        body: [
          "India SDE Intern / graduate OAs usually combine coding (often two problems, ~70–90 minutes depending on loop) and a work-style / LP-aligned questionnaire. Some loops add debugging or system-design light sections for experienced hires — freshers should prioritise arrays, graphs/BFS-DFS, hashing, and heaps."
        ],
        bullets: [
          "Coding: 1 medium + 1 medium-hard is common; sometimes two mediums",
          "Work style: choose options that map to Ownership, Bias for Action, Dive Deep, Earn Trust",
          "Partial credit: always ship a correct brute force before optimising"
        ]
      },
      {
        heading: "Question themes that recur",
        body: [
          "You will see variations — not the same LeetCode IDs every time — but themes stay stable: sliding window on strings, top-K with heaps, BFS shortest path on grids, prefix sums, monotonic stack, and hashmap pair counting. Practise writing tests for edge cases (empty input, n=1, duplicates)."
        ]
      },
      {
        heading: "Leadership Principles in the OA",
        body: [
          "Don’t pick ‘hero’ answers that ignore the team or data. Amazon wants bias for action with customer impact, not cowboy coding. If two options look good, pick the one that owns the outcome and escalates with data."
        ]
      },
      {
        heading: "Day-of strategy",
        body: [
          "Read both problems first. Start with the one you can finish. Leave 10 minutes to dry-run. Name variables clearly — human review happens later in phone screens. Never leave a blank submission if you have a partial solution."
        ]
      },
      {
        heading: "After OA — what Apply helps with",
        body: [
          "Use Interview prep with Amazon + your tailored resume to drill LP stories (STAR) and coding follow-ups. Align your Projects section to scale, customer impact, and metrics before the phone screen."
        ]
      }
    ]
  },
  {
    slug: "capgemini-hiring-process",
    title: "Capgemini Hiring Process for Freshers in India (2026)",
    description:
      "Step-by-step Capgemini hiring process for Indian campuses and off-campus drives — Exceller / online test, technical interview, HR, documents, and what to prepare at each stage.",
    companyId: "capgemini",
    companyName: "Capgemini",
    category: "process",
    targetKeyword: "Capgemini hiring process",
    keywords: [
      "Capgemini hiring process",
      "Capgemini fresher recruitment",
      "Capgemini Exceller",
      "Capgemini interview process India"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "7 min read",
    excerpt:
      "Capgemini’s fresher funnel is predictable: online assessment → technical → HR. Knowing the sequence helps you prepare the right thing each week instead of random grinding.",
    questionBankKey: "capgemini",
    primaryCta: {
      label: "Find Capgemini-style jobs",
      href: "/dashboard/jobs"
    },
    secondaryCtas: [
      { label: "Tailor resume for Capgemini", href: "/dashboard/generate" },
      { label: "Interview prep", href: "/dashboard/interview" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "accenture-resume-template",
      "tcs-interview-questions-2026",
      "deloitte-nla"
    ],
    sections: [
      {
        heading: "Stage 1 — Online assessment (Exceller / Pseudo)",
        body: [
          "Expect aptitude (quants, logical, verbal) plus a coding or Pseudo Code section depending on the drive. Game-based or behavioural modules appear in some batches — treat them seriously; they are filter steps, not filler."
        ],
        bullets: [
          "Revise: percentages, permutations, syllogisms, reading comprehension",
          "Coding: loops, arrays, strings in C/Java/Python",
          "Keep ID proof + stable internet ready; many attempts are proctored"
        ]
      },
      {
        heading: "Stage 2 — Technical interview",
        body: [
          "Panels go deep on resume projects, OOPs, DBMS, and basic coding on paper or shared editor. If you listed Spring, React, or cloud, expect one related question. Communication matters — Capgemini places many people on client work."
        ]
      },
      {
        heading: "Stage 3 — HR / managerial",
        body: [
          "Relocation, shift willingness, bond / service agreement awareness, family support for outstation posting, and ‘Why Capgemini?’ come up often. Be consistent with what you wrote in forms about preferred locations and gap years."
        ]
      },
      {
        heading: "Documents & timeline tips",
        body: [
          "Have scanned marksheets, ID, passport-size photo, and updated LinkedIn ready. Joining dates and training locations can shift — ask for written confirmation of role (Analyst / A4 / etc.) and CTC break-up before declining other offers."
        ]
      },
      {
        heading: "How Apply fits this funnel",
        body: [
          "Tailor once against a Capgemini JD before the form upload. Use Interview for technical mock questions. Jobs helps you keep a backup pipeline of similar IT-services roles while you wait on results."
        ]
      }
    ]
  },
  {
    slug: "microsoft-internship-guide",
    title: "Microsoft Internship Guide (India): Apply, OA, Interviews",
    description:
      "Practical Microsoft internship guide for Indian students — where roles show up, resume signals, OA focus, interview rounds, and how to stand out without ivy-league branding.",
    companyId: "microsoft",
    companyName: "Microsoft",
    category: "internship",
    targetKeyword: "Microsoft internship guide",
    keywords: [
      "Microsoft internship India",
      "Microsoft SDE intern",
      "Microsoft internship guide",
      "Microsoft coding interview intern"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "8 min read",
    excerpt:
      "Microsoft internships in India are competitive but pattern-readable: strong projects, clean DSA medium, and behavioural stories around growth mindset and collaboration.",
    questionBankKey: "microsoft",
    primaryCta: {
      label: "Tailor internship resume",
      href: "/dashboard/generate"
    },
    secondaryCtas: [
      { label: "Microsoft interview prep", href: "/dashboard/interview" },
      { label: "Browse intern openings", href: "/dashboard/jobs" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "google-step-resume",
      "amazon-oa-questions",
      "jp-morgan-interview-experience"
    ],
    sections: [
      {
        heading: "Where to find Microsoft intern roles",
        body: [
          "Watch Microsoft Careers (Internships), university career portals, Engage / Shine-style programs when announced, and referrals via alumni. LinkedIn job alerts for ‘Software Engineer Intern Microsoft India’ still catch many postings. Apply early — some loops close once interview slots fill."
        ]
      },
      {
        heading: "Resume signals that help",
        body: [
          "Show shipped or demoable work: GitHub with clear README, deployed URL, or judge feedback from a hackathon. Highlight CS fundamentals via coursework only if you also have projects. Metrics beat adjectives: users, latency, test coverage, dataset size."
        ],
        bullets: [
          "1–2 deep projects > 6 tutorial clones",
          "Languages you can code live (C++/Java/Python preferred)",
          "Collaboration proof: open-source PR, club tech lead, research assistant"
        ]
      },
      {
        heading: "Interview loop overview",
        body: [
          "Expect OA or online screen → 1–2 technical (DSA + debugging your approach) → sometimes a hiring manager / behavioural. Explain trade-offs out loud. Microsoft interviewers often collaborate — ask clarifying questions before coding."
        ]
      },
      {
        heading: "How Apply helps Microsoft prep",
        body: [
          "Tailor your resume to the exact intern JD (Azure, fullstack, or ML wording differs). Interview prep generates coding + project + behavioural prompts from that resume so stories stay consistent with what you submitted."
        ]
      }
    ]
  },
  {
    slug: "google-step-resume",
    title: "Google STEP Resume: What to Write for Early Career",
    description:
      "Google STEP and early-career resume guidance for Indian students — structure, project depth, skills section, and mistakes that get silent rejects.",
    companyId: "google",
    companyName: "Google",
    category: "resume",
    targetKeyword: "Google STEP resume",
    keywords: [
      "Google STEP resume",
      "Google STEP India",
      "Google early career resume",
      "Google internship resume"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "7 min read",
    excerpt:
      "STEP and early Google roles reward proof of learning velocity and coding depth — not a long list of online course certificates.",
    questionBankKey: "google",
    primaryCta: {
      label: "Tailor STEP / Google resume",
      href: "/dashboard/generate"
    },
    secondaryCtas: [
      { label: "Google interview prep", href: "/dashboard/interview" },
      { label: "Find intern roles", href: "/dashboard/jobs" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "microsoft-internship-guide",
      "amazon-oa-questions",
      "flipkart-grid"
    ],
    sections: [
      {
        heading: "Who STEP-style resumes are for",
        body: [
          "Google STEP (and similar early programs) target students early in their degree who already show coding potential. Your resume should prove: you write real code, you finish projects, and you can learn CS fundamentals quickly — even if you lack FAANG internships."
        ]
      },
      {
        heading: "Structure that screens well",
        body: [
          "Keep education near the top with expected graduation. Put Projects above fluff experience. Each project needs tech stack inline and 2–3 impact bullets. Skills should match what appears in projects — don’t list TensorFlow if your only proof is a 2-hour tutorial."
        ],
        bullets: [
          "Education + relevant coursework (Algorithms, OS, DBMS)",
          "Projects with links (GitHub / live demo)",
          "Competitive programming / open source only if ranks or merged PRs exist",
          "Leadership: teaching, hackathon organising, with outcomes"
        ]
      },
      {
        heading: "Common STEP resume mistakes",
        body: [
          "Overloaded headers with 15 social links, objective paragraphs about ‘seeking opportunity’, tables/columns that break ATS parsers, and unverifiable claims (‘expert in 12 languages’). Prefer depth in 2 stacks you can whiteboard."
        ]
      },
      {
        heading: "How Apply helps",
        body: [
          "Paste a Google / STEP JD and tighten keywords without inventing experience. Pair with Interview prep for DSA + Googliness-style behavioural practice before recruiter screens."
        ]
      }
    ]
  },
  {
    slug: "wipro-technical-interview",
    title: "Wipro Technical Interview: Fresher Questions & Prep Plan",
    description:
      "Wipro technical interview guide for Project Engineer / fresher roles — coding, OOPs, SQL, project deep-dives, and a 2-week prep plan for Indian campus drives.",
    companyId: "wipro",
    companyName: "Wipro",
    category: "interview",
    targetKeyword: "Wipro technical interview",
    keywords: [
      "Wipro technical interview",
      "Wipro interview questions freshers",
      "Wipro Project Engineer interview",
      "Wipro coding interview"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "8 min read",
    excerpt:
      "Wipro technical rounds test whether you understand your own resume. Clear fundamentals beat memorised definition dumps.",
    questionBankKey: "wipro",
    primaryCta: {
      label: "Practice Wipro interview",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor Wipro resume", href: "/dashboard/generate" },
      { label: "Browse openings", href: "/dashboard/jobs" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "tcs-interview-questions-2026",
      "infosys-resume-format",
      "cognizant-aptitude-questions"
    ],
    sections: [
      {
        heading: "What the panel usually covers",
        body: [
          "After the written / EliteNTH-style filter, technical lasts 20–40 minutes. Sequence is predictable: introduce yourself → project discussion → OOPs / language questions → simple coding or SQL → sometimes puzzle or managerial follow-up in the same slot."
        ]
      },
      {
        heading: "High-frequency technical themes",
        body: [
          "Focus on your claimed language (Java or Python for most freshers). Know difference between ArrayList and LinkedList, checked vs unchecked exceptions, and how you used Git. For DBMS: normalisation levels at a practical level, and writing a JOIN."
        ],
        bullets: [
          "Write FizzBuzz / reverse linked list / frequency map under pressure",
          "Explain one project architecture on a whiteboard (client → API → DB)",
          "Be honest about copy-paste libraries — then explain the part you own"
        ]
      },
      {
        heading: "2-week prep plan",
        body: [
          "Week 1: rewrite project bullets, revise OOPs + SQL, solve 20 easy coding problems. Week 2: mock interviews out loud, HR answers, and one full resume walk-through timed to 90 seconds. Sleep before the drive day — Wipro panels notice clarity more than cramming."
        ]
      },
      {
        heading: "How Apply helps",
        body: [
          "Generate a Wipro-JD-aligned resume, then run Interview prep to get a mix of technical and HR prompts tied to those projects. Use Jobs to apply to parallel service-company openings the same week."
        ]
      }
    ]
  },
  {
    slug: "cognizant-aptitude-questions",
    title: "Cognizant Aptitude Questions: Topics, Patterns & Practice",
    description:
      "Cognizant aptitude preparation for GenC / fresher drives — quant, logical, verbal patterns, time management, and what comes after the aptitude round.",
    companyId: "cognizant",
    companyName: "Cognizant",
    category: "aptitude",
    targetKeyword: "Cognizant aptitude questions",
    keywords: [
      "Cognizant aptitude questions",
      "Cognizant GenC aptitude",
      "Cognizant online assessment",
      "Cognizant quants practice"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "7 min read",
    excerpt:
      "Cognizant aptitude is a speed filter. Pattern familiarity beats last-night formula memorisation.",
    questionBankKey: "cognizant",
    primaryCta: {
      label: "Prep Cognizant interview next",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "ATS resume for Cognizant", href: "/dashboard/generate" },
      { label: "Job search", href: "/dashboard/jobs" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "tcs-interview-questions-2026",
      "capgemini-hiring-process",
      "accenture-resume-template"
    ],
    sections: [
      {
        heading: "What the aptitude section looks like",
        body: [
          "Drives branded GenC / GenC Elevate / similar still lean on quantitative aptitude, logical reasoning, and verbal ability. Some loops add coding or communication. Question counts and timers change by vendor — practise with a 60–90 minute mixed mock weekly."
        ]
      },
      {
        heading: "Quant patterns to lock",
        body: [
          "Percentages, ratios, averages, profit & loss, simple & compound interest, time & work, time-speed-distance, permutations & combinations (basic), and data interpretation (tables / bar graphs). Skip exotic number theory unless you already enjoy it — ROI is low."
        ],
        bullets: [
          "Learn shortcuts for percentage ↔ fraction",
          "Always estimate before calculating DI sets",
          "Mark & skip after 90 seconds — finish the paper"
        ]
      },
      {
        heading: "Logical & verbal",
        body: [
          "Seating arrangement, blood relations, syllogisms, directions, and coding-decoding dominate logical. Verbal: RC passages, para jumbles, error spotting. Read one RC daily for a week before the drive — panic reading kills accuracy."
        ]
      },
      {
        heading: "After you clear aptitude",
        body: [
          "Technical and communication rounds still matter. Keep a 1-page resume ready and practise explaining projects. Apply’s Interview tool bridges aptitude → technical by generating Cognizant-style technical and HR sets from your resume."
        ]
      }
    ]
  },
  {
    slug: "accenture-resume-template",
    title: "Accenture Resume Template for Freshers & ASE Roles",
    description:
      "Accenture-oriented fresher resume template guidance — sections, consulting-friendly language, skills that screeners scan, and ATS-safe layout tips for India hiring.",
    companyId: "accenture",
    companyName: "Accenture",
    category: "resume",
    targetKeyword: "Accenture resume template",
    keywords: [
      "Accenture resume template",
      "Accenture fresher resume",
      "Accenture ASE resume",
      "Accenture resume format India"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "6 min read",
    excerpt:
      "Accenture reads thousands of fresher resumes. Clarity, client-ready English, and honest tech keywords beat decorative templates.",
    questionBankKey: "accenture",
    primaryCta: {
      label: "Generate Accenture-ready PDF",
      href: "/dashboard/generate"
    },
    secondaryCtas: [
      { label: "Interview prep", href: "/dashboard/interview" },
      { label: "Browse consulting/IT roles", href: "/dashboard/jobs" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "infosys-resume-format",
      "capgemini-hiring-process",
      "deloitte-nla"
    ],
    sections: [
      {
        heading: "Template skeleton (copy this order)",
        body: [
          "Name + target role → contact → 3-line summary → Technical skills → Projects → Education → Internships → Certifications / Leadership. Use Accenture JD language (‘collaborate with stakeholders’, ‘deliverables’, ‘agile’) only where true."
        ]
      },
      {
        heading: "Skills block that screens well",
        body: [
          "Group: Languages | Frameworks | Databases | Cloud/Tools | Soft. Accenture ASE / Associate roles often scan for Java/.NET/Python, SQL, HTML/CSS/JS, cloud fundamentals, and communication. Put cloud certifications (Azure/AWS foundational) only if completed."
        ]
      },
      {
        heading: "Bullet formula",
        body: [
          "Action verb + task + tech + result. Example: ‘Automated Excel-to-PDF report pipeline in Python for a college fest — reduced manual hours from 6 to 1 per event.’ Avoid empty lines like ‘Responsible for coding modules.’"
        ]
      },
      {
        heading: "How Apply helps",
        body: [
          "Upload any existing template mess and regenerate a clean Accenture-JD version. Keep Interview prep ready for communication + technical combo rounds common in Accenture drives."
        ]
      }
    ]
  },
  {
    slug: "morgan-stanley-oa",
    title: "Morgan Stanley OA: Coding Themes & Prep for Technology Roles",
    description:
      "Morgan Stanley Online Assessment guide for technology analyst / SDE-style roles — coding topics, aptitude overlays, timing strategy, and interview follow-through.",
    companyId: "morgan-stanley",
    companyName: "Morgan Stanley",
    category: "oa",
    targetKeyword: "Morgan Stanley OA",
    keywords: [
      "Morgan Stanley OA",
      "Morgan Stanley online assessment",
      "Morgan Stanley coding test",
      "Morgan Stanley technology interview"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "8 min read",
    excerpt:
      "Morgan Stanley tech OAs reward clean, correct code and calm debugging. Finance trivia is secondary at OA stage — correctness is not.",
    questionBankKey: "morgan-stanley",
    primaryCta: {
      label: "Practice MS-style interview",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor tech + finance resume", href: "/dashboard/generate" },
      { label: "Track fintech roles", href: "/dashboard/jobs" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "amazon-oa-questions",
      "jp-morgan-interview-experience",
      "microsoft-internship-guide"
    ],
    sections: [
      {
        heading: "What to expect in the OA",
        body: [
          "Formats vary by college and role (Technology Analyst, Spring Intern, experienced hire). Common pattern: timed coding on a HackerRank-style platform, sometimes plus aptitude or debugging. Read the PDF instructions carefully — some tests disallow IDE helpers."
        ]
      },
      {
        heading: "Coding themes worth prioritising",
        body: [
          "Arrays and strings under constraints, hashing, sorting + two pointers, trees (traversals, BST), graph BFS/DFS, and complexity analysis. Rarely need advanced DP for fresher OA — but know recursion vs iteration trade-offs."
        ],
        bullets: [
          "Practise writing code without autocomplete for 45–60 minutes",
          "Always state time/space complexity in comments if asked",
          "Handle invalid input explicitly when the prompt lists constraints"
        ]
      },
      {
        heading: "Beyond coding — light domain awareness",
        body: [
          "You do not need CFA knowledge for the OA. Still, understand what an investment bank technology team does (low-latency systems, risk, trade lifecycle at a high level) so phone screens feel natural."
        ]
      },
      {
        heading: "How Apply helps",
        body: [
          "Tailor resume bullets toward reliability, testing, and performance. Interview prep can mix DSA with ‘why finance technology’ behavioural prompts so you do not sound generic after clearing OA."
        ]
      }
    ]
  },
  {
    slug: "jp-morgan-interview-experience",
    title: "JP Morgan Interview Experience: Tech Analyst & SDE Rounds",
    description:
      "Composite JPMorgan Chase interview experience for Technology / Software roles in India — Code for Good / campus OA, HireVue tips, technical rounds, and behavioural themes.",
    companyId: "jpmorgan",
    companyName: "JPMorgan Chase",
    category: "experience",
    targetKeyword: "JP Morgan interview experience",
    keywords: [
      "JP Morgan interview experience",
      "JPMorgan technology analyst interview",
      "JPMorgan Code for Good",
      "JP Morgan coding interview India"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "9 min read",
    excerpt:
      "JPMorgan loops blend coding competence with communication and risk awareness. Candidates who practise explaining trade-offs aloud do better than silent leetcoders.",
    questionBankKey: "jpmorgan",
    primaryCta: {
      label: "Prep JPMorgan interview",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor resume for JPM JD", href: "/dashboard/generate" },
      { label: "Browse finance-tech jobs", href: "/dashboard/jobs" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "morgan-stanley-oa",
      "amazon-oa-questions",
      "deloitte-nla"
    ],
    sections: [
      {
        heading: "Composite journey (campus / off-campus)",
        body: [
          "Many Indian students meet JPMorgan via Code for Good, campus Tech Analyst drives, or SoftWare Engineering programs. A common path: online assessment or hackathon → HireVue / video → technical interviews → HR. Exact order changes — treat this as a map, not a contract."
        ]
      },
      {
        heading: "OA & hackathon notes",
        body: [
          "Code for Good emphasises teamwork under time as much as code quality. Speak up, split stories, and ship a demo. Online assessments lean medium DSA — arrays, strings, complexity. Completing one solid problem cleanly beats two broken ones."
        ]
      },
      {
        heading: "Technical interview — what people get asked",
        body: [
          "Live coding on shared editors, questions on your projects (auth, DB choices, failure modes), and sometimes Java/collections depth. For experienced or stronger tracks: REST design, concurrency basics, or SQL optimisation."
        ],
        bullets: [
          "Practise narrating while coding — silence hurts the signal",
          "Prepare one ‘production bug I fixed’ story",
          "Know why you chose SQL vs NoSQL in a project"
        ]
      },
      {
        heading: "Behavioural themes",
        body: [
          "Integrity, ownership under pressure, working with incomplete requirements, and learning from feedback. Use STAR with real college/internship examples — fabricated stories collapse under follow-ups."
        ]
      },
      {
        heading: "How Apply helps after you read experiences",
        body: [
          "Experiences online are outdated fast. Anchor on your resume: Tailor to the exact JPM JD, then generate interview questions from that document so practice matches what you submitted."
        ]
      }
    ]
  },
  {
    slug: "deloitte-nla",
    title: "Deloitte NLA 2026: Exam Pattern, Prep & Next Steps",
    description:
      "Deloitte National Level Assessment (NLA) guide for Indian freshers — pattern overview, aptitude/tech themes, interview after NLA, and resume tips for Analyst / technology roles.",
    companyId: "deloitte",
    companyName: "Deloitte",
    category: "oa",
    targetKeyword: "Deloitte NLA",
    keywords: [
      "Deloitte NLA",
      "Deloitte National Level Assessment",
      "Deloitte NLA 2026",
      "Deloitte fresher hiring"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "8 min read",
    excerpt:
      "Deloitte NLA is a national filter before interviews. Treat it like a paced CAT+coding hybrid — accuracy first, then speed.",
    questionBankKey: "deloitte",
    primaryCta: {
      label: "Prep Deloitte interview",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor Deloitte resume", href: "/dashboard/generate" },
      { label: "Find analyst/tech jobs", href: "/dashboard/jobs" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "capgemini-hiring-process",
      "accenture-resume-template",
      "jp-morgan-interview-experience"
    ],
    sections: [
      {
        heading: "What NLA is (and isn’t)",
        body: [
          "NLA is Deloitte’s nationwide online assessment used for fresher / early-career pipelines. Clearing NLA does not guarantee an offer — it unlocks interview stages. Pattern details can shift by year and business (USI vs consulting tech) so always read the email from your campus or Deloitte careers portal."
        ]
      },
      {
        heading: "Prep areas that consistently help",
        body: [
          "Quantitative aptitude and logical reasoning for speed, English comprehension for client-facing signalling, and basic programming / CS MCQs for technology tracks. Practise full-length mocks under the same time limit — NLA rewards stamina."
        ],
        bullets: [
          "Daily mixed aptitude set (30–40 questions)",
          "Revise OOPs, DBMS, networking one-pagers",
          "One coding practice day mid-week for tech roles"
        ]
      },
      {
        heading: "After NLA — interview reality",
        body: [
          "Expect communication-heavy rounds and situational questions. Technology tracks still ask projects and fundamentals. Dress like a client meeting, not a hackathon. Prepare ‘Why Deloitte?’ with a specific service line interest (technology consulting, audit tech, cyber, etc.)."
        ]
      },
      {
        heading: "How Apply helps",
        body: [
          "Tailor a consulting-clean resume before you upload for NLA registration. After shortlist, use Interview prep for case-light behavioural + technical mix, and Jobs to keep alternative Big-4 / services applications warm."
        ]
      }
    ]
  },
  {
    slug: "flipkart-grid",
    title: "Flipkart GRiD: How to Compete & Convert to Interviews",
    description:
      "Flipkart GRiD competition guide for Indian engineering students — tracks overview, team strategy, problem approach, resume positioning, and converting GRiD into SDE interview chances.",
    companyId: "flipkart",
    companyName: "Flipkart",
    category: "experience",
    targetKeyword: "Flipkart GRiD",
    keywords: [
      "Flipkart GRiD",
      "Flipkart GRiD hackathon",
      "Flipkart GRiD interview",
      "Flipkart SDE campus"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",
    readingTime: "7 min read",
    excerpt:
      "GRiD is both a contest and a recruiting funnel. Strong demos plus clear ownership stories convert better than silent high scores alone.",
    questionBankKey: "flipkart",
    primaryCta: {
      label: "Prep Flipkart-style interview",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor SDE resume", href: "/dashboard/generate" },
      { label: "Browse product-company jobs", href: "/dashboard/jobs" },
      { label: "Sign up free", href: "/sign-up" }
    ],
    relatedSlugs: [
      "amazon-oa-questions",
      "google-step-resume",
      "microsoft-internship-guide"
    ],
    sections: [
      {
        heading: "What Flipkart GRiD is",
        body: [
          "GRiD is Flipkart’s national student challenge with software / tech tracks that change by season. Teams solve applied problems (often e-commerce scale themes: search, catalogue, logistics, recommendations). Finalists get visibility with Flipkart engineering — sometimes interview opportunities."
        ]
      },
      {
        heading: "Team strategy that works",
        body: [
          "Pick teammates with complementary skills (DSA, backend, ML, presentation). Define a thin vertical slice that demos end-to-end before polishing UI. Keep a decision log — judges ask why you chose an approach under constraints."
        ],
        bullets: [
          "Ship a demo video early for submission requirements",
          "Measure something (latency, accuracy, cost) even on sample data",
          "One person owns the pitch deck — don’t improvise live"
        ]
      },
      {
        heading: "Resume & interview conversion",
        body: [
          "List GRiD under Projects or Achievements with track name, outcome (finalist / rank), and your module. In interviews, expect deep questions on your piece — caching, ranking features, database schema — not the full team pitch."
        ]
      },
      {
        heading: "How Apply helps",
        body: [
          "After GRiD, Tailor your resume for Flipkart / product SDE JDs with scale language. Interview prep builds DSA + system-design light prompts from that same resume so your story stays consistent from hackathon to interviewer."
        ]
      }
    ]
  },
  {
    slug: "tcs-nqt-preparation",
    title: "TCS NQT Preparation Guide 2026: Syllabus, Pattern & Tips",
    description:
      "Complete TCS NQT 2026 preparation guide — exam pattern, syllabus, topic-wise weightage, cut-off trends, and practice strategy for Indian freshers applying through National Qualifier Test.",
    companyId: "tcs",
    companyName: "TCS",
    category: "aptitude",
    targetKeyword: "TCS NQT preparation 2026",
    keywords: [
      "TCS NQT preparation 2026",
      "TCS NQT syllabus",
      "TCS NQT exam pattern",
      "TCS NQT cut off",
      "TCS NQT aptitude topics"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-15",
    readingTime: "8 min read",
    excerpt:
      "NQT is the gateway to most TCS fresher hiring. The exam rewards speed and accuracy over deep problem-solving — here is the full syllabus, pattern, and a week-by-week practice plan.",
    primaryCta: {
      label: "Prepare for TCS NQT",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor resume for TCS", href: "/dashboard/generate" },
      { label: "Browse TCS-style roles", href: "/dashboard/jobs" },
      { label: "Create free account", href: "/sign-up" }
    ],
    relatedSlugs: [
      "tcs-interview-questions-2026",
      "cognizant-aptitude-questions",
      "wipro-elite-nth-preparation"
    ],
    sections: [
      {
        heading: "TCS NQT exam pattern 2026",
        body: [
          "NQT has two sections: Foundation Skills (Verbal, Reasoning, Numerical) and Programming Skills. Each section has a fixed time limit — you cannot go back to a previous section once time is up.",
          "Numerical and Reasoning carry the most weight for shortlisting. Programming matters for Digital and specialist tracks."
        ],
        bullets: [
          "Verbal: 15 questions, 10 minutes",
          "Reasoning: 15 questions, 25 minutes",
          "Numerical: 15 questions, 25 minutes",
          "Programming Logic: 10 questions, 15 minutes",
          "Coding: 1–2 problems, 20 minutes"
        ]
      },
      {
        heading: "Topic-wise syllabus that matters",
        body: [
          "Do not study everything — focus on high-frequency topics. For Numerical: percentages, profit-loss, time-speed-distance, ratio-proportion, averages, number series. For Reasoning: syllogisms, blood relations, direction sense, coding-decoding, seating arrangement.",
          "Verbal is usually the easiest section — reading comprehension, sentence correction, and synonyms. Do not over-prepare here."
        ]
      },
      {
        heading: "Cut-off and shortlisting logic",
        body: [
          "TCS does not publish official cut-offs, but based on past drives, scoring 70%+ across sections usually clears the Foundation cut-off. Digital track shortlisting needs a stronger coding attempt and higher overall accuracy.",
          "A safe strategy: attempt 12+ out of 15 in Numerical and Reasoning with 85%+ accuracy. Guess strategically — negative marking is not confirmed but accuracy matters for ranking."
        ]
      },
      {
        heading: "Week-by-week practice plan",
        body: [
          "Two weeks of focused practice is enough if you already have basic math and English. Week 1: topic-wise practice (2 topics per day from Numerical + Reasoning). Week 2: full mock tests with timer + coding practice."
        ],
        bullets: [
          "Days 1–3: Percentages, profit-loss, ratio, averages",
          "Days 4–5: Time-speed-distance, series, syllogisms",
          "Days 6–7: Blood relations, coding-decoding, seating",
          "Days 8–10: Full mocks + review mistakes",
          "Days 11–14: Coding practice (arrays, strings) + final mocks"
        ]
      },
      {
        heading: "How Apply helps for NQT",
        body: [
          "Use Interview prep with company set to TCS to get practice questions and a study roadmap. Tailor your resume for TCS JDs so that after NQT clears, your interview is ready. Track your application in My applications so you don't miss interview dates."
        ]
      }
    ]
  },
  {
    slug: "wipro-elite-nth-preparation",
    title: "Wipro Elite NTH Preparation: Exam Pattern, Syllabus & Tips",
    description:
      "Wipro Elite NTH preparation guide for 2026 — exam sections, syllabus, coding difficulty, and interview process for fresher hiring through Wipro's national talent hunt.",
    companyId: "wipro",
    companyName: "Wipro",
    category: "process",
    targetKeyword: "Wipro Elite NTH preparation",
    keywords: [
      "Wipro Elite NTH preparation",
      "Wipro Elite NTH syllabus",
      "Wipro Elite NTH exam pattern",
      "Wipro fresher hiring process"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-15",
    readingTime: "7 min read",
    excerpt:
      "Wipro Elite NTH is the off-campus hiring route for freshers. The exam is simpler than TCS NQT but the coding section can surprise you — here is what to expect and how to prepare.",
    primaryCta: {
      label: "Prepare for Wipro Elite",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor resume for Wipro", href: "/dashboard/generate" },
      { label: "Find Wipro-style roles", href: "/dashboard/jobs" }
    ],
    relatedSlugs: [
      "wipro-technical-interview",
      "tcs-nqt-preparation",
      "cognizant-aptitude-questions"
    ],
    sections: [
      {
        heading: "Wipro Elite NTH exam structure",
        body: [
          "The online assessment has three sections: Aptitude (quantitative + logical + verbal), Essay Writing, and Coding. Unlike NQT, all sections may be in a single window with section-wise time limits.",
          "Aptitude is moderate difficulty. Coding is usually 1–2 problems at easy-medium level — arrays, strings, basic patterns."
        ]
      },
      {
        heading: "What trips up candidates",
        body: [
          "The essay section is unexpected for many engineering students. You get a topic (often tech-related or general) and 20–25 minutes to write 200–400 words. Grammatical accuracy and structure matter more than vocabulary.",
          "In coding, partial solutions score well — always submit a brute-force attempt before optimizing. Wipro's platform usually gives partial marks for test cases passed."
        ]
      },
      {
        heading: "Interview after Elite NTH",
        body: [
          "If you clear the assessment, the technical interview focuses on your resume projects, basic OOPs, SQL, and one easy coding problem. HR round covers relocation, gap years, and salary expectations (usually standard for freshers)."
        ],
        bullets: [
          "Technical: resume walkthrough + 1 coding + OOPs/SQL basics",
          "HR: Why Wipro, relocation, bond discussion (usually 15–18 months)",
          "Be honest about your stack — they train you regardless"
        ]
      },
      {
        heading: "How Apply helps for Wipro",
        body: [
          "Tailor your resume with Wipro JD language (Java, SQL, SDLC, communication). Use Interview prep for Wipro-style questions. Practice your resume project explanation in Mock interview so you don't freeze in the real round."
        ]
      }
    ]
  },
  {
    slug: "amazon-sde-internship-india",
    title: "Amazon SDE Internship India: Application, OA & Interview Guide",
    description:
      "How to get an Amazon SDE internship in India — application timeline, online assessment format, coding difficulty, and interview loop for 2026 summer and fall internships.",
    companyId: "amazon",
    companyName: "Amazon",
    category: "internship",
    targetKeyword: "Amazon SDE internship India",
    keywords: [
      "Amazon SDE internship India",
      "Amazon internship 2026",
      "Amazon SDE intern OA",
      "Amazon internship interview India"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-15",
    readingTime: "9 min read",
    excerpt:
      "Amazon SDE internships in India are competitive but structured. The OA filters hard on coding, and the interview is pure DSA + leadership principles. Here is the full pipeline and how to prepare.",
    primaryCta: {
      label: "Prepare for Amazon internship",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor resume for Amazon", href: "/dashboard/generate" },
      { label: "Practice mock interview", href: "/dashboard/mock-interview" }
    ],
    relatedSlugs: [
      "amazon-oa-questions",
      "microsoft-internship-guide",
      "google-step-resume"
    ],
    sections: [
      {
        heading: "Amazon internship timeline India",
        body: [
          "Amazon India typically opens SDE intern applications in August–October for the following summer (April–June) and sometimes a fall cycle. Watch the Amazon Jobs portal and campus placement cells — off-campus applications open on the careers page.",
          "Apply early. Amazon processes applications in batches, and earlier applicants often get OA invitations sooner."
        ]
      },
      {
        heading: "Online assessment (OA) format",
        body: [
          "The OA is the hardest filter. Usually two coding problems (one easy-medium, one medium-hard) with a 70–90 minute time limit. Some cycles include a behavioral / work-style simulation section.",
          "Problem 1 is often string manipulation, arrays, or hash maps. Problem 2 is usually trees, graphs, DP, or greedy — LeetCode medium level with edge cases."
        ],
        bullets: [
          "Problem 1: Easy-medium (solve in 20 min)",
          "Problem 2: Medium-hard (allocate 40–50 min)",
          "Partial test cases matter — submit even if not all pass",
          "Some OAs include a debug / code-completion section"
        ]
      },
      {
        heading: "Interview loop — what to expect",
        body: [
          "If you clear the OA, expect 1–2 virtual interviews. Each is 45–60 minutes with a mix of DSA and behavioral. Amazon uses Leadership Principles heavily — even for interns.",
          "Coding: 1 problem per round, medium difficulty. You must explain your approach before coding, discuss complexity, and handle follow-ups. Behavioral: 'Tell me about a time when...' questions mapped to Customer Obsession, Ownership, Deliver Results."
        ]
      },
      {
        heading: "Preparation checklist",
        body: [
          "Solve 60–80 LeetCode problems focusing on Amazon-tagged questions. Practice explaining your solution out loud before coding. Prepare 3–4 stories using STAR format mapped to Leadership Principles."
        ],
        bullets: [
          "DSA: arrays, strings, trees, graphs, DP, binary search",
          "Leadership Principles: memorize 3–4 STAR stories",
          "Resume: one strong project with measurable impact",
          "Mock: practice verbal explanation — not just silent coding"
        ]
      },
      {
        heading: "How Apply helps for Amazon",
        body: [
          "Tailor your resume for Amazon SDE JDs — Amazon values measurable impact and ownership language. Use Interview prep with company set to Amazon for DSA + behavioral practice. Run Mock interview to rehearse verbal explanations before the real loop."
        ]
      }
    ]
  },
  {
    slug: "hcltech-interview-questions",
    title: "HCLTech Interview Questions 2026: Technical & HR Guide",
    description:
      "HCLTech fresher interview questions for 2026 — technical topics, coding difficulty, HR rounds, and preparation tips for campus and off-campus hiring.",
    companyId: "hcltech",
    companyName: "HCLTech",
    category: "interview",
    targetKeyword: "HCLTech interview questions 2026",
    keywords: [
      "HCLTech interview questions 2026",
      "HCLTech fresher interview",
      "HCL technical interview questions",
      "HCLTech hiring process"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-15",
    readingTime: "6 min read",
    excerpt:
      "HCLTech interviews are moderate difficulty and focus on fundamentals, your resume projects, and communication. Less LeetCode-heavy than product companies — more about can you do the job and fit the team.",
    primaryCta: {
      label: "Prepare for HCLTech interview",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor resume for HCLTech", href: "/dashboard/generate" },
      { label: "Browse HCLTech roles", href: "/dashboard/jobs" }
    ],
    relatedSlugs: [
      "tcs-interview-questions-2026",
      "wipro-technical-interview",
      "cognizant-aptitude-questions"
    ],
    sections: [
      {
        heading: "HCLTech interview format",
        body: [
          "Usually two rounds: technical + HR. Some campus drives combine them. Technical is 20–30 minutes covering basics + resume. HR is 10–15 minutes covering fit, location, and salary expectations.",
          "HCLTech hires across tracks (Graduate Engineer Trainee, Software Trainee) and the interview depth varies by track — GET is more general, Software Trainee is more coding-focused."
        ]
      },
      {
        heading: "Technical round — common questions",
        body: [
          "Expect fundamentals over hard DSA. If you can explain OOPs, basic SQL, and your project clearly, you are in good shape."
        ],
        bullets: [
          "OOPs: abstraction vs encapsulation with a real example",
          "SQL: joins, group by, primary vs foreign key",
          "Programming: reverse a string, find duplicates, basic patterns",
          "Project: why this stack, what you built, what broke",
          "Web basics: HTTP methods, REST vs SOAP, what is an API"
        ]
      },
      {
        heading: "HR round — what they check",
        body: [
          "HCLTech HR focuses on communication, willingness to relocate (they have offices across India), and bond / service agreement discussion. Be honest about preferences but flexible."
        ]
      },
      {
        heading: "How Apply helps for HCLTech",
        body: [
          "Use Interview prep with company set to HCLTech for practice questions. Tailor your resume with HCLTech JD keywords (Java, SQL, Spring, communication). Track your application status in My applications."
        ]
      }
    ]
  },
  {
    slug: "goldman-sachs-oa-questions",
    title: "Goldman Sachs OA Questions 2026: Coding & Aptitude Guide",
    description:
      "Goldman Sachs online assessment questions for 2026 fresher hiring — coding difficulty, aptitude sections, and preparation strategy for engineering analyst roles in India.",
    companyId: "goldman-sachs",
    companyName: "Goldman Sachs",
    category: "oa",
    targetKeyword: "Goldman Sachs OA questions 2026",
    keywords: [
      "Goldman Sachs OA questions 2026",
      "Goldman Sachs online assessment",
      "Goldman Sachs coding test",
      "Goldman Sachs engineering analyst OA"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-15",
    readingTime: "8 min read",
    excerpt:
      "Goldman Sachs OA is known for tough coding + quant-heavy aptitude. Unlike service companies, GS tests mathematical reasoning and edge-case handling. Here is the format and what to practice.",
    primaryCta: {
      label: "Prepare for Goldman Sachs OA",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor resume for Goldman Sachs", href: "/dashboard/generate" },
      { label: "Practice coding questions", href: "/dashboard/learners" }
    ],
    relatedSlugs: [
      "morgan-stanley-oa",
      "jp-morgan-interview-experience",
      "amazon-oa-questions"
    ],
    sections: [
      {
        heading: "Goldman Sachs OA structure",
        body: [
          "The GS online assessment typically has two coding problems and sometimes a quant/math section. The coding problems are LeetCode medium-hard level with strict time limits. The quant section tests probability, combinatorics, and mathematical reasoning.",
          "Unlike product companies, GS values correctness and edge-case handling over speed. Partial solutions may not score well — aim for full test-case coverage."
        ]
      },
      {
        heading: "Coding problem patterns",
        body: [
          "GS coding problems often involve: arrays with mathematical constraints, DP with optimization, graph problems with weighted edges, and string parsing with edge cases."
        ],
        bullets: [
          "DP: coin change variants, matrix paths",
          "Graphs: shortest path, connectivity",
          "Arrays: two-pointer with math conditions",
          "Strings: parsing, regex-like pattern matching",
          "Math-heavy: GCD, modular arithmetic, probability"
        ]
      },
      {
        heading: "Quant aptitude section",
        body: [
          "If your role is Engineering Analyst or Quant, expect probability and statistics questions. Topics: conditional probability, expected value, permutations/combinations, basic linear algebra. Practice from CAT-level quant materials and probability puzzles."
        ]
      },
      {
        heading: "After the OA — interview loop",
        body: [
          "GS typically has 2–3 technical interviews after the OA. Each covers a coding problem, CS fundamentals, and sometimes a system design or puzzle question. Behavioral focuses on teamwork, ethics, and why finance + tech."
        ]
      },
      {
        heading: "How Apply helps for Goldman Sachs",
        body: [
          "Tailor your resume with GS JD language (Python/Java, algorithms, data structures, analytical). Use Interview prep with company set to Goldman Sachs for practice questions. Learning tracks cover DSA and system design fundamentals."
        ]
      }
    ]
  },
  {
    slug: "cisco-interview-questions",
    title: "Cisco Interview Questions 2026: Technical & Coding Guide",
    description:
      "Cisco fresher interview questions for 2026 — coding round, technical topics, networking basics, and preparation strategy for software engineer roles in India.",
    companyId: "cisco",
    companyName: "Cisco",
    category: "interview",
    targetKeyword: "Cisco interview questions 2026",
    keywords: [
      "Cisco interview questions 2026",
      "Cisco fresher interview",
      "Cisco technical interview India",
      "Cisco software engineer interview"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-15",
    readingTime: "7 min read",
    excerpt:
      "Cisco interviews blend coding, networking fundamentals, and OS concepts. They are lighter on hard DSA than Amazon but heavier on networking and systems knowledge. Here is what to prepare.",
    primaryCta: {
      label: "Prepare for Cisco interview",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor resume for Cisco", href: "/dashboard/generate" },
      { label: "Browse networking roles", href: "/dashboard/jobs" }
    ],
    relatedSlugs: [
      "deloitte-nla",
      "amazon-sde-internship-india",
      "goldman-sachs-oa-questions"
    ],
    sections: [
      {
        heading: "Cisco interview rounds",
        body: [
          "Typically: online coding test → technical interview (1–2 rounds) → managerial/HR. The coding test is moderate — 1–2 problems at easy-medium level. Technical interviews cover coding + CS fundamentals + networking basics."
        ]
      },
      {
        heading: "Technical topics to prepare",
        body: [
          "Cisco is a networking company — expect questions on protocols, OSI model, and basic network architecture even for software roles. Combine this with standard DSA and OS topics."
        ],
        bullets: [
          "Networking: OSI layers, TCP vs UDP, HTTP, DNS, IP addressing",
          "OS: processes vs threads, scheduling, deadlock",
          "DSA: arrays, linked lists, trees, basic graph traversal",
          "Programming: C/C++ or Python/Java — know one well",
          "Project: explain architecture and tradeoffs clearly"
        ]
      },
      {
        heading: "Coding round difficulty",
        body: [
          "Cisco coding problems are usually LeetCode easy-medium. Expect: string manipulation, array traversal, basic DP, and sometimes a networking-related coding problem (parse a packet header, simulate a protocol)."
        ]
      },
      {
        heading: "How Apply helps for Cisco",
        body: [
          "Tailor your resume with Cisco JD keywords (C/C++, Python, networking, embedded, protocols). Use Interview prep with company set to Cisco for practice. Learning tracks cover DSA and system design fundamentals you need."
        ]
      }
    ]
  },
  {
    slug: "zoho-interview-process",
    title: "Zoho Interview Process 2026: Coding, Technical & HR Guide",
    description:
      "Zoho fresher interview process for 2026 — multi-round coding test, technical interview depth, and preparation tips for software engineer roles in India.",
    companyId: "zoho",
    companyName: "Zoho",
    category: "process",
    targetKeyword: "Zoho interview process 2026",
    keywords: [
      "Zoho interview process 2026",
      "Zoho fresher interview",
      "Zoho coding test",
      "Zoho technical interview questions"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-15",
    readingTime: "7 min read",
    excerpt:
      "Zoho has a unique multi-round process — a long coding test, advanced programming round, and technical interview. It is harder than most service companies but rewards strong fundamentals and clean code.",
    primaryCta: {
      label: "Prepare for Zoho interview",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor resume for Zoho", href: "/dashboard/generate" },
      { label: "Practice mock interview", href: "/dashboard/mock-interview" }
    ],
    relatedSlugs: [
      "flipkart-grid",
      "cisco-interview-questions",
      "hcltech-interview-questions"
    ],
    sections: [
      {
        heading: "Zoho interview rounds",
        body: [
          "Zoho's process is longer than most: written aptitude → coding test (basic) → advanced programming round → technical interview → HR. The advanced programming round is what sets Zoho apart — you build a small module or solve a complex problem in 2–3 hours."
        ],
        bullets: [
          "Round 1: Aptitude + basic programming (30–40 min)",
          "Round 2: Coding test — 3–5 problems, easy to medium",
          "Round 3: Advanced programming — design + implement a module (2–3 hours)",
          "Round 4: Technical interview — DSA + resume + CS fundamentals",
          "Round 5: HR — fit, salary, location (Chennai/Salem/Tenkasi)"
        ]
      },
      {
        heading: "The advanced programming round",
        body: [
          "This is unique to Zoho. You are given a problem (often a mini-application: text editor, cache system, file parser) and asked to design + implement it within 2–3 hours. They review your code for correctness, design, and edge-case handling.",
          "Preparation: practice building small console applications from scratch. Focus on clean code, separation of concerns, and handling invalid input gracefully."
        ]
      },
      {
        heading: "Technical interview depth",
        body: [
          "Zoho technical interviews go deep into your strongest language. If you say Java, expect questions on collections internals, JVM basics, exception handling, and multi-threading. If C/C++, expect pointers, memory management, and data structure implementation from scratch."
        ]
      },
      {
        heading: "How Apply helps for Zoho",
        body: [
          "Tailor your resume with Zoho's tech stack (Java, C, C++, Python, SQL). Use Interview prep with company set to Zoho for practice questions. Mock interview helps you rehearse your project explanation — Zoho interviewers ask deep 'why' questions about your choices."
        ]
      }
    ]
  },
  {
    slug: "adobe-oa-questions",
    title: "Adobe OA Questions 2026: Online Assessment Guide",
    description:
      "Adobe online assessment questions for 2026 fresher hiring — coding difficulty, problem patterns, and preparation strategy for software engineer roles in India.",
    companyId: "adobe",
    companyName: "Adobe",
    category: "oa",
    targetKeyword: "Adobe OA questions 2026",
    keywords: [
      "Adobe OA questions 2026",
      "Adobe online assessment",
      "Adobe coding test India",
      "Adobe fresher OA"
    ],
    publishedAt: "2026-07-10",
    updatedAt: "2026-07-15",
    readingTime: "6 min read",
    excerpt:
      "Adobe's OA is coding-focused with 2–3 problems at medium difficulty. They value clean, efficient solutions with good complexity analysis. Here is the format and what to practice.",
    primaryCta: {
      label: "Prepare for Adobe OA",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Tailor resume for Adobe", href: "/dashboard/generate" },
      { label: "Practice DSA", href: "/dashboard/learners" }
    ],
    relatedSlugs: [
      "amazon-oa-questions",
      "goldman-sachs-oa-questions",
      "morgan-stanley-oa"
    ],
    sections: [
      {
        heading: "Adobe OA format",
        body: [
          "Adobe's online assessment typically has 2–3 coding problems with a 60–90 minute time limit. Problems are LeetCode medium level with a mix of arrays, strings, trees, and sometimes DP or graph problems.",
          "Adobe values solution quality — a clean O(n log n) solution beats a messy O(n) one. Always discuss complexity in comments."
        ]
      },
      {
        heading: "Problem patterns to practice",
        body: [
          "Adobe tends to ask problems that combine two concepts — e.g., hash map + sorting, or sliding window + two pointers. Practice problems that require multiple data structures working together."
        ],
        bullets: [
          "Arrays + hash maps: frequency, grouping, two-sum variants",
          "Strings: parsing, pattern matching, substring search",
          "Trees: traversal, LCA, level-order",
          "DP: 1D and simple 2D problems",
          "System design light: sometimes a design-a-class problem"
        ]
      },
      {
        heading: "After the OA",
        body: [
          "Adobe typically has 2–3 interview rounds after the OA: technical (coding + CS fundamentals), system design or advanced coding, and behavioral. The technical round re-asks a coding problem — sometimes harder than the OA."
        ]
      },
      {
        heading: "How Apply helps for Adobe",
        body: [
          "Tailor your resume with Adobe JD keywords (C++, Java, Python, algorithms, data structures, creativity). Use Interview prep with company set to Adobe. Learning tracks cover DSA patterns you need for the OA."
        ]
      }
    ]
  },
  {
    slug: "phonepe-interview-questions-2026",
    title: "PhonePe Interview Questions 2026: SDE & Coding",
    description:
      "PhonePe interview questions 2026 for SDE and backend — OA coding, system design, HR rounds. Practice PhonePe mock interviews free on Apply.",
    companyId: "phonepe",
    companyName: "PhonePe",
    category: "interview",
    targetKeyword: "PhonePe interview questions 2026",
    keywords: [
      "PhonePe interview questions 2026",
      "PhonePe SDE interview",
      "PhonePe backend engineer interview",
      "PhonePe coding questions",
      "PhonePe online assessment",
      "PhonePe interview experience India",
      "PhonePe hiring process",
      "fintech interview questions India"
    ],
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-21",
    readingTime: "9 min",
    excerpt:
      "PhonePe hires SDE 1, SDE 2, and backend engineers for its Bengaluru fintech platform. Here is the complete interview process — OA, coding, system design, and HR — with preparation tips.",
    sections: [
      {
        heading: "PhonePe interview process overview",
        body: [
          "PhonePe typically conducts 3-4 rounds: online assessment (OA), 1-2 technical interviews, and a hiring manager / HR round. The process takes 1-2 weeks.",
          "OA: 2-3 coding problems (medium/hard) on HackerRank or similar platform. 60-90 minutes. DSA focus: arrays, strings, trees, graphs, DP.",
          "Technical round 1: Coding problem + core CS fundamentals (OS, DBMS, OOP). Deep dive into one of your projects.",
          "Technical round 2: System design (for SDE 2+) or harder coding problem. Questions on scalability, caching, databases.",
          "HR / hiring manager: Behavioral, past experience, why PhonePe, compensation discussion."
        ]
      },
      {
        heading: "PhonePe coding questions (previous year)",
        body: [
          "Array manipulation: subarray sum, two pointers, sliding window",
          "Graph problems: shortest path, connected components, BFS/DFS",
          "String problems: pattern matching, anagram groups, palindrome variations",
          "Tree problems: level order traversal, LCA, diameter",
          "DP problems: knapsack, LIS, coin change variations",
          "Check PhonePe previous year coding questions on Apply PYQs for exact problems asked."
        ]
      },
      {
        heading: "System design questions at PhonePe",
        body: [
          "Design a UPI payment system — handle transactions, idempotency, reconciliation",
          "Design a wallet system — balance management, concurrency, ledger",
          "Design a notification system — push notifications, SMS, email aggregation",
          "Focus on: database choice (SQL vs NoSQL), caching (Redis), message queues (Kafka), and failure handling"
        ]
      },
      {
        heading: "How to prepare for PhonePe interviews",
        body: [
          "Practice 50+ medium LeetCode problems focusing on arrays, strings, trees, and graphs. PhonePe loves DSA fundamentals.",
          "Read about fintech architecture: UPI, payment gateways, idempotency, distributed transactions.",
          "Prepare 2 projects with clear tech stack explanations — PhonePe values hands-on building.",
          "Use Apply's mock interview at /mock-interview with company set to PhonePe for realistic practice."
        ]
      },
      {
        heading: "PhonePe interview tips",
        body: [
          "PhonePe values clean, production-quality code. Write readable code with good variable names.",
          "Know your projects inside out — be ready to explain architecture, trade-offs, and what you'd do differently.",
          "For system design, start with requirements clarification, then high-level design, then deep dive.",
          "Research PhonePe's products: UPI, Wallet, Switch, POS. Reference them in your answers."
        ]
      },
      {
        heading: "How Apply helps for PhonePe",
        body: [
          "Tailor your resume with PhonePe JD keywords (Java, Spring Boot, Kafka, Redis, distributed systems) at /dashboard/generate.",
          "Browse PhonePe PYQs at /pyqs. Start a PhonePe mock interview at /mock-interview — set company to PhonePe, type technical, coding enabled."
        ]
      }
    ],
    primaryCta: { label: "Start PhonePe mock interview", href: "/mock-interview" },
    secondaryCtas: [
      { label: "PhonePe PYQs", href: "/pyqs" },
      { label: "Tailor resume for PhonePe", href: "/dashboard/generate" }
    ],
    relatedSlugs: ["amazon-sde-internship-india", "razorpay-interview-questions-2026", "swiggy-interview-questions-2026"]
  },
  {
    slug: "razorpay-interview-questions-2026",
    title: "Razorpay Interview Questions 2026: SDE, Backend & Coding Guide",
    description:
      "Razorpay interview questions for SDE 1, SDE 2, and full stack roles. Covers coding OA, system design, technical interview, and hiring process for India's leading fintech.",
    companyId: "razorpay",
    companyName: "Razorpay",
    category: "interview",
    targetKeyword: "Razorpay interview questions 2026",
    keywords: [
      "Razorpay interview questions 2026",
      "Razorpay SDE interview",
      "Razorpay coding questions",
      "Razorpay backend engineer interview",
      "Razorpay online assessment",
      "Razorpay interview experience",
      "Razorpay hiring process India",
      "fintech SDE interview questions"
    ],
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "9 min",
    excerpt:
      "Razorpay hires SDE 1 and SDE 2 for its Bengaluru fintech platform. Here is the complete interview guide — OA coding, system design, technical rounds, and preparation strategy.",
    sections: [
      {
        heading: "Razorpay interview process overview",
        body: [
          "Razorpay typically conducts 3-4 rounds: online coding assessment, 2 technical interviews, and a hiring manager round. The process takes 1-2 weeks.",
          "OA: 2 coding problems (medium/hard) on HackerRank/CodeSignal. 75 minutes. Focus on DSA and problem-solving.",
          "Technical round 1: Coding problem + CS fundamentals (OS, DBMS, OOP, computer networks).",
          "Technical round 2: System design or harder coding problem + project deep dive.",
          "Hiring manager: Behavioral, culture fit, why Razorpay, compensation."
        ]
      },
      {
        heading: "Razorpay coding questions (previous year)",
        body: [
          "Array + hash map: frequency counting, two-sum variations, group anagrams",
          "Tree + graph: BST operations, graph traversal, shortest path",
          "DP: coin change, LIS, edit distance",
          "String: regex matching, substring search, compression",
          "Check Razorpay previous year coding questions on Apply PYQs for exact problems."
        ]
      },
      {
        heading: "System design at Razorpay",
        body: [
          "Design a payment gateway — handle webhooks, idempotency, retry logic",
          "Design a subscription billing system — recurring payments, invoicing",
          "Design a loan eligibility system — credit scoring, risk assessment",
          "Key concepts: distributed systems, ACID vs BASE, message queues, caching strategies"
        ]
      },
      {
        heading: "How to prepare for Razorpay interviews",
        body: [
          "Solve 60+ medium/hard LeetCode problems. Razorpay asks real DSA problems, not just easy ones.",
          "Understand payment systems: gateways, UPI, cards, net banking, settlement, reconciliation.",
          "Prepare 2 strong projects — Razorpay values builders and side projects.",
          "Practice with Apply's mock interview at /mock-interview with company set to Razorpay."
        ]
      },
      {
        heading: "How Apply helps for Razorpay",
        body: [
          "Tailor your resume with Razorpay JD keywords (React, Node.js, TypeScript, PostgreSQL, Kafka). Browse Razorpay PYQs at /pyqs."
        ]
      }
    ],
    primaryCta: { label: "Tailor resume for Razorpay", href: "/dashboard/generate" },
    secondaryCtas: [
      { label: "Razorpay PYQs", href: "/pyqs" },
      { label: "Practice mock interview", href: "/mock-interview" }
    ],
    relatedSlugs: ["phonepe-interview-questions-2026", "swiggy-interview-questions-2026", "amazon-sde-internship-india"]
  },
  {
    slug: "swiggy-interview-questions-2026",
    title: "Swiggy Interview Questions 2026: SDE, Backend & Data Science Guide",
    description:
      "Swiggy interview questions for SDE 1, SDE 2, backend engineer, and data scientist roles. Covers coding OA, system design, and technical interview rounds with prep strategy.",
    companyId: "swiggy",
    companyName: "Swiggy",
    category: "interview",
    targetKeyword: "Swiggy interview questions 2026",
    keywords: [
      "Swiggy interview questions 2026",
      "Swiggy SDE interview",
      "Swiggy coding questions",
      "Swiggy backend engineer interview",
      "Swiggy data scientist interview",
      "Swiggy online assessment",
      "Swiggy interview experience India",
      "food tech interview questions"
    ],
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "9 min",
    excerpt:
      "Swiggy hires SDE 1, SDE 2, backend engineers, and data scientists in Bengaluru. Here is the complete interview guide — OA, system design, and technical rounds.",
    sections: [
      {
        heading: "Swiggy interview process overview",
        body: [
          "Swiggy conducts 3-4 rounds: online assessment, 2 technical interviews, and a hiring manager round. Process takes 1-2 weeks.",
          "OA: 2 coding problems (medium/hard) on HackerRank. 60-90 minutes.",
          "Technical round 1: Coding + CS fundamentals + project discussion.",
          "Technical round 2: System design (for SDE 2+) or advanced coding + architecture discussion.",
          "Hiring manager: Behavioral, culture fit, past experience."
        ]
      },
      {
        heading: "Swiggy coding questions (previous year)",
        body: [
          "Graph problems: delivery route optimization, shortest path, BFS/DFS",
          "Array + greedy: scheduling, interval problems, optimization",
          "DP: knapsack, matrix DP, string DP",
          "System design: design food delivery system, design restaurant search, design order tracking",
          "Check Swiggy previous year coding questions on Apply PYQs for exact problems."
        ]
      },
      {
        heading: "Swiggy system design questions",
        body: [
          "Design a food delivery app — order placement, restaurant catalog, delivery assignment",
          "Design a real-time order tracking system — GPS updates, ETA prediction",
          "Design a restaurant recommendation engine — ranking, personalization",
          "Key concepts: geospatial indexing, real-time updates (WebSockets), caching, load balancing"
        ]
      },
      {
        heading: "How to prepare for Swiggy interviews",
        body: [
          "Practice DSA with focus on graphs and greedy — Swiggy's domain involves routing and optimization.",
          "Understand food delivery architecture: order management, catalog, dispatch, tracking.",
          "For data science roles: practice SQL, Python, statistics, A/B testing, and ML case studies.",
          "Use Apply's mock interview at /mock-interview with company set to Swiggy."
        ]
      },
      {
        heading: "How Apply helps for Swiggy",
        body: [
          "Tailor your resume with Swiggy JD keywords (React, Node.js, MongoDB, Kafka, system design). Browse Swiggy PYQs at /pyqs."
        ]
      }
    ],
    primaryCta: { label: "Tailor resume for Swiggy", href: "/dashboard/generate" },
    secondaryCtas: [
      { label: "Swiggy PYQs", href: "/pyqs" },
      { label: "Practice mock interview", href: "/mock-interview" }
    ],
    relatedSlugs: ["phonepe-interview-questions-2026", "razorpay-interview-questions-2026", "zomato-interview-questions-2026"]
  },
  {
    slug: "zomato-interview-questions-2026",
    title: "Zomato Interview Questions 2026: SDE, Backend & Coding Guide",
    description:
      "Zomato interview questions for SDE 1, SDE 2, backend engineer, and UI/UX roles. Covers coding OA, system design, and technical interview rounds with preparation tips.",
    companyId: "zomato",
    companyName: "Zomato",
    category: "interview",
    targetKeyword: "Zomato interview questions 2026",
    keywords: [
      "Zomato interview questions 2026",
      "Zomato SDE interview",
      "Zomato coding questions",
      "Zomato backend engineer interview",
      "Zomato online assessment",
      "Zomato interview experience India",
      "Zomato hiring process",
      "food delivery interview questions"
    ],
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "8 min",
    excerpt:
      "Zomato hires SDE 1, SDE 2, and backend engineers in Gurugram and Bengaluru. Here is the complete interview guide — OA, coding, system design, and HR rounds.",
    sections: [
      {
        heading: "Zomato interview process overview",
        body: [
          "Zomato conducts 3-4 rounds: online assessment, 1-2 technical interviews, and a cultural fit / HR round. Process takes 1-2 weeks.",
          "OA: 2 coding problems (medium/hard) on HackerRank. 60-75 minutes.",
          "Technical round: Coding + CS fundamentals + project deep dive.",
          "HR round: Culture fit, why Zomato, behavioral questions."
        ]
      },
      {
        heading: "Zomato coding questions (previous year)",
        body: [
          "Array problems: sorting, searching, frequency counting",
          "String problems: pattern matching, parsing, compression",
          "Graph problems: shortest path, traversal, connectivity",
          "DP: classic problems like knapsack, LIS, coin change",
          "Check Zomato previous year coding questions on Apply PYQs for exact problems."
        ]
      },
      {
        heading: "Zomato system design questions",
        body: [
          "Design a restaurant search and discovery system",
          "Design an order tracking and delivery system",
          "Design a review and rating system with fraud detection",
          "Key concepts: search indexing, geospatial queries, caching, recommendation systems"
        ]
      },
      {
        heading: "How to prepare for Zomato interviews",
        body: [
          "Practice DSA fundamentals — Zomato asks medium difficulty problems consistently.",
          "Understand food delivery domain: catalog, search, orders, delivery, ratings.",
          "Research Zomato's products: food delivery, Zomato Gold, Hyperpure. Reference them in answers.",
          "Use Apply's mock interview at /mock-interview with company set to Zomato."
        ]
      },
      {
        heading: "How Apply helps for Zomato",
        body: [
          "Tailor your resume with Zomato JD keywords (React, Node.js, Python, MongoDB, system design). Browse Zomato PYQs at /pyqs."
        ]
      }
    ],
    primaryCta: { label: "Tailor resume for Zomato", href: "/dashboard/generate" },
    secondaryCtas: [
      { label: "Zomato PYQs", href: "/pyqs" },
      { label: "Practice mock interview", href: "/mock-interview" }
    ],
    relatedSlugs: ["swiggy-interview-questions-2026", "phonepe-interview-questions-2026", "razorpay-interview-questions-2026"]
  },
  {
    slug: "paytm-interview-questions-2026",
    title: "Paytm Interview Questions 2026: SDE, Backend & Coding Guide",
    description:
      "Paytm interview questions for SDE 1, SDE 2, and backend engineer roles. Covers coding OA, system design, technical interview, and HR rounds with preparation strategy.",
    companyId: "paytm",
    companyName: "Paytm",
    category: "interview",
    targetKeyword: "Paytm interview questions 2026",
    keywords: [
      "Paytm interview questions 2026",
      "Paytm SDE interview",
      "Paytm coding questions",
      "Paytm backend engineer interview",
      "Paytm online assessment",
      "Paytm interview experience India",
      "Paytm hiring process",
      "fintech interview questions India"
    ],
    publishedAt: "2026-07-16",
    updatedAt: "2026-07-16",
    readingTime: "8 min",
    excerpt:
      "Paytm hires SDE 1, SDE 2, and backend engineers for its Noida fintech platform. Here is the complete interview guide — OA, coding, system design, and HR rounds.",
    sections: [
      {
        heading: "Paytm interview process overview",
        body: [
          "Paytm conducts 3-4 rounds: online assessment, 2 technical interviews, and an HR round. Process takes 1-2 weeks.",
          "OA: 2-3 coding problems (medium) on HackerRank. 60-90 minutes.",
          "Technical round 1: Coding + CS fundamentals (Java, Spring Boot, microservices for backend roles).",
          "Technical round 2: System design + project deep dive.",
          "HR round: Behavioral, why Paytm, compensation."
        ]
      },
      {
        heading: "Paytm coding questions (previous year)",
        body: [
          "Array + hash map: frequency, two-sum, group problems",
          "String: parsing, matching, compression",
          "Tree: traversal, BST operations, level order",
          "System design: design payment system, design wallet, design UPI integration",
          "Check Paytm previous year coding questions on Apply PYQs for exact problems."
        ]
      },
      {
        heading: "System design at Paytm",
        body: [
          "Design a UPI payment system — transaction flow, idempotency, reconciliation",
          "Design a wallet system — balance, ledger, concurrency control",
          "Design a merchant onboarding system — KYC, verification, activation",
          "Key concepts: distributed transactions, message queues (Kafka), caching (Redis), microservices"
        ]
      },
      {
        heading: "How to prepare for Paytm interviews",
        body: [
          "For backend roles: master Java, Spring Boot, microservices, Kafka, SQL. Paytm backend is Java-heavy.",
          "Practice 50+ medium LeetCode problems. Paytm coding is moderate difficulty.",
          "Understand fintech: UPI, wallets, payments, settlements, KYC.",
          "Use Apply's mock interview at /mock-interview with company set to Paytm."
        ]
      },
      {
        heading: "How Apply helps for Paytm",
        body: [
          "Tailor your resume with Paytm JD keywords (Java, Spring Boot, Microservices, SQL, Kafka). Browse Paytm PYQs at /pyqs."
        ]
      }
    ],
    primaryCta: { label: "Tailor resume for Paytm", href: "/dashboard/generate" },
    secondaryCtas: [
      { label: "Paytm PYQs", href: "/pyqs" },
      { label: "Practice mock interview", href: "/mock-interview" }
    ],
    relatedSlugs: ["phonepe-interview-questions-2026", "razorpay-interview-questions-2026", "amazon-sde-internship-india"]
  },
  {
    slug: "tcs-resume-format",
    title: "TCS Resume Format for Freshers 2026: Ninja, Digital & NQT Guide",
    description:
      "TCS resume format for freshers — what the TCS application form and interview panels expect, sections, skills, and a fillable structure for Ninja, Digital, and Prime roles.",
    companyId: "tcs",
    companyName: "TCS",
    category: "resume",
    targetKeyword: "TCS resume format for freshers",
    keywords: [
      "tcs resume format",
      "tcs resume for freshers",
      "tcs ninja resume",
      "tcs digital resume format",
      "resume for tcs nqt"
    ],
    publishedAt: "2026-08-06",
    updatedAt: "2026-08-06",
    readingTime: "7 min read",
    excerpt:
      "TCS screens thousands of fresher resumes through NQT shortlisting and campus forms. A clean, ATS-safe format with verifiable projects gets your application read.",
    questionBankKey: "tcs",
    primaryCta: {
      label: "Tailor resume for TCS JD",
      href: "/dashboard/generate"
    },
    secondaryCtas: [
      { label: "Practice TCS mock interview", href: "/mock-interview/tcs" },
      { label: "TCS PYQs", href: "/pyqs" }
    ],
    relatedSlugs: [
      "tcs-interview-questions-2026",
      "infosys-resume-format",
      "wipro-technical-interview"
    ],
    sections: [
      {
        heading: "How TCS reads resumes",
        body: [
          "TCS hiring flows through two channels: the online application form (with its own structured fields) and your PDF resume, which interview panels read during the technical and HR rounds. Both should match.",
          "Panels spend most of the technical round walking through your resume line by line. Every project, skill, and certification you list must be explainable in an interview.",
          "For campus drives, the resume also crosses the placement cell — keep it one page, PDF, and ATS-parseable."
        ],
        bullets: [
          "Header: name, contact, LinkedIn, GitHub (if you have one)",
          "Summary: 2–3 lines — degree, core skills, target role",
          "Skills: one language in depth + SQL, DBMS, OOP, web basics",
          "Projects: 2–3 with stack and outcome",
          "Education: degree, college, CGPA, relevant coursework",
          "Certifications and achievements: only role-relevant ones"
        ]
      },
      {
        heading: "Section order that works for TCS",
        body: [
          "Header → Summary → Skills → Projects → Education → Certifications → Achievements. Skills and projects come before education because TCS technical panels probe skills and projects first.",
          "If you have an internship, place it above projects. If you do not, lead with two strong projects with real implementation detail."
        ]
      },
      {
        heading: "Skills TCS panels actually ask about",
        body: [
          "For Ninja and ASE tracks: Java or Python basics, OOP, SQL, DBMS, OS fundamentals, and basic web (HTML/CSS/JS or any framework you used). For Digital and Prime: deeper Java, REST APIs, cloud basics, and project architecture.",
          "List only skills you can explain in 2 minutes each. A resume keyword without interview knowledge is the fastest way to fail the technical round."
        ]
      },
      {
        heading: "Formatting rules for the TCS resume",
        body: [
          "One page, standard headings, consistent dates, and a clean PDF export. Avoid photos, icons, and tables for core content — both ATS and TCS panels prefer plain structure.",
          "Use Apply's resume builder to structure the TCS format and export an ATS-safe PDF, then practice the technical round at /mock-interview/tcs."
        ]
      }
    ]
  },
  {
    slug: "google-apprenticeship-guide",
    title: "Google Apprenticeship 2026: Roles, Resume & Interview Guide",
    description:
      "Google apprenticeship in India — roles, eligibility, resume tips, and interview rounds for apprenticeships at Google that need no prior experience.",
    companyId: "google",
    companyName: "Google",
    category: "internship",
    targetKeyword: "Google apprenticeship 2026 India",
    keywords: [
      "google apprenticeship",
      "google apprenticeship resume",
      "google apprenticeship India",
      "google apprenticeship 2026",
      "google apprenticeship interview"
    ],
    publishedAt: "2026-08-06",
    updatedAt: "2026-08-06",
    readingTime: "6 min read",
    excerpt:
      "Google apprenticeships are paid, no-experience-required programs in tech and digital roles. Here is who qualifies, what the resume needs, and how the interview goes.",
    questionBankKey: "google",
    primaryCta: {
      label: "Tailor resume for apprenticeship",
      href: "/dashboard/generate"
    },
    secondaryCtas: [
      { label: "Google apprenticeship resume blog", href: "/blog/google-apprenticeship-resume" },
      { label: "Practice interview", href: "/mock-interview/google" }
    ],
    relatedSlugs: [
      "google-step-resume",
      "microsoft-internship-guide",
      "amazon-sde-internship-india"
    ],
    sections: [
      {
        heading: "What Google apprenticeships are",
        body: [
          "Google apprenticeships are structured, paid programs that combine on-the-job learning with formal training — open to candidates without a formal tech degree or experience. In India, roles include digital marketing, data analytics, UX, and software engineering tracks depending on the cycle.",
          "Apprenticeships differ from internships: they are longer, include formal certification, and are designed as a career entry point rather than a semester attachment.",
          "Eligibility is announced per posting — some tracks accept recent graduates, others are open to non-degree candidates. Read the specific posting before preparing."
        ]
      },
      {
        heading: "The resume for an apprenticeship",
        body: [
          "Apprenticeship resumes are judged on potential, not experience: show projects, self-learning (courses with certificates, practice portfolios), and communication skills. Keep it one page and ATS-safe.",
          "For tech tracks, lead with projects and GitHub. For marketing and analytics tracks, lead with measurable outcomes — campaigns run, data analyzed, audiences grown — from any context, including college work.",
          "Use the Google apprenticeship resume guide at /blog/google-apprenticeship-resume for the full walkthrough."
        ]
      },
      {
        heading: "The interview and selection process",
        body: [
          "The process typically includes an online application, an assessment or video-based questions, and one or more interviews focused on problem solving, communication, and growth mindset — not competitive programming.",
          "Prepare answers about why you want the apprenticeship, how you learn new skills, and situations where you collaborated or solved a problem. STAR stories work well here."
        ]
      },
      {
        heading: "How to prepare and apply",
        body: [
          "Watch the Google careers page for apprenticeship openings — they open on a cycle and fill quickly. Tailor the resume per track, practice video answers aloud, and run a mock interview at /mock-interview/google before the real call."
        ]
      }
    ]
  },
  {
    slug: "group-discussion-placements",
    title: "Group Discussion Guide for Campus Placements: Rules and Scoring",
    description:
      "Group discussion for campus placement — format, rules, scoring criteria, common topics, and how to speak effectively in a GD round.",
    companyId: "tcs",
    companyName: "TCS",
    category: "interview",
    targetKeyword: "group discussion for campus placement",
    keywords: [
      "group discussion for campus placement",
      "group discussion format",
      "group discussion rules",
      "gd for placements",
      "group discussion topics"
    ],
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    readingTime: "6 min read",
    excerpt:
      "Group discussions are a screening round at many campus drives. Learn the format, what panels score, and how to speak effectively without dominating.",
    primaryCta: {
      label: "Practice GD-style speaking",
      href: "/dashboard/interview"
    },
    secondaryCtas: [
      { label: "Group discussion tips blog", href: "/blog/group-discussion-tips-campus-placements" },
      { label: "GD format and rules blog", href: "/blog/group-discussion-format-and-rules" }
    ],
    relatedSlugs: [
      "tcs-interview-questions-2026",
      "cognizant-aptitude-questions",
      "wipro-technical-interview"
    ],
    sections: [
      {
        heading: "The standard GD format",
        body: [
          "A group of 6–12 candidates gets one topic, 3–5 minutes to think, then 10–20 minutes of open discussion with a panel observing. Some rounds end with a summary by one participant.",
          "The moderator announces rules and then the group manages itself — how the group structures the discussion is part of the evaluation."
        ]
      },
      {
        heading: "What panels score",
        body: [
          "Content: valid, relevant points. Structure: organized arguments. Participation: effective frequency, not raw volume. Listening: building on others' points. Language: clarity over vocabulary.",
          "Interruptions, monologues, and repeating others' points are penalized. A well-timed new point or a summary invitation scores more than speaking the most."
        ]
      },
      {
        heading: "Speaking effectively in a GD",
        body: [
          "Use signposts: I agree with the previous point, and I would add. Give each point a mini-structure — claim, reason, example. Invite quieter members to speak — panels notice inclusive behavior.",
          "For the summary, capture both sides: the consensus, the strongest argument on each side, and a conclusion, in under 60 seconds. Volunteer only if you can deliver that structure."
        ]
      },
      {
        heading: "Common topics and preparation",
        body: [
          "Technology (AI in daily life, social media, online education), current affairs (startup culture, digital payments), and social topics (competition among students, gender equality) appear most often.",
          "Prepare both-side notes for 30 topics, memorize 3–4 recent facts with dates, and practice 60-second structured openings aloud daily. The tips guide at /blog/group-discussion-tips-campus-placements has the full method."
        ]
      }
    ]
  },
  {
    slug: "off-campus-placement-process",
    title: "Off Campus Placement Process for Freshers: Complete Guide",
    description:
      "The off campus placement process step by step — finding openings, applying, clearing tests and interviews, and converting offers without campus hiring.",
    companyId: "tcs",
    companyName: "TCS",
    category: "process",
    targetKeyword: "off campus placement process",
    keywords: [
      "off campus placement process",
      "off campus placement for freshers",
      "how to get off campus placement",
      "off campus placement guide 2026",
      "off campus job process India"
    ],
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    readingTime: "7 min read",
    excerpt:
      "Off campus placement is a self-managed process — apply early, track everything, and prepare tests and interviews while applications run.",
    primaryCta: {
      label: "Tailor a resume per role",
      href: "/dashboard/generate"
    },
    secondaryCtas: [
      { label: "Off campus step-by-step blog", href: "/blog/off-campus-placement-step-by-step" },
      { label: "Off campus preparation guide", href: "/blog/off-campus-placement-preparation-guide" }
    ],
    relatedSlugs: [
      "tcs-interview-questions-2026",
      "infosys-resume-format",
      "amazon-sde-internship-india"
    ],
    sections: [
      {
        heading: "The off campus application pipeline",
        body: [
          "Off campus hiring runs through three channels: dedicated fresher drives (Infosys Superset, TCS off-campus, Wipro drives), direct applications on career pages, and referrals. Each has its own timeline — run all three in parallel.",
          "The standard pipeline: application → online test (aptitude, coding, or both) → technical interview(s) → HR round → offer. Most candidates lose at the application or test stage, not the interviews."
        ]
      },
      {
        heading: "Step 1: Build the application stack",
        body: [
          "A role-matched ATS resume, a complete LinkedIn profile, and a project portfolio (GitHub or a simple site) are the baseline. Keep the resume tailored per role family — same experience, role language, matched skills.",
          "For fresher drives, register the moment windows open. Eligibility is batch-specific and some drives close within days."
        ]
      },
      {
        heading: "Step 2: Prepare for the test stage",
        body: [
          "Most off campus tests combine aptitude and coding. Take company PYQs and mock tests weekly, and keep a mistake log — the test stage is where consistent preparation converts into callbacks.",
          "For product companies, practice timed OA simulations with 2–3 medium problems. For services, aptitude speed matters equally."
        ]
      },
      {
        heading: "Step 3: Clear the interviews",
        body: [
          "When interviews arrive, run company-flavored mock sessions — technical, project deep-dives, and HR — so the rounds feel rehearsed. Track every application in a spreadsheet: company, role, deadline, stage, next action.",
          "Follow up politely after 5–7 working days of silence. The full method is in the off campus guide at /blog/off-campus-placement-preparation-guide."
        ]
      },
      {
        heading: "How Apply supports the process",
        body: [
          "Tailor resumes per role at /dashboard/generate, practice mock interviews at /mock-interview, and work through company PYQs at /pyqs — the three stages of every off campus application."
        ]
      }
    ]
  }
];
