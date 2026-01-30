# Non-Functional Requirements

## 1. Security

| ID | Requirement | Rationale |
|----|-------------|-----------|
| SEC-01 | No network calls at runtime | Prevents data exfiltration; works in air-gapped environments |
| SEC-02 | No sensitive data collection | Tool does not log, track, or transmit user behavior |
| SEC-03 | No elevated privileges required | Runs in user space; cannot modify system files |
| SEC-04 | Dependency audit | All dependencies must be from reputable sources with no known CVEs |
| SEC-05 | No code execution from content | Educational content is static; no eval or dynamic code loading |

---

## 2. Performance

| ID | Requirement | Target |
|----|-------------|--------|
| PERF-01 | Startup time | <2 seconds to interactive on standard hardware |
| PERF-02 | Navigation latency | <100ms response to user input |
| PERF-03 | Memory footprint | <100MB RAM during operation |
| PERF-04 | Binary/package size | <50MB installed |
| PERF-05 | Search performance | <200ms for full-text search across all content |

---

## 3. Portability

| ID | Requirement | Target |
|----|-------------|--------|
| PORT-01 | Windows support | Windows 10/11, Windows Terminal or CMD |
| PORT-02 | macOS support | macOS 12+ (Monterey and later), Terminal.app or iTerm2 |
| PORT-03 | Linux support | Ubuntu 20.04+, Debian 11+, Fedora 38+, any terminal emulator |
| PORT-04 | No native dependencies | Pure language runtime (Python/Go/Rust); no C compilation required |
| PORT-05 | Single-file distribution option | Provide standalone binary for each platform |

---

## 4. Accessibility

| ID | Requirement | Rationale |
|----|-------------|-----------|
| ACC-01 | Keyboard-only navigation | Full functionality without mouse |
| ACC-02 | Screen reader compatible | Text-based output works with terminal screen readers |
| ACC-03 | High contrast theme option | Supports users with visual impairments |
| ACC-04 | No color-only information | All status/meaning also conveyed via text or symbols |
| ACC-05 | Configurable text density | Option for compact vs. expanded view |

---

## 5. Maintainability

| ID | Requirement | Rationale |
|----|-------------|-----------|
| MAINT-01 | Content as data | Educational content stored in structured files (JSON/YAML/MD), not hardcoded |
| MAINT-02 | Modular architecture | Clear separation: content, rendering, navigation, quiz engine |
| MAINT-03 | Documented code | All public functions documented; README with architecture overview |
| MAINT-04 | Automated tests | Unit tests for core logic; integration tests for navigation flows |
| MAINT-05 | Version-controlled content | Content updates can be made independently of code releases |

---

## 6. Usability

| ID | Requirement | Target |
|----|-------------|--------|
| USE-01 | Zero-config start | `./aidlc-explainer` or `aidlc-explainer` runs immediately |
| USE-02 | Help accessible | `--help` flag and in-app `?` key show navigation guide |
| USE-03 | Consistent keybindings | Same keys work across all screens (vim-style + arrows) |
| USE-04 | Error recovery | Invalid input shows helpful message; never crashes |
| USE-05 | Exit confirmation | Prompt before exit if progress would be lost |

---

## 7. Shareability (Screenshot/Video)

| ID | Requirement | Target |
|----|-------------|--------|
| SHARE-01 | Fixed-width layout | 80-column default; configurable up to 120 |
| SHARE-02 | No animations | Static rendering; optional animated transitions (off by default) |
| SHARE-03 | Clean box-drawing | Unicode box characters render correctly in common terminals |
| SHARE-04 | Theme export | Current theme can be shown/copied for reproduction |
| SHARE-05 | Deterministic rendering | Same content renders identically across sessions |

---

**Status:** DRAFT  
**Last Updated:** 2026-01-27
