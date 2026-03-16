import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";

type SiteFooterLayoutProps = {
  children: ReactNode;
};

export default function SiteFooterLayout({ children }: SiteFooterLayoutProps) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  );
}
