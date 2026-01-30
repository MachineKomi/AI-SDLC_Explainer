# Unit 02: Content Data Model & Loader

## Scope

Design and implement the data model for educational content (phases, principles, rituals, glossary) and the loader that reads structured content files.

## Features Addressed

- MAINT-01: Content as data
- MAINT-05: Version-controlled content
- F-06: Offline Operation

## Acceptance Criteria

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-01 | Content stored in structured files (YAML or JSON) in `content/` directory | File inspection |
| AC-02 | Schema defined for: phases, principles, rituals, glossary, quiz questions | Schema file exists and validates |
| AC-03 | Loader reads all content at startup without errors | Unit test with valid content |
| AC-04 | Loader reports clear errors for malformed content | Unit test with invalid content |
| AC-05 | Content can be updated without code changes | Replace content file, restart, verify new content appears |
| AC-06 | All content bundled in distribution (no external fetching) | Package inspection |

## Content Structure (Proposed)

```
content/
  phases/
    inception.yaml
    construction.yaml
    operations.yaml
  principles/
    01-human-accountability.yaml
    02-plan-first.yaml
    ...
  rituals/
    mob-elaboration.yaml
    mob-construction.yaml
  glossary.yaml
  quiz/
    phases-quiz.yaml
    principles-quiz.yaml
```

## Dependencies

- None (can be developed in parallel with Unit 01)

## Estimated Complexity

Low-Medium — Schema design and validation logic

---

**Status:** DRAFT
