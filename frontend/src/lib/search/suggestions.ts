import {
  abilities,
  characters,
  games,
  organizations,
  realms,
  timelines,
  weapons,
} from "../mock-data";
import { entityHref } from "../routes";
import type { Suggestion } from "../types";
import { matchAbbreviationOrSubsequence } from "./fuzzy-matcher";

export function generateSearchSuggestions(query: string, maxResults: number = 8): Suggestion[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const qNorm = q.replace(/[-_]/g, " ").trim();

  const results: { suggestion: Suggestion; score: number }[] = [];
  const seen = new Set<string>();

  const add = (
    id: string,
    label: string,
    type: Suggestion["type"],
    href: string,
    matchType: "exact" | "prefix" | "abbrev" | "substring" | "fuzzy",
    customScore?: number,
  ) => {
    if (seen.has(id)) return;
    seen.add(id);
    let score = 0;
    if (matchType === "exact") score = 100;
    else if (matchType === "prefix") score = 80;
    else if (matchType === "abbrev") score = 75;
    else if (matchType === "substring") score = 50;
    else score = customScore ?? 40;

    results.push({
      suggestion: { id, label, type, href },
      score,
    });
  };

  const addFuzzy = (
    id: string,
    label: string,
    type: Suggestion["type"],
    href: string,
    targets: string[],
    weight: number = 70,
  ) => {
    if (seen.has(id)) return;
    for (const t of targets) {
      const hit = matchAbbreviationOrSubsequence(t, q);
      if (hit) {
        const kind = hit.kind === "acronym" || hit.kind === "word_prefix" ? "abbrev" : "fuzzy";
        add(id, label, type, href, kind, Math.round(hit.score * weight));
        return;
      }
    }
  };

  // 1. Characters & aliases
  for (const c of characters) {
    const nameLower = c.name.toLowerCase();
    const nameNorm = nameLower.replace(/[-_]/g, " ").trim();

    if (nameLower === q || nameNorm === qNorm) {
      add(c.id, c.name, "character", entityHref({ id: c.id, type: "character", name: c.name }), "exact");
    } else if (nameLower.startsWith(q) || nameNorm.startsWith(qNorm)) {
      add(c.id, c.name, "character", entityHref({ id: c.id, type: "character", name: c.name }), "prefix");
    } else if (nameLower.includes(q) || nameNorm.includes(qNorm)) {
      add(c.id, c.name, "character", entityHref({ id: c.id, type: "character", name: c.name }), "substring");
    } else {
      for (const a of c.aliases) {
        const aLower = a.toLowerCase();
        const aNorm = aLower.replace(/[-_]/g, " ").trim();
        if (aLower === q || aNorm === qNorm) {
          add(c.id, `${c.name} (${a})`, "character", entityHref({ id: c.id, type: "character", name: c.name }), "exact");
        } else if (aLower.startsWith(q) || aNorm.startsWith(qNorm)) {
          add(c.id, `${c.name} (${a})`, "character", entityHref({ id: c.id, type: "character", name: c.name }), "prefix");
        }
      }
      if (!seen.has(c.id)) {
        addFuzzy(c.id, c.name, "character", entityHref({ id: c.id, type: "character", name: c.name }), [c.name]);
      }
    }

    // Relationship matching in suggestions (e.g. "musuh scorpion" or related characters when typing "sub zero")
    const isRel = /\b(musuh|enemy|enemies|rival|rivals|sekutu|ally|allies|mentor|guru)\b/i.test(q);
    if (isRel) {
      for (const rel of c.relationships) {
        const targetLower = rel.target.name.toLowerCase();
        const targetNorm = targetLower.replace(/[-_]/g, " ").trim();
        if (q.includes(targetLower) || qNorm.includes(targetNorm)) {
          const isEnemy = /\b(musuh|enemy|enemies|rival|rivals)\b/i.test(q) && (rel.type === "enemyOf" || rel.type === "rivalOf");
          const isAlly = /\b(sekutu|ally|allies)\b/i.test(q) && (rel.type === "allyOf" || rel.type === "alliedWith");
          const isMentor = /\b(mentor|guru)\b/i.test(q) && rel.type === "mentorOf";

          if (isEnemy || isAlly || isMentor) {
            add(
              `${c.id}-rel`,
              `${c.name} (${rel.label} ${rel.target.name})`,
              "character",
              entityHref({ id: c.id, type: "character", name: c.name }),
              "prefix"
            );
          }
        }
      }
    } else {
      // General character query (e.g. typing "sub zero"):
      // Suggest related characters such as "Scorpion (Musuh Sub-Zero)", "Noob Saibot (Keluarga Sub-Zero)"
      for (const rel of c.relationships) {
        const targetLower = rel.target.name.toLowerCase();
        const targetNorm = targetLower.replace(/[-_]/g, " ").trim();
        if (targetNorm === qNorm || targetNorm.startsWith(qNorm) || (qNorm.length >= 4 && targetNorm.includes(qNorm))) {
          add(
            `${c.id}-rel-${rel.target.id}`,
            `${c.name} (${rel.label} ${rel.target.name})`,
            "character",
            entityHref({ id: c.id, type: "character", name: c.name }),
            "substring"
          );
        }
      }
    }
  }

  // 2. Games
  for (const g of games) {
    const titleLower = g.title.toLowerCase();
    const titleNorm = titleLower.replace(/[-_]/g, " ").trim();
    const shortLower = g.shortTitle.toLowerCase();
    if (titleLower === q || titleNorm === qNorm || shortLower === q) add(g.id, g.title, "game", `/games/${g.id}`, "exact");
    else if (titleLower.startsWith(q) || titleNorm.startsWith(qNorm) || shortLower.startsWith(q)) add(g.id, g.title, "game", `/games/${g.id}`, "prefix");
    else if (titleLower.includes(q) || titleNorm.includes(qNorm)) add(g.id, g.title, "game", `/games/${g.id}`, "substring");
    else addFuzzy(g.id, g.title, "game", `/games/${g.id}`, [g.title, g.shortTitle]);
  }

  // 3. Organizations
  for (const o of organizations) {
    const oLower = o.name.toLowerCase();
    if (oLower === q) add(o.id, o.name, "organization", `/organizations/${o.id}`, "exact");
    else if (oLower.startsWith(q)) add(o.id, o.name, "organization", `/organizations/${o.id}`, "prefix");
    else if (oLower.includes(q)) add(o.id, o.name, "organization", `/organizations/${o.id}`, "substring");
    else addFuzzy(o.id, o.name, "organization", `/organizations/${o.id}`, [o.name]);
  }

  // 4. Abilities
  for (const a of abilities) {
    const aLower = a.name.toLowerCase();
    if (aLower === q) add(a.id, a.name, "ability", `/abilities/${a.id}`, "exact");
    else if (aLower.startsWith(q)) add(a.id, a.name, "ability", `/abilities/${a.id}`, "prefix");
    else if (aLower.includes(q)) add(a.id, a.name, "ability", `/abilities/${a.id}`, "substring");
    else addFuzzy(a.id, a.name, "ability", `/abilities/${a.id}`, [a.name], 68);
  }

  // 5. Weapons
  for (const w of weapons) {
    const wLower = w.name.toLowerCase();
    if (wLower === q) add(w.id, w.name, "weapon", `/weapons/${w.id}`, "exact");
    else if (wLower.startsWith(q)) add(w.id, w.name, "weapon", `/weapons/${w.id}`, "prefix");
    else if (wLower.includes(q)) add(w.id, w.name, "weapon", `/weapons/${w.id}`, "substring");
    else addFuzzy(w.id, w.name, "weapon", `/weapons/${w.id}`, [w.name], 68);
  }

  // 6. Timelines
  for (const t of timelines) {
    const tLower = t.name.toLowerCase();
    if (tLower === q) add(t.id, t.name, "timeline", `/timelines/${t.id}`, "exact");
    else if (tLower.startsWith(q)) add(t.id, t.name, "timeline", `/timelines/${t.id}`, "prefix");
    else if (tLower.includes(q)) add(t.id, t.name, "timeline", `/timelines/${t.id}`, "substring");
    else addFuzzy(t.id, t.name, "timeline", `/timelines/${t.id}`, [t.name], 68);
  }

  // 7. Realms and Resident Characters
  for (const r of realms) {
    const rLower = r.name.toLowerCase();
    const rId = r.id.toLowerCase();
    const isExact = rLower === q || rId === q || (r.id === "orderrealm" && (q === "orderrealm" || q === "seido"));
    const isPrefix = rLower.startsWith(q) || rId.startsWith(q) || (r.id === "orderrealm" && "orderrealm".startsWith(q));
    const isSub = rLower.includes(q) || rId.includes(q);

    if (isExact) add(r.id, r.name, "location", `/realms/${r.id}`, "exact");
    else if (isPrefix) add(r.id, r.name, "location", `/realms/${r.id}`, "prefix");
    else if (isSub) add(r.id, r.name, "location", `/realms/${r.id}`, "substring");

    // If query matches realm, suggest resident characters directly below
    if (isExact || (q.length >= 3 && (isPrefix || isSub))) {
      for (const c of characters) {
        const cRealmId = c.realm?.id?.toLowerCase() ?? "";
        const cRealmName = c.realm?.name?.toLowerCase() ?? "";
        if (cRealmId === rId || cRealmName.includes(rId) || rLower.includes(cRealmName)) {
          add(
            `${c.id}-from-${r.id}`,
            `${c.name} (Berasal dari ${r.name})`,
            "character",
            entityHref({ id: c.id, type: "character", name: c.name }),
            "substring"
          );
        }
      }
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, maxResults).map((r) => r.suggestion);
}
