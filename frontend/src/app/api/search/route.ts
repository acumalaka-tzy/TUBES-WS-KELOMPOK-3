import { NextRequest, NextResponse } from 'next/server';
import { mockSearch } from '@/lib/mock-search';
import type { EntityType } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const type = (searchParams.get('type') as EntityType | 'all') || 'all';

  const results = mockSearch(q, 'keyword', type);
  return NextResponse.json(results);
}
