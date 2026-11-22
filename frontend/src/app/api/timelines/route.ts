import { NextRequest, NextResponse } from 'next/server';
import { timelines } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.toLowerCase().trim();

    let list = [...timelines].sort((a, b) => a.order - b.order);
    if (q) {
      list = list.filter(
        (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(list, {
      headers: { 'x-total-count': String(list.length) },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal mengambil data timeline.' },
      { status: 500 }
    );
  }
}
