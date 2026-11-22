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
import type { EntityType } from "../types";
import type { SearchCandidate } from "./types";

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(str: string): string[] {
  return normalizeString(str)
    .split(/\s+/)
    .filter((t) => t.length > 1);
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
  const normQ = normalizeString(query);
  const qTokens = tokenize(normQ);
  if (!normQ && (!options.type || options.type === "all")) {
    return [];
  }

  const { type = "all", game, timeline, element, faction } = options;
  const candidates: SearchCandidate[] = [];

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

      let score = 0;
      const notes: string[] = [];
      const normName = normalizeString(c.name);
      const normAliases = c.aliases.map(normalizeString);
      const normSummary = normalizeString(c.summary);
      const normBio = normalizeString(c.biography);

      if (normName === normQ) {
        score = 1.0;
        notes.push(`Cocok persis dengan nama karakter "${c.name}"`);
      } else if (normAliases.includes(normQ)) {
        score = 0.95;
        notes.push(`Cocok persis dengan alias karakter "${c.name}"`);
      } else if (normName.startsWith(normQ)) {
        score = 0.90;
        notes.push(`Nama karakter "${c.name}" diawali kata kunci`);
      } else if (normName.includes(normQ)) {
        score = 0.85;
        notes.push(`Nama karakter "${c.name}" mengandung kata kunci`);
      } else if (normAliases.some((a) => a.includes(normQ))) {
        score = 0.80;
        notes.push(`Alias karakter "${c.name}" mengandung kata kunci`);
      } else {
        // Token overlap scoring
        let matchedCount = 0;
        for (const token of qTokens) {
          if (normName.includes(token)) {
            matchedCount += 3;
          } else if (normAliases.some((a) => a.includes(token))) {
            matchedCount += 2.5;
          } else if (normSummary.includes(token)) {
            matchedCount += 1.5;
          } else if (normBio.includes(token)) {
            matchedCount += 1;
          }
        }
        if (qTokens.length > 0 && matchedCount > 0) {
          score = Math.min(0.75, (matchedCount / (qTokens.length * 3)) * 0.75);
          notes.push(`Ditemukan dalam deskripsi/biografi karakter "${c.name}"`);
        }
      }

      if (score > 0 || !normQ) {
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

      let score = 0;
      const notes: string[] = [];
      const normTitle = normalizeString(g.title);
      const normShort = normalizeString(g.shortTitle);
      const normSummary = normalizeString(g.summary);

      if (normTitle === normQ || normShort === normQ) {
        score = 1.0;
        notes.push(`Cocok persis dengan judul game "${g.title}"`);
      } else if (normTitle.includes(normQ) || normShort.includes(normQ)) {
        score = 0.85;
        notes.push(`Judul game "${g.title}" mengandung kata kunci`);
      } else {
        let matched = 0;
        for (const token of qTokens) {
          if (normTitle.includes(token) || normShort.includes(token)) matched += 2;
          else if (normSummary.includes(token)) matched += 1;
        }
        if (qTokens.length > 0 && matched > 0) {
          score = Math.min(0.70, (matched / (qTokens.length * 2)) * 0.70);
          notes.push(`Ditemukan dalam ringkasan game "${g.title}"`);
        }
      }

      if (score > 0 || !normQ) {
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

  // 3. Search Abilities
  if (type === "all" || type === "ability") {
    for (const a of abilities) {
      if (element && a.element && !a.element.toLowerCase().includes(element.toLowerCase())) {
        continue;
      }

      let score = 0;
      const notes: string[] = [];
      const normName = normalizeString(a.name);
      const normDesc = normalizeString(a.description);

      if (normName === normQ) {
        score = 1.0;
        notes.push(`Cocok persis dengan kemampuan "${a.name}"`);
      } else if (normName.includes(normQ)) {
        score = 0.85;
        notes.push(`Nama kemampuan "${a.name}" mengandung kata kunci`);
      } else {
        let matched = 0;
        for (const token of qTokens) {
          if (normName.includes(token)) matched += 2;
          else if (normDesc.includes(token)) matched += 1;
        }
        if (qTokens.length > 0 && matched > 0) {
          score = Math.min(0.70, (matched / (qTokens.length * 2)) * 0.70);
          notes.push(`Ditemukan dalam deskripsi kemampuan "${a.name}"`);
        }
      }

      if (score > 0 || !normQ) {
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
          explanationNotes: notes,
        });
      }
    }
  }

  // 4. Search Weapons
  if (type === "all" || type === "weapon") {
    for (const w of weapons) {
      let score = 0;
      const notes: string[] = [];
      const normName = normalizeString(w.name);
      const normDesc = normalizeString(w.description);

      if (normName === normQ) {
        score = 1.0;
        notes.push(`Cocok persis dengan senjata "${w.name}"`);
      } else if (normName.includes(normQ)) {
        score = 0.85;
        notes.push(`Nama senjata "${w.name}" mengandung kata kunci`);
      } else {
        let matched = 0;
        for (const token of qTokens) {
          if (normName.includes(token)) matched += 2;
          else if (normDesc.includes(token)) matched += 1;
        }
        if (qTokens.length > 0 && matched > 0) {
          score = Math.min(0.70, (matched / (qTokens.length * 2)) * 0.70);
          notes.push(`Ditemukan dalam deskripsi senjata "${w.name}"`);
        }
      }

      if (score > 0 || !normQ) {
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
          explanationNotes: notes,
        });
      }
    }
  }

  // 5. Search Organizations
  if (type === "all" || type === "organization") {
    for (const o of organizations) {
      let score = 0;
      const notes: string[] = [];
      const normName = normalizeString(o.name);
      const normDesc = normalizeString(o.description);

      if (normName === normQ) {
        score = 1.0;
        notes.push(`Cocok persis dengan organisasi/klan "${o.name}"`);
      } else if (normName.includes(normQ)) {
        score = 0.85;
        notes.push(`Nama organisasi/klan "${o.name}" mengandung kata kunci`);
      } else {
        let matched = 0;
        for (const token of qTokens) {
          if (normName.includes(token)) matched += 2;
          else if (normDesc.includes(token)) matched += 1;
        }
        if (qTokens.length > 0 && matched > 0) {
          score = Math.min(0.70, (matched / (qTokens.length * 2)) * 0.70);
          notes.push(`Ditemukan dalam deskripsi klan "${o.name}"`);
        }
      }

      if (score > 0 || !normQ) {
        candidates.push({
          id: o.id,
          type: "organization",
          name: o.name,
          summary: o.description,
          href: `/organizations/${o.id}`,
          attributes: [{ label: "Jenis", value: o.kind }],
          provenance: o.sources,
          keywordScore: Math.round(score * 100) / 100,
          explanationNotes: notes,
        });
      }
    }
  }

  // 6. Search Timelines
  if (type === "all" || type === "timeline") {
    for (const t of timelines) {
      let score = 0;
      const notes: string[] = [];
      const normName = normalizeString(t.name);
      const normDesc = normalizeString(t.description);

      if (normName === normQ) {
        score = 1.0;
        notes.push(`Cocok persis dengan timeline "${t.name}"`);
      } else if (normName.includes(normQ)) {
        score = 0.85;
        notes.push(`Nama timeline "${t.name}" mengandung kata kunci`);
      } else {
        let matched = 0;
        for (const token of qTokens) {
          if (normName.includes(token)) matched += 2;
          else if (normDesc.includes(token)) matched += 1;
        }
        if (qTokens.length > 0 && matched > 0) {
          score = Math.min(0.70, (matched / (qTokens.length * 2)) * 0.70);
          notes.push(`Ditemukan dalam ringkasan timeline "${t.name}"`);
        }
      }

      if (score > 0 || !normQ) {
        candidates.push({
          id: t.id,
          type: "timeline",
          name: t.name,
          summary: t.description,
          href: `/timelines/${t.id}`,
          attributes: [{ label: "Urutan Kronologi", value: `#${t.order}` }],
          provenance: t.sources,
          keywordScore: Math.round(score * 100) / 100,
          explanationNotes: notes,
        });
      }
    }
  }

  // 7. Search Story Events
  if (type === "all" || type === "event") {
    for (const e of storyEvents) {
      if (timeline && e.timeline.name && !e.timeline.name.toLowerCase().includes(timeline.toLowerCase())) {
        continue;
      }

      let score = 0;
      const notes: string[] = [];
      const normTitle = normalizeString(e.title);
      const normSummary = normalizeString(e.summary);

      if (normTitle === normQ) {
        score = 1.0;
        notes.push(`Cocok persis dengan judul peristiwa "${e.title}"`);
      } else if (normTitle.includes(normQ)) {
        score = 0.85;
        notes.push(`Judul peristiwa "${e.title}" mengandung kata kunci`);
      } else {
        let matched = 0;
        for (const token of qTokens) {
          if (normTitle.includes(token)) matched += 2;
          else if (normSummary.includes(token)) matched += 1;
        }
        if (qTokens.length > 0 && matched > 0) {
          score = Math.min(0.70, (matched / (qTokens.length * 2)) * 0.70);
          notes.push(`Ditemukan dalam deskripsi peristiwa "${e.title}"`);
        }
      }

      if (score > 0 || !normQ) {
        candidates.push({
          id: e.id,
          type: "event",
          name: e.title,
          summary: e.summary,
          href: `/story/events/${e.id}`,
          attributes: [
            { label: "Tipe", value: e.eventType },
            { label: "Timeline", value: e.timeline.name },
          ],
          timeline: e.timeline.name,
          provenance: e.sources,
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
