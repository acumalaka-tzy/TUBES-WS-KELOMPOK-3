"""
Unit Tests for Reporting Consistency Across Pipeline Stages
Implements Master Prompt Section 5:
Verifies dynamic consistency of character versions, entities, relationships,
and RDF triples across Extracted JSON, Validated JSON, and Reports.
"""

import unittest
from processors.extractor import EntityExtractor
from processors.validator import DataValidator
from rdf_generator.builder import RDFGraphBuilder

class TestReportingConsistency(unittest.TestCase):

    def setUp(self):
        self.extractor = EntityExtractor()
        self.validator = DataValidator()
        self.builder = RDFGraphBuilder()

    def test_dynamic_character_versions_count_consistency(self):
        # 1. Run extraction
        ext_res = self.extractor.extract_and_merge([])
        characters = ext_res["characters"]
        extracted_version_count = sum(len(c.get("versions", [])) for c in characters)

        self.assertGreater(extracted_version_count, 0)
        self.assertEqual(
            ext_res["extractionMetrics"]["totalCharacterVersions"],
            extracted_version_count
        )

        # 2. Validate dataset
        val_res = self.validator.validate_dataset(ext_res)
        self.assertTrue(val_res["isValid"])
        val_stats = val_res["report"]["statistics"]

        self.assertEqual(
            val_stats["totalCharacterVersions"],
            extracted_version_count,
            "Validation statistics totalCharacterVersions must strictly match extracted versions count."
        )

        # 3. Build RDF graph and check CharacterVersion instance count
        g = self.builder.build_graph(ext_res)
        rdf_stats = self.builder.compute_graph_statistics(g)

        rdf_version_instances = rdf_stats["classInstanceCounts"].get("mk:CharacterVersion", 0)
        self.assertEqual(
            rdf_version_instances,
            extracted_version_count,
            "RDF CharacterVersion instance count must strictly equal extracted and validated versions count."
        )

    def test_entity_and_relationship_counts_consistency(self):
        ext_res = self.extractor.extract_and_merge([])
        val_res = self.validator.validate_dataset(ext_res)

        val_stats = val_res["report"]["statistics"]
        total_entities_expected = (
            len(ext_res["characters"]) +
            len(ext_res["games"]) +
            len(ext_res["timelines"]) +
            len(ext_res["realms"]) +
            len(ext_res["locations"]) +
            len(ext_res["clans"]) +
            len(ext_res["elements"]) +
            len(ext_res["abilities"]) +
            len(ext_res["weapons"]) +
            len(ext_res["events"])
        )

        self.assertEqual(val_stats["totalEntities"], total_entities_expected)
        self.assertEqual(val_stats["totalRelationships"], len(ext_res["relationships"]))

if __name__ == "__main__":
    unittest.main()
