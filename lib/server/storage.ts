import os from "node:os";
import path from "node:path";

function isReadonlyDeploymentRoot(directory: string) {
  const normalized = directory.replace(/\\/g, "/");

  return normalized === "/var/task" || normalized.startsWith("/var/task/");
}

export function writableDataPath(...segments: string[]) {
  const baseDirectory =
    process.env.RESUME_DATA_DIR ??
    (process.env.VERCEL || isReadonlyDeploymentRoot(process.cwd())
      ? path.join(os.tmpdir(), "resume-editor")
      : path.join(process.cwd(), ".data"));

  return path.join(baseDirectory, ...segments);
}
