CREATE TYPE "public"."application_status" AS ENUM('applied', 'interview', 'offer', 'rejected');--> statement-breakpoint
CREATE TABLE "cover_letters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"resume_id" text DEFAULT '' NOT NULL,
	"tone" text DEFAULT 'confident' NOT NULL,
	"cover_letter" text NOT NULL,
	"job_description" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "device_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"device_id" text NOT NULL,
	"free_generations_used" integer DEFAULT 0 NOT NULL,
	"linked_user_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"blocked" boolean DEFAULT false NOT NULL,
	"blocked_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "device_usage_device_id_unique" UNIQUE("device_id")
);
--> statement-breakpoint
CREATE TABLE "interview_guides" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"generated_resume_id" uuid,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"generated_questions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"company_analysis" text,
	"prep_notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"technical_topics" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"roadmap" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"coding_questions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"company_questions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"behavioral_questions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"mock_plan" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"free_resources" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"focus_areas" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"timeline" text,
	"experience_level" text,
	"preferred_language" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"status" "application_status" DEFAULT 'applied' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"applied_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_interview_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"interview_type" text DEFAULT 'mixed' NOT NULL,
	"difficulty" text DEFAULT 'medium' NOT NULL,
	"total_questions" integer DEFAULT 6 NOT NULL,
	"questions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"turns" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"provider" text DEFAULT '' NOT NULL,
	"demo_mode" boolean DEFAULT false NOT NULL,
	"overall_score" integer,
	"tips" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"highlights" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"duration_seconds" integer DEFAULT 0 NOT NULL,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "offers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"ctc" text NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"deadline" text DEFAULT '' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"user_name" text NOT NULL,
	"user_email" text NOT NULL,
	"device_id" text,
	"amount_inr" integer NOT NULL,
	"original_amount_inr" integer NOT NULL,
	"discount_code" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"pro_activated" boolean DEFAULT false NOT NULL,
	"pro_expires_at" timestamp with time zone,
	"whatsapp_opened_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"title" text DEFAULT 'Master resume' NOT NULL,
	"source_name" text,
	"source_url" text,
	"source_file_path" text,
	"source_file_type" text,
	"source_layout" jsonb DEFAULT '[]'::jsonb,
	"raw_text" text DEFAULT '' NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"education" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"skills" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"projects" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"experience" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tailored_resumes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"original_resume_id" uuid,
	"company" text NOT NULL,
	"role" text NOT NULL,
	"generated_content" jsonb NOT NULL,
	"ats_score" integer DEFAULT 0 NOT NULL,
	"keywords" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"pdf_url" text,
	"status" text DEFAULT 'ready' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_activity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"action" text NOT NULL,
	"detail" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"image" text,
	"subscription_plan" text DEFAULT 'free' NOT NULL,
	"pro_expires_at" timestamp with time zone,
	"last_discount_code" text,
	"last_login_at" timestamp with time zone,
	"login_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "interview_guides" ADD CONSTRAINT "interview_guides_generated_resume_id_tailored_resumes_id_fk" FOREIGN KEY ("generated_resume_id") REFERENCES "public"."tailored_resumes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tailored_resumes" ADD CONSTRAINT "tailored_resumes_original_resume_id_resumes_id_fk" FOREIGN KEY ("original_resume_id") REFERENCES "public"."resumes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "cover_letters_user_id_updated_at_idx" ON "cover_letters" USING btree ("user_id","updated_at");--> statement-breakpoint
CREATE INDEX "interview_guides_user_id_created_at_idx" ON "interview_guides" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "job_applications_user_id_updated_at_idx" ON "job_applications" USING btree ("user_id","updated_at");--> statement-breakpoint
CREATE INDEX "mock_interview_sessions_user_id_created_at_idx" ON "mock_interview_sessions" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "offers_user_id_updated_at_idx" ON "offers" USING btree ("user_id","updated_at");--> statement-breakpoint
CREATE INDEX "payment_requests_user_id_idx" ON "payment_requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "resumes_user_id_idx" ON "resumes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "tailored_resumes_user_id_created_at_idx" ON "tailored_resumes" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "user_activity_user_id_idx" ON "user_activity" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_activity_email_idx" ON "user_activity" USING btree ("email");--> statement-breakpoint
CREATE INDEX "user_activity_action_idx" ON "user_activity" USING btree ("action");--> statement-breakpoint
CREATE INDEX "user_activity_created_at_idx" ON "user_activity" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");