"""
Media Scope Filter for Mortal Kombat Knowledge Nexus
Implements PRD v1.5 Section 5.2, 6.1 & Master Prompt Section 3:
Restricts dataset exclusively to standalone Mortal Kombat video games.
Filters out entities exclusive to films, TV series, comics, novels, promotional content, and DLC.
"""

from typing import Dict, Any, List, Set, Tuple, Optional
import re
from pathlib import Path
import json

class MediaScopeFilter:
    """Filters out entities originating exclusively from non-game media or DLC."""

    def __init__(self):
        # Media categories outside video game scope
        self.non_game_media_terms = [
            "movie", "film", "1995 film", "2021 film", "annihilation",
            "television", "tv series", "conquest", "defenders of the realm",
            "comic", "malibu comics", "novel", "novelization", "soundtrack",
            "promotional", "merchandise", "guest character", "kombat pack",
            "dlc", "expansion"
        ]

        # Explicit registry of non-game media exclusive characters to filter
        self.non_game_exclusive_characters: Dict[str, str] = {
            "aavi": "TV Series: Mortal Kombat: Conquest exclusive character",
            "abacus": "Comic: Malibu Comics exclusive character",
            "allison young": "Film: Mortal Kombat (1995) novelization exclusive character",
            "art lean": "Film: Mortal Kombat (1995) movie exclusive martial artist",
            "baphomet": "Comic: Malibu Comics exclusive demon lord",
            "cole young": "Film: Mortal Kombat (2021) cinematic protagonist",
            "siang": "Comic: Malibu Comics fusion warrior",
            "hydro": "Comic: Malibu Comics Lin Kuei cyborg (non-standalone canon)",
            "vapor": "Comic: Malibu Comics character",
            "grum": "Comic: Malibu Comics six-armed mutant",
            "siro": "TV Series: Mortal Kombat: Conquest protagonist bodyguard",
            "taja": "TV Series: Mortal Kombat: Conquest protagonist thief",
            "kreeya": "TV Series: Mortal Kombat: Conquest warrior empress",
            "vorpax": "TV Series: Mortal Kombat: Conquest assassin priestess",
            "quon": "TV Series: Mortal Kombat: Conquest merchant",
            "jola": "TV Series: Mortal Kombat: Conquest warrior",
            "shang tsung's guard": "Generic film/show extra",
            "master boyd": "Film: Mortal Kombat (1995) martial arts instructor"
        }

        # Guest DLC registry
        self.dlc_exclusive_characters: Dict[str, str] = {
            "spawn": "DLC Guest: Kombat Pack 1 exclusive (MK11)",
            "terminator": "DLC Guest: Kombat Pack 1 exclusive (MK11)",
            "robocop": "DLC Guest: Aftermath Expansion exclusive (MK11)",
            "joker": "DLC Guest: Kombat Pack 1 exclusive (MK11)",
            "the joker": "DLC Guest: Kombat Pack 1 exclusive (MK11)",
            "homelander": "DLC Guest: Kombat Pack 1 exclusive (MK1)",
            "peacemaker": "DLC Guest: Kombat Pack 1 exclusive (MK1)",
            "omni-man": "DLC Guest: Kombat Pack 1 exclusive (MK1)",
            "conan": "DLC Guest: Kombat Pack 2 exclusive (MK1)",
            "conan the barbarian": "DLC Guest: Kombat Pack 2 exclusive (MK1)",
            "ghostface": "DLC Guest: Kombat Pack 2 exclusive (MK1)",
            "t-1000": "DLC Guest: Kombat Pack 2 exclusive (MK1)",
            "leatherface": "DLC Guest: Kombat Pack 2 exclusive (MKX)",
            "alien": "DLC Guest: Kombat Pack 2 exclusive (MKX)",
            "predator": "DLC Guest: Kombat Pack 1 exclusive (MKX)",
            "jason voorhees": "DLC Guest: Kombat Pack 1 exclusive (MKX)",
            "jason": "DLC Guest: Kombat Pack 1 exclusive (MKX)"
        }

    def evaluate_entity(
        self,
        name: str,
        categories: Optional[List[str]] = None,
        content: str = ""
    ) -> Tuple[bool, Optional[str]]:
        """
        Evaluates whether an entity is within the standalone video game media scope.
        Returns (is_allowed, exclusion_reason).
        """
        clean_name = name.lower().strip()
        slug_name = re.sub(r"[^\w\s]", "", clean_name).strip()

        # 1. Check Guest DLC registry
        for k, reason in self.dlc_exclusive_characters.items():
            k_clean = k.lower().strip()
            k_slug = re.sub(r"[^\w\s]", "", k_clean).strip()
            if clean_name == k_clean or slug_name == k_slug or clean_name == k_slug or slug_name == k_clean:
                return False, reason

        # 2. Check Non-game media registry
        for k, reason in self.non_game_exclusive_characters.items():
            k_clean = k.lower().strip()
            k_slug = re.sub(r"[^\w\s]", "", k_clean).strip()
            if clean_name == k_clean or slug_name == k_slug or clean_name == k_slug or slug_name == k_clean:
                return False, reason

        # 3. Check categories for non-game media tags
        if categories:
            for cat in categories:
                norm_cat = cat.lower()
                for term in self.non_game_media_terms:
                    if term in norm_cat:
                        # Allow if also has video game category
                        if not any("game" in c.lower() or "playable" in c.lower() for c in categories):
                            return False, f"Categorized under non-game media: '{cat}'"

        # 4. Check content for exclusive film/comic keywords without game mentions
        content_lower = content.lower()
        if "malibu comics" in content_lower and not any(term in content_lower for term in ["mortal kombat (1992)", "mkii", "mk3", "playable in"]):
            return False, "Context indicates comic-exclusive character"

        return True, None

    def export_exclusion_report(
        self,
        excluded_entities: List[Dict[str, Any]],
        output_path: str = "data-engineering/storage/reports/media_scope_exclusion_report.json"
    ) -> Dict[str, Any]:
        """Saves audit report of entities excluded due to media scope boundaries."""
        report = {
            "reportId": "media-scope-exclusion-audit",
            "policy": "PRD Section 5.2 & 6.1 (Standalone Video Games Only)",
            "totalEntitiesExcluded": len(excluded_entities),
            "excludedEntities": excluded_entities
        }
        path = Path(output_path)
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)
        return report
