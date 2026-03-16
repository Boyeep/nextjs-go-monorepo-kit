import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  children: ReactNode;
  mode?: "grid" | "single";
};

type DashboardHeroProps = {
  badge: string;
  description: ReactNode;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  title: ReactNode;
};

const baseShellClassName =
  "mx-auto my-6 w-[min(var(--max-width),calc(100%-2rem))] max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]";

export function DashboardShell({
  children,
  mode = "grid",
}: DashboardShellProps) {
  return (
    <main className={cn(baseShellClassName, mode === "grid" && "grid gap-6")}>
      {children}
    </main>
  );
}

export function DashboardHero({
  badge,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  title,
}: DashboardHeroProps) {
  return (
    <section className="rounded-[36px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,rgba(16,52,67,0.94),rgba(31,111,120,0.84))] p-[clamp(1.75rem,4vw,3rem)] text-white shadow-[var(--shadow)]">
      <div className="grid gap-4">
        <Badge className="w-fit rounded-full bg-white/15 px-3 py-1 text-white hover:bg-white/15">
          {badge}
        </Badge>
        <div className="grid gap-3">
          <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4.25rem)] leading-[0.95]">
            {title}
          </h1>
          <div className="max-w-[760px] text-white/80">{description}</div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
          <Button asChild>
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
