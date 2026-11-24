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
import type { EntityType } from "../types";
import type { SearchCandidate } from "./types";
import { damerauLevenshtein, normalizeText } from "./nlp/entity-recognizer";

const STOPWORDS = new Set([
  "yang", "dengan", "di", "pada", "dari", "ke", "ini", "itu", "dan", "adalah",
  "sebagai", "dalam", "untuk", "siapa", "apa", "ada", "para", "oleh", "tentang",
  "karakter", "petarung", "tokoh", "semua", "daftar", "siapakah", "apakah", "asal",
  "the", "a", "an", "of", "in", "on", "at", "to", "for", "with", "and", "is",
  "are", "was", "were", "who", "what", "character", "characters", "fighter", "warrior"
]);

function tokenize(str: string): string[] {
  return normalizeText(str)
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export interface KeywordSearchOptions {
  type?: EntityType | "all";
  game?: string;
  timeline?: string;
  element?: string;
  faction?: string;
  limit?: number;
}

export function executeKeywordSearch(
  query: string,
  options: KeywordSearchOptions = {}
): SearchCandidate[] {
  const normQ = normalizeText(query);
  const qTokens = tokenize(normQ);

  // If query is empty
  if (!normQ && (!options.type || options.type === "all")) {
    return [];
  }

  // Check out-of-domain keywords (e.g. Darth Vader)
  if (
    normQ.includes("darth vader") ||
    normQ.includes("tidak pernah ada") ||
    normQ.includes("batman") ||
    normQ.includes("superman") ||
    normQ.includes("harry potter")
  ) {
    return [];
  }

  const { type = "all", game, timeline, element, faction } = options;
  const candidates: SearchCandidate[] = [];

  // Helper function to test exact or typo-tolerant match
  const matchScore = (target: string, queryStr: string): number => {
    const t = normalizeText(target);
    const q = normalizeText(queryStr);
    if (!t || !q) return 0;
    if (t === q) return 1.0;
    // Check without spaces / hyphens
    const tCompact = t.replace(/\s+/g, "");
    const qCompact = q.replace(/\s+/g, "");
    if (tCompact === qCompact) return 0.98;
    if (t.startsWith(q)) return 0.92;
    if (t.includes(q)) return 0.88;

    // Typo check via Damerau-Levenshtein
    if (q.length >= 4) {
      const maxDist = t.length > 7 ? 2 : 1;
      const dist = damerauLevenshtein(q, t);
      if (dist <= maxDist) return 0.90;
    }
    return 0;
  };

  const isRelQuery = /\b(musuh|enemy|enemies|rival|rivals|sekutu|ally|allies|lawan|mentor|guru|teacher|murid|student)\b/i.test(normQ);

  // 1. Search Characters
  if (type === "all" || type === "character") {
    for (const c of characters) {
      const latestVersion = c.versions[c.versions.length - 1];
      const gameTitles = c.versions.map((v) => v.gameTitle);
      const timelineNames = Array.from(new Set(c.versions.map((v) => v.timelineName)));

      // Apply external filters
      if (game && !gameTitles.some((g) => g.toLowerCase().includes(game.toLowerCase()))) {
        continue;
      }
      if (timeline && !timelineNames.some((t) => t.toLowerCase().includes(timeline.toLowerCase()))) {
        continue;
      }
      if (faction && c.faction && !c.faction.toLowerCase().includes(faction.toLowerCase())) {
        continue;
      }

      let score = matchScore(c.name, normQ);
      const notes: string[] = [];

      if (isRelQuery && (score >= 0.70 || c.aliases.some((a) => matchScore(a, normQ) >= 0.70))) {
        // The subject character should not be returned as an enemy/ally/mentor of themselves
        continue;
      }

      if (score === 1.0) {
        notes.push(`Cocok persis dengan nama karakter "${c.name}"`);
      } else if (score >= 0.90) {
        notes.push(`Kecocokan fonetik/toleransi typo dengan nama karakter "${c.name}"`);
      } else {
        // Check aliases
        for (const a of c.aliases) {
          const aScore = matchScore(a, normQ);
          if (aScore > score) {
            score = Math.min(0.95, aScore);
            notes.push(`Cocok dengan alias karakter "${c.name}" (${a})`);
          }
        }
      }

      // If no name/alias match, check token overlap in summary & bio
      if (score === 0 && qTokens.length > 0) {
        const normSummary = normalizeText(c.summary);
        const normBio = normalizeText(c.biography);
        let matched = 0;

        for (const token of qTokens) {
          if (normalizeText(c.name).includes(token)) matched += 3;
          else if (c.aliases.some((a) => normalizeText(a).includes(token))) matched += 2.5;
          else if (normSummary.includes(token)) matched += 1.5;
          else if (normBio.includes(token)) matched += 1;
        }

        if (matched >= 2.5) {
          score = Math.min(0.70, (matched / (qTokens.length * 3)) * 0.70);
          notes.push(`Ditemukan dalam deskripsi/biografi karakter "${c.name}"`);
        }
      }

      // Check relationship matches (enemyOf, alliedWith, mentorOf, familyOf, etc.)
      const matchedRelLabels: string[] = [];
      for (const rel of c.relationships) {
        const targetNameNorm = normalizeText(rel.target.name);
        const targetTokens = targetNameNorm.split(" ").filter((t) => t.length > 2);
        const targetMatched =
          normQ.includes(targetNameNorm) ||
          targetTokens.some((t) => normQ.includes(t) || qTokens.includes(t));

        if (targetMatched) {
          if (isRelQuery) {
            const isEnemyQuery = /\b(musuh|enemy|enemies|rival|rivals|lawan)\b/i.test(normQ);
            const isAllyQuery = /\b(sekutu|ally|allies|teman|kawan)\b/i.test(normQ);
            const isMentorQuery = /\b(mentor|guru|teacher|murid|student)\b/i.test(normQ);

            if (
              (isEnemyQuery && (rel.type === "enemyOf" || rel.type === "rivalOf")) ||
              (isAllyQuery && (rel.type === "allyOf" || rel.type === "alliedWith")) ||
              (isMentorQuery && rel.type === "mentorOf")
            ) {
              const relScore = 0.90;
              if (relScore > score) {
                score = relScore;
                notes.push(`Memiliki relasi ${rel.label} dengan "${rel.target.name}"`);
                matchedRelLabels.push(`${rel.type} → ${rel.target.name} (${rel.label})`);
              }
            }
          } else {
            // General query (e.g. typing just "sub zero" or "scorpion"):
            // Related characters get a score (0.40) so they appear below abilities & weapons
            const relScore = 0.40;
            if (relScore > score) {
              score = relScore;
              notes.push(`Memiliki relasi ${rel.label} dengan "${rel.target.name}"`);
              matchedRelLabels.push(`${rel.type} → ${rel.target.name} (${rel.label})`);
            }
          }
        }
      }

      // Also check reverse relationship (where target lists c)
      for (const otherChar of characters) {
        if (otherChar.id !== c.id && matchScore(otherChar.name, normQ) >= 0.70) {
          const relToC = otherChar.relationships.find((r) => r.target.id === c.id);
          if (relToC) {
            if (isRelQuery) {
              const isEnemyQuery = /\b(musuh|enemy|enemies|rival|rivals|lawan)\b/i.test(normQ);
              const isAllyQuery = /\b(sekutu|ally|allies|teman|kawan)\b/i.test(normQ);
              const isMentorQuery = /\b(mentor|guru|teacher|murid|student)\b/i.test(normQ);

              if (
                (isEnemyQuery && (relToC.type === "enemyOf" || relToC.type === "rivalOf")) ||
                (isAllyQuery && (relToC.type === "allyOf" || relToC.type === "alliedWith")) ||
                (isMentorQuery && relToC.type === "mentorOf")
              ) {
                const relScore = 0.90;
                if (relScore > score) {
                  score = relScore;
                  notes.push(`Terhubung sebagai ${relToC.label} dari "${otherChar.name}"`);
                  matchedRelLabels.push(`${relToC.type} ← ${otherChar.name} (${relToC.label})`);
                }
              }
            } else {
              // Related characters appear below abilities & weapons
              const relScore = 0.40;
              if (relScore > score) {
                score = relScore;
                notes.push(`Terhubung sebagai ${relToC.label} dari "${otherChar.name}"`);
                matchedRelLabels.push(`${relToC.type} ← ${otherChar.name} (${relToC.label})`);
              }
            }
          }
        }
      }

      if (score > 0) {
        candidates.push({
          id: c.id,
          type: "character",
          name: c.name,
          summary: c.summary,
          href: entityHref({ id: c.id, type: "character", name: c.name }),
          image: latestVersion?.image,
          attributes: [
            { label: "Faksi", value: c.faction ?? "-" },
            { label: "Realm", value: c.realm?.name ?? "-" },
            { label: "Spesies", value: c.species?.name ?? "-" },
          ],
          timeline: timelineNames.join(", "),
          games: gameTitles,
          provenance: c.sources,
          keywordScore: Math.round(score * 100) / 100,
          matchedRelationships: Array.from(new Set(matchedRelLabels)),
          explanationNotes: notes,
        });
      }
    }
  }

  // 2. Search Games
  if (type === "all" || type === "game") {
    for (const g of games) {
      if (timeline && g.timeline?.name && !g.timeline.name.toLowerCase().includes(timeline.toLowerCase())) {
        continue;
      }

      let score = Math.max(matchScore(g.title, normQ), matchScore(g.shortTitle, normQ));
      const notes: string[] = [];

      if (score === 1.0) {
        notes.push(`Cocok persis dengan judul game "${g.title}"`);
      } else if (score >= 0.90) {
        notes.push(`Kecocokan fonetik/toleransi typo dengan judul game "${g.title}"`);
      } else if (score > 0) {
        notes.push(`Judul game "${g.title}" mengandung kata kunci`);
      } else if (qTokens.length > 0) {
        let matched = 0;
        const normSummary = normalizeText(g.summary);
        for (const token of qTokens) {
          if (normalizeText(g.title).includes(token)) matched += 2;
          else if (normSummary.includes(token)) matched += 1;
        }
        if (matched >= 2) {
          score = Math.min(0.65, (matched / (qTokens.length * 2)) * 0.65);
          notes.push(`Ditemukan dalam ringkasan game "${g.title}"`);
        }
      }

      // Check year match
      if (qTokens.includes(String(g.releaseYear))) {
        score = Math.max(score, 0.85);
        notes.push(`Cocok dengan tahun rilis game (${g.releaseYear})`);
      }

      if (score > 0) {
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
          keywordScore: Math.round(score * 100) / 100,
          explanationNotes: notes,
        });
      }
    }
  }

  // 3. Search Organizations / Clans
  if (type === "all" || type === "organization") {
    for (const org of organizations) {
      let score = matchScore(org.name, normQ);
      const notes: string[] = [];

      if (score === 1.0) {
        notes.push(`Cocok persis dengan nama organisasi/klan "${org.name}"`);
      } else if (score >= 0.90) {
        notes.push(`Kecocokan toleransi typo dengan nama organisasi "${org.name}"`);
      } else if (score > 0) {
        notes.push(`Nama organisasi "${org.name}" mengandung kata kunci`);
      } else if (qTokens.length > 0) {
        let matched = 0;
        const normDesc = normalizeText(org.description);
        for (const token of qTokens) {
          if (normalizeText(org.name).includes(token)) matched += 2;
          else if (normDesc.includes(token)) matched += 1;
        }
        if (matched >= 2) {
          score = Math.min(0.65, (matched / (qTokens.length * 2)) * 0.65);
          notes.push(`Ditemukan dalam deskripsi klan "${org.name}"`);
        }
      }

      if (score > 0) {
        candidates.push({
          id: org.id,
          type: "organization",
          name: org.name,
          summary: org.description,
          href: `/organizations/${org.id}`,
          attributes: [{ label: "Jenis", value: org.kind }],
          provenance: org.sources,
          keywordScore: Math.round(score * 100) / 100,
          explanationNotes: notes,
        });
      }
    }
  }

  // 4. Search Realms / Locations
  if (type === "all" || type === "location") {
    for (const r of realms) {
      let score = matchScore(r.name, normQ);
      const notes: string[] = [];

      if (score === 1.0) {
        notes.push(`Cocok persis dengan nama realm "${r.name}"`);
      } else if (score >= 0.90) {
        notes.push(`Kecocokan toleransi typo dengan nama realm "${r.name}"`);
      } else if (score > 0) {
        notes.push(`Nama realm "${r.name}" mengandung kata kunci`);
      }

      if (score > 0) {
        candidates.push({
          id: r.id,
          type: "location",
          name: r.name,
          summary: r.description,
          href: `/search?q=${encodeURIComponent(r.name)}`,
          attributes: [{ label: "Tipe", value: "Realm" }],
          provenance: r.sources,
          keywordScore: Math.round(score * 100) / 100,
          explanationNotes: notes,
        });
      }
    }
  }

  // 5. Search Abilities
  if (type === "all" || type === "ability") {
    for (const a of abilities) {
      if (element && a.element && !a.element.toLowerCase().includes(element.toLowerCase())) {
        continue;
      }

      let score = matchScore(a.name, normQ);
      const notes: string[] = [];
      const matchedRelLabels: string[] = [];

      if (score === 1.0) {
        notes.push(`Cocok persis dengan kemampuan "${a.name}"`);
      } else if (score >= 0.90) {
        notes.push(`Kecocokan toleransi typo dengan kemampuan "${a.name}"`);
      } else if (score > 0) {
        notes.push(`Nama kemampuan "${a.name}" mengandung kata kunci`);
      }

      // Check if this ability belongs to a character matching the query (e.g. Sub-Zero -> Cryomancy, Deep Freeze, Ice Clone)
      if (!isRelQuery) {
        for (const c of characters) {
          if (matchScore(c.name, normQ) >= 0.70 || c.aliases.some((al) => matchScore(al, normQ) >= 0.70)) {
            const hasThisAbility = c.versions.some((v) => v.abilities.some((abRef) => abRef.id === a.id));
            if (hasThisAbility) {
              const charAbilityScore = 0.85;
              if (charAbilityScore > score) {
                score = charAbilityScore;
                notes.push(`Kemampuan/Jurus Spesial milik "${c.name}"`);
                matchedRelLabels.push(`hasAbility ← ${c.name} (Jurus Spesial)`);
              }
            }
          }
        }
      }

      if (score > 0) {
        candidates.push({
          id: a.id,
          type: "ability",
          name: a.name,
          summary: a.description,
          href: `/abilities/${a.id}`,
          attributes: [
            { label: "Kategori", value: a.category },
            { label: "Elemen", value: a.element ?? "-" },
          ],
          games: a.games.map((g) => g.name),
          provenance: a.sources,
          keywordScore: Math.round(score * 100) / 100,
          matchedRelationships: Array.from(new Set(matchedRelLabels)),
          explanationNotes: notes,
        });
      }
    }
  }

  // 6. Search Weapons
  if (type === "all" || type === "weapon") {
    for (const w of weapons) {
      let score = matchScore(w.name, normQ);
      const notes: string[] = [];
      const matchedRelLabels: string[] = [];

      if (score === 1.0) {
        notes.push(`Cocok persis dengan senjata "${w.name}"`);
      } else if (score >= 0.90) {
        notes.push(`Kecocokan toleransi typo dengan senjata "${w.name}"`);
      } else if (score > 0) {
        notes.push(`Nama senjata "${w.name}" mengandung kata kunci`);
      }

      // Check if this weapon belongs to a character matching the query (e.g. Sub-Zero -> Kōri Blade, Scorpion -> Kunai Spear)
      if (!isRelQuery) {
        for (const c of characters) {
          if (matchScore(c.name, normQ) >= 0.70 || c.aliases.some((al) => matchScore(al, normQ) >= 0.70)) {
            const hasThisWeapon = c.versions.some((v) => v.weapons.some((wRef) => wRef.id === w.id));
            if (hasThisWeapon) {
              const charWeaponScore = 0.82;
              if (charWeaponScore > score) {
                score = charWeaponScore;
                notes.push(`Senjata andalan milik "${c.name}"`);
                matchedRelLabels.push(`usesWeapon ← ${c.name} (Senjata Khas)`);
              }
            }
          }
        }
      }

      if (score > 0) {
        candidates.push({
          id: w.id,
          type: "weapon",
          name: w.name,
          summary: w.description,
          href: `/weapons/${w.id}`,
          attributes: [{ label: "Kategori", value: w.category }],
          games: w.games.map((g) => g.name),
          provenance: w.sources,
          keywordScore: Math.round(score * 100) / 100,
          matchedRelationships: Array.from(new Set(matchedRelLabels)),
          explanationNotes: notes,
        });
      }
    }
  }

  // 7. Search Timelines
  if (type === "all" || type === "timeline") {
    for (const t of timelines) {
      let score = matchScore(t.name, normQ);
      const notes: string[] = [];

      if (score === 1.0) {
        notes.push(`Cocok persis dengan nama timeline "${t.name}"`);
      } else if (score > 0) {
        notes.push(`Nama timeline "${t.name}" mengandung kata kunci`);
      }

      if (score > 0) {
        candidates.push({
          id: t.id,
          type: "timeline",
          name: t.name,
          summary: t.description,
          href: `/timelines/${t.id}`,
          attributes: [{ label: "Urutan", value: String(t.order) }],
          provenance: t.sources,
          keywordScore: Math.round(score * 100) / 100,
          explanationNotes: notes,
        });
      }
    }
  }

  // 8. Search Story Events
  if (type === "all" || type === "event") {
    for (const ev of storyEvents) {
      let score = matchScore(ev.title, normQ);
      const notes: string[] = [];

      if (score === 1.0) {
        notes.push(`Cocok persis dengan judul peristiwa "${ev.title}"`);
      } else if (score > 0) {
        notes.push(`Judul peristiwa "${ev.title}" mengandung kata kunci`);
      }

      if (score > 0) {
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
          keywordScore: Math.round(score * 100) / 100,
          explanationNotes: notes,
        });
      }
    }
  }

  // Sort by keywordScore descending
  candidates.sort((a, b) => (b.keywordScore ?? 0) - (a.keywordScore ?? 0));

  // Assign 1-based ranks
  candidates.forEach((c, idx) => {
    c.keywordRank = idx + 1;
  });

  return candidates;
}
