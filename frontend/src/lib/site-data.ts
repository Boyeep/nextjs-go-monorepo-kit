import type { Entry, Resource } from "@/types/resource";

export const whyChooseUs = [
  {
    icon: "🧩",
    title: "Modular by default",
    description:
      "Start with a reusable structure, then swap the starter patterns for your own domain.",
  },
  {
    icon: "🚀",
    title: "Ready to ship",
    description:
      "Includes auth flows, API wiring, and polished UI patterns so you can move faster.",
  },
  {
    icon: "🔌",
    title: "Easy to adapt",
    description:
      "The layout, auth flow, and dashboard shells are meant to be renamed, reshaped, or replaced.",
  },
  {
    icon: "📈",
    title: "Built-in patterns",
    description:
      "Use the existing dashboard, list, detail, and form flows as a starting point.",
  },
];

export const featuredTemplates = [
  {
    title: "Starter Catalog",
    description: "Example product direction",
    category: "Catalog",
  },
  {
    title: "Team Workspace",
    description: "Admin and member-facing flows",
    category: "Product",
  },
  {
    title: "Content Hub",
    description: "Publishing-friendly structure",
    category: "Content",
  },
  {
    title: "Client Portal",
    description: "Private resources and account tools",
    category: "Portal",
  },
  {
    title: "Operations Suite",
    description: "Dashboard-oriented patterns",
    category: "Ops",
  },
];

export const sampleResources: Resource[] = [
  {
    id: "resource-client-onboarding",
    owner_id: "demo-owner",
    slug: "client-onboarding-kit",
    title: "Client Onboarding Kit",
    description:
      "A reusable resource with milestone checklists, welcome copy, and delivery notes.",
    visibility: "public",
    status: "published",
    locale: "en",
    entry_count: 3,
    estimated_minutes: 8,
    created_at: "2026-01-02T00:00:00.000Z",
    updated_at: "2026-01-02T00:00:00.000Z",
  },
  {
    id: "resource-content-brief",
    owner_id: "demo-owner",
    slug: "content-brief-template",
    title: "Content Brief Template",
    description:
      "A sample publishing resource you can adapt for editorial workflows and approvals.",
    visibility: "public",
    status: "published",
    locale: "en",
    entry_count: 3,
    estimated_minutes: 6,
    created_at: "2026-01-03T00:00:00.000Z",
    updated_at: "2026-01-03T00:00:00.000Z",
  },
];

export const sampleEntriesByResource: Record<string, Entry[]> = {
  "client-onboarding-kit": [
    {
      id: "entry-1",
      resource_id: "resource-client-onboarding",
      position: 1,
      title: "Welcome note",
      content: "Outline what new clients should expect in their first week.",
      created_at: "2026-01-02T00:00:00.000Z",
      updated_at: "2026-01-02T00:00:00.000Z",
    },
    {
      id: "entry-2",
      resource_id: "resource-client-onboarding",
      position: 2,
      title: "Project kickoff checklist",
      content:
        "Capture approvals, contacts, timelines, and delivery milestones.",
      created_at: "2026-01-02T00:00:00.000Z",
      updated_at: "2026-01-02T00:00:00.000Z",
    },
    {
      id: "entry-3",
      resource_id: "resource-client-onboarding",
      position: 3,
      title: "Shared workspace guide",
      content:
        "Document where files live, how feedback works, and who owns each next step.",
      created_at: "2026-01-02T00:00:00.000Z",
      updated_at: "2026-01-02T00:00:00.000Z",
    },
  ],
  "content-brief-template": [
    {
      id: "entry-4",
      resource_id: "resource-content-brief",
      position: 1,
      title: "Audience summary",
      content: "Describe the target reader, use case, and primary intent.",
      created_at: "2026-01-03T00:00:00.000Z",
      updated_at: "2026-01-03T00:00:00.000Z",
    },
    {
      id: "entry-5",
      resource_id: "resource-content-brief",
      position: 2,
      title: "Key messages",
      content:
        "List the main takeaways the content should communicate clearly.",
      created_at: "2026-01-03T00:00:00.000Z",
      updated_at: "2026-01-03T00:00:00.000Z",
    },
    {
      id: "entry-6",
      resource_id: "resource-content-brief",
      position: 3,
      title: "Distribution plan",
      content:
        "Record publication channels, launch timing, and success metrics.",
      created_at: "2026-01-03T00:00:00.000Z",
      updated_at: "2026-01-03T00:00:00.000Z",
    },
  ],
};
