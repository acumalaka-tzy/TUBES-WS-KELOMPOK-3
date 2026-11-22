import { NextRequest, NextResponse } from 'next/server';
import { games } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.toLowerCase().trim();
    const era = searchParams.get('era')?.toLowerCase().trim();

    let list = [...games];
    if (q) {
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.shortTitle.toLowerCase().includes(q) ||
          g.summary.toLowerCase().includes(q)
      );
    }
    if (era) {
      list = list.filter((g) => g.era.toLowerCase().includes(era));
    }

    return NextResponse.json(list, {
      headers: { 'x-total-count': String(list.length) },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal mengambil data game.' },
      { status: 500 }
    );
  }
}
