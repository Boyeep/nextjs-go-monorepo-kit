import Link from "next/link";
import {
  ArrowUpRight,
  Blocks,
  DatabaseZap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/app-config";
import { featuredTemplates } from "@/lib/site-data";

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

const featuredCards = featuredTemplates.slice(0, 3);

export function CenteredHomePage() {
  return (
    <main className="relative overflow-hidden px-0 pb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_top,rgba(239,125,87,0.22),transparent_34%),radial-gradient(circle_at_18%_22%,rgba(31,111,120,0.14),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.14),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[12%] left-[6%] h-36 w-36 rounded-full bg-[rgba(255,194,161,0.4)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[18%] right-[8%] h-48 w-48 rounded-full bg-[rgba(31,111,120,0.16)] blur-3xl"
      />

      <section className="relative mx-auto flex min-h-[calc(100vh-12rem)] w-[min(980px,calc(100%-2rem))] flex-col items-center justify-center gap-6 py-[clamp(3.5rem,10vw,7rem)] text-center max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <div className="inline-flex items-center justify-center rounded-[32px] border border-white/80 bg-white/78 p-3 shadow-[var(--shadow)] backdrop-blur-[18px]">
          <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,rgba(239,125,87,0.92),rgba(255,185,103,0.9))] text-white shadow-[0_18px_34px_rgba(239,125,87,0.22)]">
            <Sparkles className="h-8 w-8" />
          </div>
        </div>

        <span className="rounded-full border border-[rgba(31,111,120,0.14)] bg-white/76 px-4 py-2 text-[0.78rem] font-bold tracking-[0.18em] text-[var(--accent-brand)] uppercase shadow-sm backdrop-blur-[12px]">
          starter sandbox
        </span>

        <div className="grid max-w-[860px] gap-5">
          <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,6.1rem)] leading-[0.94] tracking-[-0.07em] text-[var(--text)]">
            Build your next product from a calmer, more adaptable full-stack
            base.
          </h1>
          <p className="m-0 text-[1.06rem] leading-[1.9] text-[var(--muted-text)] max-[720px]:text-[1rem]">
            {appConfig.name} gives you a clean starting surface with a Next.js
            frontend, Go API, account flows, and adaptable product patterns that
            are ready to become your own experience.
          </p>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--accent-brand)] underline decoration-[0.08em] underline-offset-4 transition-transform hover:translate-x-1"
        >
          Preview the starter access flow
          <ArrowUpRight className="h-5 w-5" />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="min-w-[220px]">
            <Link href="/login">Open sandbox access</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="min-w-[220px] border-[rgba(31,41,55,0.1)] bg-white/84"
          >
            <Link href="/signup">Create an account</Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {quickFacts.map((fact) => (
            <span
              key={fact}
              className="rounded-full border border-white/80 bg-white/72 px-4 py-2 text-sm text-[var(--muted-text)] shadow-sm backdrop-blur-[12px]"
            >
              {fact}
            </span>
          ))}
        </div>

        <div className="grid w-full gap-4 pt-8 md:grid-cols-3">
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
      </section>

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
                This home page keeps the centered clarity of your reference,
                then adds warmer depth, sharper product framing, and a few
                reusable content blocks so the starter still feels useful once
                you begin customizing it.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] bg-white/80 p-4">
                <strong className="font-[family-name:var(--font-display)] text-2xl">
                  01
                </strong>
                <p className="mt-2 mb-0 text-sm leading-7 text-[var(--muted-text)]">
                  Clear hero copy with one dominant action path.
                </p>
              </div>
              <div className="rounded-[24px] bg-white/80 p-4">
                <strong className="font-[family-name:var(--font-display)] text-2xl">
                  02
                </strong>
                <p className="mt-2 mb-0 text-sm leading-7 text-[var(--muted-text)]">
                  Enough supporting cards to hint at the rest of the system.
                </p>
              </div>
              <div className="rounded-[24px] bg-white/80 p-4">
                <strong className="font-[family-name:var(--font-display)] text-2xl">
                  03
                </strong>
                <p className="mt-2 mb-0 text-sm leading-7 text-[var(--muted-text)]">
                  A layout that can later grow into a fuller marketing page.
                </p>
              </div>
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
    </main>
  );
}
