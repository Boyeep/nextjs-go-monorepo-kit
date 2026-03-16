import type { UseQueryResult } from "@tanstack/react-query";
import { Clock3, Eye, ShieldCheck, UserRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DashboardHero,
  DashboardShell,
} from "@/features/dashboard/components/dashboard-shell";
import type { AnalyticsOverview } from "@/types/analytics";
import type { AuthUser } from "@/types/auth";

type DashboardOwnerViewProps = {
  analyticsQuery: UseQueryResult<AnalyticsOverview, Error>;
  user: AuthUser;
};

function formatDate(value?: string | null) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function DashboardOwnerView({
  analyticsQuery,
  user,
}: DashboardOwnerViewProps) {
  const displayName = user.full_name || user.username;

  const analyticsCards = analyticsQuery.data
    ? [
        { label: "Visitors", value: analyticsQuery.data.visitors },
        { label: "Pageviews", value: analyticsQuery.data.pageviews },
        { label: "Views / Visit", value: analyticsQuery.data.views_per_visit },
        { label: "Bounce Rate", value: analyticsQuery.data.bounce_rate },
        { label: "Visit Duration", value: analyticsQuery.data.visit_duration },
        {
          label: "Window",
          note: analyticsQuery.data.source,
          value: analyticsQuery.data.date_range,
        },
      ]
    : [];

  return (
    <DashboardShell>
      <DashboardHero
        badge="Owner Dashboard"
        title="Review owner access, account context, and analytics from one private workspace."
        description={
          <p className="m-0">
            This dashboard keeps the private account layer and analytics view
            intact without surfacing the removed sample content management
            flows.
          </p>
        }
        secondaryHref="/"
        secondaryLabel="Back home"
        primaryHref="/login"
        primaryLabel="Open login screen"
      />

      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        <Card>
          <CardHeader className="text-left">
            <CardDescription>Signed In As</CardDescription>
            <CardTitle className="flex items-center justify-start gap-3 text-left text-2xl">
              <UserRound className="h-6 w-6 text-[var(--accent-brand)]" />
              {displayName}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-left">
            <CardDescription>Account Status</CardDescription>
            <CardTitle className="flex items-center justify-start gap-3 text-left text-2xl">
              <ShieldCheck className="h-6 w-6 text-[var(--accent-brand)]" />
              {user.status}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-left">
            <CardDescription>Last Login</CardDescription>
            <CardTitle className="flex items-center justify-start gap-3 text-left text-xl">
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
                {analyticsCards.map((card) => (
                  <div
                    key={card.label}
                    className="border-border rounded-[24px] border bg-[var(--surface)] p-4"
                  >
                    <p className="text-xs tracking-[0.08em] text-[var(--muted-text)] uppercase">
                      {card.label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold">{card.value}</p>
                    {card.note ? (
                      <p className="mt-1 text-xs text-[var(--muted-text)]">
                        {card.note}
                      </p>
                    ) : null}
                  </div>
                ))}
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
    </DashboardShell>
  );
}
