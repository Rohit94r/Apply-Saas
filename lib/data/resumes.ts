import { connectToDatabase } from "@/lib/mongodb";
import { GeneratedResume } from "@/models/GeneratedResume";
import { InterviewGuide } from "@/models/InterviewGuide";
import type { GenerateResumeInput, InterviewGuideInput } from "@/lib/validations";
import type {
  DashboardStat,
  GeneratedResume as GeneratedResumeType,
  InterviewGuide as InterviewGuideType
} from "@/types";

type IdLike = {
  toString(): string;
};

type GeneratedResumeRecord = {
  _id: IdLike;
  userId: string;
  originalResumeId?: IdLike;
  company: string;
  role: string;
  atsScore?: number;
  status?: "draft" | "ready" | "downloaded";
  keywords?: string[];
  generatedContent: {
    summary: string;
    skills: string[];
    bullets: string[];
  };
  pdfUrl?: string;
  createdAt?: Date;
};

type InterviewGuideRecord = {
  _id: IdLike;
  userId: string;
  company: string;
  role: string;
  companyAnalysis?: string;
  generatedQuestions?: string[];
  prepNotes?: string[];
  technicalTopics?: string[];
  createdAt?: Date;
};

function toISOString(value?: Date) {
  return value ? value.toISOString() : new Date().toISOString();
}

export function serializeGeneratedResume(
  resume: GeneratedResumeRecord
): GeneratedResumeType {
  return {
    id: resume._id.toString(),
    userId: resume.userId,
    originalResumeId: resume.originalResumeId?.toString(),
    company: resume.company,
    role: resume.role,
    atsScore: resume.atsScore ?? 0,
    status: resume.status ?? "ready",
    keywords: resume.keywords ?? [],
    generatedContent: resume.generatedContent,
    pdfUrl: resume.pdfUrl,
    createdAt: toISOString(resume.createdAt)
  };
}

export function serializeInterviewGuide(
  guide: InterviewGuideRecord
): InterviewGuideType {
  return {
    id: guide._id.toString(),
    userId: guide.userId,
    company: guide.company,
    role: guide.role,
    companyAnalysis: guide.companyAnalysis ?? "",
    generatedQuestions: guide.generatedQuestions ?? [],
    prepNotes: guide.prepNotes ?? [],
    technicalTopics: guide.technicalTopics ?? [],
    createdAt: toISOString(guide.createdAt)
  };
}

export async function createGeneratedResume(
  userId: string,
  input: GenerateResumeInput,
  generatedContent: GeneratedResumeRecord["generatedContent"] & {
    keywords: string[];
    atsScore: number;
  }
) {
  await connectToDatabase();

  const resume = await GeneratedResume.create({
    userId,
    company: input.company,
    role: input.role,
    atsScore: generatedContent.atsScore,
    keywords: generatedContent.keywords,
    status: "ready",
    generatedContent: {
      summary: generatedContent.summary,
      skills: generatedContent.skills,
      bullets: generatedContent.bullets
    }
  });

  return serializeGeneratedResume(resume.toObject() as GeneratedResumeRecord);
}

export async function getGeneratedResumes(userId: string, limit = 30) {
  await connectToDatabase();

  const resumes = await GeneratedResume.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<GeneratedResumeRecord[]>();

  return resumes.map(serializeGeneratedResume);
}

export async function getGeneratedResume(userId: string, resumeId: string) {
  await connectToDatabase();

  const resume = await GeneratedResume.findOne({ _id: resumeId, userId }).lean<
    GeneratedResumeRecord | null
  >();

  return resume ? serializeGeneratedResume(resume) : null;
}

export async function markResumeDownloaded(userId: string, resumeId: string) {
  await connectToDatabase();

  await GeneratedResume.updateOne(
    { _id: resumeId, userId },
    { $set: { status: "downloaded" } }
  );
}

export async function createInterviewGuide(
  userId: string,
  input: InterviewGuideInput,
  guide: Omit<
    InterviewGuideType,
    "id" | "userId" | "company" | "role" | "createdAt"
  >
) {
  await connectToDatabase();

  const created = await InterviewGuide.create({
    userId,
    company: input.company,
    role: input.role,
    companyAnalysis: guide.companyAnalysis,
    generatedQuestions: guide.generatedQuestions,
    prepNotes: guide.prepNotes,
    technicalTopics: guide.technicalTopics
  });

  return serializeInterviewGuide(created.toObject() as InterviewGuideRecord);
}

export async function getInterviewGuides(userId: string, limit = 20) {
  await connectToDatabase();

  const guides = await InterviewGuide.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<InterviewGuideRecord[]>();

  return guides.map(serializeInterviewGuide);
}

export function buildDashboardStats(
  resumes: GeneratedResumeType[],
  guides: InterviewGuideType[]
): DashboardStat[] {
  const atsAverage = resumes.length
    ? Math.round(
        resumes.reduce((total, resume) => total + resume.atsScore, 0) /
          resumes.length
      )
    : 0;

  const downloadedCount = resumes.filter(
    (resume) => resume.status === "downloaded"
  ).length;

  return [
    {
      label: "ATS average",
      value: `${atsAverage}%`,
      detail: resumes.length
        ? `Across ${resumes.length} generated resume${resumes.length === 1 ? "" : "s"}`
        : "Generate a resume to start tracking score quality"
    },
    {
      label: "Resumes ready",
      value: String(resumes.length),
      detail: downloadedCount
        ? `${downloadedCount} exported as PDF`
        : "Saved versions appear here after generation"
    },
    {
      label: "Interview guides",
      value: String(guides.length),
      detail: guides.length
        ? "Prepared from your role-specific resume context"
        : "Create a guide from the interview prep page"
    }
  ];
}

export function buildKeywordCoverage(resumes: GeneratedResumeType[]) {
  const counts = new Map<string, number>();

  for (const resume of resumes) {
    for (const keyword of resume.keywords) {
      counts.set(keyword, (counts.get(keyword) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([keyword, count]) => ({
      keyword,
      coverage: Math.round((count / Math.max(resumes.length, 1)) * 100)
    }));
}
