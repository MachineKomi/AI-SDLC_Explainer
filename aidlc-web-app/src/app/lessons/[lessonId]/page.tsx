import { LESSONS } from '@/content/lessons';
import LessonClient from './LessonClient';

// Generate static params for all lessons
export function generateStaticParams() {
  return LESSONS.map((lesson) => ({
    lessonId: lesson.id,
  }));
}

export default function LessonPage({ params }: { params: { lessonId: string } }) {
  return <LessonClient lessonId={params.lessonId} />;
}
