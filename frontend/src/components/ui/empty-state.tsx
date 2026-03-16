import * as React from "react";
import { cn } from "@/lib/utils";

export type EmptyStateProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    { className, icon, title, description, action, children, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "grid justify-items-center gap-4 rounded-[32px] border border-white/70 bg-white/84 p-8 text-center shadow-[0_18px_40px_rgba(31,41,55,0.08)]",
        className,
      )}
      {...props}
    >
      {icon ? (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(31,111,120,0.1)] text-[var(--accent-brand)]">
          {icon}
        </div>
      ) : null}
      <div className="grid gap-2">
        <h3 className="m-0 font-[family-name:var(--font-display)] text-3xl tracking-[-0.04em] text-[var(--text)]">
          {title}
        </h3>
        {description ? (
          <p className="m-0 max-w-[34rem] text-sm leading-7 text-[var(--muted-text)]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
      {children}
    </div>
  ),
);

EmptyState.displayName = "EmptyState";

export { EmptyState };
