/**
 * Learner roadmaps, YouTube videos, and free courses — edit content here.
 * Used by: /dashboard/learners, /dashboard/interview (video grid).
 * Re-exported from lib/data/learning-resources.ts for backward-compatible imports.
 */

export type YouTubeVideo = {
  id: string;
  title: string;
  channel: string;
  duration: string;
  focus: string;
};

export type CourseResource = {
  title: string;
  provider: string;
  url: string;
  focus: string;
  free: boolean;
};

export type PlatformLink = {
  name: string;
  url: string;
  description: string;
  icon: string;
};

export type RoadmapStep = {
  phase: string;
  title: string;
  duration: string;
  tasks: string[];
  resources: string[];
};

export type LearnerTrack = {
  id: string;
  category: "web-dev" | "dsa" | "system-design" | "ai-ml";
  subTrack: string;
  label: string;
  description: string;
  yearRange: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  roadmap: RoadmapStep[];
  platforms: PlatformLink[];
  videos: YouTubeVideo[];
  courses: CourseResource[];
};

function yt(id: string, title: string, channel: string, duration: string, focus: string): YouTubeVideo {
  return { id, title, channel, duration, focus };
}

export const interviewPrepVideos: YouTubeVideo[] = [
  yt("XKu_SEDAykw", "Google Coding Interview With Example", "Clément Mihailescu", "47 min", "Coding rounds"),
  yt("tJcloseKfyc", "System Design Interview – Step by Step", "Gaurav Sen", "38 min", "System design"),
  yt("1qw5ITr3kCc", "Behavioral Interview Questions & Answers", "Dan Croitor", "22 min", "HR / behavioral"),
  yt("M1549e5ayEc", "Data Structures Easy to Advanced", "freeCodeCamp", "8 hr", "DSA fundamentals"),
  yt("zQnBQ4tB3ZA", "Full Stack Web Dev Roadmap 2025", "Traversy Media", "15 min", "Web dev overview")
];

export const interviewPrepCourses: CourseResource[] = [
  {
    title: "Google IT Support Professional Certificate",
    provider: "Google / Coursera",
    url: "https://www.coursera.org/professional-certificates/google-it-support",
    focus: "IT fundamentals for beginners",
    free: true
  },
  {
    title: "Meta Front-End Developer",
    provider: "Meta / Coursera",
    url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    focus: "React, HTML, CSS, JavaScript",
    free: true
  },
  {
    title: "Algorithms Specialization",
    provider: "Stanford / Coursera",
    url: "https://www.coursera.org/specializations/algorithms",
    focus: "Advanced DSA",
    free: true
  },
  {
    title: "System Design Interview Course",
    provider: "Educative",
    url: "https://www.educative.io/courses/grokking-the-system-design-interview",
    focus: "System design patterns",
    free: false
  },
  {
    title: "Machine Learning Crash Course",
    provider: "Google",
    url: "https://developers.google.com/machine-learning/crash-course",
    focus: "ML fundamentals",
    free: true
  }
];

export const codingPlatforms: PlatformLink[] = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/problemset/",
    description: "150+ curated problems for FAANG prep",
    icon: "LC"
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/domains/algorithms",
    description: "Structured DSA by difficulty",
    icon: "HR"
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/problemset",
    description: "Competitive programming contests",
    icon: "CF"
  },
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/dsa-roadmap-for-beginner-to-advanced/",
    description: "Indian campus placement prep",
    icon: "GFG"
  },
  {
    name: "NeetCode",
    url: "https://neetcode.io/practice",
    description: "Blind 75 + video explanations",
    icon: "NC"
  },
  {
    name: "InterviewBit",
    url: "https://www.interviewbit.com/courses/programming/",
    description: "Company-specific question sets",
    icon: "IB"
  }
];

export const learnerTracks: LearnerTrack[] = [
  {
    id: "frontend",
    category: "web-dev",
    subTrack: "Frontend",
    label: "Frontend Developer",
    description: "HTML, CSS, JavaScript, React — build beautiful UIs from year 1.",
    yearRange: "1st – 4th year",
    difficulty: "Beginner",
    roadmap: [
      {
        phase: "Month 1–2",
        title: "Web foundations",
        duration: "8 weeks",
        tasks: [
          "Learn HTML semantic tags and CSS Flexbox/Grid",
          "Build 2 static pages (portfolio + landing page)",
          "Understand responsive design and mobile-first CSS"
        ],
        resources: ["freeCodeCamp Responsive Web Design", "MDN Web Docs"]
      },
      {
        phase: "Month 3–4",
        title: "JavaScript core",
        duration: "8 weeks",
        tasks: [
          "Master ES6+, DOM manipulation, fetch API",
          "Build a todo app and weather app with vanilla JS",
          "Learn async/await and error handling"
        ],
        resources: ["JavaScript.info", "freeCodeCamp JS course"]
      },
      {
        phase: "Month 5–6",
        title: "React & projects",
        duration: "8 weeks",
        tasks: [
          "Learn React hooks, state, routing (Next.js)",
          "Build 2 portfolio projects with GitHub README",
          "Deploy on Vercel and add to resume"
        ],
        resources: ["React docs", "Next.js learn course"]
      },
      {
        phase: "Month 7+",
        title: "Interview ready",
        duration: "Ongoing",
        tasks: [
          "Practice frontend system design (component architecture)",
          "Solve 30 easy/medium LeetCode JS problems",
          "Prepare project deep-dive stories"
        ],
        resources: ["Frontend Interview Handbook", "GreatFrontEnd"]
      }
    ],
    platforms: codingPlatforms.slice(0, 4),
    videos: [
      yt("qz0aGYrrlhU", "HTML & CSS Full Course", "freeCodeCamp", "11 hr", "Basics"),
      yt("PkZNo7MFNFg", "JavaScript Full Course", "freeCodeCamp", "8 hr", "JS core"),
      yt("bMknfKXIFA8", "React Course – Beginner to Pro", "freeCodeCamp", "11 hr", "React"),
      yt("Tn6-PIqc4UM", "React in 100 Seconds", "Fireship", "2 min", "Quick intro")
    ],
    courses: [
      {
        title: "Responsive Web Design",
        provider: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        focus: "HTML & CSS certification",
        free: true
      },
      {
        title: "Meta Front-End Developer",
        provider: "Coursera",
        url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        focus: "Professional frontend path",
        free: true
      }
    ]
  },
  {
    id: "backend",
    category: "web-dev",
    subTrack: "Backend",
    label: "Backend Developer",
    description: "APIs, databases, Node/Python — server-side engineering from scratch.",
    yearRange: "2nd – 4th year",
    difficulty: "Intermediate",
    roadmap: [
      {
        phase: "Month 1–2",
        title: "Programming + HTTP",
        duration: "8 weeks",
        tasks: [
          "Solid Python or JavaScript fundamentals",
          "Understand HTTP, REST, JSON, status codes",
          "Build a simple REST API with Express or FastAPI"
        ],
        resources: ["FastAPI docs", "Express.js guide"]
      },
      {
        phase: "Month 3–4",
        title: "Databases & auth",
        duration: "8 weeks",
        tasks: [
          "Learn SQL (PostgreSQL) and NoSQL (MongoDB)",
          "Implement JWT auth and CRUD operations",
          "Build a notes/booking API with tests"
        ],
        resources: ["PostgreSQL tutorial", "MongoDB University free tier"]
      },
      {
        phase: "Month 5–6",
        title: "System basics",
        duration: "8 weeks",
        tasks: [
          "Caching (Redis), message queues basics",
          "Docker containerization",
          "Deploy API on Railway/Render"
        ],
        resources: ["Docker getting started", "Redis university"]
      },
      {
        phase: "Month 7+",
        title: "Backend interviews",
        duration: "Ongoing",
        tasks: [
          "Solve 50 medium DSA problems",
          "Practice API design questions",
          "Study CAP theorem and scaling basics"
        ],
        resources: ["System Design Primer", "LeetCode database tag"]
      }
    ],
    platforms: codingPlatforms,
    videos: [
      yt("Oe421EPjBEo", "Node.js Full Course", "freeCodeCamp", "8 hr", "Node.js"),
      yt("45TeJEm_DSY", "System Design Basics", "Gaurav Sen", "12 min", "Architecture"),
      yt("w7ejDZ8SWv8", "Git & GitHub Crash Course", "Traversy Media", "32 min", "Git"),
      yt("aircAruvnKk", "Neural Networks Explained", "3Blue1Brown", "19 min", "Bonus ML intro")
    ],
    courses: [
      {
        title: "Backend Development with Node.js",
        provider: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/",
        focus: "Node + APIs certification",
        free: true
      },
      {
        title: "Google Cloud Fundamentals",
        provider: "Google Cloud Skills Boost",
        url: "https://www.cloudskillsboost.google/course_templates/736",
        focus: "Cloud deployment basics",
        free: true
      }
    ]
  },
  {
    id: "fullstack",
    category: "web-dev",
    subTrack: "Full Stack",
    label: "Full Stack Developer",
    description: "End-to-end web apps — frontend + backend + deployment.",
    yearRange: "2nd – 4th year",
    difficulty: "Intermediate",
    roadmap: [
      {
        phase: "Month 1–3",
        title: "Full stack foundations",
        duration: "12 weeks",
        tasks: [
          "HTML/CSS/JS + one backend language",
          "Build a MERN or Next.js + API stack app",
          "Version control with Git from day one"
        ],
        resources: ["The Odin Project", "Full Stack Open"]
      },
      {
        phase: "Month 4–6",
        title: "Production projects",
        duration: "12 weeks",
        tasks: [
          "Build 3 full projects: e-commerce, social, SaaS tool",
          "Add authentication, payments (Stripe/Razorpay test)",
          "Write tests and CI/CD with GitHub Actions"
        ],
        resources: ["Next.js docs", "Stripe docs"]
      },
      {
        phase: "Month 7+",
        title: "Placement ready",
        duration: "Ongoing",
        tasks: [
          "Resume with live deployed projects",
          "60 DSA problems + system design basics",
          "Mock interviews weekly"
        ],
        resources: ["Pramp", "Interviewing.io"]
      }
    ],
    platforms: codingPlatforms,
    videos: [
      yt("nu_pCVPKzTk", "Full Stack Web Dev for Beginners", "freeCodeCamp", "12 hr", "Full stack"),
      yt("zQnBQ4tB3ZA", "Web Dev Roadmap 2025", "Traversy Media", "15 min", "Roadmap"),
      yt("1SiOmwCi1CM", "Next.js 14 Full Course", "JavaScript Mastery", "3 hr", "Next.js"),
      yt("G3e-cpL7ofc", "HTML & CSS Crash Course", "Traversy Media", "1 hr", "Basics")
    ],
    courses: [
      {
        title: "The Odin Project – Full Stack JavaScript",
        provider: "The Odin Project",
        url: "https://www.theodinproject.com/paths/full-stack-javascript",
        focus: "Free full stack curriculum",
        free: true
      },
      {
        title: "Full Stack Open",
        provider: "University of Helsinki",
        url: "https://fullstackopen.com/en/",
        focus: "Modern React + Node stack",
        free: true
      }
    ]
  },
  {
    id: "database",
    category: "web-dev",
    subTrack: "Database",
    label: "Database & SQL",
    description: "SQL mastery, indexing, query optimization — essential for every developer.",
    yearRange: "1st – 4th year",
    difficulty: "Beginner",
    roadmap: [
      {
        phase: "Month 1–2",
        title: "SQL fundamentals",
        duration: "8 weeks",
        tasks: [
          "SELECT, JOIN, GROUP BY, subqueries",
          "Practice 50 SQL problems on HackerRank",
          "Design a simple schema for a library system"
        ],
        resources: ["SQLBolt", "Mode Analytics SQL tutorial"]
      },
      {
        phase: "Month 3–4",
        title: "Advanced SQL + NoSQL",
        duration: "8 weeks",
        tasks: [
          "Indexes, transactions, normalization",
          "MongoDB aggregation pipeline",
          "Compare SQL vs NoSQL trade-offs"
        ],
        resources: ["PostgreSQL EXPLAIN", "MongoDB University"]
      },
      {
        phase: "Month 5+",
        title: "DB interview prep",
        duration: "Ongoing",
        tasks: [
          "Design schemas for Twitter, URL shortener",
          "Study ACID, CAP, sharding basics",
          "LeetCode database tag problems"
        ],
        resources: ["Grokking Database Design", "LeetCode SQL"]
      }
    ],
    platforms: codingPlatforms.slice(0, 4),
    videos: [
      yt("HXV3zeQKqGY", "SQL Tutorial – Full Database Course", "freeCodeCamp", "4 hr", "SQL"),
      yt("ztHopE5WypU", "Database Design Course", "freeCodeCamp", "8 hr", "Design"),
      yt("W140Up3ffg4", "MongoDB Crash Course", "Traversy Media", "1 hr", "NoSQL")
    ],
    courses: [
      {
        title: "SQL for Data Science",
        provider: "UC Davis / Coursera",
        url: "https://www.coursera.org/learn/sql-for-data-science",
        focus: "SQL from scratch",
        free: true
      },
      {
        title: "MongoDB Basics",
        provider: "MongoDB University",
        url: "https://learn.mongodb.com/courses/m001-mongodb-basics",
        focus: "NoSQL fundamentals",
        free: true
      }
    ]
  },
  {
    id: "dsa",
    category: "dsa",
    subTrack: "DSA",
    label: "Data Structures & Algorithms",
    description: "Core DSA for campus placements and product company interviews.",
    yearRange: "2nd – 4th year",
    difficulty: "Intermediate",
    roadmap: [
      {
        phase: "Month 1–2",
        title: "Arrays & strings",
        duration: "8 weeks",
        tasks: [
          "Two pointers, sliding window, prefix sum",
          "Solve 30 easy problems on LeetCode",
          "Learn time/space complexity (Big O)"
        ],
        resources: ["NeetCode Blind 75", "Striver A2Z sheet"]
      },
      {
        phase: "Month 3–4",
        title: "Trees, graphs, DP",
        duration: "8 weeks",
        tasks: [
          "BFS/DFS, binary trees, BST operations",
          "Intro to dynamic programming (1D, 2D)",
          "50 medium problems with pattern notes"
        ],
        resources: ["LeetCode explore cards", "AlgoExpert patterns"]
      },
      {
        phase: "Month 5–6",
        title: "Company prep",
        duration: "8 weeks",
        tasks: [
          "Company-specific question lists (Google, Amazon)",
          "Weekly timed mock contests on Codeforces",
          "Review mistakes in a dedicated notebook"
        ],
        resources: ["InterviewBit company questions", "Codeforces div 2"]
      }
    ],
    platforms: codingPlatforms,
    videos: [
      yt("M1549e5ayEc", "Data Structures Easy to Advanced", "freeCodeCamp", "8 hr", "Complete DSA"),
      yt("CBYHwZWWG08", "Dynamic Programming Explained", "NeetCode", "12 min", "DP intro"),
      yt("oBt53YbRqzA", "Blind 75 LeetCode Problems", "NeetCode", "Playlist", "Interview prep"),
      yt("RBSGKlAvoiM", "Graph Algorithms", "freeCodeCamp", "2 hr", "Graphs")
    ],
    courses: [
      {
        title: "Algorithms Specialization",
        provider: "Stanford / Coursera",
        url: "https://www.coursera.org/specializations/algorithms",
        focus: "Rigorous algorithm theory",
        free: true
      },
      {
        title: "Grokking the Coding Interview",
        provider: "Educative",
        url: "https://www.educative.io/courses/grokking-the-coding-interview",
        focus: "Pattern-based problem solving",
        free: false
      }
    ]
  },
  {
    id: "system-design",
    category: "system-design",
    subTrack: "System Design",
    label: "System Design",
    description: "Design scalable systems — essential for mid-level and senior roles.",
    yearRange: "3rd – 4th year / 1–2 YOE",
    difficulty: "Advanced",
    roadmap: [
      {
        phase: "Month 1–2",
        title: "Fundamentals",
        duration: "8 weeks",
        tasks: [
          "Load balancing, caching, CDNs, databases",
          "CAP theorem, consistency models",
          "Design URL shortener and paste bin"
        ],
        resources: ["System Design Primer", "Gaurav Sen YouTube"]
      },
      {
        phase: "Month 3–4",
        title: "Classic designs",
        duration: "8 weeks",
        tasks: [
          "Design Twitter feed, WhatsApp, Uber",
          "Study microservices vs monolith trade-offs",
          "Draw diagrams and explain trade-offs aloud"
        ],
        resources: ["ByteByteGo", "Designing Data-Intensive Applications"]
      },
      {
        phase: "Month 5+",
        title: "Mock interviews",
        duration: "Ongoing",
        tasks: [
          "Weekly system design mocks with peers",
          "Practice 45-min structured approach",
          "Review real postmortems (AWS, Cloudflare)"
        ],
        resources: ["Pramp system design", "Exponent"]
      }
    ],
    platforms: codingPlatforms.slice(0, 3),
    videos: [
      yt("tJcloseKfyc", "System Design Interview Step by Step", "Gaurav Sen", "38 min", "Framework"),
      yt("bUHF4ZM1WvU", "System Design Basics", "Gaurav Sen", "12 min", "Intro"),
      yt("xpDnVSmNFX0", "Design Twitter / X", "System Design Interview", "45 min", "Case study"),
      yt("jazY8sDgyRc", "Design WhatsApp", "System Design Interview", "40 min", "Messaging")
    ],
    courses: [
      {
        title: "Grokking the System Design Interview",
        provider: "Educative",
        url: "https://www.educative.io/courses/grokking-the-system-design-interview",
        focus: "Structured design patterns",
        free: false
      },
      {
        title: "System Design Interview Course",
        provider: "ByteByteGo",
        url: "https://bytebytego.com/courses/system-design-interview",
        focus: "Visual system design",
        free: false
      }
    ]
  },
  {
    id: "ai-ml",
    category: "ai-ml",
    subTrack: "AI / ML / LLM",
    label: "AI, ML & LLM",
    description: "Machine learning, deep learning, and LLM application development.",
    yearRange: "3rd – 4th year",
    difficulty: "Advanced",
    roadmap: [
      {
        phase: "Month 1–2",
        title: "Math + Python ML",
        duration: "8 weeks",
        tasks: [
          "Linear algebra, probability, statistics refresh",
          "NumPy, Pandas, Matplotlib, Scikit-learn",
          "Build regression and classification models"
        ],
        resources: ["Google ML Crash Course", "StatQuest YouTube"]
      },
      {
        phase: "Month 3–4",
        title: "Deep learning",
        duration: "8 weeks",
        tasks: [
          "Neural networks, CNNs, RNNs with PyTorch",
          "Train on MNIST, CIFAR datasets",
          "Deploy a model with FastAPI + Hugging Face"
        ],
        resources: ["Fast.ai", "PyTorch tutorials"]
      },
      {
        phase: "Month 5–6",
        title: "LLM & GenAI",
        duration: "8 weeks",
        tasks: [
          "Prompt engineering, RAG, fine-tuning basics",
          "Build a chatbot with OpenAI/Groq API",
          "LangChain or LlamaIndex project on GitHub"
        ],
        resources: ["DeepLearning.AI short courses", "LangChain docs"]
      }
    ],
    platforms: [
      {
        name: "Kaggle",
        url: "https://www.kaggle.com/learn",
        description: "Free ML courses and competitions",
        icon: "KG"
      },
      {
        name: "Hugging Face",
        url: "https://huggingface.co/learn",
        description: "Transformers and LLM courses",
        icon: "HF"
      },
      ...codingPlatforms.slice(0, 2)
    ],
    videos: [
      yt("aircAruvnKk", "Neural Networks Explained", "3Blue1Brown", "19 min", "Neural nets"),
      yt("NWONeJKn6kc", "Machine Learning Full Course", "freeCodeCamp", "10 hr", "ML basics"),
      yt("5NgNicoyyG4", "LangChain Crash Course", "freeCodeCamp", "3 hr", "LLM apps"),
      yt("kCc8FmEb1nY", "ChatGPT Explained", "Andrej Karpathy", "1 hr", "LLM intro")
    ],
    courses: [
      {
        title: "Machine Learning Crash Course",
        provider: "Google",
        url: "https://developers.google.com/machine-learning/crash-course",
        focus: "ML fundamentals with TensorFlow",
        free: true
      },
      {
        title: "Deep Learning Specialization",
        provider: "DeepLearning.AI / Coursera",
        url: "https://www.coursera.org/specializations/deep-learning",
        focus: "Neural networks in depth",
        free: true
      },
      {
        title: "ChatGPT Prompt Engineering",
        provider: "DeepLearning.AI",
        url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
        focus: "LLM application development",
        free: true
      }
    ]
  },
  {
    id: "frontend-advanced",
    category: "web-dev",
    subTrack: "Adv. Frontend",
    label: "Senior Frontend Engineer",
    description: "Performance, architecture, SSR and design systems — for senior frontend roles.",
    yearRange: "3rd – 4th year / 1+ YOE",
    difficulty: "Advanced",
    roadmap: [
      {
        phase: "Month 1–2",
        title: "Performance & profiling",
        duration: "8 weeks",
        tasks: [
          "Core Web Vitals, Lighthouse, Chrome DevTools performance tab",
          "Code-splitting, lazy loading, bundle analysis",
          "Render performance, virtualization for long lists"
        ],
        resources: ["web.dev/learn/performance", "Chrome DevTools docs"]
      },
      {
        phase: "Month 3–4",
        title: "Architecture & SSR",
        duration: "8 weeks",
        tasks: [
          "Next.js App Router, RSC, streaming, caching",
          "State architecture: server state vs client state (Zustand/Redux)",
          "Monorepo setup with Turborepo + shared UI"
        ],
        resources: ["Next.js docs", "Turborepo docs"]
      },
      {
        phase: "Month 5+",
        title: "Design systems & interviews",
        duration: "Ongoing",
        tasks: [
          "Build a component library with Storybook + tests",
          "Accessibility (WCAG, ARIA, keyboard nav)",
          "Frontend system design mocks (design Twitter feed UI)"
        ],
        resources: ["GreatFrontEnd", "Storybook docs"]
      }
    ],
    platforms: codingPlatforms.slice(0, 4),
    videos: [
      yt("F8AnRiMNJPg", "Next.js App Router Deep Dive", "Lee Robinson", "1 hr", "Next.js"),
      yt("0fYiM4qZHuo", "Web Performance 101", "web.dev", "20 min", "Perf"),
      yt("j59xQhXjf8g", "Design Systems Explained", "VSchool", "14 min", "Design systems")
    ],
    courses: [
      {
        title: "Frontend System Design",
        provider: "GreatFrontEnd",
        url: "https://www.greatfrontend.com/system-design",
        focus: "Frontend system design interviews",
        free: false
      }
    ]
  },
  {
    id: "dsa-beginner",
    category: "dsa",
    subTrack: "DSA Basics",
    label: "DSA Foundations",
    description: "First steps in Data Structures & Algorithms — start here before NeetCode Blind 75.",
    yearRange: "1st – 2nd year",
    difficulty: "Beginner",
    roadmap: [
      {
        phase: "Month 1–2",
        title: "Language + complexity",
        duration: "8 weeks",
        tasks: [
          "Pick one language (C++/Java/Python) and master I/O",
          "Big-O notation, time vs space complexity",
          "Built-in data structures: arrays, strings, hash maps"
        ],
        resources: ["HackerRank tutorial", "Big-O cheatsheet on bigocheatsheet.com"]
      },
      {
        phase: "Month 3–4",
        title: "Basic data structures",
        duration: "8 weeks",
        tasks: [
          "Stacks, queues, linked lists, sets",
          "Sorting (bubble, selection, merge) and binary search",
          "Solve 40 easy problems on LeetCode/HackerRank"
        ],
        resources: ["GeeksforGeeks DSA roadmap", "NeetCode starters"]
      },
      {
        phase: "Month 5+",
        title: "Patterns before hard problems",
        duration: "Ongoing",
        tasks: [
          "Two pointers and sliding window patterns",
          "Prefix sums and counting",
          "Graduate to the DSA (Intermediate) track"
        ],
        resources: ["NeetCode pattern list", "Structy.net"]
      }
    ],
    platforms: codingPlatforms.slice(0, 4),
    videos: [
      yt("8hly31xKEb4", "Intro to Big O Notation", "CS50", "10 min", "Complexity"),
      yt("B31LxS2XkFg", "Data Structures for Beginners", "freeCodeCamp", "2 hr", "Basics"),
      yt("oL8fHVZR4vM", "Sliding Window Pattern", "NeetCode", "12 min", "Pattern")
    ],
    courses: [
      {
        title: "Data Structures & Algorithms in Python",
        provider: "Google / Coursera",
        url: "https://www.coursera.org/specializations/data-structures-algorithms",
        focus: "Gentle first DSA course",
        free: true
      }
    ]
  },
  {
    id: "dsa-advanced",
    category: "dsa",
    subTrack: "Adv. DSA",
    label: "Advanced DSA & CP",
    description: "Graphs, DP mastery, trees and competitive programming for FAANG-level rounds.",
    yearRange: "3rd – 4th year",
    difficulty: "Advanced",
    roadmap: [
      {
        phase: "Month 1–2",
        title: "Graphs & trees deep dive",
        duration: "8 weeks",
        tasks: [
          "BFS/DFS, Dijkstra, topological sort, union-find",
          "Tries, segment trees, binary indexed trees",
          "Solve 30 hard graph problems"
        ],
        resources: ["CP-Algorithms", "NeetCode Graphs"]
      },
      {
        phase: "Month 3–4",
        title: "DP mastery",
        duration: "8 weeks",
        tasks: [
          "1D/2D DP, bitmask DP, DP on trees",
          "Classical problems: LIS, LCS, knapsack, matrix chain",
          "Weekly Codeforces div 2 contests"
        ],
        resources: ["USACO Guide", "AtCoder DP editorial"]
      },
      {
        phase: "Month 5+",
        title: "Contest + company prep",
        duration: "Ongoing",
        tasks: [
          "Maintain a notebook of patterns and mistakes",
          "Company-tagged question lists (Google, Amazon, Microsoft)",
          "Timed virtual contests and mocks"
        ],
        resources: ["InterviewBit company tags", "LeetCode contests"]
      }
    ],
    platforms: codingPlatforms,
    videos: [
      yt("tRpnUqA1yxw", "Graph Algorithms for CP", "Errichto", "1 hr", "Graphs CP"),
      yt("XtOLeR3MS_A", "Dynamic Programming Patterns", "NeetCode", "Playlist", "DP"),
      yt("G99X2cuQpqA", "Segment Trees Explained", "codeNcode", "20 min", "Segment tree")
    ],
    courses: [
      {
        title: "USACO Guide",
        provider: "USACO",
        url: "https://usaco.guide/",
        focus: "Competitive programming curriculum",
        free: true
      }
    ]
  },
  {
    id: "system-design-intro",
    category: "system-design",
    subTrack: "Systems Basics",
    label: "Systems & Architecture Basics",
    description: "The stepping stone before hard system design — servers, scaling, caching, DBs.",
    yearRange: "2nd – 3rd year",
    difficulty: "Intermediate",
    roadmap: [
      {
        phase: "Month 1–2",
        title: "How the web works",
        duration: "8 weeks",
        tasks: [
          "DNS, HTTP/HTTPS, TCP/IP, TLS basics",
          "Servers, load balancers, reverse proxies, CDNs",
          "Draw the request lifecycle from client to DB"
        ],
        resources: ["How DNS works (Mozilla)", "ByteByteGo YouTube"]
      },
      {
        phase: "Month 3–4",
        title: "Scaling & storage",
        duration: "8 weeks",
        tasks: [
          "Vertical vs horizontal scaling, statelessness",
          "Caching layers (browser, CDN, app, Redis)",
          "SQL vs NoSQL, replication, sharding intuition"
        ],
        resources: ["System Design Primer", "Gaurav Sen playlist"]
      },
      {
        phase: "Month 5+",
        title: "First designs",
        duration: "Ongoing",
        tasks: [
          "Design a URL shortener and a paste bin end-to-end",
          "Estimate capacity (QPS, storage, bandwidth)",
          "Move to the Advanced System Design track"
        ],
        resources: ["Grokking System Design", "InterviewReady"]
      }
    ],
    platforms: codingPlatforms.slice(0, 3),
    videos: [
      yt("bUHF4ZM1WvU", "System Design Basics", "Gaurav Sen", "12 min", "Intro"),
      yt("i53GVGYaQSM", "How the Web Works", "Lex", "10 min", "Networking"),
      yt("DLW82PSZQdQ", "Caching Explained", "Hussein Nasser", "18 min", "Caching")
    ],
    courses: [
      {
        title: "System Design Primer",
        provider: "Open source (GitHub)",
        url: "https://github.com/donnemartin/system-design-primer",
        focus: "Free structured notes",
        free: true
      }
    ]
  },
  {
    id: "ai-ml-beginner",
    category: "ai-ml",
    subTrack: "AI / ML Basics",
    label: "AI & ML Foundations",
    description: "Python, data, and your first ML model — the beginner path before deep learning.",
    yearRange: "2nd – 3rd year",
    difficulty: "Beginner",
    roadmap: [
      {
        phase: "Month 1–2",
        title: "Python for data",
        duration: "8 weeks",
        tasks: [
          "Python basics + Jupyter notebooks",
          "NumPy arrays, Pandas DataFrames, Matplotlib",
          "Load a CSV, clean it, plot insights"
        ],
        resources: ["Kaggle Learn Python", "pandas getting started"]
      },
      {
        phase: "Month 3–4",
        title: "First ML models",
        duration: "8 weeks",
        tasks: [
          "Train/test split, overfitting, evaluation metrics",
          "Linear regression + logistic regression with scikit-learn",
          "Submit to a Kaggle beginner competition (Titanic)"
        ],
        resources: ["Google ML Crash Course", "Kaggle Learn Intro ML"]
      },
      {
        phase: "Month 5+",
        title: "Project + next step",
        duration: "Ongoing",
        tasks: [
          "Build an end-to-end ML project with a README",
          "Deploy a simple model with Streamlit or FastAPI",
          "Move to the Advanced AI/ML/LLM track"
        ],
        resources: ["Streamlit docs", "Hugging Face Spaces"]
      }
    ],
    platforms: [
      {
        name: "Kaggle",
        url: "https://www.kaggle.com/learn",
        description: "Free micro-courses + datasets",
        icon: "KG"
      },
      ...codingPlatforms.slice(0, 2)
    ],
    videos: [
      yt("kqtD5U9bJTU", "Python for Beginners", "freeCodeCamp", "4 hr", "Python"),
      yt("fUlL6wl2kiY", "Pandas in 10 minutes", "CodeBank", "10 min", "Pandas"),
      yt("oWf6F8N0yIo", "First ML Model with scikit-learn", "Google", "6 min", "ML")
    ],
    courses: [
      {
        title: "Intro to Machine Learning",
        provider: "Kaggle Learn",
        url: "https://www.kaggle.com/learn/intro-to-machine-learning",
        focus: "Hands-on first ML course",
        free: true
      },
      {
        title: "Machine Learning Crash Course",
        provider: "Google",
        url: "https://developers.google.com/machine-learning/crash-course",
        focus: "ML fundamentals with TF",
        free: true
      }
    ]
  }
];

export const trackCategories = [
  { id: "web-dev", label: "Web Development", icon: "code" },
  { id: "dsa", label: "DSA", icon: "brain" },
  { id: "system-design", label: "System Design", icon: "stack" },
  { id: "ai-ml", label: "AI / ML / LLM", icon: "sparkle" }
] as const;

export function getTracksByCategory(category: string) {
  return learnerTracks.filter((track) => track.category === category);
}

export function getTrackById(id: string) {
  return learnerTracks.find((track) => track.id === id) ?? null;
}

export function youtubeThumbnail(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

export function youtubeUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function youtubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}`;
}
