"use client";

import { DashboardLoadingState } from "@/features/dashboard/components/dashboard-loading-state";
import { DashboardOwnerView } from "@/features/dashboard/components/dashboard-owner-view";
import { DashboardPreviewView } from "@/features/dashboard/components/dashboard-preview-view";
import { useDashboardPageState } from "@/features/dashboard/hooks/use-dashboard-page-state";

export function DashboardPageClient() {
  const { analyticsQuery, isLoading, ownerEmail, showOwnerDashboard, user } =
    useDashboardPageState();

  if (isLoading) {
    return <DashboardLoadingState />;
  }

  if (!showOwnerDashboard) {
    return <DashboardPreviewView ownerEmail={ownerEmail} />;
  }

  if (!user) {
    return null;
  }

  return <DashboardOwnerView analyticsQuery={analyticsQuery} user={user} />;
}
