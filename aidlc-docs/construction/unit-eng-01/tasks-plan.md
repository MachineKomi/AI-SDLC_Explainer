# Unit ENG-01: Engagement MVP — Tasks Plan

## Scope

**Deliverable:** Interactive "Practice" mode with Quiz Engine and Gatekeeper Scenarios, plus Sources screen and progress persistence.

## Requirements Checklist

| Requirement | Addressed By |
|-------------|--------------|
| Quiz engine (≥12 questions, data-driven) | Phase 2 |
| Gatekeeper scenarios (≥4, data-driven) | Phase 3 |
| Progress persistence (.aidlc-explainer/state.json) | Phase 4 |
| Sources screen (local + upstream) | Phase 5 |
| Practice in main nav | Phase 1 |
| Keyboard-first controls | All phases |
| Bottom help bar per screen | Phase 6 |
| Tests for schema + state | Phase 7 |

---

## Task Checklist

### Phase 1: Navigation & Menu Updates ✓

- [x] **T1.1** Update `MENU_ITEMS` in home.py: add "Practice" (enabled) and "Sources" ✓
- [x] **T1.2** Add screen routing in app.py for "practice" and "sources" ✓
- [x] **T1.3** Create `screens/practice.py` with PracticeScreen (menu: Quiz / Gates) ✓
- [x] **T1.4** Create `screens/sources.py` with SourcesScreen ✓

### Phase 2: Quiz Engine ✓

- [x] **T2.1** Create `content/practice/quiz.json` with ≥12 questions ✓
- [x] **T2.2** Each question has: prompt, options, correct, explanation, sources ✓
- [x] **T2.3** Create `screens/quiz.py` with QuizScreen ✓
- [x] **T2.4** Implement question display with A/B/C/D options ✓
- [x] **T2.5** Implement answer selection (keyboard: 1-4 or a-d) ✓
- [x] **T2.6** Implement immediate feedback (correct/wrong + explanation) ✓
- [x] **T2.7** Implement progress indicator [X/12] ✓
- [x] **T2.8** Implement final score screen with percentage ✓
- [x] **T2.9** Implement "Review Mistakes" mode ✓
- [x] **T2.10** Implement "Restart Quiz" action ✓
- [x] **T2.11** Wire quiz results to state persistence ✓

### Phase 3: Gatekeeper Scenarios ✓

- [x] **T3.1** Create `content/practice/gates.json` with ≥4 scenarios ✓
- [x] **T3.2** Each scenario has: context, ai_plan, flaws, decisions, evidence_checklist, sources ✓
- [x] **T3.3** Create `screens/gatekeeper.py` with GatekeeperScreen ✓
- [x] **T3.4** Implement scenario display (context + AI plan) ✓
- [x] **T3.5** Implement Approve/Reject decision buttons ✓
- [x] **T3.6** Implement multi-select for reasons (checkboxes) ✓
- [x] **T3.7** Implement scoring + feedback display ✓
- [x] **T3.8** Implement "Evidence Required" checklist reveal ✓
- [x] **T3.9** Implement progress [X/4] and final score ✓
- [x] **T3.10** Wire results to state persistence ✓

### Phase 4: Progress Persistence ✓

- [x] **T4.1** Create `state.py` module with StateManager class ✓
- [x] **T4.2** Define state schema: quiz_results, gate_results ✓
- [x] **T4.3** Implement save to `.aidlc-explainer/state.json` ✓
- [x] **T4.4** Implement load on app start ✓
- [x] **T4.5** Implement "Reset Progress" action ✓
- [x] **T4.6** Reset via Practice screen (no confirmation dialog for MVP) ✓
- [x] **T4.7** Add `.aidlc-explainer/` to .gitignore ✓

### Phase 5: Sources Screen ✓

- [x] **T5.1** Create sources data structure (local files, upstream URLs) ✓
- [x] **T5.2** Implement SourcesScreen with two sections ✓
- [x] **T5.3** Add navigation from home menu to Sources ✓
- [x] **T5.4** Sources shown in quiz explanations ✓

### Phase 6: Help Bar Enhancement ✓

- [x] **T6.1** Used Textual's built-in footer bindings (no custom widget) ✓
- [x] **T6.2** Define keybinding maps per screen type ✓
- [x] **T6.3** Footer shows bindings automatically ✓
- [x] **T6.4** Show relevant keys: navigation, selection, actions ✓

### Phase 7: Tests & Validation ✓

- [x] **T7.1** Create `tests/test_quiz_schema.py` - 9 tests ✓
- [x] **T7.2** Create `tests/test_gates_schema.py` - 10 tests ✓
- [x] **T7.3** Create `tests/test_state.py` - 8 tests ✓
- [x] **T7.4** Manual test: complete quiz flow ✓
- [x] **T7.5** Manual test: complete gatekeeper flow ✓
- [x] **T7.6** Manual test: progress persistence ✓
- [x] **T7.7** Create `validation-report.md` ✓

---

## Acceptance Criteria

| AC | Criterion | Verification |
|----|-----------|--------------|
| AC-01 | Practice accessible from home menu | Navigate Home → Practice |
| AC-02 | Quiz has ≥12 questions from quiz.json | Count questions in file |
| AC-03 | Quiz shows progress, score, review mistakes | Complete quiz flow |
| AC-04 | Gatekeeper has ≥4 scenarios from gates.json | Count scenarios in file |
| AC-05 | Gatekeeper shows Approve/Reject + reasons | Complete scenario flow |
| AC-06 | Progress persists in .aidlc-explainer/state.json | Restart app, check state |
| AC-07 | Reset Progress clears state | Use reset action |
| AC-08 | Sources screen shows local paths + URLs | Navigate to Sources |
| AC-09 | All content traces to local source files | Check sources field |
| AC-10 | Help bar shows relevant keys per screen | Visual inspection |
| AC-11 | Schema tests pass | `pytest tests/test_*_schema.py` |
| AC-12 | State tests pass | `pytest tests/test_state.py` |

---

## Files to Create/Modify

| Category | Files |
|----------|-------|
| **Screens** | `screens/practice.py`, `screens/quiz.py`, `screens/gatekeeper.py`, `screens/sources.py` |
| **Content** | `content/practice/quiz.json`, `content/practice/gates.json` |
| **State** | `state.py` |
| **Widgets** | `widgets/help_bar.py` |
| **Modify** | `app.py`, `screens/home.py`, `screens/base.py` |
| **Tests** | `tests/test_quiz_schema.py`, `tests/test_gates_schema.py`, `tests/test_state.py` |
| **Config** | `.gitignore` (add .aidlc-explainer/) |

---

## Verification Commands

```powershell
# Run the app
python run.py

# Run tests
python -m pytest tests/ -v

# Check quiz content
python -c "import json; q=json.load(open('src/aidlc_explainer/content/practice/quiz.json')); print(f'{len(q[\"questions\"])} questions')"

# Check state file location
dir .aidlc-explainer\
```

---

**Status:** VALIDATED  
**Last Updated:** 2026-01-28
