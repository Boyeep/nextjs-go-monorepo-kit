import { Card } from "@/components/ui/card";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";

export function DashboardLoadingState() {
  return (
    <DashboardShell mode="single">
      <Card className="p-8">
        <p className="text-[var(--muted-text)]">Loading dashboard...</p>
      </Card>
    </DashboardShell>
  );
}
