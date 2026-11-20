import { NextRequest, NextResponse } from 'next/server';
import { weapons } from '@/lib/mock-data';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = weapons.find((w) => w.id === id);
  if (!item) return NextResponse.json({ message: `Senjata "${id}" tidak ditemukan.` }, { status: 404 });
  return NextResponse.json(item);
}
