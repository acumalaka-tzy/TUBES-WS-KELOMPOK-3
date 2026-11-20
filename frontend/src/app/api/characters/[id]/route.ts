import { NextRequest, NextResponse } from 'next/server';
import { characters } from '@/lib/mock-data';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const character = characters.find((c) => c.id === id);

  if (!character) {
    return NextResponse.json({ message: `Karakter "${id}" tidak ditemukan.` }, { status: 404 });
  }
  return NextResponse.json(character);
}
