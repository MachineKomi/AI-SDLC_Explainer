"""Content loading and management for AI-SDLC Explainer."""

from dataclasses import dataclass


@dataclass
class Section:
    """A section within a lesson."""
    id: str
    title: str
    content: str
    diagram: str | None = None


@dataclass
class Lesson:
    """A complete lesson with multiple sections."""
    id: str
    title: str
    description: str
    sections: list[Section]


# Embedded lesson content (no external YAML needed for MVP)
AIDLC_OVERVIEW_LESSON = Lesson(
    id="aidlc-overview",
    title="AI-DLC Overview",
    description="Learn the fundamentals of AI-Driven Development Lifecycle",
    sections=[
        Section(
            id="what-is-aidlc",
            title="What is AI-DLC?",
            content="""\
AI-DLC (AI-Driven Development Lifecycle) is a transformative approach
to software development that positions AI as a central collaborator.

Key characteristics:
• AI proposes plans, asks clarifying questions, then implements
• Humans own decisions and outcomes; AI executes within bounds
• Not "SDLC + copilots" — a fundamentally different workflow
• Artifacts persist in-repo, not in chat history

The core mental model:
  AI creates plan → Asks questions → Implements after validation
  
This pattern repeats rapidly for every SDLC activity.""",
            diagram=None,
        ),
        Section(
            id="three-phases",
            title="The Three Phases",
            content="""\
AI-DLC organizes work into three phases, each with specific goals:

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
  - Observability setup""",
            diagram="""\
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  INCEPTION  │ ───▶ │CONSTRUCTION │ ───▶ │ OPERATIONS  │
│  (What/Why) │      │    (How)    │      │  (Run/Mon)  │
└─────────────┘      └─────────────┘      └─────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
   ┌───────┐           ┌───────┐           ┌───────┐
   │ GATE  │           │ GATE  │           │ GATE  │
   └───────┘           └───────┘           └───────┘""",
        ),
        Section(
            id="gates",
            title="Gates & Approvals",
            content="""\
Every phase has mandatory GATES requiring human approval.

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
• Ensures human accountability at every critical point""",
            diagram="""\
   ┌──────────┐     ┌──────────┐     ┌──────────┐
   │  PLAN    │ ──▶ │  GATE    │ ──▶ │ EXECUTE  │
   │ (AI)     │     │ (Human)  │     │  (AI)    │
   └──────────┘     └──────────┘     └──────────┘
        ▲                                  │
        └──────────────────────────────────┘
                    repeat""",
        ),
        Section(
            id="artifacts",
            title="Artifacts",
            content="""\
Persisted artifacts are FIRST-CLASS in AI-DLC.

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
• Auditable trail of decisions""",
            diagram="""\
aidlc-docs/
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
    └── deployment-plan.md""",
        ),
        Section(
            id="roles",
            title="Roles",
            content="""\
AI-DLC transforms team roles from "doing" to "approving and designing."

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
  - Owns prompts, rules, and guardrails as code""",
            diagram=None,
        ),
        Section(
            id="mental-model",
            title="The Mental Model",
            content="""\
The core AI-DLC mental model is a repeating cycle:

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
richer artifacts that become context for the next step.""",
            diagram="""\
        ┌─────────────────────────────────────┐
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
                               └─────────┘""",
        ),
        Section(
            id="summary",
            title="Summary & Key Takeaways",
            content="""\
Congratulations! You've completed the AI-DLC Overview.

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
• Try the Quiz to test your knowledge

Press Esc to return to the main menu.""",
            diagram="""\
╭───────────────────────────────────────────╮
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
╰───────────────────────────────────────────╯""",
        ),
    ],
)


# Additional Lessons

PRINCIPLES_LESSON = Lesson(
    id="principles",
    title="10 Core Principles",
    description="Master the fundamental principles that guide AI-DLC",
    sections=[
        Section(
            id="principle-intro",
            title="The 10 Principles",
            content="""\
AI-DLC is guided by 10 core principles that ensure quality, 
accountability, and effective collaboration between humans and AI.

These principles are derived from AWS best practices and 
real-world practitioner experience.

Let's explore each one in detail.""",
            diagram="""\
╭─────────────────────────────────────────────────────────────╮
│                    10 CORE PRINCIPLES                        │
├─────────────────────────────────────────────────────────────┤
│  1. Plan-First          │  6. Proof over Prose             │
│  2. Human Accountability │  7. Auditable Trail              │
│  3. Small Batches        │  8. Context Persistence          │
│  4. Adaptive Depth       │  9. Fail Fast, Recover Fast      │
│  5. Structured Q&A       │ 10. Prompts as Code              │
╰─────────────────────────────────────────────────────────────╯""",
        ),
        Section(
            id="principle-1",
            title="1. Plan-First",
            content="""\
PRINCIPLE: Always create a plan before executing.

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
• AI coding without explicit approval of approach""",
            diagram="""\
    ┌──────────────────────────────────────────────┐
    │                                              │
    │   ❌ BAD:   "Build me a login page"          │
    │                                              │
    │   ✓ GOOD:  "Create a plan for login page    │
    │            with checkpoints. Stop for        │
    │            approval before coding."          │
    │                                              │
    └──────────────────────────────────────────────┘""",
        ),
        Section(
            id="principle-2",
            title="2. Human Accountability",
            content="""\
PRINCIPLE: Humans own decisions and outcomes; AI executes.

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
• Clear ownership of outcomes""",
            diagram="""\
    ┌─────────────────────────────────────────┐
    │           ACCOUNTABILITY MODEL          │
    ├─────────────────────────────────────────┤
    │                                         │
    │   AI OWNS:          │   HUMAN OWNS:     │
    │   • Execution       │   • Decisions     │
    │   • Code generation │   • Approvals     │
    │   • Test running    │   • Outcomes      │
    │   • Documentation   │   • Accountability│
    │                                         │
    └─────────────────────────────────────────┘""",
        ),
        Section(
            id="principle-3",
            title="3. Small Batches",
            content="""\
PRINCIPLE: Decompose work into small, reviewable units.

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
• Just right: Reviewable in one sitting""",
            diagram="""\
    ❌ BAD: One giant "Build the app" task
    
    ✓ GOOD: Decomposed units
    
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Unit 1   │  │ Unit 2   │  │ Unit 3   │
    │ Auth     │  │ Dashboard│  │ API      │
    │ (2 days) │  │ (2 days) │  │ (1 day)  │
    └────┬─────┘  └────┬─────┘  └────┬─────┘
         │             │             │
         ▼             ▼             ▼
      Review        Review        Review""",
        ),
        Section(
            id="principle-4",
            title="4. Adaptive Depth",
            content="""\
PRINCIPLE: Match rigor to risk and complexity.

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
hand - no more, no less."

• Don't inflate simple problems with unnecessary detail
• Don't shortchange complex problems by omitting detail
• All required artifacts created when stage executes""",
            diagram="""\
    STAGE SELECTION (Binary)      DETAIL LEVEL (Adaptive)
    ─────────────────────         ─────────────────────────
    
    Workflow Planning decides:     Within each stage:
    
    ┌─────────────┐               Simple → Concise artifacts
    │   EXECUTE   │               Complex → Comprehensive 
    └─────────────┘                         artifacts
          or
    ┌─────────────┐               Model decides based on
    │    SKIP     │               problem characteristics
    └─────────────┘""",
        ),
        Section(
            id="principle-5",
            title="5. Structured Q&A",
            content="""\
PRINCIPLE: Use file-based, structured questions.

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
• Both persist in repository""",
            diagram="""\
    requirement-verification-questions.md:
    ┌────────────────────────────────────────────┐
    │ Q1: Primary deployment target?             │
    │     A) AWS Lambda                          │
    │     B) Kubernetes                          │
    │     C) On-premise                          │
    │                                            │
    │ <!-- ANSWER: B -->                         │
    │ <!-- RATIONALE: Existing K8s cluster -->   │
    └────────────────────────────────────────────┘""",
        ),
        Section(
            id="principle-6",
            title="6. Proof over Prose",
            content="""\
PRINCIPLE: Evidence required, not just claims.

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
• Evidence is verifiable""",
            diagram="""\
    ❌ PROSE (not acceptable):
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
    └─────────────────────────────────────────┘""",
        ),
        Section(
            id="principle-7",
            title="7. Auditable Trail",
            content="""\
PRINCIPLE: Maintain append-only decision logs.

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
• Legal protection""",
            diagram="""\
    audit.md (append-only):
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
    └─────────────────────────────────────────────────┘""",
        ),
        Section(
            id="principle-8",
            title="8. Context Persistence",
            content="""\
PRINCIPLE: Artifacts persist in-repo, not in chat.

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
• Version control applies""",
            diagram="""\
    ❌ EPHEMERAL (chat):
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
    └─────────────────────────────────────┘""",
        ),
        Section(
            id="principle-9",
            title="9. Fail Fast, Recover Fast",
            content="""\
PRINCIPLE: Detect problems early, have rollback plans.

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
• Database migrations with down path""",
            diagram="""\
    FAIL FAST:
    ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐
    │ Code  │──▶│ Lint  │──▶│ Test  │──▶│Deploy │
    └───────┘   └───┬───┘   └───┬───┘   └───┬───┘
                    │           │           │
                    ▼           ▼           ▼
                   FAIL?       FAIL?       FAIL?
                    │           │           │
                    ▼           ▼           ▼
                  STOP!       STOP!      ROLLBACK!
                  
    Early detection = Lower cost to fix""",
        ),
        Section(
            id="principle-10",
            title="10. Prompts as Code",
            content="""\
PRINCIPLE: Version, review, and tune prompts like code.

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
• Add guardrails for known failure modes""",
            diagram="""\
    prompts.md:
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
    └─────────────────────────────────────────────────┘""",
        ),
        Section(
            id="principles-summary",
            title="Principles Summary",
            content="""\
You've learned all 10 core AI-DLC principles!

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
effective, and accountable AI-human collaboration.

Press Esc to return to the main menu.""",
            diagram="""\
╭───────────────────────────────────────────╮
│                                           │
│   ✓ Lesson Complete: 10 Core Principles  │
│                                           │
│   Now try the Practice mode to test      │
│   your understanding!                     │
│                                           │
╰───────────────────────────────────────────╯""",
        ),
    ],
)


INCEPTION_DEEP_DIVE = Lesson(
    id="inception-deep-dive",
    title="Phase: Inception",
    description="Deep dive into the Inception phase",
    sections=[
        Section(
            id="inception-overview",
            title="Inception Overview",
            content="""\
The INCEPTION phase determines WHAT to build and WHY.

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
• How will we measure success?""",
            diagram="""\
╭───────────────────────────────────────────────────────────╮
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
╰───────────────────────────────────────────────────────────╯""",
        ),
        Section(
            id="inception-stages",
            title="Inception Stages",
            content="""\
Inception has several stages (adaptive based on complexity):

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
   • Define acceptance criteria""",
            diagram="""\
    INCEPTION FLOW:
    
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
         EXIT""",
        ),
        Section(
            id="inception-artifacts",
            title="Inception Artifacts",
            content="""\
Inception produces these key artifacts:

intent.md
• One paragraph describing the goal
• Success metrics (measurable)
• Example: "Build a TUI that teaches AI-DLC concepts"

requirements.md
• Functional requirements
• Must/should/could priorities
• Constraints and boundaries

nfr.md
• Security requirements
• Performance targets
• Availability needs
• Compliance requirements

execution-plan.md
• Which stages will run
• Rationale for each decision
• Checkpoints

units/ (one file per unit)
• Scope description
• Acceptance criteria
• Dependencies on other units""",
            diagram="""\
    aidlc-docs/inception/
    ├── intent.md
    │   └── "Build a TUI that teaches AI-DLC..."
    │
    ├── requirements.md
    │   ├── MUST: Local-first, no admin
    │   ├── SHOULD: Keyboard navigation
    │   └── COULD: Multiple themes
    │
    ├── nfr.md
    │   ├── Security: No network required
    │   ├── Performance: < 100ms response
    │   └── Portability: Win/Mac/Linux
    │
    └── units/
        ├── unit-01.md (TUI Framework)
        ├── unit-02.md (Content Model)
        └── unit-03.md (Practice Mode)""",
        ),
        Section(
            id="inception-gate",
            title="Inception Exit Gate",
            content="""\
The Inception phase ends with a mandatory gate:

INCEPTION EXIT CRITERIA:
1. Requirements documented and clear
2. NFRs identified and prioritized
3. Work decomposed into units
4. Each unit has acceptance criteria
5. Dependencies mapped
6. Human approval obtained

Common rejection reasons:
• Vague or incomplete requirements
• Missing success metrics
• Units too large to review
• Unaddressed security concerns
• No test strategy

What happens at rejection:
• Return to relevant stage
• Address feedback
• Resubmit for approval""",
            diagram="""\
    INCEPTION EXIT GATE:
    
    ┌─────────────────────────────────────────────┐
    │                                             │
    │   CHECKLIST:                                │
    │   ☑ intent.md complete with metrics         │
    │   ☑ requirements.md reviewed                │
    │   ☑ nfr.md addresses security               │
    │   ☑ units/ defined with AC                  │
    │   ☑ dependencies documented                 │
    │                                             │
    │   ┌─────────────────────────────────────┐   │
    │   │  HUMAN DECISION:                    │   │
    │   │  [ APPROVE ] or [ REVISE ]          │   │
    │   └─────────────────────────────────────┘   │
    │                                             │
    └─────────────────────────────────────────────┘""",
        ),
        Section(
            id="units-and-bolts",
            title="Units and Bolts",
            content="""\
AI-DLC introduces two key artifacts for work decomposition:

UNIT (comparable to DDD subdomain or Scrum epic)
• A cohesive, self-contained work element
• Delivers measurable value independently
• Contains user stories + acceptance criteria
• Loosely coupled for autonomous build
• Can be deployed independently

BOLT (comparable to Sprint, but faster)
• Smallest iteration in AI-DLC
• Measured in hours or days (not weeks!)
• Implements a Unit or subset of tasks
• AI plans Bolts; humans validate
• A Unit may require one or more Bolts

This decomposition enables:
• Parallel development across Units
• Rapid iteration within Bolts
• Clear boundaries for review
• Independent testing and deployment""",
            diagram="""\
    INTENT
       │
       ▼
    ┌─────────────────────────────────────────────┐
    │                   UNITS                      │
    │  ┌─────────┐  ┌─────────┐  ┌─────────┐     │
    │  │ Unit 1  │  │ Unit 2  │  │ Unit 3  │     │
    │  │ (Auth)  │  │ (API)   │  │ (UI)    │     │
    │  └────┬────┘  └────┬────┘  └────┬────┘     │
    │       │            │            │           │
    │       ▼            ▼            ▼           │
    │    ┌──────┐    ┌──────┐    ┌──────┐        │
    │    │Bolt 1│    │Bolt 1│    │Bolt 1│        │
    │    │Bolt 2│    │Bolt 2│    │Bolt 2│        │
    │    └──────┘    └──────┘    │Bolt 3│        │
    │                            └──────┘        │
    └─────────────────────────────────────────────┘""",
        ),
        Section(
            id="inception-complete",
            title="Inception Complete",
            content="""\
You've completed the Inception deep dive!

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
• Test your knowledge with Practice mode

Press Esc to return to the main menu.""",
            diagram="""\
╭───────────────────────────────────────────╮
│                                           │
│   ✓ Lesson Complete: Inception Phase     │
│                                           │
│   Ready to explore Construction?          │
│                                           │
╰───────────────────────────────────────────╯""",
        ),
    ],
)


CONSTRUCTION_DEEP_DIVE = Lesson(
    id="construction-deep-dive",
    title="Phase: Construction",
    description="Deep dive into the Construction phase",
    sections=[
        Section(
            id="construction-overview",
            title="Construction Overview",
            content="""\
The CONSTRUCTION phase determines HOW to build.

Goal: Transform Units into tested, operations-ready 
Deployment Units.

Key ritual: MOB CONSTRUCTION
• Teams collocated, exchanging integration specs
• Making decisions collaboratively
• Delivering Bolts (rapid iterations)
• AI generates; humans validate

The flow:
Domain Design → Logical Design → Code + Tests → Validation

For brownfield: first "elevate" existing code into 
semantically rich models before modifying.""",
            diagram="""\
╭───────────────────────────────────────────────────────────╮
│                  CONSTRUCTION PHASE                       │
│                (HOW via Mob Construction)                 │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  For each UNIT:                                           │
│                                                           │
│  ┌────────────┐    ┌────────────┐    ┌────────────┐     │
│  │  Domain    │───▶│  Logical   │───▶│    Code    │     │
│  │  Design    │    │  Design    │    │ + Tests    │     │
│  └────────────┘    └────────────┘    └─────┬──────┘     │
│                                            │             │
│                                            ▼             │
│                                     ┌────────────┐      │
│                                     │ Validation │      │
│                                     │  Evidence  │      │
│                                     └────────────┘      │
│                                                           │
╰───────────────────────────────────────────────────────────╯""",
        ),
        Section(
            id="domain-design",
            title="Domain Design",
            content="""\
Domain Design models core business logic INDEPENDENT of 
infrastructure concerns.

AI-DLC v1 applies DDD (Domain-Driven Design) elements:

Strategic patterns:
• Bounded contexts - Clear domain boundaries
• Aggregates - Consistency boundaries
• Context mapping - How domains interact

Tactical patterns:
• Entities - Objects with identity
• Value Objects - Immutable attributes
• Domain Events - Important occurrences
• Repositories - Data access abstraction
• Factories - Complex object creation

Why Domain Design matters:
• Separates "what" from "how"
• Creates shared language (ubiquitous language)
• Makes business logic explicit and testable
• Enables right-sized bounded contexts for parallel work""",
            diagram="""\
    ┌─────────────────────────────────────────────────────────┐
    │                    DOMAIN MODEL                          │
    │                                                          │
    │  ┌───────────────────────────────────────────────────┐  │
    │  │               Bounded Context: Orders              │  │
    │  │                                                    │  │
    │  │   ┌──────────┐    ┌─────────────┐                │  │
    │  │   │  Order   │◄───│ OrderLine   │  (Aggregate)   │  │
    │  │   │(Entity)  │    │(Value Obj)  │                │  │
    │  │   └────┬─────┘    └─────────────┘                │  │
    │  │        │                                          │  │
    │  │        ▼  publishes                               │  │
    │  │   ┌──────────────┐                               │  │
    │  │   │OrderPlaced   │  (Domain Event)               │  │
    │  │   └──────────────┘                               │  │
    │  └───────────────────────────────────────────────────┘  │
    └─────────────────────────────────────────────────────────┘""",
        ),
        Section(
            id="logical-design",
            title="Logical Design + NFRs",
            content="""\
Logical Design extends Domain Design to address 
Non-Functional Requirements (NFRs).

NFR categories:
• Availability - Uptime targets, failure modes
• Latency - Response time per endpoint
• Security - AuthN/AuthZ, encryption, auditing
• Compliance - GDPR, SOC2, HIPAA as applicable
• Scalability - Load profiles, growth assumptions

AI applies architectural patterns:
• CQRS - Separate read/write models
• Circuit breakers - Fault tolerance
• Event sourcing - Audit trail
• Caching - Performance optimization

Key output: Architecture Decision Records (ADRs)
• Problem statement
• Options considered
• Decision and rationale
• Trade-offs accepted

Developers validate trade-offs and override when needed.""",
            diagram="""\
    DOMAIN MODEL                    LOGICAL MODEL
    ─────────────                   ─────────────
    
    ┌──────────┐                   ┌──────────────────────┐
    │  Order   │  ────NFRs────▶   │   Order Service      │
    │ (Entity) │                   │   + CQRS             │
    └──────────┘                   │   + Event Sourcing   │
                                   │   + Circuit Breaker  │
                                   └──────────────────────┘
    
    NFR: "99.9% uptime"   ──────▶  Pattern: Circuit Breaker
    NFR: "< 200ms p99"    ──────▶  Pattern: Caching + CQRS""",
        ),
        Section(
            id="code-generation",
            title="Code Generation",
            content="""\
AI generates code from Logical Design in two parts:

Part 1 - PLANNING
• Create code plan with checkboxes
• Map design elements to code artifacts
• Identify dependencies and order
• STOP for approval before generating

Part 2 - GENERATION
• Implement in small batches (keep reviewable)
• Prefer backward-compatible changes
• Add feature flags for risky changes
• Generate tests alongside code

Implementation rules:
• Keep changes < 400 lines per batch
• Clear contracts between components
• Follow established repo conventions
• Document public APIs

AI maps to target platform:
• AWS services (Lambda, DynamoDB, etc.)
• Containers or serverless
• IaC (Terraform, CloudFormation, CDK)""",
            diagram="""\
    CODE GENERATION FLOW
    ────────────────────
    
    ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
    │   Logical    │────▶│   Code Plan  │────▶│   Generate   │
    │   Design     │     │ (checkboxes) │     │   + Tests    │
    └──────────────┘     └──────┬───────┘     └──────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │    STOP      │
                        │ for approval │
                        └──────────────┘
    
    BATCH SIZE:   Small (< 400 lines)
    TESTS:        Generated with code
    FEATURE FLAGS: For risky changes""",
        ),
        Section(
            id="build-and-test",
            title="Build and Test",
            content="""\
Comprehensive testing validates each Unit.

Test pyramid:
• Unit tests - Fast, isolated, many
• Integration tests - Component interaction
• Contract tests - API agreements
• Security tests - Vulnerabilities
• Performance tests - Load and latency

Validation evidence (mandatory):
• Exact commands executed
• Results and any failures
• Fixes applied
• Final status per acceptance criterion

Runtime validation (mandatory):
• Run the service locally or in test env
• Execute API smoke tests
• Validate auth flows and error handling
• Verify data persistence behavior

"Unit is DONE only when evidence is captured."

Proof over prose: 
AI claims are untrusted until verified by tests,
scans, and runtime checks.""",
            diagram="""\
    VALIDATION REPORT (validation-report.md)
    ─────────────────────────────────────────
    
    ## Commands Executed
    - [x] pip install -r requirements.txt
    - [x] pytest tests/ -v
    - [x] ruff check src/
    - [x] bandit -r src/  (security)
    
    ## Results
    - Tests: 47 passed, 0 failed
    - Lint: 0 errors
    - Security: 0 high/critical
    
    ## Acceptance Criteria Status
    - [x] AC1: User can create order
    - [x] AC2: Order persists correctly
    - [x] AC3: Events published""",
        ),
        Section(
            id="construction-complete",
            title="Construction Complete",
            content="""\
You've completed the Construction deep dive!

KEY TAKEAWAYS:

• Construction = HOW via Mob Construction
• Domain Design first (DDD patterns)
• Logical Design adds NFR patterns
• Code generation in two parts (plan + generate)
• Validation requires runtime evidence
• "Proof over prose" - verify, don't claim

CONSTRUCTION STAGES (conditional per-unit):
• Functional Design
• NFR Requirements  
• NFR Design
• Infrastructure Design
• Code Generation (always)
• Build and Test (always)

NEXT:
• Try the Stage Simulator to see adaptive paths
• Test your knowledge with Practice mode

Press Esc to return to the main menu.""",
            diagram="""\
╭───────────────────────────────────────────╮
│                                           │
│  ✓ Lesson Complete: Construction Phase   │
│                                           │
│  Ready to simulate a workflow?            │
│                                           │
╰───────────────────────────────────────────╯""",
        ),
    ],
)


OPERATIONS_DEEP_DIVE = Lesson(
    id="operations-deep-dive",
    title="Phase: Operations",
    description="Deep dive into the Operations phase",
    sections=[
        Section(
            id="operations-overview",
            title="Operations Overview",
            content="""\
The OPERATIONS phase determines WHERE and WHEN to run it.

Goal: Productionize with safety and observability.

Key focus areas:
• Deployment planning and infrastructure as code
• CI/CD pipeline configuration
• Observability (metrics, logs, traces)
• Runbooks and incident response
• Cost modeling and scaling assumptions
• Security review and compliance evidence

Note: AWS's public workflows note Operations is still a 
placeholder in the rule set, but enterprise practice 
should treat it as real work NOW.

Operations gate: Production readiness = 
deployable, observable, rollbackable.""",
            diagram="""\
╭───────────────────────────────────────────────────────────╮
│                   OPERATIONS PHASE                        │
│              (WHERE/WHEN - Productionize)                 │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  INPUT:                      OUTPUT:                      │
│  • Tested code               • IaC templates              │
│  • Validation reports        • CI/CD pipelines            │
│  • Design artifacts          • Dashboards + alerts        │
│                              • Runbooks                   │
│                              • Cost model                 │
│                                                           │
│  GATE: Production Readiness Approved                      │
│                                                           │
╰───────────────────────────────────────────────────────────╯""",
        ),
        Section(
            id="deployment-planning",
            title="Deployment Planning",
            content="""\
Deployment planning defines HOW code reaches production.

Key decisions (require approval):
• Target environment: Cloud (serverless, containers, K8s) 
  or on-prem (VMs, managed platform)
• Environment layout: dev → staging → production
• IaC approach: Terraform, CloudFormation/CDK, Helm
• Secrets management: Vault, AWS Secrets Manager, etc.
• Database provisioning and migration flow

Rollout strategies:
• Blue/Green - instant switch, easy rollback
• Canary - gradual traffic shift, early detection
• Rolling - progressive replacement, resource efficient

Artifact: deployment-plan.md
• Environment topology
• Infrastructure requirements
• Deployment sequence
• Rollback procedure""",
            diagram="""\
    DEPLOYMENT STRATEGIES
    ─────────────────────
    
    BLUE/GREEN                 CANARY
    ┌─────────┐               ┌─────────┐
    │  BLUE   │ ──switch──▶  │  NEW    │ 10%
    │ (live)  │               │         │
    └─────────┘               └─────────┘
    ┌─────────┐               ┌─────────┐
    │  GREEN  │               │  OLD    │ 90%
    │ (new)   │               │ (live)  │
    └─────────┘               └─────────┘
    
    ROLLING
    ┌───┬───┬───┬───┐    ┌───┬───┬───┬───┐
    │ 1 │ 2 │ 3 │ 4 │ ─▶ │NEW│ 2 │ 3 │ 4 │ ─▶ ...
    └───┴───┴───┴───┘    └───┴───┴───┴───┘""",
        ),
        Section(
            id="observability",
            title="Observability",
            content="""\
Observability answers: "What is my system doing right now?"

The three pillars:
• METRICS - Numeric measurements over time
  (latency, throughput, error rate, saturation)
• LOGS - Timestamped event records
  (structured JSON, correlation IDs, PII redaction)
• TRACES - Request flow across services
  (distributed tracing, span context)

SLOs (Service Level Objectives):
• Define target: "99.9% of requests < 200ms"
• Set error budget: "0.1% allowed failures/month"
• Alert on burn rate: "Alert when burning 10x budget"

Key artifacts:
• observability.md - SLOs, metrics list, log schema
• Dashboard templates - Grafana, CloudWatch, etc.
• Alert definitions - Thresholds and escalation

PII policy: Define what gets logged, what gets redacted.""",
            diagram="""\
    OBSERVABILITY STACK
    ───────────────────
    
    ┌─────────────────────────────────────────────┐
    │                 DASHBOARDS                   │
    │   ┌─────────┐ ┌─────────┐ ┌─────────┐      │
    │   │ Latency │ │ Errors  │ │ Traffic │      │
    │   │  p99    │ │  Rate   │ │  QPS    │      │
    │   └─────────┘ └─────────┘ └─────────┘      │
    └─────────────────────────────────────────────┘
              │            │            │
              ▼            ▼            ▼
    ┌─────────────┐ ┌───────────┐ ┌───────────┐
    │   METRICS   │ │   LOGS    │ │  TRACES   │
    │  Prometheus │ │   ELK     │ │   Jaeger  │
    │  CloudWatch │ │ CloudWatch│ │   X-Ray   │
    └─────────────┘ └───────────┘ └───────────┘""",
        ),
        Section(
            id="runbooks",
            title="Runbooks & Incident Response",
            content="""\
Runbooks document how to respond to operational events.

Runbook structure:
1. INCIDENT TYPE - What triggered this runbook?
2. SEVERITY - P1 (critical) → P4 (low)
3. SYMPTOMS - How to recognize the issue
4. TRIAGE STEPS - Initial investigation
5. RESOLUTION STEPS - How to fix it
6. ROLLBACK STEPS - How to revert if fix fails
7. ESCALATION PATH - Who to contact when stuck

Example runbook triggers:
• High error rate (>1% for 5 min)
• Latency spike (p99 > 2x baseline)
• Service unavailable (health check fails)
• Security alert (unusual access pattern)

AI-DLC integration:
• AI can draft runbooks from deployment-plan.md
• Humans validate and refine
• Runbooks are versioned artifacts
• Retro updates runbooks after incidents""",
            diagram="""\
    INCIDENT RESPONSE FLOW
    ──────────────────────
    
    ┌─────────┐     ┌─────────┐     ┌─────────┐
    │  ALERT  │────▶│ TRIAGE  │────▶│DIAGNOSE │
    │ FIRES   │     │ (5 min) │     │(15 min) │
    └─────────┘     └─────────┘     └────┬────┘
                                         │
                    ┌────────────────────┴────┐
                    ▼                         ▼
              ┌─────────┐              ┌─────────┐
              │  FIX    │              │ROLLBACK │
              │ FORWARD │              │  BACK   │
              └────┬────┘              └────┬────┘
                   │                        │
                   └────────────┬───────────┘
                                ▼
                          ┌─────────┐
                          │  RETRO  │
                          │(update  │
                          │runbooks)│
                          └─────────┘""",
        ),
        Section(
            id="cost-modeling",
            title="Cost Modeling & Scaling",
            content="""\
Cost modeling ensures sustainable operations.

Key elements:
• LOAD ASSUMPTIONS - Expected traffic patterns
  (baseline, peak, growth rate)
• COST DRIVERS - What generates cost?
  (compute, storage, network, third-party APIs)
• SCALING STRATEGY - How to handle growth
  (auto-scaling, reserved capacity, spot instances)
• COST GUARDRAILS - Alerts when spend exceeds budget

Cost model artifact (cost.md):
```
## Load Assumptions
- Baseline: 1000 req/min
- Peak: 10x baseline
- Growth: 20% month-over-month

## Monthly Cost Estimate
- Compute: $X
- Database: $Y
- Network: $Z
- Total: $X+Y+Z

## Scaling Triggers
- Scale up: CPU > 70% for 5 min
- Scale down: CPU < 30% for 15 min

## Guardrails
- Alert: >120% of budget
- Hard cap: 150% of budget
```""",
            diagram="""\
    COST OPTIMIZATION
    ─────────────────
    
    COMPUTE          STORAGE          NETWORK
    ┌─────────┐     ┌─────────┐     ┌─────────┐
    │Right-   │     │Tiered   │     │CDN      │
    │sizing   │     │storage  │     │caching  │
    ├─────────┤     ├─────────┤     ├─────────┤
    │Spot/    │     │Lifecycle│     │Compress │
    │Reserved │     │policies │     │payloads │
    ├─────────┤     ├─────────┤     ├─────────┤
    │Auto-    │     │Archive  │     │Regional │
    │scaling  │     │old data │     │endpoints│
    └─────────┘     └─────────┘     └─────────┘
    
    📊 Track: Cost per request, cost per user""",
        ),
        Section(
            id="production-readiness",
            title="Production Readiness Gate",
            content="""\
The production readiness gate is the final checkpoint.

CHECKLIST (all must pass):

□ DEPLOYABLE
  • IaC templates validated
  • CI/CD pipeline tested
  • Rollback procedure documented
  • Secrets properly configured

□ OBSERVABLE
  • Metrics collecting
  • Logs flowing
  • Traces enabled
  • Dashboards created
  • Alerts configured

□ ROLLBACKABLE
  • Previous version preserved
  • Rollback tested
  • Data migration reversible (if applicable)
  • Feature flags in place (if applicable)

□ SECURE
  • Security scan passed
  • Access controls verified
  • Compliance evidence gathered
  • Threat model reviewed

□ COST-AWARE
  • Budget approved
  • Guardrails configured
  • Scaling limits set""",
            diagram="""\
    PRODUCTION READINESS GATE
    ─────────────────────────
    
    ┌─────────────────────────────────────────────┐
    │                                             │
    │  ☐ Deployable     ☐ Observable             │
    │  ☐ Rollbackable   ☐ Secure                 │
    │  ☐ Cost-Aware                              │
    │                                             │
    │         ALL BOXES MUST BE CHECKED          │
    │                                             │
    ├─────────────────────────────────────────────┤
    │                                             │
    │    [  APPROVE  ]    [  REJECT  ]           │
    │                                             │
    │  Evidence required for each criterion      │
    │                                             │
    └─────────────────────────────────────────────┘""",
        ),
        Section(
            id="operations-complete",
            title="Operations Complete",
            content="""\
You've completed the Operations deep dive!

KEY TAKEAWAYS:

• Operations = WHERE/WHEN (productionize)
• Deployment planning with rollout strategy
• Observability: metrics, logs, traces + SLOs
• Runbooks for incident response
• Cost modeling with guardrails
• Production readiness gate (5 criteria)

OPERATIONS ARTIFACTS:
• deployment-plan.md
• observability.md
• runbooks.md
• cost.md

GATE CRITERIA:
• Deployable (IaC, CI/CD, secrets)
• Observable (metrics, logs, traces, alerts)
• Rollbackable (tested rollback procedure)
• Secure (scans, access controls, compliance)
• Cost-Aware (budget, guardrails, scaling)

NEXT:
• Explore the Artifact Explorer
• Test your knowledge with Practice mode

Press Esc to return to the main menu.""",
            diagram="""\
╭───────────────────────────────────────────╮
│                                           │
│   ✓ Lesson Complete: Operations Phase    │
│                                           │
│   100% Methodology Coverage Achieved!     │
│                                           │
╰───────────────────────────────────────────╯""",
        ),
    ],
)


WORKFLOW_VARIANTS = Lesson(
    id="workflow-variants",
    title="Workflow Variants",
    description="Adapt AI-DLC for different project types",
    sections=[
        Section(
            id="choosing-variant",
            title="Choosing Your Variant",
            content="""\
AI-DLC adapts to different project types. Choose wisely!

DECISION TREE:

1. Is there existing code?
   YES → Brownfield or Bugfix
   NO  → Greenfield

2. If brownfield, is it a small fix?
   YES → Bugfix (minimal ceremony)
   NO  → Brownfield (full discovery)

3. What's the primary focus?
   BACKEND → Standard stages
   FRONTEND → Add browser validation

KEY PRINCIPLE: "Execute only stages that add value."

The adaptive depth principle means:
• Stage selection is BINARY (execute or skip)
• Detail level WITHIN stages adapts to complexity
• Simple changes skip conditional stages
• Complex changes get full treatment""",
            diagram="""\
    VARIANT DECISION TREE
    ─────────────────────
    
                    ┌─────────────────┐
                    │ Existing code?  │
                    └────────┬────────┘
                      YES    │    NO
                    ┌────────┴────────┐
                    ▼                 ▼
              ┌──────────┐     ┌──────────┐
              │Small fix?│     │GREENFIELD│
              └────┬─────┘     └──────────┘
               YES │ NO
              ┌────┴────┐
              ▼         ▼
         ┌────────┐ ┌──────────┐
         │ BUGFIX │ │BROWNFIELD│
         └────────┘ └──────────┘
                         │
                    Primary focus?
                    ┌────┴────┐
                    ▼         ▼
               ┌────────┐ ┌────────┐
               │BACKEND │ │FRONTEND│
               └────────┘ └────────┘""",
        ),
        Section(
            id="greenfield-variant",
            title="Greenfield (Build New)",
            content="""\
Greenfield = Building from scratch with no existing code.

CHARACTERISTICS:
• Full Inception ceremony (all stages valuable)
• Maximum design freedom
• Highest opportunity for AI acceleration
• Requires clear intent and constraints

STAGE SELECTION:
• Workspace Detection: ALWAYS (confirm greenfield)
• Requirements Analysis: ALWAYS (full depth)
• User Stories: CONDITIONAL (recommended)
• Application Design: CONDITIONAL (recommended)
• Units Generation: CONDITIONAL (recommended)
• Workflow Planning: ALWAYS

CONSTRUCTION:
• All design stages recommended (functional, NFR, infra)
• Code generation with full context
• Comprehensive testing

BEST PRACTICES:
• Invest heavily in Inception
• Define clear success metrics upfront
• Use Units for parallel development
• Establish coding conventions early""",
            diagram="""\
    GREENFIELD STAGE FLOW
    ─────────────────────
    
    🔵 INCEPTION (full depth)
    ├── Workspace Detection ────────────── ALWAYS
    ├── Requirements Analysis ──────────── ALWAYS
    ├── User Stories ───────────────────── RECOMMENDED
    ├── Application Design ─────────────── RECOMMENDED
    ├── Units Generation ───────────────── RECOMMENDED
    └── Workflow Planning ──────────────── ALWAYS
    
    🟢 CONSTRUCTION (per unit)
    ├── Functional Design ──────────────── RECOMMENDED
    ├── NFR Requirements ───────────────── RECOMMENDED
    ├── NFR Design ─────────────────────── RECOMMENDED
    ├── Infrastructure Design ──────────── RECOMMENDED
    ├── Code Generation ────────────────── ALWAYS
    └── Build and Test ─────────────────── ALWAYS""",
        ),
        Section(
            id="brownfield-variant",
            title="Brownfield (Enhance Existing)",
            content="""\
Brownfield = Modifying or extending existing code.

CHARACTERISTICS:
• Mandatory discovery/reverse engineering phase
• Must preserve existing working behavior
• Higher risk of regression
• Requires understanding before changing

STAGE SELECTION:
• Workspace Detection: ALWAYS
• Reverse Engineering: ALWAYS (key difference!)
• Requirements Analysis: ALWAYS (adaptive depth)
• User Stories: CONDITIONAL
• Workflow Planning: ALWAYS

REVERSE ENGINEERING produces:
• Static models (components, responsibilities)
• Dynamic models (interactions, flows)
• Dependency map
• Risk assessment

BEST PRACTICES:
• Never skip reverse engineering
• Document existing behavior before changing
• Establish regression baselines (tests, snapshots)
• Small, incremental changes
• Feature flags for risky changes""",
            diagram="""\
    BROWNFIELD STAGE FLOW
    ─────────────────────
    
    🔵 INCEPTION
    ├── Workspace Detection ────────────── ALWAYS
    ├── Reverse Engineering ────────────── ALWAYS ⭐
    │   ├── Static analysis
    │   ├── Dynamic analysis
    │   └── Dependency mapping
    ├── Requirements Analysis ──────────── ALWAYS
    ├── User Stories ───────────────────── CONDITIONAL
    └── Workflow Planning ──────────────── ALWAYS
    
    🟢 CONSTRUCTION
    ├── Regression baseline ────────────── RECOMMENDED ⭐
    ├── Functional Design ──────────────── CONDITIONAL
    ├── Code Generation ────────────────── ALWAYS
    └── Build and Test ─────────────────── ALWAYS
    
    ⭐ = Key brownfield differences""",
        ),
        Section(
            id="frontend-variant",
            title="Frontend (Browser Validation)",
            content="""\
Frontend = UI/UX work requiring browser validation.

CHARACTERISTICS:
• Behavior must be proven in the browser
• Visual regression is a key risk
• User interaction flows matter
• Accessibility requirements

ADDITIONAL REQUIREMENTS:
• Runtime validation using DevTools/browser
• Visual regression testing
• Cross-browser compatibility checks
• Accessibility audits (WCAG)

STAGE SELECTION:
• User Stories: RECOMMENDED (UX flows)
• Infrastructure Design: OFTEN SKIP (no backend)
• Browser Validation: ALWAYS (key difference!)

BEST PRACTICES:
• Use Chrome DevTools MCP for validation
• Screenshot comparison for visual regression
• Test real user flows end-to-end
• Verify on multiple browsers
• Check responsive behavior
• Run accessibility linter (axe, lighthouse)""",
            diagram="""\
    FRONTEND STAGE FLOW
    ───────────────────
    
    🔵 INCEPTION
    ├── Workspace Detection ────────────── ALWAYS
    ├── Requirements Analysis ──────────── ALWAYS
    ├── User Stories (UX flows) ────────── RECOMMENDED ⭐
    └── Workflow Planning ──────────────── ALWAYS
    
    🟢 CONSTRUCTION
    ├── Functional Design ──────────────── CONDITIONAL
    ├── NFR Requirements ───────────────── CONDITIONAL
    ├── Infrastructure Design ──────────── OFTEN SKIP ⭐
    ├── Code Generation ────────────────── ALWAYS
    ├── Build and Test ─────────────────── ALWAYS
    └── Browser Validation ─────────────── ALWAYS ⭐
        ├── Visual regression
        ├── User flow testing
        ├── Cross-browser checks
        └── Accessibility audit
    
    ⭐ = Key frontend differences""",
        ),
        Section(
            id="bugfix-variant",
            title="Bugfix (Minimal Ceremony)",
            content="""\
Bugfix = Small, targeted fix with minimal ceremony.

CHARACTERISTICS:
• Clear, narrow scope
• Low risk (isolated change)
• Fast turnaround expected
• Still requires validation!

STAGE SELECTION:
• Workspace Detection: ALWAYS (confirm context)
• Reverse Engineering: OFTEN (understand bug)
• Requirements Analysis: MINIMAL (bug description)
• Design Stages: USUALLY SKIP
• Code Generation: ALWAYS
• Build and Test: ALWAYS

WHAT'S DIFFERENT:
• Artifacts are concise (1-2 paragraphs)
• No units decomposition (single change)
• No extensive design docs
• Focus on regression prevention

BEST PRACTICES:
• Write failing test FIRST
• Understand root cause before fixing
• Check for related issues
• Keep change minimal
• Document fix in commit message
• Update runbooks if operational bug""",
            diagram="""\
    BUGFIX STAGE FLOW (minimal)
    ───────────────────────────
    
    🔵 INCEPTION (quick)
    ├── Workspace Detection ────────────── ALWAYS
    ├── Reverse Engineering ────────────── OFTEN
    │   └── Understand bug context
    ├── Requirements Analysis ──────────── MINIMAL
    │   └── Bug description only
    └── Workflow Planning ──────────────── SKIP
    
    🟢 CONSTRUCTION (focused)
    ├── Functional Design ──────────────── SKIP
    ├── NFR Design ─────────────────────── SKIP
    ├── Infrastructure Design ──────────── SKIP
    ├── Code Generation ────────────────── ALWAYS
    │   ├── Write failing test
    │   ├── Fix bug
    │   └── Verify test passes
    └── Build and Test ─────────────────── ALWAYS
        └── Regression suite
    
    TOTAL STAGES: 4-5 (vs 12+ for greenfield)""",
        ),
        Section(
            id="variant-comparison",
            title="Variant Comparison",
            content="""\
Compare all variants at a glance:

| Aspect      | Greenfield | Brownfield | Frontend | Bugfix |
|-------------|------------|------------|----------|--------|
| Rev Eng     | Skip       | ALWAYS     | If needed| Often  |
| User Stories| Recommend  | Conditional| Recommend| Skip   |
| App Design  | Recommend  | Conditional| Skip     | Skip   |
| NFR Design  | Recommend  | Conditional| Condition| Skip   |
| Infra Design| Recommend  | Conditional| Skip     | Skip   |
| Browser Val | If needed  | If needed  | ALWAYS   | If UI  |
| Typical Time| Days-Weeks | Days-Weeks | Days     | Hours  |
| Risk Level  | Medium     | Higher     | Medium   | Lower  |

ADAPTIVE DEPTH APPLIES TO ALL:
• Simple greenfield → fewer stages
• Complex bugfix → more stages
• Risk modifiers (regulated, security) add stages

The methodology flexes to fit the problem.""",
            diagram="""\
    STAGE COUNT BY VARIANT
    ──────────────────────
    
    GREENFIELD   ████████████████  12-14 stages
    BROWNFIELD   ██████████████    11-13 stages
    FRONTEND     ██████████        8-10 stages
    BUGFIX       █████             4-5 stages
    
    INCEPTION DEPTH
    
    GREENFIELD   ████████████████  Full ceremony
    BROWNFIELD   ████████████████  + Rev Eng
    FRONTEND     ██████████        UX focus
    BUGFIX       ████              Minimal
    
    KEY: █ = relative depth/effort""",
        ),
        Section(
            id="variants-complete",
            title="Workflow Variants Complete",
            content="""\
You've completed the Workflow Variants lesson!

KEY TAKEAWAYS:

• Choose variant based on:
  - Existing code? (greenfield vs brownfield)
  - Small fix? (bugfix vs full)
  - Primary focus? (backend vs frontend)

• Greenfield: Full ceremony, maximum freedom
• Brownfield: Mandatory reverse engineering
• Frontend: Browser validation required
• Bugfix: Minimal ceremony, focused fix

• Adaptive depth applies to ALL variants
• Risk modifiers can increase any variant's stages

REMEMBER:
"Execute only stages that add value."

NEXT:
• Try the Stage Simulator with different variants
• Practice in Gatekeeper mode

Press Esc to return to the main menu.""",
            diagram="""\
╭───────────────────────────────────────────╮
│                                           │
│   ✓ Lesson Complete: Workflow Variants   │
│                                           │
│   Now you can adapt AI-DLC to any        │
│   project type!                           │
│                                           │
╰───────────────────────────────────────────╯""",
        ),
    ],
)


def load_lesson(lesson_id: str) -> Lesson:
    """Load a lesson by ID.
    
    Args:
        lesson_id: The lesson identifier
        
    Returns:
        The loaded Lesson object
        
    Raises:
        ValueError: If lesson_id is not found
    """
    lessons = {
        "aidlc-overview": AIDLC_OVERVIEW_LESSON,
        "principles": PRINCIPLES_LESSON,
        "inception-deep-dive": INCEPTION_DEEP_DIVE,
        "construction-deep-dive": CONSTRUCTION_DEEP_DIVE,
        "operations-deep-dive": OPERATIONS_DEEP_DIVE,
        "workflow-variants": WORKFLOW_VARIANTS,
    }
    
    if lesson_id not in lessons:
        raise ValueError(f"Unknown lesson: {lesson_id}")
    
    return lessons[lesson_id]


def get_all_lessons() -> list[dict]:
    """Get metadata for all available lessons."""
    return [
        {"id": "aidlc-overview", "title": "AI-DLC Overview", "description": "Learn the fundamentals"},
        {"id": "principles", "title": "10 Core Principles", "description": "Master the methodology"},
        {"id": "inception-deep-dive", "title": "Phase: Inception", "description": "Deep dive into Inception"},
        {"id": "construction-deep-dive", "title": "Phase: Construction", "description": "Deep dive into Construction"},
        {"id": "operations-deep-dive", "title": "Phase: Operations", "description": "Deep dive into Operations"},
        {"id": "workflow-variants", "title": "Workflow Variants", "description": "Adapt for different projects"},
    ]


__all__ = ["Lesson", "Section", "load_lesson", "get_all_lessons"]
