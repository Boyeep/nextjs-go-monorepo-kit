import { AuthFormShell } from "@/features/auth/components/auth-form-shell";

export default function ForgotPasswordPage() {
  return (
    <AuthFormShell
      mode="forgot-password"
      title="Reset password"
      description="Masukkan email akunmu, lalu kami akan kirim instruksi untuk membuat password baru."
      submitLabel="Send email"
      footerText="Ingat password?"
      footerLinkLabel="Login"
      footerLinkHref="/login"
      fields={[
        { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
      ]}
    />
  );
}
