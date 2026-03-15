# Tooling Reference

This page answers a practical question for template users:

What tools are already here, and what other high-quality tools are worth adding when you want to make the website better?

The short answer:

- the template already includes a strong base
- you do not need to add a lot of tools at once
- the best additions depend on your product type

## Already In The Template

These are already part of the current starter or its immediate UI architecture.

| Tool | Status | What it is good for | Notes |
| --- | --- | --- | --- |
| Next.js 16 | Installed | app routing, rendering, server/client composition | core frontend framework |
| React 19 | Installed | UI composition and app behavior | pairs with the App Router setup |
| Tailwind CSS 4 | Installed | fast, consistent styling | theme tokens live in `frontend/src/app/globals.css` |
| shadcn/ui pattern | Installed pattern | accessible, editable UI components | ideal for building your own system, not depending on a sealed package |
| Radix UI primitives | Installed | accessible low-level UI behavior | currently used for things like dialogs, labels, selects, and slots |
| Lucide React | Installed | clean icon set | best for most app UI icons |
| TanStack Query | Installed | server state, caching, request lifecycle | use for API-backed screens |
| Zustand | Installed | lightweight client state | good for local app state like auth/session UI state |
| class-variance-authority | Installed | variant-driven component styling | useful for reusable design-system components |
| tailwind-merge + clsx | Installed | safe class composition | helps keep component styles maintainable |
| Vitest + Testing Library | Installed | unit/component testing | use for frontend behavior tests |
| Playwright | Installed | end-to-end browser coverage | root `npm run e2e` boots the full stack |
| next-sitemap | Installed | sitemap and robots generation | runs after frontend builds |
| Vercel Analytics | Installed | lightweight web analytics | optional, already wired as a hook |

## Best Optional Additions

These are the strongest next tools to consider. They are grouped by problem, not by hype.

## Forms And Validation

### React Hook Form

- Best when you want practical forms quickly.
- Great fit with shadcn/ui patterns and common app forms.
- Strong default recommendation for CRUD-heavy products.
- Official docs: https://www.react-hook-form.com/

### Zod

- Best when you want runtime validation plus TypeScript-friendly schemas.
- Strong pair with React Hook Form for form validation and input parsing.
- Also useful for validating env vars, API payloads, and shared domain objects.
- Official docs: https://zod.dev/

### TanStack Form

- Best when your team wants a more headless, deeply typed form system.
- Worth considering if you are already very comfortable with the TanStack style.
- Usually a better fit for advanced apps than for simple marketing forms.
- Official docs: https://tanstack.com/form/docs

Recommendation:

- Start with `React Hook Form + Zod`
- choose `TanStack Form` only if you want its headless model on purpose

## Advanced UI And Interaction

### Motion

- Best for meaningful page transitions, staggered reveals, shared layout animation, and gesture-heavy UI.
- Use when CSS transitions start to feel limiting.
- Keep it targeted; do not animate everything.
- Official docs: https://motion.dev/docs/react

### Embla Carousel

- Best for swipe-friendly sliders and carousels without bloated UI assumptions.
- Good fit for landing pages, testimonials, media rails, and product galleries.
- Official docs: https://www.embla-carousel.com/

### TanStack Table

- Best for serious data tables, admin screens, and dashboards.
- Especially strong when you need sorting, filtering, pagination, row selection, and custom rendering.
- Headless by design, so it fits this template well.
- Official docs: https://tanstack.com/table/docs

## Content, Editing, And Localization

### Tiptap

- Best for rich text editors, internal notes, CMS-style editing, comments, and collaborative content.
- Strong choice if your product has document-like editing or user-generated content.
- Official docs: https://tiptap.dev/docs

### next-intl

- Best for localization in Next.js apps.
- Use when the product needs multiple languages, localized routing, or structured translation handling.
- Official docs: https://next-intl.dev/

## Auth And Identity

This template already ships with auth flows in the Go backend. Do not casually layer a second auth system on top. If you choose a new auth stack, do it intentionally and replace the current flow cleanly.

### Better Auth

- Best when you want to own auth logic but still move faster than building everything by hand.
- Strong feature set for TypeScript-heavy teams, including plugins and multi-tenant features.
- Good option if you want auth inside your app architecture rather than fully outsourced.
- Official docs: https://www.better-auth.com/

### Auth.js

- Best when you want an established authentication solution closely associated with Next.js workflows.
- Useful for provider-based auth and apps that want frontend-centered auth integration.
- Official docs: https://authjs.dev/

### Clerk

- Best when you want polished hosted auth, prebuilt UI, and faster product delivery.
- Good for teams that care more about speed and DX than owning every auth primitive.
- Official docs: https://clerk.com/docs/nextjs/overview

### WorkOS AuthKit

- Best when you expect serious B2B and enterprise auth needs.
- Especially relevant if you need hosted auth plus a strong path to enterprise SSO and organization features.
- Official docs: https://workos.com/docs/sdks/authkit-nextjs

Recommendation:

- keep the current custom Go auth if it already fits
- choose `Better Auth` if you want to own auth in-app
- choose `Clerk` for fastest hosted auth UX
- choose `WorkOS AuthKit` when enterprise auth and SSO are a major priority

## Uploads, Email, And Payments

### UploadThing

- Best for adding file uploads quickly in full-stack TypeScript apps.
- Good fit for profile uploads, attachments, resource files, and admin media tools.
- Official docs: https://docs.uploadthing.com/

### React Email

- Best for building emails with React components instead of raw HTML tables.
- Great for welcome emails, password resets, receipts, and lifecycle messaging.
- Official docs: https://react.email/docs

### Resend

- Best for modern developer-friendly email delivery.
- Strong fit with React Email and already aligned with the backend template direction.
- Official docs: https://www.resend.com/

### Stripe

- Best for subscriptions, one-time payments, customer billing, and checkout.
- Usually the default recommendation for billing unless you have a region-specific reason not to.
- Official docs: https://docs.stripe.com/

Recommendation:

- use `React Email + Resend` together for transactional email
- use `UploadThing` for app uploads
- use `Stripe` for billing

## Analytics, Monitoring, And Reliability

### Sentry

- Best for error monitoring, performance tracing, and debugging production issues.
- High-value addition for almost any serious product.
- Official docs: https://docs.sentry.io/platforms/javascript/guides/nextjs/

### OpenTelemetry

- Best when you want vendor-neutral tracing and observability standards.
- Especially useful for teams with multiple services or long-term observability plans.
- Official docs: https://opentelemetry.io/docs/languages/js/

### Plausible

- Best for lightweight privacy-friendly product analytics.
- This template already includes Plausible-related environment hooks, so it is a natural fit if you want simple analytics without a huge product analytics stack.
- Official docs: https://plausible.io/docs

Recommendation:

- start with `Sentry` for app health
- add `Plausible` for simple analytics
- add `OpenTelemetry` when your observability needs become broader or multi-service

## Background Jobs And Long-Running Work

### Trigger.dev

- Best for background jobs, workflows, scheduled tasks, retries, and long-running async work.
- Great fit for email sequences, imports, exports, AI workflows, media processing, and server-side automations.
- Official docs: https://trigger.dev/docs

## Strong Second-Wave Additions

These are not the first tools I would install, but they become very strong once the product or team matures.

## Component Docs, Review, And Isolated UI Work

### Storybook

- Best for documenting components, reviewing UI in isolation, and aligning design/dev work.
- Very useful once your shared component layer grows beyond a few primitives.
- Strong fit for teams that want reusable UI and less guesswork.
- Official docs: https://storybook.js.org/docs/get-started/install

### Sonner

- Best for simple, polished toast notifications with low setup friction.
- Good addition when async feedback becomes common across forms, dashboard actions, and mutations.
- Official docs: https://sonner.emilkowal.ski/

Recommendation:

- add `Storybook` when the design system starts becoming a product of its own
- add `Sonner` when the app needs consistent success/error feedback

## Mocking, Integration Safety, And Contracts

### MSW

- Best for mocking API behavior in frontend development, tests, and Storybook.
- Especially useful when you want stable frontend work without depending on a live backend every time.
- Official docs: https://mswjs.io/

### openapi-typescript

- Best for generating TypeScript types from an OpenAPI contract.
- Strong fit if you want the frontend to consume backend contracts more safely.
- Official docs: https://openapi-ts.dev/

### oapi-codegen

- Best for generating Go types, clients, and server scaffolding from OpenAPI definitions.
- Useful when you want the Go API to become more contract-driven over time.
- Official docs: https://github.com/oapi-codegen/oapi-codegen

Recommendation:

- add `MSW` early if frontend/backend work often happens in parallel
- adopt `openapi-typescript` and `oapi-codegen` together if you want a shared API contract workflow

## Database And Backend Developer Experience

### sqlc

- Best when your Go data layer grows and you want typed SQL without writing a full ORM.
- Great fit for teams that like explicit SQL but want stronger compile-time guarantees.
- Official docs: https://sqlc.dev/

### Testcontainers For Go

- Best for realistic integration tests against Postgres and other services inside normal Go test flows.
- Very strong fit for this template because the backend already depends on real database behavior.
- Official docs: https://golang.testcontainers.org/

Recommendation:

- add `sqlc` when repository complexity grows
- add `Testcontainers for Go` when backend integration coverage becomes important enough to formalize

## URL State, Complex State, And Accessibility Depth

### nuqs

- Best for typed URL search params in Next.js.
- Great for filters, search, pagination, dashboards, and shareable table states.
- Official docs: https://nuqs.dev/

### React Aria

- Best when you want deeper accessible headless primitives beyond the current Radix usage.
- Worth considering for more specialized widgets or when building a broader design system.
- Official docs: https://react-spectrum.adobe.com/react-aria/index.html

### XState

- Best for truly complex flows like onboarding wizards, approvals, async multi-step processes, or state-heavy UIs.
- Usually overkill for simple apps, but excellent once UI state becomes hard to reason about.
- Official docs: https://stately.ai/docs/installation

Recommendation:

- add `nuqs` for richer filterable pages and admin screens
- add `React Aria` when you need accessibility primitives not already covered by Radix
- add `XState` only when flow complexity is clearly real, not just possible

## Suggested Tool Bundles

If you do not want to overthink it, these combinations are sensible starting points.

### For A Marketing Site

- keep the current stack
- add `Motion` for better page feel
- add `Plausible` for analytics
- add `React Email + Resend` if you need contact or waitlist flows

### For A SaaS App

- add `React Hook Form + Zod`
- add `Sentry`
- add `Stripe`
- add `UploadThing`
- add `Motion` where it improves UX
- add `Sonner` for better feedback loops

### For An Internal Tool Or Admin App

- add `React Hook Form + Zod`
- add `TanStack Table`
- add `Sentry`
- add `nuqs`
- add `Trigger.dev` if there are imports, syncs, reports, or scheduled jobs

### For A Content Product

- add `Tiptap`
- add `React Hook Form + Zod`
- add `Resend`
- add `next-intl` if you need multilingual publishing

### For A B2B Or Enterprise Product

- add `Sentry`
- add `TanStack Table`
- consider contract tooling with `openapi-typescript` and `oapi-codegen`
- consider `WorkOS AuthKit` if enterprise auth is core
- consider `Trigger.dev` for background workflows

### For A Team Building A Real Design System

- add `Storybook`
- add `MSW`
- add `Sonner`
- consider `React Aria` when you need more advanced accessible primitives

## Tools To Add Carefully

These are common mistakes:

- do not install multiple auth systems without a migration plan
- do not install two form stacks unless your team explicitly wants that complexity
- do not add heavy animation libraries if CSS already solves the problem
- do not add a WYSIWYG editor unless the product truly needs rich text editing
- do not add large analytics suites unless you will actually use them

## Strong Default Recommendation For This Template

If you want the highest-value upgrades with the least regret, add these first:

1. `React Hook Form`
2. `Zod`
3. `Sentry`
4. `Motion`
5. `UploadThing`
6. `React Email`
7. `Resend`
8. `Stripe`
9. `TanStack Table` when dashboards get more serious
10. `Trigger.dev` when background work shows up

## Very Good Next Layer After That

When the app gets bigger, these are the next strongest additions:

1. `MSW`
2. `Storybook`
3. `Sonner`
4. `nuqs`
5. `sqlc`
6. `Testcontainers for Go`
7. `openapi-typescript`
8. `oapi-codegen`
9. `React Aria`
10. `XState`

## Related Docs

- [README.md](../README.md)
- [docs/expansions.md](./expansions.md)
- [frontend/README.md](../frontend/README.md)
- [AGENTS.md](../AGENTS.md)
