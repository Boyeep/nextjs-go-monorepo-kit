# Expansion Ideas

Keep the base template lean, then layer on optional modules as your product needs grow.

## Good First Expansions

- Forms: add `react-hook-form` and `zod` for complex create/edit flows with shared validation.
- Toasts: add a lightweight notification system for async success and error feedback.
- Storybook: add component previews when the design system becomes a larger part of the repo.
- Deeper Playwright coverage: extend the shipped smoke tests into full end-to-end journeys for creation, editing, and deletion flows.
- Background jobs: add a worker process if email, analytics sync, or ingestion workloads grow.

## Suggested Rollout Order

1. Add form validation when your create and edit screens start sharing more logic.
2. Add toasts when API-driven UX needs clearer success and failure feedback.
3. Expand Playwright coverage once the user journeys stabilize and deserve broader browser-level coverage.
4. Add Storybook if the component library becomes a product of its own.

## Keep It Template-Friendly

- Prefer opt-in modules over hard dependencies in the base template.
- Document each expansion in its own guide if setup requires environment variables or new services.
- Reuse the existing `frontend/src/features` and `backend/internal` boundaries instead of creating one-off folders.
