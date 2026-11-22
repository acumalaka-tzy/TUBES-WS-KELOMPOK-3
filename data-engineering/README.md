# Data Engineering Pipeline — Mortal Kombat Knowledge Nexus (PRD v1.5)

Sistem pipeline Data Engineering komprehensif berbasis Python untuk ekstraksi, integrasi multi-sumber, pembersihan, resolusi identitas entitas, tata kelola sumber data, manajemen hak cipta gambar, penegakan batasan media game standalone, validasi 22 gerbang kualitas (quality gates), dan serialisasi Knowledge Graph ke format RDF/OWL (Turtle `.ttl` dan RDF/XML `.rdf`).

---

## 🏛️ Arsitektur Direktori
```text
data-engineering/
├── config/
│   └── sources.json               # Registry konfigurasi 5 sumber (Fandom, Official, WB, Wikidata, MobyGames)
├── scrapers/                      # Source Adapters & Governance (FR-24, FR-30)
│   ├── base_adapter.py            # Base adapter: HTTP retries, transparent status, SHA-256 hash
│   ├── fandom_adapter.py          # MediaWiki Action API adapter dengan pagination kategori
│   ├── official_adapter.py        # Adapter situs resmi Mortal Kombat (Live Roster & Lore)
│   ├── wb_adapter.py              # Adapter Warner Bros. Games Pressroom (Publisher release notes)
│   ├── wikidata_adapter.py        # SPARQL endpoint adapter dengan fallback transparan
│   ├── mobygames_adapter.py       # Catalog adapter untuk verifikasi game standalone
│   └── external_discovery.py      # Reference discovery & governance scoring engine (FR-30)
├── processors/                    # Data Processing & Quality Gates (FR-25, FR-26, FR-27, FR-31)
│   ├── cleaner.py                 # Normalisasi unicode, pembersihan boilerplate, deduplikasi hash
│   ├── media_scope_filter.py      # Filter batasan media: tolak film, komik, TV, dan guest DLC
│   ├── entity_resolver.py         # Resolusi identitas kontekstual (Bi-Han, Kuai Liang, Hanzo)
│   ├── extractor.py               # Ekstraksi entitas & relasi dari cleaned_pages.json
│   ├── image_asset_manager.py     # Registry & audit hak cipta aset gambar (FR-31)
│   └── validator.py               # 22 Quality Gates, integritas skema, referensial & provenance
├── rdf_generator/                 # RDF/OWL Graph Serializer (FR-28)
│   └── builder.py                 # Serialisasi RDFLib ke Turtle (.ttl) dan RDF/XML (.rdf)
├── storage/                       # Tempat penyimpanan data bertahap
│   ├── raw/                       # Snapshot dokumen mentah (raw_pages.json & history run)
│   ├── cleaned/                   # Hasil normalisasi & deduplikasi (cleaned_pages.json)
│   ├── extracted/                 # Dataset entitas JSON per kategori
│   │   ├── characters.json        # 61 karakter kanonikal standalone
│   │   ├── games.json             # 23 game standalone (Classic, 3D, Reboot, New Era)
│   │   ├── abilities.json         # 101 kemampuan supernatural & special moves
│   │   ├── weapons.json           # 15 senjata tempur ikonik
│   │   ├── clans.json             # 7 klan & organisasi
│   │   ├── realms.json            # 6 dimensi realm kanonikal
│   │   ├── locations.json         # 14 lokasi & arena pertarungan
│   │   ├── timelines.json         # 3 kontinuitas linimasa
│   │   ├── elements.json          # 9 klasifikasi elemen supernatural
│   │   ├── story_events.json      # 25 peristiwa cerita ber-provenance
│   │   └── relationships.json     # 31 relasi antarentitas dengan bukti teks
│   ├── validated/                 # Dataset tervalidasi siap pakai oleh tim Knowledge Graph
│   │   ├── entities.json          # Seluruh entitas terverifikasi lengkap
│   │   └── relationships.json     # Relasi terverifikasi
│   ├── assets/                    # Registry visual (image_asset_registry.json)
│   ├── exports/                   # Serialisasi graph RDF (mortal_kombat.ttl & mortal_kombat.rdf)
│   └── reports/                   # Laporan audit & monitoring pipeline
│       ├── scrape_report.json
│       ├── cleaning_report.json
│       ├── extraction_report.json
│       ├── media_scope_exclusion_report.json
│       ├── source_discovery_report.json
│       ├── image_asset_report.json
│       ├── validation_report.json
│       ├── rdf_export_report.json
│       └── master_pipeline_report.json
├── tests/                         # Automated Unit & Integration Tests (10 test suites)
│   ├── test_cleaner.py
│   ├── test_dlc_filter.py
│   ├── test_extractor_and_resolution.py
│   ├── test_image_assets.py
│   ├── test_media_scope.py
│   ├── test_pipeline.py
│   ├── test_rdf_builder.py
│   ├── test_reporting_consistency.py
│   ├── test_scrapers.py
│   └── test_validator.py
├── pipeline.py                    # Master CLI Orchestrator (12 stages)
├── requirements.txt
└── pyproject.toml
```

---

## 🛡️ Kebijakan Batasan Konten (Standalone Video Games Only)
Sesuai **PRD v1.5 Bagian 5.2, 6.1 & 28.12**:
1. **Cakupan Eksklusif:** Hanya entitas dan game dari lini **video game Mortal Kombat standalone** yang dimasukkan ke dataset utama.
2. **Pengecualian Mutlak Non-Game Media:** Karakter eksklusif film (Cole Young, Art Lean, Allison Young), serial televisi *Mortal Kombat: Conquest* (Aavi, Siro, Taja, Vorpax), dan *Malibu Comics* (Abacus, Baphomet, Siang, Hydro) **DITOLAK** dan diaudit ke `media_scope_exclusion_report.json`.
3. **Pengecualian Mutlak Guest DLC:** Karakter tamu / guest DLC (Spawn, Omni-Man, Homelander, Peacemaker, Terminator, RoboCop, Joker, Ghostface, T-1000, Conan, dll.) **DITOLAK**.
4. **Audit Kontaminasi:** Tercatat `0 DLC contamination` dan `0 Non-Game Media contamination` pada dataset tervalidasi.

---

## 📊 Statistik Dataset Aktual (Terverifikasi)

| Kategori Entitas | Jumlah Entitas | Provenance & Keterangan |
| :--- | :---: | :--- |
| **Characters** | 61 | Karakter kanonikal video game standalone |
| **Character Versions** | 121 | Varian penampilan fighter per game dan timeline |
| **Standalone Games** | 23 | Game rilis standalone (1992 s.d. 2023) |
| **Abilities & Special Moves** | 101 | Jurus spesial, proyektil, Fatality, dan Brutality |
| **Locations / Arenas** | 14 | Arena pertarungan terhubung ke realm |
| **Realms** | 6 | Earthrealm, Netherrealm, Outworld, Edenia, Orderrealm, Chaosrealm |
| **Timelines** | 3 | Original Timeline, Reboot Timeline, New Era Timeline |
| **Clans & Organizations** | 7 | Shirai Ryu, Lin Kuei, Special Forces, Black Dragon, White Lotus, dll. |
| **Elements** | 9 | Fire, Ice, Lightning, Soul, Shadow, Blood, Wind, dll. |
| **Weapons** | 15 | Kunai Spear, Kōri Blade, Mugai Ryu, War Hammer, dll. |
| **Story Events** | 25 | Peristiwa naratif kanonikal ber-provenance |
| **Relationships** | 31 | Relasi semantik antarentitas (enemyOf, alliedWith, memberOf) |
| **RDF Triples** | **2.851** | Serialisasi Turtle (.ttl) dan RDF/XML (.rdf) |
| **Image Assets** | 83 | 35 Approved (Official Press Kit), 48 Pending Review |

---

## 🚀 Cara Menjalankan Pipeline

### 1. Prasyarat Lingkungan
Pastikan terpasang **Python 3.10+** (Direkomendasikan Python 3.12).
```bash
pip install -r requirements.txt
```

### 2. Menjalankan Seluruh Pipeline Sekaligus (12 Tahap End-to-End)
```bash
python pipeline.py all
```
Perintah ini akan menjalankan 12 tahap secara berurutan:
1. `Source Discovery` (Audit tata kelola sumber eksternal FR-30)
2. `Multi-Source Scraping` (Pengambilan data live dari 5 sumber)
3. `Raw Data Archiving` (Penyimpanan repositori mentah dengan riwayat snapshot)
4. `Cleaning & Normalization` (Deduplikasi hash SHA-256 & pembersihan wikitext/HTML)
5. `Entity Extraction` (Membaca `cleaned_pages.json` & parsing kandidat entitas)
6. `Entity Resolution` (Disambiguasi identitas kontekstual: Bi-Han, Kuai Liang, Hanzo)
7. `Dataset Enrichment` (Penggabungan kandidat dengan provenance lengkap)
8. `Media Scope Filter` (Pengecualian entitas non-game media & guest DLC)
9. `Image Asset Management` (Audit atribusi, lisensi, dan pemisahan hak cipta)
10. `Data Validation` (Penegakan 22 Quality Gates ketat)
11. `RDF/OWL Generation` (Serialisasi Turtle dan RDF/XML yang disinkronisasi ke Knowledge Base)
12. `Final Reporting` (Penyusunan `master_pipeline_report.json` terpadu)

### 3. Menjalankan Tahapan Tertentu Secara Mandiri
```bash
# 1. Evaluasi & Tata Kelola Sumber Eksternal
python pipeline.py discover

# 2. Pengambilan Data Multi-Sumber
python pipeline.py scrape

# 3. Pembersihan & Normalisasi Data
python pipeline.py clean

# 4. Ekstraksi Entitas & Resolusi
python pipeline.py extract

# 5. Registrasi & Audit Hak Aset Gambar
python pipeline.py assets

# 6. Validasi 22 Quality Gates
python pipeline.py validate

# 7. Serialisasi Graph RDF/OWL
python pipeline.py export-rdf

# 8. Kompilasi Laporan Master
python pipeline.py report
```

---

## 🧪 Automated Testing (10 Test Suites)
Jalankan pengujian unit dan integrasi dengan perintah:
```bash
python -m unittest discover -s tests -p "test_*.py" -v
```
Pengujian mencakup:
- `test_cleaner.py`: Hashing SHA-256, pembersihan tag wikitext/HTML, dan deduplikasi.
- `test_dlc_filter.py`: Penegakan isolasi DLC 0% kontaminasi.
- `test_extractor_and_resolution.py`: Ekstraksi dari `cleaned_pages.json` & disambiguasi Bi-Han/Kuai Liang.
- `test_image_assets.py`: Validasi skema 12 field, penolakan approve pada unvetted media.
- `test_media_scope.py`: Penolakan karakter film (Cole Young), komik (Abacus), TV (Aavi), dan DLC (Spawn, Omni-Man).
- `test_pipeline.py`: Inisialisasi komponen dan eksekusi tahapan pipeline.
- `test_rdf_builder.py`: Serialisasi graf RDFLib, penghitungan statistik dinamis, pemetaan properti.
- `test_reporting_consistency.py`: Konsistensi dinamis CharacterVersion di extracted, validated, dan RDF.
- `test_scrapers.py`: Parsing infobox Fandom, katalog MobyGames, fallback Wikidata, mock WB.
- `test_validator.py`: Integritas referensial foreign keys, mandatory provenance, dan 22 quality gates.

---

## 🔍 Sinkronisasi dengan Knowledge Base
Setiap eksekusi pipeline secara otomatis menyinkronkan output RDF ke:
* `data-engineering/storage/exports/mortal_kombat.ttl`
* `data-engineering/storage/exports/mortal_kombat.rdf`
* `knowledge-base/data/mortal_kombat.ttl`
* `knowledge-base/data/mortal_kombat.rdf`
Dataset ini siap di-load langsung ke Apache Jena Fuseki, divalidasi dengan SHACL, dan di-query melalui SPARQL endpoint.
