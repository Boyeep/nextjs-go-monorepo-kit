# GitHub Copilot Instructions

Use [AGENTS.md](../AGENTS.md) as the primary repository guide. If these instructions and `AGENTS.md` ever diverge, follow `AGENTS.md`.

## Repository Overview

This is a reusable full-stack template with:

- `frontend/`: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- `backend/`: Go API with layered `handler -> service -> repository` architecture
- `scripts/`: root orchestration for dev, checks, and Playwright smoke tests

## Copilot Priorities

- Keep the repository generic and template-friendly.
- Prefer existing patterns over inventing parallel structures.
- Keep frontend and backend changes aligned when behavior spans both.
- Update tests and docs when behavior or workflow changes.

## Commands

Run from the repository root:

- `npm run dev`
- `npm run check:contract`
- `npm run check:workflows`
- `npm run check:secrets`
- `npm run check`
- `npm run e2e:install`
- `npm run e2e`

## Frontend Notes

- Feature code lives under `frontend/src/features/`.
- Shared site chrome lives in `frontend/src/components/`.
- Branding config lives in `frontend/src/lib/app-config.ts`.
- Auth state is intentionally in-memory only. Do not assume full page reloads preserve login state.
- If homepage text changes, update `frontend/e2e/smoke.spec.ts`.

## Backend Notes

- Add routes in `backend/internal/server/router.go`.
- Keep HTTP logic in handlers, business logic in services, and database access in repositories.
- The backend loads local `.env` values for development and runs migrations on startup.

## Verification

Default expectation after non-trivial changes:

1. Run `npm run check`
2. Run `npm run e2e` when changing auth, routing, startup, or integrated flows

## Known Gotchas

- `next-sitemap` runs during frontend builds and writes generated files into `frontend/public/`.
- Playwright smoke tests use the root `scripts/e2e.mjs` orchestrator.
- The header navigation currently expects homepage anchors like `#about` and `#contact`.
