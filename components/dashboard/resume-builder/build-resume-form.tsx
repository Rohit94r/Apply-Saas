"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DownloadSimple,
  Eye,
  FloppyDisk,
  PencilSimple,
  Plus,
  Sparkle,
  SpinnerGap,
  X
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { billingRequestHeaders } from "@/lib/device-id";

type TemplateId = "classic" | "modern" | "compact";

type BuiltResume = {
  id: string;
  company: string;
  role: string;
  atsScore: number;
  keywords: string[];
  generatedContent: {
    summary: string;
    skills: string[];
    bullets: string[];
    beforeText?: string;
    afterText?: string;
    changeSummary?: string[];
    beforeAtsScore?: number;
    template?: TemplateId;
  };
};

type BuiltResumeResponse = {
  resume: BuiltResume;
};

type CustomSection = {
  id: string;
  title: string;
  content: string;
};

const jobTypes = [
  "Technology",
  "Engineering",
  "Business",
  "Design",
  "Data",
  "Marketing"
];

const roleOptions: Record<string, string[]> = {
  Technology: [
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Mobile App Developer"
  ],
  Engineering: [
    "Electronics Engineer",
    "Mechanical Engineer",
    "Civil Engineer",
    "Electrical Engineer"
  ],
  Business: ["Business Analyst", "Operations Associate", "Product Intern"],
  Design: ["UI UX Designer", "Product Designer", "Graphic Designer"],
  Data: ["Data Analyst", "Data Engineer", "Machine Learning Intern"],
  Marketing: ["Digital Marketing Intern", "SEO Executive", "Content Marketer"]
};

const skillOptions: Record<string, string[]> = {
  Technology: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST APIs",
    "Git",
    "GitHub",
    "Responsive Design"
  ],
  Engineering: [
    "AutoCAD",
    "MATLAB",
    "Circuit Design",
    "SolidWorks",
    "Problem Solving",
    "Project Documentation"
  ],
  Business: [
    "Excel",
    "Market Research",
    "Communication",
    "Dashboards",
    "Process Improvement"
  ],
  Design: [
    "Figma",
    "Wireframes",
    "User Research",
    "Prototyping",
    "Visual Design"
  ],
  Data: ["Python", "SQL", "Excel", "Power BI", "Data Cleaning", "Statistics"],
  Marketing: [
    "SEO",
    "Google Analytics",
    "Content Writing",
    "Social Media",
    "Canva"
  ]
};

const templates: Array<{ id: TemplateId; title: string; detail: string }> = [
  {
    id: "classic",
    title: "Classic ATS",
    detail: "Clean one-page layout used by most students."
  },
  {
    id: "modern",
    title: "Modern Student",
    detail: "Light color, polished headings, still ATS friendly."
  },
  {
    id: "compact",
    title: "Compact One Page",
    detail: "Dense layout for more projects and skills."
  }
];

const locationSuggestions = [
  "Mumbai",
  "Pune",
  "Bengaluru",
  "Hyderabad",
  "Delhi NCR",
  "Remote"
];

async function readApiJson<T>(response: Response, fallbackMessage: string) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = (await response.json()) as T & { error?: string };

    if (!response.ok) {
      throw new Error(data.error ?? fallbackMessage);
    }

    return data;
  }

  throw new Error(fallbackMessage);
}

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitComma(value: string) {
  return value
    .split(",")
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeSkill(value: string) {
  return value.replace(/\s+/g, " ").replace(/^,+|,+$/g, "").trim();
}

function uniqueSkills(values: string[]) {
  const seen = new Set<string>();

  return values
    .map(normalizeSkill)
    .filter(Boolean)
    .filter((skill) => {
      const key = skill.toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
}

function createSectionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function buildPreview(response: BuiltResume) {
  return {
    id: response.id,
    role: response.role,
    atsScore: response.atsScore,
    keywords: response.keywords,
    summary: response.generatedContent.summary,
    skills: response.generatedContent.skills,
    bullets: response.generatedContent.bullets,
    afterText: response.generatedContent.afterText ?? "",
    changeSummary: response.generatedContent.changeSummary ?? [],
    template: response.generatedContent.template ?? "classic"
  };
}

function buildLivePreviewText(
  form: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    degree: string;
    college: string;
    graduationYear: string;
    experience: string;
    projects: string;
    certificates: string;
  },
  targetRole: string,
  selectedSkills: string[]
) {
  const sections: string[] = [];

  if (form.name.trim()) {
    sections.push(form.name.trim());
  }

  const contact = [form.email, form.phone, form.location].filter(Boolean).join(" · ");
  if (contact) {
    sections.push(contact);
  }

  const links = [form.linkedin, form.github].filter(Boolean).join(" · ");
  if (links) {
    sections.push(links);
  }

  if (targetRole.trim()) {
    sections.push("", `Target role: ${targetRole.trim()}`);
  }

  if (form.degree.trim() || form.college.trim()) {
    sections.push("", "EDUCATION", [form.degree, form.college, form.graduationYear].filter(Boolean).join(" · "));
  }

  if (selectedSkills.length) {
    sections.push("", "SKILLS", selectedSkills.join(", "));
  }

  if (form.projects.trim()) {
    sections.push("", "PROJECTS", form.projects.trim());
  }

  if (form.experience.trim()) {
    sections.push("", "EXPERIENCE", form.experience.trim());
  }

  if (form.certificates.trim()) {
    sections.push("", "CERTIFICATES", form.certificates.trim());
  }

  return sections.join("\n");
}

export function BuildResumeForm() {
  const router = useRouter();
  const [jobType, setJobType] = useState("Technology");
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [template, setTemplate] = useState<TemplateId>("classic");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js"
  ]);
  const [skillDraft, setSkillDraft] = useState("");
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [hasExperience, setHasExperience] = useState(false);
  const [hasProjects, setHasProjects] = useState(true);
  const [hasCertificates, setHasCertificates] = useState(false);
  const [wantsPhoto, setWantsPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState<ReturnType<typeof buildPreview> | null>(
    null
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    degree: "",
    college: "",
    graduationYear: "",
    experience: "",
    projects: "",
    certificates: "",
    prompt: ""
  });

  const roles = roleOptions[jobType] ?? roleOptions.Technology;
  const skills = useMemo(
    () => skillOptions[jobType] ?? skillOptions.Technology,
    [jobType]
  );
  const livePreviewText = useMemo(
    () => buildLivePreviewText(form, targetRole, selectedSkills),
    [form, targetRole, selectedSkills]
  );
  const hasLiveContent = Boolean(form.name.trim() || form.degree.trim());

  function updateField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function addSkills(value: string) {
    const incoming = value
      .split(",")
      .map(normalizeSkill)
      .filter(Boolean);

    if (!incoming.length) {
      return;
    }

    setSelectedSkills((current) => uniqueSkills([...current, ...incoming]));
    setSkillDraft("");
  }

  function toggleSkill(skill: string) {
    setSelectedSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : uniqueSkills([...current, skill])
    );
  }

  function removeSkill(skill: string) {
    setSelectedSkills((current) => current.filter((item) => item !== skill));
  }

  function addCustomSection() {
    setCustomSections((current) => [
      ...current,
      {
        id: createSectionId(),
        title: "",
        content: ""
      }
    ]);
  }

  function updateCustomSection(
    id: string,
    key: "title" | "content",
    value: string
  ) {
    setCustomSections((current) =>
      current.map((section) =>
        section.id === id ? { ...section, [key]: value } : section
      )
    );
  }

  function removeCustomSection(id: string) {
    setCustomSections((current) =>
      current.filter((section) => section.id !== id)
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setEditing(false);

    try {
      const response = await fetch("/api/resumes/build", {
        method: "POST",
        headers: billingRequestHeaders(),
        body: JSON.stringify({
          ...form,
          jobType,
          targetRole,
          template,
          skills: uniqueSkills(selectedSkills),
          hasExperience,
          hasProjects,
          hasCertificates,
          wantsPhoto,
          projects: hasProjects ? splitLines(form.projects) : [],
          certificates: hasCertificates ? splitLines(form.certificates) : [],
          customSections: customSections
            .map((section) => ({
              title: section.title.trim() || "Additional",
              content: section.content.trim()
            }))
            .filter((section) => section.content)
        })
      });

      if (response.status === 402) {
        const limit = (await response.json()) as { error?: string; upgradeUrl?: string };
        toast.error(limit.error ?? "Free credits finished. Upgrade to Pro for ₹50/month.");
        router.push(limit.upgradeUrl ?? "/dashboard/upgrade");
        return;
      }

      const data = await readApiJson<BuiltResumeResponse>(
        response,
        "Resume build failed"
      );

      setPreview(buildPreview(data.resume));
      setEditing(false);
      toast.success("Resume built — preview ready");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Resume build failed");
    } finally {
      setLoading(false);
    }
  }

  async function savePreview({ silent = false } = {}) {
    if (!preview) {
      return null;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/resumes/${preview.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: preview.summary,
          skills: preview.skills,
          bullets: preview.bullets,
          beforeText: preview.afterText,
          afterText: preview.afterText,
          changeSummary: preview.changeSummary,
          beforeAtsScore: preview.atsScore,
          keywords: preview.keywords,
          atsScore: preview.atsScore,
          template: preview.template
        })
      });
      const data = await readApiJson<BuiltResumeResponse>(
        response,
        "Resume save failed"
      );
      const saved = buildPreview(data.resume);

      setPreview(saved);
      setEditing(false);

      if (!silent) {
        toast.success("Resume saved");
      }

      return saved;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Resume save failed");
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function onDownload() {
    const saved = await savePreview({ silent: true });

    if (saved) {
      window.open(`/api/pdf?resumeId=${saved.id}`, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <form className="space-y-6" onSubmit={onSubmit}>
        <Card className="p-6">
          <p className="fine-label mb-3">Quick questions</p>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold">Full name</span>
              <Input
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Rohit Jadhav"
                required
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Email</span>
              <Input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="you@email.com"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Phone</span>
              <Input
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="Phone number"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Location</span>
              <Input
                value={form.location}
                onChange={(event) => updateField("location", event.target.value)}
                placeholder="Mumbai"
              />
              <span className="flex flex-wrap gap-1.5">
                {locationSuggestions.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => updateField("location", location)}
                    className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
                  >
                    {location}
                  </button>
                ))}
              </span>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">LinkedIn</span>
              <Input
                value={form.linkedin}
                onChange={(event) => updateField("linkedin", event.target.value)}
                placeholder="linkedin.com/in/username"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">GitHub / Portfolio</span>
              <Input
                value={form.github}
                onChange={(event) => updateField("github", event.target.value)}
                placeholder="github.com/username"
              />
            </label>
          </div>
        </Card>

        <Card className="p-6">
          <p className="fine-label mb-3">Job direction</p>
          <div className="mb-5 flex flex-wrap gap-2">
            {jobTypes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setJobType(item);
                  setTargetRole(roleOptions[item][0]);
                  setSelectedSkills((current) =>
                    uniqueSkills([...current, ...skillOptions[item].slice(0, 4)])
                  );
                }}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                  jobType === item
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-white text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold">Target role</span>
              <select
                value={targetRole}
                onChange={(event) => setTargetRole(event.target.value)}
                className="h-11 w-full rounded-xl border border-input bg-white px-3 text-sm"
              >
                {roles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Custom role</span>
              <Input
                value={targetRole}
                onChange={(event) => setTargetRole(event.target.value)}
                placeholder="Enter role"
              />
            </label>
          </div>
          <div className="mt-4">
            <p className="fine-label mb-2">Suggested roles</p>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setTargetRole(role)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    targetRole === role
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-white text-muted-foreground"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="fine-label mb-3">Education and skills</p>
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_0.45fr]">
            <Input
              value={form.degree}
              onChange={(event) => updateField("degree", event.target.value)}
              placeholder="B.E. Electronics and Computer Science"
              required
            />
            <Input
              value={form.college}
              onChange={(event) => updateField("college", event.target.value)}
              placeholder="College name"
              required
            />
            <Input
              value={form.graduationYear}
              onChange={(event) =>
                updateField("graduationYear", event.target.value)
              }
              placeholder="2029"
            />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
            <Input
              value={skillDraft}
              onChange={(event) => setSkillDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addSkills(skillDraft);
                }
              }}
              placeholder="Type your skills, separated by commas"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addSkills(skillDraft)}
            >
              <Plus className="h-4 w-4" weight="regular" />
              Add skills
            </Button>
          </div>
          <div className="mt-4">
            <p className="fine-label mb-2">Your skills</p>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="text-accent"
                  >
                    <X className="h-3.5 w-3.5" weight="regular" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="fine-label mb-2">Suggested skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    selectedSkills.includes(skill)
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-white text-muted-foreground"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="fine-label mb-3">Student sections</p>
          <div className="grid gap-3 md:grid-cols-4">
            {[
              ["Experience", hasExperience, setHasExperience],
              ["Projects", hasProjects, setHasProjects],
              ["Certificates", hasCertificates, setHasCertificates],
              ["Photo needed", wantsPhoto, setWantsPhoto]
            ].map(([label, value, setter]) => (
              <button
                key={label as string}
                type="button"
                onClick={() => (setter as (next: boolean) => void)(!(value as boolean))}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                  value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-white text-muted-foreground"
                }`}
              >
                {label as string}: {value ? "Yes" : "No"}
              </button>
            ))}
          </div>
          {hasExperience ? (
            <Textarea
              className="mt-4 min-h-24"
              value={form.experience}
              onChange={(event) => updateField("experience", event.target.value)}
              placeholder="Internship or freelance work. Example: Frontend intern at ABC - built responsive pages with React."
            />
          ) : null}
          {hasProjects ? (
            <Textarea
              className="mt-4 min-h-28"
              value={form.projects}
              onChange={(event) => updateField("projects", event.target.value)}
              placeholder="One project per line. Example: Car Rental App: booking UI, auth, listings, search filters"
            />
          ) : null}
          {hasCertificates ? (
            <Textarea
              className="mt-4 min-h-20"
              value={form.certificates}
              onChange={(event) => updateField("certificates", event.target.value)}
              placeholder="One certificate per line"
            />
          ) : null}
          <div className="mt-5 border-t border-border pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="fine-label">Custom sections</p>
              <Button type="button" variant="outline" onClick={addCustomSection}>
                <Plus className="h-4 w-4" weight="regular" />
                Add section
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              {customSections.map((section, index) => (
                <div
                  key={section.id}
                  className="rounded-lg border border-border bg-white p-4"
                >
                  <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                    <Input
                      value={section.title}
                      onChange={(event) =>
                        updateCustomSection(section.id, "title", event.target.value)
                      }
                      placeholder={`Section ${index + 1} title`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeCustomSection(section.id)}
                    >
                      <X className="h-4 w-4" weight="regular" />
                      Remove
                    </Button>
                  </div>
                  <Textarea
                    className="mt-3 min-h-24"
                    value={section.content}
                    onChange={(event) =>
                      updateCustomSection(section.id, "content", event.target.value)
                    }
                    placeholder="Achievements, coursework, leadership, languages"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <p className="fine-label mb-3">Templates</p>
          <div className="grid gap-3 md:grid-cols-3">
            {templates.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setTemplate(item.id);
                  setPreview((current) =>
                    current ? { ...current, template: item.id } : current
                  );
                }}
                className={`min-h-28 rounded-lg border p-4 text-left ${
                  template === item.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-white"
                }`}
              >
                <span className="text-sm font-semibold text-foreground">
                  {item.title}
                </span>
                <span className="mt-2 block text-xs leading-5 text-muted-foreground">
                  {item.detail}
                </span>
              </button>
            ))}
          </div>
          <label className="mt-5 block space-y-2">
            <span className="text-sm font-semibold">
              Direct AI prompt
            </span>
            <Textarea
              value={form.prompt}
              onChange={(event) => updateField("prompt", event.target.value)}
              className="min-h-24"
              placeholder="Optional: Tell AI what kind of resume you want, target companies, strongest projects, or style."
            />
          </label>
          <Button type="submit" className="mt-5" disabled={loading}>
            {loading ? (
              <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
            ) : (
              <Sparkle className="h-4 w-4" weight="regular" />
            )}
            {loading ? "Building..." : "Build resume"}
          </Button>
        </Card>
      </form>

      <Card className="min-h-[720px] p-6 xl:sticky xl:top-24 xl:self-start">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="fine-label mb-2">
              {preview ? "Your resume" : "Live preview"}
            </p>
            <h3 className="font-serif text-3xl text-primary">
              {preview?.role ?? targetRole ?? "Built resume"}
            </h3>
            {preview ? (
              <p className="mt-1 text-xs font-semibold text-accent">
                PDF ready · {preview.atsScore}% ATS readiness
              </p>
            ) : hasLiveContent ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Updates as you fill the form
              </p>
            ) : null}
          </div>
          {preview ? (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setEditing((value) => !value)}
              >
                {editing ? (
                  <Eye className="h-4 w-4" weight="regular" />
                ) : (
                  <PencilSimple className="h-4 w-4" weight="regular" />
                )}
                {editing ? "Preview" : "Edit"}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={saving}
                onClick={() => savePreview()}
              >
                {saving ? (
                  <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
                ) : (
                  <FloppyDisk className="h-4 w-4" weight="regular" />
                )}
                Save
              </Button>
              <Button type="button" size="sm" disabled={saving} onClick={onDownload}>
                <DownloadSimple className="h-4 w-4" weight="regular" />
                Download
              </Button>
            </div>
          ) : null}
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
              <SpinnerGap
                className="h-5 w-5 animate-spin text-accent"
                weight="regular"
              />
              <p className="text-sm font-semibold text-foreground">
                Building your resume with AI...
              </p>
            </div>
            <div className="h-96 animate-pulse rounded-xl bg-muted" />
          </div>
        ) : preview && !editing ? (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-inner">
              <iframe
                title="Built resume PDF preview"
                src={`/api/pdf?resumeId=${preview.id}&preview=1&template=${preview.template}`}
                className="h-[720px] w-full bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {preview.keywords.slice(0, 8).map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ) : preview && editing ? (
          <div className="space-y-4">
            <Textarea
              value={preview.afterText}
              onChange={(event) =>
                setPreview({ ...preview, afterText: event.target.value })
              }
              className="min-h-[520px] font-mono text-xs leading-5"
            />
            <Textarea
              value={preview.skills.join(", ")}
              onChange={(event) =>
                setPreview({ ...preview, skills: splitComma(event.target.value) })
              }
              className="min-h-20"
            />
          </div>
        ) : hasLiveContent ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-white p-5 shadow-inner">
              <pre className="whitespace-pre-wrap font-serif text-sm leading-7 text-foreground">
                {livePreviewText}
              </pre>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Click &quot;Build resume&quot; to generate your polished PDF instantly
              here.
            </p>
          </div>
        ) : (
          <div className="flex min-h-[540px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white/55 p-8 text-center">
            <Sparkle className="h-8 w-8 text-accent" weight="regular" />
            <h4 className="mt-4 font-serif text-3xl text-primary">
              Side-by-side preview
            </h4>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Start filling your details on the left. Your live preview appears
              here, then your PDF instantly after you submit.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
