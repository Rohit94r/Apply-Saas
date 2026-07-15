import { Schema, model, models, type InferSchemaType } from "mongoose";

const CoverLetterSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    resumeId: { type: String, trim: true, default: "" },
    tone: { type: String, trim: true, default: "confident" },
    coverLetter: { type: String, required: true },
    jobDescription: { type: String, trim: true, default: "" }
  },
  { timestamps: true }
);

CoverLetterSchema.index({ userId: 1, updatedAt: -1 });

export type CoverLetterDocument = InferSchemaType<typeof CoverLetterSchema>;

export const CoverLetter =
  models.CoverLetter || model("CoverLetter", CoverLetterSchema);
