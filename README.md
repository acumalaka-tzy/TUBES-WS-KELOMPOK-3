# MORTAL KOMBAT KNOWLEDGE NEXUS
### A Semantic Knowledge Graph & Hybrid Search Engine (PRD v1.5)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Apache Jena Fuseki](https://img.shields.io/badge/Apache_Jena_Fuseki-5.2-red?style=for-the-badge&logo=apache)](https://jena.apache.org/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)

---

## 👥 Anggota Kelompok (Kelompok 3)
| No | Nama Lengkap | NIM | Peran Utama (Modular) |
|---|---|---|---|
| 1 | **Aldiva Roelya Padang** | 251402007 | **Frontend & UI/UX Specialist** (Next.js, Tailwind v4, Encyclopedia UI, Search UI, Story Explorer) |
| 2 | **Gabriel Saurman Parhusip** | 251402043 | **Backend & Hybrid Search Engineer** (Route Handlers, SPARQL Client, Fuseki Proxy, RRF Ranking) |
| 3 | **Muhammad Izyan Roshan** | 251402110 | **Knowledge Base & Semantic Web Engineer** (OWL Ontology, Protégé, SHACL Shapes, Fuseki Setup, SPARQL Templates) |
| 4 | **Yazri Khoiri Matondang** | 251402016 | **Data Engineering & Scraping Specialist** (Multi-Source Adapters, Cleaning, Entity Resolution, RDFLib Generator) |

---

## 📖 Deskripsi Proyek
**Mortal Kombat Knowledge Nexus** adalah platform ensiklopedia digital dan mesin pencari berbasis Semantic Web yang menghubungkan informasi seluruh semesta **Mortal Kombat** ke dalam sebuah **Knowledge Graph** menggunakan teknologi RDF, OWL, RDFS, dan SPARQL.

Platform ini mengimplementasikan **Hybrid Semantic Search Engine** yang memadukan pencarian leksikal teks (keyword), penelusuran relasi graf semantik (SPARQL), dan penelusuran cerita naratif (story search) yang dilengkapi dengan penjelasan hasil (*search explanation*) dan *provenance* sumber data.

> **Batasan Konten Sesuai PRD v1.5:**
> Mencakup seluruh game Mortal Kombat yang dirilis sebagai *standalone game* (Classic Era, 3D Era, Reboot Era, New Era). Konten DLC, expansion pack, Kombat Pack, dan konten season pass dikecualikan.

---

## 🏛️ Arsitektur Repository (Modular Monorepo)

```text
TUBES-WS-KELOMPOK-3/
├── docs/                           # Dokumentasi & Spesifikasi
│   └── PRD_v1.5.md                 # Product Requirements Document v1.5 lengkap
│
├── frontend/                       # Web Application (PIC: Anggota 1 & 2)
│   ├── src/
│   │   ├── app/                    # Next.js App Router (Halaman publik & UI)
│   │   │   ├── page.tsx            # Cinematic Landing Page
│   │   │   ├── search/             # Global & Hybrid Search Page
│   │   │   ├── characters/         # Character Encyclopedia & Version Detail
│   │   │   ├── games/              # Standalone Game Encyclopedia
│   │   │   ├── abilities/          # Abilities & Special Moves Encyclopedia
│   │   │   ├── weapons/            # Weapons Encyclopedia
│   │   │   ├── organizations/      # Clans, Factions, & Organizations
│   │   │   ├── timelines/          # Timelines Encyclopedia
│   │   │   ├── story/              # Story Explorer & Chronology Timeline
│   │   │   └── api/                # Backend API Route Handlers (PIC: Anggota 2)
│   │   │       ├── health/         # Fuseki connection health check
│   │   │       ├── sparql/         # Arbitrary SPARQL query proxy
│   │   │       ├── search/         # Hybrid & Semantic Search API
│   │   │       ├── characters/     # Characters retrieval
│   │   │       └── story/          # Story search & event timeline API
│   │   ├── components/             # Reusable UI components (Cards, Navbar, Footer, EntityImage)
│   │   └── lib/                    # API client, types, mock fallback, fuseki.ts
│   ├── package.json                # Next.js 16 + Tailwind CSS v4 + TypeScript
│   └── README.md
│
├── fuseki/                         # Apache Jena Fuseki Standalone (Dockerless)
│   ├── configuration/
│   │   └── mk_nexus.ttl            # TDB2 Dataset Assembler (:mk_nexus)
│   ├── shiro.ini                   # Keamanan, autentikasi & hak akses endpoint SPARQL
│   ├── setup-fuseki.ps1            # Script download & ekstrak otomatis Fuseki Standalone
│   ├── run-fuseki.bat              # Script runner Fuseki untuk Windows
│   ├── run-fuseki.sh               # Script runner Fuseki untuk Linux / macOS
│   ├── databases/                  # Direktori penyimpanan database persistent TDB2
│   └── README.md
│
├── knowledge-base/                 # Pemodelan Semantik & Ontologi (PIC: Anggota 3)
│   ├── ontology/
│   │   └── core.ttl                # Definisi Ontologi OWL / RDFS (Class & Properties)
│   ├── shacl/
│   │   └── shapes.ttl              # SHACL NodeShapes untuk validasi data
│   ├── queries/
│   │   └── sample_queries.sparql   # Koleksi SPARQL queries benchmark
│   ├── data/
│   │   └── seed_data.ttl           # Seed data awal terverifikasi (RDF Turtle)
│   └── README.md
│
├── data-engineering/               # Data Pipeline Python (PIC: Anggota 4)
│   ├── config/
│   │   └── sources.json            # Registry sumber (Fandom, Official, WB Games)
│   ├── scrapers/                   # Source adapters terpisah (Base, Fandom, Official, WB)
│   ├── processors/                 # Cleaning, Extraction, Resolution, Validation
│   ├── rdf_generator/              # RDFLib graph builders & exporter
│   ├── storage/                    # Tempat penyimpanan data bertahap
│   ├── pipeline.py                 # CLI Orchestrator runner
│   ├── requirements.txt            # Dependensi Python (requests, beautifulsoup4, rdflib, pyshacl)
│   └── README.md
│
├── .env.example                    # Template environment variables global
├── .gitignore                      # Git ignore rule lengkap
└── README.md
```

---

## 🚀 Panduan Menjalankan Project

### 1. Setup & Jalankan Apache Jena Fuseki Standalone (Dockerless)
1. Buka terminal di folder `fuseki/`:
   ```powershell
   cd fuseki
   ```
2. Download binary Fuseki resmi secara otomatis (khusus pertama kali):
   ```powershell
   .\setup-fuseki.ps1
   ```
3. Jalankan server Fuseki:
   - **Windows:**
     ```cmd
     .\run-fuseki.bat
     ```
   - **Linux/macOS:**
     ```bash
     chmod +x run-fuseki.sh
     ./run-fuseki.sh
     ```
4. Fuseki aktif di `http://localhost:3030`. Dataset `:mk_nexus` otomatis terbaca dari konfigurasi TDB2.

---

### 2. Setup & Jalankan Frontend & Backend API
1. Masuk ke folder `frontend/`:
   ```bash
   cd frontend
   npm install
   ```
2. Jalankan server development:
   ```bash
   npm run dev
   ```
3. Akses aplikasi di [http://localhost:3000](http://localhost:3000).
   - Mode Mock (default): data contoh lokal aktif.
   - Mode Live Fuseki: atur `NEXT_PUBLIC_USE_MOCK=false` di `frontend/.env.local` untuk query langsung ke Fuseki endpoint.

---

### 3. Setup & Jalankan Python Data Pipeline (Data Engineering)
1. Masuk ke folder `data-engineering/`:
   ```bash
   cd data-engineering
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # Linux/macOS:
   source venv/bin/activate

   pip install -r requirements.txt
   ```
2. Jalankan pipeline:
   ```bash
   python pipeline.py all --limit 10
   ```
