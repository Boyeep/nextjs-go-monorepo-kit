import { buildApiUrl } from "@/lib/api";
import { appConfig } from "@/lib/app-config";
import { sampleEntriesByResource, sampleResources } from "@/lib/site-data";
import type { CreateEntryInput, CreateResourceInput, Entry, Resource } from "@/types/resource";

type ResourceResponse = {
  data: Resource;
};

type EntryResponse = {
  data: Entry;
};

type ResourceListResponse = {
  data: Resource[];
};

type EntryListResponse = {
  data: Entry[];
};

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as T | { error?: string };
  if (!response.ok) {
    const message = typeof payload === "object" && payload !== null && "error" in payload ? payload.error : undefined;
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return payload as T;
}

async function parseNoContent(response: Response): Promise<void> {
  if (response.ok) {
    return;
  }

  const payload = (await response.json().catch(() => null)) as { error?: string } | null;
  throw new Error(payload?.error || `Request failed with status ${response.status}`);
}

function canUseSampleFallback() {
  return appConfig.enableSampleFallback;
}

export async function createResource(accessToken: string, input: CreateResourceInput): Promise<Resource> {
  const response = await fetch(buildApiUrl("/resources"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(input),
  });

  const payload = await parseResponse<ResourceResponse>(response);
  return payload.data;
}

export async function createEntry(accessToken: string, slug: string, input: CreateEntryInput): Promise<Entry> {
  const response = await fetch(buildApiUrl(`/resources/${slug}/entries`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(input),
  });

  const payload = await parseResponse<EntryResponse>(response);
  return payload.data;
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

export async function deleteEntry(accessToken: string, id: string): Promise<void> {
  const response = await fetch(buildApiUrl(`/entries/${id}`), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return parseNoContent(response);
}

export async function deleteResource(accessToken: string, slug: string): Promise<void> {
  const response = await fetch(buildApiUrl(`/resources/${slug}`), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return parseNoContent(response);
}
