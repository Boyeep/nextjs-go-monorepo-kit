import { AuthFormShell } from "@/features/auth/components/auth-form-shell";

export default function SignUpPage() {
  return (
    <AuthFormShell
      mode="signup"
      title="Create your account"
      description="Daftar untuk mulai belajar dengan alur yang lebih ringan, cepat, dan menyenangkan."
      submitLabel="Sign up"
      footerText="Sudah punya akun?"
      footerLinkLabel="Login"
      footerLinkHref="/login"
      fields={[
        { id: "username", label: "Username", type: "text", placeholder: "Enter your username" },
        { id: "full_name", label: "Full name", type: "text", placeholder: "Enter your full name" },
        { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
        { id: "password", label: "Password", type: "password", placeholder: "Enter your password" },
        { id: "confirm_password", label: "Confirm password", type: "password", placeholder: "Confirm your password" },
      ]}
    />
  );
}
