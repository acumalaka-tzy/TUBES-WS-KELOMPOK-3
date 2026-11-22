import {
  abilities,
  characters,
  games,
  organizations,
  storyEvents,
  timelines,
  weapons,
} from "../mock-data";
import { entityHref } from "../routes";
import { fuseki } from "../fuseki";
import type { EntityType } from "../types";
import { processNaturalLanguageQuery } from "./nlp/entity-recognizer";
import type { ParsedQueryIntent, SearchCandidate } from "./types";

export interface SemanticSearchOptions {
  type?: EntityType | "all";
  game?: string;
  timeline?: string;
  element?: string;
  faction?: string;
  limit?: number;
  parsedIntent?: ParsedQueryIntent;
}

/**
 * Execute Semantic Search via SPARQL against Fuseki, falling back to Knowledge Graph traversal
 */
export async function executeSemanticSearch(
  query: string,
  options: SemanticSearchOptions = {}
): Promise<SearchCandidate[]> {
  const intent = options.parsedIntent || processNaturalLanguageQuery(query);
  const candidates: SearchCandidate[] = [];

  // Try live SPARQL on Fuseki if SPARQL query was generated and Fuseki is available
  let fusekiSuccess = false;
  if (intent.generatedSparql && process.env.NEXT_PUBLIC_USE_MOCK !== "true") {
    try {
      const fusekiRes = await fuseki.query(intent.generatedSparql);
      if (fusekiRes?.results?.bindings?.length > 0) {
        fusekiSuccess = true;
        const bindings = fusekiRes.results.bindings;
        const matchedCharNames = new Set(
          bindings.map((b) => b.charName?.value || b.subjectName?.value || b.title?.value).filter(Boolean)
        );

        for (const c of characters) {
          if (matchedCharNames.has(c.name)) {
            const latest = c.versions[c.versions.length - 1];
            candidates.push({
              id: c.id,
              type: "character",
              name: c.name,
              summary: c.summary,
              href: entityHref({ id: c.id, type: "character", name: c.name }),
              image: latest?.image,
              attributes: [
                { label: "Faksi", value: c.faction ?? "-" },
                { label: "Realm", value: c.realm?.name ?? "-" },
                { label: "Spesies", value: c.species?.name ?? "-" },
              ],
              timeline: Array.from(new Set(c.versions.map((v) => v.timelineName))).join(", "),
              games: c.versions.map((v) => v.gameTitle),
              provenance: c.sources,
              semanticScore: 0.95,
              matchedRelationships: [
                intent.extractedAttributes.element
                  ? `hasAbility → hasElement (${intent.extractedAttributes.element})`
                  : intent.extractedAttributes.clan
                  ? `memberOf → ${intent.extractedAttributes.clan}`
                  : intent.extractedAttributes.relationshipType
                  ? intent.extractedAttributes.relationshipType
                  : "sparql_live_query_match",
              ],
              graphPath: [
                c.name,
                "mk:CharacterVersion",
                intent.extractedAttributes.element
                  ? `mk:hasElement: ${intent.extractedAttributes.element}`
                  : intent.extractedAttributes.clan
                  ? `mk:memberOf: ${intent.extractedAttributes.clan}`
                  : "mk:KnowledgeGraph",
              ],
              explanationNotes: [
                `Ditemukan melalui query SPARQL Apache Jena Fuseki (${intent.intentType})`,
              ],
            });
          }
        }
      }
    } catch {
      // Graceful fallback to local Knowledge Graph traversal
      fusekiSuccess = false;
    }
  }

  // If Fuseki didn't return results or offline/mock mode, execute full semantic Knowledge Graph traversal
  if (!fusekiSuccess || candidates.length === 0) {
    const recognized = intent.recognizedEntities;
    const targetElement = intent.extractedAttributes.element?.toLowerCase();
    const targetClan = intent.extractedAttributes.clan?.toLowerCase();
    const targetRealm = intent.extractedAttributes.realm?.toLowerCase();
    const targetGame = intent.extractedAttributes.game?.toLowerCase();
    const targetWeapon = intent.extractedAttributes.weapon?.toLowerCase();

    // 1. Semantic evaluation of Characters
    if (options.type === "all" || options.type === "character" || intent.targetType === "character") {
      for (const c of characters) {
        let semScore = 0;
        const matchedRels: string[] = [];
        const path: string[] = [];
        const notes: string[] = [];

        // Check Ability -> Element relationship
        for (const v of c.versions) {
          for (const aRef of v.abilities) {
            const ab = abilities.find((x) => x.id === aRef.id);
            if (ab?.element) {
              const elLower = ab.element.toLowerCase();
              if (targetElement && elLower.includes(targetElement)) {
                semScore = Math.max(semScore, 0.95);
                matchedRels.push(`hasAbility → hasElement (${ab.element})`);
                path.push(c.name, "mk:hasAbility", ab.name, "mk:hasElement", ab.element);
                notes.push(`Karakter memiliki kemampuan "${ab.name}" berelemen ${ab.element}`);
              }
            }
          }
        }

        // Check Clan / Organization membership
        for (const v of c.versions) {
          for (const orgRef of v.organizations) {
            const org = organizations.find((x) => x.id === orgRef.id);
            if (org) {
              const orgNameLower = org.name.toLowerCase();
              if (targetClan && orgNameLower.includes(targetClan)) {
                semScore = Math.max(semScore, 0.95);
                matchedRels.push(`memberOf → ${org.name}`);
                path.push(c.name, "mk:memberOf", org.name);
                notes.push(`Karakter adalah anggota dari organisasi/klan "${org.name}"`);
              }
            }
          }
        }

        // Check Enemies / Rivals
        if (intent.intentType === "character_enemies_rivals") {
          const queriedChar = recognized.find((e) => e.type === "character");
          if (queriedChar) {
            // Find if this character is enemy of queriedChar
            const isEnemy = c.relationships.some(
              (r) =>
                (r.type === "enemyOf" || r.type === "rivalOf") &&
                r.target.id === queriedChar.id
            );
            if (isEnemy) {
              semScore = Math.max(semScore, 0.95);
              matchedRels.push(`enemyOf → ${queriedChar.name}`);
              path.push(c.name, "mk:enemyOf", queriedChar.name);
              notes.push(`Karakter merupakan musuh/rival bebuyutan dari "${queriedChar.name}"`);
            }
          }
        }

        // Check Allies
        if (intent.intentType === "character_allies") {
          const queriedChar = recognized.find((e) => e.type === "character");
          if (queriedChar) {
            const isAlly = c.relationships.some(
              (r) =>
                (r.type === "allyOf" || r.type === "alliedWith" || r.type === "mentorOf" || r.type === "familyOf") &&
                r.target.id === queriedChar.id
            );
            if (isAlly) {
              semScore = Math.max(semScore, 0.92);
              matchedRels.push(`alliedWith → ${queriedChar.name}`);
              path.push(c.name, "mk:alliedWith", queriedChar.name);
              notes.push(`Karakter bersekutu/berelasi baik dengan "${queriedChar.name}"`);
            }
          }
        }

        // Check Realm / Origin
        if (targetRealm && c.realm) {
          if (c.realm.name.toLowerCase().includes(targetRealm)) {
            semScore = Math.max(semScore, 0.90);
            matchedRels.push(`originatesFrom → ${c.realm.name}`);
            path.push(c.name, "mk:originatesFrom", c.realm.name);
            notes.push(`Karakter berasal dari realm "${c.realm.name}"`);
          }
        }

        // Check Game Appearance
        if (targetGame) {
          const appears = c.versions.some((v) => v.gameTitle.toLowerCase().includes(targetGame));
          if (appears) {
            semScore = Math.max(semScore, 0.88);
            matchedRels.push(`appearsIn → ${intent.extractedAttributes.game}`);
            path.push(c.name, "mk:appearsIn", intent.extractedAttributes.game || "Game");
            notes.push(`Karakter muncul dalam game "${intent.extractedAttributes.game}"`);
          }
        }

        // Check Weapon usage
        if (targetWeapon) {
          const uses = c.versions.some((v) =>
            v.weapons.some((w) => w.name.toLowerCase().includes(targetWeapon))
          );
          if (uses) {
            semScore = Math.max(semScore, 0.88);
            matchedRels.push(`usesWeapon → ${intent.extractedAttributes.weapon}`);
            path.push(c.name, "mk:usesWeapon", intent.extractedAttributes.weapon || "Weapon");
            notes.push(`Karakter menggunakan senjata "${intent.extractedAttributes.weapon}"`);
          }
        }

        // Exact entity lookup
        if (intent.intentType === "general_entity_lookup" && recognized.some((e) => e.id === c.id)) {
          semScore = Math.max(semScore, 1.0);
          matchedRels.push(`instanceOf → mk:Character`);
          path.push(c.name, "a", "mk:Character");
          notes.push(`Entitas cocok sebagai karakter utama "${c.name}"`);
        }

        if (semScore > 0) {
          const latest = c.versions[c.versions.length - 1];
          candidates.push({
            id: c.id,
            type: "character",
            name: c.name,
            summary: c.summary,
            href: entityHref({ id: c.id, type: "character", name: c.name }),
            image: latest?.image,
            attributes: [
              { label: "Faksi", value: c.faction ?? "-" },
              { label: "Realm", value: c.realm?.name ?? "-" },
              { label: "Spesies", value: c.species?.name ?? "-" },
            ],
            timeline: Array.from(new Set(c.versions.map((v) => v.timelineName))).join(", "),
            games: c.versions.map((v) => v.gameTitle),
            provenance: c.sources,
            semanticScore: Math.round(semScore * 100) / 100,
            matchedRelationships: Array.from(new Set(matchedRels)),
            graphPath: path.length > 0 ? path : [c.name, "mk:KnowledgeGraph"],
            explanationNotes: notes,
          });
        }
      }
    }

    // 2. Semantic evaluation of Story Events
    if (options.type === "all" || options.type === "event" || intent.targetType === "event") {
      const charInvolved = recognized.filter((e) => e.type === "character");
      for (const ev of storyEvents) {
        let semScore = 0;
        const matchedRels: string[] = [];
        const notes: string[] = [];

        // Check if event involves queried characters
        for (const ci of charInvolved) {
          if (ev.participants.some((p) => p.id === ci.id || p.name.toLowerCase() === ci.name.toLowerCase())) {
            semScore = Math.max(semScore, 0.92);
            matchedRels.push(`involvesCharacter → ${ci.name}`);
            notes.push(`Peristiwa ini melibatkan tokoh "${ci.name}"`);
          }
        }

        // Timeline match
        if (intent.extractedAttributes.timeline && ev.timeline.name.toLowerCase().includes(intent.extractedAttributes.timeline.toLowerCase())) {
          semScore = Math.max(semScore, 0.90);
          matchedRels.push(`occursIn → ${ev.timeline.name}`);
          notes.push(`Terjadi pada ${ev.timeline.name}`);
        }

        if (semScore > 0) {
          candidates.push({
            id: ev.id,
            type: "event",
            name: ev.title,
            summary: ev.summary,
            href: `/story/events/${ev.id}`,
            attributes: [
              { label: "Tipe", value: ev.eventType },
              { label: "Timeline", value: ev.timeline.name },
            ],
            timeline: ev.timeline.name,
            provenance: ev.sources,
            semanticScore: Math.round(semScore * 100) / 100,
            matchedRelationships: Array.from(new Set(matchedRels)),
            graphPath: [ev.title, "mk:occursIn", ev.timeline.name],
            explanationNotes: notes,
          });
        }
      }
    }

    // 3. Semantic evaluation of Organizations / Clans
    if (options.type === "all" || options.type === "organization") {
      for (const org of organizations) {
        if (recognized.some((e) => e.id === org.id)) {
          candidates.push({
            id: org.id,
            type: "organization",
            name: org.name,
            summary: org.description,
            href: `/organizations/${org.id}`,
            attributes: [{ label: "Jenis", value: org.kind }],
            provenance: org.sources,
            semanticScore: 0.95,
            matchedRelationships: ["instanceOf → mk:Organization"],
            graphPath: [org.name, "a", "mk:Organization"],
            explanationNotes: [`Entitas klan/organisasi "${org.name}" cocok langsung dengan query`],
          });
        }
      }
    }

    // 4. Semantic evaluation of Abilities
    if (options.type === "all" || options.type === "ability") {
      for (const ab of abilities) {
        if (targetElement && ab.element && ab.element.toLowerCase().includes(targetElement)) {
          candidates.push({
            id: ab.id,
            type: "ability",
            name: ab.name,
            summary: ab.description,
            href: `/abilities/${ab.id}`,
            attributes: [
              { label: "Kategori", value: ab.category },
              { label: "Elemen", value: ab.element },
            ],
            games: ab.games.map((g) => g.name),
            provenance: ab.sources,
            semanticScore: 0.95,
            matchedRelationships: [`hasElement → ${ab.element}`],
            graphPath: [ab.name, "mk:hasElement", ab.element],
            explanationNotes: [`Kemampuan "${ab.name}" memiliki elemen ${ab.element}`],
          });
        }
      }
    }
  }

  // Sort by semanticScore descending
  candidates.sort((a, b) => (b.semanticScore ?? 0) - (a.semanticScore ?? 0));

  // Assign 1-based ranks
  candidates.forEach((c, idx) => {
    c.semanticRank = idx + 1;
  });

  return candidates;
}
