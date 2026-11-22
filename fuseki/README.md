# Apache Jena Fuseki Standalone (Dockerless)

Folder ini berisi konfigurasi dan utilitas untuk menjalankan **Apache Jena Fuseki Standalone** tanpa menggunakan Docker, sesuai ketentuan PRD v1.5.

## 1. Prasyarat
- **Java Runtime Environment (JRE/JDK) 17 atau 21 LTS**
  Pastikan perintah `java -version` dapat dieksekusi di terminal Anda.

## 2. Struktur Folder
```text
fuseki/
├── configuration/
│   └── mk_nexus.ttl       # Fuseki TDB2 Dataset Assembler (:mk_nexus)
├── databases/             # Local TDB2 persistent storage (di-ignore git)
├── shiro.ini              # Konfigurasi keamanan / user shiro & localhostFilter
├── setup-fuseki.ps1       # Script PowerShell untuk download & ekstrak Fuseki otomatis
├── import-data.ps1        # Script PowerShell untuk impor knowledge_graph.ttl & uji 22 SPARQL query
├── run-fuseki.bat         # Script runner untuk Windows
├── run-fuseki.sh          # Script runner untuk Linux / macOS
└── README.md
```

## 3. Cara Instalasi & Menjalankan

### Cara Otomatis (Windows PowerShell):
1. Buka PowerShell di folder `fuseki/`:
   ```powershell
   .\setup-fuseki.ps1
   ```
2. Jalankan Fuseki:
   ```cmd
   .\run-fuseki.bat
   ```
3. Impor Knowledge Graph lengkap (`knowledge-base/data/knowledge_graph.ttl` — 6.789 triples: ontologi OWL + data + story layer + provenance) dan jalankan 22 pengujian SPARQL:
   ```powershell
   .\import-data.ps1
   ```

## 4. Endpoint Fuseki Standalone
Setelah Fuseki berjalan, layanan dapat diakses di:
- **Fuseki Web UI:** `http://localhost:3030`
- **SPARQL Query Endpoint:** `http://localhost:3030/mk_nexus/query` (atau `http://localhost:3030/mk_nexus/sparql`)
- **SPARQL Update Endpoint:** `http://localhost:3030/mk_nexus/update`
- **Graph Store Data Endpoint:** `http://localhost:3030/mk_nexus/data`

## 5. Mengimpor Data RDF/OWL ke Fuseki
Gunakan salah satu cara berikut:
1. **Otomatis + Verifikasi SPARQL (Direkomendasikan):**
   ```powershell
   python knowledge-base/scripts/kb_tools.py fuseki-load
   python knowledge-base/scripts/kb_tools.py fuseki-test
   ```
2. **Melalui HTTP PUT/POST ke Graph Store Endpoint:**
   ```bash
   curl -X PUT --data-binary @knowledge-base/data/knowledge_graph.ttl -H "Content-Type: text/turtle; charset=UTF-8" http://localhost:3030/mk_nexus/data?default
   ```
