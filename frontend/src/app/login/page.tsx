import { AuthFormShell } from "@/features/auth/components/auth-form-shell";

export default function LoginPage() {
  return (
    <AuthFormShell
      mode="login"
      title="Welcome back"
      description="Sign in to manage your resources, account data, and dashboard access."
      submitLabel="Login"
      footerText="Need an account?"
      footerLinkLabel="Sign up"
      footerLinkHref="/signup"
      fields={[
        { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
        { id: "password", label: "Password", type: "password", placeholder: "Enter your password" },
      ]}
      secondaryLink={{ href: "/forgot-password", label: "Forgot password?" }}
    />
  );
}
