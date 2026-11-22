"""
Unit Tests for Data Cleaning, Normalization & Deduplication
"""

import unittest
from processors.cleaner import DataCleaner

class TestDataCleaner(unittest.TestCase):

    def setUp(self):
        self.cleaner = DataCleaner()

    def test_html_and_ref_stripping(self):
        raw_text = "<p>Hanzo Hasashi<ref name='lore'>MK Lore Archives</ref> is the resurrected Shirai Ryu ninja.</p>"
        cleaned = self.cleaner.clean_text(raw_text)
        self.assertNotIn("<p>", cleaned)
        self.assertNotIn("</p>", cleaned)
        self.assertNotIn("MK Lore Archives", cleaned)
        self.assertIn("Hanzo Hasashi", cleaned)
        self.assertIn("Shirai Ryu", cleaned)

    def test_unicode_normalization(self):
        # Combining character e + acute accent vs precomposed é
        combining = "K\u014dri Blade"
        cleaned = self.cleaner.clean_text(combining)
        self.assertEqual(cleaned, "Kōri Blade")

    def test_content_hashing_and_deduplication(self):
        records = [
            {
                "rawRecordId": "raw-1",
                "sourceId": "fandom-wiki",
                "sourcePageId": "Scorpion",
                "sourceURL": "https://mortalkombat.fandom.com/wiki/Scorpion",
                "canonicalURL": "https://mortalkombat.fandom.com/wiki/Scorpion",
                "pageTitle": "Scorpion",
                "rawContent": "Resurrected Shirai Ryu ninja specter.",
                "contentHash": "abc",
                "retrievedAt": "2026-11-22T10:00:00Z"
            },
            {
                "rawRecordId": "raw-2",
                "sourceId": "fandom-wiki",
                "sourcePageId": "Scorpion",
                "sourceURL": "https://mortalkombat.fandom.com/wiki/Scorpion",
                "canonicalURL": "https://mortalkombat.fandom.com/wiki/Scorpion",
                "pageTitle": "Scorpion",
                "rawContent": "Resurrected Shirai Ryu ninja specter.", # Exact duplicate
                "contentHash": "abc",
                "retrievedAt": "2026-11-22T10:00:00Z"
            }
        ]

        res = self.cleaner.clean_batch(records)
        self.assertEqual(len(res["cleanedRecords"]), 1)
        self.assertEqual(res["report"]["duplicateRecordsDetected"], 1)

if __name__ == "__main__":
    unittest.main()
