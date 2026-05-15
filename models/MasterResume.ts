import { Schema, model, models, type InferSchemaType } from "mongoose";

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["frontend", "backend", "database", "tools", "soft", "other"],
      default: "other"
    }
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    stack: [{ type: String }],
    impact: { type: String },
    link: { type: String }
  },
  { _id: false }
);

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    bullets: [{ type: String }]
  },
  { _id: false }
);

const MasterResumeSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    summary: { type: String, default: "" },
    education: [{ type: String }],
    skills: [SkillSchema],
    projects: [ProjectSchema],
    experience: [ExperienceSchema]
  },
  { timestamps: true }
);

export type MasterResumeDocument = InferSchemaType<typeof MasterResumeSchema>;

export const MasterResume =
  models.MasterResume || model("MasterResume", MasterResumeSchema);
