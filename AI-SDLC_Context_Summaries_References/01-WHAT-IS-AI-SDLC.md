# 01 — What Is AI-SDLC?

## Definition

AI-SDLC (AI-Driven Software Development Lifecycle) is a methodology where AI is a central collaborator in software development — not a bolt-on tool. It redesigns workflows, roles, and iterations for faster decision-making, seamless task execution, and continuous adaptability.

AI-SDLC is **not** "SDLC + copilots." It is a workflow where AI repeatedly:
1. Proposes a plan
2. Collects missing information (asks clarifying questions)
3. Executes after human validation
4. Proves results with evidence
5. Persists artifacts so future work has durable context

This cycle repeats for every SDLC activity — from requirements to deployment.

## The Core Mental Model

```
AI Creates Plan → Asks Questions → Human Validates → AI Implements in Bolts → AI Proves Results
         ↑                                                                              |
         └──────────────────── Artifacts persist context ───────────────────────────────┘
```

Each step produces richer artifacts that become context for the next step. The key insight: **AI proposes, humans decide.** This is the "reverse conversation" — AI initiates, humans approve.

## What Makes It Different

| Traditional SDLC | AI-SDLC |
|---|---|
| Humans write code, AI assists | AI generates, humans validate |
| Plans live in Jira/chat | Plans persist as in-repo artifacts |
| Fixed ceremonies (sprints, standups) | Adaptive flow with gates |
| Effort-based metrics (velocity) | Outcome-based metrics (value delivered) |
| Design is optional/separate | DDD is baked into the method |
| Weeks per iteration | Hours per iteration (Bolts) |

## The "Golden Thread"

A central concept in AI-SDLC is the Golden Thread — the continuous, unbroken path of context and intent from business goal to deployed code. Traditional SDLC breaks this thread at handoffs (requirements → design → code → test). AI-SDLC preserves it through persistent artifacts that carry context across every phase.

Gates are checkpoints that verify the Golden Thread is intact. They require evidence ("proof over prose"), not just claims.

## Origin and Alignment

AI-SDLC is framed by AWS as a three-phase lifecycle (Inception, Construction, Operations). The methodology is tool-agnostic but AWS-aligned, with Amazon Q Rules and MCP servers as one implementation path. The method definition paper was authored by Raja SP at Amazon Web Services.

The methodology synthesizes insights from:
- AWS official AI-DLC methodology and workflows
- Practitioner patterns (Ralph Loop, dark factories)
- Domain-Driven Design (DDD) principles
- DevSecOps and reliability engineering
- Change leadership and adoption research

## Key Data Points for Presentation

- 90% of cloud code at Anthropic was written by Claude Code (self-referential loop)
- 4% of public GitHub commits are authored by Claude Code, projected to exceed 20% by end of 2026
- Claude Code hit $1B ARR just 6 months after launch
- METR study: experienced developers using AI tools were 19% slower (the J-curve)
- StrongDM runs a 3-person dark factory shipping production software with no human code writing or review

## Suggested Talking Points

- AI-SDLC is a workflow redesign, not a tool adoption
- The mental model is "AI proposes, humans decide" — repeated at every stage
- Artifacts are first-class citizens — context persists in-repo, not in chat
- The Golden Thread connects intent to deployment without breaking at handoffs
- This is not theoretical — production teams are operating this way today
