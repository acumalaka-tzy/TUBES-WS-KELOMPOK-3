"""
Unit Tests for Scraper Adapters & API Response Parsing
"""

import unittest
from unittest.mock import patch, MagicMock
import json
from scrapers.fandom_adapter import FandomAdapter
from scrapers.wikidata_adapter import WikidataAdapter
from scrapers.mobygames_adapter import MobyGamesAdapter
from scrapers.official_adapter import OfficialAdapter
from scrapers.wb_adapter import WBGamesAdapter

class TestScraperAdapters(unittest.TestCase):

    def setUp(self):
        self.fandom = FandomAdapter(request_delay=0.0)
        self.wikidata = WikidataAdapter(request_delay=0.0)
        self.mobygames = MobyGamesAdapter(request_delay=0.0)
        self.official = OfficialAdapter(request_delay=0.0)
        self.wb = WBGamesAdapter(request_delay=0.0)

    def test_fandom_infobox_parser(self):
        wikitext = """
        {{Character
        | name = Sub-Zero
        | species = [[Cryomancer]]
        | origin = [[Earthrealm]]
        | weapons = [[Kōri Blade]]
        | clan = [[Lin Kuei]]
        }}
        == Biography ==
        Grandmaster of the Lin Kuei clan.
        """
        ib = self.fandom.parse_infobox(wikitext)
        self.assertEqual(ib.get("name"), "Sub-Zero")
        self.assertEqual(ib.get("species"), "Cryomancer")
        self.assertEqual(ib.get("origin"), "Earthrealm")
        self.assertEqual(ib.get("weapons"), "Kōri Blade")
        self.assertEqual(ib.get("clan"), "Lin Kuei")

    @patch("requests.Session.get")
    def test_fandom_discover_pages_with_pagination(self, mock_get):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "query": {
                "categorymembers": [
                    {"pageid": 101, "title": "Scorpion"},
                    {"pageid": 102, "title": "Sub-Zero"}
                ]
            }
        }
        mock_response.text = json.dumps(mock_response.json.return_value)
        mock_response.url = "https://mortalkombat.fandom.com/api.php"
        mock_get.return_value = mock_response

        pages = self.fandom.discover_pages(category="Characters", limit=2)
        self.assertEqual(len(pages), 2)
        self.assertEqual(pages[0]["pageId"], "Scorpion")
        self.assertEqual(pages[1]["pageId"], "Sub-Zero")

    def test_wikidata_games_query_fallback(self):
        # Verify fallback data structure when remote SPARQL is not reachable
        res = self.wikidata.query_games()
        games = res.get("games", [])
        self.assertTrue(len(games) >= 10)
        self.assertTrue(any(g["title"] == "Mortal Kombat (1992)" for g in games))
        self.assertTrue(any("Q" in g["qid"] for g in games))

    def test_mobygames_catalog_classification(self):
        catalog = self.mobygames.get_catalog_verification()
        self.assertTrue(len(catalog) >= 10)
        for entry in catalog:
            self.assertEqual(entry["classification"], "standalone_game")
            self.assertTrue(entry["releaseYear"] >= 1992)
            self.assertTrue(len(entry["platforms"]) > 0)

    def test_official_adapter_discovery(self):
        pages = self.official.discover_pages(limit=5)
        self.assertEqual(len(pages), 5)
        self.assertIn("pageId", pages[0])
        self.assertIn("url", pages[0])

    @patch("requests.Session.get")
    def test_wb_adapter_fetch(self, mock_get):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.text = "<article><h1>Warner Bros. Games Announces Mortal Kombat 1</h1><p>Available on PC and Consoles.</p></article>"
        mock_response.content = mock_response.text.encode("utf-8")
        mock_response.url = "https://press.wbd.com/us/media-release/warner-bros-games-announces-mortal-kombat-1"
        mock_get.return_value = mock_response

        rec = self.wb.fetch_page("wb-mk1-announcement")
        self.assertIsNotNone(rec)
        self.assertEqual(rec["httpStatus"], 200)
        self.assertIn("Mortal Kombat 1", rec["pageTitle"])
        self.assertIn("Available on PC", rec["cleanedContent"] if "cleanedContent" in rec else rec["rawContent"])

if __name__ == "__main__":
    unittest.main()
