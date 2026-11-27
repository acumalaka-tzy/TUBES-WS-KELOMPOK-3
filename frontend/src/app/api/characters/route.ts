import { NextRequest, NextResponse } from 'next/server';
import { getCharactersFromFuseki } from '@/lib/fuseki-sparql-services';

/**
 * GET /api/characters
 * Returns list of Mortal Kombat characters with optional filters:
 * q, realm, faction, game, species
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.toLowerCase().trim();
    const realm = searchParams.get('realm')?.toLowerCase().trim();
    const faction = searchParams.get('faction')?.toLowerCase().trim();
    const game = searchParams.get('game')?.toLowerCase().trim();
    const species = searchParams.get('species')?.toLowerCase().trim();

    const { data: charactersList, isFusekiLive } = await getCharactersFromFuseki();
    let list = [...charactersList];

    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.aliases.some((a) => a.toLowerCase().includes(q)) ||
          c.summary.toLowerCase().includes(q)
      );
    }

    if (realm) {
      list = list.filter((c) => c.realm?.name.toLowerCase().includes(realm));
    }

    if (faction) {
      list = list.filter((c) => c.faction?.toLowerCase().includes(faction));
    }

    if (species) {
      list = list.filter((c) => c.species?.name.toLowerCase().includes(species));
    }

    if (game) {
      list = list.filter((c) =>
        c.versions.some((v) => v.gameTitle.toLowerCase().includes(game))
      );
    }

    return NextResponse.json(list, {
      headers: {
        'x-total-count': String(list.length),
        'x-data-source': isFusekiLive ? 'fuseki-live' : 'mock-fallback',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal mengambil data karakter.' },
      { status: 500 }
    );
  }
}
