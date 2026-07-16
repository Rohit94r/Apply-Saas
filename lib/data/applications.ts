import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  APPLICATION_STATUSES,
  jobApplications,
  type ApplicationStatus
} from "@/packages/db/schema";

export { APPLICATION_STATUSES, type ApplicationStatus };

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

function serialize(row: typeof jobApplications.$inferSelect): JobApplicationRecord {
  return {
    id: row.id,
    userId: row.userId,
    company: row.company,
    role: row.role,
    status: row.status,
    notes: row.notes ?? "",
    location: row.location ?? "",
    appliedAt: (row.appliedAt ?? new Date()).toISOString(),
    updatedAt: (row.updatedAt ?? new Date()).toISOString()
  };
}

export async function listApplications(userId: string) {
  const rows = await db
    .select()
    .from(jobApplications)
    .where(eq(jobApplications.userId, userId))
    .orderBy(desc(jobApplications.updatedAt));
  return rows.map(serialize);
}

export async function createApplication(
  userId: string,
  input: CreateApplicationInput
) {
  const [created] = await db
    .insert(jobApplications)
    .values({
      userId,
      company: input.company.trim(),
      role: input.role.trim(),
      status: input.status ?? "applied",
      notes: input.notes?.trim() ?? "",
      location: input.location?.trim() ?? "",
      appliedAt: input.appliedAt ? new Date(input.appliedAt) : new Date()
    })
    .returning();
  return serialize(created);
}

export async function updateApplication(
  userId: string,
  id: string,
  input: UpdateApplicationInput
) {
  const [updated] = await db
    .update(jobApplications)
    .set({
      ...(input.company !== undefined ? { company: input.company.trim() } : {}),
      ...(input.role !== undefined ? { role: input.role.trim() } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.notes !== undefined ? { notes: input.notes.trim() } : {}),
      ...(input.location !== undefined
        ? { location: input.location.trim() }
        : {}),
      ...(input.appliedAt !== undefined
        ? { appliedAt: new Date(input.appliedAt) }
        : {}),
      updatedAt: new Date()
    })
    .where(and(eq(jobApplications.id, id), eq(jobApplications.userId, userId)))
    .returning();

  if (!updated) {
    throw new Error("Application not found");
  }

  return serialize(updated);
}

export async function deleteApplication(userId: string, id: string) {
  const deleted = await db
    .delete(jobApplications)
    .where(and(eq(jobApplications.id, id), eq(jobApplications.userId, userId)))
    .returning({ id: jobApplications.id });

  if (deleted.length === 0) {
    throw new Error("Application not found");
  }
}
