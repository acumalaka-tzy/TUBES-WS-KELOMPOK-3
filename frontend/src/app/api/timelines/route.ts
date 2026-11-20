import { NextResponse } from 'next/server';
import { timelines } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json([...timelines].sort((a, b) => a.order - b.order));
}
