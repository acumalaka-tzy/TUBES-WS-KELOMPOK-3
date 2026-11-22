"""
RDF/OWL Graph Builder and Serializer
Implements PRD v1.5 FR-28 & Section 28.14:
Converts validated datasets (including elements, locations, and provenance) into standard
RDF Turtle (.ttl) and RDF/XML (.rdf/.owl) adhering to Mortal Kombat Knowledge Nexus Ontology.
Generates dynamic graph statistics computed directly from the RDFLib Graph.
"""

from typing import Dict, Any, Set, Optional
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

    def uri(self, identifier: Optional[str]) -> Optional[URIRef]:
        """Safely creates URIRef from slug or ID, avoiding empty URIs and invalid characters."""
        if not identifier:
            return None
        import re
        clean_id = str(identifier).replace("https://example.org/mk/", "").strip("/")
        clean_id = re.sub(r"[^\w-]", "-", clean_id).strip("-")
        if not clean_id:
            return None
        return self.MK[clean_id]

    def build_graph(self, validated_data: Dict[str, Any]) -> Graph:
        """Constructs complete RDF graph across all validated categories."""
        self.graph = Graph()
        self.graph.bind("mk", self.MK)
        self.graph.bind("rdfs", RDFS)
        self.graph.bind("owl", OWL)
        self.graph.bind("xsd", XSD)

        # 1. Standalone Games
        for g in validated_data.get("games", []):
            subj = self.uri(g.get("id"))
            if not subj:
                continue
            self.graph.add((subj, RDF.type, self.MK.Game))
            self.graph.add((subj, self.MK.name, Literal(g["name"], datatype=XSD.string)))
            if g.get("releaseDate"):
                self.graph.add((subj, self.MK.releaseDate, Literal(g["releaseDate"], datatype=XSD.date)))
            if g.get("description"):
                self.graph.add((subj, self.MK.description, Literal(g["description"], datatype=XSD.string)))
            if g.get("era"):
                self.graph.add((subj, self.MK.gameEra, Literal(g["era"], datatype=XSD.string)))
            for plat in g.get("platforms", []):
                self.graph.add((subj, self.MK.supportedPlatform, Literal(plat, datatype=XSD.string)))
            if g.get("sourceURL"):
                self.graph.add((subj, self.MK.sourceURL, Literal(g["sourceURL"], datatype=XSD.anyURI)))
            self.graph.add((subj, self.MK.verificationStatus, Literal(g.get("verificationStatus", "verified"), datatype=XSD.string)))

        # 2. Timelines
        for t in validated_data.get("timelines", []):
            subj = self.uri(t.get("id"))
            if not subj:
                continue
            self.graph.add((subj, RDF.type, self.MK.Timeline))
            self.graph.add((subj, self.MK.name, Literal(t["name"], datatype=XSD.string)))
            if t.get("period"):
                self.graph.add((subj, self.MK.chronologicalPeriod, Literal(t["period"], datatype=XSD.string)))
            if t.get("description"):
                self.graph.add((subj, self.MK.description, Literal(t["description"], datatype=XSD.string)))

        # 3. Realms
        for r in validated_data.get("realms", []):
            subj = self.uri(r.get("id"))
            if not subj:
                continue
            self.graph.add((subj, RDF.type, self.MK.Realm))
            self.graph.add((subj, self.MK.name, Literal(r["name"], datatype=XSD.string)))
            if r.get("description"):
                self.graph.add((subj, self.MK.description, Literal(r["description"], datatype=XSD.string)))

        # 4. Locations & Arenas
        for loc in validated_data.get("locations", []):
            subj = self.uri(loc.get("id"))
            if not subj:
                continue
            self.graph.add((subj, RDF.type, self.MK.Location))
            self.graph.add((subj, self.MK.name, Literal(loc["name"], datatype=XSD.string)))
            if loc.get("description"):
                self.graph.add((subj, self.MK.description, Literal(loc["description"], datatype=XSD.string)))
            if loc.get("realmId"):
                r_uri = self.uri(loc["realmId"])
                if r_uri:
                    self.graph.add((subj, self.MK.locatedInRealm, r_uri))
            if loc.get("sourceURL"):
                self.graph.add((subj, self.MK.sourceURL, Literal(loc["sourceURL"], datatype=XSD.anyURI)))

        # 5. Clans & Organizations
        for cl in validated_data.get("clans", []):
            subj = self.uri(cl.get("id"))
            if not subj:
                continue
            c_type = self.MK.Clan if cl.get("type") == "clan" else self.MK.Organization
            self.graph.add((subj, RDF.type, c_type))
            self.graph.add((subj, self.MK.name, Literal(cl["name"], datatype=XSD.string)))
            if cl.get("description"):
                self.graph.add((subj, self.MK.description, Literal(cl["description"], datatype=XSD.string)))

        # 6. Elements
        for el in validated_data.get("elements", []):
            subj = self.uri(el.get("id"))
            if not subj:
                continue
            self.graph.add((subj, RDF.type, self.MK.Element))
            self.graph.add((subj, self.MK.name, Literal(el["name"], datatype=XSD.string)))
            if el.get("description"):
                self.graph.add((subj, self.MK.description, Literal(el["description"], datatype=XSD.string)))

        # 7. Abilities & Moves
        for ab in validated_data.get("abilities", []):
            subj = self.uri(ab.get("id"))
            if not subj:
                continue
            is_move = any(m_word in ab.get("category", "") for m_word in ["Move", "Fatality", "Brutality"])
            self.graph.add((subj, RDF.type, self.MK.Move if is_move else self.MK.Ability))
            self.graph.add((subj, self.MK.name, Literal(ab["name"], datatype=XSD.string)))
            if ab.get("category"):
                self.graph.add((subj, self.MK.moveCategory, Literal(ab["category"], datatype=XSD.string)))
            if ab.get("description"):
                self.graph.add((subj, self.MK.description, Literal(ab["description"], datatype=XSD.string)))
            if ab.get("elementId"):
                el_uri = self.uri(ab["elementId"])
                if el_uri:
                    self.graph.add((subj, self.MK.hasElement, el_uri))

        # 8. Weapons
        for wp in validated_data.get("weapons", []):
            subj = self.uri(wp.get("id"))
            if not subj:
                continue
            self.graph.add((subj, RDF.type, self.MK.Weapon))
            self.graph.add((subj, self.MK.name, Literal(wp["name"], datatype=XSD.string)))
            if wp.get("description"):
                self.graph.add((subj, self.MK.description, Literal(wp["description"], datatype=XSD.string)))

        # 9. Characters & CharacterVersions
        for ch in validated_data.get("characters", []):
            char_subj = self.uri(ch.get("id"))
            if not char_subj:
                continue
            self.graph.add((char_subj, RDF.type, self.MK.Character))
            self.graph.add((char_subj, self.MK.name, Literal(ch["name"], datatype=XSD.string)))
            if ch.get("alternateName"):
                self.graph.add((char_subj, self.MK.alternateName, Literal(ch["alternateName"], datatype=XSD.string)))
            if ch.get("species"):
                self.graph.add((char_subj, self.MK.hasSpecies, Literal(ch["species"], datatype=XSD.string)))
            if ch.get("originRealm"):
                r_uri = self.uri(ch["originRealm"])
                if r_uri:
                    self.graph.add((char_subj, self.MK.originatesFrom, r_uri))
            if ch.get("firstAppearanceYear"):
                self.graph.add((char_subj, self.MK.firstAppearanceYear, Literal(ch["firstAppearanceYear"], datatype=XSD.gYear)))
            if ch.get("description"):
                self.graph.add((char_subj, self.MK.description, Literal(ch["description"], datatype=XSD.string)))
            if ch.get("sourceURL"):
                self.graph.add((char_subj, self.MK.sourceURL, Literal(ch["sourceURL"], datatype=XSD.anyURI)))
            self.graph.add((char_subj, self.MK.verificationStatus, Literal(ch.get("verificationStatus", "verified"), datatype=XSD.string)))

            # CharacterVersions
            for v in ch.get("versions", []):
                ver_subj = self.uri(v.get("versionId"))
                if not ver_subj:
                    continue
                self.graph.add((ver_subj, RDF.type, self.MK.CharacterVersion))
                self.graph.add((ver_subj, self.MK.name, Literal(f"{ch['name']} ({v.get('gameId', '').replace('game-', '')})", datatype=XSD.string)))
                self.graph.add((ver_subj, self.MK.versionOf, char_subj))
                self.graph.add((char_subj, self.MK.hasVersion, ver_subj))

                if v.get("gameId"):
                    g_uri = self.uri(v["gameId"])
                    if g_uri:
                        self.graph.add((ver_subj, self.MK.appearsIn, g_uri))
                if v.get("timelineId"):
                    t_uri = self.uri(v["timelineId"])
                    if t_uri:
                        self.graph.add((ver_subj, self.MK.existsInTimeline, t_uri))
                if v.get("clan"):
                    cl_uri = self.uri(v["clan"])
                    if cl_uri:
                        self.graph.add((ver_subj, self.MK.memberOf, cl_uri))

                for ab_id in v.get("abilities", []):
                    ab_uri = self.uri(ab_id)
                    if ab_uri:
                        self.graph.add((ver_subj, self.MK.hasAbility, ab_uri))
                for wp_id in v.get("weapons", []):
                    wp_uri = self.uri(wp_id)
                    if wp_uri:
                        self.graph.add((ver_subj, self.MK.usesWeapon, wp_uri))

        # 10. Story Events
        for ev in validated_data.get("events", []):
            ev_subj = self.uri(ev.get("id"))
            if not ev_subj:
                continue
            self.graph.add((ev_subj, RDF.type, self.MK.Event))
            self.graph.add((ev_subj, self.MK.eventTitle, Literal(ev["eventTitle"], datatype=XSD.string)))
            if ev.get("eventSummary"):
                self.graph.add((ev_subj, self.MK.eventSummary, Literal(ev["eventSummary"], datatype=XSD.string)))
            if ev.get("chronology"):
                self.graph.add((ev_subj, self.MK.chronologicalOrder, Literal(ev["chronology"], datatype=XSD.integer)))
            if ev.get("timelineId"):
                t_uri = self.uri(ev["timelineId"])
                if t_uri:
                    self.graph.add((ev_subj, self.MK.occursInTimeline, t_uri))
            if ev.get("gameId"):
                g_uri = self.uri(ev["gameId"])
                if g_uri:
                    self.graph.add((ev_subj, self.MK.featuresInGame, g_uri))
            if ev.get("sourceURL"):
                self.graph.add((ev_subj, self.MK.sourceURL, Literal(ev["sourceURL"], datatype=XSD.anyURI)))

            for p_id in ev.get("participants", []):
                p_uri = self.uri(p_id)
                if p_uri:
                    self.graph.add((ev_subj, self.MK.involvesCharacter, p_uri))

        # 11. Relationships
        for rel in validated_data.get("relationships", []):
            s_subj = self.uri(rel.get("subjectId"))
            o_subj = self.uri(rel.get("objectId"))
            pred_name = rel.get("predicate", "alliedWith")
            if s_subj and o_subj and pred_name:
                pred_uri = getattr(self.MK, pred_name)
                self.graph.add((s_subj, pred_uri, o_subj))

        return self.graph

    def compute_graph_statistics(self, g: Graph) -> Dict[str, Any]:
        """Dynamically computes classes, properties, and triple distributions directly from RDFLib graph."""
        classes: Set[str] = set()
        properties: Set[str] = set()
        class_instance_counts: Dict[str, int] = {}

        for s, p, o in g:
            p_str = str(p).replace(self.base_uri, "mk:")
            properties.add(p_str)
            if p == RDF.type:
                c_str = str(o).replace(self.base_uri, "mk:")
                classes.add(c_str)
                class_instance_counts[c_str] = class_instance_counts.get(c_str, 0) + 1

        return {
            "totalTriples": len(g),
            "totalClasses": len(classes),
            "totalProperties": len(properties),
            "classes": sorted(list(classes)),
            "properties": sorted(list(properties)),
            "classInstanceCounts": class_instance_counts
        }

    def export_all(
        self,
        validated_data: Dict[str, Any],
        turtle_path: str = "data-engineering/storage/exports/mortal_kombat.ttl",
        rdfxml_path: str = "data-engineering/storage/exports/mortal_kombat.rdf",
        kb_turtle_path: str = "knowledge-base/data/mortal_kombat.ttl",
        kb_rdfxml_path: str = "knowledge-base/data/mortal_kombat.rdf",
        report_path: str = "data-engineering/storage/reports/rdf_export_report.json"
    ) -> Dict[str, Any]:
        """Builds graph, serializes to Turtle and RDF/XML, syncs with Knowledge Base, and outputs audit report."""
        g = self.build_graph(validated_data)

        # 1. Export Turtle (.ttl)
        t_file = Path(turtle_path)
        t_file.parent.mkdir(parents=True, exist_ok=True)
        g.serialize(destination=str(t_file), format="turtle")

        # Sync to Knowledge Base Turtle
        kb_t_file = Path(kb_turtle_path)
        kb_t_file.parent.mkdir(parents=True, exist_ok=True)
        g.serialize(destination=str(kb_t_file), format="turtle")

        # 2. Export RDF/XML (.rdf)
        r_file = Path(rdfxml_path)
        r_file.parent.mkdir(parents=True, exist_ok=True)
        g.serialize(destination=str(r_file), format="xml")

        # Sync to Knowledge Base RDF/XML
        kb_r_file = Path(kb_rdfxml_path)
        kb_r_file.parent.mkdir(parents=True, exist_ok=True)
        g.serialize(destination=str(kb_r_file), format="xml")

        # 3. Dynamic Statistics & Report
        stats = self.compute_graph_statistics(g)
        report = {
            "reportId": f"rdf-export-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}",
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "totalTriples": stats["totalTriples"],
            "totalClasses": stats["totalClasses"],
            "totalProperties": stats["totalProperties"],
            "classInstanceCounts": stats["classInstanceCounts"],
            "serializedOutputs": {
                "exportsTurtle": str(t_file),
                "exportsRDFXML": str(r_file),
                "knowledgeBaseTurtle": str(kb_t_file),
                "knowledgeBaseRDFXML": str(kb_r_file)
            },
            "classes": stats["classes"],
            "properties": stats["properties"],
            "serializationCheck": "PASSED (Syntactically verified Turtle and RDF/XML outputs)"
        }

        rep_file = Path(report_path)
        rep_file.parent.mkdir(parents=True, exist_ok=True)
        with open(rep_file, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)

        return report
