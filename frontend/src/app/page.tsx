"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import SearchBar from "@/components/search/SearchBar";
import CharacterCard from "@/components/encyclopedia/CharacterCard";
import GameCard from "@/components/encyclopedia/GameCard";
import RealmCard from "@/components/encyclopedia/RealmCard";
import ClanCard from "@/components/encyclopedia/ClanCard";
import TimelineComponent from "@/components/encyclopedia/TimelineComponent";
import { characters, games, organizations, storyEvents, SEARCH_PROMPTS } from "@/lib/mock-data";

const REALMS_DATA = [
  {
    id: "earthrealm",
    name: "Earthrealm",
    description: "Alam asal umat manusia fana, dilindungi secara turun-temurun oleh Dewa Petir Raiden dan Dewan Elder Gods.",
    ruler: "Raiden / Fujin",
    inhabitants: "Manusia, Dewa Pelindung",
  },
  {
    id: "outworld",
    name: "Outworld",
    description: "Alam kekaisaran megah nan kejam yang memperluas wilayah kekuasaannya dengan menaklukkan dan menggabungkan dimensi lain.",
    ruler: "Shao Kahn / Kotal Kahn / Mileena",
    inhabitants: "Tarkatan, Shokan, Outworlders",
  },
  {
    id: "netherrealm",
    name: "Netherrealm",
    description: "Dimensi bawah tanah berapi yang menjadi tempat siksaan jiwa-jiwa berdosa, sarang iblis purba dan necromancer Quan Chi.",
    ruler: "Shinnok / Quan Chi",
    inhabitants: "Demons, Revenants, Specters",
  },
  {
    id: "edenia",
    name: "Edenia",
    description: "Alam firdaus yang subur, penuh keindahan, sihir kuno, dan umur panjang, pernah ditaklukkan dan dipaksa tunduk oleh Outworld.",
    ruler: "Queen Sindel / Princess Kitana",
    inhabitants: "Edenians",
  },
];

export default function Home() {
  const [selectedEra, setSelectedEra] = useState<string>("all");

  const featuredCharacters = useMemo(() => {
    const popularIds = ["scorpion", "sub-zero", "raiden", "liu-kang", "kitana", "shao-kahn"];
    const found = characters.filter((c) => popularIds.includes(c.id));
    return found.length >= 6 ? found : characters.slice(0, 6);
  }, []);

  const filteredGames = useMemo(() => {
    if (selectedEra === "all") return games.slice(0, 8);
    return games.filter((g) => g.era.toLowerCase().includes(selectedEra.toLowerCase())).slice(0, 8);
  }, [selectedEra]);

  const featuredEvents = useMemo(() => {
    return storyEvents.slice(0, 4);
  }, []);

  return (
    <div className="space-y-14 sm:space-y-20 pb-16">
      {/* 1. HERO SECTION (Modern Gaming Encyclopedia Hero) */}
      <section className="hero-encyclopedia border-b border-mk-border py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-mk-text sm:text-5xl lg:text-6xl leading-tight">
              Mortal Kombat <span className="text-mk-red">Encyclopedia</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-mk-muted leading-relaxed">
              Pusat ensiklopedia kanonikal Mortal Kombat. Jelajahi 61 petarung legendaris, 23 game mandiri, jurus magis, klan prajurit, dan kontinuitas alur cerita lintas era.
            </p>

            {/* Large Prominent Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto shadow-sm">
              <SearchBar autoFocus={false} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CHARACTERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-mk-border pb-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-mk-gold">
              Tokoh &amp; Petarung
            </span>
            <h2 className="font-heading text-2xl font-bold text-mk-text mt-0.5">
              Featured Characters
            </h2>
          </div>
          <Link
            href="/characters"
            className="text-xs font-semibold uppercase tracking-wider text-mk-red hover:underline inline-flex items-center gap-1"
          >
            Lihat Semua 61 Karakter →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featuredCharacters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </section>

      {/* 3. EXPLORE MORTAL KOMBAT GAMES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-mk-border pb-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-mk-gold">
              Katalog Game Mandiri
            </span>
            <h2 className="font-heading text-2xl font-bold text-mk-text mt-0.5">
              Explore Mortal Kombat Games
            </h2>
          </div>
          <Link
            href="/games"
            className="text-xs font-semibold uppercase tracking-wider text-mk-red hover:underline inline-flex items-center gap-1"
          >
            Semua 23 Game Standalone →
          </Link>
        </div>

        {/* Filter Era Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "all", label: "Semua Era" },
            { id: "Classic", label: "Classic Era (1992–1996)" },
            { id: "3D", label: "3D Era (1997–2006)" },
            { id: "Reboot", label: "Reboot Era (2011–2019)" },
            { id: "New Era", label: "New Era (2023+)" },
          ].map((era) => (
            <button
              key={era.id}
              type="button"
              onClick={() => setSelectedEra(era.id)}
              className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                selectedEra === era.id
                  ? "bg-mk-navy text-white font-bold shadow-xs"
                  : "bg-mk-card border border-mk-border text-mk-muted hover:border-mk-gold hover:text-mk-text"
              }`}
            >
              {era.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* 4. REALMS AND CLANS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="border-b border-mk-border pb-4 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-mk-gold">
            Geografi &amp; Faksi Dunia
          </span>
          <h2 className="font-heading text-2xl font-bold text-mk-text mt-0.5">
            Realms &amp; Clans
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Dimensi & Realm */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-mk-text flex items-center gap-2">
                <span className="text-mk-red">✦</span> Dimensi Alam Semesta (Realms)
              </h3>
              <Link
                href="/realms"
                className="text-xs font-semibold text-mk-gold hover:text-mk-red transition-colors"
              >
                Lihat 7 Dimensi →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {REALMS_DATA.map((realm) => (
                <RealmCard key={realm.id} realm={realm} />
              ))}
            </div>
          </div>

          {/* Klan & Organisasi */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-mk-text flex items-center gap-2">
              <span className="text-mk-gold">✦</span> Klan &amp; Faksi Pejuang (Clans)
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {organizations.slice(0, 4).map((clan) => (
                <ClanCard key={clan.id} clan={clan} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. STORY TIMELINE OVERVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-mk-border pb-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-mk-gold">
              Kronologi Narasi
            </span>
            <h2 className="font-heading text-2xl font-bold text-mk-text mt-0.5">
              Story Timeline
            </h2>
          </div>
          <Link
            href="/story"
            className="text-xs font-semibold uppercase tracking-wider text-mk-red hover:underline inline-flex items-center gap-1"
          >
            Buka Story Explorer Lengkap →
          </Link>
        </div>

        <div className="rounded border border-mk-border bg-mk-card p-6 shadow-2xs">
          <TimelineComponent events={featuredEvents} />
        </div>
      </section>
    </div>
  );
}
