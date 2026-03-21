# Security Policy

## Reporting a Vulnerability

Please do not open public issues for security vulnerabilities.

If GitHub private vulnerability reporting is enabled for this repository, use it. Otherwise, contact the maintainer privately through GitHub with:

- a clear description of the issue
- steps to reproduce it
- the affected area or files
- any suggested mitigation, if available

## Response Expectations

This is a public starter template, so fixes may be coordinated based on severity and reproducibility. Verified issues should be addressed as quickly as practical, with preference given to vulnerabilities that affect authentication, secrets, session handling, and deployment defaults.

## Scope Notes

Reports are most helpful when they focus on:

- authentication and password-reset flows
- token handling and browser storage
- environment-variable defaults
- database and migration safety
- dependency risks in the frontend or backend

## Built-In Scanning

This template also ships with:

- CodeQL scanning for JavaScript/TypeScript, Go, and GitHub Actions workflows
- tracked-git secret scanning with `gitleaks`
- downloadable license-report artifacts for npm and Go dependencies
- SPDX SBOM artifacts for the repository source plus backend/frontend runner images
- release-time provenance attestations for published GHCR images
