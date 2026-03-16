import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { TemplateSection } from "@/types/template";

type TemplateSectionListProps = {
  sections: TemplateSection[];
};

export function TemplateSectionList({ sections }: TemplateSectionListProps) {
  return (
    <section className="mx-auto mt-12 grid w-[min(var(--max-width),calc(100%-2rem))] gap-5 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
      {sections.length > 0 ? (
        sections.map((section) => (
          <Card
            key={section.id}
            className="rounded-[24px] border border-white/60 bg-white/80 p-4 shadow-[var(--shadow)]"
          >
            <CardContent className="p-0">
              <div className="mb-3 flex items-center justify-between gap-4">
                <Badge variant="outline">Section {section.position}</Badge>
              </div>
              <h2 className="mb-3 font-[family-name:var(--font-display)] text-2xl">
                Title
              </h2>
              <p className="mb-6 leading-[1.75] text-[var(--text)]">
                {section.title}
              </p>
              <h3 className="mb-3 text-lg font-semibold">Content</h3>
              <p className="leading-[1.75] text-[var(--muted-text)]">
                {section.content}
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="rounded-[24px] border border-white/60 bg-white/80 p-4 shadow-[var(--shadow)]">
          <CardContent className="flex min-h-40 items-center justify-center text-[var(--muted-text)]">
            This template does not have any sections yet.
          </CardContent>
        </Card>
      )}
    </section>
  );
}
