import { ReactNode } from "react";
import { RouteContentFrame } from "@/components/route-content-frame";
import { Providers } from "@/components/providers";
import { RouteScrollReset } from "@/components/route-scroll-reset";
import { SiteHeader } from "@/components/site-header";

type RootShellProps = {
  children: ReactNode;
};

export function RootShell({ children }: RootShellProps) {
  return (
    <Providers>
      <div className="page-shell">
        <RouteScrollReset />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-[var(--text)] focus:shadow-[var(--shadow)]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <RouteContentFrame>{children}</RouteContentFrame>
      </div>
    </Providers>
  );
}
