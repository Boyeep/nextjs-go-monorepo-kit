"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

type RouteContentFrameProps = {
  children: ReactNode;
};

export function RouteContentFrame({ children }: RouteContentFrameProps) {
  const pathname = usePathname();

  return (
    <div id="main-content" key={pathname}>
      {children}
    </div>
  );
}
