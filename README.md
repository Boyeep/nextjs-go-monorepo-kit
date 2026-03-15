# nextjs-go-monorepo-kit

[![Template CI](https://github.com/Boyeep/nextjs-go-monorepo-kit/actions/workflows/template-ci.yml/badge.svg)](https://github.com/Boyeep/nextjs-go-monorepo-kit/actions/workflows/template-ci.yml)
[![Release Please](https://github.com/Boyeep/nextjs-go-monorepo-kit/actions/workflows/release-please.yml/badge.svg)](https://github.com/Boyeep/nextjs-go-monorepo-kit/actions/workflows/release-please.yml)

A full-stack starter monorepo built with Next.js, Go, and PostgreSQL.

It includes a modern frontend app, a layered Go API, authentication flows, dashboard patterns, resource and entry management, local Dockerized development, and CI-ready quality checks.

Built to keep the developer-experience strengths of polished frontend starters while also giving you a production-minded Go backend, shared monorepo workflow, and safer default auth behavior out of the box.

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

## Why This Template Is Strong

- modern stack: Next.js 16, React 19, Tailwind CSS 4, TypeScript 5.9, and Go
- full-stack by default: frontend, backend, Dockerized PostgreSQL, and shared root scripts
- safer defaults: in-memory auth tokens and stricter password-reset handling
- stronger quality gates: strict ESLint, Prettier, Vitest utility and component tests, production build checks, Go test, and Go build
- public-template ready: issue forms, PR template, release automation, contribution guide, security policy, and code of conduct

## What You Get

- reusable Next.js + Go monorepo structure
- auth flows with register, login, email verification, and password reset
- resource and entry CRUD patterns for product-specific modules
- protected dashboard and analytics-ready frontend patterns
- Dockerized local database setup
- lint, format check, utility and component tests, production build, Go test, and Go build checks
- GitHub Actions, Husky, lint-staged, and commitlint support
- release automation workflow for tagged template releases

## Notes

- `npm run check` runs frontend lint, typecheck, build, plus backend tests and build.
- Sample resource fallbacks are disabled by default. Enable them only when you explicitly want demo content with `NEXT_PUBLIC_ENABLE_SAMPLE_FALLBACK=true`.
- Frontend auth tokens are stored in memory instead of persistent browser storage.

## Subproject Docs

- [frontend/README.md](./frontend/README.md)
- [backend/README.md](./backend/README.md)

## Repository Standards

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [LICENSE](./LICENSE)
- [SECURITY.md](./SECURITY.md)
- [docs/expansions.md](./docs/expansions.md)
