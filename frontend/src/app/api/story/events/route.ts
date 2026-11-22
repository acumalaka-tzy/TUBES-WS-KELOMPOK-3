import { NextRequest, NextResponse } from 'next/server';
import { searchStoryEvents } from '@/lib/search/story-search';

/**
 * GET /api/story/events
 * Returns filtered list of story events with query, timeline, character, arc filters.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const timeline = searchParams.get('timeline') || undefined;
    const character = searchParams.get('character') || undefined;
    const arc = searchParams.get('arc') || undefined;
    const eventType = searchParams.get('eventType') || undefined;
    const q = searchParams.get('q') || undefined;

    const result = searchStoryEvents({
      query: q,
      timeline,
      character,
      arc,
      eventType,
    });

    return NextResponse.json(result.events, {
      headers: {
        'x-total-count': String(result.total),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal mengambil data peristiwa cerita.' },
      { status: 500 }
    );
  }
}
