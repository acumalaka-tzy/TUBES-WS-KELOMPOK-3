import { NextRequest, NextResponse } from 'next/server';
import { timelines } from '@/lib/mock-data';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = timelines.find((t) => t.id === id);
  if (!item) return NextResponse.json({ message: `Timeline "${id}" tidak ditemukan.` }, { status: 404 });
  return NextResponse.json(item);
}
