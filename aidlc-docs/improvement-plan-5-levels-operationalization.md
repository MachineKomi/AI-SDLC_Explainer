# AI-SDLC Explainer Site — Improvement Plan
## Based on "5 Levels of AI Coding" Transcript + AI-DLC Operationalization Cheat Sheet

> This plan integrates insights from the Nate B Jones "5 Levels" video transcript and the Jonas Directory "AI-DLC Operationalization Cheat Sheet" into the existing AI-SDLC Explainer web app. Every change is aligned with AI-SDLC methodology (Inception → Construction → Operations) and follows the principle of proof over prose.

---

## Phase 1 — Content Enrichment (New Data & Lessons)

### 1.1 New Lesson: "The 5 Levels of AI-Driven Development"

**File:** `src/content/lessons.ts` — add a new `Lesson` entry

**Sections:**
1. **The Gap** — Dark factories vs. the J-curve reality. Most teams bolt AI onto legacy SDLC and get measurably slower (METR study: 19% slower). The gap is not a tooling problem — it's a people, culture, and org-structure problem.
2. **Level 0–2: Spicy Autocomplete → Junior Dev** — L0 autocomplete, L1 scoped tasks with full human review, L2 multi-file changes. 90% of "AI-native" devs are stuck here. Map each level to current AI-SDLC adoption maturity.
3. **Level 3–4: Manager → Product Manager** — L3 directing AI at PR level, L4 writing specs and evaluating outcomes (code as black box). Connect L4 to AI-SDLC's "Intent → Units → Bolts" flow — this IS the spec-driven model.
4. **Level 5: The Dark Factory** — StrongDM's 3-person team. No human writes or reviews code. Specs in, software out. Introduce the concepts of Scenarios vs Tests and Digital Twin environments.
5. **Scenarios vs Tests** — Why external holdout scenarios (not in-repo tests) prevent AI from "teaching to the test." This is a new concept in software development that AI-SDLC should adopt. Connect to AI-SDLC's "proof over prose" principle.
6. **The Brownfield Reality** — Most software is legacy. You can't dark-factory a 15-year monolith. The migration path: L2/L3 acceleration → reverse-engineer specs from code → upgrade CI/CD for AI volume → shift new dev to L4/L5. Map directly to AI-SDLC's Inception "Elevation" step for brownfield.
7. **Org Structures Built for Humans** — Standups, sprints, code review, QA teams — all exist because of human limitations. When AI writes the code, these become friction, not coordination. The bottleneck moves from implementation speed to spec quality.
8. **The Talent Reckoning** — Junior pipeline collapsing (67% drop in US junior dev postings). The bar is rising toward systems thinking, customer intuition, and spec-writing skill. Generalists over specialists. AI-SDLC's emphasis on Intent clarity and domain understanding is the answer.

**Diagram types to add:** A new `levels-maturity` diagram showing L0→L5 progression with AI-SDLC mapping at each level.

**Embedded questions per section** (following existing pattern in lessons.ts).

---

### 1.2 New Lesson: "Operationalizing AI-SDLC — The Leader's Cheat Sheet"

**File:** `src/content/lessons.ts` — add a new `Lesson` entry

**Sections:**
1. **Rosetta Stone** — The mapping table from Agile/Waterfall → AI-SDLC terms. Epic→Intent, Sprint→Bolt, Sprint Planning→Mob Elaboration, Velocity→Business Value Delivered, Scrum Master→Role absorbed, etc. This is the "hand it to your team on Day 1" reference.
2. **5 Mindset Shifts for Leaders** — (a) AI Leads, Humans Steer (Google Maps analogy), (b) Measure Value Not Effort, (c) Design Is Not Optional (DDD baked in), (d) Roles Converge Not Expand, (e) Iterations in Hours Not Weeks.
3. **3 Phases at a Glance** — Inception (2–4 hrs, Mob Elaboration), Construction (hours–days per Bolt, Mob Construction), Operations (continuous, AI-Monitored Ops). Include the Brown-Field Elevation step.
4. **RACI Matrix** — Only 3 actors: AI Agent, Developer, Product Owner. AI is never Accountable. Show the full RACI for all activities (Intent Clarification through Ops Monitoring).
5. **Metrics That Replace the Old** — Intent Completion Rate, Bolt Cycle Time, Human Override Rate, Gate Pass Rate, Units in Parallel, Deploy Frequency, AI Context Reuse, Remediation Time. Include formulas, thresholds (green/amber/red), and what action to take when trending off-target.
6. **Sample Leader Dashboard** — Weekly snapshot view with active intents, units in flight, bolts completed, cycle time, gate pass rate, override rate, deploy frequency, remediation time. Plus a unit-level status board.
7. **4-Week Adoption Playbook** — Week 1 Orient, Week 2 First Mob Elaboration, Week 3 First Bolts, Week 4 Reflect & Scale. Include the Day-1 Readiness Checklist.
8. **Anti-Patterns & Pitfalls** — Retrofitting AI into existing Scrum, rubber-stamping AI output, skipping domain design, applying AI-SDLC to simple CRUD apps, keeping all legacy ceremonies, ignoring brownfield context elevation.

---

### 1.3 Glossary Additions

**File:** `src/content/glossary.ts` — add new terms:

| Term | Definition |
|------|-----------|
| Dark Factory | A software development environment where AI agents autonomously build, test, and ship software. Humans write specs and evaluate outcomes only. |
| Scenario (Holdout) | A behavioral specification stored outside the codebase that evaluates whether AI-built software works correctly, preventing the AI from "teaching to the test." |
| Digital Twin | A simulated clone of external services (APIs, databases, auth providers) that AI agents develop against for safe integration testing without touching production. |
| J-Curve | The initial productivity dip when adopting AI tools before workflows are redesigned around them. Most orgs are stuck at the bottom. |
| Elevation (Brownfield) | The AI-SDLC step where AI reverse-engineers an existing codebase into static models (components + relationships) and dynamic models (interaction flows) before making changes. |
| Human Override Rate | The percentage of AI outputs modified by humans during validation. A key calibration metric — too high means AI needs richer context, too low means rubber-stamping. |
| Rosetta Stone | A mapping table that translates familiar Agile/Waterfall concepts to their AI-SDLC equivalents, used to orient teams during transition. |
| Spec Quality | The precision and completeness of a specification. In AI-SDLC, spec quality is the primary bottleneck — machines build what you describe, including the ambiguities. |
| Levels of AI Coding | A maturity framework (L0–L5) describing how deeply AI is integrated into software development, from autocomplete to fully autonomous dark factories. |

---

### 1.4 Quiz Additions

**File:** `src/content/quiz.ts` — add 8–10 new questions covering:

- What level of AI coding does "directing AI and reviewing PRs" correspond to? (L3)
- What is the key difference between Scenarios and Tests in a dark factory? (Scenarios are external holdouts the AI can't see)
- What does the J-curve describe? (Initial productivity dip before workflow redesign)
- In the RACI matrix, who is never the Accountable party? (AI Agent)
- What metric replaces velocity in AI-SDLC? (Business Value Delivered / Intent Completion Rate)
- What is the Human Override Rate red flag when it drops below 5%? (Rubber-stamping)
- What is the first step in the brownfield migration path? (Use AI at L2/L3 to accelerate current work)
- What does "Elevation" mean in brownfield AI-SDLC? (AI reverse-engineers codebase into models)

---

### 1.5 Gatekeeper Scenario Additions

**File:** `src/content/gates.ts` — add 3–4 new scenarios:

1. **Rubber-Stamping Detection** — AI generates a domain model. The developer approves in 30 seconds without reading it. Override Rate is 2%. Should the gate pass? (Reject — override rate too low, likely rubber-stamping)
2. **Brownfield Without Elevation** — Team wants to skip the Elevation step on a legacy monolith to save time. AI starts modifying code without understanding the existing architecture. Should this proceed? (Reject — Elevation is mandatory for brownfield)
3. **Spec Ambiguity at L4** — A spec says "handle edge cases gracefully." AI implements by swallowing all exceptions silently. Tests pass. Should the gate pass? (Reject — spec was ambiguous, AI filled gaps with guesses not customer-centric decisions)

---

## Phase 2 — Transition & Comparison Content Upgrades

### 2.1 Rosetta Stone Table on Transition Page

**File:** `src/content/transition.ts` — add a new `RosettaStoneMapping` interface and data array

Add the full Rosetta Stone mapping from the cheat sheet as a new tab on the Transition page:

| Agile / Waterfall | AI-SDLC Term | What Changed & Why |
|---|---|---|
| Epic / Project Brief | Intent | AI decomposes it — you don't manually break it down |
| Sprint (2–6 weeks) | Bolt (hours–days) | Same iteration concept, radically compressed |
| Sprint Planning | Mob Elaboration | AI proposes decomposition; team challenges in real-time |
| Sprint Execution | Mob Construction | AI generates → humans validate at each gate |
| Daily Standup | Not required | Async status built into the flow |
| Retrospective | Continuous (embedded) | Each validation point is a mini-retro |
| Velocity (story points) | Business Value Delivered | Effort measurement loses meaning when AI flattens it |
| Scrum Master | Role absorbed | Process facilitation handled by AI orchestration |
| Separate design phase | Integrated (DDD baked in) | DDD is part of the method core, not optional |

This becomes a new "Rosetta Stone" tab on the existing Transition page (alongside Roles, Processes, Artifacts, Phases, Checklist).

### 2.2 RACI Matrix Tab on Transition Page

Add a "RACI" tab to the Transition page showing the 3-actor model (AI Agent, Developer, Product Owner) with the full activity matrix from the cheat sheet.

### 2.3 Anti-Patterns Section

Add an "Anti-Patterns" tab to the Transition page with the 6 anti-patterns from the cheat sheet, each with a problem description and "Instead" recommendation.

### 2.4 Comparison Metrics Table Update

**File:** `src/content/comparison.ts` — update `COMPARISON_METRICS`

Add or refine metrics to include concepts from the new sources:

| Metric | Waterfall | Agile | AI-SDLC |
|--------|-----------|-------|---------|
| Coordination Overhead | High (many roles, handoffs) | Medium (ceremonies, Scrum Master) | Minimal (3 actors, AI orchestrates) |
| Spec Quality Dependency | Low (humans fill gaps) | Low (conversations fill gaps) | Critical (machines build what you describe) |
| Brownfield Readiness | Manual analysis | Sprint-based discovery | AI Elevation (reverse-engineer into models) |
| Maturity Ceiling | N/A | L2–L3 (human-centric) | L4–L5 (spec-driven, autonomous) |

---

## Phase 3 — Simulation Engine Upgrades (Race Simulation)

### 3.1 Make the Race More Realistic and Convincing

The current simulation is good but can be strengthened with insights from the transcript and cheat sheet. Key improvements:

#### 3.1.1 Add J-Curve Realism to Agile Track

**File:** `src/content/simulation-tasks.ts` — modify `AGILE_TASKS`

Add a new task type or modify existing tasks to show what happens when Agile teams bolt on AI tools without redesigning workflows:

- Add a "Context Switching" task (type: `wait`) between AI suggestion evaluation and manual coding in Sprint 2
- Add a "Review AI Output" task (type: `review`) that's longer than expected — showing the "Copilot makes writing code cheaper but owning it more expensive" dynamic
- Add a "Scope Creep Discussion" ceremony task in Sprint 3

This makes Agile's track feel more realistic — not just "slower than AI-SDLC" but showing WHY it's slower (ceremony overhead, review costs, context switching).

#### 3.1.2 Add Scenario Validation to AI-SDLC Track

**File:** `src/content/simulation-tasks.ts` — modify `AIDLC_TASKS`

Add explicit "Scenario Validation" tasks (distinct from "Tests Pass") to show the holdout-set concept:

- After "AI: Generate Code" and "AI: Generate Tests", add "External Scenario Check" (type: `validation`, team: `Scenario Runner`) — this is the holdout evaluation the AI can't see
- This visually distinguishes AI-SDLC's quality mechanism from traditional testing

#### 3.1.3 Add Handoff Friction to Waterfall Track

**File:** `src/content/simulation-tasks.ts` — modify `WATERFALL_TASKS`

Make handoffs more painful and visible:

- Add "Knowledge Transfer Meeting" tasks between phases (type: `ceremony`)
- Add "Waiting for Environment" task before Implementation (type: `wait`)
- Add "Requirements Change Request" task during Testing phase (type: `wait`) — showing the late-discovery problem

#### 3.1.4 New Task Type: `scenario`

**File:** `src/types/simulation.ts` — add `'scenario'` to `TaskType`

Add a new task type for scenario validation that gets its own visual styling (distinct from `validation` which is human review). This makes the holdout-set concept visually clear in the race.

**File:** `src/content/simulation-tasks.ts` — add styling for `scenario` in `WAIT_STYLES`

### 3.2 Project Simulator Improvements

**File:** `src/content/comparison.ts`

#### 3.2.1 Add "AI Maturity Level" to Project Scenarios

Add a new field to `ProjectScenario`:
```typescript
aiMaturityLevel: 0 | 1 | 2 | 3 | 4 | 5;
```

This lets users see how the same project plays out at different maturity levels. At L1–L2, AI-SDLC advantages are modest. At L4–L5, they're dramatic.

#### 3.2.2 Add New Scenarios

Add 2 new project scenarios:

1. **Dark Factory Greenfield** — Small team (3 people), high complexity, stable requirements. Shows L5 autonomous development. AI-SDLC completes in days, not weeks.
2. **Legacy Monolith with AI Bolt-On** — Large team (15 people), high complexity, evolving requirements. Shows the J-curve: Agile+AI is actually slower than pure Agile initially because of workflow disruption.

#### 3.2.3 Improve `simulateProject` Function

Make the simulation model more nuanced:

- Factor in `aiMaturityLevel` — lower levels get less AI-SDLC benefit
- Add a "workflow redesign" boolean — if false, AI-SDLC benefits are reduced (J-curve)
- Add "spec quality" factor — poor specs increase AI-SDLC rework time
- Show Human Override Rate as an output metric
- Show Bolt Cycle Time as an output metric

### 3.3 Simulation Log Improvements

**File:** `src/components/simulation/LogWindow.tsx`

Add richer log messages that reference real concepts:

- Waterfall: "⏳ Waiting for sign-off from 3 stakeholders..." / "📋 Requirements changed — restarting design phase"
- Agile: "🔄 Sprint planning ceremony (2 hours)..." / "👀 Reviewing AI-generated code — developer spent 45 min evaluating suggestions"
- AI-SDLC: "🤖 AI generating domain model from spec..." / "🎯 External scenario validation (holdout set)..." / "✅ Human validated — Gate Pass on first review"

---

## Phase 4 — New Interactive Features

### 4.1 AI Maturity Level Self-Assessment

**New page:** `src/app/practice/maturity/page.tsx`

A short interactive quiz (5–7 questions) that tells the user what level (L0–L5) their team currently operates at, with specific recommendations for leveling up. Questions like:

- "Who writes the code on your team?" → Human (L0–L2) / AI with human review (L3) / AI autonomously (L4–L5)
- "How do you validate AI output?" → Read every line (L2) / Review at PR level (L3) / Check outcomes only (L4) / Automated scenarios (L5)
- "Do you have external holdout scenarios?" → No (L0–L3) / Yes (L4–L5)

Output: Your team is at Level X. Here's what to do next.

### 4.2 Operationalization Metrics Calculator

**New page or section on existing page:** Interactive calculator where leaders input their current metrics (sprint velocity, deployment frequency, defect rate) and see projected AI-SDLC equivalents with the new metric definitions (Intent Completion Rate, Bolt Cycle Time, Human Override Rate, etc.).

### 4.3 Leader Dashboard Preview

**New component on Comparison or Transition page:** A mock "Weekly AI-SDLC Dashboard" showing the sample data from the cheat sheet — active intents, units in flight, bolts completed, cycle time, gate pass rate, override rate, deploy frequency, remediation time. Interactive — users can click metrics to see definitions and formulas.

---

## Phase 5 — Sources & Video Page Updates

### 5.1 Sources Page

**File:** `src/app/sources/page.tsx`

Add the AI-DLC Operationalization Cheat Sheet as a source:
```
{
  title: 'AI-DLC Operationalization Cheat Sheet for B2B Leaders',
  description: 'Jonas Directory of AI Strategy — Rosetta Stone, RACI, metrics, adoption playbook',
  url: 'https://claude.ai/public/artifacts/3c048375-8f70-4e43-a3e4-ab5aaa9ec876',
  type: 'reference',
}
```

### 5.2 Video Lessons Page

The "5 Levels of AI Coding" video is already added (previous task). No further video changes needed.

---

## Implementation Priority & Sequencing

Following AI-SDLC methodology, this plan decomposes into Units:

### Unit 1 — Content Foundation (Highest Impact, Lowest Risk)
- 1.3 Glossary additions
- 1.4 Quiz additions
- 1.5 Gatekeeper scenarios
- 2.1 Rosetta Stone tab
- 2.2 RACI tab
- 2.3 Anti-Patterns tab
- 5.1 Sources update

### Unit 2 — New Lessons (High Impact, Medium Effort)
- 1.1 "5 Levels" lesson
- 1.2 "Operationalization" lesson

### Unit 3 — Simulation Engine Upgrades (High Impact, Higher Effort)
- 3.1.1 J-Curve realism in Agile track
- 3.1.2 Scenario validation in AI-SDLC track
- 3.1.3 Handoff friction in Waterfall track
- 3.1.4 New `scenario` task type
- 3.3 Log message improvements

### Unit 4 — Project Simulator Improvements (Medium Impact, Medium Effort)
- 3.2.1 AI Maturity Level field
- 3.2.2 New scenarios
- 3.2.3 Improved `simulateProject` function
- 2.4 Comparison metrics update

### Unit 5 — New Interactive Features (High Impact, Highest Effort)
- 4.1 Maturity self-assessment
- 4.2 Metrics calculator
- 4.3 Leader dashboard preview

---

## Success Criteria

- All new content references real sources (transcript quotes, cheat sheet data)
- Simulation race visually demonstrates WHY AI-SDLC wins (not just that it's faster)
- J-curve concept is visible — users understand that bolting AI onto old workflows makes things worse
- Scenarios vs Tests distinction is clear and interactive
- Rosetta Stone table is the single best "aha moment" for Agile teams visiting the site
- Human Override Rate concept is threaded through quiz, gatekeeper, glossary, and metrics
- No content feels like marketing — everything is grounded in the methodology
