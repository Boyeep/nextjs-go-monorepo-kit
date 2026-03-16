import type { Template, TemplateSection } from "@/types/template";

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
    description: "Private templates and account tools",
    category: "Portal",
  },
  {
    title: "Operations Suite",
    description: "Dashboard-oriented patterns",
    category: "Ops",
  },
];

export const sampleTemplates: Template[] = [
  {
    id: "resource-client-onboarding",
    owner_id: "demo-owner",
    slug: "client-onboarding-kit",
    title: "Client Onboarding Kit",
    description:
      "A reusable template with milestone checklists, welcome copy, and delivery notes.",
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
      "A sample publishing template you can adapt for editorial workflows and approvals.",
    visibility: "public",
    status: "published",
    locale: "en",
    entry_count: 3,
    estimated_minutes: 6,
    created_at: "2026-01-03T00:00:00.000Z",
    updated_at: "2026-01-03T00:00:00.000Z",
  },
];

export const sampleSectionsByTemplate: Record<string, TemplateSection[]> = {
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
