# Data Engineering Pipeline - Mortal Kombat Knowledge Nexus

Pipeline data engineering berbasis Python untuk akuisisi multi-sumber, pembersihan, ekstraksi entitas, resolusi entitas, validasi SHACL, dan serialisasi RDF/OWL.

## Struktur Direktori
```text
data-engineering/
├── config/
│   └── sources.json           # Registry konfigurasi sumber (Fandom, Official, WB Games)
├── scrapers/                  # Source adapter terpisah
│   ├── base_adapter.py
│   ├── fandom_adapter.py
│   ├── official_adapter.py
│   └── wb_adapter.py
├── processors/                # Data cleaning, extraction, & validation
│   ├── cleaner.py
│   ├── extractor.py
│   ├── entity_resolver.py
│   └── validator.py
├── rdf_generator/             # RDFLib serialisasi graph ke Turtle / OWL
│   └── builder.py
├── storage/                   # Penyimpanan tahapan dataset (gitignored)
│   ├── raw/
│   ├── cleaned/
│   ├── extracted/
│   ├── validated/
│   ├── assets/
│   └── exports/
├── pipeline.py                # CLI Orchestrator runner
├── requirements.txt
└── pyproject.toml
```

## Cara Menjalankan Pipeline
1. Buat dan aktifkan Python Virtual Environment (Python 3.10+):
   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # Linux/macOS:
   source venv/bin/activate
   ```
2. Pasang dependensi:
   ```bash
   pip install -r requirements.txt
   ```
3. Jalankan pipeline stage via CLI:
   ```bash
   # Jalankan seluruh pipeline (dry run)
   python pipeline.py all --limit 10

   # Jalankan stage tertentu
   python pipeline.py scrape --source fandom-wiki
   python pipeline.py clean
   python pipeline.py extract
   python pipeline.py validate
   python pipeline.py export-rdf
   ```
