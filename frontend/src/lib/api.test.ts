import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildApiUrl, fetchJson, getApiBaseUrl } from "./api";

describe("api helpers", () => {
  const originalApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_BASE_URL = originalApiBaseUrl;
    global.fetch = originalFetch;
  });

  it("uses the configured public api base url", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com/v1/";

    expect(getApiBaseUrl()).toBe("https://api.example.com/v1/");
    expect(buildApiUrl("/health")).toBe("https://api.example.com/v1/health");
  });

  it("falls back to the default api base url", () => {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;

    expect(getApiBaseUrl()).toBe("http://localhost:8080/api/v1");
    expect(buildApiUrl("auth/me")).toBe("http://localhost:8080/api/v1/auth/me");
  });

  it("returns parsed json for successful requests", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: { ok: true } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ) as typeof fetch;

    await expect(
      fetchJson<{ data: { ok: boolean } }>("/health"),
    ).resolves.toEqual({
      data: { ok: true },
    });
  });

  it("throws ApiError with backend error payload", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: "Not allowed" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }),
    ) as typeof fetch;

    await expect(fetchJson("/protected")).rejects.toMatchObject({
      name: "ApiError",
      message: "Not allowed",
      status: 403,
    });
  });
});
