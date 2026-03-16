import Link from "next/link";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/app-config";

export function HeroSection() {
  return (
    <section className="px-0 pt-4 pb-8">
      <div className="mx-auto grid w-[min(var(--max-width),calc(100%-2rem))] grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] gap-6 max-[960px]:grid-cols-1 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <div className="grid gap-5 rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(255,245,237,0.9)),linear-gradient(180deg,rgba(239,125,87,0.15),transparent)] px-[clamp(2rem,5vw,4.5rem)] py-[clamp(2rem,5vw,4.5rem)] shadow-[var(--shadow)]">
          <span className="section-heading__eyebrow">Full-Stack Starter</span>
          <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.92] tracking-[-0.06em]">
            Build faster with a{" "}
            <span className="text-[var(--brand-deep)]">general</span> purpose
            app starter.
          </h1>
          <p className="m-0 max-w-[580px] text-[1.08rem] leading-[1.8] text-[var(--muted-text)]">
            {appConfig.name} gives you auth, dashboard patterns, and reusable UI
            blocks you can adapt to your own product.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href="/login">Open sandbox access</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/signup">Create an account</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="grid min-w-[110px] gap-0.5">
              <strong className="font-[family-name:var(--font-display)] text-[1.7rem]">
                Auth
              </strong>
              <span>account flows</span>
            </div>
            <div className="grid min-w-[110px] gap-0.5">
              <strong className="font-[family-name:var(--font-display)] text-[1.7rem]">
                Owner
              </strong>
              <span>dashboard access</span>
            </div>
            <div className="grid min-w-[110px] gap-0.5">
              <strong className="font-[family-name:var(--font-display)] text-[1.7rem]">
                API
              </strong>
              <span>backend included</span>
            </div>
          </div>
        </div>
        <div className="relative min-h-[540px] overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(31,111,120,0.16),rgba(31,111,120,0.03))] shadow-[var(--shadow)] max-[960px]:min-h-[420px]">
          <div className="absolute top-5 left-5 z-[1] rounded-[20px] border border-white/70 bg-white/90 px-4 py-3 shadow-[var(--shadow)] backdrop-blur-[14px]">
            <strong>Starter workspace</strong>
            <div>
              Swap the starter content for your actual product in one place.
            </div>
          </div>
          <PlaceholderArt
            title="Template Workspace"
            label="Hero Placeholder"
            className="h-full w-full"
          />
          <div className="absolute right-5 bottom-5 z-[1] w-[min(260px,calc(100%-2.5rem))] rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-[var(--shadow)] backdrop-blur-[14px]">
            <strong>What you can reuse</strong>
            <div>
              Landing page sections, auth flows, dashboard views, and
              list-detail screens.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
