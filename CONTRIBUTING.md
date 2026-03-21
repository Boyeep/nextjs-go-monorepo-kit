# Contributing

Thanks for contributing to `nextjs-go-monorepo-kit`.

## Development Flow

1. Create a branch from `main`.
2. Make focused changes.
3. Run the project checks from the repo root:

```bash
npm run check:contract
npm run check
```

4. Open a pull request with a clear summary of what changed and why.

## Local Setup

```bash
npm run dev
```

This starts the frontend, backend, and Dockerized PostgreSQL together.

Use the Node version pinned in [`.nvmrc`](./.nvmrc) when working on the frontend.

If you change the API contract, also run:

```bash
npm run check:contract
```

If Go is available locally, you can also run:

```bash
npm run check:images
npm run check:workflows
npm run check:secrets
npm run report:licenses
```

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

After a release tag is created, the repo also publishes backend/frontend GHCR images, generates provenance attestations for those images, attaches source/runtime SBOM assets to the GitHub release, and runs release smoke tests against the published images.
