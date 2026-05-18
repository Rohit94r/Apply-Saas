import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

async function requireUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new UploadThingError({
      code: "FORBIDDEN",
      message: "Sign in to upload files"
    });
  }

  return { userId };
}

export const uploadRouter = {
  resumeUploader: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    text: { maxFileSize: "1MB", maxFileCount: 1 }
  })
    .middleware(requireUser)
    .onUploadComplete(async ({ file, metadata }) => {
      return {
        userId: metadata.userId,
        name: file.name,
        url: file.ufsUrl
      };
    }),
  photoUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 }
  })
    .middleware(requireUser)
    .onUploadComplete(async ({ file, metadata }) => {
      return {
        userId: metadata.userId,
        name: file.name,
        url: file.ufsUrl
      };
    })
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
