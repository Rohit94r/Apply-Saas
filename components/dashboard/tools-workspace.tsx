"use client";

import { useRef, useState } from "react";
import {
  Camera,
  Download,
  FilePenLine,
  Loader2,
  Mail,
  Sparkles,
  Wand2
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

type Tool = "cover" | "critique" | "pdf" | "photo";

type Critique = {
  atsScore: number;
  strengths: string[];
  risks: string[];
  fixes: string[];
  missingKeywords: string[];
};

type PhotoPlan = {
  headline: string;
  recommendations: string[];
  background: string;
  crop: string;
  wardrobe: string;
};

const tabs = [
  { id: "cover", label: "Cover letter", icon: Mail },
  { id: "critique", label: "Critique", icon: Wand2 },
  { id: "pdf", label: "PDF", icon: FilePenLine },
  { id: "photo", label: "Photo", icon: Camera }
] satisfies { id: Tool; label: string; icon: typeof Mail }[];

export function ToolsWorkspace() {
  const [activeTool, setActiveTool] = useState<Tool>("cover");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [critique, setCritique] = useState<Critique | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoPlan, setPhotoPlan] = useState<PhotoPlan | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } = useUploadThing("photoUploader", {
    onClientUploadComplete: async (result) => {
      const uploadedUrl = result[0]?.serverData?.url ?? result[0]?.ufsUrl;
      if (!uploadedUrl) {
        toast.error("Upload finished, but no file URL was returned");
        return;
      }

      setPhotoUrl(uploadedUrl);
      await requestPhotoPlan(uploadedUrl);
      toast.success("Photo uploaded");
    },
    onUploadError: (error) => {
      toast.error(error.message);
    }
  });

  async function requestPhotoPlan(imageUrl: string) {
    const response = await fetch("/api/photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Photo plan failed");
    }

    setPhotoPlan(data.plan);
  }

  async function submitJson<T>(
    path: string,
    body: Record<string, FormDataEntryValue | null>
  ): Promise<T> {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Request failed");
    }

    return data as T;
  }

  async function onCoverLetter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);

    try {
      const data = await submitJson<{ coverLetter: string }>("/api/cover-letter", {
        company: formData.get("company"),
        role: formData.get("role"),
        tone: formData.get("tone"),
        resumeContent: formData.get("resumeContent"),
        jobDescription: formData.get("jobDescription")
      });

      setCoverLetter(data.coverLetter);
      toast.success("Cover letter generated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function onCritique(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);

    try {
      const data = await submitJson<{ critique: Critique }>("/api/critique", {
        resumeContent: formData.get("resumeContent"),
        jobDescription: formData.get("jobDescription")
      });

      setCritique(data.critique);
      toast.success("Resume critique generated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function onPdf(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);

    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          role: formData.get("role"),
          email: formData.get("email"),
          location: formData.get("location"),
          summary: formData.get("summary"),
          skills: String(formData.get("skills") ?? "")
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          bullets: String(formData.get("bullets") ?? "")
            .split("\n")
            .map((bullet) => bullet.trim())
            .filter(Boolean)
        })
      });

      if (!response.ok) {
        throw new Error("PDF export failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "apply-resume.pdf";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("PDF exported");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function onPhotoSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) {
      return;
    }

    try {
      await startUpload(files);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-white/70 p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTool(tab.id)}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-primary",
              activeTool === tab.id && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTool === "cover" ? (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1fr]">
          <Card className="p-6">
            <form className="space-y-5" onSubmit={onCoverLetter}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-foreground">Company</span>
                  <Input name="company" placeholder="Company name" />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-foreground">Role</span>
                  <Input name="role" placeholder="Target role" />
                </label>
              </div>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-foreground">Tone</span>
                <select
                  name="tone"
                  defaultValue="confident"
                  className="h-11 w-full rounded-xl border border-input bg-white/70 px-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
                >
                  <option value="confident">Confident</option>
                  <option value="warm">Warm</option>
                  <option value="concise">Concise</option>
                </select>
              </label>
              <TextInputs />
              <SubmitButton loading={loading} label="Generate cover letter" />
            </form>
          </Card>
          <OutputPanel
            title="Generated letter"
            icon={Mail}
            empty="Your cover letter will appear here."
          >
            {coverLetter ? (
              <pre className="whitespace-pre-wrap rounded-xl border border-border bg-white p-4 text-sm leading-7 text-foreground">
                {coverLetter}
              </pre>
            ) : null}
          </OutputPanel>
        </div>
      ) : null}

      {activeTool === "critique" ? (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1fr]">
          <Card className="p-6">
            <form className="space-y-5" onSubmit={onCritique}>
              <TextInputs />
              <SubmitButton loading={loading} label="Critique resume" />
            </form>
          </Card>
          <OutputPanel
            title="Critique report"
            icon={Wand2}
            empty="ATS score, risks, fixes, and keywords will appear here."
          >
            {critique ? (
              <div className="space-y-5">
                <div className="rounded-xl border border-accent/20 bg-accent/10 p-4">
                  <p className="text-sm font-semibold text-accent">
                    ATS score {critique.atsScore}%
                  </p>
                </div>
                <ResultList title="Strengths" items={critique.strengths} />
                <ResultList title="Risks" items={critique.risks} />
                <ResultList title="Fixes" items={critique.fixes} />
                <ResultList title="Missing keywords" items={critique.missingKeywords} />
              </div>
            ) : null}
          </OutputPanel>
        </div>
      ) : null}

      {activeTool === "pdf" ? (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1fr]">
          <Card className="p-6">
            <form className="space-y-5" onSubmit={onPdf}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-foreground">Name</span>
                  <Input name="name" placeholder="Your name" />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-foreground">Role</span>
                  <Input name="role" placeholder="Target role" />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-foreground">Email</span>
                  <Input name="email" placeholder="name@example.com" />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-foreground">Location</span>
                  <Input name="location" placeholder="City, country" />
                </label>
              </div>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-foreground">Summary</span>
                <Textarea name="summary" placeholder="Paste or write the resume summary." />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-foreground">Skills</span>
                <Input
                  name="skills"
                  placeholder="Skill one, skill two, skill three"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-foreground">Bullets</span>
                <Textarea
                  name="bullets"
                  placeholder="Add each resume bullet on a new line."
                />
              </label>
              <SubmitButton loading={loading} label="Export PDF" icon={Download} />
            </form>
          </Card>
          <OutputPanel
            title="PDF export"
            icon={FilePenLine}
            empty="Use the form to download an ATS-friendly PDF."
          />
        </div>
      ) : null}

      {activeTool === "photo" ? (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1fr]">
          <Card className="p-6">
            <div className="space-y-5">
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPhotoSelected}
              />
              <div className="rounded-2xl border border-dashed border-border bg-white/60 p-6 text-center">
                <Camera className="mx-auto h-8 w-8 text-accent" />
                <h3 className="mt-4 font-serif text-3xl text-primary">
                  Upload profile photo
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  Store the source image and generate a polished profile photo
                  direction for crop, background, lighting, and wardrobe.
                </p>
                <Button
                  type="button"
                  className="mt-5"
                  disabled={isUploading}
                  onClick={() => photoInputRef.current?.click()}
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                  {isUploading ? "Uploading..." : "Choose photo"}
                </Button>
              </div>
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoUrl}
                  alt="Uploaded profile"
                  className="aspect-square w-full max-w-sm rounded-2xl border border-border object-cover"
                />
              ) : null}
            </div>
          </Card>
          <OutputPanel
            title="Photo plan"
            icon={Camera}
            empty="Upload a photo to get a professional profile direction."
          >
            {photoPlan ? (
              <div className="space-y-5">
                <p className="rounded-xl border border-accent/20 bg-accent/10 p-4 text-sm font-semibold text-accent">
                  {photoPlan.headline}
                </p>
                <ResultList title="Recommendations" items={photoPlan.recommendations} />
                <ResultList
                  title="Setup"
                  items={[photoPlan.background, photoPlan.crop, photoPlan.wardrobe]}
                />
              </div>
            ) : null}
          </OutputPanel>
        </div>
      ) : null}
    </div>
  );
}

function TextInputs() {
  return (
    <>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-foreground">Resume content</span>
        <Textarea
          name="resumeContent"
          placeholder="Paste resume content here."
          className="min-h-36"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-foreground">Job description</span>
        <Textarea
          name="jobDescription"
          placeholder="Paste the job description here."
          className="min-h-44"
        />
      </label>
    </>
  );
}

function SubmitButton({
  loading,
  label,
  icon: Icon = Sparkles
}: {
  loading: boolean;
  label: string;
  icon?: typeof Sparkles;
}) {
  return (
    <Button type="submit" disabled={loading}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
      {loading ? "Working..." : label}
    </Button>
  );
}

function OutputPanel({
  title,
  icon: Icon,
  empty,
  children
}: {
  title: string;
  icon: typeof Mail;
  empty: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className="min-h-[520px] p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="fine-label mb-2">Output</p>
          <h3 className="font-serif text-3xl text-primary">{title}</h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {children ?? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/50 p-8 text-center">
          <Sparkles className="h-8 w-8 text-accent" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            {empty}
          </p>
        </div>
      )}
    </Card>
  );
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-border bg-white/75 p-3 text-sm leading-6 text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
