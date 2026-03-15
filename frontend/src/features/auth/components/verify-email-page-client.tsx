"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, MailCheck, ShieldAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyEmail } from "@/features/auth/services/auth-service";

type VerifyEmailPageClientProps = {
  token?: string;
};

export function VerifyEmailPageClient({ token }: VerifyEmailPageClientProps) {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const hasTriggeredVerification = useRef(false);

  const verifyMutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error("Missing verification token. Please reopen the link from your email.");
      }

      return verifyEmail({ token });
    },
    onSuccess: () => {
      setStatusMessage("Your email is verified. Redirecting you to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    },
    onError: (error) => {
      setErrorMessage(error instanceof Error ? error.message : "Failed to verify email.");
    },
  });

  useEffect(() => {
    if (token && !hasTriggeredVerification.current) {
      hasTriggeredVerification.current = true;
      setErrorMessage("");
      setStatusMessage("");
      verifyMutation.mutate();
    }
  }, [token, verifyMutation]);

  return (
    <main className="mx-auto my-4 grid w-[min(var(--max-width),calc(100%-2rem))] grid-cols-[minmax(300px,0.95fr)_minmax(0,1.05fr)] gap-5 max-[900px]:grid-cols-1 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
      <section className="grid min-h-[520px] content-end gap-4 rounded-[32px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%),linear-gradient(180deg,rgba(16,52,67,0.48),rgba(16,52,67,0.94))] p-[clamp(1.8rem,4vw,3rem)] text-white shadow-[var(--shadow)] max-[900px]:min-h-[320px]">
        <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-2 text-[0.88rem] uppercase tracking-[0.04em]">
          Email Verification
        </span>
        <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.2rem)] leading-[0.96]">
          Confirm your email so your account is ready to use.
        </h1>
        <p className="m-0 leading-[1.8] text-white/80">
          We only activate new accounts after the owner proves they can open the inbox tied to the email address.
        </p>
      </section>

      <Card className="rounded-[32px] border border-white/70 bg-white/85 p-[clamp(1.5rem,4vw,2rem)] shadow-[var(--shadow)]">
        <CardHeader className="mb-6 grid gap-2 p-0">
          <CardTitle>Verifying your email</CardTitle>
          <CardDescription>We are confirming your verification token now.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {statusMessage ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {statusMessage}
            </p>
          ) : null}
          {errorMessage ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
          ) : null}

          <div className="rounded-[28px] bg-[var(--surface)] p-5">
            <div className="flex items-center gap-3">
              {verifyMutation.isPending ? (
                <MailCheck className="h-5 w-5 text-[var(--accent-brand)]" />
              ) : errorMessage ? (
                <ShieldAlert className="h-5 w-5 text-red-600" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              )}
              <p className="font-semibold">
                {verifyMutation.isPending ? "Confirming your email..." : "Verification status updated."}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/login">Back to login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
