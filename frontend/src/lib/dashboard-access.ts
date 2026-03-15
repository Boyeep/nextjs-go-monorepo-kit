import type { AuthUser } from "@/types/auth";

export function getDashboardOwnerEmail() {
  return process.env.NEXT_PUBLIC_DASHBOARD_OWNER_EMAIL?.trim().toLowerCase() ?? "";
}

export function canAccessDashboard(user: AuthUser | null | undefined) {
  if (!user) {
    return false;
  }

  const ownerEmail = getDashboardOwnerEmail();
  if (!ownerEmail) {
    return false;
  }

  return user.email.trim().toLowerCase() === ownerEmail;
}
