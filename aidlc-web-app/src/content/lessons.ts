// AI-SDLC Lessons Content
// Converted from Python TUI application

import { Lesson } from '@/types';

export const LESSONS: Lesson[] = [
  {
    id: 'aidlc-overview',
    title: 'AI-SDLC Overview',
    description: 'Learn the fundamentals of AI-Driven Software Development Lifecycle',
    sections: [
      {
        id: 'what-is-aidlc',
        title: 'What is AI-SDLC?',
        content: `AI-SDLC (AI-Driven Software Development Lifecycle) is a transformative approach
to software development that positions AI as a central collaborator.

Key characteristics:
• AI proposes plans, asks clarifying questions, then implements
• Humans own decisions and outcomes; AI executes within bounds
• Not "SDLC + copilots" — a fundamentally different workflow
• Artifacts persist in-repo, not in chat history

The core mental model:
  AI creates plan → Asks questions → Implements after validation
  
This pattern repeats rapidly for every SDLC activity.`,
      },
      {
        id: 'three-phases',
        title: 'The Three Phases',
        content: `AI-SDLC organizes work into three phases, each with specific goals:

• INCEPTION: Determines WHAT to build and WHY
  - Derived via "Mob Elaboration" (Human + AI)
  - Output: Intent, Units, User Stories, Risks
  - Goal: Testable requirements & plan

• CONSTRUCTION: Determines HOW to build it
  - Derived via "Mob Programming" & "Mob Testing"
  - Output: Code, Tests, Logical Design
  - Goal: Deployment-ready artifacts

• OPERATIONS: Deployment and monitoring
  - AI-driven observability & anomaly detection
  - Output: SLA Compliance, Runbooks
  - Goal: Reliability & Feedback loop`,
        diagramType: 'phases-flow',
      },
      {
        id: 'gates',
        title: 'Gates & Approvals',
        content: `Every phase has mandatory GATES requiring human approval.

Gates are not blockers; they are QUALITY FILTERS for the "Golden Thread".

• The "Golden Thread":
  - The continuous link from Business Intent → Code → Deployment.
  - Preserved by artifacts (context), not chat history.
  - Traditional SDLC breaks this thread at handoffs; AI-SDLC preserves it.

• Gates:
  - Checkpoints that verify the Golden Thread is intact.
  - "Proof over prose" — evidence required.
  - Examples: "Inception Exit" (Is intent clear?), "Unit Done" (Do tests pass?).

Benefits:
• Prevents AI from "running away" with wrong assumptions.
• Ensures human accountability without breaking flow.`,
        diagramType: 'gate-loop',
      },
      {
        id: 'artifacts',
        title: 'Artifacts',
        content: `Persisted artifacts are FIRST-CLASS in AI-SDLC.

All lifecycle artifacts live in your repository:

• aidlc-state.md — Current phase/stage + what's next
• execution-plan.md — Approved stage checklist
• audit.md — Append-only decisions and evidence
• prompts.md — Log of all prompts given to AI

Phase-specific artifacts:
• inception/ — Intent, requirements, NFRs, units
• construction/ — Design docs, task plans, validation
• operations/ — Deployment plans, runbooks

Why artifacts matter:
• Durable context (not lost in chat)
• Reviewable by humans and future AI sessions
• Auditable trail of decisions`,
        diagramType: 'artifact-tree',
      },
      {
        id: 'roles',
        title: 'Roles',
        content: `AI-SDLC transforms team roles from "doing" to "approving and designing."

Key roles (minimal set):

• Product/Domain Owner
  - Owns intent, success metrics, scope boundaries
  
• Tech Lead / Architect
  - Owns unit boundaries, NFRs, integration decisions
  
• Engineer(s)
  - Own implementation reviews, tests, code quality
  
• QA
  - Owns test strategy and acceptance evidence
  
• Security
  - Owns threat modeling and security controls
  
• Ops/SRE  
  - Owns deployability and observability
  
• AI Workflow Maintainer
  - Owns prompts, rules, and guardrails as code`,
      },
      {
        id: 'mental-model',
        title: 'The Mental Model',
        content: `The core AI-SDLC mental model is a repeating cycle:

1. AI CREATES A PLAN (Level 1, then Level 2...)
   - Detailed work breakdown with checkpoints
   - Progressive enrichment at each level
   
2. AI ASKS CLARIFYING QUESTIONS  
   - Structured Q&A in dedicated files
   - Seeks missing context before proceeding
   
3. HUMAN VALIDATES AND APPROVES
   - Reviews plan, answers questions, gives go-ahead
   - Critical decisions require explicit sign-off
   
4. AI IMPLEMENTS IN "BOLTS"
   - Bolt = smallest iteration (hours/days, not weeks)
   - Executes only what was approved
   
5. AI PROVES RESULTS
   - Tests passing, checks green, criteria met
   - Runtime validation, not just prose claims

Key insight: AI proposes, humans decide. Each step produces
richer artifacts that become context for the next step.`,
        diagramType: 'construction-loop',
      },
      {
        id: 'summary',
        title: 'Summary & Key Takeaways',
        content: `Congratulations! You've completed the AI-SDLC Overview.

KEY TAKEAWAYS:

1. AI-SDLC has 3 phases: Inception, Construction, Operations

2. Gates require human approval before proceeding

3. Artifacts persist in-repo, not in chat

4. 10 core principles guide the methodology
   (Plan-first, proof over prose, small units, etc.)

5. Roles shift from "doing" to "approving and designing"

6. The mental model: AI proposes → Human approves → AI executes

NEXT STEPS:
• Explore the Phases section for deep dives
• Review the 10 Principles  
• Try the Quiz to test your knowledge`,
        diagramType: 'lesson-complete',
      },
    ],
  },
  {
    id: 'principles',
    title: '10 Core Principles',
    description: 'Master the fundamental principles that guide AI-SDLC',
    sections: [
      {
        id: 'principle-intro',
        title: 'The 10 Principles',
        content: `AI-SDLC is guided by 10 core principles that dictate its
workflow, roles, and artifacts.

These principles ensure the methodology is "AI-Native" rather
than just "AI-Assisted."

We must reimagine software development for an era where
AI is a collaborator, not just a tool.`,
        diagramType: 'principles-list',
      },
      {
        id: 'principle-1',
        title: '1. Reimagine, Don\'t Retrofit',
        content: `PRINCIPLE: Redesign from first principles; don't patch old methods.

What it means:
• Traditional Agile/Scrum assumes long cycles (weeks)
• AI enables cycles in hours/days ("Bolts")
• Estimation rituals (story points) are less relevant
• We must shed legacy constraints to capture AI speed

Why it matters:
• Retrofitting AI into Scrum reinforces inefficiencies
• AI-Native flows are faster and more fluid`,
        diagramType: 'adaptive-depth',
      },
      {
        id: 'principle-2',
        title: '2. Reverse Conversation Direction',
        content: `PRINCIPLE: AI proposes, Human approves.

What it means:
• Old way: Human writes specs, Human writes code
• New way: Human states intent ("Build a login")
• AI proposes plan, options, and trade-offs
• Human validates and approves

Analogy:
• Google Maps: You set destination, System routes, You drive.
• AI is the navigator; Human is the captain.`,
        diagramType: 'plan-first-comparison',
      },
      {
        id: 'principle-3',
        title: '3. Integrates Design Techniques',
        content: `PRINCIPLE: Design techniques (DDD) are core, not optional.

What it means:
• AI applies Domain-Driven Design (DDD) during planning
• Produces "Bounded Contexts" for parallel delivery
• Design artifacts (Domain Models) are first-class

Why it matters:
• Prevents "Big Ball of Mud" architectures
• AI needs structure (Context) to be effective
• Quality is built-in, not bolted-on`,
        diagramType: 'context-persistence',
      },
      {
        id: 'principle-4',
        title: '4. Align with AI Capability',
        content: `PRINCIPLE: Optimistic about potential, realistic about today.

What it means:
• AI is not yet fully autonomous for complex systems
• Humans MUST retain responsibility
• "AI-Driven" ≠ "AI-Autopilot"
• We design for "Human-in-the-loop" at critical points

Key takeaway:
• Trust but verify.
• Use AI for heavy lifting, Humans for judgment.`,
        diagramType: 'accountability-table',
      },
      {
        id: 'principle-5',
        title: '5. Cater to Complex Systems',
        content: `PRINCIPLE: Designed for complexity, not toy apps.

What it means:
• AI-SDLC excels where complexity is high
• Focuses on trade-offs, architecture, and integration
• Simple "no-code" apps don't need this rigor

Target Environment:
• Regulated industries
• Large-scale distributed systems
• Brownfield modernization`,
        diagramType: 'small-batches',
      },
      {
        id: 'principle-6',
        title: '6. User Stories as Contract',
        content: `PRINCIPLE: Retain artifacts that enhance symbiosis.

What it means:
• User Stories remain the "Contract"
• Risk Registers constrain AI creativity
• Keep what works for human validation

Why it matters:
• Humans need familiar handles to control AI
• Prose requirements (Stories) are the bridge`,
        diagramType: 'proof-over-prose',
      },
      {
        id: 'principle-7',
        title: '7. Transition via Familiarity',
        content: `PRINCIPLE: Evolution, not Revolution.

What it means:
• Method should be learnable in a day
• Rename "Sprints" to "Bolts" (hours/days)
• Keep familiar concepts (Backlog, Review)
• Don't alienate experienced engineers

Goal:
• Low barrier to entry
• High ceiling for mastery`,
        diagramType: 'principles-list',
      },
      {
        id: 'principle-8',
        title: '8. Streamline Responsibilities',
        content: `PRINCIPLE: Collapse silos, converge roles.

What it means:
• AI handles undifferentiated heavy lifting
• Roles collapse: Dev + Ops + QA → "Product Engineer"
• Product Owner and Developer remain essential
• Minimize handoffs

Outcome:
• Faster flow
• Higher ownership
• Less "waiting for ticket"`,
        diagramType: 'accountability-table',
      },
      {
        id: 'principle-9',
        title: '9. Minimise Stages, Maximise Flow',
        content: `PRINCIPLE: Prune waste with "Loss Functions".

What it means:
• Validation points act as "loss functions"
• Catch errors early to prevent compounding
• Reduce rigidity
• Flow is paramount

Insight:
• Rigid workflows = "Quick Wet Cement"
• AI-SDLC = Adaptable flow`,
        diagramType: 'fail-fast',
      },
      {
        id: 'principle-10',
        title: '10. No Hard-Wired Workflows',
        content: `PRINCIPLE: Context determines workflow.

What it means:
• No single "One True Way"
• AI proposes Level 1 Plan based on Intent
• Green-field? Brown-field? Bug fix?
• Workflow adapts to the problem

How it works:
• AI suggests plan → Human refines → Execute
• The plan *is* the workflow`,
        diagramType: 'adaptive-depth',
      },
      {
        id: 'principles-summary',
        title: 'Principles Summary',
        content: `The 10 Principles of AI-SDLC:

1. Reimagine (Don't Retrofit)
2. Reverse Conversation (AI Proposes)
3. Design Core (DDD)
4. AI Capability (Realistic)
5. Complex Systems
6. Human Symbiosis (Stories)
7. Transition/Familiarity (Bolts)
8. Streamline/Roles
9. Maximize Flow
10. No Hard-Wiring

These form the foundation of the AI-Driven era.`,
        diagramType: 'lesson-complete',
      },
    ],
  },
  {
    id: 'inception-deep-dive',
    title: 'Phase: Inception',
    description: 'Deep dive into the Inception phase',
    sections: [
      {
        id: 'inception-overview',
        title: 'Inception Overview',
        content: `The INCEPTION phase determines WHAT to build and WHY.

Goal: Convert intent into testable, decomposed work.

Key ritual: MOB ELABORATION
• Conducted with shared screen and facilitator
• AI proposes breakdown into stories and units
• Team (PO, Devs, QA, stakeholders) reviews and refines
• Compresses weeks of sequential work into hours

Key outcomes:
• Clear requirements documented
• Work broken into Units (comparable to DDD subdomains)
• Risks identified with mitigations
• Explicit approval to proceed

Inception answers:
• What problem are we solving?
• Who are the users?
• What are the constraints?
• How will we measure success?`,
        diagramType: 'phases-flow',
      },
      {
        id: 'inception-stages',
        title: 'Inception Stages',
        content: `Inception has several stages (adaptive based on complexity):

1. WORKSPACE DETECTION
   • Is this greenfield or brownfield?
   • What's the tech stack?

2. REVERSE ENGINEERING (brownfield only)
   • Analyze existing architecture
   • Map dependencies
   • Identify technical debt

3. REQUIREMENTS ANALYSIS (mandatory)
   • Elaborate intent
   • Document functional requirements
   • Clarify constraints

4. USER STORIES (if UI/multiple users)
   • Define personas
   • Document user journeys

5. WORKFLOW PLANNING (mandatory)
   • Determine which stages to run
   • Create execution plan

6. APPLICATION DESIGN (if new components)
   • High-level architecture
   • Component responsibilities

7. UNITS GENERATION (if decomposable)
   • Break into parallel units
   • Define acceptance criteria`,
        diagramType: 'inception-flow',
      },
      {
        id: 'inception-complete',
        title: 'Inception Complete',
        content: `You've completed the Inception deep dive!

KEY TAKEAWAYS:

• Inception = WHAT + WHY via Mob Elaboration
• Mandatory stages: Requirements, Workflow Planning
• Conditional stages based on project type
• Key artifacts: Units and Bolts for decomposition
• Artifacts persist in aidlc-docs/inception/
• Exit gate requires human approval

NEXT:
• Explore Construction phase
• Try the Stage Simulator
• Test your knowledge with Practice mode`,
        diagramType: 'lesson-complete',
      },
    ],
  },
  // === LESSON 3b: Phase 0 — Brownfield Elevation ===
  {
    id: 'brownfield-elevation',
    title: 'Phase 0: Brownfield Elevation',
    description: 'For existing systems — how AI reverse-engineers your codebase before changing it',
    sections: [
      {
        id: 'elevation-overview',
        title: 'Why Elevation Exists',
        content: `Most software isn't greenfield. It's a 15-year monolith with
tribal knowledge buried in Slack threads and the heads of
engineers who left two years ago.

AI-SDLC has a mandatory step for brownfield projects that
comes BEFORE Inception: Elevation.

Elevation is Phase 0. Skip it and AI will make confident,
wrong changes to code it doesn't understand.

For existing systems, Construction starts with an Elevation
step: AI reverse-engineers the codebase into static models
(components + relationships) and dynamic models (interaction
flows). Your team validates these models, then proceeds as
normal.

The name is deliberate — you're ELEVATING the implicit
knowledge trapped in code into explicit, reviewable artifacts
that both humans and AI can reason about.`,
        question: {
          prompt: 'Why is Elevation mandatory for brownfield projects?',
          options: [
            'To generate documentation for compliance',
            'AI needs explicit models to make correct changes to existing code',
            'To estimate the cost of the project',
            'To identify which developers to assign',
          ],
          correct: 1,
          explanation: 'Without Elevation, AI lacks understanding of the existing architecture. It will make changes that look correct in isolation but break implicit contracts and hidden dependencies.',
        },
      },
      {
        id: 'static-models',
        title: 'Static Models: Components & Relationships',
        content: `The first output of Elevation is a STATIC MODEL — a map of
what exists and how it connects.

AI analyzes the codebase and produces:

• Component inventory — every service, module, library
• Dependency graph — who calls whom, data flow direction
• Interface contracts — APIs, message formats, shared state
• Technology map — frameworks, databases, external services
• Ownership boundaries — which team owns what (if detectable)

This is not documentation for documentation's sake. It's the
CONTEXT that AI needs to make safe changes.

Without a static model, AI treats every file as independent.
It doesn't know that changing the User model breaks the
Payment service's serialization. It doesn't know that the
"utils" folder is imported by 47 modules.

The static model is the AI's map of the territory. You
wouldn't navigate a city without a map. Don't let AI
navigate your codebase without one.

Your team's job: VALIDATE the model. AI will get 80% right.
The 20% it misses is where the tribal knowledge lives —
the undocumented conventions, the "don't touch that" files,
the implicit contracts between services.`,
        question: {
          prompt: 'What is the primary purpose of the static model?',
          options: [
            'To generate API documentation',
            'To provide AI with a map of components and their relationships',
            'To calculate technical debt metrics',
            'To plan the rewrite schedule',
          ],
          correct: 1,
          explanation: 'The static model gives AI the context it needs to understand how components connect. Without it, AI treats files as independent and breaks implicit contracts.',
        },
      },
      {
        id: 'dynamic-models',
        title: 'Dynamic Models: Interaction Flows',
        content: `The second output is a DYNAMIC MODEL — how the system
behaves at runtime.

AI traces through the codebase and produces:

• Request flows — HTTP request → handler → service → DB → response
• Event chains — event published → subscribers → side effects
• State machines — user lifecycle, order status, payment flow
• Error paths — what happens when things fail
• Integration touchpoints — external API calls, webhooks

Dynamic models capture BEHAVIOR, not just structure. The
static model tells you the Payment service exists. The
dynamic model tells you it's called synchronously during
checkout and asynchronously during refunds — and that the
refund path has a 30-second timeout that nobody documented.

These models become the foundation for:
• Scenario design — you can't write holdout scenarios without
  understanding the actual behavior
• Impact analysis — "if I change X, what flows are affected?"
• Test strategy — which paths are critical, which are edge cases

The validation step is crucial here. AI will infer flows from
code, but it can't know about the manual processes, the
workarounds, or the "we restart the service every Tuesday"
operational knowledge.`,
        question: {
          prompt: 'What do dynamic models capture that static models miss?',
          options: [
            'The programming languages used',
            'Runtime behavior — request flows, event chains, error paths',
            'The number of lines of code',
            'Team structure and ownership',
          ],
          correct: 1,
          explanation: 'Dynamic models capture how the system behaves at runtime — the actual flows, state transitions, and error paths. Static models only show structure and relationships.',
        },
      },
      {
        id: 'elevation-gate',
        title: 'The Elevation Gate',
        content: `Elevation has its own gate before Inception can begin.

The Elevation Gate checklist:

□ Static model reviewed by team — components and
  relationships are accurate
□ Dynamic model reviewed — critical flows are correct
□ Tribal knowledge captured — undocumented conventions,
  implicit contracts, operational workarounds
□ Risk areas identified — fragile code, high-coupling
  zones, areas with no test coverage
□ Boundary decisions made — what's in scope for change,
  what's off-limits

Only after the Elevation Gate passes do you proceed to
Inception. Now when AI proposes a plan during Mob
Elaboration, it has CONTEXT. It knows the territory.

The Elevation artifacts persist in the repo:
  aidlc-docs/elevation/
    static-model.md
    dynamic-model.md
    risk-assessment.md
    boundary-decisions.md

These become living documents. As the codebase evolves,
the models are updated. They're not one-time artifacts —
they're the AI's ongoing understanding of the system.

Teams that skip Elevation and jump straight to "let AI
write code" on a legacy system are the ones who end up
with the horror stories. The 30 minutes spent on Elevation
saves days of debugging wrong assumptions.`,
        diagramType: 'lesson-complete',
        question: {
          prompt: 'When does the Elevation Gate occur?',
          options: [
            'After Construction is complete',
            'Before Inception begins — AI needs context first',
            'During Operations monitoring',
            'At the end of each Bolt',
          ],
          correct: 1,
          explanation: 'The Elevation Gate must pass before Inception starts. AI needs the static and dynamic models as context before it can propose meaningful plans during Mob Elaboration.',
        },
      },
    ],
  },
  // === LESSON 3c: Phase: Construction Deep Dive ===
  {
    id: 'construction-deep-dive',
    title: 'Phase: Construction',
    description: 'Deep dive into the Construction phase — where AI builds and humans validate',
    sections: [
      {
        id: 'construction-overview',
        title: 'Construction Overview',
        content: `Construction determines HOW to build what Inception defined.

Goal: Turn approved Units into deployed, tested software.

Key ritual: MOB CONSTRUCTION
• AI generates code, tests, and documentation
• Humans validate at gates — not line by line
• Work happens in Bolts (hours to days, not weeks)
• Evidence required at every checkpoint

The Construction loop:
  Plan → Design → Implement → Verify → Report

Each Bolt follows this loop. AI proposes an approach, seeks
clarification if needed, implements after approval, then
proves the results with evidence.

Construction is where AI-SDLC diverges most from traditional
development. The human role shifts from WRITING code to
VALIDATING outcomes. You're not a typist anymore — you're
a quality gate.`,
        diagramType: 'construction-loop',
        question: {
          prompt: 'What is the human role during Construction?',
          options: [
            'Writing all the code manually',
            'Validating outcomes at gates — not writing code',
            'Managing the sprint backlog',
            'Running manual tests',
          ],
          correct: 1,
          explanation: 'In Construction, humans shift from writing code to validating outcomes. AI generates, humans verify. The quality gate role is more important than the typing role.',
        },
      },
      {
        id: 'bolts',
        title: 'Bolts: The Unit of Work',
        content: `A Bolt is the smallest iteration in AI-SDLC. Think of it as
a Sprint compressed to hours or days.

BOLT CHARACTERISTICS:
• Duration: hours to days (not weeks)
• Scope: one focused task within a Unit
• Output: tested, deployable code with evidence
• Gate: human approval required before merge

A typical Bolt cycle:

1. AI reviews the Unit spec and proposes an approach
2. AI asks clarifying questions (if any)
3. Human approves the approach
4. AI implements — code, tests, documentation
5. AI runs validation — tests pass, lint clean, types check
6. Human reviews evidence at the gate
7. Approved → merge. Rejected → AI revises.

Why Bolts work:
• Small scope = less risk per iteration
• Fast feedback = errors caught in hours, not weeks
• Evidence-based = no "trust me, it works"
• Parallel execution = multiple Bolts can run simultaneously

The key metric: Bolt Cycle Time. If a Bolt takes more than
8 hours, the Unit needs further decomposition. The sweet
spot is 2–4 hours per Bolt.`,
        question: {
          prompt: 'What is the ideal Bolt Cycle Time?',
          options: [
            '2–4 weeks',
            '2–4 hours',
            '1–2 days',
            'As long as it takes',
          ],
          correct: 1,
          explanation: 'The sweet spot for Bolt Cycle Time is 2–4 hours. If a Bolt takes more than 8 hours, the Unit needs further decomposition into smaller pieces.',
        },
      },
      {
        id: 'domain-design',
        title: 'Domain Design in Construction',
        content: `Before AI writes a single line of code, it produces a
Domain Design. This is DDD applied by AI.

The Domain Design includes:

• Bounded Contexts — clear boundaries between components
• Domain Model — entities, value objects, aggregates
• Interface Contracts — how components communicate
• Data Flow — where data lives and how it moves
• Error Handling Strategy — what happens when things fail

Why this matters at L3+:
AI without domain context produces a "Big Ball of Mud."
It writes code that works in isolation but creates
unmaintainable coupling. DDD gives AI the structure it
needs to produce clean architecture.

The Domain Design is a GATE artifact. It must be reviewed
and approved before implementation begins. This is where
the Tech Lead / Architect earns their keep — validating
that AI's proposed architecture is sound.

Skipping Domain Design is Anti-Pattern #3. It's tempting
("just let AI code it") but produces technical debt at
machine speed. Bad architecture at AI velocity is worse
than bad architecture at human velocity.`,
        question: {
          prompt: 'Why is Domain Design mandatory before implementation?',
          options: [
            'To satisfy compliance requirements',
            'AI without domain context produces unmaintainable coupling',
            'To estimate story points accurately',
            'To generate API documentation',
          ],
          correct: 1,
          explanation: 'Without DDD structure, AI produces code that works in isolation but creates a Big Ball of Mud. Domain Design gives AI the boundaries and contracts it needs for clean architecture.',
        },
      },
      {
        id: 'evidence-gates',
        title: 'Evidence at Gates',
        content: `"Done" in AI-SDLC means PROVEN, not claimed.

Every gate requires evidence. Not prose. Not "I tested it."
Actual, verifiable artifacts:

REQUIRED EVIDENCE:
• Tests passing — unit, integration, and scenario results
• Lint clean — no warnings, no suppressions
• Type check — full type safety verified
• Coverage — meets the threshold defined in the Unit spec
• Performance — meets NFR benchmarks (if applicable)
• Security — no new vulnerabilities introduced

OPTIONAL EVIDENCE (based on Unit complexity):
• Architecture compliance — matches Domain Design
• API contract validation — matches interface specs
• Migration safety — backward compatible (brownfield)
• Accessibility — meets defined standards

The gate reviewer's job is NOT to read every line of code.
It's to verify that the evidence is:
1. Present — all required artifacts exist
2. Genuine — not fabricated or gamed
3. Sufficient — covers the acceptance criteria

This is the "proof over prose" principle in action. AI
generates the evidence automatically. Humans verify it's
real and meaningful.

The Human Override Rate metric tracks how often humans
modify AI output at gates. 10–30% is healthy. Below 5%
means rubber-stamping. Above 50% means the specs or
AI context need improvement.`,
        diagramType: 'proof-over-prose',
        question: {
          prompt: 'What does a Human Override Rate below 5% indicate?',
          options: [
            'AI is performing perfectly',
            'The team has reached L5 maturity',
            'Rubber-stamping — humans aren\'t actually reviewing',
            'Specs are exceptionally well-written',
          ],
          correct: 2,
          explanation: 'Override Rate below 5% is a red flag for rubber-stamping. Humans are approving without meaningful review. Quality degrades silently when nobody is actually checking.',
        },
      },
      {
        id: 'construction-complete',
        title: 'Construction Complete',
        content: `You've completed the Construction deep dive!

KEY TAKEAWAYS:

• Construction = HOW via Mob Construction
• Work happens in Bolts (hours, not weeks)
• Domain Design is mandatory before implementation
• Evidence required at every gate — proof over prose
• Human Override Rate is the key calibration metric
• AI generates, humans validate — not the other way around

The Construction phase produces:
  aidlc-docs/construction/unit-XX/
    design.md — Domain Design
    tasks-plan.md — Bolt breakdown
    validation-report.md — Evidence trail

NEXT:
• Explore the Operations phase
• Try the Gatekeeper Practice to test gate decisions
• Review the Metrics section in the Leader's Cheat Sheet`,
        diagramType: 'lesson-complete',
      },
    ],
  },
  // === LESSON 3d: Phase: Operations Deep Dive ===
  {
    id: 'operations-deep-dive',
    title: 'Phase: Operations',
    description: 'Deep dive into the Operations phase — deployment, monitoring, and the feedback loop',
    sections: [
      {
        id: 'operations-overview',
        title: 'Operations Overview',
        content: `Operations is where software meets reality.

Deployment isn't the finish line — it's the start of the
feedback loop. AI-generated systems require rigorous
observability because code written at machine speed can
fail at machine speed.

Key principles:
• Observability first — you can't fix what you can't see
• Cost discipline — AI models cost money, track ROI
• Infrastructure as code — never click in the console
• Rollbackability — speed is useless without brakes

Operations in AI-SDLC is continuous. There's no "release
train" or "deployment window." Each Bolt can deploy
independently when its gate passes. The pipeline must
handle AI-volume changes — 10-100x more deployments
than traditional teams produce.

The Operations phase produces:
  aidlc-docs/operations/
    deployment-plan.md
    runbooks.md
    monitoring-config.md
    incident-response.md`,
        question: {
          prompt: 'Why does Operations need to handle higher deployment volume?',
          options: [
            'More team members are deploying',
            'AI produces 10-100x more changes than human teams',
            'Compliance requires more frequent releases',
            'Users demand daily updates',
          ],
          correct: 1,
          explanation: 'AI-SDLC produces changes at machine speed. Each Bolt can deploy independently, resulting in 10-100x more deployments than traditional teams. The pipeline must be built for this volume.',
        },
      },
      {
        id: 'observability',
        title: 'Observability for AI-Generated Code',
        content: `AI can write code faster than you can read it. That's the
whole point. But it means you need robust observability to
understand what the system is doing in production.

THE OBSERVABILITY STACK:
• Structured logging — every significant action logged with
  context (not just "error occurred")
• Distributed tracing — follow requests across services
• Metrics — latency, throughput, error rates, saturation
• Alerting — anomaly detection, not just threshold alerts

AI-SPECIFIC OBSERVABILITY:
• Token usage tracking — cost per feature, cost per user
• Model routing metrics — which model handles which tasks
• AI decision audit — what did the AI decide and why
• Drift detection — is AI output quality degrading over time

The key insight: traditional monitoring assumes humans
understand the code. With AI-generated code, you might NOT
understand every implementation detail. Observability
becomes your primary understanding mechanism.

This connects to the "proof over prose" principle. In
Operations, proof means: dashboards showing the system
is healthy, alerts firing when it's not, and runbooks
that AI can follow to remediate issues.`,
        question: {
          prompt: 'Why is observability MORE important for AI-generated code?',
          options: [
            'AI code has more bugs',
            'Humans may not understand every implementation detail',
            'AI doesn\'t write logs',
            'Compliance requires it',
          ],
          correct: 1,
          explanation: 'AI writes code faster than humans can read it. You might not understand every implementation detail. Observability becomes your primary mechanism for understanding system behavior.',
        },
      },
      {
        id: 'cost-discipline',
        title: 'Cost Discipline & Model Routing',
        content: `AI models cost money. Every prompt, every generation, every
validation has a token cost. Without discipline, AI-SDLC
can be expensive.

MODEL ROUTING STRATEGY:
• Simple tasks → cheaper, faster models (GPT-4o-mini, Haiku)
• Complex reasoning → expensive models (Claude Opus, GPT-4)
• Code generation → specialized code models
• Review/validation → can often use smaller models

COST METRICS TO TRACK:
• Cost per Bolt — total AI spend per iteration
• Cost per Unit — total AI spend per feature
• Cost per deployment — including CI/CD AI usage
• ROI ratio — business value delivered / AI cost

The goal isn't to minimize AI cost. It's to maximize the
ratio of value delivered to cost incurred. A $50 AI spend
that saves 40 hours of developer time is excellent ROI.

Budget guardrails:
• Set per-Bolt cost limits
• Alert when a single generation exceeds threshold
• Track cost trends — are they increasing or decreasing?
• Compare AI cost vs. equivalent human cost`,
        question: {
          prompt: 'What is the goal of cost discipline in AI-SDLC?',
          options: [
            'Minimize all AI spending',
            'Maximize the ratio of value delivered to cost incurred',
            'Use only free AI models',
            'Eliminate AI usage in Operations',
          ],
          correct: 1,
          explanation: 'The goal isn\'t to minimize cost — it\'s to maximize ROI. A $50 AI spend that saves 40 hours of developer time is excellent. Track value delivered per dollar spent.',
        },
      },
      {
        id: 'feedback-loop',
        title: 'The Feedback Loop',
        content: `Operations feeds back into Inception. This is the cycle
that makes AI-SDLC continuously improving.

THE FEEDBACK LOOP:
  Operations data → Insights → New Intents → Inception

What feeds back:
• Production incidents → new scenarios for holdout sets
• Performance data → NFR refinements for future Units
• User behavior → feature prioritization signals
• Cost data → model routing optimizations
• Override patterns → AI context improvements

This is where AI-SDLC becomes self-improving. Every
production issue becomes a new scenario. Every user
behavior pattern becomes a new Intent candidate. Every
cost anomaly becomes a routing optimization.

The Remediation Time metric tracks how quickly issues
are resolved:
  Green: < 2 hours
  Amber: 2–8 hours
  Red: > 8 hours

Fast remediation depends on:
• Good observability (you detect issues quickly)
• Runbooks (AI can follow remediation steps)
• Rollback capability (you can undo changes safely)
• Small Bolts (less code to investigate per change)

The feedback loop closes the circle. Operations isn't
the end — it's the beginning of the next improvement.`,
        diagramType: 'lesson-complete',
        question: {
          prompt: 'How do production incidents improve AI-SDLC over time?',
          options: [
            'They don\'t — incidents are just bugs to fix',
            'They become new scenarios in the holdout set for future validation',
            'They trigger automatic code rewrites',
            'They reduce the team size',
          ],
          correct: 1,
          explanation: 'Every production incident becomes a new scenario in the holdout set. This means the same class of issue can\'t recur undetected. The system gets smarter with every failure.',
        },
      },
    ],
  },
  // === LESSON 4: The 5 Levels of AI-Driven Development ===
  {
    id: 'five-levels',
    title: 'The 5 Levels of AI-Driven Development',
    description: 'From spicy autocomplete to dark factories — where does your team actually sit?',
    sections: [
      {
        id: 'the-gap',
        title: 'The Gap',
        content: `There is a widening chasm in software development right now.

On one side: "dark factories" — teams where specs go in and tested,
deployed software comes out. Humans define WHAT and judge outcomes.
AI does everything else.

On the other side: everyone else. Teams bolting Copilot onto their
existing Scrum ceremonies and wondering why they're not 10x faster.

The data is brutal. METR's study showed developers using AI tools
were 19% SLOWER on real-world tasks. Not because the tools are bad
— because the workflows weren't redesigned.

This is the J-curve. You adopt AI, productivity DROPS initially
because you're running new tools through old pipes. The gap between
dark factories and J-curve teams isn't a tooling problem.

It's a people, culture, and org-structure problem.

The 5 Levels framework maps exactly where you are — and what it
takes to cross the gap.`,
        question: {
          prompt: 'What does the METR study reveal about AI tool adoption?',
          options: [
            'Developers were 10x faster with AI tools',
            'Developers were 19% slower on real-world tasks',
            'AI tools had no measurable impact',
            'Only senior developers benefited from AI tools',
          ],
          correct: 1,
          explanation: 'The METR study found developers were 19% slower — not because the tools are bad, but because workflows weren\'t redesigned around them. This is the J-curve in action.',
        },
      },
      {
        id: 'levels-0-2',
        title: 'L0–L2: Spicy Autocomplete → Junior Dev',
        content: `LEVEL 0 — AUTOCOMPLETE
Tab-complete on steroids. AI suggests the next line. You accept
or reject. No workflow change. No risk. No real leverage.

LEVEL 1 — SCOPED TASKS
"Write this function." "Add error handling here." AI does a
bounded task, you review every line. It's a faster typist, not
a collaborator. Full human review required.

LEVEL 2 — MULTI-FILE CHANGES
AI modifies multiple files. Refactors across a module. But you
still READ every change. You're the bottleneck — the human must
understand and own every line of AI output.

Here's the uncomfortable truth: 90% of developers calling
themselves "AI-native" are stuck at L1–L2.

The ceiling at L2 is human reading speed. If you must read every
line the AI writes, you've made writing code cheaper but OWNING
it more expensive. The net gain is modest at best.

In AI-SDLC terms, L0–L2 maps to using AI as a tool within
traditional Construction — helpful, but not transformative.`,
        question: {
          prompt: 'What is the fundamental bottleneck at Level 2?',
          options: [
            'AI model quality',
            'Human reading speed — you must review every line',
            'Lack of test coverage',
            'Insufficient compute resources',
          ],
          correct: 1,
          explanation: 'At L2, the human must read and understand every line of AI output. Writing code got cheaper, but owning it got more expensive. The bottleneck is human review bandwidth.',
        },
      },
      {
        id: 'levels-3-4',
        title: 'L3–L4: Manager → Product Manager',
        content: `LEVEL 3 — THE MANAGER
You direct AI at the PR level. "Implement this feature per the
design doc." You review the PR as a whole — architecture, test
coverage, behavior — not line by line. You're managing AI output
the way a tech lead manages junior devs.

This is where the workflow starts to actually change. You need
better specs, clearer acceptance criteria, and structured review
processes. Sound familiar? This is AI-SDLC's Construction phase.

LEVEL 4 — THE PRODUCT MANAGER
You write specs and evaluate outcomes. Code is a black box. You
care about: Does it meet the spec? Do the tests pass? Does it
behave correctly in production-like scenarios?

L4 maps directly to AI-SDLC's core model:
  Intent → Units → Bolts → Evidence at Gates

You're not reviewing code. You're reviewing OUTCOMES against
SPECIFICATIONS. The spec IS the product. Spec quality becomes
the primary bottleneck — machines build exactly what you
describe, including the ambiguities.

This is where AI-SDLC's emphasis on Mob Elaboration and
structured Intent pays off. Bad specs at L4 = bad software.
There's no human to "fill in the gaps" anymore.`,
        question: {
          prompt: 'At Level 4, what becomes the primary bottleneck?',
          options: [
            'AI model capabilities',
            'Code review throughput',
            'Spec quality — machines build what you describe',
            'Deployment pipeline speed',
          ],
          correct: 2,
          explanation: 'At L4, code is a black box. You evaluate outcomes against specs. If the spec is ambiguous, the AI fills gaps with guesses. Spec quality IS product quality.',
        },
      },
      {
        id: 'level-5',
        title: 'L5: The Dark Factory',
        content: `LEVEL 5 — FULLY AUTONOMOUS
StrongDM reportedly runs a 3-person team that ships production
software. No human writes code. No human reviews code. Specs go
in, tested software comes out.

This isn't science fiction. It's happening now — but only for
teams that redesigned everything:

• Org structure: No sprints, no standups, no code review
• Quality model: External scenarios, not in-repo tests
• Validation: Digital twin environments for integration
• Human role: Spec writing, outcome judgment, edge case design

The key enablers for L5:

1. SCENARIOS (not tests) — Behavioral specifications stored
   OUTSIDE the codebase. The AI can't see them, can't game them.
   They evaluate whether the software actually works from a
   user/business perspective.

2. DIGITAL TWINS — Simulated clones of external services (APIs,
   databases, auth providers). AI develops against these safely.
   Full integration validation without touching production.

3. SPEC-DRIVEN WORKFLOW — Every change starts with a spec.
   The spec is the contract. AI-SDLC's Intent → Units → Bolts
   flow IS the L5 workflow.

Most teams won't reach L5 for years. That's fine. But
understanding it changes how you think about L3 and L4.`,
        question: {
          prompt: 'What prevents AI from "teaching to the test" in a dark factory?',
          options: [
            'Code review by senior engineers',
            'External holdout scenarios the AI cannot see',
            'Higher test coverage requirements',
            'Manual QA testing after deployment',
          ],
          correct: 1,
          explanation: 'Scenarios are behavioral specs stored outside the codebase. The AI can\'t access them during development, so it can\'t optimize for passing them. This is fundamentally different from in-repo tests.',
        },
      },
      {
        id: 'scenarios-vs-tests',
        title: 'Scenarios vs Tests',
        content: `This distinction is critical and new to most developers.

TRADITIONAL TESTS (in-repo):
• Live alongside the code
• AI can see them during development
• AI can (and will) optimize to pass them
• Risk: AI "teaches to the test" — passes all checks but
  misses the actual user intent

SCENARIOS (external holdouts):
• Stored outside the codebase in a separate system
• AI never sees them during development
• Evaluate behavior from user/business perspective
• Cannot be gamed — they're the ground truth

Think of it like education:
• Tests = homework the student can study from
• Scenarios = the final exam they've never seen

In AI-SDLC, this maps to "proof over prose" — but elevated.
It's not enough that the AI says it works (prose). It's not
even enough that tests pass (proof the AI can see). You need
external validation the AI couldn't have optimized for.

This is a genuinely new concept in software development. The
traditional testing pyramid (unit → integration → e2e) was
designed for human developers. When AI writes the code AND
the tests, you need an independent evaluation layer.

AI-SDLC's Gate system is the natural home for scenarios.
Gates already require evidence — scenarios become the
highest-confidence evidence type.`,
        question: {
          prompt: 'Why can\'t traditional in-repo tests serve as scenarios?',
          options: [
            'They run too slowly',
            'They don\'t cover edge cases',
            'AI can see and optimize for them during development',
            'They require too much maintenance',
          ],
          correct: 2,
          explanation: 'When AI writes both code and tests, it can optimize to pass those tests without truly solving the problem. External scenarios the AI can\'t see provide independent validation.',
        },
      },
      {
        id: 'brownfield-reality',
        title: 'The Brownfield Reality',
        content: `Here's what nobody talks about at AI conferences: most software
is legacy. You can't dark-factory a 15-year-old monolith.

The brownfield migration path is pragmatic, not revolutionary:

STEP 1: USE AI AT L2/L3 TO ACCELERATE TODAY
Don't change the workflow yet. Use AI to write code faster
within your existing process. Accept the modest gains.

STEP 2: REVERSE-ENGINEER SPECS FROM CODE
This is AI-SDLC's "Elevation" step. AI analyzes the existing
codebase and produces:
• Static models (components + relationships)
• Dynamic models (interaction flows)
• Implicit business rules made explicit

STEP 3: UPGRADE CI/CD FOR AI VOLUME
When AI writes code at L3+, your pipeline sees 10-100x more
changes. Traditional CI/CD breaks. You need:
• Faster build/test cycles
• Automated scenario validation
• Evidence-based gates (not human approval queues)

STEP 4: SHIFT NEW DEVELOPMENT TO L4/L5
Only AFTER you have specs, scenarios, and pipeline capacity
do you move new features to higher autonomy levels.

The key insight: you don't transform the legacy system.
You transform the PROCESS around it. The monolith stays.
The way you change it evolves.

This maps directly to AI-SDLC's Inception phase for
brownfield — Elevation is mandatory, not optional.`,
        question: {
          prompt: 'What is the first step in the brownfield migration path?',
          options: [
            'Rewrite the legacy system from scratch',
            'Use AI at L2/L3 to accelerate within existing workflows',
            'Skip to L5 dark factory immediately',
            'Hire a new team trained in AI-SDLC',
          ],
          correct: 1,
          explanation: 'Start pragmatically — use AI to accelerate current work without changing the workflow. Then progressively reverse-engineer specs, upgrade CI/CD, and shift new development to higher levels.',
        },
      },
      {
        id: 'org-structures',
        title: 'Org Structures Built for Humans',
        content: `Every ceremony in your current process exists because of
human limitations:

• STANDUPS exist because humans forget what others are doing
• SPRINTS exist because humans need time-boxed focus
• CODE REVIEW exists because humans make mistakes
• QA TEAMS exist because developers miss edge cases
• SCRUM MASTERS exist because process needs facilitation

When AI writes the code, these become friction, not
coordination. The bottleneck moves from implementation
speed to SPEC QUALITY.

What replaces them in AI-SDLC:

• Standups → Async status in artifacts (always current)
• Sprints → Bolts (hours, not weeks)
• Code review → Gate evidence (proof, not opinion)
• QA teams → Scenario validation (external holdouts)
• Scrum Master → AI orchestration (process is automated)

The RACI simplifies to 3 actors:
  AI Agent | Developer | Product Owner

AI is Responsible for execution. Never Accountable.
Humans are Accountable for decisions. Always.

This isn't about eliminating roles. It's about eliminating
the OVERHEAD that exists because humans are slow, forgetful,
and need coordination. AI doesn't need a standup. It doesn't
forget context between sprints. It doesn't need a Scrum Master
to keep it on track.

The roles that GROW in importance: spec writers, domain
experts, scenario designers, outcome evaluators.`,
        question: {
          prompt: 'In the AI-SDLC RACI model, who is NEVER the Accountable party?',
          options: [
            'Product Owner',
            'Developer',
            'AI Agent',
            'Tech Lead',
          ],
          correct: 2,
          explanation: 'AI is Responsible for execution but never Accountable. Humans retain accountability for all decisions. This is a core AI-SDLC principle — AI proposes, humans decide.',
        },
      },
      {
        id: 'talent-reckoning',
        title: 'The Talent Reckoning',
        content: `The data is stark: junior developer job postings in the US
dropped 67%. This isn't a blip — it's structural.

When AI handles L0–L2 tasks (the work juniors traditionally
did), the entry-level pipeline collapses. The skills that
matter now:

RISING IN VALUE:
• Systems thinking — understanding how components interact
• Customer intuition — knowing what users actually need
• Spec writing — precision in describing desired behavior
• Domain expertise — deep knowledge of the problem space
• Scenario design — creating meaningful validation criteria

DECLINING IN VALUE:
• Syntax knowledge — AI handles this
• Boilerplate coding — AI handles this
• Manual testing — scenarios replace this
• Process facilitation — AI orchestrates this

The bar is rising toward GENERALISTS who can think across
the full stack — not specialists who go deep on one layer.

AI-SDLC's emphasis on Intent clarity, domain understanding,
and Mob Elaboration is the answer. The methodology trains
exactly the skills that matter at L3+:

• How to decompose a problem (Units)
• How to specify behavior precisely (Intent)
• How to validate outcomes (Gates + Scenarios)
• How to design for AI collaboration (Artifacts)

The developers who thrive won't be the fastest coders.
They'll be the clearest thinkers.`,
        question: {
          prompt: 'What skill becomes MOST valuable as AI maturity increases?',
          options: [
            'Syntax expertise in multiple languages',
            'Speed of manual coding',
            'Systems thinking and spec-writing precision',
            'Knowledge of specific frameworks',
          ],
          correct: 2,
          explanation: 'As AI handles implementation, the bottleneck shifts to spec quality and systems understanding. The clearest thinkers — not the fastest coders — will thrive.',
        },
      },
    ],
  },
  // === LESSON 5: Operationalizing AI-SDLC — The Leader's Cheat Sheet ===
  {
    id: 'operationalization',
    title: 'Operationalizing AI-SDLC — The Leader\'s Cheat Sheet',
    description: 'Rosetta Stone, RACI, metrics, and the 4-week adoption playbook for B2B leaders',
    sections: [
      {
        id: 'rosetta-stone',
        title: 'The Rosetta Stone',
        content: `Your team speaks Agile. Your board speaks Waterfall. AI-SDLC
speaks neither — but it maps to both.

The Rosetta Stone is the Day-1 handout. Pin it to the wall.

AGILE / WATERFALL          →  AI-SDLC TERM
─────────────────────────────────────────────
Epic / Project Brief       →  Intent
Sprint (2–6 weeks)         →  Bolt (hours–days)
Sprint Planning            →  Mob Elaboration
Sprint Execution           →  Mob Construction
Daily Standup              →  Not required (async artifacts)
Retrospective              →  Continuous (each gate is a retro)
Velocity (story points)    →  Business Value Delivered
Scrum Master               →  Role absorbed by AI orchestration
Separate Design Phase      →  Integrated (DDD baked in)
QA Phase / Sprint Testing  →  Gate Evidence + Scenarios
Release Train              →  Continuous (per-bolt deploy)

The pattern: AI-SDLC doesn't eliminate these concepts. It
COMPRESSES them. A Bolt is a Sprint that takes hours. Mob
Elaboration is Sprint Planning that takes 2 hours instead of
a day. Gates are Retrospectives that happen at every checkpoint.

The vocabulary change isn't cosmetic. "Bolt" signals a
fundamentally different cadence. When your team hears "Sprint,"
they think 2 weeks. When they hear "Bolt," they think hours.
That mental shift matters.`,
        question: {
          prompt: 'What is the AI-SDLC equivalent of a Sprint?',
          options: [
            'Intent',
            'Bolt (hours to days)',
            'Mob Elaboration',
            'Gate Review',
          ],
          correct: 1,
          explanation: 'A Bolt is the AI-SDLC equivalent of a Sprint — same iteration concept, radically compressed from weeks to hours/days. The name signals the different cadence.',
        },
      },
      {
        id: 'mindset-shifts',
        title: '5 Mindset Shifts for Leaders',
        content: `These aren't nice-to-haves. If leadership doesn't internalize
these, adoption stalls at L2.

1. AI LEADS, HUMANS STEER
   The Google Maps analogy: You set the destination. The system
   routes. You drive. AI proposes plans, options, trade-offs.
   Humans validate and approve. Not the other way around.

2. MEASURE VALUE, NOT EFFORT
   Story points measure effort. In AI-SDLC, effort is near-zero
   for implementation. What matters: Did we deliver the right
   thing? Intent Completion Rate replaces Velocity.

3. DESIGN IS NOT OPTIONAL
   Domain-Driven Design is baked into the method. AI needs
   structure (bounded contexts, domain models) to be effective.
   Skipping design at L3+ produces garbage at scale.

4. ROLES CONVERGE, NOT EXPAND
   Don't add an "AI Team" on top of existing roles. Roles
   collapse: Dev + Ops + QA → Product Engineer. The RACI has
   3 actors, not 8. Fewer handoffs, faster flow.

5. ITERATIONS IN HOURS, NOT WEEKS
   If your team is still planning in 2-week sprints, you're
   running AI through human-speed pipes. Bolts are hours to
   days. The feedback loop is per-bolt, not per-sprint.

The common failure mode: leaders who intellectually agree with
these shifts but operationally keep running Scrum with a
Copilot license. That's L1. The shift has to be structural.`,
        question: {
          prompt: 'What replaces Velocity (story points) in AI-SDLC?',
          options: [
            'Lines of code per day',
            'Number of AI prompts',
            'Intent Completion Rate / Business Value Delivered',
            'Sprint burndown charts',
          ],
          correct: 2,
          explanation: 'Story points measure effort, which AI flattens. AI-SDLC measures value: Did we deliver the right thing? Intent Completion Rate and Business Value Delivered replace velocity.',
        },
      },
      {
        id: 'three-phases-glance',
        title: '3 Phases at a Glance',
        content: `INCEPTION (2–4 hours)
Ritual: Mob Elaboration
Who: Product Owner + Developer + AI Agent
What: Intent → Units → User Stories → Risks
Output: Approved execution plan with clear acceptance criteria
Brownfield extra: Elevation step (AI reverse-engineers codebase)

CONSTRUCTION (hours–days per Bolt)
Ritual: Mob Construction
Who: Developer + AI Agent (PO available for questions)
What: AI generates → Human validates at each gate
Output: Tested, deployable code with evidence trail
Cadence: Multiple bolts per day at L4+

OPERATIONS (continuous)
Ritual: AI-Monitored Ops
Who: AI Agent + SRE/Ops (Developer on-call)
What: Automated observability, anomaly detection, runbooks
Output: SLA compliance, incident response, feedback loop

The key difference from Agile: these phases don't repeat on
a fixed cadence (sprints). They flow continuously. A new
Intent triggers Inception. Construction runs in parallel
bolts. Operations is always-on.

For brownfield projects, add the ELEVATION step at the start
of Inception. AI analyzes the existing codebase and produces
static models (components + relationships) and dynamic models
(interaction flows). This is mandatory — you cannot skip it
and expect AI to make good decisions about legacy code.`,
        question: {
          prompt: 'How long does a typical Inception phase take?',
          options: [
            '2–4 weeks',
            '2–4 hours via Mob Elaboration',
            '1–2 days of planning',
            'It varies by sprint length',
          ],
          correct: 1,
          explanation: 'Inception compresses what used to take weeks into 2–4 hours via Mob Elaboration. AI proposes the decomposition, the team challenges it in real-time.',
        },
      },
      {
        id: 'raci-matrix',
        title: 'The RACI Matrix',
        content: `Only 3 actors. AI is never Accountable.

ACTIVITY                    AI    DEV    PO
──────────────────────────────────────────
Intent Clarification        C     C      A/R
Mob Elaboration             R     C      A
Unit Decomposition          R     A      C
Domain Modeling             R     A      I
Code Generation             R     I      -
Test Generation             R     I      -
Gate Validation             I     A/R    I
Scenario Design             C     R      A
Deployment                  R     A      I
Ops Monitoring              R     I      I

R = Responsible  A = Accountable  C = Consulted  I = Informed

Key observations:
• AI is Responsible (does the work) but never Accountable
• Developer is Accountable for technical quality
• Product Owner is Accountable for business value
• No Scrum Master, no QA lead, no release manager

The simplification is the point. Every additional role adds
handoffs. Every handoff adds latency. At L4+, the bottleneck
is spec quality and gate rigor — not coordination overhead.

When someone asks "but who does X?" — the answer is almost
always "AI does it, Developer validates it, PO approves the
outcome." That's the pattern for 80% of activities.`,
        question: {
          prompt: 'How many actors are in the AI-SDLC RACI model?',
          options: [
            '5 (PO, Dev, QA, Scrum Master, AI)',
            '3 (AI Agent, Developer, Product Owner)',
            '4 (AI Agent, Developer, PO, Ops)',
            '2 (AI Agent, Human)',
          ],
          correct: 1,
          explanation: 'The RACI has exactly 3 actors: AI Agent, Developer, and Product Owner. Roles like Scrum Master, QA lead, and release manager are absorbed. Fewer actors = fewer handoffs = faster flow.',
        },
      },
      {
        id: 'metrics',
        title: 'Metrics That Replace the Old',
        content: `Kill your velocity charts. Here's what to measure instead.

INTENT COMPLETION RATE
Formula: Intents delivered / Intents started
Green: > 85%  |  Amber: 70–85%  |  Red: < 70%
Action if red: Specs are too vague or scope is creeping

BOLT CYCLE TIME
Formula: Time from bolt start to gate pass
Green: < 4 hrs  |  Amber: 4–8 hrs  |  Red: > 8 hrs
Action if red: Units too large, decompose further

HUMAN OVERRIDE RATE
Formula: AI outputs modified / Total AI outputs
Green: 10–30%  |  Amber: 5–10% or 30–50%  |  Red: < 5% or > 50%
Action if low: Rubber-stamping — humans aren't reviewing
Action if high: AI needs richer context or better specs

GATE PASS RATE (first attempt)
Formula: Gates passed first try / Total gate attempts
Green: > 75%  |  Amber: 50–75%  |  Red: < 50%
Action if red: Spec quality issues or AI miscalibration

UNITS IN PARALLEL
Formula: Active units being worked simultaneously
Target: Scales with team capacity and AI throughput

DEPLOY FREQUENCY
Formula: Deployments per week
Green: > 5/week  |  Amber: 1–5/week  |  Red: < 1/week

AI CONTEXT REUSE
Formula: Artifacts referenced / Artifacts available
Measures how well context persists across bolts

REMEDIATION TIME
Formula: Time from defect detection to fix deployed
Green: < 2 hrs  |  Amber: 2–8 hrs  |  Red: > 8 hrs

The Human Override Rate is the most important new metric.
It's a calibration signal — not a performance metric.`,
        question: {
          prompt: 'What does a Human Override Rate below 5% indicate?',
          options: [
            'AI is performing exceptionally well',
            'The team has achieved L5 maturity',
            'Rubber-stamping — humans aren\'t actually reviewing AI output',
            'Specs are perfectly written',
          ],
          correct: 2,
          explanation: 'Override Rate below 5% is a red flag — it likely means humans are approving AI output without meaningful review. This is rubber-stamping, not quality validation.',
        },
      },
      {
        id: 'leader-dashboard',
        title: 'Sample Leader Dashboard',
        content: `WEEKLY AI-SDLC SNAPSHOT
═══════════════════════════════════════════

Active Intents:        3
Units in Flight:       7
Bolts Completed:      12  (this week)
Avg Cycle Time:        3.2 hrs/bolt
Gate Pass Rate:       82%  (first attempt)
Override Rate:        18%  (healthy range)
Deploy Frequency:      8   (this week)
Remediation Time:      1.4 hrs avg

UNIT STATUS BOARD
─────────────────────────────────────────
Unit          Phase         Bolts   Status
Auth Module   Construction  3/5     ● On Track
Payment API   Construction  1/4     ● On Track
Admin UI      Inception     0/0     ○ Planning
Search Index  Operations    5/5     ✓ Complete
Notification  Construction  2/3     ● On Track

TREND INDICATORS
─────────────────────────────────────────
Cycle Time:     ↓ 15% (improving)
Override Rate:  → Stable at 18%
Gate Pass Rate: ↑ 8% (improving)
Deploy Freq:    ↑ 25% (accelerating)

This is what replaces your Jira board and burndown chart.
The dashboard answers: Are we delivering value? Are humans
engaged (not rubber-stamping)? Is quality holding?

Notice what's NOT here: story points, velocity, sprint
burndown, team utilization. Those metrics measure effort.
This dashboard measures outcomes.`,
        question: {
          prompt: 'What metric on the dashboard indicates humans are properly engaged?',
          options: [
            'Deploy Frequency',
            'Bolt Cycle Time',
            'Human Override Rate in the 10–30% range',
            'Number of Active Intents',
          ],
          correct: 2,
          explanation: 'Override Rate in the 10–30% range means humans are reviewing AI output and making meaningful corrections — engaged but not bottlenecked. Too low = rubber-stamping. Too high = poor specs.',
        },
      },
      {
        id: 'adoption-playbook',
        title: '4-Week Adoption Playbook',
        content: `WEEK 1 — ORIENT
• Run a 2-hour "Rosetta Stone" workshop
• Map current roles to AI-SDLC RACI
• Identify first Intent (pick something real but bounded)
• Set up artifact repository structure
• Install AI tooling, configure workspace

Day-1 Readiness Checklist:
□ Team has read the Rosetta Stone
□ AI tooling installed and configured
□ Artifact repo structure created
□ First Intent candidate identified
□ RACI roles assigned for pilot

WEEK 2 — FIRST MOB ELABORATION
• Run Mob Elaboration on the pilot Intent (2–4 hrs)
• AI decomposes into Units and User Stories
• Team challenges, refines, approves
• Document: What surprised you? What felt different?

WEEK 3 — FIRST BOLTS
• Execute 2–3 Bolts on the first Unit
• Practice the gate validation ritual
• Track Override Rate and Cycle Time
• Resist the urge to add ceremonies back

WEEK 4 — REFLECT & SCALE
• Review metrics from Week 3
• Compare: How does this feel vs. a Sprint?
• Identify what to keep, what to adjust
• Plan next Intent with expanded scope
• Share learnings with broader org

The most common Week 3 failure: teams add back standups
and code review because "it feels wrong" without them.
Trust the gates. Trust the artifacts. The discomfort is
the J-curve — you're rewiring habits built over years.`,
        question: {
          prompt: 'What is the most common failure in Week 3 of adoption?',
          options: [
            'AI tools crash or fail',
            'Teams add back standups and code review out of habit',
            'Product Owner disengages',
            'Metrics are too hard to track',
          ],
          correct: 1,
          explanation: 'Teams instinctively add back familiar ceremonies because the new flow "feels wrong." This is the J-curve — the discomfort of rewiring habits. Trust the gates and artifacts instead.',
        },
      },
      {
        id: 'anti-patterns',
        title: 'Anti-Patterns & Pitfalls',
        content: `These will kill your adoption. Watch for them.

1. RETROFITTING AI INTO SCRUM
   "We'll just add Copilot to our existing sprints."
   This is L1. You get autocomplete, not transformation.
   Instead: Redesign the workflow around AI capabilities.

2. RUBBER-STAMPING AI OUTPUT
   Override Rate drops below 5%. Humans click "approve"
   without reading. Quality degrades silently.
   Instead: Set Override Rate alerts. Review gate evidence.

3. SKIPPING DOMAIN DESIGN
   "We don't need DDD, just let AI code it."
   AI without domain context produces a Big Ball of Mud.
   Instead: DDD is mandatory. Domain models are first-class.

4. AI-SDLC FOR SIMPLE CRUD
   Using the full methodology for a 3-page marketing site.
   Overkill. AI-SDLC is for complex systems.
   Instead: Use AI-SDLC for complexity. Use vibe coding for
   simple apps.

5. KEEPING ALL LEGACY CEREMONIES
   Running standups, sprint planning, retros, AND gates.
   Double the overhead, none of the benefit.
   Instead: Replace ceremonies with AI-SDLC equivalents.
   Gates replace retros. Artifacts replace standups.

6. IGNORING BROWNFIELD ELEVATION
   Jumping to L4 on a legacy monolith without understanding
   the existing architecture. AI makes confident, wrong changes.
   Instead: Elevation is mandatory. AI must model the existing
   system before modifying it.

The meta-pattern: every anti-pattern is a form of "bolting
AI onto old workflows." The methodology requires structural
change, not just tool adoption.`,
        question: {
          prompt: 'Which anti-pattern is indicated by a Human Override Rate below 5%?',
          options: [
            'Retrofitting AI into Scrum',
            'Skipping Domain Design',
            'Rubber-stamping AI output',
            'Ignoring Brownfield Elevation',
          ],
          correct: 2,
          explanation: 'Override Rate below 5% means humans are approving AI output without meaningful review. This is rubber-stamping — the most dangerous anti-pattern because quality degrades silently.',
        },
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find(lesson => lesson.id === id);
}

export function getAllLessons(): Lesson[] {
  return LESSONS;
}
