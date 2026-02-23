# 03 — The 10 Core Principles of AI-SDLC

These principles are the "non-negotiables" that make AI-SDLC AI-native rather than AI-assisted. They dictate the methodology's workflow, roles, and artifacts.

---

## 1. Reimagine, Don't Retrofit

Redesign workflows from first principles for AI speed (hours/days), rather than patching AI into slow legacy rituals (weeks). Traditional Agile/Scrum assumes long cycles. AI enables cycles in hours ("Bolts"). Estimation rituals like story points become less relevant when AI flattens the effort curve.

**Why it matters:** Retrofitting AI into Scrum reinforces inefficiencies. AI-native flows are fundamentally faster and more fluid. As the Operationalization Cheat Sheet states: "Adding an AI tool to your existing sprint workflow misses the point."

---

## 2. Reverse the Conversation Direction

AI initiates plans and proposals; humans approve. This shifts the human role from "doer" to "approver/designer."

**The Google Maps Analogy:** You set the destination (Intent). AI generates turn-by-turn directions. Your team maintains oversight and overrides when needed. This isn't less control — it's higher-leverage control.

**Old way:** Human writes specs → Human writes code
**New way:** Human states intent → AI proposes plan, options, trade-offs → Human validates and approves

---

## 3. Integrate Design Techniques (DDD Is Core, Not Optional)

Domain-Driven Design is baked into the method, not an optional add-on. AI applies DDD during decomposition, producing bounded contexts for parallel delivery. Design artifacts (domain models) are first-class.

**Why it matters:** Poor design costs the software industry trillions annually. AI without domain context produces a "Big Ball of Mud" — code that works in isolation but creates unmaintainable coupling. DDD gives AI the structure it needs for clean architecture. Skipping domain design is Anti-Pattern #3.

---

## 4. Align with AI Capability (Realistic, Not Utopian)

Optimistic about AI's potential, realistic about today's limitations. AI is not yet fully autonomous for complex systems. Humans must retain responsibility. "AI-Driven" ≠ "AI-Autopilot." The methodology designs for human-in-the-loop at critical decision points.

**Key takeaway:** Trust but verify. Use AI for heavy lifting, humans for judgment.

---

## 5. Cater to Complex Systems

AI-SDLC is designed for complexity, not toy apps. It focuses on trade-offs, architecture, and integration. Simple CRUD apps or marketing sites don't need this rigor — use low-code/no-code for those. Reserve AI-SDLC for architectural complexity, scalability, or regulatory constraints.

---

## 6. User Stories as Contract (Human Symbiosis)

Retain artifacts that enhance human-AI symbiosis. User Stories remain the "contract" between human intent and AI execution. Risk Registers constrain AI creativity. Keep what works for human validation — prose requirements (Stories) are the bridge between human thinking and AI execution.

---

## 7. Transition via Familiarity

Evolution, not revolution. The method should be learnable in a day. Rename "Sprints" to "Bolts" (hours/days). Keep familiar concepts (Backlog, Review). Don't alienate experienced engineers. Low barrier to entry, high ceiling for mastery.

---

## 8. Streamline Responsibilities (Converge Roles)

Collapse silos, converge roles. AI handles undifferentiated heavy lifting. Roles collapse: Dev + Ops + QA → "Product Engineer." Product Owner and Developer remain essential. Minimize handoffs. Fewer specialists, more empowered generalists.

**Outcome:** Faster flow, higher ownership, less "waiting for ticket."

---

## 9. Minimize Stages, Maximize Flow

Prune waste with "loss functions." Validation points act as loss functions that catch errors early to prevent compounding. Reduce rigidity. Flow is paramount. Rigid workflows create "quick wet cement" — fast to pour, impossible to change once set.

---

## 10. No Hard-Wired Workflows

Context determines workflow. No single "One True Way." AI proposes a Level 1 Plan based on Intent. Greenfield? Brownfield? Bug fix? The workflow adapts to the problem. The plan IS the workflow.

**Adaptive Depth:** Execute only stages that add value for the current request, and generate the level of detail needed — not a fixed ceremony.

---

## Additional Foundational Principles (from Best Practices Synthesis)

These complement the 10 method principles with operational guidance:

### Human Accountability Is the Loss Function
Humans own decisions and outcomes; AI proposes and executes within bounds. This is the "plan-then-validate-then-implement" loop. AI is never the Accountable party in the RACI matrix.

### Plan-First, Stage-by-Stage
Every meaningful step starts with an explicit plan (with checkpoints) and an approval gate before execution.

### Small, Coherent Units Over Big Batches
Decompose into units that can be built and verified independently (bounded contexts/components). AWS describes "units" and time-boxed "bolts" to keep delivery incremental.

### Persisted Artifacts Are First-Class
AI-SDLC relies on durable artifacts stored in-repo, not in chat history. This provides durable context, reviewability, and an auditable trail.

### Proof Over Prose
"Done" requires objective evidence: tests passing, checks green, runtime behavior validated. Claims without evidence are not accepted.

### Tooling Is for Truth, Not Vibes
Use authoritative retrieval (docs/pricing) and runtime inspection (browser/devtools) to reduce hallucinations and mis-implementation.

### Safety Constraints Are Explicit
Define what data can be shared with tools/models, what tools are allowed, and where automation must stop for approval.

### Continuous Prompt/Rule Improvement
Treat prompts, rules, and guardrails as code: version, review, and tune them based on failure modes.

---

## Suggested Talking Points

- The 10 principles make AI-SDLC "AI-native" rather than "AI-assisted"
- Principle 1 (Reimagine) is the most violated — most teams bolt AI onto existing Scrum
- Principle 2 (Reverse Conversation) is the biggest mindset shift — AI proposes, humans approve
- Principle 3 (DDD) prevents the "Big Ball of Mud" that AI produces without structure
- "Proof over prose" is the quality mechanism — evidence, not claims
- "Human accountability is the loss function" — AI is never Accountable, only Responsible
