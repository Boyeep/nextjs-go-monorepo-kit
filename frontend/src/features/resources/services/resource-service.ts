import type { paths } from "@/generated/openapi";
import { buildApiUrl } from "@/lib/api";
import { appConfig } from "@/lib/app-config";
import { sampleEntriesByResource, sampleResources } from "@/lib/site-data";
import type { Entry, Resource } from "@/types/resource";

type ResourceResponse =
  paths["/api/v1/resources/{slug}"]["get"]["responses"][200]["content"]["application/json"];
type ResourceListResponse =
  paths["/api/v1/resources"]["get"]["responses"][200]["content"]["application/json"];
type EntryListResponse =
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

export async function getResources(): Promise<Resource[]> {
  try {
    const response = await fetch(buildApiUrl("/resources"), {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    });

    const payload = await parseResponse<ResourceListResponse>(response);
    return payload.data;
  } catch {
    if (!canUseSampleFallback()) {
      throw new Error("Failed to load resources from the API.");
    }
    return sampleResources;
  }
}

export async function getResource(slug: string): Promise<Resource> {
  try {
    const response = await fetch(buildApiUrl(`/resources/${slug}`), {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    });

    const payload = await parseResponse<ResourceResponse>(response);
    return payload.data;
  } catch {
    if (!canUseSampleFallback()) {
      throw new Error("Failed to load resource from the API.");
    }
    const fallback = sampleResources.find((resource) => resource.slug === slug);
    if (!fallback) {
      throw new Error("Resource not found");
    }
    return fallback;
  }
}

export async function getEntriesByResource(slug: string): Promise<Entry[]> {
  try {
    const response = await fetch(buildApiUrl(`/resources/${slug}/entries`), {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    });

    const payload = await parseResponse<EntryListResponse>(response);
    return payload.data;
  } catch {
    if (!canUseSampleFallback()) {
      throw new Error("Failed to load resource entries from the API.");
    }
    return sampleEntriesByResource[slug] ?? [];
  }
}
