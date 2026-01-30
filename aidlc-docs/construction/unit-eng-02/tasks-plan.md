# Unit ENG-02: AI-DLC Stage Simulator — Tasks Plan

## Scope

**Deliverable:** An interactive simulator demonstrating how AI-DLC adapts its workflow based on request type (greenfield/brownfield/frontend/bugfix).

## Requirements Checklist

| Requirement | Addressed By |
|-------------|--------------|
| Request type selection (4 types) | Phase 1 |
| Stage timeline visualization | Phase 2 |
| Questions preview per stage | Phase 2 |
| Artifacts preview per stage | Phase 2 |
| Gate criteria display | Phase 2 |
| Adaptive depth (execute/skip) | Phase 1 data |
| Data-driven from JSON | Phase 1 |
| Source references | All content |

---

## Task Checklist

### Phase 1: Data Model & Content

- [x] **T1.1** Create `content/simulator/` directory ✓
- [x] **T1.2** Create `content/simulator/stages.json` with all stage definitions: ✓
  - [x] 7 Inception stages ✓
  - [x] 6 Construction stages ✓
  - [x] Each with: id, phase, name, description, questions[], artifacts[], gate{} ✓
  - [x] Each with source references (local + upstream) ✓
- [x] **T1.3** Create `content/simulator/request-types.json` with 4 types: ✓
  - [x] Greenfield (new project) ✓
  - [x] Brownfield (existing project) ✓
  - [x] Frontend (UI changes) ✓
  - [x] Bugfix (issue resolution) ✓
  - [x] Each with stage execute/skip decisions + rationale ✓
- [x] **T1.4** Verify all stage names match AWS aidlc-workflows repository ✓

### Phase 2: Simulator Screens

- [x] **T2.1** Create `screens/simulator.py` with SimulatorScreen: ✓
  - [x] Request type menu (4 options) ✓
  - [x] Description for each type ✓
  - [x] Keyboard selection (1-4) ✓
  - [x] Risk profile selection (low/medium/high) ✓
  - [x] Constraints selection (regulated, security-critical) ✓
- [x] **T2.2** Create `screens/simulation_view.py` with SimulationViewScreen: ✓
  - [x] Load stages.json and request-types.json ✓
  - [x] Filter stages based on selected request type ✓
  - [x] Stage timeline with phase grouping ✓
  - [x] Execute/Skip visual distinction ✓
- [x] **T2.3** Implement stage detail panel: ✓
  - [x] Stage name and description ✓
  - [x] Questions preview (sample questions) ✓
  - [x] Artifacts produced (file paths) ✓
  - [x] Gate criteria checklist ✓
- [x] **T2.4** Implement navigation: ✓
  - [x] Left/Right arrows move between stages ✓
  - [x] Enter expands stage details ✓
  - [x] Esc returns to timeline/menu ✓

### Phase 3: Navigation Integration

- [x] **T3.1** Update `screens/home.py` to add Simulator menu item ✓
- [x] **T3.2** Update `app.py` to route to simulator screens ✓
- [x] **T3.3** Update `screens/__init__.py` with new exports ✓
- [x] **T3.4** Add keybinding hints to footer ✓

### Phase 4: Visual Polish

- [x] **T4.1** Add phase colors (🔵 Inception, 🟢 Construction, 🟡 Operations) ✓
- [x] **T4.2** Style execute vs skip stages differently ✓
- [x] **T4.3** Add progress indicator (stage X/Y) ✓
- [x] **T4.4** Ensure 80-column layout works ✓

### Phase 5: Tests

- [x] **T5.1** Create `tests/test_simulator_schema.py`: ✓
  - [x] Validate stages.json structure ✓
  - [x] Validate request-types.json structure ✓
  - [x] Verify all stages have required fields ✓
  - [x] Verify all request types reference valid stages ✓
- [x] **T5.2** Create `tests/test_simulator_branching.py`: ✓
  - [x] Verify adaptive branching for greenfield ✓
  - [x] Verify adaptive branching for brownfield ✓
  - [x] Verify adaptive branching for bugfix ✓
  - [x] Verify risk modifiers affect stages ✓
  - [x] Verify constraint modifiers affect stages ✓

### Phase 6: Validation

- [x] **T6.1** All automated tests passing (73 tests) ✓
- [x] **T6.2** Create `validation-report.md` ✓

---

## Files to Create

| Category | Files |
|----------|-------|
| **Content** | `content/simulator/stages.json`, `content/simulator/request-types.json` |
| **Screens** | `screens/simulator.py`, `screens/simulation_view.py` |
| **Tests** | `tests/test_simulator_schema.py`, `tests/test_simulator_content.py` |

## Files to Modify

| File | Changes |
|------|---------|
| `screens/home.py` | Add Simulator to menu |
| `app.py` | Add routing for simulator screens |
| `screens/__init__.py` | Export new screens |

---

## Acceptance Criteria

| AC | Criterion | Phase |
|----|-----------|-------|
| AC-01 | Simulator accessible from home menu | Phase 3 |
| AC-02 | 4 request types selectable | Phase 2 |
| AC-03 | Stage timeline shows phases | Phase 2 |
| AC-04 | Stages show execute/skip status | Phase 2, 4 |
| AC-05 | Stage details show questions | Phase 2 |
| AC-06 | Stage details show artifacts | Phase 2 |
| AC-07 | Stage details show gate criteria | Phase 2 |
| AC-08 | All stage data from JSON | Phase 1 |
| AC-09 | Sources traceable | Phase 1 |
| AC-10 | Keyboard navigation works | Phase 2 |

---

## Verification Commands

```powershell
# Run the app
python run.py

# Run tests
python -m pytest tests/test_simulator*.py -v

# Check stage count
python -c "import json; s=json.load(open('src/aidlc_explainer/content/simulator/stages.json')); print(f'{len(s[\"stages\"])} stages')"

# Check request types
python -c "import json; r=json.load(open('src/aidlc_explainer/content/simulator/request-types.json')); print(f'{len(r[\"types\"])} request types')"
```

---

## Dependencies

- ENG-01 complete (Practice mode + navigation architecture)
- AWS aidlc-workflows reference material (for accurate stage names)

---

## Content Source Requirements

All stage definitions must be derived from:

1. **Primary:** `references/aidlc-workflows/` (if populated)
2. **Fallback:** `AI-SDLC_best-practice_method_principles.md` (lines 74-183)
3. **Upstream:** https://github.com/awslabs/aidlc-workflows

Stage names MUST match official AWS nomenclature:
- workspace-detection
- reverse-engineering
- requirements-analysis
- user-stories
- workflow-planning
- application-design
- units-generation
- functional-design
- nfr-requirements
- nfr-design
- infrastructure-design
- code-generation
- build-and-test

---

**Status:** VALIDATED  
**Last Updated:** 2026-01-28
