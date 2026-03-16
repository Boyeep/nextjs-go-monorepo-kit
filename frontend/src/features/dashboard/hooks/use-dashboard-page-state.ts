"use client";

import { useQuery } from "@tanstack/react-query";
import {
  canAccessDashboard,
  getDashboardOwnerEmail,
} from "@/lib/dashboard-access";
import { useAuthSession } from "@/features/auth/hooks/use-auth-session";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getAnalyticsOverview } from "@/features/dashboard/services/dashboard-service";
import type { AnalyticsOverview } from "@/types/analytics";

export function useDashboardPageState() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { user, isLoading } = useAuthSession();

  const showOwnerDashboard = Boolean(user) && canAccessDashboard(user);
  const ownerEmail = getDashboardOwnerEmail();

  const analyticsQuery = useQuery<AnalyticsOverview>({
    queryKey: ["dashboard", "analytics-overview"],
    queryFn: () => getAnalyticsOverview(accessToken as string),
    enabled: Boolean(accessToken) && showOwnerDashboard,
  });

  return {
    analyticsQuery,
    isLoading,
    ownerEmail,
    showOwnerDashboard,
    user,
  };
}
