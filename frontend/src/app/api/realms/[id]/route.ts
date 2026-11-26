import { NextRequest, NextResponse } from 'next/server';
import { getRealmByIdFromFuseki } from '@/lib/fuseki-sparql-services';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: item, isFusekiLive } = await getRealmByIdFromFuseki(id);

    if (!item) {
      return NextResponse.json(
        { error: `Realm dengan ID "${id}" tidak ditemukan.` },
        { status: 404 }
      );
    }

    return NextResponse.json(item, {
      headers: {
        'x-data-source': isFusekiLive ? 'fuseki-live' : 'mock-fallback',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal mengambil detail realm.' },
      { status: 500 }
    );
  }
}
