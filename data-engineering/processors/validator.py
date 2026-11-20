from typing import Dict, Any, List

class DataValidator:
    """Validates schema, entity integrity, and provenance before RDF generation."""

    def validate_entity(self, entity: Dict[str, Any]) -> bool:
        required = ["id", "name", "type", "sourceURL"]
        return all(k in entity for k in required)
