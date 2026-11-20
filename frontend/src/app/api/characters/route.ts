import { NextResponse } from 'next/server';
import { characters } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(characters);
}
