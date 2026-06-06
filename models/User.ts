import { Schema, model, models, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    image: { type: String },
    subscriptionPlan: {
      type: String,
      enum: ["free", "pro"],
      default: "free"
    },
    proExpiresAt: { type: Date },
    lastDiscountCode: { type: String },
    lastLoginAt: { type: Date },
    loginCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof UserSchema>;

export const User = models.User || model("User", UserSchema);
