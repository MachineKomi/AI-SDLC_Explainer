// AI-DLC Lessons Content
// Converted from Python TUI application

import { Lesson } from '@/types';

export const LESSONS: Lesson[] = [
  {
    id: 'aidlc-overview',
    title: 'AI-DLC Overview',
    description: 'Learn the fundamentals of AI-Driven Development Lifecycle',
    sections: [
      {
        id: 'what-is-aidlc',
        title: 'What is AI-DLC?',
        content: `AI-DLC (AI-Driven Development Lifecycle) is a transformative approach
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
        content: `AI-DLC organizes work into three phases, each with specific goals:

• INCEPTION: Determines WHAT to build and WHY
  - Requirements analysis and validation
  - User stories and unit decomposition
  - Risk assessment

• CONSTRUCTION: Determines HOW to build it
  - Detailed design per unit
  - Code generation and implementation
  - Build-and-test loops

• OPERATIONS: Deployment and monitoring
  - Infrastructure as Code
  - CI/CD pipelines
  - Observability setup`,
        diagramType: 'phases',
      },
      {
        id: 'gates',
        title: 'Gates & Approvals',
        content: `Every phase has mandatory GATES requiring human approval.

Core principles:
• Plan-first, stage-by-stage execution
• Every meaningful step needs an approval checkpoint
• "Proof over prose" — evidence required, not just claims

Gate examples:
• Inception Exit: Requirements + units approved
• Unit Done: Tests green + acceptance criteria met
• Production Ready: Deployable + observable + rollbackable

Benefits of strict gates:
• Prevents AI from "running away" with wrong assumptions
• Creates audit trail of decisions
• Ensures human accountability at every critical point`,
        diagramType: 'gate-loop',
      },
      {
        id: 'artifacts',
        title: 'Artifacts',
        content: `Persisted artifacts are FIRST-CLASS in AI-DLC.

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
        diagram: `aidlc-docs/
├── aidlc-state.md
├── execution-plan.md  
├── audit.md
├── prompts.md
├── inception/
│   ├── intent.md
│   ├── requirements.md
│   ├── nfr.md
│   └── units/
├── construction/
│   └── unit-01/
│       ├── design.md
│       └── tasks-plan.md
└── operations/
    └── deployment-plan.md`,
      },
      {
        id: 'roles',
        title: 'Roles',
        content: `AI-DLC transforms team roles from "doing" to "approving and designing."

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
        content: `The core AI-DLC mental model is a repeating cycle:

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
        diagram: `        ┌─────────────────────────────────────┐
        │                                     │
        ▼                                     │
   ┌─────────┐    ┌─────────┐    ┌─────────┐  │
   │  PLAN   │───▶│   ASK   │───▶│VALIDATE │  │
   │  (AI)   │    │  (AI)   │    │ (Human) │  │
   └─────────┘    └─────────┘    └─────────┘  │
                                      │       │
                                      ▼       │
                               ┌─────────┐    │
                               │IMPLEMENT│────┘
                               │ (BOLT)  │
                               └─────────┘`,
      },
      {
        id: 'summary',
        title: 'Summary & Key Takeaways',
        content: `Congratulations! You've completed the AI-DLC Overview.

KEY TAKEAWAYS:

1. AI-DLC has 3 phases: Inception, Construction, Operations

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
        diagram: `╭───────────────────────────────────────────╮
│                                           │
│   ✓ Lesson Complete: AI-DLC Overview     │
│                                           │
│   You learned about:                      │
│   • The three phases                      │
│   • Gates and approvals                   │
│   • Artifact model                        │
│   • Team roles                            │
│   • Core mental model                     │
│                                           │
╰───────────────────────────────────────────╯`,
      },
    ],
  },
  {
    id: 'principles',
    title: '10 Core Principles',
    description: 'Master the fundamental principles that guide AI-DLC',
    sections: [
      {
        id: 'principle-intro',
        title: 'The 10 Principles',
        content: `AI-DLC is guided by 10 core principles that ensure quality, 
accountability, and effective collaboration between humans and AI.

These principles are derived from AWS best practices and 
real-world practitioner experience.

Let's explore each one in detail.`,
        diagram: `╭─────────────────────────────────────────────────────────────╮
│                    10 CORE PRINCIPLES                        │
├─────────────────────────────────────────────────────────────┤
│  1. Plan-First          │  6. Proof over Prose             │
│  2. Human Accountability │  7. Auditable Trail              │
│  3. Small Batches        │  8. Context Persistence          │
│  4. Adaptive Depth       │  9. Fail Fast, Recover Fast      │
│  5. Structured Q&A       │ 10. Prompts as Code              │
╰─────────────────────────────────────────────────────────────╯`,
      },
      {
        id: 'principle-1',
        title: '1. Plan-First',
        content: `PRINCIPLE: Always create a plan before executing.

What it means:
• AI proposes detailed work breakdown BEFORE any code
• Plans include checkpoints and approval gates
• Humans review and approve plans, not just results

Why it matters:
• Prevents "AI running away" with wrong assumptions
• Gives humans visibility into AI's intended approach
• Creates natural review points

Anti-pattern:
• "Just implement feature X" without seeing the plan first
• AI coding without explicit approval of approach`,
        diagram: `    ┌──────────────────────────────────────────────┐
    │                                              │
    │   ❌ BAD:   "Build me a login page"          │
    │                                              │
    │   ✓ GOOD:  "Create a plan for login page    │
    │            with checkpoints. Stop for        │
    │            approval before coding."          │
    │                                              │
    └──────────────────────────────────────────────┘`,
      },
      {
        id: 'principle-2',
        title: '2. Human Accountability',
        content: `PRINCIPLE: Humans own decisions and outcomes; AI executes.

What it means:
• Every critical decision has a human approver
• AI proposes, humans dispose
• Accountability cannot be delegated to AI

Key decisions requiring human sign-off:
• Requirements scope
• Architecture choices
• Security controls
• Go/no-go for deployment

Why it matters:
• Legal and ethical responsibility stays with humans
• AI hallucinations don't become production bugs
• Clear ownership of outcomes`,
        diagram: `    ┌─────────────────────────────────────────┐
    │           ACCOUNTABILITY MODEL          │
    ├─────────────────────────────────────────┤
    │                                         │
    │   AI OWNS:          │   HUMAN OWNS:     │
    │   • Execution       │   • Decisions     │
    │   • Code generation │   • Approvals     │
    │   • Test running    │   • Outcomes      │
    │   • Documentation   │   • Accountability│
    │                                         │
    └─────────────────────────────────────────┘`,
      },
      {
        id: 'principle-3',
        title: '3. Small Batches',
        content: `PRINCIPLE: Decompose work into small, reviewable units.

What it means:
• Break large tasks into units of 1-3 days work
• Each unit has clear acceptance criteria
• Review happens per-unit, not per-project

Benefits:
• Easier to review and verify
• Faster feedback loops
• Lower risk of large-scale errors
• Progress is measurable

Sizing guidelines:
• Too small: Overhead exceeds value
• Too large: Can't review effectively
• Just right: Reviewable in one sitting`,
        diagram: `    ❌ BAD: One giant "Build the app" task
    
    ✓ GOOD: Decomposed units
    
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Unit 1   │  │ Unit 2   │  │ Unit 3   │
    │ Auth     │  │ Dashboard│  │ API      │
    │ (2 days) │  │ (2 days) │  │ (1 day)  │
    └────┬─────┘  └────┬─────┘  └────┬─────┘
         │             │             │
         ▼             ▼             ▼
      Review        Review        Review`,
      },
      {
        id: 'principle-4',
        title: '4. Adaptive Depth',
        content: `PRINCIPLE: Match rigor to risk and complexity.

What it means:
• Stage selection is BINARY (execute or skip)
• Detail level WITHIN stages adapts to problem
• Workflow Planning decides which stages run

Factors influencing depth:
• Request clarity - How complete is the ask?
• Problem complexity - How intricate is the solution?
• Scope - Single file, component, or system-wide?
• Risk level - What's the impact of errors?
• Available context - Greenfield vs brownfield?

Key insight from AWS:
"Create exactly the detail needed for the problem at 
hand - no more, no less."`,
        diagram: `    STAGE SELECTION (Binary)      DETAIL LEVEL (Adaptive)
    ─────────────────────         ─────────────────────────
    
    Workflow Planning decides:     Within each stage:
    
    ┌─────────────┐               Simple → Concise artifacts
    │   EXECUTE   │               Complex → Comprehensive 
    └─────────────┘                         artifacts
          or
    ┌─────────────┐               Model decides based on
    │    SKIP     │               problem characteristics
    └─────────────┘`,
      },
      {
        id: 'principle-5',
        title: '5. Structured Q&A',
        content: `PRINCIPLE: Use file-based, structured questions.

What it means:
• AI asks questions in structured format
• Answers persist in files, not chat
• Multiple-choice where possible

Benefits:
• Answers are reviewable and auditable
• Can be validated mechanically
• Context persists across sessions
• Stakeholders can review asynchronously

Format example:
• Questions go in: requirement-verification-questions.md
• Answers have structured tags: <!-- ANSWER: B -->
• Both persist in repository`,
        diagram: `    requirement-verification-questions.md:
    ┌────────────────────────────────────────────┐
    │ Q1: Primary deployment target?             │
    │     A) AWS Lambda                          │
    │     B) Kubernetes                          │
    │     C) On-premise                          │
    │                                            │
    │ <!-- ANSWER: B -->                         │
    │ <!-- RATIONALE: Existing K8s cluster -->   │
    └────────────────────────────────────────────┘`,
      },
      {
        id: 'principle-6',
        title: '6. Proof over Prose',
        content: `PRINCIPLE: Evidence required, not just claims.

What it means:
• Don't accept "it works" — require proof
• Tests must pass, not just exist
• Validation reports show actual results

Examples of proof:
• Test output showing all green
• Screenshots of working UI
• Logs showing successful deployment
• Metrics showing performance targets met

Why it matters:
• AI can be confidently wrong
• Prose can mask incomplete work
• Evidence is verifiable`,
        diagram: `    ❌ PROSE (not acceptable):
    "I've implemented the login feature and it works."
    
    ✓ PROOF (acceptable):
    ┌─────────────────────────────────────────┐
    │ $ pytest tests/ -v                      │
    │ ============================            │
    │ test_login_success PASSED               │
    │ test_login_invalid_password PASSED      │
    │ test_login_rate_limit PASSED            │
    │ ============================            │
    │ 3 passed in 0.45s                       │
    └─────────────────────────────────────────┘`,
      },
      {
        id: 'principle-7',
        title: '7. Auditable Trail',
        content: `PRINCIPLE: Maintain append-only decision logs.

What it means:
• Every decision gets logged with timestamp
• audit.md is append-only (never edited)
• Include: decision, rationale, evidence, approver

What to log:
• Phase transitions
• Gate approvals/rejections
• Scope changes
• Architecture decisions
• Security exceptions

Why it matters:
• Compliance and governance
• Post-mortems and debugging
• Knowledge transfer
• Legal protection`,
        diagram: `    audit.md (append-only):
    ┌─────────────────────────────────────────────────┐
    │ ## 2026-01-28 | Unit 01 Approved                │
    │                                                 │
    │ Decision: Approve unit for implementation       │
    │ Rationale: Requirements clear, AC defined       │
    │ Evidence: requirements.md reviewed              │
    │ Approver: @tech-lead                            │
    │ ─────────────────────────────────────────────── │
    │ ## 2026-01-28 | Architecture Decision           │
    │                                                 │
    │ Decision: Use PostgreSQL over MongoDB           │
    │ Rationale: Strong consistency requirements      │
    │ ...                                             │
    └─────────────────────────────────────────────────┘`,
      },
      {
        id: 'principle-8',
        title: '8. Context Persistence',
        content: `PRINCIPLE: Artifacts persist in-repo, not in chat.

What it means:
• All context lives in files, not conversation
• New sessions can resume from artifacts
• Chat history is ephemeral; artifacts are durable

Key artifacts:
• aidlc-state.md — Current position
• execution-plan.md — What's planned
• audit.md — What happened
• prompts.md — What was asked

Benefits:
• No "context window" limitations
• Team members can onboard easily
• AI sessions are reproducible
• Version control applies`,
        diagram: `    ❌ EPHEMERAL (chat):
    ┌─────────────────────────────────────┐
    │ User: Build a login page            │
    │ AI: Here's the code...              │
    │ User: Add remember me               │
    │ AI: Updated...                      │
    │ [SESSION ENDS - CONTEXT LOST]       │
    └─────────────────────────────────────┘
    
    ✓ PERSISTENT (artifacts):
    ┌─────────────────────────────────────┐
    │ aidlc-docs/                         │
    │ ├── aidlc-state.md    ← position    │
    │ ├── audit.md          ← history     │
    │ └── construction/     ← work        │
    │ [SESSION ENDS - CONTEXT PRESERVED]  │
    └─────────────────────────────────────┘`,
      },
      {
        id: 'principle-9',
        title: '9. Fail Fast, Recover Fast',
        content: `PRINCIPLE: Detect problems early, have rollback plans.

What it means:
• Run validations at every stage
• Don't proceed on failing checks
• Always have a way to undo

Validation points:
• Lint checks before commit
• Tests before merge
• Smoke tests before deploy
• Canary before full rollout

Recovery mechanisms:
• Git revert for code
• Blue-green deployments
• Feature flags for rollback
• Database migrations with down path`,
        diagram: `    FAIL FAST:
    ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐
    │ Code  │──▶│ Lint  │──▶│ Test  │──▶│Deploy │
    └───────┘   └───┬───┘   └───┬───┘   └───┬───┘
                    │           │           │
                    ▼           ▼           ▼
                   FAIL?       FAIL?       FAIL?
                    │           │           │
                    ▼           ▼           ▼
                  STOP!       STOP!      ROLLBACK!
                  
    Early detection = Lower cost to fix`,
      },
      {
        id: 'principle-10',
        title: '10. Prompts as Code',
        content: `PRINCIPLE: Version, review, and tune prompts like code.

What it means:
• Prompts live in version control
• Changes go through review
• Tune based on failure modes

Why it matters:
• Prompts are the "code" that controls AI behavior
• Bad prompts → bad AI output
• Prompts drift needs tracking like code drift

Best practices:
• Store prompts in prompts.md
• Log which prompts produced which results
• A/B test prompt changes
• Add guardrails for known failure modes`,
        diagram: `    prompts.md:
    ┌─────────────────────────────────────────────────┐
    │ ## PROMPT 1 - Initial Setup                     │
    │                                                 │
    │ You are the lead engineer running AI-DLC...    │
    │                                                 │
    │ Constraints:                                    │
    │ - Do not implement without approval             │
    │ - Small batches only                            │
    │ - Stop at gates                                 │
    │ ─────────────────────────────────────────────── │
    │ ## PROMPT 2 - Unit 1 Approval                   │
    │                                                 │
    │ Approved. Execute Unit 1...                     │
    └─────────────────────────────────────────────────┘`,
      },
      {
        id: 'principles-summary',
        title: 'Principles Summary',
        content: `You've learned all 10 core AI-DLC principles!

QUICK REFERENCE:
1. Plan-First — Always plan before executing
2. Human Accountability — Humans own decisions
3. Small Batches — Decompose into reviewable units
4. Adaptive Depth — Match rigor to risk
5. Structured Q&A — File-based questions/answers
6. Proof over Prose — Evidence, not claims
7. Auditable Trail — Append-only decision logs
8. Context Persistence — Artifacts in-repo
9. Fail Fast — Validate early, have rollback
10. Prompts as Code — Version and tune prompts

These principles work together to create a safe,
effective, and accountable AI-human collaboration.`,
        diagram: `╭───────────────────────────────────────────╮
│                                           │
│   ✓ Lesson Complete: 10 Core Principles  │
│                                           │
│   Now try the Practice mode to test      │
│   your understanding!                     │
│                                           │
╰───────────────────────────────────────────╯`,
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
        diagram: `╭───────────────────────────────────────────────────────────╮
│                    INCEPTION PHASE                        │
│              (WHAT + WHY via Mob Elaboration)             │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  INPUT:                     OUTPUT:                       │
│  • User intent              • requirements.md             │
│  • Business context         • nfr.md + risks.md           │
│  • Constraints              • user-stories.md             │
│                             • units/ (one per unit)       │
│                             • execution-plan.md           │
│                                                           │
│  GATE: Requirements + Units Approved                      │
│                                                           │
╰───────────────────────────────────────────────────────────╯`,
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
        diagram: `    INCEPTION FLOW:
    
    ┌──────────────┐
    │  Workspace   │
    │  Detection   │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐    ┌──────────────┐
    │   Reverse    │◀───│  Brownfield? │
    │  Engineering │    └──────────────┘
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ Requirements │ ◀── MANDATORY
    │   Analysis   │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │   Workflow   │ ◀── MANDATORY
    │   Planning   │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │    Units     │
    │  Generation  │
    └──────┬───────┘
           │
           ▼
       INCEPTION
         EXIT`,
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
        diagram: `╭───────────────────────────────────────────╮
│                                           │
│   ✓ Lesson Complete: Inception Phase     │
│                                           │
│   Ready to explore Construction?          │
│                                           │
╰───────────────────────────────────────────╯`,
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
