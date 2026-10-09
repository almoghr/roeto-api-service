# Roeto B2B Enterprise Service

A high-performance, fully generic, type-safe NestJS microservice integrating the complete [Roeto B2B API](https://api.roeto.co.il/api-docs/) (all 60 operations across 11 business domains).

Built following enterprise clean architecture and Polytech Engineering Guidelines, this service acts as the centralized Israeli Insurance, Pension, and Wealth Management CRM gateway for Polytech platforms, providing dedicated RESTful endpoints, automated OAuth2 token lifecycle management with in-memory caching, full DTO validation, centralized constants, structured error management, and automatic Hebrew localization.

---

## Features

- **Complete API Coverage (All 60 Operations across 11 Domains)**:
  - **Authentication**: Token exchange (`POST /oauth/token`) and verification (`GET /oauth/check-token`) with automatic proactive token caching.
  - **Agency Management**: Agent rosters (`sochnimMeshavkim`), role-grouped agency staff, client classifications, agent-specific client lists, and cross-agency duplicate verification.
  - **Agent Dashboard**: Rate-limited BI analytics of total wealth, portfolio growth, risk/health premiums, top clients, and significant wealth discrepancies (`GET /agent/dashboard`).
  - **Clients & Insurance Portfolio (22 APIs)**:
    - Pre-consulting (*טרום ייעוץ*) and active client portfolios.
    - Upcoming birthday notifications and multi-criteria search.
    - Client event notes and logs (*יומן אירועים*).
    - Conversion from prospect to active client (migrating logs and files).
    - Marketing agent and case handler (*גורם מטפל*) assignments.
    - S3 document file uploads with 10MB limits.
    - Pension Clearinghouse (*המסלקה הפנסיונית*) prerequisite checks, automated data requests, file download links, and Power of Attorney (B1 Form) submissions with ID and PDF uploads.
  - **Mislaka**: Active clearinghouse connection accounts and official directory of recognized pension and insurance carriers with company registration numbers (*ח"פ*).
  - **Roeto-Pol**: Digital signature packets for statutory pension disclosure forms (*נספח א, נספח ב, נספח ח*) and Ministry of Finance Insurance Mountain (*הר הביטוח*) queries.
  - **Cellosign Webhooks**: Inbound webhooks for completed signed documents (stored directly to S3) and signature session expiration callbacks.
  - **Employers Directory**: Directory search for employers (*מעסיקים*) by business name, tax registration number (*ח"פ*), or ObjectId.
  - **Leads & Campaigns**: Marketing campaign listings, lead creation with optional Roeto-Pol digital signature linking, lead status updates, multi-criteria search, and CSV batch lead importing.
  - **Sales Management / Financial Activities (7 APIs)**: Sales pipelines, expected vs actual transfer sums (*סכומי העברה*) and premiums (*פרמיות*), life insurance coverage, status transitions, and bidirectional linking with CRM tasks.
  - **Tasks Management (10 APIs)**: CRM task creation with due dates, reminders, tags, completion toggling, call logs/comments, uncompleted task queries, and bulk task reassignment.

- **Strict Type Safety & Zero Magic Numbers/Strings**:
  - All endpoints, headers, URLs, timeouts, and translations reside in dedicated `constants/` files.
  - 100% typed with TypeScript strict mode and zero `any` usage.

- **Automated Hebrew Localization (AGENTS.md Compliance)**:
  - Global `HebrewResponseInterceptor` intercepts every outgoing payload and injects `message_he`.
  - Global `RoetoExceptionFilter` maps validation errors and HTTP exceptions into Hebrew messages (`messages_he`, `message_he`, `error_he`).

- **Automated OAuth2 Token Lifecycle Management**:
  - Proactively mints and caches the Bearer JWT in memory using client credentials.
  - Refreshes the token 60 seconds prior to expiration.
  - Injects `Authorization: Bearer <token>` on all outgoing calls with support for custom token overrides.

- **Transport Resilience & Retry Engine**:
  - Configurable timeouts (`ROETO_TIMEOUT_MS`) and exponential backoff retry loop for transient network or server glitches.
  - `RoetoApiException` preserves status codes, error messages, and raw responses.

---

## Tech Stack & Tooling

- **Framework**: NestJS 11 (Node.js 20+ LTS / TypeScript 5.7)
- **HTTP Client**: Axios (`@nestjs/axios`) with custom retry loop and auto-token caching
- **Package Manager**: `pnpm` (strictly required)
- **Validation**: `class-validator` & `class-transformer` (no Zod/Joi)
- **Linter**: Oxlint (`oxlint --deny-warnings`)
- **Unit Testing**: Jest (`pnpm test` — 7 suites, 16 unit tests)
- **E2E Testing**: Jest/Supertest (`pnpm run test:e2e`) & Playwright (`pnpm run test:playwright`)

---

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Configuration
Configure runtime environment variables in your environment or secrets manager:
```env
PORT=3003
NODE_ENV=development
ROETO_BASE_URL=https://api.roeto.co.il/api/v1
ROETO_CLIENT_ID=your_roeto_client_id
ROETO_CLIENT_SECRET=your_roeto_client_secret
ROETO_TIMEOUT_MS=30000
CORS_ORIGIN=*
```

### 3. Run Service
```bash
# Development mode (hot reload)
pnpm run start:dev

# Production build and run
pnpm run build
pnpm run start:prod
```

### 4. Verify Service Health
```bash
curl http://localhost:3003/api/v1/health
```
Expected response:
```json
{
  "status": "ok",
  "service": "roeto-api-service",
  "version": "1.0.0",
  "environment": "development",
  "roetoBaseUrl": "https://api.roeto.co.il/api/v1",
  "timestamp": "2026-10-09T10:00:00.000Z",
  "message_he": "המערכת פועלת כסדרה"
}
```

---

## Testing & Quality Assurance

```bash
# Typecheck (TypeScript compiler verification)
pnpm run typecheck

# Lint (Oxlint zero-warning policy)
pnpm run lint
pnpm run lint:fix

# Unit Tests (Jest)
pnpm test

# E2E Tests (Jest / Supertest)
pnpm run test:e2e

# E2E Tests (Playwright)
pnpm run test:playwright

# Build Production Bundle
pnpm run build
```

---

## Documentation Links

- **Architecture Deep-Dive**: See [architecture.md](file:///Users/almogram/Desktop/projects/polytech/roeto-api/docs/architecture.md)
- **Getting Started & Setup from Scratch (TODO)**: See [todo.md](file:///Users/almogram/Desktop/projects/polytech/roeto-api/docs/todo.md)
- **Roeto API Reference**: See [ROETO_API_README.md](file:///Users/almogram/Desktop/projects/polytech/roeto-api/ROETO_API_README.md)
