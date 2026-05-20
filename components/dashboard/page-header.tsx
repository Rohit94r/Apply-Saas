import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta?: string;
  href?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  cta,
  href = "/dashboard/generate"
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <div>
        <p className="fine-label mb-3">{eyebrow}</p>
        <h2 className="font-serif text-5xl leading-none text-primary">{title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
      {cta ? (
        <Button asChild>
          <Link href={href}>
            {cta}
            <ArrowRight className="h-4 w-4" weight="regular" />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
