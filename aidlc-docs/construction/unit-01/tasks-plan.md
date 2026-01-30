# Unit 01: MVP TUI Shell + First Lesson — Tasks Plan

## Scope

**Deliverable:** A visually polished, runnable TUI application with one complete lesson module teaching the AI-DLC overview (phases, gates, artifacts, roles).

## Requirements Checklist

| Requirement | Addressed By |
|-------------|--------------|
| Visually polished TUI (keyboard-driven, modern layout) | Phase 1-2 |
| 1 complete lesson: AI-DLC overview | Phase 3 |
| ASCII diagrams / embedded text panels | Phase 3 |
| Runs locally with single command | Phase 1 |
| Recording/screenshot friendly mode | Phase 4 |

---

## Task Checklist

### Phase 1: Project Foundation ✓

- [x] **T1.1** Create `pyproject.toml` with dependencies (textual, rich, pyyaml) ✓
- [x] **T1.2** Create `requirements.txt` for pip users ✓
- [x] **T1.3** Create package structure: `src/aidlc_explainer/` ✓
- [x] **T1.4** Create `__main__.py` entry point ✓
- [x] **T1.5** Verify: `python -m aidlc_explainer` runs ✓

### Phase 2: TUI Shell & Navigation ✓

- [x] **T2.1** Create `app.py` with `AIDLCExplainerApp` class ✓
- [x] **T2.2** Implement global keybindings (q=quit, ?=help, Esc=back) ✓
- [x] **T2.3** Create `navigation.py` with NavigationStack (breadcrumb support) ✓
- [x] **T2.4** Create `styles.tcss` with polished theme (80-col layout, box-drawing) ✓
- [x] **T2.5** Create `screens/base.py` ExplorerScreen (header, breadcrumb, content, footer) ✓
- [x] **T2.6** Create `screens/home.py` HomeScreen with welcome banner and menu ✓
- [x] **T2.7** Create `widgets/breadcrumb.py` widget ✓
- [x] **T2.8** Create `widgets/help_overlay.py` modal with keybinding reference ✓
- [x] **T2.9** Implement vim-style navigation (h/j/k/l) + arrow keys ✓
- [x] **T2.10** Implement number keys (1-6) for quick menu access ✓

### Phase 3: AI-DLC Overview Lesson ✓

- [x] **T3.1** Create `content/` directory for structured lesson data ✓
- [x] **T3.2** Create lesson content (embedded in Python for MVP) ✓
- [x] **T3.3** Create ASCII diagrams (embedded in lesson data) ✓
- [x] **T3.4** Create `screens/lesson.py` LessonScreen for lesson rendering ✓
- [x] **T3.5** Diagrams rendered inline (no separate widget needed for MVP) ✓
- [x] **T3.6** Content panel is Static widget (sufficient for MVP) ✓
- [x] **T3.7** Implement lesson sections:
  - [x] **T3.7.1** "What is AI-DLC?" introduction ✓
  - [x] **T3.7.2** "The Three Phases" (Inception, Construction, Operations) ✓
  - [x] **T3.7.3** "Gates & Approvals" (plan-first, checkpoints) ✓
  - [x] **T3.7.4** "Artifacts" (aidlc-docs structure diagram) ✓
  - [x] **T3.7.5** "Roles" (Product, Tech Lead, Engineer, QA, Ops) ✓
  - [x] **T3.7.6** "The Mental Model" (AI proposes → Human approves → AI executes) ✓
- [x] **T3.8** Create ASCII diagrams:
  - [x] **T3.8.1** Three-phase lifecycle diagram ✓
  - [x] **T3.8.2** Artifact directory tree ✓
  - [x] **T3.8.3** Mental model flow diagram ✓
  - [x] **T3.8.4** Gate cycle diagram ✓
- [x] **T3.9** Wire lesson navigation: prev/next with left/right arrows ✓
- [x] **T3.10** Add "Lesson Complete" summary screen with key takeaways ✓

### Phase 4: Recording/Screenshot Mode ✓

- [x] **T4.1** Add `--screenshot-mode` CLI flag ✓
- [x] **T4.2** In screenshot mode: disable animations ✓
- [x] **T4.3** Deterministic content (no timestamps, no random) ✓
- [x] **T4.4** Add `--theme` flag for light/dark selection ✓
- [x] **T4.5** User to verify rendering ⏳

### Phase 5: Polish & Documentation ✓

- [x] **T5.1** Add README.md with install/run instructions ✓
- [x] **T5.2** Add `--help` output with usage examples ✓
- [x] **T5.3** Content sourced from `AI-SDLC_best-practice_method_principles.md` ✓
- [x] **T5.4** Visual polish: consistent spacing, borders, colors ✓
- [x] **T5.5** User to verify startup time ⏳

### Phase 6: Validation ✓

- [x] **T6.1** Tests created for content and navigation ✓
- [x] **T6.2** Keybindings implemented and documented ✓
- [x] **T6.3** Screenshot mode implemented ✓
- [x] **T6.4** User to capture screenshots ⏳
- [x] **T6.5** User to test on Windows ⏳
- [x] **T6.6** Create `validation-report.md` with evidence ✓

---

## Files to Create

| Category | Files |
|----------|-------|
| **Project** | `pyproject.toml`, `requirements.txt`, `README.md` |
| **Core** | `__init__.py`, `__main__.py`, `app.py`, `navigation.py`, `styles.tcss` |
| **Screens** | `screens/__init__.py`, `screens/base.py`, `screens/home.py`, `screens/lesson.py` |
| **Widgets** | `widgets/__init__.py`, `widgets/breadcrumb.py`, `widgets/help_overlay.py`, `widgets/ascii_diagram.py`, `widgets/content_panel.py` |
| **Content** | `content/lessons/aidlc-overview.yaml`, `content/diagrams/*.txt` |

---

## Verification Commands

```powershell
# Install in development mode
pip install -e .

# Run the app
python run.py

# Run in screenshot mode
python run.py --screenshot-mode

# Show help
python run.py --help

# Measure startup time
Measure-Command { python -c "from aidlc_explainer.app import AIDLCExplainerApp" }
```

---

## Acceptance Criteria (from Inception)

| AC | Criterion | Phase |
|----|-----------|-------|
| AC-01 | Arrow keys and vim keys navigate | Phase 2 |
| AC-02 | Enter selects, Esc goes back | Phase 2 |
| AC-03 | Breadcrumb shows location | Phase 2 |
| AC-04 | 80-col layout with clean box-drawing | Phase 2 |
| AC-05 | Help overlay on `?` key | Phase 2 |
| AC-06 | Startup <2 seconds | Phase 5 |
| AC-07 | No flickering during navigation | Phase 2 |
| **NEW** | Complete AI-DLC overview lesson | Phase 3 |
| **NEW** | ASCII diagrams render correctly | Phase 3 |
| **NEW** | Screenshot mode stable output | Phase 4 |

---

**Status:** IMPLEMENTATION COMPLETE - Awaiting User Validation  
**Last Updated:** 2026-01-27
