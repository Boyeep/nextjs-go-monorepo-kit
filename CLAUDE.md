# CLAUDE.md

Start with [AGENTS.md](./AGENTS.md). This file is a Claude-friendly summary, not the canonical source of truth.

## What This Repo Is

A reusable full-stack starter template with:

- Next.js frontend in [`frontend/`](./frontend)
- Go API in [`backend/`](./backend)
- root scripts in [`scripts/`](./scripts)
- CI workflows in [`.github/workflows/`](./.github/workflows)

The goal is to keep it broadly reusable, production-minded, and easy to customize.

## Working Style

- Read the existing code before editing.
- Preserve the repo as a template instead of hard-coding one business domain.
- Prefer updating existing features and patterns over creating duplicate abstractions.
- Keep documentation and tests in sync with behavior.

## Important Commands

- `npm run dev`
- `npm run check`
- `npm run e2e:install`
- `npm run e2e`

## Architecture Notes

### Frontend

- App Router pages: `frontend/src/app/`
- Shared components: `frontend/src/components/`
- Feature modules: `frontend/src/features/`
- App shell: `frontend/src/layouts/`
- Config/helpers: `frontend/src/lib/`

Important details:

- auth state is stored in memory with Zustand
- branding and metadata come from `frontend/src/lib/app-config.ts`
- the home page is driven by `frontend/src/features/home/components/centered-home-page.tsx`

### Backend

- entrypoint: `backend/cmd/api/main.go`
- config: `backend/internal/config/`
- routing/middleware: `backend/internal/server/`
- handlers: `backend/internal/handler/`
- services: `backend/internal/service/`
- repositories: `backend/internal/repository/`

## Common Pitfalls

- Do not assume reload-safe auth sessions.
- Do not forget to update Playwright expectations when public copy changes.
- Do not introduce environment-specific sitemap churn without checking:
  - `frontend/next-sitemap.config.js`
  - `scripts/e2e.mjs`
  - `frontend/public/sitemap.xml`
  - `frontend/public/sitemap-0.xml`

## Done Means

- `npm run check` passes
- `npm run e2e` passes for user-facing or integration-heavy changes
- docs or workflow files are updated when needed
