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
├── shiro.ini              # Konfigurasi keamanan / user shiro
├── setup-fuseki.ps1       # Script PowerShell untuk download & ekstrak Fuseki otomatis
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

### Cara Manual:
1. Unduh **Apache Jena Fuseki** (format `.zip` atau `.tar.gz`) dari situs resmi:
   [https://jena.apache.org/download/](https://jena.apache.org/download/)
2. Ekstrak isi arsip ke dalam folder `fuseki/` sehingga terdapat folder `apache-jena-fuseki-x.x.x`.
3. Jalankan `run-fuseki.bat` (Windows) atau `run-fuseki.sh` (Linux/macOS).

## 4. Endpoint Fuseki Standalone
Setelah Fuseki berjalan, layanan dapat diakses di:
- **Fuseki Web UI:** `http://localhost:3030`
- **SPARQL Query Endpoint:** `http://localhost:3030/mk_nexus/query` (atau `http://localhost:3030/mk_nexus/sparql`)
- **SPARQL Update Endpoint:** `http://localhost:3030/mk_nexus/update`
- **Graph Store Data Endpoint:** `http://localhost:3030/mk_nexus/data`

## 5. Mengimpor Data Awal
Dataset awal yang berada di `knowledge-base/data/seed_data.ttl` dapat diimpor langsung melalui:
1. Web UI Fuseki (`http://localhost:3030` -> Dataset `mk_nexus` -> *upload data*), ATAU
2. Menggunakan curl / HTTP POST ke Graph Store endpoint:
   ```bash
   curl -X POST --data-binary @../knowledge-base/data/seed_data.ttl -H "Content-Type: text/turtle" http://localhost:3030/mk_nexus/data?default
   ```
