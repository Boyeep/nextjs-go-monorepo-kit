# Backend Template

This is a Go backend starter for a general full-stack app. It ships with auth,
resource and entry read endpoints, analytics endpoints, PostgreSQL support, and
SQL migrations.

## Stack

- Go
- PostgreSQL
- SQL migrations
- Layered architecture with `handler`, `service`, and `repository`

## Structure

`cmd/api`, `docs`, `internal`, and `migrations`

## Quick Start

1. From the repo root, run `npm run dev` to start Dockerized Postgres plus the frontend and backend together.
2. Or in this folder only: copy `.env.example` to `.env`, run `go mod tidy`, and start the API with `go run ./cmd/api`.

Server health endpoint:

```text
GET /health
```

## Implemented Endpoints

```text
GET  /health
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/me
GET  /api/v1/resources
GET  /api/v1/resources/:slug
GET  /api/v1/resources/:slug/entries
```

`/api/v1/auth/me` expects:

```text
Authorization: Bearer <access_token>
```

## Environment

Most hosts will only need these:

```text
APP_NAME=Next.js Go Monorepo Kit API
APP_ENV=production
PORT=8080
APP_BASE_URL=https://your-api-host.com
CORS_ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=postgres://...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
DEMO_SEED_ENABLED=true
```

Notes:
- `DATABASE_URL` is preferred in production.
- `PORT` is supported automatically for Railway/Render/Fly-style platforms.
- `CORS_ALLOWED_ORIGINS` should include your frontend app URL.
- the server now starts with graceful shutdown, request IDs, and basic security headers by default.
- demo seeding can provision a ready-to-use starter account and sample content for local development.

## Database

Core schema is defined in:

- `migrations/000001_init_schema.up.sql`
- `migrations/000001_init_schema.down.sql`
- `docs/database-schema.md`

Apply the migration before starting the API in production.

## Deploying

Recommended setup:
- frontend: Vercel, Netlify, or your preferred host
- backend: Railway, Render, Fly.io, or your preferred host
- database: PostgreSQL-compatible provider of your choice

Suggested flow:

1. Copy this backend directory into its own repository.
2. Push the repo.
3. Provision PostgreSQL.
4. Run `migrations/000001_init_schema.up.sql` on that database.
5. Set the environment variables listed above.
6. Deploy using the included `Dockerfile` or native Go buildpack support.
7. Point the frontend to `https://your-api-host.com/api/v1`.

## Planned Domains

- auth
- users
- resources
- entries
- project-specific modules

## Frontend Integration

Point your frontend services to the Go backend base URL, for example:

```text
http://localhost:8080/api/v1
```

Production example:

```text
https://your-api-host.com/api/v1
```

Good first integrations:
- login
- register
- fetch current user
- fetch public resources
- fetch public entries for a resource

## Password Reset Email

Optional setup with Resend API:

```text
MAIL_FROM=onboarding@resend.dev
RESEND_API_KEY=re_your_resend_api_key
```

Notes:
- `RESEND_API_KEY` is used directly by the backend to send reset emails through Resend.
- For production, verify your own domain in Resend and use a sender like `noreply@yourdomain.com`.

Optional SMTP fallback:

```text
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=your_resend_smtp_password
```
