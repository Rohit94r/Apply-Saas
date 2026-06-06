import { Schema, model, models, type InferSchemaType } from "mongoose";

const PaymentRequestSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    deviceId: { type: String },
    amountInr: { type: Number, required: true },
    originalAmountInr: { type: Number, required: true },
    discountCode: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending"
    },
    proActivated: { type: Boolean, default: false },
    proExpiresAt: { type: Date },
    whatsappOpenedAt: { type: Date }
  },
  { timestamps: true }
);

export type PaymentRequestDocument = InferSchemaType<typeof PaymentRequestSchema>;

export const PaymentRequest =
  models.PaymentRequest || model("PaymentRequest", PaymentRequestSchema);
