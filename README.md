# nextjs-go-monorepo-kit

[![npm version](https://img.shields.io/npm/v/%40boyeep%2Fnextjs-go-monorepo-kit)](https://www.npmjs.com/package/@boyeep/nextjs-go-monorepo-kit) [![npm downloads](https://img.shields.io/npm/dm/%40boyeep%2Fnextjs-go-monorepo-kit)](https://www.npmjs.com/package/@boyeep/nextjs-go-monorepo-kit) [![license](https://img.shields.io/npm/l/%40boyeep%2Fnextjs-go-monorepo-kit)](https://www.npmjs.com/package/@boyeep/nextjs-go-monorepo-kit)

Create a project directly from npm:

```bash
npx @boyeep/nextjs-go-monorepo-kit my-go-app
```


[![Template CI](https://github.com/Boyeep/nextjs-go-monorepo-kit/actions/workflows/template-ci.yml/badge.svg)](https://github.com/Boyeep/nextjs-go-monorepo-kit/actions/workflows/template-ci.yml)
[![E2E](https://github.com/Boyeep/nextjs-go-monorepo-kit/actions/workflows/e2e.yml/badge.svg)](https://github.com/Boyeep/nextjs-go-monorepo-kit/actions/workflows/e2e.yml)

A full-stack starter monorepo built with Next.js, Go, and PostgreSQL.

It includes a modern frontend app, a layered Go API, authentication flows, a protected dashboard, local Dockerized development, and CI-ready quality checks.

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

- `frontend/`: Next.js app with auth, dashboard, and shared UI primitives
- `backend/`: Go API with migrations, auth, and analytics endpoints
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
npm run api:types
npm run check:contract
npm run check:workflows
npm run check:secrets
npm run check
npm run e2e:install
npm run e2e
```

## API Contracts

- `docs/openapi.yaml` is the source of truth for the HTTP contract exposed by the Go API.
- `frontend/src/generated/openapi.ts` is generated from that spec with `openapi-typescript`.
- Run `npm run api:types` after changing API routes, payloads, or response shapes so the frontend stays aligned with the backend.
- Run `npm run check:contract` to ensure generated types are committed and in sync.

## Why This Template Is Strong

- modern stack: Next.js 16, React 19, Tailwind CSS 4, TypeScript 5.9, and Go
- full-stack by default: frontend, backend, Dockerized PostgreSQL, and shared root scripts
- safer defaults: in-memory auth tokens and stricter password-reset handling
- stronger quality gates: strict ESLint, Prettier, Vitest utility and component tests, production build checks, Go test, and Go build
- maintainer guardrails: contract drift checks, workflow lint, secret scan, and Dependabot
- security visibility: CodeQL and tracked-content secret scanning
- end-to-end confidence: Playwright smoke tests that boot the full local stack
- team-ready: security guidance, dependency updates, and repeatable quality checks

## What You Get

- reusable Next.js + Go monorepo structure
- auth flows with register, login, email verification, and password reset
- protected dashboard and analytics-ready frontend patterns
- Dockerized local database setup
- lint, format check, utility tests, component tests, Playwright smoke tests, production build, Go test, and Go build checks
- focused GitHub Actions validation

## Notes

- `npm run check` runs frontend lint, typecheck, build, plus backend tests and build.
- `npm run check:contract` reruns OpenAPI type generation and fails if `frontend/src/generated/openapi.ts` drifted.
- `npm run check:workflows` lints GitHub Actions workflows with `actionlint`.
- `npm run check:secrets` scans tracked git content with `gitleaks`.
- Run `npm run e2e:install` once on a new machine to install the Playwright browser.
- `npm run e2e` starts PostgreSQL, the Go API, and the Next.js app before running Playwright smoke tests.
- Frontend auth tokens are stored in memory instead of persistent browser storage.

## Security Automation

- CodeQL scans JavaScript/TypeScript, Go, and GitHub Actions code on GitHub.

## Subproject Docs

- [frontend/README.md](./frontend/README.md)
- [backend/README.md](./backend/README.md)

## Project Docs

- [Security](./docs/security.md)
- [docs/tooling.md](./docs/tooling.md)
