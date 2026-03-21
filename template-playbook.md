# Template Playbook

Reusable playbook for building a serious starter repo, even when the product domain changes.

Use this when you want to create a new template and need the internal structure, not the app-specific features.

## Goal

Every good template should be:

- easy to understand
- easy to run
- easy to verify
- easy to release
- easy to maintain

If a template only has code and no repo workflow, it is usually still a prototype.

## Core Idea

Strong templates usually have two layers:

1. product-specific features
2. template-grade infrastructure

The product layer changes from repo to repo. The template-grade layer is the part worth reusing almost anywhere:

- contributor docs
- agent docs
- root scripts
- split CI
- browser E2E
- release automation
- security scanning
- license reporting
- SBOM generation
- provenance attestations
- repo governance
- packaging verification
- smoke testing after publish

Build the second layer early, not after the repo gets messy.

## Keep These By Default

### Docs

- `README.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `CODE_OF_CONDUCT.md` for public/community-facing templates
- `LICENSE` for public templates
- `AGENTS.md` or equivalent internal guidance
- tool-specific agent guidance only if you actively maintain it
- short roadmap file like `SOON.md` or `soon.md`

### Root Commands

- `dev`
- `check`
- `e2e` if the repo ships real browser or full-stack user flows
- `check:contract` if generated artifacts exist
- `check:images` if the repo ships deployable containers
- `check:workflows`
- `check:secrets`
- `report:licenses` if the repo has third-party dependencies worth auditing

### CI

- workflow lint
- secret scan
- dependency review on pull requests
- license reporting when dependency visibility matters
- SBOM generation for source or publishable artifacts when relevant
- app verification
- browser E2E or integration coverage when the template markets real user flows
- cross-platform check if relevant
- packaging or Docker build check if relevant

### Release Layer

- release drafter or release-please
- semver labels
- label sync
- publish workflow
- managed changelog and version files if your release tool owns them
- provenance attestations for published artifacts when possible
- attach SBOMs to releases when you publish installable artifacts or images
- release smoke test

### Repo Governance

- `CODEOWNERS`
- PR template
- issue templates
- Dependabot

## Why Each Layer Matters

### Contributor and Maintainer Documentation

Keep:

- `README.md`
- `CONTRIBUTING.md`
- `AGENTS.md`
- `SECURITY.md`
- `SOON.md` or `soon.md`

Why it matters:

- makes the repo understandable without tribal knowledge
- gives both humans and coding agents a safe workflow
- reduces setup mistakes and PR drift
- makes the template feel production-minded instead of demo-only

Generic takeaway:

- every serious starter should have a short public README
- every serious starter should have a contributor guide
- every serious starter should have an internal or agent-facing rules file
- every public starter should have a security reporting path
- every public starter should usually ship a code of conduct and explicit license
- tool-specific AI guidance should be optional and maintained, not sprayed everywhere by default

### Root Script Layer

Keep:

- `scripts/dev.mjs`
- `scripts/check.mjs`
- `scripts/e2e.mjs`
- `scripts/check-contract-drift.mjs`
- `scripts/check-docker-builds.mjs`
- `scripts/check-release-smoke.mjs`
- `scripts/check-actionlint.mjs`
- `scripts/check-secrets.mjs`
- `scripts/report-licenses.mjs`
- root `package.json` or equivalent task runner

Why it matters:

- gives one stable entrypoint for local work
- keeps repo ergonomics consistent across projects
- avoids burying important workflows inside long docs
- makes CI and local commands line up cleanly

Generic takeaway:

- keep a root `dev` command
- keep a root `check` command
- add a root `e2e` command when the product story depends on real user flows
- add small focused helper scripts instead of giant shell blobs in workflows
- prefer reusable scripts that can run locally and in CI

### Split CI Instead of One Giant Workflow

Keep:

- `.github/workflows/template-ci.yml`

Typical coverage:

- workflow lint
- secret scan
- contract drift
- frontend verification
- backend verification
- Windows or cross-platform root check
- Docker image build checks

Why it matters:

- failures are easier to read
- faster signal on what actually broke
- easier to reuse parts in other repos
- lets platform-specific behavior get real coverage

Generic takeaway:

- split CI by concern, not by habit
- keep one job for each meaningful boundary
- add at least one cross-platform check if the repo supports Windows or other non-Linux dev environments

### Contract Drift Protection

Keep when relevant:

- source-of-truth contract file
- generated client or SDK
- `scripts/check-contract-drift.mjs`

Why it matters:

- protects the boundary between subsystems
- catches "changed backend, forgot generated client" mistakes
- scales well to any API-first starter, not just one domain

Generic takeaway:

- if a repo has a generated artifact from a source-of-truth contract, add a drift check
- examples:
  - OpenAPI to generated TypeScript client
  - GraphQL schema to generated types
  - Prisma schema to generated client checks
  - protobuf or SDK generation checks

### Packaging or Docker Build Verification

Keep when relevant:

- deployable `Dockerfile` files
- matching `.dockerignore` files
- `scripts/check-docker-builds.mjs`

Why it matters:

- catches packaging mistakes early
- makes deployment feel first-class instead of an afterthought
- keeps runtime assumptions honest

Generic takeaway:

- if the template is meant to deploy, verify image builds in CI
- even if local Docker is optional, CI should still know whether images build

### Release Automation

Keep:

- one clear release configuration path
- one publish workflow
- one maintained changelog or release metadata path

What it should cover:

- draft releases from merged PRs or release PR automation
- path-based autolabeling when helpful
- semver bump guidance through labels or release commits
- tag-triggered release workflow or release PR merge flow
- package or image publishing
- managed changelog and version files when the release tool owns them
- provenance attestations for published artifacts when possible
- attached SBOM release assets for published source and runtime artifacts
- release smoke test against published artifacts

Why it matters:

- removes a lot of maintainer busywork
- makes releases predictable
- creates a repeatable flow that survives team growth
- turns the repo from "template code" into "maintainable productized template"

Generic takeaway:

- if the repo is public and meant to last, release automation is worth it
- pick one release automation path and document it clearly instead of mixing multiple half-systems
- release smoke tests are especially valuable because they test the thing users actually consume
- provenance attestations strengthen trust in published artifacts without requiring manual signing steps
- attaching SBOMs directly to releases makes supply-chain metadata easier for downstream users to consume

### Repo Governance and Maintainer UX

Keep:

- `.github/CODEOWNERS`
- `.github/pull_request_template.md`
- `.github/ISSUE_TEMPLATE/*`
- `.github/dependabot.yml`

Why it matters:

- sets review expectations
- improves issue quality
- makes ownership explicit
- keeps dependency maintenance from becoming invisible debt

Generic takeaway:

- small governance files have a large compounding payoff
- they are boring in the best possible way

### Security and Supply-Chain Scanning

Keep:

- `scripts/check-secrets.mjs`
- `scripts/report-licenses.mjs`
- `.github/workflows/template-ci.yml`
- `.github/workflows/codeql.yml`
- `.github/workflows/dependency-review.yml`
- `.github/dependency-review-config.yml`
- `.github/workflows/license-report.yml`
- `.github/workflows/sbom.yml`
- `SECURITY.md`

What it should cover:

- tracked git content scanned with `gitleaks` or equivalent
- CodeQL or equivalent static analysis
- dependency review on pull requests
- generated license inventories for package ecosystems in the repo
- SBOM artifacts for source and release artifacts
- private disclosure guidance

Why it matters:

- gives the template a security posture, not just security language
- catches mistakes before they become public problems
- useful across almost every software template category

Generic takeaway:

- secret scanning is a near-default for public repos
- CodeQL or equivalent static analysis is a strong baseline for maintained starters
- dependency review gives fast signal before risky packages land
- non-blocking license reporting is a good bridge before stricter allowlist enforcement
- SBOM generation is a strong supply-chain visibility layer for deployable templates

### Workflow Linting

Keep:

- `scripts/check-actionlint.mjs`
- workflow-lint job in CI

Why it matters:

- GitHub Actions workflows are code
- broken automation is still broken product infrastructure
- catches invalid workflow logic before GitHub becomes the first parser

Generic takeaway:

- if a repo relies on Actions, lint the workflows

### Browser E2E Or Full-Stack Smoke Coverage

Keep when relevant:

- `scripts/e2e.mjs`
- browser smoke workflow
- stable seeded test account or fixture data

Why it matters:

- verifies real user journeys before release, not just units and builds
- catches auth, routing, startup, and environment-wiring regressions
- makes a public starter feel much more trustworthy

Generic takeaway:

- if the template markets login, dashboard, forms, or other full-stack flows, ship at least one browser E2E smoke path
- keep it focused on stable happy-path journeys rather than UI trivia

### Post-Release Smoke Testing

Keep when relevant:

- `scripts/check-release-smoke.mjs`
- `.github/workflows/release-smoke.yml`

Why it matters:

- verifies the published artifact, not just the source tree
- catches image, runtime, or config mistakes that CI build checks can miss

Generic takeaway:

- this is one of the highest-leverage mature-repo features
- especially useful when templates publish packages, Docker images, CLIs, or starter deployables

### Golden Fixtures and Snapshot-Style Verification

Keep when relevant:

- fixture directories
- snapshot directories

Why it matters:

- helps protect behavior, not just types
- gives a stable baseline for regressions
- extremely reusable across domains

Generic takeaway:

- any template with meaningful outputs should consider fixtures or snapshots
- examples:
  - API responses
  - generated files
  - CLI output
  - UI screenshots
  - transformed documents

### Docs-Preview or Screenshot Routes

Keep when relevant:

- stable docs-preview pages or scripts
- `docs/assets/*`

Why it matters:

- keeps screenshots reproducible
- avoids random one-off marketing assets
- helps the README stay current

Generic takeaway:

- if the template has a UI, add a stable docs-preview path for screenshots and demos

## Recommended File Set

For a strong public starter, this is a good baseline:

```text
README.md
CONTRIBUTING.md
SECURITY.md
CODE_OF_CONDUCT.md
LICENSE
AGENTS.md
soon.md
.github/CODEOWNERS
.github/dependabot.yml
.github/pull_request_template.md
.github/ISSUE_TEMPLATE/*
.github/release-drafter.yml
.github/labels.json
.github/dependency-review-config.yml
.github/workflows/template-ci.yml
.github/workflows/dependency-review.yml
.github/workflows/release-drafter.yml
.github/workflows/release.yml
.github/workflows/release-smoke.yml
.github/workflows/license-report.yml
.github/workflows/sbom.yml
.github/workflows/sync-labels.yml
.github/workflows/codeql.yml
scripts/dev.mjs
scripts/check.mjs
scripts/e2e.mjs
scripts/check-actionlint.mjs
scripts/check-secrets.mjs
scripts/report-licenses.mjs
```

Add these if relevant:

```text
scripts/check-contract-drift.mjs
scripts/check-docker-builds.mjs
scripts/check-release-smoke.mjs
docs/assets/*
docs/openapi.yaml
tests/fixtures/*
tests/snapshots/*
src/app/docs-preview/*
CHANGELOG.md
version.txt
release-please-config.json
.release-please-manifest.json
.github/copilot-instructions.md
.cursor/rules/*
CLAUDE.md
```

## Suggested Template Blueprint

For most future non-domain-specific starters, preserve this rough shape:

### Foundation

- strong README
- contributor guide
- security policy
- code of conduct and license for public templates
- agent guidance
- roadmap file

### Local DX

- root `dev`
- root `check`
- root `e2e` when real user journeys matter
- focused helper scripts
- reproducible screenshots or docs previews if there is UI

### CI

- workflow lint
- secret scan
- app, test, and build verification
- browser E2E when the product story promises real workflows
- platform-specific verification if relevant
- dependency review
- Docker or packaging check if deployable

### Release Layer

- release drafter or release-please
- label sync
- semver labeling rules
- publish workflow
- smoke test after publish
- provenance attestations when supported
- SBOM generation and release attachment when relevant

### Governance

- CODEOWNERS
- issue templates
- PR template
- Dependabot

## Build Order

When creating a new template, build it in this order:

1. define the product story
2. create the repo structure
3. add root `dev` and `check`
4. add contributor docs
5. add split CI
6. add release automation
7. add governance files
8. add security scanning
9. add smoke testing for published artifacts

This order prevents the repo from becoming code-heavy but maintenance-light.

## Minimum Viable Template

If you want the lean version, keep at least:

- `README.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- root `dev`
- root `check`
- split CI
- secret scanning
- release workflow

This is the minimum point where a repo starts feeling dependable.

## Full Public Template

If you want the version that scales better for open source or long-term reuse, also add:

- `AGENTS.md`
- `CODE_OF_CONDUCT.md`
- `LICENSE`
- workflow lint
- CodeQL
- dependency review
- label sync
- release automation
- release smoke tests
- `CODEOWNERS`
- issue templates
- Dependabot
- license reporting
- SBOM generation

## What To Customize Per New Project

Do not copy these blindly from one template to another:

- product copy
- screenshots
- sample data
- domain-specific API schemas
- domain-specific tests
- domain-specific fixtures
- domain-specific feature names

Keep the infrastructure, change the story.

## What To Strip When Reusing This Repo As A Base

If you are extracting patterns from this repo specifically, do not carry over the sample product layer as if it were generic:

- the resource and entry sample domain
- demo account copy and seeded sample credentials
- dashboard-owner-specific messaging
- landing page marketing copy and SEO text
- sample auth and password-reset labels
- site metadata that still points at the template brand

These patterns are still generic even though the local implementation is monorepo-kit shaped:

- OpenAPI as source of truth
- a layered Go backend with handler, service, and repository boundaries
- root orchestration for full-stack browser smoke tests
- tool-specific AI guidance when you actively maintain it
- release-please-managed version and changelog files

## Generic Rules Worth Reusing

- one source of truth for contracts
- generated files should have drift checks
- local scripts and CI should use the same commands
- published artifacts should get smoke-tested
- repos with real user flows should have at least one browser E2E confidence path
- workflows should be linted
- secrets should be scanned
- dependency changes should be reviewed on pull requests
- dependency licenses should be reportable without manual digging
- SBOMs should be generated for source trees or release artifacts when supply-chain visibility matters
- published artifacts should have provenance attestations when the platform supports them
- release notes should tell consumers how to verify what you published
- release steps should be automated
- release automation should have one explicit owner path such as release-please or release-drafter-plus-publish
- docs should explain maintainer flow, not just user setup

## Good Default Questions For Any New Template

Before calling a template "done," ask:

1. Can a new person run it quickly?
2. Can a contributor verify changes with one or two commands?
3. Can CI explain exactly what broke?
4. Can maintainers cut a release without manual chaos?
5. Can the published artifact be smoke-tested?
6. Is there a security reporting path?
7. Are repo ownership and contribution expectations visible?

If the answer to several of these is no, the template probably still needs internal work.

## Personal Default Stack

If I were starting another template tomorrow, I would copy this pattern first:

1. root scripts
2. split CI
3. browser E2E for meaningful flows
4. release automation
5. security scanning
6. governance files
7. contributor and agent docs

Then I would build the domain-specific product layer on top.
