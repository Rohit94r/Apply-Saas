import { Schema, model, models, type InferSchemaType } from "mongoose";

const DeviceUsageSchema = new Schema(
  {
    deviceId: { type: String, required: true, unique: true, index: true },
    freeGenerationsUsed: { type: Number, default: 0 },
    linkedUserIds: { type: [String], default: [] },
    blocked: { type: Boolean, default: false },
    blockedReason: { type: String }
  },
  { timestamps: true }
);

export type DeviceUsageDocument = InferSchemaType<typeof DeviceUsageSchema>;

export const DeviceUsage =
  models.DeviceUsage || model("DeviceUsage", DeviceUsageSchema);
