import type { components } from "@/generated/openapi";

export type AuthUser = components["schemas"]["User"];
export type AuthResponse = components["schemas"]["AuthResponse"];
export type RegisterResponse = components["schemas"]["RegisterResponse"];

export type AuthSession = {
  accessToken: string;
  expiresAt: string;
  user: AuthUser;
};

export type LoginInput = components["schemas"]["LoginInput"];
export type RegisterInput = components["schemas"]["RegisterInput"];
export type ForgotPasswordInput = components["schemas"]["ForgotPasswordInput"];
export type ResetPasswordInput = components["schemas"]["ResetPasswordInput"];
export type VerifyEmailInput = components["schemas"]["VerifyEmailInput"];
export type ResendVerificationInput =
  components["schemas"]["ResendVerificationInput"];
