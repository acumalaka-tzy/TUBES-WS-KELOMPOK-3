"""
Base Scraping Adapter for Mortal Kombat Knowledge Nexus
Defines common interface, HTTP client with retries, exponential backoff,
provenance metadata, acquisition method differentiation, and content hashing per PRD v1.5 FR-24.
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
import time
import hashlib
from datetime import datetime, timezone
import requests

class BaseAdapter(ABC):
    """Abstract Base Class for all multi-source scraping adapters."""

    def __init__(
        self,
        source_id: str,
        source_name: str,
        base_url: str,
        source_type: str,
        request_delay: float = 1.0,
        adapter_version: str = "1.5.0",
        timeout: int = 15,
        max_retries: int = 3
    ):
        self.source_id = source_id
        self.source_name = source_name
        self.base_url = base_url
        self.source_type = source_type
        self.request_delay = request_delay
        self.adapter_version = adapter_version
        self.timeout = timeout
        self.max_retries = max_retries
        self.last_request_time = 0.0

        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": (
                "MortalKombatKnowledgeNexus/1.5 "
                "(Academic Semantic Web Project; Contact: group3@universitas.ac.id)"
            ),
            "Accept": "application/json, text/html, application/xhtml+xml, */*"
        })

    def _rate_limit(self):
        """Enforce request delay between requests to be polite."""
        elapsed = time.time() - self.last_request_time
        if elapsed < self.request_delay:
            time.sleep(self.request_delay - elapsed)
        self.last_request_time = time.time()

    def fetch_url(self, url: str, params: Optional[Dict[str, Any]] = None, is_json: bool = False) -> Dict[str, Any]:
        """
        Fetch URL with bounded retries and exponential backoff.
        Returns dict with status, content, headers, and metadata.
        """
        self._rate_limit()
        retries = 0
        backoff = 1.0

        while retries <= self.max_retries:
            try:
                response = self.session.get(url, params=params, timeout=self.timeout)
                retrieved_at = datetime.now(timezone.utc).isoformat()

                if response.status_code == 200:
                    content_str = response.text
                    content_hash = self.compute_hash(content_str)
                    return {
                        "success": True,
                        "status_code": 200,
                        "content": content_str,
                        "json_data": response.json() if is_json else None,
                        "retrieved_at": retrieved_at,
                        "content_hash": content_hash,
                        "url": response.url,
                        "error": None
                    }
                elif response.status_code in (429, 500, 502, 503, 504):
                    # Rate limit or transient server error: backoff and retry
                    time.sleep(backoff)
                    backoff *= 2.0
                    retries += 1
                else:
                    return {
                        "success": False,
                        "status_code": response.status_code,
                        "content": response.text,
                        "json_data": None,
                        "retrieved_at": datetime.now(timezone.utc).isoformat(),
                        "content_hash": "",
                        "url": response.url,
                        "error": f"HTTP {response.status_code}"
                    }
            except Exception as e:
                retries += 1
                if retries > self.max_retries:
                    return {
                        "success": False,
                        "status_code": 0,
                        "content": "",
                        "json_data": None,
                        "retrieved_at": datetime.now(timezone.utc).isoformat(),
                        "content_hash": "",
                        "url": url,
                        "error": str(e)
                    }
                time.sleep(backoff)
                backoff *= 2.0

        return {
            "success": False,
            "status_code": 0,
            "content": "",
            "json_data": None,
            "retrieved_at": datetime.now(timezone.utc).isoformat(),
            "content_hash": "",
            "url": url,
            "error": "Max retries exceeded"
        }

    @staticmethod
    def compute_hash(text: str) -> str:
        """Compute SHA-256 hash for content deduplication."""
        return hashlib.sha256(text.encode("utf-8")).hexdigest()

    def build_raw_record(
        self,
        page_id: str,
        page_title: str,
        source_url: str,
        content: str,
        http_status: int = 200,
        canonical_url: Optional[str] = None,
        scrape_run_id: str = "run-default",
        metadata: Optional[Dict[str, Any]] = None,
        acquisition_method: str = "live_http_api",
        is_fallback: bool = False,
        fetch_status: str = "success",
        failure_reason: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Creates a raw page record conforming to PRD Section 28.4 Schema,
        rigorously tracking provenance, acquisition method, and fallback indicators.
        """
        content_hash = self.compute_hash(content) if content else ""
        raw_id = f"raw-{self.source_id}-{hashlib.md5(page_id.encode()).hexdigest()[:8]}"
        return {
            "rawRecordId": raw_id,
            "sourceId": self.source_id,
            "sourceName": self.source_name,
            "sourcePageId": page_id,
            "pageTitle": page_title,
            "sourceURL": source_url,
            "canonicalURL": canonical_url or source_url,
            "retrievedAt": datetime.now(timezone.utc).isoformat(),
            "httpStatus": http_status,
            "contentHash": f"sha256:{content_hash}" if content_hash else "",
            "adapterName": self.__class__.__name__,
            "adapterVersion": self.adapter_version,
            "rawContent": content,
            "scrapeRunId": scrape_run_id,
            "acquisitionMethod": acquisition_method,  # "live_http_api", "snapshot", "cache", "fallback_seed"
            "isFallback": is_fallback,
            "fetchStatus": fetch_status,  # "success", "failed"
            "failureReason": failure_reason,
            "metadata": metadata or {}
        }

    @abstractmethod
    def health_check(self) -> bool:
        """Verify if source endpoint is reachable."""
        pass

    @abstractmethod
    def discover_pages(self, category: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Discover candidate page titles and identifiers."""
        pass

    @abstractmethod
    def fetch_page(self, page_id: str, scrape_run_id: str = "run-default") -> Optional[Dict[str, Any]]:
        """Fetch raw snapshot of a single page."""
        pass
