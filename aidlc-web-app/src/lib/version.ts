/**
 * Application version constant
 * Format: vMAJOR.MINOR.PATCH
 * 
 * v2.4.0 - Lesson Quiz Questions + Gym XP Fix
 * - Added quiz questions at the end of each lesson section
 * - Must answer question to proceed to next section (gates progression)
 * - Awards 20 XP per question answered
 * - Fixed Gym page XP bug (persistState before addXp to avoid stale closure)
 * - Fixed Transition page XP bug (same pattern)
 * 
 * v2.3.1 - Fix: Simulation animation loop
 * - Fixed animation not running - replaced requestAnimationFrame with setInterval
 * - Consistent 50ms tick rate for smooth animation
 * 
 * v2.3.0 - Comparison Simulation Engine
 * - Enhanced race visualization with detailed task-based simulation
 * - Real-time activity logs showing task execution for each methodology
 * - Task timers, wait state indicators, and time breakdowns
 * - Shows work time vs wait time to highlight AI-SDLC efficiency
 * - Realistic task sequences for Waterfall, Agile, and AI-SDLC
 * 
 * v2.2.3 - Bug Fix: Complete stale closure fix
 * - Fixed ALL callbacks to use storedStateRef instead of storedState
 * - Root cause: addXp was overwriting state changes from other callbacks
 * - Now all state mutations use the ref for consistent state access
 * 
 * v2.2.2 - Bug Fix: Video Watch Checkbox
 * - Fixed stale closure issue in markVideoWatched causing infinite XP
 * - Used ref pattern to track current state in callbacks
 * - Applied same fix to markGlossaryTermViewed and markReferenceViewed
 * 
 * v2.2.1 - Bug Fixes
 * - Fixed broken links on sources page (aisdlc -> aidlc)
 * - Removed pulsing border effect from level-up modal
 * - Fixed video watch checkbox to be disabled after watching (no duplicate XP)
 * 
 * v2.2.0 - Sources Page Update
 * - Expanded sources with 15+ references organized by category
 * - Added video sources, MCP servers, community resources
 * - Updated attribution to clarify content derivation
 * 
 * v2.1.1 - Bug Fix: Infinite XP loop on reference page
 * - Fixed useEffect dependency causing infinite re-renders
 * - markReferenceViewed now only runs once on mount
 * 
 * v2.1.0 - Video Lessons Feature
 * - 2x2 grid of curated AI-SDLC video lessons on lessons page
 * - YouTube embeds with responsive 16:9 aspect ratio
 * - Watch tracking with XP rewards (40 XP per video)
 * - Video summaries with key takeaways
 * 
 * v2.0.0 - Gamification Enhancement Release
 * - Global XP display components
 * - Achievement notification system
 * - Level-up celebration modal
 * - Sidebar completion indicators
 * - NavigationGrid progress indicators
 * - XP rewards consistency
 * - Progress dashboard on home
 */
export const APP_VERSION = "v2.4.0";
