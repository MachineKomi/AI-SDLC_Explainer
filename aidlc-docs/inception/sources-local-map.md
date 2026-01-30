# Local Source Material Map

**Purpose:** Identify authoritative local sources for building interactive AI-DLC learning content.

**Date:** 2026-01-27  
**Status:** Initial mapping (primary source only; references folder pending)

---

## Available Sources

### Primary Source (Available)

| # | File | Status |
|---|------|--------|
| 1 | `./AI-SDLC_best-practice_method_principles.md` | ✓ Available |

### Pending Sources (Not Yet Populated)

| # | Path | Status |
|---|------|--------|
| 2 | `./references/aidlc-workflows/README.md` | ✗ Pending |
| 3 | `./references/aidlc-workflows/aidlc-rules/` | ✗ Pending |

---

## Source 1: AI-SDLC_best-practice_method_principles.md

**Path:** `./AI-SDLC_best-practice_method_principles.md`  
**Lines:** 430  
**Type:** Synthesis document

### Content Sections Relevant to Learning Content

| Section | Lines | Contribution to Learning Content |
|---------|-------|----------------------------------|
| **Expert Panel Viewpoints** | 1-23 | Mental models for different stakeholder perspectives (engineering, DevSecOps, product, change leadership) |
| **Synthesis Intro** | 24-27 | Core definition: AI proposes → collects info → executes → proves → persists |
| **Core Principles (10)** | 30-71 | The 10 non-negotiable principles - prime content for Principles lesson and quiz |
| **Reference Lifecycle** | 74-139 | Three phases (Inception/Construction/Operations), stages, gates, artifacts - core lesson content |
| **Artifact and State Model** | 142-183 | Canonical `aidlc-docs/` structure, file purposes, best practices |
| **Interaction Model** | 185-203 | File-based Q&A vs chat-based clarifications, auditability patterns |
| **Workflow Variants** | 205-237 | Greenfield/Brownfield/Frontend patterns - potential advanced lesson |
| **MCP Integration** | 239-269 | MCP servers by phase, enterprise guardrails - reference material |
| **Ralph Loop** | 271-298 | Bounded automation pattern, where it fits vs doesn't - advanced topic |
| **Operating Model & Rituals** | 300-321 | Roles, Mob Elaboration, Mob Construction, Bolt planning - team practices |
| **Metrics** | 323-338 | What to measure, anti-metrics - reference material |
| **External Sources** | 398-429 | Links to AWS blogs, GitHub repos, MCP docs - citation references |

---

## Prioritized Content for Interactive Learning

Based on the source material, here are the most valuable content areas:

### Tier 1: Essential (Unit 1-3)

1. **The Three Phases** (lines 74-139)
   - Inception, Construction, Operations
   - Stages within each phase
   - Gate definitions and criteria
   - Primary artifacts per phase

2. **Core Principles** (lines 30-71)
   - All 10 principles with explanations
   - Good for quiz content (principle matching, scenario-based questions)

3. **Artifact Model** (lines 142-183)
   - `aidlc-docs/` directory structure
   - Purpose of each artifact type
   - State tracking and audit patterns

### Tier 2: Important (Unit 4-5)

4. **Roles and Rituals** (lines 300-321)
   - Minimal role set (Product, Tech Lead, Engineer, QA, Security, Ops, AI Workflow Maintainer)
   - Mob Elaboration, Mob Construction, Bolt planning, Guardrail retro

5. **Interaction Model** (lines 185-203)
   - File-based structured Q&A
   - Approval gate patterns
   - Auditability requirements

### Tier 3: Advanced/Reference (Unit 6+)

6. **Workflow Variants** (lines 205-237)
   - Greenfield vs Brownfield vs Frontend
   - When to use each pattern

7. **MCP Integration** (lines 239-269)
   - Recommended servers by phase
   - Enterprise guardrails

8. **Ralph Loop** (lines 271-298)
   - Bounded automation
   - Where looping fits vs doesn't

---

## Content Extraction Notes

### Diagrams Needed (from source descriptions)

| Diagram | Source Reference | Priority |
|---------|------------------|----------|
| Three-phase lifecycle flow | Section 2, lines 74-76 | High |
| Gate checkpoint model | Principles 2 & 6 | High |
| `aidlc-docs/` directory tree | Section 3, lines 153-178 | High |
| AI-DLC mental model (propose→validate→implement) | Intro, line 26 | High |
| Workflow variants decision tree | Section 5 | Medium |
| MCP servers by phase | Section 6 | Low |

### Quiz Content Opportunities

| Topic | Question Types | Source Lines |
|-------|----------------|--------------|
| 10 Principles | Match principle to description, scenario identification | 30-71 |
| Phase identification | "Which phase does X belong to?" | 74-139 |
| Artifact purposes | "What is the purpose of audit.md?" | 142-183 |
| Gate criteria | "What must be true to pass the Inception gate?" | 99, 122, 138 |
| Role responsibilities | "Who owns X?" | 300-314 |

---

## Pending: References Folder

When `./references/aidlc-workflows/` is populated, expect additional sources:

- **README.md** — Overview of AWS AI-DLC workflows
- **aidlc-rules/** — Detailed rule definitions for AI agents
  - Phase-specific rules
  - Stage transition rules
  - Artifact templates

These will provide:
- More granular stage definitions
- Actual rule syntax/format examples
- Additional workflow patterns

---

## Recommendations

1. **Proceed with Tier 1 content** using the synthesis document
2. **Populate references folder** when ready for deeper rule-level content
3. **Cite sources** in lesson content (link back to AWS blogs/repos)
4. **Version content** with source document version/date

---

**Next Step:** Await approval to proceed with content enhancements to the TUI app.
