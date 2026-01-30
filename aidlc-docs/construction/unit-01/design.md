# Unit 01: MVP TUI Shell + First Lesson — Design Document

## Overview

Build a polished TUI application that teaches the AI-DLC methodology through an interactive lesson module. The MVP includes the shell infrastructure and one complete lesson covering AI-DLC phases, gates, artifacts, and roles.

---

## Technology Choice

**Stack:** Python 3.11+ with Textual framework

| Criterion | Decision | Rationale |
|-----------|----------|-----------|
| **TUI Framework** | Textual | Modern, reactive, CSS-like styling, great for polished UIs |
| **Content Format** | YAML | Human-readable, easy to edit, supports multiline text |
| **Diagrams** | ASCII in text files | No external deps, works everywhere, screenshot-friendly |
| **Distribution** | pip install | No admin required, cross-platform |

### Dependencies

```
textual>=0.47.0      # TUI framework
rich>=13.0.0         # Rich text rendering
pyyaml>=6.0          # Content loading
```

---

## UI Layout

### Main Layout (80×24 standard terminal)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ AI-SDLC Explainer                                        [?] Help  [q] Quit  │ ← Header
├──────────────────────────────────────────────────────────────────────────────┤
│ Home > Lessons > AI-DLC Overview > The Three Phases                          │ ← Breadcrumb
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ╭─ The Three Phases ────────────────────────────────────────────────────╮   │
│  │                                                                       │   │
│  │  AI-DLC organizes work into three phases:                             │   │
│  │                                                                       │   │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                │   │
│  │  │  INCEPTION  │───▶│CONSTRUCTION │───▶│ OPERATIONS  │                │   │ ← Content
│  │  │  (What/Why) │    │   (How)     │    │ (Run/Mon)   │                │   │    Area
│  │  └─────────────┘    └─────────────┘    └─────────────┘                │   │
│  │                                                                       │   │
│  │  Each phase has mandatory gates requiring human approval.             │   │
│  │                                                                       │   │
│  ╰───────────────────────────────────────────────────────────────────────╯   │
│                                                                              │
│                                                    [1/6]  ← Prev  Next →     │ ← Progress
├──────────────────────────────────────────────────────────────────────────────┤
│ ↑↓ Navigate  Enter Select  ←→ Prev/Next  Esc Back  ? Help  q Quit            │ ← Footer
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Navigation Map

```
Home
├── [1] Lessons
│   └── AI-DLC Overview (Unit 1 - the complete lesson)
│       ├── What is AI-DLC?
│       ├── The Three Phases
│       ├── Gates & Approvals
│       ├── Artifacts
│       ├── Roles
│       ├── The Mental Model
│       └── Summary / Key Takeaways
├── [2] Phases (placeholder - future unit)
├── [3] Principles (placeholder - future unit)
├── [4] Artifacts (placeholder - future unit)
├── [5] Quiz (placeholder - future unit)
└── [6] Quick Reference (placeholder - future unit)
```

---

## Content Structure

### Lesson YAML Format

```yaml
# content/lessons/aidlc-overview.yaml
id: aidlc-overview
title: "AI-DLC Overview"
description: "Learn the fundamentals of AI-Driven Development Lifecycle"
sections:
  - id: what-is-aidlc
    title: "What is AI-DLC?"
    content: |
      AI-DLC is an AI-centric approach to software development...
    diagram: null
    
  - id: three-phases
    title: "The Three Phases"
    content: |
      AI-DLC organizes work into three phases...
    diagram: "three-phases.txt"
    
  - id: gates
    title: "Gates & Approvals"
    content: |
      Every phase has mandatory approval gates...
    diagram: "gate-flow.txt"
    
  # ... more sections
```

### ASCII Diagram Format

```
# content/diagrams/three-phases.txt
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  INCEPTION  │───▶│CONSTRUCTION │───▶│ OPERATIONS  │
│  (What/Why) │    │   (How)     │    │ (Run/Mon)   │
└─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │
      ▼                  ▼                  ▼
  ┌───────┐          ┌───────┐          ┌───────┐
  │ GATE  │          │ GATE  │          │ GATE  │
  └───────┘          └───────┘          └───────┘
```

---

## Lesson Content (AI-DLC Overview)

### Section 1: What is AI-DLC?

**Key Points:**
- AI-DLC = AI-Driven Development Lifecycle
- AI proposes plans, asks questions, implements after validation
- Humans own decisions; AI executes within bounds
- Not "SDLC + copilots" — a fundamentally different workflow

**Source:** AWS Blog, synthesis document Section 1

### Section 2: The Three Phases

**Diagram:** Three boxes (Inception → Construction → Operations)

**Key Points:**
- **Inception:** WHAT + WHY (requirements, units, acceptance criteria)
- **Construction:** HOW (design, code, tests, per-unit)
- **Operations:** WHERE/WHEN (IaC, CI/CD, observability)

**Source:** Synthesis document Section 2

### Section 3: Gates & Approvals

**Diagram:** Flow with gate checkpoints

**Key Points:**
- Plan-first, stage-by-stage
- Every meaningful step needs approval gate
- "Proof over prose" — evidence required

**Source:** Synthesis document Principles 2, 6

### Section 4: Artifacts

**Diagram:** Directory tree of `aidlc-docs/`

**Key Points:**
- Persisted artifacts are first-class (Principle 4)
- State file, execution plan, audit log
- Phase-specific directories (inception/, construction/, operations/)

**Source:** Synthesis document Section 3

### Section 5: Roles

**Key Points (no diagram, text list):**
- **Product/Domain:** intent, success metrics
- **Tech Lead/Architect:** unit boundaries, NFRs
- **Engineer(s):** implementation + tests
- **QA:** test strategy, acceptance evidence
- **Security:** threat modeling, controls
- **Ops/SRE:** deployability, observability
- **AI Workflow Maintainer:** prompts/rules as code

**Source:** Synthesis document Section 8

### Section 6: The Mental Model

**Diagram:** Circular flow

**Key Points:**
- AI creates plan → asks clarifying questions → implements after validation
- This pattern repeats rapidly for every SDLC activity
- Humans make critical decisions; AI handles routine execution

**Source:** AWS Blog, synthesis document intro

### Section 7: Summary & Key Takeaways

**Key Points (bulleted list):**
1. AI-DLC has 3 phases: Inception, Construction, Operations
2. Gates require human approval before proceeding
3. Artifacts persist in-repo, not in chat
4. 10 core principles guide the methodology
5. Roles shift from "doing" to "approving and designing"

---

## Screenshot Mode

### CLI Interface

```bash
# Normal mode
python -m aidlc_explainer

# Screenshot mode (stable output)
python -m aidlc_explainer --screenshot-mode

# Theme selection
python -m aidlc_explainer --theme dark
python -m aidlc_explainer --theme light
```

### Screenshot Mode Behavior

| Feature | Normal Mode | Screenshot Mode |
|---------|-------------|-----------------|
| Animations | Enabled | Disabled |
| Terminal size | Auto-detect | Fixed 80×24 |
| Timestamps | Shown | Hidden |
| Random elements | Allowed | Disabled |
| Cursor blink | System default | Disabled |

---

## File Structure

```
src/aidlc_explainer/
├── __init__.py
├── __main__.py           # CLI entry point with argparse
├── app.py                # AIDLCExplainerApp
├── navigation.py         # NavigationStack
├── styles.tcss           # Textual CSS
├── screens/
│   ├── __init__.py
│   ├── base.py           # ExplorerScreen base class
│   ├── home.py           # HomeScreen with menu
│   └── lesson.py         # LessonScreen for lesson content
├── widgets/
│   ├── __init__.py
│   ├── breadcrumb.py
│   ├── help_overlay.py
│   ├── ascii_diagram.py  # Renders ASCII diagrams from files
│   └── content_panel.py  # Rich text content rendering
└── content/
    ├── lessons/
    │   └── aidlc-overview.yaml
    └── diagrams/
        ├── three-phases.txt
        ├── artifact-tree.txt
        ├── gate-flow.txt
        └── mental-model.txt
```

---

## Component Design

### LessonScreen

```python
class LessonScreen(ExplorerScreen):
    """Screen for displaying lesson content with sections."""
    
    def __init__(self, lesson_id: str):
        self.lesson = load_lesson(lesson_id)
        self.current_section = 0
    
    def compose_content(self):
        yield ContentPanel(self.current_section_content)
        if self.current_section_diagram:
            yield AsciiDiagram(self.current_section_diagram)
        yield LessonProgress(self.current_section, len(self.lesson.sections))
    
    BINDINGS = [
        ("left", "prev_section", "Previous"),
        ("right", "next_section", "Next"),
    ]
```

### AsciiDiagram Widget

```python
class AsciiDiagram(Static):
    """Widget that renders ASCII diagrams from text files."""
    
    DEFAULT_CSS = """
    AsciiDiagram {
        border: round $primary;
        padding: 1;
        background: $surface;
        text-align: center;
    }
    """
    
    def __init__(self, diagram_path: str):
        content = load_diagram(diagram_path)
        super().__init__(content)
```

---

## Acceptance Criteria Verification

| Criterion | How Verified |
|-----------|--------------|
| Polished TUI | Visual inspection, screenshot comparison |
| Complete lesson | Walkthrough all 7 sections |
| ASCII diagrams | Diagrams render correctly in 80-col terminal |
| Single command | `python -m aidlc_explainer` works |
| Screenshot mode | `--screenshot-mode` produces stable output |

---

**Status:** PENDING APPROVAL  
**Last Updated:** 2026-01-27
