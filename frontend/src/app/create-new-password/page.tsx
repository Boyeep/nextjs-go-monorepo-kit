import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

type CreateNewPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function CreateNewPasswordPage({
  searchParams,
}: CreateNewPasswordPageProps) {
  const params = await searchParams;

  return <ResetPasswordForm token={params.token} />;
}
