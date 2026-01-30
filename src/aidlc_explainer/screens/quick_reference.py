"""Quick Reference Card screen - single-screen AI-DLC summary."""

from textual.app import ComposeResult
from textual.containers import VerticalScroll, Horizontal
from textual.widgets import Static, Button
from textual.binding import Binding

from aidlc_explainer.screens.base import ExplorerScreen


def build_quick_reference() -> str:
    """Build the quick reference content."""
    return """\
╔══════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                    AI-DLC QUICK REFERENCE CARD                                       ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                         THREE PHASES                                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│   🔵 INCEPTION      │  WHAT + WHY   │  Convert intent → testable units                              │
│   🟢 CONSTRUCTION   │  HOW          │  Build units with proof                                       │
│   🟡 OPERATIONS     │  WHERE/WHEN   │  Productionize safely                                         │
│                                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────┬──────────────────────────────────────────────────────┐
│           10 CORE PRINCIPLES                 │                  KEY ARTIFACTS                       │
├──────────────────────────────────────────────┼──────────────────────────────────────────────────────┤
│                                              │                                                      │
│  1. Human accountability is the loss func    │  aidlc-docs/                                         │
│  2. Plan-first, stage-by-stage               │  ├── aidlc-state.md      Current phase/stage/status  │
│  3. Small, coherent units over big batches   │  ├── execution-plan.md   Stage sequence + rationale  │
│  4. Persisted artifacts are first-class      │  ├── audit.md            Append-only decision log    │
│  5. Adaptive depth: "exactly enough detail"  │  ├── inception/                                      │
│  6. Proof over prose                         │  │   ├── intent.md       High-level goal + metrics   │
│  7. Tooling is for truth, not vibes          │  │   ├── requirements.md Functional requirements     │
│  8. Separation of concerns in prompts        │  │   ├── nfr.md          Non-functional requirements │
│  9. Safety constraints are explicit          │  │   └── units/          One file per unit           │
│ 10. Continuous prompt/rule improvement       │  └── construction/<unit>/                            │
│                                              │      ├── design.md       Domain + logical design     │
│                                              │      ├── tasks-plan.md   Checkboxed task list        │
│                                              │      └── validation-report.md  Evidence              │
│                                              │                                                      │
└──────────────────────────────────────────────┴──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────┬──────────────────────────────────────────────────────┐
│           GATE CHECKLIST TEMPLATE            │                   KEY RITUALS                        │
├──────────────────────────────────────────────┼──────────────────────────────────────────────────────┤
│                                              │                                                      │
│  □ Plan documented with checkboxes           │  MOB ELABORATION (60 min)    MOB CONSTRUCTION (2h)   │
│  □ Questions answered (no ambiguity)         │  ├── Preparation    15 min   ├── Bolt Planning  15m  │
│  □ Design reviewed and approved              │  ├── Structured Q&A 20 min   ├── AI Execution   60m  │
│  □ Tests written and passing                 │  ├── Unit Decomp    20 min   ├── Evidence       30m  │
│  □ Static analysis clean                     │  └── Approval        5 min   └── Guardrail     15m   │
│  □ Security scan passed                      │                                                      │
│  □ Runtime validation complete               │  GATE REVIEW (30 min)                                │
│  □ Acceptance criteria met                   │  ├── Evidence Review    15 min                       │
│  □ Evidence in validation-report.md          │  ├── Checklist Verify  10 min                        │
│                                              │  └── Go/No-Go Decision  5 min                        │
│                                              │                                                      │
└──────────────────────────────────────────────┴──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────┬──────────────────────────────────────────────────────┐
│           WORKFLOW VARIANTS                  │                   REMEMBER                           │
├──────────────────────────────────────────────┼──────────────────────────────────────────────────────┤
│                                              │                                                      │
│  GREENFIELD  │ No existing code              │  • AI proposes, humans decide                        │
│              │ Full inception ceremony       │  • Every gate needs evidence                         │
│                                              │  • "Done" = tests pass + checks green + validated    │
│  BROWNFIELD  │ Modify existing code          │  • Artifacts persist; chat history doesn't           │
│              │ + Reverse engineering stage   │  • Execute only stages that add value                │
│                                              │  • Small units = faster feedback = less risk         │
│  FRONTEND    │ UI/UX focus                   │  • When in doubt, ask the human                      │
│              │ + Browser validation          │  • Document decisions in audit.md                    │
│                                              │                                                      │
│  BUGFIX      │ Small targeted fix            │  ─────────────────────────────────────────────────   │
│              │ Minimal ceremony (4-5 stages) │  "The goal is not to replace humans, but to          │
│                                              │   amplify their ability to build quality software."  │
│                                              │                                                      │
└──────────────────────────────────────────────┴──────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  [E] Export to file  │  [Esc] Go back  │  [?] Help from anywhere  │  [Q] Quit application           │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
"""


class QuickReferenceScreen(ExplorerScreen):
    """Single-screen AI-DLC quick reference card."""
    
    BINDINGS = [
        Binding("escape", "go_back", "Back"),
        Binding("e", "export", "Export"),
        Binding("q", "quit_app", "Quit"),
    ]
    
    DEFAULT_CSS = """
    QuickReferenceScreen VerticalScroll {
        padding: 0 1;
        height: 1fr;
    }
    
    QuickReferenceScreen #reference-content {
        width: 100%;
        min-width: 100;
    }
    
    QuickReferenceScreen #qr-buttons {
        margin: 1 2;
        height: auto;
    }
    
    QuickReferenceScreen #qr-buttons Button {
        margin: 0 1 0 0;
    }
    """
    
    def __init__(self) -> None:
        super().__init__(title="Quick Reference")
    
    def compose_content(self) -> ComposeResult:
        with VerticalScroll():
            yield Static(build_quick_reference(), id="reference-content")
        
        with Horizontal(id="qr-buttons"):
            yield Button("[E] Export to File", id="export-btn", variant="primary")
            yield Button("[?] Help", id="help-btn", variant="default")
            yield Button("[Esc] Back", id="back-btn", variant="default")
    
    def on_button_pressed(self, event: Button.Pressed) -> None:
        """Handle button presses."""
        if event.button.id == "export-btn":
            self.action_export()
        elif event.button.id == "help-btn":
            self.app.action_toggle_help()
        elif event.button.id == "back-btn":
            self.action_go_back()
    
    def action_export(self) -> None:
        """Export the quick reference to a file."""
        try:
            content = build_quick_reference()
            with open("aidlc-quick-reference.md", "w", encoding="utf-8") as f:
                f.write("# AI-DLC Quick Reference Card\n\n")
                f.write("```\n")
                f.write(content)
                f.write("\n```\n")
            self.notify("Exported to aidlc-quick-reference.md", title="Export Complete")
        except Exception as e:
            self.notify(f"Export failed: {e}", title="Error", severity="error")
    
    def action_quit_app(self) -> None:
        """Quit the application."""
        self.app.exit()
