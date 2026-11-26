import type { EntityRef, EntityType } from "./types";

const BASE_PATH: Record<EntityType, string> = {
  character: "/characters",
  game: "/games",
  ability: "/abilities",
  weapon: "/weapons",
  organization: "/organizations",
  timeline: "/timelines",
  event: "/story/events",
  location: "/realms",
  species: "/search?q=",
};

export function entityHref(ref: Pick<EntityRef, "id" | "type" | "name">): string {
  if (ref.type === "species") {
    return `/search?q=${encodeURIComponent(ref.name)}`;
  }
  if (ref.type === "location") {
    return `/realms/${ref.id}`;
  }
  return `${BASE_PATH[ref.type]}/${ref.id}`;
}

export const TYPE_LABEL: Record<EntityType, string> = {
  character: "Karakter",
  game: "Game",
  ability: "Kemampuan",
  weapon: "Senjata",
  organization: "Klan / Organisasi",
  timeline: "Timeline",
  event: "Peristiwa",
  location: "Realm / Lokasi",
  species: "Spesies",
};

export interface NavItem {
  label: string;
  href: string;
}

/** Navigasi utama — PRD 7.1 & 25.3 */
export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Characters", href: "/characters" },
  { label: "Games", href: "/games" },
  { label: "Story", href: "/story" },
];

/** Kategori informasi ensiklopedia — dipakai di Landing & Explore */
export const CATEGORIES = [
  { label: "Karakter", href: "/characters", desc: "Biografi, versi karakter, kemampuan & relasi.", icon: "⚔" },
  { label: "Game", href: "/games", desc: "Seluruh seri dari Classic Era hingga New Era.", icon: "🎮" },
  { label: "Kemampuan & Jurus", href: "/abilities", desc: "Special move, fatality, brutality, friendship.", icon: "🔥" },
  { label: "Senjata", href: "/weapons", desc: "Senjata ikonik dan penggunanya.", icon: "🗡" },
  { label: "Klan & Organisasi", href: "/organizations", desc: "Shirai Ryu, Lin Kuei, Special Forces, dll.", icon: "🛡" },
  { label: "Timeline", href: "/timelines", desc: "Original, Timeline Baru, dan New Era.", icon: "⏳" },
  { label: "Story Explorer", href: "/story", desc: "Telusuri peristiwa & alur cerita.", icon: "📜" },
  { label: "Story Timeline", href: "/story/timeline", desc: "Urutan kronologis peristiwa per timeline.", icon: "🧭" },
];
