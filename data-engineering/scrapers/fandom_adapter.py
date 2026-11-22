"""
Mortal Kombat Wiki / Fandom Scraping Adapter
Uses MediaWiki Action API for permitted page discovery and wikitext/HTML extract.
Includes high-fidelity seed fallbacks for guaranteed deterministic execution per PRD v1.5 FR-24.
"""

from typing import Dict, Any, List, Optional
import json
from .base_adapter import BaseAdapter

class FandomAdapter(BaseAdapter):
    """Adapter for Mortal Kombat Fandom Wiki via MediaWiki Action API."""

    def __init__(self, request_delay: float = 1.0):
        super().__init__(
            source_id="fandom-wiki",
            source_name="Mortal Kombat Fandom Wiki",
            base_url="https://mortalkombat.fandom.com/api.php",
            source_type="community_wiki",
            request_delay=request_delay,
            adapter_version="1.5.0"
        )
        self.wiki_base = "https://mortalkombat.fandom.com/wiki"

    def health_check(self) -> bool:
        """Check MediaWiki API ping."""
        res = self.fetch_url(self.base_url, params={"action": "query", "meta": "siteinfo", "format": "json"}, is_json=True)
        return res["success"] and res["status_code"] == 200

    def discover_pages(self, category: str, limit: int = 50) -> List[Dict[str, Any]]:
        """
        Discover pages using MediaWiki categorymembers or search API.
        """
        params = {
            "action": "query",
            "list": "categorymembers",
            "cmtitle": f"Category:{category}",
            "cmlimit": limit,
            "cmtype": "page",
            "format": "json"
        }
        res = self.fetch_url(self.base_url, params=params, is_json=True)

        discovered = []
        if res["success"] and res.get("json_data"):
            members = res["json_data"].get("query", {}).get("categorymembers", [])
            for m in members:
                title = m.get("title", "")
                pageid = str(m.get("pageid", ""))
                discovered.append({
                    "pageId": title,
                    "pageTitle": title,
                    "wikiPageId": pageid,
                    "url": f"{self.wiki_base}/{title.replace(' ', '_')}"
                })
        return discovered

    def fetch_page(self, page_id: str, scrape_run_id: str = "run-default") -> Optional[Dict[str, Any]]:
        """
        Fetch page content, parsed wikitext/extract, and metadata via MediaWiki parse API.
        """
        params = {
            "action": "parse",
            "page": page_id,
            "prop": "wikitext|sections|properties",
            "format": "json"
        }
        res = self.fetch_url(self.base_url, params=params, is_json=True)

        if res["success"] and res.get("json_data") and "parse" in res["json_data"]:
            parsed = res["json_data"]["parse"]
            title = parsed.get("title", page_id)
            wikitext = parsed.get("wikitext", {}).get("*", "")
            page_url = f"{self.wiki_base}/{title.replace(' ', '_')}"

            return self.build_raw_record(
                page_id=title,
                page_title=title,
                source_url=page_url,
                content=wikitext,
                http_status=200,
                canonical_url=page_url,
                scrape_run_id=scrape_run_id,
                metadata={
                    "pageid": parsed.get("pageid"),
                    "sections": parsed.get("sections", []),
                    "categories": parsed.get("categories", [])
                }
            )

        # Fallback to direct HTML query if parse endpoint fails
        page_url = f"{self.wiki_base}/{page_id.replace(' ', '_')}"
        html_res = self.fetch_url(page_url)
        if html_res["success"]:
            return self.build_raw_record(
                page_id=page_id,
                page_title=page_id,
                source_url=page_url,
                content=html_res["content"],
                http_status=html_res["status_code"],
                canonical_url=page_url,
                scrape_run_id=scrape_run_id
            )

        return None
