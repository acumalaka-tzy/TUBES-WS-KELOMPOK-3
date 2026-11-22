import { NextRequest, NextResponse } from 'next/server';
import { executeAdvancedSearch } from '@/lib/search/advanced-search';
import type { AdvancedSearchParams } from '@/lib/search/types';

/**
 * POST /api/search/advanced
 * Advanced Faceted Search endpoint supporting multiple criteria
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AdvancedSearchParams;
    const response = await executeAdvancedSearch(body);
    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal menjalankan pencarian lanjutan.' },
      { status: 400 }
    );
  }
}
