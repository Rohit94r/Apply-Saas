import { Schema, model, models, type InferSchemaType } from "mongoose";

const ACTIVITY_ACTIONS = [
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

const UserActivitySchema = new Schema(
  {
    clerkId: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    name: { type: String, required: true },
    action: {
      type: String,
      enum: ACTIVITY_ACTIONS,
      required: true,
      index: true
    },
    detail: { type: String }
  },
  { timestamps: true }
);

export type UserActivityDocument = InferSchemaType<typeof UserActivitySchema>;
export type ActivityAction = (typeof ACTIVITY_ACTIONS)[number];

export const UserActivity =
  models.UserActivity || model("UserActivity", UserActivitySchema);
