import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Template } from "@/types/template";

type TemplateHeroProps = {
  template: Template;
};

export function TemplateHero({ template }: TemplateHeroProps) {
  return (
    <section className="relative mx-auto w-[min(var(--max-width),calc(100%-2rem))] overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%),linear-gradient(135deg,rgba(16,52,67,0.88),rgba(31,111,120,0.82))] px-[clamp(2rem,4vw,3.5rem)] py-[clamp(2rem,4vw,3.5rem)] text-white before:absolute before:right-[-15%] before:bottom-[-35%] before:aspect-square before:w-[280px] before:rounded-full before:bg-white/10 before:content-[''] max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
      <div className="relative z-[1] grid max-w-[720px] gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-white/15 text-white hover:bg-white/15">
            {template.entry_count} sections
          </Badge>
          <Badge className="bg-white/15 text-white hover:bg-white/15">
            {template.estimated_minutes} min
          </Badge>
          <Badge className="bg-white/15 text-white hover:bg-white/15">
            {template.visibility}
          </Badge>
        </div>
        <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.3rem,5vw,4.4rem)] leading-[0.98]">
          {template.title}
        </h1>
        <p className="m-0 leading-[1.7] text-white/80">
          {template.description ||
            "This is a sample template detail page ready for your own product structure."}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/sandbox">Open sandbox</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
