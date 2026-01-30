"""Tests for content loading."""

import pytest
from aidlc_explainer.content import load_lesson, Lesson, Section


def test_load_lesson_exists():
    """Test that aidlc-overview lesson loads successfully."""
    lesson = load_lesson("aidlc-overview")
    assert isinstance(lesson, Lesson)
    assert lesson.id == "aidlc-overview"
    assert lesson.title == "AI-DLC Overview"


def test_load_lesson_has_sections():
    """Test that lesson has expected sections."""
    lesson = load_lesson("aidlc-overview")
    assert len(lesson.sections) == 7
    
    # Check section IDs
    section_ids = [s.id for s in lesson.sections]
    assert "what-is-aidlc" in section_ids
    assert "three-phases" in section_ids
    assert "gates" in section_ids
    assert "artifacts" in section_ids
    assert "roles" in section_ids
    assert "mental-model" in section_ids
    assert "summary" in section_ids


def test_load_lesson_sections_have_content():
    """Test that all sections have content."""
    lesson = load_lesson("aidlc-overview")
    for section in lesson.sections:
        assert isinstance(section, Section)
        assert section.title
        assert section.content
        assert len(section.content) > 50  # Meaningful content


def test_load_lesson_diagrams():
    """Test that appropriate sections have diagrams."""
    lesson = load_lesson("aidlc-overview")
    sections_with_diagrams = [s for s in lesson.sections if s.diagram]
    
    # Should have at least 3 diagrams
    assert len(sections_with_diagrams) >= 3


def test_load_lesson_unknown_raises():
    """Test that loading unknown lesson raises ValueError."""
    with pytest.raises(ValueError, match="Unknown lesson"):
        load_lesson("nonexistent-lesson")
