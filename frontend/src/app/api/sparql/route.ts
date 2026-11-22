import { NextRequest, NextResponse } from 'next/server';
import { fuseki, isReadOnlySparql } from '@/lib/fuseki';

/**
 * POST /api/sparql
 * Secure SPARQL query proxy endpoint with read-only validation.
 * Rejects mutation queries (INSERT, DELETE, DROP, CLEAR, LOAD, etc.) to prevent injection attacks.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body?.query;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'SPARQL query string is required in "query" field.' },
        { status: 400 }
      );
    }

    if (!isReadOnlySparql(query)) {
      return NextResponse.json(
        {
          error:
            'Forbidden: Hanya kueri SPARQL read-only (SELECT, ASK, CONSTRUCT, DESCRIBE) yang diizinkan.',
        },
        { status: 403 }
      );
    }

    const result = await fuseki.query(query);
    return NextResponse.json(result);
  } catch (error: any) {
    const isConnError = error?.message?.includes('Could not connect') || error?.message?.includes('fetch failed');
    return NextResponse.json(
      {
        error: error?.message || 'Eksekusi SPARQL gagal.',
        status: isConnError ? 'fuseki_offline' : 'sparql_error',
      },
      { status: isConnError ? 503 : 500 }
    );
  }
}
