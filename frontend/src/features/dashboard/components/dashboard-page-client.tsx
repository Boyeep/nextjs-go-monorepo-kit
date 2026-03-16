"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock3, Eye, ShieldAlert, ShieldCheck, UserRound } from "lucide-react";
import {
  canAccessDashboard,
  getDashboardOwnerEmail,
} from "@/lib/dashboard-access";
import { useAuthSession } from "@/features/auth/hooks/use-auth-session";
import { getAnalyticsOverview } from "@/features/dashboard/services/dashboard-service";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AnalyticsOverview } from "@/types/analytics";

function formatDate(value?: string | null) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function DashboardPageClient() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const { user, isLoading } = useAuthSession();

  const canAccess = canAccessDashboard(user);
  const ownerEmail = getDashboardOwnerEmail();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!canAccess) {
      router.replace("/");
    }
  }, [canAccess, isLoading, router, user]);

  const analyticsQuery = useQuery<AnalyticsOverview>({
    queryKey: ["dashboard", "analytics-overview"],
    queryFn: () => getAnalyticsOverview(accessToken as string),
    enabled: Boolean(accessToken) && canAccess,
  });

  if (isLoading) {
    return (
      <main className="mx-auto my-6 w-[min(var(--max-width),calc(100%-2rem))] max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <Card className="p-8">
          <p className="text-[var(--muted-text)]">Loading dashboard...</p>
        </Card>
      </main>
    );
  }

  if (!user || !canAccess) {
    return (
      <main className="mx-auto my-6 w-[min(var(--max-width),calc(100%-2rem))] max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <Card className="border-amber-200 bg-amber-50/90 p-8">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-1 h-5 w-5 text-amber-700" />
            <div className="grid gap-3">
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-3xl">
                  Dashboard locked
                </h1>
                <p className="mt-2 text-sm text-amber-900/80">
                  This page only opens for the dashboard owner account.
                </p>
              </div>
              <p className="text-sm text-amber-900/80">
                Set <code>NEXT_PUBLIC_DASHBOARD_OWNER_EMAIL</code> to your email
                to enable access.
                {ownerEmail ? ` Current owner email: ${ownerEmail}.` : ""}
              </p>
              <div>
                <Button asChild variant="secondary">
                  <Link href="/">Back home</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    );
  }

  const displayName = user.full_name || user.username;

  return (
    <main className="mx-auto my-6 grid w-[min(var(--max-width),calc(100%-2rem))] gap-6 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
      <section className="rounded-[36px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,rgba(16,52,67,0.94),rgba(31,111,120,0.84))] p-[clamp(1.75rem,4vw,3rem)] text-white shadow-[var(--shadow)]">
        <div className="grid gap-4">
          <Badge className="w-fit rounded-full bg-white/15 px-3 py-1 text-white hover:bg-white/15">
            Owner Dashboard
          </Badge>
          <div className="grid gap-3">
            <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4.25rem)] leading-[0.95]">
              Review owner access, account context, and analytics from one
              private workspace.
            </h1>
            <p className="m-0 max-w-[760px] text-white/80">
              This dashboard keeps the private account layer and analytics view
              intact without surfacing the removed sample content management
              flows.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/">Back home</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Open login screen</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        <Card>
          <CardHeader>
            <CardDescription>Signed In As</CardDescription>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <UserRound className="h-6 w-6 text-[var(--accent-brand)]" />
              {displayName}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Account Status</CardDescription>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <ShieldCheck className="h-6 w-6 text-[var(--accent-brand)]" />
              {user.status}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Last Login</CardDescription>
            <CardTitle className="flex items-center gap-3 text-xl">
              <Clock3 className="h-6 w-6 text-[var(--accent-brand)]" />
              {formatDate(user.last_login_at)}
            </CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Session Overview</CardTitle>
            <CardDescription>
              The current owner session context available to the app shell.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-3 rounded-[28px] border border-[rgba(31,41,55,0.08)] bg-white p-5 shadow-sm">
              <div className="grid gap-1">
                <p className="text-xs font-bold tracking-[0.08em] text-[var(--muted-text)] uppercase">
                  Name
                </p>
                <p className="m-0 text-[var(--text)]">{displayName}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-xs font-bold tracking-[0.08em] text-[var(--muted-text)] uppercase">
                  Email
                </p>
                <p className="m-0 text-[var(--text)]">{user.email}</p>
              </div>
              <div className="grid gap-1 sm:grid-cols-2 sm:gap-4">
                <div className="grid gap-1">
                  <p className="text-xs font-bold tracking-[0.08em] text-[var(--muted-text)] uppercase">
                    Role
                  </p>
                  <p className="m-0 text-[var(--text)]">{user.role}</p>
                </div>
                <div className="grid gap-1">
                  <p className="text-xs font-bold tracking-[0.08em] text-[var(--muted-text)] uppercase">
                    Member Since
                  </p>
                  <p className="m-0 text-[var(--text)]">
                    {formatDate(user.created_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-[var(--surface)] p-5">
              <p className="text-sm font-semibold text-[var(--text)]">
                What this dashboard still demonstrates
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-[var(--muted-text)]">
                <li>Owner-only route protection on the frontend and backend</li>
                <li>Authenticated session hydration for the signed-in user</li>
                <li>A private analytics surface wired through the Go API</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitors Analytics</CardTitle>
            <CardDescription>
              Real traffic numbers from the protected analytics backend
              endpoint.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {analyticsQuery.isError ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {analyticsQuery.error instanceof Error
                  ? analyticsQuery.error.message
                  : "Failed to load analytics."}
              </p>
            ) : null}
            {analyticsQuery.isLoading ? (
              <div className="border-border rounded-[28px] border bg-[var(--surface)] p-5">
                <p className="text-sm text-[var(--muted-text)]">
                  Loading analytics overview...
                </p>
              </div>
            ) : analyticsQuery.data ? (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
                <div className="border-border rounded-[24px] border bg-[var(--surface)] p-4">
                  <p className="text-xs tracking-[0.08em] text-[var(--muted-text)] uppercase">
                    Visitors
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {analyticsQuery.data.visitors}
                  </p>
                </div>
                <div className="border-border rounded-[24px] border bg-[var(--surface)] p-4">
                  <p className="text-xs tracking-[0.08em] text-[var(--muted-text)] uppercase">
                    Pageviews
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {analyticsQuery.data.pageviews}
                  </p>
                </div>
                <div className="border-border rounded-[24px] border bg-[var(--surface)] p-4">
                  <p className="text-xs tracking-[0.08em] text-[var(--muted-text)] uppercase">
                    Views / Visit
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {analyticsQuery.data.views_per_visit}
                  </p>
                </div>
                <div className="border-border rounded-[24px] border bg-[var(--surface)] p-4">
                  <p className="text-xs tracking-[0.08em] text-[var(--muted-text)] uppercase">
                    Bounce Rate
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {analyticsQuery.data.bounce_rate}
                  </p>
                </div>
                <div className="border-border rounded-[24px] border bg-[var(--surface)] p-4">
                  <p className="text-xs tracking-[0.08em] text-[var(--muted-text)] uppercase">
                    Visit Duration
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {analyticsQuery.data.visit_duration}
                  </p>
                </div>
                <div className="border-border rounded-[24px] border bg-[var(--surface)] p-4">
                  <p className="text-xs tracking-[0.08em] text-[var(--muted-text)] uppercase">
                    Window
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {analyticsQuery.data.date_range}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted-text)]">
                    {analyticsQuery.data.source}
                  </p>
                </div>
              </div>
            ) : (
              <div className="border-border rounded-[28px] border bg-[var(--surface)] p-5">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-[var(--accent-brand)]" />
                  <p className="font-semibold">
                    Analytics is not configured yet.
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-text)]">
                  Configure the Plausible tracking script in the frontend and
                  the Plausible API credentials in the backend to start seeing
                  live visitor numbers here.
                </p>
              </div>
            )}
            <div className="rounded-[28px] bg-white p-5">
              <p className="text-sm font-semibold text-[var(--text)]">
                What you can already see now
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-[var(--muted-text)]">
                <li>
                  Real visitor, pageview, bounce-rate, and duration numbers when
                  Plausible is configured
                </li>
                <li>Whether the owner-only backend route is wired correctly</li>
                <li>
                  Whether your frontend and backend environment config align
                </li>
              </ul>
            </div>
            <p className="text-xs leading-6 text-[var(--muted-text)]">
              The analytics API key stays on the backend only. The dashboard
              fetches aggregated stats through your authenticated owner-only
              backend route.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
