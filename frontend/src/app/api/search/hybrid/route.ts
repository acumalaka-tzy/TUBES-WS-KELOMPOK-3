import { NextRequest, NextResponse } from 'next/server';
import { executeSearch } from '@/lib/search/hybrid-engine';
import type { EntityType } from '@/lib/types';

/**
 * POST /api/search/hybrid
 * Explicit Hybrid Search endpoint combining Keyword + Semantic with Reciprocal Rank Fusion
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query || body.q || '';
    const type = (body.type as EntityType | 'all') || 'all';

    const results = await executeSearch({
      q: query,
      mode: 'hybrid',
      type,
      game: body.game,
      timeline: body.timeline,
      element: body.element,
      faction: body.faction,
      limit: body.limit ?? 20,
      offset: body.offset ?? 0,
    });

    return NextResponse.json(results);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Invalid hybrid search request' },
      { status: 400 }
    );
  }
}
