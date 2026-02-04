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
    id: 'llm-reality-check',
    title: 'Software engineering with LLMs in 2025: reality check (at LDX3 by LeadDev)',
    channelName: 'Pragmatic Engineer',
    channelUrl: 'https://www.youtube.com/@pragmaticengineer',
    videoUrl: 'https://youtu.be/EO3_qN_Ynsk?si=m1i7iGk9GfKyBtZh',
    embedUrl: 'https://www.youtube.com/embed/EO3_qN_Ynsk?si=CieKZGsBzePmNHkg',
    summary: [
      'The talk contrasts executive hype about AI-written code with messy reality: agents still struggle in complex production codebases and can introduce expensive bugs. The practical question is where AI is reliably useful, not whether it will replace engineers.',
      'In AI dev-tool companies and parts of Big Tech, AI-assisted development is now common and growing, especially when integrated into IDEs and daily workflows. Biggest gains show up on well-defined tasks, with tight feedback loops (run tests/builds, iterate).',
      'Impact is uneven: some teams, especially in novel or correctness-sensitive domains, find review and rework costs erase the speedup. Typical adoption is around half of developers using AI weekly, with reported savings measured in hours per week, not blanket "10x."',
      'AI-SDLC takeaway: connect models to real engineering context (repos, tickets, docs, systems) and reinforce the delivery "receiver infrastructure" (testing, CI/CD, code review, feature flags, observability) so higher throughput does not reduce quality.'
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
