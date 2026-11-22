"""
Unit Tests for RDF/OWL Graph Builder and Serializer
"""

import unittest
from rdflib import Graph
from rdf_generator.builder import RDFGraphBuilder

class TestRDFBuilder(unittest.TestCase):

    def setUp(self):
        self.builder = RDFGraphBuilder()

    def test_graph_building_and_statistics(self):
        sample_validated = {
            "games": [
                {
                    "id": "game-mk1-1992",
                    "name": "Mortal Kombat (1992)",
                    "releaseDate": "1992-10-08",
                    "era": "Classic Era",
                    "platforms": ["Arcade", "SNES"],
                    "description": "Original fighting game.",
                    "sourceURL": "https://example.org/mk1"
                }
            ],
            "timelines": [
                {"id": "timeline-original", "name": "Original Timeline", "period": "1992-2006"}
            ],
            "realms": [
                {"id": "realm-earthrealm", "name": "Earthrealm", "description": "Home realm of mortals."}
            ],
            "locations": [
                {"id": "location-the-pit", "name": "The Pit", "realmId": "realm-earthrealm", "description": "Spike bridge."}
            ],
            "clans": [
                {"id": "org-lin-kuei", "name": "Lin Kuei", "type": "clan", "description": "Cryomancer clan."}
            ],
            "elements": [
                {"id": "element-ice", "name": "Ice", "description": "Freezing moisture."}
            ],
            "abilities": [
                {"id": "move-ice-freeze", "name": "Deep Freeze", "category": "Special Move", "elementId": "element-ice"}
            ],
            "weapons": [
                {"id": "weapon-kori-blade", "name": "Kōri Blade", "description": "Cryogenic sword."}
            ],
            "characters": [
                {
                    "id": "character-subzero",
                    "name": "Sub-Zero",
                    "species": "Cryomancer",
                    "originRealm": "realm-earthrealm",
                    "sourceURL": "https://example.org/subzero",
                    "versions": [
                        {
                            "versionId": "version-subzero-mk1",
                            "gameId": "game-mk1-1992",
                            "timelineId": "timeline-original",
                            "clan": "org-lin-kuei",
                            "abilities": ["move-ice-freeze"],
                            "weapons": ["weapon-kori-blade"]
                        }
                    ]
                }
            ],
            "events": [
                {
                    "id": "event-first-tournament",
                    "eventTitle": "Tenth Mortal Kombat Tournament",
                    "timelineId": "timeline-original",
                    "participants": ["character-subzero"],
                    "sourceURL": "https://example.org/event1"
                }
            ],
            "relationships": [
                {
                    "subjectId": "character-subzero",
                    "predicate": "enemyOf",
                    "objectId": "character-subzero"
                }
            ]
        }

        g = self.builder.build_graph(sample_validated)
        self.assertTrue(len(g) > 20)

        # Compute dynamic statistics
        stats = self.builder.compute_graph_statistics(g)
        self.assertEqual(stats["totalTriples"], len(g))
        self.assertIn("mk:Character", stats["classes"])
        self.assertIn("mk:Game", stats["classes"])
        self.assertIn("mk:Location", stats["classes"])
        self.assertIn("mk:Element", stats["classes"])
        self.assertIn("mk:hasAbility", stats["properties"])

        # Test Turtle serialization
        turtle_out = g.serialize(format="turtle")
        self.assertIn("mk:Character", turtle_out)
        self.assertIn("Sub-Zero", turtle_out)

if __name__ == "__main__":
    unittest.main()
