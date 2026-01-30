# Feature Plan: AI-DLC Ritual Walkthroughs

**Feature ID:** FEATURE-04 & FEATURE-05  
**Priority:** High (Core Educational Feature)  
**Estimated Effort:** 3-4 days  
**Created:** 2026-01-28

---

## Vision

Create immersive, interactive walkthroughs of the two key AI-DLC rituals: **Mob Elaboration** (Inception) and **Mob Construction** (Construction). These walkthroughs will teach users exactly how to facilitate and participate in these collaborative sessions by simulating real scenarios.

---

## Why Rituals Matter

AI-DLC isn't just about AI generating code—it's about **how teams collaborate** with AI. The rituals define:
- When humans and AI interact
- What decisions humans make
- How quality is ensured
- How knowledge is captured

Without understanding these rituals, teams will fail to adopt AI-DLC effectively.

---

## User Stories

### US-RW-01: Mob Elaboration Overview
**As a** team member new to AI-DLC  
**I want to** understand what Mob Elaboration is  
**So that** I know what to expect in these sessions

**Acceptance Criteria:**
- [ ] Clear explanation of purpose and outcomes
- [ ] List of participants and their roles
- [ ] Duration and phase breakdown
- [ ] Success criteria for the ritual

### US-RW-02: Mob Elaboration Interactive Walkthrough
**As a** future AI Facilitator  
**I want to** practice facilitating a Mob Elaboration session  
**So that** I can confidently run these sessions

**Acceptance Criteria:**
- [ ] Step-by-step guided simulation
- [ ] Interactive decision points
- [ ] Realistic sample project scenario
- [ ] Feedback on choices made
- [ ] Can replay with different choices

### US-RW-03: Mob Construction Overview
**As a** developer transitioning to AI-DLC  
**I want to** understand how Mob Construction works  
**So that** I know how my role changes

**Acceptance Criteria:**
- [ ] Bolt concept clearly explained
- [ ] Human-AI collaboration model shown
- [ ] Review and validation process detailed
- [ ] Guardrail retro purpose explained

### US-RW-04: Mob Construction Interactive Walkthrough
**As a** Human Validator  
**I want to** practice reviewing AI-generated code  
**So that** I can make good approve/revise decisions

**Acceptance Criteria:**
- [ ] Realistic code review scenarios
- [ ] Good and bad AI output examples
- [ ] Decision impact visualization
- [ ] Best practice guidance
- [ ] Guardrail improvement exercise

### US-RW-05: Ritual Quick Reference
**As a** team running AI-DLC  
**I want to** access ritual checklists during sessions  
**So that** I don't miss important steps

**Acceptance Criteria:**
- [ ] Mob Elaboration checklist
- [ ] Mob Construction checklist
- [ ] Exportable/printable format
- [ ] Key phrases and prompts

---

## Mob Elaboration Deep Dive

### What Is It?
A 60-minute collaborative session where the team converts a high-level **Intent** into validated **Units** with AI assistance.

### Participants
| Role | Responsibility |
|------|----------------|
| Intent Owner | Provides business context, validates outcomes |
| AI Facilitator | Orchestrates session, manages AI interaction |
| Subject Matter Experts | Answer domain questions, validate feasibility |
| AI | Proposes questions, generates unit breakdown |

### Session Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    MOB ELABORATION (60 min)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────┐│
│  │ PREPARATION │ → │ STRUCTURED  │ → │    UNIT     │ → │GATE ││
│  │   15 min    │   │    Q&A      │   │ DECOMPOSE   │   │ 5m  ││
│  │             │   │   20 min    │   │   20 min    │   │     ││
│  └─────────────┘   └─────────────┘   └─────────────┘   └─────┘│
│                                                                 │
│  INPUT: Intent statement                                        │
│  OUTPUT: Validated units with acceptance criteria               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Phase Details

#### Phase 1: Preparation (15 min)
**Purpose:** Ensure everyone understands the intent and context.

**Activities:**
1. Intent Owner reads the intent statement
2. AI Facilitator shares relevant context documents
3. Team identifies constraints and dependencies
4. SMEs flag domain-specific considerations

**AI Interaction:**
- AI summarizes intent
- AI identifies potential ambiguities
- AI suggests clarifying questions

**Interactive Walkthrough Points:**
- User reviews sample intent statement
- User identifies missing information
- User selects relevant constraints

#### Phase 2: Structured Q&A (20 min)
**Purpose:** Resolve ambiguities and gather requirements.

**Activities:**
1. AI generates clarifying questions
2. Team answers questions collaboratively
3. Answers are captured in requirements doc
4. AI refines understanding based on answers

**AI Interaction:**
- AI asks: "What user roles need to be supported?"
- AI asks: "What's the expected data volume?"
- AI asks: "Are there compliance requirements?"

**Interactive Walkthrough Points:**
- User answers 5-7 sample questions
- User sees how answers affect scope
- User learns what makes a good answer

#### Phase 3: Unit Decomposition (20 min)
**Purpose:** Break intent into buildable units.

**Activities:**
1. AI proposes initial unit breakdown
2. Team reviews unit boundaries
3. Team validates dependencies
4. Team refines acceptance criteria

**AI Interaction:**
- AI generates 3-7 proposed units
- AI explains rationale for each
- AI suggests acceptance criteria

**Interactive Walkthrough Points:**
- User reviews proposed units
- User adjusts unit scope
- User validates acceptance criteria

#### Phase 4: Approval Gate (5 min)
**Purpose:** Confirm readiness to proceed to Construction.

**Activities:**
1. Review complete unit list
2. Verify acceptance criteria quality
3. Check for missing units
4. Make go/no-go decision

**Gate Criteria:**
- [ ] All units have clear scope
- [ ] Acceptance criteria are testable
- [ ] Dependencies are identified
- [ ] No ambiguities remain

**Interactive Walkthrough Points:**
- User reviews final unit list
- User identifies issues (if any)
- User makes gate decision

---

## Mob Construction Deep Dive

### What Is It?
A collaborative session where teams work in **Bolts** (short iterations), with AI generating code and humans validating with proof.

### Participants
| Role | Responsibility |
|------|----------------|
| Human Validators | Review AI code, provide feedback |
| AI Facilitator | Manages AI prompts, ensures quality |
| AI | Generates code, tests, documentation |

### Session Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   MOB CONSTRUCTION (2 hrs)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────┐│
│  │    BOLT     │ → │     AI      │ → │  EVIDENCE   │ → │RETRO││
│  │  PLANNING   │   │  EXECUTION  │   │  GATHERING  │   │ 15m ││
│  │   15 min    │   │   60 min    │   │   30 min    │   │     ││
│  └─────────────┘   └─────────────┘   └─────────────┘   └─────┘│
│                                                                 │
│  INPUT: Unit with acceptance criteria                           │
│  OUTPUT: Tested code with validation report                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Phase Details

#### Phase 1: Bolt Planning (15 min)
**Purpose:** Define what the AI will build in this iteration.

**Activities:**
1. Select unit or portion to implement
2. Define bolt scope (4-8 hours of work)
3. Identify acceptance criteria to satisfy
4. Prepare context for AI

**Interactive Walkthrough Points:**
- User selects a unit to work on
- User scopes the bolt
- User prepares context

#### Phase 2: AI Execution (60 min)
**Purpose:** AI generates code with continuous human review.

**Activities:**
1. AI Facilitator prompts AI with context
2. AI generates code in small batches
3. Humans review each batch
4. Feedback refines AI output

**Human Review Checklist:**
- [ ] Code matches design intent
- [ ] Edge cases handled
- [ ] Error handling present
- [ ] Security considerations addressed
- [ ] Tests included

**Interactive Walkthrough Points:**
- User reviews 3-4 code samples
- User identifies issues in each
- User provides feedback to AI
- User sees AI improve based on feedback

#### Phase 3: Evidence Gathering (30 min)
**Purpose:** Prove the code works (not just claim it does).

**Activities:**
1. Run automated tests
2. Execute static analysis
3. Perform security scan
4. Document results in validation report

**Evidence Types:**
- Unit test results
- Integration test results
- Lint/format check results
- Security scan results
- Coverage report

**Interactive Walkthrough Points:**
- User reviews test output
- User identifies gaps in coverage
- User validates acceptance criteria

#### Phase 4: Guardrail Retro (15 min)
**Purpose:** Improve AI collaboration for next time.

**Activities:**
1. Review what AI did well
2. Identify where AI needed correction
3. Update guardrails/rules
4. Share learnings with team

**Questions to Ask:**
- What prompts worked well?
- What prompts needed refinement?
- Did any guardrails trigger?
- Should new guardrails be added?

**Interactive Walkthrough Points:**
- User identifies AI improvement areas
- User suggests guardrail updates
- User documents learnings

---

## Screen Designs

### Walkthrough Navigation
```
╭──────────────────────────────────────────────────────────────────────────╮
│                    RITUAL WALKTHROUGHS                                   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌────────────────────────────────────────────────────────────────┐    │
│   │  🔵 MOB ELABORATION                                            │    │
│   │     Learn to convert Intent into Units                         │    │
│   │     Duration: ~15 min interactive                              │    │
│   │     [Start Walkthrough]                                         │    │
│   └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│   ┌────────────────────────────────────────────────────────────────┐    │
│   │  🟢 MOB CONSTRUCTION                                           │    │
│   │     Learn to review AI code and validate proofs                │    │
│   │     Duration: ~20 min interactive                              │    │
│   │     [Start Walkthrough]                                         │    │
│   └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│   📋 Quick Reference Checklists                                         │
│      [Mob Elaboration Checklist] [Mob Construction Checklist]           │
│                                                                          │
╰──────────────────────────────────────────────────────────────────────────╯
```

### Walkthrough Progress
```
╭──────────────────────────────────────────────────────────────────────────╮
│  MOB ELABORATION WALKTHROUGH                                             │
│  ═══════════════════════════════════════════════════════════════════════│
│                                                                          │
│  Progress: ████████████░░░░░░░░ Phase 2 of 4                            │
│                                                                          │
│  [✓ Preparation] → [▶ Structured Q&A] → [○ Unit Decomposition] → [○ Gate]│
│                                                                          │
╰──────────────────────────────────────────────────────────────────────────╯
```

### Interactive Question
```
╭──────────────────────────────────────────────────────────────────────────╮
│  PHASE 2: STRUCTURED Q&A                            Question 3 of 7     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PROJECT: E-commerce Checkout System                                     │
│                                                                          │
│  ┌─ AI ASKS ────────────────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  "What happens if a payment fails mid-transaction?                │   │
│  │   How should the system handle partial failures?"                 │   │
│  │                                                                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Your response:                                                          │
│                                                                          │
│  (A) Retry automatically up to 3 times, then show error                 │
│  (B) Immediately show error and let user retry manually                 │
│  (C) Queue for background retry and notify user later                   │
│  (D) This needs more analysis - flag for architecture review            │
│                                                                          │
│  💡 TIP: There's no single right answer. Consider user experience       │
│     and system reliability trade-offs.                                   │
│                                                                          │
│  [←] Previous    [A-D to answer]    [?] Why This Matters               │
╰──────────────────────────────────────────────────────────────────────────╯
```

### Code Review Exercise
```
╭──────────────────────────────────────────────────────────────────────────╮
│  PHASE 2: AI EXECUTION - Code Review                      Review 2 of 4 │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  BOLT: Implement payment validation                                      │
│                                                                          │
│  ┌─ AI GENERATED CODE ──────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  def validate_payment(amount, card_number, cvv):                 │   │
│  │      if amount <= 0:                                              │   │
│  │          return False                                             │   │
│  │      if len(card_number) != 16:                                   │   │
│  │          return False                                             │   │
│  │      if len(cvv) != 3:                                            │   │
│  │          return False                                             │   │
│  │      return True                                                  │   │
│  │                                                                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  What issues do you see? (Select all that apply)                        │
│                                                                          │
│  [ ] No type hints                                                       │
│  [ ] CVV can be 3 or 4 digits (Amex uses 4)                             │
│  [ ] Card number validation too simple (Luhn algorithm missing)         │
│  [ ] No logging for failed validations                                   │
│  [ ] Return value not descriptive (True/False vs error details)         │
│  [ ] Sensitive data (card_number, cvv) might be logged                  │
│                                                                          │
│  [Submit Review]    [Show Hints]    [Skip]                              │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## Sample Project Scenario

### E-Commerce Checkout System

**Intent Statement:**
> Build a secure checkout system that allows customers to complete purchases using credit cards, with support for guest checkout and saved payment methods.

**Context:**
- Existing e-commerce platform (brownfield)
- Currently uses legacy payment integration
- Need to support Stripe as new payment provider
- PCI-DSS compliance required
- Mobile and web clients

**Units (for walkthrough):**
1. Payment provider abstraction layer
2. Stripe integration
3. Guest checkout flow
4. Saved payment methods
5. Order confirmation and receipts

This scenario provides:
- Realistic complexity
- Multiple decision points
- Security considerations
- Integration challenges

---

## Data Model

```python
# content/ritual_walkthrough.py

from dataclasses import dataclass, field
from typing import Literal

@dataclass
class WalkthroughStep:
    """A single step in a walkthrough."""
    id: str
    phase: str
    title: str
    content: str
    interaction_type: Literal["info", "question", "code_review", "decision"]
    options: list[dict] | None = None
    correct_answers: list[str] | None = None
    feedback: dict[str, str] | None = None  # answer -> feedback
    tips: list[str] = field(default_factory=list)

@dataclass
class WalkthroughPhase:
    """A phase in the ritual."""
    id: str
    name: str
    duration: str
    purpose: str
    steps: list[WalkthroughStep]

@dataclass
class Ritual:
    """A complete ritual walkthrough."""
    id: str
    name: str
    description: str
    total_duration: str
    phases: list[WalkthroughPhase]
    checklist: list[str]

@dataclass
class WalkthroughState:
    """User's progress through a walkthrough."""
    ritual_id: str
    current_phase: int
    current_step: int
    answers: dict[str, str]
    score: int
    completed: bool
```

---

## Implementation Checklist

### Phase 1: Data Layer
- [ ] Create `content/ritual_walkthrough.py`
- [ ] Define all dataclasses
- [ ] Create Mob Elaboration walkthrough data (7 phases, ~20 steps)
- [ ] Create Mob Construction walkthrough data (7 phases, ~20 steps)
- [ ] Unit tests for data models

### Phase 2: Walkthrough Engine
- [ ] Create `widgets/walkthrough_engine.py`
- [ ] Step navigation (prev/next)
- [ ] Answer tracking
- [ ] Score calculation
- [ ] Feedback display

### Phase 3: Screens
- [ ] Create `screens/ritual_select.py` - Choose which walkthrough
- [ ] Create `screens/walkthrough.py` - Main walkthrough screen
- [ ] Progress indicator widget
- [ ] Interactive elements (questions, code review)

### Phase 4: Code Review Exercise
- [ ] Create sample code snippets (good and bad)
- [ ] Implement multi-select for issues
- [ ] Scoring and feedback
- [ ] Best practice explanations

### Phase 5: Checklists
- [ ] Mob Elaboration checklist content
- [ ] Mob Construction checklist content
- [ ] Export functionality
- [ ] Print-friendly format

### Phase 6: Polish
- [ ] Navigation integration
- [ ] Progress persistence
- [ ] Achievement integration
- [ ] Testing

---

## Success Metrics

1. **Completion Rate:** >70% of users who start complete the walkthrough
2. **Learning:** Users can explain ritual phases after completion
3. **Confidence:** Self-reported readiness to facilitate increases
4. **Reuse:** Users return to walkthroughs before facilitating real sessions

---

**Document Status:** COMPLETE  
**Ready for Implementation:** Yes
