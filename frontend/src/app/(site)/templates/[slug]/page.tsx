import { notFound } from "next/navigation";
import { TemplateHero } from "@/features/templates/components/template-hero";
import { TemplateSectionList } from "@/features/templates/components/template-section-list";
import {
  getSectionsByTemplate,
  getTemplate,
} from "@/features/templates/services/template-service";

type TemplatePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const [template, sections] = await Promise.all([
    getTemplate(slug),
    getSectionsByTemplate(slug),
  ]).catch(() => notFound());

  return (
    <main className="px-0 pt-8 pb-20">
      <TemplateHero template={template} />
      <TemplateSectionList sections={sections} />
    </main>
  );
}
