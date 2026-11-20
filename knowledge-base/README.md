# Knowledge Base - Mortal Kombat Knowledge Nexus

Direktori ini mengelola seluruh representasi semantik, ontologi OWL, validasi SHACL, query SPARQL, dan seed data RDF.

## Struktur Direktori
```text
knowledge-base/
├── ontology/
│   └── core.ttl               # Definisi Ontologi (Classes, Object Properties, Data Properties)
├── shacl/
│   └── shapes.ttl             # SHACL NodeShapes untuk validasi data
├── queries/
│   └── sample_queries.sparql  # Koleksi SPARQL queries pengujian
├── data/
│   └── seed_data.ttl          # Seed dataset awal terverifikasi (RDF Turtle)
└── README.md
```

## Spesifikasi Ontologi (v1.5)
- **Prefix Utama:** `mk: <https://example.org/mk/>`
- **Class Pokok:** `Character`, `CharacterVersion`, `Game`, `Timeline`, `Ability`, `Element`, `Move`, `Weapon`, `Organization`, `Clan`, `Realm`, `Species`, `Event`, `StoryArc`, `Source`.
- **Relasi Pokok:** `hasVersion`, `appearsIn`, `existsInTimeline`, `hasAbility`, `hasElement`, `usesWeapon`, `memberOf`, `originatesFrom`, `enemyOf`, `alliedWith`, `involvesCharacter`, `occursIn`.

## Penggunaan dengan Protégé
File `ontology/core.ttl` dapat dibuka langsung menggunakan [Protégé Desktop](https://protege.stanford.edu/) untuk pengeditan grafis, visualisasi class hierarchy, dan inference reasoner (HermiT / Pellet).
