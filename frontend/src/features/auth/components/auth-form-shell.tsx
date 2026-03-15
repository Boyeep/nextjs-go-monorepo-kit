"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword, login, register } from "@/features/auth/services/auth-service";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { appConfig } from "@/lib/app-config";
import type { AuthSession, RegisterResponse } from "@/types/auth";

type Field = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
};

type SecondaryLink = {
  href: string;
  label: string;
};

type AuthFormShellProps = {
  mode: "login" | "signup" | "forgot-password";
  title: string;
  description: string;
  submitLabel: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
  fields: Field[];
  secondaryLink?: SecondaryLink;
};

export function AuthFormShell({
  mode,
  title,
  description,
  submitLabel,
  footerText,
  footerLinkLabel,
  footerLinkHref,
  fields,
  secondaryLink,
}: AuthFormShellProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (mode === "forgot-password") {
        return forgotPassword({
          email: String(formData.get("email") ?? ""),
        });
      }

      if (mode === "login") {
        return login({
          email: String(formData.get("email") ?? ""),
          password: String(formData.get("password") ?? ""),
        });
      }

      const password = String(formData.get("password") ?? "");
      const confirmPassword = String(formData.get("confirm_password") ?? "");
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      return register({
        username: String(formData.get("username") ?? ""),
        email: String(formData.get("email") ?? ""),
        password,
        full_name: String(formData.get("full_name") ?? ""),
      });
    },
    onSuccess: async (result) => {
      if (mode === "forgot-password") {
        setSuccessMessage("If your email is registered, a reset link will be sent there.");
        return;
      }

      if (mode === "signup") {
        const email = (result as RegisterResponse).user.email;
        router.push(`/confirm-email${email ? `?email=${encodeURIComponent(email)}` : ""}`);
        router.refresh();
        return;
      }

      setSession(result as AuthSession);
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    mutation.mutate(new FormData(event.currentTarget));
  }

  return (
    <main className="mx-auto my-4 grid w-[min(var(--max-width),calc(100%-2rem))] grid-cols-[minmax(300px,0.95fr)_minmax(0,1.05fr)] gap-5 max-[900px]:grid-cols-1 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
      <section className="grid min-h-[520px] content-end gap-4 rounded-[32px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%),linear-gradient(180deg,rgba(16,52,67,0.48),rgba(16,52,67,0.94))] p-[clamp(1.8rem,4vw,3rem)] text-white shadow-[var(--shadow)] max-[900px]:min-h-[320px]">
        <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-2 text-[0.88rem] uppercase tracking-[0.04em]">
          {appConfig.name} Access
        </span>
        <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.2rem)] leading-[0.96]">
          Account flows that are ready to reuse.
        </h1>
        <p className="m-0 leading-[1.8] text-white/80">
          These account pages share a consistent structure, connect cleanly to the backend,
          and can be adapted to many product types.
        </p>
      </section>

      <Card className="rounded-[32px] border border-white/70 bg-white/85 p-[clamp(1.5rem,4vw,2rem)] shadow-[var(--shadow)]">
        <CardHeader className="mb-6 grid gap-2 p-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {mode === "login" && appConfig.demo.email && appConfig.demo.password ? (
            <div className="mb-5 rounded-[24px] border border-[var(--accent-soft)] bg-[var(--accent-soft)]/40 px-4 py-4 text-sm text-[var(--text)]">
              <p className="m-0 font-semibold">Demo account</p>
              <p className="mt-2 mb-0">Email: <code>{appConfig.demo.email}</code></p>
              <p className="mt-1 mb-0">Password: <code>{appConfig.demo.password}</code></p>
            </div>
          ) : null}
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field.id} className="grid gap-2">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input id={field.id} name={field.id} type={field.type} placeholder={field.placeholder} />
              </div>
            ))}
            {errorMessage ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
            ) : null}
            {successMessage ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {successMessage}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button type="submit" disabled={mutation.isPending}>
                {submitLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
              {secondaryLink ? (
                <Link href={secondaryLink.href} className="font-bold text-[var(--accent-brand)]">
                  {secondaryLink.label}
                </Link>
              ) : null}
            </div>
          </form>
          <p className="mt-5 text-[var(--muted-text)]">
            {footerText} <Link href={footerLinkHref}>{footerLinkLabel}</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
