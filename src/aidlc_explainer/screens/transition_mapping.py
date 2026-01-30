"""Transition mapping screen for Agile to AI-DLC transition guidance."""

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical, Horizontal, ScrollableContainer
from textual.widgets import Static, Button, TabbedContent, TabPane

from aidlc_explainer.screens.base import ExplorerScreen
from aidlc_explainer.content.transition_mapping import (
    get_role_mappings,
    get_process_mappings,
    get_artifact_mappings,
    get_transition_phases,
    get_readiness_checklist,
)


class TransitionMappingScreen(ExplorerScreen):
    """Screen showing how to transition from Agile to AI-DLC."""
    
    DEFAULT_CSS = """
    TransitionMappingScreen #intro {
        margin: 1 2;
        text-align: center;
    }
    
    TransitionMappingScreen TabbedContent {
        height: 1fr;
    }
    
    TransitionMappingScreen TabPane {
        padding: 1;
    }
    
    TransitionMappingScreen .section-title {
        text-style: bold;
        color: $primary-lighten-2;
        margin: 1 0;
    }
    
    TransitionMappingScreen .mapping-card {
        background: $surface;
        border: round $primary;
        padding: 1;
        margin: 0 0 1 0;
    }
    
    TransitionMappingScreen .mapping-header {
        text-style: bold;
        color: $warning;
    }
    
    TransitionMappingScreen .arrow {
        color: $success;
        text-style: bold;
    }
    
    TransitionMappingScreen .changes-list {
        color: $text-muted;
        margin-left: 2;
    }
    
    TransitionMappingScreen .phase-card {
        background: $surface;
        border: solid $secondary;
        padding: 1;
        margin: 0 0 1 0;
    }
    
    TransitionMappingScreen .phase-name {
        text-style: bold;
        color: $primary-lighten-2;
    }
    
    TransitionMappingScreen .phase-duration {
        color: $warning;
    }
    
    TransitionMappingScreen .checklist-item {
        padding: 0 1;
    }
    
    TransitionMappingScreen .critical {
        color: $error;
    }
    
    TransitionMappingScreen .high {
        color: $warning;
    }
    
    TransitionMappingScreen .medium {
        color: $text-muted;
    }
    """
    
    BINDINGS = [
        Binding("1", "switch_tab('roles')", "Roles"),
        Binding("2", "switch_tab('processes')", "Processes"),
        Binding("3", "switch_tab('artifacts')", "Artifacts"),
        Binding("4", "switch_tab('timeline')", "Timeline"),
        Binding("5", "switch_tab('checklist')", "Checklist"),
    ]
    
    def __init__(self) -> None:
        super().__init__(title="Transition Mapping")
        self.role_mappings = get_role_mappings()
        self.process_mappings = get_process_mappings()
        self.artifact_mappings = get_artifact_mappings()
        self.transition_phases = get_transition_phases()
        self.checklist = get_readiness_checklist()
    
    def compose_content(self) -> ComposeResult:
        yield Static(
            "╭─ Agile → AI-DLC Transition Guide ───────────────────────────────────────╮\n"
            "│  Map your current Agile practices to AI-DLC equivalents                │\n"
            "│  Use tabs or press 1-5 to navigate sections                            │\n"
            "╰────────────────────────────────────────────────────────────────────────╯",
            id="intro"
        )
        
        with TabbedContent():
            with TabPane("Roles", id="roles"):
                yield from self._compose_roles()
            
            with TabPane("Processes", id="processes"):
                yield from self._compose_processes()
            
            with TabPane("Artifacts", id="artifacts"):
                yield from self._compose_artifacts()
            
            with TabPane("Timeline", id="timeline"):
                yield from self._compose_timeline()
            
            with TabPane("Checklist", id="checklist"):
                yield from self._compose_checklist()
    
    def _compose_roles(self) -> ComposeResult:
        """Compose the roles mapping tab."""
        with ScrollableContainer():
            yield Static("─── Role Transformation ───", classes="section-title")
            yield Static("How Agile roles evolve in AI-DLC:")
            yield Static("")
            
            for mapping in self.role_mappings:
                with Vertical(classes="mapping-card"):
                    yield Static(
                        f"{mapping.agile_role}  →  {mapping.aidlc_role}",
                        classes="mapping-header"
                    )
                    yield Static("")
                    yield Static("AGILE responsibilities:")
                    for resp in mapping.agile_responsibilities[:3]:
                        yield Static(f"  • {resp}", classes="changes-list")
                    yield Static("")
                    yield Static("AI-DLC responsibilities:")
                    for resp in mapping.aidlc_responsibilities[:3]:
                        yield Static(f"  • {resp}", classes="changes-list")
                    yield Static("")
                    yield Static("🔑 Key changes:")
                    for change in mapping.key_changes[:2]:
                        yield Static(f"  → {change}", classes="arrow")
                    yield Static("")
                    yield Static("📚 Skills to develop:")
                    skills = ", ".join(mapping.skills_to_develop[:3])
                    yield Static(f"  {skills}", classes="changes-list")
    
    def _compose_processes(self) -> ComposeResult:
        """Compose the processes mapping tab."""
        with ScrollableContainer():
            yield Static("─── Process Transformation ───", classes="section-title")
            yield Static("How Agile ceremonies evolve in AI-DLC:\n")
            
            for mapping in self.process_mappings:
                with Vertical(classes="mapping-card"):
                    yield Static(
                        f"{mapping.agile_process}  →  {mapping.aidlc_process}",
                        classes="mapping-header"
                    )
                    
                    yield Static(
                        f"\n  Agile: {mapping.agile_frequency}, {mapping.agile_duration}"
                    )
                    yield Static(
                        f"  AI-DLC: {mapping.aidlc_frequency}, {mapping.aidlc_duration}"
                    )
                    
                    yield Static("\n  Key differences:")
                    for diff in mapping.key_differences[:3]:
                        yield Static(f"    → {diff}", classes="arrow")
    
    def _compose_artifacts(self) -> ComposeResult:
        """Compose the artifacts mapping tab."""
        with ScrollableContainer():
            yield Static("─── Artifact Transformation ───", classes="section-title")
            yield Static("How Agile artifacts evolve in AI-DLC:\n")
            
            # Header
            yield Static(
                f"{'Agile Artifact':<20} {'AI-DLC Artifact':<20} {'Key Change':<35}",
                classes="mapping-header"
            )
            yield Static("─" * 75)
            
            for mapping in self.artifact_mappings:
                yield Static(
                    f"{mapping.agile_artifact:<20} {mapping.aidlc_artifact:<20} {mapping.key_differences[0]:<35}"
                )
            
            yield Static("\n─── Detailed Mappings ───", classes="section-title")
            
            for mapping in self.artifact_mappings:
                with Vertical(classes="mapping-card"):
                    yield Static(
                        f"{mapping.agile_artifact}  →  {mapping.aidlc_artifact}",
                        classes="mapping-header"
                    )
                    yield Static(f"\n  Agile: {mapping.agile_purpose}")
                    yield Static(f"  AI-DLC: {mapping.aidlc_purpose}")
                    yield Static("\n  Changes:")
                    for diff in mapping.key_differences:
                        yield Static(f"    → {diff}", classes="arrow")
    
    def _compose_timeline(self) -> ComposeResult:
        """Compose the transition timeline tab."""
        with ScrollableContainer():
            yield Static("─── Transition Timeline ───", classes="section-title")
            yield Static("Recommended phases for transitioning to AI-DLC:\n")
            
            # Visual timeline
            yield Static(
                "  [Awareness]─────[Pilot]─────[Expand]─────[Optimize]───→",
                classes="arrow"
            )
            yield Static(
                "    1-2 wks       2-4 wks      4-8 wks       Ongoing",
                classes="phase-duration"
            )
            yield Static("")
            
            for phase in self.transition_phases:
                with Vertical(classes="phase-card"):
                    yield Static(
                        f"📍 Phase: {phase.name}",
                        classes="phase-name"
                    )
                    yield Static(f"   Duration: {phase.duration}", classes="phase-duration")
                    yield Static(f"   Focus: {phase.focus}")
                    
                    yield Static("\n   Activities:")
                    for activity in phase.activities:
                        yield Static(f"     • {activity}")
                    
                    yield Static("\n   Success Criteria:")
                    for criteria in phase.success_criteria:
                        yield Static(f"     ✓ {criteria}", classes="arrow")
                    
                    yield Static("\n   Risks to Watch:")
                    for risk in phase.risks:
                        yield Static(f"     ⚠ {risk}", classes="critical")
    
    def _compose_checklist(self) -> ComposeResult:
        """Compose the readiness checklist tab."""
        with ScrollableContainer():
            yield Static("─── Transition Readiness Checklist ───", classes="section-title")
            yield Static("Assess your readiness before starting:\n")
            
            # Group by category
            categories = {}
            for item in self.checklist:
                if item.category not in categories:
                    categories[item.category] = []
                categories[item.category].append(item)
            
            for category, items in categories.items():
                yield Static(f"\n📋 {category}", classes="section-title")
                
                for item in items:
                    importance_class = item.importance
                    indicator = {
                        "critical": "🔴",
                        "high": "🟡", 
                        "medium": "⚪"
                    }.get(item.importance, "⚪")
                    
                    yield Static(
                        f"  {indicator} {item.item}",
                        classes=f"checklist-item {importance_class}"
                    )
                    yield Static(f"      {item.description}", classes="changes-list")
            
            yield Static("\n─── Legend ───")
            yield Static("  🔴 Critical - Must have before starting")
            yield Static("  🟡 High - Important for success")
            yield Static("  ⚪ Medium - Nice to have")
    
    def action_switch_tab(self, tab_id: str) -> None:
        """Switch to a specific tab."""
        try:
            tabbed_content = self.query_one(TabbedContent)
            tabbed_content.active = tab_id
        except Exception:
            pass
