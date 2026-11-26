/**
 * Tipe data frontend — mengikuti PRD Bagian 17 (Data Model) & 29.4 (Image Asset).
 * Kontrak ini menjadi acuan integrasi dengan API (Anggota 2).
 */

export type EntityType =
  | "character"
  | "game"
  | "ability"
  | "weapon"
  | "organization"
  | "timeline"
  | "event"
  | "location"
  | "species";

export type VerificationStatus = "verified" | "pending-review" | "disputed" | "unverified";

export interface EntityRef {
  id: string;
  name: string;
  type: EntityType;
}

export interface SourceRef {
  id: string;
  title: string;
  url?: string;
  sourceType?: string;
  retrievedAt?: string;
  verificationStatus?: VerificationStatus;
}

export interface ImageAsset {
  assetId: string;
  assetURL?: string;
  assetType: "character_portrait" | "character_render" | "game_cover" | "game_key_art" | "gallery";
  entityId?: string;
  gameId?: string;
  characterVersionId?: string;
  rightsStatus: "approved" | "pending-review" | "rejected";
  attribution?: string;
  alt?: string;
}

export interface Relationship {
  type: string; // contoh: rivalOf, allyOf, mentorOf, familyOf
  label: string;
  target: EntityRef;
  context?: string; // contoh: "Timeline Baru (MK9–MK11)"
  verificationStatus: VerificationStatus;
}

export interface CharacterVersion {
  id: string;
  label: string;
  gameId: string;
  gameTitle: string;
  timelineId: string;
  timelineName: string;
  biography?: string;
  abilities: EntityRef[];
  weapons: EntityRef[];
  organizations: EntityRef[];
  image?: ImageAsset;
  verificationStatus: VerificationStatus;
}

export interface Character {
  id: string;
  name: string;
  aliases: string[];
  summary: string;
  biography: string;
  firstAppearance?: EntityRef;
  species?: EntityRef;
  realm?: EntityRef;
  faction?: string;
  role?: string;
  popular?: boolean;
  image?: ImageAsset;
  versions: CharacterVersion[];
  relationships: Relationship[];
  relatedCharacters: EntityRef[];
  sources: SourceRef[];
}

export type GameEra = "Classic Era" | "3D Era" | "Reboot Era" | "New Era" | "Spin-off";

export interface Game {
  id: string;
  title: string;
  shortTitle: string;
  releaseYear: number;
  platforms: string[];
  developer?: string;
  publisher?: string;
  gameType: string;
  era: GameEra;
  summary: string;
  timeline?: EntityRef;
  characters: EntityRef[];
  baseRoster?: EntityRef[];
  image?: ImageAsset;
  sources: SourceRef[];
}

export type AbilityCategory = "ability" | "special-move" | "fatality" | "brutality" | "friendship";

export interface Ability {
  id: string;
  name: string;
  category: AbilityCategory;
  element?: string | null;
  description: string;
  characters: EntityRef[];
  games: EntityRef[];
  sources: SourceRef[];
}

export interface Weapon {
  id: string;
  name: string;
  category: string;
  description: string;
  characters: EntityRef[];
  games: EntityRef[];
  relatedAbilities: EntityRef[];
  sources: SourceRef[];
}

export interface Realm {
  id: string;
  name: string;
  type: "location";
  description: string;
  href: string;
  ruler?: string;
  inhabitants?: string;
  sources: SourceRef[];
}

export interface Organization {
  id: string;
  name: string;
  kind: "clan" | "organization" | "faction";
  description: string;
  leader?: EntityRef;
  members: EntityRef[];
  rivals: EntityRef[];
  timelines: EntityRef[];
  events: EntityRef[];
  sources: SourceRef[];
}

export interface TimelineVersionRef {
  character: EntityRef;
  versionLabel: string;
}

export interface Timeline {
  id: string;
  name: string;
  description: string;
  order: number;
  games: EntityRef[];
  characterVersions: TimelineVersionRef[];
  relationshipChanges: string[];
  events: EntityRef[];
  sources: SourceRef[];
}

export interface StoryEvent {
  id: string;
  title: string;
  summary: string;
  detail?: string;
  timeline: EntityRef;
  game?: EntityRef;
  location?: string;
  arc?: string;
  eventType: string;
  participants: EntityRef[];
  chronology: number;
  chronologyType: "confirmed" | "inferred";
  causes: EntityRef[];
  consequences: EntityRef[];
  relatedEvents: EntityRef[];
  sources: SourceRef[];
  verificationStatus: VerificationStatus;
  spoiler?: boolean;
}

export type SearchMode = "keyword" | "semantic" | "hybrid";

export interface SearchResult {
  id: string;
  type: EntityType;
  name: string;
  summary: string;
  href: string;
  image?: ImageAsset;
  relevance: number; // 0..1
  attributes: { label: string; value: string }[];
  matchedRelationships: string[];
  timeline?: string;
  games?: string[];
  explanation?: string;
  graphPath?: string[];
  provenance?: SourceRef[];
}

export interface SearchResponse {
  query: string;
  mode: SearchMode;
  total: number;
  results: SearchResult[];
  status: "ok" | "ambiguous" | "unsupported";
  message?: string;
  suggestions?: string[];
  generatedSparql?: string;
  parsedIntent?: {
    intentType: string;
    targetType?: string;
    extractedAttributes?: Record<string, string | undefined>;
    confidence?: number;
  };
}

export interface Suggestion {
  id: string;
  label: string;
  type: EntityType;
  href: string;
}
