# MK Knowledge Nexus — Frontend

Frontend website **Mortal Kombat Knowledge Nexus** (Tugas Besar Kelompok 3).
Dibangun dengan **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** sesuai PRD Bagian 14.1.

Cakupan (peran Frontend Developer):

| PRD | Implementasi |
|---|---|
| Bagian 7 — Information Architecture | Navbar utama, sitemap halaman publik, breadcrumb |
| Bagian 13 & 25 — UI/UX | Dark cinematic theme, design tokens 25.2, responsif, reduced-motion, focus state, disclaimer |
| FR-01 Landing Page | `/` |
| FR-02 Global Search (sebagian) | Search bar + autocomplete + riwayat lokal, `/search` (tab, mode Keyword/Semantic/Hybrid, "Why this result?") |
| FR-09 Character Encyclopedia | `/characters`, `/characters/[id]` (selector versi game/timeline → gambar & data berubah) |
| FR-10 Game Encyclopedia | `/games`, `/games/[id]` |
| FR-11 Ability & Move | `/abilities`, `/abilities/[id]` |
| FR-12 Weapon | `/weapons`, `/weapons/[id]` |
| FR-13 Clan & Organization | `/organizations`, `/organizations/[id]` |
| FR-14 Timeline | `/timelines`, `/timelines/[id]` |
| Story Explorer & Timeline (25.5) | `/story`, `/story/timeline`, `/story/events/[id]` |
| State | Loading (skeleton), Empty, Error (+ retry), 404 |

## Menjalankan

```bash
cd frontend
npm install
cp .env.example .env.local   # opsional
npm run dev                  # http://localhost:3000
npm run build                # cek build produksi
```

> Windows PowerShell yang memblokir `npm.ps1`: gunakan `npm.cmd run dev`.

## Integrasi API (Anggota 2)

Semua pemanggilan API ada di [`src/lib/api.ts`](src/lib/api.ts) dan tipe datanya di [`src/lib/types.ts`](src/lib/types.ts).

| Variabel | Default | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_USE_MOCK` | `true` | `true` = data contoh lokal; `false` = panggil API |
| `NEXT_PUBLIC_API_BASE_URL` | *(kosong)* | Kosong = same-origin (Next.js Route Handlers) |
| `NEXT_PUBLIC_API_TIMEOUT_MS` | `10000` | Timeout request |

Endpoint yang dipakai frontend (PRD Bagian 15 + tambahan detail entitas):

| Fungsi | Endpoint |
|---|---|
| Keyword search | `GET /api/search?q=&type=` |
| Semantic / Hybrid search | `POST /api/search/semantic`, `POST /api/search/hybrid` body `{ query, type? }` |
| Autocomplete | `GET /api/search/suggestions?q=` |
| Karakter | `GET /api/characters`, `GET /api/characters/[id]` |
| Game | `GET /api/games`, `GET /api/games/[id]` |
| Kemampuan | `GET /api/abilities`, `GET /api/abilities/[id]` |
| Senjata | `GET /api/weapons`, `GET /api/weapons/[id]` |
| Klan/Organisasi | `GET /api/organizations`, `GET /api/organizations/[id]` |
| Timeline | `GET /api/timelines`, `GET /api/timelines/[id]` |
| Story | `GET /api/story/events?timeline=&character=&arc=`, `GET /api/story/events/[id]`, `GET /api/story/timeline?timeline=`, `POST /api/story/search` |

Format respons yang diterima: objek langsung atau `{ data: ... }`; untuk list: `[...]`, `{ items }`, `{ results }`, atau `{ data: [...] }`.
Error mengembalikan status HTTP + `{ message }` (ditampilkan pada error state).

## Gambar karakter & game

Komponen [`EntityImage`](src/components/ui/EntityImage.tsx) hanya menampilkan aset dengan `rightsStatus: "approved"` dan `assetURL` (PRD 29.5).
Gambar karakter mengikuti `CharacterVersion.image` sesuai game yang dipilih; jika belum ada aset yang disetujui, tampil placeholder netral.

## Alur Git

```
main      ← rilis stabil (jangan push langsung)
develop   ← integrasi & testing
feature/* ← satu branch per fitur, di-merge ke develop
```
