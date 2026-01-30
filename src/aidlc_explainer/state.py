"""State management for progress persistence."""

import json
from datetime import datetime
from pathlib import Path
from typing import Any


def _get_quiz_question_count() -> int:
    """Get the actual number of quiz questions from the JSON file."""
    try:
        quiz_path = Path(__file__).parent / "content" / "practice" / "quiz.json"
        with open(quiz_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            return len(data.get("questions", []))
    except Exception:
        return 24  # Default fallback


DEFAULT_STATE = {
    "$schema": "state-v1",
    "version": "1.0.0",
    "last_updated": None,
    "first_opened": None,
    "quiz": {
        "completed": False,
        "last_score": 0,
        "total_questions": 24,  # Updated to match actual quiz.json
        "attempts": 0,
        "mistakes": [],
        "best_score": 0,
    },
    "gatekeeper": {
        "completed": False,
        "last_score": 0,
        "total_scenarios": 10,
        "attempts": 0,
        "mistakes": [],
        "best_score": 0,
    },
    "lessons": {
        "completed": [],
        "in_progress": {},
        "total_available": 6,
    },
    "simulator": {
        "runs": 0,
        "request_types_explored": [],
        "last_run": None,
    },
    "achievements": {
        "unlocked": [],
        "progress": {},
    },
    "gamification": {
        "xp": 0,
        "level": 1,
        "title": "Novice",
    },
    "stats": {
        "total_sessions": 0,
        "total_time_seconds": 0,
        "streak_days": 0,
        "last_session_date": None,
    },
}

# XP rewards for various actions
XP_REWARDS = {
    "lesson_completed": 100,
    "lesson_section": 10,
    "quiz_correct": 25,
    "quiz_completed": 50,
    "quiz_perfect": 200,
    "gate_correct": 30,
    "gate_completed": 75,
    "simulator_run": 20,
    "simulator_new_type": 50,
    "achievement_unlocked": 100,
}

# Level thresholds and titles
LEVEL_THRESHOLDS = [
    (0, "Novice"),
    (100, "Apprentice"),
    (300, "Practitioner"),
    (600, "Specialist"),
    (1000, "Expert"),
    (1500, "Master"),
    (2500, "Grandmaster"),
    (4000, "AI-DLC Champion"),
]


class StateManager:
    """Manages persistent state for the application."""
    
    STATE_DIR = ".aidlc-explainer"
    STATE_FILE = "state.json"
    
    def __init__(self, base_path: Path | None = None) -> None:
        """Initialize state manager.
        
        Args:
            base_path: Base directory for state storage (defaults to cwd)
        """
        self.base_path = base_path or Path.cwd()
        self.state_dir = self.base_path / self.STATE_DIR
        self.state_file = self.state_dir / self.STATE_FILE
        self._state: dict[str, Any] = {}
        self._load()
    
    def _ensure_dir(self) -> None:
        """Ensure state directory exists."""
        self.state_dir.mkdir(parents=True, exist_ok=True)
    
    def _load(self) -> None:
        """Load state from file or create default."""
        try:
            if self.state_file.exists():
                with open(self.state_file, "r", encoding="utf-8") as f:
                    self._state = json.load(f)
                # Validate schema version
                if self._state.get("$schema") != "state-v1":
                    self._state = DEFAULT_STATE.copy()
            else:
                self._state = DEFAULT_STATE.copy()
        except (json.JSONDecodeError, IOError):
            self._state = DEFAULT_STATE.copy()
    
    def _save(self) -> None:
        """Save current state to file."""
        try:
            self._ensure_dir()
            self._state["last_updated"] = datetime.utcnow().isoformat() + "Z"
            with open(self.state_file, "w", encoding="utf-8") as f:
                json.dump(self._state, f, indent=2)
        except IOError:
            pass  # Fail silently - state is optional
    
    def reset(self) -> None:
        """Reset all progress to defaults."""
        self._state = DEFAULT_STATE.copy()
        self._save()
    
    # XP and Level methods
    def add_xp(self, action: str, multiplier: float = 1.0) -> int:
        """Add XP for an action and return the amount added."""
        if "gamification" not in self._state:
            self._state["gamification"] = DEFAULT_STATE["gamification"].copy()
        
        base_xp = XP_REWARDS.get(action, 0)
        xp_gained = int(base_xp * multiplier)
        
        self._state["gamification"]["xp"] = self._state["gamification"].get("xp", 0) + xp_gained
        self._update_level()
        self._save()
        
        return xp_gained
    
    def _update_level(self) -> None:
        """Update level based on current XP."""
        xp = self._state["gamification"].get("xp", 0)
        
        new_level = 1
        new_title = "Novice"
        
        for threshold, title in LEVEL_THRESHOLDS:
            if xp >= threshold:
                new_level = LEVEL_THRESHOLDS.index((threshold, title)) + 1
                new_title = title
        
        self._state["gamification"]["level"] = new_level
        self._state["gamification"]["title"] = new_title
    
    def get_gamification_stats(self) -> dict[str, Any]:
        """Get gamification statistics."""
        gam = self._state.get("gamification", DEFAULT_STATE["gamification"])
        xp = gam.get("xp", 0)
        level = gam.get("level", 1)
        title = gam.get("title", "Novice")
        
        # Calculate XP to next level
        next_threshold = 0
        for threshold, _ in LEVEL_THRESHOLDS:
            if threshold > xp:
                next_threshold = threshold
                break
        
        xp_to_next = next_threshold - xp if next_threshold > 0 else 0
        
        return {
            "xp": xp,
            "level": level,
            "title": title,
            "xp_to_next_level": xp_to_next,
            "next_level_threshold": next_threshold,
        }
    
    # Quiz state methods
    def get_quiz_stats(self) -> dict[str, Any]:
        """Get quiz statistics."""
        quiz = self._state.get("quiz", DEFAULT_STATE["quiz"])
        # Get actual question count from file
        actual_total = _get_quiz_question_count()
        return {
            "completed": quiz.get("completed", False),
            "last_score": quiz.get("last_score", 0),
            "total": actual_total,
            "attempts": quiz.get("attempts", 0),
            "mistakes": quiz.get("mistakes", []),
        }
    
    def save_quiz_result(self, score: int, total: int, mistakes: list[str]) -> None:
        """Save quiz result.
        
        Args:
            score: Number of correct answers
            total: Total number of questions
            mistakes: List of question IDs answered incorrectly
        """
        # Award XP for correct answers
        self.add_xp("quiz_correct", multiplier=score)
        self.add_xp("quiz_completed")
        
        # Bonus XP for perfect score
        if score == total:
            self.add_xp("quiz_perfect")
        
        self._state["quiz"] = {
            "completed": True,
            "last_score": score,
            "total_questions": total,
            "attempts": self._state.get("quiz", {}).get("attempts", 0) + 1,
            "mistakes": mistakes,
            "best_score": max(self._state.get("quiz", {}).get("best_score", 0), score),
        }
        self._check_achievements()
        self._save()
    
    # Gatekeeper state methods
    def get_gate_stats(self) -> dict[str, Any]:
        """Get gatekeeper statistics."""
        gate = self._state.get("gatekeeper", DEFAULT_STATE["gatekeeper"])
        return {
            "completed": gate.get("completed", False),
            "last_score": gate.get("last_score", 0),
            "total": gate.get("total_scenarios", 4),
            "attempts": gate.get("attempts", 0),
            "mistakes": gate.get("mistakes", []),
        }
    
    def save_gate_result(self, score: int, total: int, mistakes: list[str]) -> None:
        """Save gatekeeper result.
        
        Args:
            score: Number of correctly evaluated scenarios
            total: Total number of scenarios
            mistakes: List of scenario IDs evaluated incorrectly
        """
        current_best = self._state.get("gatekeeper", {}).get("best_score", 0)
        self._state["gatekeeper"] = {
            "completed": True,
            "last_score": score,
            "total_scenarios": total,
            "attempts": self._state.get("gatekeeper", {}).get("attempts", 0) + 1,
            "mistakes": mistakes,
            "best_score": max(current_best, score),
        }
        self._check_achievements()
        self._save()
    
    # Lesson state methods
    def get_lessons_stats(self) -> dict[str, Any]:
        """Get lesson statistics."""
        lessons = self._state.get("lessons", DEFAULT_STATE["lessons"])
        return {
            "completed": lessons.get("completed", []),
            "in_progress": lessons.get("in_progress", {}),
            "total": lessons.get("total_available", 6),
            "completed_count": len(lessons.get("completed", [])),
        }
    
    def mark_lesson_started(self, lesson_id: str) -> None:
        """Mark a lesson as started."""
        if "lessons" not in self._state:
            self._state["lessons"] = DEFAULT_STATE["lessons"].copy()
        if lesson_id not in self._state["lessons"].get("completed", []):
            self._state["lessons"]["in_progress"][lesson_id] = {
                "started_at": datetime.utcnow().isoformat() + "Z",
                "last_section": 0,
            }
        self._save()
    
    def update_lesson_progress(self, lesson_id: str, section_index: int) -> None:
        """Update progress within a lesson."""
        if "lessons" not in self._state:
            self._state["lessons"] = DEFAULT_STATE["lessons"].copy()
        if "in_progress" not in self._state["lessons"]:
            self._state["lessons"]["in_progress"] = {}
        self._state["lessons"]["in_progress"][lesson_id] = {
            "started_at": self._state["lessons"]["in_progress"].get(lesson_id, {}).get(
                "started_at", datetime.utcnow().isoformat() + "Z"
            ),
            "last_section": section_index,
        }
        self._save()
    
    def mark_lesson_completed(self, lesson_id: str) -> None:
        """Mark a lesson as completed."""
        if "lessons" not in self._state:
            self._state["lessons"] = DEFAULT_STATE["lessons"].copy()
        completed = self._state["lessons"].get("completed", [])
        if lesson_id not in completed:
            completed.append(lesson_id)
            self._state["lessons"]["completed"] = completed
            # Award XP for completing a new lesson
            self.add_xp("lesson_completed")
        # Remove from in_progress
        if lesson_id in self._state["lessons"].get("in_progress", {}):
            del self._state["lessons"]["in_progress"][lesson_id]
        self._check_achievements()
        self._save()
    
    # Simulator state methods
    def get_simulator_stats(self) -> dict[str, Any]:
        """Get simulator statistics."""
        sim = self._state.get("simulator", DEFAULT_STATE["simulator"])
        return {
            "runs": sim.get("runs", 0),
            "request_types_explored": sim.get("request_types_explored", []),
            "last_run": sim.get("last_run"),
        }
    
    def record_simulation_run(self, request_type: str) -> None:
        """Record a simulation run."""
        if "simulator" not in self._state:
            self._state["simulator"] = DEFAULT_STATE["simulator"].copy()
        self._state["simulator"]["runs"] = self._state["simulator"].get("runs", 0) + 1
        explored = self._state["simulator"].get("request_types_explored", [])
        
        # Award XP for simulation run
        self.add_xp("simulator_run")
        
        if request_type not in explored:
            explored.append(request_type)
            self._state["simulator"]["request_types_explored"] = explored
            # Bonus XP for exploring a new type
            self.add_xp("simulator_new_type")
        
        self._state["simulator"]["last_run"] = datetime.utcnow().isoformat() + "Z"
        self._check_achievements()
        self._save()
    
    # Achievement methods
    def get_achievements(self) -> dict[str, Any]:
        """Get achievement status."""
        ach = self._state.get("achievements", DEFAULT_STATE["achievements"])
        return {
            "unlocked": ach.get("unlocked", []),
            "progress": ach.get("progress", {}),
        }
    
    def _check_achievements(self) -> None:
        """Check and unlock achievements based on current state."""
        if "achievements" not in self._state:
            self._state["achievements"] = DEFAULT_STATE["achievements"].copy()
        
        unlocked = self._state["achievements"].get("unlocked", [])
        
        # Achievement definitions
        achievements = [
            ("first-steps", self._check_first_steps),
            ("scholar", self._check_scholar),
            ("quiz-master", self._check_quiz_master),
            ("perfect-score", self._check_perfect_score),
            ("gatekeeper", self._check_gatekeeper_ach),
            ("simulator-explorer", self._check_simulator_explorer),
            ("completionist", self._check_completionist),
        ]
        
        for ach_id, check_fn in achievements:
            if ach_id not in unlocked and check_fn():
                unlocked.append(ach_id)
        
        self._state["achievements"]["unlocked"] = unlocked
    
    def _check_first_steps(self) -> bool:
        """Check if user completed first lesson."""
        return len(self._state.get("lessons", {}).get("completed", [])) >= 1
    
    def _check_scholar(self) -> bool:
        """Check if user completed all lessons."""
        completed = len(self._state.get("lessons", {}).get("completed", []))
        return completed >= 6
    
    def _check_quiz_master(self) -> bool:
        """Check if user scored 80%+ on quiz."""
        quiz = self._state.get("quiz", {})
        if not quiz.get("completed"):
            return False
        best = quiz.get("best_score", quiz.get("last_score", 0))
        total = quiz.get("total_questions", 12)
        return best >= total * 0.8
    
    def _check_perfect_score(self) -> bool:
        """Check if user got 100% on quiz."""
        quiz = self._state.get("quiz", {})
        if not quiz.get("completed"):
            return False
        best = quiz.get("best_score", quiz.get("last_score", 0))
        total = quiz.get("total_questions", 12)
        return best >= total
    
    def _check_gatekeeper_ach(self) -> bool:
        """Check if user completed gatekeeper with 80%+."""
        gate = self._state.get("gatekeeper", {})
        if not gate.get("completed"):
            return False
        best = gate.get("best_score", gate.get("last_score", 0))
        total = gate.get("total_scenarios", 10)
        return best >= total * 0.8
    
    def _check_simulator_explorer(self) -> bool:
        """Check if user explored all 4 request types."""
        explored = self._state.get("simulator", {}).get("request_types_explored", [])
        return len(explored) >= 4
    
    def _check_completionist(self) -> bool:
        """Check if user completed everything."""
        return (
            self._check_scholar() and
            self._check_quiz_master() and
            self._check_gatekeeper_ach() and
            self._check_simulator_explorer()
        )
    
    # Overall progress
    def get_overall_progress(self) -> dict[str, Any]:
        """Get overall learning progress."""
        lessons = self.get_lessons_stats()
        quiz = self.get_quiz_stats()
        gate = self.get_gate_stats()
        sim = self.get_simulator_stats()
        ach = self.get_achievements()
        gam = self.get_gamification_stats()
        
        # Calculate percentages
        lessons_pct = (lessons["completed_count"] / lessons["total"]) * 100 if lessons["total"] > 0 else 0
        quiz_pct = (quiz["last_score"] / quiz["total"]) * 100 if quiz["total"] > 0 else 0
        gate_pct = (gate["last_score"] / gate["total"]) * 100 if gate["total"] > 0 else 0
        sim_pct = (len(sim["request_types_explored"]) / 4) * 100
        
        overall = (lessons_pct + quiz_pct + gate_pct + sim_pct) / 4
        
        return {
            "overall_percent": round(overall, 1),
            "lessons": {
                "completed": lessons["completed_count"],
                "total": lessons["total"],
                "percent": round(lessons_pct, 1),
            },
            "quiz": {
                "score": quiz["last_score"],
                "total": quiz["total"],
                "percent": round(quiz_pct, 1),
                "attempts": quiz["attempts"],
            },
            "gatekeeper": {
                "score": gate["last_score"],
                "total": gate["total"],
                "percent": round(gate_pct, 1),
                "attempts": gate["attempts"],
            },
            "simulator": {
                "runs": sim["runs"],
                "types_explored": len(sim["request_types_explored"]),
                "percent": round(sim_pct, 1),
            },
            "achievements": {
                "unlocked": len(ach["unlocked"]),
                "total": 7,
            },
            "gamification": {
                "xp": gam["xp"],
                "level": gam["level"],
                "title": gam["title"],
                "xp_to_next": gam["xp_to_next_level"],
            },
        }
