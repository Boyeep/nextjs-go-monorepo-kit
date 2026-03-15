# Boyeep Template

This folder is set up as a monorepo containing:

- `frontend/`: Next.js 15 app with auth flows, collection and resource pages, and shared UI components
- `backend/`: Go API with PostgreSQL, migrations, auth, and resource/entry endpoints

## Why Monorepo

Choose a monorepo if you have a smaller to medium-sized team, projects that are tightly integrated and frequently change together, and you value code sharing and a unified development experience.

This template fits that model well because the frontend and backend are developed together, share one local setup flow, and are coordinated by root-level commands.

Quick start:

1. Run `npm run dev` from the repo root.
2. Docker Compose will start PostgreSQL automatically.
3. The script will create `frontend/.env.local` and `backend/.env` from the examples if they do not exist.
4. Frontend and backend will start together.

Demo account:

- email: `demo@boyeep.local`
- password: `demo12345`

Useful commands:

- `npm run dev`
- `npm run dev:down`
- `npm run check`

Notes:

- `npm run check` now runs frontend lint, typecheck, build, plus backend tests and build.
- Sample resource fallbacks are disabled by default; enable them with `NEXT_PUBLIC_ENABLE_SAMPLE_FALLBACK=true` when you explicitly want demo content.
