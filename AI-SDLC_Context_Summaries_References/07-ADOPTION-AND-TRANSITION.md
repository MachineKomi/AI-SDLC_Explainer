# 07 — Adoption, Transition & Anti-Patterns

Adopting AI-SDLC is a cultural refactor, not a tool installation. Trust rises through repeated, visible proof — not policy. This document covers the transition path from Agile/Waterfall, the anti-patterns that kill adoption, and the mindset shifts required.

---

## The Transition Is Not a Tool Problem

The organizations seeing significant (25-30%+) productivity gains with AI are not the ones that installed Copilot, had a one-day seminar, and called it done. They're the ones that went back to the whiteboard and redesigned their entire development workflow around AI capabilities:
- Changing how they write specs
- Changing how they review code
- Changing what they expect from junior vs. senior engineers
- Changing their CI/CD pipelines to catch the new category of errors AI-generated code introduces

End-to-end process transformation. It's politically contentious, expensive, slow, and most companies don't have the stomach for it — which is why most companies are stuck at the bottom of the J-curve.

---

## Workflow Variants

AI-SDLC adapts to different project types:

### Greenfield (Build New)
- Full Inception ceremony: user stories → units → approve before design/coding
- Construction: per-unit design (DDD) → implement → validate
- Operations: deployment plan + validation report
- Maximum design freedom, full AI-SDLC benefit

### Brownfield (Enhance Existing)
- Mandatory "Elevation" front-stage: AI reverse-engineers codebase into models
- Discovery and analysis: architecture, dependencies, integrations, constraints
- Then proceed with Inception using that analysis as context
- Most enterprise software falls here — the path is longer but necessary

### Frontend (UI Work)
- "Preserve existing working behavior" as a primary constraint
- Runtime validation using browser DevTools against a reference system
- Bounded iteration loops per unit with max iterations
- Final completion report with visual evidence

### Bugfix
- Minimal ceremony — focused on root cause analysis and targeted fix
- AI proposes diagnosis, human validates, AI implements fix
- Evidence: regression test added, root cause documented

---

## The Brownfield Migration Path

For most organizations, the path is not "deploy an agent that writes code." It starts with developing a specification for what your existing software really does.

### Step 1: Use AI at L2/L3 to Accelerate Current Work
Don't change the workflow yet. Use AI to write code faster within your existing process. Accept the modest gains. This is where most organizations are now — and where the J-curve productivity dip happens.

### Step 2: Reverse-Engineer Specs from Code
Use AI to document what your system really does. Generate specs directly from the code. Build scenario suites that capture real existing behavior. Create the holdout sets that a future dark factory will need.

### Step 3: Upgrade CI/CD for AI Volume
Redesign your pipeline to handle AI-generated code at volume. Different testing strategies, different review processes, different deployment gates. When AI writes code at L3+, your pipeline sees 10-100x more changes.

### Step 4: Shift New Development to L4/L5
Only after you have specs, scenarios, and pipeline capacity do you move new features to autonomous agent patterns — while maintaining the legacy system in parallel.

**This path takes time.** For some organizations, it's a multi-year transition. For others moving faster, it's multi-month. It depends on the stomach for organizational pain.

---

## Anti-Patterns That Kill Adoption

### 1. Retrofitting AI Into Existing Scrum
Adding an AI tool to your existing sprint workflow misses the point. The conversation direction must reverse: AI proposes, humans validate.

**Instead:** Run AI-SDLC as a parallel workstream for your pilot. Don't hybridize — replace ceremonies on the pilot team.

### 2. Rubber-Stamping AI Output
Developers clicking "approve" without meaningful review creates "quick-cement" — code that's fast to generate but rigid and hard to maintain. Human Override Rate drops below 5%.

**Instead:** Track Override Rate. If it drops below 5%, that's a red flag — likely insufficient scrutiny, not perfect AI.

### 3. Skipping Domain Design
Jumping from Intent to code skips the quality mechanism. AI without domain context produces a Big Ball of Mud. Design adds minutes, not days, to each Bolt.

**Instead:** Enforce Domain Model → Logical Design → Code. This prevents structural debt that compounds exponentially.

### 4. Applying AI-SDLC to Simple Systems
AI-SDLC is for complex systems. Using it for a CRUD app or 3-page marketing site is over-engineering.

**Instead:** Use low-code/no-code for simple systems. Reserve AI-SDLC for architectural complexity, scalability, or regulatory constraints.

### 5. Keeping All Legacy Ceremonies
Running standups, sprint planning, and retros alongside Bolts and Gates creates ceremony fatigue and slows the rapid cadence.

**Instead:** Sunset legacy ceremonies progressively on AI-SDLC workstreams. Mob Elaboration replaces planning. Continuous validation replaces retros.

### 6. Ignoring Brownfield Context Elevation
Letting AI modify legacy code without creating static/dynamic models first leads to fragile, context-blind changes. AI makes confident, wrong changes to code it doesn't understand.

**Instead:** Always run the Elevation step. AI reverse-engineers into component models. Devs validate before any changes begin.

**The meta-pattern:** Every anti-pattern is a form of "bolting AI onto old workflows." The methodology requires structural change, not just tool adoption.

---

## Rituals That Make It Stick

### Mob Elaboration (Inception Ritual)
- **Duration:** 60 minutes (can extend to 2-4 hours for complex Intents)
- **Participants:** Product Owner, AI Facilitator, Subject Matter Experts, AI Agent
- **Flow:** Preparation (15 min) → Structured Q&A (20 min) → Unit Decomposition (20 min) → Approval Gate (5 min)
- **Output:** Validated Units with acceptance criteria, ready for Construction
- **Key principle:** AI proposes the decomposition; the full team challenges and refines in real-time

### Mob Construction (Construction Ritual)
- **Duration:** 60-120 minutes per session
- **Participants:** Developer(s), AI Agent, Product Owner (available for questions)
- **Flow:** Bolt Planning → AI Execution → Evidence Gathering → Gate Validation
- **Output:** Tested, deployable code with evidence trail
- **Key principle:** AI generates, humans validate at each gate — not line by line

### Bolt Planning (15 min)
- Pick next units, confirm dependencies, confirm gates
- Quick and focused — no multi-hour planning sessions

### Guardrail Retro (15 min)
- Review AI performance during the session
- Identify guardrail improvements
- Update prompts/rules/signs based on failure modes
- Treat prompts and guardrails as code: version, review, tune

---

## Trade-Offs and Risks

| Risk | Mitigation |
|---|---|
| Speed shifts the bottleneck to review/integration | Smaller units, stronger automation, explicit gates |
| Context debt (artifacts not maintained) | Enforce artifact persistence and audits |
| Security and data leakage via MCP/tools | Least-privilege credentials, tool allowlists, sandboxing |
| Over-automation (Ralph-style loops) | Max iterations, small scoped prompts, isolated branches, mandatory PR review |
| Process theater (too many artifacts) | "Exactly enough detail" principle — stage skipping when justified |

---

## Suggested Talking Points

- Adoption is a cultural refactor — new rituals, new role expectations, deliberate practice
- The 4-week playbook layers AI-SDLC onto one workstream first, not a big-bang transformation
- Every anti-pattern is a form of "bolting AI onto old workflows"
- The most common Week 3 failure: teams add back standups and code review out of habit
- Brownfield migration is a multi-step journey, not a switch flip
- Rituals (Mob Elaboration, Mob Construction) are where the methodology comes alive
- Trust rises through repeated, visible proof — not policy mandates
