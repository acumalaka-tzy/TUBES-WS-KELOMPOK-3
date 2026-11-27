import { NextRequest, NextResponse } from 'next/server';
import { getRealmsFromFuseki } from '@/lib/fuseki-sparql-services';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.toLowerCase().trim();

    const { data, isFusekiLive } = await getRealmsFromFuseki();
    let list = [...data];
    if (q) {
      list = list.filter(
        (r) => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
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
      { error: err?.message || 'Gagal mengambil data realm.' },
      { status: 500 }
    );
  }
}
