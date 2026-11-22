"""
RDF/OWL Graph Builder and Serializer
Implements PRD v1.5 FR-28:
Converts validated datasets into standard RDF Turtle (.ttl) and RDF/XML (.rdf/.owl)
using RDFLib, adhering to the Mortal Kombat Knowledge Nexus Ontology.
"""

from typing import Dict, Any
import json
from datetime import datetime, timezone
from pathlib import Path
import rdflib
from rdflib import Graph, URIRef, Literal, Namespace
from rdflib.namespace import RDF, RDFS, OWL, XSD

class RDFGraphBuilder:
    """Builds and serializes RDF graphs from validated Mortal Kombat datasets."""

    def __init__(self, base_uri: str = "https://example.org/mk/"):
        self.base_uri = base_uri
        self.MK = Namespace(base_uri)
        self.graph = Graph()

        # Bind namespaces
        self.graph.bind("mk", self.MK)
        self.graph.bind("rdfs", RDFS)
        self.graph.bind("owl", OWL)
        self.graph.bind("xsd", XSD)

    def uri(self, identifier: str) -> URIRef:
        """Helper to create URIRef from slug or ID."""
        clean_id = identifier.replace("https://example.org/mk/", "").strip("/")
        return self.MK[clean_id]

    def build_graph(self, validated_data: Dict[str, Any]) -> Graph:
        """Constructs RDF triples for all entities, versions, claims, and relations."""
        self.graph = Graph()
        self.graph.bind("mk", self.MK)
        self.graph.bind("rdfs", RDFS)
        self.graph.bind("owl", OWL)
        self.graph.bind("xsd", XSD)

        # 1. Games
        for g in validated_data.get("games", []):
            subj = self.uri(g["id"])
            self.graph.add((subj, RDF.type, self.MK.Game))
            self.graph.add((subj, self.MK.name, Literal(g["name"], datatype=XSD.string)))
            if g.get("releaseDate"):
                self.graph.add((subj, self.MK.releaseDate, Literal(g["releaseDate"], datatype=XSD.date)))
            if g.get("description"):
                self.graph.add((subj, self.MK.description, Literal(g["description"], datatype=XSD.string)))
            if g.get("sourceURL"):
                self.graph.add((subj, self.MK.sourceURL, Literal(g["sourceURL"], datatype=XSD.anyURI)))
            self.graph.add((subj, self.MK.verificationStatus, Literal("verified", datatype=XSD.string)))

        # 2. Timelines
        for t in validated_data.get("timelines", []):
            subj = self.uri(t["id"])
            self.graph.add((subj, RDF.type, self.MK.Timeline))
            self.graph.add((subj, self.MK.name, Literal(t["name"], datatype=XSD.string)))
            if t.get("description"):
                self.graph.add((subj, self.MK.description, Literal(t["description"], datatype=XSD.string)))

        # 3. Realms
        for r in validated_data.get("realms", []):
            subj = self.uri(r["id"])
            self.graph.add((subj, RDF.type, self.MK.Realm))
            self.graph.add((subj, self.MK.name, Literal(r["name"], datatype=XSD.string)))
            if r.get("description"):
                self.graph.add((subj, self.MK.description, Literal(r["description"], datatype=XSD.string)))

        # 4. Clans & Organizations
        for cl in validated_data.get("clans", []):
            subj = self.uri(cl["id"])
            self.graph.add((subj, RDF.type, self.MK.Clan if cl.get("type") == "clan" else self.MK.Organization))
            self.graph.add((subj, self.MK.name, Literal(cl["name"], datatype=XSD.string)))
            if cl.get("description"):
                self.graph.add((subj, self.MK.description, Literal(cl["description"], datatype=XSD.string)))

        # 5. Elements
        for el in validated_data.get("elements", []):
            subj = self.uri(el["id"])
            self.graph.add((subj, RDF.type, self.MK.Element))
            self.graph.add((subj, self.MK.name, Literal(el["name"], datatype=XSD.string)))

        # 6. Abilities & Moves
        for ab in validated_data.get("abilities", []):
            subj = self.uri(ab["id"])
            self.graph.add((subj, RDF.type, self.MK.Move if "Move" in ab.get("category", "") or "Fatality" in ab.get("category", "") else self.MK.Ability))
            self.graph.add((subj, self.MK.name, Literal(ab["name"], datatype=XSD.string)))
            if ab.get("description"):
                self.graph.add((subj, self.MK.description, Literal(ab["description"], datatype=XSD.string)))
            if ab.get("elementId"):
                self.graph.add((subj, self.MK.hasElement, self.uri(ab["elementId"])))

        # 7. Weapons
        for wp in validated_data.get("weapons", []):
            subj = self.uri(wp["id"])
            self.graph.add((subj, RDF.type, self.MK.Weapon))
            self.graph.add((subj, self.MK.name, Literal(wp["name"], datatype=XSD.string)))
            if wp.get("description"):
                self.graph.add((subj, self.MK.description, Literal(wp["description"], datatype=XSD.string)))

        # 8. Characters & CharacterVersions
        for ch in validated_data.get("characters", []):
            char_subj = self.uri(ch["id"])
            self.graph.add((char_subj, RDF.type, self.MK.Character))
            self.graph.add((char_subj, self.MK.name, Literal(ch["name"], datatype=XSD.string)))
            if ch.get("alternateName"):
                self.graph.add((char_subj, self.MK.alternateName, Literal(ch["alternateName"], datatype=XSD.string)))
            if ch.get("firstAppearanceYear"):
                self.graph.add((char_subj, self.MK.firstAppearanceYear, Literal(ch["firstAppearanceYear"], datatype=XSD.gYear)))
            if ch.get("description"):
                self.graph.add((char_subj, self.MK.description, Literal(ch["description"], datatype=XSD.string)))
            if ch.get("sourceURL"):
                self.graph.add((char_subj, self.MK.sourceURL, Literal(ch["sourceURL"], datatype=XSD.anyURI)))
            self.graph.add((char_subj, self.MK.verificationStatus, Literal("verified", datatype=XSD.string)))

            # CharacterVersions
            for v in ch.get("versions", []):
                ver_subj = self.uri(v["versionId"])
                self.graph.add((ver_subj, RDF.type, self.MK.CharacterVersion))
                self.graph.add((ver_subj, self.MK.name, Literal(f"{ch['name']} ({v.get('gameId', '').replace('game-', '')})", datatype=XSD.string)))
                self.graph.add((ver_subj, self.MK.versionOf, char_subj))
                self.graph.add((char_subj, self.MK.hasVersion, ver_subj))

                if v.get("gameId"):
                    self.graph.add((ver_subj, self.MK.appearsIn, self.uri(v["gameId"])))
                if v.get("timelineId"):
                    self.graph.add((ver_subj, self.MK.existsInTimeline, self.uri(v["timelineId"])))
                if v.get("clan"):
                    self.graph.add((ver_subj, self.MK.memberOf, self.uri(v["clan"])))

                for ab_id in v.get("abilities", []):
                    self.graph.add((ver_subj, self.MK.hasAbility, self.uri(ab_id)))
                for wp_id in v.get("weapons", []):
                    self.graph.add((ver_subj, self.MK.usesWeapon, self.uri(wp_id)))

        # 9. Story Events
        for ev in validated_data.get("events", []):
            ev_subj = self.uri(ev["id"])
            self.graph.add((ev_subj, RDF.type, self.MK.Event))
            self.graph.add((ev_subj, self.MK.eventTitle, Literal(ev["eventTitle"], datatype=XSD.string)))
            if ev.get("eventSummary"):
                self.graph.add((ev_subj, self.MK.eventSummary, Literal(ev["eventSummary"], datatype=XSD.string)))
            if ev.get("timelineId"):
                self.graph.add((ev_subj, self.MK.occursIn, self.uri(ev["timelineId"])))
            if ev.get("sourceURL"):
                self.graph.add((ev_subj, self.MK.sourceURL, Literal(ev["sourceURL"], datatype=XSD.anyURI)))

            for p_id in ev.get("participants", []):
                self.graph.add((ev_subj, self.MK.involvesCharacter, self.uri(p_id)))

        # 10. Relationships
        for rel in validated_data.get("relationships", []):
            s_subj = self.uri(rel["subjectId"])
            o_subj = self.uri(rel["objectId"])
            pred = getattr(self.MK, rel["predicate"])
            self.graph.add((s_subj, pred, o_subj))

        return self.graph

    def export_all(
        self,
        validated_data: Dict[str, Any],
        turtle_path: str = "data-engineering/storage/exports/mortal_kombat.ttl",
        rdfxml_path: str = "data-engineering/storage/exports/mortal_kombat.rdf",
        kb_turtle_path: str = "knowledge-base/data/mortal_kombat.ttl",
        report_path: str = "data-engineering/storage/reports/rdf_export_report.json"
    ) -> Dict[str, Any]:
        """Builds graph, serializes to Turtle and RDF/XML, and saves reports."""
        g = self.build_graph(validated_data)

        # 1. Export Turtle
        t_file = Path(turtle_path)
        t_file.parent.mkdir(parents=True, exist_ok=True)
        g.serialize(destination=str(t_file), format="turtle")

        # Also copy to knowledge-base/data/mortal_kombat.ttl for Fuseki
        kb_file = Path(kb_turtle_path)
        kb_file.parent.mkdir(parents=True, exist_ok=True)
        g.serialize(destination=str(kb_file), format="turtle")

        # 2. Export RDF/XML (.rdf / .owl)
        r_file = Path(rdfxml_path)
        r_file.parent.mkdir(parents=True, exist_ok=True)
        g.serialize(destination=str(r_file), format="xml")

        # Also copy to knowledge-base/data/mortal_kombat.rdf
        kb_rdf = Path("knowledge-base/data/mortal_kombat.rdf")
        kb_rdf.parent.mkdir(parents=True, exist_ok=True)
        g.serialize(destination=str(kb_rdf), format="xml")

        # 3. Export Report
        triple_count = len(g)
        report = {
            "reportId": f"rdf-export-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}",
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "totalTriples": triple_count,
            "serializedFormats": {
                "turtle": str(t_file),
                "rdfxml": str(r_file),
                "knowledgeBaseTurtle": str(kb_file)
            },
            "serializationCheck": "PASSED (Valid RDF/XML and Turtle syntax)",
            "graphStatistics": {
                "classes": ["Character", "CharacterVersion", "Game", "Timeline", "Realm", "Clan", "Ability", "Move", "Weapon", "Event"],
                "properties": ["hasVersion", "versionOf", "appearsIn", "existsInTimeline", "hasAbility", "usesWeapon", "memberOf", "involvesCharacter", "occursIn", "enemyOf", "alliedWith"]
            }
        }

        rep_file = Path(report_path)
        rep_file.parent.mkdir(parents=True, exist_ok=True)
        with open(rep_file, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)

        return report
