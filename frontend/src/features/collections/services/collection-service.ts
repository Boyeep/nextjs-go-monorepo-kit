import type { paths } from "@/generated/openapi";
import { fetchJson } from "@/lib/api";
import { sampleCollections } from "@/lib/site-data";
import type { Collection } from "@/types/collection";

type CollectionListResponse =
  paths["/api/v1/collections"]["get"]["responses"][200]["content"]["application/json"];

export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await fetchJson<CollectionListResponse>("/collections");
    return response.data;
  } catch {
    return sampleCollections;
  }
}
