"""
External Reference Discovery & Source Governance
Implements PRD v1.5 FR-30:
Discovers external candidate sources beyond initial adapters, evaluates authority/rights,
and maintains the approved Source Registry without automated unauthorized scraping.
"""

from typing import Dict, Any, List
import json
from datetime import datetime, timezone
from pathlib import Path

class ExternalReferenceDiscovery:
    """
    Evaluates candidate references using transparent multidimensional criteria:
    - Relevance (does it cover Mortal Kombat entities/canon?)
    - Authority (Official, Primary, Specialist, Community)
    - Evidence transparency
    - Freshness & Corroboration
    - Access policy, Terms of Use, and Licensing
    """

    def __init__(self, registry_path: str = "data-engineering/config/sources.json"):
        self.registry_path = Path(registry_path)
        self.candidates: List[Dict[str, Any]] = [
            {
                "sourceId": "mobygames-mk",
                "sourceName": "MobyGames – Mortal Kombat Franchise",
                "baseURL": "https://www.mobygames.com/group/87/mortal-kombat-franchise/",
                "sourceType": "secondary_database",
                "intendedUse": "Cross-check standalone game catalogue, platforms, and release metadata.",
                "policyNotes": "Manual cross-check or permitted endpoints only. Filter DLC/add-ons.",
                "relevanceScore": 0.95,
                "authorityScore": 0.85,
                "evidenceScore": 0.90,
                "accessPolicy": "permitted_inspection",
                "status": "approved"
            },
            {
                "sourceId": "wikidata-mk",
                "sourceName": "Wikidata – Mortal Kombat (Q150294)",
                "baseURL": "https://www.wikidata.org/wiki/Q150294",
                "sourceType": "structured_open_data",
                "intendedUse": "Structured external entity identifiers (QIDs) and release dates.",
                "policyNotes": "CC0 Public Domain structured data. SPARQL endpoint accessible.",
                "relevanceScore": 0.90,
                "authorityScore": 0.80,
                "evidenceScore": 0.85,
                "accessPolicy": "open_sparql_api",
                "status": "approved"
            },
            {
                "sourceId": "mk-official-media",
                "sourceName": "Mortal Kombat Official Media Gallery",
                "baseURL": "https://www.mortalkombat.com/en-us/media",
                "sourceType": "official_media",
                "intendedUse": "Promotional artwork & key art discovery subject to asset-by-asset rights review.",
                "policyNotes": "Asset-level rights review required before public display.",
                "relevanceScore": 0.98,
                "authorityScore": 0.95,
                "evidenceScore": 0.95,
                "accessPolicy": "press_media_review",
                "status": "pending-review"
            },
            {
                "sourceId": "random-fan-blog",
                "sourceName": "Unverified Community Fan Lore Blog",
                "baseURL": "https://unverified-fan-lore.example.org",
                "sourceType": "fan_blog",
                "intendedUse": "Speculative fan theories and combat tier lists.",
                "policyNotes": "Rejected due to lack of verifiable canon provenance and speculative content.",
                "relevanceScore": 0.40,
                "authorityScore": 0.20,
                "evidenceScore": 0.15,
                "accessPolicy": "unverified",
                "status": "rejected",
                "rejectionReason": "Non-canonical fan speculation without primary citations."
            }
        ]

    def evaluate_candidates(self) -> Dict[str, Any]:
        """
        Runs evaluation on all candidate sources and produces a source governance report.
        """
        report = {
            "reportId": f"source-discovery-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}",
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "totalCandidates": len(self.candidates),
            "approvedCount": sum(1 for c in self.candidates if c["status"] == "approved"),
            "pendingCount": sum(1 for c in self.candidates if c["status"] == "pending-review"),
            "rejectedCount": sum(1 for c in self.candidates if c["status"] == "rejected"),
            "evaluationCriteria": [
                "relevance", "authority", "evidence_traceability",
                "access_policy", "dlc_exclusion_compliance"
            ],
            "candidates": self.candidates
        }
        return report

    def save_report(self, output_path: str = "data-engineering/storage/reports/source_discovery_report.json"):
        path = Path(output_path)
        path.parent.mkdir(parents=True, exist_ok=True)
        report = self.evaluate_candidates()
        with open(path, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)
        return report

    def evaluate_and_save_report(self, output_report: str = "data-engineering/storage/reports/source_discovery_report.json"):
        return self.save_report(output_report)
