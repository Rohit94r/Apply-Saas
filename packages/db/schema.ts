import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

/** Auth-provider user id (Google account id from Auth.js JWT). */
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().unique(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    image: text("image"),
    subscriptionPlan: text("subscription_plan", { enum: ["free", "pro"] })
      .notNull()
      .default("free"),
    proExpiresAt: timestamp("pro_expires_at", { withTimezone: true }),
    lastDiscountCode: text("last_discount_code"),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    loginCount: integer("login_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [index("users_email_idx").on(table.email)]
);

export type ResumeSkillJson = {
  name: string;
  category?: "frontend" | "backend" | "database" | "tools" | "soft" | "other";
};

export type ResumeProjectJson = {
  name: string;
  description: string;
  stack?: string[];
  impact?: string;
  link?: string;
};

export type ResumeExperienceJson = {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  bullets?: string[];
};

/** Master / source resumes (was MasterResume). */
export const resumes = pgTable(
  "resumes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull().default("Master resume"),
    sourceName: text("source_name"),
    sourceUrl: text("source_url"),
    sourceFilePath: text("source_file_path"),
    sourceFileType: text("source_file_type"),
    sourceLayout: jsonb("source_layout").$type<unknown[]>().default([]),
    rawText: text("raw_text").notNull().default(""),
    summary: text("summary").notNull().default(""),
    education: jsonb("education").$type<string[]>().notNull().default([]),
    skills: jsonb("skills").$type<ResumeSkillJson[]>().notNull().default([]),
    projects: jsonb("projects")
      .$type<ResumeProjectJson[]>()
      .notNull()
      .default([]),
    experience: jsonb("experience")
      .$type<ResumeExperienceJson[]>()
      .notNull()
      .default([]),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [index("resumes_user_id_idx").on(table.userId)]
);

export type GeneratedContentJson = {
  summary: string;
  skills: string[];
  bullets: string[];
  beforeText?: string;
  afterText?: string;
  changeSummary?: string[];
  beforeAtsScore?: number;
  template?: "classic" | "modern" | "compact";
  sourceFilePath?: string;
  sourceFileType?: string;
  sourceLayout?: unknown[];
};

/** Tailored / generated resumes (was GeneratedResume). */
export const tailoredResumes = pgTable(
  "tailored_resumes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    originalResumeId: uuid("original_resume_id").references(() => resumes.id, {
      onDelete: "set null"
    }),
    company: text("company").notNull(),
    role: text("role").notNull(),
    generatedContent: jsonb("generated_content")
      .$type<GeneratedContentJson>()
      .notNull(),
    atsScore: integer("ats_score").notNull().default(0),
    keywords: jsonb("keywords").$type<string[]>().notNull().default([]),
    pdfUrl: text("pdf_url"),
    status: text("status", { enum: ["draft", "ready", "downloaded"] })
      .notNull()
      .default("ready"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [
    index("tailored_resumes_user_id_created_at_idx").on(
      table.userId,
      table.createdAt
    )
  ]
);

export type InterviewRoadmapItemJson = {
  week?: string;
  goal?: string;
  tasks?: string[];
  output?: string;
};

export type InterviewCodingQuestionJson = {
  title?: string;
  pattern?: string;
  difficulty?: string;
  why?: string;
  link?: string;
};

export type InterviewFreeResourceJson = {
  title?: string;
  provider?: string;
  type?: string;
  url?: string;
  focus?: string;
};

export const interviewGuides = pgTable(
  "interview_guides",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    generatedResumeId: uuid("generated_resume_id").references(
      () => tailoredResumes.id,
      { onDelete: "set null" }
    ),
    company: text("company").notNull(),
    role: text("role").notNull(),
    generatedQuestions: jsonb("generated_questions")
      .$type<string[]>()
      .notNull()
      .default([]),
    companyAnalysis: text("company_analysis"),
    prepNotes: jsonb("prep_notes").$type<string[]>().notNull().default([]),
    technicalTopics: jsonb("technical_topics")
      .$type<string[]>()
      .notNull()
      .default([]),
    roadmap: jsonb("roadmap")
      .$type<InterviewRoadmapItemJson[]>()
      .notNull()
      .default([]),
    codingQuestions: jsonb("coding_questions")
      .$type<InterviewCodingQuestionJson[]>()
      .notNull()
      .default([]),
    companyQuestions: jsonb("company_questions")
      .$type<string[]>()
      .notNull()
      .default([]),
    behavioralQuestions: jsonb("behavioral_questions")
      .$type<string[]>()
      .notNull()
      .default([]),
    mockPlan: jsonb("mock_plan").$type<string[]>().notNull().default([]),
    freeResources: jsonb("free_resources")
      .$type<InterviewFreeResourceJson[]>()
      .notNull()
      .default([]),
    focusAreas: jsonb("focus_areas").$type<string[]>().notNull().default([]),
    timeline: text("timeline"),
    experienceLevel: text("experience_level"),
    preferredLanguage: text("preferred_language"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [
    index("interview_guides_user_id_created_at_idx").on(
      table.userId,
      table.createdAt
    )
  ]
);

export const applicationStatusEnum = pgEnum("application_status", [
  "applied",
  "interview",
  "offer",
  "rejected"
]);

export const jobApplications = pgTable(
  "job_applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    status: applicationStatusEnum("status").notNull().default("applied"),
    notes: text("notes").notNull().default(""),
    location: text("location").notNull().default(""),
    appliedAt: timestamp("applied_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [
    index("job_applications_user_id_updated_at_idx").on(
      table.userId,
      table.updatedAt
    )
  ]
);

export const coverLetters = pgTable(
  "cover_letters",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    resumeId: text("resume_id").notNull().default(""),
    tone: text("tone").notNull().default("confident"),
    coverLetter: text("cover_letter").notNull(),
    jobDescription: text("job_description").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [
    index("cover_letters_user_id_updated_at_idx").on(
      table.userId,
      table.updatedAt
    )
  ]
);

export const offers = pgTable(
  "offers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    ctc: text("ctc").notNull(),
    location: text("location").notNull().default(""),
    deadline: text("deadline").notNull().default(""),
    notes: text("notes").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [
    index("offers_user_id_updated_at_idx").on(table.userId, table.updatedAt)
  ]
);

export const paymentRequests = pgTable(
  "payment_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    userName: text("user_name").notNull(),
    userEmail: text("user_email").notNull(),
    deviceId: text("device_id"),
    amountInr: integer("amount_inr").notNull(),
    originalAmountInr: integer("original_amount_inr").notNull(),
    discountCode: text("discount_code"),
    status: text("status", { enum: ["pending", "confirmed", "rejected"] })
      .notNull()
      .default("pending"),
    proActivated: boolean("pro_activated").notNull().default(false),
    proExpiresAt: timestamp("pro_expires_at", { withTimezone: true }),
    whatsappOpenedAt: timestamp("whatsapp_opened_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [index("payment_requests_user_id_idx").on(table.userId)]
);

export const deviceUsage = pgTable("device_usage", {
  id: uuid("id").defaultRandom().primaryKey(),
  deviceId: text("device_id").notNull().unique(),
  freeGenerationsUsed: integer("free_generations_used").notNull().default(0),
  linkedUserIds: jsonb("linked_user_ids").$type<string[]>().notNull().default([]),
  blocked: boolean("blocked").notNull().default(false),
  blockedReason: text("blocked_reason"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
});

export const ACTIVITY_ACTIONS = [
  "login",
  "page_view",
  "generate",
  "build",
  "interview",
  "jobs",
  "freelance",
  "tools",
  "upgrade",
  "payment"
] as const;

export type ActivityAction = (typeof ACTIVITY_ACTIONS)[number];

export const userActivity = pgTable(
  "user_activity",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    action: text("action").notNull(),
    detail: text("detail"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [
    index("user_activity_user_id_idx").on(table.userId),
    index("user_activity_email_idx").on(table.email),
    index("user_activity_action_idx").on(table.action),
    index("user_activity_created_at_idx").on(table.createdAt)
  ]
);

export type MockQuestionJson = {
  question: string;
  tip?: string;
  sampleAnswer?: string;
  category?: string;
};

export type MockTurnJson = {
  question: string;
  tip?: string;
  sampleAnswer?: string;
  category?: string;
  answer?: string;
  strengths?: string[];
  improvements?: string[];
  score?: number;
  codeProblem?: unknown;
  codePassed?: boolean;
};

/** Mock interview practice sessions (web). Desktop live sessions may add a separate table later. */
export const mockInterviewSessions = pgTable(
  "mock_interview_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    interviewType: text("interview_type", {
      enum: ["hr", "technical", "mixed"]
    })
      .notNull()
      .default("mixed"),
    difficulty: text("difficulty", { enum: ["easy", "medium", "hard"] })
      .notNull()
      .default("medium"),
    totalQuestions: integer("total_questions").notNull().default(6),
    questions: jsonb("questions").$type<MockQuestionJson[]>().notNull().default([]),
    turns: jsonb("turns").$type<MockTurnJson[]>().notNull().default([]),
    provider: text("provider").notNull().default(""),
    demoMode: boolean("demo_mode").notNull().default(false),
    overallScore: integer("overall_score"),
    tips: jsonb("tips").$type<string[]>().notNull().default([]),
    highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
    durationSeconds: integer("duration_seconds").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [
    index("mock_interview_sessions_user_id_created_at_idx").on(
      table.userId,
      table.createdAt
    )
  ]
);

export const usersRelations = relations(users, ({ many }) => ({
  resumes: many(resumes),
  tailoredResumes: many(tailoredResumes),
  interviewGuides: many(interviewGuides),
  jobApplications: many(jobApplications),
  coverLetters: many(coverLetters),
  offers: many(offers),
  paymentRequests: many(paymentRequests),
  activity: many(userActivity),
  mockInterviewSessions: many(mockInterviewSessions)
}));

export const resumesRelations = relations(resumes, ({ many }) => ({
  tailoredResumes: many(tailoredResumes)
}));

export const tailoredResumesRelations = relations(
  tailoredResumes,
  ({ one }) => ({
    originalResume: one(resumes, {
      fields: [tailoredResumes.originalResumeId],
      references: [resumes.id]
    })
  })
);

export type UserRow = typeof users.$inferSelect;
export type NewUserRow = typeof users.$inferInsert;
export type ResumeRow = typeof resumes.$inferSelect;
export type TailoredResumeRow = typeof tailoredResumes.$inferSelect;
export type InterviewGuideRow = typeof interviewGuides.$inferSelect;
export type JobApplicationRow = typeof jobApplications.$inferSelect;
export type CoverLetterRow = typeof coverLetters.$inferSelect;
export type OfferRow = typeof offers.$inferSelect;
export type PaymentRequestRow = typeof paymentRequests.$inferSelect;
export type DeviceUsageRow = typeof deviceUsage.$inferSelect;
export type UserActivityRow = typeof userActivity.$inferSelect;
export type MockInterviewSessionRow = typeof mockInterviewSessions.$inferSelect;

export const APPLICATION_STATUSES = [
  "applied",
  "interview",
  "offer",
  "rejected"
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
