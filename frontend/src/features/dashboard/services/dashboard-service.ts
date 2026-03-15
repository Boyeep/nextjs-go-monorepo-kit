import { buildApiUrl } from "@/lib/api";
import type { AnalyticsOverview } from "@/types/analytics";

type AnalyticsOverviewResponse = {
  data: AnalyticsOverview;
};

export async function getAnalyticsOverview(accessToken: string): Promise<AnalyticsOverview> {
  const response = await fetch(buildApiUrl("/analytics/overview"), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as AnalyticsOverviewResponse | { error?: string } | null;
  if (!response.ok) {
    throw new Error(payload && typeof payload === "object" && "error" in payload ? payload.error || "Failed to load analytics." : "Failed to load analytics.");
  }

  return (payload as AnalyticsOverviewResponse).data;
}
