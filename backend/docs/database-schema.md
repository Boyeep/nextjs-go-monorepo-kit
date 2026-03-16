# Backend Database Schema

## Core Design Goals

- support user accounts and authentication
- allow resources owned by users
- track publishing state and soft ownership metadata
- track user engagement progress over time

## Tables

### `users`

Application accounts.

Key fields:
- `id`
- `username`
- `email`
- `password_hash`
- `role`
- `status`

### `user_sessions`

Refresh-token/session tracking for sign-in management.

Key fields:
- `id`
- `user_id`
- `refresh_token_hash`
- `expires_at`
- `revoked_at`

### `resources`

User-created resources.

Key fields:
- `id`
- `owner_id`
- `slug`
- `title`
- `description`
- `visibility`
- `status`
- `entry_count`

Notes:
- a resource belongs to one owner

### `entries`

Entries that belong to a resource.

Key fields:
- `id`
- `resource_id`
- `position`
- `title`
- `content`
- `details`

### `resource_tags`

Simple tag system for discovery and filtering.

### `user_resource_progress`

Aggregated progress per user per resource.

Key fields:
- `mastery_level`
- `last_accessed_at`
- `times_accessed`
- `entries_completed`

### `user_entry_progress`

Per-entry user engagement state.

Key fields:
- `completed_count`
- `revised_count`
- `last_result`
- `confidence_score`

## Relationship Summary

- one `user` has many `resources`
- one `resource` has many `entries`
- one `user` has many `user_sessions`
- one `user` has many set progress rows
- one `user` has many card progress rows

## First API Modules Suggested

1. `auth`
2. `resources`
3. `entries`
4. `me/progress`
