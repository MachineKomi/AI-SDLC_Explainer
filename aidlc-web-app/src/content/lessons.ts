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
];

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find(lesson => lesson.id === id);
}

export function getAllLessons(): Lesson[] {
  return LESSONS;
}
