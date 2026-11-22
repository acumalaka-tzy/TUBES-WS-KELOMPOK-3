/**
 * Pencarian lokal berbasis data mock — meniru perilaku Keyword / Semantic / Hybrid
 * (PRD FR-02..FR-05) agar UI bisa diuji sebelum API Anggota 2 tersedia.
 */
import { abilities, characters, games, organizations, storyEvents, timelines, weapons } from "./mock-data";
import { entityHref } from "./routes";
import type { EntityType, SearchMode, SearchResponse, SearchResult, Suggestion } from "./types";
import { processNaturalLanguageQuery } from "./search/nlp/entity-recognizer";

interface Doc {
  id: string;
  type: EntityType;
  name: string;
  aliases: string[];
  summary: string;
  text: string;
  result: Omit<SearchResult, "relevance" | "explanation" | "matchedRelationships" | "graphPath">;
  semanticTags: { tag: string; relation: string; via: string }[];
}

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();

/** Sinonim/konsep sederhana untuk simulasi semantic search */
const CONCEPTS: { keys: string[]; tag: string }[] = [
  { keys: ["api", "fire", "flame", "hellfire", "panas"], tag: "Fire" },
  { keys: ["es", "ice", "beku", "dingin", "cryo", "freeze"], tag: "Ice" },
  { keys: ["petir", "lightning", "listrik", "thunder"], tag: "Lightning" },
  { keys: ["teleport", "teleportasi", "teleportation"], tag: "teleportation" },
  { keys: ["lin kuei", "lin-kuei"], tag: "lin-kuei" },
  { keys: ["shirai ryu", "shirai-ryu"], tag: "shirai-ryu" },
  { keys: ["special forces"], tag: "special-forces" },
  { keys: ["white lotus", "shaolin"], tag: "white-lotus" },
  { keys: ["musuh", "enemies", "enemy", "rival", "rivalitas"], tag: "rivalOf" },
  { keys: ["timeline", "sejarah", "changed the timeline", "mengubah"], tag: "Perubahan Timeline" },
];

function buildDocs(): Doc[] {
  const docs: Doc[] = [];

  for (const c of characters) {
    const latest = c.versions[c.versions.length - 1];
    const tags: Doc["semanticTags"] = [];
    for (const v of c.versions) {
      for (const a of v.abilities) {
        const abil = abilities.find((x) => x.id === a.id);
        if (abil?.element) tags.push({ tag: abil.element, relation: "hasAbility → hasElement", via: `${a.name} (${abil.element})` });
        tags.push({ tag: a.id, relation: "hasAbility", via: a.name });
      }
      for (const o of v.organizations) tags.push({ tag: o.id, relation: "memberOf", via: o.name });
    }
    for (const rel of c.relationships) tags.push({ tag: rel.type, relation: rel.type, via: rel.target.name });
    docs.push({
      id: c.id,
      type: "character",
      name: c.name,
      aliases: c.aliases,
      summary: c.summary,
      text: `${c.summary} ${c.biography} ${c.faction ?? ""}`,
      semanticTags: tags,
      result: {
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
      },
    });
  }

  for (const g of games) {
    docs.push({
      id: g.id, type: "game", name: g.title, aliases: [g.shortTitle], summary: g.summary, text: `${g.summary} ${g.era} ${g.platforms.join(" ")}`,
      semanticTags: [],
      result: { id: g.id, type: "game", name: g.title, summary: g.summary, href: `/games/${g.id}`, image: g.image, attributes: [{ label: "Tahun", value: String(g.releaseYear) }, { label: "Era", value: g.era }], timeline: g.timeline?.name, provenance: g.sources },
    });
  }

  for (const a of abilities) {
    docs.push({
      id: a.id, type: "ability", name: a.name, aliases: [], summary: a.description, text: `${a.description} ${a.element ?? ""} ${a.category}`,
      semanticTags: a.element ? [{ tag: a.element, relation: "hasElement", via: a.element }] : [],
      result: { id: a.id, type: "ability", name: a.name, summary: a.description, href: `/abilities/${a.id}`, attributes: [{ label: "Kategori", value: a.category }, { label: "Elemen", value: a.element ?? "-" }], games: a.games.map((g) => g.name), provenance: a.sources },
    });
  }

  for (const w of weapons) {
    docs.push({
      id: w.id, type: "weapon", name: w.name, aliases: [], summary: w.description, text: `${w.description} ${w.category}`, semanticTags: [],
      result: { id: w.id, type: "weapon", name: w.name, summary: w.description, href: `/weapons/${w.id}`, attributes: [{ label: "Kategori", value: w.category }], games: w.games.map((g) => g.name), provenance: w.sources },
    });
  }

  for (const o of organizations) {
    docs.push({
      id: o.id, type: "organization", name: o.name, aliases: [], summary: o.description, text: o.description,
      semanticTags: [{ tag: o.id, relation: "self", via: o.name }],
      result: { id: o.id, type: "organization", name: o.name, summary: o.description, href: `/organizations/${o.id}`, attributes: [{ label: "Jenis", value: o.kind }, { label: "Pemimpin", value: o.leader?.name ?? "-" }], provenance: o.sources },
    });
  }

  for (const t of timelines) {
    docs.push({
      id: t.id, type: "timeline", name: t.name, aliases: [], summary: t.description, text: t.description, semanticTags: [],
      result: { id: t.id, type: "timeline", name: t.name, summary: t.description, href: `/timelines/${t.id}`, attributes: [{ label: "Jumlah game", value: String(t.games.length) }], provenance: t.sources },
    });
  }

  for (const e of storyEvents) {
    docs.push({
      id: e.id, type: "event", name: e.title, aliases: [], summary: e.summary, text: `${e.summary} ${e.arc ?? ""} ${e.eventType}`,
      semanticTags: [
        { tag: e.eventType, relation: "eventType", via: e.eventType },
        ...e.participants.map((p) => ({ tag: p.id, relation: "hasParticipant", via: p.name })),
      ],
      result: { id: e.id, type: "event", name: e.title, summary: e.summary, href: `/story/events/${e.id}`, attributes: [{ label: "Jenis", value: e.eventType }, { label: "Lokasi", value: e.location ?? "-" }], timeline: e.timeline.name, games: e.game ? [e.game.name] : [], provenance: e.sources },
    });
  }
  return docs;
}

let DOCS: Doc[] | null = null;
const docs = () => (DOCS ??= buildDocs());

/** Levenshtein sederhana untuk fuzzy matching */
function distance(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

function lexicalScore(d: Doc, q: string): { score: number; why?: string } {
  const name = norm(d.name);
  if (name === q) return { score: 1, why: "Nama cocok persis" };
  const alias = d.aliases.find((a) => norm(a) === q || norm(a).includes(q));
  if (name.startsWith(q)) return { score: 0.9, why: "Awalan nama cocok" };
  if (name.includes(q)) return { score: 0.8, why: "Sebagian nama cocok" };
  if (alias) return { score: 0.75, why: `Alias cocok: "${alias}"` };
  const tokens = q.split(" ").filter((t) => t.length > 2);
  if (tokens.some((t) => name.split(" ").some((n) => n.length > 3 && distance(n, t) <= 1)))
    return { score: 0.6, why: "Fuzzy match (salah ketik ringan)" };
  if (tokens.length && tokens.every((t) => norm(d.text).includes(t))) return { score: 0.45, why: "Kata kunci ditemukan di deskripsi" };
  if (tokens.some((t) => name.includes(t))) return { score: 0.4, why: "Token nama cocok" };
  return { score: 0 };
}

function semanticScore(d: Doc, q: string): { score: number; why?: string; rels: string[]; path?: string[] } {
  const concepts = CONCEPTS.filter((c) => c.keys.some((k) => q.includes(k)));
  if (!concepts.length) return { score: 0, rels: [] };
  // Jika query menyebut nama entitas lain (mis. "scorpion and sub-zero"), gunakan sebagai konteks
  const mentioned = docs().filter((x) => x.type === "character" && q.includes(norm(x.name)));
  const rels: string[] = [];
  let path: string[] | undefined;
  for (const c of concepts) {
    const hit = d.semanticTags.find((t) => t.tag === c.tag && (!mentioned.length || c.tag !== "rivalOf" || mentioned.some((m) => norm(t.via) === norm(m.name))));
    if (hit) {
      rels.push(`${hit.relation}: ${hit.via}`);
      path ??= [d.name, hit.relation, hit.via];
    }
  }
  if (d.type === "organization" && concepts.some((c) => c.tag === d.id)) rels.push(`self: ${d.name}`);
  if (!rels.length) return { score: 0, rels: [] };
  const score = Math.min(0.95, 0.55 + 0.15 * rels.length);
  return { score, rels, path, why: `${d.name} ditemukan melalui relasi ${rels.join("; ")}.` };
}

export function mockSearch(query: string, mode: SearchMode, type?: EntityType | "all"): SearchResponse {
  const q = norm(query);
  if (q.length < 2) {
    return { query, mode, total: 0, results: [], status: "unsupported", message: "Query terlalu pendek. Masukkan minimal 2 karakter." };
  }
  const results: SearchResult[] = [];
  for (const d of docs()) {
    if (type && type !== "all" && d.type !== type) continue;
    const lex = mode !== "semantic" ? lexicalScore(d, q) : { score: 0 };
    const sem = mode !== "keyword" ? semanticScore(d, q) : { score: 0, rels: [] as string[] };
    // Hybrid: gabungan sederhana (mendekati Reciprocal Rank Fusion) tanpa duplikasi
    const score = mode === "hybrid" ? Math.min(1, Math.max(lex.score, sem.score) + (lex.score && sem.score ? 0.05 : 0)) : Math.max(lex.score, sem.score);
    if (score <= 0) continue;
    const explanation = [lex.score ? lex.why : null, sem.score && "why" in sem ? sem.why : null].filter(Boolean).join(" • ");
    results.push({
      ...d.result,
      relevance: Number(score.toFixed(2)),
      explanation,
      matchedRelationships: sem.rels,
      graphPath: "path" in sem ? sem.path : undefined,
    });
  }
  results.sort((a, b) => b.relevance - a.relevance);

  // Contoh deteksi ambiguitas: "sub-zero" merujuk ke dua orang (Bi-Han & Kuai Liang)
  const ambiguous = q === "sub zero" || q === "sub-zero";
  const intent = processNaturalLanguageQuery(query);

  return {
    query,
    mode,
    total: results.length,
    results,
    status: ambiguous ? "ambiguous" : "ok",
    message: ambiguous
      ? "\"Sub-Zero\" dapat merujuk ke Bi-Han atau Kuai Liang. Pilih versi karakter di halaman detail untuk konteks yang tepat."
      : undefined,
    suggestions: results.length ? undefined : ["Scorpion", "Lin Kuei", "Karakter yang menggunakan api", "Mortal Kombat 11"],
    generatedSparql: intent.generatedSparql,
    parsedIntent: {
      intentType: intent.intentType,
      targetType: intent.targetType,
      extractedAttributes: intent.extractedAttributes,
      confidence: intent.confidence,
    },
  };
}

export function mockSuggestions(query: string, limit = 8): Suggestion[] {
  const q = norm(query);
  if (!q) return [];
  return docs()
    .map((d) => ({ d, s: lexicalScore(d, q).score }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ d }) => ({ id: d.id, label: d.name, type: d.type, href: d.result.href }));
}
