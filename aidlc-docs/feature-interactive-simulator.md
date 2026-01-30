# Feature Plan: Interactive Simulator Q&A

**Feature ID:** FEATURE-03  
**Priority:** High (Core Feature)  
**Estimated Effort:** 1-2 days  
**Created:** 2026-01-28

---

## Vision

Transform the Stage Simulator from a passive display into an **interactive experience** where user answers to structured questions dynamically affect which stages run and at what depth. This demonstrates the core AI-DLC principle of **adaptive depth** in an engaging way.

---

## Current State

The simulator currently:
- Lets user select request type (Greenfield/Brownfield/Frontend/Bugfix)
- Lets user select risk profile (Low/Medium/High)
- Lets user toggle constraints (Regulated/Security-Critical)
- Shows resulting stages as a static list

**Problem:** The connection between inputs and outputs feels abstract. Users don't understand *why* certain stages run.

---

## Desired State

The simulator will:
- Ask structured questions during the simulation
- Show real-time impact of each answer
- Explain why each stage is included/excluded
- Allow users to experiment with different answers
- Teach adaptive depth through direct experience

---

## User Stories

### US-SIM-01: Question-Driven Flow
**As a** learner  
**I want to** answer questions that affect the workflow  
**So that** I understand how AI-DLC adapts to context

**Acceptance Criteria:**
- [ ] At least 5 questions during simulation
- [ ] Each answer visibly affects stages
- [ ] Can see before/after stage list
- [ ] Clear explanation of impact

### US-SIM-02: Real-Time Feedback
**As a** learner  
**I want to** see stages added/removed as I answer  
**So that** I understand the cause-effect relationship

**Acceptance Criteria:**
- [ ] Stage list updates after each answer
- [ ] Added stages highlighted in green
- [ ] Removed stages highlighted in red
- [ ] Animation shows change

### US-SIM-03: Answer Experimentation
**As a** learner  
**I want to** go back and change answers  
**So that** I can explore different paths

**Acceptance Criteria:**
- [ ] Can navigate back to previous questions
- [ ] Changing answer updates all downstream effects
- [ ] Can restart simulation
- [ ] Can compare final workflows

### US-SIM-04: Impact Explanation
**As a** learner  
**I want to** understand why each stage runs  
**So that** I can apply this in real projects

**Acceptance Criteria:**
- [ ] Each stage shows "included because..." or "skipped because..."
- [ ] Links answers to stage decisions
- [ ] Shows relevant AI-DLC principle

---

## Question Design

### Question Categories

1. **Project Type Questions**
   - Affect major stage selection

2. **Complexity Questions**
   - Affect detail depth within stages

3. **Risk/Compliance Questions**
   - Force additional validation stages

4. **Team Context Questions**
   - Affect collaboration intensity

### Question Bank

```python
SIMULATOR_QUESTIONS = [
    {
        "id": "q-existing-code",
        "prompt": "Does this project have existing code?",
        "options": [
            {"id": "yes", "label": "Yes - modifying existing system"},
            {"id": "no", "label": "No - building from scratch"},
        ],
        "effects": {
            "yes": {"add": ["reverse-engineering"], "remove": []},
            "no": {"add": [], "remove": ["reverse-engineering"]},
        },
        "explanation": {
            "yes": "Reverse Engineering stage added to understand existing codebase before making changes.",
            "no": "Reverse Engineering skipped - no existing code to analyze."
        }
    },
    {
        "id": "q-frontend",
        "prompt": "Does this work include user interface changes?",
        "options": [
            {"id": "yes", "label": "Yes - UI/UX work involved"},
            {"id": "no", "label": "No - backend/API only"},
        ],
        "effects": {
            "yes": {"add": ["browser-validation"], "priority": ["user-stories"]},
            "no": {"add": [], "priority": []},
        },
        "explanation": {
            "yes": "Browser Validation stage added to verify UI behavior. User Stories prioritized for UX flows.",
            "no": "Browser Validation skipped - no UI to validate."
        }
    },
    {
        "id": "q-security",
        "prompt": "Does this system handle sensitive data?",
        "options": [
            {"id": "highly-sensitive", "label": "Highly sensitive (PII, financial, health)"},
            {"id": "moderate", "label": "Moderately sensitive (user accounts)"},
            {"id": "low", "label": "Low sensitivity (public data)"},
        ],
        "effects": {
            "highly-sensitive": {"add": ["nfr-requirements", "nfr-design", "security-review"], "depth": "full"},
            "moderate": {"add": ["nfr-requirements"], "depth": "standard"},
            "low": {"add": [], "depth": "minimal"},
        },
        "explanation": {
            "highly-sensitive": "Full NFR stages + Security Review added. Compliance evidence required.",
            "moderate": "NFR Requirements added for security baseline.",
            "low": "Minimal security overhead - standard practices apply."
        }
    },
    {
        "id": "q-team-size",
        "prompt": "How many people will work on this?",
        "options": [
            {"id": "solo", "label": "Solo (1 person)"},
            {"id": "small", "label": "Small team (2-4 people)"},
            {"id": "large", "label": "Large team (5+ people)"},
        ],
        "effects": {
            "solo": {"add": [], "ceremony": "minimal"},
            "small": {"add": [], "ceremony": "standard"},
            "large": {"add": ["application-design"], "ceremony": "full"},
        },
        "explanation": {
            "solo": "Minimal ceremony - less coordination overhead.",
            "small": "Standard ceremony - balance of speed and coordination.",
            "large": "Full ceremony + Application Design - need clear boundaries for parallel work."
        }
    },
    {
        "id": "q-timeline",
        "prompt": "What's the timeline pressure?",
        "options": [
            {"id": "urgent", "label": "Urgent - need it ASAP"},
            {"id": "normal", "label": "Normal - reasonable schedule"},
            {"id": "flexible", "label": "Flexible - quality over speed"},
        ],
        "effects": {
            "urgent": {"add": [], "skip_optional": true},
            "normal": {"add": [], "skip_optional": false},
            "flexible": {"add": ["comprehensive-testing"], "depth": "thorough"},
        },
        "explanation": {
            "urgent": "Optional stages skipped to accelerate delivery. Risk accepted.",
            "normal": "Balanced approach - recommended stages run.",
            "flexible": "Comprehensive testing added. All recommended stages run."
        }
    },
]
```

---

## Screen Flow

### Overview
```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│  Select    │ ──▶ │  Answer    │ ──▶ │   Answer   │ ──▶ │  Results   │
│  Type      │     │  Q1        │     │   Q2-Q5    │     │  Summary   │
└────────────┘     └────────────┘     └────────────┘     └────────────┘
                         │                  │
                         ▼                  ▼
                   ┌────────────┐     ┌────────────┐
                   │  Show      │     │  Show      │
                   │  Impact    │     │  Impact    │
                   └────────────┘     └────────────┘
```

### Question Screen
```
╭──────────────────────────────────────────────────────────────────────────╮
│                    STAGE SIMULATOR                                       │
│                    Question 2 of 5                                       │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Request Type: 🏗️ Greenfield                                            │
│                                                                          │
│  ┌─ QUESTION ───────────────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  Does this system handle sensitive data?                         │   │
│  │                                                                   │   │
│  │  (A) Highly sensitive (PII, financial, health data)              │   │
│  │  (B) Moderately sensitive (user accounts, preferences)           │   │
│  │  (C) Low sensitivity (public data, no auth required)             │   │
│  │                                                                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─ CURRENT WORKFLOW ───────────────────────────────────────────────┐   │
│  │  🔵 INCEPTION                    🟢 CONSTRUCTION                  │   │
│  │  ├─ ✓ Workspace Detection       ├─ ○ Functional Design          │   │
│  │  ├─ ✓ Requirements Analysis     ├─ ○ Code Generation            │   │
│  │  ├─ ○ User Stories              └─ ○ Build and Test             │   │
│  │  └─ ✓ Workflow Planning                                          │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  [←] Previous    [A-C to answer]    [?] Why This Matters               │
╰──────────────────────────────────────────────────────────────────────────╯
```

### Impact Display
```
╭──────────────────────────────────────────────────────────────────────────╮
│                    IMPACT OF YOUR ANSWER                                 │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  You answered: "Highly sensitive (PII, financial, health data)"         │
│                                                                          │
│  ┌─ CHANGES TO WORKFLOW ────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  ➕ ADDED:                                                        │   │
│  │     • NFR Requirements - Define security requirements            │   │
│  │     • NFR Design - Design security controls                      │   │
│  │     • Security Review - Formal security assessment               │   │
│  │                                                                   │   │
│  │  📊 DEPTH CHANGE:                                                 │   │
│  │     • All stages now run at FULL depth                           │   │
│  │     • Additional compliance evidence required                    │   │
│  │                                                                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  💡 AI-DLC PRINCIPLE: "Adaptive Depth"                                  │
│     The methodology flexes to match the risk profile. High-sensitivity │
│     work requires more rigorous validation, not just more stages.       │
│                                                                          │
│  [Continue to Next Question →]                                          │
╰──────────────────────────────────────────────────────────────────────────╯
```

### Results Summary
```
╭──────────────────────────────────────────────────────────────────────────╮
│                    SIMULATION COMPLETE                                   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  YOUR CONFIGURATION                                                      │
│  ─────────────────                                                       │
│  Request Type: Greenfield                                               │
│  Existing Code: No                                                       │
│  Frontend: Yes                                                           │
│  Sensitivity: High                                                       │
│  Team Size: Small                                                        │
│  Timeline: Normal                                                        │
│                                                                          │
│  RESULTING WORKFLOW                                                      │
│  ─────────────────                                                       │
│                                                                          │
│  🔵 INCEPTION (5 stages)                                                │
│  ├─ ✓ Workspace Detection ──── confirms greenfield                      │
│  ├─ ✓ Requirements Analysis ── because: any project                     │
│  ├─ ✓ User Stories ─────────── because: frontend work                   │
│  ├─ ✓ NFR Requirements ─────── because: high sensitivity                │
│  └─ ✓ Workflow Planning ────── always runs                              │
│                                                                          │
│  🟢 CONSTRUCTION (6 stages)                                             │
│  ├─ ✓ Functional Design ────── because: team size + frontend            │
│  ├─ ✓ NFR Design ───────────── because: high sensitivity                │
│  ├─ ✓ Code Generation ──────── always runs                              │
│  ├─ ✓ Build and Test ───────── always runs                              │
│  ├─ ✓ Browser Validation ───── because: frontend work                   │
│  └─ ✓ Security Review ──────── because: high sensitivity                │
│                                                                          │
│  TOTAL: 11 stages (vs. 6 minimum)                                       │
│                                                                          │
│  [🔄 Try Different Answers]  [📊 Compare Workflows]  [Esc] Back        │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## Data Model

```python
# content/simulator/questions.py

from dataclasses import dataclass, field

@dataclass
class QuestionOption:
    """An option for a simulator question."""
    id: str
    label: str
    
@dataclass
class StageEffect:
    """Effect of an answer on stages."""
    add_stages: list[str] = field(default_factory=list)
    remove_stages: list[str] = field(default_factory=list)
    prioritize_stages: list[str] = field(default_factory=list)
    depth_level: str = "standard"  # minimal, standard, full, thorough

@dataclass
class SimulatorQuestion:
    """A question in the interactive simulator."""
    id: str
    prompt: str
    options: list[QuestionOption]
    effects: dict[str, StageEffect]  # option_id -> effect
    explanations: dict[str, str]  # option_id -> explanation
    principle: str  # AI-DLC principle this demonstrates

@dataclass
class SimulationRun:
    """State of a simulation run."""
    request_type: str
    answers: dict[str, str]  # question_id -> option_id
    active_stages: list[str]
    stage_reasons: dict[str, str]  # stage_id -> reason included
    depth_level: str
    completed: bool = False
```

---

## Implementation Checklist

### Phase 1: Data Layer
- [ ] Create `content/simulator/questions.json`
- [ ] Define 5-7 questions with effects
- [ ] Add explanations for each option
- [ ] Link to AI-DLC principles
- [ ] Unit tests for question loading

### Phase 2: Simulation Engine
- [ ] Create `SimulationEngine` class
- [ ] Implement stage calculation from answers
- [ ] Track stage reasons
- [ ] Support answer changes
- [ ] Unit tests for engine

### Phase 3: UI Updates
- [ ] Update `SimulatorScreen` with question flow
- [ ] Create `QuestionScreen` widget
- [ ] Create `ImpactDisplay` widget
- [ ] Create `ResultsSummary` widget
- [ ] Navigation between questions

### Phase 4: Visual Feedback
- [ ] Stage add/remove animations
- [ ] Before/after comparison view
- [ ] Principle callouts
- [ ] Progress indicator

### Phase 5: Polish
- [ ] Keyboard navigation
- [ ] Mouse support
- [ ] Help text
- [ ] Error handling

---

## Success Metrics

1. **Engagement:** Users answer all questions (>80%)
2. **Experimentation:** Users try multiple answer combinations
3. **Understanding:** Users can explain why stages run
4. **Application:** Users reference simulator when planning real projects

---

**Document Status:** COMPLETE  
**Ready for Implementation:** Yes
