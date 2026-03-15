# nextjs-go-monorepo-kit

A full-stack starter monorepo built with Next.js, Go, and PostgreSQL.

It includes a modern frontend app, a layered Go API, authentication flows, dashboard patterns, resource and entry management, local Dockerized development, and CI-ready quality checks.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Go
- PostgreSQL
- Docker Compose

## Monorepo Structure

- `frontend/`: Next.js app with auth, dashboard, collections, resources, and shared UI primitives
- `backend/`: Go API with migrations, auth, analytics, collections, resources, and entry endpoints
- `scripts/`: root development and verification scripts
- `.github/`: repository-level CI workflow

## Why Monorepo

Choose a monorepo if you have a smaller to medium-sized team, projects that are tightly integrated and frequently change together, and you value code sharing and a unified development experience.

This starter fits that model well because the frontend and backend evolve together, share the same local setup flow, and are coordinated through root-level commands.

## Quick Start

1. Run `npm run dev` from the repo root.
2. Docker Compose will start PostgreSQL automatically.
3. The dev script will create `frontend/.env.local` and `backend/.env` from the example files if they do not exist.
4. Frontend and backend will start together.

Frontend: `http://localhost:3000`
Backend: `http://localhost:8080`

## Demo Account

- email: `demo@nextjs-go-kit.local`
- password: `demo12345`

## Commands

```bash
npm run dev
npm run dev:down
npm run check
```

## What You Get

- reusable Next.js + Go monorepo structure
- auth flows with register, login, email verification, and password reset
- resource and entry CRUD patterns for product-specific modules
- protected dashboard and analytics-ready frontend patterns
- Dockerized local database setup
- lint, typecheck, production build, Go test, and Go build checks
- GitHub Actions, Husky, lint-staged, and commitlint support

## Notes

- `npm run check` runs frontend lint, typecheck, build, plus backend tests and build.
- Sample resource fallbacks are disabled by default. Enable them only when you explicitly want demo content with `NEXT_PUBLIC_ENABLE_SAMPLE_FALLBACK=true`.
- Frontend auth tokens are stored in memory instead of persistent browser storage.

## Subproject Docs

- [frontend/README.md](./frontend/README.md)
- [backend/README.md](./backend/README.md)

## Repository Standards

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [LICENSE](./LICENSE)
