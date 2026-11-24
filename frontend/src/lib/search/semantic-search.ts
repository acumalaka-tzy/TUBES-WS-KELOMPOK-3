import {
  abilities,
  characters,
  games,
  organizations,
  realms,
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

  // If query is marked out-of-domain / no match, return immediately empty
  if (intent.intentType === "no_match") {
    return [];
  }

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
                `Ditemukan melalui penelusuran relasi Knowledge Graph (${intent.intentType})`,
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
    const targetTimeline = intent.extractedAttributes.timeline?.toLowerCase();
    const targetYear = intent.extractedAttributes.year;

    // 1. Semantic evaluation of Characters
    if (
      (options.type === "all" || options.type === "character" || intent.targetType === "character") &&
      intent.targetType !== "event" &&
      intent.targetType !== "location"
    ) {
      for (const c of characters) {
        let semScore = 0;
        const matchedRels: string[] = [];
        const path: string[] = [];
        const notes: string[] = [];

        // Exact Character Lookup
        if (intent.intentType === "general_entity_lookup" && recognized.some((e) => e.id === c.id)) {
          semScore = Math.max(semScore, 1.0);
          matchedRels.push(`instanceOf → mk:Character`);
          path.push(c.name, "a", "mk:Character");
          notes.push(`Entitas cocok sebagai karakter utama "${c.name}"`);
        }

        // Related Characters Lookup (saat ketik karakter, karakter yang berhubungan muncul di urutan bawah)
        if (intent.intentType === "general_entity_lookup") {
          const mainChar = recognized.find((e) => e.type === "character");
          if (mainChar && mainChar.id !== c.id) {
            const mainFullChar = characters.find((ch) => ch.id === mainChar.id);
            const relFromC = c.relationships.find((r) => r.target.id === mainChar.id);
            const relToC = mainFullChar?.relationships.find((r) => r.target.id === c.id);
            const activeRel = relFromC || relToC;

            if (activeRel) {
              const relLabel = activeRel.label || activeRel.type;
              semScore = Math.max(semScore, 0.65);
              matchedRels.push(`${activeRel.type} → ${mainChar.name} (${relLabel})`);
              path.push(c.name, `mk:${activeRel.type}`, mainChar.name);
              notes.push(`Karakter berhubungan (${relLabel}) dengan "${mainChar.name}" (${activeRel.context || "Knowledge Graph"})`);
            }
          }
        }

        // Check Ability -> Element relationship
        if (targetElement) {
          for (const v of c.versions) {
            for (const aRef of v.abilities) {
              const ab = abilities.find((x) => x.id === aRef.id);
              if (ab?.element) {
                const elLower = ab.element.toLowerCase();
                if (elLower.includes(targetElement)) {
                  semScore = Math.max(semScore, 0.95);
                  matchedRels.push(`hasAbility → hasElement (${ab.element})`);
                  path.push(c.name, "mk:hasAbility", ab.name, "mk:hasElement", ab.element);
                  notes.push(`Karakter memiliki kemampuan "${ab.name}" berelemen ${ab.element}`);
                }
              }
            }
          }
        }

        // Check Clan / Organization membership
        if (targetClan) {
          for (const v of c.versions) {
            for (const orgRef of v.organizations) {
              const org = organizations.find((x) => x.id === orgRef.id);
              if (org) {
                const orgNameLower = org.name.toLowerCase();
                if (orgNameLower.includes(targetClan)) {
                  semScore = Math.max(semScore, 0.95);
                  matchedRels.push(`memberOf → ${org.name}`);
                  path.push(c.name, "mk:memberOf", org.name);
                  notes.push(`Karakter adalah anggota dari klan/organisasi "${org.name}"`);
                }
              }
            }
          }
        }

        // Check Enemies / Rivals
        if (intent.intentType === "character_enemies_rivals") {
          const queriedChar = recognized.find((e) => e.type === "character");
          if (queriedChar && queriedChar.id === c.id) {
            semScore = 0;
          } else if (queriedChar) {
            const queriedFullChar = characters.find((ch) => ch.id === queriedChar.id);
            const isEnemy =
              c.relationships.some(
                (r) =>
                  (r.type === "enemyOf" || r.type === "rivalOf") &&
                  r.target.id === queriedChar.id
              ) ||
              (queriedFullChar?.relationships.some(
                (r) =>
                  (r.type === "enemyOf" || r.type === "rivalOf") &&
                  r.target.id === c.id
              ) ?? false);
            if (isEnemy) {
              semScore = 1.0;
              matchedRels.push(`enemyOf → ${queriedChar.name}`);
              path.push(c.name, "mk:enemyOf", queriedChar.name);
              notes.push(`Karakter merupakan musuh/rival bebuyutan dari "${queriedChar.name}"`);
            }
          }
        }

        // Check Allies
        if (intent.intentType === "character_allies") {
          const queriedChar = recognized.find((e) => e.type === "character");
          if (queriedChar && queriedChar.id === c.id) {
            semScore = 0;
          } else if (queriedChar) {
            const queriedFullChar = characters.find((ch) => ch.id === queriedChar.id);
            const isAlly =
              c.relationships.some(
                (r) =>
                  (r.type === "allyOf" || r.type === "alliedWith" || r.type === "mentorOf" || r.type === "familyOf") &&
                  r.target.id === queriedChar.id
              ) ||
              (queriedFullChar?.relationships.some(
                (r) =>
                  (r.type === "allyOf" || r.type === "alliedWith" || r.type === "mentorOf" || r.type === "familyOf") &&
                  r.target.id === c.id
              ) ?? false);
            if (isAlly) {
              semScore = 1.0;
              matchedRels.push(`alliedWith → ${queriedChar.name}`);
              path.push(c.name, "mk:alliedWith", queriedChar.name);
              notes.push(`Karakter bersekutu/berelasi baik dengan "${queriedChar.name}"`);
            }
          }
        }

        // Check Mentor / Pupil
        if (intent.intentType === "character_mentor") {
          const queriedChar = recognized.find((e) => e.type === "character");
          if (queriedChar && queriedChar.id === c.id) {
            semScore = 0;
          } else if (queriedChar) {
            const queriedFullChar = characters.find((ch) => ch.id === queriedChar.id);
            const hasMentorRel =
              c.relationships.some(
                (r) => r.type === "mentorOf" && r.target.id === queriedChar.id
              ) ||
              (queriedFullChar?.relationships.some(
                (r) => r.type === "mentorOf" && r.target.id === c.id
              ) ?? false);
            if (hasMentorRel) {
              semScore = 1.0;
              matchedRels.push(`mentorOf → ${queriedChar.name}`);
              path.push(c.name, "mk:mentorOf", queriedChar.name);
              notes.push(`Karakter memiliki relasi pembimbing/murid dengan "${queriedChar.name}"`);
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
        if (targetGame && intent.intentType === "character_by_game") {
          const appears = c.versions.some((v) => v.gameTitle.toLowerCase().includes(targetGame));
          if (appears) {
            semScore = Math.max(semScore, 1.0);
            matchedRels.push(`appearsIn → ${intent.extractedAttributes.game}`);
            path.push(c.name, "mk:appearsIn", intent.extractedAttributes.game || "Game");
            notes.push(`Karakter muncul dalam game "${intent.extractedAttributes.game}"`);
          }
        }

        // Check Timeline
        if (targetTimeline) {
          const normTargetTl = targetTimeline.toLowerCase().replace("timeline", "").trim();
          const inTl = c.versions.some((v) => {
            const vTl = v.timelineName.toLowerCase();
            return vTl.includes(normTargetTl) || normTargetTl.includes(vTl.replace("timeline", "").trim());
          });
          if (inTl) {
            semScore = Math.max(semScore, 0.95);
            matchedRels.push(`inTimeline → ${intent.extractedAttributes.timeline}`);
            path.push(c.name, "mk:inTimeline", intent.extractedAttributes.timeline || "Timeline");
            notes.push(`Karakter hadir dalam timeline "${intent.extractedAttributes.timeline}"`);
          }
        }

        // Check Weapon usage
        if (targetWeapon) {
          const uses = c.versions.some((v) =>
            v.weapons.some((w) => {
              const wn = w.name.toLowerCase();
              return wn.includes(targetWeapon) || targetWeapon.includes(wn) || (targetWeapon.includes("spear") && wn.includes("spear"));
            })
          );
          if (uses) {
            semScore = Math.max(semScore, 0.98);
            matchedRels.push(`usesWeapon → ${intent.extractedAttributes.weapon}`);
            path.push(c.name, "mk:usesWeapon", intent.extractedAttributes.weapon || "Weapon");
            notes.push(`Karakter menggunakan senjata "${intent.extractedAttributes.weapon}"`);
          }
        }

        // Two character mutual relationship query
        if (intent.intentType === "entity_relationship" && recognized.length >= 2) {
          const otherChar = recognized.find((e) => e.type === "character" && e.id !== c.id);
          if (otherChar) {
            const rel = c.relationships.find((r) => r.target.id === otherChar.id);
            if (rel) {
              semScore = Math.max(semScore, 0.95);
              matchedRels.push(`${rel.type} → ${otherChar.name}`);
              path.push(c.name, `mk:${rel.type}`, otherChar.name);
              notes.push(`Memiliki relasi kanonik ${rel.label || rel.type} terhadap "${otherChar.name}"`);
            }
          }
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

    // 2. Semantic evaluation of Games
    if (options.type === "all" || options.type === "game" || intent.targetType === "game") {
      for (const g of games) {
        let semScore = 0;
        const notes: string[] = [];

        // Exact Game Lookup
        if (recognized.some((e) => e.id === g.id)) {
          semScore = intent.intentType === "character_by_game" ? 0.85 : 1.0;
          notes.push(`Game "${g.title}" cocok sebagai entitas.`);
        } else if (targetYear && String(g.releaseYear) === targetYear) {
          semScore = 0.98;
          notes.push(`Dirilis pada tahun ${g.releaseYear} sesuai dengan kueri.`);
        } else if (intent.intentType === "all_games_by_year") {
          semScore = 1.0 - (g.releaseYear - 1992) * 0.005;
          notes.push(`Urutan rilis tahun ${g.releaseYear} (${g.era}).`);
        }

        if (semScore > 0) {
          candidates.push({
            id: g.id,
            type: "game",
            name: g.title,
            summary: g.summary,
            href: `/games/${g.id}`,
            image: g.image,
            attributes: [
              { label: "Tahun", value: String(g.releaseYear) },
              { label: "Era", value: g.era },
            ],
            timeline: g.timeline?.name,
            provenance: g.sources,
            semanticScore: semScore,
            matchedRelationships: [`releaseYear → ${g.releaseYear}`],
            graphPath: [g.title, "mk:releaseYear", String(g.releaseYear)],
            explanationNotes: notes,
          });
        }
      }
    }

    // 3. Semantic evaluation of Organizations / Clans
    if (options.type === "all" || options.type === "organization" || intent.targetType === "organization") {
      for (const org of organizations) {
        let semScore = 0;
        const notes: string[] = [];

        if (recognized.some((e) => e.id === org.id)) {
          semScore = 1.0;
          notes.push(`Klan/Organisasi "${org.name}" cocok langsung dengan query.`);
        } else if (targetClan && org.name.toLowerCase().includes(targetClan)) {
          semScore = 0.95;
          notes.push(`Entitas klan "${org.name}" sesuai dengan klan yang dicari.`);
        }

        if (semScore > 0) {
          candidates.push({
            id: org.id,
            type: "organization",
            name: org.name,
            summary: org.description,
            href: `/organizations/${org.id}`,
            attributes: [{ label: "Jenis", value: org.kind }],
            provenance: org.sources,
            semanticScore: semScore,
            matchedRelationships: ["instanceOf → mk:Organization"],
            graphPath: [org.name, "a", "mk:Organization"],
            explanationNotes: notes,
          });
        }
      }
    }

    // 4. Semantic evaluation of Realms / Locations
    if (options.type === "all" || options.type === "location" || intent.targetType === "location") {
      for (const r of realms) {
        let semScore = 0;
        const notes: string[] = [];

        if (recognized.some((e) => e.id === r.id)) {
          semScore = 1.0;
          notes.push(`Realm "${r.name}" cocok langsung dengan query.`);
        } else if (targetRealm && r.name.toLowerCase().includes(targetRealm)) {
          semScore = 0.98;
          notes.push(`Realm "${r.name}" sesuai dengan pencarian alam.`);
        }

        if (semScore > 0) {
          candidates.push({
            id: r.id,
            type: "location",
            name: r.name,
            summary: r.description,
            href: `/search?q=${encodeURIComponent(r.name)}`,
            attributes: [{ label: "Tipe", value: "Realm" }],
            provenance: r.sources,
            semanticScore: semScore,
            matchedRelationships: ["instanceOf → mk:Realm"],
            graphPath: [r.name, "a", "mk:Realm"],
            explanationNotes: notes,
          });
        }
      }
    }

    // 5. Semantic evaluation of Story Events
    if (options.type === "all" || options.type === "event" || intent.targetType === "event") {
      const charInvolved = recognized.filter((e) => e.type === "character");
      for (const ev of storyEvents) {
        let semScore = 0;
        const matchedRels: string[] = [];
        const notes: string[] = [];

        // Check if event involves queried characters
        for (const ci of charInvolved) {
          if (ev.participants.some((p) => p.id === ci.id || p.name.toLowerCase() === ci.name.toLowerCase())) {
            // Keep events below the main character and direct related characters
            semScore = Math.max(
              semScore,
              intent.targetType === "character" || intent.intentType === "general_entity_lookup" ? 0.45 : 0.85
            );
            matchedRels.push(`involvesCharacter → ${ci.name}`);
            notes.push(`Peristiwa ini melibatkan tokoh "${ci.name}"`);
          }
        }

        // Timeline match
        const evTl = ev.timeline.name.toLowerCase();
        const normTl = (targetTimeline ?? "").toLowerCase().replace("timeline", "").trim();
        if (
          normTl &&
          (evTl.includes(normTl) ||
            normTl.includes(evTl) ||
            (normTl.includes("new era") && evTl.includes("new era")) ||
            (normTl.includes("reboot") && evTl.includes("reboot")) ||
            (normTl.includes("original") && evTl.includes("original")))
        ) {
          semScore = Math.max(semScore, intent.targetType === "event" ? 1.0 : 0.45);
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

    // 6. Semantic evaluation of Abilities
    if (options.type === "all" || options.type === "ability" || intent.targetType === "ability") {
      const isRelSearch =
        intent.intentType === "character_enemies_rivals" || intent.intentType === "character_allies";
      const mainChar = recognized.find((e) => e.type === "character");
      const mainFull = mainChar ? characters.find((ch) => ch.id === mainChar.id) : undefined;

      for (const ab of abilities) {
        let semScore = 0;
        const notes: string[] = [];
        const matchedRels: string[] = [];

        if (recognized.some((e) => e.id === ab.id)) {
          semScore = 1.0;
          notes.push(`Kemampuan "${ab.name}" cocok langsung.`);
        } else if (targetElement && ab.element && ab.element.toLowerCase().includes(targetElement)) {
          semScore = 0.90;
          notes.push(`Kemampuan "${ab.name}" memiliki elemen ${ab.element}`);
        } else if (
          mainChar &&
          mainFull &&
          !isRelSearch &&
          mainFull.versions.some((v) => v.abilities.some((aRef) => aRef.id === ab.id))
        ) {
          // Abilities & Special Moves owned by the queried character rank directly below the character
          semScore = 0.88;
          matchedRels.push(`hasAbility ← ${mainChar.name} (Jurus Spesial)`);
          notes.push(`Kemampuan/Jurus Spesial milik "${mainChar.name}"`);
        }

        if (semScore > 0) {
          candidates.push({
            id: ab.id,
            type: "ability",
            name: ab.name,
            summary: ab.description,
            href: `/abilities/${ab.id}`,
            attributes: [
              { label: "Kategori", value: ab.category },
              { label: "Elemen", value: ab.element ?? "-" },
            ],
            games: ab.games.map((g) => g.name),
            provenance: ab.sources,
            semanticScore: semScore,
            matchedRelationships:
              matchedRels.length > 0 ? matchedRels : [`hasElement → ${ab.element ?? "None"}`],
            graphPath:
              mainChar && matchedRels.length > 0
                ? [mainChar.name, "mk:hasAbility", ab.name]
                : [ab.name, "mk:hasElement", ab.element || "None"],
            explanationNotes: notes,
          });
        }
      }
    }

    // 7. Semantic evaluation of Weapons
    if (options.type === "all" || options.type === "weapon" || intent.targetType === "weapon") {
      const isRelSearch =
        intent.intentType === "character_enemies_rivals" || intent.intentType === "character_allies";
      const mainChar = recognized.find((e) => e.type === "character");
      const mainFull = mainChar ? characters.find((ch) => ch.id === mainChar.id) : undefined;

      for (const w of weapons) {
        let semScore = 0;
        const notes: string[] = [];
        const matchedRels: string[] = [];

        if (recognized.some((e) => e.id === w.id)) {
          semScore = 1.0;
          notes.push(`Senjata "${w.name}" cocok langsung.`);
        } else if (
          mainChar &&
          mainFull &&
          !isRelSearch &&
          mainFull.versions.some((v) => v.weapons.some((wRef) => wRef.id === w.id))
        ) {
          // Weapons owned by the queried character rank directly below the character
          semScore = 0.86;
          matchedRels.push(`usesWeapon ← ${mainChar.name} (Senjata Khas)`);
          notes.push(`Senjata andalan milik "${mainChar.name}"`);
        }

        if (semScore > 0) {
          candidates.push({
            id: w.id,
            type: "weapon",
            name: w.name,
            summary: w.description,
            href: `/weapons/${w.id}`,
            attributes: [{ label: "Kategori", value: w.category }],
            games: w.games.map((g) => g.name),
            provenance: w.sources,
            semanticScore: semScore,
            matchedRelationships:
              matchedRels.length > 0 ? matchedRels : ["instanceOf → mk:Weapon"],
            graphPath:
              mainChar && matchedRels.length > 0
                ? [mainChar.name, "mk:usesWeapon", w.name]
                : [w.name, "a", "mk:Weapon"],
            explanationNotes: notes,
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
