import { NextRequest, NextResponse } from 'next/server';
import { storyEvents } from '@/lib/mock-data';

export async function POST(req: NextRequest) {
  try {
    const { query, timeline, character, arc } = await req.json();
    const q = (query || '').toLowerCase().trim();

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
  } catch (err: any) {
    return NextResponse.json({ error: 'Invalid story search request' }, { status: 400 });
  }
}
