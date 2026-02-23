# 08 — Artifacts, State Model & the Golden Thread

AI-SDLC is not a chat-based methodology. It is a file-based, artifact-driven system where every decision, plan, and proof persists in the repository. The Golden Thread — the continuous link from business intent to deployed code — is preserved by artifacts, not conversation history.

---

## Why Artifacts Are First-Class

In traditional development, context lives in Jira tickets, Slack threads, and the heads of engineers. When an AI agent enters the picture, that context is invisible. The agent hallucinates to fill the gaps.

AI-SDLC solves this by making artifacts the primary interface between humans and AI:

- Artifacts are durable — they survive across sessions, tools, and team changes
- Artifacts are reviewable — humans and future AI sessions can inspect them
- Artifacts are auditable — every decision has a paper trail
- Artifacts are machine-readable — AI can consume them as structured context

The rule: if it's not in an artifact, it doesn't exist. Chat history is ephemeral. Artifacts are the system of record.

---

## The Golden Thread

The Golden Thread is the continuous, unbroken path of context and intent from business goal to deployed code:

```
Business Intent → Requirements → Units → Design → Code → Tests → Deployment
```

Traditional SDLC breaks this thread at every handoff — from PM to architect, architect to developer, developer to QA. Each handoff loses context. AI-SDLC preserves the thread through artifacts that carry context forward at every stage.

Gates are the checkpoints that verify the Golden Thread is intact. At each gate, the reviewer asks: "Can I trace this output back to the original intent?" If the answer is no, the thread is broken and must be repaired before proceeding.

When the Golden Thread breaks — when artifacts are not maintained, when decisions are made in chat and not persisted — the system regresses to "chat-vibes and hallucinations." This is context debt, and it compounds faster than technical debt.

---

## The Canonical Directory Structure

AWS AI-SDLC workflows define a standard artifact structure that mirrors the three-phase lifecycle:

```
/aidlc-docs/                          # Durable AI-SDLC artifacts (versioned in repo)
  aidlc-state.md                      # Current phase/stage + completion status
  execution-plan.md                   # Planned stages + rationale + checkboxes
  audit.md                            # Append-only log (timestamped decisions)
  prompts.md                          # Log of all prompts given to AI
  
  inception/                          # Phase A artifacts
    intent.md                         # One paragraph + success metrics
    requirements.md                   # Functional requirements + constraints
    nfr.md                            # Non-functional requirements (7 categories)
    user-stories.md                   # User stories with acceptance criteria
    sources-local-map.md              # Source material references
    units/                            # Decomposed work units
      README.md                       # Unit index, dependency graph, build order
      unit-01-*.md                    # Unit spec: scope, acceptance criteria, deps
      unit-02-*.md
      ...
  
  construction/                       # Phase B artifacts (per-unit subdirectories)
    unit-01/
      design.md                       # Domain model, APIs, data model, tradeoffs
      tasks-plan.md                   # Checkbox plan (Bolt breakdown)
      validation-report.md            # What ran, results, gaps, evidence
    unit-02/
      ...
    domain-model.md                   # Cross-unit domain model (optional)
  
  operations/                         # Phase C artifacts
    deployment-plan.md                # IaC plan + implementation
    runbooks.md                       # Operational procedures
    observability.md                  # Dashboards, alerts, monitoring config
    cost.md                           # Cost model and scaling assumptions
```

An alternative per-feature layout (demonstrated by the unofficial AI-SDLC MCP server) uses `.aidlc/<feature>/...` with phase tracking in `current_phase.json`. Both approaches work — the key is consistency within an organization.

---

## Artifact Types and Their Roles

### State Tracking Artifacts

| Artifact | Purpose | Mutability |
|----------|---------|------------|
| `aidlc-state.md` | Current phase, stage, unit, status, blockers | Updated at every transition |
| `execution-plan.md` | Planned stages with checkboxes and rationale | Editable until approved, then locked per phase |
| `audit.md` | Timestamped log of decisions, approvals, evidence | Append-only (immutable) |
| `prompts.md` | Record of all prompts given to AI | Append-only |

### Inception Artifacts

| Artifact | Purpose | Gate |
|----------|---------|------|
| `intent.md` | One-paragraph vision + success metrics table | Inception entry |
| `requirements.md` | Functional requirements, user stories, constraints | Inception exit |
| `nfr.md` | Non-functional requirements across 7 categories | Inception exit |
| `units/*.md` | Decomposed work: scope, acceptance criteria, dependencies | Inception exit |

### Construction Artifacts (per unit)

| Artifact | Purpose | Gate |
|----------|---------|------|
| `design.md` | Domain model, bounded contexts, API contracts, data flow | Pre-implementation |
| `tasks-plan.md` | Bolt-level task breakdown with checkboxes | Pre-implementation |
| `validation-report.md` | Test results, lint results, acceptance criteria status | Unit completion |

### Operations Artifacts

| Artifact | Purpose | Gate |
|----------|---------|------|
| `deployment-plan.md` | IaC plan, CI/CD pipeline updates | Production readiness |
| `runbooks.md` | Operational procedures, incident response | Production readiness |
| `observability.md` | Monitoring config, dashboards, alerts | Production readiness |
| `cost.md` | Cost model, scaling assumptions, ROI tracking | Production readiness |

---

## Immutable Evidence vs. Editable Plans

AI-SDLC draws a sharp line between two categories of artifacts:

### Editable Plans
- `execution-plan.md`, `tasks-plan.md`, `design.md`
- Can be revised during their active phase
- Lock after their gate passes (become historical record)
- Represent "what we intend to do"

### Immutable Evidence
- `audit.md`, `validation-report.md`, `prompts.md`
- Append-only — never edited after creation
- Represent "what actually happened"
- The audit log is the single source of truth for decisions

This distinction matters because AI agents can (and will) attempt to revise history if allowed. Making evidence artifacts append-only prevents the agent from covering its tracks when something goes wrong.

---

## The State Tracking Model

The `aidlc-state.md` file acts as the AI's "program counter" — it tells any agent (or human) exactly where the project stands:

```markdown
# AI-SDLC State

## Current Status

| Field | Value |
|-------|-------|
| **Phase** | Construction |
| **Unit** | Unit 01 - TUI Framework |
| **Stage** | Code Generation |
| **Status** | IN PROGRESS |
| **Last Updated** | 2026-01-28 |

## What's Next
- Complete implementation of Unit 01
- Run validation suite
- Gate review

## Blockers
None.
```

This file is updated at every phase/stage transition. It enables:
- Session continuity — a new AI session can pick up exactly where the last one left off
- Team visibility — anyone can check project status without asking
- Audit correlation — state transitions can be cross-referenced with the audit log

---

## Context Persistence: The File-Based Interaction Model

AI-SDLC uses a file-based interaction model rather than relying on chat history. This is a deliberate architectural choice:

### File-Based (Recommended for Enterprise)
- AI asks structured questions; answers persist in files with structured tags
- Responses are reviewable, validatable, and mechanically parseable
- Multiple stakeholders can review asynchronously
- Full auditability of every decision

### Chat-Based (Useful for Speed)
- Quick clarifications during a Bolt
- Useful for "keep moving" flows
- Decisions must still be persisted into artifacts before the gate
- Less auditable — acceptable only for low-stakes decisions

The practical rule: chat is for velocity, artifacts are for truth. Any decision that affects the Golden Thread must be captured in an artifact, regardless of where the conversation happened.

---

## How Artifacts Enable the AI-SDLC Loop

The repeating AI-SDLC cycle depends on artifacts at every step:

1. **AI reads artifacts** — intent, requirements, existing design — to understand context
2. **AI creates a plan** — persisted as `execution-plan.md` or `tasks-plan.md`
3. **Human reviews the plan** — in the file, not in chat
4. **AI implements** — code in repo, traced back to unit acceptance criteria
5. **AI proves results** — `validation-report.md` with test results, lint output, coverage
6. **Human validates at gate** — reviews evidence artifacts, not code line-by-line
7. **Audit log updated** — timestamped record of the decision

Without artifacts, this loop degrades to "AI generates code, human hopes it works." With artifacts, every step is traceable, reviewable, and recoverable.

---

## Real Example: Artifact Flow for a Unit

From this repository's own construction of Unit 01 (TUI Framework):

```
1. inception/intent.md
   → "Build an interactive terminal app that teaches AI-SDLC"
   → Success metrics: 100% content coverage, <15 min walkthrough

2. inception/units/unit-01-tui-framework.md
   → Scope: TUI shell + first lesson module
   → 7 acceptance criteria defined

3. construction/unit-01/design.md
   → Technology: Python + Textual
   → Architecture: screens, widgets, content model
   → Key tradeoffs documented

4. construction/unit-01/tasks-plan.md
   → 6 phases, 40+ tasks with checkboxes
   → Each task traceable to acceptance criteria

5. construction/unit-01/validation-report.md
   → Tests: 73 passed
   → All 7 acceptance criteria met
   → Evidence: test output, lint results

6. audit.md
   → Timestamped entries for every approval and completion
```

The Golden Thread is visible: intent → unit → design → tasks → code → evidence → audit. Any reviewer can trace any line of code back to the business intent that motivated it.

---

## Suggested Talking Points

- Artifacts are the interface between humans and AI — not chat, not tickets, not Slack
- The Golden Thread breaks at handoffs; artifacts preserve it across phases
- Immutable evidence (audit log, validation reports) prevents AI from revising history
- The state file is the AI's "program counter" — enables session continuity and team visibility
- File-based interaction is more auditable than chat-based; chat is for velocity, artifacts are for truth
- Context debt (unmaintained artifacts) compounds faster than technical debt
- Every decision that affects the Golden Thread must be captured in an artifact
