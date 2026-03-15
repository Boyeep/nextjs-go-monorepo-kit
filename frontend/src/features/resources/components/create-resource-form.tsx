"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createEntry, createResource } from "@/features/resources/services/resource-service";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { ResourceBuilderSidebar } from "@/features/resources/components/resource-builder-sidebar";
import { ResourceEntryStep, type ResourceEntryDraft } from "@/features/resources/components/resource-entry-step";
import { ResourceMetaStep, type ResourceMeta } from "@/features/resources/components/resource-meta-step";
import { Button } from "@/components/ui/button";

export function CreateResourceForm() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const [step, setStep] = useState(0);
  const [meta, setMeta] = useState<ResourceMeta>({
    madeBy: user?.full_name || user?.username || "",
    title: "",
    description: "",
    numberOfEntries: 3,
  });
  const [entries, setEntries] = useState<ResourceEntryDraft[]>(
    Array.from({ length: 3 }, () => ({ title: "", content: "" }))
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!accessToken) {
        throw new Error("Please log in first to create a resource.");
      }

      const createdResource = await createResource(accessToken, {
        title: meta.title.trim(),
        description: meta.description.trim(),
        visibility: "public",
        status: "published",
        locale: "en",
        estimated_minutes: Math.max(1, meta.numberOfEntries * 2),
      });

      for (const [index, entry] of entries.entries()) {
        await createEntry(accessToken, createdResource.slug, {
          position: index + 1,
          title: entry.title.trim(),
          content: entry.content.trim(),
        });
      }

      return createdResource;
    },
    onSuccess: (createdResource) => {
      setSuccessMessage(`Resource "${createdResource.title}" created successfully.`);
      router.push("/collections");
      router.refresh();
    },
    onError: (error) => {
      setErrorMessage(error instanceof Error ? error.message : "Failed to create resource entries.");
    },
  });

  const updateMeta = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const nextValue = name === "numberOfEntries" ? Math.max(1, Number(value) || 1) : value;

    setMeta((current) => ({
      ...current,
      [name]: nextValue,
    }));

    if (name === "numberOfEntries") {
      setEntries((current) => {
        const target = Math.max(1, Number(value) || 1);
        return Array.from({ length: target }, (_, index) => current[index] ?? { title: "", content: "" });
      });
      setStep((current) => Math.min(current, Math.max(0, Number(value) || 1)));
    }
  };

  const updateEntry = (index: number, field: keyof ResourceEntryDraft, value: string) => {
    setEntries((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleNext = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (step === 0) {
      if (!meta.title.trim()) {
        setErrorMessage("Resource title is required.");
        return;
      }

      if (meta.numberOfEntries < 1) {
        setErrorMessage("Number of entries must be at least 1.");
        return;
      }
    }

    if (step > 0) {
      if (!currentEntry.title.trim() || !currentEntry.content.trim()) {
        setErrorMessage("Title and content are required for each entry.");
        return;
      }
    }

    if (step < meta.numberOfEntries) {
      setStep((current) => current + 1);
      return;
    }

    submitMutation.mutate();
  };

  const currentEntry = entries[Math.max(0, step - 1)];

  return (
    <main className="mx-auto my-4 grid w-[min(var(--max-width),calc(100%-2rem))] grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] gap-5 max-[960px]:grid-cols-1 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
      <ResourceBuilderSidebar step={step} entryCount={entries.length} isAuthenticated={Boolean(accessToken)} />

      <section className="rounded-[32px] bg-white/85 p-[clamp(1.5rem,4vw,2rem)] shadow-[var(--shadow)]">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex w-fit rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[0.85rem] font-bold text-[var(--accent-brand)]">
              {step === 0 ? "Resource details" : `Entry ${step}`}
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.8rem)]">
              {step === 0 ? "Create resource" : `Edit entry ${step}`}
            </h2>
          </div>
          <Button asChild variant="secondary">
            <Link href="/collections">Cancel</Link>
          </Button>
        </div>
        {errorMessage ? (
          <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
        ) : null}
        {successMessage ? (
          <p className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </p>
        ) : null}

        {step === 0 ? (
          <ResourceMetaStep
            meta={meta}
            onChange={updateMeta}
            onContinue={handleNext}
            disabled={!accessToken}
          />
        ) : (
          <ResourceEntryStep
            step={step}
            totalEntries={meta.numberOfEntries}
            currentEntry={currentEntry}
            onBack={() => setStep((current) => Math.max(0, current - 1))}
            onNext={handleNext}
            onTitleChange={(value) => updateEntry(step - 1, "title", value)}
            onContentChange={(value) => updateEntry(step - 1, "content", value)}
            disabled={!accessToken || submitMutation.isPending}
            isSubmitting={submitMutation.isPending}
          />
        )}
      </section>
    </main>
  );
}
