import { NextRequest, NextResponse } from 'next/server';
import { fuseki } from '@/lib/fuseki';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'SPARQL query is required.' }, { status: 400 });
    }
    const result = await fuseki.query(query);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'SPARQL query failed.' }, { status: 500 });
  }
}
