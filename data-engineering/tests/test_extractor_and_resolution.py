"""
Unit Tests for Entity Extraction, Resolution & Disambiguation
"""

import unittest
from processors.entity_resolver import EntityResolver
from processors.extractor import EntityExtractor

class TestExtractorAndResolution(unittest.TestCase):

    def setUp(self):
        self.resolver = EntityResolver()
        self.extractor = EntityExtractor(self.resolver)

    def test_bi_han_contextual_disambiguation(self):
        # 1. Bi-Han in MK Mythologies / MK1 context -> resolves to Sub-Zero
        subzero_id = self.resolver.disambiguate_identity(
            name="Bi-Han",
            context_text="Mortal Kombat Mythologies Sub-Zero cryomancer grandmaster in MK1"
        )
        self.assertEqual(subzero_id, "character-subzero")

        # 2. Bi-Han in Netherrealm wraith context -> resolves to Noob Saibot
        noob_id = self.resolver.disambiguate_identity(
            name="Bi-Han",
            context_text="Resurrected shadow wraith servant of Quan Chi in Netherrealm"
        )
        self.assertEqual(noob_id, "character-noobsaibot")

    def test_kuai_liang_new_era_disambiguation(self):
        # In New Era (MK1 2023), Kuai Liang is Scorpion!
        new_era_id = self.resolver.disambiguate_identity(
            name="Kuai Liang",
            context_text="Mortal Kombat 1 2023 New Era brother of Bi-Han wielding fire",
            timeline_id="timeline-new-era"
        )
        self.assertEqual(new_era_id, "character-scorpion")

        # In Original or Reboot timeline, Kuai Liang is Sub-Zero
        classic_id = self.resolver.disambiguate_identity(
            name="Kuai Liang",
            context_text="Original timeline Lin Kuei cryomancer",
            timeline_id="timeline-original"
        )
        self.assertEqual(classic_id, "character-subzero")

    def test_extraction_from_cleaned_records(self):
        sample_cleaned = [
            {
                "sourceId": "fandom-wiki",
                "pageTitle": "Scorpion",
                "sourceURL": "https://mortalkombat.fandom.com/wiki/Scorpion",
                "cleanedContent": "Scorpion is a ninja specter who was the bitter enemy of Sub-Zero.",
                "retrievedAt": "2026-11-22T10:00:00Z",
                "metadata": {
                    "infobox": {"name": "Scorpion", "species": "Specter", "weapons": "Kunai Spear"},
                    "categories": ["Characters"]
                }
            },
            {
                "sourceId": "wikidata-sparql",
                "pageTitle": "Mortal Kombat 1",
                "sourceURL": "https://www.wikidata.org/wiki/Q118464670",
                "cleanedContent": "{\"title\": \"Mortal Kombat 1\", \"releaseDate\": \"2023-09-19\", \"developer\": \"NetherRealm Studios\"}",
                "retrievedAt": "2026-11-22T10:00:00Z",
                "metadata": {"qid": "Q118464670"}
            }
        ]

        dataset = self.extractor.extract_and_merge(sample_cleaned)
        characters = dataset["characters"]
        games = dataset["games"]

        # Check Scorpion enriched
        scorp = next((c for c in characters if c["id"] == "character-scorpion"), None)
        self.assertIsNotNone(scorp)

        # Check games exist
        mk1 = next((g for g in games if g["id"] == "game-mk1-2023"), None)
        self.assertIsNotNone(mk1)

    def test_duplicate_detection(self):
        entities = [
            {"id": "character-scorpion", "name": "Scorpion"},
            {"id": "character-scorp-copy", "name": "Scorpion"} # duplicate name clash
        ]
        dupes = self.resolver.find_potential_duplicates(entities)
        self.assertEqual(len(dupes), 1)
        self.assertEqual(dupes[0]["normalizedName"], "scorpion")

if __name__ == "__main__":
    unittest.main()
