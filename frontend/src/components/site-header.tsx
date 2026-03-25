"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthSession } from "@/features/auth/hooks/use-auth-session";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { useUiStore } from "@/features/shared/store/ui-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandMark } from "@/components/brand-mark";
import { appConfig } from "@/lib/app-config";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/sandbox", label: "Sandbox" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const activeHref =
    pathname === "/" || pathname === "/dashboard" || pathname === "/sandbox"
      ? pathname
      : "";
  const queryClient = useQueryClient();
  const mobileNavOpen = useUiStore((state) => state.mobileNavOpen);
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen);
  const clearSession = useAuthStore((state) => state.clearSession);
  const { user, isLoading } = useAuthSession();

  function handleLogout() {
    clearSession();
    void queryClient.invalidateQueries({ queryKey: ["auth"] });
  }

  return (
    <header className="sticky top-0 z-30 px-0 pt-4 pb-0">
      <div className="relative mx-auto grid w-[min(var(--max-width),calc(100%-2rem))] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 rounded-[28px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,245,238,0.68))] px-4 py-3 shadow-[0_12px_30px_rgba(31,41,55,0.04)] backdrop-blur-[24px] max-[900px]:flex max-[900px]:w-[min(var(--max-width),calc(100%-1.25rem))] max-[900px]:justify-between">
        <Link href="/" className="inline-flex min-w-0 items-center gap-3">
          <BrandMark className="h-11 w-11 shrink-0" />
          <span className="grid min-w-0 gap-0.5">
            <span className="text-[0.68rem] font-bold tracking-[0.22em] text-[var(--brand-deep)] uppercase">
              Starter Sandbox
            </span>
            <span className="truncate font-[family-name:var(--font-display)] text-[1.1rem] font-bold tracking-[-0.04em] text-[var(--text)]">
              {appConfig.name}
            </span>
          </span>
        </Link>
        <nav
          className="flex items-center justify-center gap-2 max-[900px]:hidden"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              data-active={activeHref === item.href}
              className={cn(
                "header-nav-link text-sm font-medium",
                activeHref === item.href && "font-semibold",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 justify-self-end max-[900px]:hidden">
          {user ? (
            <>
              <span className="rounded-full border border-white/80 bg-white/78 px-4 py-2 text-sm text-[var(--muted-text)] shadow-sm">
                {user.full_name || user.username}
              </span>
              <Button type="button" variant="secondary" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : isLoading ? (
            <span className="rounded-full border border-white/80 bg-white/78 px-4 py-2 text-sm text-[var(--muted-text)] shadow-sm">
              Loading...
            </span>
          ) : (
            <>
              <Button asChild variant="secondary">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="hidden border-white/80 bg-white/78 shadow-sm max-[900px]:inline-flex"
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="grid gap-3 pt-8">
              <div>
                <Badge variant="outline">Quick Navigation</Badge>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl">
                  Explore {appConfig.name}
                </h2>
              </div>
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={
                        activeHref === item.href ? "page" : undefined
                      }
                      className={cn(
                        "rounded-[20px] border border-[rgba(31,41,55,0.08)] bg-white/84 px-4 py-4 shadow-sm transition-colors",
                        activeHref === item.href &&
                          "border-[rgba(31,111,120,0.2)] bg-[rgba(31,111,120,0.08)] text-[var(--text)]",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="grid gap-3 pt-2">
                {user ? (
                  <>
                    <div className="rounded-[20px] border border-[rgba(31,41,55,0.08)] bg-white/84 px-4 py-4 text-sm text-[var(--muted-text)] shadow-sm">
                      Signed in as {user.full_name || user.username}
                    </div>
                    <SheetClose asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </SheetClose>
                  </>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Button asChild variant="secondary">
                        <Link href="/login">Login</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild>
                        <Link href="/signup">Sign up</Link>
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
