# Insurance Claims Policy Compliance Checker

A web application that validates insurance claims against policy terms and determines whether a claim is **Compliant**, **Non-Compliant**, or **Needs Manual Review**.

## Overview

The application allows users to submit:

* Claim Type
* Amount
* Incident Date
* Policy ID

The backend validates the claim against the provided policy reference data and evaluates the business rules in order.

## Decision Flow

```text
Claim Submitted
      ↓
Validate Claim Data
      ↓
Find Matching Policy
      ↓
Check Policy Coverage Period
      ↓
Check Claim Coverage Type
      ↓
Calculate Payable Amount
      ↓
Return Compliance Result
```

## Business Rules

The rules are evaluated in the following order:

### 1. Data Completeness

If any required claim field is missing, blank, or invalid:

* `claim_type`
* `amount`
* `incident_date`
* `policy_id`

The result is:

**Needs Manual Review**

Reason:

`Incomplete or invalid claim data.`

### 2. Policy Lookup

If the submitted `policy_id` does not match a policy in the reference data:

**Needs Manual Review**

Reason:

`Policy not found.`

### 3. Policy Period

If the incident date is before the policy's effective date or after its expiration date:

**Non-Compliant**

Reason:

`Incident occurred outside the policy's coverage period.`

### 4. Coverage Type

If the claim type is not covered by the policy:

**Non-Compliant**

Reason:

`Policy does not cover this claim type.`

### 5. Payable Amount

When all previous rules pass:

```text
payable_amount =
max(0, min(claim.amount, coverage_limit) - deductible)
```

The claim remains **Compliant** even when the payable amount is `0` or the claim amount exceeds the coverage limit.

Examples of reasons:

* `No payout due - claim amount does not exceed deductible.`
* `Payable amount capped at policy limit.`
* Normal compliant claim with the calculated payable amount.

## Technology Stack

* React
* Node.js
* Express
* SQLite
* JavaScript
* Vite

## Project Structure

```text
insurance-claims-checker/
│
├── backend/
│   ├── data/
│   ├── src/
│   │   ├── db/
│   │   ├── validators/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## Architecture

The application follows a simple layered architecture:

```text
React Frontend
      ↓
Express API
      ↓
Validation
      ↓
Compliance Service
      ↓
Policy Repository
      ↓
SQLite
```

### Backend

* **Claim Validator**
  Validates the claim input and handles data completeness checks.

* **Policy Repository**
  Handles policy data access.

* **Compliance Service**
  Contains the core insurance policy compliance business rules and payable amount calculation.

* **Claims Route**
  Handles HTTP requests and responses.

* **Database Layer**
  Handles SQLite connection, schema, setup, and policy reference data.

### Frontend

* **Claim Form**
  Collects claim information from the user.

* **Result Card**
  Displays the compliance status, reason, and payable amount.

* **Claims API**
  Handles communication between the React frontend and Express backend.

## Installation

### Prerequisites

Make sure Node.js and npm are installed:

```bash
node --version
npm --version
```

### Backend

```bash
cd backend
npm install
```

Configure environment variables in `.env` if required.

Initialize the database using the project's database setup process.

Start the backend:

```bash
npm start
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## API

### Check Claim

```text
POST /api/claims/check
```

Example request:

```json
{
  "claim_type": "Car Accident",
  "amount": 80000,
  "incident_date": "2026-08-10",
  "policy_id": "POL-1001"
}
```

The API returns the compliance outcome, reason, and payable amount when applicable.

## Test Scenarios

The application handles scenarios including:

* Missing claim fields
* Blank claim fields
* Invalid claim amount
* Zero or negative claim amount
* Invalid incident date
* Unknown policy ID
* Incident before policy effective date
* Incident after policy expiration date
* Unsupported claim type
* Claim exceeding coverage limit
* Claim amount not exceeding deductible
* Policy period boundary dates

## Engineering Principles

The implementation follows pragmatic software engineering principles:

* SOLID principles
* Separation of concerns
* High cohesion and low coupling
* DRY where appropriate
* KISS and simplicity
* Clear and descriptive naming
* Focused functions and modules
* Testable business logic
* Minimal unnecessary abstraction

The architecture is intentionally lightweight to keep the application maintainable while remaining suitable for a time-constrained implementation.

## Development Workflow

```text
Plan
  ↓
Implement
  ↓
Run
  ↓
Observe
  ↓
Diagnose
  ↓
Fix
  ↓
Verify
```

## Scope

The core scope of the application is:

1. Claim submission
2. Claim validation
3. Policy lookup
4. Policy compliance evaluation
5. Payable amount calculation
6. Clear compliance result and reason

Additional features such as authentication, advanced reporting, and claim-history management are outside the core requirement.
