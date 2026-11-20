import { NextResponse } from 'next/server';
import { organizations } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json(organizations);
}
