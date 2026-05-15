import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "default"
}: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-3xl", align === "center" && "text-center")}>
      <p className={cn("fine-label mb-4", tone === "light" && "text-white/70")}>
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-serif text-5xl leading-[1.02] text-primary sm:text-6xl",
          tone === "light" && "text-white"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-7 text-muted-foreground sm:text-lg",
            tone === "light" && "text-white/70"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
