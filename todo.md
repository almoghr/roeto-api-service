# Roeto B2B Enterprise Service — Getting Started & Implementation Checklist (TODO)

This document provides a comprehensive, step-by-step checklist of everything required to get the **Roeto B2B Enterprise Service** fully configured, verified, connected to Roeto's cloud platform, and integrated with the Polytech platform.

> [!IMPORTANT]
> **Key Focus of this Guide**: In addition to local setup and verification, **Section 6** provides an exhaustive breakdown of **what needs to be built and configured from scratch** to turn this service from an API gateway into a fully automated, rock-solid, production-grade pension & insurance microservice.

---

## Table of Contents
1. [Prerequisites & System Requirements](#1-prerequisites--system-requirements)
2. [Roeto Commercial B2B Partner Onboarding & Carrier Setup](#2-roeto-commercial-b2b-partner-onboarding--carrier-setup)
3. [Environment & Security Configuration](#3-environment--security-configuration)
4. [Local Installation & Quality Assurance Verification](#4-local-installation--quality-assurance-verification)
5. [Running the Service](#5-running-the-service)
6. [What Needs to be Built From Scratch to Make the Project Work Perfectly](#6-what-needs-to-be-built-from-scratch-to-make-the-project-work-perfectly)
7. [End-to-End Testing & Integration Workflow](#7-end-to-end-testing--integration-workflow)
8. [Production Readiness & Operational Checklist](#8-production-readiness--operational-checklist)

---

## 1. Prerequisites & System Requirements

- [ ] **Node.js**: Install Node.js v20.x or v22.x LTS.
  ```bash
  node -v # Must be >= 20.0.0
  ```
- [ ] **pnpm**: Ensure `pnpm` is installed globally (strict requirement; do not use npm or yarn).
  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  pnpm -v # Must be >= 9.x
  ```
- [ ] **Tunneling Tool (for local Cellosign webhook testing)**: Install `ngrok` or `cloudflared` to expose local port `3003` to Cellosign's push servers.
  ```bash
  ngrok --version # Or: cloudflared --version
  ```
- [ ] **OpenSSL**: For generating S2S secrets and HMAC encryption keys.
  ```bash
  openssl version
  ```

---

## 2. Roeto Commercial B2B Partner Onboarding & Carrier Setup

Roeto is an Israeli enterprise insurance and pension CRM platform (`https://api.roeto.co.il/api/v1`). To interact with real client data, the following commercial agreements and account setups must be completed from scratch:

### 2.1 B2B Developer Registration
- [ ] Sign a B2B API developer agreement with [Roeto Israel](https://roeto.co.il/).
- [ ] Receive your OAuth 2.0 Client Credentials:
  - `ROETO_CLIENT_ID`: Unique client ID handle.
  - `ROETO_CLIENT_SECRET`: Cryptographically secure secret key.
- [ ] Confirm your client credentials can authenticate against Roeto's OAuth2 server:
  ```bash
  curl -X POST https://api.roeto.co.il/api/v1/oauth/token \
    -u "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" \
    -H "Content-Type: application/json" \
    -d '{ "grant_type": "client_credentials" }'
  ```

### 2.2 Pension Clearinghouse (*המסלקה הפנסיונית*) Account Setup
- [ ] Ensure the insurance agency holds an active clearinghouse broker license.
- [ ] In Roeto's management console, configure the agency's clearinghouse user account.
- [ ] Obtain your approved Mislaka Account IDs by calling:
  ```bash
  curl -X GET http://localhost:3003/api/v1/mislaka/connection
  ```
- [ ] Note down the returned `accountId` values (required for submitting Mislaka queries and B1 POA requests).

### 2.3 Roeto-Pol & Cellosign Digital Signature Provisioning
- [ ] Provision a Roeto-Pol signing account linked to your agency.
- [ ] Obtain the `roetoPolAccountId` by calling:
  ```bash
  curl -X GET http://localhost:3003/api/v1/roeto-pol/accounts
  ```
- [ ] Configure standard pension disclosure signing templates (*נספח א, נספח ב, נספח ח*) in Cellosign.

---

## 3. Environment & Security Configuration

Configure runtime environment variables in your environment or secrets manager:

- `PORT`: HTTP port for the service (default `3003`).
- `NODE_ENV`: Runtime mode (`development` or `production`).
- `CORS_ORIGIN`: Allowed origins (`*` or specific domains).
- `ROETO_BASE_URL`: Live Roeto API endpoint (`https://api.roeto.co.il/api/v1`).
- `ROETO_CLIENT_ID`: Your OAuth2 Client ID from Step 2.1.
- `ROETO_CLIENT_SECRET`: Your OAuth2 Client Secret from Step 2.1.
- `ROETO_TIMEOUT_MS`: Network timeout in milliseconds (default `30000`).
- `INTERNAL_API_KEY`: Secret key for service-to-service protection.

---

## 4. Local Installation & Quality Assurance Verification

- [ ] **Install Dependencies**:
  ```bash
  pnpm install
  ```
- [ ] **Run TypeScript Compilation Check** (zero errors):
  ```bash
  pnpm run typecheck
  ```
- [ ] **Run Oxlint Code Quality Check** (zero warnings):
  ```bash
  pnpm run lint
  ```
  *(To automatically fix formatting: `pnpm run lint:fix`)*
- [ ] **Run Unit Tests (Jest)**:
  ```bash
  pnpm test
  ```
  - Verify all 7 test suites and 16 unit tests pass with 100% green status.
- [ ] **Run E2E Tests (Jest / Supertest)**:
  ```bash
  pnpm run test:e2e
  ```
  - Verify all 6 HTTP integration tests pass.
- [ ] **Run E2E Tests (Playwright)**:
  ```bash
  pnpm run test:playwright
  ```
  - Verify all 4 Playwright end-to-end tests pass.
- [ ] **Run Production Bundle Build**:
  ```bash
  pnpm run build
  ```
  - Verify `dist/` is generated cleanly.

---

## 5. Running the Service

- [ ] **Start in Development Mode** (with watch reload):
  ```bash
  pnpm run start:dev
  ```
- [ ] **Or Start in Production Mode**:
  ```bash
  pnpm run build
  pnpm run start:prod
  ```
- [ ] **Verify Service Health**:
  ```bash
  curl http://localhost:3003/api/v1/health
  ```
  Expected JSON response:
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

## 6. What Needs to be Built From Scratch to Make the Project Work Perfectly

While `roeto-api` provides complete controller-to-client coverage of all 60 Roeto operations, **the following critical architectural components must be configured and implemented from scratch** to achieve production-grade stability, data persistence, and security:

### 6.1 Gap 1: Automated OAuth2 Credentials Setup & Secret Management (CRITICAL)
- **Problem**: Roeto requires OAuth2 client credentials to interact with real financial and pension records. Without valid credentials, outgoing calls will fail with 401 Unauthorized.
- **Tasks to implement from scratch**:
  - [ ] Secure production credentials from Roeto.
  - [ ] Configure `ROETO_CLIENT_ID` and `ROETO_CLIENT_SECRET`.
  - [ ] `RoetoClientService` will automatically fetch the Bearer JWT on first request, cache it in memory, and refresh it proactively 60 seconds prior to expiration.
  - [ ] Verify automated authentication by calling `GET /api/v1/agency/client-types`.

### 6.2 Gap 2: Service-to-Service (S2S) Security & Endpoint Protection (CRITICAL)
- **Problem**: Currently, all endpoints (`/clients/*`, `/financialActivities/*`, `/tasks/*`) are public. Because these endpoints access sensitive Israeli insurance portfolios, personal identification numbers (*תעודות זהות*), and clearinghouse records, unauthorized access violates Israeli privacy laws (PPA).
- **Tasks to implement from scratch**:
  - [ ] Create an `InternalAuthGuard` validating an `X-Internal-API-Key` header against `INTERNAL_API_KEY`.
  - [ ] Apply the guard globally across all business controllers (`clients`, `financialActivities`, `tasks`, `roeto-pol`, `agency`, `leads`, `employers`).
  - [ ] Exempt public telemetry (`/health`) and incoming webhooks (`/cellosign/*`).

### 6.3 Gap 3: Cellosign Webhook Ingress & Tunneling (CRITICAL)
- **Problem**: When a customer signs forms remotely on their smartphone, Cellosign dispatches an asynchronous HTTP POST webhook to `/api/v1/cellosign/form-signature`. Cellosign's servers cannot reach `localhost:3003`.
- **Tasks to implement from scratch**:
  - [ ] In development: Start ngrok tunnel:
    ```bash
    ngrok http 3003
    # Generates: https://your-subdomain.ngrok-free.app
    ```
  - [ ] In production: Configure public DNS with SSL/TLS termination (e.g., `https://roeto.polytech.co.il`).
  - [ ] In Cellosign portal: Register your webhook callback URL:
    `https://roeto.polytech.co.il/api/v1/cellosign/form-signature`
  - [ ] In `CellosignService`: Persist incoming signed PDFs to S3 and notify Polytech core backend via an event or webhook.

### 6.4 Gap 4: Multi-Tenant Credential Store & Dynamic Token Storage
- **Problem**: If Polytech manages multiple independent insurance agencies, each agency may possess distinct Roeto OAuth credentials, Mislaka accounts, and agent licenses.
- **Tasks to implement from scratch**:
  - [ ] Create a MongoDB/PostgreSQL `CredentialsRepository` storing `{ organizationId, encryptedClientId, encryptedClientSecret, defaultMislakaAccountId }`.
  - [ ] Encrypt credentials using AES-256-GCM.
  - [ ] Resolve credentials dynamically based on an incoming `organizationId` header.

### 6.5 Gap 5: Mislaka B1 Multipart Stream Optimization
- **Problem**: Submitting a Power of Attorney (B1 Form) requires uploading both an ID photo and a signed B1 PDF (up to 5MB each). Buffering large files entirely in RAM under high concurrency risks memory exhaustion.
- **Tasks to implement from scratch**:
  - [ ] Ensure multer disk/memory buffers are tuned with strict 10MB limits.
  - [ ] Pipe uploaded file streams directly to Roeto without intermediate disk persistence.

### 6.6 Gap 6: Agent Dashboard Rate Limiting & Circuit Breaking
- **Problem**: Roeto enforces an aggressive rate limit on `GET /agent/dashboard`: **5 requests per 5 minutes**. Calling this endpoint repeatedly on every page load will trigger HTTP 429 (`Rate limit exceeded`).
- **Tasks to implement from scratch**:
  - [ ] In `AgentService`: Implement an in-memory or Redis caching layer with a 5-minute TTL:
    ```typescript
    @CacheKey('agent-dashboard')
    @CacheTTL(300)
    ```
  - [ ] Cache responses so multiple dashboard page refreshes do not hit Roeto directly.

### 6.7 Gap 7: Interactive OpenAPI / Swagger Documentation
- **Tasks to implement from scratch**:
  - [ ] Install `@nestjs/swagger` and `swagger-ui-express`:
    ```bash
    pnpm add @nestjs/swagger swagger-ui-express
    ```
  - [ ] Configure Swagger in `src/main.ts` exposing an interactive playground at `/api/v1/docs`.

---

## 7. End-to-End Testing & Integration Workflow

The following sequential workflows demonstrate how to interact with the service:

### 7.1 Health Telemetry
```bash
curl http://localhost:3003/api/v1/health
```

### 7.2 Check Client Existence
```bash
curl -X GET "http://localhost:3003/api/v1/agency/check-client-existance?userID=123456789"
```

### 7.3 Create Pre-Consulting Prospect (*טרום ייעוץ*)
```bash
curl -X POST http://localhost:3003/api/v1/clients/create-trom-yeutz-client \
  -H "Content-Type: application/json" \
  -d '{
    "personalID": "123456789",
    "firstName": "יוסף",
    "lastName": "כהן",
    "gender": "1",
    "birthDay": "15-05-1980",
    "primaryPhone": "0501234567",
    "email": "yosef@example.com",
    "city": "תל אביב"
  }'
```

### 7.4 Request Digital Form Signature via Roeto-Pol
```bash
curl -X POST http://localhost:3003/api/v1/roeto-pol/form-signature/123456789 \
  -H "Content-Type: application/json" \
  -d '{
    "roetoPolAccountId": "YOUR_ROETO_POL_ACCOUNT_ID",
    "attachmentA": true,
    "attachmentB": true,
    "attachmentH": true,
    "followUpHarBituach": true,
    "followUpMislaka": "YOUR_MISLAKA_ACCOUNT_ID"
  }'
```

### 7.5 Submit Mislaka Data Request
```bash
curl -X POST http://localhost:3003/api/v1/clients/123456789/create-mislaka-request/YOUR_MISLAKA_ACCOUNT_ID \
  -H "Content-Type: application/json" \
  -d '{ "noAuthCode": true }'
```

### 7.6 Retrieve Latest Mislaka File Downloads
```bash
curl -X GET http://localhost:3003/api/v1/clients/123456789/latest-mislaka-request-files
```

### 7.7 Convert Prospect to Active Client
```bash
curl -X PUT http://localhost:3003/api/v1/clients/convert-trom-to-active/123456789
```

### 7.8 Create Sales Activity & Link with Task
1. **Create Financial Activity**:
```bash
curl -X POST http://localhost:3003/api/v1/financialActivities/new/123456789 \
  -H "Content-Type: application/json" \
  -d '{
    "company": "הראל",
    "activityType": "פנסיה חדשה",
    "status": "הוגש",
    "saleTitle": "העברת קופה",
    "meshavekItemId": "AGENT_ITEM_ID",
    "assignedUser": "USER_ID",
    "activityClientType": "existing",
    "genSchumPremiaZafui": 1500,
    "genSchumHaavaraZafui": 200000
  }'
```
*(Returns `faId`)*

2. **Create Task**:
```bash
curl -X POST http://localhost:3003/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "מעקב הפקת פוליסת פנסיה",
    "ownerId": "123456789",
    "dueDate": "30/12/2026 14:00"
  }'
```
*(Returns `taskId`)*

3. **Link Sale with Task**:
```bash
curl -X PUT http://localhost:3003/api/v1/financialActivities/link-with-task/FA_ID/TASK_ID
```

---

## 8. Production Readiness & Operational Checklist

- [ ] **SSL / TLS Termination**: Ensure production traffic runs behind HTTPS.
- [ ] **Cellosign Webhook Public Ingress**: Confirm production public domain is registered in Cellosign console.
- [ ] **S2S API Key Configured**: Enforce `INTERNAL_API_KEY` via `InternalAuthGuard`.
- [ ] **Rate Limit Caching**: Enable 5-minute caching on `/agent/dashboard` to respect Roeto's quota.
- [ ] **File Size Enforcement**: Confirm upload body limits are bounded to 10MB on Nginx/Ingress.
- [ ] **Kubernetes Liveness & Readiness Probes**: Point to `GET /api/v1/health` (HTTP 200).
- [ ] **Privacy & Compliance**: Ensure client ID numbers (*תעודות זהות*) and financial balances are masked in persistent application logs in compliance with Israeli Privacy Protection Authority regulations.
