# Unit 04: Principles Reference

## Scope

Implement the reference screens for the 10 core AI-DLC principles with explanations, examples, and practical guidance.

## Features Addressed

- F-03: Principles Reference
- US-03: Review 10 core principles with practical guidance

## Acceptance Criteria

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-01 | Main menu shows "Principles" option; selecting shows list of all 10 | Manual navigation test |
| AC-02 | Each principle shows: name, one-line summary, detailed explanation | Content review |
| AC-03 | Each principle includes at least one practical example or anti-pattern | Content completeness check |
| AC-04 | Principles are numbered and can be navigated sequentially (prev/next) | Manual test |
| AC-05 | User can return to principles list from any principle detail | Manual test |
| AC-06 | All 10 principles from source document are included | Cross-reference with source |

## The 10 Principles (from source)

1. Human accountability is the loss function
2. Plan-first, stage-by-stage
3. Small, coherent "units" over big batches
4. Persisted artifacts are first-class
5. Adaptive depth: "exactly enough detail"
6. Proof over prose
7. Tooling is for truth, not vibes
8. Separation of concerns in prompts and agents
9. Safety constraints are explicit
10. Continuous prompt/rule improvement

## Dependencies

- Unit 01: TUI Framework (for rendering and navigation)
- Unit 02: Content Model (for loading principles data)

## Estimated Complexity

Medium — 10 detailed content screens

---

**Status:** DRAFT
