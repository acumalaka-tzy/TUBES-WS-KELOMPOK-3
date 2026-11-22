"""
Unit Tests for Image Asset Management and Rights Verification
Implements PRD v1.5 FR-31 & Master Prompt Section 3:
Verifies image asset fields, accessibility, attribution, licensing, and strict rights approval.
"""

import unittest
from processors.image_asset_manager import ImageAssetManager

class TestImageAssetManager(unittest.TestCase):

    def setUp(self):
        self.manager = ImageAssetManager()

    def test_url_syntax_validation(self):
        valid_urls = [
            "https://press.wbd.com/media/games/mk1-2023/boxart.webp",
            "https://www.mortalkombat.com/assets/roster/scorpion_render.png",
            "https://static.wikia.nocookie.net/mortalkombat/images/subzero.jpg"
        ]
        for url in valid_urls:
            self.assertTrue(self.manager.validate_asset_url(url), f"URL should be valid: {url}")

        invalid_urls = [
            "ftp://invalid-protocol.com/image.png",
            "not-a-url-at-all",
            "https://domain-without-extension/character",
            ""
        ]
        for url in invalid_urls:
            self.assertFalse(self.manager.validate_asset_url(url), f"URL should be invalid: {url}")

    def test_official_asset_approval(self):
        # Official WB Games press kit asset
        rec = self.manager.register_asset(
            asset_id="asset-mk1-test",
            entity_id="game-mk1-2023",
            asset_type="game_cover",
            source_id="wb-games",
            source_page_url="https://press.wbd.com/us/brands/warner-bros-games",
            asset_url="https://press.wbd.com/media/games/mk1/boxart.webp",
            rights_status="approved",
            license_name="Warner Bros. Games Press Kit Editorial License"
        )
        self.assertEqual(rec["rightsStatus"], "approved")
        self.assertTrue(rec["isApprovedForDisplay"])
        self.assertEqual(rec["verificationStatus"], "verified")
        self.assertEqual(rec["sourceName"], "Warner Bros. Games Pressroom")

    def test_unvetted_community_asset_held_in_pending_review(self):
        # Community fandom asset: even if caller requests approved, policy forces pending-review
        rec = self.manager.register_asset(
            asset_id="asset-reptile-fandom",
            entity_id="character-reptile",
            asset_type="character_portrait",
            source_id="fandom-wiki",
            source_page_url="https://mortalkombat.fandom.com/wiki/Reptile",
            asset_url="https://static.wikia.nocookie.net/mortalkombat/images/reptile_portrait.webp",
            rights_status="approved" # Illegal request for community image
        )
        self.assertEqual(rec["rightsStatus"], "pending-review")
        self.assertFalse(rec["isApprovedForDisplay"])
        self.assertEqual(rec["verificationStatus"], "pending-review")

    def test_required_metadata_fields_and_hash(self):
        self.manager.seed_initial_assets()
        self.assertGreater(len(self.manager.assets), 50)

        required_fields = [
            "assetId", "entityId", "assetURL", "sourceURL", "sourceName",
            "attribution", "license", "rightsStatus", "verificationStatus",
            "retrievedAt", "contentType", "fileHash", "isApprovedForDisplay"
        ]

        for asset in self.manager.assets:
            for field in required_fields:
                self.assertIn(field, asset, f"Asset {asset.get('assetId')} must contain field '{field}'")
            self.assertEqual(len(asset["fileHash"]), 64, "fileHash must be a valid 64-character SHA-256 hex string")

if __name__ == "__main__":
    unittest.main()
