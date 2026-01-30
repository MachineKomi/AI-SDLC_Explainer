# Unit ENG-01: Engagement MVP — Design Document

## Overview

Add interactive "Practice" mode to the AI-SDLC Explainer TUI with:
- Quiz Engine (multiple-choice, data-driven)
- Gatekeeper Scenarios (approve/reject with reasoning)
- Progress persistence
- Sources reference screen

---

## Screen Flow Map

```
Home
├── [1] Lessons (existing)
│   └── AI-DLC Overview
├── [2] Practice ← NEW
│   ├── [1] Quiz
│   │   ├── Question 1..12
│   │   ├── Score Summary
│   │   └── Review Mistakes
│   └── [2] Gatekeeper Scenarios
│       ├── Scenario 1..4
│       └── Score Summary
├── [3] Sources ← NEW
│   ├── Local Sources
│   └── Upstream Sources
├── [4] Phases (placeholder)
├── [5] Principles (placeholder)
└── [q] Quit
```

---

## Data Schemas

### Quiz Schema (`content/practice/quiz.json`)

```json
{
  "$schema": "quiz-v1",
  "title": "AI-DLC Knowledge Quiz",
  "description": "Test your understanding of AI-DLC concepts",
  "questions": [
    {
      "id": "q1",
      "prompt": "What are the three phases of AI-DLC?",
      "options": [
        "Planning, Development, Testing",
        "Inception, Construction, Operations",
        "Design, Build, Deploy",
        "Analysis, Implementation, Maintenance"
      ],
      "correct": 1,
      "explanation": "AI-DLC has three phases: Inception (what/why), Construction (how), and Operations (run/monitor).",
      "sources": {
        "local": ["AI-SDLC_best-practice_method_principles.md#L76"],
        "upstream": ["https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/"]
      }
    }
  ]
}
```

**Field Definitions:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique question identifier |
| prompt | string | Yes | The question text |
| options | string[] | Yes | 4 answer options (0-indexed) |
| correct | int | Yes | Index of correct answer (0-3) |
| explanation | string | Yes | Explanation shown after answer |
| sources.local | string[] | Yes | Local file paths with line refs |
| sources.upstream | string[] | No | External URLs for reference |

### Gatekeeper Schema (`content/practice/gates.json`)

```json
{
  "$schema": "gates-v1",
  "title": "Gatekeeper Practice",
  "description": "Practice reviewing AI-generated plans",
  "scenarios": [
    {
      "id": "g1",
      "phase": "Inception",
      "stage": "Requirements Analysis",
      "context": "You are reviewing an AI-generated requirements document for a user authentication feature.",
      "ai_plan": "## Requirements\n1. Users can log in with email/password\n2. Users can reset passwords\n3. Session management\n\n## Implementation Plan\n- Start coding immediately\n- Add tests later",
      "flaws": [
        "No acceptance criteria defined",
        "Missing NFRs (security, performance)",
        "Skips design phase",
        "Tests deferred (should be concurrent)"
      ],
      "decisions": {
        "correct_action": "reject",
        "valid_reasons": [
          "Missing acceptance criteria",
          "No security requirements",
          "Skips mandatory design stage",
          "Test strategy not defined"
        ],
        "invalid_reasons": [
          "Too many requirements",
          "Should use different auth method"
        ]
      },
      "evidence_checklist": [
        "Acceptance criteria for each requirement",
        "Security NFRs (encryption, session timeout)",
        "Performance NFRs (login latency)",
        "Test strategy document",
        "Design approval before coding"
      ],
      "sources": {
        "local": ["AI-SDLC_best-practice_method_principles.md#L86-99"],
        "upstream": ["https://github.com/aws-samples/sample-aidlc-workflows"]
      }
    }
  ]
}
```

**Field Definitions:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique scenario identifier |
| phase | string | Yes | AI-DLC phase (Inception/Construction/Operations) |
| stage | string | Yes | Specific stage within phase |
| context | string | Yes | Setup text for the scenario |
| ai_plan | string | Yes | The AI-generated plan with deliberate flaws |
| flaws | string[] | Yes | List of flaws (for scoring reference) |
| decisions.correct_action | string | Yes | "approve" or "reject" |
| decisions.valid_reasons | string[] | Yes | Reasons that count as correct |
| decisions.invalid_reasons | string[] | Yes | Distractor reasons |
| evidence_checklist | string[] | Yes | What would be needed to approve |
| sources | object | Yes | Same as quiz sources |

### State Schema (`.aidlc-explainer/state.json`)

```json
{
  "$schema": "state-v1",
  "version": "1.0.0",
  "last_updated": "2026-01-28T12:00:00Z",
  "quiz": {
    "completed": true,
    "last_score": 10,
    "total_questions": 12,
    "attempts": 2,
    "mistakes": ["q3", "q7"]
  },
  "gatekeeper": {
    "completed": true,
    "last_score": 3,
    "total_scenarios": 4,
    "attempts": 1,
    "mistakes": ["g2"]
  }
}
```

---

## UI Layouts

### Practice Menu Screen

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ AI-SDLC Explainer                                        [?] Help  [q] Quit  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Home > Practice                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ╭─ Practice Mode ───────────────────────────────────────────────────────╮   │
│  │                                                                       │   │
│  │   Test your understanding of AI-DLC concepts.                         │   │
│  │                                                                       │   │
│  │   [1] Quiz              12 questions • Best: 10/12                    │   │
│  │   [2] Gatekeeper        4 scenarios  • Best: 3/4                      │   │
│  │                                                                       │   │
│  │   ─────────────────────────────────────────────────                   │   │
│  │   [r] Reset Progress                                                  │   │
│  │                                                                       │   │
│  ╰───────────────────────────────────────────────────────────────────────╯   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ 1-2 Select  r Reset  Esc Back  ? Help  q Quit                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Quiz Question Screen

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ AI-SDLC Explainer                                        [?] Help  [q] Quit  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Home > Practice > Quiz                                              [3/12]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ╭─ Question 3 ──────────────────────────────────────────────────────────╮   │
│  │                                                                       │   │
│  │  What does "proof over prose" mean in AI-DLC?                         │   │
│  │                                                                       │   │
│  │  [a] Documentation is more important than code                        │   │
│  │  [b] Evidence (tests, checks) required, not just claims               │   │
│  │  [c] Written requirements over verbal agreements                      │   │
│  │  [d] Formal proofs for all algorithms                                 │   │
│  │                                                                       │   │
│  ╰───────────────────────────────────────────────────────────────────────╯   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ a-d Answer  ←→ Navigate  s Sources  Esc Back  q Quit                         │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Quiz Feedback Screen

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ AI-SDLC Explainer                                        [?] Help  [q] Quit  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Home > Practice > Quiz                                              [3/12]   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ╭─ ✓ Correct! ──────────────────────────────────────────────────────────╮   │
│  │                                                                       │   │
│  │  "Proof over prose" means objective evidence is required:             │   │
│  │  tests passing, checks green, runtime behavior validated.             │   │
│  │                                                                       │   │
│  │  ─────────────────────────────────────────────────────────            │   │
│  │  Source: AI-SDLC_best-practice_method_principles.md (line 52-54)      │   │
│  │                                                                       │   │
│  ╰───────────────────────────────────────────────────────────────────────╯   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ Enter/→ Next  s View Sources  Esc Back  q Quit                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Gatekeeper Scenario Screen

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ AI-SDLC Explainer                                        [?] Help  [q] Quit  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Home > Practice > Gatekeeper                                        [1/4]    │
├──────────────────────────────────────────────────────────────────────────────┤
│  Phase: INCEPTION  │  Stage: Requirements Analysis                           │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Context: You are reviewing an AI-generated requirements document.           │
│                                                                              │
│  ╭─ AI Proposed Plan ────────────────────────────────────────────────────╮   │
│  │ ## Requirements                                                       │   │
│  │ 1. Users can log in with email/password                               │   │
│  │ 2. Users can reset passwords                                          │   │
│  │ ## Implementation Plan                                                │   │
│  │ - Start coding immediately                                            │   │
│  ╰───────────────────────────────────────────────────────────────────────╯   │
│                                                                              │
│  Your Decision:  [A] Approve    [R] Reject                                   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ a Approve  r Reject  Esc Back  q Quit                                        │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Gatekeeper Reasons Screen (after decision)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ AI-SDLC Explainer                                        [?] Help  [q] Quit  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Home > Practice > Gatekeeper                                        [1/4]    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  You chose: REJECT                                                           │
│                                                                              │
│  Select your reasons (space to toggle, enter to submit):                     │
│                                                                              │
│  [x] Missing acceptance criteria                                             │
│  [x] No security requirements                                                │
│  [ ] Too many requirements                                                   │
│  [x] Skips mandatory design stage                                            │
│  [ ] Should use different auth method                                        │
│  [x] Test strategy not defined                                               │
│                                                                              │
│                                                   [Submit Reasons]           │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ ↑↓ Navigate  Space Toggle  Enter Submit  Esc Back  q Quit                    │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Sources Screen

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ AI-SDLC Explainer                                        [?] Help  [q] Quit  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Home > Sources                                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ╭─ Local Sources ───────────────────────────────────────────────────────╮   │
│  │                                                                       │   │
│  │  • AI-SDLC_best-practice_method_principles.md                         │   │
│  │    Synthesis of AI-DLC methodology from AWS + practitioners           │   │
│  │                                                                       │   │
│  │  • references/aidlc-workflows/README.md (pending)                     │   │
│  │    AWS AI-DLC workflow definitions                                    │   │
│  │                                                                       │   │
│  ╰───────────────────────────────────────────────────────────────────────╯   │
│                                                                              │
│  ╭─ Upstream Sources (URLs) ─────────────────────────────────────────────╮   │
│  │                                                                       │   │
│  │  • AWS AI-DLC Blog                                                    │   │
│  │    https://aws.amazon.com/blogs/devops/ai-driven-development-...      │   │
│  │                                                                       │   │
│  │  • AWS AI-DLC Workflows (GitHub)                                      │   │
│  │    https://github.com/aws-samples/sample-aidlc-workflows              │   │
│  │                                                                       │   │
│  ╰───────────────────────────────────────────────────────────────────────╯   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ ↑↓ Scroll  Esc Back  q Quit                                                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Keybindings Per Screen

### Global (all screens)

| Key | Action |
|-----|--------|
| `q` | Quit application |
| `?` | Show help overlay |
| `Esc` | Go back / Cancel |

### Home Screen

| Key | Action |
|-----|--------|
| `1-6` | Select menu item |
| `↑↓` / `jk` | Navigate menu |
| `Enter` | Select item |

### Practice Menu

| Key | Action |
|-----|--------|
| `1` | Start Quiz |
| `2` | Start Gatekeeper |
| `r` | Reset Progress |

### Quiz Screen

| Key | Action |
|-----|--------|
| `a-d` / `1-4` | Select answer |
| `←→` | Previous/Next question |
| `s` | View sources |
| `Enter` | Submit / Next |

### Quiz Results

| Key | Action |
|-----|--------|
| `r` | Restart quiz |
| `m` | Review mistakes |
| `Enter` | Return to Practice |

### Gatekeeper Screen

| Key | Action |
|-----|--------|
| `a` | Approve |
| `r` | Reject |
| `Space` | Toggle reason (in reasons mode) |
| `Enter` | Submit reasons |
| `←→` | Previous/Next scenario |
| `s` | View sources |

### Sources Screen

| Key | Action |
|-----|--------|
| `↑↓` | Scroll |

---

## File Structure (Changes)

```
src/aidlc_explainer/
├── app.py                    # MODIFY: add practice/sources routing
├── state.py                  # NEW: StateManager class
├── screens/
│   ├── home.py               # MODIFY: update menu items
│   ├── base.py               # MODIFY: add help bar support
│   ├── practice.py           # NEW: Practice menu screen
│   ├── quiz.py               # NEW: Quiz engine screen
│   ├── gatekeeper.py         # NEW: Gatekeeper scenarios screen
│   └── sources.py            # NEW: Sources reference screen
├── widgets/
│   └── help_bar.py           # NEW: Context-aware help bar
└── content/
    └── practice/
        ├── quiz.json         # NEW: Quiz questions
        └── gates.json        # NEW: Gatekeeper scenarios

.aidlc-explainer/             # NEW: User state directory
└── state.json                # Progress persistence

tests/
├── test_quiz_schema.py       # NEW: Quiz JSON validation
├── test_gates_schema.py      # NEW: Gates JSON validation
└── test_state.py             # NEW: State save/load/reset
```

---

## Content Sources Mapping

All quiz questions and gatekeeper scenarios must trace to:

| Content Topic | Local Source | Lines | Upstream URL |
|---------------|--------------|-------|--------------|
| Three phases | AI-SDLC_best-practice_method_principles.md | 74-139 | AWS AI-DLC Blog |
| 10 Principles | AI-SDLC_best-practice_method_principles.md | 30-71 | AWS AI-DLC Blog |
| Artifact model | AI-SDLC_best-practice_method_principles.md | 142-183 | GitHub workflows |
| Gates & approvals | AI-SDLC_best-practice_method_principles.md | 38-39, 99, 122, 138 | AWS AI-DLC Blog |
| Roles | AI-SDLC_best-practice_method_principles.md | 300-314 | AWS AI-DLC Blog |
| Proof over prose | AI-SDLC_best-practice_method_principles.md | 52-54 | AWS AI-DLC Blog |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| State file corruption | Validate schema on load, fallback to defaults |
| Quiz/Gates JSON invalid | Schema validation in tests, fail gracefully |
| Large state file | Minimal schema, no question history stored |
| File permission issues | Try/catch with user-friendly error messages |

---

**Status:** PENDING APPROVAL  
**Last Updated:** 2026-01-28
