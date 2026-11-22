import { NextRequest, NextResponse } from 'next/server';
import { organizations } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.toLowerCase().trim();
    const kind = searchParams.get('kind')?.toLowerCase().trim();

    let list = [...organizations];
    if (q) {
      list = list.filter(
        (o) => o.name.toLowerCase().includes(q) || o.description.toLowerCase().includes(q)
      );
    }
    if (kind) {
      list = list.filter((o) => o.kind.toLowerCase() === kind);
    }

    return NextResponse.json(list, {
      headers: { 'x-total-count': String(list.length) },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal mengambil data organisasi.' },
      { status: 500 }
    );
  }
}
