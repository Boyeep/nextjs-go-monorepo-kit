# AGENTS.md

This repository is a full-stack starter template built to be friendly to AI coding agents as well as human contributors. Use this file as the fast path to understanding the codebase before making changes.

## Mission

- Preserve the repo as a reusable template, not a one-off app.
- Prefer generic, production-minded patterns over product-specific hacks.
- Keep frontend and backend changes coherent across the monorepo.
- Leave the repo in a verifiable state after changes.

## Repo Map

```text
.
|-- frontend/              # Next.js 16 app
|   |-- src/app/           # App Router pages
|   |-- src/components/    # shared UI + site chrome
|   |-- src/features/      # feature-based frontend modules
|   |-- src/layouts/       # app shell composition
|   |-- src/lib/           # config, helpers, API client, site data
|   |-- e2e/               # Playwright smoke tests
|   `-- public/            # static assets + generated sitemap files
|-- backend/               # Go API
|   |-- cmd/api/           # API entrypoint
|   |-- internal/config/   # env/config loading
|   |-- internal/handler/  # HTTP handlers
|   |-- internal/service/  # business logic
|   |-- internal/repository/ # database access + migrations helpers
|   |-- internal/server/   # router + middleware
|   |-- migrations/        # SQL schema migrations
|   `-- docs/              # backend-specific docs
|-- scripts/               # root dev/check/e2e orchestration
|-- docs/                  # repo-level docs
`-- .github/               # CI workflows
```

## Primary Commands

Run these from the repository root unless noted otherwise.

- `npm run dev`
  Starts Dockerized Postgres plus the frontend and backend together. Also creates `frontend/.env.local` and `backend/.env` from examples if missing.
- `npm run dev:down`
  Stops Docker Compose services started for local development.
- `npm run check`
  Main quality gate. Runs frontend lint, format check, typecheck, Vitest, frontend build, backend tests, and backend build.
- `npm run e2e:install`
  Installs the Playwright Chromium browser.
- `npm run e2e`
  Starts a disposable Postgres container, boots the Go API and production Next.js app, then runs Playwright smoke tests.
- `npm run api:types`
  Regenerates `frontend/src/generated/openapi.ts` from `docs/openapi.yaml`. Run this after changing API routes, request bodies, or response shapes.
- `npm run check:contract`
  Regenerates `frontend/src/generated/openapi.ts` and fails if the committed file is out of date.
- `npm run check:workflows`
  Lints `.github/workflows/` with `actionlint` through Go.
- `npm run check:secrets`
  Scans tracked git content with `gitleaks` through Go.

## Definition Of Done

For most code changes, aim to leave the repo passing:

1. `npm run check`
2. `npm run check:contract` for API contract changes
3. `npm run e2e` for changes that touch user-facing flows, routing, auth, startup, or integration behavior

If a task intentionally avoids one of those, explain why.

## Frontend Architecture

- App framework: Next.js App Router in `frontend/src/app/`
- Styling: Tailwind CSS 4 with CSS-first theme tokens in `frontend/src/app/globals.css`
- State:
  - TanStack Query for server state
  - Zustand for client state
- UI structure:
  - shared chrome lives in `frontend/src/components/`
  - route composition lives in `frontend/src/layouts/`
  - domain logic lives in `frontend/src/features/`

### Frontend Conventions

- Prefer working inside an existing feature folder before creating a new pattern.
- Central branding and site metadata live in `frontend/src/lib/app-config.ts`.
- The homepage currently uses `frontend/src/features/home/components/centered-home-page.tsx`.
- Global header/footer are mounted through `frontend/src/layouts/root-shell.tsx`.
- Keep the template generic. Example content is fine; brand-locked product assumptions are not.

### Frontend Gotchas

- Auth is intentionally in-memory only.
  - See `frontend/src/features/auth/store/auth-store.ts`.
  - Do not assume a full page reload preserves login state.
  - Browser tests should prefer in-app navigation after login when session continuity matters.
- `next-sitemap` runs during frontend builds.
  - Config lives in `frontend/next-sitemap.config.js`.
  - Generated files in `frontend/public/` may change after a build.
  - `autoLastmod` is disabled to reduce noisy diffs.
- OpenAPI types are generated, not hand-edited.
  - Source spec lives in `docs/openapi.yaml`.
  - Generated frontend contract lives in `frontend/src/generated/openapi.ts`.
  - If backend request or response shapes change, update the spec, rerun `npm run api:types`, and verify with `npm run check:contract`.
- Header navigation includes `/#about` and `/#contact`, so homepage edits should keep those anchors meaningful unless navigation is updated too.

## Backend Architecture

- Entry point: `backend/cmd/api/main.go`
- Config loading: `backend/internal/config/config.go`
- Router and middleware: `backend/internal/server/router.go`
- Layering:
  - `handler` receives HTTP requests
  - `service` contains business logic
  - `repository` talks to Postgres

### Backend Conventions

- Add routes in `backend/internal/server/router.go`.
- Keep HTTP concerns in handlers and database concerns in repositories.
- Environment loading supports local `.env` files via `godotenv` in the API entrypoint.
- Demo seeding is part of startup and is useful for local development and Playwright smoke tests.

### Backend Gotchas

- Production-style `PORT` support exists, but local defaults still use `8080`.
- The API expects Postgres and runs migrations on startup.
- Owner dashboard access depends on `DASHBOARD_OWNER_EMAIL`.

## Template-Specific Guidance

- Favor reusable names like "resource", "entry", "collection", "dashboard", and "workspace" unless the task explicitly replaces the sample domain.
- Keep docs, scripts, and CI in sync when changing developer workflows.
- If a feature changes the public landing page or smoke-tested text, update the Playwright expectations in `frontend/e2e/smoke.spec.ts`.
- If a build or E2E flow starts mutating committed SEO files unexpectedly, check:
  - `frontend/next-sitemap.config.js`
  - `scripts/e2e.mjs`
  - `frontend/public/robots.txt`
  - `frontend/public/sitemap.xml`
  - `frontend/public/sitemap-0.xml`
- Release automation is managed by `release-please`.
  - Config lives in `release-please-config.json` and `.release-please-manifest.json`.
  - The root `CHANGELOG.md` and `version.txt` are release-managed files.

## Where To Start For Common Tasks

- New or changed frontend page:
  - Start in `frontend/src/app/`
  - Then inspect related feature code in `frontend/src/features/`
- New API endpoint:
  - Add route in `backend/internal/server/router.go`
  - Add handler/service/repository pieces in that order
- Branding or landing-page changes:
  - Check `frontend/src/lib/app-config.ts`
  - Check `frontend/src/components/site-header.tsx`
  - Check `frontend/src/components/site-footer.tsx`
  - Check `frontend/src/features/home/components/`
- Dev workflow or verification changes:
  - Check `scripts/dev.mjs`
  - Check `scripts/check.mjs`
  - Check `scripts/e2e.mjs`
  - Check `.github/workflows/`

## Preferred Agent Behavior

- Read before editing. This template has enough structure that guessing usually creates unnecessary churn.
- Keep changes narrow and aligned with existing patterns.
- Prefer updating tests when behavior intentionally changes.
- Avoid adding dependencies unless they meaningfully improve the template.
- Treat docs as part of the product. If setup or workflow changes, update the docs too.

## Fast Sanity Checklist

- Did you keep the template generic?
- Did you avoid breaking in-memory auth assumptions?
- Did you run `npm run check`?
- Did you run `npm run e2e` when the change touched live flows?
- Did you update docs/tests/CI if the workflow changed?
