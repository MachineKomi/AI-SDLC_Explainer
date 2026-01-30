# Unit 06: Search & Quick Reference

## Scope

Implement search/filter functionality across all content and a single-screen quick reference card summarizing key AI-DLC concepts.

## Features Addressed

- F-09: Search/Filter
- F-10: Quick Reference Card
- F-13: Glossary
- US-05: Search/filter content by topic or keyword
- US-07: Access quick-reference card

## Acceptance Criteria

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-01 | Search accessible via `/` key from any screen | Manual test |
| AC-02 | Typing filters results in real-time (<200ms) | Timed manual test |
| AC-03 | Search covers: phases, principles, rituals, glossary terms | Search for terms from each category |
| AC-04 | Selecting search result navigates to that content | Manual test |
| AC-05 | Quick Reference accessible from main menu | Manual navigation test |
| AC-06 | Quick Reference fits on single screen (80x24 minimum) | Visual inspection |
| AC-07 | Quick Reference includes: 3 phases (one-liner each), 10 principles (names), key rituals | Content review |
| AC-08 | Glossary accessible from main menu with searchable terms | Manual test |
| AC-09 | Glossary includes: Bolt, Unit, Gate, Mob Elaboration, Mob Construction, Artifact | Content completeness |

## Dependencies

- Unit 01: TUI Framework (for search UI overlay)
- Unit 02: Content Model (for searchable index)
- Unit 03: Phase Explorer (search navigates to phases)
- Unit 04: Principles Reference (search navigates to principles)

## Estimated Complexity

Medium — Full-text search index, overlay UI

---

**Status:** DRAFT
