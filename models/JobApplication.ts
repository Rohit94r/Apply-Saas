import { Schema, model, models, type InferSchemaType } from "mongoose";

export const APPLICATION_STATUSES = [
  "applied",
  "interview",
  "offer",
  "rejected"
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

const JobApplicationSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: "applied"
    },
    notes: { type: String, default: "", maxlength: 2000 },
    appliedAt: { type: Date, default: Date.now },
    location: { type: String, trim: true, default: "" }
  },
  { timestamps: true }
);

JobApplicationSchema.index({ userId: 1, updatedAt: -1 });

export type JobApplicationDocument = InferSchemaType<typeof JobApplicationSchema>;

export const JobApplication =
  models.JobApplication || model("JobApplication", JobApplicationSchema);
