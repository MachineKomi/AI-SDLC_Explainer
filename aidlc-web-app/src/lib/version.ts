/**
 * Application version constant
 * Format: vMAJOR.MINOR.PATCH
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
export const APP_VERSION = "v2.2.0";
