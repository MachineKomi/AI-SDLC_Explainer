# Functional Requirements

## User Stories

| ID | Story | Priority |
|----|-------|----------|
| US-01 | As a learner, I want to navigate through AI-DLC concepts in a structured sequence so I can build understanding progressively | Must |
| US-02 | As a learner, I want to explore the 3 phases (Inception, Construction, Operations) with explanations and examples | Must |
| US-03 | As a learner, I want to review the 10 core principles with practical guidance on each | Must |
| US-04 | As a learner, I want to take quizzes to test my understanding and get immediate feedback | Should |
| US-05 | As a learner, I want to search/filter content by topic or keyword | Should |
| US-06 | As a learner, I want to see the artifact model and directory structure used in AI-DLC projects | Must |
| US-07 | As a learner, I want to access a quick-reference card summarizing key concepts | Should |
| US-08 | As a user, I want to install the tool with a single command and no admin privileges | Must |
| US-09 | As a user, I want the TUI to render cleanly for screenshots and terminal recordings | Must |
| US-10 | As a user, I want to run the tool fully offline after installation | Must |

---

## Feature List (MoSCoW)

### Must Have

| ID | Feature | Acceptance Criteria |
|----|---------|---------------------|
| F-01 | **TUI Navigation** | Arrow keys/vim keys navigate; Enter selects; q/Esc exits; breadcrumb shows location |
| F-02 | **Phase Explorer** | Dedicated screens for Inception, Construction, Operations with descriptions |
| F-03 | **Principles Reference** | All 10 principles listed with expandable explanations and examples |
| F-04 | **Artifact Model Viewer** | Shows recommended `aidlc-docs/` structure with file descriptions |
| F-05 | **Local-First Install** | Installs to user directory; no sudo/admin; single binary or pip/npm install |
| F-06 | **Offline Operation** | All content bundled; zero network calls at runtime |
| F-07 | **Screenshot-Friendly Rendering** | Fixed-width layout; no animations that break static capture; clean borders |

### Should Have

| ID | Feature | Acceptance Criteria |
|----|---------|---------------------|
| F-08 | **Interactive Quiz** | Multiple-choice questions per section; score displayed; retry option |
| F-09 | **Search/Filter** | Type to filter topics; highlights matches; instant results |
| F-10 | **Quick Reference Card** | Single-screen summary of phases, principles, rituals; exportable as text |
| F-11 | **Progress Tracking** | Shows which sections completed; persists across sessions (local file) |

### Could Have

| ID | Feature | Acceptance Criteria |
|----|---------|---------------------|
| F-12 | **Ritual Walkthroughs** | Step-by-step guides for Mob Elaboration and Mob Construction |
| F-13 | **Glossary** | Searchable definitions (Bolt, Unit, Gate, etc.) |
| F-14 | **Export Notes** | User can export session notes/highlights to markdown |

### Won't Have (this version)

| ID | Feature | Rationale |
|----|---------|-----------|
| F-15 | Web UI | Out of scope; TUI-first for portability and shareability |
| F-16 | AI Chat Integration | Adds complexity and network dependency |
| F-17 | Multi-user/Auth | Local single-user tool |

---

## Constraints

| Constraint | Requirement |
|------------|-------------|
| **Local-First** | Must run entirely on local machine; no cloud backend |
| **No Admin Install** | Must install without sudo (Linux/macOS) or Administrator (Windows) |
| **TUI Primary** | Terminal UI is the only interface; no GUI dependencies |
| **Screenshot/Video Friendly** | Static layouts; configurable color themes; no flickering |
| **Single Artifact** | Distributed as single binary or minimal package (≤3 dependencies) |

---

**Status:** DRAFT  
**Last Updated:** 2026-01-27
