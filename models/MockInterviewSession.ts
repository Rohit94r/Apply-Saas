import { Schema, model, models, type InferSchemaType } from "mongoose";

const MockTurnSchema = new Schema(
  {
    question: { type: String, required: true },
    tip: { type: String, default: "" },
    sampleAnswer: { type: String, default: "" },
    category: { type: String, default: "general" },
    answer: { type: String, default: "" },
    strengths: { type: [String], default: [] },
    improvements: { type: [String], default: [] },
    score: { type: Number }
  },
  { _id: false }
);

/** Legacy question shape still accepted for older sessions. */
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
    interviewType: {
      type: String,
      enum: ["hr", "technical", "mixed"],
      default: "mixed"
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium"
    },
    totalQuestions: { type: Number, default: 6 },
    questions: { type: [MockQuestionSchema], default: [] },
    turns: { type: [MockTurnSchema], default: [] },
    provider: { type: String, default: "" },
    demoMode: { type: Boolean, default: false },
    overallScore: { type: Number },
    tips: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
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
