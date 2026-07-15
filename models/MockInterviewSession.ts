import { Schema, model, models, type InferSchemaType } from "mongoose";

const MockQuestionSchema = new Schema(
  {
    question: { type: String, required: true },
    tip: { type: String, default: "" },
    sampleAnswer: { type: String, default: "" },
    category: { type: String, default: "general" }
  },
  { _id: false }
);

const MockInterviewSessionSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    questions: { type: [MockQuestionSchema], default: [] },
    durationSeconds: { type: Number, default: 0 },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

MockInterviewSessionSchema.index({ userId: 1, createdAt: -1 });

export type MockInterviewSessionDocument = InferSchemaType<
  typeof MockInterviewSessionSchema
>;

export const MockInterviewSession =
  models.MockInterviewSession ||
  model("MockInterviewSession", MockInterviewSessionSchema);
