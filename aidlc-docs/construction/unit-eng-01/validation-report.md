# Unit ENG-01: Validation Report

**Unit:** Engagement MVP (Practice Mode)  
**Date:** 2026-01-28  
**Status:** VALIDATED

---

## Test Results

```
============================= test session starts =============================
platform win32 -- Python 3.11.9, pytest-9.0.2
collected 38 items

tests/test_content.py::test_load_lesson_exists PASSED
tests/test_content.py::test_load_lesson_has_sections PASSED
tests/test_content.py::test_load_lesson_sections_have_content PASSED
tests/test_content.py::test_load_lesson_diagrams PASSED
tests/test_content.py::test_load_lesson_unknown_raises PASSED
tests/test_gates_schema.py::test_gates_has_schema PASSED
tests/test_gates_schema.py::test_gates_has_metadata PASSED
tests/test_gates_schema.py::test_gates_has_minimum_scenarios PASSED
tests/test_gates_schema.py::test_scenario_structure PASSED
tests/test_gates_schema.py::test_scenario_phase_valid PASSED
tests/test_gates_schema.py::test_scenario_decisions_structure PASSED
tests/test_gates_schema.py::test_scenario_has_evidence_checklist PASSED
tests/test_gates_schema.py::test_scenario_has_local_source PASSED
tests/test_gates_schema.py::test_scenario_ids_unique PASSED
tests/test_gates_schema.py::test_scenario_has_flaws PASSED
tests/test_navigation.py::test_navigation_stack_empty PASSED
tests/test_navigation.py::test_navigation_push PASSED
tests/test_navigation.py::test_navigation_breadcrumb PASSED
tests/test_navigation.py::test_navigation_pop PASSED
tests/test_navigation.py::test_navigation_pop_keeps_home PASSED
tests/test_navigation.py::test_navigation_context PASSED
tests/test_quiz_schema.py::test_quiz_has_schema PASSED
tests/test_quiz_schema.py::test_quiz_has_metadata PASSED
tests/test_quiz_schema.py::test_quiz_has_minimum_questions PASSED
tests/test_quiz_schema.py::test_question_structure PASSED
tests/test_quiz_schema.py::test_question_options PASSED
tests/test_quiz_schema.py::test_question_correct_in_range PASSED
tests/test_quiz_schema.py::test_question_has_local_source PASSED
tests/test_quiz_schema.py::test_question_ids_unique PASSED
tests/test_quiz_schema.py::test_question_explanations_meaningful PASSED
tests/test_state.py::test_state_manager_creates_default PASSED
tests/test_state.py::test_state_save_quiz_result PASSED
tests/test_state.py::test_state_save_gate_result PASSED
tests/test_state.py::test_state_increments_attempts PASSED
tests/test_state.py::test_state_reset PASSED
tests/test_state.py::test_state_persistence PASSED
tests/test_state.py::test_state_handles_corrupted_file PASSED
tests/test_state.py::test_state_schema_validation PASSED

======================== 38 passed in 4.36s ========================
```

---

## Verification Commands

```powershell
# Install dependencies
pip install --user textual rich pyyaml pytest

# Run the application
python run.py

# Run all tests
python -m pytest tests/ -v

# Check quiz content
python -c "import json; q=json.load(open('src/aidlc_explainer/content/practice/quiz.json')); print(f'{len(q[\"questions\"])} questions')"
# Output: 12 questions

# Check gates content
python -c "import json; g=json.load(open('src/aidlc_explainer/content/practice/gates.json')); print(f'{len(g[\"scenarios\"])} scenarios')"
# Output: 4 scenarios

# Show help
python run.py --help
```

---

## Acceptance Criteria Verification

| AC | Criterion | Status | Evidence |
|----|-----------|--------|----------|
| AC-01 | Practice accessible from home menu | ✓ PASS | Menu item #2 enabled |
| AC-02 | Quiz has ≥12 questions | ✓ PASS | quiz.json has 12 questions |
| AC-03 | Quiz shows progress/score/review | ✓ PASS | QuizScreen implemented |
| AC-04 | Gatekeeper has ≥4 scenarios | ✓ PASS | gates.json has 4 scenarios |
| AC-05 | Gatekeeper Approve/Reject + reasons | ✓ PASS | GatekeeperScreen implemented |
| AC-06 | Progress persists in state.json | ✓ PASS | StateManager + tests pass |
| AC-07 | Reset Progress clears state | ✓ PASS | test_state_reset passes |
| AC-08 | Sources screen shows local + URLs | ✓ PASS | SourcesScreen implemented |
| AC-09 | Content traces to local files | ✓ PASS | All questions/scenarios have sources.local |
| AC-10 | Help bar shows relevant keys | ✓ PASS | Footer bindings per screen |
| AC-11 | Schema tests pass | ✓ PASS | 19 schema tests pass |
| AC-12 | State tests pass | ✓ PASS | 8 state tests pass |

---

## Files Created/Modified

### New Files (14)

| File | Lines | Description |
|------|-------|-------------|
| `screens/practice.py` | 120 | Practice menu screen |
| `screens/quiz.py` | 200 | Quiz engine screen |
| `screens/gatekeeper.py` | 280 | Gatekeeper scenarios screen |
| `screens/sources.py` | 100 | Sources reference screen |
| `state.py` | 130 | State persistence manager |
| `content/practice/quiz.json` | 180 | 12 quiz questions |
| `content/practice/gates.json` | 200 | 4 gatekeeper scenarios |
| `tests/test_quiz_schema.py` | 70 | Quiz schema validation |
| `tests/test_gates_schema.py` | 75 | Gates schema validation |
| `tests/test_state.py` | 90 | State save/load/reset tests |

### Modified Files (4)

| File | Changes |
|------|---------|
| `app.py` | Added routing for practice, sources, quiz, gatekeeper |
| `screens/home.py` | Updated menu items (Practice, Sources enabled) |
| `screens/__init__.py` | Added new screen exports |
| `.gitignore` | Added .aidlc-explainer/ |

**Total new code:** ~1,450 lines

---

## Content Verification

### Quiz Questions (12)

| ID | Topic | Source Line |
|----|-------|-------------|
| q1 | Three phases | L76 |
| q2 | Proof over prose | L52-54 |
| q3 | Gates purpose | L38-39 |
| q4 | Artifact storage | L44-46 |
| q5 | Inception phase | L80-98 |
| q6 | Mental model | L26 |
| q7 | Human accountability | L32-35 |
| q8 | Adaptive depth | L48-50 |
| q9 | Audit.md purpose | L157 |
| q10 | Unit definition | L40-43 |
| q11 | Plan-first | L36-39 |
| q12 | Unit Done gate | L122 |

### Gatekeeper Scenarios (4)

| ID | Phase | Stage | Correct Action |
|----|-------|-------|----------------|
| g1 | Inception | Requirements Analysis | Reject |
| g2 | Construction | Unit Implementation | Reject |
| g3 | Construction | Unit Completion | Reject |
| g4 | Inception | Unit Decomposition | Reject |

---

## Manual Testing Checklist

- [x] App starts without errors
- [x] Home menu shows Practice and Sources
- [x] Practice menu accessible via key "2"
- [x] Quiz flow: questions → answers → feedback → score
- [x] Gatekeeper flow: scenario → decision → reasons → feedback
- [x] Sources screen shows local and upstream sources
- [x] State persists after quiz completion
- [x] Reset Progress clears state
- [x] All keyboard bindings work

---

## Known Limitations

1. **Help bar**: Uses footer bindings (built-in Textual) rather than custom widget
2. **Gatekeeper checkbox navigation**: Relies on mouse/tab for checkbox focus
3. **No question randomization**: Quiz always presents questions in order

---

## Conclusion

Unit ENG-01 implementation is **COMPLETE** and **VALIDATED**.

All 12 acceptance criteria met. All 38 tests pass.

---

**Validated by:** Automated tests + manual verification  
**Date:** 2026-01-28
