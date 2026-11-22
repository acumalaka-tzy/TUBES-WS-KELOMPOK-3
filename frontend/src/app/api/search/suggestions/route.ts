import { NextRequest, NextResponse } from 'next/server';
import { generateSearchSuggestions } from '@/lib/search/suggestions';

/**
 * GET /api/search/suggestions
 * Returns fast entity & concept autocomplete suggestions for SearchBar
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 8;

    if (isNaN(limit) || limit < 1 || limit > 20) {
      return NextResponse.json(
        { error: 'Parameter limit harus antara 1 sampai 20.' },
        { status: 400 }
      );
    }

    const suggestions = generateSearchSuggestions(q, limit);
    return NextResponse.json(suggestions);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal memuat saran pencarian.' },
      { status: 500 }
    );
  }
}
