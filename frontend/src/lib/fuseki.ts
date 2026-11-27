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

export const SPARQL_PREFIXES = `
PREFIX mk: <https://example.org/mk/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
`.trim();

/**
 * Escape string literal for safe inclusion inside SPARQL string literal or regex
 */
export function sparqlEscape(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

/**
 * Escape regex special characters for SPARQL regex() filter
 */
export function sparqlRegexEscape(str: string): string {
  return sparqlEscape(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Ensure the SPARQL query is strictly read-only (SELECT, ASK, CONSTRUCT, DESCRIBE)
 * to prevent SPARQL injection attacks that mutate the Knowledge Base.
 */
export function isReadOnlySparql(sparql: string): boolean {
  const stripped = sparql.replace(/#[^\r\n]*/g, '').trim();
  const forbidden = /\b(INSERT|DELETE|DROP|CLEAR|LOAD|CREATE|COPY|MOVE|ADD)\b/i;
  if (forbidden.test(stripped)) {
    return false;
  }
  const allowed = /^\s*(PREFIX[^\r\n]*[\r\n\s]+)*(SELECT|ASK|CONSTRUCT|DESCRIBE)\b/i;
  return allowed.test(stripped);
}

/**
 * Fuseki Client for executing SPARQL queries against standalone Apache Jena Fuseki server.
 */
export class FusekiClient {
  private queryEndpoint: string;

  constructor() {
    this.queryEndpoint = process.env.FUSEKI_QUERY_ENDPOINT || 'http://localhost:3030/mk_nexus/query';
  }

  getEndpoint(): string {
    return this.queryEndpoint;
  }

  /**
   * Health check connectivity to Fuseki
   */
  async checkHealth(): Promise<{ status: 'connected' | 'disconnected'; message: string }> {
    try {
      const pingQuery = 'ASK { ?s ?p ?o }';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

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
   * Execute SPARQL query (SELECT or ASK)
   */
  async query(sparql: string, timeoutMs: number = 5000): Promise<SparqlSelectResponse> {
    if (!isReadOnlySparql(sparql)) {
      throw new Error('Forbidden: Only read-only SPARQL queries (SELECT, ASK, CONSTRUCT, DESCRIBE) are permitted.');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const fullQuery = sparql.includes('PREFIX mk:') ? sparql : `${SPARQL_PREFIXES}\n${sparql}`;

      const response = await fetch(this.queryEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Accept: 'application/sparql-results+json',
        },
        body: new URLSearchParams({ query: fullQuery }),
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
