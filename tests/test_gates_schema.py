"""Tests for gates.json schema validation."""

import json
from pathlib import Path

import pytest


@pytest.fixture
def gates_data():
    """Load gates data."""
    gates_path = Path(__file__).parent.parent / "src" / "aidlc_explainer" / "content" / "practice" / "gates.json"
    with open(gates_path, "r", encoding="utf-8") as f:
        return json.load(f)


def test_gates_has_schema(gates_data):
    """Test that gates has schema version."""
    assert "$schema" in gates_data
    assert gates_data["$schema"] == "gates-v1"


def test_gates_has_metadata(gates_data):
    """Test that gates has title and description."""
    assert "title" in gates_data
    assert "description" in gates_data


def test_gates_has_minimum_scenarios(gates_data):
    """Test that gates has at least 4 scenarios."""
    assert "scenarios" in gates_data
    assert len(gates_data["scenarios"]) >= 4


def test_scenario_structure(gates_data):
    """Test that each scenario has required fields."""
    required_fields = [
        "id", "phase", "stage", "context", "ai_plan", 
        "flaws", "decisions", "evidence_checklist", "sources"
    ]
    
    for i, s in enumerate(gates_data["scenarios"]):
        for field in required_fields:
            assert field in s, f"Scenario {i} missing field: {field}"


def test_scenario_phase_valid(gates_data):
    """Test that phase is one of the valid AI-DLC phases."""
    valid_phases = ["Inception", "Construction", "Operations"]
    
    for i, s in enumerate(gates_data["scenarios"]):
        assert s["phase"] in valid_phases, f"Scenario {i} has invalid phase"


def test_scenario_decisions_structure(gates_data):
    """Test that decisions have required fields."""
    for i, s in enumerate(gates_data["scenarios"]):
        d = s["decisions"]
        assert "correct_action" in d, f"Scenario {i} missing correct_action"
        assert d["correct_action"] in ["approve", "reject"], f"Scenario {i} invalid action"
        assert "valid_reasons" in d, f"Scenario {i} missing valid_reasons"
        assert "invalid_reasons" in d, f"Scenario {i} missing invalid_reasons"
        assert len(d["valid_reasons"]) >= 1, f"Scenario {i} needs valid reasons"


def test_scenario_has_evidence_checklist(gates_data):
    """Test that each scenario has evidence checklist."""
    for i, s in enumerate(gates_data["scenarios"]):
        assert len(s["evidence_checklist"]) >= 3, f"Scenario {i} needs at least 3 evidence items"


def test_scenario_has_local_source(gates_data):
    """Test that each scenario has local source."""
    for i, s in enumerate(gates_data["scenarios"]):
        assert "local" in s["sources"], f"Scenario {i} missing local sources"
        assert len(s["sources"]["local"]) >= 1


def test_scenario_ids_unique(gates_data):
    """Test that all scenario IDs are unique."""
    ids = [s["id"] for s in gates_data["scenarios"]]
    assert len(ids) == len(set(ids)), "Scenario IDs must be unique"


def test_scenario_has_flaws(gates_data):
    """Test that reject scenarios have documented flaws."""
    for i, s in enumerate(gates_data["scenarios"]):
        correct_action = s["decisions"]["correct_action"]
        if correct_action == "reject":
            assert len(s["flaws"]) >= 2, f"Reject scenario {i} should have multiple flaws documented"
        else:
            # Approve scenarios may have empty flaws
            assert isinstance(s["flaws"], list), f"Scenario {i} flaws should be a list"
