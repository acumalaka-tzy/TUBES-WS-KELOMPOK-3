import { NextRequest, NextResponse } from 'next/server';
import { weapons } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.toLowerCase().trim();
    const category = searchParams.get('category')?.toLowerCase().trim();

    let list = [...weapons];
    if (q) {
      list = list.filter(
        (w) => w.name.toLowerCase().includes(q) || w.description.toLowerCase().includes(q)
      );
    }
    if (category) {
      list = list.filter((w) => w.category.toLowerCase().includes(category));
    }

    return NextResponse.json(list, {
      headers: { 'x-total-count': String(list.length) },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal mengambil data senjata.' },
      { status: 500 }
    );
  }
}
