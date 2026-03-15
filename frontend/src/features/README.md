# Features

This folder is now organized by domain instead of by technical layer.

- `collections/`: collection queries, services, and future collection-specific state
- `auth/`: auth APIs, hooks, forms, and session logic
- `resources/`: resource and entry APIs, hooks, and local workflows
- `shared/`: cross-feature infrastructure such as query client and shared UI state

Recommended pattern inside each feature:

- `api/`
- `hooks/`
- `services/`
- `store/`
- `types/`
