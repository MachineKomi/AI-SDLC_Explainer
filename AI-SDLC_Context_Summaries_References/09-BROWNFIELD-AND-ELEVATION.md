# 09 — Brownfield Projects & Elevation

Most software isn't greenfield. It's a 15-year monolith with tribal knowledge buried in Slack threads and the heads of engineers who left two years ago. AI-SDLC has a mandatory step for these systems that comes before Inception: Elevation.

---

## The Brownfield Reality

The industry conversation about AI-driven development is dominated by greenfield demos — "watch me build a SaaS app from scratch in 20 minutes." But enterprise reality is different:

- Most software is legacy — existing systems with years of accumulated decisions
- The specification doesn't exist — nobody wrote down what the system actually does
- Tribal knowledge is the real documentation — conventions, workarounds, "don't touch that" files
- Implicit contracts are everywhere — services depend on each other in ways no diagram captures

You can't dark-factory a legacy system. You can't hand an AI agent a 15-year codebase and say "add this feature" without first giving it the context it needs to make safe changes. AI will make confident, wrong changes to code it doesn't understand.

This is why Elevation exists.

---

## Phase 0: Elevation

Elevation is the mandatory pre-Inception step for brownfield projects. The name is deliberate — you're elevating the implicit knowledge trapped in code into explicit, reviewable artifacts that both humans and AI can reason about.

The sequence:

```
Brownfield Project
  → Phase 0: Elevation (AI reverse-engineers, team validates)
    → Elevation Gate (models reviewed and approved)
      → Phase A: Inception (now with context)
        → Phase B: Construction
          → Phase C: Operations
```

Skip Elevation and AI will treat every file as independent. It won't know that changing the User model breaks the Payment service's serialization. It won't know that the "utils" folder is imported by 47 modules. It won't know about the 30-second timeout on the refund path that nobody documented.

The 30 minutes spent on Elevation saves days of debugging wrong assumptions.

---

## Static Models: Components & Relationships

The first output of Elevation is a static model — a map of what exists and how it connects.

AI analyzes the codebase and produces:

- Component inventory — every service, module, library
- Dependency graph — who calls whom, data flow direction
- Interface contracts — APIs, message formats, shared state
- Technology map — frameworks, databases, external services
- Ownership boundaries — which team owns what (if detectable)

This is not documentation for documentation's sake. It's the context that AI needs to make safe changes. Without a static model, AI treats every file as independent. It doesn't know that changing one module cascades through 47 dependents.

The static model is the AI's map of the territory. You wouldn't navigate a city without a map. Don't let AI navigate your codebase without one.

### The 80/20 Rule of Static Models

AI will get approximately 80% of the static model right. The 20% it misses is where the tribal knowledge lives — the undocumented conventions, the implicit contracts between services, the "we always deploy this before that" operational knowledge. The team's job is to validate the model and fill in that critical 20%.

---

## Dynamic Models: Interaction Flows

The second output is a dynamic model — how the system behaves at runtime.

AI traces through the codebase and produces:

- Request flows — HTTP request → handler → service → DB → response
- Event chains — event published → subscribers → side effects
- State machines — user lifecycle, order status, payment flow
- Error paths — what happens when things fail
- Integration touchpoints — external API calls, webhooks, timeouts

Dynamic models capture behavior, not just structure. The static model tells you the Payment service exists. The dynamic model tells you it's called synchronously during checkout and asynchronously during refunds — and that the refund path has a 30-second timeout that nobody documented.

These models become the foundation for:
- Scenario design — you can't write holdout scenarios without understanding actual behavior
- Impact analysis — "if I change X, what flows are affected?"
- Test strategy — which paths are critical, which are edge cases

The validation step is crucial. AI will infer flows from code, but it can't know about the manual processes, the workarounds, or the "we restart the service every Tuesday" operational knowledge.

---

## The Elevation Gate

Elevation has its own gate before Inception can begin. This is a hard stop — no exceptions.

### Elevation Gate Checklist

| Check | Description |
|-------|-------------|
| □ Static model reviewed | Components and relationships are accurate |
| □ Dynamic model reviewed | Critical flows are correct |
| □ Tribal knowledge captured | Undocumented conventions, implicit contracts, operational workarounds |
| □ Risk areas identified | Fragile code, high-coupling zones, areas with no test coverage |
| □ Boundary decisions made | What's in scope for change, what's off-limits |

Only after the Elevation Gate passes do you proceed to Inception. Now when AI proposes a plan during Mob Elaboration, it has context. It knows the territory.

### Elevation Artifacts

The Elevation outputs persist in the repo as living documents:

```
aidlc-docs/elevation/
  static-model.md          # Component inventory, dependency graph, interfaces
  dynamic-model.md         # Request flows, event chains, state machines
  risk-assessment.md       # Fragile areas, coupling hotspots, coverage gaps
  boundary-decisions.md    # In-scope vs. off-limits, change constraints
```

These are not one-time artifacts. As the codebase evolves, the models are updated. They're the AI's ongoing understanding of the system.

---

## Why You Can't Dark-Factory a Legacy System

The L5 "dark factory" model (specs in, software out, no human touches code) works for greenfield because the AI is building from a clean specification. For legacy systems, the specification doesn't exist. The code IS the specification — and it's full of implicit decisions, undocumented constraints, and accumulated workarounds.

To reach dark-factory capability on a legacy system, you would need to:

1. Reverse-engineer the complete specification from code (Elevation)
2. Build scenario suites that capture all existing behavior (holdout sets)
3. Create digital twins of all external dependencies
4. Validate that the AI's model of the system matches reality

This is a multi-month to multi-year journey for most organizations. The brownfield migration path (covered in document 07) is the practical roadmap:

- Step 1: Use AI at L2/L3 to accelerate current work within existing processes
- Step 2: Reverse-engineer specs from code (Elevation at scale)
- Step 3: Upgrade CI/CD for AI-volume changes (10-100x more deployments)
- Step 4: Shift new development to L4/L5 while maintaining legacy in parallel

The honest truth: most enterprise teams will operate at L3-L4 on brownfield systems for the foreseeable future. That's not a failure — it's the realistic path. The value of understanding L5 is that it changes how you think about L3 and L4.

---

## Tribal Knowledge Capture

The most valuable and most difficult part of Elevation is capturing tribal knowledge — the information that exists only in people's heads.

### What Tribal Knowledge Looks Like

- "Don't deploy on Fridays because the batch job runs at midnight"
- "The `legacy_adapter` module is called by the mobile app even though nothing in the codebase references it directly"
- "We always restart the cache service after deploying the auth module"
- "The `MAX_RETRIES` constant is set to 3 but it should really be 5 — we just never changed it because it might break the billing integration"
- "That endpoint returns XML for one specific client because they never migrated"

AI cannot discover this knowledge from code analysis alone. It requires human input during the Elevation review. The static and dynamic models serve as prompts — the team reviews them and says "yes, but also..." for every implicit contract and undocumented convention.

### Capturing It

Tribal knowledge goes into the Elevation artifacts as annotations:
- Risk flags on fragile components
- Constraint notes on boundary decisions
- Operational notes on dynamic model flows
- "Here be dragons" markers on areas with no test coverage

Once captured in artifacts, tribal knowledge becomes durable context. It survives team turnover, tool changes, and the inevitable "the person who knew that left six months ago."

---

## Elevation in Practice: The Anti-Pattern

Anti-Pattern #6 from the adoption guide: Ignoring Brownfield Context Elevation.

Teams that skip Elevation and jump straight to "let AI write code" on a legacy system are the ones who end up with the horror stories. The AI makes changes that look correct in isolation but break implicit contracts and hidden dependencies.

The symptoms:
- AI refactors a module without knowing 47 other modules import it
- AI changes an API response format without knowing a mobile app depends on the old format
- AI removes "dead code" that's actually called via reflection or dynamic dispatch
- AI optimizes a database query without knowing the index was deliberately structured for a different access pattern

The fix is always the same: go back and do Elevation. The question is whether you do it proactively (30 minutes) or reactively (days of debugging).

---

## Suggested Talking Points

- Most software is brownfield — the greenfield demos don't reflect enterprise reality
- Elevation is Phase 0: mandatory before Inception for any existing system
- Static models map structure; dynamic models map behavior — you need both
- AI gets 80% of the model right; the critical 20% is tribal knowledge that only humans can provide
- You can't dark-factory a legacy system because the specification doesn't exist — the code IS the spec
- The Elevation Gate is a hard stop — no exceptions, no shortcuts
- Skipping Elevation is the #1 source of "AI horror stories" on legacy systems
- Tribal knowledge captured in artifacts survives team turnover — this alone justifies the investment
