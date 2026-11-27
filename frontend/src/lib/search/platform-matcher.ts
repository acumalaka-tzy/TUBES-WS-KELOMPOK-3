import type { Game } from "../types";

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
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
}

export interface PlatformRule {
  id: string;
  canonicalName: string;
  displayName: string;
  targetPlatforms: string[];
  aliases: string[];
  isBroadFamily?: boolean;
}

export const PLATFORM_RULES: PlatformRule[] = [
  // PlayStation Specific Generations
  {
    id: "ps5",
    canonicalName: "PlayStation 5",
    displayName: "PlayStation 5",
    targetPlatforms: ["PlayStation 5"],
    aliases: ["ps5", "playstation 5", "ps 5", "playstation5", "sony playstation 5"],
  },
  {
    id: "ps4",
    canonicalName: "PlayStation 4",
    displayName: "PlayStation 4",
    targetPlatforms: ["PlayStation 4"],
    aliases: ["ps4", "playstation 4", "ps 4", "playstation4", "sony playstation 4"],
  },
  {
    id: "ps3",
    canonicalName: "PlayStation 3",
    displayName: "PlayStation 3",
    targetPlatforms: ["PlayStation 3"],
    aliases: ["ps3", "playstation 3", "ps 3", "playstation3", "sony playstation 3"],
  },
  {
    id: "ps2",
    canonicalName: "PlayStation 2",
    displayName: "PlayStation 2",
    targetPlatforms: ["PlayStation 2"],
    aliases: ["ps2", "playstation 2", "ps 2", "playstation2", "sony playstation 2"],
  },
  {
    id: "ps1",
    canonicalName: "PlayStation",
    displayName: "PlayStation (PS1 / PSX)",
    targetPlatforms: ["PlayStation"],
    aliases: ["ps1", "ps 1", "playstation 1", "playstation1", "psx", "psone", "ps one"],
  },
  {
    id: "psp",
    canonicalName: "PlayStation Portable",
    displayName: "PlayStation Portable (PSP)",
    targetPlatforms: ["PlayStation Portable"],
    aliases: ["psp", "playstation portable", "ps portable"],
  },
  // PlayStation Family
  {
    id: "playstation",
    canonicalName: "PlayStation",
    displayName: "Seri PlayStation",
    targetPlatforms: [
      "PlayStation",
      "PlayStation 2",
      "PlayStation 3",
      "PlayStation 4",
      "PlayStation 5",
      "PlayStation Portable",
    ],
    aliases: ["playstation", "sony playstation", "konsol playstation", "ps"],
    isBroadFamily: true,
  },

  // Xbox Specific Generations
  {
    id: "xbox-one",
    canonicalName: "Xbox One",
    displayName: "Xbox One",
    targetPlatforms: ["Xbox One"],
    aliases: ["xbox one", "xbone", "xone", "xbox 1", "xb1", "xbox-one"],
  },
  {
    id: "xbox-360",
    canonicalName: "Xbox 360",
    displayName: "Xbox 360",
    targetPlatforms: ["Xbox 360"],
    aliases: ["xbox 360", "xbox360", "xb360", "x360", "xbox-360"],
  },
  {
    id: "xbox-series",
    canonicalName: "Xbox Series X/S",
    displayName: "Xbox Series X/S",
    targetPlatforms: ["Xbox Series X/S"],
    aliases: [
      "xbox series",
      "xbox series x",
      "xbox series s",
      "xbox series x/s",
      "series x",
      "series s",
      "xsx",
      "xss",
    ],
  },
  // Xbox Family
  {
    id: "xbox",
    canonicalName: "Xbox",
    displayName: "Seri Xbox",
    targetPlatforms: ["Xbox", "Xbox 360", "Xbox One", "Xbox Series X/S"],
    aliases: ["xbox", "microsoft xbox", "konsol xbox"],
    isBroadFamily: true,
  },

  // Nintendo
  {
    id: "switch",
    canonicalName: "Nintendo Switch",
    displayName: "Nintendo Switch",
    targetPlatforms: ["Nintendo Switch"],
    aliases: ["switch", "nintendo switch", "nswitch"],
  },
  {
    id: "wii",
    canonicalName: "Wii",
    displayName: "Nintendo Wii",
    targetPlatforms: ["Wii"],
    aliases: ["wii", "nintendo wii"],
  },
  {
    id: "gamecube",
    canonicalName: "GameCube",
    displayName: "Nintendo GameCube",
    targetPlatforms: ["GameCube"],
    aliases: ["gamecube", "gc", "nintendo gamecube"],
  },
  {
    id: "n64",
    canonicalName: "Nintendo 64",
    displayName: "Nintendo 64",
    targetPlatforms: ["Nintendo 64"],
    aliases: ["nintendo 64", "n64"],
  },
  {
    id: "snes",
    canonicalName: "SNES",
    displayName: "Super Nintendo (SNES)",
    targetPlatforms: ["SNES"],
    aliases: ["snes", "super nintendo", "super nes", "super famicom"],
  },
  {
    id: "gameboy",
    canonicalName: "Game Boy",
    displayName: "Game Boy",
    targetPlatforms: ["Game Boy", "Game Boy Advance"],
    aliases: ["game boy", "gameboy", "gb", "gba", "game boy advance"],
  },

  // PC
  {
    id: "pc",
    canonicalName: "PC",
    displayName: "PC / Komputer",
    targetPlatforms: ["PC"],
    aliases: ["pc", "personal computer", "komputer", "windows", "steam"],
  },

  // Arcade
  {
    id: "arcade",
    canonicalName: "Arcade",
    displayName: "Mesin Arcade",
    targetPlatforms: ["Arcade"],
    aliases: ["arcade", "mesin arcade", "dingdong", "ding dong", "arcade cabinet"],
  },

  // Sega
  {
    id: "sega-genesis",
    canonicalName: "Sega Genesis",
    displayName: "Sega Genesis",
    targetPlatforms: ["Sega Genesis"],
    aliases: ["sega genesis", "genesis", "mega drive", "sega mega drive"],
  },
  {
    id: "sega-saturn",
    canonicalName: "Sega Saturn",
    displayName: "Sega Saturn",
    targetPlatforms: ["Sega Saturn"],
    aliases: ["sega saturn", "saturn"],
  },

  // Mobile
  {
    id: "mobile",
    canonicalName: "Mobile",
    displayName: "Mobile (iOS / Android)",
    targetPlatforms: ["iOS", "Android"],
    aliases: ["mobile", "android", "ios", "iphone", "ipad", "smartphone"],
  },
];

export interface DetectedPlatformHit {
  rule: PlatformRule;
  matchedAlias: string;
  isExactQuery: boolean;
}

/**
 * Mendeteksi apakah string query memuat platform atau alias konsol game.
 */
export function detectPlatformsFromQuery(query: string): DetectedPlatformHit[] {
  const normQ = normalizeText(query);
  if (!normQ) return [];

  const hits: DetectedPlatformHit[] = [];
  const matchedRuleIds = new Set<string>();

  // Urutkan aturan dari alias terpanjang (spesifik) ke yang terpendek (umum)
  // Contoh: "xbox one" sebelum "xbox", "playstation 4" sebelum "playstation"
  const sortedRules = [...PLATFORM_RULES].sort((a, b) => {
    const maxA = Math.max(...a.aliases.map((al) => al.length));
    const maxB = Math.max(...b.aliases.map((al) => al.length));
    return maxB - maxA;
  });

  for (const rule of sortedRules) {
    for (const alias of rule.aliases) {
      const normAlias = normalizeText(alias);
      if (!normAlias) continue;

      let matched = false;
      const isExact = normQ === normAlias;

      if (isExact) {
        matched = true;
      } else {
        // Gunakan regex word-boundary untuk mencegah false positive kata pendek (e.g. "pc", "ps")
        const escaped = normAlias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(^|\\s|[-_.,!?()/])${escaped}($|\\s|[-_.,!?()/])`, "i");
        if (regex.test(normQ)) {
          matched = true;
        }
      }

      if (matched) {
        // Jika sudah match versi spesifik (misal "ps4"), jangan duplikat dengan broad family ("playstation")
        if (rule.isBroadFamily && matchedRuleIds.size > 0) {
          continue;
        }

        hits.push({
          rule,
          matchedAlias: alias,
          isExactQuery: isExact,
        });
        matchedRuleIds.add(rule.id);
        break; // Lanjut ke rule berikutnya
      }
    }
  }

  return hits;
}

export interface GamePlatformHit {
  game: Game;
  platformName: string;
  score: number;
  matchedAlias: string;
  label: string;
}

/**
 * Mencocokkan apakah entitas game rilis pada platform yang dicari dalam query.
 */
export function matchGamePlatforms(game: Game, query: string): GamePlatformHit[] {
  const detected = detectPlatformsFromQuery(query);
  if (detected.length === 0 || !game.platforms || game.platforms.length === 0) {
    return [];
  }

  const results: GamePlatformHit[] = [];

  for (const hit of detected) {
    const rule = hit.rule;
    // Cari platform game yang cocok dengan targetPlatforms pada rule
    const matchingPlatform = game.platforms.find((gp) =>
      rule.targetPlatforms.some((tp) => gp.toLowerCase() === tp.toLowerCase())
    );

    if (matchingPlatform) {
      // Hitung skor relevansi:
      // Jika kueri murni nama platform (misal "ps4") -> skor tinggi 0.95
      // Jika kueri memuat judul game dan platform (misal "mk11 ps4") -> 0.98
      // Jika kueri umum -> 0.92
      let score = hit.isExactQuery ? 0.95 : 0.92;

      const normQ = normalizeText(query);
      if (
        normQ.includes(normalizeText(game.title)) ||
        normQ.includes(normalizeText(game.shortTitle))
      ) {
        score = 0.98;
      }

      results.push({
        game,
        platformName: matchingPlatform,
        score,
        matchedAlias: hit.matchedAlias,
        label: `Tersedia di platform ${matchingPlatform}`,
      });
    }
  }

  return results;
}
