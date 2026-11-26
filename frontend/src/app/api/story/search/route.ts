import { NextRequest, NextResponse } from 'next/server';
import { searchStoryEvents } from '@/lib/search/story-search';

/**
 * POST /api/story/search
 * Story Semantic Search endpoint
 * Searches narrative events by timeline, character participant, arc, and event type.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query || body.q || '';
    const timeline = body.timeline || undefined;
    const character = body.character || undefined;
    const arc = body.arc || undefined;
    const eventType = body.eventType || undefined;
    const chronologyType = body.chronologyType || undefined;
    const limit = typeof body.limit === 'number' ? body.limit : 50;
    const offset = typeof body.offset === 'number' ? body.offset : 0;

    const result = searchStoryEvents({
      query,
      timeline,
      character,
      arc,
      eventType,
      chronologyType,
      limit,
      offset,
    });

    // Frontend api.ts expects array or { events, total }
    return NextResponse.json(result.events, {
      headers: {
        'x-total-count': String(result.total),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Invalid story search request' },
      { status: 400 }
    );
  }
}
