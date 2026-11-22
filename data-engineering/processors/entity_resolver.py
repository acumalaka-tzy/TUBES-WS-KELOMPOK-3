"""
Entity Resolution and Canonical Mapping Processor
Implements PRD v1.5 FR-26:
Resolves character aliases, variants, and multiple source mentions to canonical identifiers,
mints persistent URIs (mk: <https://example.org/mk/>), and links claim provenance.
"""

from typing import Dict, Any, Optional

class EntityResolver:
    """Resolves aliases and variants to canonical MK URIs."""

    def __init__(self, base_uri: str = "https://example.org/mk/"):
        self.base_uri = base_uri

        # Alias lookup dictionary mapping variants to canonical IDs
        self.alias_map = {
            # Scorpion aliases
            "hanzo hasashi": "character-scorpion",
            "scorpion": "character-scorpion",
            "grandmaster hasashi": "character-scorpion",
            "spectre scorpion": "character-scorpion",

            # Sub-Zero aliases
            "kuai liang": "character-subzero",
            "bi-han": "character-subzero-bihan", # Original Sub-Zero who becomes Noob Saibot
            "sub-zero": "character-subzero",
            "grandmaster sub-zero": "character-subzero",

            # Raiden aliases
            "lord raiden": "character-raiden",
            "raiden": "character-raiden",
            "thunder god raiden": "character-raiden",
            "dark raiden": "character-raiden",

            # Liu Kang aliases
            "liu kang": "character-liukang",
            "fire god liu kang": "character-liukang-firegod",
            "champion liu kang": "character-liukang",

            # Other primary fighters
            "johnny cage": "character-johnnycage",
            "john carlton": "character-johnnycage",
            "sonya blade": "character-sonyablade",
            "general blade": "character-sonyablade",
            "jax briggs": "character-jax",
            "major briggs": "character-jax",
            "shang tsung": "character-shangtsung",
            "kung lao": "character-kunglao",
            "kitana": "character-kitana",
            "princess kitana": "character-kitana",
            "mileena": "character-mileena",
            "kano": "character-kano",
            "baraka": "character-baraka",
            "noob saibot": "character-noobsaibot",
            "bi han": "character-noobsaibot",
            "smoke": "character-smoke",
            "tomas vrbada": "character-smoke",
            "reptile": "character-reptile",
            "syzoth": "character-reptile",
            "ermac": "character-ermac",
            "rain": "character-rain",
            "shao kahn": "character-shaokahn",
            "general shao": "character-shaokahn",
            "sindel": "character-sindel",
            "queen sindel": "character-sindel",
            "goro": "character-goro",
            "prince goro": "character-goro",
            "quan chi": "character-quanchi",
            "shinnok": "character-shinnok",
            "kenshi": "character-kenshi",
            "kenshi takahashi": "character-kenshi",
            "frost": "character-frost",
            "cyrax": "character-cyrax",
            "sektor": "character-sektor",
            "nightwolf": "character-nightwolf",
            "grey cloud": "character-nightwolf",
            "cassie cage": "character-cassiecage",
            "kotal kahn": "character-kotalkahn",
            "erron black": "character-erronblack",
            "geras": "character-geras",
            "kronika": "character-kronika",
            "cetrion": "character-cetrion"
        }

    def resolve_canonical_id(self, name_or_alias: str, category: str = "character") -> str:
        """Resolve a name or alias to canonical ID."""
        cleaned = name_or_alias.lower().strip()
        if category == "character":
            if cleaned in self.alias_map:
                return self.alias_map[cleaned]
            slug = cleaned.replace(" ", "-").replace("'", "").replace(".", "")
            return f"character-{slug}"
        elif category == "game":
            slug = cleaned.replace(" ", "-").replace(":", "").replace("'", "")
            return f"game-{slug}"
        elif category == "ability":
            slug = cleaned.replace(" ", "-").replace("'", "")
            return f"ability-{slug}"
        elif category == "weapon":
            slug = cleaned.replace(" ", "-").replace("'", "")
            return f"weapon-{slug}"
        elif category == "organization":
            slug = cleaned.replace(" ", "-").replace("'", "")
            return f"org-{slug}"
        elif category == "realm":
            slug = cleaned.replace(" ", "-").replace("'", "")
            return f"realm-{slug}"
        elif category == "timeline":
            slug = cleaned.replace(" ", "-").replace("'", "")
            return f"timeline-{slug}"
        elif category == "event":
            slug = cleaned.replace(" ", "-").replace("'", "")
            return f"event-{slug}"
        else:
            slug = cleaned.replace(" ", "-")
            return f"entity-{slug}"

    def build_uri(self, canonical_id: str) -> str:
        """Construct full semantic URI."""
        return f"{self.base_uri}{canonical_id}"
