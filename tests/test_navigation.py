"""Tests for navigation system."""

from aidlc_explainer.navigation import NavigationStack, NavItem


def test_navigation_stack_empty():
    """Test empty navigation stack."""
    nav = NavigationStack()
    assert len(nav) == 0
    assert nav.current() is None
    assert nav.breadcrumb() == []


def test_navigation_push():
    """Test pushing to navigation stack."""
    nav = NavigationStack()
    nav.push("home", "Home")
    
    assert len(nav) == 1
    assert nav.current().screen_id == "home"
    assert nav.current().title == "Home"


def test_navigation_breadcrumb():
    """Test breadcrumb generation."""
    nav = NavigationStack()
    nav.push("home", "Home")
    nav.push("lesson", "Lessons")
    nav.push("overview", "AI-DLC Overview")
    
    assert nav.breadcrumb() == ["Home", "Lessons", "AI-DLC Overview"]
    assert nav.breadcrumb_str() == "Home > Lessons > AI-DLC Overview"


def test_navigation_pop():
    """Test popping from navigation stack."""
    nav = NavigationStack()
    nav.push("home", "Home")
    nav.push("lesson", "Lessons")
    
    popped = nav.pop()
    assert popped.screen_id == "lesson"
    assert len(nav) == 1


def test_navigation_pop_keeps_home():
    """Test that pop keeps at least one item (home)."""
    nav = NavigationStack()
    nav.push("home", "Home")
    
    # Should not pop the last item
    result = nav.pop()
    assert result is None
    assert len(nav) == 1


def test_navigation_context():
    """Test navigation with context data."""
    nav = NavigationStack()
    nav.push("lesson", "Lesson", {"lesson_id": "aidlc-overview"})
    
    current = nav.current()
    assert current.context == {"lesson_id": "aidlc-overview"}
