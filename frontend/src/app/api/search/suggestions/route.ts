import { NextRequest, NextResponse } from 'next/server';
import { mockSuggestions } from '@/lib/mock-search';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';

  const suggestions = mockSuggestions(q);
  return NextResponse.json(suggestions);
}
