import { NextResponse } from 'next/server';
import { abilities } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(abilities);
}
