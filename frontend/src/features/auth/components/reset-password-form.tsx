"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/features/auth/services/auth-service";

type ResetPasswordFormProps = {
  token?: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error("Missing reset token. Please reopen the link from your email.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match yet.");
      }

      return resetPassword({
        token,
        password,
      });
    },
    onSuccess: () => {
      setSuccessMessage("Your password has been reset. Redirecting you to login...");
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    },
    onError: (error) => {
      setErrorMessage(error instanceof Error ? error.message : "Failed to reset password.");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    mutation.mutate();
  };

  return (
    <main className="mx-auto my-4 grid w-[min(var(--max-width),calc(100%-2rem))] grid-cols-[minmax(300px,0.95fr)_minmax(0,1.05fr)] gap-5 max-[900px]:grid-cols-1 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
      <section className="grid min-h-[520px] content-end gap-4 rounded-[32px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%),linear-gradient(180deg,rgba(16,52,67,0.48),rgba(16,52,67,0.94))] p-[clamp(1.8rem,4vw,3rem)] text-white shadow-[var(--shadow)] max-[900px]:min-h-[320px]">
        <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-2 text-[0.88rem] uppercase tracking-[0.04em]">Password Reset</span>
        <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.2rem)] leading-[0.96]">Buat password baru tanpa kehilangan momentum belajar.</h1>
        <p className="m-0 leading-[1.8] text-white/80">Halaman ini tetap mempertahankan validasi dasar sambil siap dipasang ke backend nantinya.</p>
      </section>

      <Card className="rounded-[32px] border border-white/70 bg-white/85 p-[clamp(1.5rem,4vw,2rem)] shadow-[var(--shadow)]">
        <CardHeader className="mb-6 grid gap-2 p-0">
          <CardTitle>Create new password</CardTitle>
          <CardDescription>Gunakan password yang kuat dan mudah kamu kelola sendiri.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            <Button type="submit" disabled={mutation.isPending}>
              Reset password
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          </form>
          {errorMessage ? <p className="mt-5 text-sm text-red-700">{errorMessage}</p> : null}
          {successMessage ? <p className="mt-5 text-sm text-emerald-700">{successMessage}</p> : null}
        </CardContent>
      </Card>
    </main>
  );
}
