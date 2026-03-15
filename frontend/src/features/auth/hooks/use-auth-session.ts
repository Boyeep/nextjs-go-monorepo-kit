"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getCurrentUser } from "@/features/auth/services/auth-service";
import { useAuthStore } from "@/features/auth/store/auth-store";

export function useAuthSession() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const expiresAt = useAuthStore((state) => state.expiresAt);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearSession = useAuthStore((state) => state.clearSession);

  const query = useQuery({
    queryKey: ["auth", "me", accessToken],
    queryFn: () => getCurrentUser(accessToken as string),
    enabled: Boolean(accessToken),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.isError) {
      clearSession();
    }
  }, [clearSession, query.isError]);

  useEffect(() => {
    if (!expiresAt) {
      return;
    }

    if (new Date(expiresAt).getTime() <= Date.now()) {
      clearSession();
    }
  }, [clearSession, expiresAt]);

  return {
    accessToken,
    user,
    isLoading: Boolean(accessToken) && query.isLoading,
  };
}
