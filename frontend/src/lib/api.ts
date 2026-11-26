/**
 * API client — integrasi frontend dengan API Anggota 2 (PRD Bagian 15).
 *
 * Mode:
 *  - NEXT_PUBLIC_USE_MOCK=true  (default) → memakai data contoh lokal (lib/mock-data.ts)
 *  - NEXT_PUBLIC_USE_MOCK=false           → memanggil API di NEXT_PUBLIC_API_BASE_URL (kosong = same-origin)
 *
 * Respons API boleh berbentuk objek langsung, `{ data: ... }`, atau untuk list
 * `[...]`, `{ items: [...] }`, `{ data: [...] }`, `{ results: [...] }`.
 */
import { abilities, characters, games, organizations, realms, storyEvents, timelines, weapons } from "./mock-data";
import { mockSearch, mockSuggestions } from "./mock-search";
import type {
  Ability,
  Character,
  EntityType,
  Game,
  Organization,
  Realm,
  SearchMode,
  SearchResponse,
  StoryEvent,
  Suggestion,
  Timeline,
  Weapon,
} from "./types";

export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";
const TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS ?? 10000);

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public kind: "network" | "timeout" | "not-found" | "server" | "bad-request" = "server",
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type Query = Record<string, string | number | undefined | null>;

function qs(params?: Query): string {
  if (!params) return "";
  const s = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== "") s.set(k, String(v));
  const str = s.toString();
  return str ? `?${str}` : "";
}

async function request<T>(path: string, init?: RequestInit & { query?: Query }): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${API_BASE}${path}${qs(init?.query)}`, {
      ...init,
      headers: { Accept: "application/json", ...(init?.body ? { "Content-Type": "application/json" } : {}), ...init?.headers },
      signal: controller.signal,
    });
    if (!res.ok) {
      let msg = `Permintaan gagal (${res.status})`;
      try {
        const body = await res.json();
        msg = body?.message ?? body?.error ?? msg;
      } catch {
        /* abaikan */
      }
      const kind = res.status === 404 ? "not-found" : res.status >= 400 && res.status < 500 ? "bad-request" : "server";
      throw new ApiError(msg, res.status, kind);
    }
    const json = await res.json();
    return (json && typeof json === "object" && "data" in json ? json.data : json) as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if ((err as Error).name === "AbortError") throw new ApiError("Server tidak merespons (timeout). Coba lagi.", undefined, "timeout");
    throw new ApiError("Tidak dapat terhubung ke server API.", undefined, "network");
  } finally {
    clearTimeout(timer);
  }
}

function asList<T>(raw: unknown): T[] {
  if (Array.isArray(raw)) return raw as T[];
  if (raw && typeof raw === "object") {
    const o = raw as Record<string, unknown>;
    for (const key of ["items", "results", "data"]) if (Array.isArray(o[key])) return o[key] as T[];
  }
  return [];
}

/** Simulasi latensi agar loading state terlihat saat mode mock */
const delay = <T,>(value: T, ms = 350) => new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

function mockFind<T extends { id: string }>(list: T[], id: string, label: string): Promise<T> {
  const item = list.find((x) => x.id === id);
  return item ? delay(item) : Promise.reject(new ApiError(`${label} "${id}" tidak ditemukan.`, 404, "not-found"));
}

// ---------------------------------------------------------------- Search
export async function search(params: { q: string; mode?: SearchMode; type?: EntityType | "all" }): Promise<SearchResponse> {
  const mode = params.mode ?? "hybrid";
  return request<SearchResponse>("/api/search", {
    query: {
      q: params.q,
      mode,
      type: params.type === "all" ? undefined : params.type,
    },
  });
}

export async function getSuggestions(q: string): Promise<Suggestion[]> {
  return asList<Suggestion>(await request("/api/search/suggestions", { query: { q } }));
}

// ---------------------------------------------------------------- Encyclopedia
export async function getCharacters(): Promise<Character[]> {
  if (USE_MOCK) return delay(characters);
  return asList<Character>(await request("/api/characters"));
}
export async function getCharacter(id: string): Promise<Character> {
  if (USE_MOCK) return mockFind(characters, id, "Karakter");
  return request<Character>(`/api/characters/${encodeURIComponent(id)}`);
}

export async function getGames(): Promise<Game[]> {
  if (USE_MOCK) return delay(games);
  return asList<Game>(await request("/api/games"));
}
export async function getGame(id: string): Promise<Game> {
  if (USE_MOCK) return mockFind(games, id, "Game");
  return request<Game>(`/api/games/${encodeURIComponent(id)}`);
}

export async function getAbilities(): Promise<Ability[]> {
  if (USE_MOCK) return delay(abilities);
  return asList<Ability>(await request("/api/abilities"));
}
export async function getAbility(id: string): Promise<Ability> {
  if (USE_MOCK) return mockFind(abilities, id, "Kemampuan");
  return request<Ability>(`/api/abilities/${encodeURIComponent(id)}`);
}

export async function getWeapons(): Promise<Weapon[]> {
  if (USE_MOCK) return delay(weapons);
  return asList<Weapon>(await request("/api/weapons"));
}
export async function getWeapon(id: string): Promise<Weapon> {
  if (USE_MOCK) return mockFind(weapons, id, "Senjata");
  return request<Weapon>(`/api/weapons/${encodeURIComponent(id)}`);
}

export async function getOrganizations(): Promise<Organization[]> {
  if (USE_MOCK) return delay(organizations);
  return asList<Organization>(await request("/api/organizations"));
}
export async function getOrganization(id: string): Promise<Organization> {
  if (USE_MOCK) return mockFind(organizations, id, "Klan/Organisasi");
  return request<Organization>(`/api/organizations/${encodeURIComponent(id)}`);
}

export async function getTimelines(): Promise<Timeline[]> {
  if (USE_MOCK) return delay([...timelines].sort((a, b) => a.order - b.order));
  return asList<Timeline>(await request("/api/timelines"));
}
export async function getTimeline(id: string): Promise<Timeline> {
  if (USE_MOCK) return mockFind(timelines, id, "Timeline");
  return request<Timeline>(`/api/timelines/${encodeURIComponent(id)}`);
}

export async function getRealms(): Promise<Realm[]> {
  if (USE_MOCK) return delay(realms);
  return asList<Realm>(await request("/api/realms"));
}
export async function getRealm(id: string): Promise<Realm> {
  if (USE_MOCK) return mockFind(realms, id, "Realm");
  return request<Realm>(`/api/realms/${encodeURIComponent(id)}`);
}

// ---------------------------------------------------------------- Story
export async function getStoryEvents(params?: { timeline?: string; character?: string; arc?: string; q?: string }): Promise<StoryEvent[]> {
  if (USE_MOCK) {
    const q = params?.q?.toLowerCase().trim();
    return delay(
      storyEvents
        .filter((e) => !params?.timeline || e.timeline.id === params.timeline)
        .filter((e) => !params?.character || e.participants.some((p) => p.id === params.character))
        .filter((e) => !params?.arc || e.arc === params.arc)
        .filter(
          (e) =>
            !q ||
            e.title.toLowerCase().includes(q) ||
            e.summary.toLowerCase().includes(q) ||
            e.participants.some((p) => p.name.toLowerCase().includes(q)),
        ),
    );
  }
  if (params?.q) {
    return asList<StoryEvent>(
      await request("/api/story/search", { method: "POST", body: JSON.stringify({ query: params.q, timeline: params.timeline, arc: params.arc, character: params.character }) }),
    );
  }
  return asList<StoryEvent>(await request("/api/story/events", { query: params }));
}

export async function getStoryEvent(id: string): Promise<StoryEvent> {
  if (USE_MOCK) return mockFind(storyEvents, id, "Peristiwa");
  return request<StoryEvent>(`/api/story/events/${encodeURIComponent(id)}`);
}

export async function getStoryTimeline(timeline?: string): Promise<StoryEvent[]> {
  if (USE_MOCK) {
    return delay(
      storyEvents
        .filter((e) => !timeline || e.timeline.id === timeline)
        .sort((a, b) => a.chronology - b.chronology),
    );
  }
  return asList<StoryEvent>(await request("/api/story/timeline", { query: { timeline } }));
}
