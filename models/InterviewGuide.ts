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
    technicalTopics: [{ type: String }],
    roadmap: [
      {
        _id: false,
        week: { type: String },
        goal: { type: String },
        tasks: [{ type: String }],
        output: { type: String }
      }
    ],
    codingQuestions: [
      {
        _id: false,
        title: { type: String },
        pattern: { type: String },
        difficulty: { type: String },
        why: { type: String },
        link: { type: String }
      }
    ],
    companyQuestions: [{ type: String }],
    behavioralQuestions: [{ type: String }],
    mockPlan: [{ type: String }],
    freeResources: [
      {
        _id: false,
        title: { type: String },
        provider: { type: String },
        type: { type: String },
        url: { type: String },
        focus: { type: String }
      }
    ],
    focusAreas: [{ type: String }],
    timeline: { type: String },
    experienceLevel: { type: String },
    preferredLanguage: { type: String }
  },
  { timestamps: true }
);

InterviewGuideSchema.index({ userId: 1, createdAt: -1 });

export type InterviewGuideDocument = InferSchemaType<typeof InterviewGuideSchema>;

export const InterviewGuide =
  models.InterviewGuide || model("InterviewGuide", InterviewGuideSchema);
