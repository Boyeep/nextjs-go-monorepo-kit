import { AuthFormShell } from "@/features/auth/components/auth-form-shell";

export default function LoginPage() {
  return (
    <AuthFormShell
      mode="login"
      title="Welcome back"
      description="Sign in to access your account, private dashboard, and protected starter flows."
      submitLabel="Login"
      footerText="Need an account?"
      footerLinkLabel="Sign up"
      footerLinkHref="/signup"
      fields={[
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        {
          id: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      ]}
      secondaryLink={{ href: "/forgot-password", label: "Forgot password?" }}
    />
  );
}
