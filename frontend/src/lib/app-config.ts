const DEFAULT_APP_NAME = "Next.js Go Monorepo Kit";
const DEFAULT_APP_URL = "http://localhost:3000";

function normalizeUrl(value: string) {
  try {
    return new URL(value);
  } catch {
    return new URL(DEFAULT_APP_URL);
  }
}

function buildInitials(name: string) {
  const letters = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return letters || "FT";
}

export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME?.trim() || DEFAULT_APP_NAME,
  url: normalizeUrl(process.env.NEXT_PUBLIC_APP_URL?.trim() || DEFAULT_APP_URL),
  description: "General-purpose full-stack app template with auth, protected flows, sample content modules, and production-ready defaults.",
  enableSampleFallback: process.env.NEXT_PUBLIC_ENABLE_SAMPLE_FALLBACK === "true",
  demo: {
    email: process.env.NEXT_PUBLIC_DEMO_EMAIL?.trim() || "",
    password: process.env.NEXT_PUBLIC_DEMO_PASSWORD?.trim() || "",
  },
};

export const brandInitials = buildInitials(appConfig.name);
