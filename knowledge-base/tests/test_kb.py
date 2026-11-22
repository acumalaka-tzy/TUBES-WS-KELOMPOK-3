"""
Tests for the knowledge-base layer (ontology, SHACL, story layer, sample queries).

Run from the repository root:
    python -m unittest discover -s knowledge-base/tests -v
"""

import re
import sys
import unittest
from pathlib import Path

KB_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(KB_ROOT / "scripts"))

import kb_tools as kb  # noqa: E402
from rdflib import Graph, Literal, URIRef  # noqa: E402
from rdflib.namespace import OWL, RDF, RDFS, XSD  # noqa: E402

MK = kb.MK
# Placeholder row produced by a failed scrape in the data-engineering pipeline.
KNOWN_BAD_NODES = {"character-scorpion-fetch-failed"}


class KBTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.merged, cls.onto, cls.base, cls.layer, cls.stats, cls.added = kb.assemble()


class OntologyTests(KBTestCase):
    def test_required_classes_exist(self):
        for name in ["Character", "CharacterVersion", "Game", "Timeline", "Ability", "Move", "Weapon",
                     "Organization", "Clan", "Location", "Realm", "Species", "Event", "StoryTimeline",
                     "StoryClaim", "Source"]:
            self.assertIn((MK[name], RDF.type, OWL.Class), self.onto, name)

    def test_every_class_descends_from_entity(self):
        for c in self.onto.subjects(RDF.type, OWL.Class):
            if isinstance(c, URIRef) and c != MK.Entity:
                self.assertIn(MK.Entity, set(self.onto.transitive_objects(c, RDFS.subClassOf)), c)

    def test_properties_have_domain_and_range(self):
        for kind in (OWL.ObjectProperty, OWL.DatatypeProperty):
            for p in self.onto.subjects(RDF.type, kind):
                self.assertIsNotNone(self.onto.value(p, RDFS.domain), f"{p} has no domain")
                self.assertIsNotNone(self.onto.value(p, RDFS.range), f"{p} has no range")

    def test_data_vocabulary_is_declared_in_ontology(self):
        declared = set(self.onto.subjects(RDF.type, OWL.ObjectProperty)) | \
            set(self.onto.subjects(RDF.type, OWL.DatatypeProperty))
        used = {p for _, p, _ in self.base if p != RDF.type}
        self.assertEqual(set(), used - declared, "predicates used by data but missing from ontology")
        classes = set(self.onto.subjects(RDF.type, OWL.Class))
        used_classes = {o for _, o in self.base.subject_objects(RDF.type)}
        self.assertEqual(set(), used_classes - classes)

    def test_move_is_ability_and_alias_properties(self):
        self.assertIn((MK.Move, RDFS.subClassOf, MK.Ability), self.onto)
        self.assertIn((MK.occursInTimeline, RDFS.subPropertyOf, MK.occursIn), self.onto)
        self.assertIn((MK.rivalOf, RDFS.subPropertyOf, MK.enemyOf), self.onto)
        self.assertIn((MK.allyOf, RDFS.subPropertyOf, MK.alliedWith), self.onto)


class StoryLayerTests(KBTestCase):
    def test_every_version_has_unique_timeline_game_identity(self):
        seen = {}
        for v in self.merged.subjects(RDF.type, MK.CharacterVersion):
            key = (self.merged.value(v, MK.versionOf), self.merged.value(v, MK.appearsIn),
                   self.merged.value(v, MK.existsInTimeline))
            self.assertNotIn(None, key, v)
            self.assertNotIn(key, seen, f"{v} duplicates {seen.get(key)}")
            seen[key] = v

    def test_version_context_properties(self):
        for v in self.merged.subjects(RDF.type, MK.CharacterVersion):
            self.assertIsNotNone(self.merged.value(v, MK.versionLabel), v)
            self.assertIsNotNone(self.merged.value(v, MK.versionSequence), v)
            self.assertIsNotNone(self.merged.value(v, MK.versionYear), v)

    def test_version_chain_is_consistent(self):
        for a, b in self.merged.subject_objects(MK.nextVersion):
            self.assertEqual(self.merged.value(a, MK.versionOf), self.merged.value(b, MK.versionOf))
            self.assertEqual(int(self.merged.value(a, MK.versionSequence)) + 1,
                             int(self.merged.value(b, MK.versionSequence)))
            self.assertIn((b, MK.previousVersion, a), self.merged)

    def test_story_timeline_per_timeline(self):
        timelines = set(self.base.subjects(RDF.type, MK.Timeline))
        described = {self.merged.value(st, MK.describesTimeline)
                     for st in self.merged.subjects(RDF.type, MK.StoryTimeline)}
        self.assertEqual(timelines, described)
        for st in self.merged.subjects(RDF.type, MK.StoryTimeline):
            events = set(self.merged.objects(st, MK.hasStoryEvent))
            self.assertEqual(int(self.merged.value(st, MK.eventCount)), len(events))

    def test_events_have_timeline_alias_and_versions(self):
        events = set(self.base.subjects(RDF.type, MK.Event))
        self.assertTrue(events)
        for e in events:
            self.assertIsNotNone(self.merged.value(e, MK.occursIn), e)
            self.assertEqual(self.merged.value(e, MK.occursIn), self.merged.value(e, MK.occursInTimeline))
            self.assertIsNotNone(self.merged.value(e, MK.partOfArc), e)
            for v in self.merged.objects(e, MK.involvesVersion):
                self.assertEqual(self.merged.value(v, MK.existsInTimeline), self.merged.value(e, MK.occursIn))

    def test_claims_have_timeline_and_provenance(self):
        claims = list(self.merged.subjects(RDF.type, MK.StoryClaim))
        self.assertGreaterEqual(len(claims), 25)
        for c in claims:
            self.assertTrue(list(self.merged.objects(c, MK.claimInTimeline)), c)
            self.assertTrue(list(self.merged.objects(c, MK.supportedBy)), c)

    def test_symmetric_relations_materialized(self):
        for p in (MK.enemyOf, MK.alliedWith):
            for a, b in self.base.subject_objects(p):
                self.assertIn((b, p, a), self.merged)

    def test_species_resolved(self):
        self.assertTrue(list(self.merged.subjects(RDF.type, MK.Species)))
        self.assertIn(MK["species-human"], set(self.merged.objects(MK["character-scorpion"], MK.ofSpecies)))

    def test_exported_graph_is_not_stale(self):
        on_disk = Graph().parse(kb.GRAPH_TTL, format="turtle")
        self.assertEqual(len(on_disk), len(self.merged), "run `python knowledge-base/scripts/kb_tools.py build`")
        ground = lambda g: {t for t in g if not any(hasattr(x, "n3") and x.n3().startswith("_:") for x in t)}
        self.assertEqual(ground(on_disk), ground(self.merged))


class ShaclTests(KBTestCase):
    def test_merged_graph_has_no_unexpected_violations(self):
        report = kb.run_shacl(self.merged)
        violations = [r for r in report["results"] if r["severity"] == "Violation"]
        self.assertEqual([], violations)
        self.assertTrue(report["conformsWithoutViolations"])

    def _validate_with(self, extra):
        g = Graph()
        for t in self.merged:
            g.add(t)
        for t in extra:
            g.add(t)
        return kb.run_shacl(g)

    def _messages(self, report):
        return " | ".join(r["message"] for r in report["results"] if r["severity"] == "Violation")

    def test_detects_version_without_timeline(self):
        v = MK["version-test-bad"]
        report = self._validate_with([
            (v, RDF.type, MK.CharacterVersion), (v, MK.name, Literal("bad", datatype=XSD.string)),
            (v, MK.versionOf, MK["character-scorpion"]), (v, MK.appearsIn, MK["game-mk1-1992"])])
        self.assertIn("exactly one Timeline", self._messages(report))

    def test_detects_duplicate_version_identity(self):
        orig = next(self.merged.subjects(RDF.type, MK.CharacterVersion))
        dup = MK["version-test-dup"]
        report = self._validate_with([
            (dup, RDF.type, MK.CharacterVersion), (dup, MK.name, Literal("dup", datatype=XSD.string)),
            (dup, MK.versionOf, self.merged.value(orig, MK.versionOf)),
            (dup, MK.appearsIn, self.merged.value(orig, MK.appearsIn)),
            (dup, MK.existsInTimeline, self.merged.value(orig, MK.existsInTimeline))])
        self.assertIn("distinguishable", self._messages(report))

    def test_detects_claim_without_source_and_timeline(self):
        c = MK["claim-test-bad"]
        report = self._validate_with([
            (c, RDF.type, MK.StoryClaim), (c, MK.claimText, Literal("x", datatype=XSD.string)),
            (c, MK.claimSubject, MK["character-scorpion"])])
        msg = self._messages(report)
        self.assertIn("Timeline", msg)
        self.assertIn("Source", msg)

    def test_detects_duplicate_event_order(self):
        e = next(self.base.subjects(RDF.type, MK.Event))
        order = self.base.value(e, MK.chronologicalOrder)
        e2 = MK["event-test-dup"]
        report = self._validate_with([
            (e2, RDF.type, MK.Event), (e2, MK.eventTitle, Literal("t", datatype=XSD.string)),
            (e2, MK.eventSummary, Literal("s", datatype=XSD.string)), (e2, MK.chronologicalOrder, order),
            (e2, MK.occursInTimeline, MK["timeline-original"]), (e2, MK.featuresInGame, MK["game-mk1-1992"]),
            (e2, MK.involvesCharacter, MK["character-scorpion"])])
        self.assertIn("same chronologicalOrder", self._messages(report))

    def test_detects_invalid_year_and_self_enemy(self):
        ch = MK["character-test-bad"]
        report = self._validate_with([
            (ch, RDF.type, MK.Character), (ch, MK.name, Literal("x", datatype=XSD.string)),
            (ch, MK.firstAppearanceYear, Literal("Unknown", datatype=XSD.gYear)),
            (ch, MK.enemyOf, ch)])
        msg = self._messages(report)
        self.assertIn("firstAppearanceYear", msg)
        self.assertIn("its own enemy", msg)


class QueryTests(KBTestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        text = (KB_ROOT / "queries" / "sample_queries.sparql").read_text(encoding="utf-8")
        header, *blocks = re.split(r"^### ", text, flags=re.M)
        prefixes = "\n".join(l for l in header.splitlines() if l.startswith("PREFIX"))
        cls.queries = {}
        for block in blocks:
            title, _, body = block.partition("\n")
            cls.queries[title.strip()] = prefixes + "\n" + body

    def test_all_queries_parse_and_return_rows(self):
        self.assertGreaterEqual(len(self.queries), 15)
        for title, q in self.queries.items():
            rows = list(self.merged.query(q))
            self.assertGreater(len(rows), 0, f"query returned no rows: {title}")


if __name__ == "__main__":
    unittest.main()
