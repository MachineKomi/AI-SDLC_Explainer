# 06 — Roles, Org Structure & the Talent Reckoning

AI-SDLC fundamentally changes who does what, how teams are structured, and what skills matter. This is the hardest part of the transition — not the technology, but the people.

---

## Only 3 Actors in AI-SDLC

The RACI matrix intentionally minimizes roles. If you're coming from Scrum with 5+ defined roles, this is a simplification.

| Actor | Primary Responsibility |
|---|---|
| **AI Agent** | Plans, decomposes, designs, generates code/tests, monitors ops. The primary executor. |
| **Developer** | Validates AI output, makes trade-off decisions, ensures quality and adaptability. Full-stack by default. |
| **Product Owner** | Owns the Intent, validates business alignment, approves scope during Mob Elaboration. |

### RACI Matrix by Activity

| Activity | AI Agent | Developer | Product Owner |
|---|---|---|---|
| Intent Clarification | Consulted | Consulted | Accountable/Responsible |
| Story & NFR Generation | Responsible | Accountable | Accountable |
| Unit Decomposition | Responsible | Accountable | Consulted |
| Bolt Planning | Responsible | Accountable | Informed |
| Domain Model Design | Responsible | Accountable | Informed |
| Logical Design + ADRs | Responsible | Accountable | Informed |
| Code Generation | Responsible | Accountable | Informed |
| Test Execution + Fix Proposals | Responsible | Accountable | Informed |
| Deployment Approval | Consulted | Accountable | Informed |
| Ops Monitoring + Remediation | Responsible | Accountable | Informed |

**Critical Pattern:** AI is never the Accountable party. Humans always approve. This is the fundamental safety mechanism of AI-SDLC.

---

## How Roles Transform

### Product Owner → Intent Owner
- **Before:** Owns backlog, prioritizes work, writes user stories, grooms backlog
- **After:** Defines clear Intent (business goals), approves gates, validates outcomes
- **Key change:** Focus shifts from writing user stories to defining measurable intent. Less backlog grooming, more gate approval.
- **New skills needed:** Intent formulation (clear, measurable goals), gate review criteria, working with AI-generated artifacts

### Scrum Master → Role Absorbed
- **Before:** Facilitates ceremonies, removes impediments, coaches team
- **After:** Process facilitation handled by AI orchestration. Impediment removal shifts to real-time AI + dev collaboration.
- **Evolution path:** Transition to AI Facilitator role (orchestrating Mob Elaboration sessions) or move into spec quality coaching

### Developer → Full-Stack Validator
- **Before:** Writes code, reviews PRs, fixes bugs, specializes in frontend/backend/DevOps
- **After:** Validates AI output, makes trade-off decisions, ensures quality. Full-stack by default because AI handles infrastructure scaffolding, test generation, and process orchestration.
- **Key change:** Role shifts from WRITING code to VALIDATING outcomes. You're not a typist anymore — you're a quality gate.
- **New skills needed:** Spec writing, domain modeling, outcome evaluation, AI context management

### QA Engineer → Scenario Designer
- **Before:** Runs manual test passes, writes test plans, reports bugs
- **After:** Designs external holdout scenarios, validates gate evidence, ensures "proof over prose"
- **Key change:** From executing tests to designing the evaluation criteria that AI can't see

### Engineering Manager → Spec Quality Coach
- **Before:** Coordinates team, manages sprints, tracks velocity, removes blockers
- **After:** Defines specifications clearly enough that agents build features. Coaches engineers on spec writing and domain understanding.
- **Key change:** Value moves from "coordinate the team building the feature" to "define the specification clearly enough that agents build the feature"

---

## Organizational Structure Changes

### What Ceremonies Become Friction

Every ceremony in a traditional software organization exists because of human limitations:
- **Standups** exist because humans forget what others are doing → replaced by async artifacts (always current)
- **Sprints** exist because humans need time-boxed focus → replaced by Bolts (hours, not weeks)
- **Code review** exists because humans make mistakes → replaced by gate evidence (proof, not opinion)
- **QA teams** exist because developers miss edge cases → replaced by scenario validation (external holdouts)
- **Scrum Masters** exist because process needs facilitation → replaced by AI orchestration

StrongDM's 3-person dark factory team doesn't have sprints, standups, or a Jira board. They write specs and evaluate outcomes. The entire coordination layer that constitutes the operating system of a modern software organization is deleted — not because it was eliminated as a cost-saving measure, but because it no longer serves a purpose.

### The AI-Native Org Shape

AI-native startups demonstrate the new template:
- Cursor: ~$500M+ ARR with a few dozen employees (~$3.5M revenue per employee vs. $600K SaaS average)
- Midjourney: ~$500M revenue with ~100 people
- Lovable: Multi-hundred million ARR in months with a small team

The top 10 AI-native startups average ~$3M+ revenue per employee — 5-6x the SaaS average.

These orgs look like a small group of people who are exceptionally good at understanding what users need, translating that into clear specs, and directing AI systems that handle implementation. The org chart is radically flat.

---

## The Talent Reckoning

### The Junior Pipeline Is Collapsing

The data is stark:
- Junior developer employment dropping 9-10% within six quarters of widespread AI tool adoption (2025 Harvard study)
- UK graduate tech roles fell 46% in 2024, with a further 53% drop projected by 2026
- US junior developer job postings declined by 67%

**Why:** AI handles the simple features and small bug fixes that juniors traditionally learned on. If AI reviews code faster than a senior doing PR review, where does mentorship happen? The career ladder is getting hollowed out from underneath — seniors at the top, AI at the bottom, and a thinning middle where learning used to happen.

### Skills Rising in Value

- **Systems thinking** — understanding how components interact across the full stack
- **Customer intuition** — knowing what users actually need, not just what they ask for
- **Spec writing** — precision in describing desired behavior (the new bottleneck)
- **Domain expertise** — deep knowledge of the problem space
- **Scenario design** — creating meaningful validation criteria
- **Generalist breadth** — thinking across domains rather than deep expertise in one narrow stack

### Skills Declining in Value

- Syntax knowledge in specific languages (AI handles this)
- Boilerplate coding (AI handles this)
- Manual testing (scenarios replace this)
- Process facilitation (AI orchestrates this)
- Narrow specialization (generalists are more valuable when AI handles implementation)

### The New Bar

The junior of 2026 needs the systems design understanding that was expected of a mid-level engineer in 2020. Not because entry-level work got harder, but because entry-level work got automated and the remaining work requires deeper judgment.

You don't need someone who can write a CRUD endpoint — AI handles that in minutes. You need someone who can look at a system architecture and identify where it will break under load, where the security model has gaps, where the user experience falls apart at edge cases, and where the business logic encodes assumptions that are about to become wrong.

Gartner projects 80% of software engineers will need to upskill in AI-assisted dev tools by 2027. The real number is likely 100%.

---

## Recommended Roles (Minimal Set for Enterprise)

For organizations that need more structure than the 3-actor RACI:

| Role | Responsibility |
|---|---|
| Product/Domain Owner | Owns intent, success metrics, scope boundaries |
| Tech Lead / Architect | Owns unit boundaries, NFRs, integration decisions |
| Engineer(s) | Own implementation reviews, tests, code quality |
| QA / Scenario Designer | Owns test strategy and acceptance evidence |
| Security | Owns threat modeling and security controls evidence |
| Ops/SRE | Owns deployability and observability evidence |
| AI Workflow Maintainer | Owns prompts, rules, and guardrails as "process code" |

---

## Suggested Talking Points

- The RACI has 3 actors, not 8 — every additional role adds handoffs and latency
- AI is never Accountable — this is the fundamental safety mechanism
- The engineering manager's value moves from coordination to articulation (spec quality)
- The junior pipeline is collapsing — 67% drop in US junior dev postings
- The bar is rising toward generalists who can think across the full stack
- The developers who thrive won't be the fastest coders — they'll be the clearest thinkers
- AI-native orgs demonstrate 5-6x revenue per employee vs. traditional SaaS
