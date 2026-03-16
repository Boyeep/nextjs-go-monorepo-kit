import { BarChart3, Eye, LockKeyhole, UserRound } from "lucide-react";
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

type DashboardPreviewViewProps = {
  ownerEmail: string;
};

const previewSessionRows = [
  { label: "Name", value: "Owner Preview" },
  { label: "Email", value: "owner@your-product.com" },
  { label: "Role", value: "owner" },
  { label: "Member Since", value: "Jan 16, 2026" },
];

const previewAnalytics = [
  { label: "Visitors", value: "12.4k" },
  { label: "Pageviews", value: "28.9k" },
  { label: "Views / Visit", value: "2.3" },
  { label: "Bounce Rate", value: "34%" },
  { label: "Visit Duration", value: "3m 42s" },
  { label: "Window", value: "Last 30 days", note: "Sample preview data" },
];

export function DashboardPreviewView({
  ownerEmail,
}: DashboardPreviewViewProps) {
  return (
    <DashboardShell>
      <DashboardHero
        badge="Dashboard Preview"
        title="Preview the private workspace before wiring login."
        description={
          <p className="m-0">
            This public version shows the shape of the dashboard so people can
            explore the starter before they touch auth. Sign in as the
            configured owner account to unlock live session data and real
            analytics.
          </p>
        }
        secondaryHref="/"
        secondaryLabel="Back home"
        primaryHref="/login"
        primaryLabel="Open auth demo"
      />

      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        <Card>
          <CardHeader className="text-left">
            <CardDescription>Preview User</CardDescription>
            <CardTitle className="flex items-center justify-start gap-3 text-left text-2xl">
              <UserRound className="h-6 w-6 text-[var(--accent-brand)]" />
              Owner Preview
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-left">
            <CardDescription>Access Mode</CardDescription>
            <CardTitle className="flex items-center justify-start gap-3 text-left text-2xl">
              <Eye className="h-6 w-6 text-[var(--accent-brand)]" />
              Public demo
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-left">
            <CardDescription>Unlocks With</CardDescription>
            <CardTitle className="flex items-center justify-start gap-3 text-left text-xl">
              <LockKeyhole className="h-6 w-6 text-[var(--accent-brand)]" />
              Owner login
            </CardTitle>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Session Overview</CardTitle>
            <CardDescription>
              A preview of the private account context this workspace can expose
              once auth is wired for real users.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-3 rounded-[28px] border border-[rgba(31,41,55,0.08)] bg-white p-5 shadow-sm">
              {previewSessionRows.map((item) => (
                <div key={item.label} className="grid gap-1">
                  <p className="text-xs font-bold tracking-[0.08em] text-[var(--muted-text)] uppercase">
                    {item.label}
                  </p>
                  <p className="m-0 text-[var(--text)]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] bg-[var(--surface)] p-5">
              <p className="text-sm font-semibold text-[var(--text)]">
                What the real owner dashboard unlocks
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-[var(--muted-text)]">
                <li>Authenticated session hydration for the signed-in owner</li>
                <li>Owner-only route protection on the frontend and backend</li>
                <li>Live analytics from the protected backend endpoint</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitors Analytics</CardTitle>
            <CardDescription>
              Sample numbers for the public preview. The real route becomes live
              after owner authentication.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
              {previewAnalytics.map((item) => (
                <div
                  key={item.label}
                  className="border-border rounded-[24px] border bg-[var(--surface)] p-4"
                >
                  <p className="text-xs tracking-[0.08em] text-[var(--muted-text)] uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{item.value}</p>
                  {"note" in item && item.note ? (
                    <p className="mt-1 text-xs text-[var(--muted-text)]">
                      {item.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="rounded-[28px] bg-white p-5">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-[var(--accent-brand)]" />
                <p className="font-semibold text-[var(--text)]">
                  Switches to real analytics when the owner signs in
                </p>
              </div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted-text)]">
                {ownerEmail
                  ? `The configured owner email is ${ownerEmail}. Signing in with that account replaces this preview with the real protected analytics view.`
                  : "Set NEXT_PUBLIC_DASHBOARD_OWNER_EMAIL and sign in with that account to replace this preview with the real protected analytics view."}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </DashboardShell>
  );
}
