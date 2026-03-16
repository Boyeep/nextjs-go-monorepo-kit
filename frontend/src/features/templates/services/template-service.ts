import type { paths } from "@/generated/openapi";
import { buildApiUrl } from "@/lib/api";
import { appConfig } from "@/lib/app-config";
import { sampleSectionsByTemplate, sampleTemplates } from "@/lib/site-data";
import type { Template, TemplateSection } from "@/types/template";

type TemplateResponse =
  paths["/api/v1/resources/{slug}"]["get"]["responses"][200]["content"]["application/json"];
type TemplateListResponse =
  paths["/api/v1/resources"]["get"]["responses"][200]["content"]["application/json"];
type TemplateSectionListResponse =
  paths["/api/v1/resources/{slug}/entries"]["get"]["responses"][200]["content"]["application/json"];

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T | { error?: string };
  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && "error" in payload
        ? payload.error
        : undefined;
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return payload as T;
}

function canUseSampleFallback() {
  return appConfig.enableSampleFallback;
}

export async function getTemplates(): Promise<Template[]> {
  try {
    const response = await fetch(buildApiUrl("/resources"), {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    });

    const payload = await parseResponse<TemplateListResponse>(response);
    return payload.data;
  } catch {
    if (!canUseSampleFallback()) {
      throw new Error("Failed to load templates from the API.");
    }
    return sampleTemplates;
  }
}

export async function getTemplate(slug: string): Promise<Template> {
  try {
    const response = await fetch(buildApiUrl(`/resources/${slug}`), {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    });

    const payload = await parseResponse<TemplateResponse>(response);
    return payload.data;
  } catch {
    if (!canUseSampleFallback()) {
      throw new Error("Failed to load template from the API.");
    }
    const fallback = sampleTemplates.find((template) => template.slug === slug);
    if (!fallback) {
      throw new Error("Template not found");
    }
    return fallback;
  }
}

export async function getSectionsByTemplate(
  slug: string,
): Promise<TemplateSection[]> {
  try {
    const response = await fetch(buildApiUrl(`/resources/${slug}/entries`), {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    });

    const payload = await parseResponse<TemplateSectionListResponse>(response);
    return payload.data;
  } catch {
    if (!canUseSampleFallback()) {
      throw new Error("Failed to load template sections from the API.");
    }
    return sampleSectionsByTemplate[slug] ?? [];
  }
}
