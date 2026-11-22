# MK Knowledge Nexus — Frontend & Backend API

Platform **Mortal Kombat Knowledge Nexus** (Tugas Besar Kelompok 3).
Dibangun dengan **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Apache Jena Fuseki Standalone** sesuai PRD v1.5.

---

## 👥 Modul & Peran Anggota

| Peran | PIC | Cakupan & Fokus |
|---|---|---|
| **Frontend & UI/UX Specialist** | Anggota 1 (Aldiva) | Halaman publik, navigasi, landing page, ensiklopedia UI, search UI, Story Explorer |
| **Backend & Hybrid Search Engineer** | Anggota 2 (Gabriel) | Next.js Route Handlers, Global Search API, Keyword Search, Semantic Search (SPARQL), NLQP, Entity Recognition & Linking, Hybrid Search (RRF), Search Explanation, Story Search, Fuseki Client & Security |
| **Knowledge Base Engineer** | Anggota 3 (Roshan) | Ontologi OWL/RDF (24 class, 48 object property, 28 data property), SHACL Shapes, dataset Fuseki `:mk_nexus` |
| **Data Engineering Specialist** | Anggota 4 (Yazri) | Scraper multi-sumber, data cleaning, entity resolution, ekspor RDF/XML dan Turtle |

---

## 🚀 Fitur Backend & Hybrid Search Engine (Anggota 2)

Sesuai **PRD Bagian 11, 12, 14, 15, 16**, serta **FR-02 sampai FR-08** dan **FR-23**:

1. **Next.js Route Handlers (REST API)**:
   - Endpoint terstruktur di bawah `/api/...` dengan validasi parameter, error handling komprehensif, dan status HTTP standar (200, 400, 403, 404, 500, 503).
2. **Global Search API (`GET` & `POST /api/search`)**:
   - Mendukung parameter `q`, `mode` (`keyword` | `semantic` | `hybrid`), `type`, `game`, `timeline`, `element`, `faction`, `limit`, `offset`.
3. **Keyword Search (`POST /api/search/keyword`)**:
   - Pencarian leksikal berbasis token, prefix matching, alias matching, dan scoring BM25/TF-IDF.
4. **Semantic Search via SPARQL (`POST /api/search/semantic`)**:
   - Eksekusi kueri SPARQL dinamis ke Apache Jena Fuseki (`:mk_nexus`) dengan fallback otomatis ke Knowledge Graph in-memory traversal saat Fuseki offline.
5. **Natural Language Query Processing (NLQP)**:
   - Pemrosesan kueri bahasa alami (Indonesia & Inggris), seperti:
     - *"Karakter yang menggunakan kekuatan api"* → mendeteksi intent kemampuan & elemen Api.
     - *"Semua anggota klan Lin Kuei"* → mendeteksi intent keanggotaan klan Lin Kuei.
     - *"Musuh dari Scorpion"* → mendeteksi intent relasi musuh (`enemyOf`/`rivalOf`).
     - *"Karakter yang berasal dari Outworld"* → mendeteksi origin realm.
     - *"Karakter yang muncul di Mortal Kombat X"* → mendeteksi kemunculan game.
6. **Entity Recognition & Entity Linking (NER & NEL)**:
   - Mengenali entitas karakter, alias, klan, elemen, realm, game, dan timeline serta menautkannya ke URI Knowledge Graph (`https://example.org/mk/...`).
7. **Hybrid Search & Reciprocal Rank Fusion (RRF)**:
   - Menggabungkan hasil Keyword Search dan Semantic Search menggunakan algoritma RRF:
     $$RRF(d) = \sum_{m \in \{\text{semantic}, \text{keyword}\}} \frac{w_m}{k + r_m(d)}$$
     dengan smoothing constant $k = 60$, bobot semantik $w_{sem} = 1.0$, dan bobot keyword $w_{kw} = 0.8$.
8. **Search Explanation ("Why this result?") (FR-08)**:
   - Menjelaskan alasan hasil ditemukan: relasi ontologi (`matchedRelationships`), jejak penelusuran graf RDF (`graphPath`), serta *provenance* data sumber.
9. **Story Semantic Search (FR-23) (`POST /api/story/search`)**:
   - Pencarian naratif dan kronologis peristiwa cerita berdasarkan timeline, tokoh yang terlibat, story arc, jenis peristiwa, dan penanganan spoiler.
10. **Advanced Faceted Search (`POST /api/search/advanced`)**:
    - Pencarian berparameter multi-kriteria (tipe entitas, game, timeline, elemen, realm, faksi, kategori senjata, status verifikasi).
11. **Search Suggestions / Autocomplete (`GET /api/search/suggestions`)**:
    - Saran cepat berbasis prefix & substring matching untuk input bar pencarian.
12. **Keamanan & Validasi SPARQL (`POST /api/sparql`)**:
    - Query proxy yang aman dengan validasi read-only (`SELECT`, `ASK`, `CONSTRUCT`, `DESCRIBE`).
    - Menolak kueri mutasi (`INSERT`, `DELETE`, `DROP`, `CLEAR`, `LOAD`, `CREATE`) guna mencegah SPARQL injection.
13. **Pemeriksaan Kesehatan Sistem (`GET /api/health`)**:
    - Monitoring konektivitas Fuseki standalone, status search engine, dan versi aplikasi.

---

## 📡 Daftar Endpoint API

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` / `POST` | `/api/search` | Global Search (Keyword, Semantic, Hybrid) |
| `POST` | `/api/search/keyword` | Explicit Keyword Search |
| `POST` | `/api/search/semantic` | Explicit Semantic Search (SPARQL) |
| `POST` | `/api/search/hybrid` | Explicit Hybrid Search (RRF Ranking) |
| `GET` | `/api/search/suggestions?q=` | Autocomplete / Search Suggestions |
| `POST` | `/api/search/advanced` | Advanced Faceted Search |
| `POST` | `/api/story/search` | Story Semantic Search (FR-23) |
| `GET` | `/api/story/events` | Daftar peristiwa cerita |
| `GET` | `/api/story/events/[id]` | Detail peristiwa cerita |
| `GET` | `/api/story/timeline` | Garis waktu kronologis cerita |
| `GET` | `/api/characters` | Ensiklopedia karakter (+ filter game, realm, faction) |
| `GET` | `/api/characters/[id]` | Detail karakter |
| `GET` | `/api/games` | Ensiklopedia game (+ filter era) |
| `GET` | `/api/games/[id]` | Detail game |
| `GET` | `/api/abilities` | Ensiklopedia kemampuan (+ filter elemen, kategori) |
| `GET` | `/api/abilities/[id]` | Detail kemampuan |
| `GET` | `/api/weapons` | Ensiklopedia senjata (+ filter kategori) |
| `GET` | `/api/weapons/[id]` | Detail senjata |
| `GET` | `/api/organizations` | Ensiklopedia klan/organisasi |
| `GET` | `/api/organizations/[id]` | Detail klan/organisasi |
| `GET` | `/api/timelines` | Ensiklopedia timeline |
| `GET` | `/api/timelines/[id]` | Detail timeline |
| `POST` | `/api/sparql` | Secure SPARQL Proxy (Read-Only) |
| `GET` | `/api/health` | Health Check (Web & Fuseki Status) |

---

## 🧪 Menjalankan Pengujian Backend & Search Engine

Tersedia test suite komprehensif berisi **53 assertions** mencakup seluruh aspek pencarian, NLQP, RRF, penjelasan, dan keamanan:

```bash
# Compile and run test suite
node frontend/node_modules/typescript/bin/tsc frontend/src/lib/search/tests/test_hybrid_search.ts --module commonjs --target es2022 --moduleResolution node --skipLibCheck --outDir frontend/src/lib/search/tests/dist
node frontend/src/lib/search/tests/dist/search/tests/test_hybrid_search.js
```

---

## 💻 Menjalankan Server Development

```bash
cd frontend
npm run dev
# Buka http://localhost:3000
```
