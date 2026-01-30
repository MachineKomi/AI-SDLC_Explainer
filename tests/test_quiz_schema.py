"""Tests for quiz.json schema validation."""

import json
from pathlib import Path

import pytest


@pytest.fixture
def quiz_data():
    """Load quiz data."""
    quiz_path = Path(__file__).parent.parent / "src" / "aidlc_explainer" / "content" / "practice" / "quiz.json"
    with open(quiz_path, "r", encoding="utf-8") as f:
        return json.load(f)


def test_quiz_has_schema(quiz_data):
    """Test that quiz has schema version."""
    assert "$schema" in quiz_data
    assert quiz_data["$schema"] == "quiz-v1"


def test_quiz_has_metadata(quiz_data):
    """Test that quiz has title and description."""
    assert "title" in quiz_data
    assert "description" in quiz_data
    assert len(quiz_data["title"]) > 0
    assert len(quiz_data["description"]) > 0


def test_quiz_has_minimum_questions(quiz_data):
    """Test that quiz has at least 12 questions."""
    assert "questions" in quiz_data
    assert len(quiz_data["questions"]) >= 12


def test_question_structure(quiz_data):
    """Test that each question has required fields."""
    required_fields = ["id", "prompt", "options", "correct", "explanation", "sources"]
    
    for i, q in enumerate(quiz_data["questions"]):
        for field in required_fields:
            assert field in q, f"Question {i} missing field: {field}"


def test_question_options(quiz_data):
    """Test that each question has exactly 4 options."""
    for i, q in enumerate(quiz_data["questions"]):
        assert len(q["options"]) == 4, f"Question {i} should have 4 options"


def test_question_correct_in_range(quiz_data):
    """Test that correct answer index is valid."""
    for i, q in enumerate(quiz_data["questions"]):
        assert 0 <= q["correct"] <= 3, f"Question {i} correct index out of range"


def test_question_has_local_source(quiz_data):
    """Test that each question has at least one local source."""
    for i, q in enumerate(quiz_data["questions"]):
        assert "local" in q["sources"], f"Question {i} missing local sources"
        assert len(q["sources"]["local"]) >= 1, f"Question {i} needs at least 1 local source"


def test_question_ids_unique(quiz_data):
    """Test that all question IDs are unique."""
    ids = [q["id"] for q in quiz_data["questions"]]
    assert len(ids) == len(set(ids)), "Question IDs must be unique"


def test_question_explanations_meaningful(quiz_data):
    """Test that explanations are not empty."""
    for i, q in enumerate(quiz_data["questions"]):
        assert len(q["explanation"]) > 20, f"Question {i} explanation too short"
