# Units Index

Decomposition of the AI-SDLC Explainer into implementable units.

## Unit Dependency Graph

```
Unit 01: TUI Framework ─────┬──────────────────────────────────┐
                            │                                  │
Unit 02: Content Model ─────┼─────────────────┐                │
                            │                 │                │
                            ▼                 ▼                ▼
                    Unit 03: Phase    Unit 04: Principles    Unit 05: Quiz
                    Explorer          Reference              Engine
                            │                 │                │
                            └────────┬────────┘                │
                                     │                         │
                                     ▼                         │
                            Unit 06: Search & ◄────────────────┘
                            Quick Reference
```

## Units Summary

| Unit | Name | Dependencies | Complexity | Status |
|------|------|--------------|------------|--------|
| 01 | [TUI Framework & Navigation](unit-01-tui-framework.md) | None | Medium | Draft |
| 02 | [Content Data Model & Loader](unit-02-content-model.md) | None | Low-Medium | Draft |
| 03 | [Phase Explorer](unit-03-phase-explorer.md) | 01, 02 | Medium | Draft |
| 04 | [Principles Reference](unit-04-principles-reference.md) | 01, 02 | Medium | Draft |
| 05 | [Quiz Engine](unit-05-quiz-engine.md) | 01, 02 | Medium | Draft |
| 06 | [Search & Quick Reference](unit-06-search-reference.md) | 01, 02, 03, 04 | Medium | Draft |

## Suggested Build Order

**Parallel Track A:** Unit 01 (TUI) + Unit 02 (Content) — no dependencies, can start immediately

**Sequential after A:**
1. Unit 03 (Phases) and Unit 04 (Principles) — can be parallel
2. Unit 05 (Quiz) — can be parallel with 03/04
3. Unit 06 (Search) — requires 03 and 04 complete

## Feature Coverage

| Feature | Unit(s) |
|---------|---------|
| F-01 TUI Navigation | 01 |
| F-02 Phase Explorer | 03 |
| F-03 Principles Reference | 04 |
| F-04 Artifact Model Viewer | 03 |
| F-05 Local-First Install | 01, 02 |
| F-06 Offline Operation | 02 |
| F-07 Screenshot-Friendly | 01 |
| F-08 Interactive Quiz | 05 |
| F-09 Search/Filter | 06 |
| F-10 Quick Reference | 06 |
| F-13 Glossary | 06 |

---

**Total Units:** 6  
**Status:** DRAFT — Awaiting approval  
**Last Updated:** 2026-01-27
