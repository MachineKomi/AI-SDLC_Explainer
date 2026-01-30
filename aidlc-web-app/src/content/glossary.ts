// Glossary Terms Content
// Converted from glossary.py

import { GlossaryTerm } from '@/types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // Core Concepts
  {
    id: 'aidlc',
    term: 'AI-DLC',
    definition: 'AI-Driven Development Lifecycle. A methodology where AI is a central collaborator, proposing plans and executing within human-approved bounds.',
    example: 'In AI-DLC, the AI generates a requirements plan, humans approve it, then AI implements.',
    related: ['sdlc', 'inception', 'construction', 'operations'],
    source: 'AI-SDLC_best-practice_method_principles.md#L24-26',
  },
  {
    id: 'intent',
    term: 'Intent',
    definition: 'A high-level statement of purpose (business goal, feature, or technical outcome) that serves as the starting point for AI-driven decomposition.',
    example: "Intent: 'Build a recommendation engine for cross-selling products.'",
    related: ['unit', 'requirements', 'inception'],
    source: 'aidlc-method-definition.md#L68-69',
  },
  {
    id: 'unit',
    term: 'Unit',
    definition: 'A cohesive, self-contained work element derived from an Intent that delivers measurable value. Comparable to DDD subdomains or Scrum epics.',
    example: "Unit: 'User Authentication' with stories for login, signup, password reset.",
    related: ['intent', 'bolt', 'acceptance-criteria'],
    source: 'aidlc-method-definition.md#L71-75',
  },
  {
    id: 'bolt',
    term: 'Bolt',
    definition: 'The smallest iteration in AI-DLC, measured in hours or days (not weeks). Analogous to a Scrum sprint but faster.',
    example: 'A 4-hour Bolt to implement the login endpoint with tests.',
    related: ['unit', 'sprint', 'construction'],
    source: 'aidlc-method-definition.md#L77-78',
  },
  {
    id: 'gate',
    term: 'Gate',
    definition: 'An explicit approval checkpoint where human validation is required before proceeding. Gates prevent AI from running ahead without oversight.',
    example: 'Inception Exit Gate: Requirements and units must be approved before construction.',
    related: ['approval', 'checkpoint', 'proof-over-prose'],
    source: 'AI-SDLC_best-practice_method_principles.md#L36-38',
  },
  {
    id: 'artifact',
    term: 'Artifact',
    definition: 'A durable document or file stored in the repository that captures decisions, plans, or evidence. Artifacts persist context beyond chat history.',
    example: 'Artifacts: intent.md, requirements.md, design.md, validation-report.md',
    related: ['aidlc-docs', 'audit', 'evidence'],
    source: 'AI-SDLC_best-practice_method_principles.md#L44-46',
  },
  // Phases
  {
    id: 'inception',
    term: 'Inception',
    definition: 'The first phase of AI-DLC that determines WHAT to build and WHY. Converts intent into testable, decomposed work.',
    example: 'Inception produces: intent.md, requirements.md, units/',
    related: ['construction', 'operations', 'mob-elaboration'],
    source: 'AI-SDLC_best-practice_method_principles.md#L80-99',
  },
  {
    id: 'construction',
    term: 'Construction',
    definition: 'The second phase of AI-DLC that determines HOW to build. Transforms units into tested, operations-ready deployment units.',
    example: 'Construction produces: design.md, code, tests, validation-report.md',
    related: ['inception', 'operations', 'mob-construction'],
    source: 'AI-SDLC_best-practice_method_principles.md#L101-122',
  },
  {
    id: 'operations',
    term: 'Operations',
    definition: 'The third phase of AI-DLC that determines WHERE and WHEN to run. Productionizes with safety and observability.',
    example: 'Operations produces: deployment-plan.md, runbooks.md, observability.md',
    related: ['inception', 'construction', 'production-readiness'],
    source: 'AI-SDLC_best-practice_method_principles.md#L124-138',
  },
  // Rituals
  {
    id: 'mob-elaboration',
    term: 'Mob Elaboration',
    definition: 'A collaborative ritual where the team works together to convert intent into requirements and units. AI proposes, humans refine.',
    example: '60-minute session: AI generates user stories, team reviews and adjusts.',
    related: ['inception', 'mob-construction', 'ritual'],
    source: 'aidlc-method-definition.md#L97-114',
  },
  {
    id: 'mob-construction',
    term: 'Mob Construction',
    definition: 'A collaborative ritual where teams are collocated, exchanging integration specs, making decisions, and delivering Bolts.',
    example: '2-hour session: AI implements tasks, humans review code and validate.',
    related: ['construction', 'mob-elaboration', 'bolt'],
    source: 'aidlc-method-definition.md#L127-129',
  },
  // Principles
  {
    id: 'human-accountability',
    term: 'Human Accountability',
    definition: "The principle that humans own decisions and outcomes; AI proposes and executes within bounds. The 'loss function' of AI-DLC.",
    example: 'AI generates a plan; human reviews and approves before execution.',
    related: ['gate', 'approval', 'oversight'],
    source: 'AI-SDLC_best-practice_method_principles.md#L32-34',
  },
  {
    id: 'proof-over-prose',
    term: 'Proof Over Prose',
    definition: "The principle that 'done' requires objective evidence (tests passing, checks green, runtime behavior validated), not just claims.",
    example: 'Unit is done when: tests pass, lint clean, security scan green, manual validation recorded.',
    related: ['evidence', 'validation-report', 'gate'],
    source: 'AI-SDLC_best-practice_method_principles.md#L52-54',
  },
  {
    id: 'adaptive-depth',
    term: 'Adaptive Depth',
    definition: 'The principle of executing only stages that add value and generating the level of detail needed (not fixed ceremony).',
    example: 'Bugfix: skip design stages. Complex feature: full ceremony.',
    related: ['stage', 'conditional', 'workflow-variants'],
    source: 'AI-SDLC_best-practice_method_principles.md#L48-50',
  },
  {
    id: 'plan-first',
    term: 'Plan-First',
    definition: 'The principle that every meaningful step starts with an explicit plan (with checkpoints) and an approval gate before execution.',
    example: 'Create tasks-plan.md with checkboxes, get approval, then execute.',
    related: ['gate', 'approval', 'checkpoint'],
    source: 'AI-SDLC_best-practice_method_principles.md#L36-38',
  },
  {
    id: 'small-batches',
    term: 'Small Batches',
    definition: 'The principle of decomposing work into units that can be built and verified independently. Keeps delivery incremental and reviewable.',
    example: "Break 'User Management' into: Login, Signup, Password Reset, Profile (4 units).",
    related: ['unit', 'bolt', 'decomposition'],
    source: 'AI-SDLC_best-practice_method_principles.md#L40-42',
  },
  // Stages
  {
    id: 'workspace-detection',
    term: 'Workspace Detection',
    definition: "An Inception stage that analyzes the project to determine if it's greenfield or brownfield and identifies the technology stack.",
    example: "AI scans repo: 'Detected Python/FastAPI brownfield project.'",
    related: ['inception', 'greenfield', 'brownfield'],
    source: 'aidlc-workflows/inception/workspace-detection.md',
  },
  {
    id: 'reverse-engineering',
    term: 'Reverse Engineering',
    definition: 'An Inception stage (brownfield only) that analyzes existing codebase structure, architecture, and dependencies before making changes.',
    example: 'Produces: component diagram, dependency map, risk assessment.',
    related: ['brownfield', 'inception', 'static-analysis'],
    source: 'aidlc-workflows/inception/reverse-engineering.md',
  },
  {
    id: 'requirements-analysis',
    term: 'Requirements Analysis',
    definition: 'An Inception stage that gathers, validates, and documents functional requirements and constraints.',
    example: 'Produces: requirements.md with user stories, acceptance criteria, constraints.',
    related: ['inception', 'user-stories', 'acceptance-criteria'],
    source: 'aidlc-workflows/inception/requirements-analysis.md',
  },
  {
    id: 'workflow-planning',
    term: 'Workflow Planning',
    definition: 'An Inception stage that creates the execution plan, deciding which stages will run and in what order.',
    example: 'Produces: execution-plan.md with stage sequence and rationale.',
    related: ['inception', 'adaptive-depth', 'execution-plan'],
    source: 'aidlc-workflows/inception/workflow-planning.md',
  },
  {
    id: 'functional-design',
    term: 'Functional Design',
    definition: 'A Construction stage that creates detailed business logic design for a unit, including domain model and API design.',
    example: 'Produces: design.md with entities, services, API endpoints.',
    related: ['construction', 'domain-design', 'ddd'],
    source: 'aidlc-workflows/construction/functional-design.md',
  },
  {
    id: 'nfr-design',
    term: 'NFR Design',
    definition: 'A Construction stage that incorporates non-functional requirements (availability, latency, security, compliance) into the design.',
    example: 'Adds patterns: circuit breakers, caching, encryption, audit logging.',
    related: ['construction', 'nfr', 'architecture-patterns'],
    source: 'aidlc-workflows/construction/nfr-design.md',
  },
  {
    id: 'code-generation',
    term: 'Code Generation',
    definition: 'A Construction stage where AI generates code from the design, always in two parts: planning then generation.',
    example: 'Part 1: Create code plan. Part 2: Implement in small batches.',
    related: ['construction', 'implementation', 'tests'],
    source: 'aidlc-workflows/construction/code-generation.md',
  },
  {
    id: 'build-and-test',
    term: 'Build and Test',
    definition: 'A Construction stage that builds all units and executes comprehensive testing including unit, integration, and security tests.',
    example: 'Commands: pytest, ruff, bandit. Results in validation-report.md.',
    related: ['construction', 'validation', 'evidence'],
    source: 'aidlc-workflows/construction/build-and-test.md',
  },
  // Workflow Variants
  {
    id: 'greenfield',
    term: 'Greenfield',
    definition: 'A project type with no existing code, building from scratch. Enables full Inception ceremony and maximum design freedom.',
    example: 'Building a new microservice with no legacy constraints.',
    related: ['brownfield', 'workspace-detection', 'inception'],
    source: 'AI-SDLC_best-practice_method_principles.md#L208-215',
  },
  {
    id: 'brownfield',
    term: 'Brownfield',
    definition: 'A project type with existing code that needs modification or extension. Requires mandatory reverse engineering stage.',
    example: 'Adding a feature to an existing monolith application.',
    related: ['greenfield', 'reverse-engineering', 'regression'],
    source: 'AI-SDLC_best-practice_method_principles.md#L218-226',
  },
  // Artifacts
  {
    id: 'aidlc-docs',
    term: 'aidlc-docs/',
    definition: 'The standard directory for AI-DLC artifacts in a repository. Contains all durable planning, design, and validation documents.',
    example: 'aidlc-docs/inception/, aidlc-docs/construction/, aidlc-docs/audit.md',
    related: ['artifact', 'execution-plan', 'audit'],
    source: 'AI-SDLC_best-practice_method_principles.md#L153-178',
  },
  {
    id: 'execution-plan',
    term: 'Execution Plan',
    definition: 'An artifact (execution-plan.md) that documents the planned stages, their sequence, and rationale for inclusion/exclusion.',
    example: 'Stage: Requirements Analysis - EXECUTE (mandatory for greenfield)',
    related: ['workflow-planning', 'adaptive-depth', 'artifact'],
    source: 'AI-SDLC_best-practice_method_principles.md#L96-97',
  },
  {
    id: 'validation-report',
    term: 'Validation Report',
    definition: 'An artifact (validation-report.md) that documents what tests/checks ran, their results, fixes applied, and final status.',
    example: 'pytest: 47 passed. ruff: clean. Acceptance criteria: 3/3 met.',
    related: ['proof-over-prose', 'evidence', 'build-and-test'],
    source: 'AI-SDLC_best-practice_method_principles.md#L119',
  },
  {
    id: 'audit-log',
    term: 'Audit Log',
    definition: 'An append-only artifact (audit.md) that records timestamped decisions, approvals, and evidence throughout the project.',
    example: '2026-01-28 | Unit 1 approved | Evidence: tests pass, design reviewed',
    related: ['artifact', 'gate', 'evidence'],
    source: 'AI-SDLC_best-practice_method_principles.md#L157',
  },
  // Tools & Integration
  {
    id: 'mcp',
    term: 'MCP',
    definition: 'Model Context Protocol. An open protocol connecting LLM applications to tools and data sources for authoritative context.',
    example: 'AWS Documentation MCP server provides accurate API references.',
    related: ['tooling', 'context', 'aws'],
    source: 'AI-SDLC_best-practice_method_principles.md#L241-243',
  },
  {
    id: 'ralph-loop',
    term: 'Ralph Loop',
    definition: 'A pattern of looping an AI agent until completion with objective success criteria. Used inside Construction, within a unit.',
    example: 'Loop: generate code → run tests → if fail, fix → repeat until pass.',
    related: ['construction', 'automation', 'iteration'],
    source: 'AI-SDLC_best-practice_method_principles.md#L274-298',
  },
  // Other Key Terms
  {
    id: 'acceptance-criteria',
    term: 'Acceptance Criteria',
    definition: "Testable conditions that must be met for a unit or story to be considered complete. Essential for 'proof over prose.'",
    example: 'AC1: User can log in with valid credentials. AC2: Invalid credentials show error.',
    related: ['unit', 'user-stories', 'proof-over-prose'],
    source: 'AI-SDLC_best-practice_method_principles.md#L111',
  },
  {
    id: 'ddd',
    term: 'DDD',
    definition: 'Domain-Driven Design. A design approach using bounded contexts, aggregates, entities, and value objects. AI-DLC v1 applies DDD patterns.',
    example: 'Bounded Context: Orders. Aggregate: Order. Entity: OrderLine.',
    related: ['functional-design', 'domain-model', 'construction'],
    source: 'aidlc-method-definition.md#L31-32',
  },
  {
    id: 'nfr',
    term: 'NFR',
    definition: 'Non-Functional Requirement. Quality attributes like availability, latency, security, compliance, and scalability.',
    example: 'NFR: 99.9% uptime. NFR: p99 latency < 200ms. NFR: GDPR compliant.',
    related: ['nfr-design', 'slo', 'architecture-patterns'],
    source: 'AI-SDLC_best-practice_method_principles.md#L95-96',
  },
  {
    id: 'slo',
    term: 'SLO',
    definition: 'Service Level Objective. A target for service reliability, typically expressed as a percentage or latency threshold.',
    example: 'SLO: 99.9% of requests complete in < 200ms over a rolling 30-day window.',
    related: ['nfr', 'observability', 'operations'],
    source: 'operations observability best practices',
  },
  {
    id: 'iac',
    term: 'IaC',
    definition: 'Infrastructure as Code. Managing infrastructure through code files (Terraform, CloudFormation, CDK) rather than manual configuration.',
    example: 'Terraform modules for VPC, ECS cluster, and RDS database.',
    related: ['operations', 'deployment', 'automation'],
    source: 'AI-SDLC_best-practice_method_principles.md#L131',
  },
];

export function getAllTerms(): GlossaryTerm[] {
  return GLOSSARY_TERMS;
}

export function getTermById(id: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find(term => term.id === id);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return GLOSSARY_TERMS.filter(
    term =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery) ||
      term.id.toLowerCase().includes(lowerQuery)
  );
}

export function getTermsByLetter(letter: string): GlossaryTerm[] {
  const upperLetter = letter.toUpperCase();
  return GLOSSARY_TERMS.filter(term => term.term[0].toUpperCase() === upperLetter);
}
