export type ResumeTemplateId = "classic" | "modern" | "compact";

export type ResumeSectionId =
  | "personal"
  | "summary"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "achievements";

export type EditorItem = {
  id: string;
  text: string;
};

export type ResumeStudioDocument = {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    targetRole: string;
  };
  summary: string;
  experience: EditorItem[];
  projects: EditorItem[];
  skills: string[];
  education: EditorItem[];
  achievements: EditorItem[];
  template: ResumeTemplateId;
};

export type EditorLoadingState = {
  save: boolean;
  preview: boolean;
  ai: boolean;
};
