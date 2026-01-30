# User Stories Backlog

## Overview

This backlog contains detailed user stories for improving the AI-DLC Explainer tool. Stories are organized by epic/unit and prioritized using MoSCoW (Must/Should/Could/Won't).

---

## Epic 1: Complete Content Coverage

### US-1.1: Operations Phase Deep Dive Lesson

**Priority:** Must Have  
**Story Points:** 5  
**Epic:** Content Coverage

**User Story:**
> As a learner,  
> I want to explore the Operations phase in detail with lessons covering deployment, observability, runbooks, and cost modeling,  
> So that I understand how to productionize AI-DLC deliverables safely.

**Background:**
The Operations phase is currently a placeholder in our content. The AWS methodology emphasizes that Operations is where "production readiness = deployable, observable, rollbackable" is achieved. Learners need practical guidance on IaC, monitoring, incident response, and cost management.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Lesson "Phase: Operations" exists with 6 sections | `len(load_lesson("operations-deep-dive").sections) >= 6` |
| 2 | Section 1 covers deployment planning (IaC, environments) | Content includes "Terraform/CDK", "staging/prod" |
| 3 | Section 2 covers observability (metrics, logs, traces) | Content includes "SLOs", "dashboards", "alerts" |
| 4 | Section 3 covers runbooks and incident response | Content includes "triage", "rollback", "escalation" |
| 5 | Section 4 covers cost modeling and scaling | Content includes "cost guardrails", "load assumptions" |
| 6 | Section 5 covers production readiness gate | Gate criteria checklist present |
| 7 | Each section has ASCII diagram | `all(s.diagram for s in lesson.sections)` |
| 8 | Source references trace to AWS methodology | Local + upstream source links |
| 9 | Lesson accessible from lessons picker | "operations-deep-dive" in `get_all_lessons()` |

**Technical Notes:**
- Add `OPERATIONS_DEEP_DIVE` constant to `content/__init__.py`
- Follow existing lesson structure (Section dataclass)
- Include diagrams for deployment topology, observability stack

**Definition of Done:**
- [ ] Code complete
- [ ] Unit tests pass
- [ ] Content reviewed against AWS sources
- [ ] Manual testing complete
- [ ] Documentation updated

---

### US-1.2: Mob Elaboration Walkthrough

**Priority:** Should Have  
**Story Points:** 8  
**Epic:** Content Coverage

**User Story:**
> As a team facilitator,  
> I want to follow a step-by-step guide for running a Mob Elaboration session,  
> So that I can lead my team through effective intent-to-units decomposition.

**Background:**
Mob Elaboration is a key AI-DLC ritual where teams collaboratively work with AI to convert intent into requirements and units. The current app mentions the ritual but doesn't provide actionable guidance.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | New screen type: RitualWalkthroughScreen | Class exists in `screens/` |
| 2 | 4 phases defined: Preparation, Q&A, Decomposition, Approval | Content structure visible |
| 3 | Each phase has duration estimate | "15 min", "20 min" visible |
| 4 | Checklist items for each phase | `[ ]` checkbox syntax |
| 5 | Facilitator tips and common pitfalls | "Tip:", "Watch out:" sections |
| 6 | Timer/stopwatch display (optional) | Visual countdown or elapsed |
| 7 | Navigation: next phase, previous phase | Left/Right arrows work |
| 8 | Sources reference AWS Mob Elaboration docs | Source links present |

**Technical Notes:**
- New screen class: `RitualWalkthroughScreen`
- Consider timer widget for session facilitation
- Could evolve into "facilitator mode" with audio cues

**Definition of Done:**
- [ ] Screen implemented
- [ ] All 4 phases complete
- [ ] Checklists interactive (can mark complete)
- [ ] Manual testing complete

---

### US-1.3: Mob Construction Walkthrough

**Priority:** Should Have  
**Story Points:** 8  
**Epic:** Content Coverage

**User Story:**
> As a team facilitator,  
> I want to follow a step-by-step guide for running a Mob Construction session,  
> So that I can lead my team through effective AI-assisted implementation.

**Background:**
Mob Construction is the ritual where teams collaboratively build with AI generating and humans validating. Includes Bolt planning, execution, evidence collection, and guardrail retrospectives.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Reuses RitualWalkthroughScreen | Same screen type as US-1.2 |
| 2 | 4 phases: Bolt Planning, AI Execution, Evidence, Retro | Content structure visible |
| 3 | Bolt Planning includes unit selection, dependency check | Content present |
| 4 | AI Execution phase includes human review checkpoints | "STOP" points marked |
| 5 | Evidence phase includes validation report template | Template shown |
| 6 | Retro phase includes guardrail improvement prompts | Questions for reflection |
| 7 | Duration estimates total ~2 hours | Cumulative time shown |

**Definition of Done:**
- [ ] Screen implemented
- [ ] All 4 phases complete
- [ ] Complements Mob Elaboration walkthrough
- [ ] Manual testing complete

---

### US-1.4: Interactive Artifact Explorer

**Priority:** Must Have  
**Story Points:** 13  
**Epic:** Content Coverage

**User Story:**
> As a learner,  
> I want to explore the `aidlc-docs/` directory structure interactively,  
> So that I understand what artifacts to create, when to create them, and what they contain.

**Background:**
The artifact model is central to AI-DLC. Users need to understand the relationship between phases, stages, and artifacts. An interactive explorer lets them browse the structure and see examples.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | New screen: ArtifactExplorerScreen | Class exists |
| 2 | Tree view displays full `aidlc-docs/` structure | Visual tree UI |
| 3 | Navigate tree with arrow keys | Up/Down moves, Enter expands |
| 4 | Selecting a file shows detail panel | Panel updates on selection |
| 5 | Detail includes: purpose, template, stage, sources | All fields present |
| 6 | Mandatory artifacts visually distinguished | Bold or icon indicator |
| 7 | Filter by phase (Inception/Construction/Operations) | Filter buttons work |
| 8 | At least 15 artifacts defined | `len(artifacts) >= 15` |
| 9 | Accessible from main menu | Menu item present |

**Artifact Data Structure:**
```python
@dataclass
class ArtifactDefinition:
    path: str              # "aidlc-docs/inception/intent.md"
    name: str              # "Intent Document"
    phase: str             # "inception"
    stage: str             # "requirements-analysis"
    mandatory: bool        # True
    purpose: str           # "Captures the high-level goal..."
    template: str          # "## Intent\n\n[1 paragraph]..."
    source_local: str      # "AI-SDLC_best-practice...#L82"
    source_upstream: str   # "https://github.com/..."
```

**Definition of Done:**
- [ ] Screen implemented
- [ ] Tree navigation works
- [ ] All artifacts defined with examples
- [ ] Tests for artifact data loading
- [ ] Manual testing complete

---

### US-1.5: Workflow Variants Lesson

**Priority:** Should Have  
**Story Points:** 5  
**Epic:** Content Coverage

**User Story:**
> As a learner,  
> I want to understand how AI-DLC adapts for different project types,  
> So that I can apply the right workflow variant for my situation.

**Background:**
AI-DLC has variants for greenfield, brownfield, frontend, and bugfix scenarios. Each has different stage selection and emphasis. Users need to understand these differences.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Lesson "Workflow Variants" with 5 sections | Content exists |
| 2 | Section 1: How to choose a variant | Decision criteria |
| 3 | Section 2: Greenfield (full inception) | Coverage complete |
| 4 | Section 3: Brownfield (reverse engineering) | Coverage complete |
| 5 | Section 4: Frontend (browser validation) | Coverage complete |
| 6 | Section 5: Bugfix (minimal ceremony) | Coverage complete |
| 7 | Comparison table of stages per variant | ASCII table |
| 8 | Links to structured prompts | Reference section |

**Definition of Done:**
- [ ] Lesson added to content
- [ ] Tests pass
- [ ] Reviewed against methodology
- [ ] Manual testing complete

---

## Epic 2: Active Learning

### US-2.1: Interactive Simulator Q&A

**Priority:** Must Have  
**Story Points:** 13  
**Epic:** Active Learning

**User Story:**
> As a learner,  
> I want to answer structured questions in the Stage Simulator and see how my answers affect the workflow,  
> So that I experience the adaptive depth principle firsthand.

**Background:**
The current simulator shows questions but doesn't collect answers. This story adds interactivity so user choices dynamically influence which stages execute and at what depth.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Question form appears for each stage | UI shows questions |
| 2 | User can select from multiple-choice options | Click/keyboard selects |
| 3 | Answers stored in simulation session | State persists |
| 4 | Answers affect stage execution decisions | Visual change on answer |
| 5 | At least 3 meaningfully different paths | Test 3 scenarios |
| 6 | Summary screen shows impact of choices | "Your choices..." text |
| 7 | Reset option to try different answers | Reset button works |
| 8 | Questions sourced from stages.json | Data-driven |

**Technical Notes:**
- Reference GPT5.2 Codex implementation for "effects" pattern
- Each question option can have `effects: { set_depth: "comprehensive", set_stages: {...} }`
- Implement `answer_question()` method in simulator session

**Definition of Done:**
- [ ] Interactive Q&A works
- [ ] 3 distinct paths tested
- [ ] Tests for answer effects
- [ ] Manual testing complete

---

### US-2.2: Extended Gatekeeper Scenarios

**Priority:** Should Have  
**Story Points:** 5  
**Epic:** Active Learning

**User Story:**
> As a learner,  
> I want to practice with more nuanced gate approval scenarios,  
> So that I develop better judgment for "proof over prose" decisions.

**Background:**
Current 4 scenarios are good but limited. Real-world decisions involve partial evidence, time pressure, security vs speed trade-offs, and scope creep detection.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | At least 10 total scenarios | `len(gates.json.scenarios) >= 10` |
| 2 | New scenario types: partial evidence | Scenario exists |
| 3 | New scenario types: security concerns | Scenario exists |
| 4 | New scenario types: scope creep | Scenario exists |
| 5 | New scenario types: time pressure | Scenario exists |
| 6 | Feedback explains consequences | "If you approved..." text |
| 7 | Difficulty gradient (easy → hard) | Labeled in metadata |
| 8 | All scenarios have sources | `source.local` present |

**Definition of Done:**
- [ ] 6+ new scenarios added
- [ ] Schema tests pass
- [ ] Content reviewed
- [ ] Manual testing complete

---

### US-2.3: Artifact Writing Practice Mode

**Priority:** Could Have  
**Story Points:** 20  
**Epic:** Active Learning

**User Story:**
> As a learner,  
> I want to practice writing AI-DLC artifacts with guided templates and feedback,  
> So that I build skill in creating requirements, units, and validation reports.

**Background:**
Reading about artifacts is different from writing them. This mode provides scaffolded practice with example scenarios and AI-style feedback on completeness.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | New mode: "Practice Writing" in Practice menu | Menu option exists |
| 2 | At least 3 practice scenarios | "Build a todo app", etc. |
| 3 | User can write: intent.md, requirements.md, unit.md | 3 artifact types |
| 4 | Template with fill-in sections | `[Your text here]` prompts |
| 5 | Submit triggers feedback | Feedback displayed |
| 6 | Feedback checks: completeness, testability, scope | 3 feedback types |
| 7 | Reference "good example" available | Toggle to see example |
| 8 | Progress tracked per artifact type | State saved |

**Technical Notes:**
- Complex feature, may need TextArea widget for input
- Feedback logic: regex checks for required sections, heuristics for quality
- Consider simpler version: multiple-choice "what's wrong with this artifact"

**Definition of Done:**
- [ ] Mode implemented
- [ ] 3 scenarios complete
- [ ] Feedback logic works
- [ ] Tests for validation
- [ ] Manual testing complete

---

### US-2.4: End-to-End Project Simulation

**Priority:** Could Have  
**Story Points:** 21  
**Epic:** Active Learning

**User Story:**
> As a learner,  
> I want to simulate an entire AI-DLC project from intent to deployment,  
> So that I experience the full lifecycle in a compressed, interactive format.

**Background:**
Individual lessons and modes teach parts. This story creates a cohesive 10-minute journey through all three phases with meaningful decisions and a final project report.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | New mode: "Full Project Simulation" | Mode accessible |
| 2 | Three phases covered in sequence | Inception → Construction → Operations |
| 3 | Inception: define intent, answer questions, approve units | Interactive steps |
| 4 | Construction: review plan, validate code, approve gates | Interactive steps |
| 5 | Operations: review deployment, check observability | Interactive steps |
| 6 | User makes 5+ meaningful decisions | Decision points tracked |
| 7 | Branching based on choices | At least 2 paths |
| 8 | Final "Project Report" summary | Report screen exists |
| 9 | Replay option with different choices | Restart works |
| 10 | Completes in ~10 minutes | Timed testing |

**Technical Notes:**
- Major feature, depends on US-2.1 (Interactive Q&A) and US-1.2 (Rituals)
- Consider state machine for simulation flow
- Project report could be exportable (links to US-5.1)

**Definition of Done:**
- [ ] Full simulation works end-to-end
- [ ] Multiple paths tested
- [ ] Project report generates
- [ ] Manual testing complete

---

## Epic 3: Discoverability

### US-3.1: Search/Filter Content

**Priority:** Should Have  
**Story Points:** 5  
**Epic:** Discoverability

**User Story:**
> As a learner,  
> I want to search for topics by keyword,  
> So that I can quickly find relevant content without browsing.

**Background:**
With growing content (lessons, glossary, artifacts), users need a way to find specific information quickly.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Search accessible via `/` key from any screen | Keybinding works |
| 2 | Search input with live filtering | Results update as typing |
| 3 | Searches: lesson titles, section content, glossary terms | All indexed |
| 4 | Results show: title, type, preview | List display |
| 5 | Navigate to result with Enter | Navigation works |
| 6 | Highlight match in results | Visual highlight |
| 7 | "No results" message when empty | UX complete |
| 8 | Search history (last 5) | History shown |

**Technical Notes:**
- Build inverted index on startup
- Consider fuzzy matching (Levenshtein distance)
- Results ranked by relevance (exact > partial > fuzzy)

**Definition of Done:**
- [ ] Search screen implemented
- [ ] Index built on startup
- [ ] Tests for search logic
- [ ] Manual testing complete

---

### US-3.2: Glossary of Terms

**Priority:** Should Have  
**Story Points:** 5  
**Epic:** Discoverability

**User Story:**
> As a learner,  
> I want to look up AI-DLC terminology in a glossary,  
> So that I understand the vocabulary used throughout the tool.

**Background:**
AI-DLC introduces many terms: Intent, Unit, Bolt, Gate, Mob Elaboration, etc. A glossary provides quick reference without leaving context.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | New screen: GlossaryScreen | Screen exists |
| 2 | At least 30 terms defined | `len(terms) >= 30` |
| 3 | Alphabetical navigation (A-Z) | Sidebar or filter |
| 4 | Each term has: definition, example, related terms | All fields present |
| 5 | Source reference per term | Links present |
| 6 | Quick access from any screen via `g` key | Keybinding works |
| 7 | Searchable within glossary | Filter input |

**Glossary Data Structure:**
```python
@dataclass
class GlossaryTerm:
    id: str              # "bolt"
    term: str            # "Bolt"
    definition: str      # "The smallest iteration in AI-DLC..."
    example: str         # "A Bolt to implement user auth..."
    related: list[str]   # ["unit", "gate"]
    source: str          # "aidlc-method-definition.md#L47"
```

**Definition of Done:**
- [ ] Screen implemented
- [ ] 30+ terms defined
- [ ] Tests for glossary data
- [ ] Manual testing complete

---

### US-3.3: Quick Reference Card

**Priority:** Should Have  
**Story Points:** 2  
**Epic:** Discoverability

**User Story:**
> As a learner,  
> I want to see a single-screen summary of AI-DLC essentials,  
> So that I can quickly recall key concepts.

**Background:**
A "cheat sheet" that fits on one terminal screen is valuable for quick reference during real work.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | New screen: QuickReferenceScreen | Screen exists |
| 2 | Fits on 80x24 terminal | Visual check |
| 3 | Includes: 3 phases (1-line each) | Content present |
| 4 | Includes: 10 principles as bullets | Content present |
| 5 | Includes: key artifacts list | Content present |
| 6 | Includes: gate checklist template | Content present |
| 7 | Exportable as text/markdown | Export option |
| 8 | Accessible via `?` key | Keybinding works |

**Definition of Done:**
- [ ] Screen implemented
- [ ] Content complete
- [ ] Export works
- [ ] Manual testing complete

---

## Epic 4: Engagement & Gamification

### US-4.1: Achievement System

**Priority:** Could Have  
**Story Points:** 5  
**Epic:** Engagement

**User Story:**
> As a learner,  
> I want to earn achievements for completing learning milestones,  
> So that I feel motivated to complete the full curriculum.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Achievement categories: Content, Quiz, Simulator, Mastery | All categories exist |
| 2 | At least 15 achievements defined | `len(achievements) >= 15` |
| 3 | Visual badge display (ASCII art) | Badge renders |
| 4 | Notification on achievement unlock | Toast/popup appears |
| 5 | Achievement gallery screen | Gallery exists |
| 6 | Achievements persist in state.json | State includes achievements |
| 7 | Progress toward achievements shown | "2/5 lessons" style |

**Achievement Examples:**
- 🎓 **First Steps**: Complete your first lesson
- 📚 **Scholar**: Complete all 5 lessons
- 🎯 **Sharpshooter**: Score 100% on a quiz
- 🏃 **Speed Learner**: Complete curriculum in <10 min
- 🔄 **Reviewer**: Use spaced repetition 5 times

**Definition of Done:**
- [ ] Achievement system implemented
- [ ] All achievements trigger correctly
- [ ] State persistence works
- [ ] Manual testing complete

---

### US-4.2: Progress Dashboard

**Priority:** Should Have  
**Story Points:** 3  
**Epic:** Engagement

**User Story:**
> As a learner,  
> I want to see my overall learning progress at a glance,  
> So that I know what I've completed and what remains.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Home screen shows progress overview | Visual progress |
| 2 | Progress bars for: Lessons, Quiz, Gatekeeper, Simulator | 4 bars visible |
| 3 | "Continue where you left off" suggestion | Suggestion shown |
| 4 | Estimated time to completion | Time displayed |
| 5 | Streak tracking (consecutive days) | Streak counter |
| 6 | Visual distinction for completed items | Checkmarks/colors |

**Definition of Done:**
- [ ] Dashboard implemented
- [ ] Progress calculated correctly
- [ ] State integration works
- [ ] Manual testing complete

---

## Epic 5: Shareability & Export

### US-5.1: Export Learning Report

**Priority:** Should Have  
**Story Points:** 3  
**Epic:** Shareability

**User Story:**
> As a learner,  
> I want to export my learning progress as a report,  
> So that I can share it with my team or manager.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Export command: `python run.py --export-report` | CLI works |
| 2 | Report format: Markdown | .md file generated |
| 3 | Report includes: progress summary | Section present |
| 4 | Report includes: quiz scores by topic | Section present |
| 5 | Report includes: achievements earned | Section present |
| 6 | Report includes: time spent | Section present |
| 7 | File saved to current directory | File created |

**Definition of Done:**
- [ ] CLI command works
- [ ] Report generates correctly
- [ ] Content is accurate
- [ ] Manual testing complete

---

### US-5.2: Completion Certificate

**Priority:** Could Have  
**Story Points:** 2  
**Epic:** Shareability

**User Story:**
> As a learner,  
> I want to receive a certificate when I complete the curriculum,  
> So that I have proof of AI-DLC competency.

**Acceptance Criteria:**

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Trigger: Complete all lessons + 80% quiz | Condition checked |
| 2 | Certificate display (ASCII art + text) | Visual display |
| 3 | Includes: learner name (prompted) | Name shown |
| 4 | Includes: completion date | Date shown |
| 5 | Includes: unique certificate ID (hash) | ID generated |
| 6 | Exportable as text file | Export works |
| 7 | Screenshot-friendly layout | Visual check |

**Definition of Done:**
- [ ] Certificate triggers correctly
- [ ] Display looks good
- [ ] Export works
- [ ] Manual testing complete

---

## Summary Statistics

| Epic | Stories | Must | Should | Could | Total Points |
|------|---------|------|--------|-------|--------------|
| Complete Coverage | 5 | 2 | 3 | 0 | 39 |
| Active Learning | 4 | 1 | 1 | 2 | 59 |
| Discoverability | 3 | 0 | 3 | 0 | 12 |
| Engagement | 2 | 0 | 1 | 1 | 8 |
| Shareability | 2 | 0 | 1 | 1 | 5 |
| **TOTAL** | **16** | **3** | **9** | **4** | **123** |

---

## Next Steps

1. **Review and prioritize** with stakeholders
2. **Estimate capacity** for implementation phases
3. **Create sprint/bolt plans** for Phase 1 stories
4. **Set up tracking** in project management tool

---

**Document Status:** DRAFT  
**Created:** 2026-01-28  
**Last Updated:** 2026-01-28
