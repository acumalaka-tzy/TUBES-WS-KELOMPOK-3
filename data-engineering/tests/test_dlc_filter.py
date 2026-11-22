"""
Unit Tests for Strict DLC Filtering & Content Exclusion
"""

import unittest
from processors.extractor import EntityExtractor

class TestDLCFilter(unittest.TestCase):

    def setUp(self):
        self.extractor = EntityExtractor()

    def test_guest_dlc_exclusion(self):
        # Guest DLCs must be strictly prohibited
        forbidden_guests = [
            "Spawn", "RoboCop", "Terminator", "The Joker", "Homelander",
            "Peacemaker", "Omni-Man", "Conan", "Ghostface", "T-1000",
            "Leatherface", "Alien", "Predator", "Jason Voorhees"
        ]
        for guest in forbidden_guests:
            self.assertTrue(
                self.extractor.is_dlc_excluded(guest),
                f"Guest character '{guest}' must be recognized as DLC excluded."
            )

    def test_canonical_characters_not_excluded(self):
        # Base roster canonical characters must NOT be excluded
        canonical_fighters = [
            "Scorpion", "Sub-Zero", "Raiden", "Liu Kang", "Johnny Cage",
            "Sonya Blade", "Kitana", "Mileena", "Jade", "Kabal",
            "Nightwolf", "Sheeva", "Kenshi", "D'Vorah", "Cassie Cage"
        ]
        for fighter in canonical_fighters:
            self.assertFalse(
                self.extractor.is_dlc_excluded(fighter),
                f"Canonical fighter '{fighter}' must NOT be excluded as DLC."
            )

if __name__ == "__main__":
    unittest.main()
