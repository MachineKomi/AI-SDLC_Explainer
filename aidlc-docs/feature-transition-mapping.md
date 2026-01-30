# Feature Plan: Agile → AI-DLC Transition Mapping

**Feature ID:** FEATURE-02  
**Priority:** High (Core Feature)  
**Estimated Effort:** 3-4 days  
**Created:** 2026-01-28

---

## Vision

Create an interactive change management tool that helps organizations understand what needs to change when transitioning from Agile/Scrum to AI-DLC. This is essential for adoption because AI-DLC fundamentally changes how teams organize, collaborate, and deliver.

---

## Target Audience

1. **Change Managers** - Need to understand and communicate what changes
2. **Team Leads** - Need to know how their team's work changes
3. **Product Managers** - Need to understand new role as Intent Owner
4. **Developers** - Need to see their evolving relationship with AI
5. **QA Engineers** - Need to understand "proof over prose" validation
6. **Executives** - Need high-level transition roadmap

---

## User Stories

### US-TM-01: Role Mapping View
**As a** change manager  
**I want to** see how Agile roles map to AI-DLC roles  
**So that** I can plan staffing and training

**Acceptance Criteria:**
- [ ] Visual mapping of each Agile role to AI-DLC equivalent
- [ ] List of new skills required per role
- [ ] List of skills that remain valuable
- [ ] Click for detailed role comparison

### US-TM-02: Process/Ceremony Mapping
**As a** Scrum Master transitioning to AI Facilitator  
**I want to** understand how ceremonies change  
**So that** I can adapt my facilitation approach

**Acceptance Criteria:**
- [ ] Each Agile ceremony mapped to AI-DLC equivalent
- [ ] Frequency and duration changes shown
- [ ] Key differences highlighted
- [ ] Benefits of new approach explained

### US-TM-03: Artifact Evolution
**As a** product manager  
**I want to** see how artifacts change  
**So that** I can update my documentation practices

**Acceptance Criteria:**
- [ ] User Stories → Intent + Units mapping
- [ ] Sprint Backlog → Unit Queue mapping
- [ ] Burndown → Gate Status mapping
- [ ] New artifacts introduced (Audit Log, Validation Reports)

### US-TM-04: Transition Timeline
**As an** executive sponsor  
**I want to** see a phased transition plan  
**So that** I can set realistic expectations

**Acceptance Criteria:**
- [ ] Multi-phase timeline (Pilot → Expand → Scale)
- [ ] Key milestones per phase
- [ ] Success criteria per phase
- [ ] Risks and mitigations

### US-TM-05: Team Assessment Checklist
**As a** team lead  
**I want to** assess my team's readiness  
**So that** I can identify training needs

**Acceptance Criteria:**
- [ ] Checklist of skills and capabilities
- [ ] Self-assessment scoring
- [ ] Gap analysis output
- [ ] Recommended training actions

### US-TM-06: Export Transition Plan
**As a** change manager  
**I want to** export a transition plan document  
**So that** I can share with stakeholders

**Acceptance Criteria:**
- [ ] Markdown export of complete mapping
- [ ] Customizable with organization name
- [ ] Includes all sections (roles, processes, artifacts)
- [ ] Professional formatting

---

## Data Models

```python
# content/transition_mapping.py

from dataclasses import dataclass, field
from typing import Literal
from enum import Enum

class ChangeImpact(Enum):
    """Impact level of a change."""
    LOW = "low"       # Minor adjustment
    MEDIUM = "medium"  # Significant change
    HIGH = "high"      # Fundamental shift

@dataclass
class RoleMapping:
    """Maps an Agile role to AI-DLC equivalent."""
    agile_role: str
    agile_description: str
    aidlc_role: str
    aidlc_description: str
    change_impact: ChangeImpact
    key_changes: list[str]
    new_skills_needed: list[str]
    retained_skills: list[str]
    training_topics: list[str]
    time_allocation_before: dict[str, int]  # activity -> % of time
    time_allocation_after: dict[str, int]

@dataclass
class ProcessMapping:
    """Maps an Agile ceremony to AI-DLC equivalent."""
    agile_process: str
    agile_frequency: str
    agile_duration: str
    agile_purpose: str
    aidlc_process: str
    aidlc_frequency: str
    aidlc_duration: str
    aidlc_purpose: str
    change_impact: ChangeImpact
    key_differences: list[str]
    benefits: list[str]
    facilitation_tips: list[str]

@dataclass
class ArtifactMapping:
    """Maps an Agile artifact to AI-DLC equivalent."""
    agile_artifact: str
    agile_purpose: str
    agile_owner: str
    aidlc_artifact: str
    aidlc_purpose: str
    aidlc_owner: str
    change_impact: ChangeImpact
    key_differences: list[str]
    example_before: str
    example_after: str

@dataclass
class TransitionPhase:
    """A phase in the transition timeline."""
    name: str
    duration: str
    objective: str
    activities: list[str]
    success_criteria: list[str]
    risks: list[str]
    mitigations: list[str]

@dataclass
class ReadinessItem:
    """An item on the readiness checklist."""
    category: str
    item: str
    description: str
    importance: Literal["must-have", "should-have", "nice-to-have"]
```

---

## Content Data

### Role Mappings

```python
ROLE_MAPPINGS = [
    RoleMapping(
        agile_role="Product Owner",
        agile_description="Owns backlog, prioritizes work, represents customer",
        aidlc_role="Intent Owner",
        aidlc_description="Defines intent, approves gates, validates outcomes",
        change_impact=ChangeImpact.MEDIUM,
        key_changes=[
            "Focus shifts from writing user stories to defining clear intent",
            "Less backlog grooming, more gate approval",
            "Work with AI to decompose intent into units",
            "Trust but verify AI-generated requirements"
        ],
        new_skills_needed=[
            "Intent formulation (clear, measurable goals)",
            "Gate review and approval criteria",
            "Working with AI-generated artifacts",
            "Evidence-based acceptance (proof over prose)"
        ],
        retained_skills=[
            "Customer understanding",
            "Prioritization",
            "Stakeholder communication",
            "Business value assessment"
        ],
        training_topics=[
            "Writing effective intents",
            "Gate review best practices",
            "AI-assisted planning",
            "Validation techniques"
        ],
        time_allocation_before={
            "Backlog grooming": 25,
            "Sprint planning": 15,
            "Stakeholder meetings": 30,
            "Story writing": 20,
            "Sprint reviews": 10
        },
        time_allocation_after={
            "Intent definition": 15,
            "Mob Elaboration": 10,
            "Gate reviews": 25,
            "Stakeholder alignment": 30,
            "Validation oversight": 20
        }
    ),
    
    RoleMapping(
        agile_role="Scrum Master",
        agile_description="Facilitates ceremonies, removes impediments, coaches team",
        aidlc_role="AI Facilitator",
        aidlc_description="Orchestrates AI-human collaboration, ensures quality gates",
        change_impact=ChangeImpact.HIGH,
        key_changes=[
            "From process facilitation to AI orchestration",
            "From removing impediments to ensuring AI guardrails",
            "From coaching team to coaching AI-human interaction",
            "From sprint ceremonies to continuous gate reviews"
        ],
        new_skills_needed=[
            "AI tool proficiency (IDE agents, MCP servers)",
            "Prompt engineering basics",
            "Gate enforcement and audit trail management",
            "Guardrail configuration"
        ],
        retained_skills=[
            "Facilitation",
            "Conflict resolution",
            "Process improvement",
            "Team dynamics"
        ],
        training_topics=[
            "AI development tools deep dive",
            "Mob Elaboration facilitation",
            "Mob Construction facilitation",
            "Guardrail retrospectives"
        ],
        time_allocation_before={
            "Sprint ceremonies": 30,
            "Impediment removal": 25,
            "Team coaching": 25,
            "Process improvement": 20
        },
        time_allocation_after={
            "Mob Elaboration/Construction": 35,
            "Gate facilitation": 25,
            "AI-human coaching": 20,
            "Guardrail retros": 20
        }
    ),
    
    RoleMapping(
        agile_role="Developer",
        agile_description="Writes code, estimates stories, participates in ceremonies",
        aidlc_role="Human Validator / AI Collaborator",
        aidlc_description="Reviews AI code, provides domain expertise, validates proofs",
        change_impact=ChangeImpact.HIGH,
        key_changes=[
            "From writing code to validating AI-generated code",
            "From estimating to verifying",
            "From implementation to code review and testing",
            "Focus on edge cases and domain knowledge"
        ],
        new_skills_needed=[
            "AI code review techniques",
            "Prompt engineering for refinement",
            "Evidence-based validation",
            "Security review for AI code"
        ],
        retained_skills=[
            "Domain knowledge",
            "Code quality assessment",
            "Architecture understanding",
            "Testing mindset"
        ],
        training_topics=[
            "AI code review checklist",
            "Effective prompting",
            "Security in AI-generated code",
            "When to override AI"
        ],
        time_allocation_before={
            "Writing code": 50,
            "Code review": 15,
            "Meetings": 20,
            "Testing": 15
        },
        time_allocation_after={
            "Reviewing AI code": 35,
            "Guiding AI (prompts)": 20,
            "Mob sessions": 25,
            "Validation/testing": 20
        }
    ),
    
    RoleMapping(
        agile_role="QA Engineer",
        agile_description="Tests software, writes test cases, reports bugs",
        aidlc_role="Proof Engineer",
        aidlc_description="Designs validation strategies, ensures evidence quality",
        change_impact=ChangeImpact.MEDIUM,
        key_changes=[
            "From finding bugs to proving correctness",
            "From test case execution to evidence strategy",
            "From manual testing to automated proof",
            "Focus on 'proof over prose' validation"
        ],
        new_skills_needed=[
            "Evidence strategy design",
            "Automated validation pipelines",
            "Gate criteria definition",
            "Audit trail verification"
        ],
        retained_skills=[
            "Testing mindset",
            "Edge case identification",
            "Quality standards",
            "Risk assessment"
        ],
        training_topics=[
            "Proof over prose methodology",
            "Automated validation",
            "Gate criteria design",
            "Evidence documentation"
        ],
        time_allocation_before={
            "Manual testing": 40,
            "Writing test cases": 25,
            "Bug reporting": 20,
            "Regression": 15
        },
        time_allocation_after={
            "Validation strategy": 30,
            "Evidence review": 30,
            "Automated checks": 25,
            "Gate approvals": 15
        }
    ),
]
```

### Process Mappings

```python
PROCESS_MAPPINGS = [
    ProcessMapping(
        agile_process="Sprint Planning",
        agile_frequency="Every 2 weeks",
        agile_duration="2-4 hours",
        agile_purpose="Select and commit to sprint work",
        aidlc_process="Mob Elaboration",
        aidlc_frequency="Per intent (as needed)",
        aidlc_duration="60 minutes",
        aidlc_purpose="Convert intent into validated units",
        change_impact=ChangeImpact.HIGH,
        key_differences=[
            "AI generates initial breakdown, team validates",
            "Focus on 'what' and 'why', not 'how long'",
            "Output is units with acceptance criteria",
            "No story point estimation"
        ],
        benefits=[
            "Faster planning (AI does heavy lifting)",
            "More consistent decomposition",
            "Better documented decisions",
            "Clear audit trail"
        ],
        facilitation_tips=[
            "Start with clear intent statement",
            "Let AI propose, team refines",
            "Focus on acceptance criteria quality",
            "Capture decisions in audit log"
        ]
    ),
    
    ProcessMapping(
        agile_process="Daily Standup",
        agile_frequency="Daily",
        agile_duration="15 minutes",
        agile_purpose="Sync on progress and blockers",
        aidlc_process="Bolt Check-in",
        aidlc_frequency="Per bolt (every few hours)",
        aidlc_duration="5-10 minutes",
        aidlc_purpose="Review AI progress, approve continuation",
        change_impact=ChangeImpact.MEDIUM,
        key_differences=[
            "More frequent, shorter check-ins",
            "Focus on AI output review",
            "Decision point: continue, adjust, or stop",
            "Async possible for small teams"
        ],
        benefits=[
            "Faster course correction",
            "Less wasted AI computation",
            "Better quality control",
            "More responsive to issues"
        ],
        facilitation_tips=[
            "Review AI's recent output quickly",
            "Make go/no-go decision",
            "Note any guardrail violations",
            "Adjust prompts if needed"
        ]
    ),
    
    ProcessMapping(
        agile_process="Sprint Review",
        agile_frequency="Every 2 weeks",
        agile_duration="1-2 hours",
        agile_purpose="Demo completed work to stakeholders",
        aidlc_process="Gate Review",
        aidlc_frequency="Per unit completion",
        aidlc_duration="30-60 minutes",
        aidlc_purpose="Validate evidence and approve progression",
        change_impact=ChangeImpact.MEDIUM,
        key_differences=[
            "More frequent (per unit, not per sprint)",
            "Focus on evidence, not just demo",
            "Formal approval with documented criteria",
            "Immediate feedback loop"
        ],
        benefits=[
            "Faster validation",
            "Better audit trail",
            "Clearer acceptance",
            "Earlier issue detection"
        ],
        facilitation_tips=[
            "Present validation report first",
            "Show proof (tests, scans, etc.)",
            "Review acceptance criteria checklist",
            "Document approval in audit log"
        ]
    ),
    
    ProcessMapping(
        agile_process="Sprint Retrospective",
        agile_frequency="Every 2 weeks",
        agile_duration="1-1.5 hours",
        agile_purpose="Reflect on process and improve",
        aidlc_process="Guardrail Retrospective",
        aidlc_frequency="Weekly or per major unit",
        aidlc_duration="30 minutes",
        aidlc_purpose="Improve AI guardrails and prompts",
        change_impact=ChangeImpact.MEDIUM,
        key_differences=[
            "Focus on AI interaction quality",
            "Review guardrail effectiveness",
            "Update prompts and rules",
            "Continuous improvement of AI collaboration"
        ],
        benefits=[
            "Better AI-human interaction over time",
            "Captured institutional knowledge",
            "Improved guardrails",
            "Faster future development"
        ],
        facilitation_tips=[
            "Review what AI got right/wrong",
            "Identify guardrail gaps",
            "Update rule files",
            "Share learnings across team"
        ]
    ),
]
```

### Transition Phases

```python
TRANSITION_PHASES = [
    TransitionPhase(
        name="Phase 1: Foundation",
        duration="2-4 weeks",
        objective="Establish AI tooling and pilot team",
        activities=[
            "Set up AI development environment (IDE agents, MCP servers)",
            "Configure initial guardrails and rules",
            "Select pilot project (greenfield, low-risk)",
            "Train pilot team on AI-DLC basics",
            "Establish metrics baseline"
        ],
        success_criteria=[
            "AI tools operational",
            "Pilot team trained",
            "First intent documented",
            "Guardrails configured"
        ],
        risks=[
            "Tool integration issues",
            "Resistance from pilot team",
            "Unrealistic expectations"
        ],
        mitigations=[
            "IT support partnership",
            "Clear communication of benefits",
            "Set realistic pilot goals"
        ]
    ),
    
    TransitionPhase(
        name="Phase 2: Pilot",
        duration="4-8 weeks",
        objective="Complete pilot project using AI-DLC",
        activities=[
            "Execute full AI-DLC lifecycle on pilot",
            "Conduct Mob Elaboration sessions",
            "Implement units with AI assistance",
            "Document learnings and adjust guardrails",
            "Measure metrics against baseline"
        ],
        success_criteria=[
            "Pilot project delivered",
            "Time-to-delivery measured",
            "Quality metrics met",
            "Team confidence increased",
            "Learnings documented"
        ],
        risks=[
            "Pilot project fails",
            "Team reverts to old habits",
            "AI quality issues"
        ],
        mitigations=[
            "Choose low-risk pilot",
            "Dedicated coaching",
            "Human review gates enforced"
        ]
    ),
    
    TransitionPhase(
        name="Phase 3: Expand",
        duration="2-3 months",
        objective="Expand to multiple teams",
        activities=[
            "Train additional teams",
            "Apply learnings from pilot",
            "Standardize guardrails across teams",
            "Establish community of practice",
            "Create organization-specific playbooks"
        ],
        success_criteria=[
            "3-5 teams using AI-DLC",
            "Consistent quality across teams",
            "Playbooks documented",
            "Community active"
        ],
        risks=[
            "Inconsistent adoption",
            "Knowledge silos",
            "Scaling guardrails"
        ],
        mitigations=[
            "Standardized training",
            "Cross-team sharing",
            "Centralized guardrail management"
        ]
    ),
    
    TransitionPhase(
        name="Phase 4: Scale",
        duration="3-6 months",
        objective="Organization-wide adoption",
        activities=[
            "Roll out to remaining teams",
            "Integrate with enterprise processes",
            "Establish governance",
            "Measure organization-wide impact",
            "Continuous improvement program"
        ],
        success_criteria=[
            "All teams using AI-DLC",
            "Governance established",
            "Measurable productivity gain",
            "Quality maintained or improved",
            "Sustainable practices"
        ],
        risks=[
            "Enterprise resistance",
            "Governance conflicts",
            "AI tool costs"
        ],
        mitigations=[
            "Executive sponsorship",
            "Clear ROI demonstration",
            "Cost-benefit analysis"
        ]
    ),
]
```

---

## Screen Design

### Main Transition Map Screen
```
╭──────────────────────────────────────────────────────────────────────────╮
│                    AGILE → AI-DLC TRANSITION MAP                         │
╰──────────────────────────────────────────────────────────────────────────╯

┌─ NAVIGATION ─────────────────────────────────────────────────────────────┐
│  [1] Roles    [2] Processes    [3] Artifacts    [4] Timeline    [5] Check│
└──────────────────────────────────────────────────────────────────────────┘

╭─ QUICK VIEW: ROLE CHANGES ───────────────────────────────────────────────╮
│                                                                          │
│   AGILE                              AI-DLC                              │
│   ┌────────────────┐                ┌────────────────┐                   │
│   │ Product Owner  │ ─────────────▶ │ Intent Owner   │                   │
│   └────────────────┘                └────────────────┘                   │
│   ┌────────────────┐                ┌────────────────┐                   │
│   │ Scrum Master   │ ─────────────▶ │ AI Facilitator │                   │
│   └────────────────┘                └────────────────┘                   │
│   ┌────────────────┐                ┌────────────────┐                   │
│   │ Developer      │ ─────────────▶ │Human Validator │                   │
│   └────────────────┘                └────────────────┘                   │
│   ┌────────────────┐                ┌────────────────┐                   │
│   │ QA Engineer    │ ─────────────▶ │ Proof Engineer │                   │
│   └────────────────┘                └────────────────┘                   │
│                                                                          │
│   Click a role or press its number for details                          │
╰──────────────────────────────────────────────────────────────────────────╯

  [e] Export Transition Plan    [a] Self-Assessment    [?] Help
```

### Role Detail View
```
╭──────────────────────────────────────────────────────────────────────────╮
│                    ROLE: Product Owner → Intent Owner                    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CHANGE IMPACT: ██████░░░░ MEDIUM                                       │
│                                                                          │
│  ┌─ KEY CHANGES ────────────────────────────────────────────────────┐   │
│  │ • Focus shifts from user stories to defining clear intent        │   │
│  │ • Less backlog grooming, more gate approval                      │   │
│  │ • Work with AI to decompose intent into units                    │   │
│  │ • Trust but verify AI-generated requirements                     │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─ NEW SKILLS NEEDED ──────────────────────────────────────────────┐   │
│  │ • Intent formulation (clear, measurable goals)                   │   │
│  │ • Gate review and approval criteria                              │   │
│  │ • Working with AI-generated artifacts                            │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─ TIME ALLOCATION CHANGE ─────────────────────────────────────────┐   │
│  │  BEFORE                          AFTER                           │   │
│  │  Backlog grooming    25%  ──▶   Intent definition    15%        │   │
│  │  Sprint planning     15%  ──▶   Mob Elaboration      10%        │   │
│  │  Stakeholder mtgs    30%  ──▶   Gate reviews         25%        │   │
│  │  Story writing       20%  ──▶   Stakeholder align    30%        │   │
│  │  Sprint reviews      10%  ──▶   Validation oversight 20%        │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  [←] Back    [→] Next Role    [t] Training Topics                       │
╰──────────────────────────────────────────────────────────────────────────╯
```

### Timeline View
```
╭──────────────────────────────────────────────────────────────────────────╮
│                       TRANSITION TIMELINE                                │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Phase 1: Foundation     Phase 2: Pilot         Phase 3: Expand         │
│  (2-4 weeks)             (4-8 weeks)            (2-3 months)            │
│                                                                          │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐      │
│  │ • Setup tools   │    │ • Run pilot     │    │ • Train teams   │      │
│  │ • Train pilot   │    │ • Learn & adjust│    │ • Standardize   │      │
│  │ • Configure     │    │ • Measure       │    │ • Playbooks     │      │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘      │
│         │                      │                      │                  │
│         ▼                      ▼                      ▼                  │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  You are here: Phase 1, Week 2                                          │
│                                                                          │
│  [1] Phase 1 Details    [2] Phase 2    [3] Phase 3    [4] Phase 4       │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## Implementation Checklist

### Phase 1: Data Layer
- [ ] Create `content/transition_mapping.py`
- [ ] Define all dataclasses
- [ ] Populate role mappings
- [ ] Populate process mappings
- [ ] Populate artifact mappings
- [ ] Populate transition phases
- [ ] Create readiness checklist data
- [ ] Unit tests for data models

### Phase 2: Main Screen
- [ ] Create `screens/transition_map.py`
- [ ] Implement navigation tabs
- [ ] Quick view panel
- [ ] Keyboard bindings (1-5 for tabs)
- [ ] Mouse support

### Phase 3: Detail Views
- [ ] Role detail view
- [ ] Process detail view
- [ ] Artifact detail view
- [ ] Timeline view
- [ ] Readiness checklist view

### Phase 4: Interactive Features
- [ ] Self-assessment form
- [ ] Gap analysis calculation
- [ ] Export functionality
- [ ] Training recommendations

### Phase 5: Polish
- [ ] Visual refinement
- [ ] Accessibility review
- [ ] Help text
- [ ] Documentation

---

## Success Metrics

1. **Comprehension:** Users can explain key role changes after viewing
2. **Planning:** Export feature used to create transition plans
3. **Assessment:** Self-assessment tool identifies training needs
4. **Adoption:** Tool cited in transition planning discussions

---

**Document Status:** COMPLETE  
**Ready for Implementation:** Yes
