import type { paths } from "@/generated/openapi";
import { buildApiUrl } from "@/lib/api";
import type {
  AuthResponse,
  AuthSession,
  AuthUser,
  ForgotPasswordInput,
  LoginInput,
  RegisterResponse,
  RegisterInput,
  ResendVerificationInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from "@/types/auth";

type MeResponse =
  paths["/api/v1/auth/me"]["get"]["responses"][200]["content"]["application/json"];

function toSession(response: AuthResponse): AuthSession {
  return {
    accessToken: response.access_token,
    expiresAt: response.expires_at,
    user: response.user,
  };
}

async function parseJson<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T | { error?: string };
  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && "error" in payload
        ? payload.error
        : undefined;
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return payload as T;
}

async function parseNoContent(
  response: Response,
  missingRouteMessage: string,
): Promise<void> {
  if (response.ok) {
    return;
  }

  if (response.status === 404) {
    throw new Error(missingRouteMessage);
  }

  const payload = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;
  throw new Error(
    payload?.error || `Request failed with status ${response.status}`,
  );
}

export async function login(input: LoginInput): Promise<AuthSession> {
  const response = await fetch(buildApiUrl("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return toSession(await parseJson<AuthResponse>(response));
}

export async function register(
  input: RegisterInput,
): Promise<RegisterResponse> {
  const response = await fetch(buildApiUrl("/auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseJson<RegisterResponse>(response);
}

export async function getCurrentUser(accessToken: string): Promise<AuthUser> {
  const response = await fetch(buildApiUrl("/auth/me"), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const payload = await parseJson<MeResponse>(response);
  return payload.data;
}

export async function forgotPassword(
  input: ForgotPasswordInput,
): Promise<void> {
  const response = await fetch(buildApiUrl("/auth/forgot-password"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseNoContent(
    response,
    "Password reset email is not available yet because the backend route is still missing.",
  );
}

export async function resetPassword(input: ResetPasswordInput): Promise<void> {
  const response = await fetch(buildApiUrl("/auth/reset-password"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseNoContent(
    response,
    "Reset password is not available yet because the backend route is still missing.",
  );
}

export async function verifyEmail(input: VerifyEmailInput): Promise<void> {
  const response = await fetch(buildApiUrl("/auth/verify-email"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseNoContent(
    response,
    "Email verification is not available yet because the backend route is still missing.",
  );
}

export async function resendVerification(
  input: ResendVerificationInput,
): Promise<void> {
  const response = await fetch(buildApiUrl("/auth/resend-verification"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return parseNoContent(
    response,
    "Resend verification is not available yet because the backend route is still missing.",
  );
}
