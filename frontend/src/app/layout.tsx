import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import { PlausibleAnalytics } from "@/components/plausible-analytics";
import { VercelAnalytics } from "@/components/vercel-analytics";
import { RootShell } from "@/layouts/root-shell";
import { appConfig } from "@/lib/app-config";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: appConfig.url,
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  applicationName: appConfig.name,
  keywords: [
    "Next.js template",
    "Go API",
    "full-stack starter",
    "owner dashboard",
    "auth starter",
  ],
  openGraph: {
    title: appConfig.name,
    description: appConfig.description,
    url: appConfig.url,
    siteName: appConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.name,
    description: appConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
        <RootShell>{children}</RootShell>
        <PlausibleAnalytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
