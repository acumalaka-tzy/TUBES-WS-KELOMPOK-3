import type { Ability, Character } from "./types";

export interface CharacterRecommendation {
  character: Character;
  score: number;
  reason: string;
  reasons: string[];
  primaryElement?: string;
  clanBadge?: string;
}

const ELEMENT_LABELS: Record<string, string> = {
  Ice: "Sesama Pengendali Es",
  Fire: "Sesama Pengendali Api",
  Lightning: "Sesama Pengendali Petir",
  Shadow: "Sesama Pengendali Bayangan",
  Soul: "Sesama Pengendali Jiwa",
  Wind: "Sesama Pengendali Angin",
  Blood: "Sesama Pengendali Darah",
  Acid: "Sesama Pengendali Asam",
  Energy: "Sesama Pengendali Energi",
  Teleportation: "Sama-sama Menguasai Teleportasi",
};

const RELATION_WEIGHTS: Record<string, { score: number; reason: string }> = {
  familyOf: { score: 50, reason: "Keluarga Kanonikal" },
  rivalOf: { score: 45, reason: "Rival Kanonikal" },
  alliedWith: { score: 42, reason: "Sekutu Kanonikal" },
  mentorOf: { score: 40, reason: "Mentor / Murid" },
  enemyOf: { score: 39, reason: "Musuh Bebuyutan" },
};

const SECONDARY_ELEMENTS = new Set(["Energy", "Teleportation"]);

const GENERIC_FACTIONS = new Set([
  "",
  "neutral",
  "independent",
  "independent / outworld",
  "none",
  "unknown",
]);

const GENERIC_SPECIES = new Set([
  "",
  "human",
  "mortal",
  "human / mortal",
]);

interface CharacterProfile {
  abilityIds: Set<string>;
  elements: string[];
  primaryElement?: string;
  clans: string[];
  clanBadge?: string;
  distinctSpecies: string[];
  realmName?: string;
}

function normalizeToken(value?: string): string {
  return (value ?? "").trim().toLowerCase();
}

function buildProfile(
  character: Character,
  abilityElementMap: Map<string, string>,
  charToAbilityIds: Map<string, Set<string>>,
): CharacterProfile {
  const abilityIds = new Set<string>(charToAbilityIds.get(character.id) ?? []);
  const clanSet = new Map<string, string>();

  for (const ver of character.versions ?? []) {
    for (const ab of ver.abilities ?? []) {
      abilityIds.add(ab.id);
    }
    for (const org of ver.organizations ?? []) {
      const norm = normalizeToken(org.name);
      if (norm && !GENERIC_FACTIONS.has(norm)) {
        clanSet.set(norm, org.name.trim());
      }
    }
  }

  if (character.faction) {
    const normFaction = normalizeToken(character.faction);
    if (normFaction && !GENERIC_FACTIONS.has(normFaction) && !clanSet.has(normFaction)) {
      clanSet.set(normFaction, character.faction.trim());
    }
  }

  const elementCounts = new Map<string, number>();
  for (const abId of abilityIds) {
    const el = abilityElementMap.get(abId);
    if (el) {
      elementCounts.set(el, (elementCounts.get(el) ?? 0) + 1);
    }
  }

  const elements = Array.from(elementCounts.entries())
    .sort((a, b) => {
      const aSec = SECONDARY_ELEMENTS.has(a[0]) ? 1 : 0;
      const bSec = SECONDARY_ELEMENTS.has(b[0]) ? 1 : 0;
      if (aSec !== bSec) return aSec - bSec;
      return b[1] - a[1];
    })
    .map(([el]) => el);

  const primaryElement = elements.find((e) => !SECONDARY_ELEMENTS.has(e)) ?? elements[0];

  const distinctSpecies = (character.species?.name ?? "")
    .split(/[/,&]/)
    .map((s) => s.trim())
    .filter((s) => s && !GENERIC_SPECIES.has(normalizeToken(s)));

  const clans = Array.from(clanSet.values());

  return {
    abilityIds,
    elements,
    primaryElement,
    clans,
    clanBadge: clans[0] ?? (character.faction && !GENERIC_FACTIONS.has(normalizeToken(character.faction)) ? character.faction : undefined),
    distinctSpecies,
    realmName: character.realm?.name?.trim(),
  };
}

/**
 * Menghitung 4–6 rekomendasi karakter paling mirip dan berkaitan dengan karakter aktif
 * berdasarkan relasi ontologi langsung, kesamaan elemen/jurus, klan/faksi, spesies, dan realm asal.
 */
export function getRecommendedCharacters(
  target: Character,
  allCharacters: Character[],
  allAbilities: Ability[] = [],
  limit = 6,
): CharacterRecommendation[] {
  const maxItems = Math.min(Math.max(limit, 4), 6);

  const abilityElementMap = new Map<string, string>();
  const charToAbilityIds = new Map<string, Set<string>>();

  for (const ab of allAbilities) {
    if (ab.element) {
      abilityElementMap.set(ab.id, ab.element.trim());
    }
    for (const ch of ab.characters ?? []) {
      if (!charToAbilityIds.has(ch.id)) {
        charToAbilityIds.set(ch.id, new Set());
      }
      charToAbilityIds.get(ch.id)!.add(ab.id);
    }
  }

  const targetProfile = buildProfile(target, abilityElementMap, charToAbilityIds);

  // Kumpulkan relasi langsung dari sisi target
  const directRelMap = new Map<string, { score: number; reason: string }>();
  for (const rel of target.relationships ?? []) {
    const info = RELATION_WEIGHTS[rel.type] ?? { score: 30, reason: rel.label || "Karakter Terkait" };
    const prev = directRelMap.get(rel.target.id);
    if (!prev || info.score > prev.score) {
      directRelMap.set(rel.target.id, info);
    }
  }
  for (const rc of target.relatedCharacters ?? []) {
    if (!directRelMap.has(rc.id)) {
      directRelMap.set(rc.id, { score: 25, reason: "Karakter Terkait" });
    }
  }

  const candidates: CharacterRecommendation[] = [];

  for (const candidate of allCharacters) {
    if (candidate.id === target.id) continue;

    const candProfile = buildProfile(candidate, abilityElementMap, charToAbilityIds);
    const reasonEntries: { score: number; text: string }[] = [];
    let totalScore = 0;

    // 1. Relasi ontologi langsung (cek dua arah agar konsisten meski hanya tercatat satu sisi)
    let relMatch = directRelMap.get(candidate.id);
    for (const revRel of candidate.relationships ?? []) {
      if (revRel.target.id === target.id) {
        const info = RELATION_WEIGHTS[revRel.type] ?? { score: 30, reason: revRel.label || "Karakter Terkait" };
        if (!relMatch || info.score > relMatch.score) {
          relMatch = info;
        }
      }
    }
    if (relMatch) {
      totalScore += relMatch.score;
      reasonEntries.push({ score: relMatch.score, text: relMatch.reason });
    }

    // 2. Kesamaan spesies khas (mis. Cryomancer, Edenian, God, Tarkatan)
    const targetSpeciesSet = new Set(targetProfile.distinctSpecies.map(normalizeToken));
    const sharedSpecies = candProfile.distinctSpecies.find((sp) =>
      targetSpeciesSet.has(normalizeToken(sp)),
    );
    if (sharedSpecies) {
      totalScore += 28;
      reasonEntries.push({ score: 46, text: `Sesama ${sharedSpecies}` });
    }

    // 3. Kesamaan elemen & jurus kemampuan
    const targetCoreEls = targetProfile.elements.filter((e) => !SECONDARY_ELEMENTS.has(e)).slice(0, 2);
    const candCoreEls = candProfile.elements.filter((e) => !SECONDARY_ELEMENTS.has(e)).slice(0, 2);
    const targetElSet = new Set(targetCoreEls.map(normalizeToken));
    const sharedCoreEls = candCoreEls.filter((el) => targetElSet.has(normalizeToken(el)));

    for (const el of sharedCoreEls) {
      totalScore += 35;
      reasonEntries.push({
        score: 38,
        text: ELEMENT_LABELS[el] ?? `Sesama Elemen ${el}`,
      });
    }

    // Elemen sekunder (Energy / Teleportation) diberi bobot lebih ringan agar elemen utama & relasi lebih dominan
    if (sharedCoreEls.length === 0) {
      const targetSecSet = new Set(
        targetProfile.elements.filter((e) => SECONDARY_ELEMENTS.has(e)).map(normalizeToken),
      );
      const sharedSec = candProfile.elements.find(
        (el) => SECONDARY_ELEMENTS.has(el) && targetSecSet.has(normalizeToken(el)),
      );
      if (sharedSec) {
        totalScore += 14;
        reasonEntries.push({
          score: 18,
          text: ELEMENT_LABELS[sharedSec] ?? `Sesama Elemen ${sharedSec}`,
        });
      }
    }

    let sharedAbilityCount = 0;
    for (const abId of candProfile.abilityIds) {
      if (targetProfile.abilityIds.has(abId)) sharedAbilityCount += 1;
    }
    if (sharedAbilityCount > 0) {
      const abPts = Math.min(sharedAbilityCount * 8, 24);
      totalScore += abPts;
      if (sharedCoreEls.length === 0) {
        reasonEntries.push({ score: abPts, text: "Kemampuan & Jurus Serupa" });
      }
    }

    // 4. Kesamaan klan / faksi / organisasi
    const targetClanSet = new Set(targetProfile.clans.map(normalizeToken));
    const sharedClan = candProfile.clans.find((cl) => targetClanSet.has(normalizeToken(cl)));
    if (sharedClan) {
      totalScore += 32;
      reasonEntries.push({ score: 43, text: `Rekan ${sharedClan}` });
    }

    // 5. Kesamaan realm asal
    if (
      targetProfile.realmName &&
      candProfile.realmName &&
      normalizeToken(targetProfile.realmName) === normalizeToken(candProfile.realmName)
    ) {
      totalScore += 16;
      reasonEntries.push({ score: 16, text: `Asal ${candProfile.realmName}` });
    }

    // Deduplikasi & urutkan alasan dari yang paling kuat/spesifik
    const seenReasons = new Set<string>();
    const sortedReasons = reasonEntries
      .sort((a, b) => b.score - a.score)
      .filter((r) => {
        if (seenReasons.has(r.text)) return false;
        seenReasons.add(r.text);
        return true;
      })
      .map((r) => r.text);

    if (totalScore > 0 && sortedReasons.length > 0) {
      candidates.push({
        character: candidate,
        score: totalScore,
        reason: sortedReasons[0],
        reasons: sortedReasons,
        primaryElement: candProfile.primaryElement,
        clanBadge: candProfile.clanBadge,
      });
    }
  }

  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const popDiff = Number(Boolean(b.character.popular)) - Number(Boolean(a.character.popular));
    if (popDiff !== 0) return popDiff;
    return a.character.name.localeCompare(b.character.name);
  });

  // Pastikan minimal 4 rekomendasi jika dataset kecil / karakter sangat unik
  const selected = candidates.slice(0, maxItems);
  if (selected.length < 4) {
    const selectedIds = new Set(selected.map((item) => item.character.id));
    for (const c of allCharacters) {
      if (selected.length >= 4) break;
      if (c.id === target.id || selectedIds.has(c.id)) continue;
      const prof = buildProfile(c, abilityElementMap, charToAbilityIds);
      const fallbackReason =
        target.role && c.role === target.role
          ? `Sesama ${c.role}`
          : "Petarung Mortal Kombat";
      selected.push({
        character: c,
        score: 1,
        reason: fallbackReason,
        reasons: [fallbackReason],
        primaryElement: prof.primaryElement,
        clanBadge: prof.clanBadge,
      });
      selectedIds.add(c.id);
    }
  }

  return selected;
}
