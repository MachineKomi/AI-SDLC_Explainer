# 05 — Operationalizing AI-SDLC

This document covers the practical mechanics of running AI-SDLC in a real organization: the Rosetta Stone for translating from Agile, the RACI matrix, metrics and KPIs, the leader dashboard, and the 4-week adoption playbook.

---

## The Rosetta Stone: Agile/Waterfall → AI-SDLC

Every AI-SDLC concept maps to something teams already know. This table orients a team in a single meeting.

| Agile / Waterfall | AI-SDLC Term | What Changed & Why |
|---|---|---|
| Epic / Project Brief | **Intent** | A high-level goal statement. AI decomposes it — you don't manually break it down anymore. |
| Epic / Subdomain | **Unit** | A cohesive, independently deployable work block. Think bounded context (DDD) — loosely coupled, team-assignable. |
| Sprint (2–6 weeks) | **Bolt** (hours–days) | Same iteration concept, radically compressed. AI handles planning; you validate. |
| User Story | **User Story** (retained) | Kept as-is — the contract between human intent and AI execution. AI drafts them; you refine. |
| Sprint Planning | **Mob Elaboration** | One-room, shared-screen session. AI proposes decomposition; the full team challenges and refines in real-time. |
| Sprint Execution | **Mob Construction** | Collocated teams build Bolts. AI generates domain models → logical design → code → tests. Devs validate at each gate. |
| Daily Standup | **Not required** | With hour/day cycles and real-time AI context, async status is built into the flow via artifacts. |
| Retrospective | **Continuous (embedded)** | Each human validation point is a mini-retro. Feedback is continuous, not batched. |
| Velocity (story points) | **Business Value Delivered** | When AI flattens effort differences, measuring effort is less meaningful. Measure outcomes. |
| Scrum Master | **Role absorbed** | Process facilitation is handled by AI orchestration. Impediment removal shifts to real-time AI + dev collaboration. |
| Separate design phase | **Integrated (DDD baked in)** | Domain-Driven Design is part of the method core, not an optional add-on. AI applies it during decomposition. |
| QA Phase / Sprint Testing | **Gate Evidence + Scenarios** | External holdout scenarios replace traditional QA passes. |
| Release Train | **Continuous (per-bolt deploy)** | Each Bolt can deploy independently when its gate passes. |

---

## The 5 Mindset Shifts for Leaders

These are prerequisites for successful adoption. If leadership doesn't internalize them, adoption stalls at L2.

### 1. AI Leads, Humans Steer
The Google Maps analogy: You set the destination (Intent). AI generates turn-by-turn directions. Your team maintains oversight and overrides when needed. This isn't less control — it's higher-leverage control.

### 2. Measure Value, Not Effort
When AI flattens the effort curve between simple and complex tasks, story points lose meaning. Track Intent Completion Rate, deployment frequency, and customer-facing outcomes instead.

### 3. Design Is Not Optional
DDD is the default backbone. AI applies it automatically, and developers validate the output. Quality is structural, not aspirational.

### 4. Roles Converge, Not Expand
Don't add an "AI Team." Roles collapse: Dev + Ops + QA → Product Engineer. The RACI has 3 actors, not 8. Fewer handoffs, faster flow.

### 5. Iterations in Hours, Not Weeks
Bolts replace Sprints. This doesn't mean chaos — it means tighter feedback loops. Each Bolt has clear scope, AI-driven execution, and human validation gates. The cadence is 10x faster.

---

## Metrics That Replace the Old

### Primary Metrics

| Metric | Formula | Cadence | Green | Amber | Red |
|---|---|---|---|---|---|
| Intent Completion Rate | Intents in prod ÷ total | Monthly | ≥ 80% | 50–79% | < 50% |
| Bolt Cycle Time | End − start (median) | Weekly | ≤ 4 hrs | 4–8 hrs | > 8 hrs |
| Human Override Rate | Modified ÷ reviewed | Weekly | 10–25% | 5–10% or 25–50% | < 5% or > 50% |
| Gate Pass Rate | 1st-pass gates ÷ total | Weekly | ≥ 85% | 70–84% | < 70% |
| Units in Parallel | Snapshot count | Weekly | 3–8 per team | 1–2 or > 10 | — |
| Deploy Frequency | Prod deploys / week | Weekly | ≥ 5/wk | 2–4/wk | < 2/wk |
| AI Context Reuse | Linked ÷ total artifacts | Bi-weekly | ≥ 90% | 70–89% | < 70% |
| Remediation Time | Approval − detection (P90) | Weekly | ≤ 15 min | 15–60 min | > 60 min |

### The Most Important New Metric: Human Override Rate

This is the strategic calibration signal:
- **10–25%** = Healthy. Humans are reviewing and making meaningful corrections.
- **> 25%** = AI needs richer context. Specs or domain models need enrichment.
- **< 5%** = Red flag. Likely rubber-stamping — humans aren't actually reviewing. Creates "quick-cement" code that's fast to generate but rigid and hard to maintain.

The paradox: a rate that is too LOW is just as concerning as too HIGH.

### Key Anti-Metric
"Lines of code generated" — irrelevant and encourages bloat.

### Tracking Flow
```
Intent Stated → Units Defined → Bolts Planned → Gates Passed → Deployed → Value Measured
```

---

## Sample Leader Dashboard

```
WEEKLY AI-SDLC SNAPSHOT — "Product Recommendation Engine"
═══════════════════════════════════════════════════════════

Active Intents:        3    (1 greenfield, 2 brownfield)
Units in Flight:       7    (5 construction, 2 ops)
Bolts Completed:      12    (this week, avg 2.4 hrs)
Bolt Cycle Time:     2.4h   ↓ from 3.1h last week
Gate Pass Rate:       87%   AI accepted first try
Human Override Rate:  22%   ↓ from 31% (improving)
Deploy Frequency:    8/wk   Up from 1/sprint
Remediation Time:    14 min  Detection → approved fix

UNIT STATUS BOARD
─────────────────────────────────────────────────────
Unit                    Phase          Bolt #  Status
User Data Collection    Construction   3/3     ✓ All Passed
Recommendation Algo     Construction   2/4     ⚠ Domain rework
API Integration         Inception      —       Mob Elab. scheduled
Privacy & Compliance    Operations     2/2     ✓ Deployed
```

This replaces the Jira board and burndown chart. It answers: Are we delivering value? Are humans engaged? Is quality holding?

---

## 4-Week Adoption Playbook

### Week 1 — Orient (Learn the Language, Pick the Pilot)
- Share the Rosetta Stone table with the team
- Select one small, greenfield Intent
- Set up AI tooling and configure workspace
- Goal: team can explain Intent → Unit → Bolt without a reference sheet

**Day-1 Readiness Checklist:**
- [ ] AI coding assistant configured and accessible to all developers
- [ ] Pilot Intent identified (greenfield, bounded scope, non-critical)
- [ ] Product Owner briefed on "AI proposes, you approve" dynamic
- [ ] Rosetta Stone table distributed to team
- [ ] Mob Elaboration room booked (3 hours, shared screen)
- [ ] Folder structure created (aidlc-docs/)
- [ ] Metrics baseline captured (current velocity, deployment frequency, defect rate)

### Week 2 — First Mob Elaboration (Run Inception on the Pilot Intent)
- Book a 3-hour room with PO, devs, and QA
- Run Mob Elaboration: let AI propose stories, NFRs, and Units
- Team challenges and refines
- Outcome: validated Units with Bolt plans

### Week 3 — First Bolts (Execute 2–3 Bolts in Mob Construction)
- Collocate the team
- Let AI generate domain models → code → tests
- Track Bolt Cycle Time and Human Override Rate from Day 1
- Expect 4–6 hours per Bolt initially
- Resist the urge to add ceremonies back

### Week 4 — Reflect & Scale (Evaluate, Calibrate, Expand)
- Review metrics from Week 3
- Identify weakest AI context areas
- Decision point: expand to a second workstream or iterate
- Begin standing down parallel Scrum ceremonies for the AI-SDLC workstream
- Share learnings with broader org

---

## Suggested Talking Points

- The Rosetta Stone is the Day-1 handout — most of the "new" is actually familiar, just faster
- Human Override Rate is the single most important new metric — it calibrates the entire system
- The 4-week playbook is designed to layer onto one workstream first, not replace everything at once
- Metrics shift from effort-based (velocity) to outcome-based (value delivered)
- The leader dashboard replaces Jira boards and burndown charts
- The most common adoption failure: adding back standups and code review out of habit (the J-curve discomfort)
