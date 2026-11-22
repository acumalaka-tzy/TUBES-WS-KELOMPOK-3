"""
Entity Resolution and Canonical Mapping Processor
Implements PRD v1.5 FR-26 & Section 28.12:
Resolves character aliases, variants, and multi-source mentions to canonical identifiers,
handles timeline-specific contextual disambiguation (Bi-Han as Sub-Zero vs Noob Saibot),
detects duplicates, and merges scraped candidates with canonical seed knowledge.
"""

from typing import Dict, Any, List, Optional, Tuple
import re

class EntityResolver:
    """Resolves aliases, contextual timeline identities, and merges multi-source entities."""

    def __init__(self, base_uri: str = "https://example.org/mk/"):
        self.base_uri = base_uri

        # Explicit canonical alias mapping
        self.alias_map: Dict[str, str] = {
            # Scorpion aliases
            "hanzo hasashi": "character-scorpion",
            "scorpion": "character-scorpion",
            "grandmaster hasashi": "character-scorpion",
            "spectre scorpion": "character-scorpion",
            "shirai ryu scorpion": "character-scorpion",

            # Sub-Zero & Kuai Liang
            "kuai liang": "character-subzero",
            "sub-zero": "character-subzero",
            "grandmaster sub-zero": "character-subzero",
            "tundra": "character-subzero",

            # Bi-Han default (disambiguated contextually below)
            "bi-han": "character-noobsaibot",
            "bi han": "character-noobsaibot",
            "noob saibot": "character-noobsaibot",
            "noob-saibot": "character-noobsaibot",
            "shadow wraith": "character-noobsaibot",

            # Raiden
            "lord raiden": "character-raiden",
            "raiden": "character-raiden",
            "thunder god raiden": "character-raiden",
            "dark raiden": "character-raiden",
            "god of thunder": "character-raiden",

            # Liu Kang
            "liu kang": "character-liukang",
            "fire god liu kang": "character-liukang",
            "champion liu kang": "character-liukang",
            "shaolin monk liu kang": "character-liukang",

            # Johnny Cage & Sonya
            "johnny cage": "character-johnnycage",
            "john carlton": "character-johnnycage",
            "sonya blade": "character-sonyablade",
            "general blade": "character-sonyablade",
            "general sonya blade": "character-sonyablade",

            # Jax & Kung Lao
            "jax briggs": "character-jax",
            "major briggs": "character-jax",
            "jackson briggs": "character-jax",
            "kung lao": "character-kunglao",

            # Kitana & Mileena
            "kitana": "character-kitana",
            "princess kitana": "character-kitana",
            "kitana kahn": "character-kitana",
            "mileena": "character-mileena",
            "empress mileena": "character-mileena",

            # Sorcerers & Bosses
            "shang tsung": "character-shangtsung",
            "quan chi": "character-quanchi",
            "shao kahn": "character-shaokahn",
            "general shao": "character-shaokahn",
            "shinnok": "character-shinnok",
            "onaga": "character-onaga",
            "dragon king": "character-onaga",
            "kronika": "character-kronika",
            "geras": "character-geras",
            "cetrion": "character-cetrion",

            # Special Forces / Next Gen
            "cassie cage": "character-cassiecage",
            "jacqui briggs": "character-jacqui",
            "jacqueline briggs": "character-jacqui",
            "takeda": "character-takeda",
            "takeda takahashi": "character-takeda",
            "kung jin": "character-kungjin",

            # Other primary fighters
            "kano": "character-kano",
            "baraka": "character-baraka",
            "reptile": "character-reptile",
            "syzoth": "character-reptile",
            "smoke": "character-smoke",
            "tomas vrbada": "character-smoke",
            "cyrax": "character-cyrax",
            "sektor": "character-sektor",
            "kabal": "character-kabal",
            "stryker": "character-stryker",
            "kurtis stryker": "character-stryker",
            "sheeva": "character-sheeva",
            "nightwolf": "character-nightwolf",
            "grey cloud": "character-nightwolf",
            "sindel": "character-sindel",
            "queen sindel": "character-sindel",
            "jade": "character-jade",
            "d'vorah": "character-dvorah",
            "dvorah": "character-dvorah",
            "kotal kahn": "character-kotalkahn",
            "erron black": "character-erronblack",
            "kenshi": "character-kenshi",
            "kenshi takahashi": "character-kenshi",
            "bo' rai cho": "character-boraicho",
            "bo rai cho": "character-boraicho",
            "li mei": "character-limei",
            "tanya": "character-tanya",
            "havik": "character-havik",
            "hotaru": "character-hotaru",
            "ashrah": "character-ashrah",
            "nitara": "character-nitara",
            "sareena": "character-sareena",
            "mavado": "character-mavado",
            "shujinko": "character-shujinko",
            "reiko": "character-reiko",
            "frost": "character-frost",
            "goro": "character-goro",
            "kintaro": "character-kintaro",
            "motaro": "character-motaro",
            "blaze": "character-blaze",
            "daegon": "character-daegon",
            "taven": "character-taven",
            "ferra & torr": "character-ferratorr",
            "ferra/torr": "character-ferratorr"
        }

    def disambiguate_identity(self, name: str, context_text: str = "", timeline_id: Optional[str] = None) -> str:
        """
        Disambiguates contextual identities where lore identity changes across games or timelines.
        Crucial rules per PRD & Section 5:
        1. Bi-Han:
           - In MK1 (1992) or MK Mythologies or Sub-Zero Lin Kuei context -> 'character-subzero'
           - In Netherrealm / Wraith / MK2+ revenant context -> 'character-noobsaibot'
        2. Kuai Liang:
           - In New Era (timeline-new-era / MK1 2023) -> 'character-scorpion' (Kuai Liang is Scorpion)
           - In Original / Reboot -> 'character-subzero'
        """
        norm_name = name.lower().strip()
        norm_ctx = context_text.lower()

        # Bi-Han Disambiguation
        if "bi-han" in norm_name or "bi han" in norm_name:
            if any(term in norm_ctx for term in ["mythologies", "original sub-zero", "cryomancer grandmaster", "mk1", "1992"]):
                return "character-subzero"
            return "character-noobsaibot"

        # Kuai Liang Disambiguation in New Era
        if "kuai liang" in norm_name:
            if timeline_id == "timeline-new-era" or "new era" in norm_ctx or "mk1 2023" in norm_ctx or "brother of bi-han" in norm_ctx and "fire" in norm_ctx:
                return "character-scorpion"
            return "character-subzero"

        # General alias lookup
        return self.resolve_canonical_id(name, category="character")

    def resolve_canonical_realm(self, realm_str: str) -> str:
        """Normalizes any realm string or origin text to canonical realm ID."""
        if not realm_str:
            return "realm-earthrealm"
        norm = realm_str.lower().strip()
        if any(r in norm for r in ["earth", "usa", "japan", "china", "chicago", "america", "asia"]):
            return "realm-earthrealm"
        elif any(r in norm for r in ["outworld", "sun do", "kuatan", "zaterra"]):
            return "realm-outworld"
        elif any(r in norm for r in ["nether", "hell", "underworld"]):
            return "realm-netherrealm"
        elif "edenia" in norm:
            return "realm-edenia"
        elif any(r in norm for r in ["order", "seido"]):
            return "realm-orderrealm"
        elif "chaos" in norm:
            return "realm-chaosrealm"
        elif "vaeternus" in norm:
            return "realm-vaeternus"
        return "realm-earthrealm"

    def resolve_canonical_id(self, name_or_alias: str, category: str = "character") -> str:
        """Resolve a name or alias to canonical ID."""
        cleaned = name_or_alias.lower().strip()
        cleaned_no_punct = re.sub(r"[^\w\s-]", "", cleaned)

        if category == "character":
            if cleaned in self.alias_map:
                return self.alias_map[cleaned]
            if cleaned_no_punct in self.alias_map:
                return self.alias_map[cleaned_no_punct]
            slug = re.sub(r"\s+", "-", cleaned_no_punct)
            return f"character-{slug}"

        elif category == "game":
            slug = re.sub(r"[^\w\s-]", "", cleaned).replace(" ", "-")
            return f"game-{slug}"

        elif category == "ability":
            slug = re.sub(r"[^\w\s-]", "", cleaned).replace(" ", "-")
            return f"ability-{slug}"

        elif category == "weapon":
            slug = re.sub(r"[^\w\s-]", "", cleaned).replace(" ", "-")
            return f"weapon-{slug}"

        elif category == "clan":
            slug = re.sub(r"[^\w\s-]", "", cleaned).replace(" ", "-")
            return f"org-{slug}"

        elif category == "realm":
            slug = re.sub(r"[^\w\s-]", "", cleaned).replace(" ", "-")
            return f"realm-{slug}"

        elif category == "location":
            slug = re.sub(r"[^\w\s-]", "", cleaned).replace(" ", "-")
            return f"location-{slug}"

        slug = re.sub(r"[^\w\s-]", "", cleaned).replace(" ", "-")
        return f"mk-{slug}"

    def merge_entities(self, primary: Dict[str, Any], incoming: Dict[str, Any]) -> Dict[str, Any]:
        """
        Merges scraped candidate entity with canonical seed entity.
        Preserves canonical verified fields, enriches descriptions and provenance.
        """
        merged = dict(primary)

        # Enrich description if incoming is longer and relevant
        p_desc = primary.get("description", "")
        i_desc = incoming.get("description", "")
        if len(i_desc) > len(p_desc) and not p_desc.startswith("Verified"):
            merged["description"] = i_desc

        # Merge alternate names
        alt_names = set(primary.get("alternateNames", []))
        if primary.get("alternateName"):
            alt_names.add(primary["alternateName"])
        if incoming.get("alternateName"):
            alt_names.add(incoming["alternateName"])
        if alt_names:
            merged["alternateNames"] = list(alt_names)

        # Merge lists without duplicates
        for list_key in ["abilities", "weapons", "platforms", "participants"]:
            if list_key in primary or list_key in incoming:
                p_items = primary.get(list_key, [])
                i_items = incoming.get(list_key, [])
                merged[list_key] = list(dict.fromkeys(p_items + i_items))

        # Provenance collection
        provenance = primary.get("provenanceTrail", [])
        if not provenance and primary.get("sourceURL"):
            provenance.append({
                "sourceURL": primary["sourceURL"],
                "retrievedAt": primary.get("retrievedAt", "2026-11-20T10:00:00Z"),
                "authority": primary.get("verificationStatus", "verified")
            })

        if incoming.get("sourceURL") and not any(p["sourceURL"] == incoming["sourceURL"] for p in provenance):
            provenance.append({
                "sourceURL": incoming["sourceURL"],
                "retrievedAt": incoming.get("retrievedAt", "2026-11-22T12:00:00Z"),
                "authority": incoming.get("verificationStatus", "partially_verified")
            })
        merged["provenanceTrail"] = provenance

        return merged

    def find_potential_duplicates(self, entities: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Identify potential duplicate entities based on normalized name or identical source URL."""
        seen_names: Dict[str, str] = {}
        duplicates = []

        for e in entities:
            eid = e.get("id", "")
            name = e.get("name") or e.get("eventTitle") or ""
            norm_name = re.sub(r"[^\w]", "", name.lower())

            if norm_name in seen_names and seen_names[norm_name] != eid:
                duplicates.append({
                    "entityIdA": seen_names[norm_name],
                    "entityIdB": eid,
                    "normalizedName": norm_name,
                    "reason": "Normalized name clash across distinct IDs"
                })
            else:
                seen_names[norm_name] = eid

        return duplicates
