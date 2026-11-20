import { NextRequest, NextResponse } from 'next/server';
import { abilities } from '@/lib/mock-data';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = abilities.find((a) => a.id === id);
  if (!item) return NextResponse.json({ message: `Kemampuan "${id}" tidak ditemukan.` }, { status: 404 });
  return NextResponse.json(item);
}
