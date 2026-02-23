# 10 — Sources, References & Further Reading

This document catalogs all authoritative sources referenced across the AI-SDLC methodology, organized by category. These sources informed the content in documents 01–09 and the AI-SDLC Explainer application.

---

## Primary AWS Sources

### AWS Blog Posts (Official)

| Source | URL | Key Content |
|--------|-----|-------------|
| AI-Driven Development Life Cycle (AI-DLC) | https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/ | Original methodology announcement, three-phase lifecycle, core principles |
| Building with AI-DLC Using Amazon Q Developer | https://aws.amazon.com/blogs/devops/building-with-ai-driven-development-life-cycle-ai-dlc-using-amazon-q-developer/ | Practical implementation guide, Amazon Q integration, workflow examples |

### AWS GitHub Repositories

| Source | URL | Key Content |
|--------|-----|-------------|
| AI-DLC Workflows (awslabs) | https://github.com/aws-samples/sample-aidlc-workflows | Reference workflow definitions, rule sets, stage definitions |
| AWS MCP Servers (awslabs) | https://github.com/awslabs/mcp | Model Context Protocol servers for AWS services |

### AWS MCP Server Documentation

| Server | URL | Phase Relevance |
|--------|-----|-----------------|
| AWS Documentation MCP | https://awslabs.github.io/mcp/servers/aws-documentation-mcp-server | Inception, Construction — accurate API references and constraints |
| AWS Pricing MCP | https://awslabs.github.io/mcp/servers/aws-pricing-mcp-server | Operations — real-time pricing and cost analysis (advisory, not authoritative) |
| AWS Diagram MCP | https://awslabs.github.io/mcp/servers/aws-diagram-mcp-server | All phases — architecture, sequence, and flow diagrams as living artifacts |

### DeepWiki Analysis (AWS Workflows)

| Topic | URL | Key Content |
|-------|-----|-------------|
| AI-DLC Workflows Overview | https://deepwiki.com/awslabs/aidlc-workflows | Comprehensive analysis of the AWS workflow repository |
| Adaptive Intelligence | https://deepwiki.com/awslabs/aidlc-workflows/3.2-adaptive-intelligence | Stage selection logic, adaptive depth, "exactly enough detail" |
| Workflow Phases | https://deepwiki.com/awslabs/aidlc-workflows/4-workflow-phases | Phase definitions, stage sequences, gate criteria |
| User Interaction Model | https://deepwiki.com/awslabs/aidlc-workflows/7-user-interaction-model | File-based Q&A, structured answer tags, interaction patterns |
| Generated Artifacts | https://deepwiki.com/awslabs/aidlc-workflows/8-generated-artifacts | Artifact types, build-and-test loop, validation evidence |

---

## Practitioner Sources

### Nate B Jones — "5 Levels of AI Coding" (2026)

Video transcript providing the L0–L5 maturity framework that maps directly to AI-SDLC adoption stages. Key concepts integrated throughout documents 04, 05, 06, and 07:

- L0 Autocomplete → L5 Dark Factory progression
- The J-curve: METR study showing developers 19% slower with AI tools (while believing they were 24% faster)
- Scenarios vs. tests: external holdout sets that AI cannot see or game
- Digital twins: simulated clones of external services for safe integration testing
- StrongDM case study: 3-person team shipping production Rust code with no human code review
- Dan Shapiro's level definitions (L0–L5)
- Spec quality as the primary bottleneck at L4+
- The "people, culture, and org-structure problem" — not a tooling problem

### AI-DLC Operationalization Cheat Sheet (Jonas / Raja SP)

Practitioner reference providing the operational framework integrated throughout documents 05, 06, and 07:

- Rosetta Stone: Agile/Waterfall → AI-SDLC concept mapping
- 5 mindset shifts for adoption (Doer→Designer, Velocity→Value, Ceremonies→Cadence, Roles→Responsibilities, Tools→Transformation)
- 8 operational metrics with formulas and RAG thresholds
- RACI matrix for AI-SDLC roles
- Leader dashboard design
- 4-week adoption playbook (week-by-week activities)
- Role transformation guidance
- Anti-pattern identification

### Geoffrey Huntley — Ralph Loop

| Source | URL | Key Content |
|--------|-----|-------------|
| Ralph Pattern | https://ghuntley.com/ralph/ | Looping AI agents until completion with objective success criteria |
| Awesome Claude (Ralph Wiggum) | https://awesomeclaude.ai/ralph-wiggum | Claude Code plugin implementation with safety controls |

Key insight: Ralph-style looping fits inside AI-SDLC Construction (within a unit, with objective success criteria and iteration caps) but does not replace approval gates. Ralph can execute; AI-SDLC still governs.

### Chrome DevTools MCP

| Source | URL | Key Content |
|--------|-----|-------------|
| Chrome DevTools MCP Blog | https://developer.chrome.com/blog/chrome-devtools-mcp | Why coding agents need browser visibility for UI validation |
| Chrome DevTools MCP Repo | https://github.com/ChromeDevTools/chrome-devtools-mcp | MCP server for DOM, network, and performance inspection |

Relevant for the Frontend workflow variant where "preserve existing working behavior" is a primary constraint and runtime validation against a reference system is required.

### Unofficial AI-DLC MCP Server

| Source | URL | Key Content |
|--------|-----|-------------|
| aidlc-mcp (j-thurston) | https://github.com/j-thurston/aidlc-mcp | Chat-based phase tracking, per-feature `.aidlc/` directory layout |

Demonstrates an alternative artifact layout and chat-based clarification flow. Useful for "keep moving" workflows, but decisions should still be persisted into artifacts for auditability.

---

## Key Studies and Data Points Referenced

| Claim | Source | Context |
|-------|--------|---------|
| Developers 19% slower with AI tools | METR study (2025) | Experienced open-source developers on real-world tasks; cited in Nate B Jones video |
| Developers believed they were 24% faster | METR study (2025) | Perception vs. reality gap; the J-curve in action |
| 90% of "AI-native" developers at L1–L2 | Dan Shapiro (via Nate B Jones) | Most teams using AI as a faster typist, not a collaborator |
| StrongDM: 3-person team, production Rust | Nate B Jones video (2026) | Dark factory case study — specs in, software out, no human code review |
| 16,000 lines of Rust shipped by agents | StrongDM (via Nate B Jones) | End-to-end autonomous development at L5 |
| 25-30%+ productivity gains require workflow redesign | AI-SDLC best practices synthesis | Organizations seeing real gains redesigned end-to-end, not just added tools |

---

## Repository-Internal Sources

These files within this repository served as primary content sources:

| File | Content Used For |
|------|-----------------|
| `AI-SDLC_best-practice_method_principles.md` | Core methodology synthesis — principles, phases, artifacts, metrics, MCP integration, workflow variants |
| `aidlc-web-app/src/content/lessons.ts` | Lesson content — phases, principles, brownfield elevation, construction, operations, 5 levels |
| `aidlc-web-app/src/content/glossary.ts` | 37 glossary terms with definitions, examples, and source references |
| `aidlc-web-app/src/content/quiz.ts` | Quiz questions covering all methodology areas |
| `aidlc-docs/inception/intent.md` | Intent artifact example with success metrics |
| `aidlc-docs/inception/requirements.md` | Requirements artifact example |
| `aidlc-docs/inception/nfr.md` | NFR artifact example (7 categories) |
| `aidlc-docs/execution-plan.md` | Execution plan artifact example with phase tracking |
| `aidlc-docs/audit.md` | Audit log artifact example (append-only decisions and evidence) |
| `aidlc-docs/aidlc-state.md` | State tracking artifact example |
| `aidlc-docs/construction/unit-01/design.md` | Construction design artifact example |
| `aidlc-docs/construction/unit-01/tasks-plan.md` | Tasks plan artifact example |
| `aidlc-docs/construction/unit-01/validation-report.md` | Validation report artifact example |

---

## Source Reliability Notes

- AWS blog posts and GitHub repositories are treated as authoritative for methodology definition
- DeepWiki analysis is treated as reliable secondary interpretation of the AWS workflows
- The Nate B Jones video is treated as authoritative practitioner perspective (first-hand reporting on StrongDM, Dan Shapiro's framework)
- The Operationalization Cheat Sheet is treated as practitioner-derived operational guidance
- The METR study is cited as published research (peer-reviewed)
- Geoffrey Huntley's Ralph pattern is treated as practitioner documentation of a specific automation technique
- The unofficial aidlc-mcp server is treated as a community implementation, not an official AWS artifact

---

## Suggested Talking Points

- The methodology draws from three streams: AWS official (blog + workflows), practitioner experience (Nate B Jones, Jonas/Raja SP, Huntley), and published research (METR)
- AWS provides the lifecycle framework; practitioners provide the operational reality
- The 5 Levels framework (Shapiro/Jones) maps directly to AI-SDLC adoption maturity
- The Operationalization Cheat Sheet bridges the gap between "what AI-SDLC is" and "how to actually run it"
- All content in this summary set is traceable to specific sources — no unsourced claims
- The METR study is the most frequently cited data point: 19% slower is the J-curve in numbers
- StrongDM is the most concrete L5 case study available — 3 people, production Rust, no code review
