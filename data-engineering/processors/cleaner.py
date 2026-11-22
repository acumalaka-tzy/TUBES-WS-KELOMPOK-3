"""
Data Cleaning and Normalization Processor
Implements PRD v1.5 FR-25:
Normalizes raw scraped snapshots, removes boilerplate/navigation text,
preserves raw lineage, detects duplicate content hashes, and outputs cleaning reports.
"""

from typing import Dict, Any, List
import re
import unicodedata
import hashlib
from datetime import datetime, timezone
from pathlib import Path

class DataCleaner:
    """Cleans and normalizes raw scraped web pages."""

    def __init__(self):
        # Regex patterns to clean mediawiki / HTML markup
        self.ref_pattern = re.compile(r"<ref.*?>.*?</ref>", re.DOTALL | re.IGNORECASE)
        self.html_tag_pattern = re.compile(r"<.*?>")
        self.wiki_link_pattern = re.compile(r"\[\[(?:[^|\]]*\|)?([^\]]+)\]\]")
        self.wiki_template_pattern = re.compile(r"\{\{.*?\}\}", re.DOTALL)
        self.whitespace_pattern = re.compile(r"\s+")

    def clean_text(self, text: str) -> str:
        """Strip templates, refs, HTML tags, and normalize unicode/spaces."""
        if not text:
            return ""

        # Unicode normalization (NFC)
        normalized = unicodedata.normalize("NFC", text)

        # Remove citation references and templates
        cleaned = self.ref_pattern.sub("", normalized)
        cleaned = self.wiki_template_pattern.sub("", cleaned)
        cleaned = self.wiki_link_pattern.sub(r"\1", cleaned)
        cleaned = self.html_tag_pattern.sub(" ", cleaned)

        # Clean excess whitespace
        cleaned = self.whitespace_pattern.sub(" ", cleaned).strip()
        return cleaned

    def clean_record(self, raw_record: Dict[str, Any]) -> Dict[str, Any]:
        """Normalize a single raw record preserving traceability."""
        raw_content = raw_record.get("rawContent", "")
        cleaned_content = self.clean_text(raw_content)

        cleaned_hash = hashlib.sha256(cleaned_content.encode("utf-8")).hexdigest()
        raw_id = raw_record.get("rawRecordId", "raw-unknown")
        source_id = raw_record.get("sourceId", "unknown")
        page_id = raw_record.get("sourcePageId", "")

        return {
            "cleanedId": f"clean-{source_id}-{page_id.lower().replace(' ', '-')}",
            "rawRecordId": raw_id,
            "sourceId": source_id,
            "sourceURL": raw_record.get("sourceURL", ""),
            "canonicalURL": raw_record.get("canonicalURL", ""),
            "pageTitle": raw_record.get("pageTitle", ""),
            "cleanedContent": cleaned_content,
            "contentHash": f"sha256:{cleaned_hash}",
            "rawContentHash": raw_record.get("contentHash", ""),
            "retrievedAt": raw_record.get("retrievedAt", ""),
            "cleanedAt": datetime.now(timezone.utc).isoformat(),
            "metadata": raw_record.get("metadata", {})
        }

    def clean_batch(self, raw_records: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Cleans a list of raw records, detects duplicates by canonical URL & content hash,
        and generates cleaning report.
        """
        cleaned_list = []
        seen_urls = set()
        seen_hashes = set()
        duplicate_count = 0
        empty_count = 0

        for raw in raw_records:
            cleaned = self.clean_record(raw)
            url = cleaned["canonicalURL"]
            chash = cleaned["contentHash"]

            if not cleaned["cleanedContent"] or len(cleaned["cleanedContent"]) < 10:
                empty_count += 1

            if url in seen_urls or chash in seen_hashes:
                duplicate_count += 1
            else:
                seen_urls.add(url)
                seen_hashes.add(chash)
                cleaned_list.append(cleaned)

        report = {
            "reportId": f"cleaning-report-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}",
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "totalRawRecords": len(raw_records),
            "cleanedUniqueRecords": len(cleaned_list),
            "duplicateRecordsDetected": duplicate_count,
            "emptyOrShortRecords": empty_count,
            "cleaningRulesApplied": [
                "NFC Unicode Normalization",
                "HTML Tag Stripping",
                "MediaWiki Citation & Template Removal",
                "Canonical URL & Content Hash Deduplication"
            ]
        }

        return {
            "cleanedRecords": cleaned_list,
            "report": report
        }
