# Data Engineering Pipeline — Mortal Kombat Knowledge Nexus (PRD v1.5)

Pipeline data engineering berbasis Python untuk akuisisi multi-sumber, pembersihan data mentah, ekstraksi entitas & relasi, tata kelola sumber eksternal, manajemen hak cipta aset gambar, audit pengecualian DLC, validasi kualitas dataset, dan serialisasi RDF/OWL.

---

## 🏛️ Arsitektur Direktori
```text
data-engineering/
├── config/
│   └── sources.json               # Registry konfigurasi sumber (Fandom, Official, WB Games)
├── scrapers/                      # Source Adapters & Discovery (FR-24, FR-30)
│   ├── base_adapter.py            # Base adapter: HTTP retries, exponential backoff, SHA-256 hash
│   ├── fandom_adapter.py          # MediaWiki Action API adapter (Mortal Kombat Fandom)
│   ├── official_adapter.py        # Adapter situs resmi Mortal Kombat (Roster & Lore)
│   ├── wb_adapter.py              # Adapter Warner Bros. Games press releases & catalogue
│   └── external_discovery.py      # External Reference Discovery engine & scoring (FR-30)
├── processors/                    # Data Processing & Quality Gates (FR-25, FR-26, FR-27, FR-31)
│   ├── cleaner.py                 # Normalisasi unicode, pembersihan boilerplate, deduplikasi hash
│   ├── entity_resolver.py         # Resolusi alias & pembangunan URI kanonikal (mk:)
│   ├── extractor.py               # Ekstraksi entitas & relasi + Strict DLC Exclusion Filter
│   ├── image_asset_manager.py     # Registry & audit hak cipta aset gambar (FR-31)
│   └── validator.py               # Validasi skema, referensial, & provenance wajib (FR-27)
├── rdf_generator/                 # RDF/OWL Serializer (FR-28)
│   └── builder.py                 # Serialisasi RDFLib ke Turtle (.ttl) dan RDF/XML (.rdf/.owl)
├── storage/                       # Tempat penyimpanan data bertahap
│   ├── raw/                       # Snapshot dokumen mentah (raw_pages.json)
│   ├── cleaned/                   # Hasil normalisasi & deduplikasi (cleaned_pages.json)
│   ├── extracted/                 # Dataset entitas JSON per kategori
│   │   ├── characters.json        # 36 karakter kanonikal + variasi versi
│   │   ├── games.json             # 15 game standalone (Classic, 3D, Spin-off, Reboot, New Era)
│   │   ├── abilities.json         # 51 kemampuan, jurus spesial, & Fatality
│   │   ├── weapons.json           # Senjata tempur ikonik
│   │   ├── clans.json             # Klan & organisasi
│   │   ├── realms.json            # Dimensi realm & lokasi
│   │   ├── timelines.json         # 3 kontinuitas linimasa
│   │   ├── story_events.json      # 15 peristiwa cerita terverifikasi
│   │   ├── elements.json          # Klasifikasi elemen supernatural
│   │   └── relationships.json     # Relasi antarentitas dengan bukti teks
│   ├── validated/                 # Dataset siap guna yang telah lolos quality gates
│   │   ├── entities.json          # Seluruh entitas terverifikasi
│   │   └── relationships.json     # Relasi tervalidasi
│   ├── assets/                    # Registry aset visual (image_asset_registry.json)
│   ├── exports/                   # Serialisasi graph RDF (mortal_kombat.ttl & mortal_kombat.rdf)
│   └── reports/                   # Laporan audit & monitoring pipeline
│       ├── scrape_report.json
│       ├── cleaning_report.json
│       ├── extraction_report.json
│       ├── source_discovery_report.json
│       ├── image_asset_report.json
│       ├── validation_report.json
│       └── rdf_export_report.json
├── pipeline.py                    # Master CLI Orchestrator
├── requirements.txt
└── pyproject.toml
```

---

## 🛡️ Kebijakan Batasan Konten (Strict DLC Exclusion Policy)
Sesuai **PRD v1.5 Bagian 6 & 28.12**:
- **Cakupan:** Seluruh game standalone Mortal Kombat lintas era (Classic, 3D, Spin-off, Reboot, New Era).
- **Pengecualian Mutlak:** Konten DLC, expansion pack, Kombat Pack, dan season pass **TIDAK DIMASUKKAN** sebagai entitas dataset (misal guest DLC: Spawn, Terminator, Robocop, Joker, Homelander, Peacemaker, Omni-Man, dll).
- Karakter yang pernah menjadi DLC hanya dapat dimasukkan jika muncul sebagai *base roster* di game standalone lainnya.
- Hasil audit: `0 DLC contamination` tercatat pada `extraction_report.json` dan `validation_report.json`.

---

## 📊 Ringkasan Dataset yang Dihasilkan
- **Karakter:** 36 karakter base roster terverifikasi (Target MVP: 30–50 karakter).
- **Game Standalone:** 15 judul game standalone dari 1992 hingga 2023 (Target MVP: 10+ game).
- **Kemampuan & Jurus:** 51 kemampuan, elemen, special moves, dan Fatality (Target MVP: 50+ kemampuan).
- **Linimasa Cerita:** 3 timeline (Original, Reboot, New Era) (Target MVP: minimal 3 timeline).
- **Peristiwa Cerita:** 15 peristiwa naratif ber-provenance (Target MVP: minimal 15 peristiwa).
- **Triples RDF:** 1.097 triples terverifikasi diekspor ke Turtle dan RDF/XML.

---

## 🚀 Cara Menjalankan Pipeline

### 1. Prasyarat Lingkungan
Pastikan terpasang **Python 3.10+**.
```bash
# Pasang dependensi
pip install -r requirements.txt
```

### 2. Menjalankan Seluruh Pipeline Sekaligus
```bash
python pipeline.py all
```
Perintah ini akan mengeksekusi secara berurutan:
1. `scrape` (Scraping multi-sumber & pembuatan raw repository)
2. `clean` (Pembersihan, normalisasi unicode, & deduplikasi hash)
3. `extract` (Ekstraksi entitas & relasi + audit filter DLC)
4. `discover-sources` (Evaluasi kandidat sumber eksternal FR-30)
5. `manage-assets` (Registrasi & review hak cipta gambar FR-31)
6. `validate` (Quality gates & validasi referensial FR-27)
7. `export-rdf` (Serialisasi RDF/XML & Turtle via RDFLib FR-28)

### 3. Menjalankan Tahapan Tertentu Saja
```bash
# Scraping saja
python pipeline.py scrape --limit 15

# Pembersihan data mentah saja
python pipeline.py clean

# Ekstraksi entitas & relasi saja
python pipeline.py extract

# Evaluasi sumber eksternal saja
python pipeline.py discover-sources

# Audit aset gambar saja
python pipeline.py manage-assets

# Validasi dataset saja
python pipeline.py validate

# Export graph RDF saja
python pipeline.py export-rdf
```
