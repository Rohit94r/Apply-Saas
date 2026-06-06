import { currentUser } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User, type UserDocument } from "@/models/User";

export async function getCurrentUserProfile() {
  const session = await auth();

  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  const clerkUser = await currentUser();

  return {
    userId: session.userId,
    name:
      clerkUser?.fullName ??
      clerkUser?.username ??
      clerkUser?.primaryEmailAddress?.emailAddress ??
      "Apply user",
    email: clerkUser?.primaryEmailAddress?.emailAddress ?? "",
    image: clerkUser?.imageUrl
  };
}

export async function ensureUser(clerkId: string) {
  const profile = await getCurrentUserProfile();

  if (profile.userId !== clerkId) {
    throw new Error("Unauthorized");
  }

  await connectToDatabase();

  const existing = await User.findOne({ clerkId }).lean<UserDocument>();

  if (existing) {
    await User.updateOne(
      { clerkId },
      {
        $set: {
          name: profile.name,
          email: profile.email,
          ...(profile.image ? { image: profile.image } : {})
        }
      }
    );
    return User.findOne({ clerkId }).lean<UserDocument>();
  }

  return User.create({
    clerkId,
    name: profile.name,
    email: profile.email,
    image: profile.image,
    subscriptionPlan: "free"
  });
}

export async function getUserByClerkId(clerkId: string) {
  await connectToDatabase();
  return User.findOne({ clerkId }).lean<UserDocument>();
}

export function isProUser(user?: UserDocument | null) {
  if (!user || user.subscriptionPlan !== "pro" || !user.proExpiresAt) {
    return false;
  }

  return new Date(user.proExpiresAt).getTime() > Date.now();
}

export async function activatePro(
  clerkId: string,
  options: { days?: number; discountCode?: string | null } = {}
) {
  const days = options.days ?? 30;
  const proExpiresAt = new Date();
  proExpiresAt.setDate(proExpiresAt.getDate() + days);

  await connectToDatabase();
  await User.updateOne(
    { clerkId },
    {
      $set: {
        subscriptionPlan: "pro",
        proExpiresAt,
        ...(options.discountCode ? { lastDiscountCode: options.discountCode } : {})
      }
    }
  );

  return proExpiresAt;
}

export async function revokePro(clerkId: string) {
  await connectToDatabase();
  await User.updateOne(
    { clerkId },
    {
      $set: { subscriptionPlan: "free" },
      $unset: { proExpiresAt: 1, lastDiscountCode: 1 }
    }
  );
}
