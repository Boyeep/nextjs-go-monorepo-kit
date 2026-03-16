import { redirect } from "next/navigation";

type LegacyResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LegacyResourcePage({
  params,
}: LegacyResourcePageProps) {
  const { slug } = await params;
  redirect(`/templates/${slug}`);
}
