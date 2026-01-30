# Unit 05: Quiz Engine

## Scope

Implement an interactive quiz system with multiple-choice questions, scoring, and feedback to test learner comprehension.

## Features Addressed

- F-08: Interactive Quiz
- US-04: Take quizzes to test understanding
- Success Metric: Quiz pass rate ≥80%

## Acceptance Criteria

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-01 | Quiz accessible from main menu and after completing each section | Manual navigation test |
| AC-02 | Questions display one at a time with 4 answer options (A/B/C/D) | Visual inspection |
| AC-03 | User selects answer with keyboard; immediate feedback shown (correct/incorrect) | Manual test |
| AC-04 | After wrong answer, correct answer is revealed with brief explanation | Manual test |
| AC-05 | Final score displayed as percentage at end of quiz | Complete a quiz, verify score |
| AC-06 | Option to retry quiz or return to content | Manual test |
| AC-07 | At least 5 questions per topic (phases, principles) | Content count |
| AC-08 | Questions randomized on each attempt | Run quiz twice, verify different order |

## Quiz Topics

- Phases Quiz (Inception, Construction, Operations)
- Principles Quiz (10 core principles)
- Comprehensive Quiz (mixed questions)

## Dependencies

- Unit 01: TUI Framework (for quiz UI)
- Unit 02: Content Model (for loading quiz questions)

## Estimated Complexity

Medium — State management for quiz flow, scoring logic

---

**Status:** DRAFT
