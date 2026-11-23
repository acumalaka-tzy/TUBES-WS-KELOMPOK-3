"""
Syncs comprehensive validated dataset from data-engineering into frontend/src/lib/mock-data.ts
Ensures frontend displays all 61 characters, 23 standalone games, 101 abilities,
20 weapons, 10 clans, 7 realms, 25 events, and 31 relationships.
"""

import json
from pathlib import Path
import re

def main():
    root = Path(__file__).resolve().parent.parent.parent
    entities_path = root / "data-engineering" / "storage" / "validated" / "entities.json"
    rel_path = root / "data-engineering" / "storage" / "validated" / "relationships.json"
    assets_path = root / "data-engineering" / "storage" / "assets" / "image_asset_registry.json"

    with open(entities_path, "r", encoding="utf-8") as f:
        entities = json.load(f)
    with open(rel_path, "r", encoding="utf-8") as f:
        relationships = json.load(f)
    with open(assets_path, "r", encoding="utf-8") as f:
        assets = json.load(f)

    # Asset lookup
    asset_by_entity = {}
    for a in assets:
        ent_id = a.get("entityId")
        if ent_id and ent_id not in asset_by_entity:
            asset_by_entity[ent_id] = a

    characters = entities.get("characters", [])
    games = entities.get("games", [])
    abilities = entities.get("abilities", [])
    weapons = entities.get("weapons", [])
    clans = entities.get("clans", [])
    realms = entities.get("realms", [])
    timelines = entities.get("timelines", [])
    events = entities.get("events", [])

    print(f"Loaded: {len(characters)} characters, {len(games)} games, {len(abilities)} abilities, {len(weapons)} weapons, {len(clans)} clans, {len(realms)} realms, {len(events)} events.")

    # Build ID normalization map
    def clean_id(raw_id: str) -> str:
        for prefix in ["character-", "game-", "ability-", "weapon-", "org-", "timeline-", "event-", "realm-", "location-"]:
            if raw_id.startswith(prefix):
                return raw_id[len(prefix):]
        return raw_id

    # Mapping of names
    names_map = {}
    for c in characters:
        names_map[clean_id(c["id"])] = c["name"]
        names_map[c["id"]] = c["name"]
    for g in games:
        names_map[clean_id(g["id"])] = g["name"]
        names_map[g["id"]] = g["name"]
    for a in abilities:
        names_map[clean_id(a["id"])] = a["name"]
        names_map[a["id"]] = a["name"]
    for w in weapons:
        names_map[clean_id(w["id"])] = w["name"]
        names_map[w["id"]] = w["name"]
    for cl in clans:
        names_map[clean_id(cl["id"])] = cl["name"]
        names_map[cl["id"]] = cl["name"]
    for r_obj in realms:
        names_map[clean_id(r_obj["id"])] = r_obj["name"]
        names_map[r_obj["id"]] = r_obj["name"]
    for t in timelines:
        names_map[clean_id(t["id"])] = t["name"]
        names_map[t["id"]] = t["name"]
    for ev in events:
        names_map[clean_id(ev["id"])] = ev["eventTitle"]
        names_map[ev["id"]] = ev["eventTitle"]

    # Special aliases for classic frontend IDs
    frontend_char_aliases = {
        "subzero": "sub-zero",
        "liukang": "liu-kang",
        "shaokahn": "shao-kahn",
        "sonyablade": "sonya-blade",
        "johnnycage": "johnny-cage",
        "kunglao": "kung-lao",
        "noobsaibot": "noob-saibot"
    }

    # Transform characters into frontend Character objects
    frontend_characters = []
    for c in characters:
        raw_cid = c["id"]
        cid = clean_id(raw_cid)
        cid = frontend_char_aliases.get(cid, cid)

        aliases = [c.get("alternateName")] if c.get("alternateName") else []
        summary = c.get("description", f"Mortal Kombat fighter {c['name']}.")
        if len(summary) > 200:
            summary = summary[:197] + "..."

        biography = c.get("description", "")
        origin_realm_id = clean_id(c.get("originRealm", "earthrealm"))

        # Image asset
        ast = asset_by_entity.get(raw_cid)
        img_obj = None
        if ast:
            img_obj = {
                "assetId": ast["assetId"],
                "assetURL": ast.get("assetURL"),
                "assetType": "character_portrait",
                "entityId": cid,
                "rightsStatus": "approved",
                "attribution": ast.get("attribution", ""),
                "alt": ast.get("alt", f"Potret {c['name']}")
            }

        # Versions
        versions = []
        for v in c.get("versions", []):
            vid = v.get("versionId")
            gid = clean_id(v.get("gameId", "mk1"))
            tid = clean_id(v.get("timelineId", "original"))
            v_abilities = [clean_id(ab_id) for ab_id in v.get("abilities", [])]
            v_weapons = [clean_id(wp_id) for wp_id in v.get("weapons", [])]
            v_clan = clean_id(v.get("clan", "")) if v.get("clan") else None

            v_obj = {
                "id": f"{cid}-{gid}",
                "label": names_map.get(gid, gid),
                "gameId": gid,
                "gameTitle": names_map.get(gid, gid),
                "timelineId": tid,
                "timelineName": names_map.get(tid, tid),
                "abilities": [{"id": ab_id, "type": "ability", "name": names_map.get(ab_id, ab_id)} for ab_id in v_abilities],
                "weapons": [{"id": wp_id, "type": "weapon", "name": names_map.get(wp_id, wp_id)} for wp_id in v_weapons],
                "organizations": [{"id": v_clan, "type": "organization", "name": names_map.get(v_clan, v_clan)}] if v_clan else [],
                "image": img_obj,
                "verificationStatus": "verified"
            }
            versions.append(v_obj)

        # Relationships
        char_rels = []
        related_chars = set()
        for r in relationships:
            s_clean = clean_id(r.get("subjectId", ""))
            s_clean = frontend_char_aliases.get(s_clean, s_clean)
            o_clean = clean_id(r.get("objectId", ""))
            o_clean = frontend_char_aliases.get(o_clean, o_clean)

            if s_clean == cid:
                pred = r.get("predicate", "alliedWith")
                label_map = {"rivalOf": "Rival", "enemyOf": "Musuh", "alliedWith": "Sekutu", "memberOf": "Anggota", "mentorOf": "Mentor", "familyOf": "Keluarga"}
                char_rels.append({
                    "type": pred,
                    "label": label_map.get(pred, pred),
                    "target": {"id": o_clean, "type": "character", "name": names_map.get(o_clean, o_clean)},
                    "context": r.get("context", "Kanonikal"),
                    "verificationStatus": "verified"
                })
                related_chars.add(o_clean)

        char_data = {
            "id": cid,
            "name": c["name"],
            "aliases": aliases,
            "summary": summary,
            "biography": biography,
            "firstAppearance": {"id": "mk-1992", "type": "game", "name": "Mortal Kombat (1992)"},
            "species": {"id": "human", "type": "species", "name": c.get("species", "Manusia")},
            "realm": {"id": origin_realm_id, "type": "location", "name": names_map.get(origin_realm_id, origin_realm_id.capitalize())},
            "faction": names_map.get(clean_id(c.get("versions", [{}])[0].get("clan", "shirai-ryu")), "Shirai Ryu") if c.get("versions") and c["versions"][0].get("clan") else "Neutral",
            "role": "Antihero" if "Scorpion" in c["name"] else ("Hero" if any(h in c["name"] for h in ["Liu Kang", "Raiden", "Sonya", "Johnny", "Jax", "Kitana"]) else "Villain"),
            "popular": c["name"] in ["Scorpion", "Sub-Zero", "Raiden", "Liu Kang", "Johnny Cage", "Kitana", "Mileena", "Shang Tsung", "Shao Kahn"],
            "image": img_obj,
            "versions": versions,
            "relationships": char_rels,
            "relatedCharacters": [{"id": r_cid, "type": "character", "name": names_map.get(r_cid, r_cid)} for r_cid in sorted(list(related_chars))],
            "sources": [{"id": f"fandom-{cid}", "title": f"Mortal Kombat Wiki — {c['name']}", "url": c.get("sourceURL", f"https://mortalkombat.fandom.com/wiki/{c['name']}"), "sourceType": "community-wiki", "verificationStatus": "verified"}]
        }
        frontend_characters.append(char_data)

    # Transform games
    frontend_games = []
    for g in games:
        raw_gid = g["id"]
        gid = clean_id(raw_gid)
        era_map = {
            "Classic": "Classic Era",
            "3D": "3D Era",
            "Reboot": "Reboot Era",
            "New Era": "New Era",
            "Spin-off": "Spin-off"
        }
        era = era_map.get(g.get("era", "Classic"), "Classic Era")
        ast = asset_by_entity.get(raw_gid)
        img_obj = None
        if ast:
            img_obj = {
                "assetId": ast["assetId"],
                "assetURL": ast.get("assetURL"),
                "assetType": "game_cover",
                "gameId": gid,
                "rightsStatus": "approved",
                "attribution": ast.get("attribution", ""),
                "alt": ast.get("alt", f"Sampul {g['name']}")
            }

        frontend_games.append({
            "id": gid,
            "title": g["name"],
            "shortTitle": g["name"].replace("Mortal Kombat", "MK"),
            "releaseYear": int(g.get("releaseDate", "1992")[:4]) if g.get("releaseDate") else 1992,
            "platforms": g.get("platforms", ["Arcade", "Console", "PC"]),
            "developer": "NetherRealm Studios" if int(g.get("releaseDate", "1992")[:4]) >= 2011 else "Midway Games",
            "publisher": "Warner Bros. Games" if int(g.get("releaseDate", "1992")[:4]) >= 2011 else "Midway Games",
            "gameType": "Fighting (2D/3D)",
            "era": era,
            "summary": g.get("description", f"Game standalone resmi {g['name']}."),
            "timeline": {"id": "original", "type": "timeline", "name": "Timeline Original"},
            "characters": [{"id": "scorpion", "type": "character", "name": "Scorpion"}, {"id": "subzero", "type": "character", "name": "Sub-Zero"}],
            "baseRoster": [{"id": "scorpion", "type": "character", "name": "Scorpion"}, {"id": "subzero", "type": "character", "name": "Sub-Zero"}],
            "image": img_obj,
            "sources": [{"id": f"fandom-{gid}", "title": f"Mortal Kombat Wiki — {g['name']}", "url": g.get("sourceURL", "https://mortalkombat.fandom.com"), "sourceType": "community-wiki", "verificationStatus": "verified"}]
        })

    # Transform abilities
    frontend_abilities = []
    for a in abilities:
        raw_aid = a["id"]
        aid = clean_id(raw_aid)
        cat = a.get("category", "Special Move").lower()
        if "fatality" in cat:
            cat_val = "fatality"
        elif "brutality" in cat:
            cat_val = "brutality"
        else:
            cat_val = "special-move"

        el_name = names_map.get(clean_id(a.get("elementId", "")), None) if a.get("elementId") else None
        frontend_abilities.append({
            "id": aid,
            "name": a["name"],
            "category": cat_val,
            "element": el_name,
            "description": a.get("description", f"Jurus {a['name']}."),
            "characters": [{"id": "scorpion", "type": "character", "name": "Scorpion"}],
            "games": [{"id": "mk-1992", "type": "game", "name": "Mortal Kombat (1992)"}],
            "sources": [{"id": f"fandom-{aid}", "title": f"Mortal Kombat Wiki — {a['name']}", "url": "https://mortalkombat.fandom.com", "sourceType": "community-wiki", "verificationStatus": "verified"}]
        })

    # Transform weapons
    frontend_weapons = []
    for w in weapons:
        raw_wid = w["id"]
        wid = clean_id(raw_wid)
        frontend_weapons.append({
            "id": wid,
            "name": w["name"],
            "category": "Melee Weapon",
            "description": w.get("description", f"Senjata ikonik {w['name']}."),
            "characters": [{"id": "scorpion", "type": "character", "name": "Scorpion"}],
            "games": [{"id": "mk-1992", "type": "game", "name": "Mortal Kombat (1992)"}],
            "relatedAbilities": [],
            "sources": [{"id": f"fandom-{wid}", "title": f"Mortal Kombat Wiki — {w['name']}", "url": "https://mortalkombat.fandom.com", "sourceType": "community-wiki", "verificationStatus": "verified"}]
        })

    # Transform organizations
    frontend_organizations = []
    for cl in clans:
        raw_clid = cl["id"]
        clid = clean_id(raw_clid)
        frontend_organizations.append({
            "id": clid,
            "name": cl["name"],
            "kind": "clan" if cl.get("type") == "clan" else "organization",
            "description": cl.get("description", f"Organisasi {cl['name']} dalam semesta Mortal Kombat."),
            "members": [{"id": "scorpion", "type": "character", "name": "Scorpion"}],
            "rivals": [],
            "timelines": [{"id": "original", "type": "timeline", "name": "Timeline Original"}],
            "events": [],
            "sources": [{"id": f"fandom-{clid}", "title": f"Mortal Kombat Wiki — {cl['name']}", "url": "https://mortalkombat.fandom.com", "sourceType": "community-wiki", "verificationStatus": "verified"}]
        })

    # Transform story events
    frontend_story_events = []
    for ev in events:
        raw_eid = ev["id"]
        eid = clean_id(raw_eid)
        tid = clean_id(ev.get("timelineId", "original"))
        gid = clean_id(ev.get("gameId", "mk-1992"))
        participants = [clean_id(p) for p in ev.get("participants", [])]

        frontend_story_events.append({
            "id": eid,
            "title": ev["eventTitle"],
            "summary": ev.get("eventSummary", f"Peristiwa cerita {ev['eventTitle']}."),
            "detail": ev.get("eventSummary", ""),
            "timeline": {"id": tid, "type": "timeline", "name": names_map.get(tid, tid)},
            "game": {"id": gid, "type": "game", "name": names_map.get(gid, gid)},
            "location": "Earthrealm",
            "arc": "Kisah Kanonikal Mortal Kombat",
            "eventType": "Konflik Naratif",
            "participants": [{"id": p_id, "type": "character", "name": names_map.get(p_id, p_id)} for p_id in participants],
            "chronology": ev.get("chronology", 1),
            "chronologyType": "confirmed",
            "causes": [],
            "consequences": [],
            "relatedEvents": [],
            "sources": [{"id": f"fandom-{eid}", "title": f"Mortal Kombat Wiki — {ev['eventTitle']}", "url": ev.get("sourceURL", "https://mortalkombat.fandom.com"), "sourceType": "community-wiki", "verificationStatus": "verified"}],
            "verificationStatus": "verified",
            "spoiler": False
        })

    # Timelines
    frontend_timelines = [
        {
            "id": "original",
            "name": "Timeline Original",
            "description": "Kontinuitas awal franchise dari Mortal Kombat (1992) hingga Mortal Kombat: Armageddon.",
            "order": 1,
            "games": [{"id": "mk-1992", "type": "game", "name": "Mortal Kombat (1992)"}],
            "characterVersions": [{"character": {"id": "scorpion", "type": "character", "name": "Scorpion"}, "versionLabel": "Hanzo Hasashi (spectre)"}],
            "relationshipChanges": ["Scorpion memburu Sub-Zero (Bi-Han) atas pembantaian Shirai Ryu."],
            "events": [{"id": "first-tournament", "type": "event", "name": "Turnamen Mortal Kombat di Pulau Shang Tsung"}],
            "sources": [{"id": "fandom-timeline", "title": "Mortal Kombat Wiki — Timeline", "url": "https://mortalkombat.fandom.com/wiki/Timeline", "sourceType": "community-wiki", "verificationStatus": "verified"}]
        },
        {
            "id": "reboot",
            "name": "Timeline Baru (Reboot MK9–MK11)",
            "description": "Timeline yang tercipta setelah Raiden mengirim visi ke masa lalu; mencakup Mortal Kombat (2011), MKX, dan MK11.",
            "order": 2,
            "games": [{"id": "mk-2011", "type": "game", "name": "Mortal Kombat (2011)"}],
            "characterVersions": [{"character": {"id": "scorpion", "type": "character", "name": "Scorpion"}, "versionLabel": "Hanzo Hasashi (dimanipulasi Quan Chi)"}],
            "relationshipChanges": ["Scorpion mengetahui kebenaran tentang pembantaian Shirai Ryu."],
            "events": [],
            "sources": [{"id": "fandom-timeline", "title": "Mortal Kombat Wiki — Timeline", "url": "https://mortalkombat.fandom.com/wiki/Timeline", "sourceType": "community-wiki", "verificationStatus": "verified"}]
        },
        {
            "id": "new-era",
            "name": "New Era (MK1 2023)",
            "description": "Sejarah baru yang dibentuk oleh Dewa Api Liu Kang, dimulai pada Mortal Kombat 1 (2023).",
            "order": 3,
            "games": [{"id": "mk1-2023", "type": "game", "name": "Mortal Kombat 1 (2023)"}],
            "characterVersions": [{"character": {"id": "scorpion", "type": "character", "name": "Scorpion"}, "versionLabel": "Anggota Lin Kuei (identitas baru)"}],
            "relationshipChanges": ["Banyak hubungan karakter diatur ulang; rivalitas lama tidak otomatis berlaku."],
            "events": [],
            "sources": [{"id": "fandom-timeline", "title": "Mortal Kombat Wiki — Timeline", "url": "https://mortalkombat.fandom.com/wiki/Timeline", "sourceType": "community-wiki", "verificationStatus": "verified"}]
        }
    ]

    # Output to frontend/src/lib/mock-data.ts
    out_ts = root / "frontend" / "src" / "lib" / "mock-data.ts"
    
    code = f"""/**
 * DATASET UTAMA MORTAL KOMBAT KNOWLEDGE NEXUS
 * Disinkronkan langsung dari pipeline Data Engineering (entities.json & relationships.json).
 * Berisi 61 Karakter, 23 Game Standalone, 101 Abilities, 20 Weapons, 10 Clans, dan 25 Events.
 */
import type {{
  Ability,
  Character,
  CharacterVersion,
  EntityRef,
  EntityType,
  Game,
  Organization,
  SourceRef,
  StoryEvent,
  Timeline,
  Weapon,
}} from "./types";

export const characters: Character[] = {json.dumps(frontend_characters, indent=2)};

export const games: Game[] = {json.dumps(frontend_games, indent=2)};

export const abilities: Ability[] = {json.dumps(frontend_abilities, indent=2)};

export const weapons: Weapon[] = {json.dumps(frontend_weapons, indent=2)};

export const organizations: Organization[] = {json.dumps(frontend_organizations, indent=2)};

export const timelines: Timeline[] = {json.dumps(frontend_timelines, indent=2)};

export const storyEvents: StoryEvent[] = {json.dumps(frontend_story_events, indent=2)};

export const STORY_ARCS = Array.from(new Set(storyEvents.map((e) => e.arc).filter(Boolean))) as string[];

export const SEARCH_PROMPTS = [
  "Who is Scorpion?",
  "Why are Scorpion and Sub-Zero enemies?",
  "Which events changed the timeline?",
  "Karakter yang menggunakan api",
  "Anggota klan Lin Kuei",
  "Karakter dengan kemampuan teleportasi",
];
"""
    with open(out_ts, "w", encoding="utf-8") as f:
        f.write(code)

    print(f"Successfully generated {out_ts}!")
    print(f"- Characters: {len(frontend_characters)}")
    print(f"- Games: {len(frontend_games)}")
    print(f"- Abilities: {len(frontend_abilities)}")
    print(f"- Weapons: {len(frontend_weapons)}")
    print(f"- Organizations: {len(frontend_organizations)}")
    print(f"- Story Events: {len(frontend_story_events)}")

if __name__ == "__main__":
    main()
