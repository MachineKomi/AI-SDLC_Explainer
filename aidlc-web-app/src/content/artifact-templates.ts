
export const ARTIFACT_TEMPLATES: Record<string, string> = {
    'aidlc-state.md': `# AI-SDLC Project State

## Project Overview
- **Name**: [Project Name]
- **Type**: [Greenfield / Brownfield]
- **Current Phase**: [Inception / Construction / Operations]
- **Last Updated**: [Date]

## Progress Tracker
- [ ] **Inception Gate Passed** (Intent & Plan approved)
- [ ] **Unit 1 Construction**
    - [ ] Domain Design
    - [ ] Implementation
    - [ ] Validation
- [ ] **Unit 2 Construction**
    - [ ] Domain Design
    - [ ] Implementation
    - [ ] Validation
- [ ] **Operations Handover**

## Key Decisions (ADRs)
- [YYYY-MM-DD] Selected [Tech Stack] because [Reason]
- [YYYY-MM-DD] Deferred [Feature X] to Phase 2 due to [Constraint]
`,

    'execution-plan.md': `# Execution Plan

## Level 1 Plan (Phases)
### 1. Inception (Estimated: 2 days)
- [ ] Workspace Detection
- [ ] Requirements Analysis
- [ ] Unit Decomposition

### 2. Construction (Estimated: 2 weeks)
- [ ] Unit 1: [Name]
- [ ] Unit 2: [Name]

### 3. Operations (Estimated: 1 day)
- [ ] Deployment Configuration
- [ ] Observability Setup

## Rationale
- **Inception**: Mandatory for alignment.
- **Construction**: Split into 2 parallel units to maximize velocity.
- **Operations**: Lightweight deployment using existing infra patterns.

## Approvals
- [ ] Product Owner
- [ ] Lead Engineer
`,

    'intent.md': `# Intent

## High-Level Intent
[Describe the core business goal or technical outcome in 1-2 paragraphs. What are we building and why?]

## Success Metrics
- [ ] **Metric 1**: [Description, e.g., "Reduce latency by 50%"]
- [ ] **Metric 2**: [Description, e.g., "Support 10k concurrent users"]
- [ ] **Metric 3**: [Description, e.g., "Deliver MVP by Q3"]

## Constraints
- **Budget**: [Limit]
- **Timeline**: [Deadline]
- **Compliance**: [GDPR, HIPAA, etc.]
`,

    'requirements.md': `# Requirements

## Functional Requirements
1. **[Feature A]**: The system MUST [behavior].
2. **[Feature B]**: The system SHOULD [behavior].
3. **[Feature C]**: The system MAY [behavior].

## User Stories (High Level)
- As a [User], I want [Feature], so that [Benefit].
- As a [Admin], I want [Control], so that [Governance].

## Out of Scope
- [Feature X]
- [Feature Y]
`,

    'nfr.md': `# Non-Functional Requirements (NFRs)

## Quality Attributes
- **Availability**: [e.g., 99.9% uptime]
- **Latency**: [e.g., p95 < 200ms]
- **Security**: [e.g., OAuth2, Encryption at rest]
- **Scalability**: [e.g., Auto-scale to 1000 RPS]

## Technical Constraints
- **Stack**: [e.g., Python/FastAPI, React, AWS]
- **Deployment**: [e.g., Kubernetes, Serverless]
`,

    'user-stories.md': `# User Stories & Acceptance Criteria

## Story 1: [Title]
**As a** [Role]  
**I want** [Action]  
**So that** [Benefit]

### Acceptance Criteria
- [ ] **AC 1**: [Condition met]
- [ ] **AC 2**: [Condition met]
- [ ] **AC 3**: [Negative case handled]

## Story 2: [Title]
...
`,

    'application-design.md': `# Application Design

## Architecture Overview
[High-level diagram or description of the system architecture]

## Key Components
1. **Frontend**: [Tech, e.g., Next.js]
2. **Backend**: [Tech, e.g., FastAPI]
3. **Database**: [Tech, e.g., PostgreSQL]

## Data Flow
[Description of how data moves through the system]

## Infrastructure
- **Compute**: [Service]
- **Storage**: [Service]
- **Networking**: [Service]
`,

    'design.md': `# Functional Design

## Domain Model (DDD)
### Bounded Context: [Name]
- **Aggregate Root**: [Entity Name]
  - Attributes: [List]
  - Behaviors: [List]
- **Value Objects**: [List]
- **Domain Events**: [List]

## API Design
### POST /api/v1/resource
- **Input**: JSON Schema
- **Output**: 201 Created
- **Error**: 400 Bad Request

## Algorithms
[Description of complex logic or workflows]
`,

    'tasks-plan.md': `# Tasks Plan (Bolt)

## Context
**Target Unit**: [Unit Name]  
**Goal**: [Specific outcome of this Bolt]

## Task List
- [ ] **Task 1**: [Description]
  - [ ] Subtask 1.1
  - [ ] Subtask 1.2
- [ ] **Task 2**: [Description]
- [ ] **Verification**: Run unit tests
- [ ] **Verification**: Run linter

## Validation
- [ ] All tests passed
- [ ] Code reviewed
`,

    'validation-report.md': `# Validation Report

## Test Summary
- **Unit Tests**: [PASSED / FAILED] (Covered: XX%)
- **Integration Tests**: [PASSED / FAILED]
- **Security Scan**: [PASSED / FAILED]
- **Linting**: [PASSED / FAILED]

## Issues Found
| Severity | Issue | Status |
|----------|-------|--------|
| High | [Description] | Fixed |
| Medium | [Description] | Pending |

## Conclusion
[Ready for Deployment / Needs Rework]
`,

    'deployment-plan.md': `# Deployment Plan

## Strategy
- [ ] **Blue/Green** OR **Rolling Update**

## Steps
1. [ ] **Build**: Create container image [tag: v1.0.1]
2. [ ] **Test**: Run smoke tests on Staging
3. [ ] **Deploy**: Apply Terraform to Production
4. [ ] **Verify**: Monitor error rates for 15 mins
5. [ ] **Rollback**: (If needed) revert to v1.0.0

## Rollback Trigger
- Error rate > 1%
- Latency p95 > 500ms
`,

    'runbooks.md': `# Runbooks

## Alert: High Latency
**Trigger**: p95 > 500ms for 5 mins
1. Check CPU/Memory usage.
2. Check database connection pool.
3. **Action**: Scale out ECS service.

## Alert: 5xx Errors
**Trigger**: Error rate > 1%
1. Check application logs for exceptions.
2. Check external dependency status.
3. **Action**: Restart service if stuck.
`,

    'observability.md': `# Observability

## Key Metrics (Golden Signals)
- **Latency**: Request duration
- **Traffic**: Requests per second
- **Errors**: HTTP 5xx rate
- **Saturation**: CPU/Memory utilization

## Dashboards
- [Link to Grafana/CloudWatch]

## Logging
- **Level**: INFO (DEBUG for specific modules)
- **Retention**: 30 days
`,

    'cost.md': `# Cost Model

## Estimates (Monthly)
| Resource | Count | Type | Est. Cost |
|----------|-------|------|-----------|
| Compute | 2 | t3.medium | $30 |
| Database | 1 | db.t3.micro | $15 |
| Storage | 100GB | S3 Standard | $2.30 |
| **Total** | | | **~$47.30** |

## Scaling Assumptions
- Costs scale linearly with user count up to 10k users.
- Caching layer (Redis) recommended above 10k users to reduce DB load.
`
};
