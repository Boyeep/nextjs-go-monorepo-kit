type ResourceBuilderSidebarProps = {
  step: number;
  entryCount: number;
  isAuthenticated: boolean;
};

export function ResourceBuilderSidebar({ step, entryCount, isAuthenticated }: ResourceBuilderSidebarProps) {
  return (
    <aside className="grid content-start gap-4 rounded-[32px] bg-[linear-gradient(180deg,rgba(239,125,87,0.14),rgba(255,255,255,0.84))] p-[clamp(1.5rem,4vw,2rem)] shadow-[var(--shadow)]">
      <span className="section-heading__eyebrow">Resource Builder</span>
      <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.3rem,5vw,3.8rem)] leading-[0.98]">
        Create a reusable resource with a clean multi-step flow.
      </h1>
      <p className="m-0 leading-[1.75] text-[var(--muted-text)]">
        The builder separates resource details from entry content, which makes it easier to adapt for different products.
      </p>
      {!isAuthenticated ? (
        <p className="rounded-[20px] border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800">
          Sign in so the resource you create can be saved to the backend.
        </p>
      ) : null}
      <div className="grid gap-3">
        <div
          className={
            step === 0
              ? "rounded-[20px] border border-[rgba(216,95,54,0.2)] bg-[rgba(255,217,191,0.52)] px-4 py-4"
              : "rounded-[20px] border border-[rgba(31,41,55,0.06)] bg-white/75 px-4 py-4"
          }
        >
          <strong>Step 1</strong>
          <p className="m-0 leading-[1.75] text-[var(--muted-text)]">Set the main details for the resource.</p>
        </div>
        {Array.from({ length: entryCount }, (_, index) => (
          <div
            key={`step-${index + 1}`}
            className={
              step === index + 1
                ? "rounded-[20px] border border-[rgba(216,95,54,0.2)] bg-[rgba(255,217,191,0.52)] px-4 py-4"
                : "rounded-[20px] border border-[rgba(31,41,55,0.06)] bg-white/75 px-4 py-4"
            }
          >
            <strong>Entry {index + 1}</strong>
            <p className="m-0 leading-[1.75] text-[var(--muted-text)]">Add a title/content pair for this resource entry.</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
