import { fuseki } from "./fuseki";
import { realms as fallbackRealms, characters as fallbackCharacters, games as fallbackGames } from "./mock-data";
import type { Realm, Character, Game } from "./types";

/**
 * Fetch all canonical realms live from Apache Jena Fuseki via SPARQL.
 */
export async function getRealmsFromFuseki(): Promise<{ data: Realm[]; isFusekiLive: boolean }> {
  const query = `
    PREFIX mk: <https://example.org/mk/>
    SELECT ?uri ?name ?desc WHERE {
      ?uri a mk:Realm ;
           mk:name ?name .
      OPTIONAL { ?uri mk:description ?desc }
    }
    ORDER BY ?name
  `;

  try {
    const res = await fuseki.query(query, 4000);
    const bindings = res?.results?.bindings;
    if (!bindings || bindings.length === 0) {
      return { data: fallbackRealms, isFusekiLive: false };
    }

    const items: Realm[] = bindings.map((b) => {
      const uri = b.uri?.value || "";
      const rawId = uri.replace("https://example.org/mk/realm-", "").replace("https://example.org/mk/", "");
      const name = b.name?.value || rawId;
      const desc = b.desc?.value || "";

      // Blend with UI attributes from fallback if present
      const fallback = fallbackRealms.find((r) => r.id === rawId || r.name.toLowerCase() === name.toLowerCase());

      return {
        id: rawId,
        name: name,
        type: "location",
        description: desc || fallback?.description || `Alam ${name} dalam kosmologi Mortal Kombat.`,
        ruler: fallback?.ruler,
        inhabitants: fallback?.inhabitants,
        href: `/realms/${rawId}`,
        sources: fallback?.sources || [],
      };
    });

    return { data: items, isFusekiLive: true };
  } catch {
    return { data: fallbackRealms, isFusekiLive: false };
  }
}

/**
 * Fetch single realm by ID live from Apache Jena Fuseki via SPARQL.
 */
export async function getRealmByIdFromFuseki(id: string): Promise<{ data: Realm | null; isFusekiLive: boolean }> {
  const cleanId = id.toLowerCase().replace(/[^a-z0-9_-]/g, "");
  const uri = `https://example.org/mk/realm-${cleanId}`;

  const query = `
    PREFIX mk: <https://example.org/mk/>
    SELECT ?name ?desc WHERE {
      {
        <${uri}> a mk:Realm ;
                 mk:name ?name .
        OPTIONAL { <${uri}> mk:description ?desc }
      } UNION {
        ?r a mk:Realm ;
           mk:name ?name .
        FILTER(CONTAINS(LCASE(STR(?r)), "${cleanId}"))
        OPTIONAL { ?r mk:description ?desc }
      }
    }
    LIMIT 1
  `;

  try {
    const res = await fuseki.query(query, 4000);
    const b = res?.results?.bindings?.[0];
    if (!b) {
      const fallback = fallbackRealms.find((r) => r.id === id || r.name.toLowerCase() === id.toLowerCase()) || null;
      return { data: fallback, isFusekiLive: false };
    }

    const name = b.name?.value || id;
    const desc = b.desc?.value || "";
    const fallback = fallbackRealms.find((r) => r.id === id || r.name.toLowerCase() === name.toLowerCase());

    const item: Realm = {
      id: cleanId,
      name: name,
      type: "location",
      description: desc || fallback?.description || `Alam ${name} dalam kosmologi Mortal Kombat.`,
      ruler: fallback?.ruler,
      inhabitants: fallback?.inhabitants,
      href: `/realms/${cleanId}`,
      sources: fallback?.sources || [],
    };

    return { data: item, isFusekiLive: true };
  } catch {
    const fallback = fallbackRealms.find((r) => r.id === id || r.name.toLowerCase() === id.toLowerCase()) || null;
    return { data: fallback, isFusekiLive: false };
  }
}

/**
 * Fetch characters live from Apache Jena Fuseki via SPARQL.
 */
export async function getCharactersFromFuseki(): Promise<{ data: Character[]; isFusekiLive: boolean }> {
  const query = `
    PREFIX mk: <https://example.org/mk/>
    SELECT ?uri ?name (COUNT(?v) AS ?versionCount) WHERE {
      ?uri a mk:Character ;
           mk:name ?name .
      OPTIONAL { ?uri mk:hasVersion ?v }
    }
    GROUP BY ?uri ?name
    ORDER BY ?name
  `;

  try {
    const res = await fuseki.query(query, 4000);
    const bindings = res?.results?.bindings;
    if (!bindings || bindings.length === 0) {
      return { data: fallbackCharacters, isFusekiLive: false };
    }

    // Match with fallback details to ensure rich UI (images, versions, alignments)
    const items: Character[] = bindings.map((b) => {
      const rawUri = b.uri?.value || "";
      const rawId = rawUri.replace("https://example.org/mk/character-", "").replace("https://example.org/mk/", "");
      const name = b.name?.value || rawId;

      const matched = fallbackCharacters.find((c) => c.id === rawId || c.name.toLowerCase() === name.toLowerCase());
      if (matched) {
        return matched;
      }

      return {
        id: rawId,
        name: name,
        type: "character",
        summary: `Karakter kanonikal ${name} dalam semesta Mortal Kombat yang tercatat di Apache Jena Fuseki.`,
        biography: `Karakter kanonikal ${name} dalam semesta Mortal Kombat yang tercatat di Apache Jena Fuseki.`,
        aliases: [],
        versions: [],
        abilities: [],
        weapons: [],
        relationships: [],
        relatedCharacters: [],
        sources: [],
      } as Character;
    });

    return { data: items, isFusekiLive: true };
  } catch {
    return { data: fallbackCharacters, isFusekiLive: false };
  }
}
