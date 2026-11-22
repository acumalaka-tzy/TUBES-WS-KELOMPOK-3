"""
Warner Bros. Games Pressroom Scraping Adapter
Collects publisher game announcements, launch dates, and platform information per PRD v1.5 FR-24.
Attempts actual HTTP requests, records actual status, and marks failure transparently if blocked.
"""

from typing import Dict, Any, List, Optional
from bs4 import BeautifulSoup
from .base_adapter import BaseAdapter

class WBGamesAdapter(BaseAdapter):
    """Adapter for Warner Bros. Games press releases and announcements."""

    def __init__(self, request_delay: float = 2.0):
        super().__init__(
            source_id="wb-games",
            source_name="Warner Bros. Games Pressroom",
            base_url="https://press.wbd.com/us/brands/warner-bros-games/media-releases",
            source_type="publisher",
            request_delay=request_delay,
            adapter_version="1.5.0"
        )

    def health_check(self) -> bool:
        """Check WB pressroom availability."""
        res = self.fetch_url(self.base_url)
        return res["success"] and res["status_code"] == 200

    def discover_pages(self, category: str = "press-releases", limit: int = 15) -> List[Dict[str, Any]]:
        """
        Discovers publisher release announcements for standalone MK titles.
        """
        catalog = [
            {
                "pageId": "wb-mk1-announcement",
                "pageTitle": "Warner Bros. Games Announces Mortal Kombat 1",
                "url": "https://press.wbd.com/us/media-release/warner-bros-games-announces-mortal-kombat-1"
            },
            {
                "pageId": "wb-mk11-announcement",
                "pageTitle": "Warner Bros. Interactive Entertainment Reveals Mortal Kombat 11",
                "url": "https://press.wbd.com/us/media-release/mortal-kombat-11-launch-announcement"
            },
            {
                "pageId": "wb-mkx-announcement",
                "pageTitle": "Warner Bros. Interactive Entertainment Announces Mortal Kombat X",
                "url": "https://press.wbd.com/us/media-release/mortal-kombat-x-worldwide-launch"
            },
            {
                "pageId": "wb-mk9-announcement",
                "pageTitle": "Warner Bros. Interactive Entertainment Announces Mortal Kombat (2011)",
                "url": "https://press.wbd.com/us/media-release/mortal-kombat-reboot-2011"
            }
        ]
        return catalog[:limit]

    def fetch_page(self, page_id: str, scrape_run_id: str = "run-default") -> Optional[Dict[str, Any]]:
        """
        Attempts actual HTTP request to the press release URL.
        Never fabricates hardcoded success text if blocked or restricted.
        """
        pages = {p["pageId"]: p for p in self.discover_pages()}
        target = pages.get(page_id)
        if not target:
            return None

        url = target["url"]
        res = self.fetch_url(url)

        if res["success"] and res["status_code"] == 200:
            soup = BeautifulSoup(res["content"], "html.parser")
            body_elem = soup.find("article") or soup.find("main") or soup
            text_content = body_elem.get_text(separator=" ", strip=True)

            return self.build_raw_record(
                page_id=page_id,
                page_title=target["pageTitle"],
                source_url=url,
                content=text_content,
                http_status=200,
                canonical_url=url,
                scrape_run_id=scrape_run_id,
                metadata={"publisher": "Warner Bros. Games", "sourceType": "Official Publisher Pressroom"},
                acquisition_method="live_http_api",
                is_fallback=False,
                fetch_status="success"
            )

        # Record genuine HTTP status / failure reason transparently
        failure_msg = res.get("error") or f"HTTP {res.get('status_code', 0)}"
        return self.build_raw_record(
            page_id=page_id,
            page_title=f"{target['pageTitle']} (Fetch Failed)",
            source_url=url,
            content="",
            http_status=res.get("status_code", 0),
            canonical_url=url,
            scrape_run_id=scrape_run_id,
            metadata={"publisher": "Warner Bros. Games", "sourceType": "Official Publisher Pressroom"},
            acquisition_method="live_http_api",
            is_fallback=False,
            fetch_status="failed",
            failure_reason=failure_msg
        )
