import { Camera, FilePenLine, Mail, Wand2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";

const tools = [
  {
    title: "AI cover letter",
    description: "Generate a concise personalized letter from your resume and job description.",
    icon: Mail,
    status: "API ready"
  },
  {
    title: "Prompt PDF editing",
    description:
      "Ask Apply to make the resume one-page, improve a skills section, or modernize layout.",
    icon: FilePenLine,
    status: "Workflow ready"
  },
  {
    title: "Professional photo",
    description:
      "Upload a casual photo and generate a clean professional profile image.",
    icon: Camera,
    status: "OpenAI image route"
  },
  {
    title: "Resume critique",
    description:
      "Find vague bullets, weak keywords, missing metrics, and ATS risks before applying.",
    icon: Wand2,
    status: "Coming soon"
  }
];

export default function ToolsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="AI tools"
        title="Everything around the resume."
        description="Cover letters, PDF edits, professional photos, and critique workflows live here as reusable product modules."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {tools.map((tool) => (
          <Card key={tool.title} className="p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <tool.icon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                {tool.status}
              </span>
            </div>
            <h3 className="font-serif text-3xl text-primary">{tool.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {tool.description}
            </p>
            <Button className="mt-6" variant="outline">
              Open tool
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
