"""Entry point for the AI-SDLC Explainer application."""

import argparse
import hashlib
import sys
from datetime import datetime
from pathlib import Path


def parse_args() -> argparse.Namespace:
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        prog="aidlc-explainer",
        description="Interactive TUI learning tool for AI-DLC methodology",
    )
    parser.add_argument(
        "--screenshot-mode",
        action="store_true",
        help="Enable screenshot mode (stable output, no animations)",
    )
    parser.add_argument(
        "--theme",
        choices=["dark", "light"],
        default="dark",
        help="Color theme (default: dark)",
    )
    parser.add_argument(
        "--export-report",
        action="store_true",
        help="Export learning progress report to file",
    )
    parser.add_argument(
        "--reset-progress",
        action="store_true",
        help="Reset all learning progress",
    )
    parser.add_argument(
        "--version",
        action="version",
        version="%(prog)s 0.1.0",
    )
    return parser.parse_args()


def export_report() -> None:
    """Export learning progress report to markdown file."""
    from aidlc_explainer.state import StateManager
    
    state = StateManager()
    progress = state.get_overall_progress()
    achievements = state.get_achievements()
    
    report = []
    report.append("# AI-DLC Explainer Learning Report")
    report.append("")
    report.append(f"**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    report.append("")
    
    # Overall Progress
    report.append("## Overall Progress")
    report.append("")
    report.append(f"**Completion:** {progress['overall_percent']:.0f}%")
    report.append("")
    
    # Detailed Progress
    report.append("## Detailed Progress")
    report.append("")
    
    l = progress["lessons"]
    report.append(f"### Lessons")
    report.append(f"- Completed: {l['completed']}/{l['total']} ({l['percent']:.0f}%)")
    report.append("")
    
    q = progress["quiz"]
    report.append(f"### Quiz")
    report.append(f"- Best Score: {q['score']}/{q['total']} ({q['percent']:.0f}%)")
    report.append(f"- Attempts: {q['attempts']}")
    report.append("")
    
    g = progress["gatekeeper"]
    report.append(f"### Gatekeeper Scenarios")
    report.append(f"- Best Score: {g['score']}/{g['total']} ({g['percent']:.0f}%)")
    report.append(f"- Attempts: {g['attempts']}")
    report.append("")
    
    s = progress["simulator"]
    report.append(f"### Stage Simulator")
    report.append(f"- Request Types Explored: {s['types_explored']}/4")
    report.append(f"- Total Runs: {s['runs']}")
    report.append("")
    
    # Achievements
    report.append("## Achievements")
    report.append("")
    ach_names = {
        "first-steps": "🎓 First Steps - Completed first lesson",
        "scholar": "📚 Scholar - Completed all lessons",
        "quiz-master": "🎯 Quiz Master - Scored 80%+ on quiz",
        "perfect-score": "⭐ Perfect Score - Scored 100% on quiz",
        "gatekeeper": "🚧 Gatekeeper - Scored 80%+ on gatekeeper",
        "simulator-explorer": "🔬 Explorer - Explored all simulator request types",
        "completionist": "🏆 Completionist - Completed everything",
    }
    
    report.append(f"**Unlocked:** {progress['achievements']['unlocked']}/{progress['achievements']['total']}")
    report.append("")
    
    if achievements["unlocked"]:
        for ach_id in achievements["unlocked"]:
            name = ach_names.get(ach_id, ach_id)
            report.append(f"- {name}")
    else:
        report.append("- No achievements unlocked yet")
    report.append("")
    
    # Certificate eligibility
    report.append("## Certificate Status")
    report.append("")
    is_eligible = (
        l["completed"] >= 6 and
        q["percent"] >= 80
    )
    if is_eligible:
        report.append("✅ **Eligible for completion certificate!**")
        report.append("")
        report.append("Run the app and complete the certificate flow to generate your certificate.")
    else:
        report.append("❌ **Not yet eligible for certificate**")
        report.append("")
        report.append("Requirements:")
        report.append(f"- Complete all 6 lessons: {'✅' if l['completed'] >= 6 else '❌'} ({l['completed']}/6)")
        report.append(f"- Score 80%+ on quiz: {'✅' if q['percent'] >= 80 else '❌'} ({q['percent']:.0f}%)")
    
    # Write report
    filename = "aidlc-learning-report.md"
    Path(filename).write_text("\n".join(report), encoding="utf-8")
    print(f"✅ Report exported to: {filename}")


def reset_progress() -> None:
    """Reset all learning progress."""
    from aidlc_explainer.state import StateManager
    
    state = StateManager()
    state.reset()
    print("✅ All progress has been reset.")


def generate_certificate(name: str) -> str:
    """Generate a completion certificate."""
    from aidlc_explainer.state import StateManager
    
    state = StateManager()
    progress = state.get_overall_progress()
    
    # Check eligibility
    l = progress["lessons"]
    q = progress["quiz"]
    
    if l["completed"] < 6 or q["percent"] < 80:
        return "Not eligible for certificate. Complete all lessons and score 80%+ on quiz."
    
    # Generate certificate
    date_str = datetime.now().strftime("%Y-%m-%d")
    cert_data = f"{name}-{date_str}-aidlc-explainer"
    cert_id = hashlib.sha256(cert_data.encode()).hexdigest()[:12].upper()
    
    cert = f"""
╭────────────────────────────────────────────────────────────────────────────────╮
│                                                                                │
│                        CERTIFICATE OF COMPLETION                               │
│                                                                                │
│                          AI-DLC Methodology Training                           │
│                                                                                │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│                          This certifies that                                   │
│                                                                                │
│                              {name.center(40)}                                 │
│                                                                                │
│              has successfully completed the AI-DLC Explainer                   │
│              curriculum and demonstrated proficiency in the                    │
│              AI-Driven Development Lifecycle methodology.                      │
│                                                                                │
│                                                                                │
│    Lessons Completed: {l['completed']}/6                                                │
│    Quiz Score: {q['score']}/{q['total']} ({q['percent']:.0f}%)                                               │
│    Achievements: {progress['achievements']['unlocked']}/{progress['achievements']['total']}                                                  │
│                                                                                │
│                                                                                │
│    Date: {date_str}                                                        │
│    Certificate ID: {cert_id}                                           │
│                                                                                │
╰────────────────────────────────────────────────────────────────────────────────╯
"""
    return cert


def main() -> int:
    """Run the AI-SDLC Explainer TUI application."""
    args = parse_args()
    
    # Handle non-TUI commands
    if args.export_report:
        export_report()
        return 0
    
    if args.reset_progress:
        reset_progress()
        return 0
    
    # Run TUI
    from aidlc_explainer.app import AIDLCExplainerApp
    
    app = AIDLCExplainerApp(
        screenshot_mode=args.screenshot_mode,
        theme=args.theme,
    )
    app.run()
    return 0


if __name__ == "__main__":
    sys.exit(main())
