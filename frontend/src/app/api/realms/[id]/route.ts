import { NextRequest, NextResponse } from 'next/server';
import { realms } from '@/lib/mock-data';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = realms.find((r) => r.id === id || r.name.toLowerCase() === id.toLowerCase());

    if (!item) {
      return NextResponse.json(
        { error: `Realm dengan ID "${id}" tidak ditemukan.` },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal mengambil detail realm.' },
      { status: 500 }
    );
  }
}
