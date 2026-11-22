import {
  abilities,
  characters,
  games,
  organizations,
  timelines,
  weapons,
} from "../mock-data";
import { entityHref } from "../routes";
import type { Suggestion } from "../types";

export function generateSearchSuggestions(query: string, maxResults: number = 8): Suggestion[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: { suggestion: Suggestion; score: number }[] = [];
  const seen = new Set<string>();

  const add = (id: string, label: string, type: Suggestion["type"], href: string, matchType: "exact" | "prefix" | "substring") => {
    if (seen.has(id)) return;
    seen.add(id);
    let score = 0;
    if (matchType === "exact") score = 100;
    else if (matchType === "prefix") score = 80;
    else score = 50;

    results.push({
      suggestion: { id, label, type, href },
      score,
    });
  };

  // 1. Characters & aliases
  for (const c of characters) {
    const nameLower = c.name.toLowerCase();
    if (nameLower === q) add(c.id, c.name, "character", entityHref({ id: c.id, type: "character", name: c.name }), "exact");
    else if (nameLower.startsWith(q)) add(c.id, c.name, "character", entityHref({ id: c.id, type: "character", name: c.name }), "prefix");
    else if (nameLower.includes(q)) add(c.id, c.name, "character", entityHref({ id: c.id, type: "character", name: c.name }), "substring");
    else {
      for (const a of c.aliases) {
        const aLower = a.toLowerCase();
        if (aLower === q) add(c.id, `${c.name} (${a})`, "character", entityHref({ id: c.id, type: "character", name: c.name }), "exact");
        else if (aLower.startsWith(q)) add(c.id, `${c.name} (${a})`, "character", entityHref({ id: c.id, type: "character", name: c.name }), "prefix");
      }
    }
  }

  // 2. Games
  for (const g of games) {
    const titleLower = g.title.toLowerCase();
    const shortLower = g.shortTitle.toLowerCase();
    if (titleLower === q || shortLower === q) add(g.id, g.title, "game", `/games/${g.id}`, "exact");
    else if (titleLower.startsWith(q) || shortLower.startsWith(q)) add(g.id, g.title, "game", `/games/${g.id}`, "prefix");
    else if (titleLower.includes(q)) add(g.id, g.title, "game", `/games/${g.id}`, "substring");
  }

  // 3. Organizations
  for (const o of organizations) {
    const oLower = o.name.toLowerCase();
    if (oLower === q) add(o.id, o.name, "organization", `/organizations/${o.id}`, "exact");
    else if (oLower.startsWith(q)) add(o.id, o.name, "organization", `/organizations/${o.id}`, "prefix");
    else if (oLower.includes(q)) add(o.id, o.name, "organization", `/organizations/${o.id}`, "substring");
  }

  // 4. Abilities
  for (const a of abilities) {
    const aLower = a.name.toLowerCase();
    if (aLower === q) add(a.id, a.name, "ability", `/abilities/${a.id}`, "exact");
    else if (aLower.startsWith(q)) add(a.id, a.name, "ability", `/abilities/${a.id}`, "prefix");
    else if (aLower.includes(q)) add(a.id, a.name, "ability", `/abilities/${a.id}`, "substring");
  }

  // 5. Weapons
  for (const w of weapons) {
    const wLower = w.name.toLowerCase();
    if (wLower === q) add(w.id, w.name, "weapon", `/weapons/${w.id}`, "exact");
    else if (wLower.startsWith(q)) add(w.id, w.name, "weapon", `/weapons/${w.id}`, "prefix");
    else if (wLower.includes(q)) add(w.id, w.name, "weapon", `/weapons/${w.id}`, "substring");
  }

  // 6. Timelines
  for (const t of timelines) {
    const tLower = t.name.toLowerCase();
    if (tLower === q) add(t.id, t.name, "timeline", `/timelines/${t.id}`, "exact");
    else if (tLower.startsWith(q)) add(t.id, t.name, "timeline", `/timelines/${t.id}`, "prefix");
    else if (tLower.includes(q)) add(t.id, t.name, "timeline", `/timelines/${t.id}`, "substring");
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, maxResults).map((r) => r.suggestion);
}
