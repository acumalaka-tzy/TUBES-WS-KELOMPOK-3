import { NextRequest, NextResponse } from 'next/server';
import { executeSearch } from '@/lib/search/hybrid-engine';
import type { EntityType, SearchMode } from '@/lib/types';

const VALID_MODES: SearchMode[] = ['keyword', 'semantic', 'hybrid'];
const VALID_TYPES: (EntityType | 'all')[] = [
  'all',
  'character',
  'game',
  'ability',
  'weapon',
  'organization',
  'timeline',
  'event',
  'location',
  'species',
];

/**
 * GET /api/search
 * Global Search endpoint supporting Keyword, Semantic, and Hybrid Search modes.
 * Query params: q, mode, type, game, timeline, element, faction, limit, offset
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const modeParam = (searchParams.get('mode') as SearchMode) || 'hybrid';
    const typeParam = (searchParams.get('type') as EntityType | 'all') || 'all';
    const game = searchParams.get('game') || undefined;
    const timeline = searchParams.get('timeline') || undefined;
    const element = searchParams.get('element') || undefined;
    const faction = searchParams.get('faction') || undefined;

    const rawLimit = searchParams.get('limit');
    const rawOffset = searchParams.get('offset');
    const limit = rawLimit ? parseInt(rawLimit, 10) : 20;
    const offset = rawOffset ? parseInt(rawOffset, 10) : 0;

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Parameter "limit" harus bernilai integer antara 1 sampai 100.' },
        { status: 400 }
      );
    }

    if (isNaN(offset) || offset < 0) {
      return NextResponse.json(
        { error: 'Parameter "offset" harus berupa integer non-negatif.' },
        { status: 400 }
      );
    }

    const mode: SearchMode = VALID_MODES.includes(modeParam) ? modeParam : 'hybrid';
    const type: EntityType | 'all' = VALID_TYPES.includes(typeParam) ? typeParam : 'all';

    const response = await executeSearch({
      q,
      mode,
      type,
      game,
      timeline,
      element,
      faction,
      limit,
      offset,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Terjadi kesalahan internal pada search engine.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/search
 * Alternative POST endpoint for complex search payloads
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const q = body.q || body.query || '';
    const modeParam = body.mode as SearchMode;
    const typeParam = body.type as EntityType | 'all';
    const game = body.game || undefined;
    const timeline = body.timeline || undefined;
    const element = body.element || undefined;
    const faction = body.faction || undefined;

    const limit = typeof body.limit === 'number' ? body.limit : 20;
    const offset = typeof body.offset === 'number' ? body.offset : 0;

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Parameter "limit" harus bernilai antara 1 sampai 100.' },
        { status: 400 }
      );
    }
    if (offset < 0) {
      return NextResponse.json(
        { error: 'Parameter "offset" harus berupa integer non-negatif.' },
        { status: 400 }
      );
    }

    const mode: SearchMode = VALID_MODES.includes(modeParam) ? modeParam : 'hybrid';
    const type: EntityType | 'all' = VALID_TYPES.includes(typeParam) ? typeParam : 'all';

    const response = await executeSearch({
      q,
      mode,
      type,
      game,
      timeline,
      element,
      faction,
      limit,
      offset,
    });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Payload pencarian tidak valid.' },
      { status: 400 }
    );
  }
}
