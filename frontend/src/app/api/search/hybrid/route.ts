import { NextRequest, NextResponse } from 'next/server';
import { mockSearch } from '@/lib/mock-search';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query || '';
    const type = body.type || 'all';

    const results = mockSearch(query, 'hybrid', type);
    return NextResponse.json(results);
  } catch (err: any) {
    return NextResponse.json({ error: 'Invalid search request' }, { status: 400 });
  }
}
