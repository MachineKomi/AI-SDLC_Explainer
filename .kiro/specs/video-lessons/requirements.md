# Requirements Document

## Introduction

This feature adds a video lessons section to the AI-SDLC Explainer web app's lessons page. The section displays a 2x2 grid of curated YouTube videos about AI-SDLC concepts, each with embedded players, text summaries, and interactive checkboxes to mark videos as watched. Watching videos earns XP and progress is persisted in localStorage.

## Glossary

- **Video_Card**: A UI component that displays a single video with its embedded YouTube player, title, summary, and watch checkbox
- **Video_Grid**: A responsive 2x2 grid layout component that contains four Video_Card components
- **Video_Data**: A content file containing metadata for all curated videos including titles, embed URLs, channel info, and summaries
- **Watch_Checkbox**: An interactive checkbox that allows users to mark a video as watched
- **XP_System**: The existing gamification system that awards experience points for completing activities
- **Progress_Context**: The React context that manages user progress state across the application
- **localStorage**: Browser storage mechanism used to persist user progress between sessions

## Requirements

### Requirement 1: Video Data Content

**User Story:** As a developer, I want video content defined in a structured data file, so that videos can be easily maintained and updated.

#### Acceptance Criteria

1. THE Video_Data file SHALL contain an array of video objects with id, title, channelUrl, videoUrl, embedUrl, and summary fields
2. THE Video_Data file SHALL include all four curated AI-SDLC videos with their complete metadata
3. WHEN a video object is accessed, THE Video_Data SHALL provide the summary as an array of bullet point strings
4. THE Video_Data file SHALL export a typed interface for video objects

### Requirement 2: Video Card Component

**User Story:** As a user, I want to see each video displayed with its player, title, and summary, so that I can learn about AI-SDLC concepts through video content.

#### Acceptance Criteria

1. WHEN a Video_Card is rendered, THE component SHALL display an embedded YouTube player using an iframe
2. WHEN a Video_Card is rendered, THE component SHALL display the video title prominently above or below the player
3. WHEN a Video_Card is rendered, THE component SHALL display the summary bullet points below the video
4. THE Video_Card SHALL include a Watch_Checkbox that users can interact with
5. WHEN the Watch_Checkbox is checked, THE Video_Card SHALL display a visual indicator that the video has been watched
6. THE Video_Card SHALL use responsive sizing that works within the grid layout
7. THE Video_Card SHALL follow the existing design system styling (Tailwind CSS classes, color themes)

### Requirement 3: Video Grid Layout

**User Story:** As a user, I want to see videos arranged in a clean 2x2 grid, so that I can easily browse and select videos to watch.

#### Acceptance Criteria

1. THE Video_Grid SHALL display exactly 4 Video_Card components in a 2x2 grid layout
2. WHEN viewed on desktop screens, THE Video_Grid SHALL display 2 columns
3. WHEN viewed on mobile screens, THE Video_Grid SHALL stack videos in a single column
4. THE Video_Grid SHALL have consistent spacing between video cards
5. THE Video_Grid SHALL include a section header identifying it as video lessons

### Requirement 4: Watch Progress Tracking

**User Story:** As a user, I want my watched video progress to be saved, so that I can track which videos I've completed.

#### Acceptance Criteria

1. WHEN a user marks a video as watched, THE system SHALL persist the watched state to localStorage
2. WHEN the lessons page loads, THE system SHALL restore previously watched video states from localStorage
3. THE system SHALL store watched video IDs in the existing StoredState structure
4. WHEN a user unchecks a watched video, THE system SHALL remove it from the watched list

### Requirement 5: XP Rewards for Watching Videos

**User Story:** As a user, I want to earn XP for watching videos, so that I am motivated to engage with the video content.

#### Acceptance Criteria

1. THE XP_System SHALL define a new reward type for watching videos
2. WHEN a user marks a video as watched for the first time, THE system SHALL award XP
3. WHEN a user unchecks and re-checks a video, THE system SHALL NOT award duplicate XP
4. THE XP reward amount SHALL be consistent with other learning activities in the app

### Requirement 6: Integration with Lessons Page

**User Story:** As a user, I want to access video lessons from the main lessons page, so that all learning content is in one place.

#### Acceptance Criteria

1. THE Video_Grid SHALL be displayed on the lessons page below the existing lesson list
2. THE Video_Grid section SHALL have a clear visual separator from the lesson list
3. THE lessons page SHALL maintain its existing keyboard navigation functionality
4. THE Video_Grid SHALL not interfere with existing lesson card interactions

### Requirement 7: Progress Context Integration

**User Story:** As a developer, I want video progress integrated with the existing Progress Context, so that video watching contributes to overall user progress.

#### Acceptance Criteria

1. THE Progress_Context SHALL include a method to mark videos as watched
2. THE Progress_Context SHALL expose the list of watched video IDs in the state
3. WHEN a video is marked as watched, THE Progress_Context SHALL trigger XP award and achievement checks
4. THE ProgressState type SHALL include a videos progress section
