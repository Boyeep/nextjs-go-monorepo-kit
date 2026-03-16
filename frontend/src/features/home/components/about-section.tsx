import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { appConfig } from "@/lib/app-config";

export function AboutSection() {
  return (
    <section className="px-0 pt-4" id="about">
      <div className="mx-auto grid w-[min(var(--max-width),calc(100%-2rem))] grid-cols-[minmax(280px,0.95fr)_minmax(0,1.05fr)] gap-6 rounded-[32px] border border-white/75 bg-white/80 p-[clamp(1.25rem,3vw,1.7rem)] shadow-[var(--shadow)] max-[960px]:grid-cols-1 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <div className="relative min-h-[360px] overflow-hidden rounded-[24px]">
          <PlaceholderArt
            title={`About ${appConfig.name}`}
            label="About Placeholder"
            tone="warm"
            className="h-full w-full"
          />
        </div>
        <div className="grid content-center gap-4">
          <span className="section-heading__eyebrow">About The Template</span>
          <h2 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
            A strong default structure for many kinds of products.
          </h2>
          <p className="m-0 leading-[1.8] text-[var(--muted-text)]">
            This starter keeps the useful parts of a real app: authentication,
            protected pages, public pages, server integration, and polished UI
            building blocks.
          </p>
          <p className="m-0 leading-[1.8] text-[var(--muted-text)]">
            The structure is meant to be replaced, renamed, or extended based on
            the kind of product you want to build.
          </p>
        </div>
      </div>
    </section>
  );
}
