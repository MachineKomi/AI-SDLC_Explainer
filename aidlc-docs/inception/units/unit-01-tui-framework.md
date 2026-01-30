# Unit 01: TUI Framework & Navigation

## Scope

Build the core terminal user interface framework including screen management, keyboard input handling, and navigation system.

## Features Addressed

- F-01: TUI Navigation
- F-07: Screenshot-Friendly Rendering

## Acceptance Criteria

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-01 | Arrow keys and vim keys (h/j/k/l) navigate menus | Manual test: all keys respond correctly |
| AC-02 | Enter/Space selects item; q/Esc goes back or exits | Manual test: selection and back navigation work |
| AC-03 | Breadcrumb displays current location (e.g., "Home > Phases > Inception") | Visual inspection |
| AC-04 | Layout uses 80-column default with clean box-drawing characters | Screenshot test on Windows Terminal, iTerm2, GNOME Terminal |
| AC-05 | Help overlay appears on `?` key press | Manual test |
| AC-06 | Startup time <2 seconds | Timed test |
| AC-07 | No flickering or artifacts during navigation | Visual inspection during rapid navigation |

## Technical Notes

- Consider: Python (Textual/Rich), Rust (Ratatui), Go (Bubbletea)
- Must support Windows, macOS, Linux terminals
- Color theme should be configurable (for accessibility)

## Dependencies

- None (foundational unit)

## Estimated Complexity

Medium — Framework selection and cross-platform testing

---

**Status:** DRAFT
