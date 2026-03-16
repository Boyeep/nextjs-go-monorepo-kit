import { Blocks, DatabaseZap, ShieldCheck } from "lucide-react";

const quickFacts = [
  "Next.js + Go foundation",
  "Auth and dashboard included",
  "Flexible sections ready to adapt",
  "Sandbox-friendly by default",
];

const starterHighlights = [
  {
    title: "Reusable interface",
    description:
      "A polished frontend shell you can reshape without starting the design system from zero.",
    Icon: Blocks,
  },
  {
    title: "Backend already wired",
    description:
      "Routes, data access, and protected flows are in place so the app feels connected from day one.",
    Icon: DatabaseZap,
  },
  {
    title: "Safer private flows",
    description:
      "Login, owner access, and account recovery patterns are already present when your product needs them.",
    Icon: ShieldCheck,
  },
];

export function WhyChooseSection() {
  return (
    <section className="relative px-0 pt-8 pb-4 max-[720px]:pt-6">
      <div className="mx-auto grid w-[min(1040px,calc(100%-2rem))] gap-4 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <div className="flex flex-wrap items-center justify-center gap-3 pb-2">
          {quickFacts.map((fact) => (
            <span
              key={fact}
              className="rounded-full border border-white/80 bg-white/72 px-4 py-2 text-[0.82rem] text-[var(--muted-text)] shadow-sm backdrop-blur-[12px]"
            >
              {fact}
            </span>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {starterHighlights.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="grid gap-3 rounded-[28px] border border-white/80 bg-white/76 p-5 text-left shadow-[0_20px_44px_rgba(31,41,55,0.08)] backdrop-blur-[16px]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-[rgba(31,111,120,0.09)] text-[var(--accent-brand)]">
                <Icon className="h-5 w-5" />
              </div>
              <div className="grid gap-2">
                <h2 className="m-0 font-[family-name:var(--font-display)] text-[1.35rem] tracking-[-0.03em]">
                  {title}
                </h2>
                <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
