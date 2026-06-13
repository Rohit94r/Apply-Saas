"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionBlock } from "@/components/dashboard/resume-studio/editor/section-block";
import { ReorderableList } from "@/components/dashboard/resume-studio/editor/reorderable-list";
import type { ResumeSectionId, ResumeStudioDocument } from "@/lib/resume-studio/types";

export function ResumeEditor({
  document,
  onChange,
  onImproveSection,
  improvingSection
}: {
  document: ResumeStudioDocument;
  onChange: (document: ResumeStudioDocument) => void;
  onImproveSection: (section: ResumeSectionId) => void;
  improvingSection: ResumeSectionId | null;
}) {
  function updatePersonal(field: keyof ResumeStudioDocument["personal"], value: string) {
    onChange({
      ...document,
      personal: { ...document.personal, [field]: value }
    });
  }

  return (
    <div className="space-y-4 pb-36">
      <SectionBlock title="Personal Information" sectionId="personal" defaultOpen>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Full name" value={document.personal.name} onChange={(v) => updatePersonal("name", v)} />
          <Field label="Target role" value={document.personal.targetRole} onChange={(v) => updatePersonal("targetRole", v)} />
          <Field label="Email" value={document.personal.email} onChange={(v) => updatePersonal("email", v)} />
          <Field label="Phone" value={document.personal.phone} onChange={(v) => updatePersonal("phone", v)} />
          <Field label="Location" value={document.personal.location} onChange={(v) => updatePersonal("location", v)} />
          <Field label="LinkedIn" value={document.personal.linkedin} onChange={(v) => updatePersonal("linkedin", v)} />
          <Field label="GitHub" value={document.personal.github} onChange={(v) => updatePersonal("github", v)} className="sm:col-span-2" />
        </div>
      </SectionBlock>

      <SectionBlock
        title="Professional Summary"
        sectionId="summary"
        onImprove={onImproveSection}
        improving={improvingSection === "summary"}
      >
        <Textarea
          value={document.summary}
          onChange={(event) => onChange({ ...document, summary: event.target.value })}
          className="min-h-28"
          placeholder="Two concise lines about your strengths and target role..."
        />
      </SectionBlock>

      <SectionBlock
        title="Experience"
        sectionId="experience"
        onImprove={onImproveSection}
        improving={improvingSection === "experience"}
      >
        <ReorderableList
          items={document.experience}
          onChange={(experience) => onChange({ ...document, experience })}
          placeholder="Role, company, dates, and impact bullets..."
        />
      </SectionBlock>

      <SectionBlock
        title="Projects"
        sectionId="projects"
        onImprove={onImproveSection}
        improving={improvingSection === "projects"}
      >
        <ReorderableList
          items={document.projects}
          onChange={(projects) => onChange({ ...document, projects })}
          placeholder="Project name, stack, and measurable outcome..."
        />
      </SectionBlock>

      <SectionBlock
        title="Skills"
        sectionId="skills"
        onImprove={onImproveSection}
        improving={improvingSection === "skills"}
      >
        <Textarea
          value={document.skills.join(", ")}
          onChange={(event) =>
            onChange({
              ...document,
              skills: event.target.value
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
            })
          }
          className="min-h-24"
          placeholder="React, TypeScript, Node.js, REST APIs..."
        />
      </SectionBlock>

      <SectionBlock
        title="Education"
        sectionId="education"
        onImprove={onImproveSection}
        improving={improvingSection === "education"}
      >
        <ReorderableList
          items={document.education}
          onChange={(education) => onChange({ ...document, education })}
          placeholder="Degree, college, graduation year, GPA if relevant..."
        />
      </SectionBlock>

      <SectionBlock
        title="Achievements / Certifications"
        sectionId="achievements"
        onImprove={onImproveSection}
        improving={improvingSection === "achievements"}
      >
        <ReorderableList
          items={document.achievements}
          onChange={(achievements) => onChange({ ...document, achievements })}
          placeholder="Award, certification, hackathon, or leadership highlight..."
        />
      </SectionBlock>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  className
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`block space-y-1.5 ${className ?? ""}`}>
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
