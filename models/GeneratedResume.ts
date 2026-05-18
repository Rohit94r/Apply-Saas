import { Schema, model, models, type InferSchemaType } from "mongoose";

const GeneratedContentSchema = new Schema(
  {
    summary: { type: String, required: true },
    skills: [{ type: String }],
    bullets: [{ type: String }],
    beforeText: { type: String },
    afterText: { type: String },
    changeSummary: [{ type: String }],
    beforeAtsScore: { type: Number },
    template: {
      type: String,
      enum: ["classic", "modern", "compact"]
    },
    sourceFilePath: { type: String },
    sourceFileType: { type: String },
    sourceLayout: { type: Schema.Types.Mixed }
  },
  { _id: false }
);

const GeneratedResumeSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    originalResumeId: { type: Schema.Types.ObjectId, ref: "MasterResume" },
    company: { type: String, required: true },
    role: { type: String, required: true },
    generatedContent: { type: GeneratedContentSchema, required: true },
    atsScore: { type: Number, default: 0 },
    keywords: [{ type: String }],
    pdfUrl: { type: String },
    status: {
      type: String,
      enum: ["draft", "ready", "downloaded"],
      default: "ready"
    }
  },
  { timestamps: true }
);

GeneratedResumeSchema.index({ userId: 1, createdAt: -1 });

export type GeneratedResumeDocument = InferSchemaType<typeof GeneratedResumeSchema>;

export const GeneratedResume =
  models.GeneratedResume || model("GeneratedResume", GeneratedResumeSchema);
