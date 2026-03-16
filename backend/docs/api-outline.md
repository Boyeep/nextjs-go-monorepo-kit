# Initial API Outline

## Health

- `GET /health`

## Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

Implemented now:
- register
- login
- me

Planned next:
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`

## Resources

- `GET /api/v1/resources`
- `GET /api/v1/resources/:slug`

Implemented now:
- list public resources
- get resource by slug

## Entries

- `GET /api/v1/resources/:slug/entries`

Implemented now:
- list public entries for a public published resource

## Progress

- `GET /api/v1/me/progress`
- `POST /api/v1/me/entries/:id/interact`
