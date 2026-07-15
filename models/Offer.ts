import { Schema, model, models, type InferSchemaType } from "mongoose";

const OfferSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    ctc: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: "" },
    deadline: { type: String, trim: true, default: "" },
    notes: { type: String, default: "", maxlength: 2000 }
  },
  { timestamps: true }
);

OfferSchema.index({ userId: 1, updatedAt: -1 });

export type OfferDocument = InferSchemaType<typeof OfferSchema>;

export const Offer = models.Offer || model("Offer", OfferSchema);
