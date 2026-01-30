"""Navigation system for tracking screen history and breadcrumbs."""

from dataclasses import dataclass, field


@dataclass
class NavItem:
    """A single navigation item in the stack."""
    
    screen_id: str
    title: str
    context: dict = field(default_factory=dict)


class NavigationStack:
    """Manages navigation history for back functionality and breadcrumbs."""
    
    def __init__(self) -> None:
        """Initialize with empty navigation stack."""
        self._stack: list[NavItem] = []
    
    def push(self, screen_id: str, title: str, context: dict | None = None) -> None:
        """Push a new screen onto the navigation stack.
        
        Args:
            screen_id: Unique identifier for the screen
            title: Display title for breadcrumb
            context: Optional context data for the screen
        """
        self._stack.append(NavItem(
            screen_id=screen_id,
            title=title,
            context=context or {},
        ))
    
    def pop(self) -> NavItem | None:
        """Pop and return the top screen from the stack.
        
        Returns:
            The popped NavItem, or None if stack is empty
        """
        if len(self._stack) > 1:  # Keep at least home screen
            return self._stack.pop()
        return None
    
    def current(self) -> NavItem | None:
        """Get the current (top) screen without removing it.
        
        Returns:
            The current NavItem, or None if stack is empty
        """
        return self._stack[-1] if self._stack else None
    
    def breadcrumb(self) -> list[str]:
        """Generate breadcrumb trail from navigation stack.
        
        Returns:
            List of screen titles from root to current
        """
        return [item.title for item in self._stack]
    
    def breadcrumb_str(self, separator: str = " > ") -> str:
        """Generate breadcrumb string.
        
        Args:
            separator: String to join breadcrumb items
            
        Returns:
            Formatted breadcrumb string
        """
        return separator.join(self.breadcrumb())
    
    def clear(self) -> None:
        """Clear the navigation stack."""
        self._stack.clear()
    
    def __len__(self) -> int:
        """Return the number of items in the stack."""
        return len(self._stack)
