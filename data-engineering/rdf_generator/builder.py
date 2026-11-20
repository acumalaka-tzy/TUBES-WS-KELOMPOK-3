import rdflib
from rdflib import Graph, URIRef, Literal, Namespace
from rdflib.namespace import RDF, RDFS, XSD

MK = Namespace("https://example.org/mk/")

class RDFGraphBuilder:
    """Constructs RDF Graphs using RDFLib and exports Turtle / RDF/XML."""

    def __init__(self):
        self.graph = Graph()
        self.graph.bind("mk", MK)
        self.graph.bind("rdfs", RDFS)
        self.graph.bind("xsd", XSD)

    def add_character(self, uri: str, name: str, description: str):
        char_node = URIRef(uri)
        self.graph.add((char_node, RDF.type, MK.Character))
        self.graph.add((char_node, MK.name, Literal(name, datatype=XSD.string)))
        if description:
            self.graph.add((char_node, MK.description, Literal(description, datatype=XSD.string)))

    def serialize_turtle(self, output_path: str):
        self.graph.serialize(destination=output_path, format="turtle")
