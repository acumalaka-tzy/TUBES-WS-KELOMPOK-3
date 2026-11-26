import { NextRequest, NextResponse } from 'next/server';
import { fuseki } from '@/lib/fuseki';

/**
 * GET /api/knowledge-graph
 * Supports Relationship Explorer, Knowledge Graph Visualization,
 * Ontology Management, and RDF Management backed by live Apache Jena Fuseki.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeline = searchParams.get('timeline') || '';

  const timelineFilter = timeline
    ? `FILTER(CONTAINS(LCASE(STR(?timeline)), LCASE("${timeline.replace(/[^a-zA-Z0-9_-]/g, '')}")))`
    : '';

  const relQuery = `
    PREFIX mk: <https://example.org/mk/>
    SELECT ?subjectId ?subjectName ?predicate ?objectId ?objectName ?context ?evidence ?timelineName ?sourceName ?sourceURL ?verificationStatus
    WHERE {
      ?claim a mk:StoryClaim ;
             mk:claimSubject ?subjectId ;
             mk:claimPredicate ?predicate ;
             mk:claimObject ?objectId ;
             mk:claimInTimeline ?timeline ;
             mk:supportedBy ?source ;
             mk:verificationStatus ?verificationStatus .
      ?subjectId mk:name ?subjectName .
      ?objectId mk:name ?objectName .
      ?timeline mk:name ?timelineName .
      ?source mk:name ?sourceName ;
              mk:sourceURL ?sourceURL .
      OPTIONAL { ?claim mk:claimContext ?context }
      OPTIONAL { ?claim mk:evidenceText ?evidence }
      ${timelineFilter}
    }
    ORDER BY ?subjectName ?timelineName
    LIMIT 100
  `;

  const ontologyQuery = `
    PREFIX mk: <https://example.org/mk/>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT ?class ?label (COUNT(?instance) AS ?count)
    WHERE {
      ?class a owl:Class .
      FILTER(STRSTARTS(STR(?class), "https://example.org/mk/"))
      OPTIONAL { ?class rdfs:label ?label }
      OPTIONAL { ?instance a ?class }
    }
    GROUP BY ?class ?label
    ORDER BY DESC(?count)
  `;

  try {
    const [relRes, ontoRes] = await Promise.all([
      fuseki.query(relQuery),
      fuseki.query(ontologyQuery),
    ]);

    const relationships = relRes.results.bindings.map((b) => ({
      subjectId: b.subjectId?.value.replace('https://example.org/mk/', ''),
      subjectName: b.subjectName?.value,
      predicate: b.predicate?.value,
      objectId: b.objectId?.value.replace('https://example.org/mk/', ''),
      objectName: b.objectName?.value,
      context: b.context?.value,
      evidence: b.evidence?.value,
      timelineName: b.timelineName?.value,
      provenance: {
        sourceName: b.sourceName?.value,
        sourceURL: b.sourceURL?.value,
        verificationStatus: b.verificationStatus?.value,
      },
    }));

    const ontologyClasses = ontoRes.results.bindings.map((b) => ({
      uri: b.class?.value,
      id: b.class?.value.replace('https://example.org/mk/', 'mk:'),
      label: b.label?.value,
      instanceCount: Number(b.count?.value ?? 0),
    }));

    return NextResponse.json({
      status: 'ok',
      fuseki: 'connected',
      ontologyVersion: '2.0',
      ontologyClasses,
      relationships,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'fallback',
        fuseki: 'disconnected',
        message: error?.message || 'Fuseki server is unreachable',
        ontologyVersion: '2.0',
        ontologyClasses: [],
        relationships: [],
      },
      { status: 200 }
    );
  }
}
