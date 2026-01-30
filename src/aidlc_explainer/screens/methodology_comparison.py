"""Methodology comparison screen with animated visualization."""

from textual.app import ComposeResult
from textual.binding import Binding
from textual.containers import Vertical, Horizontal, ScrollableContainer
from textual.widgets import Static, Button, Select
from textual.timer import Timer

from aidlc_explainer.screens.base import ExplorerScreen
from aidlc_explainer.content.methodology_comparison import (
    get_all_methodologies,
    get_comparison_metrics,
    get_project_scenarios,
    simulate_project,
    get_methodology,
    Methodology,
    ProjectScenario,
)


class MethodologyTimeline(Static):
    """A timeline visualization for a methodology."""
    
    def __init__(self, methodology: Methodology, **kwargs) -> None:
        super().__init__(**kwargs)
        self.methodology = methodology
        self.animation_progress = 0  # 0-100
        self._timer: Timer | None = None
    
    def on_mount(self) -> None:
        """Start animation when mounted."""
        self._timer = self.set_interval(0.1, self._animate)
    
    def _animate(self) -> None:
        """Animate the timeline."""
        if self.animation_progress < 100:
            self.animation_progress += 2
            self.refresh()
        elif self._timer:
            self._timer.stop()
    
    def render(self) -> str:
        """Render the timeline."""
        m = self.methodology
        
        # Calculate total units for scaling
        total_units = sum(p.duration_units for p in m.phases if p.duration_units > 0)
        if total_units == 0:
            total_units = 1
        
        # Timeline width
        width = 60
        
        lines = []
        lines.append(f"┌─ {m.name} {'─' * (width - len(m.name) - 4)}┐")
        
        # Draw phases
        current_pos = 0
        phase_line = "│ "
        label_line = "│ "
        
        for phase in m.phases:
            if phase.duration_units == 0:
                continue
            
            # Calculate phase width
            phase_width = max(3, int((phase.duration_units / total_units) * (width - 4)))
            
            # Calculate how much to show based on animation
            visible_start = int((self.animation_progress / 100) * (width - 4))
            
            if current_pos < visible_start:
                # Show this phase
                show_width = min(phase_width, visible_start - current_pos)
                phase_char = "█"
                phase_line += phase_char * show_width
                
                # Add label if space
                label = phase.name[:show_width-1] if show_width > 2 else ""
                label_line += label.center(show_width)
            else:
                # Not yet visible
                phase_line += "░" * phase_width
                label_line += " " * phase_width
            
            # Add separator
            if phase != m.phases[-1] and phase.duration_units > 0:
                next_has_duration = any(p.duration_units > 0 for p in m.phases[m.phases.index(phase)+1:])
                if next_has_duration:
                    phase_line += "│"
                    label_line += " "
            
            current_pos += phase_width + 1
        
        # Pad to width
        phase_line = phase_line[:width-1].ljust(width-1) + "│"
        label_line = label_line[:width-1].ljust(width-1) + "│"
        
        lines.append(phase_line)
        lines.append(label_line)
        lines.append(f"└{'─' * (width - 2)}┘")
        
        # Add metrics
        lines.append(f"  Time: {m.cycle_time_factor:.0%} of baseline  │  Cost: {m.cost_factor:.0%}  │  Feedback: {m.feedback_loop_time}")
        
        return "\n".join(lines)


class MethodologyComparisonScreen(ExplorerScreen):
    """Screen comparing Waterfall, Agile, and AI-DLC methodologies."""
    
    DEFAULT_CSS = """
    MethodologyComparisonScreen #intro {
        margin: 1 2;
        text-align: center;
    }
    
    MethodologyComparisonScreen #timelines-container {
        height: auto;
        margin: 1 2;
    }
    
    MethodologyComparisonScreen .timeline-box {
        margin: 1 0;
        padding: 1;
        background: $surface;
        border: round $primary;
    }
    
    MethodologyComparisonScreen #metrics-title {
        text-style: bold;
        color: $primary-lighten-2;
        text-align: center;
        margin: 2 0 1 0;
    }
    
    MethodologyComparisonScreen #metrics-table {
        margin: 0 2;
        padding: 1;
        background: $surface;
        border: round $secondary;
    }
    
    MethodologyComparisonScreen .metric-row {
        margin: 0 0 1 0;
    }
    
    MethodologyComparisonScreen .metric-name {
        text-style: bold;
        color: $text;
    }
    
    MethodologyComparisonScreen .metric-value {
        color: $text-muted;
    }
    
    MethodologyComparisonScreen .winner {
        color: $success;
        text-style: bold;
    }
    
    MethodologyComparisonScreen #scenario-section {
        margin: 2 2;
        padding: 1;
        background: $surface;
        border: round $warning;
    }
    
    MethodologyComparisonScreen .scenario-title {
        text-style: bold;
        color: $warning;
        margin-bottom: 1;
    }
    
    MethodologyComparisonScreen #results-container {
        margin: 1 0;
    }
    
    MethodologyComparisonScreen .result-card {
        padding: 1;
        margin: 0 1 0 0;
        background: $surface-darken-1;
        border: solid $primary-darken-1;
        width: 1fr;
    }
    """
    
    BINDINGS = [
        Binding("1", "select_scenario(0)", "Banking App"),
        Binding("2", "select_scenario(1)", "Startup MVP"),
        Binding("3", "select_scenario(2)", "API Integration"),
        Binding("4", "select_scenario(3)", "Legacy Rewrite"),
        Binding("r", "restart_animation", "Restart"),
    ]
    
    def __init__(self) -> None:
        super().__init__(title="Methodology Comparison")
        self.methodologies = get_all_methodologies()
        self.metrics = get_comparison_metrics()
        self.scenarios = get_project_scenarios()
        self.selected_scenario: ProjectScenario | None = None
    
    def compose_content(self) -> ComposeResult:
        yield Static(
            "╭─ Methodology Comparison ────────────────────────────────────────────────╮\n"
            "│  Compare how Waterfall, Agile, and AI-DLC approach software delivery   │\n"
            "│  Watch the animated timelines and see metrics side by side             │\n"
            "╰────────────────────────────────────────────────────────────────────────╯",
            id="intro"
        )
        
        with ScrollableContainer(id="main-scroll"):
            # Animated timelines
            with Vertical(id="timelines-container"):
                for methodology in self.methodologies:
                    with Vertical(classes="timeline-box"):
                        yield MethodologyTimeline(methodology, id=f"timeline-{methodology.id}")
            
            # Comparison metrics
            yield Static("─── Key Metrics Comparison ───", id="metrics-title")
            
            with Vertical(id="metrics-table"):
                # Header
                yield Static(
                    f"{'Metric':<25} {'Waterfall':<20} {'Agile':<20} {'AI-DLC':<20}",
                    classes="metric-row metric-name"
                )
                yield Static("─" * 85)
                
                # Metrics
                for metric in self.metrics:
                    waterfall_class = "winner" if metric.winner == "waterfall" else "metric-value"
                    agile_class = "winner" if metric.winner == "agile" else "metric-value"
                    aidlc_class = "winner" if metric.winner == "aidlc" else "metric-value"
                    
                    # Simple text rendering (can't easily do per-cell styling in Static)
                    line = f"{metric.name:<25} {metric.waterfall:<20} {metric.agile:<20} {metric.aidlc:<20}"
                    
                    # Add winner indicator
                    if metric.winner == "aidlc":
                        line += " ✓"
                    
                    yield Static(line, classes="metric-row")
            
            # Project Scenario Simulator
            with Vertical(id="scenario-section"):
                yield Static("─── Project Scenario Simulator ───", classes="scenario-title")
                yield Static("Press 1-4 to simulate different project types:\n")
                
                for i, scenario in enumerate(self.scenarios):
                    yield Static(f"  [{i+1}] {scenario.name}: {scenario.description}")
                
                yield Static("", id="scenario-results")
    
    def action_select_scenario(self, index: int) -> None:
        """Select and simulate a project scenario."""
        if 0 <= index < len(self.scenarios):
            self.selected_scenario = self.scenarios[index]
            self._show_simulation_results()
    
    def action_restart_animation(self) -> None:
        """Restart all timeline animations."""
        for methodology in self.methodologies:
            try:
                timeline = self.query_one(f"#timeline-{methodology.id}", MethodologyTimeline)
                timeline.animation_progress = 0
                timeline._timer = timeline.set_interval(0.1, timeline._animate)
            except Exception:
                pass
    
    def _show_simulation_results(self) -> None:
        """Show simulation results for selected scenario."""
        if not self.selected_scenario:
            return
        
        results_widget = self.query_one("#scenario-results", Static)
        
        lines = [f"\n─── Simulating: {self.selected_scenario.name} ───\n"]
        lines.append(f"Complexity: {self.selected_scenario.complexity.upper()}  │  "
                    f"Requirements: {self.selected_scenario.requirements_stability}  │  "
                    f"Team: {self.selected_scenario.team_size} people\n")
        
        # Run simulations
        results = []
        for methodology in self.methodologies:
            result = simulate_project(self.selected_scenario, methodology)
            results.append((methodology, result))
        
        # Find best (lowest) for each metric
        min_weeks = min(r.total_weeks for _, r in results)
        min_cost = min(r.total_cost_units for _, r in results)
        max_feedback = max(r.feedback_points for _, r in results)
        
        # Display results
        lines.append(f"{'Methodology':<15} {'Time (weeks)':<15} {'Cost (units)':<15} {'Feedback Points':<18} {'Risks':<20}")
        lines.append("─" * 80)
        
        for methodology, result in results:
            time_mark = "✓ BEST" if result.total_weeks == min_weeks else ""
            cost_mark = "✓" if result.total_cost_units == min_cost else ""
            feedback_mark = "✓" if result.feedback_points == max_feedback else ""
            
            risk_text = str(len(result.risk_events)) if result.risk_events else "None"
            
            lines.append(
                f"{methodology.name:<15} "
                f"{result.total_weeks:<6} {time_mark:<8} "
                f"{result.total_cost_units:<6} {cost_mark:<8} "
                f"{result.feedback_points:<8} {feedback_mark:<9} "
                f"{risk_text:<20}"
            )
        
        lines.append("\n📊 AI-DLC delivers faster with more validation points and lower risk.")
        
        results_widget.update("\n".join(lines))
