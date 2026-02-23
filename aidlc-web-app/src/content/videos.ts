import type { Video } from '@/types';

/**
 * Curated AI-SDLC video lessons content
 * Each video includes metadata for embedding, attribution, and summary bullet points
 */
export const VIDEOS: Video[] = [
  {
    id: 'codebase-entropy',
    title: 'The Ticking Time Bomb in Every Codebase Over 18 Months Old (How to Fix It Before It\'s Too Late)',
    channelName: 'Nate B Jones',
    channelUrl: 'https://www.youtube.com/@NateBJones',
    videoUrl: 'https://youtu.be/NoRePxSrhpw?si=AQmrtF7c9kskGSTD',
    embedUrl: 'https://www.youtube.com/embed/NoRePxSrhpw?si=GAL3JfhEf_ptM-aD',
    summary: [
      'Mature codebases tend to fail through slow entropy, not bad engineers: many reasonable local changes add up to hidden architectural and performance regressions because context is spread across files, people, and time.',
      'AI can be structurally better at preventing this rot by consistently checking changes against repo-wide patterns and rules, spotting issues humans miss (hidden costs, silent cache breaks, async waterfalls, unnecessary optimizations) without fatigue.',
      'The biggest benefit for AI-SDLC is just-in-time guidance: AI can flag the problem, explain why it matters, and show the fix directly in the workflow, reducing reliance on tribal knowledge.',
      'AI does not replace architects. Humans still own novel design and business trade-offs; AI provides continuous vigilance and enforcement. The key enabler is operationalizing standards and context (explicit rules + good retrieval), not "smarter models."'
    ]
  },
  {
    id: 'aws-reinvent-aidlc',
    title: 'AWS re:Invent 2025 - Introducing AI driven development lifecycle (AI-DLC) (DVT214)',
    channelName: 'AWS Events',
    channelUrl: 'https://www.youtube.com/@AWSEventsChannel',
    videoUrl: 'https://youtu.be/1HNUH6j5t4A?si=36sZFB5nkDHKxymE',
    embedUrl: 'https://www.youtube.com/embed/1HNUH6j5t4A?si=1HFyinA6SVIxI79l',
    summary: [
      'AI makes coding faster, but most delivery time is still spent on SDLC friction: alignment, handoffs, reviews, QA/security/ops gates, and meetings. Tool adoption alone often yields only small gains because the process around coding does not change.',
      'They highlight two anti-patterns: "AI-managed" work that produces large, low-confidence code dumps that are hard to ship, and "AI-assisted" work where humans still do most planning/coordination and AI is used only for small tasks.',
      'Their solution is an AI-driven development lifecycle (AI-DLC): AI plans, humans validate and correct, AI executes, humans verify. The goal is production-grade output that engineers can understand, own, and maintain (not "vibe coding").',
      'The main unlock is compressing collaboration into short, synchronous rituals. "Mob elaboration" turns intent into clear stories in hours; "mob construction" keeps cross-functional teams building together at the same time to remove waiting and rework.',
      'Practical enablers include tight task decomposition, disciplined context management, stronger automated tests, better dev environments/CI/CD, and semantic understanding of brownfield code so AI changes the right files without thrashing the repo.'
    ]
  },
  {
    id: 'ide-died-vibe-coding',
    title: '2026: The Year The IDE Died — Steve Yegge & Gene Kim, Authors, Vibe Coding',
    channelName: 'AI Engineer',
    channelUrl: 'https://www.youtube.com/@aiDotEngineer',
    videoUrl: 'https://youtu.be/7Dtu2bilcFs?si=rglxqyZQ1wkQiG7h',
    embedUrl: 'https://www.youtube.com/embed/7Dtu2bilcFs?si=5BeXKBTGNKmAEdV_',
    summary: [
      'The speakers argue AI is shifting software work from IDE-driven hand-coding to supervised, machine-generated delivery, where engineers focus more on intent, constraints, and verification than typing code.',
      'Current single-agent "cloud code" tools are powerful but cognitively heavy and error-prone. The next step is an AI-SDLC built around task decomposition and multiple specialized agents (spec, implement, review, test, merge), not one bigger context window.',
      'The biggest gains are not just speed, but lower coordination cost: smaller teams ship faster, non-developers and leaders can deliver features, and organizations can run more parallel experiments.',
      'Adoption requires practice (trust grows with use) and new guardrails, because cultural backlash and workflow bottlenecks (reviews/merges) become the limiting factors at higher velocity.'
    ]
  },
  {
    id: '5-levels-ai-coding',
    title: 'The 5 Levels of AI Coding (Why Most of You Won\'t Make It Past Level 2)',
    channelName: 'Nate B Jones',
    channelUrl: 'https://www.youtube.com/@NateBJones',
    videoUrl: 'https://youtu.be/bDcgHzCBgmQ?si=BjtzCIvBXmEb8qxa',
    embedUrl: 'https://www.youtube.com/embed/bDcgHzCBgmQ?si=BjtzCIvBXmEb8qxa',
    summary: [
      'There is a widening gap between "dark factories" (spec in, autonomous build/test/ship; humans only define specs and judge outcomes) and most teams using AI as an assistant inside legacy SDLC, often getting slower at first (J-curve).',
      '"Five levels" maturity: L0 autocomplete, L1 scoped tasks with full human review, L2 multi-file changes with full human reading, L3 PR-level management, L4 spec + outcome checks (code as black box), L5 fully autonomous factory.',
      'Crossing the gap is not a tooling problem; it requires redesigning the SDLC and org structures built for human limitations (standups/sprints/reviews/QA) into artifact-driven specs plus evidence gates.',
      'Level-5 enablers: external holdout "scenarios" the agent cannot see (reduces gaming) and digital-twin environments for safe end-to-end integration validation.',
      'Brownfield path: use AI to accelerate work today, then reverse-engineer real system behavior into specs and scenario suites, upgrade CI/CD gates for AI-volume changes, and only then shift new development toward higher autonomy.'
    ]
  }
];

/**
 * Get a video by its unique ID
 * @param id - The video ID to look up
 * @returns The Video object if found, undefined otherwise
 */
export function getVideoById(id: string): Video | undefined {
  return VIDEOS.find(video => video.id === id);
}

/**
 * Get all videos in the curated collection
 * @returns Array of all Video objects
 */
export function getAllVideos(): Video[] {
  return VIDEOS;
}
