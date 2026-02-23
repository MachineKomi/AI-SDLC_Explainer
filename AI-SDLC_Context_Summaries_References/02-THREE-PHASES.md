# 02 — The Three Phases of AI-SDLC

AI-SDLC organizes work into three lean phases. Each has a clear ritual, output, and human checkpoint (gate). Unlike Agile sprints, these phases don't repeat on a fixed cadence — they flow continuously. A new Intent triggers Inception. Construction runs in parallel Bolts. Operations is always-on.

---

## Phase 1: Inception (WHAT + WHY)

**Goal:** Convert intent into testable, decomposed work.

**Duration:** 2–4 hours (single session)

**Key Ritual:** Mob Elaboration
- Conducted with shared screen and facilitator
- Product Owner states the Intent (business goal)
- AI asks clarifying questions
- AI proposes User Stories, NFRs, and Risks
- Team (PO, Devs, QA, stakeholders) validates and refines in real-time
- AI groups stories into Units and suggests Bolts for execution
- Compresses weeks of sequential planning into hours

**Stages (adaptive based on complexity):**
1. Workspace Detection — greenfield or brownfield? What tech stack?
2. Reverse Engineering (brownfield only) — analyze existing architecture
3. Requirements Analysis (mandatory) — elaborate intent, document functional requirements
4. User Stories (if UI/multiple users) — define personas, document journeys
5. Workflow Planning (mandatory) — determine which stages to run, create execution plan
6. Application Design (if new components) — high-level architecture
7. Unit Generation (if decomposable) — break into parallel units with acceptance criteria

**Primary Artifacts:**
- `intent.md` — one paragraph vision + success metrics
- `requirements.md` — functional requirements + constraints
- `nfr.md` — security, performance, availability, compliance
- `execution-plan.md` — stage sequence + rationale
- `units/` — each unit with scope, acceptance criteria, dependencies

**Gate:** "Inception Exit" = requirements + units approved by human stakeholders.

**Brownfield Extra:** For existing systems, Inception starts with an Elevation step — AI reverse-engineers the codebase into static models (components + relationships) and dynamic models (interaction flows). The team validates these models before proceeding.

---

## Phase 2: Construction (HOW)

**Goal:** Turn approved Units into deployed, tested software.

**Duration:** Hours to days per Bolt

**Key Ritual:** Mob Construction
- Collocated teams build Bolts
- AI generates domain models → logical design → code → tests
- Developers validate at each gate
- Evidence required at every checkpoint

**The Construction Loop:**
```
Plan → Design → Implement → Verify → Report
```

Each Bolt follows this loop. AI proposes an approach, seeks clarification if needed, implements after approval, then proves results with evidence.

**Stages (repeat per unit):**
1. Domain Design — bounded contexts, domain model, interface contracts, data flow (DDD applied by AI)
2. Logical Design + NFRs — patterns, ADRs, architecture decisions
3. Code Generation — always in two parts: planning then generation
4. Build and Test — comprehensive testing, validation report
5. Gate Validation — human reviews evidence, approves or rejects

**A Bolt is the smallest iteration:**
- Duration: hours to days (not weeks)
- Scope: one focused task within a Unit
- Output: tested, deployable code with evidence
- Gate: human approval required before merge
- Target cycle time: 2–4 hours (if >8 hours, decompose further)

**Primary Artifacts (per unit):**
- `design.md` — domain model, APIs, data model, key tradeoffs
- `tasks-plan.md` — checkbox plan with phases
- `validation-report.md` — what ran, results, gaps, acceptance criteria status

**Gate:** Unit done = tests + checks green, acceptance criteria met, review complete.

**Evidence Required at Gates:**
- Tests passing (unit, integration, scenario)
- Lint clean, type check passing
- Coverage meets threshold
- Performance meets NFR benchmarks (if applicable)
- Security scan clean

---

## Phase 3: Operations (WHERE/WHEN)

**Goal:** Productionize with safety and observability.

**Duration:** Continuous

**Key Ritual:** AI-Monitored Ops
- AI packages and deploys artifacts
- AI analyzes telemetry (metrics, logs, traces)
- AI predicts SLA violations
- AI proposes scaling/tuning actions
- Developer validates and approves remediations

**Key Principles:**
- Observability first — you can't fix what you can't see
- Cost discipline — AI models cost money, track ROI
- Infrastructure as Code — never click in the console
- Rollbackability — speed is useless without brakes
- Feedback loop — Operations data feeds back into new Intents

**Artifacts:**
- IaC plan + implementation
- CI/CD pipeline updates
- Runbooks + dashboards + alerts
- Cost model and scaling assumptions
- Security review evidence

**The Feedback Loop:**
```
Operations data → Insights → New Intents → Inception
```
- Production incidents become new scenarios for holdout sets
- Performance data refines NFRs for future Units
- User behavior signals feature prioritization
- Cost data optimizes model routing
- Override patterns improve AI context

**Gate:** Production readiness = deployable, observable, rollbackable.

**Remediation Time Metric:**
- Green: < 2 hours
- Amber: 2–8 hours
- Red: > 8 hours

---

## Phase Comparison Summary

| Dimension | Inception | Construction | Operations |
|---|---|---|---|
| Question | WHAT + WHY | HOW | WHERE + WHEN |
| Duration | 2–4 hours | Hours–days per Bolt | Continuous |
| Ritual | Mob Elaboration | Mob Construction | AI-Monitored Ops |
| Human Role | Define intent, approve scope | Validate design + evidence | Approve remediations |
| AI Role | Decompose, propose, question | Generate, test, prove | Monitor, detect, propose fixes |
| Key Output | Units with acceptance criteria | Tested deployment units | Proactive ops with feedback |
| Gate | Requirements + units approved | Tests green + criteria met | Deployable + observable |

---

## Suggested Talking Points

- Three phases replace the traditional SDLC waterfall or Agile sprint cycle
- Inception compresses weeks of planning into 2–4 hours via Mob Elaboration
- Construction works in Bolts (hours, not sprints/weeks) — each with mandatory evidence
- Operations closes the feedback loop — every incident improves the system
- Every phase has a "loss function" — human validation gates that catch errors before they compound
- The phases flow continuously, not on a fixed cadence
