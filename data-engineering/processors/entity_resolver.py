from typing import Dict, Any

class EntityResolver:
    """Resolves aliases and variants to canonical MK URIs."""

    def resolve_character_uri(self, name: str) -> str:
        slug = name.lower().replace(" ", "-").replace("'", "")
        return f"https://example.org/mk/character/{slug}"
