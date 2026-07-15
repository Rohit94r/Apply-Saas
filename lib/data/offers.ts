import { connectToDatabase } from "@/lib/mongodb";
import { Offer } from "@/models/Offer";

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

function serialize(doc: {
  _id: { toString(): string };
  userId: string;
  company: string;
  role: string;
  ctc: string;
  location?: string;
  deadline?: string;
  notes?: string;
  updatedAt?: Date;
}): OfferRecord {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    company: doc.company,
    role: doc.role,
    ctc: doc.ctc,
    location: doc.location ?? "",
    deadline: doc.deadline ?? "",
    notes: doc.notes ?? "",
    updatedAt: (doc.updatedAt ?? new Date()).toISOString()
  };
}

export async function listOffers(userId: string) {
  await connectToDatabase();
  const rows = await Offer.find({ userId }).sort({ updatedAt: -1 }).lean();
  return rows.map((row) =>
    serialize(row as unknown as Parameters<typeof serialize>[0])
  );
}

export async function createOffer(userId: string, input: CreateOfferInput) {
  await connectToDatabase();
  const created = await Offer.create({
    userId,
    company: input.company.trim(),
    role: input.role.trim(),
    ctc: input.ctc.trim(),
    location: input.location?.trim() ?? "",
    deadline: input.deadline?.trim() ?? "",
    notes: input.notes?.trim() ?? ""
  });
  return serialize(created.toObject() as Parameters<typeof serialize>[0]);
}

export async function updateOffer(
  userId: string,
  id: string,
  input: UpdateOfferInput
) {
  await connectToDatabase();
  const updated = await Offer.findOneAndUpdate(
    { _id: id, userId },
    {
      $set: {
        ...(input.company !== undefined ? { company: input.company.trim() } : {}),
        ...(input.role !== undefined ? { role: input.role.trim() } : {}),
        ...(input.ctc !== undefined ? { ctc: input.ctc.trim() } : {}),
        ...(input.location !== undefined
          ? { location: input.location.trim() }
          : {}),
        ...(input.deadline !== undefined
          ? { deadline: input.deadline.trim() }
          : {}),
        ...(input.notes !== undefined ? { notes: input.notes.trim() } : {})
      }
    },
    { new: true }
  ).lean();

  if (!updated) {
    throw new Error("Offer not found");
  }

  return serialize(updated as unknown as Parameters<typeof serialize>[0]);
}

export async function deleteOffer(userId: string, id: string) {
  await connectToDatabase();
  const result = await Offer.deleteOne({ _id: id, userId });
  if (result.deletedCount === 0) {
    throw new Error("Offer not found");
  }
}
