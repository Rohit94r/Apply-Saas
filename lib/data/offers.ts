import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { offers } from "@/packages/db/schema";

export type OfferRecord = {
  id: string;
  userId: string;
  company: string;
  role: string;
  ctc: string;
  location: string;
  deadline: string;
  notes: string;
  updatedAt: string;
};

type CreateOfferInput = {
  company: string;
  role: string;
  ctc: string;
  location?: string;
  deadline?: string;
  notes?: string;
};

type UpdateOfferInput = Partial<CreateOfferInput>;

function serialize(row: typeof offers.$inferSelect): OfferRecord {
  return {
    id: row.id,
    userId: row.userId,
    company: row.company,
    role: row.role,
    ctc: row.ctc,
    location: row.location ?? "",
    deadline: row.deadline ?? "",
    notes: row.notes ?? "",
    updatedAt: (row.updatedAt ?? new Date()).toISOString()
  };
}

export async function listOffers(userId: string) {
  const rows = await db
    .select()
    .from(offers)
    .where(eq(offers.userId, userId))
    .orderBy(desc(offers.updatedAt));
  return rows.map(serialize);
}

export async function createOffer(userId: string, input: CreateOfferInput) {
  const [created] = await db
    .insert(offers)
    .values({
      userId,
      company: input.company.trim(),
      role: input.role.trim(),
      ctc: input.ctc.trim(),
      location: input.location?.trim() ?? "",
      deadline: input.deadline?.trim() ?? "",
      notes: input.notes?.trim() ?? ""
    })
    .returning();
  return serialize(created);
}

export async function updateOffer(
  userId: string,
  id: string,
  input: UpdateOfferInput
) {
  const [updated] = await db
    .update(offers)
    .set({
      ...(input.company !== undefined ? { company: input.company.trim() } : {}),
      ...(input.role !== undefined ? { role: input.role.trim() } : {}),
      ...(input.ctc !== undefined ? { ctc: input.ctc.trim() } : {}),
      ...(input.location !== undefined
        ? { location: input.location.trim() }
        : {}),
      ...(input.deadline !== undefined
        ? { deadline: input.deadline.trim() }
        : {}),
      ...(input.notes !== undefined ? { notes: input.notes.trim() } : {}),
      updatedAt: new Date()
    })
    .where(and(eq(offers.id, id), eq(offers.userId, userId)))
    .returning();

  if (!updated) {
    throw new Error("Offer not found");
  }

  return serialize(updated);
}

export async function deleteOffer(userId: string, id: string) {
  const deleted = await db
    .delete(offers)
    .where(and(eq(offers.id, id), eq(offers.userId, userId)))
    .returning({ id: offers.id });

  if (deleted.length === 0) {
    throw new Error("Offer not found");
  }
}
