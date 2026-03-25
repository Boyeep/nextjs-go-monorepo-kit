import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/app-config";

export function HeroSection() {
  return (
    <section className="relative px-0">
      <div className="mx-auto flex min-h-[calc(100svh-5.9rem)] w-[min(1120px,calc(100%-2rem))] flex-col items-center justify-center gap-4 py-[clamp(1.5rem,3.4vw,3rem)] text-center max-[720px]:min-h-[calc(100svh-5.35rem)] max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <div className="grid max-w-[1000px] justify-items-center gap-5 px-[clamp(0.5rem,2vw,1rem)] py-[clamp(1rem,2.5vw,2rem)]">
          <ScrollReveal
            as="span"
            className="relative inline-flex items-center rounded-full border border-[rgba(31,111,120,0.14)] bg-white/76 px-4 py-2 text-[0.78rem] font-bold tracking-[0.18em] text-[var(--accent-brand)] uppercase shadow-sm backdrop-blur-[12px]"
            distancePx={18}
          >
            starter sandbox
          </ScrollReveal>

          <ScrollReveal
            as="div"
            className="relative grid max-w-[920px] gap-3"
            delayMs={90}
          >
            <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.7rem,5.1vw,4.5rem)] leading-[0.92] tracking-[-0.07em] text-[var(--text)]">
              Build your next product from a{" "}
              <span className="bg-[linear-gradient(135deg,var(--brand-deep),var(--brand),#f4a261)] bg-clip-text text-transparent">
                calmer, more adaptable
              </span>{" "}
              full-stack base.
            </h1>
            <p className="m-0 max-w-[760px] justify-self-center text-[1rem] leading-[1.8] text-[var(--muted-text)] max-[720px]:text-[0.98rem]">
              {appConfig.name} gives you a clean starting surface with a Next.js
              frontend, Go API, account flows, and adaptable product patterns
              that are ready to become your own experience.
            </p>
          </ScrollReveal>

          <ScrollReveal
            as="div"
            className="relative flex flex-wrap items-center justify-center gap-3 pt-2"
            delayMs={180}
          >
            <Button asChild className="min-w-[220px]">
              <Link href="/dashboard">Open dashboard preview</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="min-w-[220px] border-[rgba(31,41,55,0.1)] bg-white/84"
            >
              <Link href="/sandbox">Open starter sandbox</Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
