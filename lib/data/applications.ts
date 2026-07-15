import { connectToDatabase } from "@/lib/mongodb";
import {
  JobApplication,
  type ApplicationStatus
} from "@/models/JobApplication";

export type JobApplicationRecord = {
  id: string;
  userId: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  notes: string;
  location: string;
  appliedAt: string;
  updatedAt: string;
};

type CreateApplicationInput = {
  company: string;
  role: string;
  status?: ApplicationStatus;
  notes?: string;
  location?: string;
  appliedAt?: string;
};

type UpdateApplicationInput = Partial<CreateApplicationInput>;

function serialize(doc: {
  _id: { toString(): string };
  userId: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  notes?: string;
  location?: string;
  appliedAt?: Date;
  updatedAt?: Date;
}): JobApplicationRecord {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    company: doc.company,
    role: doc.role,
    status: doc.status,
    notes: doc.notes ?? "",
    location: doc.location ?? "",
    appliedAt: (doc.appliedAt ?? new Date()).toISOString(),
    updatedAt: (doc.updatedAt ?? new Date()).toISOString()
  };
}

export async function listApplications(userId: string) {
  await connectToDatabase();
  const rows = await JobApplication.find({ userId })
    .sort({ updatedAt: -1 })
    .lean();
  return rows.map((row) =>
    serialize(row as unknown as Parameters<typeof serialize>[0])
  );
}

export async function createApplication(
  userId: string,
  input: CreateApplicationInput
) {
  await connectToDatabase();
  const created = await JobApplication.create({
    userId,
    company: input.company.trim(),
    role: input.role.trim(),
    status: input.status ?? "applied",
    notes: input.notes?.trim() ?? "",
    location: input.location?.trim() ?? "",
    appliedAt: input.appliedAt ? new Date(input.appliedAt) : new Date()
  });
  return serialize(created.toObject() as Parameters<typeof serialize>[0]);
}

export async function updateApplication(
  userId: string,
  id: string,
  input: UpdateApplicationInput
) {
  await connectToDatabase();
  const updated = await JobApplication.findOneAndUpdate(
    { _id: id, userId },
    {
      $set: {
        ...(input.company !== undefined ? { company: input.company.trim() } : {}),
        ...(input.role !== undefined ? { role: input.role.trim() } : {}),
        ...(input.status !== undefined ? { status: input.status } : {}),
        ...(input.notes !== undefined ? { notes: input.notes.trim() } : {}),
        ...(input.location !== undefined
          ? { location: input.location.trim() }
          : {}),
        ...(input.appliedAt !== undefined
          ? { appliedAt: new Date(input.appliedAt) }
          : {})
      }
    },
    { new: true }
  ).lean();

  if (!updated) {
    throw new Error("Application not found");
  }

  return serialize(updated as unknown as Parameters<typeof serialize>[0]);
}

export async function deleteApplication(userId: string, id: string) {
  await connectToDatabase();
  const result = await JobApplication.deleteOne({ _id: id, userId });
  if (result.deletedCount === 0) {
    throw new Error("Application not found");
  }
}
