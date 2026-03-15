"use client";

import Link from "next/link";
import { MailCheck, RefreshCcw } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { resendVerification } from "@/features/auth/services/auth-service";

type ConfirmEmailPageClientProps = {
  email?: string;
};

export function ConfirmEmailPageClient({ email }: ConfirmEmailPageClientProps) {
  const resendMutation = useMutation({
    mutationFn: async () => {
      if (!email) {
        throw new Error("Email address is missing for resend verification.");
      }

      return resendVerification({ email });
    },
  });

  return (
    <main className="mx-auto flex min-h-[calc(100vh-12rem)] w-[min(100%,32rem)] items-center justify-center px-5 py-10">
      <Card className="w-full rounded-[32px] border border-white/70 bg-white/90 p-2 shadow-[var(--shadow)]">
        <CardHeader className="items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-brand)]">
            <MailCheck className="h-7 w-7" />
          </div>
          <CardTitle className="text-[clamp(1.7rem,4vw,2.2rem)]">Confirm Your Email</CardTitle>
          <CardDescription className="max-w-[26rem] text-sm leading-7">
            {email
              ? `Kami sudah mengirim email verifikasi ke ${email}. Silakan cek Gmail kamu lalu klik link verifikasinya sebelum login.`
              : "Kami sudah mengirim email verifikasi. Silakan cek Gmail kamu lalu klik link verifikasinya sebelum login."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {resendMutation.isSuccess ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Email verifikasi sudah dikirim ulang. Cek inbox atau folder spam kamu.
            </p>
          ) : null}
          {resendMutation.isError ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {resendMutation.error instanceof Error ? resendMutation.error.message : "Gagal mengirim ulang email verifikasi."}
            </p>
          ) : null}

          <Button
            type="button"
            variant="secondary"
            onClick={() => resendMutation.mutate()}
            disabled={!email || resendMutation.isPending}
          >
            <RefreshCcw className="h-4 w-4" />
            Resend verification
          </Button>

          <Button asChild>
            <Link href="/login">Back to login</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
