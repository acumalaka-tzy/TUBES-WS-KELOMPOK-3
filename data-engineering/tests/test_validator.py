"""
Unit Tests for Data Validation & 19 Quality Gates
"""

import unittest
from processors.validator import DataValidator

class TestDataValidator(unittest.TestCase):

    def setUp(self):
        self.validator = DataValidator()

    def test_referential_integrity_broken_foreign_key(self):
        invalid_dataset = {
            "games": [{"id": "game-mk1", "name": "MK1", "releaseDate": "1992-10-08", "isStandalone": True, "sourceURL": "http://example.com"}],
            "timelines": [{"id": "timeline-orig", "name": "Original", "period": "1992"}],
            "realms": [],
            "locations": [],
            "clans": [],
            "elements": [],
            "abilities": [],
            "weapons": [],
            "characters": [
                {
                    "id": "char-1",
                    "name": "Fighter",
                    "species": "Human",
                    "sourceURL": "http://example.com",
                    "versions": [
                        {
                            "versionId": "ver-1",
                            "gameId": "game-unknown-999", # Broken FK
                            "timelineId": "timeline-orig"
                        }
                    ]
                }
            ],
            "events": [],
            "relationships": []
        }

        res = self.validator.validate_dataset(invalid_dataset)
        self.assertFalse(res["isValid"])
        self.assertTrue(any("unknown gameId" in e for e in res["report"]["errors"]))

    def test_dlc_contamination_detection(self):
        dlc_contaminated_dataset = {
            "games": [],
            "timelines": [],
            "realms": [],
            "locations": [],
            "clans": [],
            "elements": [],
            "abilities": [],
            "weapons": [],
            "characters": [
                {
                    "id": "character-spawn",
                    "name": "Spawn", # Prohibited DLC
                    "species": "Hellspawn",
                    "sourceURL": "http://example.com",
                    "versions": []
                }
            ],
            "events": [],
            "relationships": []
        }

        res = self.validator.validate_dataset(dlc_contaminated_dataset)
        self.assertFalse(res["isValid"])
        self.assertTrue(any("Prohibited DLC item" in e for e in res["report"]["errors"]))

    def test_missing_provenance_detection(self):
        no_provenance_dataset = {
            "games": [
                {"id": "game-mk1", "name": "MK1", "releaseDate": "1992-10-08", "isStandalone": True} # Missing sourceURL
            ],
            "timelines": [],
            "realms": [],
            "locations": [],
            "clans": [],
            "elements": [],
            "abilities": [],
            "weapons": [],
            "characters": [],
            "events": [],
            "relationships": []
        }

        res = self.validator.validate_dataset(no_provenance_dataset)
        self.assertFalse(res["isValid"])
        self.assertTrue(any("Missing sourceURL provenance" in e for e in res["report"]["errors"]))

if __name__ == "__main__":
    unittest.main()
