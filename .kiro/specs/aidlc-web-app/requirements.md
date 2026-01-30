# Requirements Document

## Introduction

This document specifies the requirements for converting the AI-SDLC Explainer TUI (Terminal User Interface) application to a modern web application. The web application will teach the AI-Driven Development Lifecycle (AI-DLC) methodology through interactive lessons, quizzes, simulations, and reference materials. The application will be fully static/client-side, deployable to Vercel, and shareable via web link.

## Glossary

- **Web_App**: The Next.js-based web application that teaches AI-DLC methodology
- **Content_Manager**: The module responsible for loading and serving embedded content (lessons, quizzes, glossary, etc.)
- **State_Manager**: The module responsible for persisting user progress to localStorage
- **Navigation_System**: The module handling routing and keyboard navigation throughout the application
- **Quiz_Engine**: The module managing quiz question presentation, answer validation, and scoring
- **Gatekeeper_Engine**: The module managing gatekeeper scenario presentation and evaluation
- **Simulator_Engine**: The module managing the interactive workflow simulator
- **Theme_Manager**: The module handling dark/light mode switching and theme persistence
- **Progress_Tracker**: The module tracking XP, levels, achievements, and overall learning progress
- **Lesson_Viewer**: The component rendering lesson content with sections and ASCII diagrams
- **Glossary_Browser**: The component for searching and browsing AI-DLC terminology
- **Methodology_Comparator**: The component displaying animated methodology comparisons
- **Transition_Guide**: The component displaying Agile→AI-DLC migration guidance

## Requirements

### Requirement 1: Home Screen and Navigation

**User Story:** As a learner, I want a home screen with clear navigation options and progress visibility, so that I can easily access all learning modules and track my progress.

#### Acceptance Criteria

1. WHEN the user loads the Web_App, THE Navigation_System SHALL display a home screen with 9 main navigation options (Lessons, Methodology Comparison, Transition Mapping, Practice Mode, Interactive Simulator, Artifact Explorer, Glossary, Quick Reference, Sources)
2. WHEN the home screen loads, THE Progress_Tracker SHALL display the user's current XP, level, and title in a visible dashboard area
3. WHEN the home screen loads, THE Progress_Tracker SHALL display unlocked achievements with visual indicators
4. WHEN the user clicks a navigation option, THE Navigation_System SHALL route to the corresponding module
5. WHEN the user presses a number key (1-9) on the home screen, THE Navigation_System SHALL navigate to the corresponding menu option
6. WHEN the user presses 'Escape' from any screen, THE Navigation_System SHALL return to the home screen
7. THE Web_App SHALL support vim-style keyboard navigation (j/k for up/down, h/l for left/right, Enter to select)

### Requirement 2: Lesson System

**User Story:** As a learner, I want to read structured lessons about AI-DLC concepts, so that I can understand the methodology fundamentals.

#### Acceptance Criteria

1. WHEN the user selects Lessons, THE Lesson_Viewer SHALL display a list of 3 available lessons (AI-DLC Overview, 10 Core Principles, Phase: Inception)
2. WHEN the user selects a lesson, THE Lesson_Viewer SHALL display the lesson content with section navigation
3. WHEN a lesson section contains an ASCII diagram, THE Lesson_Viewer SHALL render the diagram in a monospace font with proper formatting
4. WHEN the user navigates between sections, THE State_Manager SHALL update the lesson progress in localStorage
5. WHEN the user completes all sections of a lesson, THE State_Manager SHALL mark the lesson as completed and award XP
6. WHEN the user presses left/right arrow keys or h/l, THE Lesson_Viewer SHALL navigate to previous/next section
7. THE Lesson_Viewer SHALL display a progress indicator showing current section position within the lesson

### Requirement 3: Quiz Practice Mode

**User Story:** As a learner, I want to test my knowledge through quizzes, so that I can validate my understanding of AI-DLC concepts.

#### Acceptance Criteria

1. WHEN the user selects Quiz from Practice Mode, THE Quiz_Engine SHALL load 24 questions from embedded content
2. WHEN presenting a question, THE Quiz_Engine SHALL randomize the order of answer options
3. WHEN the user selects an answer, THE Quiz_Engine SHALL provide immediate feedback showing correct/incorrect status
4. WHEN the user answers incorrectly, THE Quiz_Engine SHALL display the explanation for the correct answer
5. WHEN the quiz is completed, THE Quiz_Engine SHALL display the final score and save results to localStorage
6. WHEN the user achieves a perfect score, THE Progress_Tracker SHALL award bonus XP and unlock the "Perfect Score" achievement
7. THE Quiz_Engine SHALL allow keyboard navigation (1-4 for answer selection, Enter to confirm)

### Requirement 4: Gatekeeper Practice Mode

**User Story:** As a learner, I want to practice reviewing AI-generated plans as a gate approver, so that I can develop skills in identifying flaws and making approval decisions.

#### Acceptance Criteria

1. WHEN the user selects Gatekeeper from Practice Mode, THE Gatekeeper_Engine SHALL load 10 scenarios from embedded content
2. WHEN presenting a scenario, THE Gatekeeper_Engine SHALL display the context, AI plan, and decision options (Approve/Reject)
3. WHEN the user makes a decision, THE Gatekeeper_Engine SHALL reveal the correct action and list of flaws (if any)
4. WHEN the user makes an incorrect decision, THE Gatekeeper_Engine SHALL display the evidence checklist that should have been required
5. WHEN all scenarios are completed, THE Gatekeeper_Engine SHALL display the final score and save results to localStorage
6. THE Gatekeeper_Engine SHALL track which scenarios were answered incorrectly for review

### Requirement 5: Interactive Simulator

**User Story:** As a learner, I want to experience how AI-DLC adapts to different project contexts, so that I can understand the adaptive depth principle in practice.

#### Acceptance Criteria

1. WHEN the user selects Interactive Simulator, THE Simulator_Engine SHALL present a series of questions about project context
2. WHEN the user answers a question, THE Simulator_Engine SHALL dynamically update the workflow stages that will execute
3. WHEN all questions are answered, THE Simulator_Engine SHALL display the resulting workflow with stages marked as execute/skip
4. WHEN displaying the workflow, THE Simulator_Engine SHALL show the rationale for each stage decision
5. WHEN the user selects a request type (Greenfield, Brownfield, Frontend, Bugfix), THE Simulator_Engine SHALL pre-configure appropriate defaults
6. WHEN a simulation is completed, THE State_Manager SHALL record the run and track explored request types
7. THE Simulator_Engine SHALL display the three phases (Inception, Construction, Operations) with their respective stages

### Requirement 6: Methodology Comparison

**User Story:** As a learner, I want to compare Waterfall, Agile, and AI-DLC methodologies, so that I can understand the advantages of AI-DLC.

#### Acceptance Criteria

1. WHEN the user selects Methodology Comparison, THE Methodology_Comparator SHALL display animated timelines for all three methodologies
2. WHEN displaying timelines, THE Methodology_Comparator SHALL show phases with relative durations and handoff points
3. WHEN the user views the comparison, THE Methodology_Comparator SHALL display a metrics table comparing 8 key metrics across methodologies
4. WHEN the user selects Project Simulator, THE Methodology_Comparator SHALL allow selection from 4 project scenarios
5. WHEN a project scenario is selected, THE Methodology_Comparator SHALL simulate and display results for all three methodologies
6. THE Methodology_Comparator SHALL use smooth CSS animations for timeline visualization

### Requirement 7: Transition Mapping

**User Story:** As a learner, I want to understand how to transition from Agile to AI-DLC, so that I can apply the methodology in my organization.

#### Acceptance Criteria

1. WHEN the user selects Transition Mapping, THE Transition_Guide SHALL display role mappings from Agile to AI-DLC
2. WHEN displaying role mappings, THE Transition_Guide SHALL show responsibilities, key changes, and skills to develop for each role
3. WHEN the user views process mappings, THE Transition_Guide SHALL display ceremony equivalents with frequency and duration comparisons
4. WHEN the user views artifact mappings, THE Transition_Guide SHALL display artifact equivalents with key differences
5. WHEN the user views transition phases, THE Transition_Guide SHALL display the 4-phase transition journey with activities and success criteria
6. THE Transition_Guide SHALL display a readiness checklist with categorized items and importance levels

### Requirement 8: Glossary

**User Story:** As a learner, I want to search and browse AI-DLC terminology, so that I can quickly find definitions for unfamiliar terms.

#### Acceptance Criteria

1. WHEN the user selects Glossary, THE Glossary_Browser SHALL display all 37 AI-DLC terms in an alphabetically organized list
2. WHEN the user types in the search field, THE Glossary_Browser SHALL filter terms by matching term name, definition, or ID
3. WHEN the user selects a term, THE Glossary_Browser SHALL display the full definition, example, related terms, and source reference
4. WHEN displaying related terms, THE Glossary_Browser SHALL make them clickable to navigate to those definitions
5. THE Glossary_Browser SHALL support keyboard navigation for browsing and searching

### Requirement 9: Quick Reference

**User Story:** As a learner, I want a single-screen cheat sheet of AI-DLC concepts, so that I can quickly review key information.

#### Acceptance Criteria

1. WHEN the user selects Quick Reference, THE Web_App SHALL display a single-page summary of AI-DLC key concepts
2. THE Quick Reference SHALL include the 3 phases with brief descriptions
3. THE Quick Reference SHALL include the 10 core principles as a compact list
4. THE Quick Reference SHALL include key artifacts and their purposes
5. THE Quick Reference SHALL be printable/exportable as a reference card

### Requirement 10: Artifact Explorer

**User Story:** As a learner, I want to browse the aidlc-docs folder structure, so that I can understand how AI-DLC artifacts are organized.

#### Acceptance Criteria

1. WHEN the user selects Artifact Explorer, THE Web_App SHALL display a tree view of the aidlc-docs folder structure
2. WHEN the user expands a folder, THE Web_App SHALL show its contents with appropriate icons for files and folders
3. WHEN the user selects a file, THE Web_App SHALL display a description of that artifact's purpose
4. THE Artifact Explorer SHALL display the standard aidlc-docs structure (aidlc-state.md, execution-plan.md, audit.md, prompts.md, inception/, construction/, operations/)

### Requirement 11: Sources and References

**User Story:** As a learner, I want to access official AI-DLC reference sources, so that I can explore the methodology in more depth.

#### Acceptance Criteria

1. WHEN the user selects Sources, THE Web_App SHALL display a list of official reference sources with links
2. THE Sources page SHALL include links to AWS documentation, GitHub repositories, and blog posts
3. WHEN a source link is clicked, THE Web_App SHALL open the link in a new browser tab

### Requirement 12: Progress and Gamification

**User Story:** As a learner, I want my progress tracked with XP, levels, and achievements, so that I stay motivated to complete all learning modules.

#### Acceptance Criteria

1. WHEN the user completes learning activities, THE Progress_Tracker SHALL award XP according to defined rewards (lesson completion: 100 XP, quiz correct: 25 XP, etc.)
2. WHEN the user accumulates XP, THE Progress_Tracker SHALL update the level and title based on thresholds (Novice → Apprentice → Practitioner → etc.)
3. WHEN the user meets achievement criteria, THE Progress_Tracker SHALL unlock achievements and display notifications
4. THE Progress_Tracker SHALL persist all progress data to localStorage
5. WHEN the user returns to the Web_App, THE State_Manager SHALL restore progress from localStorage
6. THE Web_App SHALL provide a way to reset all progress to defaults

### Requirement 13: Theme and Appearance

**User Story:** As a learner, I want to switch between dark and light modes, so that I can use the application comfortably in different lighting conditions.

#### Acceptance Criteria

1. WHEN the Web_App loads, THE Theme_Manager SHALL default to dark mode
2. WHEN the user toggles the theme, THE Theme_Manager SHALL switch between dark and light modes
3. WHEN the theme is changed, THE Theme_Manager SHALL persist the preference to localStorage
4. WHEN the user returns to the Web_App, THE Theme_Manager SHALL restore the saved theme preference
5. THE Web_App SHALL use a clean, professional, developer-friendly aesthetic with Tailwind CSS

### Requirement 14: Responsive Design

**User Story:** As a learner, I want to use the application on different devices, so that I can learn on desktop or mobile.

#### Acceptance Criteria

1. THE Web_App SHALL render correctly on Chrome, Firefox, and Safari browsers
2. THE Web_App SHALL be responsive and usable on desktop screens (1024px+)
3. THE Web_App SHALL be responsive and usable on tablet screens (768px-1023px)
4. THE Web_App SHALL be responsive and usable on mobile screens (320px-767px)
5. WHEN on mobile, THE Navigation_System SHALL provide touch-friendly navigation alternatives

### Requirement 15: Static Deployment

**User Story:** As a developer, I want the application to be fully static, so that it can be deployed to Vercel without backend infrastructure.

#### Acceptance Criteria

1. THE Web_App SHALL be built using Next.js with Static Site Generation (SSG)
2. THE Web_App SHALL embed all content (lessons, quizzes, glossary, etc.) directly in the build
3. THE Web_App SHALL NOT require any API calls or backend services
4. THE Web_App SHALL be deployable to Vercel from a GitHub repository
5. THE Web_App SHALL load and function without network connectivity after initial load

### Requirement 16: Accessibility

**User Story:** As a learner with accessibility needs, I want the application to be accessible, so that I can use it effectively.

#### Acceptance Criteria

1. THE Web_App SHALL support keyboard-only navigation for all interactive elements
2. THE Web_App SHALL include appropriate ARIA labels for screen reader compatibility
3. THE Web_App SHALL maintain sufficient color contrast ratios in both themes
4. THE Web_App SHALL support focus indicators for keyboard navigation
5. WHEN displaying ASCII diagrams, THE Web_App SHALL provide alternative text descriptions
