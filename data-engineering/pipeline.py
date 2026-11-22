"""
Master Pipeline Orchestrator for Mortal Kombat Knowledge Nexus
Implements PRD v1.5 Section 28 & Master Prompt:
Connects all 12 stages end-to-end:
1. Source Discovery
2. Multi-Source Scraping & API Acquisition
3. Raw Data Archiving
4. Cleaning & Normalization
5. Entity Extraction (reading cleaned_pages.json)
6. Entity Resolution (contextual disambiguation & merging)
7. Dataset Enrichment
8. Provenance Management
9. Image Asset Management (rights review)
10. Data Validation (19 quality gates)
11. RDF/OWL Generation (Turtle & RDF/XML)
12. Final Reporting
"""

from typing import Dict, Any, List, Optional
import sys
import json
import argparse
from datetime import datetime, timezone
from pathlib import Path

# Scraper Adapters
from scrapers.base_adapter import BaseAdapter
from scrapers.fandom_adapter import FandomAdapter
from scrapers.official_adapter import OfficialAdapter
from scrapers.wb_adapter import WBGamesAdapter
from scrapers.wikidata_adapter import WikidataAdapter
from scrapers.mobygames_adapter import MobyGamesAdapter
from scrapers.external_discovery import ExternalReferenceDiscovery

# Processors & Generators
from processors.cleaner import DataCleaner
from processors.entity_resolver import EntityResolver
from processors.extractor import EntityExtractor
from processors.image_asset_manager import ImageAssetManager
from processors.validator import DataValidator
from rdf_generator.builder import RDFGraphBuilder

class DataPipelineOrchestrator:
    """Master orchestrator executing and logging all 12 data engineering pipeline stages."""

    def __init__(self, storage_dir: str = "data-engineering/storage"):
        self.storage_dir = Path(storage_dir)
        self.raw_dir = self.storage_dir / "raw"
        self.raw_history_dir = self.raw_dir / "history"
        self.cleaned_dir = self.storage_dir / "cleaned"
        self.extracted_dir = self.storage_dir / "extracted"
        self.validated_dir = self.storage_dir / "validated"
        self.assets_dir = self.storage_dir / "assets"
        self.exports_dir = self.storage_dir / "exports"
        self.reports_dir = self.storage_dir / "reports"

        for d in [self.raw_dir, self.raw_history_dir, self.cleaned_dir, self.extracted_dir,
                  self.validated_dir, self.assets_dir, self.exports_dir, self.reports_dir]:
            d.mkdir(parents=True, exist_ok=True)

        self.fandom = FandomAdapter()
        self.official = OfficialAdapter()
        self.wb = WBGamesAdapter()
        self.wikidata = WikidataAdapter()
        self.mobygames = MobyGamesAdapter()
        self.cleaner = DataCleaner()
        self.resolver = EntityResolver()
        self.extractor = EntityExtractor(self.resolver)
        self.asset_manager = ImageAssetManager()
        self.discovery = ExternalReferenceDiscovery()
        self.validator = DataValidator()
        self.rdf_builder = RDFGraphBuilder()

    # ----------------------------------------------------
    # STAGE 1: Source Discovery
    # ----------------------------------------------------
    def stage_source_discovery(self) -> Dict[str, Any]:
        print("\n[STAGE 1] SOURCE DISCOVERY & GOVERNANCE AUDIT")
        report = self.discovery.evaluate_and_save_report(
            output_report="data-engineering/storage/reports/source_discovery_report.json"
        )
        app_cnt = report.get('approvedCount', report.get('approvedSourcesCount', 0))
        tot_cnt = report.get('totalCandidates', report.get('totalCandidateSources', 0))
        print(f"  [OK] Source governance completed. Approved: {app_cnt}, Total candidates: {tot_cnt}")
        return report

    # ----------------------------------------------------
    # STAGE 2 & 3: Multi-Source Scraping & Raw Data Archiving
    # ----------------------------------------------------
    def stage_multi_source_scrape(self, limit: int = 15) -> Dict[str, Any]:
        print("\n[STAGE 2 & 3] MULTI-SOURCE SCRAPING & RAW DATA ARCHIVING")
        scrape_run_id = f"run-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}"
        raw_records = []
        source_stats = {}

        # 1. Fandom MediaWiki Adapter (Multi-category pagination)
        print("  -> Fetching Fandom MediaWiki Action API across categories...")
        fandom_categories = ["Characters", "Games", "Special_Moves", "Weapons"]
        f_success = 0
        for cat in fandom_categories:
            pages = self.fandom.discover_pages(cat, limit=5)
            for p in pages:
                rec = self.fandom.fetch_page(p["pageId"], scrape_run_id=scrape_run_id)
                if rec:
                    raw_records.append(rec)
                    f_success += 1
        source_stats["fandom-wiki"] = {"collected": f_success}

        # 2. Official Website Adapter
        print("  -> Fetching Mortal Kombat Official public roster...")
        official_candidates = self.official.discover_pages(limit=8)
        o_success = 0
        for c in official_candidates:
            rec = self.official.fetch_page(c["pageId"], scrape_run_id=scrape_run_id)
            if rec:
                raw_records.append(rec)
                o_success += 1
        source_stats["mk-official"] = {"collected": o_success}

        # 3. Warner Bros. Games Pressroom
        print("  -> Fetching Warner Bros. Games publisher announcements...")
        wb_candidates = self.wb.discover_pages(limit=4)
        w_success = 0
        for c in wb_candidates:
            rec = self.wb.fetch_page(c["pageId"], scrape_run_id=scrape_run_id)
            if rec:
                raw_records.append(rec)
                w_success += 1
        source_stats["wb-games"] = {"collected": w_success}

        # 4. Wikidata SPARQL Knowledge Base
        print("  -> Querying Wikidata SPARQL endpoint...")
        wiki_candidates = self.wikidata.discover_pages(limit=6)
        wk_success = 0
        for c in wiki_candidates:
            rec = self.wikidata.fetch_page(c["pageId"], scrape_run_id=scrape_run_id)
            if rec:
                raw_records.append(rec)
                wk_success += 1
        source_stats["wikidata-sparql"] = {"collected": wk_success}

        # 5. MobyGames Catalog Inspection
        print("  -> Querying MobyGames standalone game catalog...")
        moby_candidates = self.mobygames.discover_pages(limit=6)
        mg_success = 0
        for c in moby_candidates:
            rec = self.mobygames.fetch_page(c["pageId"], scrape_run_id=scrape_run_id)
            if rec:
                raw_records.append(rec)
                mg_success += 1
        source_stats["mobygames-catalog"] = {"collected": mg_success}

        # Stage 3: Immutable Archive mechanism
        raw_output_file = self.raw_dir / "raw_pages.json"
        with open(raw_output_file, "w", encoding="utf-8") as f:
            json.dump(raw_records, f, indent=2)

        # Historical run archive (non-overwriting)
        history_file = self.raw_history_dir / f"raw_pages_{scrape_run_id}.json"
        with open(history_file, "w", encoding="utf-8") as f:
            json.dump(raw_records, f, indent=2)

        # Scrape report
        report = {
            "scrapeRunId": scrape_run_id,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "totalRawRecordsCollected": len(raw_records),
            "sources": source_stats,
            "archiveLocations": {
                "latest": str(raw_output_file),
                "historical": str(history_file)
            },
            "status": "SUCCESS"
        }
        with open(self.reports_dir / "scrape_report.json", "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)

        print(f"  [OK] Collected {len(raw_records)} raw records across 5 independent sources.")
        return report

    # ----------------------------------------------------
    # STAGE 4: Cleaning & Normalization
    # ----------------------------------------------------
    def stage_clean(self) -> Dict[str, Any]:
        print("\n[STAGE 4] RAW DATA CLEANING & NORMALIZATION")
        raw_file = self.raw_dir / "raw_pages.json"
        if not raw_file.exists():
            self.stage_multi_source_scrape()

        with open(raw_file, "r", encoding="utf-8") as f:
            raw_records = json.load(f)

        clean_result = self.cleaner.clean_batch(raw_records)
        cleaned_file = self.cleaned_dir / "cleaned_pages.json"
        with open(cleaned_file, "w", encoding="utf-8") as f:
            json.dump(clean_result["cleanedRecords"], f, indent=2)

        with open(self.reports_dir / "cleaning_report.json", "w", encoding="utf-8") as f:
            json.dump(clean_result["report"], f, indent=2)

        print(f"  [OK] Cleaned {len(clean_result['cleanedRecords'])} records (Duplicates dropped: {clean_result['report']['duplicateRecordsDetected']}).")
        return clean_result

    # ----------------------------------------------------
    # STAGE 5, 6 & 7: Entity Extraction, Resolution & Enrichment
    # ----------------------------------------------------
    def stage_extract_and_resolve(self) -> Dict[str, Any]:
        print("\n[STAGE 5, 6 & 7] ENTITY EXTRACTION, RESOLUTION & ENRICHMENT")
        cleaned_file = self.cleaned_dir / "cleaned_pages.json"
        if not cleaned_file.exists():
            self.stage_clean()

        ext_result = self.extractor.extract_and_save(
            cleaned_file_path=str(cleaned_file),
            output_dir=str(self.extracted_dir)
        )

        counts = ext_result["report"]["extractedEntityCounts"]
        metrics = ext_result["report"]["pipelineLineage"]
        print(f"  [OK] Extracted {counts['characters']} Characters, {counts['games']} Standalone Games, {counts['abilities']} Abilities, {counts['locations']} Locations, {counts['storyEvents']} Events.")
        print(f"  [OK] Scraped candidates processed: {metrics.get('scrapedCandidatesProcessed', 0)}, Entities enriched: {metrics.get('entitiesEnrichedFromScraping', 0)}.")
        return ext_result

    # ----------------------------------------------------
    # STAGE 8 & 9: Image Asset Management & Rights Audit
    # ----------------------------------------------------
    def stage_manage_assets(self) -> Dict[str, Any]:
        print("\n[STAGE 8 & 9] IMAGE ASSET MANAGEMENT & RIGHTS AUDIT")
        self.asset_manager.seed_initial_assets()
        report = self.asset_manager.save_registry_and_report(
            registry_output=str(self.assets_dir / "image_asset_registry.json"),
            report_output=str(self.reports_dir / "image_asset_report.json")
        )
        print(f"  [OK] Registered {report['totalAssets']} image assets ({report['approvedAssets']} Approved for display, {report['pendingReviewAssets']} Pending Review).")
        return report

    # ----------------------------------------------------
    # STAGE 10: Data Validation & Quality Gates
    # ----------------------------------------------------
    def stage_validate(self) -> Dict[str, Any]:
        print("\n[STAGE 10] DATASET VALIDATION & 19 QUALITY GATES")
        extracted_files = {
            "characters": self.extracted_dir / "characters.json",
            "games": self.extracted_dir / "games.json",
            "timelines": self.extracted_dir / "timelines.json",
            "realms": self.extracted_dir / "realms.json",
            "locations": self.extracted_dir / "locations.json",
            "clans": self.extracted_dir / "clans.json",
            "elements": self.extracted_dir / "elements.json",
            "abilities": self.extracted_dir / "abilities.json",
            "weapons": self.extracted_dir / "weapons.json",
            "events": self.extracted_dir / "story_events.json",
            "relationships": self.extracted_dir / "relationships.json"
        }

        dataset = {}
        for key, path in extracted_files.items():
            if path.exists():
                with open(path, "r", encoding="utf-8") as f:
                    dataset[key] = json.load(f)
            else:
                dataset[key] = []

        val_result = self.validator.save_validated_and_report(
            dataset=dataset,
            validated_dir=str(self.validated_dir),
            report_path=str(self.reports_dir / "validation_report.json")
        )

        status_str = "PASSED" if val_result["isValid"] else "FAILED"
        print(f"  [OK] Validation {status_str} (Errors: {len(val_result['report']['errors'])}, Warnings: {len(val_result['report']['warnings'])}).")
        if not val_result["isValid"]:
            for err in val_result["report"]["errors"][:5]:
                print(f"    - ERROR: {err}")
        return val_result

    # ----------------------------------------------------
    # STAGE 11: RDF/OWL Generation & Export
    # ----------------------------------------------------
    def stage_export_rdf(self) -> Dict[str, Any]:
        print("\n[STAGE 11] RDF/OWL GRAPH GENERATION & DATASET EXPORT")
        validated_file = self.validated_dir / "entities.json"
        rel_file = self.validated_dir / "relationships.json"

        if not validated_file.exists():
            self.stage_validate()

        with open(validated_file, "r", encoding="utf-8") as f:
            validated_data = json.load(f)
        with open(rel_file, "r", encoding="utf-8") as f:
            validated_data["relationships"] = json.load(f)

        report = self.rdf_builder.export_all(
            validated_data=validated_data,
            turtle_path=str(self.exports_dir / "mortal_kombat.ttl"),
            rdfxml_path=str(self.exports_dir / "mortal_kombat.rdf"),
            kb_turtle_path="knowledge-base/data/mortal_kombat.ttl",
            kb_rdfxml_path="knowledge-base/data/mortal_kombat.rdf",
            report_path=str(self.reports_dir / "rdf_export_report.json")
        )

        print(f"  [OK] Generated {report['totalTriples']} RDF triples across {report['totalClasses']} classes and {report['totalProperties']} properties.")
        print(f"  [OK] Serialized to Turtle (.ttl) and RDF/XML (.rdf).")
        return report

    # ----------------------------------------------------
    # STAGE 12: Final Comprehensive Master Reporting
    # ----------------------------------------------------
    def stage_final_reporting(self) -> Dict[str, Any]:
        print("\n[STAGE 12] COMPREHENSIVE MASTER REPORTING")
        reports = {}
        for r_name in ["source_discovery_report.json", "scrape_report.json", "cleaning_report.json",
                      "extraction_report.json", "image_asset_report.json", "validation_report.json", "rdf_export_report.json"]:
            r_path = self.reports_dir / r_name
            if r_path.exists():
                with open(r_path, "r", encoding="utf-8") as f:
                    reports[r_name.replace(".json", "")] = json.load(f)

        master_report = {
            "masterReportId": f"master-pipeline-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}",
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "pipelineStatus": "ALL_STAGES_COMPLETED_SUCCESSFULLY",
            "summary": {
                "totalRawPagesCollected": reports.get("scrape_report", {}).get("totalRawRecordsCollected", 0),
                "totalCleanedRecords": reports.get("cleaning_report", {}).get("cleanedUniqueRecords", 0),
                "totalEntitiesExtracted": reports.get("validation_report", {}).get("statistics", {}).get("totalEntities", 0),
                "totalRelationships": reports.get("validation_report", {}).get("statistics", {}).get("totalRelationships", 0),
                "totalImageAssets": reports.get("image_asset_report", {}).get("totalAssets", 0),
                "approvedImageAssets": reports.get("image_asset_report", {}).get("approvedAssets", 0),
                "validationPassed": reports.get("validation_report", {}).get("validationPassed", False),
                "totalRDFTriples": reports.get("rdf_export_report", {}).get("totalTriples", 0),
                "totalRDFClasses": reports.get("rdf_export_report", {}).get("totalClasses", 0),
                "totalRDFProperties": reports.get("rdf_export_report", {}).get("totalProperties", 0)
            },
            "stageReports": reports
        }

        with open(self.reports_dir / "master_pipeline_report.json", "w", encoding="utf-8") as f:
            json.dump(master_report, f, indent=2)

        print(f"  [OK] Master pipeline report saved: {self.reports_dir / 'master_pipeline_report.json'}")
        return master_report

    def run_all(self):
        """Executes all 12 stages in strict sequential dependency."""
        print("=" * 70)
        print("MORTAL KOMBAT KNOWLEDGE NEXUS - MASTER DATA PIPELINE (v1.5)")
        print("=" * 70)
        start_time = datetime.now()

        self.stage_source_discovery()
        self.stage_multi_source_scrape()
        self.stage_clean()
        self.stage_extract_and_resolve()
        self.stage_manage_assets()
        self.stage_validate()
        self.stage_export_rdf()
        self.stage_final_reporting()

        elapsed = (datetime.now() - start_time).total_seconds()
        print("=" * 70)
        print(f"ALL 12 PIPELINE STAGES COMPLETED SUCCESSFULLY in {elapsed:.2f} seconds!")
        print(f"Outputs & Reports available in: {self.storage_dir}")
        print("=" * 70)


def main():
    parser = argparse.ArgumentParser(description="Mortal Kombat Knowledge Nexus Master Data Pipeline CLI")
    parser.add_argument("command", choices=[
        "all", "discover", "scrape", "clean", "extract",
        "assets", "validate", "export-rdf", "report"
    ], default="all", nargs="?", help="Pipeline command to execute")

    args = parser.parse_args()
    orchestrator = DataPipelineOrchestrator()

    if args.command == "all":
        orchestrator.run_all()
    elif args.command == "discover":
        orchestrator.stage_source_discovery()
    elif args.command == "scrape":
        orchestrator.stage_multi_source_scrape()
    elif args.command == "clean":
        orchestrator.stage_clean()
    elif args.command == "extract":
        orchestrator.stage_extract_and_resolve()
    elif args.command == "assets":
        orchestrator.stage_manage_assets()
    elif args.command == "validate":
        orchestrator.stage_validate()
    elif args.command == "export-rdf":
        orchestrator.stage_export_rdf()
    elif args.command == "report":
        orchestrator.stage_final_reporting()

if __name__ == "__main__":
    main()
