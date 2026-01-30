"""Tests for state management."""

import json
import tempfile
from pathlib import Path

import pytest

from aidlc_explainer.state import StateManager, DEFAULT_STATE


@pytest.fixture
def temp_dir():
    """Create a temporary directory for state testing."""
    with tempfile.TemporaryDirectory() as tmpdir:
        yield Path(tmpdir)


@pytest.fixture
def state_manager(temp_dir):
    """Create a state manager with temporary directory."""
    return StateManager(base_path=temp_dir)


def test_state_manager_creates_default(state_manager):
    """Test that state manager initializes with defaults."""
    quiz = state_manager.get_quiz_stats()
    assert quiz["completed"] is False
    assert quiz["last_score"] == 0
    assert quiz["total"] == 24  # Updated to match actual quiz.json


def test_state_save_quiz_result(state_manager, temp_dir):
    """Test saving quiz results."""
    state_manager.save_quiz_result(20, 24, ["q3", "q7"])
    
    # Verify file was created
    state_file = temp_dir / ".aidlc-explainer" / "state.json"
    assert state_file.exists()
    
    # Verify content
    quiz = state_manager.get_quiz_stats()
    assert quiz["completed"] is True
    assert quiz["last_score"] == 20
    assert quiz["total"] == 24  # Updated to match actual quiz.json
    assert quiz["attempts"] == 1
    assert quiz["mistakes"] == ["q3", "q7"]


def test_state_save_gate_result(state_manager):
    """Test saving gatekeeper results."""
    state_manager.save_gate_result(3, 4, ["g2"])
    
    gate = state_manager.get_gate_stats()
    assert gate["completed"] is True
    assert gate["last_score"] == 3
    assert gate["total"] == 4
    assert gate["attempts"] == 1
    assert gate["mistakes"] == ["g2"]


def test_state_increments_attempts(state_manager):
    """Test that attempts are incremented."""
    state_manager.save_quiz_result(18, 24, [])
    state_manager.save_quiz_result(22, 24, [])
    
    quiz = state_manager.get_quiz_stats()
    assert quiz["attempts"] == 2
    assert quiz["last_score"] == 22  # Last score


def test_state_reset(state_manager):
    """Test resetting state."""
    state_manager.save_quiz_result(20, 24, [])
    state_manager.save_gate_result(4, 4, [])
    
    state_manager.reset()
    
    quiz = state_manager.get_quiz_stats()
    gate = state_manager.get_gate_stats()
    
    assert quiz["completed"] is False
    assert quiz["attempts"] == 0
    assert gate["completed"] is False


def test_state_persistence(temp_dir):
    """Test that state persists across instances."""
    # First instance saves data
    sm1 = StateManager(base_path=temp_dir)
    sm1.save_quiz_result(21, 24, ["q5"])
    
    # Second instance loads data
    sm2 = StateManager(base_path=temp_dir)
    quiz = sm2.get_quiz_stats()
    
    assert quiz["completed"] is True
    assert quiz["last_score"] == 21


def test_state_handles_corrupted_file(temp_dir):
    """Test that corrupted state file is handled gracefully."""
    state_dir = temp_dir / ".aidlc-explainer"
    state_dir.mkdir()
    state_file = state_dir / "state.json"
    state_file.write_text("not valid json {{{")
    
    # Should not raise, should use defaults
    sm = StateManager(base_path=temp_dir)
    quiz = sm.get_quiz_stats()
    assert quiz["completed"] is False


def test_state_schema_validation(temp_dir):
    """Test that old schema versions are reset."""
    state_dir = temp_dir / ".aidlc-explainer"
    state_dir.mkdir()
    state_file = state_dir / "state.json"
    state_file.write_text(json.dumps({"$schema": "old-version", "data": "test"}))
    
    sm = StateManager(base_path=temp_dir)
    quiz = sm.get_quiz_stats()
    assert quiz["completed"] is False  # Should use defaults
