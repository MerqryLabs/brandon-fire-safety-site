# Threat Model

## Project Overview

This repository is a pnpm workspace containing a production marketing website (`artifacts/brandon-fire-safety`) and a minimal Express API server (`artifacts/api-server`) backed by shared OpenAPI/Zod and database libraries under `lib/`. The current production-scope application is a mostly static brochure site plus an `/api/healthz` endpoint; there is no implemented user account system, no privileged admin surface, and no active database-backed feature flow yet.

Production assumptions for this scan:
- Replit terminates TLS for deployed traffic.
- `NODE_ENV` is `production` in production.
- `artifacts/mockup-sandbox` is a development-only environment and is out of production scope unless future scans show it is deployed or reachable from production traffic.
- The repl is not currently deployed, but this threat model assumes future deployment of the production app surfaces above.

## Assets

- **Deployment integrity** — the static site, API bundle, and workspace packages must not expose a path for arbitrary script execution or unauthorized code changes.
- **Application secrets** — environment variables such as `DATABASE_URL`, future API keys, and any future auth secrets must remain server-side and must not leak through logs or client bundles.
- **Future API trust boundary** — even though the current API only exposes health status, the shared API client, OpenAPI spec, and DB package will become security-critical as soon as authenticated or data-bearing routes are added.
- **Brand/site integrity** — the public-facing website must not be altered by untrusted input or by insecure third-party resource loading in production.

## Trust Boundaries

- **Browser to static site** — all visitors are untrusted; the SPA must not execute attacker-controlled content.
- **Browser to API** — requests to `/api/*` cross from an untrusted client into the Express server and must be validated and authorized as new routes are added.
- **API to database** — `lib/db` holds direct PostgreSQL access. Any future dynamic query path here would be high impact.
- **Build-time environment to runtime bundle** — server-only secrets must stay out of client artifacts.
- **Production vs dev-only artifacts** — `artifacts/mockup-sandbox` and related preview tooling are not production surfaces and should usually be ignored unless deployment reachability changes.

## Scan Anchors

- **Production entry points**: `artifacts/brandon-fire-safety/src/main.tsx`, `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`.
- **Highest-risk future growth areas**: `artifacts/api-server/src/routes/`, `artifacts/api-server/src/middlewares/`, `lib/db/src/`, `lib/api-spec/openapi.yaml`, `lib/api-client-react/src/custom-fetch.ts`.
- **Public surfaces**: static site routes in `artifacts/brandon-fire-safety/src/pages/` and `GET /api/healthz`.
- **Authenticated/admin surfaces**: none currently implemented.
- **Usually dev-only**: `artifacts/mockup-sandbox/**`, Vite dev-server settings, preview plugin code.

## Threat Categories

### Tampering

The primary tampering risk today is future expansion of the API and shared client/database layers without server-side validation. As new endpoints are added, request bodies, query parameters, and path parameters MUST be validated on the server, and business rules MUST be enforced server-side rather than in the React client.

### Information Disclosure

There is little sensitive data in the current production app, but the server environment and future secrets remain important assets. Server logs MUST continue redacting authorization and cookie headers, client bundles MUST NOT embed server secrets, and future API responses MUST only expose fields required by the caller.

### Denial of Service

The current API surface is minimal, but any future public endpoints could become abuse targets. As dynamic or expensive routes are added, they MUST enforce reasonable body-size limits, timeouts for outbound calls, and rate limiting where anonymous abuse could degrade service.

### Elevation of Privilege

No privilege model exists yet, which means future auth work will define this threat category. Any future authenticated or admin endpoints MUST enforce authorization on the server, and `lib/db` queries MUST remain parameterized or ORM-generated rather than built from string concatenation.
