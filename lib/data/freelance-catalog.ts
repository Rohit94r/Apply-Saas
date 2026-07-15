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

import type {
  FreelanceDomain,
  FreelanceDomainId,
  FreelancePlatform,
  FreelanceStarterTip,
  FreelanceSubdomain
} from "@/features/freelancing/types";

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
    tagline: "Brand identity, UI/UX, social creatives and packaging."
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
  },
  {
    id: "data",
    label: "Data & Analytics",
    icon: "chart",
    tagline: "Dashboards, Excel automation, and reporting for SMEs."
  },
  {
    id: "automation",
    label: "Automation & No-code",
    icon: "gear",
    tagline: "WhatsApp flows, Zapier/Make, and form-to-CRM glue."
  },
  {
    id: "video",
    label: "Video & Reels",
    icon: "film",
    tagline: "Short-form edits, product videos, and event highlights."
  },
  {
    id: "business",
    label: "Business Ops",
    icon: "briefcase",
    tagline: "Virtual assistance, GST helpers, and ops systems for shops."
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
  },
  {
    id: "content-linkedin",
    domainId: "content",
    label: "LinkedIn Ghostwriting",
    difficulty: "Beginner",
    summary:
      "Founder/CXO LinkedIn posts that build inbound leads for coaches, founders, and consultants.",
    whySuggested:
      "Indian founders want LinkedIn presence but hate writing — ghostwriting retainers stick.",
    opportunitySignal:
      "Founders posting <2×/month with weak engagement = ghostwriting pitch.",
    skills: ["Business writing", "Personal branding", "Research"],
    techStack: ["Google Docs", "LinkedIn", "Notion"],
    requirements: [
      "Voice interview + tone guide",
      "8–12 posts / month",
      "Comment reply templates",
      "Monthly analytics snapshot"
    ],
    clientSearchTerms: ["Startup founders", "Consultants", "Coaches", "Real estate brokers"],
    estimatedEffort: "Ongoing retainer",
    pricingInr: "₹8,000 – ₹40,000 / month",
    pitchScript:
      "Hi, I ghostwrite LinkedIn posts for founders — you talk for 20 mins, I ship 10 posts a month. Can I write 2 sample posts in your voice free?",
    market: "both"
  },

  /* ---------------------------- Data & Analytics ------------------------- */
  {
    id: "data-excel",
    domainId: "data",
    label: "Excel / Sheets Automation",
    difficulty: "Beginner",
    summary:
      "Macros, dashboards, and cleaner MIS sheets for shops, CAs, and ops teams.",
    whySuggested:
      "Most SMEs live in messy Excel — cleaning + dashboards is the fastest paid freelance win.",
    opportunitySignal:
      "Teams emailing versioned Excels daily = automation pitch.",
    skills: ["Excel", "Google Sheets", "Pivot tables", "Basic VBA/Apps Script"],
    techStack: ["Excel", "Google Sheets", "Apps Script", "Power Query"],
    requirements: [
      "Clean source sheet schema",
      "Auto-updating dashboard",
      "Error checks & validation",
      "1-page how-to for staff"
    ],
    clientSearchTerms: ["Distributors", "Wholesalers", "CA firms", "Factories"],
    estimatedEffort: "3–10 days",
    pricingInr: "₹5,000 – ₹35,000",
    pitchScript:
      "Hi, I noticed ops teams waste hours on Excel. I build auto dashboards and clean MIS sheets. Can I fix one of your weekly reports as a paid pilot?",
    market: "india"
  },
  {
    id: "data-bi",
    domainId: "data",
    label: "BI Dashboard (Power BI / Metabase)",
    difficulty: "Intermediate",
    summary:
      "Sales/inventory dashboards connected to Sheets, SQL, or Tally exports.",
    whySuggested:
      "Growing SMEs outgrow Excel charts — a live BI board sells at higher tickets.",
    opportunitySignal:
      "Businesses with 3+ shops / SKUs and no live dashboard = BI need.",
    skills: ["Power BI / Metabase", "SQL basics", "Data modeling"],
    techStack: ["Power BI", "Metabase", "PostgreSQL", "Google Sheets"],
    requirements: [
      "KPI definition workshop",
      "Data clean + model",
      "3–6 interactive boards",
      "Scheduled refresh"
    ],
    clientSearchTerms: ["Retail chains", "Manufacturers", "E-commerce brands", "Logistics"],
    estimatedEffort: "2–5 weeks",
    pricingInr: "₹25,000 – ₹1,20,000",
    pitchScript:
      "Hi, I build Power BI / Metabase dashboards for sales and inventory. I can prototype one board from your last month’s export. Open to a pilot?",
    market: "both"
  },
  {
    id: "data-scraping",
    domainId: "data",
    label: "Lead / Price Scraping",
    difficulty: "Intermediate",
    summary:
      "Ethical public-page scrapers for competitor prices, directories, or research datasets.",
    whySuggested:
      "Agencies and sellers pay for clean lead lists and price spies — recurring micro-jobs.",
    opportunitySignal:
      "Agencies manually copying Google/Maps data = scraping retainer.",
    skills: ["Python", "BeautifulSoup/Playwright", "CSV hygiene", "Ethics/ToS awareness"],
    techStack: ["Python", "Playwright", "Pandas", "Cron"],
    requirements: [
      "Scope + legal/public-data check",
      "Scraper + scheduler",
      "Clean CSV/Sheets output",
      "Failure alerts"
    ],
    clientSearchTerms: ["Digital agencies", "Market research firms", "E-commerce sellers"],
    estimatedEffort: "1–3 weeks",
    pricingInr: "₹15,000 – ₹80,000",
    pitchScript:
      "Hi, I build scrapers that pull public competitor prices / directories into Sheets weekly. Can we define one source and I’ll demo a sample extract?",
    market: "both"
  },
  {
    id: "data-survey",
    domainId: "data",
    label: "Survey + Insights Pack",
    difficulty: "Beginner",
    summary:
      "Google Form surveys, response cleaning, and a short insights deck for campus/NGO/SME studies.",
    whySuggested:
      "Professors, NGOs, and startups need survey help every semester — low barrier, fast cash.",
    opportunitySignal:
      "People sharing raw Form responses = insights pack opportunity.",
    skills: ["Survey design", "Sheets", "Basic stats", "Slide storytelling"],
    techStack: ["Google Forms", "Sheets", "Canva/Slides"],
    requirements: [
      "Question design review",
      "Cleaning + charts",
      "5–8 insight slides",
      "Raw data handoff"
    ],
    clientSearchTerms: ["NGOs", "Colleges", "Startups", "Market research"],
    estimatedEffort: "1–2 weeks",
    pricingInr: "₹4,000 – ₹25,000",
    pitchScript:
      "Hi, I design surveys and turn Form responses into a clear insights deck. Can I rewrite 5 of your questions free as a sample?",
    market: "india"
  },

  /* -------------------------- Automation & No-code ----------------------- */
  {
    id: "auto-whatsapp",
    domainId: "automation",
    label: "WhatsApp Business Automation",
    difficulty: "Intermediate",
    summary:
      "Catalog, quick replies, abandoned-cart nudges, and appointment bots on WhatsApp.",
    whySuggested:
      "India runs on WhatsApp — shops will pay for auto replies that don’t lose DMs.",
    opportunitySignal:
      "Shops answering DMs slowly after 9pm = WhatsApp automation pitch.",
    skills: ["WhatsApp Business API / tools", "Flow design", "Copywriting"],
    techStack: ["Interakt/Wati/AiSensy", "Google Sheets", "Razorpay links"],
    requirements: [
      "Message flows mapped",
      "Catalog + labels",
      "Handoff to human rules",
      "Weekly report of chats → leads"
    ],
    clientSearchTerms: ["Boutiques", "Clinics", "Tuition centres", "Real estate"],
    estimatedEffort: "1–3 weeks",
    pricingInr: "₹12,000 – ₹60,000 setup + retainer",
    pitchScript:
      "Hi, I set up WhatsApp automation so your shop replies 24/7 with catalogue and booking links. Can I map your top 10 FAQs this week?",
    market: "india"
  },
  {
    id: "auto-zapier",
    domainId: "automation",
    label: "Zapier / Make Workflows",
    difficulty: "Intermediate",
    summary:
      "Glue between Forms, Sheets, CRM, Slack, and email without a custom backend.",
    whySuggested:
      "Startups hate paying for full stacks for glue code — no-code ops is high demand.",
    opportunitySignal:
      "Teams copy-pasting form leads into Sheets/CRM = automation win.",
    skills: ["Zapier/Make", "Webhooks", "Error handling", "Basic SQL/Sheets"],
    techStack: ["Zapier", "Make", "Google Sheets", "HubSpot/Notion"],
    requirements: [
      "Process map of current manual steps",
      "3–8 automated zaps/scenarios",
      "Failure alerts",
      "Handover doc"
    ],
    clientSearchTerms: ["Startups", "Agencies", "Coaching businesses", "HR consultancies"],
    estimatedEffort: "3–10 days",
    pricingInr: "₹8,000 – ₹50,000",
    pitchScript:
      "Hi, I automate form → Sheet → CRM → Slack so your team stops copy-pasting. I can automate one painful flow this week as a pilot.",
    market: "both"
  },
  {
    id: "auto-forms",
    domainId: "automation",
    label: "Lead Forms + CRM Lite",
    difficulty: "Beginner",
    summary:
      "High-converting lead forms with Sheets CRM, email alerts, and WhatsApp deep links.",
    whySuggested:
      "Local ads dump traffic on dead WhatsApp numbers — a form+CRM lite pays for itself.",
    opportunitySignal:
      "Businesses running ads to WhatsApp-only = form automation need.",
    skills: ["Form builders", "Sheets", "Basic HTML/Next optional"],
    techStack: ["Tally/Typeform", "Google Sheets", "Zapier", "Email SMTP"],
    requirements: [
      "Lead form with UTMs",
      "Sheet pipeline stages",
      "Instant email/WhatsApp alert",
      "Weekly lead summary"
    ],
    clientSearchTerms: ["Gyms", "Clinics", "Interior designers", "Solar installers"],
    estimatedEffort: "2–7 days",
    pricingInr: "₹5,000 – ₹25,000",
    pitchScript:
      "Hi, I build lead forms that feed a Sheet CRM with instant WhatsApp alerts — better than losing ad clicks in chat. Want a free mock form?",
    market: "india"
  },
  {
    id: "auto-invoice",
    domainId: "automation",
    label: "Invoicing & GST Helpers",
    difficulty: "Beginner",
    summary:
      "Simple invoice generators, GST-ready PDFs, and payment reminders for freelancers and shops.",
    whySuggested:
      "Kirana / service businesses still invoice on WhatsApp text — PDF invoices look trusted.",
    opportunitySignal:
      "Shops sending invoice as chat text = invoice tool pitch.",
    skills: ["Sheets/Apps Script or Next.js", "PDF", "GST basics"],
    techStack: ["Google Sheets", "Apps Script", "Razorpay Payment Links"],
    requirements: [
      "Invoice template with GST fields",
      "Numbering + client list",
      "PDF export / WhatsApp share",
      "Payment reminder reminders"
    ],
    clientSearchTerms: ["Service businesses", "Freelancers", "Printers", "Photographers"],
    estimatedEffort: "1–2 weeks",
    pricingInr: "₹6,000 – ₹30,000",
    pitchScript:
      "Hi, I build simple GST invoice tools that export PDF and send payment links. Can I make 3 sample invoices from your last week’s jobs?",
    market: "india"
  },

  /* ------------------------------ Video & Reels -------------------------- */
  {
    id: "video-reels",
    domainId: "video",
    label: "Reels / Shorts Editing",
    difficulty: "Beginner",
    summary:
      "Weekly short-form edits for restaurants, coaches, and D2C brands from raw phone footage.",
    whySuggested:
      "Everyone needs Reels; few edit consistently — retainer editing is student-friendly.",
    opportunitySignal:
      "Brands with phone dumps of footage and no posts = edit retainer.",
    skills: ["CapCut/Premiere", "Hook writing", "Captions", "Trending formats"],
    techStack: ["CapCut", "Premiere Rush", "Frame.io/Drive"],
    requirements: [
      "12–20 shorts / month",
      "Captions + cover frames",
      "Brand-safe music",
      "2 revision rounds / video"
    ],
    clientSearchTerms: ["Restaurants", "Fitness coaches", "Salons", "Real estate"],
    estimatedEffort: "Ongoing retainer",
    pricingInr: "₹6,000 – ₹30,000 / month",
    pitchScript:
      "Hi, I edit Reels from your phone footage — captions, hooks, weekly batch. Can I edit 2 free samples from your last shoot?",
    market: "both"
  },
  {
    id: "video-product",
    domainId: "video",
    label: "Product Demo Videos",
    difficulty: "Intermediate",
    summary:
      "60–90s product explainers for Shopify/Amazon listings and ads.",
    whySuggested:
      "D2C brands convert better with demos — one video sells across ads + PDPs.",
    opportunitySignal:
      "Amazon/Shopify listings with only stills = demo video pitch.",
    skills: ["Editing", "Basic motion", "Scripting", "Product sense"],
    techStack: ["Premiere", "After Effects/CapCut", "Descript"],
    requirements: [
      "Script + shot list",
      "60–90s master cut",
      "Square + vertical exports",
      "Subtitle file"
    ],
    clientSearchTerms: ["D2C brands", "Amazon sellers", "Electronics dealers", "Appliance stores"],
    estimatedEffort: "5–14 days",
    pricingInr: "₹8,000 – ₹50,000 / video",
    pitchScript:
      "Hi, I make 60–90s product demos for ads and Amazon listings. Send one SKU — I’ll return a sample cut from your existing photos/clips.",
    market: "both"
  },
  {
    id: "video-event",
    domainId: "video",
    label: "Event Highlight Films",
    difficulty: "Intermediate",
    summary:
      "College fest, wedding teaser, and corporate event highlight edits.",
    whySuggested:
      "Event organisers always need a same-week highlight — seasonal but high-pay bursts.",
    opportunitySignal:
      "Fest/event pages asking for ‘editors urgently’ = short gigs.",
    skills: ["Multicam edit", "Music sync", "Color basics"],
    techStack: ["Premiere", "DaVinci Resolve", "Drive"],
    requirements: [
      "2–4 min highlight",
      "30s social cutdowns",
      "Colour-consistent look",
      "Delivery in 72 hours if agreed"
    ],
    clientSearchTerms: ["Event planners", "Wedding photographers", "College fests", "Corporate events"],
    estimatedEffort: "3–10 days",
    pricingInr: "₹10,000 – ₹60,000",
    pitchScript:
      "Hi, I deliver event highlight films + social cutdowns fast. Share last year’s reel — I’ll show how I’d remodel the open in 48 hours.",
    market: "india"
  },
  {
    id: "video-youtube",
    domainId: "video",
    label: "YouTube Packaging",
    difficulty: "Beginner",
    summary:
      "Thumbnails, titles, and end-screen packaging for education and niche creators.",
    whySuggested:
      "Creators grow with packaging — easier than full edits and sells as a pack.",
    opportunitySignal:
      "Channels with weak thumbnails/CTR = packaging gig.",
    skills: ["Photoshop/Canva", "YouTube CTR sense", "Copy"],
    techStack: ["Photoshop", "Canva", "TubeBuddy ideas"],
    requirements: [
      "Thumbnail system (templates)",
      "Title formulas",
      "A/B variants",
      "Monthly CTR review"
    ],
    clientSearchTerms: ["YouTubers", "Coaching channels", "Podcast shows", "Udemy instructors"],
    estimatedEffort: "Ongoing or pack-based",
    pricingInr: "₹3,000 – ₹20,000 / pack",
    pitchScript:
      "Hi, I redesign YouTube thumbnails + titles for CTR. Can I redo 3 of your last videos free so you see the difference?",
    market: "both"
  },

  /* ------------------------------ Business Ops --------------------------- */
  {
    id: "biz-va",
    domainId: "business",
    label: "Virtual Assistant (Ops)",
    difficulty: "Beginner",
    summary:
      "Inbox, calendar, research, and CRM hygiene for coaches, founders, and agencies.",
    whySuggested:
      "Solo founders drown in admin — part-time VA hours are the easiest first freelancing income.",
    opportunitySignal:
      "Founders complaining about inbox zero = VA opener.",
    skills: ["Email etiquette", "Notion/Sheets", "Research", "Punctuality"],
    techStack: ["Gmail", "Notion", "Calendly", "Slack"],
    requirements: [
      "Defined task list + hours",
      "Daily/weekly standup note",
      "CRM/Sheet updates",
      "Escalation rules"
    ],
    clientSearchTerms: ["Coaches", "Agency owners", "Consultants", "Real estate brokers"],
    estimatedEffort: "Ongoing hourly",
    pricingInr: "₹150 – ₹500 / hour",
    pitchScript:
      "Hi, I offer a part-time VA block — inbox, calendar, research — so you get maker time back. Want a 5-hour trial week?",
    market: "both"
  },
  {
    id: "biz-hiring-ops",
    domainId: "business",
    label: "Campus / Hiring Ops",
    difficulty: "Beginner",
    summary:
      "Intern screening sheets, campus outreach, and interview scheduling for startups.",
    whySuggested:
      "Early startups hire messily — a student who runs campus ops is instantly useful.",
    opportunitySignal:
      "Startups posting ‘hiring interns’ without a process = ops freelance.",
    skills: ["Spreadsheets", "Outreach", "Scheduling", "Basic screening"],
    techStack: ["Google Sheets", "Calendly", "LinkedIn", "Email"],
    requirements: [
      "Role scorecard",
      "Applicant tracker",
      "Screen call notes template",
      "Weekly hiring funnel report"
    ],
    clientSearchTerms: ["Startups", "HR consultancies", "Edtech", "Agencies"],
    estimatedEffort: "Ongoing project",
    pricingInr: "₹8,000 – ₹40,000 / month",
    pitchScript:
      "Hi, I run campus hiring ops — tracker, screening notes, scheduling. I can set up your intern funnel this week. Free template preview?",
    market: "india"
  },
  {
    id: "biz-research",
    domainId: "business",
    label: "Market / Competitor Research",
    difficulty: "Intermediate",
    summary:
      "Competitor teardowns, pricing grids, and landing-page swipe files for founders.",
    whySuggested:
      "Founders want research but won’t sit in Sheets — paid research packs convert well.",
    opportunitySignal:
      "Pre-seed founders asking ‘who else is in this space?’ = research pack.",
    skills: ["Secondary research", "Structured notes", "Slide writing"],
    techStack: ["Docs", "Sheets", "Similarweb-lite methods", "Slides"],
    requirements: [
      "10–15 competitor cards",
      "Pricing/feature grid",
      "3 insight slides",
      "Source list"
    ],
    clientSearchTerms: ["Startups", "Investors’ analysts", "Product studios", "Consultants"],
    estimatedEffort: "1–2 weeks",
    pricingInr: "₹10,000 – ₹60,000",
    pitchScript:
      "Hi, I deliver competitor research packs — grid + insights + sources. Pick a category and I’ll show a 2-page sample free.",
    market: "both"
  },
  {
    id: "biz-notion",
    domainId: "business",
    label: "Notion / Ops Systems",
    difficulty: "Beginner",
    summary:
      "Notion wikis, SOP hubs, and light CRM for small teams tired of chat chaos.",
    whySuggested:
      "Teams drown in WhatsApp decisions — a Notion ops hub is a quick, visual sell.",
    opportunitySignal:
      "Teams with SOPs only in someone’s head = Notion system pitch.",
    skills: ["Notion", "Information architecture", "SOP writing"],
    techStack: ["Notion", "Slack/Drive embeds"],
    requirements: [
      "Workspace IA",
      "SOP templates",
      "Task + CRM databases",
      "30-min team walkthrough"
    ],
    clientSearchTerms: ["Agencies", "Remote startups", "Coaching teams", "Content teams"],
    estimatedEffort: "1–3 weeks",
    pricingInr: "₹8,000 – ₹45,000",
    pitchScript:
      "Hi, I build Notion ops systems — SOPs, tasks, light CRM — so work isn’t trapped in WhatsApp. Want a free audit of your current folders?",
    market: "both"
  },

  /* -------------------- Extra high-demand web / design ------------------- */
  {
    id: "web-wedding",
    domainId: "web-dev",
    label: "Wedding / Event Microsite",
    difficulty: "Beginner",
    summary:
      "RSVP microsites with schedule, maps, and wishlist for Indian weddings and events.",
    whySuggested:
      "Wedding season = short, prepaid, emotional buys — perfect beginner web gigs.",
    opportunitySignal:
      "Couples sharing Google Form RSVPs = microsite upgrade.",
    skills: ["HTML/Next", "Forms", "Mobile design"],
    techStack: ["Next.js", "Tailwind", "Tally", "Vercel"],
    requirements: [
      "Story + schedule pages",
      "RSVP form",
      "Maps + stay info",
      "Password option"
    ],
    clientSearchTerms: ["Wedding planners", "Photographers", "Event managers"],
    estimatedEffort: "3–7 days",
    pricingInr: "₹5,000 – ₹25,000",
    pitchScript:
      "Hi, I build wedding RSVP microsites with schedule and maps — nicer than a Google Form. Want a free demo using placeholder names?",
    market: "india"
  },
  {
    id: "web-multilang",
    domainId: "web-dev",
    label: "Multi-language Local Site",
    difficulty: "Intermediate",
    summary:
      "Hindi/English (or regional) sites for clinics, schools, and government-facing SMEs.",
    whySuggested:
      "Tier-2 businesses want Hindi pages — few freelancers offer proper i18n.",
    opportunitySignal:
      "Sites only in English serving non-English customers = localisation pitch.",
    skills: ["i18n", "CMS", "SEO hreflang basics"],
    techStack: ["Next.js", "Sanity/Contentlayer", "Tailwind"],
    requirements: [
      "Language switcher",
      "Translated key pages",
      "SEO titles per language",
      "Editor-friendly content"
    ],
    clientSearchTerms: ["Clinics", "Schools", "Local newspapers", "NGOs"],
    estimatedEffort: "2–4 weeks",
    pricingInr: "₹20,000 – ₹80,000",
    pitchScript:
      "Hi, I build Hindi+English sites so your patients/parents understand you. Can I translate your homepage as a sample?",
    market: "india"
  },
  {
    id: "design-packaging",
    domainId: "design",
    label: "Packaging & Label Design",
    difficulty: "Intermediate",
    summary:
      "Pouch/label designs for snacks, cosmetics, and D2C brands going to print.",
    whySuggested:
      "Kirana-to-D2C brands need print-ready labels — higher ticket than social posts.",
    opportunitySignal:
      "Brands with Canva labels rejected by printers = packaging gig.",
    skills: ["Packaging dielines", "Print knowledge", "Brand systems"],
    techStack: ["Illustrator", "Photoshop", "Figma"],
    requirements: [
      "Print-ready files",
      "Dieline compliance",
      "2–3 concepts",
      "Mockups for ads"
    ],
    clientSearchTerms: ["Snack brands", "Cosmetics", "Spice sellers", "Candle businesses"],
    estimatedEffort: "1–3 weeks",
    pricingInr: "₹10,000 – ₹60,000",
    pitchScript:
      "Hi, I design print-ready packaging that printers won’t reject. Send your dieline — I’ll show one concept mockup.",
    market: "india"
  },
  {
    id: "mkt-maps",
    domainId: "marketing",
    label: "Google Business Profile Setup",
    difficulty: "Beginner",
    summary:
      "GBP creation, categories, photos, posts, and review response playbooks for local shops.",
    whySuggested:
      "Fastest local marketing win — many shops aren’t even verified on Maps.",
    opportunitySignal:
      "Shops with no photos/hours on Maps = GBP setup pitch.",
    skills: ["GBP", "Local SEO basics", "Photo direction"],
    techStack: ["Google Business Profile", "Canva", "Sheets"],
    requirements: [
      "Profile claimed/optimised",
      "Categories + services",
      "Photo set",
      "Review reply templates"
    ],
    clientSearchTerms: ["Dentists", "Garages", "Restaurants", "Salons"],
    estimatedEffort: "3–7 days",
    pricingInr: "₹3,000 – ₹15,000",
    pitchScript:
      "Hi, I set up and optimise Google Business Profiles so you show up on Maps. Can I audit your listing free today?",
    market: "india"
  },
  {
    id: "ai-voice",
    domainId: "ai-ml",
    label: "Voice / IVR FAQ Bot",
    difficulty: "Advanced",
    summary:
      "Missed-call / IVR FAQ bots for clinics and service businesses using speech + LLM.",
    whySuggested:
      "Clinics miss calls all day — a basic voice FAQ captures patients.",
    opportunitySignal:
      "Businesses with high missed-call rates = voice bot interest.",
    skills: ["Speech APIs", "LLM prompts", "Telephony basics"],
    techStack: ["Twilio/Exotel", "OpenAI", "Node.js"],
    requirements: [
      "FAQ script",
      "Call flow",
      "Fallback to human",
      "Call log dashboard"
    ],
    clientSearchTerms: ["Clinics", "Service apartments", "Courier agents", "Tuition centres"],
    estimatedEffort: "3–6 weeks",
    pricingInr: "₹40,000 – ₹2,00,000",
    pitchScript:
      "Hi, I build missed-call FAQ bots so patients hear answers when your desk is busy. Want a 5-question pilot script?",
    market: "india"
  },
  {
    id: "app-booking",
    domainId: "app-dev",
    label: "Appointment Booking App",
    difficulty: "Intermediate",
    summary:
      "Booking apps for clinics, salons, and tutors with reminders and admin calendar.",
    whySuggested:
      "Same opportunity as web booking but clients want ‘an app’ for trust — React Native fits.",
    opportunitySignal:
      "Clinics using paper diaries + Instagram DMs = booking app pitch.",
    skills: ["React Native", "Calendars", "Push notifications"],
    techStack: ["Expo", "Firebase", "Razorpay", "WhatsApp link"],
    requirements: [
      "Customer booking flow",
      "Admin calendar",
      "SMS/push reminders",
      "Payment optional"
    ],
    clientSearchTerms: ["Clinics", "Salons", "Tutors", "Consultancies"],
    estimatedEffort: "4–8 weeks",
    pricingInr: "₹50,000 – ₹2,00,000",
    pitchScript:
      "Hi, I build booking apps with reminders so you stop double-booking. Can I show a clinic demo on a call?",
    market: "india"
  }
];

export const freelancePlatforms: FreelancePlatform[] = [
  {
    id: "upwork",
    name: "Upwork",
    region: "global",
    bestFor: "Longer web/app contracts with clear milestones",
    url: "https://www.upwork.com",
    starterTip: "Win with a narrow niche profile (e.g. ‘Shopify + Razorpay for Indian D2C’) and 3 case-study thumbnails.",
    feeNote: "Service fee on earnings; connectes/boosts cost extra."
  },
  {
    id: "fiverr",
    name: "Fiverr",
    region: "global",
    bestFor: "Packaged gigs — logos, landing pages, Reel edits",
    url: "https://www.fiverr.com",
    starterTip: "Start with 3 gig tiers and 48-hour delivery on the basic package to collect reviews fast.",
    feeNote: "Platform commission on each order."
  },
  {
    id: "freelancer",
    name: "Freelancer.com",
    region: "global",
    bestFor: "Bidding on well-scoped tech tasks",
    url: "https://www.freelancer.com",
    starterTip: "Bid less often; write project-specific proposals with a 2-step plan and one relevant sample.",
    feeNote: "Bid fees / commissions vary by plan."
  },
  {
    id: "contra",
    name: "Contra",
    region: "global",
    bestFor: "Commission-free portfolio + independent contracts",
    url: "https://contra.com",
    starterTip: "Use when you already have inbound leads and want clean invoices without marketplace fees.",
    feeNote: "Positioned as 0% commission hiring; check current terms."
  },
  {
    id: "toptal",
    name: "Toptal",
    region: "global",
    bestFor: "Senior vetted engineering/design (hard filter)",
    url: "https://www.toptal.com",
    starterTip: "Only after strong portfolio + DSA/system confidence — screening is strict.",
    feeNote: "Vetted network; client rates are premium."
  },
  {
    id: "truelancer",
    name: "Truelancer",
    region: "india",
    bestFor: "India-priced web and design projects",
    url: "https://www.truelancer.com",
    starterTip: "Compete on clear Hindi/English proposals and WhatsApp-friendly communication.",
    feeNote: "Project fees apply; verify escrow."
  },
  {
    id: "worknhire",
    name: "WorkNHire",
    region: "india",
    bestFor: "Entry India freelance tasks and contests",
    url: "https://www.worknhire.com",
    starterTip: "Good for first reviews — keep scope tiny and delivery screenshots ready.",
    feeNote: "Check contest vs project fees before bidding."
  },
  {
    id: "guru",
    name: "Guru",
    region: "global",
    bestFor: "Hourly tech support and maintenance retainers",
    url: "https://www.guru.com",
    starterTip: "SafePay milestones + weekly update ritual builds trust for remote clients.",
    feeNote: "Membership tiers change fee %."
  },
  {
    id: "linkedin-services",
    name: "LinkedIn Services",
    region: "both",
    bestFor: "Inbound from founders who already stalk your profile",
    url: "https://www.linkedin.com/services",
    starterTip: "Pin 3 proof posts + Services page; DM warm viewers within 24 hours.",
    feeNote: "No marketplace cut — you invoice directly (use written SOW)."
  },
  {
    id: "instagram-outbound",
    name: "Instagram / Maps outbound",
    region: "india",
    bestFor: "Local salons, cafes, clinics via cold DM + call",
    url: "https://www.google.com/maps",
    starterTip: "10 calls/day beats 50 cold DMs — use the pitch scripts in each subdomain.",
    feeNote: "Zero platform fee; your time is the cost."
  },
  {
    id: "internshala-freelance",
    name: "Internshala Freelancing",
    region: "india",
    bestFor: "Student-friendly short gigs and first invoices",
    url: "https://internshala.com/freelance-jobs",
    starterTip: "Filter ‘work from home’ + your skill; apply same day with 1 relevant sample.",
    feeNote: "Often lower budgets — trade for reviews/portfolio."
  },
  {
    id: "reddit-forhire",
    name: "r/forhire & indie communities",
    region: "global",
    bestFor: "Small indie gigs when you write a tight hiring post",
    url: "https://www.reddit.com/r/forhire",
    starterTip: "Follow subreddit rules; lead with stack + price range + 2 links, not a life story.",
    feeNote: "Usually direct PayPal/Stripe — use a contract template."
  }
];

export const freelanceStarterTips: FreelanceStarterTip[] = [
  {
    id: "week1-portfolio",
    title: "Ship 2 fake-but-real case studies this week",
    body: "Rebuild a salon site and a restaurant menu site using public photos. Host free on Vercel. Without proof, cold calls die in 10 seconds.",
    stage: "week-1"
  },
  {
    id: "week1-niche",
    title: "Rank one niche sentence",
    body: "‘I build booking websites for salons in Pune’ converts harder than ‘full-stack developer available’.",
    stage: "week-1"
  },
  {
    id: "first-maps",
    title: "Start on Google Maps, not Upwork",
    body: "For India, 15 Maps calls to shops without websites beats weeks of global bidding with 0 connects left.",
    stage: "first-client"
  },
  {
    id: "first-pilot",
    title: "Sell a paid pilot, not a free forever project",
    body: "₹2–5k pilots with a clear deliverable beat unpaid ‘experience’ gigs that eat your semester.",
    stage: "first-client"
  },
  {
    id: "first-whatsapp-sow",
    title: "Send a WhatsApp SOW before you code",
    body: "Scope, price, timeline, revisions (usually 2), and what is out of scope. Screenshot their ‘OK’.",
    stage: "first-client"
  },
  {
    id: "price-anchors",
    title: "Quote ranges, then offer 2 packages",
    body: "Basic (template) vs Growth (custom + training). Anchoring beats random ₹999 quotes that attract bad clients.",
    stage: "pricing"
  },
  {
    id: "price-advance",
    title: "Take 40–50% advance",
    body: "Especially for wedding and salon sites. No advance → high ghosting risk after you share previews.",
    stage: "pricing"
  },
  {
    id: "delivery-training",
    title: "Charge for a 30-min training call",
    body: "Handing over a site without training creates ‘can you just…’ messages forever. Put training in the package.",
    stage: "delivery"
  },
  {
    id: "delivery-maintenance",
    title: "Offer a ₹1–3k/month care plan",
    body: "Small edits, uptime check, monthly backup. Recurring > another cold-call cycle.",
    stage: "delivery"
  },
  {
    id: "growth-referrals",
    title: "Ask every happy client for 2 intros",
    body: "Kirana networks and CA WhatsApp groups spread faster than any marketplace algorithm.",
    stage: "growth"
  },
  {
    id: "growth-productize",
    title: "Productize after 3 similar jobs",
    body: "If you built 3 salon sites, turn it into a fixed ‘Salon Launch Pack’ with checklist + price on your LinkedIn Services.",
    stage: "growth"
  },
  {
    id: "growth-global",
    title: "Use India wins to unlock global gigs",
    body: "Case studies with metrics (bookings ↑, commission ↓) are what Upwork clients actually click — localize currency, keep story global.",
    stage: "growth"
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

export function getFreelancePlatformsByRegion(
  region: FreelancePlatform["region"] | "all" = "all"
): FreelancePlatform[] {
  if (region === "all") {
    return freelancePlatforms;
  }
  return freelancePlatforms.filter(
    (platform) => platform.region === region || platform.region === "both"
  );
}
