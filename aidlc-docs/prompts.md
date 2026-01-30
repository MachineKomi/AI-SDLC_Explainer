# Prompts Log

Append-only record of all user prompts during this AI-DLC project.

---

## PROMPT 1 - Setup + Inception Plan

**Received:** 2026-01-27

```
You are the lead engineer running an AI-DLC (AI-driven development lifecycle) project. Operate with strict gates: PLAN first, then STOP for approval, then EXECUTE only the approved plan. Small batches only.

Repo root is: .\AI-SDLC Explainer\

Artifact model (MUST follow):
- All lifecycle artifacts live in: .\AI-SDLC Explainer\aidlc-docs\
- Maintain:
  - aidlc-docs/aidlc-state.md (current phase/stage + what changed + what's next)
  - aidlc-docs/execution-plan.md (approved stage checklist)
  - aidlc-docs/audit.md (append-only decisions, approvals, evidence)
  - aidlc-docs/prompts.md (append EVERY prompt I give you + a short label)
- Inception artifacts:
  - aidlc-docs/inception/intent.md
  - aidlc-docs/inception/requirements.md
  - aidlc-docs/inception/nfr.md
  - aidlc-docs/inception/units/ (one md per unit)

Product to build:
- An "awesome" interactive local learning tool that teaches AI-SDLC / AI-DLC.
- Prefer a modern TUI as the primary UI.
- Must run locally without admin.
- Must be shareable (good for screenshots/videos).
- Sources must be only reputable and practical; use the provided AI-DLC source documents as primary inputs.

Constraints:
- Do not implement anything yet.
- First output MUST be a plan that creates/updates only repo artifacts (no code) and ends with a hard STOP asking for my approval.
- The plan MUST include checkpoints and what files you will create/update.
- Also list the exact local commands you will run later for verification (but do not run now).

Now: Create the Inception plan and write it to aidlc-docs/execution-plan.md with checkboxes. Update aidlc-docs/aidlc-state.md accordingly. Append this entire prompt to aidlc-docs/prompts.md under label: "PROMPT 1 - Setup + Inception Plan". Then STOP and ask for approval.
```

---

## PROMPT 2 - Inception Plan Approval

**Received:** 2026-01-27

```
Approved. Execute the plan step-by-step. After each major step, update aidlc-docs/aidlc-state.md and append a timestamped entry to aidlc-docs/audit.md with: decision, evidence, and file diffs summary. Keep batches small.
```

---

## PROMPT 3 - Source Document Review

**Received:** 2026-01-27

```
@AI-SDLC Explainer/AI-SDLC_best-practice_method_principles.md 

Carefully review this file and the external links linked to from within the file - ensure that we use this to ground our educational content to ensure its aligned to the best most reputable and robust sources in terms of method, best practices, and principles.
```

---

## PROMPT 4 - Inception Outputs

**Received:** 2026-01-27

```
Now produce:
1) A 1-paragraph intent + success metrics in aidlc-docs/inception/intent.md
2) Functional requirements in aidlc-docs/inception/requirements.md (must include: local-first, no-admin install, TUI-first, screenshot/video friendly)
3) NFRs in aidlc-docs/inception/nfr.md (security, performance, portability, accessibility, maintainability)
4) Decompose into 4-7 Units in aidlc-docs/inception/units/ (one md per unit) with acceptance criteria and dependencies.

Gate: STOP after writing these and ask for approval.
Append this prompt to aidlc-docs/prompts.md labeled "PROMPT 2 - Inception Outputs".
```

---

## PROMPT 5 - Inception Approval + Construction Start

**Received:** 2026-01-27

```
proceed up to and including the instruction below without asking for approvals: 

Approved. Enter Construction for Unit 1 only. Do not start other units.
```

---

## PROMPT 6 - Unit 1 Plan+Design (Revised Requirements)

**Received:** 2026-01-27

```
Construction Unit 1 = "MVP runnable TUI shell + first lesson module".

Requirements for Unit 1:
- A visually polished TUI app (keyboard-driven, modern layout)
- Includes at least 1 complete lesson: AI-DLC overview (phases, gates, artifacts, roles)
- Can render diagrams as ASCII or embedded text panels (no external services required)
- Runs locally with a single command
- Includes a "recording/screenshot friendly" mode (stable layout, deterministic content)

Your task now:
- Write a unit plan with checkboxes to: aidlc-docs/construction/unit-01/tasks-plan.md
- Write a lightweight design to: aidlc-docs/construction/unit-01/design.md (UI layout, navigation map, content structure, tech choice, why)
- STOP for approval before writing any code.

Append this prompt to aidlc-docs/prompts.md labeled "PROMPT 3 - Unit 1 Plan+Design".
```

---

## PROMPT 7 - Unit 1 Implementation Approval

**Received:** 2026-01-27

```
Approved. Implement Unit 1 now. Constraints:
- Keep diffs small and reviewable.
- Add automated checks (lint/test) and a simple run script.
- Produce a validation report with exact commands and outputs in: aidlc-docs/construction/unit-01/validation-report.md
- STOP after Unit 1 is runnable and validated.
```

---

## PROMPT R0 - Source Map

**Received:** 2026-01-28

```
You are improving an existing Textual-based AI-SDLC/AI-DLC learning TUI.

First, verify local source material exists:
- ./AI-SDLC_best-practice_method_principles.md
- ./references/aidlc-workflows/README.md
- ./references/aidlc-workflows/aidlc-rules/ (subfolders with rule markdown)

Task:
1) Identify and list (with file paths) the 5-10 most relevant source files for building interactive learning content, focusing on:
   - phases/stages/gates
   - artifact model (aidlc-docs)
   - structured Q&A / approval gates / audit trail behavior
2) Summarize (bullets) what each chosen file contributes (no long quotes).
3) Write this list to: aidlc-docs/inception/sources-local-map.md
4) STOP and ask for approval before making any app/code changes.

Append this prompt to aidlc-docs/prompts.md labeled "PROMPT R0 - Source Map".
```

**Outcome:** Source map created. Primary source (`AI-SDLC_best-practice_method_principles.md`) mapped with 8 content sections identified. References folder pending population.

---

## PROMPT M1 rev2 - ENG-01 Plan

**Received:** 2026-01-28

```
Upgrade the current AI-SDLC/AI-DLC learning TUI so it becomes interactive and engaging.

NON-NEGOTIABLES
- Plan-first, then STOP for approval, then execute only the approved plan.
- Keep diffs small. Do NOT rewrite the whole app.
- Offline-first (no network required at runtime).
- Use only these local source roots for content:
  - AI-SDLC_best-practice_method_principles.md
  - references/aidlc-workflows/ (README + rule details)
  You may include upstream URLs in a Sources screen, but lesson claims must trace to local files.

ENGAGEMENT MVP (must implement in the next unit)
Implement ONE new interactive mode: "Practice", consisting of BOTH:

A) Quiz engine (data-driven):
- >= 12 multiple-choice questions stored in: content/practice/quiz.json
- each question must include: prompt, options, correct option, explanation, and sources:
  - sources must include 1+ local file path AND 1+ upstream URL (if available in the local file)
- show score, progress, review mistakes, restart

B) Gatekeeper scenarios (data-driven):
- >= 4 scenarios stored in: content/practice/gates.json
- each scenario must include:
  - context (phase + stage)
  - "AI proposed plan" snippet with deliberate flaws
  - user decisions: Approve/Reject + choose reasons (multi-select)
  - scoring + feedback + "what evidence is required to approve" checklist
  - sources (same rules as quiz)

Progress persistence:
- store progress and last results in a local JSON state file (under a hidden folder like .aidlc-explainer/state.json).
- include a "Reset progress" action in the UI.

UI requirements:
- Practice reachable from main nav.
- Keyboard-first controls.
- Add a dedicated "Sources" screen that shows:
  - Local sources (file paths)
  - Upstream sources (URLs)
- Add a bottom help bar that shows key keys for the current screen.

Tests + evidence:
- Add unit tests validating:
  - quiz.json and gates.json schema
  - state save/load/reset
- Add validation report:
  - aidlc-docs/construction/unit-eng-01/validation-report.md
  - include exact commands: install, run, tests, lint (if present)

NOW (DO NOT CODE YET):
1) Repo discovery: identify current screen/navigation architecture and where content is stored.
2) Write a detailed plan with checkboxes and acceptance criteria.
3) Write a design doc with:
   - screen flow map
   - data schemas for quiz/scenarios/state
   - keybindings per screen
4) Update AI-DLC artifacts:
   - aidlc-docs/aidlc-state.md
   - aidlc-docs/execution-plan.md
   - aidlc-docs/audit.md (append-only entry proposing ENG-01)
   - create:
     - aidlc-docs/construction/unit-eng-01/tasks-plan.md
     - aidlc-docs/construction/unit-eng-01/design.md

STOP after writing plan/design. Ask for approval before modifying app code.
Append this prompt to aidlc-docs/prompts.md labeled "PROMPT M1 rev2 - ENG-01 Plan".

NOTE - if you were waiting for approval for any other steps preceeding this consider that approved and work through in a logical sequence.
```

**Outcome:** Plan and design created for Unit ENG-01 (Engagement MVP). Awaiting approval.

---

## PROMPT M2 - ENG-01 Execution Approval

**Received:** 2026-01-28

```
Approved. Execute Unit ENG-01 exactly as planned. Small batches. Update aidlc-state.md and append audit entries with evidence as you go. Stop when validated.
```

---

## PROMPT M2 rev2 - ENG-01 Build

**Received:** 2026-01-28

```
Execute ENG-01 now.

Hard constraints:
- No refactor rewrite. Implement inside existing architecture.
- Data-driven content must live under content/practice/ (or the repo's existing content system if it already exists; if so, document the mapping).
- Runtime must be offline.

Deliverables:
- Practice screen (quiz + gatekeeper scenarios)
- JSON data files:
  - content/practice/quiz.json (>=12)
  - content/practice/gates.json (>=4)
- Local state persistence:
  - .aidlc-explainer/state.json (create on first run)
  - reset action
- Sources screen with both file paths and URLs
- Tests + validation report:
  - tests for schemas + persistence
  - aidlc-docs/construction/unit-eng-01/validation-report.md with exact commands

Also update:
- aidlc-docs/execution-plan.md (check off tasks)
- aidlc-docs/audit.md (completion entry with evidence)
- aidlc-docs/aidlc-state.md (phase/stage status)

STOP when ENG-01 is complete and validated. Do not start ENG-02.
```

**Outcome:** ENG-01 already completed in prior execution. See validation-report.md.

---

## PROMPT ENG-02 Plan - Stage Simulator

**Received:** 2026-01-28

```
Plan Unit ENG-02: "AI-DLC Stage Simulator".

Goal:
- An interactive simulator where the user selects a request type (greenfield/brownfield/frontend/bugfix) and the app simulates:
  - which stages run (adaptive depth)
  - the structured questions asked
  - the approval gates
  - the artifacts produced (mock previews)

Must draw stage names and descriptions from references/aidlc-workflows rule markdown (do not invent).
Create design + tasks plan under aidlc-docs/construction/unit-eng-02/.
Append this prompt to prompts.md.

https://github.com/awslabs/aidlc-workflows
https://aws.amazon.com/blogs/devops/building-with-ai-dlc-using-amazon-q-developer/
https://deepwiki.com/awslabs/aidlc-workflows
```

**Outcome:** Design and tasks plan created. Awaiting approval.

---

## APPROVAL + EXECUTE ENG-02

**Received:** 2026-01-28

```
Approved. Execute Unit ENG-02 ("AI-DLC Stage Simulator") exactly as per your tasks-plan.md and design.md. Small batches only.

Scope (must deliver):
1) Stage Simulator UI
- Add a new nav entry: "Stage Simulator" (or equivalent).
- Flow:
  A) Select request type: greenfield / brownfield / frontend-heavy / bugfix
  B) Select risk profile (low/med/high) or constraints (regulated/security-critical) if your design includes it
  C) The simulator outputs:
     - Which stages will run (adaptive depth)
     - The structured questions asked per stage (as an interactive Q&A)
     - The approval gates (explicit STOP points with "Approve" / "Revise")
     - The artifacts produced (show file tree preview and 2-3 key file previews)

2) Source-of-truth constraint
- Do not invent stage names, gates, or artifacts. They must be derived from:
  - ./AI-SDLC_best-practice_method_principles.md
  - ./references/aidlc-workflows/ (rule markdown)
- Implement a minimal "source mapping" so each displayed stage/gate links to:
  - local file path + section reference (best effort)
  - upstream URL (if available)
- Add a "Sources" panel on the simulator screen.

3) Data-driven model
- Create a small internal JSON/YAML (or python dataclass) model that represents:
  - stages, questions, gates, artifacts, and source links
- Prefer generating this model at build time or startup by parsing a small subset of rule markdown (best effort).
  If parsing is too heavy, implement a curated mapping file and document why.

4) Interactivity requirements
- The simulator must require user input:
  - Answer structured questions (multiple choice where possible)
  - Based on answers, adjust which stages appear (adaptive depth)
  - At gate points, require Approve/Reject with reasons
  - Provide immediate feedback if a user approves without required evidence ("proof over prose" rule)

5) Tests + evidence
- Add tests validating:
  - simulator model schema (stages/questions/gates/artifacts)
  - source links are present for every stage and gate
  - adaptive branching works for at least 3 representative paths
- Create: aidlc-docs/construction/unit-eng-02/validation-report.md
  Include exact commands: install, run, tests, lint (if present) and expected results.

6) Artifact updates as you execute
- Update: aidlc-docs/execution-plan.md (check off tasks as completed)
- Update: aidlc-docs/aidlc-state.md (stage/status checkpoints)
- Append to: aidlc-docs/audit.md (timestamped entries: what changed, why, evidence)
- Append this prompt to: aidlc-docs/prompts.md labeled "APPROVAL + EXECUTE ENG-02".

Stop conditions:
- STOP when ENG-02 is implemented and validation report is written.
- Do not start ENG-03 or any other work.
```

**Outcome:** Executing ENG-02 implementation.

---

## PROMPT - Feedback Remediation Execution

**Received:** 2026-01-29

```
Execute each plan one by one. Be thorough. Apply AI-DLC methodology and best practice throughout.
```

**Outcome:** Executed feedback remediation phases 1-4:
- Phase 1: Fixed all critical bugs (home, lessons, quiz, simulator)
- Phase 2: Added mouse support, cache cleanup, visual improvements
- Phase 3: Implemented FEATURE-01 (Methodology Comparison) and FEATURE-02 (Transition Mapping)
- Phase 4: Implemented FEATURE-03 (Interactive Simulator Q&A)
- FEATURE-04 and FEATURE-05 (Ritual Walkthroughs) deferred for future

All 86 tests pass. Application validated.

---
