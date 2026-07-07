/**
 * Curated freelance catalog — domains, subdomains, skills, deliverables and
 * client-finding signals for the Indian market.
 *
 * Each subdomain is paired with `clientSearchTerms` used to build deep links
 * to Google Maps / Justdial / IndiaMART so students can find real local
 * businesses (with phone numbers) and pitch them.
 *
 * Add a subdomain: append an object below. Keep `clientSearchTerms` realistic
 * — these become the Justdial/Maps queries.
 */

import type { FreelanceDomain, FreelanceDomainId, FreelanceSubdomain } from "@/features/freelancing/types";

export const freelanceDomains: FreelanceDomain[] = [
  {
    id: "web-dev",
    label: "Web Development",
    icon: "code",
    tagline: "Static sites, SaaS dashboards, and local-business websites."
  },
  {
    id: "app-dev",
    label: "App Development",
    icon: "device",
    tagline: "Android/iOS apps for hyperlocal, commerce and utility."
  },
  {
    id: "ai-ml",
    label: "AI & ML",
    icon: "brain",
    tagline: "Chatbots, vision, NLP and automation agents for SMEs."
  },
  {
    id: "design",
    label: "Design & Creative",
    icon: "palette",
    tagline: "Brand identity, UI/UX, social creatives and video."
  },
  {
    id: "marketing",
    label: "Marketing & Growth",
    icon: "megaphone",
    tagline: "SEO, performance ads and social for local brands."
  },
  {
    id: "content",
    label: "Content & Writing",
    icon: "pen",
    tagline: "Copywriting, blogs, scripts and technical docs."
  }
];

export const freelanceSubdomains: FreelanceSubdomain[] = [
  /* ---------------------------- Web Development --------------------------- */
  {
    id: "web-ecom",
    domainId: "web-dev",
    label: "E-commerce Store",
    difficulty: "Intermediate",
    summary:
      "Online stores for retailers moving from WhatsApp/Instagram to a real checkout.",
    whySuggested:
      "Thousands of local clothing, jewellery and grocery sellers still run on Instagram DMs — they lose orders daily without a checkout.",
    opportunitySignal:
      "Instagram/Facebook sellers with no website = ready-to-convert e-commerce leads.",
    skills: ["Shopify", "WooCommerce", "Payments", "Catalog", "SEO basics"],
    techStack: ["Shopify", "WooCommerce", "Razorpay", "Stripe", "Canva"],
    requirements: [
      "Product catalog with photos & variants",
      "Cart + secure checkout (UPI / cards / COD)",
      "Order confirmation on WhatsApp & email",
      "Shipping & return policy pages",
      "Mobile-first responsive design"
    ],
    clientSearchTerms: ["Clothing stores", "Jewellery shops", "Bakery", "Grocery stores"],
    estimatedEffort: "2–4 weeks",
    pricingInr: "₹15,000 – ₹60,000",
    pitchScript:
      "Hi, I saw your Instagram store — your products look great but you're losing orders to DMs. I build Shopify stores with UPI checkout in 2 weeks. Can I show a 5-min demo?"
  },
  {
    id: "web-crm",
    domainId: "web-dev",
    label: "CRM / Lead Manager",
    difficulty: "Advanced",
    summary:
      "Lightweight CRM dashboards for real-estate, coaching and service businesses to track leads.",
    whySuggested:
      "Coaching classes and real-estate agents track leads in notebooks — they forget follow-ups and lose deals.",
    opportunitySignal:
      "Businesses running Google/FB ads but managing leads in Excel = urgent CRM need.",
    skills: ["React", "Node.js", "Database design", "Auth", "Dashboards"],
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Clerk", "TailwindCSS"],
    requirements: [
      "Lead capture form + pipeline stages",
      "Follow-up reminders & notifications",
      "Agent-wise lead assignment",
      "CSV import of existing leads",
      "WhatsApp click-to-chat from lead card"
    ],
    clientSearchTerms: ["Real estate agents", "Coaching classes", "Insurance agents", "Travel agencies"],
    estimatedEffort: "4–6 weeks",
    pricingInr: "₹40,000 – ₹1,50,000",
    pitchScript:
      "Hi, I build CRMs that stop leads from slipping through. Your agents get reminders, WhatsApp buttons, and a pipeline view. Can we do a 10-min call this week?"
  },
  {
    id: "web-salon",
    domainId: "web-dev",
    label: "Salon / Spa Website",
    difficulty: "Beginner",
    summary:
      "Booking website for salons, spas and clinics — services, gallery, online appointment booking.",
    whySuggested:
      "Most local salons have only an Instagram page. Clients can't book online, so they double-book or no-show.",
    opportunitySignal:
      "Salons/spas with no website = the easiest cold-call wins in your city.",
    skills: ["HTML", "CSS", "JavaScript", "Booking APIs", "Responsive design"],
    techStack: ["Next.js", "TailwindCSS", "Cal.com", "WhatsApp link", "Vercel"],
    requirements: [
      "Services menu with prices",
      "Photo gallery of work",
      "Online booking calendar",
      "WhatsApp booking button",
      "Google Maps location & reviews"
    ],
    clientSearchTerms: ["Salons", "Hair salon", "Spa", "Beauty parlour", "Men's grooming"],
    estimatedEffort: "1–2 weeks",
    pricingInr: "₹8,000 – ₹25,000",
    pitchScript:
      "Hi, I checked your salon online — you don't have a booking website yet. I can build one with online appointments + WhatsApp in a week for under ₹15,000. Want a free mockup?"
  },
  {
    id: "web-restaurant",
    domainId: "web-dev",
    label: "Restaurant / Cloud Kitchen",
    difficulty: "Beginner",
    summary:
      "Menu website with online ordering, table booking and direct WhatsApp orders (no Swiggy commission).",
    whySuggested:
      "Restaurants pay 20–30% commission to aggregators. A direct-order site saves them money every order.",
    opportunitySignal:
      "Restaurants listed only on Swiggy/Zomato with no own site = direct savings pitch.",
    skills: ["Next.js", "Payments", "Responsive design", "SEO basics"],
    techStack: ["Next.js", "TailwindCSS", "Razorpay", "WhatsApp API", "Vercel"],
    requirements: [
      "Digital menu with categories & photos",
      "Online order + UPI payment",
      "Table booking form",
      "Direct WhatsApp order button",
      "Google reviews embed"
    ],
    clientSearchTerms: ["Restaurants", "Cafe", "Cloud kitchen", "Bakeries", "Tiffin service"],
    estimatedEffort: "1–3 weeks",
    pricingInr: "₹10,000 – ₹35,000",
    pitchScript:
      "Hi, I build direct-order websites so you skip Swiggy's 25% commission. Your menu, UPI payment, WhatsApp orders — all on your own site. Free demo this weekend?"
  },
  {
    id: "web-portfolio",
    domainId: "web-dev",
    label: "Portfolio / Personal Brand",
    difficulty: "Beginner",
    summary:
      "Personal websites for freelancers, doctors, lawyers and creators to look professional and get inquiries.",
    whySuggested:
      "Professionals still share a PDF resume or nothing — a one-page site builds instant trust.",
    opportunitySignal:
      "Doctors/lawyers/creators with no personal site = quick wins, small scope.",
    skills: ["HTML", "CSS", "JavaScript", "Responsive design"],
    techStack: ["Next.js", "TailwindCSS", "Framer Motion", "Vercel"],
    requirements: [
      "Hero with photo & headline",
      "Services / expertise sections",
      "Contact + WhatsApp inquiry form",
      "Google Maps & hours",
      "Mobile-first design"
    ],
    clientSearchTerms: ["Doctors", "Lawyers", "Chartered accountants", "Architects", "Fitness trainers"],
    estimatedEffort: "3–7 days",
    pricingInr: "₹5,000 – ₹20,000",
    pitchScript:
      "Hi, I noticed you don't have a personal website. I build professional one-page sites with a WhatsApp inquiry form in 4 days. Shall I send 2 design options?"
  },
  {
    id: "web-saas",
    domainId: "web-dev",
    label: "SaaS / Dashboard",
    difficulty: "Advanced",
    summary:
      "Multi-tenant SaaS dashboards for startups — auth, billing, analytics, role-based access.",
    whySuggested:
      "Funded startups need internal dashboards and MVPs fast — high-paying, repeat work.",
    opportunitySignal:
      "Startups raising pre-seed = need MVPs and admin dashboards urgently.",
    skills: ["React", "Node.js", "Database", "Auth", "Stripe/Razorpay", "API design"],
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Clerk", "TailwindCSS", "tRPC"],
    requirements: [
      "Auth + role-based access",
      "Subscription billing",
      "Analytics dashboard",
      "Admin & user views",
      "API + documentation"
    ],
    clientSearchTerms: ["Startups", "SaaS companies", "Coworking spaces", "Incubators"],
    estimatedEffort: "6–10 weeks",
    pricingInr: "₹80,000 – ₹3,00,000",
    pitchScript:
      "Hi, I build SaaS MVPs end-to-end — auth, billing, dashboard, API. I can ship a usable v1 in 6 weeks. Can we scope your idea on a call?"
  },
  {
    id: "web-lms",
    domainId: "web-dev",
    label: "Education / LMS",
    difficulty: "Intermediate",
    summary:
      "Course platforms for coaching institutes and solo educators — video, notes, quizzes, payments.",
    whySuggested:
      "Coaching classes moved to Zoom during COVID but still have no proper course platform — huge demand.",
    opportunitySignal:
      "Coaching/tuition classes selling courses on WhatsApp = ready for an LMS.",
    skills: ["Next.js", "Video hosting", "Payments", "Auth"],
    techStack: ["Next.js", "Mux/YouTube", "Razorpay", "Clerk", "TailwindCSS"],
    requirements: [
      "Course catalog with paid/free tiers",
      "Video player with notes",
      "Quizzes & progress tracking",
      "Student dashboard",
      "Payment + invoice generation"
    ],
    clientSearchTerms: ["Coaching classes", "Tutorials", "Yoga classes", "Music teachers"],
    estimatedEffort: "3–5 weeks",
    pricingInr: "₹30,000 – ₹1,00,000",
    pitchScript:
      "Hi, I build LMS platforms for coaching classes — paid videos, quizzes, student tracking, UPI payments. Can I show a live example from another class?"
  },
  {
    id: "web-landing",
    domainId: "web-dev",
    label: "Landing Page / Marketing",
    difficulty: "Beginner",
    summary:
      "High-conversion landing pages for product launches, events and ad campaigns.",
    whySuggested:
      "Every business running ads needs a landing page that converts — recurring, fast work.",
    opportunitySignal:
      "Businesses running Instagram/Google ads to a homepage = landing page opportunity.",
    skills: ["HTML", "CSS", "Copywriting basics", "Analytics"],
    techStack: ["Next.js", "TailwindCSS", "Framer Motion", "GA4", "Vercel"],
    requirements: [
      "Hero with clear CTA",
      "Benefits + social proof",
      "Lead capture form",
      "Fast load (<2s)",
      "A/B-ready structure"
    ],
    clientSearchTerms: ["Gyms", "Event planners", "Real estate projects", "Course creators"],
    estimatedEffort: "2–5 days",
    pricingInr: "₹4,000 – ₹15,000",
    pitchScript:
      "Hi, I build landing pages that convert ad clicks into leads. I can deliver one in 3 days with a lead form. Want to see 3 examples from your industry?"
  },

  /* ---------------------------- App Development --------------------------- */
  {
    id: "app-commerce",
    domainId: "app-dev",
    label: "E-commerce App",
    difficulty: "Advanced",
    summary:
      "Mobile commerce apps for retailers — catalog, cart, UPI, order tracking.",
    whySuggested:
      "Retailers want their own app to retain customers and avoid marketplace fees.",
    opportunitySignal:
      "D2C brands on Instagram/WhatsApp = want a branded app next.",
    skills: ["React Native", "State management", "Payments", "API integration"],
    techStack: ["React Native", "Expo", "Node.js", "Razorpay", "Firebase"],
    requirements: [
      "Product browsing & search",
      "Cart + UPI checkout",
      "Order history & tracking",
      "Push notifications",
      "Android + iOS build"
    ],
    clientSearchTerms: ["D2C brands", "Retail stores", "Boutiques", "Electronics dealers"],
    estimatedEffort: "6–10 weeks",
    pricingInr: "₹80,000 – ₹3,00,000",
    pitchScript:
      "Hi, I build branded e-commerce apps so you stop paying marketplace commissions. UPI, order tracking, push alerts. Can we scope your catalog on a call?"
  },
  {
    id: "app-food",
    domainId: "app-dev",
    label: "Food Delivery / Hyperlocal",
    difficulty: "Advanced",
    summary:
      "Local food/grocery delivery apps with live tracking for single restaurants or cloud kitchens.",
    whySuggested:
      "Cloud kitchens want their own ordering app to avoid aggregator commissions.",
    opportunitySignal:
      "Cloud kitchens / standalone restaurants = direct-order app demand.",
    skills: ["React Native", "Maps SDK", "Realtime DB", "Payments"],
    techStack: ["React Native", "Expo", "Firebase", "Google Maps", "Razorpay"],
    requirements: [
      "Menu + cart + checkout",
      "Live order tracking on map",
      "Driver/rider dispatch",
      "Push + SMS notifications",
      "Admin order dashboard"
    ],
    clientSearchTerms: ["Cloud kitchens", "Restaurants", "Tiffin services", "Grocery stores"],
    estimatedEffort: "8–12 weeks",
    pricingInr: "₹1,20,000 – ₹4,00,000",
    pitchScript:
      "Hi, I build direct food-ordering apps with live tracking — no Swiggy cut. Your kitchen, your app, your margins. Can I show a working demo?"
  },
  {
    id: "app-fitness",
    domainId: "app-dev",
    label: "Fitness / Health Tracking",
    difficulty: "Intermediate",
    summary:
      "Habit, workout and health-tracking apps for trainers and wellness brands.",
    whySuggested:
      "Fitness trainers want a branded app to sell plans and track clients.",
    opportunitySignal:
      "Personal trainers selling plans on Instagram = need a tracking app.",
    skills: ["React Native", "Local storage", "Charts", "Notifications"],
    techStack: ["React Native", "Expo", "SQLite", "Reanimated", "Firebase"],
    requirements: [
      "Workout/habit tracker",
      "Progress charts",
      "Reminders & streaks",
      "Trainer-client pairing",
      "Subscription paywall"
    ],
    clientSearchTerms: ["Fitness trainers", "Yoga instructors", "Dietitians", "Gyms"],
    estimatedEffort: "4–6 weeks",
    pricingInr: "₹40,000 – ₹1,20,000",
    pitchScript:
      "Hi, I build fitness apps where your clients track workouts, you see their progress, and they stay longer. Want a free prototype of your training app?"
  },
  {
    id: "app-fintech",
    domainId: "app-dev",
    label: "Fintech / UPI App",
    difficulty: "Advanced",
    summary:
      "Payments, lending and finance apps with strong security and compliance.",
    whySuggested:
      "Fintech startups need reliable UPI/payment integrations and dashboards.",
    opportunitySignal:
      "NBFCs / lending startups = need mobile apps + admin dashboards.",
    skills: ["React Native", "Security", "UPI SDK", "Compliance"],
    techStack: ["React Native", "Node.js", "PostgreSQL", "Razorpay", "Signzy"],
    requirements: [
      "KYC + secure auth",
      "UPI / payment integration",
      "Transaction history",
      "Admin & risk dashboard",
      "Audit logging"
    ],
    clientSearchTerms: ["NBFC", "Fintech startups", "Money lenders", "Chit fund companies"],
    estimatedEffort: "10–16 weeks",
    pricingInr: "₹2,00,000 – ₹8,00,000",
    pitchScript:
      "Hi, I build fintech apps with UPI, KYC and admin dashboards. I've handled compliance logging and security. Can we discuss your product scope?"
  },
  {
    id: "app-utility",
    domainId: "app-dev",
    label: "Utility / Productivity",
    difficulty: "Intermediate",
    summary:
      "Single-purpose utility apps — calculators, schedulers, document tools.",
    whySuggested:
      "Small businesses need simple custom tools (invoice makers, schedulers) that off-the-shelf apps don't fit.",
    opportunitySignal:
      "SMEs using messy spreadsheets = opportunity for a custom utility app.",
    skills: ["React Native", "Offline storage", "PDF generation"],
    techStack: ["React Native", "Expo", "SQLite", "react-native-pdf"],
    requirements: [
      "Core utility flow",
      "Offline-first storage",
      "PDF/image export",
      "Sharing via WhatsApp",
      "Android + iOS build"
    ],
    clientSearchTerms: ["Chartered accountants", "Shop owners", "Contractors", "Freelance accountants"],
    estimatedEffort: "2–4 weeks",
    pricingInr: "₹20,000 – ₹60,000",
    pitchScript:
      "Hi, I noticed your team still makes invoices on paper. I can build a simple app that generates GST invoices and shares on WhatsApp in 2 weeks. Interested?"
  },

  /* ------------------------------- AI / ML ------------------------------- */
  {
    id: "ai-chatbot",
    domainId: "ai-ml",
    label: "AI Chatbot / RAG",
    difficulty: "Intermediate",
    summary:
      "Support bots trained on a business's docs/website that answer customers 24/7.",
    whySuggested:
      "SMEs can't afford 24/7 support — an AI bot on WhatsApp is a cheap, sellable upgrade.",
    opportunitySignal:
      "Businesses getting repetitive DMs = perfect AI chatbot fit.",
    skills: ["LLMs", "RAG", "Prompt engineering", "Vector DB"],
    techStack: ["OpenAI", "LangChain", "Pinecone", "Node.js", "WhatsApp API"],
    requirements: [
      "Ingest business docs/FAQ",
      "Vector store + retrieval",
      "WhatsApp/web widget deployment",
      "Handoff to human when unsure",
      "Analytics on queries"
    ],
    clientSearchTerms: ["E-commerce stores", "Real estate", "Hospitals", "Educational institutes"],
    estimatedEffort: "2–4 weeks",
    pricingInr: "₹25,000 – ₹1,00,000",
    pitchScript:
      "Hi, I build AI support bots trained on your business — they answer customers on WhatsApp 24/7 and hand off to you when stuck. Can I show a demo on your FAQs?"
  },
  {
    id: "ai-vision",
    domainId: "ai-ml",
    label: "Computer Vision",
    difficulty: "Advanced",
    summary:
      "Defect detection, OCR, attendance and surveillance analytics for factories and retail.",
    whySuggested:
      "Manufacturing units still do quality checks manually — vision models save them lakhs.",
    opportunitySignal:
      "Factories/warehouses doing manual QC = strong CV pitch.",
    skills: ["PyTorch", "OpenCV", "Model deployment", "Edge devices"],
    techStack: ["PyTorch", "YOLO", "OpenCV", "FastAPI", "ONNX"],
    requirements: [
      "Dataset collection & labelling",
      "Model training/finetuning",
      "Edge or cloud deployment",
      "Dashboard with metrics",
      "Alerting integration"
    ],
    clientSearchTerms: ["Manufacturing units", "Factories", "Warehouses", "Quality check labs"],
    estimatedEffort: "6–10 weeks",
    pricingInr: "₹1,00,000 – ₹4,00,000",
    pitchScript:
      "Hi, I build computer-vision systems for quality checks and attendance. I can run a free proof-of-concept on 50 of your samples. Worth a 15-min call?"
  },
  {
    id: "ai-nlp",
    domainId: "ai-ml",
    label: "NLP / Document Automation",
    difficulty: "Advanced",
    summary:
      "Extract data from invoices, contracts and KYC docs to automate back-office work.",
    whySuggested:
      "CAs and finance teams manually type invoice data — LLMs can extract it in seconds.",
    opportunitySignal:
      "CAs / accounts teams = heavy document automation demand.",
    skills: ["LLMs", "OCR", "Prompt engineering", "API design"],
    techStack: ["OpenAI", "Tesseract", "FastAPI", "PostgreSQL", "React"],
    requirements: [
      "OCR + LLM extraction pipeline",
      "Validation & export to Excel/Tally",
      "Bulk upload UI",
      "Confidence scoring + review queue",
      "Audit log"
    ],
    clientSearchTerms: ["Chartered accountants", "Accounting firms", "Logistics companies", "Banks"],
    estimatedEffort: "4–8 weeks",
    pricingInr: "₹60,000 – ₹2,50,000",
    pitchScript:
      "Hi, I automate invoice/contract data extraction using AI — your team stops typing and just reviews. I can process a sample of your invoices free. Interested?"
  },
  {
    id: "ai-recommendation",
    domainId: "ai-ml",
    label: "Recommendation Systems",
    difficulty: "Advanced",
    summary:
      "Product/content recommenders for e-commerce and media apps to lift revenue.",
    whySuggested:
      "D2C brands with 100+ products have no personalization — recommenders lift AOV.",
    opportunitySignal:
      "E-commerce sites with no 'you may also like' = easy revenue uplift.",
    skills: ["ML", "Collaborative filtering", "Analytics", "A/B testing"],
    techStack: ["Python", "scikit-learn", "FastAPI", "Redis", "BigQuery"],
    requirements: [
      "Event tracking pipeline",
      "Recommender model",
      "Serving API with caching",
      "A/B test harness",
      "Dashboard for lift metrics"
    ],
    clientSearchTerms: ["E-commerce brands", "Media companies", "OTT platforms", "News portals"],
    estimatedEffort: "5–8 weeks",
    pricingInr: "₹80,000 – ₹3,00,000",
    pitchScript:
      "Hi, I build product recommenders that lift e-commerce revenue 10–20%. I can run a free analysis on your order data to estimate uplift. Open to it?"
  },

  /* ---------------------------- Design & Creative ------------------------ */
  {
    id: "design-brand",
    domainId: "design",
    label: "Brand Identity",
    difficulty: "Intermediate",
    summary:
      "Logo, color, typography and brand kit for new businesses and creators.",
    whySuggested:
      "New businesses launch with a bad logo from a free tool — a real brand kit wins trust.",
    opportunitySignal:
      "New startups/shops = brand identity is the first thing they need.",
    skills: ["Logo design", "Typography", "Color theory", "Figma"],
    techStack: ["Figma", "Illustrator", "Canva"],
    requirements: [
      "Logo + variations",
      "Color & type system",
      "Brand guidelines PDF",
      "Social + business card mockups",
      "Source files"
    ],
    clientSearchTerms: ["Startups", "New restaurants", "Boutiques", "Clinics"],
    estimatedEffort: "1–2 weeks",
    pricingInr: "₹8,000 – ₹40,000",
    pitchScript:
      "Hi, I noticed your brand looks DIY. I do full identity kits — logo, colors, fonts, and a guidelines file. Can I send 3 logo concepts in 4 days?"
  },
  {
    id: "design-uiux",
    domainId: "design",
    label: "UI/UX Design",
    difficulty: "Intermediate",
    summary:
      "App/website UX flows and high-fidelity Figma designs ready for handoff to developers.",
    whySuggested:
      "Startups build features without design — they lose users to bad UX.",
    opportunitySignal:
      "Startups shipping without a designer = redesign work waiting.",
    skills: ["Wireframing", "Prototyping", "User flows", "Design systems"],
    techStack: ["Figma", "Figjam", "Maze"],
    requirements: [
      "User flows & wireframes",
      "High-fidelity mockups",
      "Clickable prototype",
      "Design system + components",
      "Developer handoff doc"
    ],
    clientSearchTerms: ["Startups", "SaaS companies", "Agencies", "Product studios"],
    estimatedEffort: "2–5 weeks",
    pricingInr: "₹25,000 – ₹1,20,000",
    pitchScript:
      "Hi, I design app/website UX in Figma with a clickable prototype before you build. It saves dev rework. Can I audit one screen of your product free?"
  },
  {
    id: "design-social",
    domainId: "design",
    label: "Social Media Creatives",
    difficulty: "Beginner",
    summary:
      "Daily/weekly post designs + reels covers for local brands and creators.",
    whySuggested:
      "Local businesses post nothing on Instagram — they need a monthly creative pack.",
    opportunitySignal:
      "Brands with under 10 posts = monthly creative retainer opportunity.",
    skills: ["Canva", "Photoshop", "Typography", "Branding"],
    techStack: ["Canva", "Photoshop", "Figma"],
    requirements: [
      "Monthly post templates",
      "Festival/offer creatives",
      "Reel cover designs",
      "Brand-consistent style",
      "Editable Canva files"
    ],
    clientSearchTerms: ["Restaurants", "Salons", "Jewellery shops", "Real estate projects"],
    estimatedEffort: "Ongoing retainer",
    pricingInr: "₹5,000 – ₹25,000 / month",
    pitchScript:
      "Hi, I run monthly creative packs for local brands — 15 posts + 4 reel covers, all on-brand. Can I send a free 3-post sample for your shop?"
  },

  /* -------------------------- Marketing & Growth ------------------------- */
  {
    id: "mkt-seo",
    domainId: "marketing",
    label: "SEO",
    difficulty: "Intermediate",
    summary:
      "On-page + local SEO so businesses rank on Google Maps and search.",
    whySuggested:
      "Local businesses don't appear on Google Maps — local SEO gets them calls for free.",
    opportunitySignal:
      "Businesses missing from Google Maps top 3 = local SEO win.",
    skills: ["Keyword research", "On-page SEO", "GMB optimization", "Analytics"],
    techStack: ["GA4", "Search Console", "GMB", "Ahrefs/Semrush"],
    requirements: [
      "Google Business Profile setup",
      "On-page SEO audit & fixes",
      "Local citation building",
      "Monthly ranking report",
      "Content suggestions"
    ],
    clientSearchTerms: ["Clinics", "Dentists", "Lawyers", "Plumbers", "Electricians"],
    estimatedEffort: "Ongoing retainer",
    pricingInr: "₹8,000 – ₹40,000 / month",
    pitchScript:
      "Hi, I help local businesses rank in Google Maps top 3 — that's free calls every month. Can I do a free ranking audit for your business?"
  },
  {
    id: "mkt-ads",
    domainId: "marketing",
    label: "Performance Ads",
    difficulty: "Intermediate",
    summary:
      "Google + Meta ad campaigns for leads and sales, with weekly reporting.",
    whySuggested:
      "Businesses boost posts blindly and waste money — a structured ad setup is a clear win.",
    opportunitySignal:
      "Brands boosting posts with no tracking = ad management opportunity.",
    skills: ["Meta Ads", "Google Ads", "Funnels", "Tracking"],
    techStack: ["Meta Ads", "Google Ads", "GA4", "Pixel"],
    requirements: [
      "Account setup & tracking",
      "Campaign structure",
      "Ad creatives brief",
      "Weekly performance report",
      "Landing page coordination"
    ],
    clientSearchTerms: ["Real estate", "Coaching classes", "Clinics", "E-commerce brands"],
    estimatedEffort: "Ongoing retainer",
    pricingInr: "₹10,000 – ₹50,000 / month + % of spend",
    pitchScript:
      "Hi, I run Meta + Google ads with proper tracking so you stop wasting budget. I can do a free audit of your current ads this week. Open to it?"
  },
  {
    id: "mkt-social",
    domainId: "marketing",
    label: "Social Media Management",
    difficulty: "Beginner",
    summary:
      "End-to-end Instagram/Facebook management — content calendar, posting, engagement.",
    whySuggested:
      "Local brands can't post consistently — they need a manager, not just creatives.",
    opportunitySignal:
      "Brands with dead Instagram = monthly management retainer.",
    skills: ["Content planning", "Copywriting", "Community", "Analytics"],
    techStack: ["Meta Business", "Canva", "Buffer/Later"],
    requirements: [
      "Monthly content calendar",
      "Post + caption writing",
      "Reel posting & engagement",
      "DM/comment handling",
      "Monthly growth report"
    ],
    clientSearchTerms: ["Restaurants", "Cafes", "Boutiques", "Gyms"],
    estimatedEffort: "Ongoing retainer",
    pricingInr: "₹8,000 – ₹35,000 / month",
    pitchScript:
      "Hi, I manage Instagram end-to-end for local brands — calendar, posts, reels, and DMs. Can I run your account for a month and show growth?"
  },

  /* ---------------------------- Content & Writing ------------------------ */
  {
    id: "content-copy",
    domainId: "content",
    label: "Copywriting",
    difficulty: "Beginner",
    summary:
      "Website, ad and product copy that converts for brands and landing pages.",
    whySuggested:
      "Most local websites have weak copy — better copy lifts conversions without redesign.",
    opportunitySignal:
      "Websites with generic copy = quick copywriting win.",
    skills: ["Copywriting", "Marketing basics", "SEO basics"],
    techStack: ["Google Docs", "Notion", "Grammarly"],
    requirements: [
      "Homepage & service page copy",
      "Ad copy variations",
      "Product descriptions",
      "CTA & headline tests",
      "Tone-of-voice guide"
    ],
    clientSearchTerms: ["E-commerce brands", "Startups", "Agencies", "Course creators"],
    estimatedEffort: "1–2 weeks",
    pricingInr: "₹6,000 – ₹40,000",
    pitchScript:
      "Hi, I rewrite website copy to lift conversions. I can do 3 of your key pages free as a sample — if you like it, we continue. Sound good?"
  },
  {
    id: "content-blog",
    domainId: "content",
    label: "Blog / SEO Content",
    difficulty: "Beginner",
    summary:
      "Monthly SEO blog articles for brands that want organic traffic.",
    whySuggested:
      "Brands want SEO traffic but can't write — monthly article retainers are steady work.",
    opportunitySignal:
      "Brands with no blog = monthly content retainer opportunity.",
    skills: ["SEO writing", "Research", "Editing"],
    techStack: ["Google Docs", "Ahrefs", "SurferSEO"],
    requirements: [
      "Keyword research",
      "Monthly article plan",
      "Long-form articles (1500+ words)",
      "On-page SEO",
      "Editing & upload"
    ],
    clientSearchTerms: ["SaaS companies", "Educational institutes", "Health brands", "Finance brands"],
    estimatedEffort: "Ongoing retainer",
    pricingInr: "₹2,000 – ₹8,000 / article",
    pitchScript:
      "Hi, I write SEO articles that rank. I can deliver 4 articles a month on topics your customers search. Can I write one free sample article?"
  },
  {
    id: "content-technical",
    domainId: "content",
    label: "Technical Writing",
    difficulty: "Intermediate",
    summary:
      "API docs, product docs and tutorials for developer-focused startups.",
    whySuggested:
      "Startups ship APIs with bad docs — devs churn. Good docs are a clear sell.",
    opportunitySignal:
      "Startups with APIs but no docs = technical writing fit.",
    skills: ["Technical writing", "Markdown", "Dev basics"],
    techStack: ["Markdown", "Mintlify", "GitBook", "GitHub"],
    requirements: [
      "API reference docs",
      "Quickstart guides",
      "Code samples",
      "Tutorials",
      "Versioned docs setup"
    ],
    clientSearchTerms: ["SaaS startups", "API companies", "Open-source projects"],
    estimatedEffort: "2–4 weeks",
    pricingInr: "₹30,000 – ₹1,00,000",
    pitchScript:
      "Hi, I write API docs that developers actually read. I can audit your current docs and rewrite the quickstart free. Want me to?"
  }
];

export function getFreelanceSubdomainsByDomain(
  domainId: FreelanceDomainId
): FreelanceSubdomain[] {
  return freelanceSubdomains.filter((item) => item.domainId === domainId);
}

export function getFreelanceSubdomainById(
  id: string
): FreelanceSubdomain | undefined {
  return freelanceSubdomains.find((item) => item.id === id);
}
