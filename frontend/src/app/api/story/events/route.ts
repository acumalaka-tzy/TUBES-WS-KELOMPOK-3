import { NextRequest, NextResponse } from 'next/server';
import { storyEvents } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeline = searchParams.get('timeline');
  const character = searchParams.get('character');
  const arc = searchParams.get('arc');
  const q = searchParams.get('q')?.toLowerCase().trim();

  let list = storyEvents;
  if (timeline) list = list.filter((e) => e.timeline.id === timeline);
  if (character) list = list.filter((e) => e.participants.some((p) => p.id === character));
  if (arc) list = list.filter((e) => e.arc === arc);
  if (q) {
    list = list.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.participants.some((p) => p.name.toLowerCase().includes(q))
    );
  }

  return NextResponse.json(list);
}
