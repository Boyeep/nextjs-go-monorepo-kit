"use client";

import { useAuthSession } from "@/features/auth/hooks/use-auth-session";

export function AuthBootstrap() {
  useAuthSession();

  return null;
}
