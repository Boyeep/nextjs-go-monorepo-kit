import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/app-config";
import { sampleResources } from "@/lib/site-data";

export function HeroSection() {
  const featuredPreview = sampleResources[0];

  return (
    <section className="relative px-0">
      <div className="mx-auto flex min-h-[calc(100svh-5.9rem)] w-[min(1120px,calc(100%-2rem))] flex-col items-center justify-center gap-4 py-[clamp(1.5rem,3.4vw,3rem)] text-center max-[720px]:min-h-[calc(100svh-5.35rem)] max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <div className="grid max-w-[1000px] justify-items-center gap-4 px-[clamp(0.5rem,2vw,1rem)] py-[clamp(1rem,2.5vw,2rem)]">
          <div className="relative inline-flex items-center justify-center rounded-[30px] border border-white/80 bg-white/76 p-2.5 shadow-[var(--shadow)] backdrop-blur-[18px]">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,rgba(239,125,87,0.92),rgba(255,185,103,0.9))] text-white shadow-[0_18px_34px_rgba(239,125,87,0.22)]">
              <Sparkles className="h-7 w-7" />
            </div>
          </div>

          <span className="relative inline-flex items-center rounded-full border border-[rgba(31,111,120,0.14)] bg-white/76 px-4 py-2 text-[0.78rem] font-bold tracking-[0.18em] text-[var(--accent-brand)] uppercase shadow-sm backdrop-blur-[12px]">
            starter sandbox
          </span>

          <div className="relative grid max-w-[920px] gap-3">
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
          </div>

          <div className="relative flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild className="min-w-[220px]">
              <Link href="/dashboard">Open dashboard preview</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="min-w-[220px] border-[rgba(31,41,55,0.1)] bg-white/84"
            >
              <Link
                href={
                  featuredPreview
                    ? `/resources/${featuredPreview.slug}`
                    : "/dashboard"
                }
              >
                Browse sample resource
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
