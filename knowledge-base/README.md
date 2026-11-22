# Knowledge Base - Mortal Kombat Knowledge Nexus

Direktori ini mengelola seluruh representasi semantik: ontologi OWL, validasi SHACL, query SPARQL, dan data RDF (Anggota 3 - Ontology, RDF/OWL, Knowledge Graph).

## Struktur Direktori
```text
knowledge-base/
├── ontology/
│   ├── core.ttl                  # Ontologi OWL (sumber utama, Turtle)
│   └── core.owl                  # Ontologi yang sama dalam RDF/XML (untuk Protégé)
├── shacl/
│   └── shapes.ttl                # SHACL shapes (17+ NodeShape, SPARQL constraints)
├── data/
│   ├── mortal_kombat.ttl / .rdf  # Output pipeline data-engineering (input, jangan diedit manual)
│   ├── story_layer.ttl           # Layer turunan: Species, Source, versi, Story Timeline, Story Claim
│   ├── knowledge_graph.ttl / .rdf# Graph gabungan siap-load: ontologi + data + layer + inferensi ringan
│   └── seed_data.ttl             # Seed dataset awal (legacy)
├── queries/
│   └── sample_queries.sparql     # 17 query SPARQL (diuji otomatis)
├── scripts/
│   └── kb_tools.py               # build | validate | docs | all
├── reports/
│   ├── kb_build_report.json      # statistik hasil build
│   └── shacl_report.json         # hasil validasi SHACL
├── docs/
│   └── ONTOLOGY.md               # dokumentasi class/property (digenerate otomatis)
├── tests/
│   └── test_kb.py                # unit test ontologi, layer, SHACL, query
└── README.md
```

## Alur Kerja
```text
data-engineering pipeline ──► data/mortal_kombat.ttl ─┐
ontology/core.ttl ────────────────────────────────────┼─► kb_tools.py build ─► data/knowledge_graph.{ttl,rdf}
data-engineering/.../relationships.json ──────────────┘          │                data/story_layer.ttl
                                                                 └─► kb_tools.py validate (SHACL) ─► reports/shacl_report.json
```

```powershell
pip install rdflib pyshacl
python knowledge-base/scripts/kb_tools.py all          # build + validate + docs
python -m unittest discover -s knowledge-base/tests    # test
```
`validate` keluar dengan kode 1 bila ada pelanggaran (Violation); `Warning` hanya dilaporkan.

## Spesifikasi Ontologi (v2.0)
- **Prefix:** `mk: <https://example.org/mk/>`
- **Class (hierarki):** `Entity` → `Character`, `CharacterVersion`, `Game`, `Timeline`, `Ability` → `Move` → (`SpecialMove`, `Fatality`, `Brutality`), `Element`, `Weapon`, `Organization` → (`Clan`, `Faction`), `Location` → (`Realm`, `Arena`), `Species`, `Event` (Story Event), `StoryArc`, `StoryTimeline`, `StoryClaim`, `Source`. Class saling disjoint (`owl:AllDisjointClasses`).
- **Object property:** lengkap dengan domain, range, inverse, dan karakteristik OWL (Functional, Transitive, Symmetric, Irreflexive). Daftar penuh ada di [docs/ONTOLOGY.md](docs/ONTOLOGY.md).
- **Datatype property:** `name`, `description`, `releaseDate`, `firstAppearanceYear`, `chronologicalOrder`, `claimText`, dst.

### Pembeda game & timeline: `CharacterVersion`
- `Character` hanya menyimpan identitas franchise. Perbedaan antar-game dan antar-timeline dilekatkan pada `CharacterVersion` yang memiliki tepat **satu** `versionOf`, **satu** `existsInTimeline`, dan `appearsIn` (game).
- Klan (`memberOf`), kemampuan (`hasAbility`/`performsMove`), dan senjata (`usesWeapon`) ada di level versi.
- Konteks versi: `versionLabel`, `versionYear`, `versionSequence`, `nextVersion`/`previousVersion`.
- SHACL menolak dua versi karakter yang sama dengan game dan timeline yang sama.

### Story Event, Story Timeline, Story Claim
- `Event` (Story Event): `occursIn` (kanonik; alias dari pipeline `occursInTimeline`), `featuresInGame`, `chronologicalOrder`, `involvesCharacter`, `involvesVersion` (versi pada timeline event), `precedes`/`follows`.
- `StoryTimeline`: satu per `Timeline` (`describesTimeline`), berisi event terurut (`hasStoryEvent`, `firstEvent`, `lastEvent`, `eventCount`).
- `StoryClaim`: pernyataan cerita (tentang event atau relasi `enemyOf`/`alliedWith`) dengan `claimInTimeline` (timeline berlaku), `supportedBy` (`Source`), `verificationStatus`, dan `evidenceText`. Relasi antar-karakter bersifat franchise-level; timeline-nya ditentukan lewat claim.

### Kompatibilitas
Properti hasil pipeline yang berbeda nama dari properti kanonik dideklarasikan `rdfs:subPropertyOf` (mis. `occursInTimeline ⊑ occursIn`, `locatedInRealm ⊑ locatedIn`) dan hasilnya dimaterialisasi pada `knowledge_graph.ttl`, sehingga query lama (`mk:occursIn`, dsb.) tetap berjalan tanpa mengubah frontend.

## SHACL
`shacl/shapes.ttl` memvalidasi graph gabungan: kardinalitas, datatype, `sh:class`, `sh:in`, pola `gYear`, serta constraint SPARQL (identitas versi unik, `chronologicalOrder` unik, konsistensi timeline event ↔ versi ↔ StoryTimeline, relasi tidak refleksif). Konflik yang bisa sah (musuh sekaligus sekutu, claim tanpa versi pada timeline) dilaporkan sebagai `Warning`.

## Penggunaan dengan Protégé
1. Buka `ontology/core.owl` (atau `core.ttl`) di [Protégé Desktop](https://protege.stanford.edu/).
2. Tab *Entities* → *Classes* untuk hierarki; *Object/Data Properties* untuk domain & range.
3. Untuk menjelajahi individu, gunakan *File → Open* pada `data/knowledge_graph.rdf` (sudah memuat ontologi).
4. Reasoner (HermiT / Pellet) dapat dijalankan pada `knowledge_graph.rdf` untuk memeriksa konsistensi (disjointness, functional property).

## Memuat ke Fuseki
Muat `data/knowledge_graph.ttl` ke dataset `mk_nexus` (lihat [fuseki/README.md](../fuseki/README.md)); file ini sudah berisi ontologi sehingga tidak perlu diunggah terpisah.
