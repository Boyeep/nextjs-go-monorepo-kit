# Frontend Template

This is a Next.js starter for a general full-stack app with authentication,
dashboard patterns, analytics hooks, and a feature-based `src` layout.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- TanStack Query
- Zustand
- Lucide React

## Project Structure

```text
src/
  app/
  components/
  features/
    auth/
    dashboard/   # private owner workspace
    resources/   # resource/detail module
    home/
    shared/
  layouts/
  lib/
  types/
```

## Getting Started

1. From the repo root, run `npm run dev` for the fastest setup.
2. Or in this folder only: copy `.env.example` to `.env.local`, install dependencies with `npm install`, and run `npm run dev`.

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run e2e:test
npm run format
npm run typecheck
```

## Environment Variables

```bash
NEXT_PUBLIC_APP_NAME=Next.js Go Monorepo Kit
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_DASHBOARD_OWNER_EMAIL=demo@nextjs-go-kit.local
NEXT_PUBLIC_ENABLE_SAMPLE_FALLBACK=false
```

The template now includes:

- centralized app metadata and branding config
- Tailwind CSS 4 with CSS-first theme tokens in `src/app/globals.css`
- a timeout-aware API client with typed API errors
- polished global `loading`, `error`, and `not-found` app states
- optional sample data fallbacks, enabled only when `NEXT_PUBLIC_ENABLE_SAMPLE_FALLBACK=true`
- demo credentials surfaced on the login screen for local development
- in-memory auth session storage so access tokens are not persisted across browser refreshes
- Vitest coverage for frontend utility and component behavior
- Playwright smoke coverage for live browser flows against the full stack

## Quality Tooling

- Husky for local git hooks
- lint-staged for pre-commit checks
- Commitlint for conventional commits
- strict ESLint, Prettier, and TypeScript checks
- Vitest with React Testing Library for frontend verification
- Playwright for browser-level smoke tests
- GitHub Actions CI for lint, format, typecheck, test, and build

## Sitemap

`next-sitemap` runs after production builds and generates sitemap metadata based on
the configured site URL.

## License

Choose and add your own license before publishing this template.
