import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  resumeUploader: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    text: { maxFileSize: "1MB", maxFileCount: 1 }
  }).onUploadComplete(async ({ file }) => {
    return {
      name: file.name,
      url: file.ufsUrl
    };
  }),
  photoUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 }
  }).onUploadComplete(async ({ file }) => {
    return {
      name: file.name,
      url: file.ufsUrl
    };
  })
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
