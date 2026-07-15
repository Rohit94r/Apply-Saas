import Link from "next/link";
import { ArrowRight, Microphone, VideoCamera } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";

const bullets = [
  {
    title: "Meet-style interview room",
    detail: "Camera on you, AI interviewer on the right — like a real video call."
  },
  {
    title: "ElevenLabs voice + multilingual",
    detail: "English by default, plus Hindi, Tamil, Telugu, and Marathi options."
  },
  {
    title: "Coding rounds inside the call",
    detail: "Easy, medium, and hard DSA problems with a terminal and test runner."
  },
  {
    title: "Instant score after End call",
    detail: "See how many questions you answered well — saved to progress tracking."
  }
];

export function MockInterviewLandingSection() {
  return (
    <section id="mock-interview" className="surface-warm border-y border-border/70 py-24">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <Reveal>
          <p className="fine-label mb-5">AI Mock Interview</p>
          <h2 className="font-serif text-5xl leading-[1.03] text-primary sm:text-6xl">
            Practice mock interviews before the real campus round.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
            Apply&apos;s web mock interview speaks questions aloud, listens to your
            answers, scores each turn, and can include coding PYQ-style problems —
            so you walk into TCS, Infosys, Amazon, or startup interviews ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/mock-interview">
                Try mock interview
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pyqs">Browse previous year questions</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <div className="flex items-center gap-2 border-b border-border bg-[#fbfaf6] px-5 py-4">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[#d93025]" />
              <p className="text-sm font-semibold text-primary">
                SDE Intern · Amazon · Live mock call
              </p>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              <div className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-border bg-[#edf6f5] p-4">
                <VideoCamera className="h-7 w-7 text-primary" weight="duotone" />
                <p className="mt-2 text-xs font-bold text-foreground">You</p>
              </div>
              <div className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-border bg-[#f7f4ee] p-4">
                <Microphone className="h-7 w-7 text-accent" weight="duotone" />
                <p className="mt-2 text-xs font-bold text-foreground">AI Interviewer</p>
              </div>
            </div>
            <ul className="border-t border-border">
              {bullets.map((item) => (
                <li
                  key={item.title}
                  className="border-b border-border px-5 py-4 last:border-b-0"
                >
                  <p className="text-sm font-semibold text-primary">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
