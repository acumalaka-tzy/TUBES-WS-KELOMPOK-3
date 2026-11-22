import { characters, games, organizations, abilities, weapons, timelines } from "../../mock-data";
import { sparqlRegexEscape } from "../../fuseki";
import type { EntityType } from "../../types";
import type { ParsedQueryIntent, QueryIntentType, RecognizedEntity } from "../types";

export interface EntityDictionaryEntry {
  id: string;
  name: string;
  type: EntityType | "element" | "realm" | "species";
  uri: string;
  synonyms: string[];
}

// Build comprehensive entity dictionary from system knowledge base
function buildDictionary(): EntityDictionaryEntry[] {
  const dict: EntityDictionaryEntry[] = [];

  // 1. Characters
  for (const c of characters) {
    dict.push({
      id: c.id,
      name: c.name,
      type: "character",
      uri: `https://example.org/mk/${c.id}`,
      synonyms: [c.name.toLowerCase(), ...c.aliases.map((a) => a.toLowerCase())],
    });
  }

  // 2. Organizations
  for (const o of organizations) {
    const syns = [o.name.toLowerCase()];
    if (o.name.toLowerCase().includes("lin kuei")) syns.push("lin kuei", "linkuei");
    if (o.name.toLowerCase().includes("shirai ryu")) syns.push("shirai ryu", "shirairyu");
    if (o.name.toLowerCase().includes("special forces")) syns.push("special forces", "sf");
    if (o.name.toLowerCase().includes("white lotus")) syns.push("white lotus", "shaolin");
    if (o.name.toLowerCase().includes("black dragon")) syns.push("black dragon");
    if (o.name.toLowerCase().includes("brotherhood of shadow")) syns.push("brotherhood of shadow", "brotherhood");

    dict.push({
      id: o.id,
      name: o.name,
      type: "organization",
      uri: `https://example.org/mk/${o.id}`,
      synonyms: syns,
    });
  }

  // 3. Games
  for (const g of games) {
    const syns = [g.title.toLowerCase(), g.shortTitle.toLowerCase()];
    if (g.id === "mk1-1992") syns.push("mk1 1992", "mk 1 classic", "mortal kombat 1 1992");
    if (g.id === "mk1-2023") syns.push("mk1 2023", "mk1 new era", "mortal kombat 1 2023", "mk12");
    if (g.id === "mk9-2011") syns.push("mk9", "mortal kombat 9", "mk 2011");
    if (g.id === "mkx-2015") syns.push("mkx", "mortal kombat 10", "mk 10");
    if (g.id === "mk11-2019") syns.push("mk11", "mortal kombat 11");

    dict.push({
      id: g.id,
      name: g.title,
      type: "game",
      uri: `https://example.org/mk/${g.id}`,
      synonyms: syns,
    });
  }

  // 4. Timelines
  for (const t of timelines) {
    const syns = [t.name.toLowerCase()];
    if (t.id === "timeline-original") syns.push("original timeline", "timeline original", "classic timeline", "era klasik");
    if (t.id === "timeline-reboot") syns.push("reboot timeline", "timeline reboot", "mk9 timeline", "reboot");
    if (t.id === "timeline-new-era") syns.push("new era timeline", "timeline new era", "era baru", "new era");

    dict.push({
      id: t.id,
      name: t.name,
      type: "timeline",
      uri: `https://example.org/mk/${t.id}`,
      synonyms: syns,
    });
  }

  // 5. Elements
  const elements = [
    { id: "element-fire", name: "Fire", synonyms: ["api", "fire", "flame", "hellfire", "panas", "lava"] },
    { id: "element-ice", name: "Ice", synonyms: ["es", "ice", "beku", "cryo", "cryomancer", "dingin", "frost"] },
    { id: "element-lightning", name: "Lightning", synonyms: ["petir", "lightning", "listrik", "thunder", "kilat"] },
    { id: "element-teleport", name: "Teleportation", synonyms: ["teleport", "teleportasi", "teleportation", "berpindah tempat"] },
    { id: "element-shadow", name: "Shadow", synonyms: ["shadow", "bayangan", "kegelapan", "darkness"] },
    { id: "element-soul", name: "Soul", synonyms: ["soul", "jiwa", "roh", "souls"] },
    { id: "element-blood", name: "Blood", synonyms: ["blood", "darah", "magik darah"] },
    { id: "element-wind", name: "Wind", synonyms: ["wind", "angin", "tornado"] },
    { id: "element-earth", name: "Earth", synonyms: ["earth", "tanah", "batu", "gempa"] },
  ];
  for (const el of elements) {
    dict.push({
      id: el.id,
      name: el.name,
      type: "element",
      uri: `https://example.org/mk/${el.id}`,
      synonyms: el.synonyms,
    });
  }

  // 6. Realms
  const realms = [
    { id: "realm-earthrealm", name: "Earthrealm", synonyms: ["earthrealm", "bumi", "earth"] },
    { id: "realm-outworld", name: "Outworld", synonyms: ["outworld", "luar dunia"] },
    { id: "realm-netherrealm", name: "Netherrealm", synonyms: ["netherrealm", "neraka", "nether"] },
    { id: "realm-edenia", name: "Edenia", synonyms: ["edenia"] },
    { id: "realm-chaosrealm", name: "Chaosrealm", synonyms: ["chaosrealm"] },
    { id: "realm-orderrealm", name: "Orderrealm", synonyms: ["orderrealm", "seido"] },
  ];
  for (const r of realms) {
    dict.push({
      id: r.id,
      name: r.name,
      type: "realm",
      uri: `https://example.org/mk/${r.id}`,
      synonyms: r.synonyms,
    });
  }

  // 7. Weapons
  for (const w of weapons) {
    dict.push({
      id: w.id,
      name: w.name,
      type: "weapon",
      uri: `https://example.org/mk/${w.id}`,
      synonyms: [w.name.toLowerCase()],
    });
  }
  // Generic weapon synonyms
  dict.push(
    { id: "weapon-sword-generic", name: "Sword", type: "weapon", uri: "https://example.org/mk/weapon-sword", synonyms: ["pedang", "sword", "blade", "katana"] },
    { id: "weapon-spear-generic", name: "Spear", type: "weapon", uri: "https://example.org/mk/weapon-spear", synonyms: ["tombak", "spear", "kunai", "harpoon"] },
    { id: "weapon-fan-generic", name: "Steel Fans", type: "weapon", uri: "https://example.org/mk/weapon-steel-fans", synonyms: ["kipas", "fans", "steel fans"] },
    { id: "weapon-hammer-generic", name: "War Hammer", type: "weapon", uri: "https://example.org/mk/weapon-war-hammer", synonyms: ["palu", "hammer", "wrath hammer"] }
  );

  return dict;
}

const DICTIONARY: EntityDictionaryEntry[] = buildDictionary();

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Recognize MK entities and link to Knowledge Graph URIs
 */
export function recognizeAndLinkEntities(query: string): RecognizedEntity[] {
  const norm = normalizeText(query);
  const recognized: RecognizedEntity[] = [];
  const seenIds = new Set<string>();

  // Sort dictionary by synonym length descending to prioritize longer phrases (e.g. "Lin Kuei" over "Lin")
  const sortedDict = [...DICTIONARY].sort((a, b) => {
    const maxA = Math.max(...a.synonyms.map((s) => s.length));
    const maxB = Math.max(...b.synonyms.map((s) => s.length));
    return maxB - maxA;
  });

  for (const entry of sortedDict) {
    if (seenIds.has(entry.id)) continue;
    for (const syn of entry.synonyms) {
      // Word boundary regex matching
      const escaped = syn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`, "i");
      if (regex.test(norm)) {
        recognized.push({
          id: entry.id,
          name: entry.name,
          type: entry.type,
          uri: entry.uri,
          confidence: syn.length > 4 ? 0.95 : 0.85,
          matchedTokens: [syn],
        });
        seenIds.add(entry.id);
        break;
      }
    }
  }

  return recognized;
}

/**
 * Natural Language Query Processor (NLQP)
 * Parses queries like "Karakter yang menggunakan kekuatan api", "Musuh dari Scorpion",
 * "Semua anggota klan Lin Kuei", "Karakter yang muncul di Mortal Kombat X dan Mortal Kombat 11",
 * and returns the structured intent, extracted constraints, and generated SPARQL query.
 */
export function processNaturalLanguageQuery(query: string): ParsedQueryIntent {
  const raw = query.trim();
  const norm = normalizeText(raw);
  const entities = recognizeAndLinkEntities(raw);

  const charEntities = entities.filter((e) => e.type === "character");
  const orgEntities = entities.filter((e) => e.type === "organization");
  const elementEntities = entities.filter((e) => e.type === "element");
  const realmEntities = entities.filter((e) => e.type === "realm");
  const gameEntities = entities.filter((e) => e.type === "game");
  const timelineEntities = entities.filter((e) => e.type === "timeline");
  const weaponEntities = entities.filter((e) => e.type === "weapon");

  let intentType: QueryIntentType = "general_entity_lookup";
  let targetType: EntityType | "all" = "all";
  let confidence = 0.5;
  const attributes: ParsedQueryIntent["extractedAttributes"] = {};
  let generatedSparql: string | undefined;

  // Pattern 1: Ability / Element (e.g. "Karakter yang menggunakan kekuatan api", "karakter dengan elemen es", "teleportasi")
  const hasAbilityPattern = /\b(kekuatan|elemen|element|ability|jurus|kemampuan|menggunakan|powers?|abilities|moves?)\b/i.test(norm) ||
    elementEntities.length > 0;

  if (hasAbilityPattern && elementEntities.length > 0) {
    const el = elementEntities[0];
    intentType = "character_by_ability_element";
    targetType = "character";
    attributes.element = el.name;
    confidence = 0.95;

    const safeEl = sparqlRegexEscape(el.name);
    generatedSparql = `
      SELECT DISTINCT ?char ?charName ?abilityName ?elementName
      WHERE {
        ?version a mk:CharacterVersion ;
                 mk:versionOf ?char ;
                 mk:name ?charName ;
                 mk:hasAbility ?ability .
        ?ability mk:name ?abilityName ;
                 mk:hasElement ?element .
        ?element mk:name ?elementName .
        FILTER(regex(?elementName, "${safeEl}", "i"))
      }
    `.trim();
  }
  // Pattern 2: Clan / Organization members (e.g. "Semua anggota klan Lin Kuei", "anggota shirai ryu", "members of special forces")
  else if (
    (/\b(anggota|klan|clan|member|members|organisasi|faksi|faction)\b/i.test(norm) || orgEntities.length > 0) &&
    orgEntities.length > 0
  ) {
    const org = orgEntities[0];
    intentType = "character_by_clan";
    targetType = "character";
    attributes.clan = org.name;
    confidence = 0.95;

    const safeOrg = sparqlRegexEscape(org.name);
    generatedSparql = `
      SELECT DISTINCT ?char ?charName ?clanName
      WHERE {
        ?version a mk:CharacterVersion ;
                 mk:versionOf ?char ;
                 mk:name ?charName ;
                 mk:memberOf ?clan .
        ?clan mk:name ?clanName .
        FILTER(regex(?clanName, "${safeOrg}", "i"))
      }
    `.trim();
  }
  // Pattern 3: Enemies / Rivals (e.g. "Musuh dari Scorpion", "Rival of Sub-Zero", "lawan kano")
  else if (
    /\b(musuh|rival|enemy|enemies|rivals|lawan|perseteruan)\b/i.test(norm) &&
    charEntities.length > 0
  ) {
    const c = charEntities[0];
    intentType = "character_enemies_rivals";
    targetType = "character";
    attributes.relationshipType = "enemyOf";
    confidence = 0.95;

    const safeChar = sparqlRegexEscape(c.name);
    generatedSparql = `
      SELECT DISTINCT ?enemy ?charName ?rel
      WHERE {
        {
          ?c a mk:Character ;
             mk:name ?cn ;
             mk:enemyOf ?enemy .
          ?enemy mk:name ?charName .
          BIND("enemyOf" AS ?rel)
        } UNION {
          ?c a mk:Character ;
             mk:name ?cn ;
             mk:rivalOf ?enemy .
          ?enemy mk:name ?charName .
          BIND("rivalOf" AS ?rel)
        }
        FILTER(regex(?cn, "^${safeChar}$", "i"))
      }
    `.trim();
  }
  // Pattern 4: Allies (e.g. "Sekutu Scorpion", "Allies of Liu Kang", "teman raiden")
  else if (
    /\b(sekutu|ally|allies|teman|kawan|partner)\b/i.test(norm) &&
    charEntities.length > 0
  ) {
    const c = charEntities[0];
    intentType = "character_allies";
    targetType = "character";
    attributes.relationshipType = "alliedWith";
    confidence = 0.92;

    const safeChar = sparqlRegexEscape(c.name);
    generatedSparql = `
      SELECT DISTINCT ?ally ?charName
      WHERE {
        ?c a mk:Character ;
           mk:name ?cn ;
           mk:alliedWith ?ally .
        ?ally mk:name ?charName .
        FILTER(regex(?cn, "^${safeChar}$", "i"))
      }
    `.trim();
  }
  // Pattern 5: Realm / Origin (e.g. "Karakter yang berasal dari Outworld", "karakter asal Earthrealm", "from Netherrealm")
  else if (
    (/\b(berasal|asal|origin|from|realm|dunia)\b/i.test(norm) || realmEntities.length > 0) &&
    realmEntities.length > 0
  ) {
    const r = realmEntities[0];
    intentType = "character_by_realm";
    targetType = "character";
    attributes.realm = r.name;
    confidence = 0.92;

    const safeRealm = sparqlRegexEscape(r.name);
    generatedSparql = `
      SELECT DISTINCT ?char ?charName ?realmName
      WHERE {
        ?char a mk:Character ;
              mk:name ?charName ;
              mk:originatesFrom ?realm .
        ?realm mk:name ?realmName .
        FILTER(regex(?realmName, "${safeRealm}", "i"))
      }
    `.trim();
  }
  // Pattern 6: Appearance in Games (e.g. "Karakter yang muncul di Mortal Kombat X", "muncul di MK11")
  else if (
    (/\b(muncul|appear|appears|game|hadir)\b/i.test(norm) || gameEntities.length > 0) &&
    gameEntities.length > 0
  ) {
    intentType = "character_by_game";
    targetType = "character";
    attributes.game = gameEntities.map((g) => g.name).join(", ");
    confidence = 0.90;

    const gameFilters = gameEntities
      .map((g) => `regex(?gameTitle, "${sparqlRegexEscape(g.name)}", "i")`)
      .join(" || ");

    generatedSparql = `
      SELECT DISTINCT ?char ?charName ?gameTitle
      WHERE {
        ?version a mk:CharacterVersion ;
                 mk:versionOf ?char ;
                 mk:name ?charName ;
                 mk:appearsIn ?game .
        ?game mk:name ?gameTitle .
        FILTER(${gameFilters})
      }
    `.trim();
  }
  // Pattern 7: Weapons (e.g. "Karakter yang menggunakan pedang / sword", "senjata kunai")
  else if (
    (/\b(senjata|weapon|menggunakan|pedang|tombak|katana|spear|sword)\b/i.test(norm) || weaponEntities.length > 0) &&
    weaponEntities.length > 0
  ) {
    const w = weaponEntities[0];
    intentType = "character_weapon";
    targetType = "character";
    attributes.weapon = w.name;
    confidence = 0.90;

    const safeWep = sparqlRegexEscape(w.name);
    generatedSparql = `
      SELECT DISTINCT ?char ?charName ?weaponName
      WHERE {
        ?version a mk:CharacterVersion ;
                 mk:versionOf ?char ;
                 mk:name ?charName ;
                 mk:usesWeapon ?weapon .
        ?weapon mk:name ?weaponName .
        FILTER(regex(?weaponName, "${safeWep}", "i"))
      }
    `.trim();
  }
  // Pattern 8: Two character relationship (e.g. "Hubungan antara Scorpion dan Sub-Zero", "Scorpion vs Sub-Zero")
  else if (
    charEntities.length >= 2 ||
    (/\b(hubungan|relationship|vs|lawan|antara|between)\b/i.test(norm) && charEntities.length >= 1)
  ) {
    intentType = "entity_relationship";
    targetType = "character";
    confidence = 0.92;

    const c1 = charEntities[0];
    const c2 = charEntities[1] || charEntities[0];
    generatedSparql = `
      SELECT DISTINCT ?claim ?subjectName ?predicate ?objectName ?timelineName ?context
      WHERE {
        ?claim a mk:StoryClaim ;
               mk:claimSubject ?sub ;
               mk:claimPredicate ?predicate ;
               mk:claimObject ?obj ;
               mk:claimInTimeline ?timeline .
        ?sub mk:name ?subjectName .
        ?obj mk:name ?objectName .
        ?timeline mk:name ?timelineName .
        OPTIONAL { ?claim mk:claimContext ?context }
        FILTER(
          (regex(?subjectName, "${sparqlRegexEscape(c1.name)}", "i") && regex(?objectName, "${sparqlRegexEscape(c2.name)}", "i")) ||
          (regex(?subjectName, "${sparqlRegexEscape(c2.name)}", "i") && regex(?objectName, "${sparqlRegexEscape(c1.name)}", "i"))
        )
      }
    `.trim();
  }
  // Pattern 9: Story events / narrative (e.g. "Peristiwa turnamen mortal kombat", "cerita reboot timeline")
  else if (
    /\b(peristiwa|cerita|story|event|timeline|kronologi|turnamen|invasi|armageddon|kejadian)\b/i.test(norm)
  ) {
    intentType = "story_events";
    targetType = "event";
    confidence = 0.88;

    const timelineFilter = timelineEntities.length > 0
      ? `FILTER(regex(?timelineName, "${sparqlRegexEscape(timelineEntities[0].name)}", "i"))`
      : "";

    generatedSparql = `
      SELECT DISTINCT ?event ?title ?summary ?timelineName ?order
      WHERE {
        ?event a mk:Event ;
               mk:eventTitle ?title ;
               mk:eventSummary ?summary ;
               mk:occursIn ?timeline .
        ?timeline mk:name ?timelineName .
        OPTIONAL { ?event mk:chronologicalOrder ?order }
        ${timelineFilter}
      }
      ORDER BY ?order
    `.trim();
  }
  // Pattern 10: Single character lookup (e.g. "Scorpion", "Sub-Zero", "Raiden")
  else if (charEntities.length === 1) {
    intentType = "general_entity_lookup";
    targetType = "character";
    confidence = 0.95;
    generatedSparql = `
      SELECT DISTINCT ?char ?charName ?summary
      WHERE {
        ?char a mk:Character ;
              mk:name ?charName .
        OPTIONAL { ?char mk:summary ?summary }
        FILTER(regex(?charName, "^${sparqlRegexEscape(charEntities[0].name)}$", "i"))
      }
    `.trim();
  }
  // Default: free keyword search
  else {
    intentType = "free_keyword";
    targetType = "all";
    confidence = 0.60;
  }

  return {
    intentType,
    targetType,
    recognizedEntities: entities,
    extractedAttributes: attributes,
    cleanedText: norm,
    generatedSparql,
    confidence,
  };
}
