# Unit 03: Phase Explorer

## Scope

Implement the screens and navigation for exploring the three AI-DLC phases: Inception, Construction, and Operations.

## Features Addressed

- F-02: Phase Explorer
- F-04: Artifact Model Viewer
- US-02: Explore 3 phases with explanations and examples

## Acceptance Criteria

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-01 | Main menu shows "Phases" option; selecting it shows list of 3 phases | Manual navigation test |
| AC-02 | Each phase screen displays: description, goal, typical stages, key artifacts | Content review |
| AC-03 | Inception phase shows: requirements analysis, user stories, units, gates | Content completeness check |
| AC-04 | Construction phase shows: design, code generation, build-and-test loop | Content completeness check |
| AC-05 | Operations phase shows: IaC, CI/CD, observability, cost model | Content completeness check |
| AC-06 | Artifact model viewer shows `aidlc-docs/` directory tree with descriptions | Visual inspection |
| AC-07 | User can navigate back to phases list from any phase detail screen | Manual test |

## Content Requirements

Each phase must include (sourced from `AI-SDLC_best-practice_method_principles.md`):
- Goal statement
- Stage sequence
- Primary artifacts with descriptions
- Gate criteria

## Dependencies

- Unit 01: TUI Framework (for rendering and navigation)
- Unit 02: Content Model (for loading phase data)

## Estimated Complexity

Medium — Multiple screens with rich content

---

**Status:** DRAFT
