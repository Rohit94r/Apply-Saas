import { Schema, model, models, type InferSchemaType } from "mongoose";

const InterviewGuideSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    generatedResumeId: { type: Schema.Types.ObjectId, ref: "GeneratedResume" },
    company: { type: String, required: true },
    role: { type: String, required: true },
    generatedQuestions: [{ type: String }],
    companyAnalysis: { type: String },
    prepNotes: [{ type: String }],
    technicalTopics: [{ type: String }]
  },
  { timestamps: true }
);

InterviewGuideSchema.index({ userId: 1, createdAt: -1 });

export type InterviewGuideDocument = InferSchemaType<typeof InterviewGuideSchema>;

export const InterviewGuide =
  models.InterviewGuide || model("InterviewGuide", InterviewGuideSchema);
