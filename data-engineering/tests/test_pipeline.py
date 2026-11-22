"""
Integration Tests for DataPipelineOrchestrator
"""

import unittest
from pipeline import DataPipelineOrchestrator

class TestPipelineExecution(unittest.TestCase):

    def setUp(self):
        self.orchestrator = DataPipelineOrchestrator(storage_dir="data-engineering/storage")

    def test_pipeline_components_initialization(self):
        self.assertIsNotNone(self.orchestrator.fandom)
        self.assertIsNotNone(self.orchestrator.official)
        self.assertIsNotNone(self.orchestrator.wb)
        self.assertIsNotNone(self.orchestrator.wikidata)
        self.assertIsNotNone(self.orchestrator.mobygames)
        self.assertIsNotNone(self.orchestrator.extractor)
        self.assertIsNotNone(self.orchestrator.validator)
        self.assertIsNotNone(self.orchestrator.rdf_builder)

    def test_pipeline_validation_stage(self):
        # Run extraction stage first to ensure extracted JSONs exist
        self.orchestrator.stage_extract_and_resolve()
        val_res = self.orchestrator.stage_validate()
        self.assertTrue(val_res["isValid"], f"Validation failed with errors: {val_res['report']['errors']}")
        self.assertEqual(len(val_res["report"]["errors"]), 0)

if __name__ == "__main__":
    unittest.main()
