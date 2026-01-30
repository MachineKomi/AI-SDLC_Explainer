# Feedback Remediation Plan

**Created:** 2026-01-28  
**Status:** PLAN - PENDING EXECUTION

---

## Executive Summary

This document addresses 10 feedback items, including 7 bug fixes, 1 cleanup task, and 2 new feature requests. The plan is organized by priority with immediate critical fixes first.

---

## Part 1: Critical Bug Fixes (Must Fix Immediately)

### BUG-01: Home Page Blank
**Severity:** Critical  
**Root Cause:** CSS layout issue - `#content` container not expanding to fill available space.

**Evidence:**
- Screenshot shows completely blank home screen
- Base screen uses grid layout with `grid-rows: auto auto 1fr auto`
- `#content` padding exists but no height forcing expansion

**Fix:**
1. Update `styles.tcss` to set `#content { height: 100%; }`
2. Update `HomeScreen` CSS to remove `height: 100%` from `#main-container` (let parent control)
3. Ensure `Vertical` and `Horizontal` containers use `height: 1fr` or `auto`

**Acceptance Criteria:**
- [ ] Home screen displays banner, menu, and progress panel
- [ ] Content scrolls if needed
- [ ] Works in multiple terminal sizes

---

### BUG-02: Lessons Display in Tiny Scroll Window
**Severity:** High  
**Root Cause:** Same CSS issue as BUG-01 - content container not expanding.

**Evidence:**
- Screenshot shows tiny scroll area at top
- `#lesson-scroll` has `height: 100%` but parent isn't expanding

**Fix:**
1. Ensure `#content` expands properly (shared fix with BUG-01)
2. Set `LessonScreen #lesson-scroll { height: 1fr; }` instead of `100%`
3. Remove `max-height: 12` from global `ListView` CSS

**Acceptance Criteria:**
- [ ] Lesson content fills available vertical space
- [ ] All lesson sections display correctly
- [ ] Scrolling works for long content

---

### BUG-03: Simulator Enter Key Not Working
**Severity:** High  
**Root Cause:** Binding exists but may not fire because ListView captures Enter for selection first.

**Evidence:**
- `enter` binding exists in `BINDINGS`
- Start button exists but Enter may be captured by ListView
- Need to select a type first - no visual feedback if not selected

**Fix:**
1. Add explicit handling for Enter in `on_list_view_selected` to also start if type selected
2. Add visual indicator that type must be selected
3. Ensure Button is focusable and can receive Enter
4. Add click handler to ListView items to select AND start with double-click

**Acceptance Criteria:**
- [ ] Pressing Enter after selecting type starts simulation
- [ ] Clicking Start button works
- [ ] Clear visual feedback when no type selected

---

### BUG-04: Quiz Missing A/B/C/D Labels and Submit Button, Crashes on Letter Input
**Severity:** Critical  
**Root Cause:** 
1. Options show `[a]` instead of `(A)` style
2. No Submit button - uses Enter for next
3. Crash likely from out-of-bounds index if more than 4 options

**Evidence:**
- Quiz bindings: `a/b/c/d` → `select_option(0-3)`
- Crash on letter input suggests index bounds issue
- Labels show `[a]` but UI doesn't clearly indicate this

**Fix:**
1. Change option display to show prominent `(A) (B) (C) (D)` labels
2. Add explicit "Submit Answer" or instruction text
3. Add bounds checking in `action_select_option`
4. Add mouse click support for options

**Acceptance Criteria:**
- [ ] Options clearly labeled (A), (B), (C), (D)
- [ ] Clear instruction: "Press A-D or click to answer"
- [ ] No crash regardless of input
- [ ] Mouse click on option selects it

---

## Part 2: Usability Fixes

### BUG-05: Mouse Support Throughout UI
**Severity:** Medium  
**Root Cause:** Many screens rely on keyboard bindings only.

**Fix for each screen:**
1. **HomeScreen**: Menu items already use ListView (mouse works), verify click on progress panel
2. **LessonScreen**: Add clickable Previous/Next buttons
3. **QuizScreen**: Make options clickable, add button widgets
4. **SimulatorScreen**: Already has buttons, verify all work
5. **GlossaryScreen**: ListView works with mouse, verify
6. **ArtifactExplorer**: Tree widget supports mouse

**Global Changes:**
1. Add Button widgets where keyboard-only shortcuts exist
2. Ensure all ListView items respond to click
3. Add tooltips where helpful

**Acceptance Criteria:**
- [ ] All screens navigable with mouse only
- [ ] Buttons have hover states
- [ ] Clickable items have visible affordance

---

### BUG-06: Cleanup pytest-cache-files
**Severity:** Low  
**Root Cause:** pytest creates cache files in root directory.

**Fix:**
1. Add `pytest-cache-files*/` to `.gitignore`
2. Configure pytest to use subdirectory for cache in `pyproject.toml`
3. Remove existing cache files

**Acceptance Criteria:**
- [ ] No cache files in root directory
- [ ] `.gitignore` updated
- [ ] `pyproject.toml` configures cache location

---

### BUG-07: UI Visual Improvements
**Severity:** Medium  
**Root Cause:** Default styling lacks polish.

**Improvements:**
1. Add consistent box borders around major sections
2. Improve color contrast for readability
3. Add visual separators between sections
4. Standardize padding/margins
5. Add icons to menu items
6. Improve progress bar styling
7. Add visual hierarchy with headers

**Acceptance Criteria:**
- [ ] Consistent visual style across all screens
- [ ] Clear visual hierarchy
- [ ] Professional appearance

---

## Part 3: New Feature Plans

### FEATURE-01: Animated Methodology Comparison Visualization

**Goal:** Interactive animation comparing Waterfall, Agile/Scrum, and AI-DLC showing handoffs, wait times, delivery speed, and cost.

#### Phase 1: Home Screen Mini-Animation
- Continuous subtle animation on home screen showing methodology comparison
- Simple timeline visualization with phases progressing
- Click to expand to full visualization

#### Phase 2: Full Interactive Comparison Screen

**Data Model:**
```python
@dataclass
class MethodologyStep:
    name: str
    duration_days: int
    wait_time_days: int
    handoff_to: str | None
    cost_multiplier: float
    description: str

@dataclass
class Methodology:
    id: str  # "waterfall", "agile", "ai-dlc"
    name: str
    steps: list[MethodologyStep]
    total_duration: int
    total_wait: int
    delivery_frequency: str
    team_structure: str
```

**Visualization Components:**
1. **Timeline View**
   - Horizontal timeline with phases
   - Wait time shown as gaps
   - Handoffs shown as arrows
   - Color-coded by methodology

2. **Metrics Panel**
   - Time to first delivery
   - Total project time
   - Cost comparison
   - Quality indicators

3. **Animation Controls**
   - Play/Pause
   - Speed selector (1x, 2x, 5x)
   - Reset
   - Step-by-step mode

**ASCII Art Approach:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  WATERFALL (18 months)                                              │
│  [Req]──────▶[Design]──────▶[Build]──────▶[Test]──────▶[Deploy]    │
│              ↑ 2mo wait                    ↑ 1mo wait               │
├─────────────────────────────────────────────────────────────────────┤
│  AGILE (6 sprints = 3 months to MVP)                               │
│  [Sprint 1]▶[Sprint 2]▶[Sprint 3]▶...    (incremental delivery)    │
│              ↺ feedback loops                                       │
├─────────────────────────────────────────────────────────────────────┤
│  AI-DLC (4 weeks to MVP)                                            │
│  [Intent]▶[Mob Elab]▶[Unit1]▶[Unit2]▶...  (continuous delivery)    │
│           ↺ AI acceleration + human gates                           │
└─────────────────────────────────────────────────────────────────────┘
```

**Implementation Plan:**
1. Create `content/methodology_comparison.py` with data models
2. Create `widgets/methodology_timeline.py` for animated widget
3. Create `screens/methodology_comparison.py` for full screen
4. Update `HomeScreen` to include mini-animation
5. Add navigation from home to full comparison

**Acceptance Criteria:**
- [ ] Home screen shows methodology comparison animation
- [ ] Full comparison screen accessible via button
- [ ] Animation shows progression over time
- [ ] Metrics clearly displayed
- [ ] Mouse and keyboard controls
- [ ] Educational tooltips/explanations

---

### FEATURE-02: Transition Mapping (Agile → AI-DLC Change Management)

**Goal:** Interactive visualization showing how roles, processes, and collaboration change when transitioning from Agile to AI-DLC.

#### Core Concepts

**Current State (Agile/Scrum):**
- Roles: Product Owner, Scrum Master, Dev Team, QA
- Ceremonies: Sprint Planning, Daily Standup, Sprint Review, Retro
- Artifacts: Backlog, Sprint Backlog, Burndown Chart
- Cadence: 2-week sprints

**Future State (AI-DLC):**
- Roles: Intent Owner, AI Facilitator, Human Validators, SMEs
- Rituals: Mob Elaboration, Mob Construction, Gate Reviews
- Artifacts: Intent, Units, Bolts, Validation Reports, Audit Log
- Cadence: Continuous with gates (days not weeks)

**Mapping Dimensions:**
1. **Role Mapping**
   - Product Owner → Intent Owner
   - Scrum Master → AI Facilitator
   - Dev Team → AI + Human Validators
   - QA → Automated + Human Proof

2. **Process Mapping**
   - Sprint Planning → Mob Elaboration
   - Daily Standup → Bolt Check-ins
   - Sprint Review → Gate Reviews
   - Retrospective → Guardrail Retros

3. **Mindset Shifts**
   - "We estimate" → "AI generates, humans validate"
   - "We build" → "AI builds, humans verify"
   - "Done when shipped" → "Done when proven"

**Data Model:**
```python
@dataclass
class RoleMapping:
    current_role: str
    future_role: str
    key_changes: list[str]
    new_skills_needed: list[str]
    retained_skills: list[str]

@dataclass
class ProcessMapping:
    current_process: str
    future_process: str
    frequency_change: str
    key_differences: list[str]
    benefits: list[str]

@dataclass
class TransitionPlan:
    phase: str
    duration: str
    activities: list[str]
    success_metrics: list[str]
```

**Screen Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│                    AGILE → AI-DLC TRANSITION MAP                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ROLES                           PROCESSES                          │
│   ┌────────┐     ┌────────┐      ┌────────────┐     ┌────────────┐ │
│   │Product │ ──▶ │Intent  │      │Sprint      │ ──▶ │Mob         │ │
│   │Owner   │     │Owner   │      │Planning    │     │Elaboration │ │
│   └────────┘     └────────┘      └────────────┘     └────────────┘ │
│                                                                      │
│   ARTIFACTS                       CADENCE                            │
│   ┌────────┐     ┌────────┐      ┌────────────┐     ┌────────────┐ │
│   │User    │ ──▶ │Units + │      │2-week      │ ──▶ │Continuous  │ │
│   │Stories │     │Bolts   │      │sprints     │     │+ gates     │ │
│   └────────┘     └────────┘      └────────────┘     └────────────┘ │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│  [View Roles] [View Processes] [View Artifacts] [View Timeline]     │
└─────────────────────────────────────────────────────────────────────┘
```

**Implementation Plan:**
1. Create `content/transition_mapping.py` with data models and content
2. Create `screens/transition_map.py` main screen with tabs
3. Create sub-views: RoleMapView, ProcessMapView, ArtifactMapView, TimelineView
4. Create `widgets/mapping_diagram.py` for arrow visualizations
5. Add interactive exploration with click-to-expand details
6. Include printable/exportable transition checklist

**Acceptance Criteria:**
- [ ] Clear visualization of role mappings
- [ ] Process ceremony comparisons
- [ ] Artifact evolution shown
- [ ] Transition timeline with phases
- [ ] Interactive exploration
- [ ] Export transition plan as markdown

---

## Part 3B: Additional Features (From Original Backlog)

### FEATURE-03: Interactive Simulator Q&A (US-2.1)

**Goal:** Transform the simulator from passive display to interactive experience where user answers affect the workflow.

**Current State:** Simulator shows stages based on request type selection but questions are static display only.

**Desired State:** Users answer structured questions during simulation, and their answers dynamically affect which stages run and at what depth.

**Key Components:**

1. **Question Engine**
   - Multiple-choice questions per stage
   - Answers stored in simulation state
   - Answers trigger stage inclusion/exclusion

2. **Adaptive Flow**
   - "Do you have existing code?" → toggles Reverse Engineering
   - "Is this security-critical?" → forces NFR stages
   - "Is there a frontend component?" → adds Browser Validation

3. **Immediate Feedback**
   - After each answer, show impact on workflow
   - Visualize stages being added/removed
   - Explain why each decision matters

**Data Model:**
```python
@dataclass
class SimulatorQuestion:
    id: str
    prompt: str
    options: list[dict]  # {id, label, effect}
    stage_effects: dict[str, str]  # answer_id -> stage impact
    
@dataclass 
class SimulationState:
    answers: dict[str, str]
    active_stages: list[str]
    skipped_stages: list[str]
    current_question: int
```

**Screen Flow:**
```
[Select Type] → [Q1: Existing code?] → [Q2: Complexity?] → [Q3: Constraints?]
                      ↓                       ↓                    ↓
              [Update stages]         [Update depth]       [Update stages]
                                                                   ↓
                                                          [Show final workflow]
```

**Acceptance Criteria:**
- [ ] At least 5 questions that affect workflow
- [ ] Visual feedback when stages change
- [ ] Explanation for each stage decision
- [ ] Final workflow reflects all answers
- [ ] Can restart and try different answers

---

### FEATURE-04: Mob Elaboration Walkthrough (US-1.2)

**Goal:** Interactive guided walkthrough of the Mob Elaboration ritual.

**What is Mob Elaboration?**
A 60-minute collaborative session where the team converts an Intent into validated Units with the help of AI.

**Walkthrough Structure:**

1. **Introduction (5 min)**
   - What is Mob Elaboration?
   - Who participates?
   - What's the outcome?

2. **Phase 1: Preparation (15 min simulation)**
   - Intent statement review
   - Context gathering
   - Constraint identification
   - Interactive: User reviews sample intent

3. **Phase 2: Structured Q&A (20 min simulation)**
   - AI generates clarifying questions
   - Team provides answers
   - Interactive: User answers questions about sample project

4. **Phase 3: Unit Decomposition (20 min simulation)**
   - AI proposes unit breakdown
   - Team reviews and adjusts
   - Interactive: User validates/modifies proposed units

5. **Phase 4: Approval (5 min)**
   - Final review of units
   - Acceptance criteria validation
   - Gate decision: Approve/Revise
   - Interactive: User makes gate decision

**Screen Design:**
```
╭──────────────────────────────────────────────────────────────────────────╮
│                    MOB ELABORATION WALKTHROUGH                           │
│                    Phase 2 of 4: Structured Q&A                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CONTEXT: Building an e-commerce checkout system                         │
│                                                                          │
│  ┌─ AI QUESTION ────────────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  "What payment providers need to be supported?"                  │   │
│  │                                                                   │   │
│  │  (A) Stripe only                                                 │   │
│  │  (B) Stripe + PayPal                                             │   │
│  │  (C) Stripe + PayPal + Apple Pay                                 │   │
│  │  (D) Custom payment gateway                                       │   │
│  │                                                                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Your answer affects: Unit scope, NFR complexity, Integration effort    │
│                                                                          │
│  [←] Previous Question    [→] Next Question    [?] Why this matters     │
╰──────────────────────────────────────────────────────────────────────────╯
```

**Acceptance Criteria:**
- [ ] Complete walkthrough of all 4 phases
- [ ] Interactive elements in each phase
- [ ] Realistic sample project scenario
- [ ] Educational tooltips explaining each step
- [ ] Progress indicator
- [ ] Can replay with different choices

---

### FEATURE-05: Mob Construction Walkthrough (US-1.3)

**Goal:** Interactive guided walkthrough of the Mob Construction ritual.

**What is Mob Construction?**
A collaborative session where teams work together, with AI generating code and humans validating, to complete Bolts (small iterations).

**Walkthrough Structure:**

1. **Introduction (5 min)**
   - What is Mob Construction?
   - Bolt concept explained
   - Human-AI collaboration model

2. **Phase 1: Bolt Planning (15 min simulation)**
   - Select unit to work on
   - Define bolt scope
   - Set acceptance criteria
   - Interactive: User scopes a bolt

3. **Phase 2: AI Execution (60 min simulation - compressed)**
   - AI generates code
   - Human reviews in real-time
   - Prompt refinement
   - Interactive: User reviews AI output, provides feedback

4. **Phase 3: Evidence Gathering (30 min simulation)**
   - Run tests
   - Capture validation
   - Document results
   - Interactive: User reviews test results

5. **Phase 4: Guardrail Retro (15 min simulation)**
   - Review AI performance
   - Identify guardrail improvements
   - Update rules
   - Interactive: User identifies improvements

**Screen Design:**
```
╭──────────────────────────────────────────────────────────────────────────╮
│                    MOB CONSTRUCTION WALKTHROUGH                          │
│                    Phase 2 of 4: AI Execution                            │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  BOLT: Implement Stripe payment endpoint                                 │
│                                                                          │
│  ┌─ AI GENERATED CODE ──────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  async def create_payment(amount: int, currency: str):           │   │
│  │      stripe.api_key = os.environ["STRIPE_KEY"]                   │   │
│  │      return stripe.PaymentIntent.create(                         │   │
│  │          amount=amount,                                          │   │
│  │          currency=currency                                        │   │
│  │      )                                                            │   │
│  │                                                                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─ YOUR REVIEW ────────────────────────────────────────────────────┐   │
│  │  ⚠️  Issue: No error handling for API failures                   │   │
│  │  ⚠️  Issue: Amount validation missing                            │   │
│  │  ✓  Good: Uses environment variable for API key                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  What would you do?                                                      │
│  (A) Approve as-is                                                       │
│  (B) Request AI to add error handling                                    │
│  (C) Request AI to add validation + error handling                       │
│  (D) Write the fixes yourself                                            │
│                                                                          │
│  [←] Back    [→] Submit Review    [?] Best Practice                     │
╰──────────────────────────────────────────────────────────────────────────╯
```

**Acceptance Criteria:**
- [ ] Complete walkthrough of all 4 phases
- [ ] Realistic code review scenarios
- [ ] Multiple AI output examples (good and bad)
- [ ] Teaches when to approve vs request changes
- [ ] Shows guardrail improvement process
- [ ] Progress tracking

---

### Design Principles for Teaching Tool

1. **Progressive Disclosure**
   - Start simple, add complexity on demand
   - Core concepts first, details when requested
   - Tooltips for advanced topics

2. **Consistent Navigation**
   - Always show breadcrumb path
   - Consistent back behavior
   - Clear section headers

3. **Visual Learning**
   - Diagrams over text where possible
   - Color-coding for methodology concepts
   - Animations to show process flow

4. **Accessibility**
   - High contrast colors
   - Keyboard navigation for all features
   - Clear focus indicators
   - No time-sensitive interactions

5. **Non-Technical Friendly**
   - Avoid jargon without explanation
   - Glossary always accessible
   - Real-world analogies
   - Business value explanations

---

## Implementation Roadmap

### Phase 1: Critical Fixes (Immediate)
1. BUG-01: Home page layout
2. BUG-02: Lesson display
3. BUG-04: Quiz crashes
4. BUG-03: Simulator enter key

### Phase 2: Usability (Day 2)
5. BUG-05: Mouse support
6. BUG-07: Visual improvements
7. BUG-06: Cleanup cache files

### Phase 3: Core New Features (Days 3-5)
8. FEATURE-01: Methodology comparison animation (2-3 days)
9. FEATURE-02: Transition mapping (2-3 days)

### Phase 4: Interactive Features (Days 6-8)
10. FEATURE-03: Interactive Simulator Q&A (1-2 days)
11. FEATURE-04: Mob Elaboration Walkthrough (1-2 days)
12. FEATURE-05: Mob Construction Walkthrough (1-2 days)

### Phase 5: Polish (Day 9-10)
13. UX optimization pass
14. Testing and validation
15. Documentation update

---

## Validation Plan

After all fixes:
1. Run full test suite
2. Manual testing of all screens
3. Test at different terminal sizes (80x24, 120x40, 200x60)
4. Test mouse-only navigation
5. Test keyboard-only navigation
6. Screenshot comparison before/after

---

**Document Status:** COMPLETE  
**Next Step:** Execute Phase 1 - Critical Fixes
