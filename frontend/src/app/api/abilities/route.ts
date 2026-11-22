import { NextRequest, NextResponse } from 'next/server';
import { abilities } from '@/lib/mock-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.toLowerCase().trim();
    const element = searchParams.get('element')?.toLowerCase().trim();
    const category = searchParams.get('category')?.toLowerCase().trim();

    let list = [...abilities];
    if (q) {
      list = list.filter(
        (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      );
    }
    if (element) {
      list = list.filter((a) => a.element?.toLowerCase().includes(element));
    }
    if (category) {
      list = list.filter((a) => a.category.toLowerCase().includes(category));
    }

    return NextResponse.json(list, {
      headers: { 'x-total-count': String(list.length) },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal mengambil data kemampuan.' },
      { status: 500 }
    );
  }
}
