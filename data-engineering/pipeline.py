"""
Mortal Kombat Knowledge Nexus - Master Data Engineering Pipeline Orchestrator
Implements PRD v1.5 FR-24 through FR-31:
Multi-Source Scraping, Cleaning, Entity & Relationship Extraction, Source Discovery,
Image Asset Management, Quality Gates Validation, and RDF/OWL Serialization.
"""

import sys
import argparse
import json
from typing import Dict, Any
from pathlib import Path
from datetime import datetime, timezone

# Import internal modular components
from scrapers.fandom_adapter import FandomAdapter
from scrapers.official_adapter import OfficialAdapter
from scrapers.wb_adapter import WBGamesAdapter
from scrapers.external_discovery import ExternalReferenceDiscovery
from processors.cleaner import DataCleaner
from processors.entity_resolver import EntityResolver
from processors.extractor import EntityExtractor
from processors.image_asset_manager import ImageAssetManager
from processors.validator import DataValidator
from rdf_generator.builder import RDFGraphBuilder

class DataPipelineOrchestrator:
    """Master orchestrator executing and logging all data engineering pipeline stages."""

    def __init__(self, storage_dir: str = "data-engineering/storage"):
        self.storage_dir = Path(storage_dir)
        self.raw_dir = self.storage_dir / "raw"
        self.cleaned_dir = self.storage_dir / "cleaned"
        self.extracted_dir = self.storage_dir / "extracted"
        self.validated_dir = self.storage_dir / "validated"
        self.assets_dir = self.storage_dir / "assets"
        self.exports_dir = self.storage_dir / "exports"
        self.reports_dir = self.storage_dir / "reports"

        for d in [self.raw_dir, self.cleaned_dir, self.extracted_dir,
                  self.validated_dir, self.assets_dir, self.exports_dir, self.reports_dir]:
            d.mkdir(parents=True, exist_ok=True)

        self.fandom = FandomAdapter()
        self.official = OfficialAdapter()
        self.wb = WBGamesAdapter()
        self.cleaner = DataCleaner()
        self.resolver = EntityResolver()
        self.extractor = EntityExtractor(self.resolver)
        self.asset_manager = ImageAssetManager()
        self.discovery = ExternalReferenceDiscovery()
        self.validator = DataValidator()
        self.rdf_builder = RDFGraphBuilder()

    def run_scrape(self, limit: int = 15) -> Dict[str, Any]:
        """Stage 1: Multi-source scraping with raw archive snapshots and provenance."""
        print("\n[STAGE 1] MULTI-SOURCE SCRAPING & RAW DATA REPOSITORY")
        scrape_run_id = f"run-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}"
        raw_records = []
        source_stats = {}

        # 1. Fandom MediaWiki Adapter
        print("  -> Running Fandom Wiki MediaWiki Action API adapter...")
        fandom_pages = ["Scorpion", "Sub-Zero", "Raiden", "Liu Kang", "Kitana", "Johnny Cage", "Mortal Kombat 11"]
        f_success = 0
        for p in fandom_pages[:limit]:
            rec = self.fandom.fetch_page(p, scrape_run_id=scrape_run_id)
            if rec:
                raw_records.append(rec)
                f_success += 1
        source_stats["fandom-wiki"] = {"discovered": len(fandom_pages), "collected": f_success}

        # 2. Official Website Adapter
        print("  -> Running Mortal Kombat Official public adapter...")
        official_candidates = self.official.discover_pages(limit=limit)
        o_success = 0
        for c in official_candidates:
            rec = self.official.fetch_page(c["pageId"], scrape_run_id=scrape_run_id)
            if rec:
                raw_records.append(rec)
                o_success += 1
        source_stats["mk-official"] = {"discovered": len(official_candidates), "collected": o_success}

        # 3. Warner Bros. Games Adapter
        print("  -> Running Warner Bros. Games pressroom adapter...")
        wb_candidates = self.wb.discover_pages(limit=limit)
        w_success = 0
        for c in wb_candidates:
            rec = self.wb.fetch_page(c["pageId"], scrape_run_id=scrape_run_id)
            if rec:
                raw_records.append(rec)
                w_success += 1
        source_stats["wb-games"] = {"discovered": len(wb_candidates), "collected": w_success}

        # Save immutable raw snapshot archive
        raw_output_file = self.raw_dir / "raw_pages.json"
        with open(raw_output_file, "w", encoding="utf-8") as f:
            json.dump(raw_records, f, indent=2)

        # Generate scrape report
        report = {
            "scrapeRunId": scrape_run_id,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "totalRawRecordsCollected": len(raw_records),
            "sources": source_stats,
            "archiveLocation": str(raw_output_file),
            "status": "SUCCESS"
        }
        with open(self.reports_dir / "scrape_report.json", "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)

        print(f"  [OK] Collected {len(raw_records)} raw records across 3 independent adapters.")
        return report

    def run_clean(self) -> Dict[str, Any]:
        """Stage 2: Data cleaning, normalization, and deduplication."""
        print("\n[STAGE 2] RAW DATA CLEANING & NORMALIZATION")
        raw_file = self.raw_dir / "raw_pages.json"
        if not raw_file.exists():
            print("  [WARN] raw_pages.json not found, running scrape first...")
            self.run_scrape()

        with open(raw_file, "r", encoding="utf-8") as f:
            raw_records = json.load(f)

        clean_result = self.cleaner.clean_batch(raw_records)
        cleaned_records = clean_result["cleanedRecords"]
        report = clean_result["report"]

        # Save cleaned pages
        with open(self.cleaned_dir / "cleaned_pages.json", "w", encoding="utf-8") as f:
            json.dump(cleaned_records, f, indent=2)

        with open(self.reports_dir / "cleaning_report.json", "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)

        print(f"  [OK] Cleaned {len(cleaned_records)} unique records (Duplicates detected: {report['duplicateRecordsDetected']}).")
        return report

    def run_extract(self) -> Dict[str, Any]:
        """Stage 3: Entity, attribute, and relationship extraction with strict DLC filtering."""
        print("\n[STAGE 3] ENTITY & RELATIONSHIP EXTRACTION (WITH STRICT DLC FILTER)")
        result = self.extractor.extract_and_save(output_dir=str(self.extracted_dir))
        data = result["data"]
        report = result["report"]

        print(f"  [OK] Extracted {len(data['characters'])} Characters, {len(data['games'])} Standalone Games, "
              f"{len(data['abilities'])} Abilities/Moves, {len(data['events'])} Story Events.")
        print(f"  [OK] DLC Exclusion Audit: {report['dlcExclusionAudit']['auditStatus']}")
        return result

    def run_source_discovery(self) -> Dict[str, Any]:
        """Stage 4: External Reference Discovery & Source Governance per FR-30."""
        print("\n[STAGE 4] EXTERNAL REFERENCE DISCOVERY & SOURCE GOVERNANCE")
        report = self.discovery.save_report(str(self.reports_dir / "source_discovery_report.json"))
        print(f"  [OK] Evaluated {report['totalCandidates']} candidate sources: "
              f"{report['approvedCount']} Approved, {report['pendingCount']} Pending Review, {report['rejectedCount']} Rejected.")
        return report

    def run_asset_management(self) -> Dict[str, Any]:
        """Stage 5: Image Asset Management & Rights Review per FR-31."""
        print("\n[STAGE 5] IMAGE ASSET MANAGEMENT & RIGHTS AUDIT")
        report = self.asset_manager.save_registry_and_report(
            registry_output=str(self.assets_dir / "image_asset_registry.json"),
            report_output=str(self.reports_dir / "image_asset_report.json")
        )
        print(f"  [OK] Registered {report['totalAssets']} image assets: "
              f"{report['approvedAssets']} Approved for display, {report['pendingReviewAssets']} Pending Review.")
        return report

    def run_validate(self) -> Dict[str, Any]:
        """Stage 6: Dataset Validation and Quality Gates per FR-27."""
        print("\n[STAGE 6] DATASET VALIDATION & QUALITY GATES")
        data = self.extractor.build_dataset()
        val_result = self.validator.save_validated_and_report(
            dataset=data,
            validated_dir=str(self.validated_dir),
            report_path=str(self.reports_dir / "validation_report.json")
        )
        rep = val_result["report"]
        if val_result["isValid"]:
            print(f"  [OK] Validation PASSED with 0 errors and {rep['totalWarnings']} warnings.")
        else:
            print(f"  [FAIL] Validation FAILED with {rep['totalErrors']} errors.")
        return val_result

    def run_export_rdf(self) -> Dict[str, Any]:
        """Stage 7: RDFLib Graph Generation & Turtle/RDF-XML Serialization per FR-28."""
        print("\n[STAGE 7] RDF/OWL GRAPH GENERATION & DATASET EXPORT")
        data = self.extractor.build_dataset()
        report = self.rdf_builder.export_all(
            validated_data=data,
            turtle_path=str(self.exports_dir / "mortal_kombat.ttl"),
            rdfxml_path=str(self.exports_dir / "mortal_kombat.rdf"),
            kb_turtle_path="knowledge-base/data/mortal_kombat.ttl",
            report_path=str(self.reports_dir / "rdf_export_report.json")
        )
        print(f"  [OK] Generated {report['totalTriples']} RDF triples.")
        print(f"  [OK] Serialized to: Turtle ({report['serializedFormats']['turtle']}) and RDF/XML.")
        print(f"  [OK] Synced with knowledge-base/data/mortal_kombat.ttl for Apache Jena Fuseki.")
        return report

    def run_all(self):
        """Executes the full end-to-end data engineering pipeline."""
        print("=" * 70)
        print("MORTAL KOMBAT KNOWLEDGE NEXUS - COMPLETE DATA PIPELINE (v1.5)")
        print("=" * 70)
        start_time = datetime.now()

        self.run_scrape()
        self.run_clean()
        self.run_extract()
        self.run_source_discovery()
        self.run_asset_management()
        self.run_validate()
        self.run_export_rdf()

        elapsed = (datetime.now() - start_time).total_seconds()
        print("=" * 70)
        print(f"PIPELINE RUN COMPLETED SUCCESSFULLY in {elapsed:.2f} seconds!")
        print(f"Reports available in: {self.reports_dir}")
        print("=" * 70)

def main():
    parser = argparse.ArgumentParser(description="Mortal Kombat Knowledge Nexus Data Pipeline CLI")
    parser.add_argument("command", choices=[
        "all", "scrape", "clean", "extract", "discover-sources",
        "manage-assets", "validate", "export-rdf"
    ], default="all", nargs="?", help="Pipeline command to execute")
    parser.add_argument("--limit", type=int, default=15, help="Limit number of pages per source")

    args = parser.parse_args()
    orchestrator = DataPipelineOrchestrator()

    if args.command == "all":
        orchestrator.run_all()
    elif args.command == "scrape":
        orchestrator.run_scrape(limit=args.limit)
    elif args.command == "clean":
        orchestrator.run_clean()
    elif args.command == "extract":
        orchestrator.run_extract()
    elif args.command == "discover-sources":
        orchestrator.run_source_discovery()
    elif args.command == "manage-assets":
        orchestrator.run_asset_management()
    elif args.command == "validate":
        orchestrator.run_validate()
    elif args.command == "export-rdf":
        orchestrator.run_export_rdf()

if __name__ == "__main__":
    main()
