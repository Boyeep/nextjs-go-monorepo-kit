import { ConfirmEmailPageClient } from "@/features/auth/components/confirm-email-page-client";

type ConfirmEmailPageProps = {
  searchParams: Promise<{
    email?: string;
  }>;
};

export default async function ConfirmEmailPage({ searchParams }: ConfirmEmailPageProps) {
  const params = await searchParams;

  return <ConfirmEmailPageClient email={params.email} />;
}
