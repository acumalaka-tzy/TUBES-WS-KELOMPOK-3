export interface SparqlBindingValue {
  type: 'uri' | 'literal' | 'bnode';
  value: string;
  datatype?: string;
  'xml:lang'?: string;
}

export interface SparqlSelectResponse {
  head: {
    vars: string[];
  };
  results: {
    bindings: Record<string, SparqlBindingValue>[];
  };
}

/**
 * Fuseki Client for executing SPARQL queries against standalone Apache Jena Fuseki server.
 */
export class FusekiClient {
  private queryEndpoint: string;

  constructor() {
    this.queryEndpoint = process.env.FUSEKI_QUERY_ENDPOINT || 'http://localhost:3030/mk_nexus/query';
  }

  /**
   * Health check connectivity to Fuseki
   */
  async checkHealth(): Promise<{ status: 'connected' | 'disconnected'; message: string }> {
    try {
      const pingQuery = 'ASK { ?s ?p ?o }';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${this.queryEndpoint}?query=${encodeURIComponent(pingQuery)}`, {
        headers: { Accept: 'application/sparql-results+json' },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return { status: 'connected', message: 'Fuseki SPARQL endpoint is online and reachable.' };
      }
      return { status: 'disconnected', message: `Fuseki returned HTTP ${response.status}` };
    } catch (err: any) {
      return { status: 'disconnected', message: err?.message || 'Could not connect to Fuseki server at localhost:3030.' };
    }
  }

  /**
   * Execute SPARQL SELECT query
   */
  async query(sparql: string, timeoutMs: number = 5000): Promise<SparqlSelectResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(this.queryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Accept: 'application/sparql-results+json',
        },
        body: new URLSearchParams({ query: sparql }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SPARQL Query error (HTTP ${response.status}): ${errorText}`);
      }

      return (await response.json()) as SparqlSelectResponse;
    } catch (error: any) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
}

export const fuseki = new FusekiClient();
