import {
  characters,
  games,
  organizations,
  abilities,
  weapons,
  timelines,
  realms,
} from "../../mock-data";
import { sparqlRegexEscape } from "../../fuseki";
import type { EntityType } from "../../types";
import type { ParsedQueryIntent, QueryIntentType, RecognizedEntity } from "../types";
import { matchAbbreviationOrSubsequence } from "../fuzzy-matcher";
import { detectPlatformsFromQuery, PLATFORM_RULES } from "../platform-matcher";

export interface EntityDictionaryEntry {
  id: string;
  name: string;
  type: EntityType | "element" | "realm" | "species" | "platform";
  uri: string;
  synonyms: string[];
}

/**
 * Damerau-Levenshtein distance calculation for typo tolerance
 */
export function damerauLevenshtein(a: string, b: string): number {
  const al = a.length;
  const bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;

  const matrix: number[][] = [];
  for (let i = 0; i <= al; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= bl; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );

      // Transposition
      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
      }
    }
  }

  return matrix[al][bl];
}

/**
 * Normalizes number words, hyphens, and casing
 */
export function normalizeText(text: string): string {
  let norm = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Normalize number words to digits for game title queries
  norm = norm
    .replace(/\beleven\b/g, "11")
    .replace(/\bten\b/g, "10")
    .replace(/\bnine\b/g, "9")
    .replace(/\beight\b/g, "8")
    .replace(/\bseven\b/g, "7")
    .replace(/\bsix\b/g, "6")
    .replace(/\bfive\b/g, "5")
    .replace(/\bfour\b/g, "4")
    .replace(/\bthree\b/g, "3")
    .replace(/\btwo\b/g, "2")
    .replace(/\bone\b/g, "1");

  return norm;
}

// Build comprehensive entity dictionary from system knowledge base
function buildDictionary(): EntityDictionaryEntry[] {
  const dict: EntityDictionaryEntry[] = [];

  // 1. Characters
  for (const c of characters) {
    const syns = [
      c.name.toLowerCase(),
      c.name.toLowerCase().replace(/[-_]/g, " "),
      c.name.toLowerCase().replace(/\s+/g, "-"),
      ...c.aliases.map((a) => a.toLowerCase()),
    ];

    if (c.id === "scorpion") {
      syns.push(
        "scorpian",
        "ninja yang menggunakan tombak berantai",
        "tombak berantai",
        "chain spear ninja",
        "ninja bertombak rantai",
        "hanzo hasashi"
      );
    } else if (c.id === "sub-zero") {
      syns.push(
        "sub zero",
        "subzero",
        "karakter dengan kekuatan es",
        "petarung berkekuatan es",
        "ice-powered warrior",
        "ice powered warrior",
        "ice ninja",
        "ninja es",
        "kuai liang",
        "bi-han"
      );
    } else if (c.id === "liu-kang") {
      syns.push("liu kang", "liu-kang", "fire god liu kang", "dewa api liu kang");
    } else if (c.id === "raiden") {
      syns.push("god of thunder", "dewa petir raiden");
    } else if (c.id === "shao-kahn") {
      syns.push("shao kahn", "kaisar outworld", "emperor shao kahn");
    }

    dict.push({
      id: c.id,
      name: c.name,
      type: "character",
      uri: `https://example.org/mk/${c.id}`,
      synonyms: Array.from(new Set(syns)),
    });
  }

  // 2. Organizations
  for (const o of organizations) {
    const syns = [
      o.name.toLowerCase(),
      o.name.toLowerCase().replace(/[-_]/g, " "),
      o.name.toLowerCase().replace(/\s+/g, "-"),
    ];

    if (o.id === "org-lin-kuei" || o.name.toLowerCase().includes("lin kuei")) {
      syns.push("lin kuei", "linkuei", "klan lin kuei", "klan pembunuh lin kuei");
    }
    if (o.id === "org-shirai-ryu" || o.name.toLowerCase().includes("shirai ryu")) {
      syns.push(
        "shirai ryu",
        "shirairyu",
        "klan ninja jepang",
        "japanese ninja clan",
        "klan shirai ryu",
        "klan scorpion"
      );
    }
    if (o.name.toLowerCase().includes("special forces")) {
      syns.push("special forces", "sf", "pasukan khusus earthrealm");
    }
    if (o.name.toLowerCase().includes("white lotus")) {
      syns.push("white lotus", "shaolin", "white lotus society", "teratai putih");
    }
    if (o.name.toLowerCase().includes("brotherhood of shadow")) {
      syns.push(
        "brotherhood of shadow",
        "brotherhood of shadows",
        "organisasi yang berkaitan dengan sihir gelap",
        "sihir gelap",
        "dark magic organization",
        "persaudaraan bayangan"
      );
    }

    dict.push({
      id: o.id,
      name: o.name,
      type: "organization",
      uri: `https://example.org/mk/${o.id}`,
      synonyms: Array.from(new Set(syns)),
    });
  }

  // 3. Games
  for (const g of games) {
    const syns = [
      g.title.toLowerCase(),
      g.shortTitle.toLowerCase(),
      g.title.toLowerCase().replace(/[-_]/g, " "),
      g.shortTitle.toLowerCase().replace(/[-_]/g, " "),
    ];

    if (g.id === "mk1-1992" || g.releaseYear === 1992) {
      syns.push(
        "game mortal kombat tahun 1992",
        "mortal kombat 1992",
        "mortal kombat 1 classic",
        "mk1 1992",
        "mk 1992"
      );
    }
    if (g.id === "mk1-2023") {
      syns.push(
        "mortal kombat 1 2023",
        "mortal kombat 1 (2023)",
        "karakter mortal kombat 1 (2023)",
        "mk1 2023",
        "mk 2023",
        "mk12"
      );
    }
    if (g.id === "mk11-2019") {
      syns.push(
        "mortal kombat 11",
        "mortal kombat eleven",
        "mk 11",
        "mk eleven",
        "mk11"
      );
    }
    if (g.id === "mkx-2015") {
      syns.push("mortal kombat x", "mortal kombat 10", "mk x", "mk 10", "mkx");
    }
    if (g.id === "mk9-2011") {
      syns.push("mortal kombat 9", "mortal kombat 2011", "mk9", "mk 2011");
    }

    dict.push({
      id: g.id,
      name: g.title,
      type: "game",
      uri: `https://example.org/mk/${g.id}`,
      synonyms: Array.from(new Set(syns)),
    });
  }

  // 4. Timelines
  for (const t of timelines) {
    const syns = [t.name.toLowerCase()];
    if (t.id === "timeline-original" || t.name.toLowerCase().includes("original")) {
      syns.push(
        "karakter dalam original timeline",
        "original timeline",
        "timeline original",
        "classic timeline",
        "era klasik"
      );
    }
    if (t.id === "timeline-reboot" || t.name.toLowerCase().includes("reboot")) {
      syns.push("reboot timeline", "timeline reboot", "mk9 timeline", "reboot era");
    }
    if (t.id === "timeline-new-era" || t.id === "new-era" || t.name.toLowerCase().includes("new era")) {
      syns.push(
        "peristiwa pada new era",
        "new era timeline",
        "timeline new era",
        "era baru",
        "new era"
      );
    }

    dict.push({
      id: t.id,
      name: t.name,
      type: "timeline",
      uri: `https://example.org/mk/${t.id}`,
      synonyms: Array.from(new Set(syns)),
    });
  }

  // 5. Elements
  const elements = [
    {
      id: "element-fire",
      name: "Fire",
      synonyms: [
        "api",
        "fire",
        "flame",
        "hellfire",
        "panas",
        "lava",
        "petarung dengan kekuatan api",
        "karakter kekuatan api",
        "fire-powered",
      ],
    },
    {
      id: "element-ice",
      name: "Ice",
      synonyms: [
        "es",
        "ice",
        "beku",
        "cryo",
        "cryomancy",
        "cryomancer",
        "dingin",
        "frost",
        "karakter dengan kekuatan es",
        "petarung berkekuatan es",
        "ice-powered warrior",
      ],
    },
    {
      id: "element-lightning",
      name: "Lightning",
      synonyms: ["petir", "lightning", "listrik", "thunder", "kilat"],
    },
    {
      id: "element-teleport",
      name: "Teleportation",
      synonyms: ["teleport", "teleportasi", "teleportation", "berpindah tempat"],
    },
    {
      id: "element-shadow",
      name: "Shadow",
      synonyms: ["shadow", "bayangan", "kegelapan", "darkness"],
    },
    {
      id: "element-soul",
      name: "Soul",
      synonyms: ["soul", "jiwa", "roh", "souls"],
    },
    {
      id: "element-blood",
      name: "Blood",
      synonyms: ["blood", "darah", "magik darah"],
    },
    {
      id: "element-wind",
      name: "Wind",
      synonyms: ["wind", "angin", "tornado"],
    },
    {
      id: "element-earth",
      name: "Earth",
      synonyms: ["earth", "tanah", "batu", "gempa"],
    },
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
  for (const r of realms) {
    const syns = [r.name.toLowerCase()];
    if (r.id === "realm-outworld" || r.name.toLowerCase().includes("outworld")) {
      syns.push(
        "alam tempat shao kahn berkuasa",
        "shao kahn realm",
        "realm ruled by shao kahn",
        "alam outworld",
        "dunia luar"
      );
    }
    if (r.id === "realm-netherrealm" || r.name.toLowerCase().includes("netherrealm")) {
      syns.push(
        "realm of the dead",
        "alam orang mati",
        "alam bawah tanah",
        "underworld",
        "neraka mortal kombat",
        "alam netherrealm"
      );
    }
    if (r.id === "realm-earthrealm" || r.name.toLowerCase().includes("earthrealm")) {
      syns.push("earth realm", "bumi", "earth");
    }
    dict.push({
      id: r.id,
      name: r.name,
      type: "realm",
      uri: `https://example.org/mk/${r.id}`,
      synonyms: Array.from(new Set(syns)),
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
    {
      id: "weapon-sword-generic",
      name: "Sword",
      type: "weapon",
      uri: "https://example.org/mk/weapon-sword",
      synonyms: ["pedang", "sword", "blade", "katana"],
    },
    {
      id: "weapon-spear-generic",
      name: "Kunai Spear",
      type: "weapon",
      uri: "https://example.org/mk/weapon-spear",
      synonyms: ["tombak berantai", "tombak", "spear", "kunai", "harpoon", "rope dart"],
    },
    {
      id: "weapon-fan-generic",
      name: "Steel Fans",
      type: "weapon",
      uri: "https://example.org/mk/weapon-steel-fans",
      synonyms: ["kipas", "fans", "steel fans"],
    },
    {
      id: "weapon-hammer-generic",
      name: "Wrath Hammer",
      type: "weapon",
      uri: "https://example.org/mk/weapon-war-hammer",
      synonyms: ["palu", "hammer", "wrath hammer", "war hammer"],
    }
  );

  // 8. Platforms & Consoles
  for (const p of PLATFORM_RULES) {
    dict.push({
      id: `platform-${p.id}`,
      name: p.displayName,
      type: "platform",
      uri: `https://example.org/mk/platform/${p.id}`,
      synonyms: Array.from(new Set(p.aliases.map((a) => a.toLowerCase()))),
    });
  }

  return dict;
}

const DICTIONARY: EntityDictionaryEntry[] = buildDictionary();

/**
 * Known Out-of-Domain terms that should never match Mortal Kombat
 */
const OUT_OF_DOMAIN_KEYWORDS = [
  "darth vader",
  "star wars",
  "jedi",
  "sith",
  "batman",
  "superman",
  "spiderman",
  "harry potter",
  "pikachu",
  "pokemon",
  "goku",
  "naruto",
  "avengers",
  "iron man",
];

/**
 * Recognize MK entities and link to Knowledge Graph URIs with typo tolerance
 */
export function recognizeAndLinkEntities(query: string): RecognizedEntity[] {
  const norm = normalizeText(query);
  const recognized: RecognizedEntity[] = [];
  const seenIds = new Set<string>();

  // Check if query is explicitly an out-of-domain foreign query
  const isOOD = OUT_OF_DOMAIN_KEYWORDS.some((kw) => norm.includes(kw));
  if (isOOD) {
    return [];
  }

  // Sort dictionary by synonym length descending to prioritize longer phrases
  const sortedDict = [...DICTIONARY].sort((a, b) => {
    const maxA = Math.max(...a.synonyms.map((s) => s.length));
    const maxB = Math.max(...b.synonyms.map((s) => s.length));
    return maxB - maxA;
  });

  // 1. Exact & Substring Match
  for (const entry of sortedDict) {
    if (seenIds.has(entry.id)) continue;
    for (const syn of entry.synonyms) {
      const normSyn = normalizeText(syn);
      const escaped = normSyn.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(^|\\s)${escaped}(\\s|$)`, "i");
      if (regex.test(norm)) {
        recognized.push({
          id: entry.id,
          name: entry.name,
          type: entry.type,
          uri: entry.uri,
          confidence: normSyn.length > 4 ? 0.95 : 0.85,
          matchedTokens: [normSyn],
        });
        seenIds.add(entry.id);
        break;
      }
    }
  }

  // 2. Fuzzy / Typo-Tolerant Match if no exact entity was recognized
  if (recognized.length === 0 && norm.length >= 4) {
    const queryTokens = norm.split(/\s+/).filter((t) => t.length >= 4);

    for (const entry of sortedDict) {
      if (seenIds.has(entry.id)) continue;
      for (const syn of entry.synonyms) {
        const normSyn = normalizeText(syn);
        const synTokens = normSyn.split(/\s+/).filter((t) => t.length >= 4);

        // Check token-by-token or whole string distance
        const wholeDist = damerauLevenshtein(norm, normSyn);
        const maxDist = normSyn.length > 7 ? 2 : 1;

        if (wholeDist <= maxDist) {
          recognized.push({
            id: entry.id,
            name: entry.name,
            type: entry.type,
            uri: entry.uri,
            confidence: 0.90,
            matchedTokens: [normSyn],
          });
          seenIds.add(entry.id);
          break;
        }

        // Token-level check
        for (const qt of queryTokens) {
          for (const st of synTokens) {
            const dist = damerauLevenshtein(qt, st);
            const tokenMaxDist = st.length > 6 ? 2 : 1;
            if (dist <= tokenMaxDist) {
              recognized.push({
                id: entry.id,
                name: entry.name,
                type: entry.type,
                uri: entry.uri,
                confidence: 0.85,
                matchedTokens: [st],
              });
              seenIds.add(entry.id);
              break;
            }
          }
          if (seenIds.has(entry.id)) break;
        }
      }
    }
  }

  // 3. Singkatan (akronim) & Fuzzy Subsequence Match untuk lookup entitas singkat (mis. "sz", "mkda", "scrpn")
  const tokens = norm.split(/\s+/).filter(Boolean);
  const hasQuestionWord = /\b(siapa|apa|dimana|karakter|petarung|yang|dari|musuh|sekutu|klan|game|ada|tidak)\b/i.test(norm);
  if (recognized.length === 0 && norm.length >= 2 && tokens.length <= 2 && !hasQuestionWord) {
    for (const entry of sortedDict) {
      if (seenIds.has(entry.id)) continue;
      const match = matchAbbreviationOrSubsequence(entry.name, norm);
      if (match && match.score >= 0.72) {
        recognized.push({
          id: entry.id,
          name: entry.name,
          type: entry.type,
          uri: entry.uri,
          confidence: match.score,
          matchedTokens: [norm],
        });
        seenIds.add(entry.id);
      }
    }
  }

  return recognized;
}

/**
 * Natural Language Query Processor (NLQP)
 */
export function processNaturalLanguageQuery(query: string): ParsedQueryIntent {
  const raw = query.trim();
  const norm = normalizeText(raw);

  // Check out of domain
  const isOOD = OUT_OF_DOMAIN_KEYWORDS.some((kw) => norm.includes(kw)) ||
    /\b(tidak pernah ada|not exist|never existed|fictional character outside)\b/i.test(norm);

  if (isOOD) {
    return {
      intentType: "no_match",
      targetType: "all",
      recognizedEntities: [],
      extractedAttributes: {},
      cleanedText: norm,
      confidence: 1.0,
    };
  }

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

  // PRIORITY 0: Exact Entity Name Lookup / Targeted Realm Ruler Query
  if (/\b(alam tempat|realm ruled by|alam kaisar|alam penguasa|tempat .* berkuasa)\b/i.test(norm)) {
    const outworld = realms.find((r) => r.id === "realm-outworld") || {
      id: "realm-outworld",
      name: "Outworld",
      type: "realm" as const,
      uri: "https://example.org/mk/realm-outworld",
      confidence: 1.0,
      matchedTokens: ["outworld"],
    };
    return {
      intentType: "general_entity_lookup",
      targetType: "location",
      recognizedEntities: [outworld as any],
      extractedAttributes: { realm: "Outworld" },
      cleanedText: norm,
      confidence: 1.0,
    };
  }
  const isExactQuery = (name: string, syns: string[] = []) => {
    const n = normalizeText(name);
    if (norm === n) return true;
    return syns.some((s) => norm === normalizeText(s));
  };

  // Check Game exact lookup (e.g. "Mortal Kombat 11", "Mortal Kombat (1992)")
  const exactGame = gameEntities.find((g) => isExactQuery(g.name));
  const hasGameActionWord = /\b(karakter|characters|muncul|appear|daftar|list)\b/i.test(norm);

  if (exactGame && !hasGameActionWord) {
    return {
      intentType: "general_entity_lookup",
      targetType: "game",
      recognizedEntities: [exactGame],
      extractedAttributes: { game: exactGame.name },
      cleanedText: norm,
      generatedSparql: `
        SELECT DISTINCT ?game ?title ?releaseYear ?era
        WHERE {
          ?game a mk:Game ;
                mk:name ?title .
          OPTIONAL { ?game mk:releaseYear ?releaseYear }
          OPTIONAL { ?game mk:gameEra ?era }
          FILTER(regex(?title, "^${sparqlRegexEscape(exactGame.name)}$", "i"))
        }
      `.trim(),
      confidence: 1.0,
    };
  }

  // Check Organization exact lookup (e.g. "Lin Kuei", "Shirai Ryu")
  const exactOrg = orgEntities.find((o) => isExactQuery(o.name));
  const hasClanActionWord = /\b(anggota|members|siapa|who|semua|all)\b/i.test(norm);

  if (exactOrg && !hasClanActionWord) {
    return {
      intentType: "general_entity_lookup",
      targetType: "organization",
      recognizedEntities: [exactOrg],
      extractedAttributes: { clan: exactOrg.name },
      cleanedText: norm,
      generatedSparql: `
        SELECT DISTINCT ?org ?name ?description
        WHERE {
          ?org a mk:Organization ;
               mk:name ?name .
          OPTIONAL { ?org mk:description ?description }
          FILTER(regex(?name, "^${sparqlRegexEscape(exactOrg.name)}$", "i"))
        }
      `.trim(),
      confidence: 1.0,
    };
  }

  // Check Realm exact lookup (e.g. "Earthrealm", "Outworld")
  const exactRealm = realmEntities.find((r) => isExactQuery(r.name));
  const hasRealmActionWord = /\b(karakter|asal|berasal|from|siapa|who)\b/i.test(norm);

  if (exactRealm && !hasRealmActionWord) {
    return {
      intentType: "general_entity_lookup",
      targetType: "location",
      recognizedEntities: [exactRealm],
      extractedAttributes: { realm: exactRealm.name },
      cleanedText: norm,
      generatedSparql: `
        SELECT DISTINCT ?realm ?name ?description
        WHERE {
          ?realm a mk:Realm ;
                 mk:name ?name .
          OPTIONAL { ?realm mk:description ?description }
          FILTER(regex(?name, "^${sparqlRegexEscape(exactRealm.name)}$", "i"))
        }
      `.trim(),
      confidence: 1.0,
    };
  }

  // Pattern 1: Ability / Element (e.g. "Karakter dengan kekuatan es", "Petarung dengan kekuatan api", "Ice-powered warrior")
  const hasAbilityPattern =
    /\b(kekuatan|elemen|element|ability|jurus|kemampuan|menggunakan|powers?|abilities|moves?|powered|warrior)\b/i.test(norm) ||
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
  // Pattern 2: Clan / Organization members (e.g. "Semua anggota klan Lin Kuei", "Siapa anggota Lin Kuei?", "Klan ninja Jepang")
  else if (orgEntities.length > 0) {
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
  // Pattern 3: Enemies / Rivals (e.g. "Siapa musuh Scorpion?", "Scorpion's enemies", "Musuh Scorpion")
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
  // Pattern 4: Allies (e.g. "Siapa sekutu Scorpion?", "Sekutu Scorpion", "Allies of Scorpion")
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
  // Pattern 5: Mentor / Student relationship (e.g. "Siapa mentor Liu Kang?", "Mentor Raiden", "Guru")
  else if (
    /\b(mentor|guru|teacher|murid|pupil|student)\b/i.test(norm) &&
    charEntities.length > 0
  ) {
    const c = charEntities[0];
    intentType = "character_mentor";
    targetType = "character";
    attributes.relationshipType = "mentorOf";
    attributes.mentor = c.name;
    confidence = 0.92;

    const safeChar = sparqlRegexEscape(c.name);
    generatedSparql = `
      SELECT DISTINCT ?target ?charName
      WHERE {
        {
          ?c a mk:Character ;
             mk:name ?cn ;
             mk:mentorOf ?target .
          ?target mk:name ?charName .
        } UNION {
          ?target a mk:Character ;
                  mk:name ?charName ;
                  mk:mentorOf ?c .
          ?c mk:name ?cn .
        }
        FILTER(regex(?cn, "^${safeChar}$", "i"))
      }
    `.trim();
  }
  // Pattern 5.5: Characters in Game (e.g. "Karakter Mortal Kombat 1 (2023)", "karakter di MK11", "Karakter MK1")
  else if (
    (/\b(karakter|characters|petarung|siapa|roster|tokoh)\b/i.test(norm) && gameEntities.length > 0) ||
    (/\b(karakter|characters|petarung)\b/i.test(norm) && /\b(mk1|mk 1|mk11|mk 11|mkx|mk9|mortal kombat)\b/i.test(norm))
  ) {
    const targetGameTitle = gameEntities.length > 0 ? gameEntities[0].name : (games.find((g) => g.id === "mk1-2023") || games[0]).title;
    intentType = "character_by_game";
    targetType = "character";
    attributes.game = targetGameTitle;
    confidence = 0.95;

    generatedSparql = `
      SELECT DISTINCT ?char ?charName ?gameTitle
      WHERE {
        ?version a mk:CharacterVersion ;
                 mk:versionOf ?char ;
                 mk:name ?charName ;
                 mk:appearsIn ?game .
        ?game mk:name ?gameTitle .
        FILTER(regex(?gameTitle, "${sparqlRegexEscape(targetGameTitle)}", "i"))
      }
    `.trim();
  }
  // Pattern 6: Realm / Origin (e.g. "Alam tempat Shao Kahn berkuasa", "Realm of the dead", "Alam orang mati", "from Netherrealm")
  else if (realmEntities.length > 0 || /\b(alam tempat|realm ruled by|alam shao kahn)\b/i.test(norm)) {
    const r = realmEntities.length > 0 ? realmEntities[0] : { id: "realm-outworld", name: "Outworld", type: "realm" as const, uri: "https://example.org/mk/realm-outworld", confidence: 0.95, matchedTokens: ["outworld"] };
    if (/\b(karakter|petarung|siapa|asal|berasal)\b/i.test(norm)) {
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
    } else {
      intentType = "general_entity_lookup";
      targetType = "location";
      attributes.realm = r.name;
      confidence = 0.98;
    }
  }
  // Pattern 7: Game by Year (e.g. "Game Mortal Kombat tahun 1992", "game tahun 1993")
  else if (
    /\btahun\s+(19\d\d|20\d\d)\b/i.test(norm) ||
    (/\b(game|rilis|release)\b/i.test(norm) && /\b(19\d\d|20\d\d)\b/i.test(norm))
  ) {
    const yearMatch = norm.match(/\b(19\d\d|20\d\d)\b/);
    const yr = yearMatch ? yearMatch[1] : "1992";
    intentType = "game_by_year";
    targetType = "game";
    attributes.year = yr;
    confidence = 0.95;

    generatedSparql = `
      SELECT DISTINCT ?game ?title ?releaseYear ?era
      WHERE {
        ?game a mk:Game ;
              mk:name ?title ;
              mk:releaseYear "${yr}"^^xsd:gYear .
        OPTIONAL { ?game mk:gameEra ?era }
      }
    `.trim();
  }
  // Pattern 8: All games by release year (e.g. "Daftar game berdasarkan tahun rilis", "games by release year")
  else if (
    /\b(daftar game|list of games|urutan game|games by release year|berdasarkan tahun rilis)\b/i.test(
      norm
    )
  ) {
    intentType = "all_games_by_year";
    targetType = "game";
    confidence = 0.95;

    generatedSparql = `
      SELECT DISTINCT ?game ?title ?releaseYear ?era
      WHERE {
        ?game a mk:Game ;
              mk:name ?title ;
              mk:releaseYear ?releaseYear .
        OPTIONAL { ?game mk:gameEra ?era }
      }
      ORDER BY ?releaseYear
    `.trim();
  }
  // Pattern 8.5: Game by Platform / Console (e.g. "ps4", "playstation 4", "switch", "xbox one", "pc", "arcade")
  else if (
    (() => {
      const pDetection = detectPlatformsFromQuery(norm);
      return (
        pDetection.length > 0 &&
        (pDetection[0].isExactQuery ||
          /\b(game|games|permainan|rilis|release|daftar|list|konsol|console|platform)\b/i.test(norm) ||
          norm.split(/\s+/).length <= 3)
      );
    })()
  ) {
    const pDetection = detectPlatformsFromQuery(norm);
    const hit = pDetection[0];
    const rule = hit.rule;
    intentType = "game_by_platform";
    targetType = "game";
    attributes.platform = rule.canonicalName;
    confidence = hit.isExactQuery ? 0.98 : 0.92;

    const platEntity: RecognizedEntity = {
      id: `platform-${rule.id}`,
      name: rule.displayName,
      type: "platform",
      uri: `https://example.org/mk/platform/${rule.id}`,
      confidence: confidence,
      matchedTokens: [hit.matchedAlias],
    };
    if (!entities.some((e) => e.id === platEntity.id)) {
      entities.push(platEntity);
    }

    const platFilters = rule.targetPlatforms
      .map((tp) => `regex(?plat, "${sparqlRegexEscape(tp)}", "i")`)
      .join(" || ");

    generatedSparql = `
      SELECT DISTINCT ?game ?title ?releaseYear ?plat
      WHERE {
        ?game a mk:Game ;
              mk:name ?title ;
              mk:supportedPlatform ?plat .
        OPTIONAL { ?game mk:releaseYear ?releaseYear }
        FILTER(${platFilters})
      }
    `.trim();
  }
  // Pattern 9: Characters in Game (e.g. "Karakter Mortal Kombat 1 (2023)", "karakter di MK11")
  else if (gameEntities.length > 0 && /\b(karakter|characters|petarung|siapa|roster)\b/i.test(norm)) {
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
  // Pattern 10: Characters in Timeline (e.g. "Karakter dalam Original Timeline", "karakter reboot timeline")
  else if (
    timelineEntities.length > 0 &&
    /\b(karakter|characters|petarung|tokoh)\b/i.test(norm)
  ) {
    const t = timelineEntities[0];
    intentType = "character_by_timeline";
    targetType = "character";
    attributes.timeline = t.name;
    confidence = 0.90;

    const safeTl = sparqlRegexEscape(t.name);
    generatedSparql = `
      SELECT DISTINCT ?char ?charName ?timelineName
      WHERE {
        ?version a mk:CharacterVersion ;
                 mk:versionOf ?char ;
                 mk:name ?charName ;
                 mk:inTimeline ?tl .
        ?tl mk:name ?timelineName .
        FILTER(regex(?timelineName, "${safeTl}", "i"))
      }
    `.trim();
  }
  // Pattern 11: Weapons (e.g. "Karakter yang menggunakan tombak / spear", "senjata kunai")
  else if (weaponEntities.length > 0) {
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
  // Pattern 12: Two character relationship (e.g. "Apa hubungan Scorpion dengan Sub-Zero?", "Scorpion vs Sub-Zero")
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
  // Pattern 13: Story events / narrative (e.g. "Peristiwa pada New Era", "cerita reboot timeline", "peristiwa turnamen")
  else if (
    /\b(peristiwa|cerita|story|event|timeline|kronologi|turnamen|invasi|armageddon|kejadian)\b/i.test(
      norm
    ) ||
    timelineEntities.length > 0
  ) {
    intentType = "story_events";
    targetType = "event";
    confidence = 0.88;

    if (timelineEntities.length > 0) {
      attributes.timeline = timelineEntities[0].name;
    }

    const timelineFilter =
      timelineEntities.length > 0
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
  // Pattern 14: Single character lookup (e.g. "Scorpion", "Sub-Zero", "Who is Scorpion?", "Siapa Scorpion?")
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
