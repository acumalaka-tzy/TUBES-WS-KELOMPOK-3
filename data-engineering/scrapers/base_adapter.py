from abc import ABC, abstractmethod
from typing import Dict, Any, List

class BaseAdapter(ABC):
    """Abstract Base Class for Multi-Source Scraping Adapters."""

    def __init__(self, source_id: str, base_url: str, request_delay: float = 1.0):
        self.source_id = source_id
        self.base_url = base_url
        self.request_delay = request_delay

    @abstractmethod
    def health_check(self) -> bool:
        """Check availability of the source endpoint."""
        pass

    @abstractmethod
    def discover_pages(self, category: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Discover candidate page URLs and titles."""
        pass

    @abstractmethod
    def fetch_page(self, page_id: str) -> Dict[str, Any]:
        """Fetch raw snapshot of a single page."""
        pass
