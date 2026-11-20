# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# MORTAL KOMBAT KNOWLEDGE NEXUS
### A Semantic Knowledge Graph & Hybrid Search Engine

**Versi:** 1.5  
**Status:** Updated Draft – Multi-Source Scraping, Image Asset Management, External Reference Discovery & Dockerless Infrastructure  
**Kategori:** Semantic Web / Knowledge Graph / Search Engine  
**Platform:** Web Application  
**Frontend:** Next.js  
**Knowledge Base:** RDF / OWL  
**Triple Store:** Apache Jena Fuseki  
**Search Method:** Hybrid Search (Keyword + Semantic Search + Story Search) dengan Multi-Source Data Acquisition  
**Target Cakupan:** Seluruh seri Mortal Kombat  
**Batasan Konten:** Seluruh game standalone; tanpa DLC, expansion pack, Kombat Pack, atau season-pass content  
**Perubahan v1.5:** Menghapus ketergantungan Docker/Docker Compose dan menetapkan Apache Jena Fuseki berjalan secara standalone. Seluruh cakupan dan ketentuan v1.4 tetap dipertahankan.

---

# 1. EXECUTIVE SUMMARY

## 1.1 Product Overview

Mortal Kombat Knowledge Nexus merupakan sebuah platform ensiklopedia digital dan mesin pencari berbasis Semantic Web yang menyediakan informasi terstruktur mengenai seluruh dunia Mortal Kombat.

Platform ini dirancang untuk mengumpulkan, mengorganisasikan, menghubungkan, dan menyajikan informasi dari berbagai seri Mortal Kombat ke dalam sebuah Knowledge Graph menggunakan teknologi RDF, OWL, RDFS, dan SPARQL.

Fokus utama pengembangan produk adalah Hybrid Semantic Search Engine yang memungkinkan pengguna mencari informasi berdasarkan kata kunci, atribut, hubungan antar-entitas, maupun pertanyaan menggunakan bahasa alami.

Berbeda dengan mesin pencari konvensional yang mengandalkan kecocokan kata, sistem ini mampu menelusuri hubungan antar-entitas dalam Knowledge Graph untuk menghasilkan informasi yang lebih kontekstual.

Contoh pencarian:
- Karakter yang menggunakan kekuatan api.
- Karakter yang berasal dari Outworld dan menggunakan pedang.
- Semua anggota klan Lin Kuei.
- Musuh dari Scorpion.
- Karakter yang muncul di Mortal Kombat X dan Mortal Kombat 11.
- Karakter yang memiliki kemampuan teleportasi.
- Hubungan antara Scorpion dan Sub-Zero.
- Karakter yang berasal dari Earthrealm pada timeline tertentu.

## 1.2 Product Vision

Menjadi platform pengetahuan Mortal Kombat yang mampu menghubungkan seluruh informasi karakter, game, kemampuan, senjata, organisasi, lokasi, cerita, dan timeline melalui teknologi Semantic Web serta menyediakan pengalaman pencarian yang cerdas, relevan, dan dapat dijelaskan.

## 1.3 Product Mission

1. Mengumpulkan informasi Mortal Kombat dari berbagai seri ke dalam satu knowledge base.
2. Mengorganisasikan informasi menggunakan ontology dan Knowledge Graph.
3. Mengembangkan mesin pencari yang memahami hubungan dan konteks informasi.
4. Menyediakan pengalaman eksplorasi informasi secara interaktif.
5. Mempermudah pengguna menemukan informasi kompleks yang sulit diperoleh melalui pencarian biasa.
6. Mengembangkan pipeline pengumpulan data multi-sumber yang dapat dijalankan ulang, dipantau, dan diaudit.
7. Menjaga provenance setiap fakta agar informasi dapat ditelusuri ke halaman dan sumber asalnya.

---

# 2. PROBLEM STATEMENT

## 2.1 Permasalahan

Informasi mengenai Mortal Kombat tersebar di berbagai sumber dan mencakup banyak game, karakter, timeline, kemampuan, serta hubungan cerita.

Beberapa permasalahan yang ingin diselesaikan:

**1. Informasi tersebar**
Pengguna harus mengunjungi berbagai sumber untuk mendapatkan informasi mengenai karakter, game, kemampuan, dan cerita Mortal Kombat.

**2. Pencarian berbasis keyword memiliki keterbatasan**
Pencarian biasa belum tentu mampu menemukan informasi ketika pengguna menggunakan istilah berbeda dari deskripsi yang tersedia.

**3. Hubungan antar-informasi sulit ditelusuri**
Informasi mengenai hubungan karakter, klan, senjata, kemampuan, dan timeline tidak selalu tersedia dalam satu tempat.

**4. Perbedaan informasi antar-timeline**
Karakter dapat memiliki identitas, hubungan, afiliasi, atau latar belakang berbeda pada timeline yang berbeda.

**5. Tidak adanya penjelasan hubungan hasil pencarian**
Pencarian konvensional biasanya hanya menampilkan dokumen atau hasil yang cocok tanpa menjelaskan alasan hubungan informasi tersebut.

## 2.2 Proposed Solution

Membangun website ensiklopedia Mortal Kombat dengan Hybrid Semantic Search Engine yang menggabungkan:
- Keyword Search untuk pencarian berdasarkan teks.
- Semantic Search untuk pencarian berdasarkan relasi dan atribut ontology.
- Natural Language Query Processing untuk memahami pertanyaan pengguna.
- Knowledge Graph untuk menelusuri hubungan antar-entitas.
- Search Explanation untuk memberikan alasan mengapa suatu hasil ditemukan.

---

# 3. PRODUCT OBJECTIVES

## 3.1 Tujuan Utama

Mengembangkan platform pencarian informasi Mortal Kombat berbasis Semantic Web yang dapat mengelola informasi lintas seri dan menyediakan pencarian berdasarkan makna serta hubungan antar-entitas.

## 3.2 Tujuan Khusus

1. Membuat ontology yang merepresentasikan dunia Mortal Kombat.
2. Mengembangkan Knowledge Base berbasis RDF/OWL.
3. Mengimplementasikan Apache Jena Fuseki sebagai SPARQL endpoint.
4. Mengembangkan Hybrid Search Engine.
5. Mengimplementasikan pencarian dengan bahasa alami.
6. Menyediakan visualisasi Knowledge Graph.
7. Menyediakan ensiklopedia karakter dan informasi Mortal Kombat.
8. Menyediakan sistem administrasi pengelolaan data.
9. Menjamin informasi memiliki sumber dan konteks yang jelas.
10. Mengevaluasi kualitas hasil pencarian menggunakan metrik pengujian.
11. Mengotomatisasi pengumpulan data dari beberapa website melalui scraper dan adapter sumber yang terpisah.
12. Mengubah hasil scraping mentah menjadi entitas, atribut, dan relasi yang tervalidasi sebelum dikonversi ke RDF/OWL.
13. Menyediakan monitoring, log, retry, deduplikasi, dan provenance pada setiap proses pengambilan data.

## 3.3 Success Criteria

Produk dinyatakan berhasil apabila:
- Pengguna dapat mencari informasi melalui keyword maupun semantic query.
- Sistem dapat mengidentifikasi entitas dan relasi dari pertanyaan yang didukung.
- Sistem mampu menghasilkan SPARQL berdasarkan query terstruktur.
- Sistem dapat menampilkan hasil pencarian berdasarkan relasi ontology.
- Sistem dapat membedakan data karakter berdasarkan game dan timeline.
- Hasil pencarian memiliki penjelasan dan sumber informasi.
- Knowledge Graph dapat ditelusuri secara interaktif.
- Admin dapat menambah, memperbarui, dan memvalidasi data.
- Pipeline scraping dapat mengambil data dari sumber yang diizinkan dan mencatat URL serta waktu pengambilan.
- Data mentah, data hasil normalisasi, hasil ekstraksi, dan RDF/XML dapat ditelusuri antar-tahap.
- Kegagalan scraping pada satu sumber tidak menghentikan proses dari sumber lain.
- Sistem tidak menganggap kata kunci pencarian sebagai bukti tipe entitas atau relasi.

---

# 4. TARGET USERS

## 4.1 Primary Users
- **Mortal Kombat Fans:** Mencari informasi karakter, menemukan karakter berdasarkan kemampuan, mengetahui hubungan antar-karakter, game appearances, dan timeline.
- **Semantic Web Learners:** Mempelajari Knowledge Graph, RDF/OWL, SPARQL, dan Semantic Search.
- **Researchers and Information Seekers:** Mencari perbandingan lintas seri, timeline, dan provenance data.

## 4.2 Secondary Users
- **Administrator:** Pengelolaan data, ontology, verifikasi sumber, dan review pipeline scraping.

---

# 5. PRODUCT SCOPE

## 5.1 In Scope
1. Landing Page.
2. Global Search Engine (Keyword, Semantic, Hybrid).
3. Natural Language Query Processing.
4. Advanced Search & Search Explanation.
5. Character, Game, Ability, Weapon, Clan, Realm, Timeline Encyclopedia.
6. Story Semantic Search & Story Timeline Explorer.
7. Relationship Explorer & Knowledge Graph Visualization.
8. SPARQL Query Viewer.
9. Admin Dashboard & Data Management.
10. Multi-Source Web Scraping & Data Acquisition (Fandom, Official, WB Games).
11. Dataset Pipeline (Raw → Cleaned → Extracted → Validated → RDF/OWL).
12. Standalone Apache Jena Fuseki Integration.

## 5.2 Out of Scope
- Game emulator / combat simulator.
- DLC / Expansion Pack / Kombat Pack / Season-pass exclusive content.
- Forum komunitas / public comment system.
- Marketplace / payment system.

---

# 6. INFRASTRUCTURE & ARCHITECTURE OVERVIEW (v1.5)

- **Frontend & API:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Triple Store:** Apache Jena Fuseki Standalone (tanpa Docker).
- **Knowledge Base:** RDF/OWL, RDFS, SPARQL, SHACL.
- **Data Engineering:** Python 3.10+ (requests, beautifulsoup4, rdflib, pydantic).
- **Deployment & Dev:** Standalone local processes for Next.js, Fuseki, and Python pipeline.

## Integrasi LLM dan RAG (AI Knowledge Assistant)

### 1. Deskripsi

Sistem mengintegrasikan Large Language Model (LLM) dan Retrieval-Augmented Generation (RAG) untuk menyediakan kemampuan tanya jawab berbasis kecerdasan buatan mengenai dunia Mortal Kombat.

Integrasi ini memungkinkan pengguna mencari dan memahami informasi melalui pertanyaan menggunakan bahasa alami. Jawaban dihasilkan berdasarkan informasi yang tersedia di Knowledge Graph dan sumber data yang telah dikumpulkan oleh sistem.

### 2. Tujuan

- Memungkinkan pengguna mengajukan pertanyaan mengenai karakter, game, kemampuan, hubungan antar karakter, dan alur cerita Mortal Kombat menggunakan bahasa alami.
- Menghasilkan jawaban yang lebih informatif dan mudah dipahami dibandingkan hasil pencarian biasa.
- Memanfaatkan data RDF/OWL dan Knowledge Graph sebagai sumber pengetahuan utama.
- Menyediakan jawaban yang memiliki konteks dan referensi sumber informasi.
- Mengurangi risiko jawaban AI yang tidak sesuai dengan data yang dimiliki sistem.

### 3. Teknologi dan Peran

**LLM (Large Language Model)**

LLM digunakan untuk memahami pertanyaan pengguna, mengolah konteks informasi yang diperoleh, dan menghasilkan jawaban dalam bahasa alami.

Provider LLM yang direncanakan:
- Google Gemini API sebagai provider awal dengan memanfaatkan free tier sesuai batas penggunaan yang tersedia.
- Ollama sebagai alternatif untuk menjalankan model secara lokal.

Sistem menggunakan konfigurasi provider agar model dapat diganti tanpa mengubah keseluruhan mekanisme aplikasi.

**RAG (Retrieval-Augmented Generation)**

RAG digunakan untuk mengambil informasi yang relevan dari Knowledge Base sebelum informasi tersebut diberikan kepada LLM sebagai konteks dalam menghasilkan jawaban.

Sumber retrieval meliputi:
- Apache Jena Fuseki melalui SPARQL.
- RDF/OWL Knowledge Graph.
- Jena Text/Lucene untuk pencarian teks.
- Data karakter, game, ability, relasi, dan informasi cerita Mortal Kombat.

### 4. Alur Kerja LLM dan RAG

1. Pengguna memasukkan pertanyaan melalui antarmuka AI Assistant.
2. Sistem menerima dan memproses pertanyaan menggunakan backend.
3. RAG melakukan pencarian informasi yang relevan melalui Knowledge Graph, SPARQL, dan Jena Text/Lucene.
4. Hasil pencarian beserta konteks dan referensi sumber dikirimkan kepada LLM.
5. LLM menganalisis informasi tersebut dan menyusun jawaban menggunakan bahasa alami.
6. Sistem menampilkan jawaban kepada pengguna beserta sumber informasi yang digunakan apabila tersedia.

### 5. Fungsionalitas

- **AI Knowledge Assistant:** menyediakan antarmuka percakapan untuk menjawab pertanyaan seputar Mortal Kombat.
- **Natural Language Question:** memungkinkan pengguna mencari informasi menggunakan kalimat atau pertanyaan biasa.
- **Knowledge-Based Answer:** menghasilkan jawaban berdasarkan informasi yang ditemukan dalam Knowledge Base.
- **Contextual Answer:** mempertimbangkan konteks karakter, game, hubungan, dan timeline agar jawaban tidak mencampurkan informasi dari konteks cerita yang berbeda.
- **Source Attribution:** menampilkan referensi atau sumber data yang mendukung jawaban AI apabila tersedia.

### 6. Ketentuan dan Batasan

- Knowledge Graph dan sumber data sistem tetap menjadi sumber utama informasi.
- LLM tidak boleh mengarang fakta ketika informasi yang dibutuhkan tidak ditemukan.
- Jika data tidak tersedia, sistem harus menyampaikan bahwa informasi belum ditemukan dalam Knowledge Base.
- Jawaban harus mempertahankan konteks game dan timeline yang relevan.
- LLM hanya digunakan untuk pemahaman dan penyusunan jawaban, bukan untuk mengubah data RDF/OWL secara langsung.
- API key dan konfigurasi provider harus disimpan di sisi backend dan tidak boleh diekspos kepada pengguna.
- Penggunaan provider harus memperhatikan batas kuota dan rate limit free tier.
- Apabila layanan LLM tidak tersedia atau kuota habis, fitur pencarian utama tetap dapat digunakan tanpa AI.

### 7. Kebutuhan Antarmuka

AI Assistant disediakan sebagai fitur pada website dengan antarmuka percakapan yang memungkinkan pengguna:
- Mengirim pertanyaan seputar Mortal Kombat.
- Melihat jawaban yang dihasilkan AI.
- Melihat sumber informasi yang digunakan.
- Mengajukan pertanyaan lanjutan dalam percakapan yang sama.

Antarmuka AI Assistant harus mengikuti desain visual dan responsivitas website yang telah ditentukan dalam PRD.

## Tambahan: UI/UX Design Reference and Visual Direction

### 1. Design Inspiration

Desain website Mortal Kombat Knowledge Nexus menggunakan kombinasi inspirasi dari beberapa website berikut:

- **Mortal Kombat Wiki (Fandom):** menjadi referensi struktur ensiklopedia, navigasi kategori, halaman artikel, dan penyajian informasi yang terorganisasi.
  https://mortalkombat.fandom.com/wiki/Mortal_Kombat_Wiki

- **Official Mortal Kombat Website:** menjadi referensi visual sinematik, penggunaan artwork karakter berukuran besar, hero section, tipografi tegas, serta identitas visual Mortal Kombat.
  https://www.mortalkombat.com/en-us

- **Mortal Kombat Warehouse:** menjadi referensi katalog konten berdasarkan game, karakter, cerita, arena, screenshot, dan galeri.
  https://www.mortalkombatwarehouse.com/

Desain akhir tidak menyalin tampilan website referensi secara langsung, tetapi mengadaptasi elemen yang sesuai dengan kebutuhan Knowledge Base dan Semantic Web.

### 2. Visual Design Direction

Website menggunakan konsep **Dark Cinematic Encyclopedia**, yaitu kombinasi tampilan ensiklopedia modern dengan atmosfer gelap dan visual khas Mortal Kombat.

Ketentuan desain:
- Menggunakan dark theme sebagai tampilan utama.
- Menggunakan warna hitam, charcoal, dan abu-abu gelap sebagai warna dasar.
- Menggunakan merah gelap sebagai warna aksen utama.
- Menggunakan warna emas atau bronze sebagai aksen sekunder secara terbatas.
- Menggunakan artwork, ilustrasi, dan gambar karakter sebagai elemen visual utama.
- Menggunakan tipografi tegas dan modern dengan hierarki judul yang jelas.
- Menggunakan efek hover, transisi, dan animasi ringan tanpa mengganggu keterbacaan.
- Menyediakan tampilan responsif untuk desktop, tablet, dan perangkat mobile.

### 3. Layout dan Navigasi

Struktur layout website mengadaptasi pola navigasi ensiklopedia dengan sentuhan visual modern.

- **Navbar:** berisi logo, Home, Characters, Games, Abilities, Story, Knowledge Graph, dan AI Assistant. Navigasi harus mudah diakses dan konsisten di seluruh halaman.
- **Hero Section:** menampilkan artwork Mortal Kombat, judul website, deskripsi singkat, dan akses menuju fitur pencarian.
- **Main Content:** menggunakan layout terstruktur dengan area konten utama dan sidebar atau panel informasi apabila diperlukan.
- **Footer:** menampilkan informasi website, navigasi tambahan, dan sumber referensi.

### 4. Desain Halaman Utama

Halaman utama menggunakan pendekatan landing page sinematik yang tetap berfungsi sebagai pintu masuk menuju ensiklopedia.

Komponen:
- Hero banner dengan artwork Mortal Kombat dan judul utama.
- Search bar sebagai akses utama pencarian informasi.
- Featured Characters untuk menampilkan karakter pilihan.
- Game Collection untuk menjelajahi daftar game Mortal Kombat.
- Explore the Lore untuk mengakses informasi cerita dan timeline.
- Knowledge Graph Preview untuk memperlihatkan hubungan antar entitas.
- AI Assistant Preview untuk mengakses fitur tanya jawab berbasis pengetahuan.

### 5. Desain Halaman Ensiklopedia

Halaman karakter, game, ability, dan informasi lainnya menggunakan pola halaman ensiklopedia yang konsisten.

**Character Detail:**
- Gambar atau artwork karakter.
- Nama dan identitas karakter.
- Biografi dan deskripsi.
- Asal atau afiliasi karakter jika tersedia.
- Kemampuan dan jurus.
- Hubungan dengan karakter lain.
- Riwayat kemunculan dalam game.
- Informasi timeline dan cerita.
- Referensi sumber informasi.

**Game Detail:**
- Cover atau artwork game.
- Judul dan informasi dasar game.
- Tahun rilis dan platform jika tersedia.
- Ringkasan cerita.
- Daftar karakter yang muncul.
- Informasi konten dan relasi terkait.
- Referensi sumber informasi.

**Knowledge Graph:**
- Menampilkan hubungan antar entitas dalam bentuk visualisasi graf interaktif.
- Menyediakan informasi detail ketika pengguna memilih sebuah node.
- Menggunakan warna atau bentuk berbeda untuk membedakan tipe entitas dan relasi.

### 6. Desain AI Assistant

AI Assistant menggunakan antarmuka percakapan modern yang terintegrasi dengan identitas visual website.

Komponen:
- Area percakapan antara pengguna dan AI.
- Input untuk mengirim pertanyaan.
- Tampilan jawaban yang mudah dibaca.
- Referensi sumber informasi pada jawaban.
- Indikator proses ketika AI sedang mencari dan menyusun jawaban.
- Riwayat percakapan selama sesi berlangsung.

### 7. Konsistensi dan Usability

- Seluruh halaman harus menggunakan sistem warna, tipografi, spacing, dan komponen UI yang konsisten.
- Informasi harus menjadi fokus utama dan tidak tertutup oleh dekorasi visual.
- Gambar karakter dan game harus memiliki ukuran serta rasio yang sesuai.
- Navigasi, pencarian, dan perpindahan antarhalaman harus mudah dipahami.
- Efek visual tidak boleh mengurangi performa dan aksesibilitas.
- Website harus tetap nyaman digunakan pada layar kecil.
- Tampilan harus mengutamakan keterbacaan informasi ensiklopedia dibandingkan elemen dekoratif.