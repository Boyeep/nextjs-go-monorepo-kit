"use client";

import { create } from "zustand";
import type { AuthSession, AuthUser } from "@/types/auth";

type AuthState = {
  accessToken: string | null;
  expiresAt: string | null;
  user: AuthUser | null;
  setSession: (session: AuthSession) => void;
  setUser: (user: AuthUser) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  (set) => ({
    accessToken: null,
    expiresAt: null,
    user: null,
    setSession: (session) =>
      set({
        accessToken: session.accessToken,
        expiresAt: session.expiresAt,
        user: session.user,
      }),
    setUser: (user) => set({ user }),
    clearSession: () =>
      set({
        accessToken: null,
        expiresAt: null,
        user: null,
      }),
  })
);
