# Unit ENG-02: AI-DLC Stage Simulator — Design Document

## Overview

An interactive simulator where users select a request type and the app demonstrates how AI-DLC adapts its workflow, showing which stages run, questions asked, gates required, and artifacts produced.

---

## Data Source

**Primary source:** AWS AI-DLC Workflows GitHub repository  
**URL:** https://github.com/awslabs/aidlc-workflows

### Stage Definitions (from aws-aidlc-rule-details/)

#### INCEPTION PHASE (🔵)

| Stage | File | Always? | Description |
|-------|------|---------|-------------|
| Workspace Detection | inception/workspace-detection.md | Yes | Detect project type (greenfield vs brownfield) |
| Reverse Engineering | inception/reverse-engineering.md | Brownfield | Analyze existing codebase structure |
| Requirements Analysis | inception/requirements-analysis.md | Yes | Elaborate intent into requirements |
| User Stories | inception/user-stories.md | Conditional | Define personas and user journeys |
| Workflow Planning | inception/workflow-planning.md | Yes | Determine stages and create execution plan |
| Application Design | inception/application-design.md | Conditional | High-level component design |
| Units Generation | inception/units-generation.md | Conditional | Break work into parallel units |

#### CONSTRUCTION PHASE (🟢)

| Stage | File | Always? | Description |
|-------|------|---------|-------------|
| Functional Design | construction/functional-design.md | Conditional | Detailed component/API design |
| NFR Requirements | construction/nfr-requirements.md | Conditional | Non-functional requirements |
| NFR Design | construction/nfr-design.md | Conditional | Security, performance design |
| Infrastructure Design | construction/infrastructure-design.md | Conditional | IaC and deployment design |
| Code Generation | construction/code-generation.md | Yes | Implementation |
| Build and Test | construction/build-and-test.md | Yes | Validation and verification |

#### OPERATIONS PHASE (🟡)

| Stage | File | Always? | Description |
|-------|------|---------|-------------|
| Operations | operations/ | Placeholder | Future deployment/monitoring |

---

## Request Types & Adaptive Depth

### Greenfield (New Project)

```
Stages: ALL inception stages (except reverse-engineering)
Focus: Full requirements → design → units → implementation
```

**Stages Executed:**
- ✓ Workspace Detection
- ✗ Reverse Engineering (skip - no existing code)
- ✓ Requirements Analysis
- ✓ User Stories (if UI/UX involved)
- ✓ Workflow Planning
- ✓ Application Design
- ✓ Units Generation
- ✓ Functional Design
- ✓ NFR Requirements (if applicable)
- ✓ NFR Design (if applicable)
- ✓ Infrastructure Design (if applicable)
- ✓ Code Generation
- ✓ Build and Test

### Brownfield (Existing Project)

```
Stages: Includes reverse-engineering, scoped changes
Focus: Understand existing → impact analysis → targeted changes
```

**Stages Executed:**
- ✓ Workspace Detection
- ✓ Reverse Engineering
- ✓ Requirements Analysis
- ✓ Workflow Planning (includes impact analysis)
- ? Application Design (if new components)
- ? Units Generation (if multiple changes)
- ? Functional Design (if component changes)
- ✓ Code Generation
- ✓ Build and Test

### Frontend (UI Changes)

```
Stages: UI-focused, user stories important
Focus: User experience → component changes → visual verification
```

**Stages Executed:**
- ✓ Workspace Detection
- ? Reverse Engineering (if existing UI)
- ✓ Requirements Analysis
- ✓ User Stories (important for UX)
- ✓ Workflow Planning
- ? Application Design (if new pages/components)
- ✓ Functional Design (UI component design)
- ✗ Infrastructure Design (typically skip)
- ✓ Code Generation
- ✓ Build and Test (includes visual testing)

### Bugfix (Issue Resolution)

```
Stages: Minimal, focused on fix
Focus: Reproduce → fix → verify → no regression
```

**Stages Executed:**
- ✓ Workspace Detection
- ✓ Reverse Engineering (understand bug context)
- ✓ Requirements Analysis (bug reproduction criteria)
- ✗ User Stories (skip)
- ✓ Workflow Planning (minimal)
- ✗ Application Design (skip)
- ✗ Units Generation (skip - single fix)
- ✗ Functional Design (skip)
- ✓ Code Generation
- ✓ Build and Test (regression tests)

---

## Data Schema

### Request Types (`content/simulator/request-types.json`)

```json
{
  "$schema": "request-types-v1",
  "types": [
    {
      "id": "greenfield",
      "name": "Greenfield Project",
      "description": "Building a new application from scratch",
      "icon": "🌱",
      "stages": {
        "workspace-detection": { "execute": true, "reason": "Detect empty project" },
        "reverse-engineering": { "execute": false, "reason": "No existing code" },
        "requirements-analysis": { "execute": true, "reason": "Define what to build" },
        "user-stories": { "execute": true, "reason": "Define user journeys" },
        "workflow-planning": { "execute": true, "reason": "Plan execution" },
        "application-design": { "execute": true, "reason": "Design components" },
        "units-generation": { "execute": true, "reason": "Parallel work breakdown" },
        "functional-design": { "execute": true, "reason": "Detailed design" },
        "nfr-requirements": { "execute": true, "reason": "Define NFRs" },
        "nfr-design": { "execute": true, "reason": "Design for NFRs" },
        "infrastructure-design": { "execute": true, "reason": "IaC design" },
        "code-generation": { "execute": true, "reason": "Always required" },
        "build-and-test": { "execute": true, "reason": "Always required" }
      }
    }
  ]
}
```

### Stage Definitions (`content/simulator/stages.json`)

```json
{
  "$schema": "stages-v1",
  "phases": [
    {
      "id": "inception",
      "name": "INCEPTION",
      "color": "blue",
      "icon": "🔵",
      "goal": "Determine WHAT to build and WHY"
    }
  ],
  "stages": [
    {
      "id": "workspace-detection",
      "phase": "inception",
      "name": "Workspace Detection",
      "description": "Analyze project structure to determine if greenfield or brownfield",
      "always_execute": true,
      "questions": [
        {
          "id": "wd-q1",
          "text": "Is there an existing codebase?",
          "type": "single",
          "options": ["Yes - existing project", "No - starting fresh"]
        }
      ],
      "artifacts": ["aidlc-docs/aidlc-state.md"],
      "gate": {
        "name": "Project Type Confirmed",
        "criteria": ["Project type determined", "Workspace analyzed"]
      },
      "source": {
        "local": "references/aidlc-workflows/aidlc-rules/aws-aidlc-rule-details/inception/workspace-detection.md",
        "upstream": "https://github.com/awslabs/aidlc-workflows/blob/main/aidlc-rules/aws-aidlc-rule-details/inception/workspace-detection.md"
      }
    }
  ]
}
```

---

## Screen Flow

```
Home
├── [1] Lessons
├── [2] Practice
├── [3] Simulator ← NEW
│   ├── Select Request Type
│   │   ├── [1] Greenfield
│   │   ├── [2] Brownfield
│   │   ├── [3] Frontend
│   │   └── [4] Bugfix
│   └── Simulation View
│       ├── Stage Timeline (visual)
│       ├── Current Stage Details
│       │   ├── Questions Preview
│       │   ├── Artifacts Preview
│       │   └── Gate Criteria
│       └── Navigation (prev/next stage)
├── [4] Sources
└── [q] Quit
```

---

## UI Layouts

### Request Type Selection

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ AI-SDLC Explainer                                        [?] Help  [q] Quit  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Home > Simulator                                                             │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ╭─ AI-DLC Stage Simulator ──────────────────────────────────────────────╮   │
│  │                                                                       │   │
│  │   Select a request type to see how AI-DLC adapts its workflow:       │   │
│  │                                                                       │   │
│  │   [1] 🌱 Greenfield     New project from scratch                      │   │
│  │   [2] 🔧 Brownfield     Enhance existing codebase                     │   │
│  │   [3] 🎨 Frontend       UI/UX changes                                 │   │
│  │   [4] 🐛 Bugfix         Fix an issue                                  │   │
│  │                                                                       │   │
│  ╰───────────────────────────────────────────────────────────────────────╯   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ 1-4 Select  Esc Back  ? Help  q Quit                                         │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Simulation View - Stage Timeline

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ AI-SDLC Explainer                                        [?] Help  [q] Quit  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Home > Simulator > Greenfield                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│ 🔵 INCEPTION                          🟢 CONSTRUCTION                        │
│ ┌─────────────────────────────┐       ┌─────────────────────────────┐        │
│ │ ● Workspace Detection       │       │ ○ Functional Design         │        │
│ │ ○ Requirements Analysis     │       │ ○ NFR Requirements          │        │
│ │ ○ User Stories              │       │ ○ NFR Design                │        │
│ │ ○ Workflow Planning         │       │ ○ Infrastructure Design     │        │
│ │ ○ Application Design        │       │ ○ Code Generation           │        │
│ │ ○ Units Generation          │       │ ○ Build and Test            │        │
│ └─────────────────────────────┘       └─────────────────────────────┘        │
│                                                                              │
│ ╭─ Workspace Detection (1/11) ───────────────────────────────────────────╮   │
│ │ Purpose: Analyze project structure to determine type                   │   │
│ │                                                                        │   │
│ │ Questions Asked:                                                       │   │
│ │   Q1: Is there an existing codebase?                                   │   │
│ │                                                                        │   │
│ │ Artifacts Produced:                                                    │   │
│ │   • aidlc-docs/aidlc-state.md                                          │   │
│ │                                                                        │   │
│ │ Gate: Project Type Confirmed                                           │   │
│ ╰────────────────────────────────────────────────────────────────────────╯   │
├──────────────────────────────────────────────────────────────────────────────┤
│ ←→ Navigate Stages  Enter View Details  s Sources  Esc Back  q Quit          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Stage Detail View

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ AI-SDLC Explainer                                        [?] Help  [q] Quit  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Home > Simulator > Greenfield > Requirements Analysis                        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ╭─ Requirements Analysis ───────────────────────────────────────────────╮   │
│  │                                                                       │   │
│  │  Phase: 🔵 INCEPTION                                                  │   │
│  │  Purpose: Elaborate intent into detailed requirements                 │   │
│  │                                                                       │   │
│  │  ── Structured Questions ──────────────────────────────────────────   │   │
│  │                                                                       │   │
│  │  Q1: What is the primary business goal?                               │   │
│  │      [Free text response expected]                                    │   │
│  │                                                                       │   │
│  │  Q2: Who are the primary users?                                       │   │
│  │      [ ] Internal team members                                        │   │
│  │      [ ] External customers                                           │   │
│  │      [ ] API consumers                                                │   │
│  │                                                                       │   │
│  │  ── Artifacts Produced ────────────────────────────────────────────   │   │
│  │                                                                       │   │
│  │  • aidlc-docs/inception/requirements.md                               │   │
│  │  • aidlc-docs/inception/requirement-verification-questions.md         │   │
│  │                                                                       │   │
│  │  ── Approval Gate ─────────────────────────────────────────────────   │   │
│  │                                                                       │   │
│  │  Gate: Requirements Approved                                          │   │
│  │  Criteria:                                                            │   │
│  │    ☐ All clarifying questions answered                                │   │
│  │    ☐ Requirements document reviewed                                   │   │
│  │    ☐ User approved to proceed                                         │   │
│  │                                                                       │   │
│  ╰───────────────────────────────────────────────────────────────────────╯   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ ←→ Prev/Next Stage  s Sources  Esc Back  q Quit                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Keybindings

### Simulator Menu

| Key | Action |
|-----|--------|
| `1-4` | Select request type |
| `Esc` | Back |
| `q` | Quit |

### Simulation View

| Key | Action |
|-----|--------|
| `←`/`h` | Previous stage |
| `→`/`l` | Next stage |
| `Enter` | View stage details |
| `s` | View sources |
| `t` | Toggle timeline/detail view |
| `Esc` | Back |

### Stage Detail View

| Key | Action |
|-----|--------|
| `←`/`h` | Previous stage |
| `→`/`l` | Next stage |
| `s` | View stage sources |
| `Esc` | Back to timeline |

---

## File Structure

```
src/aidlc_explainer/
├── screens/
│   ├── simulator.py          # NEW: Request type selection
│   └── simulation_view.py    # NEW: Stage timeline + details
└── content/
    └── simulator/
        ├── request-types.json  # Request type definitions
        └── stages.json         # Stage definitions with questions/artifacts/gates
```

---

## Acceptance Criteria

| AC | Criterion | Verification |
|----|-----------|--------------|
| AC-01 | Simulator accessible from home menu | Navigate Home → Simulator |
| AC-02 | 4 request types selectable | UI shows greenfield/brownfield/frontend/bugfix |
| AC-03 | Stage timeline shows phases | Visual phase grouping |
| AC-04 | Stages show execute/skip status | Different styling for each |
| AC-05 | Stage details show questions | Sample questions displayed |
| AC-06 | Stage details show artifacts | Artifact paths listed |
| AC-07 | Stage details show gate criteria | Gate name + criteria shown |
| AC-08 | All stage data from JSON | No hardcoded stage info |
| AC-09 | Sources traceable | Each stage has source reference |
| AC-10 | Keyboard navigation works | Arrow keys navigate stages |

---

## Content Sources

All stage definitions must trace to:

| Content | Local Path | Upstream URL |
|---------|------------|--------------|
| Stage rules | references/aidlc-workflows/aidlc-rules/ | https://github.com/awslabs/aidlc-workflows |
| Workflow overview | AI-SDLC_best-practice_method_principles.md | AWS AI-DLC Blog |

**Note:** If `references/aidlc-workflows/` is not populated, stage data should be derived from `AI-SDLC_best-practice_method_principles.md` (lines 74-183) which documents the same stages.

---

**Status:** IMPLEMENTED  
**Last Updated:** 2026-01-28
