import type {
  Ability,
  Character,
  EntityType,
  Game,
  ImageAsset,
  Organization,
  SearchMode,
  SearchResult,
  SourceRef,
  StoryEvent,
  Timeline,
  Weapon,
} from "../types";

/**
 * Recognized Entity Type from Query
 */
export interface RecognizedEntity {
  id: string;
  name: string;
  type: EntityType | "element" | "realm" | "species" | "platform";
  uri: string;
  confidence: number;
  matchedTokens: string[];
}

/**
 * Query Intent identified by NLQP
 */
export type QueryIntentType =
  | "character_by_ability_element"
  | "character_by_clan"
  | "character_by_realm"
  | "character_enemies_rivals"
  | "character_allies"
  | "character_mentor"
  | "character_by_game"
  | "character_by_timeline"
  | "character_cross_timeline"
  | "character_weapon"
  | "entity_relationship"
  | "game_by_year"
  | "game_by_platform"
  | "all_games_by_year"
  | "story_events"
  | "general_entity_lookup"
  | "free_keyword"
  | "no_match";

export interface ParsedQueryIntent {
  intentType: QueryIntentType;
  targetType: EntityType | "all";
  recognizedEntities: RecognizedEntity[];
  extractedAttributes: {
    element?: string;
    clan?: string;
    realm?: string;
    game?: string;
    timeline?: string;
    weapon?: string;
    platform?: string;
    relationshipType?: string;
    year?: string;
    mentor?: string;
  };
  cleanedText: string;
  generatedSparql?: string;
  confidence: number;
}

/**
 * Individual Search Match item before fusion
 */
export interface SearchCandidate {
  id: string;
  type: EntityType;
  name: string;
  summary: string;
  href: string;
  image?: ImageAsset;
  attributes: { label: string; value: string }[];
  timeline?: string;
  games?: string[];
  provenance?: SourceRef[];
  keywordScore?: number;
  keywordRank?: number;
  semanticScore?: number;
  semanticRank?: number;
  matchedRelationships?: string[];
  graphPath?: string[];
  explanationNotes?: string[];
}

/**
 * RRF Scored Candidate
 */
export interface FusedSearchResult extends SearchResult {
  rrfScore: number;
  keywordRank?: number;
  semanticRank?: number;
}

/**
 * Advanced Search Filter Options
 */
export interface AdvancedSearchParams {
  q?: string;
  mode?: SearchMode;
  types?: (EntityType | "all")[];
  games?: string[];
  timelines?: string[];
  elements?: string[];
  realms?: string[];
  factions?: string[];
  weaponCategories?: string[];
  verificationStatus?: string;
  limit?: number;
  offset?: number;
}
