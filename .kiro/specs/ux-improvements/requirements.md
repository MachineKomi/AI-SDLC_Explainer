# Requirements Document

## Introduction

This document specifies five UX improvements for the AI-SDLC Explainer web application: fixing broken lesson navigation buttons, making the sources page tool-agnostic, creating a dedicated progress page, and adding achievement unlock hints.

## Glossary

- **Lesson_Viewer**: The `LessonClient` component that renders lesson content with section-based navigation (`aidlc-web-app/src/app/lessons/[lessonId]/LessonClient.tsx`)
- **Sources_Page**: The `/sources` page listing references and tools used by the platform (`aidlc-web-app/src/app/sources/page.tsx`)
- **Progress_Page**: A new `/progress` page that consolidates progress information and reset functionality
- **Progress_Dashboard**: The `ProgressDashboard` component displaying learning progress and achievements (`aidlc-web-app/src/components/ProgressDashboard.tsx`)
- **MiniXP_Indicator**: The compact XP/level display component used in the header and sidebar (`aidlc-web-app/src/components/MiniXPIndicator.tsx`)
- **Achievement_Card**: A UI element representing a single achievement in the achievements grid
- **Sidebar**: The navigation sidebar with links to all app sections (`aidlc-web-app/src/components/Sidebar.tsx`)

## Requirements

### Requirement 1: Next Lesson Navigation

**User Story:** As a learner, I want the "Next Lesson →" button to navigate me to the next lesson when I finish the current one, so that I can continue learning without manually finding the next lesson.

#### Acceptance Criteria

1. WHEN a user is on the last section of a lesson that is not the last lesson and clicks the "Next Lesson →" button, THE Lesson_Viewer SHALL navigate to the first section of the next lesson using `router.push()`
2. WHEN a user is on any section other than the last section, THE Lesson_Viewer SHALL continue using the existing `goToSection` behavior to advance within the current lesson
3. WHEN a user presses the right arrow key on the last section of a non-final lesson, THE Lesson_Viewer SHALL navigate to the next lesson

### Requirement 2: Start Practice Navigation

**User Story:** As a learner who has completed all lessons, I want the "Start Practice →" button to navigate me to the practice section, so that I can immediately begin testing my knowledge.

#### Acceptance Criteria

1. WHEN a user is on the last section of the last lesson and clicks the "Start Practice →" button, THE Lesson_Viewer SHALL navigate to `/practice` using `router.push()`
2. WHEN a user presses the right arrow key on the last section of the last lesson, THE Lesson_Viewer SHALL navigate to `/practice`

### Requirement 3: Tool-Agnostic Sources Page

**User Story:** As a learner, I want the sources page to list AI-SDLC tools from multiple vendors, so that I understand AI-SDLC is a methodology that works with any AI coding tool.

#### Acceptance Criteria

1. THE Sources_Page SHALL display tools from at least five distinct vendors in the AI-SDLC Tools section
2. THE Sources_Page SHALL include entries for OpenAI Codex / ChatGPT, Cursor, Claude Code (Anthropic), and GitHub Copilot in addition to the existing Amazon Q Developer and Kiro IDE entries
3. WHEN displaying tool entries, THE Sources_Page SHALL provide a title, description, and URL for each tool

### Requirement 4: Dedicated Progress Page

**User Story:** As a learner, I want a dedicated progress page where I can view my learning progress, achievements, and reset my progress, so that I have a single place to manage my learning journey.

#### Acceptance Criteria

1. WHEN a user navigates to `/progress`, THE Progress_Page SHALL render the Progress_Dashboard component showing learning progress and achievements
2. THE Progress_Page SHALL include a "Reset Progress" button with a confirmation dialog that calls `resetProgress()` from ProgressContext
3. WHEN a user clicks the MiniXP_Indicator in the header (GlobalXPHeader), THE MiniXP_Indicator SHALL navigate to `/progress`
4. WHEN a user clicks the MiniXP_Indicator in the sidebar, THE MiniXP_Indicator SHALL navigate to `/progress`
5. THE Sidebar SHALL include a navigation link to `/progress` in its links array
6. WHEN the Progress_Page loads, THE Progress_Page SHALL display the same progress information as the home page Progress_Dashboard

### Requirement 5: Achievement Unlock Hints

**User Story:** As a learner, I want to see how to unlock locked achievements when I hover over or tap them, so that I know what actions to take to earn each achievement.

#### Acceptance Criteria

1. WHEN a user hovers over a locked Achievement_Card on desktop, THE Progress_Dashboard SHALL display a tooltip showing the achievement name and its unlock description
2. WHEN a user taps a locked Achievement_Card on mobile, THE Progress_Dashboard SHALL display the achievement name and its unlock description
3. THE Progress_Dashboard SHALL use the `description` field from the achievement definition as the unlock hint text
4. WHEN a user hovers over or taps an unlocked Achievement_Card, THE Progress_Dashboard SHALL continue showing the achievement name and description as before
