from typing import Dict, Any, List
from .base_adapter import BaseAdapter

class FandomAdapter(BaseAdapter):
    """Adapter for Mortal Kombat Fandom Wiki via MediaWiki Action API."""

    def __init__(self, request_delay: float = 1.0):
        super().__init__(
            source_id="fandom-wiki",
            base_url="https://mortalkombat.fandom.com/api.php",
            request_delay=request_delay
        )

    def health_check(self) -> bool:
        return True

    def discover_pages(self, category: str, limit: int = 10) -> List[Dict[str, Any]]:
        return []

    def fetch_page(self, page_id: str) -> Dict[str, Any]:
        return {
            "sourceId": self.source_id,
            "pageId": page_id,
            "rawContent": "",
            "retrievedAt": "2026-11-20T00:00:00Z"
        }
