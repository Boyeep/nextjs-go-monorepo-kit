import { featuredTemplates } from "@/lib/site-data";

const landingHighlights = [
  {
    step: "01",
    title: "Focused first impression",
    description: "Clear hero copy with one dominant action path.",
    accentClass:
      "bg-[linear-gradient(180deg,rgba(255,244,236,0.96),rgba(255,255,255,0.86))]",
  },
  {
    step: "02",
    title: "Ready to expand",
    description:
      "Supporting sections hint at the system now and can grow into a fuller marketing page later.",
    accentClass:
      "bg-[linear-gradient(180deg,rgba(239,250,250,0.96),rgba(255,255,255,0.88))]",
  },
];

export function AboutSection() {
  const featuredCards = featuredTemplates.slice(0, 3);

  return (
    <section className="relative px-0 pt-2 pb-4" id="about">
      <div className="mx-auto grid w-[min(1040px,calc(100%-2rem))] gap-6 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))] md:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
        <div className="grid gap-5 rounded-[34px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(255,243,235,0.9))] p-[clamp(1.7rem,4vw,3rem)] shadow-[var(--shadow)]">
          <span className="text-sm font-bold tracking-[0.18em] text-[var(--brand-deep)] uppercase">
            Why it lands well
          </span>
          <div className="grid gap-3">
            <h2 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.4rem)] leading-[1] tracking-[-0.05em]">
              Focused on first impression, but still grounded in real product
              structure.
            </h2>
            <p className="m-0 max-w-[640px] text-[1rem] leading-8 text-[var(--muted-text)]">
              This home page keeps the centered clarity of your reference, then
              adds warmer depth, sharper product framing, and a few reusable
              content blocks so the starter still feels useful once you begin
              customizing it.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {landingHighlights.map(
              ({ step, title, description, accentClass }) => (
                <article
                  key={step}
                  className={`group relative overflow-hidden rounded-[28px] border border-white/85 p-5 shadow-[0_18px_40px_rgba(31,41,55,0.08)] transition-transform duration-200 hover:-translate-y-1 ${accentClass}`}
                >
                  <div className="relative grid gap-4">
                    <div className="flex items-start gap-3">
                      <span className="text-[0.75rem] font-bold tracking-[0.18em] text-[var(--muted-text)] uppercase">
                        {step}
                      </span>
                    </div>
                    <div className="grid gap-2">
                      <h3 className="m-0 max-w-[12ch] font-[family-name:var(--font-display)] text-[1.45rem] leading-[0.98] tracking-[-0.04em] text-[var(--text)]">
                        {title}
                      </h3>
                      <p className="m-0 max-w-[30ch] text-sm leading-7 text-[var(--muted-text)]">
                        {description}
                      </p>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>

        <div className="grid gap-4">
          {featuredCards.map((template, index) => (
            <article
              key={template.title}
              className="rounded-[28px] border border-white/80 bg-white/78 p-5 shadow-[0_20px_44px_rgba(31,41,55,0.08)] backdrop-blur-[14px]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid gap-2">
                  <span className="text-xs font-bold tracking-[0.18em] text-[var(--accent-brand)] uppercase">
                    {template.category}
                  </span>
                  <h3 className="m-0 font-[family-name:var(--font-display)] text-[1.45rem] tracking-[-0.04em]">
                    {template.title}
                  </h3>
                  <p className="m-0 text-sm leading-7 text-[var(--muted-text)]">
                    {template.description}
                  </p>
                </div>
                <span className="rounded-full bg-[rgba(31,111,120,0.08)] px-3 py-2 text-sm font-semibold text-[var(--accent-brand)]">
                  0{index + 1}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
