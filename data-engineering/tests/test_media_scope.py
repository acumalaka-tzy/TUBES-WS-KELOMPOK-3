"""
Unit Tests for Media Scope Filtering
Implements verification of PRD v1.5 Section 5.2, 6.1 & Master Prompt Section 3:
Restricts dataset exclusively to standalone Mortal Kombat video games.
"""

import unittest
from processors.media_scope_filter import MediaScopeFilter

class TestMediaScopeFilter(unittest.TestCase):

    def setUp(self):
        self.filter = MediaScopeFilter()

    def test_canonical_game_characters_allowed(self):
        canonical = ["Scorpion", "Sub-Zero", "Raiden", "Liu Kang", "Johnny Cage", "Sonya Blade", "Shang Tsung", "Mileena", "Baraka", "Goro"]
        for name in canonical:
            allowed, reason = self.filter.evaluate_entity(name, categories=["Characters", "Playable characters in Mortal Kombat"])
            self.assertTrue(allowed, f"Expected canonical character {name} to be allowed, but rejected: {reason}")
            self.assertIsNone(reason)

    def test_non_game_media_characters_rejected(self):
        # TV series, comics, movie characters
        non_game_cases = [
            ("Aavi", "TV Series: Mortal Kombat: Conquest"),
            ("Abacus", "Malibu Comics"),
            ("Allison Young", "1995 novelization"),
            ("Art Lean", "1995 film"),
            ("Baphomet", "Malibu Comics"),
            ("Cole Young", "2021 film"),
            ("Siang", "Malibu Comics"),
            ("Hydro", "Malibu Comics"),
            ("Siro", "TV Series: Mortal Kombat: Conquest"),
            ("Taja", "TV Series: Mortal Kombat: Conquest")
        ]
        for name, expected_media in non_game_cases:
            allowed, reason = self.filter.evaluate_entity(name)
            self.assertFalse(allowed, f"Expected non-game character {name} to be rejected!")
            self.assertIsNotNone(reason)

    def test_guest_dlc_characters_rejected(self):
        dlc_guests = ["Spawn", "Homelander", "Omni-Man", "Peacemaker", "Terminator", "RoboCop", "Joker", "Ghostface", "T-1000", "Conan"]
        for name in dlc_guests:
            allowed, reason = self.filter.evaluate_entity(name)
            self.assertFalse(allowed, f"Expected DLC guest {name} to be rejected!")
            self.assertIn("DLC", reason)

    def test_category_based_non_game_rejection(self):
        # Entity with non-game category tags
        allowed, reason = self.filter.evaluate_entity(
            "Some Film Warrior",
            categories=["Mortal Kombat (1995 film) characters", "Movie extras"]
        )
        self.assertFalse(allowed)
        self.assertIn("non-game media", reason)

    def test_exclusion_report_generation(self):
        excluded = [
            {"candidateName": "Cole Young", "entityType": "character", "reason": "Film exclusive", "status": "excluded"}
        ]
        report = self.filter.export_exclusion_report(excluded, "data-engineering/storage/reports/test_media_exclusion.json")
        self.assertEqual(report["totalEntitiesExcluded"], 1)
        self.assertEqual(report["excludedEntities"][0]["candidateName"], "Cole Young")

if __name__ == "__main__":
    unittest.main()
