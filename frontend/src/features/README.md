# Features

This folder is now organized by domain instead of by technical layer.

- `auth/`: auth APIs, hooks, forms, and session logic
- `dashboard/`: private owner views and analytics-facing screens
- `templates/`: public template detail pages and sample section APIs
- `shared/`: cross-feature infrastructure such as query client and shared UI state

Recommended pattern inside each feature:

- `api/`
- `hooks/`
- `services/`
- `store/`
- `types/`
