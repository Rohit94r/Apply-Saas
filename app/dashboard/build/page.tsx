import { BuildResumeStudio } from "@/components/dashboard/resume-studio/build-resume-studio";
import { getCurrentUserId } from "@/lib/auth";
import { getLatestMasterResume } from "@/lib/data/resumes";

export default async function BuildResumePage() {
  const userId = await getCurrentUserId();
  const masterResume = await getLatestMasterResume(userId).catch(() => null);

  return <BuildResumeStudio initialMaster={masterResume} />;
}
