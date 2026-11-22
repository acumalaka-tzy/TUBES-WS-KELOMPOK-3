"""
Mortal Kombat Official Website Scraping Adapter
Collects official announcements, roster profiles, and release metadata per PRD v1.5 FR-24.
Accurately records HTTP status codes, never fabricates fake HTTP 200 responses.
"""

from typing import Dict, Any, List, Optional
from bs4 import BeautifulSoup
from .base_adapter import BaseAdapter

class OfficialAdapter(BaseAdapter):
    """Adapter for official Mortal Kombat website (public pages & roster)."""

    def __init__(self, request_delay: float = 2.0):
        super().__init__(
            source_id="mk-official",
            source_name="Mortal Kombat Official Website",
            base_url="https://www.mortalkombat.com/en-us",
            source_type="official",
            request_delay=request_delay,
            adapter_version="1.5.0"
        )

    def health_check(self) -> bool:
        """Check official site availability."""
        res = self.fetch_url(self.base_url)
        return res["success"] and res["status_code"] == 200

    def discover_pages(self, category: str = "roster", limit: int = 30) -> List[Dict[str, Any]]:
        """
        Discovers official roster and game pages from public HTML navigation.
        """
        roster_url = f"{self.base_url}/roster"
        res = self.fetch_url(roster_url)
        discovered = []

        if res["success"]:
            soup = BeautifulSoup(res["content"], "html.parser")
            links = soup.find_all("a", href=True)
            for a in links:
                href = a["href"]
                if "/roster/" in href:
                    slug = href.split("/roster/")[-1].strip("/").title()
                    discovered.append({
                        "pageId": slug,
                        "pageTitle": slug,
                        "url": href if href.startswith("http") else f"https://www.mortalkombat.com{href}"
                    })

        # Curated canonical targets for standalone fighters
        canonical_seed = [
            {"pageId": "Scorpion", "pageTitle": "Scorpion", "url": f"{self.base_url}/roster/scorpion"},
            {"pageId": "Sub-Zero", "pageTitle": "Sub-Zero", "url": f"{self.base_url}/roster/sub-zero"},
            {"pageId": "Liu Kang", "pageTitle": "Liu Kang", "url": f"{self.base_url}/roster/liu-kang"},
            {"pageId": "Raiden", "pageTitle": "Raiden", "url": f"{self.base_url}/roster/raiden"},
            {"pageId": "Kitana", "pageTitle": "Kitana", "url": f"{self.base_url}/roster/kitana"},
            {"pageId": "Mileena", "pageTitle": "Mileena", "url": f"{self.base_url}/roster/mileena"},
            {"pageId": "Johnny Cage", "pageTitle": "Johnny Cage", "url": f"{self.base_url}/roster/johnny-cage"},
            {"pageId": "Kenshi", "pageTitle": "Kenshi", "url": f"{self.base_url}/roster/kenshi"}
        ]

        seen = {d["pageId"] for d in discovered}
        for item in canonical_seed:
            if item["pageId"] not in seen:
                discovered.append(item)

        return discovered[:limit]

    def fetch_page(self, page_id: str, scrape_run_id: str = "run-default") -> Optional[Dict[str, Any]]:
        """
        Fetch character biography and official media metadata from official page.
        Accurately captures real HTTP status and failure reasons without faking HTTP 200.
        """
        slug = page_id.lower().replace(" ", "-")
        url = f"{self.base_url}/roster/{slug}"
        res = self.fetch_url(url)

        if res["success"] and res["status_code"] == 200:
            soup = BeautifulSoup(res["content"], "html.parser")
            # Extract text from main content or article tags
            main_elem = soup.find("main") or soup.find("article") or soup
            text_content = main_elem.get_text(separator=" ", strip=True)

            return self.build_raw_record(
                page_id=page_id,
                page_title=f"Mortal Kombat Official: {page_id}",
                source_url=url,
                content=text_content,
                http_status=200,
                canonical_url=url,
                scrape_run_id=scrape_run_id,
                metadata={"sourceAuthority": "Official Franchise Publisher"},
                acquisition_method="live_http_api",
                is_fallback=False,
                fetch_status="success"
            )

        # Record explicit failure without fabricating fake 200 content
        failure_msg = res.get("error") or f"HTTP {res.get('status_code', 0)}"
        return self.build_raw_record(
            page_id=page_id,
            page_title=f"Mortal Kombat Official: {page_id} (Fetch Failed)",
            source_url=url,
            content="",
            http_status=res.get("status_code", 0),
            canonical_url=url,
            scrape_run_id=scrape_run_id,
            metadata={"sourceAuthority": "Official Franchise Publisher"},
            acquisition_method="live_http_api",
            is_fallback=False,
            fetch_status="failed",
            failure_reason=failure_msg
        )
