import { NextRequest, NextResponse } from 'next/server';
import { storyEvents } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeline = searchParams.get('timeline');

  let list = storyEvents;
  if (timeline) list = list.filter((e) => e.timeline.id === timeline);
  list = [...list].sort((a, b) => a.chronology - b.chronology);

  return NextResponse.json(list);
}
