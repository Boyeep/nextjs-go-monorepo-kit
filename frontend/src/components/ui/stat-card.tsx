import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardTone = "default" | "brand" | "accent";

const toneClassNames: Record<StatCardTone, string> = {
  default: "bg-white/86",
  brand:
    "bg-[linear-gradient(180deg,rgba(255,244,236,0.96),rgba(255,255,255,0.9))]",
  accent:
    "bg-[linear-gradient(180deg,rgba(239,250,250,0.96),rgba(255,255,255,0.9))]",
};

export type StatCardProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
  tone?: StatCardTone;
};

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    { className, label, value, hint, icon, tone = "default", ...props },
    ref,
  ) => (
    <Card
      ref={ref}
      className={cn(
        "rounded-[28px] border-[rgba(31,41,55,0.08)] shadow-[0_14px_32px_rgba(31,41,55,0.06)]",
        toneClassNames[tone],
        className,
      )}
      {...props}
    >
      <CardContent className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-1">
            <p className="text-xs font-bold tracking-[0.14em] text-[var(--muted-text)] uppercase">
              {label}
            </p>
            <p className="m-0 font-[family-name:var(--font-display)] text-[2.25rem] leading-none tracking-[-0.05em] text-[var(--text)]">
              {value}
            </p>
          </div>
          {icon ? (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/78 text-[var(--accent-brand)] shadow-sm">
              {icon}
            </div>
          ) : null}
        </div>
        {hint ? (
          <p className="m-0 text-sm leading-6 text-[var(--muted-text)]">
            {hint}
          </p>
        ) : null}
      </CardContent>
    </Card>
  ),
);

StatCard.displayName = "StatCard";

export { StatCard };
