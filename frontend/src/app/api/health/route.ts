import { NextResponse } from 'next/server';
import { fuseki } from '@/lib/fuseki';

export async function GET() {
  const fusekiHealth = await fuseki.checkHealth();
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      web: 'healthy',
      fuseki: fusekiHealth,
    },
    version: '1.5.0',
  });
}
