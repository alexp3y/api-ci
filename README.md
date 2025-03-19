# API CI/CD Playground

A mock API project for testing and demonstrating CI/CD workflows.

## Project Overview

This is a simple Express API that demonstrates a complete CI/CD pipeline using GitHub Actions. The API serves its version from the package.json file, which is automated using release-please.

## Development Workflow

This project follows a trunk-based development approach:

1. Development occurs on feature/fix branches off of the `main` branch
2. Pull Requests (PRs) to `main` trigger the code-checks workflow
3. When PRs are merged to `main`, changes are automatically deployed to the staging environment
4. Version updates are managed by release-please, which creates and maintains release PRs
5. When a release PR is merged, the production deployment workflow is triggered

## Deployment Environments

- **Staging**: Automatically updated with every merge to `main`
- **Production**: Updated only when a new version is released via release-please

## API Endpoints

- `GET /`: Returns a basic message with the API version
- `GET /health`: Returns a health check response
- `GET /version`: Returns just the API version

## CI/CD Workflows

### Code Checks (`code-checks.yml`)

Runs on pull requests to `main` and performs:

- Linting (ESLint)
- Testing (Jest)

### Staging Deployment (`deploy-staging.yml`)

Runs when changes are pushed to `main` and:

- Validates the code via tests
- Deploys the latest code to the staging environment

### Production Deployment (`deploy-production.yml`)

Runs when the package.json version changes in `main` and:

- Validates the code via tests
- Deploys the latest version to the production environment

### Release Management (`release-please.yml`)

Uses Google's release-please to:

- Track changes via conventional commits
- Create and maintain release PRs that update the version
- Generate changelogs automatically

## Conventional Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages to enable automated versioning.

Examples:

- `feat: add new endpoint` - A new feature (minor version bump)
- `fix: resolve error in health endpoint` - A bug fix (patch version bump)
- `docs: update README` - Documentation only changes (no version bump)
- `chore: update dependencies` - Maintenance changes (no version bump)
- `BREAKING CHANGE: change API response format` - Breaking changes (major version bump)

## Local Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Run tests
pnpm test

# Run linting
pnpm lint
```
