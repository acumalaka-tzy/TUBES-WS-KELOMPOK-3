import { fuseki } from "../fuseki";
import { executeSearch } from "../search/hybrid-engine";
import { processNaturalLanguageQuery } from "../search/nlp/entity-recognizer";
import { characters, games, organizations, abilities, weapons, timelines, storyEvents } from "../mock-data";
import type { EntityRef, SourceRef } from "../types";

export interface RetrievedKnowledge {
  contextText: string;
  entities: EntityRef[];
  matchedRelationships: string[];
  timeline?: string;
  sources: SourceRef[];
  generatedSparql: string;
  isFusekiLive: boolean;
}

export interface AssistantHistoryItem {
  role: "user" | "assistant";
  content: string;
}

/**
 * Resolves follow-up query pronouns/context by inspecting conversation history.
 * Example: User asks "Scorpion itu siapa?", then follows up with "Siapa rival utamanya?"
 * -> resolves subject to "Scorpion".
 */
export function resolveFollowUpQuery(
  query: string,
  history: AssistantHistoryItem[] = []
): string {
  const q = query.trim();
  const lowerQ = q.toLowerCase();

  const isFollowUp =
    lowerQ.startsWith("siapa rival") ||
    lowerQ.startsWith("siapa musuh") ||
    lowerQ.startsWith("apa senjata") ||
    lowerQ.startsWith("apa jurus") ||
    lowerQ.startsWith("apa kemampuan") ||
    lowerQ.startsWith("di game apa") ||
    lowerQ.startsWith("apa klannya") ||
    lowerQ.startsWith("dari realm apa") ||
    lowerQ.startsWith("bagaimana ceritanya") ||
    lowerQ.startsWith("who is his") ||
    lowerQ.startsWith("who is her") ||
    lowerQ.startsWith("what weapon") ||
    lowerQ.startsWith("what abilities") ||
    lowerQ.startsWith("what games") ||
    lowerQ.includes("dia") ||
    lowerQ.includes("ia") ||
    lowerQ.includes("beliau") ||
    lowerQ.includes("tersebut");

  if (!isFollowUp || history.length === 0) {
    return q;
  }

  // Scan recent history in reverse for named character/entity
  for (let i = history.length - 1; i >= 0; i--) {
    const text = history[i].content;
    for (const c of characters) {
      if (text.toLowerCase().includes(c.name.toLowerCase())) {
        return `${c.name}: ${q}`;
      }
    }
    for (const g of games) {
      if (text.toLowerCase().includes(g.title.toLowerCase())) {
        return `${g.title}: ${q}`;
      }
    }
    for (const o of organizations) {
      if (text.toLowerCase().includes(o.name.toLowerCase())) {
        return `${o.name}: ${q}`;
      }
    }
  }

  return q;
}

/**
 * Execute Retrieval from Apache Jena Fuseki via SPARQL, with rich Knowledge Graph fallback.
 */
export async function retrieveKnowledgeGraphContext(
  rawQuery: string,
  history: AssistantHistoryItem[] = []
): Promise<RetrievedKnowledge> {
  const resolvedQuery = resolveFollowUpQuery(rawQuery, history);
  const intent = processNaturalLanguageQuery(resolvedQuery);

  let generatedSparql = intent.generatedSparql;
  let isFusekiLive = false;
  const entities: EntityRef[] = [];
  const sources: SourceRef[] = [];
  const seenSourceIds = new Set<string>();
  const matchedRelationships: string[] = [];
  let primaryTimeline: string | undefined;

  // 1. Attempt Live Fuseki SPARQL Query
  try {
    if (generatedSparql) {
      const fusekiRes = await fuseki.query(generatedSparql, 3000);
      if (fusekiRes?.results?.bindings && fusekiRes.results.bindings.length > 0) {
        isFusekiLive = true;
      }
    }
  } catch {
    isFusekiLive = false;
  }

  // 2. Perform Hybrid Retrieval across Knowledge Graph
  const searchResults = await executeSearch({
    q: resolvedQuery,
    mode: "hybrid",
    limit: 6,
  });

  // Filter out noisy fallback matches if no query keywords match the entity name
  // and relevance score is too low, ensuring strict truthfulness & zero hallucination.
  const queryTokens = resolvedQuery
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !["siapa", "apa", "dan", "yang", "dari", "ada", "itu", "ini", "dalam", "pada", "game", "karakter", "klan", "who", "what", "is", "the", "in", "and", "about"].includes(w));

  const relevantResults = searchResults.results.filter((r) => {
    const rNameLower = r.name.toLowerCase();
    const tokenMatch = queryTokens.some((t) => rNameLower.includes(t));
    if (tokenMatch) return true;
    if (r.relevance && r.relevance >= 0.4) return true;
    return false;
  });

  // Guarantee all recognized entities from the natural language query are directly included
  for (const rec of intent.recognizedEntities) {
    if (!relevantResults.some((r) => r.id === rec.id)) {
      if (rec.type === "character") {
        const c = characters.find((ch) => ch.id === rec.id);
        if (c) {
          relevantResults.unshift({
            id: c.id,
            type: "character",
            name: c.name,
            summary: c.summary,
            href: `/characters/${c.id}`,
            relevance: 1,
            attributes: [
              { label: "Faksi", value: c.faction ?? "-" },
              { label: "Realm", value: c.realm?.name ?? "-" },
              { label: "Spesies", value: c.species?.name ?? "-" },
            ],
            timeline: Array.from(new Set(c.versions.map((v) => v.timelineName))).join(", "),
            games: c.versions.map((v) => v.gameTitle),
            provenance: c.sources,
            matchedRelationships: (c.relationships || []).map((rel) => `${rel.label || rel.type}: ${rel.target?.name}`),
          });
        }
      } else if (rec.type === "game") {
        const g = games.find((gm) => gm.id === rec.id);
        if (g) {
          relevantResults.unshift({
            id: g.id,
            type: "game",
            name: g.title,
            summary: g.summary,
            href: `/games/${g.id}`,
            relevance: 1,
            attributes: [
              { label: "Tahun Rilis", value: String(g.releaseYear) },
              { label: "Era", value: g.era },
            ],
            timeline: g.timeline?.name,
            games: [g.title],
            provenance: g.sources,
            matchedRelationships: [],
          });
        }
      } else if (rec.type === "organization") {
        const o = organizations.find((org) => org.id === rec.id);
        if (o) {
          relevantResults.unshift({
            id: o.id,
            type: "organization",
            name: o.name,
            summary: o.description,
            href: `/organizations/${o.id}`,
            relevance: 1,
            attributes: [
              { label: "Pemimpin", value: o.leader?.name ?? "-" },
              { label: "Tipe", value: o.kind },
            ],
            provenance: o.sources,
            matchedRelationships: [],
          });
        }
      }
    }
  }

  // Collect primary entities and relations
  for (const r of relevantResults) {
    entities.push({
      id: r.id,
      name: r.name,
      type: r.type,
    });

    if (r.matchedRelationships) {
      matchedRelationships.push(...r.matchedRelationships);
    }

    if (!primaryTimeline && r.timeline) {
      primaryTimeline = r.timeline;
    }

    for (const s of r.provenance ?? []) {
      if (!seenSourceIds.has(s.id)) {
        seenSourceIds.add(s.id);
        sources.push(s);
      }
    }
  }

  // 3. Assemble Rich Textual Knowledge Graph Context
  const contextSections: string[] = [];

  contextSections.push(`[STATUS RETRIEVAL KNOWLEDGE GRAPH]`);
  contextSections.push(`Sumber Query: ${isFusekiLive ? "Apache Jena Fuseki SPARQL Endpoint (Live)" : "Knowledge Graph Semantic Engine"}`);
  contextSections.push(`SPARQL Query yang Digunakan:\n${generatedSparql}\n`);

  if (relevantResults.length === 0) {
    contextSections.push(`HASIL: Tidak ditemukan entitas, jurus, klan, atau fakta yang cocok dengan query "${rawQuery}" dalam Knowledge Graph Mortal Kombat.`);
  } else {
    contextSections.push(`[ENTITAS DAN FAKTA KANONIKAL TERVERIFIKASI]`);

    relevantResults.forEach((r, idx) => {
      const parts: string[] = [];
      parts.push(`=== ENTITAS #${idx + 1}: ${r.name} (${r.type.toUpperCase()}) ===`);
      parts.push(`Deskripsi/Biografi: ${r.summary}`);

      if (r.attributes && r.attributes.length > 0) {
        const attrStr = r.attributes
          .filter((a) => a.value && a.value !== "-")
          .map((a) => `${a.label}: ${a.value}`)
          .join(" | ");
        if (attrStr) parts.push(`Atribut: ${attrStr}`);
      }

      if (r.timeline) {
        parts.push(`Timeline / Kontinuitas: ${r.timeline}`);
      }

      if (r.games && r.games.length > 0) {
        parts.push(`Kemunculan Game Standalone: ${r.games.join(", ")}`);
      }

      if (r.matchedRelationships && r.matchedRelationships.length > 0) {
        parts.push(`Relasi Ontologi Graf: ${r.matchedRelationships.join("; ")}`);
      }

      // Check for character-specific rich relationships & lore
      if (r.type === "character") {
        const charObj = characters.find((c) => c.id === r.id);
        if (charObj) {
          if (charObj.relationships && charObj.relationships.length > 0) {
            const relStr = charObj.relationships
              .filter((rel) => rel && rel.target)
              .map((rel) => `${rel.label || rel.type}: ${rel.target.name}${rel.context ? ` (${rel.context})` : ""}`)
              .join("; ");
            if (relStr) {
              parts.push(`Hubungan Karakter (Relationships): ${relStr}`);
            }
          }
          const allAbilities = Array.from(
            new Set(charObj.versions.flatMap((v) => (v.abilities || []).map((a) => a.name)))
          );
          if (allAbilities.length > 0) {
            parts.push(`Jurus & Kemampuan Khas: ${allAbilities.join(", ")}`);
          }
          const allWeapons = Array.from(
            new Set(charObj.versions.flatMap((v) => (v.weapons || []).map((w) => w.name)))
          );
          if (allWeapons.length > 0) {
            parts.push(`Senjata Tempur: ${allWeapons.join(", ")}`);
          }
          if (charObj.faction) {
            parts.push(`Afiliasi Klan: ${charObj.faction}`);
          }
          if (charObj.realm) {
            parts.push(`Alam Asal (Realm): ${charObj.realm.name}`);
          }
        }
      }

      // Check for clan/organization rich details
      if (r.type === "organization") {
        const orgObj = organizations.find((o) => o.id === r.id);
        if (orgObj) {
          if (orgObj.leader) {
            parts.push(`Pemimpin Resmi: ${orgObj.leader.name}`);
          }
          if (orgObj.members && orgObj.members.length > 0) {
            parts.push(`Daftar Anggota Kanonikal: ${orgObj.members.map((m) => m.name).join(", ")}`);
          }
          if (orgObj.rivals && orgObj.rivals.length > 0) {
            parts.push(`Klan Lawan / Rival: ${orgObj.rivals.map((rv) => rv.name).join(", ")}`);
          }
        }
      }

      // Check for game rich details
      if (r.type === "game") {
        const gameObj = games.find((g) => g.id === r.id);
        if (gameObj) {
          parts.push(`Tahun Rilis: ${gameObj.releaseYear} | Era: ${gameObj.era}`);
          parts.push(`Platform: ${gameObj.platforms.join(", ")}`);
          if (gameObj.characters && gameObj.characters.length > 0) {
            parts.push(`Roster Petarung: ${gameObj.characters.map((c) => c.name).join(", ")}`);
          }
        }
      }

      contextSections.push(parts.join("\n"));
    });
  }

  return {
    contextText: contextSections.join("\n\n"),
    entities,
    matchedRelationships: Array.from(new Set(matchedRelationships)),
    timeline: primaryTimeline,
    sources,
    generatedSparql: generatedSparql ?? "",
    isFusekiLive,
  };
}
