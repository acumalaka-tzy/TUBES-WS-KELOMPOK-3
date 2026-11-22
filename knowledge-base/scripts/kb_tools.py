#!/usr/bin/env python3
"""
Knowledge Base tooling - Mortal Kombat Knowledge Nexus (Anggota 3)

Sub-commands
------------
build     Derive the story/version layer from the pipeline data, materialize
          simple OWL inferences (subPropertyOf, inverseOf, SymmetricProperty)
          and export the merged knowledge graph (Turtle + RDF/XML) and the
          Protege-friendly ontology (core.owl).
validate  Validate the merged graph against shacl/shapes.ttl (pySHACL).
docs      Regenerate docs/ONTOLOGY.md from ontology/core.ttl.
all       build + validate + docs.

Only knowledge-base/ files are touched; the pipeline output
(data/mortal_kombat.ttl) is read-only input, so re-running the data
engineering pipeline and then `kb_tools.py all` is always safe.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import unquote, urlparse

from rdflib import BNode, Graph, Literal, Namespace, URIRef
from rdflib.collection import Collection
from rdflib.namespace import OWL, RDF, RDFS, XSD

KB_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = KB_ROOT.parent

MK = Namespace("https://example.org/mk/")
SH = Namespace("http://www.w3.org/ns/shacl#")

ONTOLOGY_TTL = KB_ROOT / "ontology" / "core.ttl"
ONTOLOGY_OWL = KB_ROOT / "ontology" / "core.owl"
SHAPES_TTL = KB_ROOT / "shacl" / "shapes.ttl"
BASE_DATA_TTL = KB_ROOT / "data" / "mortal_kombat.ttl"
STORY_LAYER_TTL = KB_ROOT / "data" / "story_layer.ttl"
GRAPH_TTL = KB_ROOT / "data" / "knowledge_graph.ttl"
GRAPH_RDF = KB_ROOT / "data" / "knowledge_graph.rdf"
RELATIONSHIPS_JSON = REPO_ROOT / "data-engineering" / "storage" / "extracted" / "relationships.json"
REPORT_DIR = KB_ROOT / "reports"
BUILD_REPORT = REPORT_DIR / "kb_build_report.json"
SHACL_REPORT = REPORT_DIR / "shacl_report.json"
DOCS_MD = KB_ROOT / "docs" / "ONTOLOGY.md"


# ------------------------------------------------------------------------------
# Helpers
# ------------------------------------------------------------------------------

def bind_prefixes(g: Graph) -> None:
    g.bind("mk", MK)
    g.bind("owl", OWL)
    g.bind("rdfs", RDFS)
    g.bind("xsd", XSD)


def slug(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or "x"


def local(uri: URIRef) -> str:
    return str(uri).replace(str(MK), "")


def lit_str(value: str) -> Literal:
    return Literal(value, datatype=XSD.string)


def first(g: Graph, s: URIRef, p: URIRef) -> Optional[Any]:
    return next(iter(g.objects(s, p)), None)


def name_of(g: Graph, s: URIRef) -> str:
    n = first(g, s, MK.name)
    return str(n) if n is not None else local(s)


def source_uri(url: str) -> URIRef:
    parsed = urlparse(url)
    return MK["source-" + slug(parsed.netloc + parsed.path)]


def source_meta(url: str) -> Tuple[str, str]:
    """(display name, sourceType) for a source URL."""
    parsed = urlparse(url)
    host = parsed.netloc.lower()
    page = unquote(parsed.path.rstrip("/").split("/")[-1]).replace("_", " ").strip()
    if "fandom.com" in host:
        return f"Mortal Kombat Wiki - {page or 'Home'}", "fandom-wiki"
    if "mortalkombat.com" in host:
        return ("Official Mortal Kombat Website" + (f" - {page}" if page and page != "en-us" else ""),
                "official-site")
    return f"{host} - {page}" if page else host, "other"


TIMELINE_KEYWORDS = [
    ("timeline-original", ("original", "classic")),
    ("timeline-reboot", ("reboot",)),
    ("timeline-new-era", ("new era",)),
]


def context_to_timelines(context: str) -> List[str]:
    """Map a free-text relationship context ('Original & Reboot Timelines') to timeline ids."""
    text = context.lower()
    if "all timelines" in text:
        return [t for t, _ in TIMELINE_KEYWORDS]
    return [t for t, words in TIMELINE_KEYWORDS if any(w in text for w in words)]


# ------------------------------------------------------------------------------
# Story / version layer derivation
# ------------------------------------------------------------------------------

def derive_story_layer(base: Graph, relationships: List[Dict[str, Any]]) -> Tuple[Graph, Dict[str, Any]]:
    """Derive Species, Source, CharacterVersion context, Story Timeline and Story Claim triples."""
    layer = Graph()
    bind_prefixes(layer)
    stats: Dict[str, Any] = {"skippedRelationships": []}

    # --- Species (resolve free-text mk:hasSpecies into mk:Species individuals) ----
    species_nodes = set()
    for ch in base.subjects(RDF.type, MK.Character):
        for lit in base.objects(ch, MK.hasSpecies):
            for label in re.split(r"\s*(?:/|,|&)\s*", str(lit)):
                label = label.strip()
                if not label:
                    continue
                sp = MK["species-" + slug(label)]
                if sp not in species_nodes:
                    species_nodes.add(sp)
                    layer.add((sp, RDF.type, MK.Species))
                    layer.add((sp, MK.name, lit_str(label)))
                layer.add((ch, MK.ofSpecies, sp))
    stats["species"] = len(species_nodes)

    # --- Sources (provenance nodes for every sourceURL) -------------------------
    owners: Dict[str, List[URIRef]] = defaultdict(list)
    for s, o in base.subject_objects(MK.sourceURL):
        owners[str(o)].append(s)
    source_status: Dict[str, str] = {}
    for url, subs in sorted(owners.items()):
        src = source_uri(url)
        display, stype = source_meta(url)
        statuses = {str(first(base, s, MK.verificationStatus) or "verified") for s in subs}
        status = "verified" if statuses == {"verified"} else "partially_verified"
        source_status[url] = status
        layer.add((src, RDF.type, MK.Source))
        layer.add((src, MK.name, lit_str(display)))
        layer.add((src, MK.sourceURL, Literal(url, datatype=XSD.anyURI)))
        layer.add((src, MK.sourceType, lit_str(stype)))
        layer.add((src, MK.verificationStatus, lit_str(status)))
        for s in subs:
            layer.add((s, MK.hasSource, src))
    stats["sources"] = len(owners)

    # --- Timeline ordering ----------------------------------------------------
    timelines = []
    for t in base.subjects(RDF.type, MK.Timeline):
        period = str(first(base, t, MK.chronologicalPeriod) or "")
        m = re.search(r"\d{4}", period)
        timelines.append((int(m.group()) if m else 9999, str(t), t))
    timelines.sort()
    for idx, (_, _, t) in enumerate(timelines, start=1):
        layer.add((t, MK.timelineOrder, Literal(idx, datatype=XSD.integer)))
        if idx < len(timelines):
            layer.add((t, MK.nextTimeline, timelines[idx][2]))
    stats["timelines"] = len(timelines)

    # --- Move sub-types + performsMove ------------------------------------------
    move_type = {"fatality": MK.Fatality, "special move": MK.SpecialMove, "brutality": MK.Brutality}
    moves = set(base.subjects(RDF.type, MK.Move))
    for mv in moves:
        cat = str(first(base, mv, MK.moveCategory) or "").lower()
        if cat in move_type:
            layer.add((mv, RDF.type, move_type[cat]))

    # --- CharacterVersion context (label, year, sequence, previous/next) --------
    release: Dict[URIRef, str] = {g: str(first(base, g, MK.releaseDate) or "") for g in base.subjects(RDF.type, MK.Game)}
    versions_by_char: Dict[URIRef, List[Tuple[str, str, URIRef]]] = defaultdict(list)
    for v in base.subjects(RDF.type, MK.CharacterVersion):
        char = first(base, v, MK.versionOf)
        game = first(base, v, MK.appearsIn)
        tl = first(base, v, MK.existsInTimeline)
        if char is None:
            continue
        year = release.get(game, "")[:4]
        label = f"{name_of(base, char)} - {name_of(base, game) if game else '?'} - {name_of(base, tl) if tl else '?'}"
        layer.add((v, MK.versionLabel, lit_str(label)))
        if re.fullmatch(r"\d{4}", year):
            layer.add((v, MK.versionYear, Literal(year, datatype=XSD.gYear)))
        versions_by_char[char].append((release.get(game, ""), str(v), v))
        for ab in base.objects(v, MK.hasAbility):
            if ab in moves:
                layer.add((v, MK.performsMove, ab))
    for char, items in versions_by_char.items():
        items.sort()
        for idx, (_, _, v) in enumerate(items, start=1):
            layer.add((v, MK.versionSequence, Literal(idx, datatype=XSD.integer)))
            if idx < len(items):
                layer.add((v, MK.nextVersion, items[idx][2]))
    stats["characterVersions"] = sum(len(i) for i in versions_by_char.values())

    # --- Story events: StoryTimeline, precedes, involvesVersion ------------------
    def event_timeline(e: URIRef) -> Optional[URIRef]:
        return first(base, e, MK.occursIn) or first(base, e, MK.occursInTimeline)

    events = []
    for e in base.subjects(RDF.type, MK.Event):
        order = first(base, e, MK.chronologicalOrder)
        events.append((int(order) if order is not None else 10**6, str(e), e))
    events.sort()
    for (_, _, a), (_, _, b) in zip(events, events[1:]):
        layer.add((a, MK.precedes, b))

    timeline_events: Dict[URIRef, List[URIRef]] = defaultdict(list)
    for _, _, e in events:
        t = event_timeline(e)
        if t is not None:
            timeline_events[t].append(e)
    for _, _, t in timelines:
        evs = timeline_events.get(t, [])
        if not evs:
            continue
        st = MK["storytimeline-" + local(t).replace("timeline-", "", 1)]
        layer.add((st, RDF.type, MK.StoryTimeline))
        layer.add((st, MK.name, lit_str(f"{name_of(base, t)} - Story Timeline")))
        layer.add((st, MK.description, lit_str(
            f"Chronologically ordered Story Events of the {name_of(base, t)} ({len(evs)} events).")))
        layer.add((st, MK.describesTimeline, t))
        layer.add((st, MK.eventCount, Literal(len(evs), datatype=XSD.integer)))
        layer.add((st, MK.firstEvent, evs[0]))
        layer.add((st, MK.lastEvent, evs[-1]))
        for e in evs:
            layer.add((st, MK.hasStoryEvent, e))
    stats["storyTimelines"] = sum(1 for _ in layer.subjects(RDF.type, MK.StoryTimeline))

    involves_version = 0
    for _, _, e in events:
        t = event_timeline(e)
        game = first(base, e, MK.featuresInGame)
        game_year = int(release.get(game, "0000")[:4] or 0) if game else 0
        for p in base.objects(e, MK.involvesCharacter):
            cands = [v for v in base.objects(p, MK.hasVersion) if first(base, v, MK.existsInTimeline) == t]
            if not cands:
                continue
            exact = [v for v in cands if game is not None and (v, MK.appearsIn, game) in base]
            if exact:
                chosen = exact
            else:
                def dist(v: URIRef) -> int:
                    g2 = first(base, v, MK.appearsIn)
                    return abs(int(release.get(g2, "0000")[:4] or 0) - game_year)
                chosen = [min(cands, key=dist)]
            for v in chosen:
                layer.add((e, MK.involvesVersion, v))
                involves_version += 1
    stats["involvesVersion"] = involves_version

    # --- Story claims -----------------------------------------------------------
    claims = 0
    for _, _, e in events:
        title = str(first(base, e, MK.eventTitle) or local(e))
        summary = first(base, e, MK.eventSummary)
        t = event_timeline(e)
        url = first(base, e, MK.sourceURL)
        claim = MK["claim-" + local(e)]
        layer.add((claim, RDF.type, MK.StoryClaim))
        layer.add((claim, MK.name, lit_str(f"Claim: {title}")))
        layer.add((claim, MK.claimText, lit_str(str(summary) if summary is not None else title)))
        layer.add((claim, MK.claimPredicate, lit_str("occursIn")))
        layer.add((claim, MK.aboutEvent, e))
        if t is not None:
            layer.add((claim, MK.claimInTimeline, t))
        if url is not None:
            layer.add((claim, MK.supportedBy, source_uri(str(url))))
            layer.add((claim, MK.verificationStatus, lit_str(source_status[str(url)])))
        else:
            layer.add((claim, MK.verificationStatus, lit_str("unverified")))
        claims += 1

    seen_ids: Counter = Counter()
    for rel in relationships:
        subj = MK[re.sub(r"[^\w-]", "-", rel["subjectId"])]
        obj = MK[re.sub(r"[^\w-]", "-", rel["objectId"])]
        pred = rel["predicate"]
        if (subj, RDF.type, MK.Character) not in base or (obj, RDF.type, MK.Character) not in base:
            stats["skippedRelationships"].append(f"{rel['subjectId']} {pred} {rel['objectId']}")
            continue
        base_id = f"claim-rel-{local(subj).replace('character-', '', 1)}-{pred.lower()}-{local(obj).replace('character-', '', 1)}"
        seen_ids[base_id] += 1
        claim = MK[base_id if seen_ids[base_id] == 1 else f"{base_id}-{seen_ids[base_id]}"]
        context = rel.get("context", "")
        evidence = rel.get("evidence", "")
        layer.add((claim, RDF.type, MK.StoryClaim))
        layer.add((claim, MK.name, lit_str(f"{name_of(base, subj)} {pred} {name_of(base, obj)}")))
        layer.add((claim, MK.claimText, lit_str(evidence or f"{name_of(base, subj)} {pred} {name_of(base, obj)}")))
        layer.add((claim, MK.evidenceText, lit_str(evidence)))
        layer.add((claim, MK.claimPredicate, lit_str(pred)))
        layer.add((claim, MK.claimSubject, subj))
        layer.add((claim, MK.claimObject, obj))
        layer.add((claim, MK.claimContext, lit_str(context)))
        for tid in context_to_timelines(context):
            layer.add((claim, MK.claimInTimeline, MK[tid]))
        url = first(base, subj, MK.sourceURL)
        if url is not None:
            layer.add((claim, MK.supportedBy, source_uri(str(url))))
            layer.add((claim, MK.verificationStatus, lit_str(source_status[str(url)])))
        else:
            layer.add((claim, MK.verificationStatus, lit_str("unverified")))
        claims += 1
    stats["storyClaims"] = claims
    return layer, stats


# ------------------------------------------------------------------------------
# Lightweight OWL materialization
# ------------------------------------------------------------------------------

def materialize(g: Graph, onto: Graph) -> int:
    """Add triples entailed by rdfs:subPropertyOf, owl:inverseOf and owl:SymmetricProperty."""
    sub: Dict[URIRef, set] = defaultdict(set)
    for a, b in onto.subject_objects(RDFS.subPropertyOf):
        if isinstance(a, URIRef) and isinstance(b, URIRef):
            sub[a].add(b)
    inverse: Dict[URIRef, set] = defaultdict(set)
    for a, b in onto.subject_objects(OWL.inverseOf):
        if isinstance(a, URIRef) and isinstance(b, URIRef):
            inverse[a].add(b)
            inverse[b].add(a)
    symmetric = {p for p in onto.subjects(RDF.type, OWL.SymmetricProperty) if isinstance(p, URIRef)}

    added = 0
    changed = True
    while changed:
        changed = False
        for p in set(sub) | set(inverse) | symmetric:
            for s, o in list(g.subject_objects(p)):
                new = [(s, sp, o) for sp in sub.get(p, ())]
                new += [(o, ip, s) for ip in inverse.get(p, ())]
                if p in symmetric and isinstance(o, URIRef):
                    new.append((o, p, s))
                for t in new:
                    if t not in g:
                        g.add(t)
                        added += 1
                        changed = True
    return added


# ------------------------------------------------------------------------------
# Assemble / build / validate
# ------------------------------------------------------------------------------

def load_relationships() -> List[Dict[str, Any]]:
    if RELATIONSHIPS_JSON.exists():
        return json.loads(RELATIONSHIPS_JSON.read_text(encoding="utf-8"))
    return []


def assemble() -> Tuple[Graph, Graph, Graph, Graph, Dict[str, Any], int]:
    """Return (merged, ontology, base, layer, derive_stats, materialized_count)."""
    onto = Graph().parse(ONTOLOGY_TTL, format="turtle")
    base = Graph().parse(BASE_DATA_TTL, format="turtle")
    layer, stats = derive_story_layer(base, load_relationships())
    merged = Graph()
    bind_prefixes(merged)
    for part in (onto, base, layer):
        for t in part:
            merged.add(t)
    added = materialize(merged, onto)
    return merged, onto, base, layer, stats, added


def graph_statistics(g: Graph) -> Dict[str, Any]:
    classes = Counter(local(o) for _, o in g.subject_objects(RDF.type) if str(o).startswith(str(MK)))
    props = Counter(local(p) for _, p, _ in g if str(p).startswith(str(MK)))
    return {"totalTriples": len(g), "classInstanceCounts": dict(sorted(classes.items())),
            "propertyUsage": dict(sorted(props.items()))}


def cmd_build() -> Dict[str, Any]:
    merged, onto, base, layer, stats, added = assemble()
    layer.serialize(destination=str(STORY_LAYER_TTL), format="turtle")
    merged.serialize(destination=str(GRAPH_TTL), format="turtle")
    merged.serialize(destination=str(GRAPH_RDF), format="xml")
    owl_graph = Graph()
    bind_prefixes(owl_graph)
    for t in onto:
        owl_graph.add(t)
    owl_graph.serialize(destination=str(ONTOLOGY_OWL), format="xml")

    report = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "inputs": {"ontology": str(ONTOLOGY_TTL.relative_to(REPO_ROOT)),
                   "data": str(BASE_DATA_TTL.relative_to(REPO_ROOT))},
        "outputs": [str(p.relative_to(REPO_ROOT)) for p in (STORY_LAYER_TTL, GRAPH_TTL, GRAPH_RDF, ONTOLOGY_OWL)],
        "ontologyTriples": len(onto),
        "baseDataTriples": len(base),
        "storyLayerTriples": len(layer),
        "materializedTriples": added,
        "derived": stats,
        "graph": graph_statistics(merged),
    }
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    BUILD_REPORT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[build] ontology={len(onto)} base={len(base)} layer={len(layer)} "
          f"materialized={added} merged={len(merged)} triples")
    print(f"[build] species={stats['species']} sources={stats['sources']} "
          f"storyTimelines={stats['storyTimelines']} storyClaims={stats['storyClaims']} "
          f"involvesVersion={stats['involvesVersion']}")
    if stats["skippedRelationships"]:
        print(f"[build] skipped relationships: {stats['skippedRelationships']}")
    return report


def run_shacl(data_graph: Graph) -> Dict[str, Any]:
    from pyshacl import validate

    shapes = Graph().parse(SHAPES_TTL, format="turtle")
    conforms, results_graph, _ = validate(data_graph, shacl_graph=shapes, inference="none",
                                          abort_on_first=False, meta_shacl=False)
    items = []
    for res in results_graph.subjects(RDF.type, SH.ValidationResult):
        sev = first(results_graph, res, SH.resultSeverity)
        focus = first(results_graph, res, SH.focusNode)
        value = first(results_graph, res, SH.value)
        items.append({
            "severity": str(sev).split("#")[-1] if sev else "Violation",
            "focusNode": local(focus) if isinstance(focus, URIRef) else str(focus),
            "value": (local(value) if isinstance(value, URIRef) else str(value)) if value is not None else None,
            "path": (local(first(results_graph, res, SH.resultPath))
                     if isinstance(first(results_graph, res, SH.resultPath), URIRef) else None),
            "message": str(first(results_graph, res, SH.resultMessage) or ""),
            "sourceShape": (local(first(results_graph, res, SH.sourceShape))
                            if isinstance(first(results_graph, res, SH.sourceShape), URIRef) else "(inline)"),
        })
    items.sort(key=lambda i: (i["severity"], i["focusNode"], i["message"]))
    by_sev = Counter(i["severity"] for i in items)
    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "conformsStrict": bool(conforms),
        "conformsWithoutViolations": by_sev.get("Violation", 0) == 0,
        "dataTriples": len(data_graph),
        "resultsBySeverity": dict(by_sev),
        "results": items,
    }


def cmd_validate() -> Dict[str, Any]:
    merged, *_ = assemble()
    report = run_shacl(merged)
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    SHACL_REPORT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[validate] triples={report['dataTriples']} severity={report['resultsBySeverity']} "
          f"violation-free={report['conformsWithoutViolations']}")
    for item in report["results"][:25]:
        print(f"  - [{item['severity']}] {item['focusNode']} ({item['path']}): {item['message']}")
    if len(report["results"]) > 25:
        print(f"  ... {len(report['results']) - 25} more in {SHACL_REPORT.relative_to(REPO_ROOT)}")
    return report


# ------------------------------------------------------------------------------
# Documentation generator
# ------------------------------------------------------------------------------

def _render_class(g: Graph, node: Any) -> str:
    if isinstance(node, URIRef):
        return f"`{g.namespace_manager.normalizeUri(node).strip('<>')}`" if str(node).startswith(str(MK)) \
            else f"`{str(node).split('#')[-1]}`"
    members = first(g, node, OWL.unionOf)
    if members is not None:
        return " ∪ ".join(_render_class(g, m) for m in Collection(g, members))
    return "?"


def cmd_docs() -> None:
    g = Graph().parse(ONTOLOGY_TTL, format="turtle")
    bind_prefixes(g)

    def label(s: URIRef) -> str:
        return str(first(g, s, RDFS.label) or local(s))

    def comment(s: URIRef) -> str:
        return str(first(g, s, RDFS.comment) or "").replace("|", "/")

    lines = ["# Ontologi Mortal Kombat Knowledge Nexus (v2.0)", "",
             "> Dokumen ini dihasilkan otomatis oleh `scripts/kb_tools.py docs` dari `ontology/core.ttl`. Jangan diedit manual.",
             "", "## 1. Hierarki Class", "", "```text"]

    def tree(node: URIRef, depth: int) -> None:
        lines.append("  " * depth + f"mk:{local(node)}  ({label(node)})")
        for child in sorted(g.subjects(RDFS.subClassOf, node), key=str):
            if isinstance(child, URIRef):
                tree(child, depth + 1)

    tree(MK.Entity, 0)
    lines += ["```", ""]

    n_classes = len(set(g.subjects(RDF.type, OWL.Class)) - {s for s in g.subjects(RDF.type, OWL.Class) if isinstance(s, BNode)})
    obj_props = sorted((p for p in g.subjects(RDF.type, OWL.ObjectProperty)), key=str)
    dt_props = sorted((p for p in g.subjects(RDF.type, OWL.DatatypeProperty)), key=str)
    lines += [f"Total: **{n_classes} class**, **{len(obj_props)} object property**, **{len(dt_props)} datatype property**.", "",
              "## 2. Object Properties", "",
              "| Property | Domain | Range | Karakteristik / Catatan |", "|---|---|---|---|"]
    chars = {OWL.FunctionalProperty: "Functional", OWL.InverseFunctionalProperty: "InverseFunctional",
             OWL.TransitiveProperty: "Transitive", OWL.SymmetricProperty: "Symmetric",
             OWL.IrreflexiveProperty: "Irreflexive"}
    for p in obj_props:
        notes = [v for k, v in chars.items() if (p, RDF.type, k) in g]
        inv = first(g, p, OWL.inverseOf)
        if inv is not None:
            notes.append(f"inverse: `mk:{local(inv)}`")
        for sup in g.objects(p, RDFS.subPropertyOf):
            notes.append(f"sub-property of `mk:{local(sup)}`")
        dom, rng = first(g, p, RDFS.domain), first(g, p, RDFS.range)
        extra = comment(p)
        lines.append(f"| `mk:{local(p)}` | {_render_class(g, dom) if dom is not None else '-'} | "
                     f"{_render_class(g, rng) if rng is not None else '-'} | "
                     f"{'; '.join(notes)}{' - ' + extra if extra else ''} |")
    lines += ["", "## 3. Datatype Properties", "", "| Property | Domain | Range | Catatan |", "|---|---|---|---|"]
    for p in dt_props:
        notes = ["Functional"] if (p, RDF.type, OWL.FunctionalProperty) in g else []
        dom, rng = first(g, p, RDFS.domain), first(g, p, RDFS.range)
        extra = comment(p)
        lines.append(f"| `mk:{local(p)}` | {_render_class(g, dom) if dom is not None else '-'} | "
                     f"`xsd:{str(rng).split('#')[-1]}` | {'; '.join(notes)}{' - ' + extra if extra else ''} |")

    key_props = ["hasVersion", "appearsIn", "existsInTimeline", "hasAbility", "hasElement", "usesWeapon",
                 "memberOf", "originatesFrom", "ofSpecies", "locatedInRealm", "involvesCharacter",
                 "involvesVersion", "occursIn", "featuresInGame", "hasStoryEvent", "describesTimeline",
                 "aboutEvent", "claimSubject", "claimInTimeline", "supportedBy"]
    lines += ["", "## 4. Diagram Relasi Utama", "", "```mermaid", "flowchart LR"]
    for p in key_props:
        dom, rng = first(g, MK[p], RDFS.domain), first(g, MK[p], RDFS.range)
        if isinstance(dom, URIRef) and isinstance(rng, URIRef):
            lines.append(f"    {local(dom)} -->|{p}| {local(rng)}")
    lines += ["```", "", "## 5. Pembeda Game dan Timeline (CharacterVersion)", "",
              "- `mk:Character` hanya menyimpan identitas franchise (nama, spesies, asal, tahun muncul pertama).",
              "- Setiap `mk:CharacterVersion` memiliki tepat satu `mk:versionOf`, satu `mk:existsInTimeline`, dan "
              "`mk:appearsIn` (game). Klan, kemampuan, dan senjata dilekatkan pada versi, bukan karakter.",
              "- Versi diurutkan per karakter dengan `mk:versionSequence`, `mk:nextVersion`, dan `mk:previousVersion`.",
              "- Hubungan antar-karakter (`enemyOf`, `alliedWith`) bersifat franchise-level; konteks timeline-nya disimpan "
              "pada `mk:StoryClaim` melalui `mk:claimInTimeline`.", ""]
    DOCS_MD.parent.mkdir(parents=True, exist_ok=True)
    DOCS_MD.write_text("\n".join(lines), encoding="utf-8")
    print(f"[docs] wrote {DOCS_MD.relative_to(REPO_ROOT)}")


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("command", choices=["build", "validate", "docs", "all"])
    args = parser.parse_args(argv)
    exit_code = 0
    if args.command in ("build", "all"):
        cmd_build()
    if args.command in ("validate", "all"):
        report = cmd_validate()
        if not report["conformsWithoutViolations"]:
            exit_code = 1
    if args.command in ("docs", "all"):
        cmd_docs()
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
