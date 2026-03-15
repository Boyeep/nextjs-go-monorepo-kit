# Contributing

Thanks for contributing to `nextjs-go-monorepo-kit`.

## Development Flow

1. Create a branch from `main`.
2. Make focused changes.
3. Run the project checks from the repo root:

```bash
npm run check
```

4. Open a pull request with a clear summary of what changed and why.

## Local Setup

```bash
npm run dev
```

This starts the frontend, backend, and Dockerized PostgreSQL together.

Use the Node version pinned in [`.nvmrc`](./.nvmrc) when working on the frontend.

## Commit Style

This repo uses conventional commit messages. Examples:

- `feat: add billing settings page`
- `fix: prevent stale auth session on refresh`
- `docs: update deployment instructions`

## Scope

Good contributions for this template include:

- bug fixes
- DX improvements
- documentation improvements
- reusable starter features
- test and CI improvements

Please avoid adding product-specific business logic that makes the starter less reusable.

## Community Standards

- Follow the expectations in [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
- Report vulnerabilities through the process in [SECURITY.md](./SECURITY.md), not public issues.

## Releases

This repository includes a `release-please` workflow for automated release PRs and tags on `main`.
