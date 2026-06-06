import fs from "node:fs/promises";
import path from "node:path";
import { connectToDatabase } from "@/lib/mongodb";
import { writableDataPath } from "@/lib/server/storage";
import { GeneratedResume } from "@/models/GeneratedResume";
import { InterviewGuide } from "@/models/InterviewGuide";
import { MasterResume as MasterResumeModel } from "@/models/MasterResume";
import type {
  GenerateResumeInput,
  InterviewGuideInput,
  MasterResumeInput,
  UpdateGeneratedResumeInput
} from "@/lib/validations";
import type {
  DashboardStat,
  GeneratedResume as GeneratedResumeType,
  InterviewGuide as InterviewGuideType,
  MasterResume as MasterResumeType,
  ResumeSourceLine
} from "@/types";

type IdLike = {
  toString(): string;
};

type LocalStore = {
  masterResumes: MasterResumeType[];
  generatedResumes: GeneratedResumeType[];
  interviewGuides: InterviewGuideType[];
};

type MasterResumeRecord = {
  _id: IdLike;
  userId: string;
  title?: string;
  sourceName?: string;
  sourceUrl?: string;
  sourceFilePath?: string;
  sourceFileType?: string;
  sourceLayout?: ResumeSourceLine[];
  rawText?: string;
  summary?: string;
  education?: string[];
  skills?: MasterResumeType["skills"];
  projects?: MasterResumeType["projects"];
  experience?: MasterResumeType["experience"];
  updatedAt?: Date;
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
    beforeText?: string;
    afterText?: string;
    changeSummary?: string[];
    beforeAtsScore?: number;
    template?: "classic" | "modern" | "compact";
    sourceFilePath?: string;
    sourceFileType?: string;
    sourceLayout?: ResumeSourceLine[];
  };
  pdfUrl?: string;
  createdAt?: Date;
};

type MasterResumeSourceInput = MasterResumeInput & {
  sourceFilePath?: string;
  sourceFileType?: string;
  sourceLayout?: ResumeSourceLine[];
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
  roadmap?: InterviewGuideType["roadmap"];
  codingQuestions?: InterviewGuideType["codingQuestions"];
  companyQuestions?: string[];
  behavioralQuestions?: string[];
  mockPlan?: string[];
  freeResources?: InterviewGuideType["freeResources"];
  focusAreas?: string[];
  timeline?: string;
  experienceLevel?: string;
  preferredLanguage?: string;
  createdAt?: Date;
};

const localStorePath =
  process.env.RESUME_LOCAL_STORE_PATH ??
  writableDataPath("resume-store.json");
let databaseUnavailableUntil = 0;

function toISOString(value?: Date) {
  return value ? value.toISOString() : new Date().toISOString();
}

function localId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function emptyLocalStore(): LocalStore {
  return {
    masterResumes: [],
    generatedResumes: [],
    interviewGuides: []
  };
}

async function readLocalStore(): Promise<LocalStore> {
  try {
    const content = await fs.readFile(localStorePath, "utf8");
    const store = JSON.parse(content) as Partial<LocalStore>;

    return {
      masterResumes: store.masterResumes ?? [],
      generatedResumes: store.generatedResumes ?? [],
      interviewGuides: store.interviewGuides ?? []
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn("Local resume store was reset after a read failure", error);
    }

    return emptyLocalStore();
  }
}

async function writeLocalStore(store: LocalStore) {
  await fs.mkdir(path.dirname(localStorePath), { recursive: true });
  await fs.writeFile(localStorePath, JSON.stringify(store, null, 2));
}

async function withDatabaseOrLocal<T>(
  databaseOperation: () => Promise<T>,
  localOperation: () => Promise<T>
) {
  if (Date.now() < databaseUnavailableUntil) {
    return localOperation();
  }

  try {
    await connectToDatabase();
    return await databaseOperation();
  } catch {
    databaseUnavailableUntil = Date.now() + 60_000;
    return localOperation();
  }
}

export function serializeMasterResume(
  resume: MasterResumeRecord
): MasterResumeType {
  return {
    id: resume._id.toString(),
    userId: resume.userId,
    title: resume.title ?? "Master resume",
    sourceName: resume.sourceName,
    sourceUrl: resume.sourceUrl,
    sourceFilePath: resume.sourceFilePath,
    sourceFileType: resume.sourceFileType,
    sourceLayout: resume.sourceLayout ?? [],
    rawText: resume.rawText ?? "",
    summary: resume.summary ?? "",
    education: resume.education ?? [],
    skills: resume.skills ?? [],
    projects: resume.projects ?? [],
    experience: resume.experience ?? [],
    updatedAt: toISOString(resume.updatedAt)
  };
}

export function masterResumeToText(resume?: MasterResumeType | null) {
  if (!resume) {
    return "";
  }

  if (resume.rawText?.trim()) {
    return resume.rawText.trim();
  }

  const sections = [
    resume.summary && `Summary\n${resume.summary}`,
    resume.education.length && `Education\n${resume.education.join("\n")}`,
    resume.skills.length &&
      `Skills\n${resume.skills.map((skill) => skill.name).join(", ")}`,
    resume.projects.length &&
      `Projects\n${resume.projects
        .map((project) =>
          [
            project.name,
            project.description,
            project.stack.length ? `Stack: ${project.stack.join(", ")}` : "",
            project.impact
          ]
            .filter(Boolean)
            .join(" - ")
        )
        .join("\n")}`,
    resume.experience.length &&
      `Experience\n${resume.experience
        .map((experience) =>
          [
            `${experience.role} at ${experience.company}`,
            [experience.startDate, experience.endDate].filter(Boolean).join(" - "),
            ...experience.bullets
          ]
            .filter(Boolean)
            .join("\n")
        )
        .join("\n\n")}`
  ].filter(Boolean);

  return sections.join("\n\n");
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
    roadmap: guide.roadmap ?? [],
    codingQuestions: guide.codingQuestions ?? [],
    companyQuestions: guide.companyQuestions ?? [],
    behavioralQuestions: guide.behavioralQuestions ?? [],
    mockPlan: guide.mockPlan ?? [],
    freeResources: guide.freeResources ?? [],
    focusAreas: guide.focusAreas ?? [],
    timeline: guide.timeline ?? "",
    experienceLevel: guide.experienceLevel ?? "",
    preferredLanguage: guide.preferredLanguage ?? "",
    createdAt: toISOString(guide.createdAt)
  };
}

export async function getLatestMasterResume(userId: string) {
  return withDatabaseOrLocal(
    async () => {
      const resume = await MasterResumeModel.findOne({ userId })
        .sort({ updatedAt: -1 })
        .lean<MasterResumeRecord | null>();

      return resume ? serializeMasterResume(resume) : null;
    },
    async () => {
      const store = await readLocalStore();

      return (
        store.masterResumes
          .filter((resume) => resume.userId === userId)
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )[0] ?? null
      );
    }
  );
}

export async function getMasterResume(userId: string, resumeId: string) {
  return withDatabaseOrLocal(
    async () => {
      const resume = await MasterResumeModel.findOne({ _id: resumeId, userId }).lean<
        MasterResumeRecord | null
      >();

      return resume ? serializeMasterResume(resume) : null;
    },
    async () => {
      const store = await readLocalStore();

      return (
        store.masterResumes.find(
          (resume) => resume.id === resumeId && resume.userId === userId
        ) ?? null
      );
    }
  );
}

export async function upsertMasterResume(
  userId: string,
  input: MasterResumeSourceInput
) {
  return withDatabaseOrLocal(
    async () => {
      const setPayload: Record<string, unknown> = {
        title: input.title?.trim() || "Master resume",
        sourceName: input.sourceName?.trim(),
        sourceUrl: input.sourceUrl,
        rawText: input.rawText.trim()
      };

      if (input.sourceFilePath !== undefined) {
        setPayload.sourceFilePath = input.sourceFilePath;
      }

      if (input.sourceFileType !== undefined) {
        setPayload.sourceFileType = input.sourceFileType;
      }

      if (input.sourceLayout !== undefined) {
        setPayload.sourceLayout = input.sourceLayout;
      }

      const resume = await MasterResumeModel.findOneAndUpdate(
        { userId },
        {
          $set: setPayload,
          $setOnInsert: { userId }
        },
        { new: true, upsert: true }
      ).lean<MasterResumeRecord>();

      if (!resume) {
        throw new Error("Unable to save master resume");
      }

      return serializeMasterResume(resume);
    },
    async () => {
      const store = await readLocalStore();
      const existingIndex = store.masterResumes.findIndex(
        (resume) => resume.userId === userId
      );
      const existing = store.masterResumes[existingIndex];
      const masterResume: MasterResumeType = {
        id: existing?.id ?? localId("master"),
        userId,
        title: input.title?.trim() || "Master resume",
        sourceName: input.sourceName?.trim(),
        sourceUrl: input.sourceUrl,
        sourceFilePath: input.sourceFilePath ?? existing?.sourceFilePath,
        sourceFileType: input.sourceFileType ?? existing?.sourceFileType,
        sourceLayout: input.sourceLayout ?? existing?.sourceLayout ?? [],
        rawText: input.rawText.trim(),
        summary: existing?.summary ?? "",
        education: existing?.education ?? [],
        skills: existing?.skills ?? [],
        projects: existing?.projects ?? [],
        experience: existing?.experience ?? [],
        updatedAt: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        store.masterResumes[existingIndex] = masterResume;
      } else {
        store.masterResumes.push(masterResume);
      }

      await writeLocalStore(store);
      return masterResume;
    }
  );
}

export async function createGeneratedResume(
  userId: string,
  input: GenerateResumeInput,
  generatedContent: GeneratedResumeRecord["generatedContent"] & {
    keywords: string[];
    atsScore: number;
  },
  originalResumeId?: string
) {
  return withDatabaseOrLocal(
    async () => {
      const resume = await GeneratedResume.create({
        userId,
        originalResumeId,
        company: input.company,
        role: input.role,
        atsScore: generatedContent.atsScore,
        keywords: generatedContent.keywords,
        status: "ready",
            generatedContent: {
              summary: generatedContent.summary,
              skills: generatedContent.skills,
              bullets: generatedContent.bullets,
              beforeText: generatedContent.beforeText,
              afterText: generatedContent.afterText,
              changeSummary: generatedContent.changeSummary,
              beforeAtsScore: generatedContent.beforeAtsScore,
              template: generatedContent.template,
              sourceFilePath: generatedContent.sourceFilePath,
              sourceFileType: generatedContent.sourceFileType,
              sourceLayout: generatedContent.sourceLayout
            }
          });

      return serializeGeneratedResume(resume.toObject() as GeneratedResumeRecord);
    },
    async () => {
      const store = await readLocalStore();
      const resume: GeneratedResumeType = {
        id: localId("generated"),
        userId,
        originalResumeId,
        company: input.company,
        role: input.role,
        atsScore: generatedContent.atsScore,
        keywords: generatedContent.keywords,
        status: "ready",
        generatedContent: {
          summary: generatedContent.summary,
          skills: generatedContent.skills,
          bullets: generatedContent.bullets,
          beforeText: generatedContent.beforeText,
          afterText: generatedContent.afterText,
          changeSummary: generatedContent.changeSummary,
          beforeAtsScore: generatedContent.beforeAtsScore,
          template: generatedContent.template,
          sourceFilePath: generatedContent.sourceFilePath,
          sourceFileType: generatedContent.sourceFileType,
          sourceLayout: generatedContent.sourceLayout
        },
        createdAt: new Date().toISOString()
      };

      store.generatedResumes.push(resume);
      await writeLocalStore(store);
      return resume;
    }
  );
}

export async function getGeneratedResumes(userId: string, limit = 30) {
  return withDatabaseOrLocal(
    async () => {
      const resumes = await GeneratedResume.find({ userId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean<GeneratedResumeRecord[]>();

      return resumes.map(serializeGeneratedResume);
    },
    async () => {
      const store = await readLocalStore();

      return store.generatedResumes
        .filter((resume) => resume.userId === userId)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, limit);
    }
  );
}

export async function getGeneratedResume(userId: string, resumeId: string) {
  return withDatabaseOrLocal(
    async () => {
      const resume = await GeneratedResume.findOne({ _id: resumeId, userId }).lean<
        GeneratedResumeRecord | null
      >();

      return resume ? serializeGeneratedResume(resume) : null;
    },
    async () => {
      const store = await readLocalStore();

      return (
        store.generatedResumes.find(
          (resume) => resume.id === resumeId && resume.userId === userId
        ) ?? null
      );
    }
  );
}

export async function updateGeneratedResume(
  userId: string,
  resumeId: string,
  input: UpdateGeneratedResumeInput
) {
  return withDatabaseOrLocal(
    async () => {
      const resume = await GeneratedResume.findOneAndUpdate(
        { _id: resumeId, userId },
        {
          $set: {
            atsScore: input.atsScore,
            keywords: input.keywords ?? [],
            "generatedContent.summary": input.summary,
            "generatedContent.skills": input.skills,
            "generatedContent.bullets": input.bullets,
            "generatedContent.beforeText": input.beforeText,
            "generatedContent.afterText": input.afterText,
            "generatedContent.changeSummary": input.changeSummary ?? [],
            "generatedContent.beforeAtsScore": input.beforeAtsScore,
            "generatedContent.template": input.template,
            status: "ready"
          }
        },
        { new: true }
      ).lean<GeneratedResumeRecord | null>();

      return resume ? serializeGeneratedResume(resume) : null;
    },
    async () => {
      const store = await readLocalStore();
      const resumeIndex = store.generatedResumes.findIndex(
        (resume) => resume.id === resumeId && resume.userId === userId
      );

      if (resumeIndex < 0) {
        return null;
      }

      store.generatedResumes[resumeIndex] = {
        ...store.generatedResumes[resumeIndex],
        atsScore: input.atsScore ?? store.generatedResumes[resumeIndex].atsScore,
        keywords: input.keywords ?? [],
        generatedContent: {
          summary: input.summary,
          skills: input.skills,
          bullets: input.bullets,
          beforeText:
            input.beforeText ??
            store.generatedResumes[resumeIndex].generatedContent.beforeText,
          afterText:
            input.afterText ??
            store.generatedResumes[resumeIndex].generatedContent.afterText,
          changeSummary:
            input.changeSummary ??
            store.generatedResumes[resumeIndex].generatedContent.changeSummary,
          beforeAtsScore:
            input.beforeAtsScore ??
            store.generatedResumes[resumeIndex].generatedContent.beforeAtsScore,
          template:
            input.template ??
            store.generatedResumes[resumeIndex].generatedContent.template,
          sourceFilePath:
            store.generatedResumes[resumeIndex].generatedContent.sourceFilePath,
          sourceFileType:
            store.generatedResumes[resumeIndex].generatedContent.sourceFileType,
          sourceLayout:
            store.generatedResumes[resumeIndex].generatedContent.sourceLayout
        },
        status: "ready"
      };

      await writeLocalStore(store);
      return store.generatedResumes[resumeIndex];
    }
  );
}

export async function markResumeDownloaded(userId: string, resumeId: string) {
  return withDatabaseOrLocal(
    async () => {
      await GeneratedResume.updateOne(
        { _id: resumeId, userId },
        { $set: { status: "downloaded" } }
      );
    },
    async () => {
      const store = await readLocalStore();
      const resumeIndex = store.generatedResumes.findIndex(
        (resume) => resume.id === resumeId && resume.userId === userId
      );

      if (resumeIndex >= 0) {
        store.generatedResumes[resumeIndex] = {
          ...store.generatedResumes[resumeIndex],
          status: "downloaded"
        };
        await writeLocalStore(store);
      }
    }
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
  return withDatabaseOrLocal(
    async () => {
      const created = await InterviewGuide.create({
        userId,
        company: input.company,
        role: input.role,
        companyAnalysis: guide.companyAnalysis,
        generatedQuestions: guide.generatedQuestions,
        prepNotes: guide.prepNotes,
        technicalTopics: guide.technicalTopics,
        roadmap: guide.roadmap,
        codingQuestions: guide.codingQuestions,
        companyQuestions: guide.companyQuestions,
        behavioralQuestions: guide.behavioralQuestions,
        mockPlan: guide.mockPlan,
        freeResources: guide.freeResources,
        focusAreas: input.focusAreas,
        timeline: input.timeline,
        experienceLevel: input.experienceLevel,
        preferredLanguage: input.preferredLanguage
      });

      return serializeInterviewGuide(created.toObject() as InterviewGuideRecord);
    },
    async () => {
      const store = await readLocalStore();
      const created: InterviewGuideType = {
        id: localId("guide"),
        userId,
        company: input.company,
        role: input.role,
        companyAnalysis: guide.companyAnalysis,
        generatedQuestions: guide.generatedQuestions,
        prepNotes: guide.prepNotes,
        technicalTopics: guide.technicalTopics,
        roadmap: guide.roadmap,
        codingQuestions: guide.codingQuestions,
        companyQuestions: guide.companyQuestions,
        behavioralQuestions: guide.behavioralQuestions,
        mockPlan: guide.mockPlan,
        freeResources: guide.freeResources,
        focusAreas: input.focusAreas,
        timeline: input.timeline,
        experienceLevel: input.experienceLevel,
        preferredLanguage: input.preferredLanguage,
        createdAt: new Date().toISOString()
      };

      store.interviewGuides.push(created);
      await writeLocalStore(store);
      return created;
    }
  );
}

export async function getInterviewGuides(userId: string, limit = 20) {
  return withDatabaseOrLocal(
    async () => {
      const guides = await InterviewGuide.find({ userId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean<InterviewGuideRecord[]>();

      return guides.map(serializeInterviewGuide);
    },
    async () => {
      const store = await readLocalStore();

      return store.interviewGuides
        .filter((guide) => guide.userId === userId)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, limit);
    }
  );
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

  const improvedCount = resumes.filter(
    (resume) =>
      resume.generatedContent.beforeAtsScore !== undefined &&
      resume.atsScore > (resume.generatedContent.beforeAtsScore ?? 0)
  ).length;

  const avgImprovement = improvedCount
    ? Math.round(
        resumes
          .filter((r) => r.generatedContent.beforeAtsScore !== undefined)
          .reduce(
            (total, r) =>
              total + (r.atsScore - (r.generatedContent.beforeAtsScore ?? 0)),
            0
          ) / Math.max(improvedCount, 1)
      )
    : 0;

  return [
    {
      label: "ATS average",
      value: `${atsAverage}%`,
      detail: resumes.length
        ? `Across ${resumes.length} generated resume${resumes.length === 1 ? "" : "s"}`
        : "Generate a resume to start tracking score quality",
      trend: avgImprovement > 0 ? `+${avgImprovement}% avg lift` : undefined
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
    },
    {
      label: "Tailored versions",
      value: String(
        resumes.filter((r) => r.company !== "Resume Builder").length
      ),
      detail: "Role-specific resumes tailored to job descriptions"
    }
  ];
}

export type ActivityItem = {
  id: string;
  type: "resume" | "guide" | "build";
  title: string;
  subtitle: string;
  date: string;
  score?: number;
};

export function buildActivityFeed(
  resumes: GeneratedResumeType[],
  guides: InterviewGuideType[],
  limit = 6
): ActivityItem[] {
  const items: ActivityItem[] = [
    ...resumes.map((resume) => ({
      id: resume.id,
      type: (resume.company === "Resume Builder"
        ? "build"
        : "resume") as ActivityItem["type"],
      title:
        resume.company === "Resume Builder"
          ? resume.role
          : `${resume.role} at ${resume.company}`,
      subtitle:
        resume.company === "Resume Builder"
          ? "Built from guided questions"
          : "Tailored resume",
      date: resume.createdAt,
      score: resume.atsScore
    })),
    ...guides.map((guide) => ({
      id: guide.id,
      type: "guide" as const,
      title: guide.role,
      subtitle: guide.company ? `${guide.company} prep plan` : "Interview prep",
      date: guide.createdAt
    }))
  ];

  return items
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function buildReadinessScore(
  resumes: GeneratedResumeType[],
  guides: InterviewGuideType[]
) {
  const hasResume = resumes.length > 0;
  const hasTailored = resumes.some((r) => r.company !== "Resume Builder");
  const hasGuide = guides.length > 0;
  const avgAts = resumes.length
    ? Math.round(
        resumes.reduce((t, r) => t + r.atsScore, 0) / resumes.length
      )
    : 0;

  const steps = [
    { label: "Create a resume", done: hasResume, weight: 30 },
    { label: "Tailor to a role", done: hasTailored, weight: 30 },
    { label: "Interview prep plan", done: hasGuide, weight: 25 },
    { label: "ATS score 70+", done: avgAts >= 70, weight: 15 }
  ];

  const score = steps.reduce(
    (total, step) => total + (step.done ? step.weight : 0),
    0
  );

  return { score, steps, avgAts };
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
