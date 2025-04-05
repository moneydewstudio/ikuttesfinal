# EdukasiBersama - Platform Persiapan Ujian Indonesia

EdukasiBersama adalah platform persiapan ujian untuk siswa Indonesia yang mempersiapkan ujian CPNS, SNBT, dan Psikotes. Platform ini menyediakan simulasi tryout, leaderboard untuk memantau performa, dan artikel pembelajaran.

## Fitur

- **Autentikasi Google**: Login yang aman dan cepat menggunakan akun Google
- **Simulasi Tryout**: Latihan soal dengan pengatur waktu dan kategori sesuai jenis ujian
- **Leaderboard**: Pantau performa Anda dibandingkan dengan peserta lain
- **Blog Edukasi**: Artikel dan tips untuk persiapan ujian
- **PWA Support**: Akses platform secara offline (dalam pengembangan)
- **Tema Gelap**: Pilih tampilan sesuai preferensi Anda

## Teknologi

- **Frontend**: React dengan TypeScript, TailwindCSS dan shadcn/ui
- **Autentikasi**: Firebase Authentication (Google Auth)
- **Database**: Firebase Firestore
- **State Management**: React Query & Context API
- **Routing**: Wouter

## Konfigurasi Firebase

Untuk menjalankan aplikasi, konfigurasi Firebase diperlukan. Buat sebuah project di [Firebase Console](https://console.firebase.google.com/) dan aktifkan:

1. **Authentication**: Dengan provider Google
2. **Firestore Database**: Untuk menyimpan data tryout dan leaderboard

### Environment Variables

Tambahkan variabel lingkungan berikut:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## Pengembangan Lokal

1. Clone repositori
2. Install dependensi: `npm install`
3. Jalankan server lokal: `npm run dev`
4. Buka `http://localhost:5000` di browser

## Struktur Folder

- `/client`: Aplikasi React frontend
  - `/src`: Kode sumber
    - `/components`: Komponen React
    - `/lib`: Utilitas dan konfigurasi
    - `/pages`: Halaman aplikasi
- `/server`: Backend API Express
- `/shared`: Skema data dan tipe yang digunakan server dan client