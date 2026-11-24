# Ruang Baca Kampus

Website perpustakaan komunitas yang dikelola mahasiswa, dibangun menggunakan **React**, **Vite**, dan **Tailwind CSS v4**. Memuat katalog buku interaktif, booking slot Ruang Diskusi via WhatsApp, kalkulator jatuh tempo, jadwal Klub Baca, galeri, serta **Pojok Belajar** (implementasi React Hooks: `useState` dan `useEffect`).

---

## Tech Stack

- **Framework:** React 19 (Vite 8)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Tipografi:** Poppins (heading) & Inter (teks/UI)
- **Ikon:** `lucide-react`
- **Tanggal & Waktu:** `date-fns` (locale `id`, zona waktu `Asia/Jakarta` / WIB)

---

## Fitur Utama

### 1. Katalog Buku & Detail Buku (Modal)
- Pencarian berdasarkan judul, penulis, atau kode rak, serta filter kategori berbentuk pill (`Semua`, `Kuliah`, `Novel`, `Jurnal`).
- Klik kartu buku untuk membuka modal detail (`<dialog>` native): menampilkan sinopsis, lokasi rak, penerbit, tahun, jumlah halaman, ISBN (disembunyikan jika kosong), perkiraan tanggal kembali (untuk buku dipinjam), tombol **Tanya via WhatsApp**, navigasi **Sebelumnya / Berikutnya**, dan dukungan deep link `#buku-{id}`.

### 2. Booking Slot Ruang Diskusi & Kalkulator Jatuh Tempo
- Pilihan 6 slot berdurasi 2 jam (`08.00–20.00 WIB`, Senin–Jumat) untuk kelompok 4–8 orang.
- Status slot otomatis: **Tersedia**, **Penuh**, **Klub Baca** (Jumat `16.00–18.00` otomatis diblokir), **Lewat**, dan **Tutup** (Sabtu–Minggu).
- Validasi form lengkap dengan ringkasan booking sebelum dikirim ke `wa.me`.
- **Kalkulator Jatuh Tempo**: menghitung tanggal kembali (`+14 hari`), batas perpanjangan 1x (`+28 hari`), dan sisa hari atau estimasi denda (`Rp1.000/hari`).

### 3. Pojok Belajar (Implementasi React Hooks)
- **Penghitung Halaman** (`src/components/study/ReadingCounter.jsx`): komponen **Counter** dengan `useState`, dilengkapi target 30 halaman/hari, progress bar, tombol `-1`, `+1`, `+5`, dan `Reset`.
- **Daftar Rencana Baca** (`src/components/study/ReadingTodoList.jsx`): komponen **To-do List** dengan `useState` untuk menambah rencana baca (dengan validasi input kosong), menandai selesai, dan menghapus item.
- **Rekomendasi Bacaan Minggu Ini** (`src/components/study/BookRecommendations.jsx`): komponen **Fetch data dummy** dari `/data/rekomendasi-baca.json` menggunakan `useEffect` dengan dependency array `[category, reloadKey]`, status `loading`/`error`/`empty`, serta cleanup `AbortController`.

### 4. Section Pendukung
- **Navbar Sticky** dengan indikator status **Buka / Tutup** otomatis berdasarkan jam operasional WIB.
- **Jadwal Klub Baca** dengan blok tanggal besar, highlight jadwal terdekat, dan tautan langsung ke detail buku.
- **FAQ** menggunakan accordion native `<details>` dengan ikon `+`/`−`.
- **Galeri** grid asimetris (1 foto besar + 2 kecil) dengan lightbox `<dialog>`.
- **Kontak & Lokasi** (tanpa Google Maps) berisi 3 kartu: Alamat dengan tombol **Salin alamat**, Jam Buka, dan Kontak (Email + WhatsApp).

---

## Struktur Folder

```text
Ruang-baca/
├── public/
│   ├── data/
│   │   └── rekomendasi-baca.json   # Data dummy untuk komponen useEffect
│   └── img/
│       ├── library-1.jpg
│       ├── library-2.jpg
│       └── library-3.jpg
├── src/
│   ├── components/
│   │   ├── booking/                # BookingForm, SlotPicker, DueDateCalculator, hooks
│   │   ├── books/                  # CatalogSection, BookCard, BookModal, BookStatus
│   │   ├── home/                   # Hero, Services, ClubSchedule, Faq, Gallery, Contact
│   │   ├── layout/                 # Navbar, Footer, Section
│   │   ├── study/                  # ReadingCounter, ReadingTodoList, BookRecommendations
│   │   └── ui/                     # Button, Badge, Chip
│   ├── config/
│   │   ├── room.js                 # Aturan slot ruang & nomor WhatsApp pengelola
│   │   └── site.js                 # Metadata situs, menu navigasi, sosial media
│   ├── data/
│   │   ├── bookings.js             # Data slot terisi
│   │   ├── books.js                # Data 12 buku lengkap
│   │   ├── faq.js                  # Daftar pertanyaan umum
│   │   └── schedule.js             # Jadwal Klub Baca
│   ├── lib/
│   │   ├── availability.js         # Logika status slot Ruang Diskusi
│   │   └── dates.js                # Utilitas tanggal & jam WIB (Asia/Jakarta)
│   ├── App.jsx
│   ├── index.css                   # Token warna, tipografi, dan gaya dasar Tailwind v4
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Cara Menjalankan Project

1. **Install dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan mode pengembangan (lokal):**
   ```bash
   npm run dev
   ```
   Buka di browser pada alamat `http://localhost:5173/`.

3. **Build untuk produksi:**
   ```bash
   npm run build
   ```

4. **Preview hasil build:**
   ```bash
   npm run preview
   ```

---

## Konfigurasi Cepat

- **Ganti nomor WhatsApp pengelola:** ubah nilai `whatsappNumber` pada `src/config/room.js`.
- **Perbarui katalog buku atau slot terisi:** edit `src/data/books.js` atau `src/data/bookings.js`.
- **Perbarui data rekomendasi bacaan:** edit `public/data/rekomendasi-baca.json`.
