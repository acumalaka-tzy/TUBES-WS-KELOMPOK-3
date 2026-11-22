import { storyEvents } from "../mock-data";
import type { StoryEvent } from "../types";

export interface StorySearchParams {
  query?: string;
  timeline?: string;
  character?: string;
  arc?: string;
  eventType?: string;
  chronologyType?: "confirmed" | "inferred";
  limit?: number;
  offset?: number;
}

export interface StorySearchResponse {
  total: number;
  events: StoryEvent[];
  explanation: string;
}

const STORY_SYNONYMS: Record<string, string[]> = {
  tournament: ["turnamen", "turnamen mortal kombat"],
  turnamen: ["tournament", "turnamen"],
  invasion: ["invasi", "penyerangan"],
  invasi: ["invasion", "invasi"],
  war: ["perang", "pertempuran"],
  perang: ["war", "battle"],
  alliance: ["aliansi", "gencatan senjata", "perdamaian"],
  aliansi: ["alliance", "aliansi"],
  conflict: ["konflik", "permusuhan"],
  konflik: ["conflict", "konflik"],
  time: ["waktu", "timeline", "kronologi"],
  waktu: ["time", "timeline"],
};

export function searchStoryEvents(params: StorySearchParams): StorySearchResponse {
  const { query, timeline, character, arc, eventType, chronologyType, limit = 50, offset = 0 } = params;

  const rawQ = query?.toLowerCase().trim();
  let list = [...storyEvents];

  // 1. Timeline filter
  if (timeline && timeline !== "all") {
    list = list.filter(
      (e) =>
        e.timeline.id === timeline ||
        e.timeline.name.toLowerCase().includes(timeline.toLowerCase())
    );
  }

  // 2. Character participant filter
  if (character && character !== "all") {
    const charLower = character.toLowerCase();
    list = list.filter((e) =>
      e.participants.some(
        (p) =>
          p.id === character ||
          p.name.toLowerCase().includes(charLower)
      )
    );
  }

  // 3. Story Arc filter
  if (arc && arc !== "all") {
    list = list.filter((e) => e.arc && e.arc.toLowerCase().includes(arc.toLowerCase()));
  }

  // 4. Event Type filter
  if (eventType && eventType !== "all") {
    list = list.filter((e) => e.eventType.toLowerCase() === eventType.toLowerCase());
  }

  // 5. Chronology type filter
  if (chronologyType) {
    list = list.filter((e) => e.chronologyType === chronologyType);
  }

  // 6. Free text query matching with synonym expansion
  if (rawQ) {
    const searchTerms = [rawQ];
    for (const [key, syns] of Object.entries(STORY_SYNONYMS)) {
      if (rawQ.includes(key)) {
        searchTerms.push(...syns);
      }
    }

    list = list.filter((e) => {
      const inTitle = searchTerms.some((t) => e.title.toLowerCase().includes(t));
      const inSummary = searchTerms.some((t) => e.summary.toLowerCase().includes(t));
      const inDetail = e.detail ? searchTerms.some((t) => e.detail!.toLowerCase().includes(t)) : false;
      const inLocation = e.location ? searchTerms.some((t) => e.location!.toLowerCase().includes(t)) : false;
      const inArc = e.arc ? searchTerms.some((t) => e.arc!.toLowerCase().includes(t)) : false;
      const inParticipants = e.participants.some((p) =>
        searchTerms.some((t) => p.name.toLowerCase().includes(t))
      );
      return inTitle || inSummary || inDetail || inLocation || inArc || inParticipants;
    });
  }

  // Sort by chronology number
  list.sort((a, b) => a.chronology - b.chronology);

  const total = list.length;
  const paginated = list.slice(offset, offset + limit);

  // Generate explanation
  const explanations: string[] = [];
  if (rawQ) explanations.push(`kueri teks "${rawQ}"`);
  if (timeline && timeline !== "all") explanations.push(`timeline "${timeline}"`);
  if (character && character !== "all") explanations.push(`partisipan tokoh "${character}"`);
  if (arc && arc !== "all") explanations.push(`story arc "${arc}"`);

  const filterDesc = explanations.length > 0 ? `berdasarkan ${explanations.join(", ")}` : "seluruh peristiwa kanonikal";
  const explanation = `Menemukan ${total} peristiwa cerita ${filterDesc}, diurutkan secara kronologis.`;

  return {
    total,
    events: paginated,
    explanation,
  };
}
