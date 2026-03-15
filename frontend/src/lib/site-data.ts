import type { Collection } from "@/types/collection";
import type { Entry, Resource } from "@/types/resource";

export const whyChooseUs = [
  {
    icon: "🧩",
    title: "Modular by default",
    description:
      "Start with a reusable structure, then swap the sample modules for your own domain.",
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
      "Collections and resources act as example modules you can rename or replace.",
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
    description: "Example collection group",
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

export const collectionCategories = [
  "All",
  "Catalog",
  "Product",
  "Content",
  "Portal",
  "Ops",
];

export const catalogCollections = [
  {
    title: "Onboarding Checklist",
    author: "Alex",
    category: "Ops",
    summary:
      "A sample internal workflow resource you can replace with your own data model.",
  },
  {
    title: "Product Launch Plan",
    author: "Jamie",
    category: "Product",
    summary:
      "An example collection item for planning, collaboration, and delivery.",
  },
  {
    title: "Content Calendar",
    author: "Morgan",
    category: "Content",
    summary:
      "A demo entry showing how scheduled content could appear in the UI.",
  },
  {
    title: "Client Resource Pack",
    author: "Taylor",
    category: "Portal",
    summary: "A sample private resource collection for clients or customers.",
  },
  {
    title: "Asset Library",
    author: "Jordan",
    category: "Catalog",
    summary:
      "A generic catalog example suitable for media, docs, templates, or inventory.",
  },
];

export const sampleCollectionIdeas = [
  {
    title: "Starter Collection",
    description:
      "Use this module as a base for catalogs, departments, workspaces, or content groups.",
    category: "Catalog",
  },
  {
    title: "Operations Playbook",
    description:
      "A sample collection for team processes, SOPs, and internal resources.",
    category: "Ops",
  },
  {
    title: "Product Workspace",
    description:
      "An example top-level grouping for features, roadmaps, or customer journeys.",
    category: "Product",
  },
  {
    title: "Content Workspace",
    description:
      "A flexible set of pages and resources for editorial or media-heavy projects.",
    category: "Content",
  },
  {
    title: "Client Portal",
    description:
      "A reusable pattern for authenticated resources, downloads, and account tools.",
    category: "Portal",
  },
];

export const sampleCollections: Collection[] = sampleCollectionIdeas.map(
  (item, index) => ({
    id: `collection-${index + 1}`,
    slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    title: item.title,
    category: item.category,
    description: item.description,
    summary: item.description,
    published: true,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  }),
);

export const sampleResources: Resource[] = [
  {
    id: "resource-client-onboarding",
    owner_id: "demo-owner",
    collection_id: sampleCollections[4]?.id,
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
    collection_id: sampleCollections[3]?.id,
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
