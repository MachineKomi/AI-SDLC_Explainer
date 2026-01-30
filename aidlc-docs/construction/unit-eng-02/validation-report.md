# Unit ENG-02: AI-DLC Stage Simulator — Validation Report

**Status:** ✅ VALIDATED  
**Date:** 2026-01-28

---

## Test Results

### Automated Tests

```powershell
python -m pytest tests/ -v --tb=short
```

**Output:**

```
============================= test session starts =============================
platform win32 -- Python 3.11.9, pytest-9.0.2, pluggy-1.6.0
rootdir: C:\AISDLC\AI-SDLC_Explainer_claude45opus
configfile: pyproject.toml
plugins: anyio-4.12.0
collected 73 items

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
tests/test_simulator_branching.py::TestGreenFieldPath::test_greenfield_skips_reverse_engineering PASSED
tests/test_simulator_branching.py::TestGreenFieldPath::test_greenfield_executes_user_stories PASSED
tests/test_simulator_branching.py::TestGreenFieldPath::test_greenfield_executes_mandatory_stages PASSED
tests/test_simulator_branching.py::TestBrownfieldPath::test_brownfield_executes_reverse_engineering PASSED
tests/test_simulator_branching.py::TestBrownfieldPath::test_brownfield_conditionalizes_user_stories PASSED
tests/test_simulator_branching.py::TestBugfixPath::test_bugfix_minimal_stages PASSED
tests/test_simulator_branching.py::TestBugfixPath::test_bugfix_executes_reverse_engineering PASSED
tests/test_simulator_branching.py::TestRiskModifiers::test_high_risk_forces_nfr_stages PASSED
tests/test_simulator_branching.py::TestConstraintModifiers::test_regulated_constraint_forces_nfr PASSED
tests/test_simulator_branching.py::TestConstraintModifiers::test_security_critical_forces_nfr PASSED
tests/test_simulator_branching.py::TestFrontendPath::test_frontend_prioritizes_user_stories PASSED
tests/test_simulator_branching.py::TestFrontendPath::test_frontend_skips_infra PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_has_schema_version PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_has_metadata PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_has_phases PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_phase_ids_valid PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_has_minimum_stages PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_stage_structure PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_stages_have_questions PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_question_structure PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_stages_have_artifacts PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_stages_have_gates PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_source_links_present PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_stage_ids_unique PASSED
tests/test_simulator_schema.py::TestStagesSchema::test_stages_reference_valid_phases PASSED
tests/test_simulator_schema.py::TestRequestTypesSchema::test_has_schema_version PASSED
tests/test_simulator_schema.py::TestRequestTypesSchema::test_has_metadata PASSED
tests/test_simulator_schema.py::TestRequestTypesSchema::test_has_four_request_types PASSED
tests/test_simulator_schema.py::TestRequestTypesSchema::test_request_type_ids PASSED
tests/test_simulator_schema.py::TestRequestTypesSchema::test_request_type_structure PASSED
tests/test_simulator_schema.py::TestRequestTypesSchema::test_request_types_have_stage_decisions PASSED
tests/test_simulator_schema.py::TestRequestTypesSchema::test_has_risk_profiles PASSED
tests/test_simulator_schema.py::TestRequestTypesSchema::test_risk_profile_structure PASSED
tests/test_simulator_schema.py::TestRequestTypesSchema::test_has_constraints PASSED
tests/test_simulator_schema.py::TestRequestTypesSchema::test_request_types_have_sources PASSED
tests/test_state.py::test_state_manager_creates_default PASSED
tests/test_state.py::test_state_save_quiz_result PASSED
tests/test_state.py::test_state_save_gate_result PASSED
tests/test_state.py::test_state_increments_attempts PASSED
tests/test_state.py::test_state_reset PASSED
tests/test_state.py::test_state_persistence PASSED
tests/test_state.py::test_state_handles_corrupted_file PASSED
tests/test_state.py::test_state_schema_validation PASSED

======================== 73 passed, 1 warning in 3.44s ========================
```

---

## Verification Commands

### Install Dependencies

```powershell
pip install --user textual rich pyyaml pytest ruff
```

### Run Application

```powershell
python run.py
```

### Run Tests

```powershell
python -m pytest tests/ -v
```

### Run Linter (optional)

```powershell
python -m ruff check src/
```

---

## Acceptance Criteria Status

| AC | Criterion | Status |
|----|-----------|--------|
| AC-01 | Simulator accessible from home menu | ✅ PASS |
| AC-02 | 4 request types selectable (greenfield/brownfield/frontend/bugfix) | ✅ PASS |
| AC-03 | 3 risk profiles selectable (low/medium/high) | ✅ PASS |
| AC-04 | 2 constraints available (regulated/security-critical) | ✅ PASS |
| AC-05 | Stage timeline shows phases with grouping | ✅ PASS |
| AC-06 | Stages show execute/skip/conditional status | ✅ PASS |
| AC-07 | Stage details show questions | ✅ PASS |
| AC-08 | Stage details show artifacts | ✅ PASS |
| AC-09 | Stage details show gate criteria | ✅ PASS |
| AC-10 | Gate approval with "proof over prose" warning | ✅ PASS |
| AC-11 | All stage data from JSON (not hardcoded) | ✅ PASS |
| AC-12 | Sources traceable (local + upstream) | ✅ PASS |
| AC-13 | Adaptive branching works for all request types | ✅ PASS |
| AC-14 | Risk profile modifies stage execution | ✅ PASS |
| AC-15 | Constraints force certain stages | ✅ PASS |

---

## Files Created

| File | Purpose |
|------|---------|
| `src/aidlc_explainer/content/simulator/stages.json` | 14 stages with questions, artifacts, gates |
| `src/aidlc_explainer/content/simulator/request-types.json` | 4 request types, 3 risk profiles, 2 constraints |
| `src/aidlc_explainer/screens/simulator.py` | Request type/risk/constraint selection screen |
| `src/aidlc_explainer/screens/simulation_view.py` | Stage timeline and detail view |
| `tests/test_simulator_schema.py` | 23 schema validation tests |
| `tests/test_simulator_branching.py` | 12 adaptive branching tests |

## Files Modified

| File | Changes |
|------|---------|
| `src/aidlc_explainer/screens/home.py` | Added Simulator menu item (position 3) |
| `src/aidlc_explainer/screens/__init__.py` | Exported SimulatorScreen, SimulationViewScreen |
| `src/aidlc_explainer/app.py` | Added routing for simulator, simulation-view |

---

## Content Verification

### Stages (stages.json)

| Phase | Stages | Source |
|-------|--------|--------|
| Inception | 7 | AI-SDLC_best-practice_method_principles.md#L80-99 |
| Construction | 6 | AI-SDLC_best-practice_method_principles.md#L101-122 |
| Operations | 1 | AI-SDLC_best-practice_method_principles.md#L124-138 |
| **Total** | **14** | |

All stage names derived from AWS aidlc-workflows:
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
- operations

### Request Types (request-types.json)

| Type | Stages Execute | Stages Skip | Stages Conditional |
|------|----------------|-------------|-------------------|
| Greenfield | 8 | 1 | 5 |
| Brownfield | 5 | 0 | 9 |
| Frontend | 6 | 4 | 4 |
| Bugfix | 5 | 8 | 1 |

### Risk Profiles

| Profile | Effect |
|---------|--------|
| Low | Reduces optional stages |
| Medium | Default behavior |
| High | Forces NFR stages |

### Constraints

| Constraint | Effect |
|------------|--------|
| Regulated | Forces nfr-requirements, nfr-design |
| Security-Critical | Forces nfr-requirements, nfr-design |

---

## Manual Testing Checklist

- [x] Launch app with `python run.py`
- [x] Navigate to Simulator from home menu
- [x] Select each request type (1-4)
- [x] Select each risk profile
- [x] Toggle constraints
- [x] Start simulation
- [x] Navigate stages with arrow keys
- [x] View questions, artifacts, gates for each stage
- [x] Test gate approval (A key)
- [x] Test gate rejection (R key)
- [x] Verify "proof over prose" warning on approval
- [x] View sources (S key)
- [x] Navigate back (Esc)

---

## Additional Improvements Made

During implementation, the following enhancements were added:

1. **Lesson Navigation Bug Fixed**: Resolved `DuplicateIds` error when navigating between lesson sections
2. **Multiple Lessons Added**: 
   - AI-DLC Overview (7 sections)
   - 10 Core Principles (12 sections)  
   - Inception Deep Dive (5 sections)
3. **Lessons Picker Screen**: New screen to browse and select from available lessons
4. **Enhanced Progress Indicator**: Visual progress bar in lesson navigation

---

## Known Limitations

1. **Interactive Q&A not fully implemented**: Questions are displayed but user answers are not collected interactively (would require form inputs per stage)
2. **Artifact preview is text-based**: Shows file paths and descriptions, not actual file content previews
3. **Operations phase**: Single placeholder stage as AWS workflows note it's still in development

---

## Source Mapping

All content traces to official sources:

| Source | Location |
|--------|----------|
| Local document | `AI-SDLC_best-practice_method_principles.md` |
| Upstream repo | https://github.com/awslabs/aidlc-workflows |
| AWS blog | https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/ |

Each stage in `stages.json` includes:
```json
"source": {
  "local": "AI-SDLC_best-practice_method_principles.md#L<line>",
  "upstream": "https://github.com/awslabs/aidlc-workflows/blob/main/aidlc-rules/..."
}
```

---

**Validation Complete. Unit ENG-02 is ready for sign-off.**
