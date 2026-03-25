"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  forgotPassword,
  login,
  register,
} from "@/features/auth/services/auth-service";
import { AuthSplitShell } from "@/features/auth/components/auth-split-shell";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { appConfig } from "@/lib/app-config";
import { cn } from "@/lib/utils";
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
  const isSignup = mode === "signup";

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
      setErrorMessage("");

      if (mode === "forgot-password") {
        setSuccessMessage(
          "If your email is registered, a reset link will be sent there.",
        );
        return;
      }

      if (mode === "signup") {
        const email = (result as RegisterResponse).user.email;
        router.push(
          `/confirm-email${email ? `?email=${encodeURIComponent(email)}` : ""}`,
        );
        router.refresh();
        return;
      }

      setSession(result as AuthSession);
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");

    mutation.mutate(new FormData(event.currentTarget));
  }

  const isLoginSignupFooterLink =
    mode === "login" && footerLinkHref === "/signup";
  const footerLinkTone =
    footerLinkHref === "/signup"
      ? "text-[var(--brand-deep)] hover:text-[var(--brand-deep)]"
      : "text-[var(--accent-brand)] hover:text-[var(--text)]";
  const footerLinkEffect = isLoginSignupFooterLink
    ? "animated-underline-link--relaxed"
    : "";

  return (
    <AuthSplitShell
      badge="Starter auth"
      heading="Reusable account flows, ready to adapt."
      description="A calmer auth surface with reusable structure, clear states, and backend-ready patterns you can reshape for your own product."
    >
      <Card
        className={cn(
          "rounded-[32px] border border-white/70 bg-white/85 shadow-[var(--shadow)]",
          isSignup
            ? "p-[clamp(1.35rem,3.4vw,1.75rem)]"
            : "p-[clamp(1.5rem,4vw,2rem)]",
        )}
      >
        <CardHeader
          className={cn(
            "grid p-0 text-left",
            isSignup ? "mb-5 gap-1.5" : "mb-6 gap-2",
          )}
        >
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-0 text-left">
          {mode === "login" &&
          appConfig.demo.email &&
          appConfig.demo.password ? (
            <div className="mb-5 rounded-[24px] border border-[var(--accent-soft)] bg-[var(--accent-soft)]/40 px-4 py-4 text-sm text-[var(--text)]">
              <p className="m-0 font-semibold">Demo account</p>
              <p className="mt-2 mb-0">
                Email: <code>{appConfig.demo.email}</code>
              </p>
              <p className="mt-1 mb-0">
                Password: <code>{appConfig.demo.password}</code>
              </p>
            </div>
          ) : null}
          <form
            className={cn(
              "grid text-left",
              isSignup ? "gap-3.5" : "gap-4",
            )}
            onSubmit={handleSubmit}
          >
            {fields.map((field) => (
              <div
                key={field.id}
                className={cn("grid", isSignup ? "gap-1.5" : "gap-2")}
              >
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            {errorMessage ? (
              <p
                className={cn(
                  "rounded-2xl border border-red-200 bg-red-50 px-4 text-red-700",
                  isSignup ? "py-2.5 text-[0.95rem]" : "py-3 text-sm",
                )}
              >
                {errorMessage}
              </p>
            ) : null}
            {successMessage ? (
              <p
                className={cn(
                  "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 text-emerald-700",
                  isSignup ? "py-2.5 text-[0.95rem]" : "py-3 text-sm",
                )}
              >
                {successMessage}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button type="submit" disabled={mutation.isPending}>
                {submitLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
              {secondaryLink ? (
                <Link
                  href={secondaryLink.href}
                  className="soft-glow-link font-bold text-[var(--accent-brand)]"
                >
                  {secondaryLink.label}
                </Link>
              ) : null}
            </div>
          </form>
          <p
            className={cn(
              "flex flex-wrap items-center gap-2 text-[var(--muted-text)]",
              isSignup ? "mt-4" : "mt-5",
            )}
          >
            <span>{footerText}</span>
            <Link
              href={footerLinkHref}
              className={cn(
                "animated-underline-link text-sm transition-colors",
                isLoginSignupFooterLink
                  ? "font-extrabold tracking-[-0.01em]"
                  : "font-bold",
                footerLinkTone,
                footerLinkEffect,
              )}
            >
              {footerLinkLabel}
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthSplitShell>
  );
}
