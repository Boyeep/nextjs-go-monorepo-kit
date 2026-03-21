# SOON.md

This file tracks the near-term roadmap for `nextjs-go-monorepo-kit`.

The goal is not to turn the template into a kitchen-sink starter. The goal is to keep improving the parts that make the repo safer, easier to customize, and more production-ready.

## Recently Shipped

- OpenAPI contract spec plus generated frontend types
- Playwright smoke testing across the full local stack
- AI-ready repo guidance for multiple coding tools
- Refreshed landing page and site chrome

## Soon

### 1. Backend integration tests with real Postgres

Why:
- This is the biggest confidence upgrade left on the backend side.
- It helps catch repository, migration, and handler wiring issues that unit tests miss.

Likely approach:
- Add DB-backed integration coverage for auth, resources, and entries
- Prefer `Testcontainers for Go` or a similarly clean disposable Postgres setup

### 2. First-class forms and validation patterns

Why:
- Most real apps need create/edit flows quickly.
- The template should show a clear, reusable pattern for validation-heavy forms.

Likely approach:
- Add documented patterns or sample usage for `react-hook-form` and `zod`
- Keep the base template lean, but make the recommended form stack obvious

### 3. Deeper Playwright journeys

Why:
- The smoke suite is a strong baseline, but the next step is real CRUD coverage.
- Browser-level confidence becomes more valuable as the template grows.

Likely approach:
- Add create-resource flow coverage
- Add delete-resource or delete-entry coverage
- Keep tests focused on stable end-to-end journeys rather than UI trivia

### 4. Better deployment and production guidance

Why:
- Local development is strong, but deployment should feel equally polished.
- Templates become much easier to adopt when hosting guidance is explicit.

Likely approach:
- Add deployment docs for common frontend/backend hosting combinations
- Add environment-variable guidance and production setup notes
- Add a lightweight production checklist

### 5. Customization guide for turning the template into a real product

Why:
- Good templates should make the first rename and replacement steps obvious.
- Users should quickly understand what is demo scaffolding versus core architecture.

Likely approach:
- Add a guide for replacing the sample resource domain
- Document which files to edit first for branding, routing, and data-model changes

### 6. Smooth out release-please PR checks and branch-protection friction

Why:
- Release PRs can get stuck showing required checks as `Expected` when they are created with the default `github.token`.
- That makes the maintainer flow feel more brittle than it should for a template repo.

Likely approach:
- Prefer a real `RELEASE_PLEASE_TOKEN` so `Template CI` and `E2E` can run on release PRs normally
- Or keep release PR merge requirements lighter than normal feature PRs if the repo stays solo-maintained

## Next Wave

### 7. API client ergonomics on top of generated contracts

Possible additions:
- typed request helpers derived from the OpenAPI contract
- optional OpenAPI codegen for stronger request/response bindings
- contract validation checks as part of CI if the repo grows in that direction

### 8. Storybook and MSW as optional developer-experience modules

Why:
- Helpful once the UI system and API mocking needs get bigger
- Better as opt-in expansions than as hard base-template dependencies

### 9. Observability starter guidance

Possible additions:
- Sentry setup guide
- analytics and logging guidance
- optional OpenTelemetry notes for larger deployments

## Guardrails

The roadmap should keep following these rules:

- prefer high-leverage improvements over dependency sprawl
- keep the template generic and reusable
- make optional tools easy to adopt without forcing them into the base install
- improve confidence, contracts, docs, and onboarding before adding flashy extras
