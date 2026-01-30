// Gatekeeper Scenarios Content
// Converted from gates.json

import { GatekeeperScenario } from '@/types';

export const GATEKEEPER_SCENARIOS: GatekeeperScenario[] = [
  {
    id: 'g1',
    phase: 'Inception',
    stage: 'Requirements Analysis',
    context: 'You are reviewing an AI-generated requirements document for a user authentication feature. The AI claims the requirements are complete and ready for Construction.',
    ai_plan: `## Authentication Requirements

1. Users can log in with email and password
2. Users can reset their password via email
3. Session management with 24-hour timeout

## Proposed Next Steps
- Begin coding the login endpoint immediately
- Add tests after the feature is complete
- Security review at the end`,
    flaws: [
      'No acceptance criteria defined for each requirement',
      'Missing security NFRs (password hashing, rate limiting, MFA)',
      'Tests deferred until after coding (should be concurrent)',
      'Security review at end instead of upfront threat modeling',
      'No performance requirements (login latency, concurrent users)',
    ],
    decisions: {
      correct_action: 'reject',
      valid_reasons: [
        'Missing acceptance criteria',
        'No security requirements defined',
        'Tests should not be deferred',
        'Security review should happen earlier',
        'Missing performance requirements',
      ],
      invalid_reasons: [
        'Requirements are too simple',
        'Should use OAuth instead of email/password',
        '24-hour session timeout is wrong',
      ],
    },
    evidence_checklist: [
      'Acceptance criteria for each requirement',
      'Security NFRs: password hashing algorithm, rate limiting rules, MFA requirements',
      'Performance NFRs: max login latency, concurrent user capacity',
      'Test strategy document with coverage targets',
      'Threat model or security review approval',
    ],
  },
  {
    id: 'g2',
    phase: 'Construction',
    stage: 'Unit Implementation',
    context: 'You are reviewing an AI-generated implementation plan for Unit 03 (API endpoints). The previous units have been completed and approved.',
    ai_plan: `## Unit 03: API Endpoints Implementation Plan

### Tasks
- [x] Design document reviewed ✓
- [x] Acceptance criteria confirmed ✓
- [ ] Implement GET /users endpoint
- [ ] Implement POST /users endpoint
- [ ] Implement PUT /users/{id} endpoint
- [ ] Implement DELETE /users/{id} endpoint
- [ ] Add unit tests
- [ ] Run integration tests
- [ ] Update API documentation

### Evidence
- Design approved in construction/unit-03/design.md
- All tests will be added after implementation`,
    flaws: [
      "Tests 'will be added after' - should be concurrent",
      'No mention of validation testing',
      'Missing error handling verification',
      'No performance/load testing mentioned',
    ],
    decisions: {
      correct_action: 'reject',
      valid_reasons: [
        'Tests should be concurrent, not after',
        'Missing validation testing plan',
        'No error handling verification',
        'Missing performance testing',
      ],
      invalid_reasons: [
        'Too many endpoints',
        'Should use GraphQL instead',
        'Documentation update is unnecessary',
      ],
    },
    evidence_checklist: [
      'Test plan showing concurrent test development',
      'Input validation test cases defined',
      'Error response test cases (400, 401, 404, 500)',
      'Performance baseline targets (requests/sec, latency)',
      'API documentation reviewed before implementation',
    ],
  },
  {
    id: 'g3',
    phase: 'Construction',
    stage: 'Unit Completion',
    context: 'The AI has completed implementation of Unit 02 (Database Layer) and is requesting approval to mark the unit as Done. Review the completion evidence.',
    ai_plan: `## Unit 02 Completion Report

### Status: Ready for Approval

### Completed Tasks
- Created database schema (users, sessions, audit_log tables)
- Implemented repository pattern for data access
- Added connection pooling

### Evidence
- Code committed to feature branch
- 'It works on my machine' - tested locally
- Schema looks correct

### Request
Please approve Unit 02 as complete so we can proceed to Unit 03.`,
    flaws: [
      "'Works on my machine' is not proof - needs automated tests",
      'No mention of test coverage or test results',
      'No acceptance criteria verification',
      "'Schema looks correct' is prose, not proof",
      'No migration scripts mentioned',
      'No review evidence',
    ],
    decisions: {
      correct_action: 'reject',
      valid_reasons: [
        'No automated test evidence',
        'No acceptance criteria verification',
        'No test coverage report',
        'Missing migration scripts',
        "'Looks correct' is not proof",
      ],
      invalid_reasons: [
        'Should use NoSQL instead',
        'Connection pooling is premature optimization',
        'Repository pattern adds complexity',
      ],
    },
    evidence_checklist: [
      'Automated test suite passing (CI green)',
      'Test coverage report meeting target threshold',
      'Each acceptance criterion verified with specific test',
      'Migration scripts tested (up and down)',
      'Code review approval documented',
      'Performance baseline established',
    ],
  },
  {
    id: 'g4',
    phase: 'Inception',
    stage: 'Unit Decomposition',
    context: 'You are reviewing an AI-proposed unit decomposition for a new feature. The AI has broken down the work into units and is requesting approval to proceed to Construction.',
    ai_plan: `## Feature: Dashboard Analytics

### Proposed Units

**Unit 1: Everything**
- Build complete analytics dashboard
- Backend API, frontend UI, database schema
- All charts and visualizations
- User preferences storage
- Export functionality
- Real-time updates

### Dependencies
- None (self-contained)

### Timeline
- Estimated: 2 weeks

### Request
Approve this unit breakdown to begin Construction.`,
    flaws: [
      "Single monolithic unit - violates 'small, coherent units' principle",
      'No acceptance criteria per unit',
      'No dependency analysis between sub-components',
      'Mixed concerns (backend, frontend, database in one unit)',
      'No gate checkpoints within the large scope',
    ],
    decisions: {
      correct_action: 'reject',
      valid_reasons: [
        'Unit is too large - should be decomposed',
        'Missing acceptance criteria',
        'Mixed concerns (backend/frontend/database)',
        'No intermediate checkpoints',
        'No clear dependencies mapped',
      ],
      invalid_reasons: [
        '2 weeks is too long',
        'Real-time updates are unnecessary',
        'Should use a different charting library',
      ],
    },
    evidence_checklist: [
      '3-5 smaller units with single responsibility each',
      'Clear acceptance criteria for each unit',
      'Dependency graph showing unit relationships',
      'Estimated complexity/size for each unit',
      'Gate criteria defined for each unit completion',
      'Risk assessment for each unit',
    ],
  },
  {
    id: 'g5',
    phase: 'Construction',
    stage: 'Build and Test',
    context: 'You are reviewing a validation report for Unit 04. Most tests pass but there are some failures. The team is asking if they can proceed to the next unit.',
    ai_plan: `## Unit 04 Validation Report

### Test Results
- Unit tests: 47/50 passed (94%)
- Integration tests: 12/15 passed (80%)
- Linting: Clean
- Security scan: No critical issues

### Failed Tests
- test_edge_case_empty_input - FAILED (timeout)
- test_concurrent_access - FAILED (race condition)
- test_large_payload - FAILED (memory error)
- test_payment_validation - FAILED (incorrect amount)
- test_rollback_scenario - FAILED (data inconsistency)

### Request
Can we proceed? The failures are edge cases and we can fix them later.`,
    flaws: [
      "5 failed tests are not 'edge cases' - they indicate real bugs",
      'Concurrent access failure is a serious race condition',
      'Payment validation failure could cause financial issues',
      'Data inconsistency in rollback is a critical bug',
      "'Fix later' violates proof over prose",
    ],
    decisions: {
      correct_action: 'reject',
      valid_reasons: [
        'Failed tests indicate real bugs',
        'Race condition needs fixing before proceed',
        'Payment validation failure is critical',
        'Cannot defer bugs to later',
        'Data inconsistency is serious',
      ],
      invalid_reasons: [
        '94% pass rate is good enough',
        'Edge cases can be ignored',
        'We can hotfix later',
        "Integration tests don't matter",
      ],
    },
    evidence_checklist: [
      'All unit tests passing (100%)',
      'All integration tests passing (100%)',
      'Race condition root cause identified and fixed',
      'Payment validation logic reviewed and corrected',
      'Rollback scenario working correctly',
      'Re-run full test suite after fixes',
    ],
  },
  {
    id: 'g6',
    phase: 'Construction',
    stage: 'Security Review',
    context: 'The security team has flagged concerns but the deadline is tomorrow. The PM is pushing to proceed. Review the situation.',
    ai_plan: `## Security Review Findings

### Critical Issues (0)
None found.

### High Issues (2)
1. SQL injection possible in search endpoint
2. API keys exposed in client-side code

### Medium Issues (4)
- Missing rate limiting
- No input sanitization on file uploads
- Session tokens don't expire
- Debug mode enabled in production config

### PM Note
'We need to ship tomorrow for the quarterly demo. Can we document these and fix in the next sprint?'`,
    flaws: [
      "SQL injection is a critical vulnerability, not just 'high'",
      'API keys in client code is a security breach waiting to happen',
      'Cannot ship known security vulnerabilities',
      "'Fix in next sprint' violates safety constraints",
      "Demo deadline doesn't override security",
    ],
    decisions: {
      correct_action: 'reject',
      valid_reasons: [
        'SQL injection must be fixed before ship',
        'API keys must be removed from client',
        'Cannot ship known vulnerabilities',
        'Security > schedule',
        'Debug mode in prod is dangerous',
      ],
      invalid_reasons: [
        "It's just for a demo",
        'We can hotfix after the demo',
        'No one will find the vulnerabilities',
        'The deadline is more important',
      ],
    },
    evidence_checklist: [
      'SQL injection vulnerability fixed and verified',
      'API keys moved to secure backend storage',
      'Rate limiting implemented',
      'File upload sanitization added',
      'Session token expiration configured',
      'Debug mode disabled in production',
      'Penetration test passed',
    ],
  },
  {
    id: 'g7',
    phase: 'Inception',
    stage: 'Requirements Analysis',
    context: 'Review this requirements document. The AI has done thorough work and the stakeholders are satisfied.',
    ai_plan: `## Payment Processing Requirements

### Functional Requirements

**FR-01: Process Credit Card Payments**
- Acceptance Criteria:
  - AC1: System accepts Visa, Mastercard, Amex
  - AC2: Transactions complete in < 3 seconds
  - AC3: Failed transactions show clear error message
  - AC4: Successful transactions generate receipt

**FR-02: Handle Refunds**
- Acceptance Criteria:
  - AC1: Full refunds processed within 5 business days
  - AC2: Partial refunds supported
  - AC3: Refund notification sent to customer

### Non-Functional Requirements
- PCI-DSS compliance required
- 99.9% uptime SLO
- All transactions encrypted in transit and at rest
- Audit log for all financial operations
- Rate limiting: 100 transactions/minute/merchant

### Security Review
- Threat model approved by security team
- Penetration test scheduled for Construction phase

### Evidence
- Stakeholder sign-off obtained
- Legal review complete
- Compliance checklist verified`,
    flaws: [],
    decisions: {
      correct_action: 'approve',
      valid_reasons: [
        'Clear acceptance criteria defined',
        'Security NFRs specified',
        'Compliance requirements included',
        'Stakeholder approval obtained',
        'Threat model completed',
      ],
      invalid_reasons: [
        'Should add more features',
        '3 second timeout is too slow',
        'Should support cryptocurrency',
      ],
    },
    evidence_checklist: [
      'Acceptance criteria for each requirement ✓',
      'Security NFRs defined ✓',
      'Compliance requirements documented ✓',
      'Stakeholder sign-off ✓',
      'Threat model approved ✓',
    ],
  },
  {
    id: 'g8',
    phase: 'Inception',
    stage: 'Workflow Planning',
    context: 'The AI has proposed a workflow plan but seems to be skipping some stages. Review whether the plan is appropriate.',
    ai_plan: `## Workflow Plan: Add Dark Mode Feature

### Request Type: Brownfield (existing app)
### Risk Level: Low
### Estimated Effort: Small

### Proposed Stages
1. ~~Workspace Detection~~ (skip - already know the codebase)
2. ~~Reverse Engineering~~ (skip - we built it ourselves)
3. Requirements Analysis (minimal - just dark mode toggle)
4. ~~User Stories~~ (skip - single feature)
5. ~~Application Design~~ (skip - CSS changes only)
6. Workflow Planning (this document)
7. Code Generation (CSS variables + toggle component)
8. Build and Test (visual regression tests)

### Rationale
This is a simple UI enhancement. Full ceremony would be wasteful.`,
    flaws: [
      'Skipping Reverse Engineering even for brownfield is risky',
      'No analysis of where dark mode affects the app',
      'CSS-only assumption may be wrong (images, charts, third-party components)',
      "'We built it ourselves' doesn't mean we remember everything",
      'Should check for accessibility implications (contrast ratios)',
    ],
    decisions: {
      correct_action: 'reject',
      valid_reasons: [
        'Brownfield needs reverse engineering',
        'Impact analysis missing',
        'Accessibility not considered',
        'Third-party components not analyzed',
        'Images/charts may need dark versions',
      ],
      invalid_reasons: [
        'Too many stages skipped',
        'Dark mode is too simple',
        'Should be full ceremony',
      ],
    },
    evidence_checklist: [
      'Impact analysis: which components affected',
      'Accessibility review: contrast ratios for dark theme',
      'Third-party component compatibility check',
      'Image/chart dark mode variants identified',
      'User preference persistence mechanism defined',
      'Visual regression test plan',
    ],
  },
  {
    id: 'g9',
    phase: 'Operations',
    stage: 'Production Readiness',
    context: 'The team is requesting approval to deploy to production. Review the production readiness evidence.',
    ai_plan: `## Production Readiness Review

### Deployment
- IaC templates created (Terraform)
- CI/CD pipeline configured
- Staging deployment successful

### Observability
- Logging: CloudWatch configured
- Metrics: Basic CPU/memory dashboards
- Tracing: Not implemented yet

### Operations
- Runbooks: 'We will write them after we see what breaks'
- Alerts: CPU > 80% alert configured
- On-call: Not set up yet

### Rollback
- Blue/green deployment configured
- Rollback not tested

### Request
We'd like to deploy Monday. Can we get production approval?`,
    flaws: [
      "Tracing not implemented - can't debug distributed issues",
      "Runbooks 'after we see what breaks' is reactive, not proactive",
      'Only one alert (CPU) - need error rates, latency, etc.',
      'No on-call rotation defined',
      'Rollback not tested is a major gap',
    ],
    decisions: {
      correct_action: 'reject',
      valid_reasons: [
        'Tracing required for debugging',
        'Runbooks must exist before deploy',
        'Need more alerts (errors, latency)',
        'On-call must be defined',
        'Rollback must be tested',
      ],
      invalid_reasons: [
        'Staging worked fine',
        'We can add tracing later',
        'Monday deadline is important',
      ],
    },
    evidence_checklist: [
      'Distributed tracing implemented and verified',
      'Runbooks written for common incident types',
      'Alerts configured: error rate, latency p99, availability',
      'On-call rotation documented with escalation path',
      'Rollback tested successfully',
      'SLOs defined and dashboards created',
    ],
  },
  {
    id: 'g10',
    phase: 'Construction',
    stage: 'Unit Implementation',
    context: 'Halfway through Construction, the PM asks to add a new feature to the current unit. Review the scope change request.',
    ai_plan: `## Scope Change Request

### Original Scope (Unit 05: User Profile)
- View profile
- Edit profile
- Upload avatar

### Requested Addition
'While you're in there, can you also add:
- Social media link integration
- Profile sharing via QR code
- Activity feed on profile
- Follower/following system'

### PM Justification
'These are related to the profile and it would be more efficient to do them together. The AI says it can handle it.'

### Current Status
- View profile: Complete
- Edit profile: In progress
- Upload avatar: Not started`,
    flaws: [
      'This is scope creep - 4 new features added mid-unit',
      'Social features are separate units (follower system is complex)',
      "Original unit not complete - shouldn't expand",
      "'More efficient' is false - creates larger, riskier change",
      'Activity feed and social features have their own acceptance criteria',
    ],
    decisions: {
      correct_action: 'reject',
      valid_reasons: [
        'Scope creep - complete original unit first',
        'Social features need separate units',
        'Follower system is complex enough for own unit',
        'Adding scope mid-unit increases risk',
        'Original acceptance criteria not met yet',
      ],
      invalid_reasons: [
        'The features are related',
        'AI says it can handle it',
        'It would be more efficient',
      ],
    },
    evidence_checklist: [
      'Original unit completed and approved first',
      'New features documented as separate units',
      'Acceptance criteria defined for each new feature',
      'Impact analysis on existing timeline',
      'Stakeholder approval for scope change',
      'Dependencies between new units mapped',
    ],
  },
];

export const GATEKEEPER_TITLE = 'Gatekeeper Practice';
export const GATEKEEPER_DESCRIPTION = 'Practice reviewing AI-generated plans as a gate approver';

export function getGatekeeperScenarios(): GatekeeperScenario[] {
  return GATEKEEPER_SCENARIOS;
}

export function getScenarioById(id: string): GatekeeperScenario | undefined {
  return GATEKEEPER_SCENARIOS.find(s => s.id === id);
}

export function getTotalScenarios(): number {
  return GATEKEEPER_SCENARIOS.length;
}
