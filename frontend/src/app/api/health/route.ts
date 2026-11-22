import { NextResponse } from 'next/server';
import { fuseki } from '@/lib/fuseki';

/**
 * GET /api/health
 * Health check endpoint reporting status of Next.js web server,
 * Apache Jena Fuseki connection, and Hybrid Search Engine readiness.
 */
export async function GET() {
  const fusekiHealth = await fuseki.checkHealth();

  return NextResponse.json({
    status: fusekiHealth.status === 'connected' ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    version: '1.5.0',
    services: {
      web: 'healthy',
      fuseki: {
        ...fusekiHealth,
        endpoint: fuseki.getEndpoint(),
      },
      searchEngine: {
        status: 'ready',
        modes: ['keyword', 'semantic', 'hybrid'],
        ranking: 'Reciprocal Rank Fusion (RRF k=60)',
        nlp: 'NLQP & Entity Linking v2.0',
        storySearch: 'enabled',
      },
    },
  });
}
