import Link from "next/link";
import { appConfig, brandInitials } from "@/lib/app-config";

const footerLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/login", label: "Sandbox Login" },
  { href: "/create-resource", label: "Create Resource" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-0 pt-6 pb-12" id="contact">
      <div className="mx-auto w-[min(var(--max-width),calc(100%-2rem))] rounded-[34px] border border-white/85 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,244,236,0.78))] px-6 py-8 shadow-[0_20px_48px_rgba(31,41,55,0.08)] backdrop-blur-[18px] max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <div className="grid gap-5 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,rgba(239,125,87,0.95),rgba(255,185,103,0.9))] text-sm font-semibold tracking-[0.18em] text-white uppercase shadow-[0_10px_24px_rgba(239,125,87,0.24)]">
              {brandInitials}
            </span>
            <div className="grid gap-0.5 text-left max-[560px]:text-center">
              <strong className="font-[family-name:var(--font-display)] text-[1.2rem] tracking-[-0.04em] text-[var(--text)]">
                {appConfig.name}
              </strong>
              <span className="text-[0.72rem] font-bold tracking-[0.22em] text-[var(--brand-deep)] uppercase">
                Full-stack starter sandbox
              </span>
            </div>
          </div>

          <p className="m-0 mx-auto max-w-[660px] text-[0.98rem] leading-8 text-[var(--muted-text)]">
            A clean launch surface for custom products, private dashboards, and
            collection-based tools that need real structure from the start.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="rounded-full border border-white/80 bg-white/76 px-4 py-2 text-sm text-[var(--muted-text)] shadow-sm">
              Next.js UI
            </span>
            <span className="rounded-full border border-white/80 bg-white/76 px-4 py-2 text-sm text-[var(--muted-text)] shadow-sm">
              Go API
            </span>
            <span className="rounded-full border border-white/80 bg-white/76 px-4 py-2 text-sm text-[var(--muted-text)] shadow-sm">
              Auth and owner flows
            </span>
            <span className="rounded-full border border-white/80 bg-white/76 px-4 py-2 text-sm text-[var(--muted-text)] shadow-sm">
              Ready to remix
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-[var(--accent-brand)] underline decoration-[0.08em] underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="grid gap-2 text-sm text-[var(--muted-text)]">
            <span>API host: {appConfig.url.host}</span>
            <span>
              © {year} {appConfig.name}. Built to become your product, not stay
              a demo forever.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
